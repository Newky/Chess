var movements = new Array(64);
var pieces = new Array();

pieces = ["pawn", "rook", "knight", "bishop", "queen", "king"];

function allowed_movements(obj, next_obj)
{
	if(color(next_obj) == color(obj))
		return 0;
	if(piece_determine(obj) == "pawn")
		return allowed_movements_pawn(obj, next_obj);
	else if(piece_determine(obj) == "rook")
		return allowed_movements_rook(obj, next_obj);
	else if(piece_determine(obj) == "king")
		return allowed_movements_king(obj, next_obj);
	else if(piece_determine(obj) == "knight")
		return allowed_movements_knight(obj, next_obj);
	else if(piece_determine(obj) == "bishop")
		return allowed_movements_bishop(obj, next_obj);
	else if(piece_determine(obj) == "queen")
		return allowed_movements_queen(obj, next_obj);
	return 1;
}

function allowed_movements_queen(obj, next_obj)
{
	if(! allowed_movements_rook(obj, next_obj) && ! allowed_movements_bishop(obj, next_obj))
		return 0;
	return 1;
}
function allowed_movements_king(obj, next_obj)
{
	pos = obj.parentNode.id;
	gridletter = pos[0];
	gridnum = pos[1];
	letterindex = letter_index(gridletter);
	new_pos = next_obj.parentNode.id;
	new_gridletter = new_pos[0];
	new_gridnum = new_pos[1];
	new_letterindex = letter_index(new_gridletter);
	//Up/Down
	if(gridletter == new_gridletter)
	{
		if(abs(gridnum - new_gridnum) == 1)
				return 1;
	}
	//Across
	else if(gridnum == new_gridnum)
	{
		if(abs(letterindex - new_letterindex) == 1)
				return 1;
	}
	//Diag
	else if(abs(gridnum-new_gridnum) == 1)
		if(abs(letterindex - new_letterindex) == 1)
			return 1;
	//Castling
	if(gridnum == new_gridnum)
	{
		if(abs(letterindex - new_letterindex) == 2)
		{
			castling = 1;
			return 1;
		}
	}
	return 0;
}

function allowed_movements_bishop(obj, next_obj)
{
	pos = obj.parentNode.id;
	gridletter = pos[0];
	gridnum = pos[1];
	letterindex = letter_index(gridletter);
	new_pos = next_obj.parentNode.id;
	new_gridletter = new_pos[0];
	new_gridnum = new_pos[1];
	new_letterindex = letter_index(new_gridletter);
	if(abs(new_letterindex - letterindex) == abs(gridnum - new_gridnum))
	{
		if(new_letterindex > letterindex)
				letterindex++;
			else if(new_letterindex < letterindex)
				letterindex--;
			if(new_gridnum > gridnum)
				gridnum++;
			else if(new_gridnum < gridnum)
				gridnum--;
		while(new_letterindex != letterindex && new_gridnum != gridnum)
		{
			if(objfound(document.getElementById("img"+lets[letterindex]+gridnum)))
				return 0;
			if(new_letterindex > letterindex)
				letterindex++;
			else if(new_letterindex < letterindex)
				letterindex--;
			if(new_gridnum > gridnum)
				gridnum++;
			else if(new_gridnum < gridnum)
				gridnum--;
		}
		return 1;
	}
	return 0;
}

function allowed_movements_knight(obj, next_obj)
{
	pos = obj.parentNode.id;
	gridletter = pos[0];
	gridnum = pos[1];
	letterindex = letter_index(gridletter);
	new_pos = next_obj.parentNode.id;
	new_gridletter = new_pos[0];
	new_gridnum = new_pos[1];
	new_letterindex = letter_index(new_gridletter);
	if(abs((letterindex - new_letterindex)) == 2)
		if(abs(gridnum - new_gridnum) == 1)
			return 1;
	if(abs(gridnum - new_gridnum) == 2)
		if(abs((letterindex - new_letterindex)) == 1)
			return 1;
	return 0;

}

function allowed_movements_rook(obj, next_obj)
{
	pos = obj.parentNode.id;
	gridletter = pos[0];
	gridnum = pos[1];
	letterindex = letter_index(gridletter);
	new_pos = next_obj.parentNode.id;
	new_gridletter = new_pos[0];
	new_gridnum = new_pos[1];
	if(new_gridnum != gridnum && new_gridletter != gridletter)
		return 0;
	/*if(color(obj) == color(next_obj))*/
	/*return 0;*/
	//ACROSS
	if(new_gridnum == gridnum)
	{
		newletterindex = letter_index(new_gridletter);
		if(newletterindex > letterindex)
			letterindex++;
		else
			letterindex--;
		while(newletterindex != letterindex)
		{
			if(objfound(document.getElementById("img"+lets[letterindex]+""+gridnum)))
				return 0;
			if(newletterindex > letterindex)
				letterindex++;
			else
				letterindex--;
		}
		return 1;
	}
	/*//UP*/
	else if(new_gridletter == gridletter)
	{
		if(new_gridnum > gridnum)
			gridnum ++;
		else
			gridnum --;
		while(new_gridnum != gridnum)
		{
			if(objfound(document.getElementById("img"+lets[letterindex]+""+gridnum)))
				return 0;
			if(new_gridnum > gridnum)
				gridnum ++;
			else
				gridnum --;
		}
		return 1;
	}
	return 1;
}

function abs(num)
{
	if(num < 0)
		return (num * -1);
	else
		return num;
}

function objfound(obj)
{
	if(obj.className == "")
		return 0;
	else
		return 1;
}

function allowed_movements_pawn(obj, next_obj)
{
	pos = obj.parentNode.id;
	gridletter = pos[0];
	gridnum = pos[1];
	letterindex = letter_index(gridletter);
	var direction = -1;
	//white
	if(color(obj))
		direction =1;
	//Not the start
	if(obj.className.indexOf("start") != -1)
	{
		desired_grid = parseInt(gridnum) + (2*direction);
		if(!attempt)
			obj.className = obj.className.substring(obj.className.indexOf("start")+5, obj.className.length);
		if(next_obj.parentNode.id == gridletter+""+desired_grid)
			return 1;
	}
	desired_grid = parseInt(gridnum) + (1*direction);
	if(next_obj.parentNode.id == gridletter+""+desired_grid)
	{
		if(next_obj.className == "")
			return 1;
		else
			return 0;
	}
	else if(next_obj.className == "")
		return 0;
	else if(next_obj.parentNode.id == lets[letterindex+1]+""+desired_grid)
		return 1;
	else if(next_obj.parentNode.id == lets[letterindex-1]+""+desired_grid)
		return 1;
	return 0;
}

//Horribly Hard-Coded... YUCK
function move_rook()
{
	if(player == 0)
	{
		move_literal("h7", "f7");
	}
	else
	{
		move_literal("h0", "f0");
	}
	castling = 0;
}

function move_literal(id, id2)
{
	var obj1 = document.getElementById("img"+id);
	var obj2 = document.getElementById("img"+id2);
	var temp = obj1.cloneNode(false);
	obj1.className = obj2.className;
	obj2.className = temp.className;
}

function color(obj)
{
	if(obj.className.indexOf("black") != -1)
		return 1;
	else if(obj.className.indexOf("white") != -1)
		return 0;
	else
		return -1;
}

function piece_determine(obj)
{
	var i =0;
	for(;i<6;i++)
		if(obj.className.indexOf(pieces[i]) != -1)
			return pieces[i];
	return "";
}

function letter_index(let)
{
	var i =0;
	for(;i<8;i++)
		if(lets[i] == let)
			return i;
}
