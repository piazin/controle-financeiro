
function logout() {
    showLoading();
    firebase.auth().signOut().then(() => {
        window.location.href = "../login/index-login.html";
      }).catch((error) => {
        alert('erro ao sair');
      });
}

/*******Menu Mobile*********/

function menuMobile() {
  let btn = document.getElementById('menu-sheet-id');
  btn.classList.toggle ("active");
}


findTransactions();

function findTransactions() {
  setTimeout(() => {
    addTransactionsToScreen(fakeTransactions);
  }, 0)
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

const fakeTransactions = [{
  type: 'expense',
  date: '2022-03-27',
  money: {
    currency: 'R$',
    value: 10
  },
  transactionType: 'Supermercado'
}, {
  type: 'gain',
  date: '2022-03-03',
  money: {
    currency: 'R$',
    value: 5000
  },
  transactionType: 'Salário',
  descripition: 'Empresa A'
}, {
  type: 'expense',
  date: '2022-03-08',
  money: {
    currency: 'R$',
    value: 50
  },
  transactionType: 'Shopee',
  descripition: 'Aquario'
}, {
  type: 'expense',
  date: '2022-03-10',
  money: {
    currency: 'R$',
    value: 55
  },
  transactionType: 'Transporte',
  descripition: 'Gasto com gasolina'
}
]
