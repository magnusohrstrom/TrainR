#Pseudokod

onGo =>

check if object = DB,

if object is true in DB => push user.key into obj.users in DB.

=> find match. loop through users in obj. if users > 1 break,
=> else loop  

  => setState ({
    match = true
  })

set




DB
------
users {
  userkey {
  }
}
---

GO

matchObjects {
  matchObj: {
    userId: "352bfdsfd",
    yoga: true,
    hiking: true
  }


}

match :{
  userId1: "adads",
  userId2 : "asdadasda2",
  chatMessages:{

  }
}
/*
//checks categoryobjects after own userid and other user id.
findOtherMatchObj = () => {
  this.findRunning()
}

findRunning = () => {
  this.state.running ?
    db.ref(`matchObjects/running`).orderByChild('userId')
      .equalTo(this.state.user.uid)
        .on('value', (snap) => {
          if( snap.val() !== null ) {
            db.ref(`matchObjects/running`).orderByChild('userId').once('value', (snap) => {
              if(snap.val()!== null ){
                if(Object.keys(snap.val())[1] !== undefined  ){
                  Object.keys(snap.val())[0] !== this.state.user.uid ?
                  this.createChatRoom(
                    'running', this.state.user.uid, Object.keys(snap.val())[0])
                      : this.createChatRoom('running', this.state.user.uid, Object.keys(snap.val())[1]);
                }else {
                  console.log('själv');
                }
              }
            })
          }
    else {
      console.log(snap.val());
    }
  }) : this.findYoga();
}

findYoga = () => {
  this.state.yoga ?
    db.ref(`matchObjects/yoga`).orderByChild('userId')
      .equalTo(this.state.user.uid)
        .on('value', (snap) => {
          if( snap.val() !== null ) {
            db.ref(`matchObjects/yoga`).orderByChild('userId').once('value', (snap) => {
              if(snap.val()!==null){
                if(Object.keys(snap.val())[1] !== undefined  ){
                  Object.keys(snap.val())[0] !== this.state.user.uid ?
                  this.createChatRoom(
                    'yoga', this.state.user.uid, Object.keys(snap.val())[0])
                      : this.createChatRoom('yoga', this.state.user.uid, Object.keys(snap.val())[1]);
                }else {
                  console.log('själv');
                }
              }
            })
          }
    else {
      console.log(snap.val());
    }
  }) : this.findAerobics();
}

findAerobics = () => {
  this.state.aerobics ?
    db.ref(`matchObjects/aerobics`).orderByChild('userId')
      .equalTo(this.state.user.uid)
        .on('value', (snap) => {
          if( snap.val() !== null ) {
            db.ref(`matchObjects/aerobics`).orderByChild('userId').once('value', (snap) => {
            if (snap.val()!==null) {
              if(Object.keys(snap.val())[1] !== undefined  ){
                Object.keys(snap.val())[0] !== this.state.user.uid ?
                this.createChatRoom(
                  'aerobics', this.state.user.uid, Object.keys(snap.val())[0])
                    : this.createChatRoom('aerobics', this.state.user.uid, Object.keys(snap.val())[1]);
              }else {
                console.log('själv');
              }
            }

            })
          }
    else {
      console.log(snap.val());
    }
  }) : console.log('slut');
}
*/
