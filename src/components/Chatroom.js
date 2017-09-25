import React from "react";

const Chatroom = (props) => {
  return (
    <section className ="chat-room">
      <h1>ChatBoom</h1>
     <p>{props.name}</p>
     <form onSubmit = {props.onSubmit}>
       <label>Message</label>
       <input name="postText" onChange = {props.onChange} type = "text"/>
       <input type = "submit" value = "send"/>
     </form>

     {props.renderPosts}
    </section>
  );
}

export default Chatroom;
