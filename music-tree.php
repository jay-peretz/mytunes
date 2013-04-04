<!DOCTYPE HTML>
<html>
<head>
<meta charset="UTF-8">
<link type="text/css" href="../contact-us/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
<title>My Music</title>
</head>
<body>
<div class=container>
<?php
require_once('php/utils/dataconnector.php');
$genres = $mysqli->query("select * from genres");
while ($genre = $genres->fetch_object()) {
	 echo '<div class=row><div class=span12>'.$genre->genre.'</div></div>';
	 if ($artists = $mysqli->query("select * from artists where genres_idgenres =".$genre->idgenres)) {
	 while ($artist = $artists->fetch_object()) {
			  echo '<div class=row><div class="span11 offset1">'.$artist->artist.'</div></div>';
			  if ($albums = $mysqli->query("select * from albums where artists_idartists=".$artist->idartists)) {
				  while ($album = $albums->fetch_object()) {
					  echo '<div class=row><div class="span10 offset2">'.$album->album.'</div></div>';
					  if ($tracks = $mysqli->query("select * from tracks where albums_idalbums=".$album->idalbums)) {
				          while ($track = $tracks->fetch_object()) {
					          echo '<div class=row><div class="span9 offset3">'.$track->track.'</div></div>';
				          }
			          }
				  }
			  }
		 }
	 }
	
}
$mysqli->close();
?>
</div>
</body>
</html>