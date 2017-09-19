import React, { Component } from "react";
import firebase from 'firebase';
import Header from './Header';
import Form from './forms/Form';
import Register from './forms/Register';
import Login from './forms/Login';
import Hero from './Hero';
import Subhero from './Subhero';
import TrainingModule from './forms/TrainingModule';

//Short for firebase functions
const db = firebase.database();
const auth = firebase.auth();

export default class Main extends Component {

  state = {
    user:'',
    email:'',
    username:'',
    password:'',
    //bools to show or hide forms
    register: false,
    signIn: false,
    errorMessage:'',
    error:false
  }


  //Input functions
  onChange = e => this.setState({[e.target.name]:e.target.value});

  onAuthStateChanged = () => {
    auth.onAuthStateChanged((user) => {

      if(user){
        this.setState({
          user:user,
          error: false
        });
      }
      else{
        this.setState({user:''});
      }
    });
  }

  onSubmitRegister = e => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(this.state.email,this.state.password)
      .then((user)=>{
        db.ref(`users/${user.uid}`).set({
        email:user.email,
        uid: user.uid,
        username: this.state.username
        });
      })
      .then(()=>this.setState({
        register:false,
        signIn:false
      })).then(user => console.log(user))
        .catch((error) => {
          this.setState({
          error:true,
          errorMessage:error.message
        });
      console.log(error);
    });

  }

  signIn = e => {
    e.preventDefault();
    auth
    .signInWithEmailAndPassword(this.state.email, this.state.password).then(()=>console.log(this.state.email))
    .then(user => this.setState({
      register:false,
      signIn:false
    }))
    .catch(error => this.setState({
      error: true,
      errorMessage: error.message
    }));
  }

  signOut = (e) => {
    e.preventDefault();
    console.log("SIGN OUT!")
    firebase.auth().signOut();
  }

  //Show hide sign-in and register forms.
  showSignIn = () => {
    !this.state.signIn ? this.setState({
      signIn: true,
      register:false
    }):this.setState({
      register:false,
      signIn: false
    });
  }

  showRegister = () => {
    !this.state.register ? this.setState({
      register:true,
      signIn: false
    }):this.setState({
      register:false,
      signIn: false
    });
  }

  cancelOnClick = () => {
    this.setState({
      register:false,
      signIn:false
    })
  }

//Runs when component has been mounted.
  componentDidMount(){
    this.onAuthStateChanged();
  }

  render() {
    const {user, error, errorMessage, signIn, register} = this.state;

    return (
      <div className = "main">
        <Header user={user} signOut = {this.signOut}/>
        <Hero user= {user} register = {register} signIn = {signIn} signInClick = {this.showSignIn} registerClick={this.showRegister}/>
        {error && <p>{errorMessage}</p>}
        <Register
          show = {this.state.register}
          onChange = {this.onChange}
          onSubmit= {this.onSubmitRegister}
          formName= 'register'
          cancelButton = {this.cancelOnClick}
          />
        <Login
          show = {this.state.signIn}
          formName = 'login'
          onChange = {this.onchange}
          onSubmit = {this.signIn}
          cancelButton = {this.cancelOnClick}
        />
        <TrainingModule/>
        <Subhero/>
      </div>
    )
  }
}
