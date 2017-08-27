// sample dataset
var people = {
  "accountsPayable": [{
    "Name": "Eason",
    "Transactions": [{
      "Date": "01/01/2001",
      "Amount": 888
    }, {
      "Date": "01/05/2001",
      "Amount": 500
    }]
  }, {
    "Name": "Nick",
    "Transactions": [{
      "Date": "01/01/2001",
      "Amount": 364
    }, {
      "Date": "01/01/2001",
      "Amount": 234
    }]
  }]
}


//function for populating
function populate() {

  var docFrag = document.createDocumentFragment();
  var moneyOwed = 0

  for (var i = 0; i < people['accountsPayable'].length; i++) {
    var tempNode = document.querySelector("div[data-type='template']").cloneNode(true); //true for deep clone
    tempNode.querySelector(".name").textContent = people['accountsPayable'][i]['Name'];

    for (var j = 0; j < people['accountsPayable'][i]['Transactions'].length; j++) {

         moneyOwed += people['accountsPayable'][i]['Transactions'][j]['Amount']


      var tempNodeList = document.querySelector("div[data-type='listTemplate']").cloneNode(true); //true for deep clone
      tempNodeList.querySelector(".money-owed-list").textContent = "Money Owed: $" + people['accountsPayable'][i]['Transactions'][j]['Amount'];
      tempNodeList.querySelector(".date").textContent = "Date: " + people['accountsPayable'][i]['Transactions'][j]['Date'];
      tempNodeList.style.display = "block";
      tempNode.appendChild(tempNodeList);
    }

    tempNode.querySelector(".money-owed").textContent = 'Money Owed: $' + moneyOwed;
    moneyOwed = 0;

    tempNode.style.display = "block";
    document.body.appendChild(tempNode);
  }

  document.body.appendChild(docFrag);
  delete docFrag;

}

document.getElementById('submit').addEventListener('click', function(){
  var dateBorrowed = document.getElementById('date-borrowed').value;
  var amountOwed = document.getElementById('amount-owed').value;
  var recipientName = document.getElementById('recipient-name').value;

  console.log(dateBorrowed);
  console.log(amountOwed);
  console.log(recipientName);

});

$(document).ready(function() {
  try {
    populate();

  } catch (e) {
    console.log(e);
  }
});
