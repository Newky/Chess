<?php
$move = $_GET["move"];
$name = $_GET["name"];

$user = "u_richdel";
$pass = "ahYeem6i";
$database = "u_richdel";
mysql_connect(localhost, $user, $pass);
mysql_select_db($database) or die("Unable to select db");

if($move == "none")
{
	/*In this case, Name will hold opponents name*/
	$result = mysql_query("SELECT * FROM players WHERE name='$name'");
	$row = mysql_fetch_array($result, MYSQL_ASSOC);
	$move = $row['move'];
	if($move != "")
	{
		mysql_query("UPDATE players SET move='' WHERE name='$opponent'");
		echo $move;
	}
	else
	{
		echo "none";
	}
}
else
{
	mysql_query("UPDATE players SET move='$move' WHERE name='$name'");
}

?>
