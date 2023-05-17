import { RefObject, useEffect, useRef, useState } from "react";
import { useLatest } from "./useLatest";
function useOutsideClick(elementRef:RefObject<HTMLDivElement>, handler:()=>void, attached:boolean=true) {
    const latestHandler = useLatest(handler);
    useEffect(() => {
      if (!attached) return;
      const handleClick = (e:any) => {
        if (!elementRef.current) return;
        if (!elementRef.current.contains(e.target)) {
          latestHandler.current();
        }
      };
        setTimeout(() => document.addEventListener('click', handleClick), 0)
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }, [elementRef,attached,latestHandler]);
  }
export default useOutsideClick