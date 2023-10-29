
declare type SymbolName = "circle" | "triangle" | "square" | "diamond" | "star" | "wye" | "cross";

/** ****types for the chart**** */

/** the chart is the inner function of a closer. 
 * it exposes setter methods that change variable values in the outer function and call update handlers in order to change the chart appropriately
 * @see https://www.toptal.com/d3-js/towards-reusable-d3-js-charts
 * */
declare type Chart = ReturnType<typeof import("../src/d3/pizza").pizzaChart>;

/**
 * used by the chart
 * @see https://observablehq.com/@d3/margin-convention
 */
declare type Margin = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};
/**
 * used by chart setter methods.
 * updates definitions and calulculations for the next chart state.
 */
declare type UpdateHandler = () => void;

/**
 * d3 symbol names
 * used by Shapes.ts
 * @see https://d3js.org/d3-shape/symbol
 */


/** ***Types for the app state*** 
 * Each sidebar componenet corresponds to a slice of the app state.
 * When a component changes the new data is dispatched to a reducer which changes the state object and logs the change it just made using the state's lastChagne feild.
 * Any changes to the lastChange feild will fire an update hook which propagates any required further state changes and passes a command to useChartUpdates
 * where the latest data is indexed from state and passed to the chart.
*/

/**
 * state.data is an array of users. Used by makeState.ts; a unique id and a value for each parameter (defined below) is added to each user.
 */
declare type User = {
	birthMonth: "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December" | "Smarch";
	birthDay: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
	email: string;
	name: string;
	chirality: "left handed" | "right handed";
	subscriptionTier: "free" | "basic" | "business";
	buildingNumber: "bld_1" | "bld_2" | "bld_3" | "bld_4" | "bld_5";
};

/** used by useChartUpdates.ts */
declare type ChartAction =
	| `update_chart_${ParameterType}_key`
	| `update_chart_${ParameterType}_set`
	| `update_chart_${ParameterType}_scale`
	| "update_chart_data";

/** types for filtering  */

/** used by useFilterUpdates; filterReducer and FilterContext */
declare type FilterActionType = "update_filter_key" | "update_filter_set" | "update_filter_selected" | "reset_filter";

/** the payload of a filter action depends on the type */
interface FilterAction<A extends FilterActionType, T> {
	type: A;
	payload: T;
}
/** change the current filter key. in a tabular modle the filter key is the header of the column against which to filter the data */
type FilterActionUpdateKey = FilterAction<"update_filter_key", { key: string }>;
/** change the current filter set. in a tabular modle the filter set an array of all the unique values in the column against wich to filter the data */
type FilterActionUpdateSet = FilterAction<"update_filter_set", { set: string[] }>;
/** used when selecting or deselecting a filter value */
type FilterActionUpdateSelected = FilterAction<"update_filter_selected", { selected: { [key: string]: boolean } }>;
/** reset the filter */
type FilterActionReset = FilterAction<"reset_filter", { initialState: Filter }>;

declare type FilterDispatch = FilterActionReset | FilterActionUpdateKey | FilterActionUpdateSet | FilterActionUpdateSelected;

/** ***generic state changes and parameter changes*** */

/** state types */

/** used by state */
declare type ParameterType = "ring" | "slice" | "color" | "shape";
declare type Parameter = {
	key: string;
	set: string[];
	counts: { [key: stirng]: number };
	pallet: { [key: string]: string[] };
	scale: { [key: string]: string };
};

declare type State = {
	parameters: { [key in ParameterType]: Parameter };
	data: any[];
	lastChange: LastChange;
};

declare type Filter = {
	key: string;
	set: string[];
	selected: { [key: string]: boolean };
	lastChange: FilterActionType;
};

/** used by Context, useParameterUpdates and useChartUpdates */
declare type Values = {
	state: State;
	dispatch: React.Dispatch<Disparcth>;
	refChart: Chart;
	numberOfUsers: number;
}

/** used by Context, stateReducer and useParameterUpdates */
type ActionType = "update_parameter_key" | "update_parameter_set" | "update_parameter_scale" | "update_data" | "update_state" | "reset_parameter";

/** the payload of an action depends on the action's type*/
interface Action<A extends ActionType, T> {
	type: A;
	payload: T;
}

/** change the current data array */
type ActionUpdateData = Action<"update_data", any[]>;
/** change a given parameter's key. In a tabular model the key is the header of the column assigned this paramter */
type ActionUpdateParameterKey = Action<"update_parameter_key", { parameter: ParameterType; key: string }>;
/** change a given parameter's set. In a tabular model the set is the array of unique values found in the column assigned to this parameter */
type ActionUpdateParameterSet = Action<"update_parameter_set", { parameter: ParameterType; set: string[] }>;
/** change a given parameter's scale. A scale returns some data for each member of the parameter's set. For instance, a color scale should return a hex color for each member of the color set*/
type ActionUpdateParameterScale = Action<"update_parameter_scale", { parameter: ParameterType; scale: { [key: string]: string } }>;
/** change the current state to a complelty new state. */
type ActionUpdateState = Action<"update_state", State>;
/** change a given parameter to its initial conditions */
type ActionResetParameter = Action<"reset_parameter", { parameter: ParameterType; initialState: State }>;

