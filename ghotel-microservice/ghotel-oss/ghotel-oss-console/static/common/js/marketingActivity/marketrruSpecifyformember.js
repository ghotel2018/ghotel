var MarketrruSpecifyformember = {
	menuId: "MarketrruSpecifyformember",
	searchTableRequired: true, 
	searchUrl: "authorized/marketingActivity/getMarketrruSpecifyformemberPaginationAll",
	getAllUrl: "authorized/marketingActivity/getMarketrruSpecifyformemberPaginationAll",
	groupId : '',
	columns :  [[
	       {field: 'mobile', title:'手机号' , width: '16%' , align: 'center'},
           {field: 'memeberId', title:'会员号' , width: '16%' , align: 'center'},
           {field: 'idcard', title:'证件号' , width: '25%' , align: 'center'},
           {field: 'email', title:'邮箱' , width: '20%' , align: 'center'},
           {field: 'createdTime', title:'创建时间' , width: '20%' , align: 'center'}
       ]]
	
};
$(document).ready(function(){
	var data = window.parent.MarketingActivityMnt.handleFormData('#marketingActivitySaveForm',"_save");
	if( data!=null && data.actionId != null && data.actionId != ""){
		$("#ruleId").val(data.actionId);
		CMC.init(MarketrruSpecifyformember);
	}else{
		alert("not data.id");
	}
	$("#clearCondition").click(function(){
		var start = $("#marketrruSpecifyformemberSearchForm input[name='start']:hidden").val();
		var end = $("#marketrruSpecifyformemberSearchForm input[name='end']:hidden").val();
		var ruleId = $("#ruleId").val();
		$('#marketrruSpecifyformemberSearchForm').form('clear');
		$("#ruleId").val(ruleId);
		$("#marketrruSpecifyformemberSearchForm input[name='start']:hidden").val(start);
		$("#marketrruSpecifyformemberSearchForm input[name='end']:hidden").val(end);
		CMC.search();
	});
});



var openIframeId;
var userId;
var userName;
function closeWin(){
	/*var record = CMC.grid.datagrid("getSelected");
	if(!record){
		CMC.alertMessage("请选择审批人!", 'warn');
		return;
	}
	window.parent.$('#'+userName).textbox('setValue', record['userName']);
	window.parent.$('#'+userId).val(record['userLoginId']);*/
	window.parent.$('#'+openIframeId).dialog('close');
}
var currentNode;

(function($){

	

	$("#marketrruSpecifyformember_search").click( function(){
		CMC.search();
	});
	MarketrruSpecifyformember.searchUser = function(){
		CMC.request({
		    url: MarketrruSpecifyformember.getAllUrl,
			data: $("#marketrruSpecifyformemberSearchForm").form().serialize(),
			method: "POST",
			success : function(data){
			}
		});	
}
})(jQuery);
