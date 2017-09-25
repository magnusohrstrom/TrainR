import React from "react";

const Postcard = (props) => {
  return (
    <div className = 'post-card' >
      <h2>{props.username}</h2>
      <p>{props.postText}</p>
      <p>{props.date}</p>
    </div>
  );
}

export default Postcard;
