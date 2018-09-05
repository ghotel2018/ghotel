
var ShippingSpace = {
		searchTableRequired: true, 
		menuId : 'ShippingSpace',
		searchUrl: "authorized/shippingSpace/getAll" , //如果searchTableRequired 是 true 必填
		addUrl: "authorized/shippingSpace/add" , 
		deleteUrl: "authorized/shippingSpace/delete" , 
		updateUrl: "authorized/shippingSpace/update" , 
		getOCNameUrl: "authorized/shippingSpace/getOCName" , 
		getpCabinNameUrl: "authorized/shippingSpace/getpCabinName" , 
		importUrl:'authorized/shippingSpace/importReport',
		columns :  [[
		               {field: 'id', title:'id' , width: '15%' , align: 'center' , hidden:'true'},
		               {field: 'ocId', title:'对应航空公司id' , width: '15%' , align: 'center' , hidden:'true'},
		               {field: 'pcabinId', title:'对应物理舱位id' , width: '15%' , align: 'center' , hidden:'true'},
			           {field: 'ocName', title:'OC方' , width: '15%' , align: 'center'},
			           {field: 'pCabinName', title:'物理舱位' , width: '10%' , align: 'center'},
			           {field: 'cabinName', title:'舱位' , width: '15%' , align: 'center'},
			           {field: 'saleDateFrom', title:'销售有效日期' , width: '16%' , align: 'center',
			        	   formatter: function(value,row,index){
			        		   if (value!=null){
			        			   return value+" | "+row.saleDateTo;
			        		   }
			        	   }
			           },
			           {field: 'enableDateFrom', title:'航班有效日期' , width: '16%' , align: 'center',
			        	   formatter: function(value,row,index){
			        		   if (value!=null){
			        			   return value+" | "+row.enableDateTo;
			        		   }
			        	   }
			           }
		           ]]
};

