var play_color;
function getHandle()
{
	var ajaxRequest;
	try{
		ajaxRequest = new XMLHttpRequest();
	}catch (e){
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e)
		{
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e){
				alert("Your Browser Broke!");
				return false;
			}
		}
	}
	return ajaxRequest;
}
function ajaxFunction(){
	var ajaxRequest = getHandle();
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4)
		{
			if(ajaxRequest.status == 200)
			{
				clear_hidden();
				//Response is complet
				opponent= ajaxRequest.responseText;
				if(opponent != "")
				{
					play_color= 0;
					authority=1;
					document.getElementById("name1").innerHTML = opponent;
					document.getElementById("name2").innerHTML = user;
				}
				else
				{
					play_color =1;
					document.getElementById("name1").innerHTML = user;
					document.getElementById("name2").innerHTML = "pending";
					setTimeout('checkOpponent();', 15000);
				}

			}
			else
			{
				alert(""+ajaxRequest.status);
			}
		}
	}
	user = document.getElementById("p1").value;
	if(user == "" ) return;
	ajaxRequest.open("GET","active.php?name1="+escape(user),true);
	ajaxRequest.send(null);
}

function checkOpponent()
{
	do_error("Checking for opponent");
	var ajaxRequest = getHandle();
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4)
		{
			if(ajaxRequest.status == 200)
			{
				var response =ajaxRequest.responseText;
				if(response != "")
				{
					opponent = response;
					document.getElementById("name2").innerHTML = opponent;
					do_error("");
					setTimeout("checkMove()", 15000);
				}
				else
				{
					setTimeout('checkOpponent();', 15000);
				}
			}
		}
	}
	ajaxRequest.open("GET","connected.php?name1="+escape(user),true);
	ajaxRequest.send(null);
}

function checkMove()
{
	var ajaxRequest = getHandle();
	do_error("Checking For Move");
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4)
		{
			if(ajaxRequest.status == 200)
			{
				var response =ajaxRequest.responseText;
				if(response != "none")
				{
					do_error("");
					//Get the other persons move and execute it
					if(last_move != response)
					{
						last_move = response;
						var parts = response.split("-");
						var obj1 = document.getElementById(parts[0]);
						var obj2 = document.getElementById(parts[1]);
						authority=1;
						decide(obj1);
						decide(obj2);
					}
					else
					{
						setTimeout("checkMove()", 15000);
						do_error("");
					}
				}
				else
				{
					setTimeout("checkMove()", 15000);
					do_error("");
				}
			}
		}
	}
	ajaxRequest.open("GET","move.php?move="+escape("none")+"&name="+escape(opponent),true);
	ajaxRequest.send(null);
}

function send_to_database(secid)
{
	var ajaxRequest = getHandle();
	var comm_str = clicked_piece.id + "-"+secid;
	ajaxRequest.open("GET","move.php?move="+escape(comm_str)+"&name="+escape(user),true);
	ajaxRequest.send(null);
}

function de_activate()
{
	var ajaxRequest = getHandle();
	ajaxRequest.open("GET","quit.php?name1="+escape(user),true);
	ajaxRequest.send(null);
	window.location = "thanks.html";
}

function clear_hidden()
{
	var els = document.getElementsByTagName("div");
	var i = 0;
	for (;i<els.length;i++)
	{
		var el = els[i];
		if(el.className.indexOf("hidden")!= -1)
			el.className = el.className.substring(0, el.className.indexOf("hidden"));
	}
	var formdiv = document.getElementById("form");
	formdiv.className += " hidden";
}

