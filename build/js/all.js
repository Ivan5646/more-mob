$(document).ready(function(){ 

$(".btn").click(function() {
    $('html, body').animate({
      scrollTop: $("#form").offset().top
  }, 1500);
});


});