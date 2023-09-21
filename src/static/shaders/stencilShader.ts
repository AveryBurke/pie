export default {
    vertex:`#version 300 es

    in vec2 a_position;
    void main() {
        gl_Position = vec4(a_position.xy, 1.0, 1.0);
    }`,
    fragment: `#version 300 es

    precision highp float;

    out ivec4 outColor;

    void main() {
        outColor = ivec4(1, 1, 1, 1);   
    }`
} 