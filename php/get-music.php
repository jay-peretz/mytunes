<?php
require_once("utils/dataconnector.php");
if ($genres = $mysqli->query("SELECT * from genres"))  { 
  while ($genre = $genres->fetch_object())
  { 
   $musicarray[$genre->idgenres] = $genre;  
   if ($artists = $mysqli->query("select idartists , artist from artists where genres_idgenres = ".$genre->idgenres)) {
	   while ($artist = $artists->fetch_object())
	   {
		   $musicarray[$genre->idgenres]->artists[$artist->idartists] = $artist;	   
	   }
	   $artists->close();
   }
  } 
  $genres->close();
  
}; 
$mysqli->close(); 
require_once('utils/JSON.php');
$json = new Services_JSON;
$music = $json->encode($musicarray);
echo $music;
?>