	//now what?
	/*if they enter an orgId (we will get it next class through a search), we need to find:
		-What different areas of information the organization has (/Application/Tabs?orgId=x)
		-then, find each area on demand (each will need it's own call)
			General
				Path: ...ESD/{orgId}/General  (this one we did together!)
			Locations
				Path: ...ESD/{orgId}/Locations
			Treatment
				Path: ...ESD/{orgId}/Treatments
			Training
				Path: ...ESD/{orgId}/Training
			Facilities
				Path: ...ESD/{orgId}/Facilities
			Equipment
				Path: ...ESD/{orgId}/Equipment
			Physicians
				Path: ...ESD/{orgId}/Physicians
			People
				Path: ...ESD/{orgId}/People
	*/

///////////////////////////////////////
//Build the search functionality.
//onload, get the cities for the state.
	$(document).ready(function(){
		ID = "";
		getCities('NY');
		getOrgTypes();
	});

//For now, this will be a select to get the 'tabs' needed for the orgId.
// For the project you will do this with tabs from the jQuery UI.
function getData(id){
//we need to figure out how many 'tabs' or areas of information this type of org has
	$.ajax({
		type:'get',
		async:true,
		url:'proxy.php',
		data:{path:'/Application/Tabs?orgId='+id},
		dataType:'xml',
		success:function(data){
			if($(data).find('error').length!=0){
				//output that server is down/sucks
			}else{
				unhideTabs();
				setWorldOrgId(id);
				getGeneral(id);
			}
		}
	});
}
	// This will be called by the changing of the select to get the general information for orgId
	function getGeneral(id){
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/'+id+'/General'},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
				//do something....
				}else{
//make a table from the XML, the following comments shows what the xml looks like:
//<data>
//<name>Some Hospital</name>
//<description>Something cool here about the hospital</description>
//<email>sf@lkj.sdf</email>
//<website>http://www.rit.edu</website>
//<nummembers>33</nummembers>
//<numcalls>300</numcalls>
//</data>
					var x='<table><tr><td>Name:</td><td>'+$(data).find('name').text()+'</td></tr>';
					x+='<tr><td>Description:</td><td>'+$(data).find('description').text()+'</td></tr>';
					x+='<tr><td>email:</td><td>'+$(data).find('email').text()+'</td></tr>';
					x+='<tr><td>website:</td><td>'+$(data).find('website').text()+'</td></tr>';
					x+='<tr><td>number of members:</td><td>'+$(data).find('nummembers').text()+'</td></tr>';
					x+='<tr><td>number of calls:</td><td>'+$(data).find('numcalls').text()+'</td></tr></table>';

/// this line will change slightly when we add the tabs plugin
					makeTabsInactive();
					$("#genTab").attr('class', 'active');
					$('#info-dump').html(x);
				}
			}
		});
	}

	//Student needs to build these:
	function getLocations(id){
			$.ajax({
  				type: "GET",
  				async: true,
  				cache:false,
  				url: "proxy.php",
  				data: {path: "/" + id + "/Locations"},
  				dataType: "xml",
  				success: function(data, status){
       	 			var x='';
       	 			if($(data).find('error').length != 0){
	       	 			console.log("an error occurred");
       	 			}else {
						var html = "";
						var locations = data.getElementsByTagName("location");
						var count = $(data).find('count').text();
						for(var i =0; i < count; i++){
							html += "<table>";
							html += "<tr><td></td><td></td>";
							html += "<tr><td>Location Number: </td><td>" + (i + 1) + "</td>";
							html += "<tr><td></td><td></td>";
							html += "<tr><td>Address:</td><td>" + $(locations[i]).find('address1').text() + "</td>";
							html += "<tr><td>City:</td><td>" + $(locations[i]).find('city').text() + "</td>";
							html += "<tr><td>State:</td><td>" + $(locations[i]).find('state').text() + "</td>";
							html += "<tr><td>Zip Code:</td><td>" + $(locations[i]).find('zip').text() + "</td>";
							html += "<tr><td>County:</td><td>" + $(locations[i]).find('countyName').text() + "</td>";
							html += "<tr><td>Phone:</td><td>" + $(locations[i]).find('phone').text() + "</td>";
							html += "</table>";
						}

						$('#info-dump').html(html);

					}
		   		}
			});
	}
	function getTraining(id){
			$.ajax({
  				type: "GET",
  				async: true,
  				cache:false,
  				url: "proxy.php",
  				data: {path: "/" + id + "/Training"},
  				dataType: "xml",
  				success: function(data, status){
       	 			var x='';
       	 			if($(data).find('error').length != 0){
	       	 			console.log("an error occurred");
       	 			}else {
						var html = "";
						var trainings = data.getElementsByTagName("training");
						console.log(data);
						var x = $(data).find('count').text();
						if(x ==0){
							html += "There are currently know types of training offered at the selected location.";

						}
						else{
							html += "The following types of training are offered at the selected location:";

						}
						for(var i =0; i < x; i++){

							html += "<table>";
							html += "<tr><td>Type:</td><td>" + $(trainings[i]).find('abbreviation').text()+ " also known as " + $(trainings[i]).find('type') + "</td>";
							html += "</table>";

						}

						$('#info-dump').html(html);

					}
		   		}
			});
	}
	function getTreatment(id){
		$.ajax({
				type: "GET",
				async: true,
				cache:false,
				url: "proxy.php",
				data: {path: "/" + id + "/Treatments"},
				dataType: "xml",
				success: function(data, status){
						var x='';
						if($(data).find('error').length != 0){
							console.log("an error occurred");
						}else {
					var html = "";
					var treatments = data.getElementsByTagName("treatment");
					var x = $(data).find('count').text();
					if(x ==0){
						html += "There are currently know types of treatments offered at the selected location.";
					}
					else{
						html += "The following types of treatments are offered at the selected location:";
					}
					for(var i = 0; i < x; i++){
						html += "<table>";
						html += "<tr><td>Type:</td><td>" + $(treatments[i]).find('abbreviation').text()+ " also known as " + $(treatments[i]).find('type') + "</td>";
						html += "</table>";
					}
					$('#info-dump').html(html);

				}
				}
		});
	}
	function getFacilities(id){
		$.ajax({
				type: "GET",
				async: true,
				cache:false,
				url: "proxy.php",
				data: {path: "/" + id + "/Facilities"},
				dataType: "xml",
				success: function(data, status){
						var x='';
						if($(data).find('error').length != 0){
							console.log("an error occurred");
						}else {
					var html = "";
					var facilities = data.getElementsByTagName("facility");
					var x = $(data).find('count').text();
					console.log(data);
					if(x == 0){
						html += "There are currently no facilities at the selected location.";
					}
					else{
						html += "The following types of facilities are located at the selected location:";
					}
					for(var i = 0; i < x; i++){
						html += "<table>";
						html += "<tr><td>Type:</td><td>" + $(facilities[i]).find('type').text() +"</td>";
						html += "<tr><td>Quantity:</td><td>" + $(facilities[i]).find('quantity').text() +"</td>";
						html += "<tr><td>Description:</td><td>" + $(facilities[i]).find('description').text() +"</td>";
						html += "</table>";
					}
					$('#info-dump').html(html);

				}
				}
		});
	}
	function getEquipment(id){
		$.ajax({
				type: "GET",
				async: true,
				cache:false,
				url: "proxy.php",
				data: {path: "/" + id + "/Equipment"},
				dataType: "xml",
				success: function(data, status){
						var x='';
						if($(data).find('error').length != 0){
							console.log("an error occurred");
						}else {
					var html = "";
					var equips = data.getElementsByTagName("equipment");
					var x = $(data).find('count').text();
					console.log(data);
					if(x == 0){
						html += "There is currently no equipment at the selected location.";
					}
					else{
						html += "The following types of equipment are located at the selected location:";
					}
					for(var i = 0; i < x; i++){
						html += "<table>";
						html += "<tr><td>Type: </td><td>"+ $(equips[i]).find('type').text() +"</td></tr>";
						html += "<tr><td>Quantity: </td><td>"+ $(equips[i]).find('quantity').text() +"</td></tr>";
						html += "<tr><td>Description: </td><td>"+ $(equips[i]).find('description').text() +"</td></tr>";
						html += "</table>";
					}
					$('#info-dump').html(html);

				}
				}
		});
	}
	function getPhysicians(id){
		$.ajax({
				type: "GET",
				async: true,
				cache:false,
				url: "proxy.php",
				data: {path: "/" + id + "/Equipment"},
				dataType: "xml",
				success: function(data, status){
						var x='';
						if($(data).find('error').length != 0){
							console.log("an error occurred");
						}else {
					var html = "";
					var equips = data.getElementsByTagName("equipment");
					var x = $(data).find('count').text();
					console.log(data);
					if(x == 0){
						html += "There are currently no physicians at the selected location.";
					}
					else{
						html += "The following physicians are located at the selected location:";
					}
					for(var i = 0; i < x; i++){
						html += "<table style='width:100%'>";
						html += "<tr><td>Type: </td><td>"+ $(equips[i]).find('type').text() +"</td></tr>";
						html += "<tr><td>Quantity: </td><td>"+ $(equips[i]).find('quantity').text() +"</td></tr>";
						html += "<tr><td>Description: </td><td>"+ $(equips[i]).find('description').text() +"</td></tr>";
						html += "</table>";
					}
					$('#info-dump').html(html);

				}
				}
		});
	}
	function getPeople(id){
		$('#info-dump').html('going to get People of '+id);
	}

	//This function is called when user changes the state select (and onload)
    function getCities(which){
    		if(which == ''){
    			$('#orgCitySearch').html('City/Town<input id="cityTown" type="text"/>');
    		}else{
    		$.ajax({
  				type: "GET",
  				async: true,
  				cache:false,
  				url: "proxy.php",
  				data: {path: "/Cities?state="+which},
  				dataType: "xml",
  				success: function(data, status){
       	 			var x='';
       	 			if($(data).find('error').length != 0){
	       	 			//do nothing?
       	 			}else if($(data).find('row').length==0 && which != ''){
       	 				$('#orgCitySearch').html('City/Town<input id="cityTown" type="text" value="No cities/Towns in "'+which+'"/>');
       	 			}else{
       	 				x+='<select id="cityTown" name="town"><option value="">--cities--<\/option>';
       	 				$('row',data).each(
       	 					function(){
       	 						x+='<option value="'+$(this).find('city').text()+'">'+$(this).find('city').text()+'<\/option>';
       	 					}
       	 				);
       	 				x+="<\/select>";
       	 				$('#orgCitySearch').html(x);
       	 			}
		   		}
			});
			}
    	}

