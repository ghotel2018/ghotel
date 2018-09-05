/**
 * @Date 2017-06-19
 * @Desc 产品管理
 */

var CB2cVaProduct =  {
		searchTableRequired: true,
		menuId: "CB2cVaProduct",
		searchUrl: "authorized/cB2cVaProduct/getAll" ,
		addUrl:'authorized/cB2cVaProduct/add',
		getUrl: "authorized/cB2cVaProduct/get/",
		updateUrl: 'authorized/cB2cVaProduct/update',
		deleteUrl: "authorized/cB2cVaProduct/delete",
		getCategoryList:"authorized/cB2cVaCategory/getCategoryList",
		groupId : '',
		columns :  [[
			{field: 'name', title:'名称' , width: '10%' , align: 'center'},
			{field: 'supplierCode', title:'供应商代码' , width: '10%' , align: 'center'},
			{field: 'supplierName', title:'供应商名称' , width: '10%' , align: 'center'},
			{field: 'categoryName', title:'类目名称' , width: '10%' , align: 'center'},
			{field: 'inventory', title:'库存' , width: '15%' , align: 'center'},
			{field: 'restriction', title:'销售限制' , width: '15%' , align: 'center'},
			{field: 'description', title:'备注' , width: '25%' , align: 'center'},
			{field: 'id', title:'ID' , width: '0%' , align: 'center',hidden:'true'},
			{field: 'unit', title:'unit' , width: '0%' , align: 'center',hidden:'true'},
			{field: 'price', title:'price' , width: '0%' , align: 'center',hidden:'true'}
		]]
	};	
(function($){

	/**
	 * 重置
	 */
	$("#clearCondition").click(function(){
		var start = $("#cB2cVaProductSearchForm input[name='start']:hidden").val();
		var end = $("#cB2cVaProductSearchForm input[name='end']:hidden").val();
		$('#cB2cVaProductSearchForm').form('clear');
		$("#cB2cVaProductSearchForm input[name='start']:hidden").val(start);
		$("#cB2cVaProductSearchForm input[name='end']:hidden").val(end);
		//CMC.search();
	});

	//弹出添加窗口
	$("#searchFormAdd").click(function(){
		$("#addCB2cVaProductSaveForm").form("clear");
		$("#addCB2cVaProductSaveForm").form("disableValidation");
		CMC.dialog('winCB2cVaProductSave','open');
	});
	
	//更新信息并弹出窗口
	$("#searchFormUpdate").click(function(){
		CMC.dialog('winCB2cVaProductUpdate','open');
		$("#cB2cVaProductUpdateForm").form("disableValidation");
		$("#cB2cVaProductUpdateForm").form("clear");
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		$("#cB2cVaProductUpdateForm").form("load",{
			'id' : record['id'],
			'name' : record['name'],
			'unit' : record['unit'],
			'price' : record['price'],
			'inventory' : record['inventory'],
			'categoryId' : record['categoryId'],
			'restriction' : record['restriction'],
			'description' : record['description'],
			'supplierCode' : record['supplierCode'],
			'supplierName' : record['supplierName']
		});
	});

	//提交新增信息
	$('#saveForm').click(function(){
		$("#addCB2cVaProductSaveForm").form("enableValidation");
		var isValid = $("#addCB2cVaProductSaveForm").form("validate");
		var id = $("#addCB2cVaProductSaveForm input[name='id']").val();
		var reg = /^\w+$/;
		if(!reg.test(id)){
			alert("请输入产品ID，限定字母、数字或下划线的组合");
			$("#id").val("");
			return false;
		}
		console.log(isValid);
		if(isValid){
			CMC.request({
				url: CB2cVaProduct.addUrl,
				method: 'POST',
				data : $("#addCB2cVaProductSaveForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('winCB2cVaProductSave','close');
					$("#winCB2cVaProductSave").form("clear");
				}
			});
		}
	});
	
	
	//更新信息
	$('#updateForm').click(function(){
		$("#cB2cVaProductUpdateForm").form("enableValidation");
		var isValid = $("#cB2cVaProductUpdateForm").form("validate");
		if(isValid){
			CMC.request({
				url: CB2cVaProduct.updateUrl,
				method: 'POST',
				data : $("#cB2cVaProductUpdateForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.dialog('winCB2cVaProductUpdate','close');
					CMC.search();
					$("#winCB2cVaProductUpdate").form("clear");
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
					url: CB2cVaProduct.deleteUrl  ,
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
		$("#winCB2cVaProductSave").dialog('close');
	});
	//关闭修改页面
	$("#updateCancel").click(function(){
		$("#winCB2cVaProductUpdate").dialog('close');
	});

	//初始化下拉框
	CB2cVaProduct.init = function(){
		CMC.request({
	        url : CB2cVaProduct.getCategoryList,
	        method: 'GET',
	        success: function(message){
	        	console.log(message);
	        	$("#categoryId_add").combobox({
	        		data: message.messageBody,
	        		panelHeight: '180px',
	        		valueField:'id',
	        		textField:'name'
	        	});
	        	$("#categoryId").combobox({
	        		data: message.messageBody,
	        		panelHeight: '180px',
	        		valueField:'id',
	        		textField:'name'
	        	});
	        	$("#categoryId_update").combobox({
	        		data: message.messageBody,
	        		panelHeight: '180px',
	        		valueField:'id',
	        		textField:'name'
	        	});
	    }});
	};
})(jQuery);

$(document).ready(function(){
	CMC.init(CB2cVaProduct);
});







