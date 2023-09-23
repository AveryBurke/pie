export default {
    vertex:`#version 300 es
    
    out vec2 a_position;

    uniform sampler2D summed;

    void main() {
        ivec2 tex_size = textureSize(summed, 0);
        float count = 0.0;
        a_position = vec2(0.0);
        for (int y = 0; y < tex_size.y; y++){
            vec3 t = texelFetch(summed, ivec2(gl_VertexID, y), 0).xyz; 
            a_position += t.xy;
            count += t.z;
        }
        /* 
        * these coordinates are normalized betwen 0 and 1 by the previous shader. 
        * but they're being put into back into a vertex buffer
        * so they need to be re-normalized to vertex coords (between -1 and 1)
        */
        if (int(count) > 0){
            a_position  = (a_position / count) * 2.0 - 1.0;
        }
    }`,
    fragment:`#version 300 es
    precision highp float;

    void main() {
    discard;
    }`
}