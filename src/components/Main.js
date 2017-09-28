import React, { Component } from "react";
import firebase from 'firebase';
import Header from './Header';
import Register from './forms/Register';
import Login from './forms/Login';
import Hero from './Hero';
import Subhero from './Subhero';
import TrainingModule from './forms/TrainingModule';
import Chatroom from './Chatroom';
import Postcard from './Postcard';
import Loader from './Loader';
import Footer from './Footer';

//Short for firebase functions
const db = firebase.database();
const auth = firebase.auth();

export default class Main extends Component {

  state = {
    user:'',
    otherUserId:'',
    email:'',
    username:'',
    otherusername:'',
    password:'',
    connected:false,
    posts: [],
    postText:'',
    //bools to show or hide forms and stuffs
    register: false,
    signIn: false,
    showTrainingModule:true,
    errorMessage:false,
    loading: false,
    goSubmitIsEmpty:false,
    usernameIsEmpty:false,
    matchGenre:'',


    //Training forms
    running:false,
    yoga:false,
    aerobics:false,
    soccer:false,
    dance:false,
    biking:false,
    hiking:false
    //match:false
  }

  //Input functions-----------------------------------------
  //Sets states to inputvalues
  onChange = (e) => {
    if(e.target.type === 'checkbox') {
        this.setState({
          [e.target.name]:e.target.checked
        })
    }
    else{
      this.setState({[e.target.name]:e.target.value});
    }
  }
  //handles auth() function from firebase.auth
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
        this.setConnectedStateWhenMatchIsFound();
      }
      else {
        this.setState({
          user:''
        })
      }
    });
  }
