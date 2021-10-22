const myModal = document.querySelectorAll(".modal");

// signUp
async function signUp(e) {
  e.preventDefault();
  const email = document.querySelector("#SignUpEmail");
  const SignUpPassword = document.querySelector("#SignUpPassword");

  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, SignUpPassword.value);
    M.toast({ html: `Welcome ${result.user.email}`, classes: "green" });
    // console.log(result);
  } catch (err) {
    // console.log(err);
    M.toast({ html: err.message, classes: "red" });
  }
  email.value = "";
  SignUpPassword.value = "";
  M.Modal.getInstance(myModal[0]).close();
}

//Login
async function login(e) {
  e.preventDefault();
  const email = document.querySelector("#LoginEmail");
  const LoginPassword = document.querySelector("#LoginPassword");

  try {
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email.value, LoginPassword.value);
    M.toast({ html: `Welcome ${result.user.email}`, classes: "green" });
    // console.log(result);
  } catch (err) {
    // console.log(err);
    M.toast({ html: err.message, classes: "red" });
  }

  email.value = "";
  LoginPassword.value = "";
  M.Modal.getInstance(myModal[1]).close();
}

// Logout
function logout() {
  firebase.auth().signOut();
}

//  called when auth state changes
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
  } else {
    M.toast({ html: "signout success", classes: "green" });
  }
});

//login with google
async function loginWithGoogle() {
  try {
    var provider = new firebase.auth.GoogleAuthProvider();

    const result = await firebase.auth().signInWithPopup(provider);
    // console.log(result);
    M.toast({ html: "loginWIthGoogle success", classes: "green" });
  } catch (err) {
    M.toast({ html: err.message, classes: "red" });
  }
}
