var btn = document.getElementById('btn');

btn.addEventListener('click', function() {
    let password = document.getElementById('password');

    if(password.type == "password") {
        password.type = "text"
        this.style.opacity = "1"
    } else {
        password.type = "password"
        this.style.opacity = ".4"
    }
})

/*nesta function validadeFiels estamos validando os campos*/

function validateFields() {
    /*pegamos o valor da  function isEmailValid e armazenamos em emailValid */
    const emailValid = isEmailValid();
    toogleError();

    /*aqui selecionamos o botão de recuperar senha e e desabilitamos ele caso o email seja invalido */
    document.getElementById("recover-password-button").disabled = !emailValid;
    
    /*Aqui validamos tanto o email quanto a senha caso a senha fique em branco o botão continuara desabilitado */
    const passwordValid = isPasswordValid();

    //caso o seja diferente de emailValid ou diferente de passwordValid então recebe disabled
    document.getElementById("login-button").disabled = !emailValid || !passwordValid;

}

function toogleError() {
    const email = document.getElementById("email").value;

    if(!email) {
        document.getElementById("emailNone").style.display = "block";
    } else {
        document.getElementById("emailNone").style.display = "none";
    }

    if(validateEmail(email)) {
        document.getElementById("emailInvalid").style.display = "none";
    } else {
        document.getElementById("emailInvalid").style.display = "block";
    }
}

function isEmailValid() {

    //pegamos o valor do email 
    const email = document.getElementById("email").value;

    //caso o sejá direfente de email (o email esteja em braco) então a function retorna false
    if (!email) {
        return false;
    }
    //antes de retonar o valor como true verificamos se o e-mail e valiido caos seja retornara true
    return validateEmail(email);
}

function isPasswordValid() {
    const password = document.getElementById("password").value;
    if (!password) {
        return false;
    }
    return true;
}
 //está funcção foi tirada da internet ela serve para validar um email
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}