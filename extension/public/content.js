/*global chrome*/
console.log("Hello World - Contenet");

chrome.runtime.sendMessage({greeting: document.all[0].outerHTML}, function(response) {
    parseSource();
    console.log(response.farewell);
  });

function parseSource() {
    var foo = document.createElement( 'html' );
    foo = document.getElementsByTagName('game-app').item(0).shadowRoot.getElementById('board');
    console.log(foo);
}