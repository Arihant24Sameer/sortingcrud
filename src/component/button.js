import React from "react";
import { Button } from "react-bootstrap";

const CustomButton = ({
  variant,
  onClick,
  className,
  children,
  type,
  name,
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      onClick={onClick}
      className={className}
      name={name}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
