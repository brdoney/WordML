/*global chrome*/
var correctWords = 0;

chrome.runtime.sendMessage({greeting: document.all[0].outerHTML}, function(response) {
    console.log(response.farewell);
  });

function parseSource() {
    var foo = document.createElement( 'html' );
    foo = document.getElementsByTagName('game-app').item(0).shadowRoot.getElementById('board');
    // for (const row of foo.children) {
    //     if (row.getAttribute('letters').length === 5) {
    //       console.log(row.getAttribute('letters'))
    //       rowWord = row.shadowRoot.children[1];
    //       var countValid = 0;
    //       console.log(rowWord.children.length);
    //       for (const letter of rowWord.children) {
    //           // console.log(letter.getAttribute('letter'));
    //           // console.log(letter.getAttribute('evaluation'));
    //           if (letter.getAttribute != null) {
    //             countValid ++;
    //           }
    //       }
    //       if (countValid === 5) {
    //         correctWords++;
    //       }
    //       console.log("correct words: " + correctWords);
    //     }
    // }

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
    }
    console.log("correct words: " + correctWords);
    console.log("correct word: " + foo.children[correctWords - 1].getAttribute('letters'));
}

// 
// [(letter, absent value), (letter, absent value), ...]
// index is the location
// 0 is absent, 2 is present, 3 is correct

document.onkeypress = function (e) {
  if (e.code === 'Enter') {
    parseSource();
  }
};