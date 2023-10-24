import { select } from "d3-selection";
import { interpolate } from "d3-interpolate";
import { arc } from "d3-shape";
import { Queue } from "../static/queue";
import renderBackground from "../d3/renderBackground";
import { svgPathProperties } from "svg-path-properties";
import earcut from "earcut";
import partitionNumber from "../static/partitionNumber";
import IndexedSet from "../static/indexedSet";
// @ts-ignore
import xmldom from "../domparser_bundle";

const DOMImplementation = xmldom.DOMImplementation;

const backgroundWorker: Worker = self as any;

class worker {
	background: ReturnType<typeof renderBackground> = renderBackground();
	ctx: OffscreenCanvasRenderingContext2D | null = null;
	canvasHeight = 0;
	canvasWidth = 0;
	dom: Document = new DOMImplementation().createDocument();
	ratio = 2;
	generator = arc();
	ringSet: string[] = [];
	ringHeights: { [ring: string]: { innerRadius: number; outerRadius: number } } = {};
	sliceSet: string[] = [];
	sliceAngles: { [slice: string]: { startAngle: number; endAngle: number } } = {};
	sliceColors: { [slice: string]: string[] } = {};
	path = arc()({ innerRadius: 50, outerRadius: 300, startAngle: 0, endAngle: (97 * Math.PI) / 180 });
	poly = [10, 0, 0, 50, 60, 60, 70, 10];
	arcCount: { [arc_id: string]: number } = {};
	/** assigne an int to each id, for conding ids a texture */
	idSet = new IndexedSet();
	setContext(ctx: OffscreenCanvasRenderingContext2D) {
		this.ctx = ctx;
	}

	setDimensions(w: number, h: number, r: number) {
		this.canvasWidth = w;
		this.canvasHeight = h;
		this.ratio = r;
	}

	updateArcCount(arcCount: { [arc_id: string]: number }) {
		this.arcCount = arcCount;
	}

	draw() {
		const { ctx, canvasWidth, canvasHeight, ratio } = this;
		if (ctx) {
			ctx.save();
			ctx.clearRect(0, 0, Math.floor(canvasWidth * ratio), Math.floor(canvasHeight * ratio));
			ctx.lineWidth = 0.75;
			ctx.setTransform(ratio, 0, 0, ratio, Math.floor(canvasWidth * ratio) / 2, Math.floor(canvasHeight * ratio) / 2);
			select(this.dom)
				.selectAll("custom.section")
				.each(function (d: any, i) {
					const path = select(this).select("path"),
						id = select(this).attr("id"),
						fill = path.attr("fill"),
						opacity = +path.attr("opacity"),
						svgPath = path.attr("d");
					ctx.strokeStyle = "#000000";
					ctx.fillStyle = fill;
					ctx.globalAlpha = 0.9; //<-- make the background a little opaqu so the shapes stand out
					if (svgPath && ctx && !id.includes("_border")) {
						ctx.stroke(new Path2D(svgPath));
						ctx.fill(new Path2D(svgPath));
					}
				});
			ctx.globalAlpha = 1;

			ctx.restore();
		}
	}

	/** "add" and "remove" are only for the id set. there is no penalty for duplicate adds*/
	generateArcs(state: "add" | "remove" = "add") {
		const { ringSet, ringHeights, sliceSet, sliceColors, sliceAngles, arcCount } = this;
		return sliceSet.reduce<Section[]>((acc, slice) => {
			if (sliceAngles[slice]) {
				const { startAngle, endAngle } = sliceAngles[slice]!;
				const sections = ringSet.reduce<Section[]>((acc, ring, j) => {
					if (ringHeights[ring]) {
						const { innerRadius, outerRadius } = ringHeights[ring]!;
						const id = `_${slice}_${ring}`;
						const subsections: Subsection[] = [];
						if (arcCount[id] > 300 && state === "add") {
							const partitions = partitionNumber(arcCount[id], Math.ceil(arcCount[id] / 300));
							if (partitions) {
								for (let i = 0; i < partitions.length; i++) {
									const subarcId = id + `_subarc_${i}`;
									arcCount[subarcId] = partitions[i];
									this.idSet.insert(subarcId);
									const theta = endAngle - startAngle;
									const sa = startAngle + i * (theta / partitions.length);
									const ea = startAngle + (i + 1) * (theta / partitions.length);
									subsections.push({ startAngle: sa, endAngle: ea, innerRadius, outerRadius, id: subarcId });
								}
							}
						} else if (state === "add") {
							this.idSet.insert(id);
							subsections.push({ id, innerRadius, outerRadius, endAngle, startAngle });
						}
						if (state === "remove") {
							this.idSet.remove(id);
							if (arcCount[id] > 300) {
								for (let i = 0; i < Math.ceil(arcCount[id] / 300); i++) {
									const subid = id + `_subarc_${i}`;
									this.idSet.remove(subid);
								}
							}
						}
						const slicePallet = sliceColors[slice]!;
						const fill = slicePallet[j % slicePallet.length]!;
						const arc = { id, innerRadius, outerRadius, startAngle, endAngle, fill, subsections };
						acc = [...acc, arc];
					}
					return acc;
				}, []);
				acc = [...acc, ...sections];
			}
			return acc;
		}, []);
	}

