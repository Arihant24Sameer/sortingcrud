import React from 'react';
import Switch from 'react-switch';

const ToggleButton = ({ onToggle }) => {
  const [isOn, setIsOn] = React.useState(false);

  return (
    <Switch
      checked={isOn}
      onChange={() => {
        setIsOn(!isOn);
        onToggle();
      }}
    />
  );
};

export default ToggleButton;