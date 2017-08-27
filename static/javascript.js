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

//function for populating
function populate() {

  var docFrag = document.createDocumentFragment();
  var moneyOwed = 0;

  for (var i = 0; i < people['accountsPayable'].length; i++) {
    console.log(i);

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

    tempNode.querySelector(".money-owed").textContent = 'Net Owing: $' + moneyOwed;
    moneyOwed = 0;

    tempNode.style.display = "block";
    document.body.appendChild(tempNode);

  }

  document.body.appendChild(docFrag);
  delete docFrag;

}




document.getElementById('submit').addEventListener('click', function() {
  var dateBorrowed = document.getElementById('date-borrowed').value;
  var theyOweYou = $('#theyOweYou').is(':checked');
  var amountOwed = document.getElementById('amount-owed').value;
  var recipientname = document.getElementById('recipient-name').value;
  var reason = document.getElementById('reason').value;



  var placeholder = {
    "name": recipientname,
    "amount": amountOwed,
    "theyOweYou": theyOweYou,
    "date": dateBorrowed,
    "reason": reason
  }

  console.log(placeholder);
  addEntry(JSON.stringify(placeholder));

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

function addEntry(data) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:5000/post", false);
  xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhttp.send(data);
  getData();
  location.reload();

}


$(document).ready(function() {
  try {
    getData();
    populate();

  } catch (e) {
    console.log(e);
  }
});
