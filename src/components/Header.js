import React from "react";
import RedButton from './RedButton';

const Header = (props) => {
  return (
    <header>
      {props.user && <h1>TrainR</h1>}
      <nav>
        {props.user && <a>{props.username}</a>}
        {props.user && <RedButton onClick = {props.signOut} buttonText = 'Sign Out'/>}
      </nav>
    </header>
  );
}

export default Header;
