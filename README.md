# CodeGlow
This is a Google Chrome extension that syntax highlights a block of text between a group of delimiters given primarily by the characters `<pre>` and `</pre>`. The purpose of this code is to address the need for an extension
that doesn't appear to exists, which can style textual characters similar to how the "Tex All The Things" Extension can render LaTeX scripst between the delimiters `$` and `$`.

## How Does it Work?
This code uses the Chrome Extensions API which are given here: https://developer.chrome.com/docs/extensions/reference/. We must first note the basics of a simple Chrome extension architecture. We have that a Chrome extension normally consists of a `📜 manifest` file. The manifest file is an XML which Chrome uses to note information about the extension the files and the capabilities of the Chrome extension. We also have a `📜 content.js` script for injecting and styling code in the DOM. And finally we have a `📜 background.js` script that runs javascript code in the background. The code here continuously executes, and is where you can include listeners and such.

