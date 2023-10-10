import React, { useReducer, useEffect, useRef, } from "react";
import stateReducer from "../reducers/stateReducer";
import makeState from "../static/makeState";
import {pizzaChart} from "../d3/pizza";

const GenericContext = React.createContext<Values|{refChart:null,state:null,dispatch:null,numberOfUsers:null}>({refChart:null,state:null,dispatch:null,numberOfUsers:null});
function getRandomInt(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const GenericContextProvider = (props: any) => {

  const numberOfUsers = getRandomInt(20, 400)

  const [state, dispatch] = useReducer(stateReducer, makeState(numberOfUsers))
  const refChart = useRef<Chart>(pizzaChart())

  useEffect(() => { console.log('state ', state) },[state])

  return (
    <GenericContext.Provider
      value={{
        refChart:refChart.current,
        state,
        numberOfUsers,
        dispatch
      }}
    >
      {props.children}
    </GenericContext.Provider>
  );
};

export { GenericContext, GenericContextProvider };