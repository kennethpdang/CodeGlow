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

    chrome.action.setIcon({ path: iconPath });
}

function toggleExtensionEnabledState() {
    // const enabled = getOption('enabled');
    const enabled = true;
    updateExtensionIcon(enabled);
    // setOption('enabled', !enabled);
}

chrome.action.onClicked.addListener((tab) => {
    toggleExtensionEnabledState();
});

function shouldHighlight(host) {
    return true;
    /*
    if (!getOption('enabled')) {
      return false;
    }
    else {
        return true;
    }
    */
}

// Respond to request from the content script:
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == 'shouldHighlight') {
      sendResponse({answer: shouldHighlight(request.host)});
    } else {
      sendResponse({});
    }
});

/*
var defaultOptions = {
    enabled: true // Is extension currently on?
};

function getOption(optionName) {
    for (var option in defaultOptions) {
        if (!(option in chrome.storage.local)) {
            chrome.storage.local.set = JSON.stringify(defaultOptions[option]); // Local storage for key / value pairs where key is option name and value is value of option.
        }
    }
  
    if (optionAllowed(optionName)) {
        return JSON.parse(localStorage[optionName]);
    } else {
        throw "Option " + optionName + " not supported.";
    }
}

function optionAllowed(optionName) {
    return optionName in defaultOptions
}

function setOption(optionName, value) {
    if (optionAllowed(optionName)) {
        localStorage[optionName] = JSON.stringify(value);
    } else {
        throw "Option " + optionName + " not supported";
    }
  }
  */