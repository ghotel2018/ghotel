/**
 * @Date 2016-06-16
 * @Desc保险管理页面
 */

var Insurance =  {
		searchTableRequired: true,
		menuId: "Insurance",
		addUrl:'authorized/insurance/add',
		updateUrl: 'authorized/insurance/update',
		deleteUrl: "authorized/insurance/delete",
		searchUrl: "authorized/insurance/getAll" ,
		getUrl: "authorized/insurance/get" ,
		groupEditUrl: "authorized/insurance/groupEdit",
		groupSearchUrl: "authorized/insurance/groupSearch",
		getTypeUrl: "authorized/insurance/getType",
		importCacheUrl: "authorized/insurance/importCache",
		batchImportUrl:"authorized/insurance/batchImport",
		//getGroupUrl: "authorized/insurance/getConfig" ,
		columns :  [[
						{field: 'insuranceCode', title:'保险编号' , width: '5%' , align: 'center'},
						{field: 'insuranceName', title:'保险产品名' , width: '14%' , align: 'center'},
						{field: 'insuranceProductCode', title:'产品代码' , width: '10%' , align: 'center'},
						{field: 'corpAbbreCode', title:'公司缩写' , width: '8%' , align: 'center'},
						{field: 'insurancePrice', title:'保险费用' , width: '5%' , align: 'center'},
						{field: 'minReturnAmount', title:'不可退金额' , width: '5%' , align: 'center'},
						{field: 'ratio', title:'展示几率（%）' , width: '8%' , align: 'center'},
						{field: 'inUsedInd', title:'是否使用' , width: '8%' , align: 'center',
							formatter: function(value){
				        	   if(value=="1"){
				        		   return '已启用';
				        	   }else if(value=="0"){
					        	   return "未启用";
				        	   }
				        	}
						},
						{field: 'insuranceScope', title:'使用范围' , width: '8%' , align: 'center',
							formatter: function(value){
				        	   if(value=="I"){
				        		   return '国际';
				        	   }else if(value=="D"){
					        	   return "国内";
				        	   }else if(value=="ID"){
				        	   		return "通用";
				        	   }
				           }
						},
						{field: 'buyingLimitedDays', title:'限制天数' , width: '8%' , align: 'center'},
						{field: 'insuranceType', title:'保险类型' , width: '8%' , align: 'center',
							formatter: function(value){
				        	   if(value=="a"){
				        		   return '航空综合险';
				        	   }else if(value=="b"){
					        	   return "机票退改险";
				        	   }else if(value=="ab"){
				        	   		return "组合险";
				        	   }else if(value=="c"){
				        		   return "境外险";
				        	   }else if(value=="d"){
				        		   return "国际旅游险";
				        	   }else if(value=="bd"){
				        		   return "境外组合险";
				        	   }
				        	}
						},
						{field: 'compositeExp', title:'保险组合' , width: '8%' , align: 'center'}
		           ]]
	};	
