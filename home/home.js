
function logout() {
    showLoading();
    firebase.auth().signOut().then(() => {
        window.location.href = "../login/index-login.html";
      }).catch((error) => {
        alert('erro ao sair');
      });
}

findTransactions();

function findTransactions() {
    firebase.firestore()
        .collection('transactions')
        .get()
        .then(snapshot => {
            const transactions = snapshot.docs.map(doc => doc.data());
            addTransactionsToScreen(transactions);
        })
}

function addTransactionsToScreen(trasactions) {
  const orderedList = document.getElementById('transactions');

  trasactions.forEach(trasactions => {
    const li = document.createElement('li');
    li.classList.add(trasactions.type);

    const date = document.createElement('p');
    date.innerHTML = formatDate(trasactions.date);
    li.appendChild(date);

    const money = document.createElement('p');
    money.innerHTML = formatMoney(trasactions.money);
    li.appendChild(money);

    const type = document.createElement('p');
    type.innerHTML = trasactions.transactionType;
    li.appendChild(type);

    if(trasactions.descripition) {
      const descripition = document.createElement('p');
      descripition.innerHTML = trasactions.descripition;
      li.appendChild(descripition);
    }

    orderedList.appendChild(li);
  });
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-br');
}

function formatMoney(money) {
  return `${money.currency} ${money.value.toFixed(2)}`
}

/*******Menu Mobile*********/
function menuMobile() {
  let btn = document.getElementById('menu-sheet-id');
  btn.classList.toggle ("active");
}