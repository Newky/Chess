var pieces = new Array();
var lets = new Array();
var attempt = 0;
var moves = new Array();
var pieces_taken = new Array();
lets = ["a", "b", "c", "d", "e", "f", "g", "h"];
var authority = 0;
var player = 0;
var clicked_piece=0;
var clicked_status = 0;
var castling = 0;
var user;
var opponent;
var last_move;

function init()
{
	//Lets Do Pawns
	var i =0;
	for(;i<8;i++)
	{
		obj = document.getElementById("img"+lets[i]+"1");
		obj.className = "start black pawn";
		obj = document.getElementById("img"+lets[i]+"6");
		obj.className = "start white pawn";
	}
	//Lets Do ROOKS
	place("rook", 0, 7);
	place("knight", 1, 5);
	place("bishop", 2, 3);
	place("queen", 3, 8);
	place("king", 4, 8);
}

function place(piece, start, end)
{
	var i = start;
	for(;i<8;i=i+end)
	{
		obj = document.getElementById("img"+lets[i]+"0");
		obj.className = "black "+piece;
		/*obj.style.background = "url(images/pieces/black_"+piece+".png)"*/
		obj = document.getElementById("img"+lets[i]+"7");
		obj.className = "white "+piece;
		/*obj.style.background = "url(images/pieces/white_"+piece+".png)"*/
	}
}

function move(obj)
{
		if(checkValid(obj) && authority == 1)
		{
			do_error("");
			clicked_piece = obj;
			setSelection(obj.className);
		}
		else
		{
			do_error("Incorrect Piece");
			clicked_status= ! clicked_status;
		}
}

function do_error(msg)
{
	document.getElementById("error").innerHTML = msg;
}

function here(obj)
{
	if(obj != clicked_piece && clicked_piece != 0)
	{
			var other_piece = objfound(obj);
			var taken_classname;
			if(other_piece)
				taken_classname = obj.className;
			saved_node = clicked_piece.cloneNode(false);
			if(allowed_movements(clicked_piece, obj))
			{
				obj.className = clicked_piece.className;
				clicked_piece.className = "";
				if(checkCheck(!player))
				{
					do_error("Moving into Check");
					reset_piece(saved_node, obj);
				}
				else
				{
					if(checkCheck(player))
						do_error("CHECK!!!");
					if(castling == 1)
					{
						move_rook();
					}
					if(player == play_color)
					{
						setTimeout("checkMove()", 17000);
						send_to_database(obj.id);
						authority =0;
					}
					add_history(clicked_piece.id, obj.id);
					if(other_piece)
						taken(taken_classname);
					changePlayerStatus();
					clearSelection();
				}
			}
			else
			{
				reset_piece(saved_node, 0);
				do_error("Invalid Move");
			}
	}
	else
	{
		clearSelection();
	}
}

function add_history(id1, id2)
{
	id1= id1.substring(3);
	id2= id2.substring(3);
	var item = id1+":"+id2;
	moves.push(item);
}

function undo()
{
	var num = moves.length;
	var item = moves.pop()
	if(typeof(item) != "undefined")
	{
		var ids = item.split(":");
		move_literal(ids[1], ids[0]);
		var piece = check_taken(num);
		if(piece != "")
		{
			document.getElementById("img"+ids[1]).className = piece;
			modify_piece_board(piece);
		}
		changePlayerStatus();
	}
	else
	{
		do_error("No more moves in history");
	}
}

function reset_piece(save, del)
{

	clicked_piece.className=save.className;
	if(del != 0)
	{
		del.className = "";
	}
}

function clearSelection()
{
	obj = document.getElementById("selected");
	obj.innerHTML = "Selected Piece:None";
}

function setSelection(str)
{
	obj2 = document.getElementById("selected");
	obj2.innerHTML = "Selected Piece: "+str;
}

function checkCheck(piece_color)
{
	var pieces = document.getElementsByTagName("span");
	var i = 0;
	var king;
	for(;i<pieces.length;i++)
	{
		if(color(pieces[i]) != piece_color)
		{
			if(piece_determine(pieces[i]) == "king")
				king = pieces[i];
		}
	}
	i=0;
	attempt = 1;
	for(;i<pieces.length;i++)
	{
		if(color(pieces[i]) == piece_color)
		{
			if(allowed_movements(pieces[i], king))
			{
				return 1;
			}
		}
	}
	attempt = 0;
	return 0;
}

function checkValid(obj)
{
	//Whites Turn
	if(player == 0)
	{
		if(obj.className.indexOf("white") == -1)
			return 0;
		return 1;
	}
	else
	{
		if(obj.className.indexOf("black") == -1)
			return 0;
		return 1;
	}
}

function changePlayerStatus()
{
	if(player)
		document.getElementById("player").innerHTML = "White's Turn";
	else
		document.getElementById("player").innerHTML = "Black's Turn";
	player = !player;
}

function decide(obj)
{
	if(clicked_status==0)
	{
		move(obj);
	}
	else
	{
		here(obj);
	}
	clicked_status= ! clicked_status;
}

function taken(classname)
{
	var obj;
	var item = moves.length + ":" + classname;
	pieces_taken.push(item);
	if(player == 0)
	{
		obj = document.getElementById("black");
	}
	else
	{
		obj = document.getElementById("white");
	}
	var taken_pieces = obj.childNodes;
	var i =0;
	for(;i<taken_pieces.length;i++)
	{
		if(taken_pieces[i].nodeName== "SPAN")
		{
			if(classname.indexOf(piece_determine(taken_pieces[i])) != -1)
			{
				var num = parseInt(taken_pieces[i].innerText) + 1;
				taken_pieces[i].innerText = "" + (num);
				break;
			}
		}
	}
	if(i == taken_pieces.length)
	{
		var child = document.createElement('span');
		child.setAttribute("class", classname+" taken");
		child.innerText= "1";
		obj.appendChild(child);
	}
}

function modify_piece_board(classname)
{
	var obj;
	if(player == 1)
	{
		obj = document.getElementById("black");
	}
	else
	{
		obj = document.getElementById("white");
	}
	var i=0;
	var el;
	var taken_pieces = obj.childNodes;
	for(;i<taken_pieces.length;i++)
	{
		if(taken_pieces[i].nodeName== "SPAN")
		{
			if(classname.indexOf(piece_determine(taken_pieces[i])) != -1)
			{
				el = taken_pieces[i];
				break;
			}
		}
	}
	if(el)
	{
		var num = parseInt(el.innerText);
		if(num > 1)
		{
			num --;
			el.innerText = num;
		}
		else
		{
			el.parentNode.removeChild(el);
		}
	}
}

function check_taken(num)
{
	var item = pieces_taken.pop();
	var parts = item.split(":");
	if(parseInt(parts[0])== num)
	{
		return parts[1];
	}
	else
	{
		pieces_taken.push(item);
		return "";
	}
}