(function($){
	
	$("#batchImportBtn").click(function(){
		var message = $("#batchFile").val();
		if(message=="" || message.indexOf(".")==-1){
			CMC.alertMessage("请先选择要上传的文件！", 'info');
			return;
		}
		if(message.indexOf(".")>0 && message.indexOf("csv")==-1 && message.indexOf("CSV")==-1 && message.indexOf("xls")==-1 && message.indexOf("xlsx")==-1){
			CMC.alertMessage("请选择excel格式的文件。",'warn');
			return ;
		}
		CMC.fileUpload({
			url: Insurance.batchImportUrl,
			method: "POST",
			dataType: "json",
			fileElementId:  "batchFile",
			data:{"importType":$("input[name='importType']:checked").val()},
			success: function(response){
				CMC.alertMessage("导入成功", 'info');
				CMC.dialog('batchImportDiv','close');
			},
			error: function(){
				CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
			}
		});
	});
	
	$("#insurance_importCache").click(function(){
		$("#importCacheForm")[0].reset();
		$("#importCacheDiv").dialog('open');
	});
	
	$('#importCacheBtn').click(function(){
		var type = $("INPUT[name='bindRadio']:checked").val();
		if(!type){
			CMC.alertMessage("请选择导入类型的选项", 'warn');
			return
		}
		var formElementId = "importCache_file";
		var message = $("#importCache").val();
		if(message=="" || message.indexOf(".")==-1){
			CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
			return;
		}
		if(message.indexOf(".")>0 && message.indexOf("csv")==-1 && message.indexOf("CSV")==-1 && message.indexOf("xls")==-1 && message.indexOf("xlsx")==-1){
			CMC.alertMessage("请选择excel格式的文件。",'warn');
			return ;
		}
		CMC.fileUpload({
			url: Insurance.importCacheUrl,
			method: "POST",
			dataType: "json",
			fileElementId:  formElementId,
			data:{"message":message, "type":type},
			success: function(response){
				CMC.alertMessage("导入成功", 'info');
				CMC.dialog('importCacheDiv','close');
			},
			error: function(){
				CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
			}
		});
	});
	
	/**
	 * 重置
	 */
	$("#insurance_reset").click(function(){
		$("#input_insuranceCode").textbox('setValue','');
		$("#input_insuranceName").textbox('setValue','');
		$("#type").combobox('select','');
		$("#combox_inUsedInd").combobox("select","");
	});
	
	//弹出添加保险窗口
	$("#insurance_add").click(function(){
		$("#addInsuranceForm").form("clear");
		$("#add_inUsedInd").prop("checked","checked");
//		$("#comboxType1").combobox('clear').combobox({'readonly':true});
//		$("#comboxType2").combobox('clear').combobox('readonly',true);
//		$("#comboxType3").combobox('clear').combobox('readonly',true);
		$("#addInsuranceForm").form("disableValidation");
		CMC.dialog('addInsuranceDetail','open');
	});
	
	//更新保险信息并弹出窗口
	$("#insurance_update").click(function(){
		$("#updateForm").form("disableValidation");
		$("#updateForm").form("clear");
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
			
		}
		// if (record['insuranceCode']record['insuranceCode']) {}
		$("#radtio_hidden").val(record['ratio']);
		$("#insuranceCode").val(record['insuranceCode']);
		$("#ratio").val(record['ratio']);
		$("#insuranceName").textbox("setValue",record['insuranceName']);
		$("#insuranceProductCode").textbox("setValue",record['insuranceProductCode']);
		$("#insurancePrice").textbox("setValue",''+record['insurancePrice']+'');
		$("#corpAbbreCode").textbox("setValue",record['corpAbbreCode']);

		$("#corpNameZh").textbox("setValue",record['corpNameZh']);
		$("#detailDescUrlZh").textbox("setValue",record['detailDescUrlZh']);
		$("#detailDescUrlEn").textbox("setValue",record['detailDescUrlEn']);
		$("#claimsDescZh").textbox("setValue",record['claimsDescZh']);
		$("#claimsDescEn").textbox("setValue",record['claimsDescEn']);
		$("#detailDescUrlZhH5").textbox("setValue",record['detailDescUrlZhH5']);
		$("#detailDescUrlEnH5").textbox("setValue",record['detailDescUrlEnH5']);

		$("#insuranceScope").combobox("select",record['insuranceScope']);
		$("#insuranceType").combobox("select",record['insuranceType']);
		

		$("#minReturnAmount").textbox("setValue",''+record['minReturnAmount']+'');
		$("#buyingLimitedDays").textbox("setValue",record['buyingLimitedDays']);
		var bool=record['inUsedInd']=="1"?1:0;
		$("#updateForm input[name='inUsedInd']").each(function(index, el) {
			if ($(this).val()==bool) {				
				$(this).prop("checked",true);
			}
		});
		CMC.dialog('updatInsuranceDetail','open');
		
	});
	//提交新增保险
	$('.AddButton').click(function(){
		$("#addInsuranceForm").form("enableValidation");
		var isValid = $("#addInsuranceForm").form("validate");
		
		if(isValid){
			
			
			CMC.request({
				url: Insurance.addUrl,
				method: 'POST',
				data : $("#addInsuranceForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('addInsuranceDetail','close');
					$("#addInsuranceForm").form("clear");
				}
			});
		}
	});
	
	
	//更新保险信息
	$('.UpdateButton').click(function(){
		$("#updateForm").form("enableValidation");
		var isValid = $("#updateForm").form("validate");
		var insurancePrice=$("#updateForm input[name='insurancePrice']").val()
			
		var minReturnAmount=$("#updateForm input[name='minReturnAmount']").val()
		// var minReturnAmount_reg=/^\d+$/;
		if($("#updateForm input[name='inUsedInd']:checked").val()==0){
			if ($("#radtio_hidden").val()!=0) {
				CMC.alertMessage("请先设置本记录的展示几率为0后再设置使用状态！","warning");
				return;
			}
		}
		
		if(isValid){
			
			
			if(insurancePrice<minReturnAmount){
				CMC.alertMessage('不可退金额不能高于保险费用！','warning');
				return;
			}
			
			CMC.request({
				url: Insurance.updateUrl,
				method: 'POST',
				data : {
					insuranceCode:$("#insuranceCode").val(),
					insuranceName:$("#insuranceName").textbox("getValue"),
					insuranceProductCode:$("#insuranceProductCode").textbox("getValue"),
					insurancePrice:$("#insurancePrice").textbox("getValue"),
					insuranceScope:$("#insuranceScope").combobox("getValue"),
					corpAbbreCode:$("#corpAbbreCode").textbox("getValue"),
					insuranceType:$("#insuranceType").combobox("getValue"),
					corpNameZh:$("#corpNameZh").textbox("getValue"),
					detailDescUrlZh:$("#detailDescUrlZh").textbox("getValue"),
					detailDescUrlEn:$("#detailDescUrlEn").textbox("getValue"),
					claimsDescZh:$("#claimsDescZh").textbox("getValue"),
					claimsDescEn:$("#claimsDescEn").textbox("getValue"),
					detailDescUrlZhH5:$("#detailDescUrlZhH5").textbox("getValue"),
					detailDescUrlEnH5:$("#detailDescUrlEnH5").textbox("getValue"),
					minReturnAmount:$("#minReturnAmount").textbox("getValue"),
					buyingLimitedDays:$("#buyingLimitedDays").textbox("getValue"),
					inUsedInd:$("#updateForm input[name='inUsedInd']:checked").val()
				},
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.dialog('updatInsuranceDetail','close');
					CMC.search();

					$("#updateForm").form("clear");
				}
			});
		}
	});
	
	//删除保险记录	
	$("#insurance_delete").click(function (){
			
			var record = CMC.grid.datagrid("getSelected");
			if(!record){
				CMC.alertMessage("请先选中一条记录！","warning");
				return;
				
			}
			if (record['inUsedInd']=='1') {
				CMC.alertMessage("启用的保险记录不能删除！","warning");
				return;
			}

			if (record['ratio']>0) {
				CMC.alertMessage("展示几率不等于0的保险记录不能删除！","warning");
				return;
			}
			  CMC.confirm("确定删除保险信息?", function(r){
				  if(r){
					  CMC.request({
							url: Insurance.deleteUrl  ,
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
	
	//初始化下拉框
	Insurance.init = function(){
		//$("#addForm").form("enableValidation");
	};

	$("#insurance_groupEdit").click(function(event) {
		$("#groupEditTable tr").remove();
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;			
		}
		if (record['inUsedInd']=='0') {
			CMC.alertMessage("未启用的保险记录不能分组编辑！","warning");
			return;	
		}
		if(record.insuranceType=="d"||record.insuranceType=="bd"){
			CMC.alertMessage("境外组合险和国际旅游险不能分组编辑！","warning");
			return;	
		}
		CMC.request({
			url: Insurance.groupSearchUrl,
			method: 'POST',
			data : record,
			success: function(response){
				CMC.dialog('editRatioDetail','open');
				$("#groupEdit_scope").val(response.messageBody[0]['insuranceScope']);
				var length=response.messageBody.length;
				var html;
				for(var l=0;l<length;l++){
					var html='<tr>'+
						'<th>保险产品编码：</th>'+
						'<td><input class="easyui-textbox" type="text" name="insuranceCode" data-options="readonly:true" value="'+response.messageBody[l]['insuranceCode']+'"></td>'+
						'</tr>'+
						'<tr>'+
							'<th>保险产品名称：</th>'+
							'<td><input class="easyui-textbox" type="text" name="insuranceName" data-options="readonly:true" value="'+response.messageBody[l]['insuranceName']+'"></td>'+
						'</tr>'+
						'<tr>'+
							'<th>展示几率：</th>'+
							'<td><input class="easyui-textbox" type="text" name="ratioStr" data-options="required:true" value="'+response.messageBody[l]['ratio']+'"></td>'+
						'</tr>';
					$("#groupEditTable").append($(html));
				}
				$.parser.parse($('#editRatioDetail'));
				
			}
		});
	});
	
})(jQuery);

$(document).ready(function(){
	CMC.init(Insurance);	
});

/*计算几率和，并提交 */
function submitRatio(){
	var sum=0;
	var varratio="";
	var varinsuranceCode="";
	$("#groupEditTable input[name='ratioStr']").each(function(index, el) {
		varratio=varratio+$(this).val()+"|";
		sum+=Number($(this).val());
	});

	if (sum!=100&&sum!=0) {
		CMC.alertMessage('分组下各条记录展示几率之和不等于100或0！','warning');
		return;
	}

	$("#groupEditTable input[name='insuranceCode']").each(function(index, el) {
		varinsuranceCode+=$(this).val()+"|";
	});
	var scope=$("#groupEdit_scope").val();
	CMC.request({
			url: Insurance.groupEditUrl,
			method: 'POST',
			data : {insuranceCode:varinsuranceCode,ratioStr:varratio,insuranceScope:scope},
			success: function(response){
				CMC.alertMessage(response.messageBody,'info');
				CMC.search();
			}
		});
}

$.extend($.fn.textbox.defaults.rules, {    
    insuranceProductCodeValida: {    
        validator: function(value, param){  
//        	var regEx=/^[0-9a-zA-Z]{4,20}$/;
        	var regEx=/^[0-9a-zA-Z]+$/;
            return regEx.test(value);    
        },    
//        message: '请输入4到20位！'
        message: '请输入数字或字母！'
    },
    insurancePriceValida:{
    	validator: function(value, param){  
        	var regEx=/^[1-9]([0-9]{0,4})$/; 
            return regEx.test(value);    
        },    
        message: '请输入1到5位的数字！'
    },
    buyingLimitedDaysValida:{
    	validator: function(value, param){  
//        	var regEx=/^(0|[1-9][0-9]{0,1})$/;// /^[0-9]([0-9]{0,1})$/; 
//            return regEx.test(value);
    		return !isNaN(value);
        },    
        message: '请输入数字！'
    }
});

//$("#insuranceType_Add").combobox({
//	onSelect:function(event) {
//		if ($("#insuranceType_Add").combobox('getValue')!='ab') {
//			$("#comboxType1").combobox('clear').combobox({'readonly':true,'required':false});
//			$("#comboxType2").combobox('clear').combobox({'readonly':true,'required':false});
//			$("#comboxType3").combobox('clear').combobox({'readonly':true,'required':false});
//		}else{
//			$("#comboxType1").combobox('clear').combobox({'readonly':false});
//			$("#comboxType2").combobox('clear').combobox('readonly',false);
//			$("#comboxType3").combobox('clear').combobox('readonly',false);
//			if ($("#insuranceScope_Add").combobox('getValue')!="") {
//				CMC.request({
//					url: Insurance.getTypeUrl+"/"+$("#insuranceScope_Add").combobox('getValue'),
//					method: 'GET',
//					success: function(response){
//						$("#comboxType1").combobox({
//							data: response.messageBody.aList,
//							panelHeight: 'auto',
//							valueField:'insuranceCode',
//							textField:'insuranceName',
//							multiple:true,
//							readonly:false,
//							required:true
//						});
//						$("#comboxType2").combobox({
//							data: response.messageBody.bList,
//							panelHeight: 'auto',
//							valueField:'insuranceCode',
//							textField:'insuranceName',
//							multiple:true,
//							readonly:false,
//							required:true
//						});
//						$("#comboxType3").combobox({
//							data: response.messageBody.cList,
//							panelHeight: 'auto',
//							valueField:'insuranceCode',
//							textField:'insuranceName',
//							multiple:true,
//							readonly:false,
//							required:true
//						});
//					}
//				});
//			}			
//		}
//	}
//});

//$("#insuranceScope_Add").combobox({
//	onSelect:function(event) {
//		var type=$("#insuranceType_Add").combobox('getValue');
//		if (type=='ab') {
//			$("#comboxType1").combobox('clear');
//			$("#comboxType2").combobox('clear');
//			$("#comboxType3").combobox('clear');
//			 CMC.request({
//				url: Insurance.getTypeUrl+"/"+$("#insuranceScope_Add").combobox('getValue'),
//				method: 'GET',
//				success: function(response){
//					$("#comboxType1").combobox({
//						data: response.messageBody.aList,
//						panelHeight: 'auto',
//						valueField:'insuranceCode',
//						textField:'insuranceName',
//						multiple:true,
//						readonly:false,
//						required:true
//					});
//					$("#comboxType2").combobox({
//						data: response.messageBody.bList,
//						panelHeight: 'auto',
//						valueField:'insuranceCode',
//						textField:'insuranceName',
//						multiple:true,
//						readonly:false,
//						required:true
//					});
//					$("#comboxType3").combobox({
//						data: response.messageBody.cList,
//						panelHeight: 'auto',
//						valueField:'insuranceCode',
//						textField:'insuranceName',
//						multiple:true,
//						readonly:false,
//						required:true
//					});
//				}
//			});
//
//			// CMC.dialog('editComposeexpDetail','open');
//		}
//	}
//});


$("#cc").combobox({
		data: [{    
				    "id":1,    
				    "text":"text1"   
				},{    
				    "id":2,    
				    "text":"text2"   
				},{    
				    "id":3,    
				    "text":"text3",    
				    "selected":true   
				},{    
				    "id":4,    
				    "text":"text4"   
				},{    
				    "id":5,    
				    "text":"text5"   
				}],
		panelHeight: '120px',
		valueField:'id',
		textField:'text',
		required:true,    
    	multiple:true 
});



