import React, { useState, useContext } from "react";
import { GenericContext } from "../contexts/Context";
import makeState from "../static/makeState";

const GenerateData = () => {
    if (GenericContext){
        const { dispatch, numberOfUsers } = useContext(GenericContext)!
        const [numberOfRows, setNumberOfRows] = useState<number>(100)
        const handleClick = () => {
            const randomState = makeState(numberOfRows)
            if (dispatch) dispatch({ type: 'update_state', payload: randomState })
        }
    
        return (
            <div className="sidebar-component">
                <input id="number_of_rows" min={1} type="number" placeholder={`${numberOfUsers} users`} onChange={e => setNumberOfRows(+e.target.value)} />
                <div className="component-button" onClick={handleClick}>generate new users</div>
            </div>
        )
    }
    return <div></div>
}

export default GenerateData