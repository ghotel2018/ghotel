var Dictionary = {
	searchTableRequired: true, 
	columns :  [[
					{field: 'typeName', title:'字典名' , width: '20%' , align: 'center'},
					{field: 'typeKey', title:'字典key' , width: '30%' , align: 'left'},
					{field: 'renderType', title:'渲染类型' , width: '10%' , align: 'left',
						formatter:function(value,row,index){
							if(value=="0")
								return "select";
							else if(value=="1")
								return "html";
						}
					}
				]],
	menuId: 'Dictionary',
	searchUrl : 'authorized/dictionary/getAll',
	addUrl : "authorized/dictionary/add",
	addDetailUrl : "authorized/dictionary/addDetail",
	updatedUrl : "authorized/dictionary/update",
	deleteUrl : "authorized/dictionary/delete",
	getUrl: "authorized/dictionary/get/",
	updateDetailUrl : "authorized/dictionary/updateDetail",
	deleteDetailUrl : "authorized/dictionary/deleteDetail"
};

(function($){
	Dictionary.beforeUpdateBoxShow = function (id){
		$("#updateForm").form("clear");
		$("#updateForm").form("disableValidation");
		var record = CMC.grid.datagrid("getSelected");
		if(record){
			CMC.request({
				url: Dictionary.getUrl+record["typeId"],
				method: 'get',
				success: function(result){
					console.log(result);
					$("#updateForm").form("load",{
						'typeId' : result.messageBody.type.typeId,
						'typeName' : result.messageBody.type.typeName,
						'typeKey' : result.messageBody.type.typeKey,
						'renderType' : result.messageBody.type.renderType
					});
					CMC.dialog(id,'open');
				}
			});
		}else{
			CMC.alertMessage("请先选中一条记录！", 'warning');
			return;
		}
	}
	
	Dictionary.beforeAddBoxShow = function(id){
		$("#addForm").form("reset")
		CMC.dialog(id,'open');
		$("#addForm").form("disableValidation");
	}
	
	Dictionary.submitAddForm = function(){
		$("#addForm").form("enableValidation");
		var isValid = $("#addForm").form("validate");
		//console.log($("#addForm").form().serialize());return;
		if(isValid){
			CMC.request({
				url: Dictionary.addUrl,
				method: 'POST',
				data : $("#addForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					$("#addForm").form("clear");
					CMC.dialog("addDictionaryType","close");
				}
			});
		}
	};
	
	Dictionary.submitUpdateForm = function(){
		$("#updateForm").form("enableValidation");
		var isValid = $("#updateForm").form("validate");
		if(isValid){
			CMC.request({
				url: Dictionary.updatedUrl,
				method: 'POST',
				data : $("#updateForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('updateResourceType','close');
					$("#updateForm").form("clear");
				}
			});
		}
	};
	
	Dictionary.clearForm = function(id) {
		$('#'+id).form('clear');
	};
	
	Dictionary.deleteDictionary = function (){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条系统消息！",'warning');
			return;
		}
		CMC.request({
			url: Dictionary.deleteUrl,
			method: 'POST',
			data : {"messageId":record.messageId},
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
				CMC.search();
			},
			contraintExist : function(){
				CMC.alertMessage("当前资源已经被权限绑定，请先解除绑定再删除该资源！", "warning");
				return;
			}
		});
	};
	
	$("#viewDictionaryButton").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条系统消息！",'warning');
			return;
		}
		$("#typeId").val(record.typeId);
		CMC.request({
			url: Dictionary.getUrl+record.typeId,
			method: 'get',
			success: function(result){
				$("#typeName").html(result.messageBody.type.typeName);
				$("#typeKey").html(result.messageBody.type.typeKey);
				$("#detailTable").datagrid({
					columns :	[[
									{field: 'detailName', title:'名字' , width: "35%" , align: 'center'},
									{field: 'detailValue', title:'值' , width: "15%"  , align: 'center'},
									{field: 'detailRemark', title:'备注' , width: "15%"  , align: 'center'},
									{field: 's',title:'操作',width:"15%",align: 'center',
										formatter:function(value,row,index){
											return "<a href=\"javascript:;\" onclick=\"Dictionary.modifyDetail('"+row.detailId+"','"+row.typeId+"','"+row.detailName+"','"+row.detailValue+"','"+row.detailRemark+"')\">修改</a>"+
											"<a href=\"javascript:;\" onclick=\"Dictionary.deleteDetail('"+row.detailId+"')\">删除</a>";
										}
									}
									
								]],
					data:result.messageBody.detail
				});
				CMC.dialog('viewDictionaryType','open');
			}
		});
	});
	
	Dictionary.beforeAddDetailBoxShow = function(id){
		$("#addDetailForm").form("reset")
		CMC.dialog(id,'open');
		$("#addDetailForm").form("disableValidation");
	};
	
	Dictionary.submitAddDetailForm = function(){
		$("#addDetailForm").form("enableValidation");
		var isValid = $("#addDetailForm").form("validate");
		$("#typeId2").val($("#typeId").val());
		if(isValid){
			CMC.request({
				url: Dictionary.addDetailUrl,
				method: 'POST',
				data : $("#addDetailForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
//					CMC.search();
					$("#viewDictionaryButton").click();
					$("#addDetailForm").form("clear");
					CMC.dialog("addDictionaryDetail","close");
				}
			});
		}
	};
	
	Dictionary.beforeUpdateDetailBoxShow = function(){
		var record = CMC.grid.datagrid("getSelected");
		console.log(record);
	};
	
	Dictionary.modifyDetail = function(detailId,typeId,name,value,remark){
		$("#updateDetailForm").form("load",{
			'detailId' : detailId,
			'typeId' : typeId,
			'detailName' : name,
			'detailValue' : value,
			'detailRemark' : remark==null||remark=="null"?"":remark
		});
		CMC.dialog("updateDictionaryDetail","open");
	}
	
	Dictionary.deleteDetail = function(detailId){
		if(confirm("确认删除?")){
			CMC.request({
				url: Dictionary.deleteDetailUrl,
				method: 'POST',
				data : {"detailId":detailId},
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					$("#viewDictionaryButton").click();
				}
			});
		}
	}
	
	Dictionary.submitUpdateDetailForm = function(){
		$("#updateDetailForm").form("enableValidation");
		var isValid = $("#updateDetailForm").form("validate");
		if(isValid){
			CMC.request({
				url: Dictionary.updateDetailUrl,
				method: 'POST',
				data : $("#updateDetailForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
//					CMC.search();
					$("#viewDictionaryButton").click();
					$("#updateDetailForm").form("clear");
					CMC.dialog("updateDictionaryDetail","close");
				}
			});
		}
	};
	
	
})(jQuery);


$(document).ready(function(){
	CMC.init(Dictionary);
	console.log(CMC.pageConfig);
});
