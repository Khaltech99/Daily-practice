import React, { useLayoutEffect, useState } from "react";
import { Toaster } from "sonner";

const Wrapper = () => {
  const [position, setPosition] = useState("top-center");

  useLayoutEffect(() => {
    const updatePosition = () => {
      const isMobile = window.innerWidth <= 768;
      setPosition(isMobile ? "top-center" : "bottom-right");
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [position]);

  return <Toaster richColors position={position} />;
};

export default Wrapper;
