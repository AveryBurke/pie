import { BaseType, select, Selection } from "d3-selection";
import { easePolyInOut } from "d3-ease";
import { timer } from "d3-timer";
import transition from 'd3-transition' //<--there's some kind of bug in d3 where I have to import transition into the namespace to use select(...).transition()

/**
 * sets the initial conditions of the rendering function
 * @example
 * //initilize the background
 * const background = backgroundRederer()
 *      .queue(soneQueue)
		.generator(d3.arc())
		.interpolator(someInterpolater)
		.draw(() => someDrawCallback())
    //then call the background on a document
    d3.select(document)
        .call(background)
    
 * @returns the render function
 */
function backgroundRederer(): typeof renderer {
    let queue: QueueInterface<QueueTask>,
        tasks: QueueTask,
        interpolator: (from: any, to: any) => (t: number) => any,
        generator: any,
        draw: UpdateHandler,
        dequeue: UpdateHandler,
        enqueue: UpdateHandler
    /**
     * transitions are appended to the document and then extracted by the calling function and drawn to a canvas, using a callback.
     * methods for setting and the outer-scope variable are exposed to the calling function.
     * Once the rednerer is initilized actions are enqueued and dequeued to the renderer. 
     * The two types of actions are actions that change the duration of the animated transtioins and actions containing the information for intermediate transitiosn.
     * Enqueuing does not result in a change in animation. The calling function must use the dequeue method, then all the items in the queue are processed in order
     * @param selection a d3 selection of a document
     */
    function renderer(selection: Selection<Document, unknown, null, undefined>) {
        selection.each(function () {
            const dataContainer = select(this).append('custom')
            //private variables
            let duration = 250,
                /** keeps tack of the current path property associated to the data, for path transitions */
                current: { [id: string]: any } = {},
                transitionId = ''
            
            /** exposes the queue's enqueue method to the calling function */
            enqueue = function () {
                queue.enqueue(tasks)
            }
            
             /** exposes the queue's enqueue method to the calling function */
            dequeue = function () {
                let currentTask = queue.dequeue()
                if (currentTask) {
                    const { type, input } = currentTask
                    switch (type) {
                        case 'sections':
                            transitionId = input[0] ? input[0].id : ''
                            updateData(input)
                            break;
                        case 'duration':
                            duration = input
                            dequeue()
                        default:
                            break;
                    }
                } else {
                    duration = 250
                    transitionId = ""
                }
            }

            function updateData(sections: Section[]) {

                const dataBinding = dataContainer.selectAll<HTMLElement, Section>("custom.section")
                    .data(sections, function (d) { return d.id || select(this).attr('id') })

                dataBinding
                    .exit()
                    .each(function () {
                        const id = select(this).attr('id')
                        delete current[id]
                    })
                    .remove()

                transition(dataBinding)

                dataBinding
                    .enter()
                    .append("custom")
                    .attr('id', section => section.id)
                    .classed("section", true)
                    .append('path')
                    .attr('fill', section => section.fill)
                    .attr('d', section => generator(section))
                    .attr('opacity', 1)
                    .each(function (s) {
                        current = { ...current, [s.id]: { ...s } }
                    })
            }

            const transition = function (selection: Selection<HTMLElement, Section, BaseType, unknown>) {
                const t = timer(function (elapsed) {
                    draw();
                    if (elapsed > duration + 100) t.stop();
                })

                selection
                    .select('path')
                    .transition()
                    .duration(duration)
                    .ease(easePolyInOut.exponent(3))
                    .attr('opacity', 1)
                    .attrTween("d", function (a: Section) {
                        const from = { ...current[a.id] }
                        const i = interpolator(from, a);
                        return (t: number): string => {
                            return generator(i(t))
                        };
                    })
                    .attr('fill', d => d.fill)
                    .end()
                    .catch(() => { console.log('rejected ') })
                    .then(() => {
                        selection
                            .each(function (d) {
                                current = { ...current, [d.id]: d }
                            })
                        dequeue()
                    })
            }

            //boot
           dequeue()
        })
    }

    renderer.interpolator = function (value: typeof interpolator) {
        interpolator = value
        return renderer
    }

    renderer.generator = function (value: typeof generator) {
        generator = value
        return renderer
    }

    renderer.draw = function (value: UpdateHandler): typeof renderer {
        draw = value
        return renderer
    }

    renderer.queue = function (value: QueueInterface<QueueTask>) {
        queue = value
        return renderer
    }
    /** exposes the queue's enqueue method to the calling function */
    renderer.enqueue = function (value: QueueTask) {
        tasks = value
        if (typeof enqueue === 'function') enqueue()
        return renderer
    }
    renderer.dequeue = function () {
        if (typeof dequeue === 'function') dequeue()
        return renderer
    }
    return renderer
}

export default backgroundRederer

