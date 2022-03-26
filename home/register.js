function onChangeEmail() {
    const email = form.email().value;
    
    form.emailRequired().style.display = email ? "none" : "block";

    form.emailError().style.display = validateEmail(email) ? "none" : "block";

    toogleRegisterDisabled();
}

function onChangePassword() {
    const password = form.password().value;
    
    form.passwordRequired().style.display = password ? "none" : "block";

    form.passwordError().style.display = password.length >= 6 ? "none" : "block";

    validatePassword();
    
    toogleRegisterDisabled();
}

function onChangePasswordConfirm() {
    validatePassword();
    toogleRegisterDisabled();
} 

function register() {
    showLoading();

    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then(() => {
        hideLoading();
        window.location.href = "home.html";
    }).catch(error => {
        hideLoading();
        getErrorMessage(error);
    })
}

function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        document.getElementById('userRegister').style.display = "block";
        setTimeout(() => getErrorRemove(), 4000);
    }
}

function getErrorRemove() {
    document.getElementById('userRegister').style.display = "none";
}

function validatePassword() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.passwordIgual().style.display = password == confirmPassword ? "none" : "block";
}

function toogleRegisterDisabled() {
    form.btnRegister().disabled = !isFormValid();
}

function isFormValid() {
    const email = form.email().value;
    if(!email || !validateEmail(email)) {
        return false;
    }
    const password = form.password().value;
    if(!password || password.length < 6) {
        return false;
    }
    const confirmPassword = form.confirmPassword().value;
    if(password != confirmPassword) {
        return false;
    } 
    return true;
}

const form = {
    email: ()=> document.getElementById('email'),
    emailRequired: ()=> document.getElementById('email-required-error'),
    emailError: ()=> document.getElementById('email-invalid-error'),
    password: ()=> document.getElementById('password'),
    confirmPassword: ()=> document.getElementById('confirmPassword'),
    passwordRequired: ()=> document.getElementById('password-required-error'),
    passwordError: ()=> document.getElementById('password-min-legth-error'),
    passwordIgual: ()=> document.getElementById('password-igual-error'),
    btnRegister: ()=> document.getElementById('btn-register')
}

//teste google



function loginGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  .signInWithRedirect(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
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

