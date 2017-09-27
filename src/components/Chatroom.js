import React from "react";

const Chatroom = (props) => {
  return (
    <section className ="chat-room">

     <form className="chat-form" onSubmit = {props.onSubmit}>
       <label>Message</label>
       <input name="postText" onChange = {props.onChange} type = "text" value = {props.postText} />
       <input className= "input-submit" type = "submit" value = "Send"/>
     </form>
     <section className="posts-section">
       { props.renderPosts }
      <button onClick = {props.leaveChatOnClick}> Leave Chatroom</button>
     </section>

    </section>
  );
}

export default Chatroom;
