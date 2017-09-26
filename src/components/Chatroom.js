import React from "react";

const Chatroom = (props) => {
  return (
    <section className ="chat-room">
     <p>{props.name}</p>
     <form className="chat-form" onSubmit = {props.onSubmit}>
       <label>Message</label>
       <input name="postText" onChange = {props.onChange} type = "text" />
       <input type = "submit" value = "send"/>
     </form>
     <section className="posts-section">
       { props.renderPosts }
      <button onClick = {props.leaveChatOnClick}> Leave Chatroom</button>
     </section>

    </section>
  );
}

export default Chatroom;
