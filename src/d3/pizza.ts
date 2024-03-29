import { select } from "d3-selection";
import { pie } from "d3-shape";
import colorPallet from "../static/colorPallet";
import deepEqual from "deep-equal";
import { dummyValue } from "../static/initialState";
import shapes from "../static/shapes";

type Accessor = (datum: any) => string;
/**
 * sets the initial conditions for the chart funciton
 * @example
 * //return a chart with the corresponding varaibles set
 * const chart = pizza()
 * 		.canvasWidth(1280)
 *      .canvasHeight(720)
 *      .margin({ top: 120, right: 220, bottom: 0, left: 220 })
 * 		.data(data)
 * 		.sliceKey("building_number")
 * 		.sliceSet(["1", "2", "3"])
 * 		.sliceColors(["red", "yellow", "green"])
 * 		.ringKey("subscription_tier")
 * 		.ringSet(["basic", "free"])
 * 		.colorKey("birthday")
 * 		.colorScale({Monday: '#7fc97f', Tuesday:'#beaed4', Wednesday:'#fdc086', Thursday:'#ffff99', Friday:'#386cb0', Saturday:'#f0027f', Sunday:'#bf5b17'})
 *
 * // call the chart on a div
 * d3.select(someDiv)
 * 	.call(chart)
 *
 * @returns the chart fuction.
 */
