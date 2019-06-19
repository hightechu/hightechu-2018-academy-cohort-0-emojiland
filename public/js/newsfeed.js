//Make sure the database connection works
var ref = firebase.database().ref();
var storageRef = firebase.storage().ref();
console.log(ref);
var currentUser = new Object();

function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location = "login.html";
        alert("Successfully signed out.");
    }).catch(function(error) {
        // An error happened.
        alert(error);
    });
}

firebase.auth().onAuthStateChanged(firebaseUser => {
   if(firebaseUser) {
     document.getElementById('file').disabled = false;
   }
       else {
       window.location = "login.html";
   }
});

function handleFileSelect(evt) {
     evt.stopPropagation();
     evt.preventDefault();
     var file = evt.target.files[0];

     var metadata = {
       'contentType': file.type
     };

     // Push to child path.
     // [START oncomplete]
     storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
       console.log('Uploaded', snapshot.totalBytes, 'bytes.');
       console.log('File metadata:', snapshot.metadata);
       // Let's get a download URL for the file.
       snapshot.ref.getDownloadURL().then(function(url) {
         console.log('File available at', url);
         document.getElementById('post').src = url;
         // [START_EXCLUDE]
         document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
         // [END_EXCLUDE]
       });
     }).catch(function(error) {
       // [START onfailure]
       console.error('Upload failed:', error);
       // [END onfailure]
     });
     // [END oncomplete]
   }
function uploadimage() {
    var usersimage = document.getElementById('picture');

    var postData = {
        url: usersimage.value
    };

    firebase.database().ref('posts/').push(postData);
    getdatabase();
}
function getdatabase() {
    document.getElementById('imageformat').innerHTML = '';
    var postRef = firebase.database().ref('posts/')
    postRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var div = document.createElement('div');

            div.className = 'form-group';

            div.innerHTML =
                '<img src="' + childData.url + '">'

            document.getElementById('imageformat').appendChild(div);
        });
    });
}
