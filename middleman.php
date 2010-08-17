<?php
$name = $_GET["name1"];
$user = "u_richdel";
$pass = "ahYeem6i";
$database = "u_richdel";
mysql_connect(localhost, $user, $pass);
mysql_select_db($database) or die("Unable to select db");

$result = mysql_query("SELECT * FROM players ");
echo "NAME\t\tOPP\t\tACTIVE\t\tMOVE<br />";
while($row = mysql_fetch_array($result))
	echo $row['name']."\t".$row['opponent']."\t".$row['active']."\t".$row['move']."<br />"
?>
