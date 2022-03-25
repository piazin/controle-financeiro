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
 //está function vai se encaregar de validar o e-mail digitado pelo usuário
function toggleEmailErrors() {
    //nesta campo pegamos o valor do input email fornecido pelo usuário
    const email = document.getElementById("email").value;
    //caso o email esteja vazio (!email)
    if (!email) {
        //então pegamos a div que mostrara um erro na tela e mudamos o display dela para block
        document.getElementById("email-required-error").style.display = "block";
    } else {
        //caso o usuário tenha prenchido o campo o display continuara none 
        document.getElementById("email-required-error").style.display = "none";
    }
    
    //caso o retorno desta function sejá verdadeiro
    if (validateEmail(email)) {
        //caso o email sejá valido o diplay da mensagem de erro continuara none
        document.getElementById("email-invalid-error").style.display = "none";
    } else {
        //caso seja false então a mensagem de erro será mostrada diplay = block
        document.getElementById("email-invalid-error").style.display = "block";
    }
}
//Aqui vamos validar se o usuário preencheu o campo de senha
function togglePasswordErrors() {
    //pegamos o valor do input de senha e colocamos da var password
    const password = document.getElementById("password").value;
    //caso a senha tenta ficado em branco
    if (!password) {
        //pegamos a mensagem de erro e mudamos o diplay para block
       document.getElementById("password-required-error").style.display = "block";
    } else {
        //caso o usuário tenha prenechido a campo senha pegamos a mensagem de erro e mudamos o diplay para none
       document.getElementById("password-required-error").style.display = "none";
    }
}
//Aqui validamos de vamos desabilitar os botões ou não  
function toggleButtonsDisable() {
    //const emailValid = isEmailValid();
    //caso valor da function isEmailValid sejá diferente de verdadeiro então desabilitamos o botão 
    document.getElementById("recover-password-button").disabled = !isEmailValid();

    //const passwordValid = isPasswordValid();
    //caso valor da function isEmailValid sejá diferente de verdadeiro ou caso valor de password também seja diferente de verdadeiro então desabilitamos o botão 
    document.getElementById("login-button").disabled = !isEmailValid() || !isPasswordValid();
}

function isEmailValid() {
    //nesta campo pegamos o valor do input email fornecido pelo usuário
    const email = document.getElementById("email").value;
    //caso o email esteja vazio (!email)
    if (!email) {
        //ele nos retorna falso
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    //pegamos o valor do input password e armazenamos na const password
    const password = document.getElementById("password").value;
    //caso o password esteja vazio ele nos retorna false
    if (!password) {
        return false;
    }
    //caso o usuario tenha fornecido uma senha ele retorna true
    return true;
}
//essa function é usada para validar o email (retirada da internet )
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}