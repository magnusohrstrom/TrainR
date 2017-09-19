import React from "react";
import Form from './Form';

const Register = (props) => {
  return (
    <Form
      onChange = {props.onChange}
      formName = 'register'
      name1 = 'username'
      name2 = 'password'
      name3= 'email'
      button1 = 'Register'
      onSubmit = {props.onSubmit}
      show = {props.show}
      cancelButton = {props.cancelButton}
      />
  );
}

export default Register;
