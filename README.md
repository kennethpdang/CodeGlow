# CodeGlow
This is a Google Chrome extension that syntax highlights a block of text between a group of delimiters given primarily by the characters `<pre>` and `</pre>`. The purpose of this code is to address the need for an extension
that doesn't appear to exists, which can style textual characters similar to how the "Tex All The Things" Extension can render LaTeX scripst between the delimiters `$` and `$`.

## How Does a Chrome Extension Work?
This code uses the Chrome Extensions API which are given here: https://developer.chrome.com/docs/extensions/reference/. We must first note the basics of a simple Chrome extension architecture. We have that a Chrome extension normally consists of a `📜 manifest` file. The manifest file is a JSON which Chrome uses to note information about the extension the files and the capabilities of the Chrome extension. We note that we can have a couple of scripts declared in the manifest file, but the two common types of scripts are background scripts and content scripts. Background scripts run in the background, and we can view the content of the background script by going to the Chrome menu ⋮ → Extensions → Manage Extensions → Inspect Views (Background Page) on the extension we wish to inspect. Content scripts are use to update the DOM and style content. We put our background scripts as the `📜 background.js` file and our content script in the `📜 content.js` file. There are other types of scripts that you can include: like a pop-up script, dev-tools script, and an options script which can be investigated or add in at a later time. Note, functions defined in one javascript file may be accessed by other javascript files because they are bundled in the same environment assuming they are both background scripts, for example:

```json
  /* Other JSON Above */
  "background": {
    "scripts": ["js/background.js", "js/options.js"],
    "persistent": true
  }
  /* Other JSON Below */
```

Would make all javascript functions in `📜 background.js` available to `📜 options.js` and vice versa.

## How Does CodeGlow Extension Work (High - Level Overview)?
The CodeGlow extension work. In addition for the libraries to create a Google extension, the CodeGlow extension uses the Prism JS Library here: https://prismjs.com/. This is a lightweight peice of code. We parse each individual page where the extension is toggled and then we find the characters `<pre>` and `</pre>` and syntax highlight the text of characters between those two.

## Schematic of Code:
Our `📜 content.js` file will communicate to our background scripts in the `📜 background.js` and `📜 options.js` file by using the Chrome Runtime API. We send an object that contains which function to run and the name of the localhost to the background scripts and check the response of the object to note whether we should apply a syntax highlight to the current page. To do this, we use the `onMessage()`, `sendMessage()`, and `sendResponse()` method of the Chrome Runtime library. Below is a short schematic.

<div align="center" style = "width: 100%">
  <img src="images/ReadMe%20Explainer%201.png">
</div>

## Miscellaneous
Note, if you perform a `console.log()` from the `📜 background.js` scripts, then the log will be outputted in the background page, which you have to access by going to Chrome menu ⋮ → Extensions → Manage Extensions → Inspect Views (Background Page). However performing a `console.log()` from the `📜 content.js` scripts will log a result directly in the page the script is being applied to.

Note, the scripts you are trying to access from the downloaded prism files: that is `prism.css` and `prism.js` must be included in the `"web_accessible_resources"` property of the manifest file or they will not load!

```mermaid
flowchart TB

style contentjs fill:#ffffff, stroke-width:2px, stroke:#000000, text-align:center, round-corner:10px
style backgroundjs fill:#ffffff, stroke-width:2px, stroke:#000000, text-align:center, round-corner:10px

contentjs["content.js"]
backgroundjs["background.js"]

contentjsText["```javascript
chrome.runtime.sendMessage(Object, function(response) {
  // code here
});
```"]

backgroundjsText["```javascript
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // code here
  sendResponse({...});
});
```"]

contentjs --> contentjsText
backgroundjs --> backgroundjsText
```
