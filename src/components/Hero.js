import React from "react";

const Hero = (props) => {
  return (
    <section className="hero-section grid-x grid-padding-x align-middle">
       {!props.user && <h1 className="hero-h1">TrainR</h1>}
       {(!props.user && !props.signIn && !props.register) && <button className='cell small-4' onClick={props.signInClick} >Sign in</button>}
       {(!props.user && !props.register && !props.signIn) && <button className='cell small-4' onClick={props.registerClick} >Register</button>}
    </section>
  );
}

export default Hero;
