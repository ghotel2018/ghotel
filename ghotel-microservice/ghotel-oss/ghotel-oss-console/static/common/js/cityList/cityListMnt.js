var CityList={
		searchTableRequired: true,
		menuId: "CityList",
		addUrl: 'authorized/cityList/add',
		updateUrl: 'authorized/cityList/update',
		deleteUrl: 'authorized/cityList/delete',
		searchUrl: "authorized/cityList/getAll" ,
		getUrl: "authorized/cityList/get",
		getComboboxListUrl: "authorized/cityList/getComboboxList",
		exportUrl:"authorized/cityList/export",
		importUrl:"authorized/cityList/import",
		columns:[[
			{field: 'code', title:'三字码' , width: '4%' , align: 'center'},
			{field: 'locale', title:'语言' , width: '5%' , align: 'center'},
			{field: 'name', title:'城市名' , width: '8%' , align: 'center'},
			{field: 'aliasname', title:'别名' , width: '8%' , align: 'center'},
			{field: 'region', title:'地区' , width: '5%' , align: 'center'},
			{field: 'international', title:'国别' , width: '6%' , align: 'center'},
			{field: 'currencyCode', title:'货币代码' , width: '6%' , align: 'center'},
			{field: 'openeticket', title:'电子客票' , width: '6%' , align: 'center',formatter: function(value){
			        	   if(value=="Y"){
			        		   return '开通';
			        	   }else if(value=="N"){
				        	   return "未开通";
			        	   }
			           }},
			{field: 'continents', title:'所属大洲' , width: '8%' , align: 'center'},
			{field: 'province', title:'所属省份' , width: '7%' , align: 'center'},
			{field: 'county', title:'所在市/县' , width: '6%' , align: 'center'},
			{field: 'countryCode', title:'国家二字码' , width: '9%' , align: 'center'},
			{field: 'enable', title:'是否生效' , width: '6%' , align: 'center',formatter: function(value){
			        	   if(value=="Y"){
			        		   return '生效';
			        	   }else if(value=="N"){
				        	   return "未生效";
			        	   }
			           }},
			{field: 'popular', title:'是否热门' , width: '6%' , align: 'center',formatter: function(value){
			        	   if(value=="Y"){
			        		   return '热门';
			        	   }else if(value=="N"){
				        	   return "非热门";
			        	   }
			           }},
			{field: 'workDate', title:'生效日期' , width: '8%' , align: 'center'},
		]],
		 onDblClickRow: function(){
        	// $("#cityListList_update").linkbutton();
        }
};

