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

    // document.getElementById('card-id').id = i;

    var tempNode = document.querySelector("div[data-type='template']").cloneNode(true); //true for deep clone
    tempNode.querySelector(".name").textContent = people['accountsPayable'][i]['name'];

    for (var j = 0; j < people['accountsPayable'][i]['transactions'].length; j++) {



      var tempNodeList = document.querySelector("div[data-type='listTemplate']").cloneNode(true); //true for deep clone
      tempNodeList.querySelector(".money-owed-list").textContent = "Money Owed: $" + people['accountsPayable'][i]['transactions'][j]['amount'];
      tempNodeList.querySelector(".date").textContent = "date: " + people['accountsPayable'][i]['transactions'][j]['date'];
      tempNodeList.style.display = "block";
      tempNode.appendChild(tempNodeList);
    }

    tempNode.querySelector(".money-owed").textContent = 'Net Owing: $' + people['accountsPayable'][i]['total'];
    moneyOwed = people['accountsPayable'][i]['total'];
    tempNode.style.display = "block";

    if (moneyOwed == 0) {} else {
      document.body.appendChild(tempNode);
    }
  }

  if (moneyOwed == 0) {} else {
    document.body.appendChild(docFrag);
    delete docFrag;
  }

}




document.getElementById('submit').addEventListener('click', function() {
  var dateBorrowed = document.getElementById('date-borrowed').value;
  var theyOweYou = $('#theyOweYou').is(':checked');
  var amountOwed = document.getElementById('amount-owed').value;
  var recipientname = document.getElementById('recipient-name').value;
  var reason = document.getElementById('reason').value;



  var placeholder = {
    "name": $.trim(recipientname),
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
  var curr_url = location.protocol + "//" + location.host + "/get";
  xhttp.open("GET", curr_url, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);
  console.log(response);
  people = response;
}

function clicked(data) {
  var oweName = $(data).find('a')[0].innerHTML;
  console.log(oweName);

  var placeholder = {
    'name': oweName
  }

  console.log(placeholder);


  var curr_url = location.protocol + "//" + location.host + "/delete";
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", curr_url, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(placeholder));
  location.reload();

}

function addEntry(data) {
  var xhttp = new XMLHttpRequest();
  var curr_url = location.protocol + "//" + location.host + "/post";
  xhttp.open("POST", curr_url, true);
  xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhttp.send(data);
  getData();
  location.reload();

}

function logOut() {
    var curr_url = location.protocol + "//" + location.host + "/logout";
    
    window.location.href = curr_url;
}

$(document).ready(function() {
  try {
    getData();
    populate();

  } catch (e) {
    console.log(e);
  }
});
