// Handle a click to the toolbar:
chrome.browserAction.onClicked.addListener(function(tab) {
    // Check to see if get option is activted:
    if(getOption('enabled')) {
        console.log("The British are Coming")
    }
    setOption('enabled', 'false')
});