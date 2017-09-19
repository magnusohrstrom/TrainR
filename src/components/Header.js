  import React from "react";

const Header = (props) => {
  return (
    <header>
      {props.user && <h1>TrainR</h1>}
      <nav>
        {props.user && <button onClick={props.signOut}>Sign Out</button>}
      </nav>
    </header>
  );
}

export default Header;
