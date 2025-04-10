import React from "react";

const Wrapper = ({ children, styles = "p-4", onClick }) => {
  return (
    <div className={`${styles}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Wrapper;
