function updateExtensionIcon(enabled) {
    const iconPath = enabled ? {
        "16": "/images/CodeGlow - Not Highlighted - 16.png",
        "48": "/images/CodeGlow - Not Highlighted - 48.png",
        "128": "/images/CodeGlow - Not Highlighted - 128.png"
    } : {
        "16": "/images/CodeGlow - Highlighted - 16.png",
        "48": "/images/CodeGlow - Highlighted - 48.png",
        "128": "/images/CodeGlow - Highlighted - 128.png"
    };

    chrome.browserAction.setIcon({ path: iconPath });
}

function toggleExtensionEnabledState() {
    const enabled = getOption('enabled');
    updateExtensionIcon(enabled);
    setOption('enabled', !enabled);
}

chrome.browserAction.onClicked.addListener(function(tab) {
    toggleExtensionEnabledState();
});

function shouldHighlight(host) {
    if (!getOption('enabled')) {
      return false;
    }
    else {
        return true;
    }
}

// Respond to request from the content script:
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == 'shouldHighlight') {
      sendResponse({answer: shouldHighlight(request.host)});
    } else {
      sendResponse({});
    }
});