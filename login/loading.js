function showLoading() {
    document.getElementById('loading').style.display = "flex";

}

function hideLoading() {
    document.getElementById('loading').style.display = "none";
}

function userNot(error) {
    if(error.code == "auth/user-not-found") {
        document.getElementById('userNot').style.display = "block";
    } 

    if(error.code == "auth/wrong-password") {
        document.getElementById('userPass').style.display = "block";
    }
}
