const validateInputs = (input) => {
  const errors = {};

  if (!input.firstName.trim()) {
    errors.firstName = "First Name is required";
  } else if (!/^[A-Za-z]{3,}$/.test(input.firstName)) {
    errors.firstName = "First Name should contain at least 3 letters";
  }

  if (!input.email.trim()) {
    errors.email = "Email is required";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.email)
  ) {
    errors.email = "Invalid email format";
  }

  if (!input.phone.trim()) {
    errors.phone = "Phone is required";
  } else if (!/^\d{10}$/.test(input.phone)) {
    errors.phone = "Invalid phone number";
  }

  return errors;
};

export default validateInputs;
