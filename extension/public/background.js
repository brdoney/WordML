/*global chrome*/

console.log("Hello World - Background");

let boardState = null;

chrome.runtime.onMessage.addListener((message, sender, sendReponse) => {
  if (message.type === "get") {
    sendReponse({ message: boardState });
  } else {
    boardState = message.message;
  }
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, 
  function() {
     // With a new rule ...
     chrome.declarativeContent.onPageChanged.addRules([
     {
      // That fires when a page's URL contains a 'g' ...
      conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { urlContains: 'nytimes.com/games/wordle' },
      })
     ],
      // And shows the extension's page action.
      actions: [ new chrome.declarativeContent.ShowPageAction() ]
    }
  ]);
});