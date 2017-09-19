import React from "react";
import Form from './Form';

const Name = (props) => {
  return (
    <Form formName='login'
      onChange = {props.onChange}
      formName = {props.formName}
      name1 = 'email'
      name2 = 'password'
      button1 = 'Login'
      onSubmit = { props.onSubmit }
      show = {props.show}
      cancelButton = {props.cancelButton}
     />
  );
}

export default Name;
