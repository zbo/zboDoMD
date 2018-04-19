function myFunction()
{
  /* 得到当前tab的url
  chrome.tabs.getSelected(null, function (tab) {
        console.log(tab.url);
        console.log(document.body);
  });
  */
  chrome.tabs.executeScript(null, {file: "getPagesSource.js"}, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
  chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
      console.log(request.source);
      alert(request.source);
    }
  });
}

$(document).ready(function(){
  $('#b1').click(function () {
      myFunction();
  });
})
