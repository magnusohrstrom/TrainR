import React from "react";
import RedButton from './RedButton';
const Loader = (props) => {
  return (
    <section className="loader-section">
      <div className="loading-container">
        <div className="loading-object">
        </div>
        <div className="loading-object">
        </div>
        <div className="loading-object">
        </div>
      </div>
      <RedButton className = "cancel-search" onClick = {props.onClick} buttonText = "Cancel Search"/>
    </section>
  );
}

export default Loader;
