var CouponGroupMnt = {
		menuId: "CouponGroupKorea",
		searchTableRequired: true,
		getConfigUrl: "authorized/couponGroupKorea/pageConfig" , 
		addKoreaUrl: "authorized/couponGroupKorea/addKorea" , 
		updateKoreaUrl: "authorized/couponGroupKorea/updateKorea" , 
		getUrl: "authorized/couponGroupKorea/get/" , 
		issueUrl: "authorized/couponGroupKorea/issue" , 
		exportKeyUrl: "authorized/couponGroupKorea/exportPrivateKey" ,
		getMailSentCountUrl: "authorized/couponGroupKorea/getMailSentCount",
		updateMailSentCountUrl: "authorized/couponGroupKorea/updateMailSentCount",
//		exportReportUrl: "authorized/couponGroupKorea/exportReport",
		searchUrl: "authorized/couponGroupKorea/getKoreaAll" , //如果searchTableRequired 是 true 必填
		columns :  [[
		               {field: 'online', title:'所属批次号' , width: '0%' , align: 'center', hidden:'true'},
			           {field: 'groupId', title:'所属批次号' , width: '20%' , align: 'center'},
			           {field: 'faceValue', title:'面值' , width: '5%' , align: 'center'},
			           {field: 'createDate', title:'生成日期' , width: '12.5%' , align: 'center'},
			           {field: 'createdBy', title:'创建人' , width: '12.5%' , align: 'center'},
			           {field: 'channelName', title:'渠道' , width: '20%' , align: 'center',
						   formatter : function(value,row,index) {
							   var createChannel="";
							   if(row.createChannel){
								   createChannel= row.createChannel;
							   }
							   var channelName="";
							   if(channels!=undefined && channels!=null){
									for ( var i = 0; i < channels.length; i++) {
										var channelList = channels[i];
										if(createChannel == channelList.code){
											channelName= channelList.name
										}
									}
								}
							   return "["+createChannel+"]"+channelName;

						   }
					   },//0、已生成未发放 1、未使用 2、已挂起 3、已使用 4、已作废
			           {field: 'discountType', title:'优惠券类型' , width: '20%' , align: 'center',
						   formatter:function(value,row,index){
							   var discountType="";
							   if(row.discountType==9||row.discountType=='9'){
								   discountType='韩国自有资金优惠券';
							   }else if(row.discountType==10||row.discountType=='10'){
								   discountType='韩国虚拟资金优惠券';
							   }
							   return discountType;
						   } 
					   },
			           {field: 'status', title:'状态' , width: '10%' , align: 'center',
			        	   formatter : function(value,row,index) {
							   var statusStr="";
							   if(row.status==1||row.status=='1'){
								   statusStr="生成中";
							   }else if(row.status==2||row.status=='2'){
								   statusStr="已生成";
							   }else if(row.status==3||row.status=='3'){
								   statusStr="异常待处理";
							   }else if(row.status==4||row.status=='4'){
								   statusStr="出错";
							   }else if(row.status==5||row.status=='5'){
								   statusStr="审批中";
							   }else if(row.status==6||row.status=='6'){
								   statusStr="审批通过";
							   }else if(row.status==7||row.status=='7'){
								   statusStr="已绑定活动";
							   }else if(row.status==8||row.status=='8'){
								   statusStr="挂起";
							   }else if(row.status==9||row.status=='9'){
								   statusStr="废除";
							   }else if(row.status==10||row.status=='10'){
								   statusStr="已过期";
							   }
							   /*<!-- 批次生成优惠状态：0、未生成 1、生成中 2、已生成 3、生成异常，等待补偿、 4、出错
									线下批次发放状态：5、审批中 6、审批通过
									线上批次状态：	7、已绑定活动 
												8、挂起（状态为2时，才能挂起。挂起的状态下，该批次不能操作，解挂为2状态后才能操作）
												9、废除（废除该批次。该批次下的未被领用的优惠券均需废除）
 							-->*/
							   return statusStr;
						   }
			           }
			           ]]
};

