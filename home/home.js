function logout() {
    showLoading();
    firebase.auth().signOut().then(() => {
        window.location.href = "../login/index-login.html";
      }).catch((error) => {
        alert('erro ao sair');
      });
}