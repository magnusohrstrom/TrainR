import React from "react";
import Button from './Button.js';


const RedButton = (props) => {
  let classes;
  props.className ? classes = props.className + ' red-button'
    : classes = 'red-button';

  return (
    <Button className= {classes}  {...props}/>
  );
}

export default RedButton;
