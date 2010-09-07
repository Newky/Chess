<?php
$name = $_GET["name"];
$user = "XXXXXX";
$pass = "XXXXXX";
$database = "XXXXXX";
mysql_connect(localhost, $user, $pass);
mysql_select_db($database) or die("Unable to select db");
mysql_query("UPDATE players SET active = '0',opponent='',move='' WHERE name= '$name'");

?>