/** used by componenets and by useParameterUpdate */
declare type Disparcth =
	| ActionUpdateData
	| ActionUpdateParameterKey
	| ActionUpdateParameterSet
	| ActionUpdateParameterScale
	| ActionUpdateState
	| ActionResetParameter;

/** if a parameter has changed, then it should be logged, otherwise no extra data needs to be logged in the last change feild */
interface LastChangePossible<A extends ActionType, P> {
	type: A;
	parameter?: P;
}
type LastChargeParameter = LastChangePossible<"update_parameter_key" | "update_parameter_set" | "update_parameter_scale" | "reset_parameter", ParameterType>;
type LastChangeNoParameter = LastChangePossible<"update_data" | "update_state", null>;
type LastChange = LastChargeParameter | LastChangeNoParameter;




/** ***background renderer types. used by renderBackground** */

/** 
 * used by the renderBackground and backgroundWorker background woker instantiates the queue and then sets it for the background renderer.
 * the background renderer exposes the enqueue and dequeue methods. Tasks are enqueued by the worker. Animation won't take place until the worker calls the deqeue method
*/
declare interface QueueInterface<T> {
	size: () => number;
	enqueue: (input: T) => void;
	dequeue: () => T | undefined;
}

declare type Msg = "duration" | "sections";
interface Task<M extends Msg, I> {
	input: I;
	type: M;
}
/** changes the duration of the animation */
declare type ChangeDuration = Task<"duration", number>;
/** data for the arc paths of at the beginning and ending animation frames */
declare type UpdateSections = Task<"sections", Section[]>;
declare type QueueTask = ChangeDuration | UpdateSections;
//** the arc section will be split into subsections if it contains too much data*/
declare type Subsection = {
	id: string;
	startAngle: number;
	endAngle: number;
	innerRadius: number;
	outerRadius: number;
};
declare type Section = {
	id: string;
	fill: string;
	startAngle: number;
	endAngle: number;
	innerRadius: number;
	outerRadius: number;
	subsections: Subsection[];
};


/** types for components  */
/** used by component wrappers */
declare type ComponenetPropsType = {
	initialValues: string[];
	selected?: { [key: string]: boolean };
	handleSort: (set: string[]) => void | undefined;
	counts?: { [key: string]: { currentCount: number; previousCount: number } };
	optionalDivs: ?((input: any, key: string) => JSX.Element);
};

/** Shape worker types. 
 * The shape worker is the web worker that handles calulating new positions, rendering and animated transitions for the data points 
 * New positions are calculated with the vornoi module, transitions are hanlded by renderShapes.ts and the shape worker draws the shapes on the canvas
 */


/**
 * Data used by the shape worker. 
 * Each feild is exctracted from a user object, by an accessor function, then repackaged as a Datum and then sent to the shape worker though a postMessage event
 */
type Datum = { id: string; x: number; y: number; colorValue: string; shapeValue: string; sliceValue:string; ringValue:string; shouldMove:boolean };

/**
 * used used to post messages to the shape worker
 */
declare type ShapeWorkerMsgType =
	| "init"
	| "update_stencil"
	| "update_positions"
	| "update_data_without_moving"
	| "draw"
	| "update_data_values"
	| "rotate_slice_positions";

/**
 * a shape worker payload depends on the type of the message. Below payloads are conditionaly defined based on message type
 */
interface ShapeWorkerMsg<M extends ShapeWorkerMsgType, P> {
	type: M;
	payload: P;
}

/** post all the information required to iinitialize the shape worker's canvases */
type ShapeWorkerInit = ShapeWorkerMsg<
	"init",
	{
		textureW: number;
		textureH: number;
		radius: number;
		pixelRatio: number;
		canvas: OffscreenCanvas;
		computeCanvas: OffscreenCanvas;
		pixelRatio: number;
	}
>;
/** post the triangulation of the background polygones */
type ShapeWorkerUpdateStencil = ShapeWorkerMsg<"update_stencil", { stencil: number[] }>;
/** post the new seed positions, the ids for the conatianing arcs, the data to be updated and the set of arcs that should change*/
type ShapeWorkerUpdatePositions = ShapeWorkerMsg<"update_positions", { offsets: number[]; offsetArcIds: number[]; data: Datum[]; arcIds: Set<string> }>;
/** post just the data to change */
type ShapeWorkerUpdateDataWithoutMoving = ShapeWorkerMsg<"update_data_without_moving", {data: Datum[]}>;
/** post an object whose keys are the slices and whose values are the angle by which to rotate each slice */
type ShapeWorkerRotatePositions = ShapeWorkerMsg<"rotate_slice_positions", { thetas: { [slice: string]: number } }>;
/**
 * used when posting messages to the shape worker
 */
