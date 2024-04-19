import { useState, useEffect } from "react";

type ScreenSize = "sm" | "md" | "lg" | "xl";

const useWindowSize = (): ScreenSize => {
  const getScreenSize = (width: number): ScreenSize => {
    if (width < 640) {
      return "sm";
    } else if (width < 768) {
      return "md";
    } else if (width < 1024) {
      return "lg";
    } else {
      return "xl";
    }
  };

  const [screenSize, setScreenSize] = useState<ScreenSize>(() => getScreenSize(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize(getScreenSize(width));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useWindowSize;