var upFileFlag;
var issueFileFlag;
var exportKeyFlag;
var channels;

$(document).ready(function(){
	//根据页面需求，把日期的上一年和下一年箭头去掉
	$('.calendar-prevyear').hide();
	$('.calendar-nextyear').hide();
	CMC.init(CouponGroupMnt);
});

window.onError = function(){
	console.log(e);
};



(function($){
	
	$('#CouponGroupSendEmail').click(function(){
		var record = CMC.grid.datagrid("getSelected");

		if(!record){
			CMC.alertMessage("请选择一条批次记录！", 'warn');
			return;
		}
		var status  = record["status"];
		if(status!=6){
			CMC.alertMessage("只有审核通过的优惠券批次才可以进行发送邮件通知", 'warn');
			return;
		}
		
		$('#activityDesc').textbox('setValue',record["activityDesc"]);
		$('#useConditionDesc').textbox('setValue',record["useConditionDesc"]);
		$('#message').html('');
		$("#MailContentDetail").dialog('open');

	});
	
	$("#CouponGroupSendEmail_btn").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		var activityDesc = $('#activityDesc').val();
		var useConditionDesc = $('#useConditionDesc').val();
		var groupId = record['groupId'];
		var count;
		CMC.request({
			method: 'POST',
			url: CouponGroupMnt.getMailSentCountUrl,
			data: {'groupId':groupId},
			success: function(message){
				count = message.messageBody;
				var messagecount = count+1;
				if(messagecount<6){
					CMC.request({
						method: 'POST',
						url: CouponGroupMnt.updateMailSentCountUrl,
						data: {'groupId':groupId,'activityDesc':activityDesc,'useConditionDesc':useConditionDesc},
						success: function(response){
						}
					});
				}else{
					CMC.alertMessage("邮件通知最多发送5次！", 'info');
				}
				if(messagecount>5){
					messagecount=5;
				}
				$('#message').html('已发送通知'+messagecount+'次');
		  	}
		});

	});
	
	$("#searchFormAddKorea").click(function(){
		$("#createDialog").dialog({
			title:'韩国优惠券生成',
			closed:false,
			cache:false,
			modal:true,
			href:"/cmc/module/coupon/couponGroupKoreaCreateForm.html?scope=korea",
			onLoad:function () {
				$("#createDialog #isInternations_create").val("2");
				$("#createDialog #addBtn_create_korea").show();
				$("#createDialog #restrict1").show();
				
				$("#createCouponGroupForm input[name='flightTimeType']").each(function(j,el2){
					$(el2).prop("checked", true).attr("checked", true);
				});
				$("#createDialog #createCouponGroupForm .easyui-datebox").each(function(j,el2){
					$(el2).datebox().datebox('calendar').calendar({
						validator: function(date){
							var now = new Date();
							var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
							return d1<=date ;
						}
					});
				});
				$("#createDialog #discountType_create").combobox({
					data: [
						{id:'9',name:'韩国自有资金优惠券'},
						{id:'10',name:'韩国虚拟资金优惠券'}
					],
					panelHeight: '120px',
					valueField:'id',
					textField:'name',
					panelHeight: '100px' ,

					onChange:discountTypeCheck
				});
				CouponGroupCommon.intConfig(true,true,true,'korea');
				
				$("#addactivityDescs").textbox('setValue','');
				UE.getEditor("editor2").setContent('');
			}
		});
		$("#showChannelName").val();
		$("#showChannelName").hide();
		$('#createCouponGroupForm').form('clear');
		$("#addBtn_create").show();
		$("#count").html(500);
		$('.error').html('');
		$('#segmentType_create').combobox('setValue','0');
		$('#isInternations_create').val('2');
		$("#createBtn_create").show();	
		//$("#createCouponGroupDialog_create").dialog('open');
		var winTopLeft = CMC.getWindowTopLeft("createCouponGroupDialog_create");
		$('#createCouponGroupDialog_create').window({
			top:winTopLeft.winTop,
			left:winTopLeft.winLeft
		});
		$("#createCouponGroupDialog_create").dialog('open');

		$("#createCouponGroupForm input[name='flightTimeType']").each(function(j,el2){
			$(el2).prop("checked", true).attr("checked", true);
		});
		
		$("#createCouponGroupForm .easyui-datebox").each(function(j,el2){
			$(el2).datebox().datebox('calendar').calendar({
	            validator: function(date){
	                var now = new Date();
	                var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	                return d1<=date ;
	            }
	        });
		});
	});
	
	$('#searchFormUpdateKorea').click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record ){
			CMC.alertMessage("请选择一条韩国优惠券批次记录!", 'warn');
			return;
		}
		CouponGroupMnt.intConfig(false,false,true);
		var groupId = record['groupId'];
		var src = "/cmc/module/coupon/couponGroupKoreaUpdateForm.html?scope=korea&groupId="+groupId;
		//CouponGroupMnt.intConfig(false,false,true);
		$('.error').html('');
		$('#updateI18nCouponGroupForm').form('clear');
		$("#updateDialog").dialog({
			title:'韩国优惠券修改',
			closed:false,
			cache:false,
			modal:true,
			content:'<iframe id="createFrame" name="createFrame" src='+src+' frameborder="no" border="0" scrolling="no" style="width:818px;height:930px;"></iframe>'
		});
		CMC.dialog('updateDialog','open');
		//CouponGroupMnt.getDetail("#updateCouponForm",'update',groupId);
		var winTopLeft = CMC.getWindowTopLeft("updateDialog_update");
		$('#updateDialog_update').window({
			top:winTopLeft.winTop,
			left:winTopLeft.winLeft
		});
	});
	
	$("#searchFormIssue").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		
		if(!record){
			CMC.alertMessage("请选择一条批次记录！", 'warn');
			return;
		}
		var status  = record["status"];
		if(status!=2){
			CMC.alertMessage("只有状态为已生成的优惠券批次才可以进行发放", 'warn');
			return;
		}

		var status  = record["online"];
		if(status!=0){
			CMC.alertMessage("只有线下的优惠券批次才可以进行发放", 'warn');
			return;
		}
		if($("#issueFormDialog #container").length<=0){
			var winTopLeft = CMC.getWindowTopLeft("issueFormDialog");
			$('#issueFormDialog').show().dialog({
				top:winTopLeft.winTop,
				left:winTopLeft.winLeft,
				cache: true,
				href:"/cmc/module/coupon/couponIssuKoreaForm.html"
			});
		}else{
			$("#issuAproveName").textbox('setValue',"");
			$("#issuAproveId").val('');
			$('#upload-excel')[0].reset();
		}
		$("#issueFormDialog").show().dialog("open");
		
	});
	
	
	
	$("#searchFormExport").click(function(){
		$("#exportUploadExcel")[0].reset();
		var winTopLeft = CMC.getWindowTopLeft("AESKeExport");
		$('#AESKeExport').window({
			top:winTopLeft.winTop,
			left:winTopLeft.winLeft
		});
		$("#AESKeExport").dialog('open');
	});
	

	
	$("INPUT[name='createType']").click(function(){
		$(this).parent().find(".error").html("");
	});
    $("INPUT[name='online']").click(function(){
        $(this).parent().find(".error").html("");
    });

	$("input[name='gatewayselect']").click(function(){
		if($(this).prop("checked")==true){
			$("input[name='gatewaycheck']").prop("checked",true);
		}else{
			$("input[name='gatewaycheck']").prop("checked",false);
		}
	});
	
	$("#segmentType_fileBtn").click(function(){
		$('#segmentType_file_create').click();
	});
	
	$("#segmentInfo_create").bind('keyup',function(e){
		$("segmentType_file_create").val("");
	});
	$("#segmentInfo_update").bind('keyup',function(e){
		$("segmentType_file_update").val("");
	});
	
