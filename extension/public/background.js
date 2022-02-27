/*global chrome*/

let boardState = null;

chrome.runtime.onMessage.addListener((message, sender, sendReponse) => {
  if (message.type === "get") {
    sendReponse({ message: boardState });
  } else {
    boardState = message.message;
  }
});
