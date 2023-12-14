import React from "react";

const Input = ({ label, type, value, onChange ,placeholder,className}) => {
  return (
    <div>
      <input type={type} className={className} placeholder={placeholder} id={label} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
