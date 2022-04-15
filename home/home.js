
function logout() {
    showLoading();
    firebase.auth().signOut().then(() => {
        window.location.href = "../login/index-login.html";
      }).catch((error) => {
        alert('erro ao sair');
      });
}

firebase.auth().onAuthStateChanged(user => {
  if (user){
      findTransactions(user);
  }
})

function findTransactions(user) {
    showLoading();
    firebase.firestore()
        .collection('transactions')
        .where('user.uid', '==', user.uid)
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
            hideLoading();
            const transactions = snapshot.docs.map(doc => ({
              ...doc.data(),
              uid: doc.id
            }));
            addTransactionsToScreen(transactions);
        }).catch(error => {
          hideLoading();
          alert('erro ao recuperar transações');
        })
}

function addTransactionsToScreen(trasactions) {
  const orderedList = document.getElementById('transactions');

  trasactions.forEach(trasactions => {
    console.log(trasactions);
    const li = document.createElement('li');
    li.classList.add(trasactions.type);
    li.id = trasactions.uid;
    li.addEventListener("click", ()=> {
      window.location.href = "modal.html?uid=" + trasactions.uid;
    })

    const date = document.createElement('p');
    date.innerHTML = formatDate(trasactions.date);
    li.appendChild(date);

    const money = document.createElement('p');
    money.innerHTML = formatMoney(trasactions.money);
    li.appendChild(money);

    const type = document.createElement('p');
    type.innerHTML = trasactions.transactionType;
    li.appendChild(type);

    if(trasactions.description) {
      const description = document.createElement('p');
      description.innerHTML = trasactions.description;
      li.appendChild(description);
    }

    const deleteButton = document.createElement('img');
    deleteButton.src = "../image-svg/trash-outline.svg"
    deleteButton.classList.add('btn-remove');
    deleteButton.addEventListener('click', event => {
      event.stopImmediatePropagation();
      askRemoveTransaction(trasactions);
    })
    li.appendChild(deleteButton);

    orderedList.appendChild(li);
  });
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-br');
}

function formatMoney(money) {
  return `${money.currency} ${money.value.toFixed(2)}`
}

function askRemoveTransaction(transaction) {
  const shouldRemove = confirm("Deseja remover o item?");
  if(shouldRemove) {
    removeTransaction(transaction);
  }
}

function removeTransaction(transaction) {
  showLoading();
  firebase.firestore()
    .collection("transactions")
    .doc(transaction.uid)
    .delete()
    .then(() => {
      hideLoading();
      document.getElementById(transaction.uid).remove();
    })
}

/*******Menu Mobile*********/
function menuMobile() {
  let btn = document.getElementById('menu-sheet-id');
  btn.classList.toggle ("active");
}

// button new transaction //
function newTransaction() {
  const btn = document.getElementById('modal');
  if(btn.style.display == "flex"){
    btn.style.display = "none";
  } else {
    btn.style.display = "flex";
  }
  
}

