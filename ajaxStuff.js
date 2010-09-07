var play_color;
var time_out_handle;
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

function activate_player(check)
{
	user = document.getElementById("p1").value;
	var ajaxRequest = getHandle();
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4)
		{
			if(ajaxRequest.status == 200)
			{
				op_list = ajaxRequest.responseText;
				if(op_list.indexOf("sorted:") != -1)
				{
					op_list = op_list.replace("sorted:", "");
					fill_names(op_list, 1);
				}
				else if(op_list != "")
				{
					var ops = op_list.split("-");
					var sel_obj = document.getElementById("opponents");
					if(sel_obj.options.length >0)
					{
						sel_obj.innerHTML = "";
					}
					for(var i=0;i<ops.length;i++)
					{
						if(ops[i] != "")
						{
							var option = document.createElement('option');
							option.text = ops[i];
							option.value = ops[i];
							try{
								sel_obj.add(option, null);
							}catch(e){
								sel_obj.add(option);
							}
						}
					}
					sel_obj.size = ""+sel_obj.length+1;
					sel_obj.parentNode.className = "";
					do_error("");
					time_out_handle = setTimeout("activate_player(1)", 10000);
				}
				else
				{
					do_error("No Opponents At This Time");
					time_out_handle = setTimeout("activate_player(1)", 10000);
				}
			}
		}
	}
	ajaxRequest.open("GET","active_new.php?name="+escape(user)+"&mode="+escape(check),true);
	ajaxRequest.send(null);
}

function select_opponent()
{
	clearTimeout(time_out_handle);
	var sel_obj = document.getElementById("opponents");
	var op_name = sel_obj.options[sel_obj.selectedIndex].value;
	var ajaxRequest = getHandle();
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4)
		{
			if(ajaxRequest.status == 200)
			{
				fill_names(op_name, 0);
			}
		}
	}
	ajaxRequest.open("GET","opponent.php?name="+escape(user)+"&op="+escape(op_name),true);
	ajaxRequest.send(null);
}

function fill_names(opp, pos)
{
	var sel_obj = document.getElementById("opp");
	document.body.removeChild(sel_obj);
	opponent = opp;
	if(!pos){
		play_color =1;
		document.getElementById("name1").innerHTML = user;
		document.getElementById("name2").innerHTML = opp;
		checkMove();
	}
	else{
		play_color = 0;
		authority = 1;
		document.getElementById("name1").innerHTML = opp;
		document.getElementById("name2").innerHTML = user;
	}
	clear_hidden();
}

function ajaxFunction(){
	activate_player(0);
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
				//Get the other persons move and execute it
				if(last_move != response)
				{
					do_error("");
					last_move = response;
					var parts = response.split("-");
					var obj1 = document.getElementById(parts[0]);
					var obj2 = document.getElementById(parts[1]);
					authority=1;
					decide(obj1);
					decide(obj2);
				}
			}
		}
	}
	ajaxRequest.open("GET","move.php?move="+escape("none")+"&name="+escape(opponent)+"&las_move="+escape(last_move),true);
	ajaxRequest.send(null);
}

function send_to_database(secid)
{
	var ajaxRequest = getHandle();
	var comm_str = clicked_piece.id + "-"+secid;
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4)
			if(ajaxRequest.status == 200)
				if(ajaxRequest.responseText == "ACK")
					checkMove();
	}
	ajaxRequest.open("GET","move.php?move="+escape(comm_str)+"&name="+escape(user),true);
	ajaxRequest.send(null);
}

function de_activate()
{
	var ajaxRequest = getHandle();
	ajaxRequest.open("GET","quit.php?name="+escape(user),true);
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