	initChart(
		ringSet: string[],
		ringHeights: { [ring: string]: { innerRadius: number; outerRadius: number } },
		sliceSet: string[],
		sliceAngles: { [slice: string]: { startAngle: number; endAngle: number } },
		sliceColors: { [slice: string]: string[] }
	) {
		const queue = new Queue<QueueTask>();
		this.sliceColors = sliceColors;
		this.ringSet = ringSet;
		this.ringHeights = ringHeights;
		this.sliceSet = sliceSet;
		this.sliceAngles = sliceAngles;
		const initialSections: Section[] = sliceSet.flatMap((slice, i) => {
			const { startAngle, endAngle } = sliceAngles[slice]!;
			return ringSet.map((ring, j) => {
				const { innerRadius, outerRadius } = ringHeights[ring]!;
				const id = `_${slice}_${ring}_init`;
				this.idSet.insert(id);
				const slicePallet = sliceColors[slice]!;
				const fill = slicePallet[j % slicePallet.length]!;
				return { id, innerRadius, outerRadius, startAngle, endAngle, fill, subsections: [] };
			});
		});

		queue.enqueue({ type: "sections", input: initialSections });

		select(this.dom).call(
			this.background
				.queue(queue)
				.generator(arc())
				.interpolator(interpolate)
				.draw(() => this.draw())
		);
	}

	updateSliceAngles(sliceAngles: { [slice: string]: { startAngle: number; endAngle: number } }) {
		this.sliceAngles = sliceAngles;
	}

	updateRingHeights(ringHeights: { [ring: string]: { innerRadius: number; outerRadius: number } }) {
		this.ringHeights = ringHeights;
	}

	updateSliceSet(sliceSet: string[], sliceAngles: { [slice: string]: { startAngle: number; endAngle: number } }, sliceColors: { [key: string]: string[] }) {
		const { sliceSet: oldSliceSet } = this;
		this.sliceSet = sliceSet;
		this.sliceColors = sliceColors;
		if (oldSliceSet.length === 0) {
			this.sliceAngles = Object.fromEntries(sliceSet.map((slice) => [slice, { startAngle: 0, endAngle: 0 }]));
			const startSlices: QueueTask = { type: "sections", input: this.generateArcs() };
			this.background.enqueue(startSlices);
		}
		this.sliceAngles = sliceAngles;
		// this.getPathPoints()
		const endSlices: QueueTask = { type: "sections", input: this.generateArcs() };
		this.background.enqueue(endSlices);
		this.background.dequeue();
		// this.getPathPoints()
	}

	removeSlices() {
		//enqueue the transition, but don't dequeue it
		const { sliceSet } = this;
		const outGointSliceAngles = Object.fromEntries(sliceSet.map((slice) => [slice, { startAngle: 2 * Math.PI, endAngle: 2 * Math.PI }]));
		this.sliceAngles = outGointSliceAngles;
		const leavingArcs: QueueTask = { type: "sections", input: this.generateArcs("remove") };
		this.background.enqueue({ type: "duration", input: 400 });
		this.background.enqueue(leavingArcs);
		this.sliceSet = [];
	}

	updateRingSet(ringSet: string[], ringHeights: { [ring: string]: { innerRadius: number; outerRadius: number } }) {
		const { ringSet: oldRingSet } = this;
		this.ringSet = ringSet;
		if (oldRingSet.length === 0) {
			this.background.enqueue({ type: "duration", input: 400 / ringSet.length });
			const startingHeights = Object.fromEntries(ringSet.map((ring) => [ring, { innerRadius: 0, outerRadius: 0 }]));
			this.ringHeights = startingHeights;
			this.background.enqueue({ type: "sections", input: this.generateArcs() });
			ringSet.forEach((ring, i) => {
				const intermediateRingSet = ringSet.slice(i);
				const { innerRadius, outerRadius } = ringHeights[ring]!;
				this.ringHeights[ring] = { innerRadius, outerRadius };
				intermediateRingSet.forEach((ring) => (this.ringHeights[ring] = { innerRadius, outerRadius }));
				const arcsWIthRing = this.generateArcs();
				this.background.enqueue({ type: "sections", input: arcsWIthRing });
			});
		}
		this.ringHeights = ringHeights;
		this.background.enqueue({ type: "sections", input: this.generateArcs() });
		this.background.dequeue();
		// this.getPathPoints();
	}

