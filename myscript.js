function myFunction()
{
  document.getElementById("b1").innerHTML="Hello New World"
}
$(document).ready(function(){
  $('#b1').click(function () {
      myFunction();
  });
})
