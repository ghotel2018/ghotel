var MarketruleWhiteUsers = {
	menuId: "MarketruleWhiteUsers",
	searchTableRequired: true, 
	getAllUrl: "authorized/marketingActivity/getMarketruleWhiteUsersPaginationAll",
	searchUrl: "authorized/marketingActivity/getMarketruleWhiteUsersPaginationAll",
	groupId : '',
	columns :  [[
       {field: 'mobile', title:'手机号' , width: '50%' , align: 'center'},
       {field: 'createTime', title:'创建时间' , width: '46%' , align: 'center'},
   ]]
	
};
$(document).ready(function(){
	var data = window.parent.MarketingActivityMnt.handleFormData('#marketingActivitySaveForm',"_save");
	if( data!=null && data.actionId != null && data.actionId != ""){
		$("#ruleId").val(data.actionId);
		CMC.init(MarketruleWhiteUsers);
	}
});
var openIframeId;
var userId;
var userName;
function closeWin(){
	window.parent.$('#'+openIframeId).dialog('close');
}
var currentNode;
$("#clearCondition").click(function(){
	var start = $("#marketruleWhiteUsersSearchForm input[name='start']:hidden").val();
	var end = $("#marketruleWhiteUsersSearchForm input[name='end']:hidden").val();
	var ruleId = $("#ruleId").val();
	$('#marketruleWhiteUsersSearchForm').form('clear');
	$("#ruleId").val(ruleId);
	$("#marketruleWhiteUsersSearchForm input[name='start']:hidden").val(start);
	$("#marketruleWhiteUsersSearchForm input[name='end']:hidden").val(end);
	CMC.search();
});

(function($){
	MarketruleWhiteUsers.init = function (){
		//MarketruleWhiteUsers.searchUser();
	};
 
$("#marketruleWhiteUsers_search").click( function(){

});
MarketruleWhiteUsers.searchUser = function(){
	CMC.request({
		    url: MarketruleWhiteUsers.getAllUrl,
			data: $("#marketruleWhiteUsersSearchForm").form().serialize(),
			method: "POST",
			success : function(data){
				/*$("#userTable").datagrid({
					pagination: true,
					singleSelect: true,
					data: response.messageBody.list
				});	*/		
			}
		});	
}
})(jQuery);

