import { select } from "d3-selection";
import { pie } from "d3-shape";
import colorPallet from "../static/colorPallet";
import deepEqual from "deep-equal";
import { dummyValue } from "../static/initialState";

function pizzaChart(): typeof chart {
	// All options that should be accessible to caller
	let data: any[],
		//slices
		sliceSet: string[],
		sliceKey: string,
		sliceColors: { [slice: string]: string[] },
		//rings
		ringSet: string[],
		ringKey: string,
		//colors
		colorKey: string,
		colorSet: string[],
		colorScale: { [key: string]: string },
		//chart dimensions
		margin: Margin,
		canvasWidth: number,
		canvasHeight: number,
		//webgpu
		device: GPUDevice,
		//update handlers
		//values that the caller can change after the chart is inilized
		updateData: UpdateHandler,
		updateSliceKey: UpdateHandler,
		updateSliceSet: UpdateHandler,
		updateRingKey: UpdateHandler,
		updateRingSet: UpdateHandler,
		updateColorKey: UpdateHandler,
		updateColorSet: UpdateHandler,
		updateColorScale: UpdateHandler;

	function chart(selection: d3.Selection<HTMLDivElement, any, any, any>) {
		selection.each(function () {
			//set up the screen
			const root = select(this),
				dpi = window.devicePixelRatio,
				outsideHeight = margin.top + margin.bottom,
				outsideWidth = margin.left + margin.right,
				insideHeight = canvasHeight - outsideHeight,
				insideWidth = canvasWidth - outsideWidth,
				diameterRatio = 0.85,
				pieDiameter = diameterRatio * insideHeight,
				pieRadius = pieDiameter / 2,
				canvas = root.append("canvas"),
				canvas2 = root.append("canvas"),
				canvas3 = root.append("canvas"),
				canvasNode = canvas.node(),
				canvasNode2 = canvas2.node(),
				canvasNode3 = canvas3.node(),
				textureW = 312,
				textureH = 312;

			if (canvasNode) {
				canvasNode.style.width = canvasWidth + "px";
				canvasNode.style.height = canvasHeight + "px";
				canvasNode.style.position = "absolute";
				canvasNode.style.zIndex = "0";
				canvasNode.width = Math.floor(canvasWidth * dpi);
				canvasNode.height = Math.floor(canvasHeight * dpi);
				canvasNode.id = "background";
			}
			/** this canvas is only for the webgl2 context. it's only used for rendering when displaying debug textures */
			if (canvasNode2) {
				canvasNode2.style.width = canvasWidth + "px";
				canvasNode2.style.height = canvasHeight + "px";
				canvasNode2.style.position = "absolute";
				canvasNode2.style.zIndex = "2";
				canvasNode2.width = Math.floor(canvasWidth * dpi);
				canvasNode2.height = Math.floor(canvasHeight * dpi);
				canvasNode2.id = "compute";
			}

			if (canvasNode3) {
				canvasNode3.style.width = canvasWidth + "px";
				canvasNode3.style.height = canvasHeight + "px";
				canvasNode3.style.position = "absolute";
				canvasNode3.style.zIndex = "1";
				canvasNode3.width = Math.floor(canvasWidth * dpi);
				canvasNode3.height = Math.floor(canvasHeight * dpi);
				canvasNode3.id = "shapes";
			}

			let ringValue = (d: any) => d[ringKey],
				sliceValue = (d: any) => d[sliceKey],
				colorValue = (d: any) => d[colorKey],
				ringCount = Object.fromEntries(ringSet.map((ring) => [ring, data.filter((d) => ringValue(d) === ring).length])),
				sliceCount = Object.fromEntries(sliceSet.map((slice) => [slice, data.filter((d) => sliceValue(d) === slice).length])),
				ringHeights = ringSet.reduce<{ [key: string]: { innerRadius: number; outerRadius: number } }>((acc, ring, i) => {
					const height = ringCount[ring]! * (pieRadius / data.length);
					if (i === 0) {
						acc[ring] = { innerRadius: 0, outerRadius: height };
					} else {
						const prev = ringSet[i - 1];
						const { outerRadius: prevOuter } = acc[prev!] || { outerRadius: 0 };
						const outerRadius = height + prevOuter;
						acc[ring] = { innerRadius: prevOuter, outerRadius };
					}
					return acc;
				}, {}),
				pieGenerator = pie<string>()
					.value((slice) => sliceCount[slice]!)
					.sort((a: string, b: string) => sliceSet.indexOf(a) - sliceSet.indexOf(b)),
				sliceAngles = Object.fromEntries(
					pieGenerator(sliceSet).map((p) => {
						const { startAngle, endAngle } = p;
						return [p.data, { startAngle, endAngle }];
					})
				),
				
				arcCount: { [arc_id: string]: number } = {},
				sliceColorsShouldChange = false,
				vornoiInitialized = false,
				currentSectionVerts: { [id: string]: [number, number][] } = {},
				currentSectionCoords: { [id: string]: [number, number][] } = {},
				currentIds: Datum[] = [],
				previousSliceSet: string[] = sliceSet;

			const backgroundWorker: BackgroundWorker = new Worker(new URL("../workers/backgroundWorker", import.meta.url), { type: "module" });
			// const shapesWorker = new Worker(new URL("../workers/shapesWorker", import.meta.url), { type: 'module' })
			const shapeWorker: ShapeWorker = new Worker(new URL("../workers/shapeWorker", import.meta.url), { type: "module" });
			const offscreen = canvasNode?.transferControlToOffscreen();
			const offscreen2 = canvasNode2?.transferControlToOffscreen();
			const offscreen3 = canvasNode3?.transferControlToOffscreen();
			// const gl = offscreen2!.getContext("webgl2")
			// if (gl!.getExtension("EXT_color_buffer_float")) {
			//     console.log("voroni error: color extention does not exist");
			//   }
			backgroundWorker.postMessage({ type: "set_ctx", payload: { canvas: offscreen! } }, [offscreen!]);
			backgroundWorker.postMessage({ type: "set_dimensions", payload: { w: canvasWidth, h: canvasHeight, r: dpi } });
			backgroundWorker.postMessage({ type: "init_chart", payload: { sliceSet, sliceAngles, ringSet, ringHeights, sliceColors } });
			shapeWorker.postMessage(
				{
					type: "init",
					payload: {
						computeCanvas: offscreen2!,
						canvas: offscreen3!,
						textureW,
						textureH,
						radius: pieDiameter,
						colorScale,
						pixelRatio: window.devicePixelRatio,
					},
				},
				[offscreen2!, offscreen3!]
			);

			backgroundWorker.addEventListener("message", (e) => {
				const { sectionVerts, sectionCoords }: { sectionVerts: number[]; sectionCoords: [number, number, number][] } = e.data;
				// console.log({ sectionVerts, sectionCoords})
				if (sectionVerts && !deepEqual(sectionVerts, currentSectionVerts)) {
					// currentSectionVerts = sectionVerts
					/** this is intended to be an array of vec3s of the form (x, y, arc_id) */
					const vertices: number[] = [];
					for (let i = 0; i < sectionVerts.length; i += 3) {
						/**             x                       y                       arc_id */
						vertices.push((sectionVerts[i] / pieDiameter) * 2, (sectionVerts[i + 1] / pieDiameter) * 2, sectionVerts[i + 2]);
					}
					shapeWorker.postMessage({ type: "update_stencil", payload: { stencil: vertices } });
				}
				if (sectionCoords && !deepEqual(sectionCoords, currentSectionCoords)) {
					// console.log(sectionCoords,currentSectionCoords)
					// currentSectionCoords = sectionCoordsa
					let offsets: number[] = [];
					let offsetArcIds: number[] = [];
					sectionCoords.sort((a, b) => cmp(a[2], b[2]) || cmp(a[0], b[0]) || cmp(a[1], b[1]));
					const sortedDatum: Datum[] = data
						.sort(
							(a, b) =>
								cmp(sliceSet.indexOf(sliceValue(a)), sliceSet.indexOf(sliceValue(b))) || cmp(ringSet.indexOf(ringValue(a)), ringSet.indexOf(ringValue(b)))
						)
						.map((d) => ({
							id: d[`${dummyValue}_id`],
							x: 0,
							y: 0,
							colorValue: colorValue(d),
							shapeValue: "bob",
							sliceValue: sliceValue(d),
							ringValue: ringValue(d),
						}));

					shapeWorker.postMessage({ type: "update_ids", payload: { ids: sortedDatum } });
					for (let i = 0; i < sectionCoords.length; ++i) {
						const coord = sectionCoords[i];
						offsets.push((coord[0] / pieDiameter) * 2, -((coord[1] / pieDiameter) * 2)); // I think pieDiameter is actually pie radius and so I have to mulitply by 2
						offsetArcIds.push(coord[2]);
					}

					currentIds = sortedDatum;
					shapeWorker.postMessage({ type: "render_in_chunks", payload: { offsets, offsetArcIds } });
				}
			});

			updateData = function () {
				currentIds = [];
				const updateSliceCount = Object.fromEntries(sliceSet.map((slice) => [slice, data.filter((d) => sliceValue(d) === slice).length]));
				const updateRingCount = Object.fromEntries(ringSet.map((ring) => [ring, data.filter((d) => ringValue(d) === ring).length]));
				arcCount = {};
				for (let i = 0; i < sliceSet.length; i++) {
					const slice = sliceSet[i];
					for (let j = 0; j < ringSet.length; j++) {
						const ring = ringSet[j];
						arcCount[`_${slice}_${ring}`] = data.filter((d) => d[sliceKey] === slice && d[ringKey] === ring).length;
					}
				}
				backgroundWorker.postMessage({ type: "update_arc_count", payload: { arcCount } });
				if (!deepEqual(updateSliceCount, sliceCount)) {
					sliceCount = updateSliceCount;
					onlyUpdateSlcieAngles();
				}
				//if slice counts have changed, then at least one ring count must also have changed
				if (!deepEqual(updateRingCount, ringCount)) {
					ringCount = updateRingCount;
					// onlyUpdateRingHeights()
					//if slice angles have changed then calling updateRingHeights will update the background as well
					updateRingHeights();
				}

				backgroundWorker.postMessage({
					type: "get_points",
					payload: {arcIds:getArcIds()},
				});
			};

			updateSliceKey = function () {
				sliceValue = (d: any) => d[sliceKey];
				backgroundWorker.postMessage({
					type: "remove_slices",
					payload: {},
				});
				sliceColorsShouldChange = true;
				previousSliceSet = [];
			};

			updateSliceSet = function () {
				currentIds = [];
				arcCount = {};
				for (let i = 0; i < sliceSet.length; i++) {
					const slice = sliceSet[i];
					for (let j = 0; j < ringSet.length; j++) {
						const ring = ringSet[j];
						arcCount[`_${slice}_${ring}`] = data.filter((d) => d[sliceKey] === slice && d[ringKey] === ring).length;
					}
				}
				backgroundWorker.postMessage({ type: "update_arc_count", payload: { arcCount } });
				if (sliceColorsShouldChange) {
					updateSliceColors();
					sliceColorsShouldChange = false;
				}
				const oldSliceAngles = sliceAngles;
				sliceCount = Object.fromEntries(sliceSet.map((slice) => [slice, data.filter((d) => sliceValue(d) === slice).length]));
				updateSliceAngles();
				if (previousSliceSet.length === 0) {
					backgroundWorker.postMessage({ type: "get_points", payload: {arcIds:getArcIds()} });
				} else {
					const thetas = Object.fromEntries(sliceSet.map((slice) => [slice, sliceAngles[slice].endAngle - oldSliceAngles[slice].endAngle]));
					shapeWorker.postMessage({ type: "rotate_slice_positions", payload: { thetas } });
					data
						.sort(
							(a, b) =>
								cmp(sliceSet.indexOf(sliceValue(a)), sliceSet.indexOf(sliceValue(b))) || cmp(ringSet.indexOf(ringValue(a)), ringSet.indexOf(ringValue(b)))
						)
						.map((d) => colorValue(d));
				}
				previousSliceSet = sliceSet;
			};

			updateRingKey = function () {
				ringValue = (d: any) => d[ringKey];
				backgroundWorker.postMessage({
					type: "remove_rings",
					payload: {},
				});
			};

			updateRingSet = function () {
				currentIds = [];
				arcCount = {};
				for (let i = 0; i < sliceSet.length; i++) {
					const slice = sliceSet[i];
					for (let j = 0; j < ringSet.length; j++) {
						const ring = ringSet[j];
						arcCount[`_${slice}_${ring}`] = data.filter((d) => d[sliceKey] === slice && d[ringKey] === ring).length;
					}
				}
				backgroundWorker.postMessage({ type: "update_arc_count", payload: { arcCount } });
				ringCount = Object.fromEntries(ringSet.map((ring) => [ring, data.filter((d) => ringValue(d) === ring).length]));
				updateRingHeights();
				backgroundWorker.postMessage({
					type: "get_points",
					payload: {arcIds:getArcIds()},
				});
			};

			updateColorKey = function () {
				//probably send this to the shape worker
				colorValue = (d: any) => d[colorKey];
				const colorValues: string[] = data
					.sort(
						(a, b) => cmp(sliceSet.indexOf(sliceValue(a)), sliceSet.indexOf(sliceValue(b))) || cmp(ringSet.indexOf(ringValue(a)), ringSet.indexOf(ringValue(b)))
					)
					.map((d) => colorValue(d));
				shapeWorker.postMessage({ type: "update_color_values", payload: { colorValues } });
			};

			updateColorSet = function () {
				//probably send this to the shape worker
				// console.log({colorSet})
			};

			updateColorScale = function () {
				//probably send this to the shape worker
				// console.log({colorScale})
				shapeWorker.postMessage({ type: "update_color_scale", payload: { colorScale } });
			};

			// //helper functions
			function updateSliceColors() {
				const previouslyUsed = Object.keys(sliceColors).length;
				sliceColors = Object.fromEntries(sliceSet.map((slice, i) => [slice, colorPallet[(i + previouslyUsed) % colorPallet.length]!]));
			}
			function updateSliceAngles() {
				(pieGenerator = pie<string>()
					.value((slice) => sliceCount[slice]!)
					.sort((a: string, b: string) => sliceSet.indexOf(a) - sliceSet.indexOf(b))),
					(sliceAngles = Object.fromEntries(
						pieGenerator(sliceSet).map((p) => {
							const { startAngle, endAngle } = p;
							return [p.data, { startAngle, endAngle }];
						})
					));
				backgroundWorker.postMessage({
					type: "update_slice_set",
					payload: {
						sliceSet,
						sliceAngles,
						sliceColors,
					},
				});
			}
			function updateRingHeights() {
				ringHeights = ringSet.reduce<{ [key: string]: { innerRadius: number; outerRadius: number } }>((acc, ring, i) => {
					const height = ringCount[ring]! * (pieRadius / data.length);
					if (i === 0) {
						acc[ring] = { innerRadius: 0, outerRadius: height };
					} else {
						const prev = ringSet[i - 1];
						const { outerRadius: prevOuter } = acc[prev!] || { outerRadius: 0 };
						const outerRadius = height + prevOuter;
						acc[ring] = { innerRadius: prevOuter, outerRadius };
					}
					return acc;
				}, {});

				backgroundWorker.postMessage({
					type: "update_ring_set",
					payload: { ringSet, ringHeights },
				});
			}
			function onlyUpdateSlcieAngles() {
				(pieGenerator = pie<string>()
					.value((slice) => sliceCount[slice]!)
					.sort((a: string, b: string) => sliceSet.indexOf(a) - sliceSet.indexOf(b))),
					(sliceAngles = Object.fromEntries(
						pieGenerator(sliceSet).map((p) => {
							const { startAngle, endAngle } = p;
							return [p.data, { startAngle, endAngle }];
						})
					));
				backgroundWorker.postMessage({
					type: "update_slice_angles",
					payload: { sliceAngles },
				});
			}
			function cmp(a: number, b: number) {
				if (a > b) return +1;
				if (a < b) return -1;
				return 0;
			}
			/**
			 * 
			 * @returns {Set<string>} ids for all arcs wtih count > 0 
			 */
			function getArcIds():Set<string> {
				const ids: Set<string> = new Set();
				for (let i = 0; i < sliceSet.length; i++) {
					for (let j = 0; j < ringSet.length; j++) {
						const id = `_${sliceSet[i]}_${ringSet[j]}`;
						if (arcCount[id] > 0) ids.add(id);
					}
				}
				return ids;
			}
			//boot
		});
	}

	chart.data = function (value: any[]) {
		data = value;
		if (typeof updateData === "function") updateData();
		return chart;
	};

	//slice
	chart.sliceKey = function (value: string) {
		sliceKey = value;
		if (typeof updateSliceKey === "function") updateSliceKey();
		return chart;
	};

	chart.sliceSet = function (value: string[]) {
		sliceSet = value;
		if (typeof updateSliceSet === "function") updateSliceSet();
		return chart;
	};

	chart.sliceColors = function (value: { [slice: string]: string[] }) {
		sliceColors = value;
		// if (typeof updateSliceColors === 'function') updateSliceColors();
		return chart;
	};

	//ring
	chart.ringKey = function (value: string) {
		ringKey = value;
		if (typeof updateRingKey === "function") updateRingKey();
		return chart;
	};

	chart.ringSet = function (value: string[]) {
		ringSet = value;
		if (typeof updateRingSet === "function") updateRingSet();
		return chart;
	};

	//colors
	chart.colorKey = function (value: string) {
		colorKey = value;
		if (typeof updateColorKey === "function") updateColorKey();
		return chart;
	};
	chart.colorSet = function (value: string[]) {
		colorSet = value;
		if (typeof updateColorSet === "function") updateColorSet();
		return chart;
	};
	chart.colorScale = function (value: { [key: string]: string }) {
		colorScale = value;
		if (typeof updateColorScale === "function") updateColorScale();
		return chart;
	};

	//measurements
	chart.margin = function (value: Margin) {
		margin = value;
		return chart;
	};

	chart.margin = function (value: Margin) {
		margin = value;
		return chart;
	};

	chart.canvasWidth = function (value: number) {
		canvasWidth = value;
		return chart;
	};

	chart.canvasHeight = function (value: number) {
		canvasHeight = value;
		return chart;
	};

	return chart;
}
export { pizzaChart };
