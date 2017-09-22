import React, { Component } from "react";
import firebase from 'firebase';
import Header from './Header';
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
    showTrainingModule:true,
    errorMessage:false,
    //Training forms
    running:false,
    yoga:false,
    aerobics:false,
    soccer:false,
    dance:false,
    biking:false,
    hiking:false,
    match:false
  }

  //Input functions
  onChange = (e) => {
    if(e.target.type === 'checkbox') {
        this.setState({
          [e.target.name]:e.target.checked
        })
        console.log(e.target.checked+e.target.name+''+e.target.value);
    }
    else{
      this.setState({[e.target.name]:e.target.value});
    }
  }

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
              .on('value', (snap) => {
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
///

  onSubmitGo = (e) => {
    e.preventDefault();
    //Create and set matchObject
    this.setMatchObjects()
    //Check if matched object exists in db.
    this.findOtherMatchObj();

    this.setState({
      showTrainingModule: false
    })
  }

  setMatchObjects = () => {
    //running
    this.state.running ? db.ref(`matchObjects/running/${this.state.user.uid}`).set({userId: this.state.user.uid }) : null;
    //yoga
    this.state.yoga ? db.ref(`matchObjects/yoga/${this.state.user.uid}`).set({userId: this.state.user.uid }) : null;
    //Aerobics
    this.state.aerobics ? db.ref(`matchObjects/aerobics/${this.state.user.uid}`).set({userId: this.state.user.uid }) : null;

  }

  removeUsersFromDb = (user1, user2) => {
      //delete running
      db.ref(`matchObjects/running/${user1}`).remove();
      db.ref(`matchObjects/running/${user2}`).remove();
      //yoga
      db.ref(`matchObjects/yoga/${user1}`).remove();
      db.ref(`matchObjects/yoga/${user2}`).remove();
      //aerobics
      db.ref(`matchObjects/aerobics/${user1}`).remove();
      db.ref(`matchObjects/aerobics/${user2}`).remove();
      console.log('removing');
  }

  createChatRoom = (fireRef, userId1, userId2) => {
    db.ref(`chatRoom/${userId1+userId2}`).set({
      userId1: userId1,
      userId2: userId2,
      messages:''
    });
    this.setState({
      running:false,
      yoga:false,
      aerobics:false,
      soccer:false,
      dance:false,
      biking:false,
      hiking:false,
      match:true
    })
    console.log('created CHATROOM');
    this.removeUsersFromDb(userId1, userId2);


  }

  

  //checks categoryobjects after own userid and other user id.
  findOtherMatchObj = () => {
    this.state.running ?
      db.ref(`matchObjects/running`).orderByChild('userId')
        .equalTo(this.state.user.uid)
          .on('value', (snap) => {
            if( snap.val() !== null ) {
              db.ref(`matchObjects/running`).orderByChild('userId').once('value', (snap) => {
                if(Object.keys(snap.val())[1] !== undefined  ){
                  Object.keys(snap.val())[0] !== this.state.user.uid ?
                  this.createChatRoom(
                    'running', this.state.user.uid, Object.keys(snap.val())[0])
                      : this.createChatRoom('running', this.state.user.uid, Object.keys(snap.val())[1]);
                }else {
                  console.log('själv');
                }
              })
            }
      else {
        console.log(snap.val());
      }
    }) : null;


    //yoga
    this.state.yoga ? db.ref(`matchObjects/yoga`).orderByChild('userId')
      .equalTo(this.state.user.uid)
        .on('value', (snap) => {
          if( snap.val() !== null ) {
            db.ref(`matchObjects/yoga`).orderByChild('userId').once('value', (snap) => {
              if(Object.keys(snap.val())[1] !== undefined ){
                Object.keys(snap.val())[0] !== this.state.user.uid ?
                this.createChatRoom(
                  'yoga', this.state.user.uid, Object.keys(snap.val())[0])
                    : this.createChatRoom('yoga', this.state.user.uid, Object.keys(snap.val())[1]);
              }else {
                console.log('själv');
              }
            })
          }
    else {
      console.log(snap.val());
    }
  }): null;
    //Aerobics
    this.state.aerobics ?  db.ref(`matchObjects/yoga`).orderByChild('userId')
      .equalTo(this.state.user.uid)
        .on('value', (snap) => {
          if( snap.val() !== null ) {
            console.log(snap.val());
            db.ref(`matchObjects/aerobics`).orderByChild('userId').once('value', (snap) => {
              if(Object.keys(snap.val())[1] !== undefined  ){
                Object.keys(snap.val())[0] !== this.state.user.uid ?
                this.createChatRoom(
                  'aerobics', this.state.user.uid, Object.keys(snap.val())[0])
                    : this.createChatRoom('aerobics', this.state.user.uid, Object.keys(snap.val())[1]);
              }else {
                console.log('själv');
              }
            })
          }
          else {
      console.log(snap.val());
      }
    }): null;
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
    .then(() => {
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
    }).then(() => {
      this.setState({
      register:false,
      signIn:false
    })})
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
    const {user, errorMessage, signIn, register, showTrainingModule} = this.state;

    return (
      <div className = "main">
        <Header user={user} username = {this.state.username} signOut = {this.signOut}/>
                {this.state.running && <h1>{this.state.running}</h1>}
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
        {user && showTrainingModule ? <TrainingModule  onSubmit = {this.onSubmitGo} onChange = {this.onChange}/>:null}
        {this.state.running && <h1>{this.state.running}</h1>}


        <Subhero/>
      </div>
    )
  }
}
