
var UseConditions = {
		searchTableRequired: true, 
		menuId : 'UseConditions',
		searchUrl: "authorized/useConditions/getAll" , //如果searchTableRequired 是 true 必填
		addUrl: "authorized/useConditions/add" , 
		deleteUrl: "authorized/useConditions/delete" , 
		updateUrl: "authorized/useConditions/update" , 
		getOCNameUrl: "authorized/useConditions/getOCName" , 
		getUserTypeUrl: "authorized/useConditions/getUserType" , 
		getCabinNameUrl: "authorized/useConditions/getCabinName" , 
		importUrl:'authorized/useConditions/importReport',
		exportUrl:'authorized/useConditions/exportReport',
		columns :  [[
		               {field: 'id', title:'id' , width: '18%' , align: 'center' , hidden:'true'},
		               {field: 'ocName', title:'OC' , width: '18%' , align: 'center'},
		               {field: 'cabinName', title:'舱位' , width: '15%' , align: 'center'},
		               {field: 'userType', title:'类型' , width: '15%' , align: 'center',
		            	   formatter: function(value,row,index){
								if (value==0){
									return "<lable>成人</label>";
								} else if(value==1){
									return "<lable>儿童</label>";
								}
							}
		               },
			           {field: 'ruleChange', title:'变更' , width: '15%' , align: 'center'},
			           {field: 'ruleRefund', title:'退票' , width: '15%' , align: 'center'},
			           {field: 'ruleSign', title:'签转' , width: '15%' , align: 'center'},
		           ]]
};

