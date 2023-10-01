import { 
    symbol,
    symbolCircle,
    symbolTriangle,
    symbolSquare,
    symbolCross,
    symbolDiamond,
    symbolStar,
    symbolWye, 
    SymbolType } from "d3-shape";

//return all the 
const shapes = (symbolName:SymbolName, radius:number):string => {

    const area = Math.PI * (radius * radius)
    const symbols:{[keys in SymbolName]:SymbolType} = {
        circle: symbolCircle,
        triangle:symbolTriangle,
        square:symbolSquare,
        cross:symbolCross,
        diamond:symbolDiamond,
        star:symbolStar,
        wye:symbolWye
    }
    return symbol(symbols[symbolName], area)() || 'empty'
}

export default shapes