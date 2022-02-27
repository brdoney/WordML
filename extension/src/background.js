/*global chrome*/

// When wordle is opened, run this
window.onload = function() {
    scrapeRows();
}

function scrapeRows() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var xhr = new XMLHttpRequest();
        var tabURL = tabs[0].url;
        xhr.open("GET", tabURL, true);
        xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            alert(xhr.responseText);
            }
        }
        xhr.send();
     });
}