declare type shapeWorkerAction =
	| ShapeWorkerInit
	| ShapeWorkerUpdateStencil
	| ShapeWorkerUpdatePositions
	| ShapeWorkerUpdateDataWithoutMoving
	| ShapeWorkerRotatePositions;

/**
 * shape worker type
 */
declare interface ShapeWorker extends Omit<Worker, "postMessage"> {
	postMessage(msg: shapeWorkerAction, transfer?: Transferable[]): void;
}

/** background worker types.
 * The background worker manages the background portion of the chart -- the slices, the rings and the arc segments formed by the intersection of the two.
 * The arc paths and their transitions are handled by renderBackground.ts. The background worker calulates the intermediate arcs required for the transitions, 
 * draws the resulting transitions to the canvas and returns information required for positioning data points within their containing arcs

/** used to post messages to the background worker */
type BackgroundWorkerMsgType =
	| "set_ctx"
	| "set_dimensions"
	| "init_chart"
	| "update_slice_set"
	| "update_ring_set"
	| "remove_rings"
	| "update_arc_count"
	| "update_ring_heights"
	| "update_slice_angles"
	| "remove_slices"
	| "get_points";

/** the payload of a background worker message depends on the type of the message */
interface BackgroundWorkerMsg<M extends BackgroundWorkerMsgType, P> {
	type: M;
	payload: P;
}

/** post all the data requred for to initilize the background */
type BackgroundWorkerInit = BackgroundWorkerMsg<
	"init_chart",
	{
		ringSet: string[];
		ringHeights: { [ring: string]: { innerRadius: number; outerRadius: number } };
		sliceSet: string[];
		sliceAngles: { [slice: string]: { startAngle: number; endAngle: number } };
		sliceColors: { [slice: string]: string[] };
	}
>;
/** post the offscreen canvas and set its context */
type BackgroundWorkerSetCtx = BackgroundWorkerMsg<"set_ctx", { canvas: OffscreenCanvas }>;
/** set the dimentions of the background and the pixle ratio */
type BackgroundWorkerSetDimensions = BackgroundWorkerMsg<"set_dimensions", { w: number; h: number; r: number }>;
/** update the the slice set, the slice angles and the slice colors. the slice angles are proportional to the amount of data in each slice */
type BackgroundWorkerUpdateSliceSet = BackgroundWorkerMsg<
	"update_slice_set",
	{ sliceSet: string[]; sliceAngles: { [slice: string]: { startAngle: number; endAngle: number } }; sliceColors: { [slice: string]: string[] } }
>;
/** upate the ring set and the ring heights. the ring heights are proportional to the amount of data in each ring */
type BackgroundWorkerUpdateRingSet = BackgroundWorkerMsg<
	"update_ring_set",
	{ ringSet: string[]; ringHeights: { [ring: string]: { innerRadius: number; outerRadius: number } } }
>;
/** remove the curent rings and envoke the special animated transition */
type BackgroundWorkerRemoveRings = BackgroundWorkerMsg<"remove_rings", {}>;
/** the arc count is an object whose keys are arc ids of the from _slice_ring and whose values are numbers representing the amount of data contained in the given arc */
type BackgroundWorkerUpdateArcCount = BackgroundWorkerMsg<"update_arc_count", { arcCount: { [arc: string]: number } }>;
/** just update the innerRadius and outer radius of each ring */
type BackgroundWorkerUpdateRingHeights = BackgroundWorkerMsg<
	"update_ring_heights",
	{ ringHeights: { [ring: string]: { innerRadius: number; outerRadius: number } } }
>;
/** just update the start and end angle of each slice */
type BackgroundWorkerUpdateSliceAngles = BackgroundWorkerMsg<
	"update_slice_angles",
	{ sliceAngles: { [slice: string]: { startAngle: number; endAngle: number } } }
>;
/** remove all the current slices and envoke the special animated transition */
type BackgroundWorkerRemoveSlices = BackgroundWorkerMsg<"remove_slices", {}>;
/** get seed coordinates for the data conatined in each arc in the acrIds set */
type BackgroundWorkerGetPoints = BackgroundWorkerMsg<"get_points", { arcIds: Set<string> }>;

declare type BackgroundWorkerAction =
	| BackgroundWorkerInit
	| BackgroundWorkerSetCtx
	| BackgroundWorkerSetDimensions
	| BackgroundWorkerUpdateSliceSet
	| BackgroundWorkerUpdateRingSet
	| BackgroundWorkerRemoveRings
	| BackgroundWorkerUpdateArcCount
	| BackgroundWorkerUpdateRingHeights
	| BackgroundWorkerUpdateSliceAngles
	| BackgroundWorkerRemoveSlices
	| BackgroundWorkerGetPoints;

declare interface BackgroundWorker extends Omit<Worker, "postMessage"> {
	postMessage(msg: BackgroundWorkerAction, transfer?: Transferable[]): void;
}
