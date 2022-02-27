/*global chrome*/
console.log("Hello World - Contenet");

chrome.runtime.sendMessage({greeting: document.all[0].outerHTML}, function(response) {
    console.log(response.farewell);
  });

function parseSource() {
    var el = document.createElement( 'html' );
    el = document.getElementsByTagName('game-app').item(0);
    var str = String(el.outerHTML);
    
}