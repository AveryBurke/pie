import * as twgl from "twgl.js";
import stencilShaderSource from "./shaders/stencilShader";
import createCone from "./createCone";
import vornoiShader from "./shaders/vornoiShader";
import intermediateShader from "./shaders/intermediateShader";
import tfShader from "./shaders/transformFeedbackShader";
export default class VornoiMesh {
  transformFeedback: WebGLTransformFeedback;
  textureWidth: number;
  textureHeight: number;
  cycles: number;
  stencil: number[] = [];
  offsets: number[] = [];
  offsetArcIds: number[] = [];
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
  callBack: (input: Float32Array) => void;

  constructor(
    gl: WebGL2RenderingContext,
    textureWidth: number,
    textureHeight: number,
    cycles: number,
    callback: (input: Float32Array) => void
  ) {
    this.textureWidth = textureWidth;
    this.textureHeight = textureHeight;
    this.cycles = cycles;
    this.gl = gl;
    this.callBack = callback;
    this.transformFeedback = gl.createTransformFeedback()!;
  
    if (!gl.getExtension("EXT_color_buffer_float")) {
      console.error("voroni error: color extention does not exist");
    }
    let redExt:WEBGL_compressed_texture_etc | EXT_texture_compression_rgtc | null = gl.getExtension("WEBGL_compressed_texture_etc") || gl.getExtension('EXT_texture_compression_rgtc')
    if (!redExt){
      console.error("compressed textures not supported on this machine")
    }
    console.log({redExt})
    // let floatExtention = gl.getExtension("EXT_texture_compression_bptc")
    // if (!floatExtention){
    //   console.error("compressed floating point texture not avaiable on this machine")
    // }


    
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
        numComponents: 3,
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
          a_arc_id: 2,
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
      a_position: {
        numComponents: 2,
        divisor: 1,
        data: new Float32Array([...this.offsets]),
        drawType: gl.DYNAMIC_DRAW,
      },
      a_arc_id: {
        numComponents: 1,
        divisor: 1,
        data: new Int32Array([...this.offsetArcIds]),
        drawType: gl.DYNAMIC_DRAW,
      },
      a_instance: {
        numComponents: 3,
        data: createCone(36),
      },
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

  /**
   * @param stencil [x1 ,y1, id1, ... xn, yn, idn]
   * where 'x' and 'y' are vertexes of a trianguled polygone and 'id' is a unique integer id of the particluar polygone to which the vertex pair belong
   */
  updateStencil(stencil: number[]) {
    this.stencil = stencil;
    this.stencilBufferArrays = {
      a_position: {
        numComponents: 3,
        data: new Float32Array(this.stencil),
        drawType: this.gl.STATIC_DRAW,
      },
    };
    this.gl.deleteBuffer(this.stencilBufferInfo.attribs!.a_position.buffer);
    this.gl.deleteTexture(this.stencilFrameBufferInfo.attachments[0])
    this.gl.deleteFramebuffer(this.stencilFrameBufferInfo.framebuffer)
    this.stencilBufferInfo = twgl.createBufferInfoFromArrays(
      this.gl,
      this.stencilBufferArrays
    );
    this.stencilFrameBufferInfo = twgl.createFramebufferInfo(
      this.gl,
      [
        //we only need 1 and 0 for the stencil.
        {
          internalFormat: this.gl.R32I,
          format: this.gl.RED_INTEGER,
          type: this.gl.INT,
          minMag: this.gl.NEAREST,
        },
      ],
      this.textureWidth,
      this.textureHeight
    );

   
  }

  /**
   *
   * @param offsets [x1, y1, ... xn, yn] cooridnates of the seed points for the initial vornoi cells
   * @param offsetArcIds [id1, id1, ... idn, idn] length = offsets.length / 2. integer ids of the polygone boundry the contains the corresponding x, y offests.
   */
  updateOffsets(offsets: number[], offsetArcIds: number[]) {
    // const { gl, textureHeight, transformFeedback, vornoiBufferArrays } = this
    this.gl.deleteTexture(this.intermediateFrameBufferInfo.attachments[0])
    this.gl.deleteFramebuffer(this.intermediateFrameBufferInfo.framebuffer);
    this.gl.deleteBuffer(this.vornoiBufferInfo.attribs!.a_position.buffer)
    this.gl.deleteBuffer(this.vornoiBufferInfo.attribs!.a_arc_id.buffer)
    this.gl.deleteTransformFeedback(this.transformFeedback)
    this.offsets = offsets;
    this.offsetArcIds = offsetArcIds;
    this.vornoiBufferArrays = {
      ...this.vornoiBufferArrays,
      a_position: {
        numComponents: 2,
        divisor: 1,
        data: new Float32Array(offsets),
        drawType: this.gl.DYNAMIC_DRAW,
      },
      a_arc_id: {
        numComponents: 1,
        divisor: 1,
        data: new Int32Array(offsetArcIds),
        drawType: this.gl.DYNAMIC_DRAW,
      },
    };
    this.vornoiBufferInfo = twgl.createBufferInfoFromArrays(
      this.gl,
      this.vornoiBufferArrays
    );
 
    this.intermediateFrameBufferInfo = twgl.createFramebufferInfo(
      this.gl,
      [
        //store floating point vec4 values
        {
          internalFormat: this.gl.RGBA32F,
          format: this.gl.RGBA,
          type: this.gl.FLOAT,
          minMag: this.gl.NEAREST,
        },
      ],
      //@ts-ignore
      this.vornoiBufferArrays.a_position.data.length / this.vornoiBufferArrays.a_position.numComponents,
      this.textureHeight
    );
    this.transformFeedback = this.gl.createTransformFeedback()!
    
    this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, this.transformFeedback);
    //bind hte voroni buffer to the transfrom feedback object
    //the feedback program will write to this buffer
    this.gl.bindBufferBase(
      this.gl.TRANSFORM_FEEDBACK_BUFFER,
      0,
      this.vornoiBufferInfo.attribs!.a_position.buffer
    );
    this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, null);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }

  /**
   * render the background polygones to an uint texture. Each poly gone will be colored accroding to its unique integer id
   */
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
      gl.viewport(0, 0, textureWidth, textureHeight);
      gl.clearBufferiv(gl.COLOR, 0, new Int32Array([-1, 0, 0, 0]));
      gl.drawArrays(
        gl.TRIANGLES,
        0,
        stencil.length / stencilBufferInfo.attribs!.a_position!.numComponents!
      );
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      // this.debug("u_stencil", this.stencilFrameBufferInfo.attachments[0], 100)
    }
  }
  /**
   * render vornoi cells to a uint texture. Each cell is colord according to its index in the offsets array. this servers as its unique id.
   * each cell will only be drawn to the canvas if its corresponding arc_id matches the id of the pixel from the stencil texture
   */
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
        stencilFrameBufferInfo,
      } = this;
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
        gl.viewport(0, 0, textureWidth, textureHeight);
        const uniforms = {
          u_stencil: stencilFrameBufferInfo.attachments[0],
          u_background_index: offsets.length / 3 + 1,
        };
        twgl.setUniforms(vornoiProgram, uniforms);
        //set the background 'color' to -1//
        gl.clearBufferiv(gl.COLOR, 0, new Int32Array([-1, 0, 0, 0]));
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clearDepth(1);
        gl.clear(gl.DEPTH_BUFFER_BIT);
        gl.drawArraysInstanced(
          gl.TRIANGLE_FAN,
          0,
          //@ts-ignore
          vornoiBufferArrays.a_instance.data.length /
            //@ts-ignore
            vornoiBufferArrays.a_instance.numComponents,
          //@ts-ignore
          vornoiBufferArrays.a_position.data.length /
            //@ts-ignore
            vornoiBufferArrays.a_position.numComponents
        );
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.disable(gl.DEPTH_TEST);
        //@ts-ignore
        // this.debug("u_vornoi", this.vornoiFrameBufferInfo.attachments[0], (vornoiBufferArrays.a_position.data.length / vornoiBufferArrays.a_position.numComponents) + 1)
      }
    }
  }

  /**
   * render sums to a texture that has deminention number_of_cells X vornoi_texture_height.
   * where the "columns" (the x coordinates) are the id of each vornoi cell and the "rows" (the y coordinates) are the sum of all that cell's pixles along the coresponding row in the vornoi texture
   */
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
      if (offsets.length > 0) {
        //read from the red texture, containing the voroni cells
        //write to the column texture, containing the column sums
        gl.useProgram(intermediateProgram.program);
        twgl.setBuffersAndAttributes(
          gl,
          intermediateProgram,
          intermediateBufferInfo
        );
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

  /**
   * sum along the columns of the intermediate texture and write the resulting vec2 into the vornoi buffer to seed the next round
   */
  transformFeedbackStep() {
    if (this) {
      const {
        gl,
        transformFeedbackProgram,
        feedbackVoaInfo,
        offsets,
        transformFeedback,
      } = this;
      //read from the intermediate texture and use transfrom feedback to write to the buffer for the voroni program
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

  /**
   * @param key name of a sampler uniform;
   * @param tex the texture to samplel
   * @param colors array of RGB colors. One for each unique value to display;
   * @returns displays the data on a uint texture using the provided colros;
   * 
   * 
   * ex:
   *  for (let i = 0; i < offsets.length / 2; i++) {
          debugColors.push(Math.random(), Math.random(), Math.random())
      }
   *   ... RUN RENDER CYCLE ...
   *   this.debug("u_vornoi", this.vornoiFrameBufferInfo.attachments[0], debugColors)
   */
  debug(key: string, tex: WebGLTexture, colors: number[]) {
    if (this) {
      const { gl, quad } = this;
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
        const debugBufferInto = twgl.createBufferInfoFromArrays(
          gl,
          debugBufferArrays
        );

        gl.useProgram(debugProgramInfo.program);
        twgl.setBuffersAndAttributes(gl, debugProgramInfo, debugBufferInto);
        const arrayUniform = gl.getUniformLocation(
          debugProgramInfo.program,
          "colors"
        );
        gl.uniform3fv(arrayUniform, new Float32Array(colors));
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        twgl.setUniforms(debugProgramInfo, uniforms);
        gl.drawArrays(gl.TRIANGLES, 0, quad.length / 2);
      }
    }
  }

  render() {
    if (this) {
      const { cycles, offsets } = this;
      // const debugColors:number[] = []
      // for (let i = 0; i < offsets.length / 2; i++) {
      //     debugColors.push(Math.random(), Math.random(), Math.random())
      // }
      for (let i = 0; i < cycles; i++) {
        this.gl.flush()
        this.renderVornoi();
        this.renderIntermediateTexture();
        this.transformFeedbackStep();
      }
      // this.debug("u_vornoi", this.vornoiFrameBufferInfo.attachments[0], debugColors)
      this.getPositions();
    }
  }

  getPositions() {
    if (this) {
      const { gl, offsets, vornoiBufferInfo, callBack } = this;
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
          callBack(output);
        } else {
          setTimeout(waitForResult);
        }
      }
    }
  }
}
