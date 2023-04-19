import React, { useReducer, useEffect, } from "react";
import filterReducer from "../reducers/filterReducer";
import { dummyValue } from "../static/initialState";

const FilterContext = React.createContext<{ filter: Filter, filterDispatch: React.Dispatch<FilterDispatch> } | null>(null);

const FilterContextProvider = (props: any) => {

  const [filter, filterDispatch] = useReducer(filterReducer, {
    key: `${dummyValue}_filter_key`,
    set: [`${dummyValue}_filter_value`],
    selected: { [`${dummyValue}_filter_value`]: false },
    lastChange:'reset_filter'
  })

  useEffect(() => { console.log('filter ', filter) }, [filter])

  return (
    <FilterContext.Provider
      value={{
        filter,
        filterDispatch
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterContextProvider };