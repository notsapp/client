import { useState, useEffect } from "react";

export type WindowSize = {
    width: string | number,
    height: string | number
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: "100vw",
    height: "100vh",
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
  }, []);
  return windowSize;
}