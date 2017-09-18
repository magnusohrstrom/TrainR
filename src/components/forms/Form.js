import React from "react";

const Form = (props) => {
  return (
    <form onSubmit = {props.onSubmit}>
      <input name = {props.name1} type='text' onChange = {props.onChange} placeholder={props.placeholder1}/>
      <input name ={props.name2} type='password' onChange = {props.onChange} placeholder={props.placeholder2} />
      {props.formName === 'register' && <input name = {props.name3}  type='text' onChange = {props.onChange} placeholder={props.placeholder2}/>}
      <input type="submit" value = {props.button1} />
    </form>
  );
}

export default Form;