	removeRings() {
		const { ringSet } = this;
		this.background.enqueue({ type: "duration", input: 400 / ringSet.length });
		ringSet.forEach((ring, i) => {
			const { outerRadius } = this.ringHeights[ring]!;
			this.ringHeights[ring] = { innerRadius: outerRadius, outerRadius };
			const arcsWIthRing = this.generateArcs("remove");
			this.background.enqueue({ type: "sections", input: arcsWIthRing });
			this.ringSet = ringSet.slice(i);
			delete this.ringHeights[ring];
		});
		this.ringSet = [];
	}

	/**
	 * sectionVerts = triangulation of the arcs.
	 * sectionCoords = [random x coordinate, random y coordinate, integer id of the containing arc][]
	 *
	 * @postMessage {sectionVerts:number[], sectionCoords:[number, number, number][] }
	 */
	getPathPoints(arcIds: Set<string>) {
		const { generator } = this;
		const sectionCoords: [number, number, number][] = [];
		const sectionVerts: number[] = [];
		const arcs = this.generateArcs(); //<--NOTE: destrcutring the method from "this" causes an error. look into that
		const { idSet, arcCount } = this;
		arcs.forEach(function (d, i) {
			//itterate through subsections
			if (arcIds.has(d.id)) {
				d.subsections.forEach((sub) => {
					// triangulate the polygon
					const path = generator(sub) || "",
						num_points = 100,
						points: number[] = [],
						pathProperties = new svgPathProperties(path),
						pathLength = pathProperties.getTotalLength();
					for (let i = 0; i < num_points; ++i) {
						let { x, y } = pathProperties.getPointAtLength((i * pathLength) / (num_points - 1));
						points.push(x);
						points.push(y);
					}
					const idIndex = idSet.getIndex(sub.id);
					const ears = earcut(points); //<--returns the indexes of x coordinates of the triangle vertices in the points array
					//fetch the coordiantes of the triangle vertices from the points array
					for (let i = 0; i < ears.length; i++) {
						const index = ears[i] * 2;
						sectionVerts.push(points[index], points[index + 1], idIndex);
					}
					const { startAngle, endAngle, innerRadius, outerRadius, id } = sub;
					// const centroid = arc().centroid({startAngle, endAngle, innerRadius, outerRadius})
					for (let i = 0; i < arcCount[id]; ++i) {
						const randomClampedR = Math.random() * (outerRadius - innerRadius) + innerRadius,
							randomClampedTheta = Math.random() * (endAngle - startAngle) + startAngle - Math.PI / 2,
							x = Math.cos(randomClampedTheta) * randomClampedR,
							y = Math.sin(randomClampedTheta) * randomClampedR;
						sectionCoords.push([x, y, idIndex]);
						// const jitterX = Math.random()
						// const jitterY = Math.random()
						// sectionCoords.push(centroid[0] + jitterX, centroid[1] + jitterY, idIndex)
					}
				});
			}
		});
		self.postMessage({ sectionVerts, sectionCoords });
	}
}

const brw = new worker();

self.addEventListener("message", (msg: MessageEvent<BackgroundWorkerAction>) => {
	const { type, payload } = msg.data;
	switch (type) {
		case "set_ctx":
			{
				const ctx = payload.canvas.getContext("2d");
				brw.setContext(ctx!);
			}
			break;
		case "set_dimensions":
			{
				const { w, h, r } = payload;
				brw.setDimensions(w, h, r);
			}
			break;
		case "init_chart":
			{
				const { ringSet, ringHeights, sliceSet, sliceAngles, sliceColors } = payload;
				brw.initChart(ringSet, ringHeights, sliceSet, sliceAngles, sliceColors);
			}
			break;
		case "update_slice_set":
			{
				const { sliceSet, sliceAngles, sliceColors } = payload;
				brw.updateSliceSet(sliceSet, sliceAngles, sliceColors);
			}
			break;
		case "update_ring_set":
			{
				const { ringSet, ringHeights } = payload;
				brw.updateRingSet(ringSet, ringHeights);
			}
			break;
		case "remove_rings":
			{
				brw.removeRings();
			}
			break;
		case "remove_slices":
			{
				brw.removeSlices();
			}
			break;
		case "update_arc_count":
			{
				brw.updateArcCount(payload.arcCount);
			}
			break;
		case "update_ring_heights":
			{
				brw.updateRingHeights(payload.ringHeights);
			}
			break;
		case "update_slice_angles":
			{
				brw.updateSliceAngles(payload.sliceAngles);
			}
			break;
		case "get_points":
			{
				brw.getPathPoints(payload.arcIds);
			}
			break;
		default:
			break;
	}
});
