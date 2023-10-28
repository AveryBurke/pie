declare type Chart = ReturnType<typeof import("../src/d3/pizza").pizzaChart>;

declare type User = {
	birthMonth: "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December" | "Smarch";
	birthDay: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
	email: string;
	name: string;
	chirality: "left handed" | "right handed";
	subscriptionTier: "free" | "basic" | "business";
	buildingNumber: "bld_1" | "bld_2" | "bld_3" | "bld_4" | "bld_5";
};

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
};

type Datum = { id: string; x: number; y: number; colorValue: string; shapeValue: string; sliceValue:string; ringValue:string; shouldMove:boolean };

declare type Margin = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

declare type UpdateHandler = () => void;

declare type SymbolName = "circle" | "triangle" | "square" | "diamond" | "star" | "wye" | "cross";

declare type Msg = "duration" | "sections";

declare type ActionType = "update_parameter_key" | "update_parameter_set" | "update_parameter_scale" | "update_data" | "update_state" | "reset_parameter";

declare type ChartAction =
	| `update_chart_${ParameterType}_key`
	| `update_chart_${ParameterType}_set`
	| `update_chart_${ParameterType}_scale`
	| "update_chart_data";

declare type FilterActionType = "update_filter_key" | "update_filter_set" | "update_filter_selected" | "reset_filter";

interface FilterAction<A extends FilterActionType, T> {
	type: A;
	payload: T;
}

interface Action<A extends ActionType, T> {
	type: A;
	payload: T;
}

interface LastChargePossibl<A extends ActionType, P> {
	type: A;
	parameter?: P;
}

declare type ActionUpdateData = Action<"update_data", any[]>;
declare type ActionUpdateParameterKey = Action<"update_parameter_key", { parameter: ParameterType; key: string }>;
declare type ActionUpdateParameterSet = Action<"update_parameter_set", { parameter: ParameterType; set: string[] }>;
declare type ActionUpdateParameterScale = Action<"update_parameter_scale", { parameter: ParameterType; scale: { [key: string]: string } }>;
declare type ActionUpdateState = Action<"update_state", State>;
declare type ActionResetParameter = Action<"reset_parameter", { parameter: ParameterType; initialState: State }>;

declare type FilterActionUpdateKey = FilterAction<"update_filter_key", { key: string }>;
declare type FilterActionUpdateSet = FilterAction<"update_filter_set", { set: string[] }>;
declare type FilterActionUpdateSelected = FilterAction<"update_filter_selected", { selected: { [key: string]: boolean } }>;
declare type FilterActionReset = FilterAction<"reset_filter", { initialState: Filter }>;

type LastChargeParameter = LastChargePossibl<"update_parameter_key" | "update_parameter_set" | "update_parameter_scale" | "reset_parameter", ParameterType>;
type LastChangeNoParameter = LastChargePossibl<"update_data" | "update_state", null>;

type LastChange = LastChargeParameter | LastChangeNoParameter;

declare type Disparcth =
	| ActionUpdateData
	| ActionUpdateParameterKey
	| ActionUpdateParameterSet
	| ActionUpdateParameterScale
	| ActionUpdateState
	| ActionResetParameter;

declare type FilterDispatch = FilterActionReset | FilterActionUpdateKey | FilterActionUpdateSet | FilterActionUpdateSelected;

interface Task<M extends Msg, I> {
	input: I;
	type: M;
}

declare interface QueueInterface<T> {
	size: () => number;
	enqueue: (input: T) => void;
	dequeue: () => T | undefined;
}

declare type ChangeDuration = Task<"duration", number>;
declare type UpdateSections = Task<"sections", Section[]>;
declare type QueueTask = ChangeDuration | UpdateSections;
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

declare type Values = {
	state: State;
	dispatch: React.Dispatch<Disparcth>;
	refChart: Chart;
	numberOfUsers: number;
};

declare type ComponenetPropsType = {
	initialValues: string[];
	selected?: { [key: string]: boolean };
	handleSort: (set: string[]) => void | undefined;
	counts?: { [key: string]: { currentCount: number; previousCount: number } };
	optionalDivs: ?((input: any, key: string) => JSX.Element);
};

