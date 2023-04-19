//hello my name is Lloyd Module
import * as twgl from "twgl.js";
type UpdateHandler = () => void
type Subscriber = (data: any) => void

function vornoiModual(): typeof mod {
    let nuclei: number[],
        boarder: number[],
        //for best preformance the voroni texture should be a perfect square
        textureWidth = 342,
        textureHeight = 342,
        numberOfCycles = 100,
        subscribers: Subscriber[] = [],

        render: UpdateHandler,
        updateNuclei: UpdateHandler,
        updateBoarder: UpdateHandler,
        updateTextureWidth: UpdateHandler,
        updateTextureHeight: UpdateHandler

    function mod() {
        const polygonVertexShaderSource = `#version 300 es
            layout (location = 0) in vec4 a_position;

            void main() {
            gl_Position = a_position * vec4(1, -1 , 1, 1);
            }
            `,

            //to do: assingIds to polygone sections
            polygoneFragmentShaderSource = `#version 300 es
            precision highp float;

            out ivec4 outColor;

            void main() {
                outColor.r = 2;   
            }`,

            voroni_vertex_shader_source = `#version 300 es

            layout(location = 1) in vec2 a_position;
            layout(location = 0) in vec3 a_instance;
            flat out int v_ID;
            void main() {
                v_ID = gl_InstanceID;
                gl_Position = vec4(a_instance.xy + a_position.xy * 2.0 - 1.0, a_instance.z, 1);
            }`,

            voroni_fragment_shader_srouce = `#version 300 es

            precision highp float;

            flat in int v_ID; 
            out ivec4 outColor;

            void main() {
                outColor.r = v_ID;   
            }`,

            sum_vertex_shader_source = `#version 300 es

            layout(location = 0) in vec2 a_texCoord;

            void main() {
                gl_Position = vec4(a_texCoord, 1, 1);
            }`,

            sum_fragment_shader_source = `#version 300 es
            precision highp float;

            uniform mediump isampler2D voroni;

            out vec4 color;

            void main() {
                ivec2 tex_size = textureSize(voroni, 0);
                int my_index = int(gl_FragCoord.x);

                float xSum = 0.0;
                int count = 0;
                float yCoord = gl_FragCoord.y;
                for (int x = 0; x < tex_size.x; x++) {
                    ivec4 t = texelFetch(voroni, ivec2(x, gl_FragCoord.y), 0);
                    if (t.r == my_index) {
                        xSum += float(x) + 0.5f;//<-- move to the pixel center
                        count += 1;
                    }
                }
                float ySum = float(count) * yCoord;
                color = vec4(xSum / float(tex_size.x), ySum / float(tex_size.y), float(count), 1.0);
            }`,

            feedback_source = `#version 300 es

            layout(location = 0) in vec2 a_origins;

            out vec2 a_position;

            uniform mediump isampler2D uSampler;
            uniform sampler2D summed;
            

            void main() {
                ivec2 tex_size = textureSize(summed, 0);
                float count = 0.0;

                for (int y = 0; y < tex_size.y; y++){
                    vec3 t = texelFetch(summed, ivec2(gl_VertexID, y), 0).xyz; 
                    // ivec4 pixelValue1 = texture(uSampler, tex_coord);
                        a_position += t.xy;
                        count += t.z;
                }
                    a_position /= count;
                    vec2 tex_coord = (a_position.xy + 1.0) / 2.0;
                    ivec4 pixelValue = texture(uSampler, tex_coord);
                    if (pixelValue.r != 1){
                        a_position = a_origins;
                    }
               
                // //if the sum shader wasn't able to locate the cell,
                // //put the seed back into the buffer
                // if (count == 0.0){
                //     a_position = a_origins;
                // }
            }`,

            feedback_fragment_shader = `#version 300 es
            precision highp float;

            void main() {
            discard;
            }`,

            gl = document.createElement('canvas').getContext('webgl2')!,
            quad = new Float32Array([-
                1, -1, 1, -1, -1, 1,
                1, -1, 1, 1, -1, 1
            ])

        if (!gl.getExtension("EXT_color_buffer_float")) {
            console.log('voroni error: color extention does not exist')
        }

        if (!gl.getExtension("WEBGL")) {

        }

        let numberOfSites = nuclei.length / 2,

            //buffer arrays
            voroniBufferArrays = {
                a_position: {
                    numComponents: 2,
                    divisor: 1,
                    data: new Float32Array(nuclei),
                    drawType: gl.DYNAMIC_DRAW
                },
                a_instance: {
                    numComponents: 3,
                    data: createCone(36)
                }
            },

            sumBufferArrays = {
                a_texCoord: {
                    numComponents: 2,
                    data: quad,
                }
            },
            polygoneBufferArrays = {
                a_position: {
                    numComponents: 2,
                    data: new Float32Array(boarder),
                    drawType: gl.STATIC_DRAW
                }
            },
            //keep the origins in a seperate buffer,
            //if the sum shader wasn't able to find a site,
            //then the feedback source program will pull the origin point from this buffer
            //and re-insert the missing site back at its origin point
            originsArray = {
                a_origins: {
                    numComponents: 2,
                    data: new Float32Array(nuclei),
                }
            },
            voroniProgramInfo = twgl.createProgramInfo(gl, [voroni_vertex_shader_source, voroni_fragment_shader_srouce], {
                attribLocations: {
                    "a_position": 1,
                    "a_instance": 0
                }
            }),
            summationProgramInfo = twgl.createProgramInfo(gl, [sum_vertex_shader_source, sum_fragment_shader_source], {
                attribLocations: {
                    "a_texCoord": 0
                }
            }),
            feedbackProgramInfo = twgl.createProgramInfo(gl, [feedback_source, feedback_fragment_shader], {
                transformFeedbackVaryings: ["a_position"],
                attribLocations: {
                    "a_origins": 1,
                    "a_position": 0,
                }
            }),
            polygonProgram = twgl.createProgramInfo(gl, [polygonVertexShaderSource, polygoneFragmentShaderSource], {
                attribLocations: {
                    "a_position": 0
                }
            }),
            voroniBufferInfo = twgl.createBufferInfoFromArrays(gl, voroniBufferArrays),
            sumBufferInfo = twgl.createBufferInfoFromArrays(gl, sumBufferArrays),
            originsBufferInfo = twgl.createBufferInfoFromArrays(gl, originsArray),
            polygonBufferInfo = twgl.createBufferInfoFromArrays(gl, polygoneBufferArrays),

            vaoInfo = twgl.createVertexArrayInfo(gl, feedbackProgramInfo, voroniBufferInfo),

            polygonFrameBufferInfo = twgl.createFramebufferInfo(gl, [
                //store only integer and only on the values on the red channel
                { internalFormat: gl.R32I, format: gl.RED_INTEGER, type: gl.INT, minMag: gl.NEAREST, }
            ], textureWidth, textureHeight),

            voroniFrameBuffer = twgl.createFramebufferInfo(gl, [
                //store only integer and only on the values on the red channel
                { internalFormat: gl.R32I, format: gl.RED_INTEGER, type: gl.INT, minMag: gl.NEAREST, },
                { attachmentPoint: gl.DEPTH_ATTACHMENT, internalFormat: gl.DEPTH_COMPONENT24, format: gl.DEPTH_COMPONENT },
            ], textureWidth, textureHeight),

            sumFrameBufferInfo = twgl.createFramebufferInfo(gl, [
                //store floating point vec4 values
                {
                    internalFormat: gl.RGBA32F,
                    format: gl.RGBA,
                    type: gl.FLOAT,
                    minMag: gl.NEAREST
                }], numberOfSites, textureHeight),
            tf = gl.createTransformFeedback()
        gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, tf)
        //bind hte voroni buffer to the transfrom feedback object
        //the feedback program will write to this buffer
        gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, voroniBufferInfo.attribs!.a_position.buffer)
        gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null)
        gl.bindBuffer(gl.ARRAY_BUFFER, null)

        //update hanlders
        updateNuclei = function () {
            gl.deleteBuffer(voroniBufferInfo.attribs!.a_position.buffer)
            gl.deleteBuffer(originsBufferInfo.attribs!.a_origins.buffer)
            gl.deleteVertexArray(vaoInfo.vertexArrayObject!)
            voroniBufferArrays.a_position.data = new Float32Array(nuclei)
            originsArray.a_origins.data = new Float32Array(nuclei)
            voroniBufferInfo = twgl.createBufferInfoFromArrays(gl, voroniBufferArrays)
            originsBufferInfo = twgl.createBufferInfoFromArrays(gl, originsArray)
            vaoInfo = twgl.createVertexArrayInfo(gl, feedbackProgramInfo, originsBufferInfo)
            if (nuclei.length / 2 !== numberOfSites) {
                numberOfSites = nuclei.length / 2
                //this must take some overhead, right?
                gl.deleteTexture(sumFrameBufferInfo.attachments[0])
                gl.deleteFramebuffer(sumFrameBufferInfo.framebuffer)

                sumFrameBufferInfo = twgl.createFramebufferInfo(gl, [
                    //store floating point vec4 values
                    {
                        internalFormat: gl.RGBA32F,
                        format: gl.RGBA,
                        type: gl.FLOAT,
                        minMag: gl.NEAREST
                    }], numberOfSites, textureHeight)

            }
            gl.deleteTransformFeedback(tf)
            tf = gl.createTransformFeedback()
            gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, tf)
            gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, voroniBufferInfo.attribs!.a_position.buffer)
            gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null)
            gl.bindBuffer(gl.ARRAY_BUFFER, null)

        }

        updateBoarder = function () {
            gl.deleteBuffer(polygonBufferInfo.attribs!.a_position.buffer)
            polygoneBufferArrays.a_position.data = new Float32Array(boarder)
            polygonBufferInfo = twgl.createBufferInfoFromArrays(gl, voroniBufferArrays)
            renderBackground()
        }

        updateTextureWidth = function () {
            console.log('new textrue width: ', textureWidth)
        }
        updateTextureHeight = function () {
            console.log('new texture height: ', textureHeight)
        }

        render = function () {
            gl.flush()
            for (let i = 0; i < numberOfCycles; i++) {
                renderCycle()
                gl.flush()
            }
            updateSubscribers()
        }

        //boot
        renderBackground()
        //helper funcitons
        function renderCycle() {
            gl.useProgram(voroniProgramInfo.program)
            twgl.setBuffersAndAttributes(gl, voroniProgramInfo, voroniBufferInfo)
            gl.bindFramebuffer(gl.FRAMEBUFFER, voroniFrameBuffer.framebuffer)
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, voroniFrameBuffer.attachments[0], 0)
            twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
            gl.viewport(0, 0, textureWidth, textureHeight)

            //set the background 'color' to -1//
            gl.clearBufferiv(gl.COLOR, 0, new Int32Array([-1, 0, 0, 0]))
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.clearDepth(1)
            gl.clear(gl.DEPTH_BUFFER_BIT)
            gl.drawArraysInstanced(gl.TRIANGLE_FAN, 0, voroniBufferArrays.a_instance.data.length / 3, voroniBufferArrays.a_position.data.length / 2)
            gl.bindFramebuffer(gl.FRAMEBUFFER, null)
            gl.bindBuffer(gl.ARRAY_BUFFER, null)
            gl.disable(gl.DEPTH_TEST)
            //progam2, read from the integer textrue and write to the sum texture (floating point textrue)
            gl.useProgram(summationProgramInfo.program)
            twgl.setBuffersAndAttributes(gl, summationProgramInfo, sumBufferInfo)

            twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
            gl.viewport(0, 0, numberOfSites, textureHeight)
            gl.bindFramebuffer(gl.FRAMEBUFFER, sumFrameBufferInfo.framebuffer)
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, sumFrameBufferInfo.attachments[0], 0)
            gl.bindTexture(gl.TEXTURE_2D, voroniFrameBuffer.attachments[0])
            gl.drawArrays(gl.TRIANGLES, 0, 6)
            gl.bindFramebuffer(gl.FRAMEBUFFER, null)
            gl.bindBuffer(gl.ARRAY_BUFFER, null)
            //program 3, read from the sum textrue and use transfrom feedback to write to the buffer for the voroni program
            gl.useProgram(feedbackProgramInfo.program)
            twgl.setBuffersAndAttributes(gl, feedbackProgramInfo, vaoInfo)

            gl.enable(gl.RASTERIZER_DISCARD);

            gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, tf);
            gl.beginTransformFeedback(gl.POINTS)
            twgl.setUniforms(feedbackProgramInfo,{
                summed:sumFrameBufferInfo.attachments[0],
                uSampler:polygonFrameBufferInfo.attachments[0],
            })
            // gl.bindTexture(gl.TEXTURE_2D, sumFrameBufferInfo.attachments[0])
            // gl.bindTexture(gl.TEXTURE_2D, polygonFrameBufferInfo.attachments[0])
            gl.drawArrays(gl.POINTS, 0, numberOfSites)
            gl.endTransformFeedback();
            gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
            gl.bindVertexArray(null)
            //turn on using fragment shaders again
            gl.disable(gl.RASTERIZER_DISCARD)
            gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null)
            gl.bindBuffer(gl.ARRAY_BUFFER, null)
            gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        }

        function renderBackground() {
            gl.useProgram(polygonProgram.program)
            twgl.setBuffersAndAttributes(gl, polygonProgram, polygonBufferInfo)
            gl.bindFramebuffer(gl.FRAMEBUFFER, polygonFrameBufferInfo.framebuffer)
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, polygonFrameBufferInfo.attachments[0], 0)
            twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
            gl.viewport(0, 0, textureWidth, textureHeight);
            //render the polygon to the textrue
            gl.drawArrays(gl.TRIANGLES, 0, boarder.length / 2);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        }

        function createCone(edges: number) {
            const vertices = new Array();
            vertices[0] = 0;
            vertices[1] = 0;
            vertices[2] = -1;
            for (let i = 0; i <= edges; i++) {
                const angle = 2 * Math.PI * i / edges;
                vertices[i * 3 + 3] = Math.cos(angle);
                vertices[i * 3 + 4] = Math.sin(angle);
                vertices[i * 3 + 5] = 1;
            }
            return vertices;
        }

        function updateSubscribers() {
            gl.flush()
            const results = new Float32Array(numberOfSites * 2);
            gl.bindBuffer(gl.ARRAY_BUFFER, voroniBufferInfo.attribs!.a_position.buffer,);
            gl.getBufferSubData(
                gl.ARRAY_BUFFER,
                0,    // byte offset into GPU buffer,
                results,
            )
            subscribers.forEach(subscriber => subscriber(results))
            gl.bindBuffer(gl.ARRAY_BUFFER, null)
        }

    }

    mod.numberOfCycles = function (value: number) {
        numberOfCycles = value
        return mod
    }

    mod.nuclei = function (value: number[]): typeof mod {
        nuclei = value
        if (typeof updateNuclei === 'function') updateNuclei()
        return mod
    }
    mod.boarder = function (value: number[]): typeof mod {
        boarder = value
        if (typeof updateBoarder === 'function') updateBoarder()
        return mod
    }
    mod.textureWidth = function (value: number): typeof mod {
        textureWidth = value
        if (typeof updateTextureWidth === 'function') updateTextureWidth()
        return mod
    }
    mod.textureHeight = function (value: number): typeof mod {
        textureHeight = value
        if (typeof updateTextureHeight === 'function') updateTextureHeight()
        return mod
    }
    mod.render = function (): typeof mod {
        if (typeof render === 'function') render()
        return mod
    }

    mod.subscribe = function (value: Subscriber) {
        subscribers = [...subscribers, value]
        return mod
    }

    return mod
}

export default vornoiModual