import * as twgl from "twgl.js";
import stencilShaderSource from "./shaders/stencilShader";
import createCone from "./createCone";
import vornoiShader from "./shaders/vornoiShader";
import intermediateShader from "./shaders/intermediateShader";
import tfShader from "./shaders/transformFeedbackShader";
import debugShader from "./shaders/debugShader";
type Key = "stencil" | "offsets";
export default class VornoiMesh {
  transformFeedback: WebGLTransformFeedback;
  textureWidth: number;
  textureHeight: number;
  cycles: number;
  stencil: number[] = [];
  offsets: number[] = [];
  vertex = createCone(36);
  stencilFrameBufferInfo: twgl.FramebufferInfo;
  gl: WebGL2RenderingContext;
  quad = new Float32Array([
    // First triangle:
    1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
    // Second triangle:
    -1.0, -1.0, 1.0, -1.0, 1.0, 1.0,
  ]);
  stencilProgram: twgl.ProgramInfo;
  vornoiProgram: twgl.ProgramInfo;
  intermediateProgram: twgl.ProgramInfo;
  stencilBufferArrays: twgl.Arrays;
  vornoiBufferArrays: twgl.Arrays;
  vornoiBufferInfo: twgl.BufferInfo;
  vornoiFrameBufferInfo: twgl.FramebufferInfo;
  stencilBufferInfo: twgl.BufferInfo;
  intermediateFrameBufferInfo: twgl.FramebufferInfo;
  intermediateBufferArrays = {
    a_texCoord: {
      numComponents: 2,
      data: this.quad,
    },
  };
  intermediateBufferInfo: twgl.BufferInfo;
  transformFeedbackProgram: twgl.ProgramInfo;
  feedbackVoaInfo: twgl.VertexArrayInfo;

  constructor(
    gl: WebGL2RenderingContext,
    textureWidth: number,
    textureHeight: number,
    cycles: number
  ) {
    // console.log({ gl, textureWidth, textureHeight, cycles });
    this.textureWidth = textureWidth;
    this.textureHeight = textureHeight;
    this.cycles = cycles;
    this.gl = gl;
    this.transformFeedback = gl.createTransformFeedback()!;
    if (!gl.getExtension("EXT_color_buffer_float")) {
      console.error("voroni error: color extention does not exist");
    }
   
    this.stencilProgram = twgl.createProgramInfo(
      gl,
      [stencilShaderSource.vertex, stencilShaderSource.fragment],
      {
        attribLocations: {
          a_position: 0,
        },
      }
    );
    this.stencilBufferArrays = {
      a_position: {
        numComponents: 2,
        data: new Float32Array(this.stencil),
        drawType: gl.STATIC_DRAW,
      },
    };
    this.stencilBufferInfo = twgl.createBufferInfoFromArrays(
      gl,
      this.stencilBufferArrays
    );
    this.stencilFrameBufferInfo = twgl.createFramebufferInfo(
      gl,
      [
        //we only need 1 and 0 for the stencil.
        {
          internalFormat: gl.R32I,
          format: gl.RED_INTEGER,
          type: gl.INT,
          minMag: gl.NEAREST,
        },
      ],
      textureWidth,
      textureHeight
    );
    this.vornoiProgram = twgl.createProgramInfo(
      gl,
      [vornoiShader.vertex, vornoiShader.fragment],
      {
        attribLocations: {
          a_position: 1,
          a_instance: 0,
        },
      }
    );
    this.vornoiFrameBufferInfo = twgl.createFramebufferInfo(
      gl,
      [
        //store only integers on the red channel. these are the ids for each cell
        {
          internalFormat: gl.R32I,
          format: gl.RED_INTEGER,
          type: gl.INT,
          minMag: gl.NEAREST,
        },
        {
          attachmentPoint: gl.DEPTH_ATTACHMENT,
          internalFormat: gl.DEPTH_COMPONENT24,
          format: gl.DEPTH_COMPONENT,
        },
      ],
      textureWidth,
      textureHeight
    );
    this.vornoiBufferArrays = {
      a_position:{
        numComponents:3,
        divisor: 1,
        data: new Float32Array([...this.offsets]),
        drawType:gl.DYNAMIC_DRAW
    },
    a_instance:{
        numComponents:3,
        data:createCone(36)
    }
    };
    this.vornoiBufferInfo = twgl.createBufferInfoFromArrays(
      gl,
      this.vornoiBufferArrays
    );
    this.intermediateProgram = twgl.createProgramInfo(
      gl,
      [intermediateShader.vertex, intermediateShader.fragment],
      {
        attribLocations: {
          a_texCoord: 0,
        },
      }
    );
    this.intermediateFrameBufferInfo = twgl.createFramebufferInfo(
      gl,
      [
        //store floating point vec4 values
        {
          internalFormat: gl.RGBA32F,
          format: gl.RGBA,
          type: gl.FLOAT,
          minMag: gl.NEAREST,
        },
      ],
      this.offsets.length / 2,
      textureHeight
    );
    this.intermediateBufferInfo = twgl.createBufferInfoFromArrays(
      gl,
      this.intermediateBufferArrays
    );
    this.transformFeedbackProgram = twgl.createProgramInfo(
      gl,
      [tfShader.vertex, tfShader.fragment],
      {
        transformFeedbackVaryings: ["a_position"],
        attribLocations: {
          a_origins: 1,
          a_position: 0,
        },
      }
    );
    this.feedbackVoaInfo = twgl.createVertexArrayInfo(
      gl,
      this.transformFeedbackProgram,
      this.vornoiBufferInfo
    );
  }

