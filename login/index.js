/*pegamos o botão que vai ter a acão de mostrar e esconder a senha*/
var btn = document.getElementById('btn');

/*adcionamos um evento de click ao botão
    quando clicado dispara está funcção anonima 
*/
btn.addEventListener('click', function() {
    /*pegamos o campo input password e colocamos ele na var password*/
    let password = document.getElementById('password');
    /*caso o type de password seja igual password*/
    if(password.type == "password") {
        /*ele recebe o type de text para assim ser mostrado a senha*/
        password.type = "text"
        this.style.opacity = "1"
    } else {
        /*caso o type não seja password então ele recebe o type de password*/
        password.type = "password"
        this.style.opacity = ".4"
    }
})

//está function será executada quando um usuário altera o conteúdo do campo e-mail
function onChangeEmail() {
    //estas duas functions serão chamadas pela a function acima
    toggleButtonsDisable();
    toggleEmailErrors();
}
//está function será executada quando um usuário altera o conteúdo do campo senha
function onChangePassword() {
    //estas duas functions serão chamadas pela a function acima
    toggleButtonsDisable();
    togglePasswordErrors();
} 

function login() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value).then(response => {
        hideLoading();
        window.location.href = "../home/home.html";
    }).catch(error => {
        hideLoading();
        userNot(error);
    });
   
}

function recoverPassword() {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading();
        alert("Email enviado com sucesso");
    }).catch(error => {
        hideLoading();
        userNot(error);
    });
}

function registro() {
    window.location.href = "../home/register.html";
}

 //está function vai se encaregar de validar o e-mail digitado pelo usuário
function toggleEmailErrors() {
    const email =form.email().value;
    form.emailRequired().style.display = email ? "none" : "block";

    /*if (!email) {
        form.emailRequired().style.display = "block";
    } else {
        form.emailRequired().style.display = "none";
    }*/
    form.emailInvalid().style.display = validateEmail(email) ? "none" : "block";
    /*if (validateEmail(email)) {
        form.emailInvalid().style.display = "none";
    } else {
        form.emailInvalid().style.display = "block";
    }*/
}

function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequired().style.display = password ? "none" : "block";
    if (!password) {
       form.passwordRequired().style.display = "block";
    } else {
       form.passwordRequired().style.display = "none";
    }
}
  
function toggleButtonsDisable() {
    //const emailValid = isEmailValid();
    
    form.recoverPassword().disabled = !isEmailValid();

    //const passwordValid = isPasswordValid();
    
    form.loginButton().disabled = !isEmailValid() || !isPasswordValid();
}

function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = form.password().value;
   
    if (!password) {
        return false;
    }
    return true;
}


const form = {
    email: () => document.getElementById('email'),
    loginButton: () => document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    recoverPassword: () => document.getElementById('recover-password-button'),
    emailRequired: () => document.getElementById('email-required-error'),
    emailInvalid: () => document.getElementById('email-invalid-error'),
    passwordRequired: () => document.getElementById('password-required-error')
}

//teste google



function loginGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    showLoading();
    firebase.auth()
  .signInWithRedirect(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    hideLoading();
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

