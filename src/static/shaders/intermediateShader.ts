export default {
    vertex:  `#version 300 es

    layout(location = 0) in vec2 a_texCoord;

    void main() {
        gl_Position = vec4(a_texCoord, 1, 1);
    }`,

    fragment:`#version 300 es
    precision highp float;

    uniform mediump isampler2D voroni;

    out vec4 color;

    void main() {
        ivec2 tex_size = textureSize(voroni, 0);
        int my_index = int(gl_FragCoord.x);
        color = vec4(0.0, 0.0, 0.0, 1.0);
        ivec2 coord;
        ivec4 t;
        int id;
        for (int x = 0; x < tex_size.x; x++) {
            coord = ivec2(x, gl_FragCoord.y);
            t = texelFetch(voroni, coord, 0);
            id = t.r;
            if (id == my_index) {
                color.xy += vec2(coord) + 0.5;
                color.z += 1.0;
            }
        }
        color.xy /= float(tex_size);
    }`,
}