///


  //Submit function for training-module that runs search for other match.
  onSubmitGo = (e) => {
    e.preventDefault();
    //Create and set matchObject
    if(!this.state.running &&
        !this.state.yoga &&
        !this.state.aerobics &&
        !this.state.soccer &&
        !this.state.dance &&
        !this.state.biking &&
        !this.state.hiking ){
      this.setState({
        goSubmitIsEmpty:true
      });
    }
    else{
        this.setMatchObjects()
        //Check if matched object exists in db.
        this.findOtherMatchObj();
        this.setState({
          showTrainingModule: false,
          loading:true
        })
      }
  }
  //sets User in training-genre in db.
  setUserInMatchObject = (stateName, dbName) => {
    stateName ? db.ref(`matchObjects/${dbName}/${this.state.user.uid}`).set({userId: this.state.user.uid }) : null;
  }
  //sets user in db for every different genre like above.
  setMatchObjects = () => {
    this.setUserInMatchObject(this.state.running, 'running');
    this.setUserInMatchObject(this.state.yoga, 'yoga');
    this.setUserInMatchObject(this.state.aerobics, 'aerobics');
    this.setUserInMatchObject(this.state.soccer, 'soccer');
    this.setUserInMatchObject(this.state.dance, 'dance');
    this.setUserInMatchObject(this.state.biking, 'biking');
    this.setUserInMatchObject(this.state.hiking, 'hiking');
  }
  //removes both matched users from db.
  removeUser = (user1, user2, dbName) => {
    db.ref(`matchObjects/${dbName}/${user1}`).remove();
    db.ref(`matchObjects/${dbName}/${user2}`).remove();
  }

  removeUsersFromDb = (user1, user2) => {
      //delete running
      this.removeUser(user1,user2, 'running');
      this.removeUser(user1,user2, 'yoga');
      this.removeUser(user1,user2, 'aerobics');
      this.removeUser(user1,user2, 'soccer');
      this.removeUser(user1,user2, 'dance');
      this.removeUser(user1,user2, 'biking');
      this.removeUser(user1,user2, 'hiking');

  }

  //creates chatroom when match is found.
  createChatRoom = (fireRef, userId1, userId2) => {
    db.ref(`chatRoom/${userId1+userId2}`).set({
      userId1: userId1,
      userId2: userId2,
      matchGenre: fireRef,
      posts:''
    });
    db.ref(`users/${userId1}`).update({
           chatroom: userId1+userId2,
         });
    db.ref(`users/${userId2}`).update({
      chatroom: userId1+userId2,
    });
    this.setState({
      loading:false,
      running:false,
      yoga:false,
      aerobics:false,
      soccer:false,
      dance:false,
      biking:false,
      hiking:false,
      posts:[]
    })
    this.removeUsersFromDb(userId1, userId2);
  }


  findOtherMatchObj = () => {

    this.setOtherMatchIfOtherUserIsFound('running');
    this.setOtherMatchIfOtherUserIsFound('yoga');
    this.setOtherMatchIfOtherUserIsFound('aerobics');
    this.setOtherMatchIfOtherUserIsFound('soccer');
    this.setOtherMatchIfOtherUserIsFound('dance');
    this.setOtherMatchIfOtherUserIsFound('biking');
    this.setOtherMatchIfOtherUserIsFound('hiking');
  }
  //checks categoryobjects after own userid and other user id.
  setOtherMatchIfOtherUserIsFound = (stateName) => {

      db.ref(`matchObjects/${stateName}`).orderByChild('userId')
        .equalTo(this.state.user.uid)
          .on('value', (snap) => {
            if( snap.val() !== null ) {
              db.ref(`matchObjects/${stateName}`).orderByChild('userId').once('value', (snap) => {
                if(snap.val()!== null ){
                  if(Object.keys(snap.val())[1] !== undefined  ){
                    Object.keys(snap.val())[0] !== this.state.user.uid ?
                    this.createChatRoom(
                      `${stateName}`, this.state.user.uid, Object.keys(snap.val())[0])
                        : this.createChatRoom(`${stateName}`, this.state.user.uid, Object.keys(snap.val())[1]);
                  }
                }
              })
            }
    });
  }

  //Pushes post to db from input in chatroom
  sendPostOnSubmit = (e) => {
    e.preventDefault();
    let newDate = new Date().toString();
    db.ref(`chatRoom/${this.state.connected}/posts`).push({
      text:this.state.postText,
      userId: this.state.user.uid,
      date: newDate
    }).then(()=>{
        this.setState({
            postText:''
          })
      });
  }

  //Leaves chat and updates users property chatroom to ''.
  leaveChatOnClick = () => {
    db.ref(`users/${this.state.user.uid}`).update(
      {
        chatroom: ''
      }
    );
    db.ref(`users/${this.state.otherUserId}`).update(
      {
        chatroom: ''
      }
    );
    db.ref(`chatRoom/${this.state.connected}`).remove();
    //db.ref(`users/${this.state.user.uid}`)
    this.setState({
      connected:false,
      showTrainingModule:true,
      loading:false,
      posts:[],
      otherusername:'',
      running:false,
      yoga:false,
      aerobics:false,
      soccer:false,
      dance:false,
      biking:false,
      hiking:false
    });
  }

  //Listener for if chatroom prop in db is changed. Then chatroom is "opened"
  setConnectedStateWhenMatchIsFound = () => {
    db.ref(`users/${this.state.user.uid}/chatroom`).on('value', (snap) => {
      if(snap.val()){
        db.ref(`chatRoom/${snap.val()}`).once('value', (innerSnap) => {
        if(innerSnap.val()){
          this.setState({
            matchGenre: innerSnap.val().matchGenre
          });
          if(innerSnap.val().userId1 === this.state.user.uid){
            db.ref(`users/${innerSnap.val().userId2}`).once('value', (innerSnap2) => {

              this.setState({
                otherusername: innerSnap2.val().username,
                otherUserId: innerSnap2.val().uid

              })
            } )
          }
          else if (innerSnap.val().userId2 === this.state.user.uid){
            db.ref(`users/${innerSnap.val().userId1}`).once('value', (innerSnap2) => {
              this.setState({
                otherusername: innerSnap2.val().username
              })
            })
          }
        }
      });
      this.setState({
        connected: snap.val()
      })
      this.onChildAddedToChatRoom();
      }
    })
  }

  onChildAddedToChatRoom = () => {
    db.ref(`chatRoom/${this.state.connected}/posts`).on('child_added', (snap) => {
        let newPosts = [...this.state.posts];
        newPosts.push({
          key: snap.key,
          text: snap.val()
        });
        this.setState({
          posts: newPosts
        });
    });
  }

  cancelSearch = () =>  {
    this.removeUsersFromDb(this.state.user.uid);
    this.setState({
      loading:false,
      showTrainingModule:true,
      running:false,
      yoga:false,
      aerobics:false,
      soccer:false,
      dance:false,
      biking:false,
      hiking:false

    });
  }




  // Sign in functions---------------------------------------------------
  onSubmitRegister = e => {
    e.preventDefault();
    this.state.username ?
    auth.createUserWithEmailAndPassword(this.state.email,this.state.password)
      .then((user)=>{
        db.ref(`users/${user.uid}`).set({
        email:user.email,
        uid: user.uid,
        username: this.state.username,
        chatroom:''
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
    }):this.setState({
      usernameIsEmpty:true
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
    this.showAndHideLoader();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      // ...
      let chatVar;

      db.ref(`users/${user.uid}`).once('value', (snap) => {
        chatVar = snap.val().chatroom;

      })
      db.ref(`users/${user.uid}`).set({
      email:user.email,
      uid: user.uid,
      username: user.displayName,
      chatroom: chatVar
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
    this.setState({
    register:false,
    signIn:false,
    loading:false
    })
  }

  signOut = (e) => {

    e.preventDefault();
    this.setState({
      user:'',
      otherUserId:'',
      email:'',
      username:'',
      otherusername:'',
      password:'',
      connected:false,
      posts: [],
      postText:'',
      //bools to show or hide forms and stuffs
      register: false,
      signIn: false,
      showTrainingModule:true,
      errorMessage:false,
      loading: false,
      goSubmitIsEmpty:false,
      usernameIsEmpty:false,

      //Training forms
      running:false,
      yoga:false,
      aerobics:false,
      soccer:false,
      dance:false,
      biking:false,
      hiking:false
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

  showAndHideLoader = () => {
    !this.state.loading ? this.setState({
      loading:true
    }) : this.setState({
      loading:false
    });
  }

  cancelOnClick = () => {
    this.setState({
      register:false,
      signIn:false,
      errorMessage:'',
      usernameIsEmpty:false
    })
  }

//Runs when component has been mounted.
  componentDidMount(){

    this.onAuthStateChanged();

  }

  render() {
    const {user, username, usernameIsEmpty, postText, matchGenre, otherusername, posts, connected, errorMessage, signIn, register, loading, showTrainingModule} = this.state;


    const renderPosts = [...posts].map((elem, index) => {

    return <Postcard key = {index} stateUsername = {this.state.username} elemKey = {elem.text.userId} myKey = {user.uid} postText = {elem.text.text} date = {elem.text.date} username = {username} otherusername = {otherusername} />
    });



    return (
      <div className = "main">

        <Header user={user} username = {this.state.username} signOut = {this.signOut}/>


        <Hero user= {user} register = {register} signIn = {signIn} signInClick = {this.showSignIn} registerClick={this.showRegister}/>
        {errorMessage && <p>{errorMessage}</p>}
        {usernameIsEmpty && !username ? <p>Please enter a username</p>:null}
        <Register
          show = {this.state.register}
          onChange = {this.onChange}
          onSubmit= {this.onSubmitRegister}
          formName= 'register'
          cancelButton = {this.cancelOnClick}
          stateName1 = {this.state.username}
          stateName2 = {this.state.password}
          stateName3 = {this.state.email}
          signInWithGoogle = {this.signInWithGoogle}
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


      {user && !connected && showTrainingModule ? <TrainingModule goSubmitIsEmpty = {this.state.goSubmitIsEmpty} onSubmit = {this.onSubmitGo} onChange = {this.onChange}/>:null}

      {connected && <Chatroom matchGenre= {matchGenre} otherusername={otherusername} leaveChatOnClick = {this.leaveChatOnClick} renderPosts = {renderPosts}  onSubmit = {this.sendPostOnSubmit} onChange  = {this.onChange} postText={postText} name = {connected}/>}

      {loading && !connected ? <Loader onClick = {this.cancelSearch}/> : null}
      <Footer/>
      </div>
    )
  }
}

/*
<div class="loading-object">
</div>
<div class="loading-object">
</div>
<div class="loading-object">
</div>*/
