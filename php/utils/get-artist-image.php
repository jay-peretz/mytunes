<?php
include('dataconnector.php');
$id = $_GET['id'];  
	$stmt = $mysqli->prepare("SELECT image FROM artists WHERE idartists=?"); 
	$stmt->bind_param("i", $id);

	$stmt->execute();
	$stmt->store_result();

	$stmt->bind_result($image);
	$stmt->fetch();

	header("Content-Type: image/jpeg");
	echo $image; 

?>