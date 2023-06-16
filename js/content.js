chrome.runtime.sendMessage({method: "shouldHighlight", host: location.host},
  function(response){
    if (JSON.parse(response.answer)) {
      console.log(location.host)
    }
  }
);