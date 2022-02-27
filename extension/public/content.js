/*global chrome*/
var correctWords = 0;

chrome.runtime.sendMessage({greeting: document.all[0].outerHTML}, function(response) {
    console.log(response.farewell);
  });

async function parseSource() {
    var foo = document.createElement( 'html' );
    foo = document.getElementsByTagName('game-app').item(0).shadowRoot.getElementById('board');

    var tempCorrectWords = 0;
    for (let i = 0; i < correctWords + 1; i++) {
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
        console.log("fuck");
        console.log(getWordData());
    }
}

function getWordData() {
  var row = document.createElement( 'html' );
  row = document.getElementsByTagName('game-app').item(0).shadowRoot.getElementById('board').children[correctWords - 1];
  var position = 0;
  let jsonAbsent = '"absent": "';
  let jsonPresent = '"present": [';
  let jsonCorrect = '"correct": [';
  let jsonReturn = '{';
  for (const letter of row.shadowRoot.children[1].children) {
      var tempEval = letter.getAttribute('evaluation');
      if (tempEval === "absent") {
        jsonAbsent += letter.getAttribute('letter').toLowerCase();
      }
      else if(tempEval === "present") {
        let tempJSON = '{';
        tempJSON += '"letter": "' + letter.getAttribute('letter').toLowerCase() + '",';
        tempJSON += '"position": ' + position + ',';
        tempJSON += '}'
        jsonPresent += tempJSON;
        if (position !== 5) {
          jsonPresent += ',';
        }
      }
      else if(tempEval === "correct") {
        let tempJSON = '{';
        tempJSON += '"letter": "' + letter.getAttribute('letter').toLowerCase() + '",';
        tempJSON += '"position": ' + position + ',';
        tempJSON += '}'
        jsonCorrect += tempJSON;
        if (position !== 5) {
          jsonCorrect += ',';
        }
      }
      position ++;
  }
  jsonAbsent += '",';
  jsonPresent += "],"
  jsonCorrect += "]";
  jsonReturn += jsonAbsent + jsonPresent + jsonCorrect + '}';
  return jsonReturn;
}

document.onkeypress = function (e) {
  if (e.code === 'Enter') {
    parseSource();
  }
};