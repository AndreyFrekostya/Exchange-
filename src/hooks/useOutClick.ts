import { RefObject, useEffect, useRef, useState } from "react";
import { useLatest } from "./useLatest";
function useOutsideClick(elementRef:RefObject<HTMLDivElement>, handler:()=>void, attached:boolean) {
    const latestHandler = useLatest(handler);
    console.log( attached)
    useEffect(() => {
      if (!attached) return;
      const handleClick = (e:any) => {
        if (!elementRef.current) return;
        if (!elementRef.current.contains(e.target)) {
            e.stopPropagation()
          latestHandler.current();
          console.log(e.target, attached)
        }
      };
  
      document.addEventListener("click", handleClick);
  
      return () => {
        document.removeEventListener("click", handleClick);
        console.log('ds')
      };
    }, [elementRef, latestHandler, attached]);
  }
export default useOutsideClick