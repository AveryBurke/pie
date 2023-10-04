import {select} from "d3";
import { timer } from "d3-timer";
import deepEqual from "deep-equal";
//@ts-ignore
import { interpolate } from 'flubber';
import { interpolateString } from "d3-interpolate";



type UpdateHandler = () => void
type Subscriber = (data:any) => void

function shapes():typeof chart {
    //params
    let data:Datum[],
        radius:number,
        colorSet:string[],
        colorValues:{[key:string]:string},
        shapeSet:string[],
        shapeValues:{[key:string]:string},
        // drag:any,
        boot:boolean,
        subscribers:Subscriber[] = [],
        subscribe:Subscriber,
        drawShapes:UpdateHandler,
        alertSubscribers:UpdateHandler,
        updateData:UpdateHandler,
        updateRadius:UpdateHandler,
        updateColorSet:UpdateHandler,
        updateColorValues:UpdateHandler,
        updateShapeSet:UpdateHandler,
        updateShapeValues:UpdateHandler,
        updateBorderValues:UpdateHandler

    function chart(selection:d3.Selection<Document, unknown, null, undefined>) {
        selection.each(function () {

            // const canvas = select(this)

            const shapeGroup = select(this).append("custom"),
                duration = 200
            let current:{[id:string]:string} = {}
            updateData = function() {
                console.log({data})
                //remove unused data from table            
                const shapesUpdate = shapeGroup
                    .selectAll<HTMLElement, Datum>('custom.shape')
                    .data(data, function(d){
                        return d.id || select(this).attr('id')
                    }) 

                shapesUpdate
                    .exit()
                    .remove()
                    // .each(function () {
                    //     const node = select(this)
                    //     const id = node.attr('id')
                    //     node.remove()
                    //     // delete current[id]
                    // })
                    
                transition(shapesUpdate)
                const shapesEnter = shapesUpdate.enter()
                
                shapesEnter
                    .append("custom")
                    .classed('shape', true)
                    .attr('id', d => d.id)
                    .append('path')
                    .attr('x', d => d.x)
                    .attr('y', d => d.y)
                    .attr('d', d => shapeValues[d.shapeValue])
                    .attr('fill', d => colorValues[d.colorValue])
                    .attr('opacity', 1)
                    .each(d => {
                        current = {...current,[d.id]:shapeValues[d.shapeValue]}
                    })
            }
            
            updateRadius = function(){
                updateData()
            }

            updateColorSet = function () {
                updateData()
            }

            updateColorValues = function () {
                if (data.every(d => colorValues[d.colorValue])){
                    updateData()
                }
            }

            updateShapeSet = function () {
                updateData()
            }

            updateShapeValues = function () {
                data.forEach(d => current = {...current,[d.id]:shapeValues[d.shapeValue]})
                if (data.every(d => shapeValues[d.shapeValue])){
                    updateData()
                }
            }


            alertSubscribers = function () {
                // subscribers.forEach(subscriber => {
                //     subscriber({...table})
                // })
            }

            //helper functions

            function updateSubscribers(){
                    alertSubscribers()
            }

            function transition(selection:d3.Selection<HTMLElement,Datum,any,any>) {
                //stop timer and clear canvas
                const t = timer(function(elapsed) {
                    // let e = Math.min(1,ease(elapsed/300))
                    drawShapes();
                    if (elapsed > 300) t.stop();
                })
                // if (!data.every(d => shapeValues[d.shapeValue])) return
                selection
                    .select('path')
                    .transition()
                    .duration(duration)
                    .attr('fill', d => colorValues[d.colorValue])
                    .attr('x', d => d.x)
                    .attr('y', d => d.y)
                    .attr('opacity', 
                        (d):number => 
                            colorSet.includes(d.colorValue) && 
                            shapeSet.includes(d.shapeValue) ?
                            1 : 0
                    )
                    .attrTween("d", function(d){
                        const from = current[d.id],
                        to = shapeValues[d.shapeValue]
                        const
                        fromPathCommands = from.match(/[a-zA-Z]/g),
                        toPathCommands = to.match(/[a-zA-Z]/g)
                        //only use flubber if the paths are for different shapes
                        const i = deepEqual(fromPathCommands,toPathCommands,{strict:true}) ? interpolateString(from, to) : interpolate(from,to)                
                        return (t:number):string => {
                                return i(t)
                        }
                    })
                    .end()
                    .catch(() => {return})
                    .then(() => {
                        selection
                            .each(d => current = {...current,[d.id]:shapeValues[d.shapeValue]})
                        alertSubscribers()
                    })

            }

            //boot

        });
    }
    //gets and setters
    chart.data = function(value:Datum[]) {
            // if (!arguments.length) return data;
            data = value;
            if (typeof updateData === 'function') updateData();
        return chart;
	};

    chart.colorSet = function(value:Array<string>) {    
        // if (!arguments.length) return colorSet;
        colorSet = value;
        if (typeof updateColorSet === 'function') updateColorSet();
    return chart;
    };

    chart.colorValues = function(value:{[key:string]:string}) {    
        colorValues = value;
        if (typeof updateColorValues === 'function') updateColorValues();
    return chart;
    };

    chart.shapeValues = function(value:{[key:string]:string}) {    
        if (!arguments.length) return shapeValues;
        shapeValues = value;
        if (typeof updateShapeValues === 'function') updateShapeValues();
    return chart;
    };

    type C = typeof chart

    chart.shapeSet = function(value:string[]): C | string[] {    
        if (!arguments.length) return shapeSet;
        shapeSet = value;
        if (typeof updateShapeSet === 'function') updateShapeSet();
    return chart;
    };


    chart.radius = function(value:number){
        if (!arguments.length) return radius;
        radius = value;
        if (typeof updateRadius === 'function') updateRadius();
    return chart
    }

    chart.boot = function (value:typeof boot):typeof chart {
        boot = value
        return chart
    }

    chart.subscribe = function (value:Subscriber) {
        subscribers = [...subscribers,value]
        return chart
    }

    chart.drawShapes = function (value:UpdateHandler) {
        drawShapes = value
        return chart
    }

    return chart
}

export default shapes