  updateStencil(stencil: number[]) {
    this.stencil = stencil;
    this.stencilBufferArrays = {
      a_position: {
        numComponents: 3,
        data: new Float32Array(this.stencil),
        drawType: this.gl.STATIC_DRAW,
      },
    };
    this.stencilBufferInfo = twgl.createBufferInfoFromArrays(
      this.gl,
      this.stencilBufferArrays
    );
  }

  updateOffsets(offsets: number[]) {
    if (this) {
      const { gl, textureHeight, transformFeedback, vornoiBufferArrays } = this;
      this.offsets = offsets;
      this.vornoiBufferArrays = {
        ...vornoiBufferArrays,
          a_position:{
            numComponents:3,
            divisor: 1,
            data: new Float32Array(offsets),
            drawType:gl.DYNAMIC_DRAW
        },
        }
      
      this.vornoiBufferInfo = twgl.createBufferInfoFromArrays(
        this.gl,
        this.vornoiBufferArrays
      );
      gl.deleteFramebuffer(this.intermediateFrameBufferInfo.framebuffer);
      this.intermediateFrameBufferInfo = twgl.createFramebufferInfo(
        gl,
        [
          //store floating point vec4 values
          {
            internalFormat: gl.RGBA32F,
            format: gl.RGBA,
            type: gl.FLOAT,
            minMag: gl.NEAREST,
          },
        ],
        this.offsets.length / 3,
        textureHeight
      );
      gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, transformFeedback);
      //bind hte voroni buffer to the transfrom feedback object
      //the feedback program will write to this buffer
      gl.bindBufferBase(
        gl.TRANSFORM_FEEDBACK_BUFFER,
        0,
        this.vornoiBufferInfo.attribs!.a_position.buffer
      );
      gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
  }

