import React, { memo } from "react";
import { Droppable } from "react-beautiful-dnd";
import DragableDIv from "./DragableDiv";

const DroptTarget = ({ droppableId, column, counts }: { droppableId: string, column: { rows: string[] }, counts: { [key: string]: { currentCount: number, previousCount: number } } }) => {
    return (
        <Droppable droppableId={droppableId} key='1'>
            {(provided, snapshot) => {
                return (
                    <div
                        key='droppable'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            width: "100%"
                        }}
                    >
                        {column?.rows?.map((item, index) => {
                            if (counts[item]) {
                                const { previousCount, currentCount } = counts[item]
                                return <DragableDIv key={item} item={item} index={index} previousCount={previousCount} currentCount={currentCount} />
                            }
                        })}
                        {provided.placeholder}
                    </div>
                );
            }}
        </Droppable>
    );
};

export default memo(DroptTarget);