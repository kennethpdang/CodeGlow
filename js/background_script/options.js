var defaultOptions = {
    enabled: true
};

function getOption(optionName) {
    for (var option in defaultOptions) {
        if (!(option in localStorage)) {
            localStorage[option] = JSON.stringify(defaultOptions[option]); // Local storage for key / value pairs where key is option name and value is value of option.
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

function setOption(option_name, value) {
    if (optionAllowed(option_name)) {
        localStorage[option_name] = JSON.stringify(value);
    } else {
        throw "Option " + option_name + " not supported";
    }
  }