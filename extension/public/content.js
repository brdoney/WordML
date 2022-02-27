/*global chrome*/
console.log("Hello World - Contenet");

chrome.runtime.sendMessage({greeting: document.all[0].outerHTML}, function(response) {
    console.log(response.farewell);
  });

window.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        console.log("Enter");
    }
});

function parseSource() {
    var temp = document.getElementsByTagName('game-app').item(0);
    var startPos = 
}