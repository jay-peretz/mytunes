<?php 
require_once('utils/dataconnector.php');
if ($_POST['trackid']) {
	$deletetrack = $mysqli->query('delete from tracks where idtracks = '.$_POST['trackid']);
	$deletetrack->execute(); 
    $deletetrack->close();
}
$mysqli->close();