(function($){
	
	$("#clearCondition").click(function(){
		var start= $("#useConditionsSearchForm input[name='start']:hidden").val();
		var end=$("#useConditionsSearchForm input[name='end']:hidden").val();
		$('#useConditionsSearchForm').form('clear');
		$("#useConditionsSearchForm input[name='start']:hidden").val(start);
		$("#useConditionsSearchForm input[name='end']:hidden").val(end);
		CMC.search();
	});
	
	$("#searchFormUpdate").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请选择一条记录!", '提示');
			return;
		}
		$('#updateocId').textbox('setValue',record.ocName);  //设置输入框的值
		$('#updateocId').textbox('textbox').attr('readonly',true);  //设置输入框为禁用
		$('#updatecabinName').textbox('setValue',record.cabinName);  //设置输入框的值
		$('#updatecabinName').textbox('textbox').attr('readonly',true);  //设置输入框为禁用
		if(record.userType==0){
			document.getElementById("usertypeId").innerHTML="成人使用条件";
			$('#updateruleChangeAdult').textbox('setValue',record.ruleChange);
			$('#updateruleRefundAdult').textbox('setValue',record.ruleRefund);
			$('#updateruleSignAdult').textbox('setValue',record.ruleSign);
			$("#updateruleChangeChild").next().hide();
			$("#updateruleRefundChild").next().hide();
			$("#updateruleSignChild").next().hide();
			$("#updateruleChangeAdult").next().show();
			$("#updateruleRefundAdult").next().show();
			$("#updateruleSignAdult").next().show();
		}
		if(record.userType==1){
			document.getElementById("usertypeId").innerHTML="儿童使用条件";
			$('#updateruleChangeChild').textbox('setValue',record.ruleChange);
			$('#updateruleRefundChild').textbox('setValue',record.ruleRefund);
			$('#updateruleSignChild').textbox('setValue',record.ruleSign);
			$("#updateruleChangeAdult").next().hide();
			$("#updateruleRefundAdult").next().hide();
			$("#updateruleSignAdult").next().hide();
			$("#updateruleChangeChild").next().show();
			$("#updateruleRefundChild").next().show();
			$("#updateruleSignChild").next().show();
		}
		CMC.dialog('updateuseConditionsDialog','open');
	});
	
	
	$('#updateUseConditions').click(function(){
		var record = CMC.grid.datagrid("getSelected");
		var id = record.id;
		var userType = record.userType;
		var ruleChange;
		var ruleSign;
		var ruleRefund;
		var ocId = $("#updateocId").val();
		if(record.userType==0){
			ruleChange = $("#updateruleChangeAdult").val();
			ruleRefund = $("#updateruleRefundAdult").val();
			ruleSign = $("#updateruleSignAdult").val();
		}
		if(record.userType==1){
			ruleChange = $("#updateruleChangeChild").val();
			ruleRefund = $("#updateruleRefundChild").val();
			ruleSign = $("#updateruleSignChild").val();
		}
		$('#updateUseConditionsForm').form('enableValidation');
		if($('#updateUseConditionsForm').form('validate')){
			CMC.confirm("确认修改OC方为:["+name+"]?" , function(r){
				
					if(r){
							CMC.request({
								method: "POST",
								url: UseConditions.updateUrl,
								data: {
									'id':id,
									'ocId':ocId,
									'userType':userType,
									/*'cabinName':cabinName,*/
					            	'ruleChange':ruleChange,
					            	'ruleRefund':ruleRefund,
					            	'ruleSign':ruleSign
								},
							  	success: function(result){
							  		CMC.alertMessage(result.messageBody, 'info',CMC.search);
							  		CMC.dialog('updateuseConditionsDialog','close');
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
					url: UseConditions.deleteUrl,
					data: record,
				  	success: function(result){
				  		CMC.alertMessage(result.messageBody, 'info',CMC.search);
				  	}
				});
			}
		});
	});
	
	
	$('#cabinName_save').combo({
        required:true,
        panelHeight:'auto',
        editable:false,
        labelPosition:'top'
    });
	
	$("#ocId").combobox({
		onChange: function (newVal,oldValue) {
			$('#cabinName_save').combo('setValue', "").combo('setText', "");
			UseConditions.intConfig(true,newVal,1);
		}
	});
	
	
	$('#comboxPanel_cabinName').appendTo($('#cabinName_save').combo('panel'));
    $('#comboxPanel_cabinName #comboxPanel_btnSure').click(function(){
    	var text = "";
    	$("input[name='optDiscountGroupId']:checked").each(function(i,dom){
    		if(text.length>0){
    			text = text +"-"+$(this).next('span').text();
    		}else{
    			text = $(this).next('span').text();
    		}
    	});
    	
        $('#cabinName_save').combo('setValue', text).combo('setText',text).combo('hidePanel');
    });
	
	
	UseConditions.intConfig = function(initocId,ocId,num){
//		$('#ocName').textbox('setValue', $("#ocId").combo('getText'));
		document.getElementById("ocName").value=$("#ocId").combo('getText');
		CMC.request({
			url: UseConditions.getCabinNameUrl,
			data: {'ocId':ocId,'num':num},
			method: 'GET',
			success: function(message){
				if(initocId){
					var cabinNameList = message.messageBody.cabinNameList;
					var htmlList = "";
				    for(var i = 0 ; cabinNameList && i < cabinNameList.length; i++){
				    	htmlList += "<input type='checkbox' name='optDiscountGroupId'><span>"+ cabinNameList[i]["CABIN_NAME"] +"</span>&nbsp;&nbsp;&nbsp;";
				    }
				    $("#cabinName_dataList").empty();
				    $("#cabinName_dataList").append(htmlList);
				    $('#comboxPanel_cabinName').appendTo( $('#cabinName_save').combo('panel'));
				}else{
					var cabinNameList = message.messageBody.cabinNameList;
					var htmlLists = "";
				    for(var i = 0 ; cabinNameList && i < cabinNameList.length; i++){
				    	htmlLists += "<input type='checkbox' name='optDiscountGroupIds'><span>"+ cabinNameList[i]["CABIN_NAME"] +"</span><span style='display:none'>"+ cabinNameList[i]["CABIN_ID"] +"</span>&nbsp;&nbsp;&nbsp;";
				    }
				    $("#addcabinName_dataList").empty();
				    $("#addcabinName_dataList").append(htmlLists);
				    $('#comboxPanel_addcabinName').appendTo( $('#addcabinName_save').combo('panel'));
				}
			}
		});
	}
	
	$('#addcabinName_save').combo({
        required:true,
        panelHeight:'auto',
        editable:false,
        labelPosition:'top'
    });
	
	$("#addOcId").combobox({
		onChange: function (newVal,oldValue) {
			$('#addcabinName_save').combo('setValue', "").combo('setText', "");
			UseConditions.intConfig(false,newVal,2);
		}
	});
	
	
	$('#comboxPanel_addcabinName').appendTo($('#addcabinName_save').combo('panel'));
    $('#comboxPanel_addcabinName #addcomboxPanel_btnSure').click(function(){
    	var text = "";
    	var idtext= "";
    	$("input[name='optDiscountGroupIds']:checked").each(function(i,dom){
    		if(text.length>0){
    			text = text +"-"+$(this).next('span').text();
    			idtext = idtext +"-"+$(this).next('span').next('span').text();
    		}else{
    			text = $(this).next('span').text();
    			idtext = $(this).next('span').next('span').text();
    		}
    	});
    	
        $('#addcabinName_save').combo('setValue', idtext).combo('setText',text).combo('hidePanel');
    });
    
    
    $("#download_template_useConditions").click(function(){
		window.open(encodeURI("/cmc/download/conditionTemplate.xls"));
	});
    
    
    $("#UseConditions_Import").click(function(){
		$("#useConditionsInfo").textbox('setValue','');
		$("#useConditionsImport").dialog("open");
		CMC.dialog('adduseConditionsDialog','close');
	});
    
    $("#useConditionsInfo_import").click(function(){
		var val=$("#useConditionsInfo").val();
		if(val==""){
			CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
			return;
		}
		//判断文件后缀
		var fileUrl=$("#useConditionsInfo").val();
		if(fileUrl && fileUrl != "" && (fileUrl.indexOf("xls")==-1 && fileUrl.indexOf("xlsx")==-1 && fileUrl.indexOf("csv")==-1) ){
			CMC.alertMessage("请选择excel文件。",'warn');
			return ;
		}
		
		var data={"useConditionsInfoFile":val};
		
		UseConditions.fileUpload(data,UseConditions.importUrl,"#useConditionsImportForm","useConditionsInfoFile");
	});
    
$("#exportUseConditions").click(function(){
		
		var ocName = $("#ocName").val();
		var cabinName = $("#cabinName_save").val();
		var userType = $("#userType").val();
		
        CMC.fileUpload({
			url: UseConditions.exportUrl,
			method: "POST",
			dataType: "json",
			data:{
				'ocName':ocName,
                'cabinNames':cabinName,
                'userType':userType
			},
			success: function(response){
		  		CMC.alertMessage("导出获取报表异步请求成功,请移步首页并查看报表记录下载文件！", 'info');
		  		/*CMC.dialog('distributionChannelReport','close');*/
		  	},
		  	error: function(){
		  		CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
		  	}
		});
	});
	
    
    UseConditions.fileUpload = function(data,url,formId,ind){

		CMC.confirm("是否确认导入文件?",function(r){
			if(r){
				 CMC.showProcessBox();
				 CMC.fileUpload({
					url: url,
					type: "POST",
					dataType: "json",
					fileElementId:  "useConditionsInfoFile",
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
	
	
	UseConditions.init=function () {
		UseConditions.getOCName();
		UseConditions.getUserType();
	}
	
	UseConditions.getOCName=function () {
	    CMC.request({
	        url:UseConditions.getOCNameUrl,
	        method: 'GET',
	        success: function(message){
	            $("#ocId").combobox({
	                data: message.messageBody,
	                panelHeight: '180px',
	                valueField:'OC_ID',
	                textField:'OC_NAME'
	            });
	    }});
	}
	
	UseConditions.getUserType=function () {
	    CMC.request({
	        url:UseConditions.getUserTypeUrl,
	        method: 'GET',
	        success: function(message){
            	$('#userType').combobox({
            		data: message.messageBody,
	                panelHeight: '90px',
	                valueField:'USER_TYPE',
	                textField:'USER_TYPENAME'
                });
	    }});
	}
	
	
	$('#showAddForm').click(function(){
		$('#addUseConditionsForm').form('disableValidation');
		$('#addUseConditionsForm').form('reset');
		
		CMC.request({
	        url:UseConditions.getOCNameUrl,
	        method: 'GET',
	        success: function(message){
	            $("#addOcId").combobox({
	                data: message.messageBody,
	                panelHeight: '180px',
	                valueField:'OC_ID',
	                textField:'OC_NAME'
	            });
	    }});
		
		CMC.dialog('adduseConditionsDialog','open');
	});
	
	
	$('#addUseConditions').click(function(){
		var ocId = $("#addOcId").combobox('getValue');
		var cabinNames = $("#addcabinName_save").combobox('getValue');
		var ruleChangeAdult = $("#addruleChangeAdult").textbox('getValue');
		var ruleChangeChild =  $("#addruleChangeChild").textbox('getValue');	
		var ruleRefundAdult =  $("#addruleRefundAdult").textbox('getValue');
		var ruleRefundChild =  $("#addruleRefundChild").textbox('getValue');
		var ruleSignAdult =  $("#addruleSignAdult").textbox('getValue');
		var ruleSignChild =  $("#addruleSignChild").textbox('getValue');
		if(ruleChangeAdult=="" && ruleRefundAdult=="" && ruleSignAdult==""){
			CMC.alertMessage("成人的变更规则,退票规则,转签规则必须至少输入一项！", 'info');
			return;
		}
		$('#addUseConditionsForm').form('enableValidation');
		if($('#addUseConditionsForm').form('validate')){
			CMC.confirm("确认增加?" , function(r){
					if(r){
							CMC.request({
								method: "POST",
								url: UseConditions.addUrl,
								data: {
									'ocId':ocId,
					            	'addcabins':cabinNames,
					            	'ruleChangeAdult':ruleChangeAdult,
					            	'ruleChangeChild':ruleChangeChild,
					            	'ruleRefundAdult':ruleRefundAdult,
					                'ruleRefundChild':ruleRefundChild,
					                'ruleSignAdult':ruleSignAdult,
					                'ruleSignChild':ruleSignChild
								},
							  	success: function(result){
							  		CMC.alertMessage(result.messageBody, 'info',CMC.search);
							  		CMC.dialog('adduseConditionsDialog','close');
							  	}
							});
					}
				
				});
		}
	});
	
})(jQuery)

$(document).ready(function(){
	CMC.init(UseConditions);
});

