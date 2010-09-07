<?php
$name = $_GET["name1"];
$user = "XXXXXX";
$pass = "XXXXXX";
$database = "XXXXXX";
mysql_connect(localhost, $user, $pass);
mysql_select_db($database) or die("Unable to select db");

if(mysql_num_rows(mysql_query("SELECT * FROM players WHERE name = '$name'")) >= 1)
{
	mysql_query("UPDATE players SET active = '1' WHERE name= '$name'");
}
else
{	
	mysql_query("INSERT INTO players VALUES ('$name', '', '1', '')");
}

$opponent = "";
$result = mysql_query("SELECT * FROM players WHERE active= '1' AND opponent=''");
if(mysql_num_rows($result) >= 1)
{
	while($row = mysql_fetch_array($result))
	{
		if($row['name'] != $name)
		{
			$opponent =$row['name'];
			break;
		}
	}
	mysql_query("UPDATE players SET opponent = '$name' WHERE name = '$opponent'");
}
$result = mysql_query("SELECT * FROM players WHERE active= '1' AND opponent='$name'");
$row = mysql_fetch_array($result);
$opponent = $row['name'];
mysql_query("UPDATE players SET opponent = '$opponent' WHERE name = '$name'");
echo $opponent;
?>
