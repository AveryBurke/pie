import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DropTarget from "./DropTarget";

const reorder = (list: string[], startIndex: number, endIndex: number) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed!);

  return result;
};



const Sortable = (props:ComponenetPropsType) => {
  const { initialValues, handleSort, counts, optionalDivs } = props
  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const values = reorder(
      initialValues,
      result.source.index,
      result.destination.index
    );
    handleSort(values);
  }

  let divs: JSX.Element[] = []
  if (optionalDivs) divs = initialValues.map((value, i) => optionalDivs(value,`${i}_${value}`))
  return (
    <div style={{display:'flex'}}>
      <DragDropContext onDragEnd={onDragEnd}>
        <DropTarget droppableId="l" column={{ rows: initialValues }} counts = {counts!} />
      </DragDropContext>
      <div style={{display:'flex', flexDirection:"column", justifyContent:"space-around"}}>
        {divs}
      </div>
    </div>
  );
}

export default Sortable
