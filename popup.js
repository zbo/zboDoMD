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
      //console.log(request.source);
      var table = $(request.source).find("table")[1]
      $("#result").html(table);
      var windows_succeed = 0;
      var windows_system_validation = 0;
      var windows_NA = 0;
      var windows_local =0;
      var linux_secceed = 0;
      var linux_system_validation = 0;
      var linux_NA = 0;
      var linux_local = 0;
      $(table).find("tr").each(function(i, val){

          var isHead = $(val).hasClass("tablesorter-headerRow");
          if(!isHead){
            if($($(val).find("td")[3]).hasClass("highlight-green"))
              windows_succeed++;
            else if($($(val).find("td")[3]).hasClass("highlight-yellow"))
              windows_system_validation++;
            else if ($(val).find("td")[3].innerText == "N.A.")
              windows_NA++;
            else
              windows_local++;

            if($($(val).find("td")[4]).hasClass("highlight-green"))
              linux_secceed++;
            else if($($(val).find("td")[4]).hasClass("highlight-yellow"))
              linux_system_validation++;
            else if ($(val).find("td")[4].innerText == "N.A.")
              linux_NA++;
            else
              linux_local++;
          }
      })
      var out_win = 'w_s'+windows_succeed+ ' w_na'+windows_NA+ ' w_local'+windows_local+ ' w_sysem'+windows_system_validation
      var out_lin = 'lin_s'+linux_secceed+' lin_na'+linux_NA+' l_local'+linux_local+ ' l_system'+linux_system_validation
      $("#lin").html(out_lin)
      $("#win").html(out_win);

    }
  });
}

$(document).ready(function(){
  $('#b1').click(function () {
      myFunction();
  });
})
