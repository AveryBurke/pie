import React, { useReducer, useEffect, useRef, } from "react";
import stateReducer from "../reducers/stateReducer";
import { initialState } from "../static/initialState";
import {pizzaChart} from "../d3/pizza";

const GenericContext = React.createContext<Values | null>(null);

const GenericContextProvider = (props: any) => {

  

  const [state, dispatch] = useReducer(stateReducer, initialState)
  const refChart = useRef<Chart>(pizzaChart())

  useEffect(() => { console.log('state ', state) },[state])

  return (
    <GenericContext.Provider
      value={{
        refChart:refChart.current,
        state,
        dispatch
      }}
    >
      {props.children}
    </GenericContext.Provider>
  );
};

export { GenericContext, GenericContextProvider };