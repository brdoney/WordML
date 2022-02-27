/*global chrome*/
var correctWords = 0;

async function parseSource() {
  var foo = document.createElement("html");
  foo = document
    .getElementsByTagName("game-app")
    .item(0)
    .shadowRoot.getElementById("board");

  var tempCorrectWords = 0;
  for (let i = 0; i < correctWords + 1; i++) {
    var row = foo.children[i];
    var countValid = 0;
    for (const letter of row.shadowRoot.children[1].children) {
      if (letter.getAttribute("evaluation") != null) {
        countValid++;
      }
    }
    // If the word has 5 correct values, add it to the words
    if (countValid === 5) {
      tempCorrectWords++;
    }
  }
  if (tempCorrectWords > correctWords) {
    correctWords++;
    const data = getWordData();
    console.log(data);
    chrome.runtime.sendMessage({ message: data });
  }
}

function getWordData() {
  let row = document.createElement("html");
  row = document
    .getElementsByTagName("game-app")
    .item(0)
    .shadowRoot.getElementById("board").children[correctWords - 1];
  var position = 0;
	const entry = { present: [], correct: {}, absent: "" };
  for (const letter of row.shadowRoot.children[1].children) {
    const tempEval = letter.getAttribute("evaluation");
    if (tempEval === "absent") {
      entry.absent += letter.getAttribute("letter").toLowerCase();
    } else if (tempEval === "present") {
      entry.present.push({
        letter: letter.getAttribute("letter").toLowerCase(),
        position: position,
      });
    } else if (tempEval === "correct") {
      entry.correct[position] = letter.getAttribute("letter").toLowerCase();
    }
    position++;
  }
  return entry;
}

document.onkeypress = function (e) {
  if (e.code === "Enter") {
    parseSource();
  }
};
