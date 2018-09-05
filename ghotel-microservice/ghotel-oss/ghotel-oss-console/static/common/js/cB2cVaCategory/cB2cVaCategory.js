/**
 * @Date 2016-06-16
 * @Desc类目管理
 */

var CB2cVaCategory =  {
		searchTableRequired: true,
		menuId: "CB2cVaCategory",
		searchUrl: "authorized/cB2cVaCategory/getAll" ,
		addUrl:'authorized/cB2cVaCategory/add',
		getUrl: "authorized/cB2cVaCategory/get/",
		updateUrl: 'authorized/cB2cVaCategory/update',
		deleteUrl: "authorized/cB2cVaCategory/delete",
		groupId : '',
		columns :  [[
 		    {field: 'id', title:'ID' , width: '20%' , align: 'center',hidden:'true'},
 		    {field: 'name', title:'类目名称' , width: '45%' , align: 'center'},
			{field: 'description', title:'备注' , width: '50%' , align: 'center'}
		]]
	};	
(function($){

	/**
	 * 重置
	 */
	$("#clearCondition").click(function(){
		var start = $("#cB2cVaCategorySearchForm input[name='start']:hidden").val();
		var end = $("#cB2cVaCategorySearchForm input[name='end']:hidden").val();
		$('#cB2cVaCategorySearchForm').form('clear');
		$("#cB2cVaCategorySearchForm input[name='start']:hidden").val(start);
		$("#cB2cVaCategorySearchForm input[name='end']:hidden").val(end);
		//CMC.search();
	});

	//弹出添加窗口
	$("#searchFormAdd").click(function(){
		$("#addCB2cVaCategorySaveForm").form("clear");
		$("#addCB2cVaCategorySaveForm").form("disableValidation");
		CMC.dialog('winCB2cVaCategorySave','open');
	});
	
	//更新信息并弹出窗口
	$("#searchFormUpdate").click(function(){
		CMC.dialog('winCB2cVaCategoryUpdate','open');
		$("#cB2cVaCategoryUpdateForm").form("disableValidation");
		$("#cB2cVaCategoryUpdateForm").form("clear");
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		$("#cB2cVaCategoryUpdateForm").form("load",{
			'id' : record['id'],
			'name' : record['name'],
			'description' : record['description']
		});
	});

	//提交新增信息
	$('#saveForm').click(function(){
		$("#addCB2cVaCategorySaveForm").form("enableValidation");
		var isValid = $("#addCB2cVaCategorySaveForm").form("validate");
		var pricegroupid = $("#addCB2cVaCategorySaveForm input[name='pricegroupid']").val();
		var productid = $("#addCB2cVaCategorySaveForm input[name='productid']").val();
		var reg = /^\w+$/;
		if(!reg.test(productid)){
			alert("请输入产品ID，限定字母、数字或下划线的组合");
			$("#productid").val("");
			return false;
		}
		if(isValid){
			CMC.request({
				url: CB2cVaCategory.addUrl,
				method: 'POST',
				data : $("#addCB2cVaCategorySaveForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('winCB2cVaCategorySave','close');
					$("#winCB2cVaCategorySave").form("clear");
				}
			});
		}
	});
	
	
	//更新信息
	$('#updateForm').click(function(){
		$("#cB2cVaCategoryUpdateForm").form("enableValidation");
		var isValid = $("#cB2cVaCategoryUpdateForm").form("validate");
		if(isValid){
			CMC.request({
				url: CB2cVaCategory.updateUrl,
				method: 'POST',
				data : $("#cB2cVaCategoryUpdateForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.dialog('winCB2cVaCategoryUpdate','close');
					CMC.search();
					$("#winCB2cVaCategoryUpdate").form("clear");
				}
			});
		}
	});

	//删除记录	
	$("#searchFormDelete").click(function (){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		CMC.confirm("确定删除该类目管理信息?", function(r){
			if(r){
				CMC.request({
					url: CB2cVaCategory.deleteUrl  ,
					method: 'POST',
					data : record,
					success: function(response){
						CMC.alertMessage(response.messageBody,'info');
						CMC.search();
					}
				});
			}
		});
	});

	//关闭添加页面
	$("#saveCancel").click(function(){
		$("#winCB2cVaCategorySave").dialog('close');
	});
	//关闭修改页面
	$("#updateCancel").click(function(){
		$("#winCB2cVaCategoryUpdate").dialog('close');
	});

	//初始化下拉框
	CB2cVaCategory.init = function(){
	};
})(jQuery);

$(document).ready(function(){
	CMC.init(CB2cVaCategory);
});







