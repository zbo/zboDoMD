function RegressionFunction()
{
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
      var succeed = windows_succeed+linux_secceed;
      var invalidation = windows_local+linux_local+windows_system_validation+linux_system_validation;
      var percentage = succeed/(succeed+invalidation);
      $("#lin").html(out_lin);
      $("#win").html(out_win);
      $("#per").html(percentage);

    }
  });
}

function HKEXFunction()
{
  chrome.tabs.executeScript(null, {file: "getPagesSource.js"}, function() {
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
  chrome.runtime.onMessage.addListener(function(request, sender) {
    var mycars=new Array()
    mycars[0]="72341"
    mycars[1]="70333"
    if (request.action == "getSource") {
      var div = $(request.source).find("#pnlResult")[0]
      var table = $(div).find("tbody")[0]
      //$("#result").html(table);
      all = "<table>"
      $(table).find("tr").each(function(i, val){
          var row0 = $(val).hasClass("row0")
          var row1 = $(val).hasClass("row1")
          if (row0||row1) {
            number = $(val).find("td")[0].innerText
            if ($.inArray($.trim(number), mycars)!=-1)
              all = all + "<tr>" + $(val).html() + "</tr>"
          }
      })
      all = all + "</table>"
      $("#result").html(all);
    }
  });
}

$(document).ready(function(){
  $('#b1').click(function () {
      RegressionFunction();
  });
  $('#b2').click(function () {
      HKEXFunction();
  });
})
