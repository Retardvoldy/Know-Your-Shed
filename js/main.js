//Know Your Shed

//configuration - google account sign in
var provider = new firebase.auth.GoogleAuthProvider();

// Get a reference to the database service
// Reference database folders with .child() and .ref()
// Listen to values and changes etc wtih .on('value', function(snapshot){...})
// snapshot captures the data and this data can be retrieved through
var database = firebase.database();

/*
Also notice that you can retrieve the Google provider's OAuth token which
can be used to fetch additional data using the Google APIs.

This is also where you can catch and handle errors. For a list of error codes
have a look at the Auth Reference Docs.
*/

//Then, you can also retrieve the Google provider's OAuth token by
// calling getRedirectResult when your page loads:
firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $(document).ready(function(){
    	$("#sign_out").show();
    	$("#sign_in").hide();
    });
  } else {
    // No user is signed in.
    $(document).ready(function(){
    	$("#sign_in").show();
    	$("#sign_out").hide();
    });
  }
});

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  			// The user's ID, unique to the Firebase project. Do NOT use
  udb = User.getToken();	// this value to authenticate with your backend server	, if
                   			// you have one. Use User.getToken() instead.
}

$(document).ready(function(){
	if(user != null) {
		$("#1").text(name);
	} else {
		$("#sign_in").click(function(){
			// sign into google through a redirect
			firebase.auth().signInWithRedirect(provider);
			$(this).hide();
		});
	}
	firebase.auth().signOut().then(function() {
	  console.log('Signed Out');
	}, function(error) {
	  console.error('Sign Out Error', error);
	});
    $("#1").click(function() {
        scrollTop: $("1").offset().top
    }, 1000);
});
