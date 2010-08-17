<?php
$name = $_GET["name1"];
$user = "u_richdel";
$pass = "ahYeem6i";
$database = "u_richdel";
mysql_connect(localhost, $user, $pass);
mysql_select_db($database) or die("Unable to select db");
$opponent = "";
$result = mysql_query("SELECT * FROM players WHERE name='$name'");
if(mysql_num_rows($result) >= 1)
{
	$record = mysql_fetch_array($result);
	$opponent = $record['opponent'];
}
echo $opponent;
?>
