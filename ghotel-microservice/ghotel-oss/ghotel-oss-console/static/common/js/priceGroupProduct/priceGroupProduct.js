/**
 * @Date 2016-06-16
 * @Desc首购有礼-移动各渠道活动
 */

var PriceGroupProduct =  {
		searchTableRequired: true,
		menuId: "PriceGroupProduct",
		searchUrl: "authorized/priceGroupProduct/getListAll" ,
		addUrl:'authorized/priceGroupProduct/add',
		getUrl: "authorized/priceGroupProduct/getId/",
		updateUrl: 'authorized/priceGroupProduct/update',
		deleteUrl: "authorized/priceGroupProduct/delete",
		getPriceGroupUrl:"authorized/priceGroupProduct/getPriceGroupId",
		groupId : '',
		columns :  [[
		    {field: 'pricegroupid', title:'运价产品ID' , width: '45%' , align: 'center'},
			{field: 'productid', title:'产品ID' , width: '50%' , align: 'center'}
		]]
	};	
(function($){

	/**
	 * 重置
	 */
	$("#clearCondition").click(function(){
		var start = $("#priceGroupProductSearchForm input[name='start']:hidden").val();
		var end = $("#priceGroupProductSearchForm input[name='end']:hidden").val();
		$('#priceGroupProductSearchForm').form('clear');
		$("#priceGroupProductSearchForm input[name='start']:hidden").val(start);
		$("#priceGroupProductSearchForm input[name='end']:hidden").val(end);
		//CMC.search();
	});

	//弹出添加窗口
	$("#searchFormAdd").click(function(){
		$("#priceGroupProductSaveForm").form("clear");
		$("#priceGroupProductSaveForm").form("disableValidation");
		CMC.dialog('winPriceGroupProductSave','open');
	});
	
	//更新信息并弹出窗口
	$("#searchFormUpdate").click(function(){
		CMC.dialog('winPriceGroupProductUpdate','open');
		$("#updatePriceGroupProductForm").form("disableValidation");
		$("#updatePriceGroupProductForm").form("clear");
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		$("#priceGroupProductUpdateForm").form("load",{
			'pricegroupid' : record['pricegroupid'],
			'productid' : record['productid']
		});
	});

	//提交新增信息
	$('#saveForm').click(function(){
		$("#addPriceGroupProductSaveForm").form("enableValidation");
		var isValid = $("#addPriceGroupProductSaveForm").form("validate");
		var pricegroupid = $("#addPriceGroupProductSaveForm input[name='pricegroupid']").val();
		var productid = $("#addPriceGroupProductSaveForm input[name='productid']").val();
		var reg = /^\w+$/;
		if(!reg.test(productid)){
			alert("请输入产品ID，限定字母、数字或下划线的组合");
			$("#productid").val("");
			return false;
		}
		if(isValid){
			CMC.request({
				url: PriceGroupProduct.addUrl,
				method: 'POST',
				data : $("#addPriceGroupProductSaveForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('winPriceGroupProductSave','close');
					$("#winPriceGroupProductSave").form("clear");
				}
			});
		}
	});
	
	
	//更新信息
	$('#updateForm').click(function(){
		$("#priceGroupProductUpdateForm").form("enableValidation");
		var isValid = $("#priceGroupProductUpdateForm").form("validate");
		var type = $("#priceGroupProductUpdateForm input[name='productid']").val();
		var reg = /^\w+$/;
		if(!reg.test(type)){
			alert("请输入产品ID，限定字母、数字或下划线的组合");
			$("#productid").val("");
			return false;
		}
		if(isValid){
			CMC.request({
				url: PriceGroupProduct.updateUrl,
				method: 'POST',
				data : $("#priceGroupProductUpdateForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.dialog('winPriceGroupProductUpdate','close');
					CMC.search();
					$("#winPriceGroupProductUpdate").form("clear");
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
		CMC.confirm("确定删除该运价产品映射管理信息?", function(r){
			if(r){
				CMC.request({
					url: PriceGroupProduct.deleteUrl  ,
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
		$("#winPriceGroupProductSave").dialog('close');
	});
	//关闭修改页面
	$("#updateCancel").click(function(){
		$("#winPriceGroupProductUpdate").dialog('close');
	});

	//初始化下拉框
	PriceGroupProduct.init = function(){
		CMC.request({
	        url : PriceGroupProduct.getPriceGroupUrl,
	        method: 'GET',
	        success: function(message){
	        	console.log(message);
	        	$("#priceGroupId_add").combobox({
	        		data: message.messageBody,
	        		panelHeight: '180px',
	        		valueField:'id',
	        		textField:'name'
	        	});
	        	$("#priceGroupId").combobox({
	        		data: message.messageBody,
	        		panelHeight: '180px',
	        		valueField:'id',
	        		textField:'name'
	        	});
	        	$("#priceGroupId_update").combobox({
	        		data: message.messageBody,
	        		panelHeight: '180px',
	        		valueField:'id',
	        		textField:'name'
	        	});
	    }});
	};
})(jQuery);

$(document).ready(function(){
	CMC.init(PriceGroupProduct);
});







