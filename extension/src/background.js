/*global chrome*/

// When wordle is opened, run this
window.onload = async function() {
    getSourceCode();
}

async function getSourceCode() {
    return await chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
        var tabURL = tabs[0].url;
        fetch(tabURL).then(function (response) {
            return response.text();
        }).then(function (html) {
            alert(html);
        }).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
        });
        
     });
}