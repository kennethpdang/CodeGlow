// Handle a click to the toolbar:
chrome.browserAction.onClicked.addListener(function(tab) {
    // Check to see if get option is activted:
    if(getOption('enabled')) {
        chrome.browserAction.setIcon({
            path: {
                "16": "/images/CodeGlow - Highlighted - 16.png",
                "48": "/images/CodeGlow - Highlighted - 48.png",
                "128": "/images/CodeGlow - Highlighted - 128.png"
            }
        });
        setOption('enabled', false);
    }
    else {
        chrome.browserAction.setIcon({
            path: {
                "16": "/images/CodeGlow - Not Highlighted - 16.png",
                "48": "/images/CodeGlow - Not Highlighted - 48.png",
                "128": "/images/CodeGlow - Not Highlighted - 128.png"
            }
        });
        setOption('enabled', true)
    }
});