/** shape worker types */
declare type ShapeWorkerMsgType =
	| "init"
	| "update_stencil"
	| "render_in_chunks"
	| "update_data_without_moving"
	| "draw"
	| "update_data_values"
	| "rotate_slice_positions";

declare interface ShapeWorkerMsg<M extends ShapeWorkerMsgType, P> {
	type: M;
	payload: P;
}

declare type ShapeWorkerInit = ShapeWorkerMsg<
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

declare type ShapeWorkerUpdateStencil = ShapeWorkerMsg<"update_stencil", { stencil: number[] }>;
declare type ShapeWorkerRenderInChunks = ShapeWorkerMsg<"render_in_chunks", { offsets: number[]; offsetArcIds: number[]; data: Datum[]; arcIds: Set<string> }>;
declare type ShapeWorkerUpdateDataWithoutMoving = ShapeWorkerMsg<"update_data_without_moving", {data: Datum[]}>;
declare type ShapeWorkerRotatePositions = ShapeWorkerMsg<"rotate_slice_positions", { thetas: { [key: string]: number } }>;
declare type shapeWorkerAction =
	| ShapeWorkerInit
	| ShapeWorkerUpdateStencil
	| ShapeWorkerRenderInChunks
	| ShapeWorkerUpdateDataWithoutMoving
	| ShapeWorkerRotatePositions;

declare interface ShapeWorker extends Omit<Worker, "postMessage"> {
	postMessage(msg: shapeWorkerAction, transfer?: Transferable[]): void;
}

/** background worker types */

declare type BackgroundWorkerMsgType =
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

declare interface BackgroundWorkerMsg<M extends BackgroundWorkerMsgType, P> {
	type: M;
	payload: P;
}

declare type BackgroundWorkerInit = BackgroundWorkerMsg<
	"init_chart",
	{
		ringSet: string[];
		ringHeights: { [ring: string]: { innerRadius: number; outerRadius: number } };
		sliceSet: string[];
		sliceAngles: { [slice: string]: { startAngle: number; endAngle: number } };
		sliceColors: { [slice: string]: string[] };
	}
>;

declare type BackgroundWorkerSetCtx = BackgroundWorkerMsg<"set_ctx", { canvas: OffscreenCanvas }>;
declare type BackgroundWorkerSetDimensions = BackgroundWorkerMsg<"set_dimensions", { w: number; h: number; r: number }>;
declare type BackgroundWorkerUpdateSliceSet = BackgroundWorkerMsg<
	"update_slice_set",
	{ sliceSet: string[]; sliceAngles: { [slice: string]: { startAngle: number; endAngle: number } }; sliceColors: { [slice: string]: string[] } }
>;
declare type BackgroundWorkerUpdateRingSet = BackgroundWorkerMsg<
	"update_ring_set",
	{ ringSet: string[]; ringHeights: { [ring: string]: { innerRadius: number; outerRadius: number } } }
>;
declare type BackgroundWorkerRemoveRings = BackgroundWorkerMsg<"remove_rings", {}>;
declare type BackgroundWorkerUpdateArcCount = BackgroundWorkerMsg<"update_arc_count", { arcCount: { [arc: string]: number } }>;
declare type BackgroundWorkerUpdateRingHeights = BackgroundWorkerMsg<
	"update_ring_heights",
	{ ringHeights: { [ring: string]: { innerRadius: number; outerRadius: number } } }
>;
declare type BackgroundWorkerUpdateSliceAngles = BackgroundWorkerMsg<
	"update_slice_angles",
	{ sliceAngles: { [slice: string]: { startAngle: number; endAngle: number } } }
>;
declare type BackgroundWorkerRemoveSlices = BackgroundWorkerMsg<"remove_slices", {}>;
declare type BackgroundWorkerGetPoints = BackgroundWorkerMsg<"get_points", { arcIds: Set<string> }>;

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
