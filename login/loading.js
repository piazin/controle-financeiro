function showLoading() {
    document.getElementById('loading').style.display = "flex";
}

function hideLoading() {
    document.getElementById('loading').style.display = "none";
}

function userNot(error) {
    if(error.code == "auth/user-not-found") {
        document.getElementById('userNot').style.display = "block";
        setTimeout(() => userRemoveNot(), 4000);
    } 

    if(error.code == "auth/wrong-password") {
        document.getElementById('userPass').style.display = "block";
        setTimeout(() => userRemovePass(), 4000);
    }
}

function userRemoveNot() {
    userRemove.userRmNot().style.display = "none";
}

function userRemovePass() {
    userRemove.userRmPs().style.display = "none";
}

const userRemove = {
    userRmNot: () => document.getElementById('userNot'),
    userRmPs: () => document.getElementById('userPass'),
}