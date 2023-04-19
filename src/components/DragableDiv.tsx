import React, { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import CountUp from 'react-countup'

function DragableDiv({ item, index, previousCount, currentCount }:{item:string, index:number, previousCount:number, currentCount:number}) {
  return (
    <Draggable isDragDisabled = {currentCount === 0} key={item} draggableId={`_${index}_${item}`} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={ `sidebar-component sortable ${currentCount === 0 ? 'disabled' : ''}` }
          >
            <span >{item}</span>
            <CountUp start = {previousCount} end = {currentCount}/>
          </div>
        );
      }}
    </Draggable>
  );
}

export default memo(DragableDiv);