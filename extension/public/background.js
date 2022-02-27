/*global chrome*/

console.log("Hello World - Background");

chrome.runtime.onMessage.addListener(function (message, callback) {
  console.log(message.greeting);
});
