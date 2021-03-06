var CouponGroupMnt = {
		menuId: "CouponGroupCSQ",
		searchTableRequired: true,
		getConfigUrl: "authorized/couponGroupCSQ/pageConfig" , 
		addCSQUrl: "authorized/couponGroupCSQ/addCSQ" , 
		updateCSQUrl: "authorized/couponGroupCSQ/updateCSQ" , 
		getUrl: "authorized/couponGroupCSQ/get/" , 
		issueUrl: "authorized/couponGroupCSQ/issue" , 
		exportKeyUrl: "authorized/couponGroupCSQ/exportPrivateKey" ,
		getMailSentCountUrl: "authorized/couponGroupCSQ/getMailSentCount",
		updateMailSentCountUrl: "authorized/couponGroupCSQ/updateMailSentCount",
//		exportReportUrl: "authorized/couponGroupCSQ/exportReport",
		searchUrl: "authorized/couponGroupCSQ/getCSQAll" , //如果searchTableRequired 是 true 必填
		columns :  [[
		               {field: 'online', title:'所属批次号' , width: '0%' , align: 'center', hidden:'true'},
			           {field: 'groupId', title:'所属批次号' , width: '12%' , align: 'center'},
			           {field: 'faceValue', title:'最高抵用面额' , width: '8%' , align: 'center'},
			           {field: 'negotiatedFaceValue', title:'协议价' , width: '6%' , align: 'center'},
			           {field: 'createDate', title:'生成日期' , width: '8%' , align: 'center'},
			           {field: 'createdBy', title:'创建人' , width: '6%' , align: 'center'},
			           {field: 'channelName', title:'渠道' , width: '17%' , align: 'center',
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
					   },
					   {field: 'couponBusiness', title:'适用业务' , width: '17%' , align: 'center',
						   formatter:function(value,row,index){
							   if(value!=undefined&&value!="undefined"){
								   var str = value.split(',');
								   var couponBusiness="";
								   for(var i =0 ; i < str.length; i++){
									   if(str[i]==0||str[i]=='0'){
										   couponBusiness=couponBusiness+"机票,";
									   }else if(str[i]==1||str[i]=='1'){
										   couponBusiness=couponBusiness+"选座,";
									   }else if(str[i]==2||str[i]=='2'){
										   couponBusiness=couponBusiness+"行李,";
									   }else if(str[i]==3||str[i]=='3'){
										   couponBusiness=couponBusiness+"餐食,";
									   }else if(str[i]==4||str[i]=='4'){
										   couponBusiness=couponBusiness+"休息室,";
									   }else if(str[i]==5||str[i]=='5'){
										   couponBusiness=couponBusiness+"中转住宿,";
									   }
								   }
								   return couponBusiness.substring(0,couponBusiness.length-1);
							   }else
								   return "";
						   }
					   },
			           {field: 'discountType', title:'次数券类型' , width: '17%' , align: 'center',
						   formatter:function(value,row,index){
							   var discountType="";
							   if(row.discountType==19||row.discountType=='19'){
								   discountType='国内合作活动次数券';
							   }else if(row.discountType==20||row.discountType=='20'){
								   discountType='国内营销活动次数券';
							   }else if(row.discountType==21||row.discountType=='21'){
								   discountType='国际合作活动次数券';
							   }else if(row.discountType==22||row.discountType=='22'){
								   discountType='国际营销活动次数券';
							   }else if(row.discountType==23||row.discountType=='23'){
								   discountType='国内合作活动协议价次数券';
							   }else if(row.discountType==24||row.discountType=='24'){
								   discountType='国内营销活动协议价次数券';
							   }else if(row.discountType==25||row.discountType=='25'){
								   discountType='国际合作活动协议价次数券';
							   }else if(row.discountType==26||row.discountType=='26'){
								   discountType='国际营销活动协议价次数券';
							   }
							   return discountType;
						   } 
					   },
			           {field: 'status', title:'状态' , width: '8%' , align: 'center',
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
												9、废除（废除该批次。该批次下的未被领用的次数券均需废除）
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
var isInternations;
var param;
var currency;
var channel;

$(document).ready(function(){
	//根据页面需求，把日期的上一年和下一年箭头去掉
	$('.calendar-prevyear').hide();
	$('.calendar-nextyear').hide();
	isInternations = $('#isInternations').val();
	if(isInternations=="7"||isInternations==7){
		channel ="CSQ7";
		param = "?channel=CSQ7&isInternations="+isInternations;
		currency = "元";
	}else if(isInternations=="8"||isInternations==8){
		channel ="CSQ8";
		param = "?channel=CSQ7&isInternations="+isInternations;
		currency = "元";
	}
	CMC.init(CouponGroupMnt);
});



window.onError = function(){
	console.log(e);
};



(function($){
	
	$("#couponSearch").click(function(){
		var couponBusinessValue = "";  
		$("input[name='couponBusinesscx']:checked").each(function(j) {  
		    if (j >= 0) {  
		    	couponBusinessValue += $(this).val() + ","  
		    }  
		});
		document.getElementById("couponBusiness").value = couponBusinessValue.substring(0,couponBusinessValue.length-1);
		CMC.search();
	});
	
	
	$("#searchFormAddCSQ").click(function(){
		$("#createDialog").dialog({
			title:'次数券生成',
			closed:false,
			cache:false,
			modal:true,
			href:"/cmc/module/coupon/couponGroupCSQCreateForm.html"+param,
			onLoad:function () {

				$(".currency").each(function(j,el2){ 
					$(el2).text(currency);
				});
				$("#createDialog #isInternations_create").val(isInternations);
				$("#createDialog #channel").val(channel);
				$("#createDialog #addBtn_create_CSQ").show();
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
				var channelData="";
				if(channel=="CSQ7") {
					channelData=[{"value":"国内合作活动次数券","label":"19"},{"value":"国内营销活动次数券","label":"20"},{"value":"国内合作活动协议价次数券","label":"23"},{"value":"国内营销活动协议价次数券","label":"24"}];
				}else if(channel=="CSQ8") {
					channelData=[{"value":"国际合作活动次数券","label":"21"},{"value":"国际营销活动次数券","label":"22"},{"value":"国际合作活动协议价次数券","label":"25"},{"value":"国际营销活动协议价次数券","label":"26"}];
				}
				$("#createDialog #discountType_create").combobox({
					data: channelData,
					panelHeight: '120px',
					valueField:'label',
					textField:'value',
					panelHeight: '100px' ,

					onChange:discountTypeCheck
				});
				CouponGroupCommon.intConfig(true,true,true,'CSQ');
				
			}
		});
		$("#showChannelName").val();
		$("#showChannelName").hide();
		$('#createCouponGroupForm').form('clear');
		$("#addBtn_create").show();
		$("#count").html(500);
		$('.error').html('');
		$('#segmentType_create').combobox('setValue','0');
		$('#isInternations_create').val(isInternations);
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
	
	$('#searchFormUpdateCSQ').click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record ){
			CMC.alertMessage("请选择一条次数券批次记录!", 'warn');
			return;
		}
		CouponGroupMnt.intConfig(false,false,true);
		var groupId = record['groupId'];
		var src = "/cmc/module/coupon/couponGroupCSQUpdateForm.html"+param+"&groupId="+groupId;
		//CouponGroupMnt.intConfig(false,false,true);
		$('.error').html('');
		$('#updateI18nCouponGroupForm').form('clear');
		$("#updateDialog").dialog({
			title:'次数券修改',
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
			CMC.alertMessage("只有状态为已生成的次数券批次才可以进行发放", 'warn');
			return;
		}

		var status  = record["online"];
		if(status!=0){
			CMC.alertMessage("只有线下的次数券批次才可以进行发放", 'warn');
			return;
		}
		if($("#issueFormDialog #container").length<=0){
			var winTopLeft = CMC.getWindowTopLeft("issueFormDialog");
			$('#issueFormDialog').show().dialog({
				top:winTopLeft.winTop,
				left:winTopLeft.winLeft,
				cache: true,
				href:"/cmc/module/coupon/couponIssuCSQForm.html"
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
	//次数券发放
	
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
			url: CouponGroupMnt.exportKeyUrl + param,
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
			url: CouponGroupMnt.getConfigUrl+param ,
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
		window.open(encodeURI("/cmc/download/couponGroupCSQTemplate.xlsx"));
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
					url: "authorized/couponGroupCSQ/importReport" + param,
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
		url: CouponGroupMnt.issueUrl + param,
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
