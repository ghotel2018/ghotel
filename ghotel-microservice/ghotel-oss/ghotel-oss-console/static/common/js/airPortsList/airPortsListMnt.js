/**
 * 机场字典管理
 */

var AirPortsList={
		searchTableRequired: true,
		menuId: "AirPortsList",
		addUrl: 'authorized/airPortsList/add',
		updateUrl: 'authorized/airPortsList/update',
		deleteUrl: 'authorized/airPortsList/delete',
		searchUrl: "authorized/airPortsList/getAll" ,
		getUrl: "authorized/airPortsList/get",
		getRegionListUrl: "authorized/airPortsList/getRegionList",
		exportUrl:"authorized/airPortsList/export",
		importUrl:"authorized/airPortsList/import",
		columns:[[
			{field: 'code', title:'三字码' , width: '5%' , align: 'center'},
			{field: 'locale', title:'语言' , width: '5%' , align: 'center'},
			{field: 'name', title:'机场名' , width: '15%' , align: 'center'},
			{field: 'aliasname', title:'别名' , width: '15%' , align: 'center'},
			{field: 'airzhname', title:'中文名' , width: '10%' , align: 'center'},
			{field: 'region', title:'地区' , width: '6%' , align: 'center'},
			{field: 'city', title:'城市三字码' , width: '8%' , align: 'center'},
			{field: 'international', title:'国别' , width: '8%' , align: 'center'},
			{field: 'openeticket', title:'电子客票' , width: '8%' , align: 'center',formatter: function(value){
			        	   if(value=="Y"){
			        		   return '开通';
			        	   }else if(value=="N"){
				        	   return "未开通";
			        	   }
			           }},
			{field: 'barflag', title:'大巴' , width: '6%' , align: 'center',formatter: function(value){
			        	   if(value=="Y"){
			        		   return '大巴';
			        	   }else if(value=="N"){
				        	   return "非大巴";
			        	   }
			           }},
			{field: 'trafficType', title:'交通标识' , width: '6%' , align: 'center'},
		]],
		 onDblClickRow: function(){
        	$("#airPortsList_update").click();
        }
};
(function($){
	/**
	 * 重置
	 */
	$("#airPortsList_reset").click(function(){
		// $("#input_code").textbox('setValue','');
		// $("#input_name").textbox('setValue','');
		// $("#input_airzhname").textbox('setValue','');
		// $("#select_international").combobox('select','');
		$("#searchForm ").form('clear');
		$("#searchForm [name='start']").val('1');
		$("#searchForm [name='end']").val('10');
	});
	
	
	$("#airPortsList_update").click(function(){
		$("#updateForm").form('clear');
		var code = CMC.grid.datagrid("getSelected");
		if(!code){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		var font=$("#updateForm font");
		font.hide();	

		// CMC.dialog('editAirPortsListDetail','open');
		CMC.request({
			url: AirPortsList.getUrl +"/"+ code["code"]+"/"+code["locale"],
			method: 'get',
			success: function(result){
				$("#update_region").combobox({
						data: result.messageBody.regionList,
						panelHeight: '120px',
						valueField:'code',
						textField:'name' 
				});
				$("#updateForm").form("load",{
					'code' : result.messageBody.bean['code'],
					'locale' : result.messageBody.bean['locale'],
					'name' : result.messageBody.bean['name'],
					'aliasname' : result.messageBody.bean['aliasname'],
					'airzhname' : result.messageBody.bean['airzhname'],
					'city' : result.messageBody.bean['city'],
					'international' : result.messageBody.bean['international'],
					'openeticket' : result.messageBody.bean['openeticket'],
					'region' : result.messageBody.bean['region'],
					'barflag' : result.messageBody.bean['barflag'],
					'trafficType' : result.messageBody.bean['trafficType'],
					'input_code' : result.messageBody.bean['code'],
					'input_locale': result.messageBody.bean['locale'],
				});

				$("#updateForm .easyui-combobox").combobox('disable'); 
				$("#updateForm :input").prop({disabled: true});
				$("#submit_update").linkbutton({'disabled':true});
				CMC.dialog('editAirPortsListDetail','open');
			}
		});
	});
	
	/**
	 *启用编辑
	 */
	$("#submit_edit").click(function(event) {
		$("#updateForm font").show();
		$("#submit_update").removeAttr('disabled');
		$('#updateForm .easyui-combobox').combobox('enable'); 
		$("#submit_update").linkbutton({'disabled':false});
		$("#updateForm :input").removeAttr('disabled');
		$("#updateForm #code").prop({disabled: true});
		$("#locale_edit").combobox('disable'); 
	});

	/**
	 *提交更新
	 */
	$("#submit_update").linkbutton({'onClick':function(){
			var isValid = $("#updateForm").form("validate");

			if (isValid) {
				
				var data=$("#updateForm").serialize();
				//alert($("#updateForm").form().serialize());
				CMC.request({
					url: AirPortsList.updateUrl,
					method: 'POST',
					data : $("#updateForm").form().serialize(),
					success: function(result){
						CMC.alertMessage(result.messageBody,'info');
						CMC.search();
						// CMC.dialog('addAirPortsListDetail','close');
						// $("#updateForm").form("clear");
					}
				});
			}
		}
	});

	/**
	 * 弹出添加窗口
	 */
	$("#airPortsList_add").click(function(){
//		$("#addForm").form("enableValidation");
//		var isValid = $("#addForm").form("validate");
		
		CMC.request({
			url: AirPortsList.getRegionListUrl,
			method: 'get',
			success: function(result){
				$("#add_region").combobox({
						data: result.messageBody.regionList,
						panelHeight: '120px',
						valueField:'code',
						textField:'name' 
				});	
			}
		});
		$("#addForm").form('clear');
		CMC.dialog('addAirPortsListDetail','open');
	});
	
	/**
	 * 添加机场
	 */
	$("#submit_add").click(function(){
		$("#addForm").form("enableValidation");
		var isValid = $("#addForm").form("validate");

		if (isValid) {
			
			var data=$("#addForm").serialize();
			
			CMC.request({
				url: AirPortsList.addUrl,
				method: 'POST',
				data : $("#addForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('addAirPortsListDetail','close');
					$("#addForm").form("clear");
				}
			});
		}
		
	});

	/**
	 *
	 */
	 $("#airPortsList_delete").linkbutton({
	 	'onClick':function(){
	 		var record = CMC.grid.datagrid("getSelected");
			if(!record){
				CMC.alertMessage("请先选中一条记录！","warning");
				return;
			}
			 CMC.confirm("确定删除机场信息?", function(r){
				  if(r){
					  CMC.request({
							url: AirPortsList.deleteUrl  ,
							method: 'POST',
							data : record,
							success: function(response){
								CMC.alertMessage(response.messageBody,'info');
								CMC.search();
							}
						});
				  }
			  });
	 	}
	});


	 //导出
	 $("#airPortsList_export").linkbutton({
	 	'onClick':function(){
	 		 CMC.request({
					url: AirPortsList.exportUrl  ,
					method: 'POST',
					data : $('#searchForm').form().serialize(),
					success: function(response){
						CMC.alertMessage(response.messageBody,'info');
						CMC.search();
					}
				});
		  }
	 });

	 //打开导入窗口
	 $("#airPortsList_import").linkbutton({
	 	'onClick':function(){
	 		$("#airPortsListImportForm").form('clear');
			CMC.dialog('airPortsListImportDetail','open');
	 	}
	 });

	 $("#airPortsListLink_Template").click(function(event) {
	 	window.open(encodeURI("/cmc/download/AirPortsListTemplate.xlsx"));
	 });

	 $("#airPortsListInfo_import").linkbutton({
	 	'onClick':function(){
	 		var val=$("#airPortsListInfo").val();
			if(val==""){
				CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
				return;
			}
			//判断文件后缀
			var fileUrl=$("#airPortsListInfo").val();
			if(fileUrl && fileUrl != "" && (fileUrl.indexOf("xls")==-1 && fileUrl.indexOf("xlsx")==-1 && fileUrl.indexOf("csv")==-1) ){
				CMC.alertMessage("请选择excel文件。",'warn');
				return ;
			}
			CMC.confirm("是否确认导入文件?",function(r){
				if(r){
					 CMC.showProcessBox();
					CMC.fileUpload({
						url: AirPortsList.importUrl,
						type: "POST",
						dataType: "json",
						fileElementId:  "airPortsListInfoFile",
					    // data: $("#airPortsListImportForm").form().serialize(),
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
	CMC.init(AirPortsList);	
});

$.extend($.fn.validatebox.defaults.rules, {    
    threeCodeValid: {    
        validator: function(value, param){  
        	var regEx=/^[A-Z]{3}$/; 
            return regEx.test(value);    
        },    
        message: '请输入大写机场三字码！'
    },
    twoCodeValid :{
    	 validator: function(value, param){  
        	var regEx=/^[A-Z]{2}$/;
            return regEx.test(value);    
        },    
        message: '请输入大写国家二字码！'
    }   
});










