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
				window.scrollTo(0,0);
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
					var html = "<p>something broke</p>";
					$('#info-dump').html(html);
				}else{
					var html = "<div class='accordion'>"
					html += "<h1 class='accordion-h1'>General Information</h1>";
					html += "<div>";

					html +='<p>Name: '+$(data).find('name').text()+'</p>';
					html +='<p>Description: '+$(data).find('description').text()+'</p>';
					html +='<p>Email: '+$(data).find('email').text()+'</p>';
					html +='<p>Website: '+$(data).find('website').text()+'</p>';
					html +='<p>Number of Member: '+$(data).find('nummembers').text()+'</p>';
					html +='<p>Number of Calls: '+$(data).find('numcalls').text()+'</p>';
					html += "</div>"

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

						html += "<div class='accordion'>"
								html += "<h1 class='accordion-h1'>" + $(locations[0]).find('address1').text() + "</h1>";
								html += "<div>";
								html += "<p>Type: " +  $(locations[0]).find('type').text() + "</p>";
								html += "<p>Address One: " +  $(locations[0]).find('address1').text() + "</p>";
								html += "<p>City: " +  $(locations[0]).find('city').text() + "," + $(locations[0]).find('state').text() + "</p>";
								html += "<p>Zip: " +  $(locations[0]).find('zip').text() + "</p>";
								html += "<p>Phone: " +  $(locations[0]).find('phone').text() + "</p>";
								var addressSplit = $(locations[0]).find('address1').text().split(" ");
								var APIDestiantion = "";
								for(var i = 0; i < addressSplit.length; i++){
									APIDestiantion += addressSplit[i] + "+";
									APIDestiantion += $(locations[0]).find('city').text() + "+";
									APIDestiantion += $(locations[0]).find('state').text();
								}

								html += '<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC4I-gsw1gWKhOtg9O410xHHCxlOWm7rMw&q='+APIDestiantion+'"&zoom=18 allowfullscreen></iframe>'
								html += "</div>";

						html += "</div>"

						$('#info-dump').html(html);
						$(".accordion").accordion();

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
						html += "<div class='accordion'>";
						for(var i =0; i < x; i++){
							html += "<h1 class='accordion-h1'>" + $(trainings[i]).find('abbreviation').text() + "</h1>"
							html += "<div>"
							html += "<p>Other information: "+$(trainings[i]).find('type').text()+"</p>"
							html += "</div>"

						}
						html += "</div>"

						$('#info-dump').html(html);
						$(".accordion").accordion();

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
					if(x == 0){
						html += "There are currently know types of treatments offered at the selected location.";
					}
					else{
						html += "The following types of treatments are offered at the selected location:";
					}
					html += "<div class='accordion'>"
					for(var i = 0; i < x; i++){
						console.log($(treatments[i]).find('type').text())
						html += "<h1 class='accordion-h1'>" +  $(treatments[i]).find('abbreviation').text() + "</h1>"
						html += "<div>"
						html += "<p>" + $(treatments[i]).find('type').text() + "</p>";
						html += "</div>"
					}
					html += "</div>"

					$('#info-dump').html(html);
					$(".accordion").accordion();

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
					html += "<div class='accordion'>";
					for(var i = 0; i < x; i++){
						html += "<h1 class='accordion-h1'>" + $(facilities[i]).find('type').text() + "</h1>";
						html += "<div>";
						html += "<p>Quantity: "+ $(facilities[i]).find('quantity').text() +"</p>";
						html += "<p>Description: "+ $(facilities[i]).find('description').text() +"</p>";

						html += "</div>";

					}
					html += "</div>";
					$('#info-dump').html(html);
					$(".accordion").accordion();

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
					html += "<div class='accordion'>"
					for(var i = 0; i < x; i++){
						html += "<h1 class='accordion-h1'>" + $(equips[i]).find('type').text() + "</h1>" ;
						html += "<div>";
						if($(equips[i]).find('quantity').text() != 'null'){
							html += "<p>Quantity: " + $(equips[i]).find('quantity').text() + "</p>";
						}
						else {
							html += "<p>Quantity: None available.</p>";
						}


						if($(equips[i]).find('description').text() != 'null'){
							html += "<p>Description: " + $(equips[i]).find('description').text() + "</p>";
						}
						else {
							html += "<p>Description: None available.</p>";
						}
						html += "</div>";

					}
					html += "</div>";
					$('#info-dump').html(html);
					$(".accordion").accordion();

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
				data: {path: "/" + id + "/Physicians"},
				dataType: "xml",
				success: function(data, status){
						var x='';
						if($(data).find('error').length != 0){
							console.log("an error occurred");
						}else {
					var html = "";
					var physicians = data.getElementsByTagName("physician");
					var x = $(data).find('count').text();
					console.log(data);
					if(x == 0){
						html += "There are currently no physicians at the selected location.";
					}
					else{
						html += "The following physicians are located at the selected location:";
					}
					html+= "<div class='accordion'>"
						for(var i = 0; i < x; i++){
							html += "<h1 class='accordion-h1'>" + $(physicians[i]).find('fName').text() + " " + $(physicians[i]).find('mName').text() +  " " + $(physicians[i]).find('fName').text() + "</h1>" ;
							html += "<div>";
							html += "<p>Phone: "+ $(physicians[i]).find('phone').text() +"</p>";
							html += "<p>License: "+ $(physicians[i]).find('license').text() +"</p>";
							html += "</div>";
						}
						html += "</div>";
						$('#info-dump').html(html);
						$(".accordion").accordion();


					}
				}

		});
	}
	function getPeople(id){
		$.ajax({
				type: "GET",
				async: true,
				cache:false,
				url: "proxy.php",
				data: {path: "/" + id + "/People"},
				dataType: "xml",
				success: function(data, status){
						var x='';
						if($(data).find('error').length != 0){
							console.log("an error occurred");
						}else {
					var html = "";
					var sites = data.getElementsByTagName("site");
					var siteCount = $(data).find('siteCount').text();
					console.log(data);
					if(sites == 0){
						html += "There are currently no people at the selected location.";
					}
					else{
						html += "The following people are located at the following locations:";
					}
					html += "<div class='accordion'>"
					for(var j = 0; j < siteCount; j++){
						var site = sites[j];
						var personCount = $(site).find('personCount').text();
						var people = site.getElementsByTagName("person");
						html += "<h2>"+$(site).attr("address")+"</h2>";
						if(personCount == 0){
							html += "<p>There are no people currently here.</p>";
						}
						for(var i = 0; i < personCount; i++){
							html += "<h1 class='accordion-h1'>"+ $(people[i]).find('fName').text()+" "+$(people[i]).find('lName').text()+"</h1>"
							html += "<div>";
							html += "<p>" + $(people[i]).find('role').text() +"</p>";
							html += "<p>" + $(people[i]).find('honorific').text() +"</p>";
							html += "<h3>Contact Methods</h3>";
							var contacts = $(people[i]).find('contactMethods').find('method');
							if(contacts.length == 0){
								html += "<p>There is no contact information for this individual.</p>";
							}
							else{
								for(var k = 0; k < contacts.length; k++){
										html += "<p>" + $(contacts[k]).find('type') + ": " + $(contacts[k]).find('value') + "</p>";
								}
							}

							html += "</div>";
						}
					}
					html += "</div>"
					$('#info-dump').html(html);
					$(".accordion").accordion();


				}
				}
		});
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
						$('#myTable').DataTable();
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
