var move = new Array();
var current = 0;
function kasparov_topalov()
{
	move=[ "e6-e4",
		"d1-d2",
		"d6-d4",
		"g0-f2",
		"b7-c5",
		"g1-g2",
		"c7-e5",
		"f0-g1",
		"d7-d6",
		"c1-c2",
		"f6-f5",
		"b1-b3",
		"g7-e6",
		"b0-d1",
		"e5-h2",
		"g1-h2",
		"d6-h2",
		"c0-b1",
		"a6-a5",
		"e1-e3",
		"e7-c7",
		"a7-d7",
		"d0-e1",
		"c7-b7",
		"a1-a2",
		"e6-c7",
		"e0-c0",
		"a0-d0",
		"c7-b5",
		"e3-d4",
		"d7-d4",
		"c2-c3",
		"d4-d7",
		"d1-b2",
		"g6-g5",
		"c0-b0",
		"b5-a3",
		"b1-a0",
		"f7-h5",
		"d1-d3",
		"h2-f4",
		"b0-a1",
		"h7-e7",
		"d3-d4",
		"c5-d3",
		"b2-d3",
		"e4-d3",
		"e1-d2",
		"d7-d4",
		"c3-d4",
		"e7-e1",
		"a1-b2",
		"f4-d4",
		"b2-a3",
		"b6-b4"];
}

function next_move()
{
	if(current == move.length)
	{
		current = 0
		do_error("Finished");
	}
	else
	{
		var ids = move[current++].split("-");
		move_literal(ids[0], ids[1]);
	}
}
