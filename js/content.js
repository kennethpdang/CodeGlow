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

      document.head.appendChild(prismHighlightJavaScript);
      document.head.appendChild(prismHighlightCSS);

      // Regular expression to match text between ```
      const regex = /```([\s\S]*?)```/gm;

      allTextOnScreen = document.body.innerHTML;

      // Replace matched text with styled text
      const highlightedText = allTextOnScreen.replace(regex, (match, p1) => {
        // Apply red color to the text between triple backticks
        return `<code class="language-javascript"> ${p1} </code>`;
      });

      document.body.innerHTML = highlightedText;
    }
  }
);