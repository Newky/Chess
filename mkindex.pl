#!/usr/bin/perl -w
#

print qq{
<html>
	<head>
	<title> Chess </title>
	<link rel=StyleSheet href="decorate.css" type="text/css"/>
	<link rel=StyleSheet href="pieces.css" type="text/css"/>
	<script type="text/javascript" src="main.js">
	</script>
	<script type="text/javascript" src="moves.js">
	</script>
	<script type="text/javascript" src="ajaxStuff.js">
	</script>
	<script type="text/javascript" src="possibles.js">
	</script>
	</head>
	<body onload="javascript:init();" onbeforeunload="de_activate();">
		<div id="header">
			<h1> YACG </h1>
		</div>
		<div id="form">
			<form id="playerDialog">
				Player Name:<input type="text" name="p1" id="p1" value=""/>
				<span id="submit" onclick="ajaxFunction();return false;">&nbsp</span>
			</form>
		</div>
		<div id="name1" class="nametag hidden"> </div>
		<div id="board" class="hidden">
};
$i = 0;
$stno = 0;
$stat = "black";
my @vals = ("a", "b", "c", "d", "e", "f", "g", "h");
while($i < 64)
{
	$letter = ($i %8);
	$row = int(($i - $letter)/8);
	$id = $vals[$letter].$row;
	print qq{
			<div class="$stat piece" id="$id">
				<span id="img$id" name = "" class="" onclick="decide(this);">&nbsp;</span>
			</div>
	};
	if(($i+1) % 8 == 0)
	{
		print "<br/>";
	}
	else
	{
		if($stno)
		{
			$stat = "black";
		}
		else
		{
			$stat = "white";
		}
		$stno = not $stno;
	}
	$i+=1;
}

print qq{
		</div>
		<div id="black" class="pieces hidden">
		Pieces
		</div>
		<div id="white" class="pieces hidden">
		Pieces
		</div>
		<div id="name2" class="nametag hidden"> </div> 
		<div id="selected" class="hidden">
			Selected Piece
		</div>
		<div id="player" class="hidden">
			White's Turn
		</div>
		<div id="error">
		</div>
		<div id="undo" onclick="undo()">
		</div>
		<div id="quit" onclick="de_activate();return false;">
		</div>
	</body>
</html>
};
