import React from "react";
import Form from './Form';

const Register = (props) => {
  return (
    <Form
      onChange = {props.onChange}
      formName = 'register'
      name1 = 'username'
      stateName1 = {props.stateName1}
      name2 = 'password'
      stateName2 = {props.stateName2}
      name3= 'email'
      stateName3 = {props.stateName3}
      button1 = 'Register'
      onSubmit = {props.onSubmit}
      show = {props.show}
      signInWithGoogle = {props.signInWithGoogle}
      cancelButton = {props.cancelButton}
      />
  );
}

export default Register;
