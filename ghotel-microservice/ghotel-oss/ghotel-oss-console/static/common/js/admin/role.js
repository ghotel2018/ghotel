/**
 * @author goc
 * @Date 2016-06-16
 * @Desc角色管理页面
 * 权限划分
 * 
 */

var Role = {
	menuId: "Role",
	addUrl:'authorized/role/add',
	updateUrl: 'authorized/role/update',
	deleteUrl: "authorized/role/delete",
	getAllUrl: "authorized/role/getAll",
	getBindingPermsUrl: "authorized/role/getBindingPerms/",
	getAllPermsUrl: "authorized/role/getAllPerms",
	rmBindingPermUrl : "authorized/role/rmBindingPerm",
	addBindingPermUrl: "authorized/role/addBindingPerm"
};	
var initLoad = 0;
var currentNode;
(function($){

	$("#roleAdd").click( function(){
		var t = $('#tree');
		var node = currentNode;
		$("#addRoleForm").form("load",{
			"parentId" : node['id'],
			"parentName" : node['text'],
			"level" : node['level'] +1
		});
		$("#addRoleForm").form("disableValidation");
		$("#addNodeDetail").show();
		$("#updateNodeDetail").hide();
	});
	
	$("#roleDelete").click( function (){
		var node = currentNode;
		var isLeaf =  $('#tree').tree("isLeaf",node.target);
		if(!isLeaf){
			CMC.alertMessage("该节点拥有子节点,请先删除子节点再执行删除操作！",'warn');
			return;
		}
		CMC.request({
			url: Role.getBindingPermsUrl + node['id'],
			method: 'get',
			success : function(data){
				if(data.messageBody.length>0){
					CMC.alertMessage("该角色绑定了某些权限，请先在修改角色页面解除与这些权限的绑定！");
					return;
				}
				 CMC.confirm("删除用户时会解除与用户组的绑定， 请确认是否继续?", function(r){
					  if(r){
						  CMC.request({
								url: Role.deleteUrl,
								method: 'POST',
								data : {
									id: node['id'],
									groupName : node['text']
								},
								success: function(response){
									CMC.alertMessage(response.messageBody,'warn');
									Role.init();
								}
							});  
					  }
				 });
			}
		});
	});
	
	$("#addPermission").click(function(){
		$('#permResultTable').datagrid({
			singleSelect: true,
			pagination: true
		});
		
		$('#permResultTable').datagrid("getPager").pagination({
			total:0,
			pageSize:10,
			pageNumber:1,
			onSelectPage: function(pageNum,pageSize){
	        	//初始化查询分页参数
				//alert("onselect"+ pageNum +"+"+ pageSize);
	        	$("#permSearchForm").form('load',{
	        		start : (pageNum-1) *pageSize +1,
	        		end : pageNum *pageSize
	        	});
	        	Role.searchPerms();
			}
		});
		CMC.dialog('searchPermDialog','open');
		$("#permSearchForm").form("clear");
		$("#permSearchForm").form('load',{
			start: 1,
			end: 10
		});
		Role.searchPerms();
	});
	
	$("#searchPerms").click(function(){
		Role.searchPerms();
	});
	
	$("#nodeCollapse").click(function (){
		var node = currentNode;
		$('#tree').tree('collapse',node.target);
	});
	
	$("#nodeExpend").click(function (){
		var node = currentNode;
		$('#tree').tree('expand',node.target);
	});
	
	$("#updateRole").click( function(){
		//$.messager.progress();	
		$("#updateRoleForm").form("enableValidation");
		var isValid = $("#updateRoleForm").form("validate");
			if(!isValid){
			//	$.messager.progress('close');	
			}else{
				var submitParams =$("#updateRoleForm").form().serialize();
				CMC.request({
					url: Role.updateUrl,
					data : submitParams,
					method: 'POST',
					success : function(data){
						CMC.alertMessage(data.messageBody, 'info');
						Role.init();
						$("#updateRoleForm").form("clear");
						$("#updateNodeDetail").hide();
						//$.messager.progress('close');
					}
				});
			}	
	});
	
	$("#addRole").click(function(){
		//$.messager.progress();	
		$("#addRoleForm").form("enableValidation");
		var isValid = $("#addRoleForm").form("validate");
			if(isValid){
			//	$.messager.progress('close');	
				var submitParams =$("#addRoleForm").form().serialize();
				CMC.request({
					url: Role.addUrl,
					data : submitParams,
					method: 'POST',
					success : function(data){
						CMC.alertMessage(data.messageBody, 'info');
						Role.init();
						$("#addRoleForm").form("clear");
						//$.messager.progress('close');
						$("#addNodeDetail").hide();
					}
				});
			}	
	});
	
	
	$("#selectPermission").click(function(){
		var record = $("#permResultTable").datagrid("getSelected");
		var node = currentNode;
		if(!record){
			CMC.alertMessage("请先选中一条权限记录！","warn");
			return
		}
		CMC.request({
			url: Role.addBindingPermUrl,
			data : {
				roleId: node['id'],
				roleName: node['text'],
				permissionId: record["id"],
				permissionDesc :record["permissionDesc"]
			},
			method: 'POST',
			success : function(data){
				CMC.alertMessage(data.messageBody, 'info');
				$("#bindingPermTable").datagrid("appendRow",record);
				CMC.dialog('searchPermDialog','close');
				
			}
		});
		
	});
	
	$("#removePermission").click(function(){
		var record = $("#bindingPermTable").datagrid("getSelected");
		var node = currentNode;
		if(!record){
			CMC.alertMessage("请先选中一条权限记录！","warn");
			return
		}
		CMC.request({
			url: Role.rmBindingPermUrl,
			data : {
				roleId: node['id'],
				roleName: node['text'],
				permissionId: record["id"],
				permissionDesc :record["permissionDesc"]
			},
			method: 'POST',
			success : function(data){
				CMC.alertMessage(data.messageBody, 'info');
				$("#bindingPermTable").datagrid("deleteRow", $("#bindingPermTable").datagrid("getRowIndex",$("#bindingPermTable").datagrid("getSelected")) );
			}
		});
	});
	
	Role.searchPerms = function(){
		
		CMC.request({
			url: Role.getAllPermsUrl,
			data : $("#permSearchForm").form().serialize(),
			method: 'POST',
			success : function(data){
				$("#permResultTable").datagrid("loadData", data.messageBody.list);
				
				$("#permResultTable").datagrid('getPager').pagination({
					total: data.messageBody.total,
					pageNumber: data.messageBody.num/(data.messageBody.num - data.messageBody.start + 1)
				});
			}
		});
	}
	
	
	
	Role.init = function(){
		
		CMC.request({
			url : Role.getAllUrl,
			success: function(response){
				$("#tree").tree({
					data: [{
							"id":0,
							"text":"系统权限角色组",
							"level" : 0,
							"children":response.messageBody
						}],
					//animate: true,
					onContextMenu: function(e,node){
						currentNode = node;
						e.preventDefault();
						$(this).tree('select',node.target);
						$('#showMenu').menu('show',{
							left: e.pageX,
							top: e.pageY
						});
						CMC.initPagePermission("permission='Role:add'");
						CMC.initPagePermission("permission='Role:delete'");
						//不能直接添加第二层子节点
						/*if(node['id']=='0' || node['level']> 1 ){
							$("#roleAdd").hide();
						}*/
						//不能删除第二层子节点
						//if(node['id']=='0' || node['level']==1){
						if(node['id']=='0' ){
							$("#roleDelete").hide();
						
						}
						//隐藏第二层的权限操作
						/*if(node['level']==1){
							$("#updateRole").hide();
							$("#addPermission").hide();
							$("#removePermission").hide();
						}*/
					},
					onClick: function(node){
						CMC.initPagePermission("permission='Role:update'");
						CMC.initPagePermission("permission='Role:addBindingPerm'");
						CMC.initPagePermission("permission='Role:rmBindingPerm'");
						currentNode = node;
						$("#bindingPermTable").datagrid({
							pagination: true,
							singleSelect: true
						});
						
						$("#bindingPermTable").datagrid('getPager').pagination({
							total: 0,
							pagesize:10,
							pageNumber:1
						});
						
						
						if(node['id']==0){
							$("#updateNodeDetail").hide();
							return;
						}
						
						//隐藏第二层的权限操作
						/*if(node['level']==1){
							$("#updateRole").hide();
							$("#addPermission").hide();
							$("#removePermission").hide();
						}*/
						
						$("#updateRoleForm").form("disableValidation");
						$("#updateRoleForm").form("load",{
							id : node['id'],
							roleName : node['text'],
							roleDesc : node['roleDesc'],
							parentName : $('#tree').tree('getParent',node.target)['text']
						});
						$("#updateNodeDetail").show();
						$("#addNodeDetail").hide();
						
						CMC.request({
							url: Role.getBindingPermsUrl + node['id'],
							method: 'get',
							success : function(data){
								$("#bindingPermTable").datagrid("loadData",data.messageBody);
								$("#bindingPermTable").datagrid('getPager').pagination({
									total: data.messageBody.length,
									pagesize:10,
									pageNumber:1
								});
							}
						});
						
						
						
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
		
	}
})(jQuery)

	$(document).ready(function(){
		CMC.init(Role);
	});