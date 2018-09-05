/**
 * @author goc
 * @Date 2016-06-16
 * @Desc 用户组管理页面
 *
 * 
 */
var Group = {
	menuId: "Group",
	addUrl:'authorized/group/add',
	updateUrl: 'authorized/group/update',
	deleteUrl:'authorized/group/delete',
	getAllUrl: "authorized/group/getAll",
	getBindingsUrl: "authorized/group/getBindings/",
	getUsersUrl: "authorized/group/getUsers",
	getRoleUrl: "authorized/group/getRoles",
	addUserBindingUrl:"authorized/group/addBindingUser/",
	addRoleBindingUrl:"authorized/group/addBindingRole/",
	removeUserBindingUrl:"authorized/group/removeBindingUser/",
	removeRoleBindingUrl:"authorized/group/removeBindingRole/"
};	
var initLoad = 0;
var currentNode;
(function($){
	
	/**
	 * 绑定更新用户信息按钮
	 */
	
	$("#submitUpdateForm").click(function(){
		//$.messager.progress();	
		$("#groupUpdateForm").form("enableValidation");
		var isValid = $("#groupUpdateForm").form("validate");
		if(isValid){
			var submitParams =$("#groupUpdateForm").form().serialize();
			CMC.request({
				url: Group.updateUrl,
				data : submitParams,
				method: 'POST',
				success : function(data){
					CMC.alertMessage(data.messageBody, 'info');
					Group.init();
					$("#updateNodeDetail").show();
					//$.messager.progress('close');
				}
			});
		}	
	});
	
	$("#showAddUserDialog").click(function(){
		CMC.dialog('bindUserDialog', 'open');
		Group.searchUser();
	});
	
	$("#deleteUser").click(function(){
		var userRecord = $("#userTable").datagrid("getSelected");
		var groupNode   = currentNode;
		if(!userRecord){
			CMC.alertMessage("请先选中一条用户记录！",'warning');
			return;
		}
		CMC.request({
			url: Group.removeUserBindingUrl,
			method : 'POST',
			data : {
				"groupId" : groupNode["id"],
				"groupName" : groupNode["groupName"],
				"userId" : userRecord["userId"],
				"userLoginId" : userRecord["userLoginId"]
			},
			success : function(data){
				CMC.alertMessage(data.messageBody, 'info');
				Group.getBinding(groupNode);
			}
		});
		
	});
	
	$("#deleteRole").click(function(){
		var groupNode   = currentNode;
		var roleRecord = $("#roleTable").datagrid("getSelected");
		if(!roleRecord){
			CMC.alertMessage("请先选中一条角色记录！",'warning');
			return;
		}
		CMC.request({
			url: Group.removeRoleBindingUrl,
			data: {
				"groupId" : groupNode["id"],
				"groupName" : groupNode["groupName"],
				"roleId" : roleRecord["id"],
				"roleName" : roleRecord["roleName"]
			},
			method: 'POST',
			success : function(data){
				CMC.alertMessage(data.messageBody, 'info');
				Group.getBinding(groupNode);
			}
		});
	});
	
	$("#searchUserButton").click(function(){
		Group.searchUser();
	});
	
	$("#showAddRoleDialog").click(function(){
		CMC.request({
			url: Group.getRoleUrl,
			method: 'get',
			success : function(data){
				$("#roletree").tree({
					data: [{
							"id":0,
							"text":"系统权限角色组",
							"level" : 0,
							"children":data.messageBody
						}]
				});
				CMC.dialog('bindRoleDialog', 'open');
			}
		});
	});
	
	$("#bindUserButton").click(function(){
		var record = $("#userResultTable").datagrid("getSelected");
		var groupNode   = currentNode;
		if(!record){
			CMC.alertMessage("请先选中一条用户记录！","warning");
			return
		}
		var rows = $("#userTable").datagrid("getRows");	
		var exist = false;
		for(var i =0 ; rows&& i<rows.length; i++){
			if(rows[i]['userLoginId'] == record['userLoginId']){
				exist = true;
				break;
			}
		}
		if(exist){
			CMC.alertMessage("请不要添加重复的用户记录！","warning");
			return
		}
		CMC.request({
			url:Group.addUserBindingUrl ,
			method: 'POST',
			data:{
				"groupId" : groupNode["id"],
				"groupName" : groupNode["groupName"],
				"userId" : record["userId"],
				"userLoginId" : record["userLoginId"]
			},
			success : function(data){
				CMC.alertMessage(data.messageBody, 'info');
				Group.getBinding(groupNode);
				CMC.dialog('bindUserDialog', 'close');
				//$.messager.progress('close');
			}
		});	
	});
	
	$("#bindRoleButton").click(function(){
		var groupNode = currentNode;
		var roleNode = 	$("#roletree").tree('getSelected');
		if(!roleNode){
			CMC.alertMessage("请先选中一个角色！",'warning');
			return
		}
		CMC.request({
			url:Group.addRoleBindingUrl  ,
			method: 'POST',
			data:{
				"groupId" : groupNode["id"],
				"groupName" : groupNode["groupName"],
				"roleId" : roleNode["id"],
				"roleName" : roleNode["roleName"]
				
			},
			success : function(data){
				CMC.alertMessage(data.messageBody, 'info');
				Group.getBinding(groupNode);
				CMC.dialog('bindRoleDialog', 'close');
				//$.messager.progress('close');
			}
		});	
	});
	
	
	 $("#submitAddForm").click(function(){
		//$.messager.progress();
		$("#groupAddForm").form("enableValidation");
		var isValid = $("#groupAddForm").form("validate");
			if(isValid){
				var submitParams =$("#groupAddForm").form().serialize();
				CMC.request({
					url:Group.addUrl ,
					data : submitParams,
					method: 'POST',
					success : function(data){
						CMC.alertMessage(data.messageBody, 'info');
						Group.init();
						$("#addNodeDetail").hide();
						//$.messager.progress('close');
					}
				});	
			}	
		
	});
	Group.append = function (){
		var t = $('#groupTree');
		$("#groupAddForm").form('reset');
		$("#groupAddForm").form("disableValidation");
		var node = t.tree('getSelected');
		$("#groupAddForm").form("load",{
						"parentId" : node['id'],
						"parentName" : node['text'],
						"groupType" : node['groupType'],
						"level" : node['level'] +1
					});
					$("#updateNodeDetail").hide();
					$("#addNodeDetail").show();
					$("#bindingInfo").hide();	
		/*
		t.tree('append', {
			parent: (node?node.target:null),
			data: [{
				text: 'new item1'
			}]
		});*/
	}
	Group.removeit = function (){
		var node = currentNode;
		var children = $('#groupTree').tree("getChildren",node.target);
		if(children.length>0){
			CMC.alertMessage("请先删除子用户组!",'warning');
			return;
		}
		CMC.request({
			url:Group.getBindingsUrl + node['id'] ,
			method: 'get',
			success : function(response){
				if(response.messageBody.bindingRoles.length>0 
						||response.messageBody.bindingUsers.length>0){
					CMC.alertMessage("请先删除关联的用户或角色！",'warning');
					return;
				}else{
					CMC.request({
						url:Group.deleteUrl  ,
						method: "POST",
						data : {
							id: node['id'],
							groupName : node['groupName']
						},
						success : function(data){
							CMC.alertMessage(data.messageBody, 'info');
							Group.init();
							$("#updateNodeDetail").hide();
						}
					});	
				}
			}
		});	
	}
	Group.collapse =  function (){
		var node = currentNode;
		$('#groupTree').tree('collapse',node.target);
	}
	
	Group.expand = function(){
		var node = currentNode;
		$('#groupTree').tree('expand',node.target);
	}
	

	
	 Group.searchUser = function(){
		 CMC.request({
				url: Group.getUsersUrl,
				data: $("#userSearchForm").form().serialize(),
				method: "POST",
				success : function(data){
					$("#userResultTable").datagrid("loadData",data.messageBody.list);
					$("#userResultTable").datagrid("getPager").pagination({
						total : data.messageBody.total,
						pageNumber : data.messageBody.num/(data.messageBody.num - data.messageBody.start + 1)
					});
				}
			});	
	 }
	 
	 Group.init = function (){
		 
			CMC.request({
			url : Group.getAllUrl,
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
							CMC.initPagePermission("permission='Group:add'");
							CMC.initPagePermission("permission='Group:delete'");
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
							CMC.initPagePermission("permission='Group:update'");
							CMC.initPagePermission("permission='Group:addBindingRole'");
							CMC.initPagePermission("permission='Group:removeBindingRole'");
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
							Group.getBinding(node);
							$("#updateNodeDetail").show();
							$("#addNodeDetail").hide();
						},
						onLoadSuccess : function(node, data){
							if(initLoad==0){
								$(this).tree('collapseAll',$(this).tree("getRoot").target); 
							}
							initLoad++;
							
						}
				});
			}
		});
	
			$("#userResultTable").datagrid({
				singleSelect:true,
				pagination : true
			});

		 	$("#userResultTable").datagrid("getPager").pagination({
				onSelectPage: function(pageNum,pageSize){
		        	//初始化查询分页参数
					//alert("onselect"+ pageNum +"+"+ pageSize);
		        	$("#userSearchForm").form('load',{
		        		start : (pageNum-1) *pageSize +1,
		        		end : pageNum *pageSize
		        	});
		        	Group.searchUser();
				}
			});
	
	 }
	 
	  Group.getBinding = function(node){
		  CMC.request({
				url:Group.getBindingsUrl + node['id'] ,
				method: 'get',
				success : function(response){
						$("#roleTable").datagrid({
							pagination: false,
							singleSelect: true,
							data: response.messageBody.bindingRoles
						});
						$("#userTable").datagrid({
							pagination: false,
							singleSelect: true,
							data: response.messageBody.bindingUsers
						});			
				}
			});	
	  }
	
})(jQuery);

$(document).ready(function(){
	
		CMC.init(Group);
	});
	
		