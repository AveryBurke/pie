import React, { Fragment } from "react";

const Selectable = ({ initialValues, selected, handleSelect }: { initialValues: string[], selected: { [key: string]: boolean }, handleSelect: (values: { [key: string]: boolean }) => void }) => {

    const toggleValue = (val: any) => {
        const checked = selected[val]
        const newSelected = {
            ...selected,
            [val]:!checked
        }
        handleSelect(newSelected)
    }


    const divs = initialValues.map((val, i) =>
     <div 
        key={`${val}_${i}`} 
        className="sidebar-component selectable" >
        <label 
            htmlFor={`${val}_${i}`}
            >{val}
            </label>
        <input
            type="checkbox"
            id={`${val}_${i}`}
            name={`${val}_${i}`}
            value={val}
            checked = {!!selected[val]}
            onChange = {(e) => toggleValue(e.currentTarget.value)}
        />
    </div>)
    return (<Fragment>{divs}</Fragment>)
}

export default Selectable
