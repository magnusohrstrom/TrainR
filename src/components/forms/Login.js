import React from "react";
import Form from './Form';

const Name = (props) => {
  return (
    <Form formName='login'
      onChange = {props.onChange}
      formName = {props.formName}
      name1 = 'username'
      name2 = 'password'
      button1 = 'Login'
      onSubmit = { props.onSubmit }
     />
  );
}

export default Name;
