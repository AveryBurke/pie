// import type chart from "../src/d3/pizza";
declare type Chart = ReturnType<typeof import("../src/d3/pizza").pizzaChart>

// {
//     (selection: d3.Selection<HTMLDivElement, any, any, any>): void
//     data(value:any[]):Chart
//     sliceKey(value:string):Chart
//     sliceSet(value:string[]):Chart
//     sliceColors(value: {[slice:string]:string[]}):Chart
//     ringKey(value:string):Chart
//     ringSet(value:string[]):Chart
//     margin(value:Margin):Chart,
//     canvasWidth(value:number):Chart
//     canvasHeight(value:number):Chart
// } 

declare type Arc = {
    path: string;
    boarder: [number, number][];
    centroid: [number, number];
    nucleus: number[];
    id: string;
    arcCount: number;
    sliceCount: number;
    ringCount: number;
    slice: string;
    ring: string;
    startAngle: number;
    endAngle: number;
    innerRadius: number;
    outerRadius: number;
    theta?: number;
}

type Datum = {id:string, x:number, y:number, colorValue:string, shapeValue:string}

declare type Margin = {
    top: number,
    right: number,
    bottom: number,
    left: number
}

declare type UpdateHandler = () => void

declare type SymbolName = "circle" |  "triangle" | "square" | "diamond" | "star" | "wye" | "cross"

declare type Msg = 'duration' | 'sections'

declare type ActionType =
    'update_parameter_key' |
    'update_parameter_set' |
    'update_parameter_scale' |
    'update_data' |
    'update_state' |
    'reset_parameter'

declare type ChartAction = 
    `update_chart_${ParameterType}_key` | 
    `update_chart_${ParameterType}_set` | 
    `update_chart_${ParameterType}_scale` |
    'update_chart_data'

declare type FilterActionType = 
    'update_filter_key' | 
    'update_filter_set' |
    'update_filter_selected' |
    'reset_filter'

interface FilterAction<A extends FilterActionType, T>{
    type:A,
    payload: T
}

interface Action<A extends ActionType, T> {
    type: A
    payload: T
}

interface LastChargePossibl<A extends ActionType, P>{
    type: A,
    parameter?:P
}

declare type ActionUpdateData = Action<'update_data', any[]>
declare type ActionUpdateParameterKey = Action<'update_parameter_key', {parameter:ParameterType, key:string}>
declare type ActionUpdateParameterSet = Action<'update_parameter_set', {parameter:ParameterType, set:string[]}>
declare type ActionUpdateParameterScale = Action<'update_parameter_scale', {parameter:ParameterType, scale:{[key:string]:string}}>
declare type ActionUpdateState = Action<'update_state', State>
declare type ActionResetParameter = Action<'reset_parameter', {parameter:ParameterType, initialState:State}>

declare type FilterActionUpdateKey = FilterAction<'update_filter_key', {key:string}>
declare type FilterActionUpdateSet = FilterAction<'update_filter_set', {set:string[]}>
declare type FilterActionUpdateSelected = FilterAction<'update_filter_selected', {selected:{[key:string]:boolean}}>
declare type FilterActionReset = FilterAction<'reset_filter', {initialState:Filter}>

type LastChargeParameter = LastChargePossibl<'update_parameter_key' | 'update_parameter_set' | 'update_parameter_scale' | 'reset_parameter', ParameterType>
type LastChangeNoParameter = LastChargePossibl<'update_data' | 'update_state', null>

type LastChange = LastChargeParameter | LastChangeNoParameter

declare type Disparcth =
    ActionUpdateData |
    ActionUpdateParameterKey |
    ActionUpdateParameterSet |
    ActionUpdateParameterScale |
    ActionUpdateState |
    ActionResetParameter

declare type FilterDispatch = 
    FilterActionReset |
    FilterActionUpdateKey |
    FilterActionUpdateSet |
    FilterActionUpdateSelected 

interface Task<M extends Msg, I> {
    input: I
    type: M
}

declare interface QueueInterface<T> {
    size: () => number
    enqueue: (input: T) => void,
    dequeue: () => T | undefined
}

declare type ChangeDuration = Task<'duration', number>
declare type UpdateSections = Task<'sections', Section[]>
declare type QueueTask = ChangeDuration | UpdateSections
declare type Section = {
    id: string,
    fill: string,
    startAngle:number,
    endAngle:number,
    innerRadius:number,
    outerRadius:number
}

declare type ParameterType = 'ring' | 'slice' | 'color'
declare type Parameter = {[key in ParameterType]:{
    key:string,
    set:string[],
    counts:{[key:stirng]:number}
    pallet:{[key:string]:`#${string}`[]}
    scale:{[key:string]:string}
}}

declare type State = {
    parameters:Parameter,
    data: any[],
    lastChange:LastChange
}

declare type Filter = {
    key:string,
    set:string[],
    selected:{[key:string]:boolean},
    lastChange:FilterActionType
}

type Values = {
    state: State
    dispatch: React.Dispatch<Disparcth>
    refChart:Chart
  }

type ComponenetPropsType = { initialValues : string[], selected?: { [key: string]: boolean } , handleSort:(set:string[]) => void | undefined, counts?:{[key:string]:{currentCount:number, previousCount:number}}, optionalDivs:?(input:any, key:string) => JSX.Element }



