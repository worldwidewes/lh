(function(){
 
$('.modalClick').on('click', function(event) {
   event.preventDefault();
   $('#overlay')
      .fadeIn()
      .find('#modal')
      .fadeIn();
});
 
$('.close').on('click', function(event) {
   event.preventDefault();
   $('#overlay')
      .fadeOut()
      .find('#modal')
      .fadeOut();
});
 
})();