import { useState } from "react";

const useForm = (validate) => {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    jobtitle: "",
    companyname: "",
    email: "",
    website: "",
    phone: "",
    mobile: "",
    postbox: "",
    address: "",
    username: "",
    password: "",
    password2: "",
    others: "",
    login: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidation = () => {
    setErrors(validate(inputs));
    return validate(inputs);
  };

  return { handleChange, inputs, handleValidation, errors };
};

export default useForm;