(function($){
	
	$("#clearCondition").click(function(){
		var start= $("#shippingSpaceSearchForm input[name='start']:hidden").val();
		var end=$("#shippingSpaceSearchForm input[name='end']:hidden").val();
		$('#shippingSpaceSearchForm').form('clear');
		$("#shippingSpaceSearchForm input[name='start']:hidden").val(start);
		$("#shippingSpaceSearchForm input[name='end']:hidden").val(end);
		CMC.search();
	});
	
	
	$('#showAddForm').click(function(){
		$('#addShippingSpaceForm').form('disableValidation');
		$('#addShippingSpaceForm').form('reset');
		
		CMC.request({
	        url:ShippingSpace.getOCNameUrl,
	        method: 'GET',
	        success: function(message){
	            $("#ocId").combobox({
	                data: message.messageBody,
	                panelHeight: '180px',
	                valueField:'OC_ID',
	                textField:'OC_NAME'
	            });
	    }});
		
		CMC.request({
	        url:ShippingSpace.getpCabinNameUrl,
	        method: 'GET',
	        success: function(message){
	            $("#pCabinId").combobox({
	                data: message.messageBody,
	                panelHeight: '100px',
	                valueField:'P_CABIN_ID',
	                textField:'P_CABIN_NAME'
	            });
	    }});
		
		CMC.dialog('addshippingSpaceDialog','open');
		
	});
	
	
	$("#searchFormUpdate").click(function(){
		
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请选择一条记录!", '提示');
			return;
		}
		$('#updateShippingSpaceForm').form('disableValidation');
		$('#updateShippingSpaceForm').form('reset');

		CMC.dialog('updateshippingSpaceDialog','open');
		CMC.request({
	        url:ShippingSpace.getOCNameUrl,
	        method: 'GET',
	        success: function(message){
	            $("#updateocId").combobox({
	                data: message.messageBody,
	                panelHeight: '180px',
	                valueField:'OC_ID',
	                textField:'OC_NAME'
	            });
	            $('#updateocId').combobox('setValue',record.ocId);
	            $('#updateocId').combobox('setText',record.ocName);
	    }});
		
		CMC.request({
	        url:ShippingSpace.getpCabinNameUrl,
	        method: 'GET',
	        success: function(message){
	            $("#updatepCabinId").combobox({
	                data: message.messageBody,
	                panelHeight: '100px',
	                valueField:'P_CABIN_ID',
	                textField:'P_CABIN_NAME'
	            });
	            $('#updatepCabinId').combobox('setValue',record.pcabinId);
	            $('#updatepCabinId').combobox('setText',record.pCabinName);
	    }});
		$('#updatecabinName').textbox('setValue',record.cabinName);
		$('#updatesaleDateFrom').datebox('setValue',record.saleDateFrom);
		$('#updatesaleDateTo').datebox('setValue',record.saleDateTo);
		$('#updateenableDateFrom').datebox('setValue',record.enableDateFrom);
		$('#updateenableDateTo').datebox('setValue',record.enableDateTo);
		$('#id').val(record.id);
		
	});
	
	
	$("#download_template_shippingSpace").click(function(){
		window.open(encodeURI("/cmc/download/shippingSpaceTemplate.xls"));
	});
	
	$('#addShippingSpace').click(function(){
		$('#addShippingSpaceForm').form('enableValidation');
		if($('#addShippingSpaceForm').form('validate')){
			CMC.confirm("确认增加?" , function(r){
					if(r){
							CMC.request({
								method: "POST",
								url: ShippingSpace.addUrl,
								data: $('#addShippingSpaceForm').form().serialize(),
							  	success: function(result){
							  		CMC.alertMessage(result.messageBody, 'info',CMC.search);
							  		CMC.dialog('addshippingSpaceDialog','close');
							  	}
							});
					}
				
				});
		}
	});
	
	
	$('#updateShippingSpace').click(function(){
		var ocId = $("#updateocId").combobox('getValue');
		var pCabinId = $("#updatepCabinId").combobox('getValue');
		var cabinName = $("#updatecabinName").textbox('getValue');
		var saleDateFrom =  $("#updatesaleDateFrom").datebox('getValue');	
		var saleDateTo =  $("#updatesaleDateTo").datebox('getValue');
		var enableDateFrom =  $("#updateenableDateFrom").datebox('getValue');
		var enableDateTo =  $("#updateenableDateTo").datebox('getValue');
		var id =  $("#id").val();
		$('#updateShippingSpaceForm').form('enableValidation');
		if($('#updateShippingSpaceForm').form('validate')){
			CMC.confirm("确认修改?" , function(r){
					if(r){
							CMC.request({
								method: "POST",
								url: ShippingSpace.updateUrl,
								data: {
									'ocId':ocId,
					            	'pCabinId':pCabinId,
					            	'cabinName':cabinName,
					            	'saleDateFrom':saleDateFrom,
					            	'saleDateTo':saleDateTo,
					                'enableDateFrom':enableDateFrom,
					                'enableDateTo':enableDateTo,
					                'id':id
								},
							  	success: function(result){
							  		CMC.alertMessage(result.messageBody, 'info',CMC.search);
							  		CMC.dialog('addshippingSpaceDialog','close');
							  	}
							});
					}
				
				});
		}
	});
	
	
	$('#deleteRecord').click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请选择要删除的记录！",'warn');
			return;
		}
		CMC.confirm("请确认是否删除?", function(r){
			if(r){
				CMC.request({
					method: "POST",
					url: ShippingSpace.deleteUrl,
					data: record,
				  	success: function(result){
				  		CMC.alertMessage(result.messageBody, 'info',CMC.search);
				  	}
				});
			}
		});
	});
	
	
	$("#ShippingSpace_Import").click(function(){
		$("#shippingSpaceInfo").textbox('setValue','');
		$("#shippingSpaceImport").dialog("open");
		CMC.dialog('addshippingSpaceDialog','close');
	});
	
	
	$("#shippingSpaceInfo_import").click(function(){
		var val=$("#shippingSpaceInfo").val();
		if(val==""){
			CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
			return;
		}
		//判断文件后缀
		var fileUrl=$("#shippingSpaceInfo").val();
		if(fileUrl && fileUrl != "" && (fileUrl.indexOf("xls")==-1 && fileUrl.indexOf("xlsx")==-1 && fileUrl.indexOf("csv")==-1) ){
			CMC.alertMessage("请选择excel文件。",'warn');
			return ;
		}
		
		var data={"shippingSpaceInfoFile":val};
		
		ShippingSpace.fileUpload(data,ShippingSpace.importUrl,"#shippingSpaceImportForm","shippingSpaceInfoFile");
	});
	
	ShippingSpace.fileUpload = function(data,url,formId,ind){

		CMC.confirm("是否确认导入文件?",function(r){
			if(r){
				 CMC.showProcessBox();
				 CMC.fileUpload({
					url: url,
					type: "POST",
					dataType: "json",
					fileElementId:  "shippingSpaceInfoFile",
				    data: data,
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
	};
	
	ShippingSpace.init=function () {
		ShippingSpace.getOCName();
		ShippingSpace.getpCabinName();
	}
	
	ShippingSpace.getOCName=function () {
	    CMC.request({
	        url:ShippingSpace.getOCNameUrl,
	        method: 'GET',
	        success: function(message){
	            $("#ocName").combobox({
	                //data: [{"value":"Permission","label":"Permission"},{"value":"User","label":"User"},{"value":"Role","label":"Role"},{"value":"Resource","label":"Resource"},{"value":"Group","label":"Group"}],
	                data: message.messageBody,
	                panelHeight: '180px',
	                valueField:'OC_NAME',
	                textField:'OC_NAME'
	            });
	    }});
	}
	
	ShippingSpace.getpCabinName=function () {
	    CMC.request({
	        url:ShippingSpace.getpCabinNameUrl,
	        method: 'GET',
	        success: function(message){
	            $("#pCabinName").combobox({
	                //data: [{"value":"Permission","label":"Permission"},{"value":"User","label":"User"},{"value":"Role","label":"Role"},{"value":"Resource","label":"Resource"},{"value":"Group","label":"Group"}],
	                data: message.messageBody,
	                panelHeight: '100px',
	                valueField:'P_CABIN_NAME',
	                textField:'P_CABIN_NAME'
	            });
	    }});
	}
	
})(jQuery)

$(document).ready(function(){
	CMC.init(ShippingSpace);
});

