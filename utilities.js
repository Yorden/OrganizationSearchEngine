
var changeTab = function(tab){
	console.log(tab);
	makeTabsInactive();
	console.log(ID);
	if(ID != ""){
		if(tab == "general"){
			$("#genTab").attr('class', 'active');
			getGeneral(ID);

		}
		if(tab == "location"){
			$("#locTab").attr('class', 'active');
			getLocations(ID);

		}
		if(tab == "facility"){
			$("#facilTab").attr('class', 'active');
			getFacilities(ID);

		}
		if(tab == "treatment"){
			$("#treatTab").attr('class', 'active');
			getTreatment(ID);
		}
		if(tab == "physician"){
			$("#physTab").attr('class', 'active');
			getPhysicians(ID);

		}
		if(tab == "training"){
			$("#trainTab").attr('class', 'active');
			getTraining(ID);

		}
		if(tab == "equipment"){
			$("#equipTab").attr('class', 'active');
			getEquipment(ID);
		}
		if(tab == "people"){
			$("#peopleTab").attr('class', 'active');
			getPeople(ID);

		}
	}
};
//makes all the tabs inactive
var makeTabsInactive = function(){
	$("#navtabbar li").each(function(i){
		$(this).attr('class', "");
	});


};
//sets a world attr
var setWorldOrgId = function(id){
	ID = id;
}

var unhideTabs = function(){
	$("#navtabbar").css("visibility", "visible")
}
