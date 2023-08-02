export default function ValidateInfo(inputs) {
  let errors = {};
  const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])(?=.*[a-zA-Z0-9]).{8,}$/;
  // FIRST NAME
  if (!inputs.firstname.trim()) {
    errors.firstname = "error";
  } else {
    errors.firstname = "success";
  }

  // LASTNAME
  if (!inputs.lastname.trim()) {
    errors.lastname = "error";
  } else {
    errors.lastname = "success";
  }

  //JOB TITLE
  if (!inputs.jobtitle) {
    errors.jobtitle = "error";
  } else {
    errors.jobtitle = "success";
  }

  //COMPANY NAME
  if (!inputs.companyname) {
    errors.companyname = "error";
  } else {
    errors.companyname = "success";
  }

  //EMAIL
  if (!inputs.email) {
    errors.email = "error";
  } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
    errors.email = "error";
  } else {
    errors.email = "success";
  }

  //PHONE
  if (!inputs.phone) {
    errors.phone = "error";
  } else {
    errors.phone = "success";
  }

  //MOBILE
  if (!inputs.mobile) {
    errors.mobile = "error";
  } else {
    errors.mobile = "success";
  }

  //POST BOX
  if (!inputs.postbox) {
    errors.postbox = "error";
  } else {
    errors.postbox = "success";
  }

  //USERNAME
  if (!inputs.login) {
    errors.login = "error";
  } else if (
    inputs.login.trim().length < 3 ||
    inputs.login.trim().length > 12
  ) {
    errors.login = "error";
  } else if (!/^[A-Za-z]+/.test(inputs.login.trim())) {
    errors.login = "error";
  } else {
    errors.login = "success";
  }
  //login
  if (!inputs.login) {
    errors.login = "error";
  } else if (inputs.login.trim().length < 3) {
    errors.login = "error";
  } else if (!/^[A-Za-z]+/.test(inputs.login.trim())) {
    errors.login = "error";
  } else {
    errors.login = "success";
  }

  //PASSWORD
  if (!inputs.password) {
    errors.password = "error";
  } else if (passwordRegex.test(inputs.password)) {
    errors.password = "success";
  } else {
    errors.password = "error";
  }

  //CONFIRM PASSWORD
  if (!inputs.password2) {
    errors.password2 = "error";
  } else if (passwordRegex.test(inputs.password)) {
    errors.password2 = "success";
  } else {
    errors.password2 = "error";
  }

  return errors;
}
