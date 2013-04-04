<?php
require_once("utils/dataconnector.php");
if ($_POST["track"]) {
	$newtrack = $mysqli->prepare("insert into tracks (albums_idalbums, track) values (?,?)");
	$newtrack->bind_param("is",$_POST['albumid'],$_POST['track']);
	$newtrack->execute();
	print_r($mysqli->error);
 	$trackid = $newtrack->insert_id;
  	echo $trackid;
	$newtrack->close();
}
$mysqli->close();