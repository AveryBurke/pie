export default {
  vertex: `#version 300 es

    layout(location = 2) in int a_arc_id;
    layout(location = 1) in vec2 a_position;
    layout(location = 0) in vec3 a_instance;
    flat out ivec2 v_ID;
    void main() {
        v_ID = ivec2(gl_InstanceID, a_arc_id);
        gl_Position = vec4(a_instance.xy + vec2(a_position.x, a_position.y), a_instance.z, 1);
    }`,

  fragment: `#version 300 es

    precision highp float;

    uniform mediump isampler2D u_stencil;
    uniform int u_background_index;
    flat in ivec2 v_ID; 
    out ivec4 outColor;
    
    void main() {
        ivec2 coord = ivec2(gl_FragCoord.x, gl_FragCoord.y);
        ivec4 t = texelFetch(u_stencil, coord, 0);
        if (t.r == v_ID.y){
            outColor.r = v_ID.x; 
        } else {
          outColor.r = -1;
        }
    }`,
};