function pizzaChart(): typeof chart {
	// All options that should be accessible to the caller
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
		colorScale: { [key: string]: string },
		//shapes
		shapeKey: string,
		shapeSet: string[],
		shapeScale: { [key: string]: string },
		//chart dimensions
		margin: Margin,
		canvasWidth: number,
		canvasHeight: number,
		//webgpu
		device: GPUDevice,
		//update handlers
		updateData: UpdateHandler,
		updateSliceKey: UpdateHandler,
		updateSliceSet: UpdateHandler,
		updateRingKey: UpdateHandler,
		updateRingSet: UpdateHandler,
		updateColorKey: UpdateHandler,
		updateColorSet: UpdateHandler,
		updateColorScale: UpdateHandler,
		updateShapeKey: UpdateHandler,
		updateShapeSet: UpdateHandler,
		updateShapeScale: UpdateHandler;

	/**
	* attaches a canvas to the div and renders a chart to the canvas.
	* methods for changing the chart are exposed through setters.
	* @example
	* //change the slice set and show the resulting animation
	* chart.sliceSet(["2", "3", "1"])
	* @param selection a d3 selection on an div
	* @returns a new chart
	*/
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

			/**
			 *  accessors for the current ring value of a datum, updated with updateRingKey()
			 *  @param datum an object of unkown shape whose values are all strings
			 *  @returns {string} the current ring value of the datum
			 */
			let ringValue: Accessor = (d: any) => d[ringKey],
				/**
				 *  accessors for the current slice value of a datum, updated with updateSliceKey()
				 *  @param datum an object of unkown shape whose values are all strings
				 *  @returns {string} the current slice value of the datum
				 */
				sliceValue: Accessor = (d: any) => d[sliceKey],
				/**
				 *  accessors for the current color value of a datum, updated with updateColorKey()
				 *  a datum's color value must be used in conjection with a color scale in order to get a proper hex value for the color
				 *  @param datum an object of unkown shape whose values are all strings
				 *  @returns {string} the current color value of the datum
				 */
				colorValue: Accessor = (d: any) => d[colorKey],
				/**
				 *  accessors for the current shape value of a datum, updated with updateShapeKey()
				 *  a datum's shape value must be used in conjection with a shape scale in order to get a proper hex value for the shape
				 *  @param datum an object of unkown shape whose values are all strings
				 *  @returns {string} the current shape value of the datum
				 */
				shapeValue: Accessor = (d: any) => d[shapeKey],
				/**
				 *  accessor for the datum's id. Ids are injected into the data before it's passed to the chart. the data feild looks like {...dummyValue_id: id}, where "dummyValue" is a spcial value that is ignored by the visulizations and the react components and id is unique string of 8 characters.
				 *  @param datum an object of unkown shape whose values are all strings
				 *  @returns {string}  the datum's unique id, previously assigned by the calling function
				 */
				getId: Accessor = (d: any) => d[`${dummyValue}_id`],
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
				currentSectionVerts: { [id: string]: [number, number][] } = {},
				currentSectionCoords: { [id: string]: [number, number][] } = {},
				previousSliceSet = sliceSet,
				previousRingSet = ringSet,
				arcsToChange: Set<string>,
				positions: { [id: string]: [number, number] },
				currentArcOrder: { [id: string]: number };

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
						pixelRatio: window.devicePixelRatio,
					},
				},
				[offscreen2!, offscreen3!]
			);
			shapeWorker.addEventListener("message", (e) => {
				if (e.data.positions) {
					positions = e.data.positions;
				}
			});
			backgroundWorker.addEventListener("message", (e) => {
				const {
					sectionVerts,
					sectionCoords,
					arcOrder,
				}: { sectionVerts: number[]; sectionCoords: [number, number, number][]; arcOrder: { [id: string]: number } } = e.data;
				// console.log({ sectionVerts, sectionCoords})
				currentArcOrder = arcOrder;
				if (sectionVerts && !deepEqual(sectionVerts, currentSectionVerts)) {
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
					let offsets: number[] = [];
					let offsetArcIds: number[] = [];
					const sortedDatum: Datum[] = data
						.sort((a, b) => currentArcOrder[arcId(a)] - currentArcOrder[arcId(b)])
						.map((d) => {
							const shouldMove = arcId(d) in currentArcOrder;
							const id = getId(d);
							return {
								id,
								// if this datum should be moved then a new position will be asigned by the shape worker
								// otherwise retain it's previous position
								x: shouldMove ? 0 : positions[id][0],
								y: shouldMove ? 0 : positions[id][1],
								colorValue: colorScale[colorValue(d)],
								shapeValue: shapes(shapeScale[shapeValue(d)] as SymbolName, 5),
								sliceValue: sliceValue(d),
								ringValue: ringValue(d),
								shouldMove,
							};
						});

					for (let i = 0; i < sectionCoords.length; ++i) {
						const coord = sectionCoords[i];
						offsets.push((coord[0] / pieDiameter) * 2, -((coord[1] / pieDiameter) * 2)); // I think pieDiameter is actually pie radius and so I have to mulitply by 2
						offsetArcIds.push(coord[2]);
					}
					shapeWorker.postMessage({ type: "update_positions", payload: { offsets, offsetArcIds, arcIds: arcsToChange, data: sortedDatum } });
				}
			});

			/**
			 * after the data varaible is reassigned, recalculates all the counts, the slice angles and the ring heights and requests new point positions from
			 * the background worker
			 * @internal
			 */
			updateData = function () {
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
					updateSliceAngles();
				}
				if (!deepEqual(updateRingCount, ringCount)) {
					ringCount = updateRingCount;
					updateRingHeights();
				}
				arcsToChange = getArcIds(sliceSet, ringSet);
				backgroundWorker.postMessage({
					type: "get_points",
					payload: { arcIds: arcsToChange },
				});
			};

			/**
			 * after the sliceKey varaible is reassigned, reasinges the slice value accessor function and removes the previous slice set
			 * @internal
			 */
			updateSliceKey = function () {
				sliceValue = (d: any) => d[sliceKey];
				backgroundWorker.postMessage({
					type: "remove_slices",
					payload: {},
				});
				sliceColorsShouldChange = true;
				//clear the previous slice set. this will tell the slice set update handler that the next slice set is new
				previousSliceSet = [];
			};

			/**
			 * after the sliceSet varaible is reassigned, recalculates the arc count and the slice angles.
			 * If this is a new slice set, then new poistions are requested for the data; if the existing slice set was shuffled,
			 * then a change in angle is calulated for each slice and sent to the shape worker to animated the corresponding roation for each data point
			 * @internal
			 */
			updateSliceSet = function () {
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
				// if the previous slice set is empty, then this is a new slice set
				if (previousSliceSet.length === 0) {
					arcsToChange = getArcIds(sliceSet, ringSet);
					backgroundWorker.postMessage({ type: "get_points", payload: { arcIds: arcsToChange } });
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

			/**
			 * after the ringKey varaible is reassigned, reasinges the ring value accessor function and removes the previous ring set
			 * @internal
			 */
			updateRingKey = function () {
				ringValue = (d: any) => d[ringKey];
				backgroundWorker.postMessage({
					type: "remove_rings",
					payload: {},
				});
				//clear the previous ring set. this will tell the ring set update hanlder that the next ring set is new
				previousRingSet = [];
			};

			/**
			 * after the ringSet varaible is reassigned, recalculates the arc counts and the ring heights.
			 * If this is a new ring set, then new poistions are requested for ever arc and every data point; if the existing ring set was shuffled,
			 * then requests positions for only the arcs in the rings that have moved
			 * @internal
			 */
			updateRingSet = function () {
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
				//if the previous ring set was empty then this is a new ring set
				if (previousRingSet.length === 0) {
					arcsToChange = getArcIds(sliceSet, ringSet);
					backgroundWorker.postMessage({
						type: "get_points",
						payload: { arcIds: arcsToChange },
					});
				} else {
					//only get triangluation and seeds for arcs in the rings that where just moved
					const movedRings = ringSet.filter((ring, i) => previousRingSet.indexOf(ring) !== i);
					arcsToChange = getArcIds(sliceSet, movedRings);
					backgroundWorker.postMessage({
						type: "get_points",
						payload: { arcIds: arcsToChange },
					});
				}
				previousRingSet = ringSet;
			};

			/**
			 * once the colorKey variable is reassigned, reSets the color value accessor funciton
			 * @internal
			 */
			updateColorKey = function () {
				colorValue = (d: any) => d[colorKey];
			};
			/**
			 * once the colorScale variable is reassigned, sends the data with the new color values to the shape worker, without recalulating positions
			 * @internal
			 */
			updateColorScale = function () {
				updateDataWithoutMoving();
			};

			/**
			 * once the shapeKey variable is reassigned, reassign the shape value accessor funciton
			 * @internal
			 */
			updateShapeKey = function () {
				shapeValue = (d: any) => d[shapeKey];
			};

			/**
			 * once the shapeScale variable is reassigned, sends the data with the new shape values to the shape worker, without recalulating positions
			 * @internal
			 */
			updateShapeScale = function () {
				updateDataWithoutMoving();
			};

			//helper functions

			/**
			 * update the slice colors
			 * @internal
			 */
			function updateSliceColors() {
				const previouslyUsed = Object.keys(sliceColors).length;
				sliceColors = Object.fromEntries(sliceSet.map((slice, i) => [slice, colorPallet[(i + previouslyUsed) % colorPallet.length]!]));
			}
			/**
			 * calculates slice angles from the current slice count and sends the new data to background worker, resulting in an animated transition
			 * @internal
			 */
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
			/**
			 * calculates ring heights from the current ring count and sends the new data to background worker, resulting in an animated transition
			 * @internal
			 */
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

			/**
			 * comparator function for multisorting
			 * @param a number
			 * @param b number
			 * @returns 1, 0 or -1
			 */
			function cmp(a: number, b: number) {
				if (a > b) return +1;
				if (a < b) return -1;
				return 0;
			}
			/**
			 *  posts a message to the shape worker to update the data without recalculating positions.
			 *  Therefor the data is packaged using the current accessors, the current scales and the current positions.
			 *  @internal
			 */
			function updateDataWithoutMoving() {
				shapeWorker.postMessage({
					type: "update_data_without_moving",
					payload: {
						data: data
							.sort((a, b) => currentArcOrder[arcId(a)] - currentArcOrder[arcId(b)])
							.map((d) => ({
								id: getId(d),
								sliceValue: sliceValue(d),
								ringValue: ringValue(d),
								colorValue: colorScale[colorValue(d)],
								shapeValue: shapes(shapeScale[shapeValue(d)] as SymbolName, 5),
								x: positions[getId(d)][0],
								y: positions[getId(d)][1],
								shouldMove: false,
							})),
					},
				});
			}
			/**
			 * create ids for all current arcs with arcCount > 0
			 * @param sliceSet slice values for the arc ids
			 * @param ringSet ring values for the arc ids
			 * @returns set of arc ids, of the from _sliceValue_ringValue
			 * @internal
			 */
			function getArcIds(sliceSet: string[], ringSet: string[]): Set<string> {
				const ids: Set<string> = new Set();
				for (let i = 0; i < sliceSet.length; i++) {
					for (let j = 0; j < ringSet.length; j++) {
						const id = `_${sliceSet[i]}_${ringSet[j]}`;
						if (arcCount[id] > 0) ids.add(id);
					}
				}
				return ids;
			}
			/**
			 * applies the current slice value and ring value accessors to get the id of the arc to which this datum belongs
			 * @param d an object of unkown shape whose values are strings
			 * @returns an arc id. these are of the form _sliceValueOfd_ringValueOfd
			 * @internal
			 */
			function arcId(d: any): string {
				return `_${sliceValue(d)}_${ringValue(d)}`;
			}
			//boot
		});
	}

	/**
	 * Sets the data variable
	 * If the chart is already initilized, then this funciton additionaly calls the data update handler
	 * @param value an array of homogeneous objects of unkown shape whose values are strings. In a tabular model these are the rows.
	 * @returns the next stage of the chart
	 */
	chart.data = function (value: any[]) {
		data = value;
		if (typeof updateData === "function") updateData();
		return chart;
	};

	//slice
	/**
	 * Sets the sliceKey varaible. The value must be a feild in the data.
	 * If the chart is already initilized, then this funciton additionaly calls the slice key update handler and removes the old slices.
	 * @param value a key for accessing the slice value from the data. In a tabular model this is the header of the column that will determin the chart's slices
	 * @returns the next stage of the chart
	 */
	chart.sliceKey = function (value: string) {
		sliceKey = value;
		if (typeof updateSliceKey === "function") updateSliceKey();
		return chart;
	};

	/**
	 * Sets the sliceSet varaible. There is one slice per member and the order of the array determins order of the slices.
	 * If the chart is already initilized, then this funciton additionaly calls the slice set update handler, resulting in an animated slice transition.
	 * @param value an array of the unique slice values. In a tabular model these are the unique values in the column that will determin the chart's slices.
	 * @returns the next stage of the chart
	 */
	chart.sliceSet = function (value: string[]) {
		sliceSet = value;
		if (typeof updateSliceSet === "function") updateSliceSet();
		return chart;
	};

	/**
	 * Sets the sliceColor varaible. These are the colors used to differentiate slices, and the color scale to differentiate rings
	 * @param value an object whose keys are slice values and whose values are color gradient arrays for each slice
	 * @returns the next stage of the chart
	 */
	chart.sliceColors = function (value: { [slice: string]: string[] }) {
		sliceColors = value;
		return chart;
	};

	//ring
	/**
	 * Sets the ringKey varaible. The value must be a feild in the data.
	 * If the chart is already initilized, then this funciton additionaly calls the ring key update handler and removes the old rings.
	 * @param value a key for accessing the ring value from the data. In a tabular model this is the header of the column that will determin the chart's rings
	 * @returns the next stage of the chart
	 */
	chart.ringKey = function (value: string) {
		ringKey = value;
		if (typeof updateRingKey === "function") updateRingKey();
		return chart;
	};

	/**
	 * Sets the ringSet varaible. There is one ring per member and the order of the array determins the order of the rings.
	 * If the chart is already initilized, then this funciton additionaly calls the ring set update handler, resulting in an animated ring transition.
	 * @param value an array of the unique ring values.  In a tabular model these are the unique values in the column that will determin the chart's rings.
	 * @returns the next stage of the chart
	 */
	chart.ringSet = function (value: string[]) {
		ringSet = value;
		if (typeof updateRingSet === "function") updateRingSet();
		return chart;
	};

	//colors
	/**
	 * Sets the colorKey varaible. The value must be a feild in the data.
	 * If the chart is already initilized, then this funciton additionaly calls the color key update handler.
	 * @param value a key for accessing the color value from the data. In a tabular model this is the header of the column that will determin a color coding for each row
	 * @returns the next stage of the chart
	 */
	chart.colorKey = function (value: string) {
		colorKey = value;
		if (typeof updateColorKey === "function") updateColorKey();
		return chart;
	};

	/**
	 * Sets the colorScale variable and chagnes the colors of the data in the chart.
	 * If the chart is already initilized, then this funciton additionally calls the color scale update handler.
	 * @param scale an object whose keys the unique values accessed by the color key and whose values are hex colors. In a tabular model the color scale returns a hex color for each unique value in the column that determins the data's color coding.
	 * @returns the next state of the chart
	 */
	chart.colorScale = function (scale: { [key: string]: string }) {
		colorScale = scale;
		if (typeof updateColorScale === "function") updateColorScale();
		return chart;
	};

	//shpaes
	/**
	 * Sets the shapeKey varaible. The value must be a feild in the data.
	 * If the chart is already initilized, then this funciton additionaly calls the shape key update handler.
	 * @param value a key for accessing the shape value from the data. In a tabular model this is the header of the column that will determin a shape coding for each row
	 * @returns the next stage of the chart
	 */
	chart.shapeKey = function (value: string) {
		shapeKey = value;
		if (typeof updateShapeKey === "function") updateShapeKey();
		return chart;
	};

	/**
	 * Sets the shapeScale variable and chagnes the shapes of the data in the chart.
	 * If the chart is already initilized, then this funciton additionally calls the shape scale update handler.
	 * @param scale an object whose keys the unique values accessed by the shape key and whose values are d3 symbol names. In a tabular model the shape scale returns a symbol name for each unique value in the column that determins the data's shape coding.
	 * @returns the next state of the chart
	 */
	chart.shapeScale = function (value: { [key: string]: string }) {
		shapeScale = value;
		if (typeof updateShapeScale === "function") updateShapeScale();
		return chart;
	};

	//measurements
	/**
	 * Sets the chart's margin
	 * @param value the chart's margin
	 * @returns the next state of the chart
	 */
	chart.margin = function (value: Margin) {
		margin = value;
		return chart;
	};

	/**
	 * Sets the width of the chart's canvas
	 * @param value the desired width of the chart's canvas
	 * @returns
	 */
	chart.canvasWidth = function (value: number) {
		canvasWidth = value;
		return chart;
	};

	/**
	 * Sets the height of the chart's canvas
	 * @param value the desired height of the chart's canvas
	 * @returns
	 */
	chart.canvasHeight = function (value: number) {
		canvasHeight = value;
		return chart;
	};

	return chart;
}
export { pizzaChart };
