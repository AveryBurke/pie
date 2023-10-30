import React, { Fragment, PropsWithChildren } from "react";

/**
 * create a controle pannel of divs with checkboxes. Fire the handleSelect callback when a checkbox is selected
 * @param param0 an array of values, to create the initial divs, an object representing which checkboxes are checked and a callback that takes the next checked state
 * @returns 
 */
const Selectable = ({ initialValues, selected, handleSelect }: PropsWithChildren<SelectableProbs>) => {

    /**
     * toggle the the selected state of the selected checkbox and pass the new selected object to the callback
     * this will result in a change to state that will end up passing the new selected state to back to the component
     * @param val the value of the selected checkbox
     */
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
