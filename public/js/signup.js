//Logging the database in the console
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

function create() {
  txtEmail = document.getElementById('signupEmail').value;
  txtPass = document.getElementById('signupPassword').value;
  chkTerms = document.getElementById('terms').checked;

  if(!chkTerms) {
      alert("You must accept the Terms and Conditions");
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(txtEmail, txtPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode + ": " + errorMessage);
    });
}
