





// sample dataset
var people =  {"accountsPayable":[{"Name":"Eason","Transactions":[{"Date":"01/01/2001","Amount":888},{"Date":"01/05/2001","Amount":500}]},{"Name":"Nick","Transactions":[{"Date":"01/01/2001","Amount":364},{"Date":"01/01/2001","Amount":234} ]}]}


//function for populating
function populate()
{
  console.log(people);


var docFrag = document.createDocumentFragment();
for (var i = 0; i < people['accountsPayable'].length; i++)
{
  var tempNode = document.querySelector("div[data-type='template']").cloneNode(true); //true for deep clone
  tempNode.querySelector(".name").textContent = people['accountsPayable'][i]['Name'];

  for (var j = 0; j < people['accountsPayable'][i]['Transactions'].length; j++) {

    // var li = document.createElement('li'); //true for deep clone
    // li.innerText = "Money Owed: $" + people['accountsPayable'][i]['Transactions'][j]['Amount'];
    // tempNode.appendChild(li);

    var tempNodeList = document.querySelector("div[data-type='listTemplate']").cloneNode(true); //true for deep clone
    tempNodeList.querySelector(".money-owed-list").textContent = "Money Owed: $" + people['accountsPayable'][i]['Transactions'][j]['Amount'];

    tempNodeList.querySelector(".date").textContent = "Date: " + people['accountsPayable'][i]['Transactions'][j]['Date'];

    //document.body.appendChild(tempNodeList);
    tempNodeList.style.display = "block";
    tempNode.appendChild(tempNodeList);
  }

  //tempNode.querySelector(".money-owed").textContent = "Money Owed: $" + people['accountsPayable'][i]['Transactions'].
  // tempNode.querySelector("img").src = movies[keys[i]].imageurl;
  // tempNode.querySelector("button").onclick = window[movies[keys[i]].func];
  // tempNode.querySelector("a").href = movies[keys[i]].details;
  tempNode.style.display = "block";
  document.body.appendChild(tempNode);

}

document.body.appendChild(docFrag);
delete docFrag;

}


populate();
