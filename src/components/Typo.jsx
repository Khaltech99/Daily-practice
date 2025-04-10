import React from "react";

const Typo = ({ children, styles, onClick }) => {
  return (
    <div className={`${styles}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Typo;
