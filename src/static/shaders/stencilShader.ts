export default {
    vertex:`#version 300 es

    in vec3 a_position; //x and y are positions and z is id
    flat out int v_ID;
    void main() {
        v_ID = int(a_position.z);
        gl_Position = vec4(a_position.xy, 1.0, 1.0);
    }`,
    fragment: `#version 300 es

    precision highp float;
    flat in int v_ID; 
    out ivec4 outColor;

    void main() {
        outColor = ivec4(v_ID, 0, 0, 1);   
    }`
} 