import React, { PropsWithChildren } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DropTarget from "./DropTarget";

const reorder = (list: string[], startIndex: number, endIndex: number) => {
	const result = [...list];
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed!);

	return result;
};

/**
 * creates a controle panel of dragable divs with an optoianl column of non-dragable visual guides for the given encoding
 * @param param0 an array of strings, used to create the divs, a callback that takes the next state of the divs, an object that keeps track of the data count for each div and an optional generater that will return a non-sortable div
 * @returns a control pannel with dragable divs and an optional column of non-dragable divs
 */
const Sortable = ({ initialValues, handleSort, counts, optionalDivs }: PropsWithChildren<ComponenetPropsType>) => {
	function onDragEnd(result: any) {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const values = reorder(initialValues, result.source.index, result.destination.index);
		handleSort(values);
	}

	let divs: JSX.Element[] = [];
	if (optionalDivs) divs = initialValues.map((value, i) => optionalDivs(value, `${i}_${value}`));
	return (
		<div style={{ display: "flex" }}>
			<DragDropContext onDragEnd={onDragEnd}>
				<DropTarget droppableId="l" column={{ rows: initialValues }} counts={counts!} />
			</DragDropContext>
			<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>{divs}</div>
		</div>
	);
};

export default Sortable;
