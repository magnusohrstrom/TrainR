import React, { Component } from "react";
import firebase from 'firebase';
import Header from './Header';
import Form from './forms/Form';
import Register from './forms/Register';
import Login from './forms/Login';
const db = firebase.database();
const auth = firebase.auth();

export default class Main extends Component {

  state = {
    user:'',
    username:'',
    password:''
  }


  //Input functions
  onChange = e => this.setState({[e.target.name]:e.target.value});

  onAuthStateChanged = () => {
    auth.onAuthStateChanged((user) => {

      if(user){
        this.setState({user:user});
      }
      else{
        this.setState({user:''});
      }
    });
  }

  onSubmitRegister = e => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(this.state.username,this.state.password)
    .then(user => console.log(user));
  }

  signIn = e => {
    e.preventDefault();
    auth
    .signInWithEmailAndPassword(this.state.username, this.state.password)
    .then(user => console.log("Signed in !", user))
    .catch(error => console.log(error));
  }

  signOut = (e) => {
    e.preventDefault();
    console.log("SIGN OUT!")
    firebase.auth().signOut();
  }

  componentDidMount(){
    this.onAuthStateChanged();
  }

  render() {
    return (
      <div className = "main">
        <Header user={this.state.user} signOut = {this.signOut}/>
        <Register
          onChange = {this.onChange}
          onSubmit= {this.onSubmitRegister}
          formName= 'register'/>
        <Login
          formName = 'login'
          onChange = {this.onchange}
          onSubmit = {this.signIn}
         />
      </div>
    )
  }
}
