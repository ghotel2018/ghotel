function doUserSearch() {
	  //$("#selectApporUser").show().dialog("open");
	  openSelect();
	  $("#selectApporUser").show().dialog("open");
	  window.frames["apporUserSelect"].openIframeId="selectApporUser";
	  window.frames["apporUserSelect"].userId="aproveId";
	  window.frames["apporUserSelect"].userName="approveUserName";
 } 
function openSelect(){
	if(!window.frames["apporUserSelect"]){
		$('#selectApporUser').show().dialog({
			  title: "选择审批人",
			  closed: true,
			  cache: true,
			  width: 750,
			  height: 550,
			  minimizable: true,
			  maximizable: true,
			  collapsible: true,
			  content: '<iframe id="apporUserSelect" name="apporUserSelect" src="/cmc/module/user/selectGroupUser.html" frameborder=0 height=100% width=100% scrolling=no></iframe>',
	  });
		var winTopLeft = CMC.getWindowTopLeft("selectApporUser");
		$('#selectApporUser').window({
			top:winTopLeft.winTop,
			left:winTopLeft.winLeft
		});
	}
}

/*var winTopLeft = CMC.getWindowTopLeft("issueFormDialog");
$('#issueFormDialog').window({
	top:winTopLeft.winTop,
	left:winTopLeft.winLeft
});
$("#issueFormDialog").dialog('open');*/
