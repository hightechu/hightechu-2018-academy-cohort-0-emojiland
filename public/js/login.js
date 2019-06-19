/* Your JS codes here */
var ref = firebase.database().ref();
console.log(ref);

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        //Go to profile page
        window.location = "newsfeed.html";
    } else {
        //No user signed in
    }
  });

  function login() {
      txtEmail = document.getElementById('loginEmail').value;
      txtPass = document.getElementById('loginPassword').value;

      firebase.auth().signInWithEmailAndPassword(txtEmail, txtPass).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorCode + ": " + errorMessage);
      });
  }

  function signup() {
    window.location = "signup.html";
  }

  function resetPass() {
    var auth = firebase.auth();
    var emailAddress = document.getElementById('loginEmail').value;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
    alert("Email sent")
    }).catch(function(error) {
    // An error happened.
    });
  }
