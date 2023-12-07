const Validation = ({ allInputs }) => {
    let errors = {};
  
    if (!/^[a-zA-Z]+$/.test(allInputs.name.trim())) {
      errors.name = "Name should contain only letters and no spaces";
    }
  
    if (/\s/.test(allInputs.email)) {
      errors.email = "Email should not contain spaces";
    }
  
    if (!/^\d+$/.test(allInputs.phone)) {
      errors.phone = "Phone should contain only numbers";
    }
  
    return errors;
  };
  
  export default Validation;
  