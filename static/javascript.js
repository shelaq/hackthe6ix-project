// sample dataset
var people = {
  "accountsPayable": [{
    "name": "Eason",
    "transactions": [{
      "date": "01/01/2001",
      "amount": 888
    }, {
      "date": "01/05/2001",
      "amount": 500
    }]
  }, {
    "name": "Nick",
    "transactions": [{
      "date": "01/01/2001",
      "amount": 364
    }, {
      "date": "01/01/2001",
      "amount": 234
    }]
  }]
}

// working expression for collecting checkbox value. Returns Bool 
console.log($('#theyOweYou').is(':checked')););

//function for populating
function populate() {

  var docFrag = document.createDocumentFragment();
  var moneyOwed = 0;

  for (var i = 0; i < people['accountsPayable'].length; i++) {
    var tempNode = document.querySelector("div[data-type='template']").cloneNode(true); //true for deep clone
    tempNode.querySelector(".name").textContent = people['accountsPayable'][i]['name'];

    for (var j = 0; j < people['accountsPayable'][i]['transactions'].length; j++) {

      moneyOwed += people['accountsPayable'][i]['transactions'][j]['amount']


      var tempNodeList = document.querySelector("div[data-type='listTemplate']").cloneNode(true); //true for deep clone
      tempNodeList.querySelector(".money-owed-list").textContent = "Money Owed: $" + people['accountsPayable'][i]['transactions'][j]['amount'];
      tempNodeList.querySelector(".date").textContent = "date: " + people['accountsPayable'][i]['transactions'][j]['date'];
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

document.getElementById('submit').addEventListener('click', function() {
  var dateBorrowed = document.getElementById('date-borrowed').value;
  var theyOweYou = document.getElementById('theyOweYou').value;
  var amountOwed = document.getElementById('amount-owed').value;
  var recipientname = document.getElementById('recipient-name').value;
  var reason = document.getElementById('reason').value;

  console.log(dateBorrowed);
  console.log(amountOwed);
  console.log(recipientname);
  console.log(reason);
  console.log(theyOweYou);



  getData();

});

function getData() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:5000/get", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);
  console.log(response);
  people = response;
}


$(document).ready(function() {
  try {
    getData();
    populate();

  } catch (e) {
    console.log(e);
  }
});
