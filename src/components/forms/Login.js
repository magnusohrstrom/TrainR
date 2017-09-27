import React from "react";
import Form from './Form';

const Login = (props) => {
  return (
    <Form
      onChange = {props.onChange}
      formName = {props.formName}
      name1 = 'email'
      stateName1 = {props.stateName1}
      name2 = 'password'
      stateName2 = {props.stateName2}
      button1 = 'Sign In'
      onSubmit = { props.onSubmit }
      show = {props.show}
      cancelButton = {props.cancelButton}
      signInWithGoogle = {props.signInWithGoogle}
     />
  );
}

export default Login;
