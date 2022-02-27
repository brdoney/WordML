/*global chrome*/
var correctWords = 0;

chrome.runtime.sendMessage({greeting: document.all[0].outerHTML}, function(response) {
    console.log(response.farewell);
  });

function parseSource() {
    var foo = document.createElement( 'html' );
    foo = document.getElementsByTagName('game-app').item(0).shadowRoot.getElementById('board');

    var tempCorrectWords = 0;
    for (let i = 0; i < 6; i++) {
      var row = foo.children[i];
      var countValid = 0;
      for (const letter of row.shadowRoot.children[1].children) {
        if (letter.getAttribute('evaluation') != null) {
          countValid ++;
        }
      }
      // If the word has 5 correct values, add it to the words
      if (countValid === 5) {
        tempCorrectWords++;
      }
    }
    if (tempCorrectWords > correctWords) {
        correctWords++;
        getWordData();
    }
    console.log("correct words: " + correctWords);
    console.log("correct word: " + foo.children[correctWords - 1].getAttribute('letters'));
}

function getWordData() {
  var row = document.createElement( 'html' );
  row = document.getElementsByTagName('game-app').item(0).shadowRoot.getElementById('board').children[correctWords - 1];
  var word = row.shadowRoot.children[1].children;
  var numAbsent = 0;
  var numPresent = 0;
  var numCorrect = 0;
  for (const letter of word) {
    
  }
}

document.onkeypress = function (e) {
  if (e.code === 'Enter') {
    parseSource();
  }
};