/*
Recheck for the currently active tab, whenever background.js is run.
*/
let gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
gettingActiveTab.then((tabs) => {
  checkTab(tabs[0].id);
});

/*
Recheck for the currently active tab, whenever the user navigates.
*/
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  let gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then((tabs) => {
    if (tabId == tabs[0].id) {
      checkTab(tabId);
    }
  });
});

/*
Recheck for the currently active tab, whenever a new tab becomes active.
*/
browser.tabs.onActivated.addListener((activeInfo) => {
  checkTab(activeInfo.tabId);
});


function checkTab(tabId) {
  let gettingTab = browser.tabs.get(tabId);
  gettingTab.then((tab) => {
    var match = tab.url.match("^https://gitlab([.a-z-]+)/(.*?)(?:/-)?/pipelines/([0-9]+)$");
    if (match) { browser.tabs.sendMessage(tabId, {urlParts: match}); }
  });
}
