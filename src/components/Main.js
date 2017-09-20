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
    errorMessage:false,
    //Training forms
    running:'',
    yoga:'',
    aerobics:'',
    soccer:'',
    dance:'',
    biking:'',
    hiking:''
  }


  //Input functions
  onChange = (e) => { e.target.type === 'checkbox' ? console.log(e.target.value) : this.setState({[e.target.name]:e.target.value})}

  onAuthStateChanged = () => {
    auth.onAuthStateChanged((user) => {
      if(user){
        this.setState({
          user:user,
          errorMessage: false
        });
        if(user.displayName) {
          this.setState({
            username: user.displayName
          });
        }
        else{
          db.ref('users').orderByChild('uid')
            .equalTo(user.uid)
              .on('value',(snap)=>{
            snap.forEach(item => {
              this.setState({
                username: item.val().username
              });
            })
          });
        }
      }
      else {
        this.setState({
          user:''
        })
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
      .then(()=>{
        this.setState({
        register:false,
        signIn:false
        })
      })
        .catch((error) => {
          this.setState({
          errorMessage:error.message
        });
      console.log(error);
    });
  }



  signIn = e => {
    e.preventDefault();
    auth
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(user => {
      this.setState({
      register:false,
      signIn:false
    })})
    .catch(error => this.setState({
      error: true,
      errorMessage: error.message
    }));
  }

  signInWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      // ...
      db.ref(`users/${user.uid}`).set({
      email:user.email,
      uid: user.uid,
      username: user.displayName
      });
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  signOut = (e) => {
    e.preventDefault();
    this.setState({
      username:'',
      password:'',
      email:''
    })
    auth.signOut();
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
    const {user, errorMessage, signIn, register} = this.state;

    return (
      <div className = "main">
        <Header user={user} username = {this.state.username} signOut = {this.signOut}/>
        <Hero user= {user} register = {register} signIn = {signIn} signInClick = {this.showSignIn} registerClick={this.showRegister}/>
        {errorMessage && <p>{errorMessage}</p>}
        <Register
          show = {this.state.register}
          onChange = {this.onChange}
          onSubmit= {this.onSubmitRegister}
          formName= 'register'
          cancelButton = {this.cancelOnClick}
          stateName1 = {this.state.username}
          stateName2 = {this.state.password}
          stateName3 = {this.state.email}

          />
        <Login
          show = {this.state.signIn}
          formName = 'login'
          onChange={this.onChange}
          onSubmit = {this.signIn}
          cancelButton = {this.cancelOnClick}
          stateName1 = {this.state.email}
          stateName2 = {this.state.password}
          signInWithGoogle = {this.signInWithGoogle}
        />
        {user && <TrainingModule onChange = {this.onChange}/>}
        <Subhero/>
      </div>
    )
  }
}
