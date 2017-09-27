import React from "react";

const Postcard = (props) => {
  return (
    <div className = { props.myKey === props.elemKey ? 'post-card self-postcard' : "post-card other-postcard" } >
      <h4>{props.myKey === props.elemKey ? props.username : props.otherusername}</h4>
      <p>{props.postText}</p>
      <h6>{props.date}</h6>
    </div>
  );
}

export default Postcard;
