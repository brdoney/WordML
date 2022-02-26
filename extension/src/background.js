/*global chrome*/

window.onload = function() {
  console.log("onload" + Date())
}

document.addEventListener('keyup', (e) => {
    if (e.code === "l") {
        scrapeWord();
    }
});

function scrapeWord() {
    console.log("Enter key was hit, checking the board...");
}