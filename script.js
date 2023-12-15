function createTableFromJSON(arr) {
  // exit if there are no variables
  if (!arr.length) { return; };

  var divForTheTable = document.createElement("div");
  divForTheTable.id = "gitlab-ext-variables"
  divForTheTable.className = "gl-mb-3"

  var table = document.createElement("table");
  table.style = "font-family:monospace; margin-top: 1rem;"

  for (var i = 0; i < arr.length; i++) {
    tr = table.insertRow(-1);

    var tabK = tr.insertCell(0);
    Object.assign(tabK, {
      textContent: arr[i].key,
      style: "padding-right: 2rem;",
      id: "gl-ext-key-" + i,
      data-clipboard-target: "#gl-ext-key-" + i
      title: "Copy name",
      aria-live: "polite",
      data-placement: "bottom",
      data-toggle: "tooltip"
    });

    var tabV = tr.insertCell(1);
    Object.assign(tabV, {
      textContent: arr[i].value,
      id: "gl-ext-val-" + i,
      data-clipboard-target: "#gl-ext-val-" + i
      title: "Copy value",
      aria-live: "polite",
      data-placement: "bottom",
      data-toggle: "tooltip"
    });
  }

  divForTheTable.appendChild(table);
  var divContainer = document.querySelector('[data-testid="pipeline-details-header"]').children[0].children[0];
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
