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

const info = {
    imgUser: document.getElementById('img-user-login'),
    imgUser2: document.getElementById('img-user-login-menu'),
    userName: document.getElementById('name-user'),
    userEmail: document.getElementById('email-user'),
    updateUser: document.getElementById('input-update-name'),
    reloader: () => {document.location.reload(true);}
}


function updateNameUser() {
    firebase.auth().currentUser.updateProfile({
    displayName: info.updateUser.value,
    }).then(() => {
        info.reloader();
    }).catch((error) => {
    // An error occurred
    // ...
    });
}



