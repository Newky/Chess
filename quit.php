<?php
$name = $_GET["name1"];
$user = "XXXXX";
$pass = "XXXXX";
$database = "XXXXXX";
mysql_connect(localhost, $user, $pass);
mysql_select_db($database) or die("Unable to select db");
mysql_query("UPDATE players SET active = '0' WHERE name= '$name'");

?>

