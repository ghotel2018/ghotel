/**
 * @author goc
 * @Date 2016-06-16
 * @Desc 权限管理页面
 *
 * 
 */
var Permission = {
		searchTableRequired: true, 
		menuId: "Permission",
		addUrl:'authorized/permission/add',
		updateUrl: 'authorized/permission/update',
		deleteUrl: "authorized/permission/delete",
		getRoles : "authorized/permission/getRoles",
		searchUrl: "authorized/permission/getAll" , //如果searchTableRequired 是 true 必填
		getAllModule : "authorized/permission/getConfig",
		getBindingResource: "authorized/permission/getBindingResource/" ,
		addBindingResource: "authorized/permission/addBindingResource" ,
		removeBindingResource: "authorized/permission/removeBindingResource",
		getAllResources:"authorized/permission/getAllResources",
		resourceSelectorInd:"",
		columns :  [[
			           {field: 'permissionDesc', title:'权限描述' , width: '48%' , align: 'left'},
			           {field: 'permissionExp', title:'权限表达式' , width: '48%' , align: 'left'}
			           ]]
		
};

(function($){

	$("#searchFormAdd").click(function(){
		$("#permissionForm").form("clear");
		$("#permissionForm").form("disableValidation");
		$("#submitAddPermForm").show();
		$("#submitUpdatePermForm").hide();
		$("#permissionId").val("");
		$("#permissionExp").textbox("setValue","");
		$("#permissionDesc").textbox("setValue","");
		$("#existResourceList").datagrid("loadData",[]);
		Permission.resourceSelectorInd = "add";
		$("#permissionDialog").dialog({
			title:"新增权限信息"
		});
		CMC.dialog('permissionDialog','open');
		
	});
	
	$("#searchFormUpdate").click(function(){
		$("#permissionForm").form("clear");
		$("#permissionForm").form("disableValidation");
		$("#submitAddPermForm").hide();
		$("#submitUpdatePermForm").show();
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条权限记录！","warning");
			return;
		}
		$("#permissionDialog").dialog({
			title:"更新权限信息"
		});
		$("#permissionId").val(record["id"]);
		$("#permissionExp").textbox("setValue",record["permissionExp"]);
		$("#permissionDesc").textbox("setValue",record["permissionDesc"]);
		Permission.getBindings(record["id"]);
		Permission.resourceSelectorInd = "update";
		CMC.dialog('permissionDialog','open');
		
	});
	
	$("#submitUpdatePermForm").click(function(){
		$("#permissionForm").form("enableValidation");
		var isValid = $("#permissionForm").form("validate");
		if(isValid){
			CMC.request({
				url: Permission.updateUrl ,
				data:  {
					id : $("#permissionId").val(),
					permissionExp: $("#permissionExp").textbox("getValue"),
					permissionDesc: $("#permissionDesc").textbox("getValue")
				},
				method: 'POST',
				success: function(response){
					CMC.alertMessage(response.messageBody,'info');
				}
			});
		}
		
	});
	
	
	$("#submitAddPermForm").click(function(){
		$("#permissionForm").form("enableValidation");
		var isValid = $("#permissionForm").form("validate");
		if(isValid){
			if( $("#permissionId").val()!=null 
					&& $("#permissionId").val().length>0 ){
				CMC.request({
					url: Permission.updateUrl ,
					data:  {
						id : $("#permissionId").val(),
						permissionExp: $("#permissionExp").textbox("getValue"),
						permissionDesc: $("#permissionDesc").textbox("getValue")
					},
					method: 'POST',
					success: function(response){
						CMC.alertMessage(response.messageBody,'info');
					}
				});
			}else{
				CMC.request({
					url: Permission.addUrl ,
					data:  {
						permissionExp: $("#permissionExp").textbox("getValue"),
						permissionDesc: $("#permissionDesc").textbox("getValue")
					},
					method: 'POST',
					success: function(response){
						CMC.alertMessage(response.messageBody,'info');
					}
				});
			}
		}
	});
	
	$("#searchFormDelete").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条权限记录！","warn");
			return;
		}
		CMC.request({
			url: Permission.getBindingResource + record["id"] ,
			method: 'GET',
			success: function(response){
				if(response.messageBody.length>0){
					CMC.alertMessage("该权限绑定了某些资源,请先在修改权限页面解除与这些资源的绑定！","error");
					return
				}
				 CMC.confirm("删除改权限时会解除跟角色的绑定， 请确认是否继续?", function(r){
					  if(r){
						  CMC.request({
								url: Permission.deleteUrl  ,
								method: 'POST',
								data : record,
								success: function(response){
									CMC.alertMessage(response.messageBody,'warning');
									CMC.search();
								}
							});
					  }
				  });
			}
		});
		
		
	});
	
	
	$("#addResFromeDialog").click(function(){

		if(Permission.resourceSelectorInd == "add"){ 
			if( $("#permissionDesc").textbox("getValue")==null 
				|| $("#permissionDesc").textbox("getValue").length==0
				 ){
			CMC.alertMessage("请先填入权限描述！",'warn');
			return;
			}
			
		}
		CMC.dialog("searchResourceDialog",'open');
		Permission.searchResource();
	});
	
	
	Permission.searchResource = function(){
		CMC.request({
			url: Permission.getAllResources ,
			data: $("#resourceSearchForm").form().serialize(),
			method: 'POST',
			success: function(response){
				$("#resourceSearchTable").datagrid("loadData",response.messageBody.list);
				$("#resourceSearchTable").datagrid("getPager").pagination({
					total : response.messageBody.total,
					pageNumber : response.messageBody.num/(response.messageBody.num - response.messageBody.start + 1)
				});
				var rows = $("#resourceSearchTable").datagrid("getRows");
				for(var i =0 ;  i < rows.length; i++){
					$("#resourceSearchTable").datagrid("refreshRow",$("#resourceSearchTable").datagrid('getRowIndex',rows[i]) );
				}
				
			}
		});
	}
	
	$("#rmResFromDialog").click(function(){
		var table = $("#existResourceList") ;
		var rows  = table.datagrid("getRows");
		//if(rows && rows.length ==1){
		//	CMC.alertMessage("每个权限至少须保留一个绑定的资源！！","warn");
		//	return;
		//}
		var record = table.datagrid("getSelected");
		var rowIndex = table.datagrid("getRowIndex",record);
		if(!record){
			CMC.alertMessage("请先选中一条权限记录！","warn");
			return;
		}
		if(table.datagrid("getRows").length==0){
			//updateTable.datagrid("deleteRow", updateTable.datagrid("getRowIndex",updateTable.datagrid("getSelected")) );
			$("#permissionDesc").textbox("getValue")
		}else{
			var existingEpx = $("#permissionExp").textbox('getValue');
			$("#permissionExp").textbox("setValue", Permission.removeActionCodeFromExp(existingEpx,record['actionCode']));
			table.datagrid("deleteRow",rowIndex);
		}
		CMC.request({
			url: Permission.removeBindingResource ,
			data:  {
				id : $("#permissionId").val(),
				permissionExp: $("#permissionExp").textbox("getValue"),
				permissionDesc: $("#permissionDesc").textbox("getValue"),
				resourceId : record['id'] ,
				resourceName: record['resourceName']
			},
			method: 'POST',
			success: function(response){
				table.datagrid("getSelected")
				CMC.alertMessage(response.messageBody,'info');
			}
		});
		 
	});
	
	
	Permission.removeActionCodeFromExp  = function(exp, actionCode){
		if(exp  && exp.length>0 && exp.split(":").length>1){
			var module = exp.split(":")[0];
			var actionCodesExp = exp.split(":")[1];
			var actionCodeList = actionCodesExp.split(",")
			if(actionCodeList.length==1){
				return "";
			}
			var index = actionCodeList.indexOf(actionCode);
			actionCodeList.splice(index,1);
			return module + ":" + actionCodeList.join(","); 
		}
		
	}
	
	
	$("#selectResource").click(function(){
		var record = $("#resourceSearchTable").datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条权限记录！","warn");
			return;
		}
		
		if(Permission.resourceSelectorInd == "add"){
			if($('#existResourceList').datagrid("getRows").length==0){				
				$("#permissionExp").textbox("setValue", record["module"]+":"+record["actionCode"]);
				CMC.request({
					url: Permission.addUrl ,
					method: 'POST',
					data: {
						permissionExp: $("#permissionExp").textbox("getValue"),
						permissionDesc: $("#permissionDesc").textbox("getValue"),
						resourceId : record['id'] ,
						resourceName: record['resourceName']
					},
					success: function(message){
						$("#permissionId").val(message.messageBody);
						CMC.alertMessage("保存权限和添加资源成功！",'info');
						$('#existResourceList').datagrid('appendRow',record);
						CMC.search();
					}
				});
			}else{
				var existingEpx = $("#permissionExp").textbox("getValue");
				if(Permission.addRecordCheck(existingEpx,record)){
					$("#permissionExp").textbox("setValue",Permission.coculateExp(existingEpx,record));
					CMC.request({
						url: Permission.addBindingResource ,
						method: 'POST',
						data: {
							id : $("#permissionId").val(),
							permissionExp: $("#permissionExp").textbox("getValue"),
							permissionDesc: $("#permissionDesc").textbox("getValue"),
							resourceId : record['id'] ,
							resourceName: record['resourceName']
						},
						success: function(message){
							CMC.alertMessage(message.messageBody,'info');
							Permission.getBindings($("#permissionId").val());
							CMC.search();
						}
					});
				}
			}
			
		} else if(Permission.resourceSelectorInd == "update"){
			if($('#existResourceList').datagrid("getRows").length==0){
				$('#existResourceList').datagrid('appendRow',record);
				$("#permissionExp").textbox("setValue", (record["module"] + ":" + record["actionCode"]) );
			}else{
				var existingEpx = $("#permissionExp").textbox("getValue");
				if(Permission.addRecordCheck(existingEpx,record)){
					$("#permissionExp").textbox("setValue",Permission.coculateExp(existingEpx,record));
				}else{
					return;
				}
			}
			CMC.request({
				url: Permission.addBindingResource ,
				method: 'POST',
				data: {
					id :$("#permissionId").val(),
					permissionExp:  $("#permissionExp").textbox("getValue"),
					permissionDesc: $("#permissionDesc").textbox("getValue"),
					resourceId : record['id'] ,
					resourceName: record['resourceName']
				},
				success: function(message){
					Permission.getBindings($("#permissionId").val());
					CMC.search();
					CMC.alertMessage(message.messageBody,"info");
				}
			});

		}	
		
		CMC.dialog("searchResourceDialog",'close');
	});
	
	Permission.coculateExp = function(existingExp,newRecord){
			return existingExp += "," + newRecord['actionCode'];
	}
	

	
	Permission.addRecordCheck = function(existingExp,newRecord){
		var module = existingExp.split(":")[0];
		var existingActionCodeList = existingExp.split(":")[1];
		var newAddModule  = newRecord['module'];
		var newActionCode = newRecord['actionCode'];
		if(module.length>0 && module != newAddModule  ){
			CMC.alertMessage("每种权限不能包含不同的模块！", 'warn');
			return false;
		}
		if(existingActionCodeList && existingActionCodeList.indexOf(newActionCode)!=-1){
			CMC.alertMessage("请勿添加重复的记录！", 'warn');
			return false;
		}
		if(existingActionCodeList && existingActionCodeList == "*"){
			CMC.alertMessage("该权限记录已经绑定当前模块所有的资源！", 'warn');
			return false;
		}
		return true;
	}
	
	$("#searchResourceButton").click(function(){
		Permission.searchResource();
	});
	
	Permission.intSearchTable = function(){
		
		$("#resourceSearchTable").datagrid({
			singleSelect:true,
			pagination: true,
			columns :  [[
				           {field: 'resourceName', title:'资源名称' , width: "15%" , align: 'center'},
				           {field: 'module', title:'资源模块' , width: "15%" , align: 'center'},
				           {field: 'actionCode', title:'资源代码' , width: "15%"  , align: 'center'},
				           {field: 'resourceUrl', title:'资源路径' , width: "15%"  , align: 'center'},
				           {field: 'category', title:'资源分类' , width: "15%"  , align: 'center'},
				           {field: 'resourceType', title:'访问类别' , width: "15%"  , align: 'center'}
				           ]]
		});
		
		$("#resourceSearchTable").datagrid("getPager").pagination(
				{
					onSelectPage: function(pageNum,pageSize){
			        	//初始化查询分页参数
						//alert("onselect"+ pageNum +"+"+ pageSize);
			        	$("#resourceSearchForm").form('load',{
			        		start : (pageNum-1) *pageSize +1,
			        		end : pageNum *pageSize
			        	});
			        	console.log("222");
			        	Permission.searchResource();
					}
				}
		);
		//加载模块列表
		CMC.request({
			url: Permission.getAllModule ,
			method: 'GET',
			success: function(message){
				$("#searchModule").combobox({
					//data: [{"value":"Permission","label":"Permission"},{"value":"User","label":"User"},{"value":"Role","label":"Role"},{"value":"Resource","label":"Resource"},{"value":"Group","label":"Group"}],
					data: message.messageBody,
					panelHeight: '180px',
					valueField:'moduleId',
					textField:'moduleName' 
				});
			}
		});
	}
	
	Permission.init = function(){

		$("#existResourceList").datagrid({
			singleSelect: true,
			pagination: true
		});
		
		//加载角色列表
		CMC.request({
			url: Permission.getRoles,
			method: 'get',
			success : function(data){
				$("#roleId").combotree( "loadData", [{
					"id":-1,
					"text":"系统用户组",
					"children":data.messageBody
				}]);
			}
		});
		Permission.intSearchTable();
	}
	
	Permission.getBindings = function(id){
		CMC.request({
			url: Permission.getBindingResource + id,
			method: 'GET',
			success: function(response){
				$("#existResourceList").datagrid("loadData",response.messageBody);
				$("#existResourceList").datagrid("getPager").pagination({
					total: response.messageBody.length
				});
			}
		});
	}
	
})(jQuery)

$(document).ready(function(){
	CMC.init(Permission);
});