/*	$("#segmentInfo_create").bind('blur',function(e){
		if(upFileFlag==''){
			$(this).val($.trim($(this).val().toUpperCase()));
		}
	});*/
	
/*	$("#segmentType_file_create").bind('change',function(){
		upFileFlag = 'file';
		$("#segmentInfo_create").val( $(this).val());
	});*/
	
/*	$("#segmentType_file_update").bind('change',function(){
		upFileFlag = 'file';
		$("#segmentInfo_update").val( $(this).val());
	});
	//优惠券发放
	
	$("#mobileCode_file").bind('change',function(){
		issueFileFlag = "file"; 
		$("#mobileCode").val($(this).val());
	});
	*/
	$("#mobileCode").bind('keyup', function(){
		$("#mobileCode_file").val('');
		issueFileFlag="";
	});
	
/*	$("#IDCode_file").bind('change',function(){
		issueFileFlag = "file"; 
		$("#IDCode").val($(this).val());
	});
	*/
	$("#IDCode").bind('keyup', function(){
		$("#IDCode_file").val('');
		issueFileFlag="";
	});
	
	
/*	$("#memberCode_file").bind('change',function(val){
		issueFileFlag = "file"; 
		debugger;
		$("#memberCode").val( $(this).val());
	});*/
	
	
	$("#memberCode").bind('keyup', function(){
		$("#memberCode_file").val('');
		issueFileFlag="";
	});
	
	
