<?php 
require_once('utils/dataconnector.php');
if ($_POST['trackid']) {
	$trackupdate = $mysqli->prepare("update tracks set track = ?, url = ? where idtracks = ?");
	$trackupdate->bind_param('ssi',$_POST['track'],$_POST['url'],$_POST['trackid']);
	$trackupdate->execute();
	$trackupdate->close();
}
$mysqli->close();