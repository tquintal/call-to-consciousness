import { useState, useEffect } from "react";

type ScreenSize = "sm" | "md" | "lg" | "xl";

const useWindowSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>("xl");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("sm");
      } else if (width < 768) {
        setScreenSize("md");
      } else if (width < 1024) {
        setScreenSize("lg");
      } else {
        setScreenSize("xl");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useWindowSize;