//Because the orgTypes could change we load them 'fresh' every time.
	//In reality you should load these in PHP on the server end (saves a round trip)
	//but since this is client...
	function getOrgTypes(){
    		$.ajax({
  				type: "GET",
  				async: true,
  				cache:false,
  				url: "proxy.php",
  				data: {path: "/OrgTypes"},
  				dataType: "xml",
  				success: function(data, status){
       	 			var x='';
       	 			if($(data).find('error').length != 0){
	       	 			//do nothing?
       	 			}else{
       	 				x+='<option value="">All Organization Types<\/option>';
       	 				$('row',data).each(
       	 					function(){
       	 						x+='<option value="'+$(this).find('type').text()+'">'+$(this).find('type').text()+'<\/option>';
       	 					}
       	 				);
       	 				//return x;
       	 				$("#orgType").html(x);
       	 			}
		   		}
			});
    	}

	//Do a search.
	//so when an org is clicked it will create the select and getGeneral().
	function checkSearch(){
			$.ajax({
  				type: "GET",
  				async: true,
  				cache:false,
  				url: "proxy.php",
  				data: {path: "/Organizations?"+$('#Form1').serialize()},
  				dataType: "xml",
  				success: function(data, status){
  					var x='';
       	 			$('#tabelOutput').html('');
       	 			if($(data).find('error').length != 0){
	       	 			$('error', data).each(
    	   	 				function(){
       		 				x+="error getting data";
       	 					}
       	 				);
       	 			}else if($(data).find('row').length==0){
       	 				x+="No data matches for: "+$('#orgType').val() + (($('#orgName').val()!='')?" > name: "+$('#orgName').val():"") + (($('#state').val()!='')?" > State: "+$('state').val():"");
       	 				if($('#cityTown').val()=='' || $('#cityTown').val().search(/No cities/)==0){
       	 					x+="";
       	 				}else{
       	 					x+=" > City: "+$('#cityTown').val();
       	 				}
       	 			/**********/
       	 			//This is for a Physician - it will be different data coming back
       	 			}else if($("#orgType").val() == "Physician"){
       	 				$("#resultsTitle").html(' ('+$(data).find('row').length+' total found)');
       	 				// build a table of Physician information
					/**********/
       	 			}else{
       	 				$("#resultsTitle").html(' ('+$(data).find('row').length+' total found)');
       	 				x+="<div><table id=\"myTable\" class=\"tablesorter\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\"><thead><tr><th class=\"header\" style=\"width:90px;\">Type<\/th><th class=\"header\">Name<\/th><th class=\"header\">City<\/th><th class=\"header\">Zip<\/th><th class=\"header\" style=\"width:70px;\">County<\/th><th class=\"header\" style=\"width:40px;\">State<\/th><\/tr><\/thead>";
       	 				$('row',data).each(
       	 					function(){
       	 						x+='<tr class="searchRow">';
       							x+="<td>"+$(this).find('type').text()+"<\/td>";
        						//x+="<td style=\"cursor:pointer;color:#987;\" onclick=\"getData("+$(this).find('OrganizationID').text()+");\">"+$(this).find('Name').text()+"<\/td>";
        						x+="<td style=\"cursor:pointer;color:#987;\" onclick=\"getData("+$(this).find('OrganizationID').text()+");\">"+$(this).find('Name').text()+"<\/td>";
       	 						x+="<td>"+$(this).find('city').text()+"<\/td>";
       	 						x+="<td>"+$(this).find('zip').text()+"<\/td>";
       	 						x+="<td>"+$(this).find('CountyName').text()+"<\/td>";
       	 						x+="<td>"+$(this).find('State').text()+"<\/td><\/tr>";
       	 					}
       	 				);
       	 				x+="<\/table>";
       	 			}
		     		$('#tabelOutput').html(x);
		   		}
			});
		}

	//Occasionally we will get back 'null' as a value
	//you should NEVER show 'null' in the client - make it blank...
	function myFind(what,data,i){
		if(i!=-1){
			return (($(data).find(what).eq(i).text()!='null')?$(data).find(what).eq(i).text()+' ':'')
		}else{
			return (($(data).find(what).text()!='null')?$(data).find(what).text()+' ':'')
		}
	}
