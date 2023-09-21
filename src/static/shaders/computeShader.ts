
export default({
    label: "Voroni Shader",
    code: `
    @group(0) @binding(0) var<uniform> grid: vec2f;

    @group(0) @binding(1) var<storage> cellStateIn: array<u32>;
    @group(0) @binding(2) var<storage, read_write> cellStateOut: array<u32>;
    @group(0) @binding(3) var<storage, read> inputState: array<u32>;

    //find the cell index. handle out of bounds by "wrapping" the index around the grid
    fn cellIndex(cell: vec2u) -> u32 {
        return (cell.y % u32(grid.y)) * u32(grid.x) +
               (cell.x % u32(grid.x));
      }
    
    fn cellActive(x: u32, y: u32) -> u32 {
        return cellStateIn[cellIndex(vec2(x, y))];
      }

    @compute @workgroup_size(16, 16)
    fn computeMain(@builtin(global_invocation_id) cell: vec3u){
        let i = cellIndex(cell.xy);
        let activeNeighbors = cellActive(cell.x+1, cell.y+1) +
                    cellActive(cell.x+1, cell.y) +
                    cellActive(cell.x+1, cell.y-1) +
                    cellActive(cell.x, cell.y-1) +
                    cellActive(cell.x-1, cell.y-1) +
                    cellActive(cell.x-1, cell.y) +
                    cellActive(cell.x-1, cell.y+1) +
                    cellActive(cell.x, cell.y+1);
        /* if the user has selected a cell, then the value for that cell index, in the input state, will be 1 for this round of rendering.
        * then an Xor of the input state and current state will produce the desired result of 
        * flipping the cell state only when the input state is 1. Then the user input takes prefrence of the state update for
        * this render*/
        switch activeNeighbors {
            case 2: {
                cellStateOut[i] = inputState[i] ^ cellStateIn[i];
            }
            case 3: {
                cellStateOut[i] = inputState[i] ^ 1;
            }
            default: {
                cellStateOut[i] = inputState[i] ^ 0;
            }
            }
            
    }
    `
})