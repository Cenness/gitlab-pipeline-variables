function createTableFromJSON(arr) {
  // exit if there are no variables
  if (!arr.length) { return; };

  var divForTheTable = document.createElement("div");
  divForTheTable.id = "gitlab-ext-variables"
  divForTheTable.className = "gl-mb-3"

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
  var divContainer = document.querySelector('[data-qa-selector="pipeline_details_header"]');
  divContainer.appendChild(divForTheTable);
};

function checkTab() {
  var tab_url = document.querySelector('meta[property="og:url"]').content
  if (tab_url) {
    var match = tab_url.match("^https://gitlab([.a-z-]+)/(.*?)(?:/-)?/pipelines/([0-9]+)$");
    if (match) {
      // exit if the table has been injected previously
      if (document.getElementById("gitlab-ext-variables")) { return; };

      var host = match[1];
      var repo = match[2];
      var pipeline = match[3];

      fetch("https://gitlab" + host + "/api/v4/projects/" + encodeURIComponent(repo) + "/pipelines/" + pipeline + "/variables")
      .then(res => res.json())
      .then(out => {
        createTableFromJSON(out);
      })
      .catch(err => { throw err });
    }
  }
}

checkTab()
