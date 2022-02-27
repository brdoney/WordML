/*global chrome*/
var correctWords = 0;

function parseSource() {
  let foo = document
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
    chrome.runtime.sendMessage({ type: "save", message: data });
  } else if (tempCorrectWords === 0) {
    chrome.runtime.sendMessage({ type: "save", message: null });
	}
}

function getWordData() {
  let board = document
    .getElementsByTagName("game-app")
    .item(0)
    .shadowRoot.getElementById("board");

  const entries = { entries: [] };
  for (let i = 0; i < correctWords; i++) {
    const row = board.children[i];
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
    // Add entry
    entries.entries.push(entry);
  }

  return entries;
}

document.onkeypress = function (e) {
  if (e.code === "Enter") {
    parseSource();
  }
};

window.addEventListener("load", () => {
	parseSource();
}) 