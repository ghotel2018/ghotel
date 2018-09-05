/**
 * 机型字典管理
 */

var PlaneTypeLocale={
		searchTableRequired: true,
		menuId: "PlaneTypeLocale",
		addUrl: 'authorized/planeTypeLocale/add',
		updateUrl: 'authorized/planeTypeLocale/update',
		deleteUrl: 'authorized/planeTypeLocale/delete',
		searchUrl: "authorized/planeTypeLocale/getAll" ,
		getUrl: "authorized/planeTypeLocale/get",
		exportUrl:"authorized/planeTypeLocale/export",
		importUrl:"authorized/planeTypeLocale/import",
		columns:[[
			{field: 'planetype', title:'机型' , width: '5%' , align: 'center'},
			{field: 'locale', title:'语言' , width: '5%' , align: 'center'},
			{field: 'planetypename', title:'机型名' , width: '15%' , align: 'center'},
			{field: 'planetypepicture', title:'机型图片' , width: '15%' , align: 'center'},
			
		]],
		 onDblClickRow: function(){
        	// $("#planeTypeLocale_update").click();
        }
};

(function($){
	/**
	 * 重置
	 */
	$("#planeTypeLocale_reset").click(function(){
		
		$("#searchForm ").form('clear');
		$("#searchForm [name='start']").val('1');
		$("#searchForm [name='end']").val('10');
	});
	
	/*弹出添加窗口*/
	$("#planeTypeLocale_add").click(function(event) {
		$("#addForm").form('clear');
		CMC.dialog('addPlaneTypeLocaleDetail','open');
	});

	/*添加机型字典信息*/
	$("#submit_add").click(function(event) {
		$("#addForm").form("enableValidation");
		var isValid = $("#addForm").form("validate");

		if (isValid) {
					
			CMC.request({
				url: PlaneTypeLocale.addUrl,
				method: 'POST',
				data : $("#addForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('addPlaneTypeLocaleDetail','close');
					$("#addForm").form("clear");
				}
			});
		}
	});

	/*弹出编辑窗口*/
	$("#planeTypeLocale_update").click(function(event) {
		var code = CMC.grid.datagrid("getSelected");
		if(!code){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		var font=$("#updateForm font");
		font.hide();
		CMC.request({
				url: PlaneTypeLocale.getUrl +"/"+ code["planetype"]+"/"+code["locale"],
				method: 'get',
				success: function(result){
					
					$("#updateForm").form("load",{
						// 'planetype' : result.messageBody.bean['planetype'],
						// 'locale' : result.messageBody.bean['locale'],
						// 'planetypename' : result.messageBody.bean['planetypename'],
						'planetype' : result.messageBody['planetype'],
						'locale' : result.messageBody['locale'],
						'planetypename' : result.messageBody['planetypename'],
						'input_planetype': result.messageBody['planetype'],
						'input_locale':result.messageBody['locale'],
					});
				}
			});
			// $("#updateForm .easyui-combobox").combobox({'disabled':true}); 
			$("#locale_edit").combobox({"disabled":true});
			$("#updateForm :input").prop({disabled: true});
			$("#submit_update").linkbutton({'disabled':true});
			CMC.dialog('editPlaneTypeLocaleDetail','open');
	});

	/*启用编辑*/
	$("#submit_edit").click(function(event) {
		$("#updateForm font").show();
		// $("#submit_update").removeAttr('disabled');
		// $('#updateForm .easyui-combobox').combobox('enable'); 
		$("#submit_update").linkbutton({'disabled':false});
		$("#updateForm :input").removeAttr('disabled');
		$("#locale_edit").combobox('disable'); 
		$("#updateForm #planetype").prop({'disabled': true});
	});

	/*更新机型信息*/
	$("#submit_update").click(function(){
		var isValid = $("#updateForm").form("validate");

		if (isValid) {
			
			CMC.request({
				url: PlaneTypeLocale.updateUrl,
				method: 'POST',
				data : $("#updateForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
				}
			});
		}
	});

	/*删除机型*/
	$("#planeTypeLocale_delete").click(function(event) {
		var code = CMC.grid.datagrid("getSelected");
		if(!code){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		CMC.confirm("确定删除信息?", function(r){
		  if(r){
				CMC.request({
						url: PlaneTypeLocale.deleteUrl,
						method: 'POST',
						data : code,
						success: function(result){
							CMC.alertMessage(result.messageBody,'info');
							CMC.search();
						}
				});
			}
		});
	});

	/*机型信息导出*/
	$("#planeTypeLocale_export").click(function(event) {
		CMC.request({
				url: PlaneTypeLocale.exportUrl,
				method: 'POST',
				data : $("#searchForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
				}
		});
	});

	/*打开导入窗口*/
	$("#planeTypeLocale_import").linkbutton({
		'onClick':function(){

			$("#planeTypeLocaleImportForm").form('clear');
			CMC.dialog('planeTypeLocaleImportDetail','open');
		}
	});

	/*模板下载*/
	$("#planeTypeLocaleLink_Template").click(function(event) {
		window.open(encodeURI("/cmc/download/PlaneTypeLOcaleTemplate.xlsx"));
	});

	/*上传*/
	$("#planeTypeLocaleInfo_import").linkbutton({
		'onClick':function(){
			var val=$("#planeTypeLocaleInfo").val();
			if(val==""){
				CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
				return;
			}
			if(val && val != "" && (val.indexOf("xls")==-1 && val.indexOf("xlsx")==-1 && val.indexOf("csv")==-1) ){
				CMC.alertMessage("请选择excel文件。",'warn');
				return ;
			}
			CMC.confirm("是否确认导入文件?",function(r){
				if(r){
					 CMC.showProcessBox();
					CMC.fileUpload({
						url: PlaneTypeLocale.importUrl,
						type: "POST",
						dataType: "json",
						fileElementId:  "planeTypeLocaleInfoFile",
					    // data: $("#cityListImportForm").form().serialize(),
					    asyc: true,
					    timeout: 600000,
					  	success: function(response){
					  		try{
						  		 CMC.hideProcessBox();
						  		CMC.alertMessage(response.messageBody, 'info',CMC.search());
				  			}catch(e){
					  		}
					  	},
					  	error: function(){
					  		try{
						  		CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
						  		 CMC.hideProcessBox();
					  		}catch(e){}
					  	},complete: function(){
					  		try{
					  			 CMC.hideProcessBox();
					  		}catch(e){}
					  	}
					});
				}
			});
		}
	});

})(jQuery);

$(document).ready(function(){
	CMC.init(PlaneTypeLocale);	
});

$.extend($.fn.validatebox.defaults.rules, {    
    threeCodeValid: {    
        validator: function(value, param){  
        	var regEx=/^[A-Z0-9]{3}$/; 
            return regEx.test(value);    
        },    
        message: '请输入大写机型三字码！'
    }  
});



