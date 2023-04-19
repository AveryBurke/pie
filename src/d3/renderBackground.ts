import { select, Selection, BaseType } from "d3";
import { easePolyInOut } from "d3-ease";
import { timer } from "d3-timer";

function pizza(): typeof chart {
    let queue: QueueInterface<QueueTask>,
        tasks: QueueTask,
        interpolator: (from: any, to: any) => (t: number) => any,
        generator: any,
        draw: UpdateHandler,
        dequeue: UpdateHandler,
        enqueue: UpdateHandler
    function chart(selection: Selection<Document, unknown, null, undefined>) {
        selection.each(function () {
            const dataContainer = select(this).append('custom')
            //private variables
            let duration = 250,
                current: { [id: string]: any } = {},
                transitionId = ''

            enqueue = function () {
                queue.enqueue(tasks)
            }

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

    chart.interpolator = function (value: typeof interpolator) {
        interpolator = value
        return chart
    }

    chart.generator = function (value: typeof generator) {
        generator = value
        return chart
    }

    chart.draw = function (value: UpdateHandler): typeof chart {
        draw = value
        return chart
    }

    chart.queue = function (value: QueueInterface<QueueTask>) {
        queue = value
        return chart
    }
    chart.enqueue = function (value: QueueTask) {
        tasks = value
        if (typeof enqueue === 'function') enqueue()
        return chart
    }
    chart.dequeue = function () {
        if (typeof dequeue === 'function') dequeue()
        return chart
    }
    return chart
}

export default pizza

