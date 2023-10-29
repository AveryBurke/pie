import { select } from "d3";
import { timer } from "d3-timer";
import deepEqual from "deep-equal";
//@ts-ignore
import { interpolate } from "flubber";
import { interpolateString } from "d3-interpolate";

/**
 * Sets the initial conditions function that renders shape data to a document.
 * @example
 * //initialize a shape renderer
 * const shapeRenderer = shapes()
 * 	.data([])
 * 	.drawShapes(() => someDrawCallback())
 *
 * //call the shape renderer on a document
 * d3.select(document).call(shapeRenderer)
 * @returns a shape rendering function
 */
function shapes(): typeof renderer {
	//params
	let data: Datum[], drawShapes: UpdateHandler, updateData: UpdateHandler;
	/**
	 * Manages animated transitions for shapes.
	 * Methods to update the shapes are exposed through settters.
	 * @param selection a d3 selection of a document. shape data is appended to this and extracted by the calling funciton, thorugh a draw callback
	 */
	function renderer(selection: d3.Selection<Document, unknown, null, undefined>) {
		selection.each(function () {
			//add a custom element to the document.
			//The draw funciotn will extract children from this element, in order to draw the transitions on the canvas.
			const shapeGroup = select(this).append("custom"),
				duration = 200;
			let current: { [id: string]: string } = {};
			/**
			 * uses d3's general update pattern on data in the custom element.
			 * this results in animated chagnes to positions, colors and shapes and removes or adds new data
			 * @see https://observablehq.com/@d3/general-update-pattern
			 */
			updateData = function () {
				const shapesUpdate = shapeGroup.selectAll<HTMLElement, Datum>("custom.shape").data(data, function (d) {
					return d.id || select(this).attr("id");
				});

				shapesUpdate.exit().remove();
				// .each(function () {
				//     const node = select(this)
				//     const id = node.attr('id')
				//     node.remove()
				//     // delete current[id]
				// })

				transition(shapesUpdate);
				const shapesEnter = shapesUpdate.enter();

				shapesEnter
					.append("custom")
					.classed("shape", true)
					.attr("id", (d) => d.id)
					.append("path")
					.attr("x", (d) => d.x)
					.attr("y", (d) => d.y)
					.attr("d", (d) => d.shapeValue)
					.attr("fill", (d) => d.colorValue)
					.attr("opacity", 1)
					.each((d) => {
						current = { ...current, [d.id]: d.shapeValue };
					});
			};

			//helper functions

			/**
			 * call the draw callback on every frame of animation.
			 * @param selection a selection of the elements to be transitioned
			 */
			function transition(selection: d3.Selection<HTMLElement, Datum, any, any>) {
				//stop timer and clear canvas
				const t = timer(function (elapsed) {
					// let e = Math.min(1,ease(elapsed/300))
					drawShapes();
					if (elapsed > 300) t.stop();
				});
				selection
					.select("path")
					.transition()
					.duration(duration)
					.attr("fill", (d) => d.colorValue)
					.attr("x", (d) => d.x)
					.attr("y", (d) => d.y)
					.attr("opacity", 1)
					.attrTween("d", function (d) {
						const from = current[d.id],
							to = d.shapeValue;
						const fromPathCommands = from.match(/[a-zA-Z]/g),
							toPathCommands = to.match(/[a-zA-Z]/g);
						//only use flubber if the paths are for different shapes. if the paths are for different shapes, then the path commands will be different
						const i = deepEqual(fromPathCommands, toPathCommands, { strict: true }) ? interpolateString(from, to) : interpolate(from, to);
						return (t: number): string => {
							return i(t);
						};
					})
					.end()
					.catch(() => {
						return;
					})
					.then(() => {
						//save the new current path for the next step the the transition
						selection.each((d) => (current = { ...current, [d.id]: d.shapeValue }));
					});
			}

			//boot
		});
	}
	//setters
	/**
	 * sets the data. 
	 * Ff the shape renderer is already initlized additionaly calls the update hanlder for data which uses d3's general update pattern on data in the custom element.
	 * this results in animated chagnes to positions, colors and shapes and removes or adds new data
	 * @see https://observablehq.com/@d3/general-update-pattern
	 * @param value array of data
	 * @returns the next state of the shape renderer
	 */
	renderer.data = function (value: Datum[]) {
		data = value;
		if (typeof updateData === "function") updateData();
		return renderer;
	};
	/**
	 * 
	 * @param value a callback that will select all custom.shape classed elements from the document and draw them to a canvas
	 * @returns a shape renderer with the update handler set
	 */
	renderer.drawShapes = function (value: UpdateHandler) {
		drawShapes = value;
		return renderer;
	};

	return renderer;
}

export default shapes;
