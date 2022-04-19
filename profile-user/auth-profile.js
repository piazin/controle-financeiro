firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const email = user.email;
        const displayName = user.displayName;
        const photo = user.photoURL;

        if(photo != null) {
            info.imgUser.src = photo;
        } else {
            info.imgUser.src = "../image-svg/user-not-define.png";
            info.imgUser2.src = "../image-svg/user-not-define.png";
        }
        
        info.userName.innerHTML = displayName;
        //info.userEmail.innerHTML = email;
    } else {
        window.location.href = "../login/index-login.html";
    }
})

function logout() {
    showLoading();
    firebase.auth().signOut().then(() => {
        window.location.href = "../login/index-login.html";
      }).catch((error) => {
        alert('erro ao sair');
      });
}

function updateNameUser() {
    const name = info.updateUser.value;
    
    if(name == null || name.length >= 3) {
        firebase.auth().currentUser.updateProfile({
            displayName: info.updateUser.value,
        }).then(() => {
            info.reloader();
        }).catch((error) => {
            console.log('erro', error);
        });
    } else {
        alert('nome muito curto');
    }
}

function updatePass() { 
    const user = firebase.auth().currentUser;
    const newPassword = info.passwordUser.value;

    if(newPassword == null || newPassword >= 6) {
        user.updatePassword(newPassword).then(() => {
            alert('ok');
            info.reloader();
        }).catch((error) => {
            console.log('error', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Para trocar sua senha faça login e logout novamente',
                footer: '<a href=""></a>'
              })

              setTimeout(()=> {
                  logout();
              }, 5000);
        });
    } else {
        alert('senha muito curta');
    }
    
}

function deleteUser() {
    const user = firebase.auth().currentUser;
    const confirmDelete = confirm("realmente deseja excluir sua conta?");

    if(confirmDelete == true) {
        user.delete().then(() => {
            // User deleted.
            }).catch((error) => {
                
            });
    } else {
        alert('ainda bem amigo');
    }

    
}

const info = {
    imgUser: document.getElementById('img-user-login'),
    imgUser2: document.getElementById('img-user-login-menu'),
    userName: document.getElementById('name-user'),
    userEmail: document.getElementById('email-user'),
    updateUser: document.getElementById('input-update-name'),
    passwordUser: document.getElementById('senha'),
    reloader: () => {document.location.reload(true);}
}



