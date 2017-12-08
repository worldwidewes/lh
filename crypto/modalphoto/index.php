<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="theme-color" content="#222">


<title>Modal Test</title>
<link href="style.css" rel="stylesheet">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">

<script type="text/javascript" src="http://www.youtube.com/player_api"></script>
 </head>


<body>

     
<div class="container">
  <a href="#" id='vid1' class="modalClick"> Click to view image
 </a>

</div> <!--End of Container -->
<div id="overlay">
   <div id="modal">
      
      <div><span class="close">&#10006;</span></div>
      <span id="prev" class="prev glyphicon glyphicon-chevron-left"></span>
      <span id="next" class="next glyphicon glyphicon-chevron-right"></span>
      
<!--       <h2 id='vidName' class="head">Video Name</h2>
 -->      
      <img id="modalImage" class="img-responsive" src="/images/sunset.jpeg"></img>

   </div>
</div>

<script src="jquery.js"></script>
</body>

</html>
