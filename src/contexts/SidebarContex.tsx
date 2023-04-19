import React, { useState } from "react";

type Values = {
    sidebarState:'open' | 'close',
    setSidebarState:React.Dispatch<React.SetStateAction<"open" | "close">>
}

const SidebarContext = React.createContext< Values | null>(null);

const SidebarContextProvider = (props: any) => {

  const [sidebarState, setSidebarState] = useState<'open' | 'close'>('open')

  return (
    <SidebarContext.Provider
      value={{
        sidebarState,
        setSidebarState
      }}
    >
      {props.children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarContextProvider };