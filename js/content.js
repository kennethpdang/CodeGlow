chrome.runtime.sendMessage({method: "shouldHighlight", host: location.host},
  function(response){
    if (JSON.parse(response.answer)) {
      var prismHighlightJavaScript = document.createElement("script");
      prismHighlightJavaScript.type = "text/javascript"
      prismHighlightJavaScript.src = chrome.runtime.getURL("js/prism/prism.js");

      var prismHighlightCSS = document.createElement("link");
      prismHighlightCSS.type = "text/css";
      prismHighlightCSS.rel = "stylesheet";
      prismHighlightCSS.href = chrome.runtime.getURL("js/prism/prism.css");

      var customCSS = document.createElement("link");
      customCSS.type = "text/css";
      customCSS.rel = "stylesheet";
      customCSS.href = chrome.runtime.getURL("js/custom.css");

      document.head.appendChild(prismHighlightJavaScript);
      document.head.appendChild(prismHighlightCSS);
      document.head.appendChild(customCSS);

      // Regular expression to match text between ```
      const regex = /```([\s\S]*?)```/gm;

      allTextOnScreen = document.body.innerHTML;

      const highlightedText = allTextOnScreen.replace(regex, (match, p1) => {
        const indentedCode = p1.split("<br>").map(line => "  " + line).join("\n");
        return `<pre class = "pre-block"><code class = "language-javascript" style = "text-shadow: none !important; color: white;"> ${indentedCode} </code></pre>`;
      });

      document.body.innerHTML = highlightedText;
    }
  }
);