function createTableFromJSON(arr) {

  // exit if there is no variables
  if (!arr.length) { return; };

  var divForTheTable = document.createElement("div");
  divForTheTable.id = "gitlab-ext-variables"
  divForTheTable.className = "well-segment"

  var table = document.createElement("table");
  table.style = "font-family:monospace;"

  for (var i = 0; i < arr.length; i++) {
    tr = table.insertRow(-1);

    var tabK = tr.insertCell(0);
    tabK.textContent = arr[i].key;
    tabK.style = "padding-right: 2rem;";

    var tabV = tr.insertCell(1);
    tabV.textContent = arr[i].value;
  }

  divForTheTable.appendChild(table);
  var divContainer = document.getElementsByClassName("info-well")[0];
  divContainer.appendChild(divForTheTable);
};

browser.runtime.onMessage.addListener((message) => {

  // exit if vars already there
  if (document.getElementById("gitlab-ext-variables")) { return; };

  var host = message.urlParts[1];
  var repo = message.urlParts[2];
  var pipeline = message.urlParts[3];

  fetch("https://gitlab" + host + "/api/v4/projects/" + encodeURIComponent(repo) + "/pipelines/" + pipeline + "/variables")
  .then(res => res.json())
  .then(out => {
    createTableFromJSON(out);
  })
  .catch(err => { throw err });

});
