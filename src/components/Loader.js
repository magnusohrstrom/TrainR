import React from "react";
import RedButton from './RedButton';
const Loader = (props) => {
  return (

      <div className="loading-container">
        <div className="loading-object">
        </div>
        <div className="loading-object">
        </div>
        <div className="loading-object">
        </div>
      <RedButton className = "cancel-search" onClick = {props.onClick} buttonText = "Cancel Search"/>
      </div>
  );
}

export default Loader;