  renderStencil() {
    if (this) {
      const {
        gl,
        stencilBufferArrays,
        stencilProgram,
        stencilBufferInfo,
        stencilFrameBufferInfo,
        textureWidth,
        textureHeight,
        stencil,
      } = this;
      gl.useProgram(stencilProgram.program);
      twgl.setBuffersAndAttributes(gl, stencilProgram, stencilBufferInfo);
       //set the background 'color' to -1//
      

      gl.bindFramebuffer(gl.FRAMEBUFFER, stencilFrameBufferInfo.framebuffer);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        stencilFrameBufferInfo.attachments[0],
        0
      );
      // twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
      gl.viewport(0, 0, textureWidth, textureHeight);
      gl.clearBufferiv(gl.COLOR, 0, new Int32Array([-1, 0, 0, 0]));
      // gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
      // gl.clearColor(10, 0, 0, 1);
      //render the polygon to the textrue
      console.log({stencilBufferInfo})
      
      gl.drawArrays(gl.TRIANGLES, 0, stencil.length / stencilBufferInfo.attribs!.a_position!.numComponents!);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      // this.debug("u_stencil", this.stencilFrameBufferInfo.attachments[0], 100)
    }
  }

  renderVornoi() {
    if (this) {
      const {
        gl,
        vornoiProgram,
        vornoiFrameBufferInfo,
        vornoiBufferInfo,
        textureWidth,
        textureHeight,
        offsets,
        vornoiBufferArrays,
        stencilFrameBufferInfo
      } = this;
      // console.log("rendering with: ", {
      //   gl,
      //   vornoiProgram,
      //   vornoiFrameBufferInfo,
      //   textureWidth,
      //   textureHeight,
      //   offsets,
      //   vertex,
      // });
      if (offsets.length > 0) {
        gl.useProgram(vornoiProgram.program);
        twgl.setBuffersAndAttributes(gl, vornoiProgram, vornoiBufferInfo);
        gl.bindFramebuffer(gl.FRAMEBUFFER, vornoiFrameBufferInfo.framebuffer);
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          vornoiFrameBufferInfo.attachments[0],
          0
        );
        //@ts-ignore
        // twgl.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, textureWidth, textureHeight);
        const uniforms = {
          u_stencil:stencilFrameBufferInfo.attachments[0],
          u_background_index: (offsets.length / 3) + 1
        }
        twgl.setUniforms(vornoiProgram, uniforms)
        //set the background 'color' to -1//
        gl.clearBufferiv(gl.COLOR, 0, new Int32Array([-1, 0, 0, 0]));
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clearDepth(1);
        gl.clear(gl.DEPTH_BUFFER_BIT);
        console.log("drawing voroni with array buffer ", vornoiBufferArrays);
        console.log("drawing voroni with buffer info", vornoiBufferInfo);
        gl.drawArraysInstanced(
          gl.TRIANGLE_FAN,
          0,
          //@ts-ignore
          vornoiBufferArrays.a_instance.data.length / vornoiBufferArrays.a_instance.numComponents,
          //@ts-ignore
          vornoiBufferArrays.a_position.data.length / vornoiBufferArrays.a_position.numComponents
        );
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.disable(gl.DEPTH_TEST);
        //@ts-ignore
        // this.debug("u_vornoi", this.vornoiFrameBufferInfo.attachments[0], (vornoiBufferArrays.a_position.data.length / vornoiBufferArrays.a_position.numComponents) + 1)
      }
    }
  }

  renderIntermediateTexture() {
    if (this) {
      const {
        gl,
        intermediateFrameBufferInfo,
        textureHeight,
        offsets,
        vornoiFrameBufferInfo,
        intermediateProgram,
        intermediateBufferInfo,
      } = this;
      // console.log("offsets on render: ", offsets);
      if (offsets.length > 0) {
        // console.log('drawing intermediate with ',gl,
        // intermediateFrameBufferInfo,
        // textureHeight,
        // offsets,
        // vornoiFrameBufferInfo,
        // intermediateProgram,
        // intermediateBufferInfo,)
        //read from the red texture, containing the voroni cells
        //write to the column texture, containing the column sums
        gl.useProgram(intermediateProgram.program);
        twgl.setBuffersAndAttributes(
          gl,
          intermediateProgram,
          intermediateBufferInfo
        );
        // twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
        // gl.viewport(0, 0, offsets.length / 2, textureHeight);
        gl.bindFramebuffer(
          gl.FRAMEBUFFER,
          intermediateFrameBufferInfo.framebuffer
        );
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          intermediateFrameBufferInfo.attachments[0],
          0
        );
        gl.bindTexture(gl.TEXTURE_2D, vornoiFrameBufferInfo.attachments[0]);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
      }
    }
  }

  transformFeedbackStep() {
    if (this) {
      const {
        gl,
        transformFeedbackProgram,
        feedbackVoaInfo,
        offsets,
        transformFeedback,
      } = this;
      //read from the intermediate textrue and use transfrom feedback to write to the buffer for the voroni program
      gl.useProgram(transformFeedbackProgram.program);
      twgl.setBuffersAndAttributes(
        gl,
        transformFeedbackProgram,
        feedbackVoaInfo
      );

      gl.enable(gl.RASTERIZER_DISCARD);

      gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, transformFeedback);
      gl.bindBufferBase(
        gl.TRANSFORM_FEEDBACK_BUFFER,
        0,
        this.vornoiBufferInfo.attribs!.a_position.buffer
      );
      gl.beginTransformFeedback(gl.POINTS);
      gl.bindTexture(
        gl.TEXTURE_2D,
        this.intermediateFrameBufferInfo.attachments[0]
      );
      gl.drawArrays(gl.POINTS, 0, offsets.length / 2);
      gl.endTransformFeedback();
      gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
      gl.bindVertexArray(null);
      //turn on using fragment shaders again
      gl.disable(gl.RASTERIZER_DISCARD);
      gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
  }

  debug(key:string, tex:WebGLTexture, colors:number[]) {
    if (this) {
      const { gl, quad, vornoiFrameBufferInfo } = this;
      if (colors.length > 0) {
        
        const vertexShaderSource = `#version 300 es
            layout(location = 0) in vec2 a_position;
            void main() {
              gl_Position = vec4(a_position, 0.0, 1.0);
            }
            `;
        const fragmentShaderSource = `#version 300 es
            precision mediump float;
            uniform vec3 colors[${colors.length}];
            uniform mediump isampler2D ${key};
            out vec4 outColor;
            void main() {
              ivec2 coord = ivec2(gl_FragCoord.xy);
              ivec4 t = texelFetch(${key}, coord, 0);
              outColor = vec4(colors[t.r], 1);
            }
            // `;

        const uniforms = {
          [key]: tex,
        };
        const debugProgramInfo = twgl.createProgramInfo(
          gl,
          [vertexShaderSource, fragmentShaderSource],
          {
            attribLocations: {
              a_position: 0,
            },
          }
        );

        const debugBufferArrays: twgl.Arrays = {
          a_position: {
            numComponents: 2,
            data: quad,
            drawType: gl.STATIC_DRAW,
          },
        };

        // const colors: number[] = [];
        // for (let i = 0; i < numberOfColors; i++) {
        //   colors.push(Math.random(), Math.random(), Math.random());
        // }
        const debugBufferInto = twgl.createBufferInfoFromArrays(
          gl,
          debugBufferArrays
        );
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(debugProgramInfo.program);
        // twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
        // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        twgl.setBuffersAndAttributes(gl, debugProgramInfo, debugBufferInto);
        const arrayUniform = gl.getUniformLocation(
          debugProgramInfo.program,
          "colors"
        );
        // console.log({colors})
        gl.uniform3fv(arrayUniform, new Float32Array(colors));
        twgl.setUniforms(debugProgramInfo, uniforms);
        gl.drawArrays(gl.TRIANGLES, 0, quad.length / 2);
      }
    }
  }

  initialRender(){
    if (this) {
      const {
        gl,
        vornoiProgram,
        vornoiFrameBufferInfo,
        vornoiBufferInfo,
        textureWidth,
        textureHeight,
        offsets,
        vornoiBufferArrays,
        stencilFrameBufferInfo
      } = this;
      // console.log("rendering with: ", {
      //   gl,
      //   vornoiProgram,
      //   vornoiFrameBufferInfo,
      //   textureWidth,
      //   textureHeight,
      //   offsets,
      //   vertex,
      // });
      if (offsets.length > 0) {
        gl.useProgram(vornoiProgram.program);
        twgl.setBuffersAndAttributes(gl, vornoiProgram, vornoiBufferInfo);
        gl.bindFramebuffer(gl.FRAMEBUFFER, vornoiFrameBufferInfo.framebuffer);
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          vornoiFrameBufferInfo.attachments[0],
          0
        );
        //@ts-ignore
        // twgl.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, textureWidth, textureHeight);
        const uniforms = {
          u_stencil:stencilFrameBufferInfo.attachments[0],
          u_background_index: (offsets.length / 3) + 1
        }
        twgl.setUniforms(vornoiProgram, uniforms)
        //set the background 'color' to -1//
        gl.clearBufferiv(gl.COLOR, 0, new Int32Array([-1, 0, 0, 0]));
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clearDepth(1);
        gl.clear(gl.DEPTH_BUFFER_BIT);
        console.log("drawing voroni with array buffer ", vornoiBufferArrays);
        console.log("drawing voroni with buffer info", vornoiBufferInfo);
        gl.drawArraysInstanced(
          gl.TRIANGLE_FAN,
          0,
          //@ts-ignore
          vornoiBufferArrays.a_instance.data.length / vornoiBufferArrays.a_instance.numComponents,
          //@ts-ignore
          vornoiBufferArrays.a_position.data.length / vornoiBufferArrays.a_position.numComponents
        );
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.disable(gl.DEPTH_TEST);
        //@ts-ignore
        // this.debug("u_vornoi", this.vornoiFrameBufferInfo.attachments[0], (vornoiBufferArrays.a_position.data.length / vornoiBufferArrays.a_position.numComponents) + 1)
      }
    }
  }

  render() {
    if (this) {
      const {
        // renderVornoi,
        // renderIntermediateTexture,
        // transformFeedbackStep,
        offsets,
        cycles,
      } = this;
      const debugColors:number[] = [];
      for (let i = 0; i < offsets.length / 3; i++) {
        debugColors.push(Math.random(), Math.random(), Math.random())
      }
      // for (let i = 0; i < cycles; i++) {
      setInterval(() => {

      
      this.renderVornoi();
      this.renderIntermediateTexture();
      this.transformFeedbackStep();
      this.debug("u_vornoi", this.vornoiFrameBufferInfo.attachments[0], debugColors)
      }, 400)
      // }
      // this.getPositions();
    }
  }
  getPositions() {
    if (this) {
      const { gl, offsets, vornoiBufferInfo } = this;
      const fence = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      setTimeout(waitForResult);
      function waitForResult() {
        const status = gl.clientWaitSync(fence!, 0, 0);
        if (
          status === gl.CONDITION_SATISFIED ||
          status === gl.ALREADY_SIGNALED
        ) {
          gl.deleteSync(fence);
          const output = new Float32Array(offsets.length);
          gl.bindBuffer(
            gl.ARRAY_BUFFER,
            vornoiBufferInfo.attribs!.a_position.buffer
          );
          gl.getBufferSubData(gl.ARRAY_BUFFER, 0, output);
          console.log({ output });
        } else {
          setTimeout(waitForResult);
        }
      }
      // gl.bindBuffer(
      //   gl.ARRAY_BUFFER,
      //   vornoiBufferInfo.attribs!.a_position.buffer
      // );
      // gl.getBufferSubData(
      //   gl.ARRAY_BUFFER,
      //   0, // byte offset into GPU buffer,
      //   results
      // );
      // console.log({ results });
      // // subscribers.forEach((subscriber) => subscriber(results));
      // gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
  }
}