(function($){
	/**
	 *重置
	 */
	$("#cityList_reset").click(function(event) {
		// $("#input_code").textbox('setValue','');
		// $("#input_name").textbox('setValue','');
		$("#searchForm").form("clear");
		$("#searchForm [name='start']").val('1');
		$("#searchForm [name='end']").val('10');
	});

	/**
	 * 弹出添加窗口
	 */
	$("#cityList_add").linkbutton({
		"onClick":function(){
				CMC.request({
					url: CityList.getComboboxListUrl,
					method: 'get',
					success: CityList.loadCombobox
				});
			$("#addForm").form('clear');
			$("#addForm #popular").combobox('select','N');
			CMC.dialog('addCityListDetail','open');
		}	
	});

	//添加
	$("#submit_add").linkbutton({
		'onClick':function(){
			CMC.request({
				url: CityList.addUrl,
				method: 'post',
				data: $("#addForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('addCityListDetail','close');
					$("#addForm").form("clear");
				}
			});
		}
	});

	//打开编辑窗口
	$("#cityList_update").linkbutton({
		'onClick':function(){
			var code = CMC.grid.datagrid("getSelected");
			if(!code){
				CMC.alertMessage("请先选中一条记录！","warning");
				return;
			}
			var font=$("#updateForm font");
			font.hide();
			CMC.request({
				url: CityList.getUrl +"/"+ code["code"]+"/"+code["locale"],
				method: 'get',
				success: function(result){
					$("#edit_region").combobox({
						data: result.messageBody.regionList,
						panelHeight: '120px',
						valueField:'code',
						textField:'name' 
					});	
					$("#edit_countryCode").combobox({
						data: result.messageBody.countryList,
							panelHeight: '120px',
							valueField:'code',
							textField:'name'
					});

					$("#updateForm").form("load",{
						'code' : result.messageBody.bean['code'],
						'locale' : result.messageBody.bean['locale'],
						'name' : result.messageBody.bean['name'],
						'aliasname' : result.messageBody.bean['aliasname'],
						'international' : result.messageBody.bean['international'],
						'openeticket' : result.messageBody.bean['openeticket'],
						'currencyCode' : result.messageBody.bean['currencyCode'],
						'pinyin' : result.messageBody.bean['pinyin'],
						'region' : result.messageBody.bean['region'],
						'countryCode' : result.messageBody.bean['countryCode'],
						'continents' : result.messageBody.bean['continents'],
						'province' : result.messageBody.bean['province'],
						'county' : result.messageBody.bean['county'],
						'popular' : result.messageBody.bean['popular'],
						'workDate' : result.messageBody.bean['workDate'],
						'enable' : result.messageBody.bean['enable'],
						'input_code' : result.messageBody.bean['code'],
						'input_locale': result.messageBody.bean['locale'],
					});
				}
			});
			$("#updateForm .easyui-combobox").combobox({'disabled':true}); 
			$("#updateForm :input").prop({disabled: true});
			$("#submit_update").linkbutton({'disabled':true});
			$("#updateForm .easyui-datebox").datebox({'disabled':true});
			CMC.dialog('editCityListDetail','open');
		}
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
		$("#updateForm .easyui-datebox").datebox('enable');
	});

	/**
	 *提交更新
	 */
	$("#submit_update").linkbutton({
		'onClick':function(){
			var isValid = $("#updateForm").form("validate");

			if (isValid) {
				
				var data=$("#updateForm").serialize();
				
				CMC.request({
					url: CityList.updateUrl,
					method: 'POST',
					data : $("#updateForm").form().serialize(),
					success: function(result){
						CMC.alertMessage(result.messageBody,'info');
						CMC.search();
						// CMC.dialog('addcityListDetail','close');
						// $("#updateForm").form("clear");
					}
				});
			}
		}
	});

	CityList.loadCombobox=function(result){
					$("#add_region").combobox({
							data: result.messageBody.regionList,
							panelHeight: '120px',
							valueField:'code',
							textField:'name' 
					});	
					$("#add_countryCode").combobox({
						data: result.messageBody.countryList,
							panelHeight: '120px',
							valueField:'code',
							textField:'name'
					});
				}
	/*删除*/
	$("#cityList_delete").click(function(event) {
		var record = CMC.grid.datagrid("getSelected");
			if(!record){
				CMC.alertMessage("请先选中一条记录！","warning");
				return;
			}
			 CMC.confirm("确定删除城市信息?", function(r){
				  if(r){
					  CMC.request({
							url: CityList.deleteUrl,
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

	 //导出
	 $("#cityList_export").linkbutton({
	 	'onClick':function(){
	 		 CMC.request({
					url: CityList.exportUrl,
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
	 $("#cityList_import").linkbutton({
	 	'onClick':function(){
	 		$("#cityListImportForm").form('clear');
			CMC.dialog('cityListImportDetail','open');
	 	}
	 });

	 $("#CityListLink_Template").click(function(event) {
	 	window.open(encodeURI("/cmc/download/CityListTemplate.xlsx"));
	 });

	/*上传*/
	 $("#cityListInfo_import").linkbutton({
		 	'onClick':function(){
		 		var val=$("#cityListInfo").val();
				if(val==""){
					CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
					return;
				}
				//判断文件后缀
				var fileUrl=$("#cityListInfo").val();
				if(fileUrl && fileUrl != "" && (fileUrl.indexOf("xls")==-1 && fileUrl.indexOf("xlsx")==-1 && fileUrl.indexOf("csv")==-1) ){
					CMC.alertMessage("请选择excel文件。",'warn');
					return ;
				}
				CMC.confirm("是否确认导入文件?",function(r){
					if(r){
						 CMC.showProcessBox();
						CMC.fileUpload({
							url: CityList.importUrl,
							type: "POST",
							dataType: "json",
							fileElementId:  "cityListInfoFile",
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
	CMC.init(CityList);	
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
    },
    currencyCodeValid:{
    	validator: function(value, param){  
        	var regEx=/^[A-Z]{3}$/;
            return regEx.test(value);    
        },
        message: '请输入大写三字货币代码！'
    },
    pinyinValid:{
    	validator:function(value, param){
    		var regEx=/^[a-zA-Z]{2,50}$/;
    		return regEx.test(value); 
    	},
    	message:'请输入拼音，长度为2-50！'
    }
});