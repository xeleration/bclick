<?php
define('DB_NAME', 'playbclick_com');
define('DB_USER', 'playbclick_com');
define('DB_PASSWORD', 'Dylan123');
define('DB_HOST', 'playbclick.com.mysql');
$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
if (!$link) { die('Could not connect: ' . mysql_error()); }
$db_selected = mysql_select_db(DB_NAME, $link);
if (!$db_selected) { die('Can\'t use ' . DB_NAME . ': ' . mysql_error()); }
$sql = "UPDATE TrumpDislikes SET Dislikes = Dislikes + 1";
if (!mysql_query($sql)) { die('Error: ' . mysql_error()); }
mysql_close();
?>