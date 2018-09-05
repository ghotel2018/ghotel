var SelectUser = {
	menuId: "SelectUser",
	searchTableRequired: true, 
	onDblClickRow:closeWin,
	searchUrl: "authorized/selectuser/getUsers",
	getAllUrl: "authorized/selectuser/getAll",
	queryAllUrl: "authorized/selectuser/queryAll",
	getBindingsUserUrl: "authorized/selectuser/getBindingsUser/",
	columns :  [[
			       {field: 'userLoginId', title:'登录账号' , width: '20%' , align: 'center'},
		           {field: 'userName', title:'姓名' , width: '20%' , align: 'center'},
		           {field: 'workMail', title:'邮箱' , width: '15%' , align: 'center'},
		           {field: 'workPhone', title:'工作电话' , width: '15%' , align: 'center'},
		           {field: 'status', title:'状态' , width: '10%' , align: 'center'}
	           ]]
	
};
$(document).ready(function(){
	CMC.init(SelectUser);
});
var openIframeId;
var userId;
var userName;
function closeWin(){
	var record = CMC.grid.datagrid("getSelected");
	if(!record){
		CMC.alertMessage("请选择审批人!", 'warn');
		return;
	}
	window.parent.$('#'+userName).textbox('setValue', record['userName']);
	window.parent.$('#'+userId).val(record['userLoginId']);
	window.parent.$('#'+openIframeId).dialog('close');
}
var currentNode;

(function($){
	SelectUser.init = function (){
		var flag = window.parent["flag"]; //flag ==1, 查找所有， flag==0|null , 展示当前用户的上级用户组
		if(flag==1){
			SelectUser.searchGroup(SelectUser.queryAllUrl);
		}else{
			SelectUser.searchGroup(SelectUser.getAllUrl);
		}
	};
 
 SelectUser.searchGroup = function(url){
		CMC.request({
			url : url,
			success: function(response){
				$('#groupTree').tree({
						data:[ {
							"id":0,
							"text":"系统用户组",
							"level" : 0,
							"children":response.messageBody
						}],
						//animate: true,
						onContextMenu: function(e,node){
							e.preventDefault();
							$(this).tree('select',node.target);
							$('#showMemu').menu('show',{
								left: e.pageX,
								top: e.pageY
							});
							if(node['id']=='0'){
								$("#groupAddBtn").hide();
							}
							if(node['id']=='0' || node['level']==1){
								$("#groupDeleteBtn").hide();
							}
							if(node['level']==1){
								$("#showAddRoleDialog").hide();
								$("#submitUpdateForm").hide();
								$("#deleteRole").hide();
							}
						},
						onClick: function(node){
							if(node['id']==0){
								$("#updateNodeDetail").hide();
								return;
							}
							if(node['level']==1){
								$("#showAddRoleDialog").hide();
								$("#submitUpdateForm").hide();
								$("#deleteRole").hide();
							}
							currentNode = node;
							$("#groupUpdateForm").form("disableValidation");
							$("#groupUpdateForm").form("load",{
								"id" : node['id'],
								"groupName" : node['groupName'],
								"groupDesc" : node['groupDesc'],
								parentName : $('#groupTree').tree('getParent',node.target)['text']
							});
							SelectUser.getBinding(node);
							$("#updateNodeDetail").show();
							$("#addNodeDetail").hide();
						}
				});
			}
		});
 }
 
 SelectUser.getBinding = function(node){
	  CMC.request({
			url:SelectUser.getBindingsUserUrl + node['id'] ,
			method: 'get',
			success : function(response){
				    CMC.grid.datagrid({
						pagination: true,
						singleSelect: true,
						data: response.messageBody.bindingUsers
					});			
			}
		});	
 }
 $("#user_search").click( function(){
	// Group.searchUser();
  });
 SelectUser.searchUser = function(){
	  CMC.request({
		    url: SelectUser.getUsersUrl,
			data: $("#userSearchForm").form().serialize(),
			method: "POST",
			success : function(response){
					$("#userTable").datagrid({
						pagination: true,
						singleSelect: true,
						data: response.messageBody.list
					});			
			}
		});	
}
})(jQuery);

