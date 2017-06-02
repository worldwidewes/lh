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

$('#vid1').on('click', function(event) {
   event.preventDefault();
   $('#vidName').text("DYNAMIC_VIDEO_NAME_HERE");
      
});

$('#next').on('click', function(event) {
   event.preventDefault();
   $('#modalImage').attr('src','http://placekitten.com/g/1920/1080');
      
});

$('#prev').on('click', function(event) {
   event.preventDefault();
   $('#modalImage').attr('src','http://placekitten.com/g/1921/1081');
      
});
 
})();