import { useRef } from "react";

const useRenderCounter = (name:string) => {
  const counter = useRef(0);
  counter.current++;
  console.log(`${name} rendered ${counter.current} times`);
};

export default useRenderCounter;