/*	
	//导出密钥
	$('#groupId_file').bind('change',function(){
		exportKeyFlag = "file";
		$('#exportGroupId').val($(this).val());
	});
	*/
	$('#exportGroupId').bind('keyup', function(){
		exportKeyFlag = "";
		$('$groupId_file').val('');
	});
	
/*	$('#discountCode_file').bind('change',function(){
		exportKeyFlag = "file";
		$('#exportDiscountCode').val($(this).val());
	});*/
	
	$('#exportDiscountCode').bind('keyup', function(){
		exportKeyFlag = "";
		$('discountCode_file').val('');
	});
	
	$("INPUT[name='bindRadio']").bind("click", function(){
		$("#exportGroupId").val("");
		$("#exportDiscountCode").val("");
		exportKeyFlag = "";//变更后重置，防止文件变更未提交发放
	});
	$('#exportAesKeyBtn').click(function(){
		var type = $("INPUT[name='bindRadio']:checked").val();
		if(!type){
			CMC.alertMessage("请选择导出类型的选项", 'warn');
			return
		}
		
		var message = "";
		
		var formElementId = "groupId_file";
		if(type=="0"){
			message = $("#exportGroupId").val();
		}else if(type=="1"){
			formElementId = "discountCode_file";
			message = $("#exportDiscountCode").val();
		}
		if(message.indexOf(".")>0 && message.indexOf("csv")==-1 && message.indexOf("CSV")==-1 && message.indexOf("xls")==-1 && message.indexOf("xlsx")==-1){
			CMC.alertMessage("请选择excel格式的文件。",'warn');
			return ;
		}
		var bindType = "input";
		if(message && message != '' 
			&& (message.indexOf("xls")>0||message.indexOf("xlsx")>0||message.indexOf("csv")>0)){
			//&& message.indexOf("csv")>0){
			bindType = "excel";
		}else{
			var reg=new RegExp("^[0-9a-zA-Z]*$");
			if(!reg.test(message)){
				alert("批号输入有误");
			}
		}
		CMC.fileUpload({
			url: CouponGroupMnt.exportKeyUrl,
			method: "POST",
			dataType: "json",
			fileElementId:  formElementId,
			data:{"message":message, "bindType":bindType, "type":type},
			success: function(response){
		  		CMC.alertMessage("导出密钥异步请求成功,请移步首页并查看报表记录下载文件！", 'info');
		  		CMC.dialog('AESKeExport','close');
		  	},
		  	error: function(){
		  		CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
		  	}
		});
		

	});
	
	 CouponGroupMnt.getDetail = function(formId, ind , groupId){
	        $("#holdBtn_" + ind).show();
	        $("#unlockBtn_" + ind).show();
	        $("#disableBtn_" + ind).show();
	        $("#updateBtn_" + ind ).show();
	        CMC.request({
	            url : CouponGroupMnt.getUrl + groupId,
	            type : "GET",
	            dataType : "json",
	            async : false,
	            success : function(response) {
	                $(formId).form('clear');
	                $(formId).find('.error').html('');
	                $('#segmentInfo_' + ind).attr('readonly', false);
	                $('#segmentType_fileBtn' + ind).show();
	                var bean = response.messageBody;
	                $('#groupCode_' + ind).textbox('setValue',bean['GROUPID']);
	                $('#faceValue_' + ind).numberbox('setValue',bean['FACEVALUE']);
	                $('#discountType_' + ind).combobox('setValue',bean['DISCOUNTTYPE']);
	                if(bean['DISCOUNTTYPE'] !='1'){
	                    $(formId ).find('#rateDiv').hide();
	                }
	                $('#rateId_' + ind).val(bean['RATEID']);
	                if(bean['FLIGHTDATE']){
	                    var flightdate = bean['FLIGHTDATE'].split('|');
	                    if(flightdate){
	                        $('#flightDateOne_' + ind).datebox('setValue',flightdate[0]);
	                    }
	                    if(flightdate && flightdate[1]){
	                        $('#flightDateTwo_' + ind).datebox('setValue',flightdate[1]);
	                    }
	                }
	                if(bean['USEFULDATE']){
	                    $('#usefulDateOne_' + ind).datebox('setValue',bean['USEFULDATE'].split('|')[0]);
	                    $('#usefulDateTwo_' + ind).datebox('setValue',bean['USEFULDATE'].split('|')[1]);
	                }
	                $('#segmentInfo_' + ind).val(bean['SEGMENTINFO']);
	                //if(bean['SEGMENTTYPE'] && bean['SEGMENTTYPE']!=""){
	                $('#segmentType_' + ind).combobox('setValue',bean['SEGMENTTYPE']+"");
	                //}else{
	                //	$('#segmentType_update').combobox('setValue',bean['SEGMENTTYPE']+"");
	                //}

	                //if(bean['SEGMENTINFO']&& bean['SEGMENTINFO']!=''){
	                //$('#segmentInfo_update').attr('readonly', true);
	                //$('#segmentType_fileBtn_update').hide();
	                //}else{
	                //$('#segmentType_fileBtn_update').show();
	                //}
	                $('#createChannel_' + ind).combobox('setValue',bean['CHANNELID']);
	                $('#codeCount_' + ind).numberbox('setValue',bean['COUNT']);
	                $('#segPriceLimit_' + ind).numberbox('setValue',bean['SEGPRICELIMIT']);
	                if(bean['REMARK']){
	                    $('#activityDescribe_' + ind).textbox('setValue',bean['REMARK']);
	                    //checkLen(bean['REMARK']);
	                }
	                $("#userestriction_" + ind).combobox('setValue',bean['USERESTRICTION']);
	                $("#userestriction_" + ind + "_I18n").combobox('setValue',bean['USERESTRICTION']);
	                var status = bean['STATUS'];
	                $("#status_" + ind).combobox('setValue',status);
	                if(status==0){
	                    $("#holdBtn_" + ind).hide();
	                    $("#unlockBtn_" + ind).hide();
	                }else if(status==1){
	                    $("#unlockBtn_" + ind).hide();
	                    $("#disableBtn_" + ind).hide();
	                    $("#updateBtn_" + ind ).hide();
	                }else if(status == 2){
	                    $("#holdBtn_" + ind).hide();
	                    $("#disableBtn_" + ind).hide();
	                    $("#updateBtn_" + ind ).hide();
	                }else if(status == 3 || status == 4){
	                    $("#holdBtn_"+ind).hide();
	                    $("#unlockBtn_" + ind).hide();
	                    $("#disableBtn_" + ind).hide();
	                    $("#updateBtn_" + ind ).hide();
	                }
	                if(bean['CABINTYPE']){
	                    $.each(bean['CABINTYPE'].split(','),function(i,el1){
	                        $(formId + " input[name='cabinType']").each(function(j,el2){
	                            if($(el2).val()==el1){
	                                $(el2).prop("checked", true).attr("checked", true)
	                            }
	                        });
	                    });
	                }

	                $.each(bean['USEDCHANNEL'].split(','),function(i,el1){
	                    $(formId + " input[name='usedChannel']").each(function(j,el2){
	                        if($(el2).val()==el1){
	                            $(el2).prop("checked", true).attr("checked", true)
	                        }
	                    });
	                });
	                if(bean['FLIGHTTIMETYPE']){
	                    $.each(bean['FLIGHTTIMETYPE'].split(','),function(i,el1){
	                        $(formId + " input[name='flightTimeType']").each(function(j,el2){
	                            if($(el2).val()==el1){
	                                $(el2).prop("checked", true).attr("checked", true);
	                            }
	                        });

	                    });
	                }
	                if(bean['CREATE_TYPE']){
	                    $.each(bean['CREATE_TYPE'].split(','),function(i,el1){
	                        $(formId + " input[name='createType']").each(function(j,el2){
	                            if($(el2).val()==el1){
	                                $(el2).prop("checked", true).attr("checked", true)
	                            }
	                        });

	                    });
	                }
	                if(bean['GATEWAYCODE']){
	                    if(bean['GATEWAYCODE'].split(',').length == $(formId + " input[name='gatewaycheck']").length ){
	                        $("#gatewayselect_update").prop("checked", true).attr("checked", true)
	                    }
	                }
	                if(bean['GATEWAYCODE']){
	                    $.each(bean['GATEWAYCODE'].split(','),function(i,el1){
	                        $(formId + " input[name='gatewaycheck']").each(function(j,el2){
	                            if($(el2).val()==el1){
	                                $(el2).prop("checked", true).attr("checked", true)
	                            }
	                        });

	                    });
	                }

	                $(formId + " #AESKEY").html(bean['AESKEY']);
	            }
	        });

	    }
	
	CouponGroupMnt.init = function(){
		CouponGroupMnt.intConfig(true,true);
	}
	
	CouponGroupMnt.intConfig = function(initChannel,initGateWay, initAccount){
		
		CMC.request({
			url: CouponGroupMnt.getConfigUrl ,
			method: 'GET',
			success: function(message){
				if(initChannel){
					 channels = message.messageBody.channelList;
					 var channelList = message.messageBody.channelList;
					    /*for(var i =0 ; channelList && i < channelList.length; i++){
					    	if(Number(channelList[i]["code"])<10){
					    		channelList[i]["code"] = "0" + channelList[i]["code"];
					    	}
					    }*/
					$("#channelId").combobox({
						data: channelList,
						panelHeight: '120px',
						valueField:'code',
						textField:'name' 
					});
				}
			}
		});
		
	}
	
	/**
	 * 打开导入界面
	 */
	$("#CouponGroupImport").click(function(){
//		CMC.dialog('winMarketingActivityEffect','open');
		$("#CouponGroupInfo").textbox('setValue','');
		$("#CouponGroup_Import").dialog("open");
	});
	//模版下载
	$("#CouponGroup_Template").click(function(){
		window.open(encodeURI("/cmc/download/couponGroupKoreaTemplate.xlsx"));
	});
	/**
	 * 执行文件导入
	 */
	$("#CouponGroupInfo_import").click(function(){
		var val=$("#CouponGroupInfo").val();
		if(val==""){
			CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
			return;
		}
		//审批人
		var approveUserName=$("#approveUserNameADD").val();
		if(approveUserName==""){
			CMC.alertMessage("请先选择审批人！", 'info');
			return;
		}
		//判断文件后缀
		if(val && val != "" && (val.indexOf("xls")==-1 && val.indexOf("xlsx")==-1 && val.indexOf("csv")==-1) ){
			CMC.alertMessage("请选择excel文件。",'warn');
			return ;
		}
		
		var data={"aproveId": $("#aproveIdADD").val()};
		CMC.confirm("是否确认导入文件?",function(r){
			if(r){
				 CMC.showProcessBox();
				CMC.fileUpload({
					url: "authorized/couponGroupKorea/importReport",
					type: "POST",
					dataType: "json",
					fileElementId:  "CouponGroupInfoFile",
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
	});

	
})(jQuery)


function modify(){
	document.getElementById('select').style.display='block';
	document.getElementById('update').style.display='none';
	quickAllQeuryCode(gtype);
	
}
//发放模版下载
function downCouponIssuingTemplate(){
	window.open(encodeURI("/cmc/download/couponIssuingTemplate.xlsx"));
}
//***---判断
function issueCouponOnclick (){
	var record = CMC.grid.datagrid('getSelected');
	var aproveId=$("#issueFormDialog #issuAproveId").val();
	if(!aproveId||aproveId==''||aproveId==null){
		CMC.alertMessage("请填写审核人！",'info');
		return;
	}
	if(record==null){
		CMC.alertMessage("请选择发放批次！",'warn');
		return ;
	}else{
		var type = $("INPUT[name='issueRadio']:checked").val();
		var code = $("#issueCode_file").val();
		if(code.indexOf(".")>0 && code.indexOf("csv")==-1 && code.indexOf("CSV")==-1 && code.indexOf("xls")==-1 && code.indexOf("xlsx")==-1){
			CMC.alertMessage("请上传excel格式的文件。");
			return;
		}else{
			if(code==""){
				CMC.confirm("当前未绑定任何会员信息，是否进行发放?",function(r){
					if(r){
						issue(code, "unbind", type);
					}
				});
			}else {
				issue(code, "excel", type);
			}
		}
	}
};

function issue(message, bindType, type){
	var record = CMC.grid.datagrid('getSelected');
	var groupId = record["groupId"];
	var groupCount = record["codeCount"];
	var faceValue = record["faceValue"];
	var discountType = record["discountType"]
	var createChannel = record["createChannel"];
	console.log(discountType);
	var aproveId=$("#issueFormDialog #issuAproveId").val();
	//默认必传的fileID
	var fileElementId = "issueCode_file";
	CMC.showProcessBox();
	CMC.fileUpload({
		url: CouponGroupMnt.issueUrl,
		method: "POST",
		dataType: "json",
		fileElementId:  fileElementId,
		data:{"channelId":createChannel,"discountType":discountType,"faceValue":faceValue,"aproveId":aproveId,"message":message, "bindType":bindType, "groupId":groupId, "groupCount":groupCount, "type":type},
		success: function(response){
			if(response.statusCode == -808 ){
				CMC.hideProcessBox();
				$("#issueCode_file").val("");
				$("#issueCode").textbox('setValue','');
				CMC.alertMessage(response.messageBody, 'info');
			}else{
				CMC.hideProcessBox();
				CMC.alertMessage("提交发放申请成功！", 'info',CMC.search());
				$("#issueFormDialog").dialog('close');
			}
		},
		error: function(){
			CMC.hideProcessBox();
			CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
		}
	});
}
function doUserOneSearch() {
	openSelect();
	$("#selectApporUser").show().dialog("open");
	window.frames["apporUserSelect"].openIframeId="selectApporUser";
	window.frames["apporUserSelect"].userId="issuAproveId";
	window.frames["apporUserSelect"].userName="issuAproveName";
}
function doUserSearchADD() {
	openSelect();
	$("#selectApporUser").show().dialog("open");
	window.frames["apporUserSelect"].openIframeId="selectApporUser";
	window.frames["apporUserSelect"].userId="aproveIdADD";
	window.frames["apporUserSelect"].userName="approveUserNameADD";
}
function closeCouponGroupImport(){
	$('#CouponGroupInfo').textbox('setValue','');
	$("#approveUserName").textbox("setValue","");
	$("#aproveId").val("");
	CMC.dialog('CouponGroup_Import','close');
}
