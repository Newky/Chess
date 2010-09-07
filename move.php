<?php
$move = $_GET["move"];
$name = $_GET["name"];
$las_move = $_GET["las_move"];
$user = "XXXXXX";
$pass = "XXXXXX";
$database = "XXXXXX";
mysql_connect(localhost, $user, $pass);
mysql_select_db($database) or die("Unable to select db");

if($move == "none")
{
	while(1)
	{
		/*In this case, Name will hold opponents name*/
		$result = mysql_query("SELECT * FROM players WHERE name='$name'");
		$row = mysql_fetch_array($result);
		$move = $row['move'];
		if($move != $las_move && $move != "")
		{
			echo $move;
			break;
		}
		sleep(2);
	}
}
else
{
	mysql_query("UPDATE players SET move='$move' WHERE name='$name'");
	echo "ACK";
}

?>
