var CouponGroupMnt = {
		menuId: "CouponGroup",
		searchTableRequired: true,
		getConfigUrl: "authorized/couponGroup/pageConfig" , 
		addDomesticUrl: "authorized/couponGroup/addDomestic" , 
		updateDomesticUrl: "authorized/couponGroup/updateDomestic" , 
		addI18nUrl: "authorized/couponGroup/addI18n" , 
		updateI18nUrl: "authorized/couponGroup/updateI18n" ,
		getUrl: "authorized/couponGroup/get/" , 
		issueUrl: "authorized/couponGroup/issue" , 
		exportKeyUrl: "authorized/couponGroup/exportPrivateKey" ,
		exportReportUrl: "authorized/couponGroup/exportReport",
		searchUrl: "authorized/couponGroup/getDomesticAll" , //如果searchTableRequired 是 true 必填
		searchI18nUrl: "authorized/couponGroup/getI18nAll" , //如果searchTableRequired 是 true 必填
		searchDomesticUrl: "authorized/couponGroup/getDomesticAll" , //如果searchTableRequired 是 true 必填
		columns :  [[
		               {field: 'online', title:'所属批次号' , width: '0%' , align: 'center', hidden:'true'},
			           {field: 'groupId', title:'所属批次号' , width: '14%' , align: 'center'},
			           {field: 'faceValue', title:'面值' , width: '5%' , align: 'center'},
			           {field: 'createDate', title:'生成日期' , width: '12.5%' , align: 'center'},
			           {field: 'createdBy', title:'创建人' , width: '12.5%' , align: 'center'},
			           {field: 'channelName', title:'渠道' , width: '14%' , align: 'center',
						   formatter : function(value,row,index) {
								var createChannel="";
								if(row.createChannel){
									createChannel= row.createChannel;
								}
								var channelName="";
								if(!channelFlag){
									CouponGroupMnt.intConfig(true,true);
									//获取后端渠道数据复制给全局变量channelLists
								}
								if(channelLists!=undefined && channelLists!=null){
									for ( var i = 0; i < channelLists.length; i++) {
										var channelList = channelLists[i];
										if(createChannel == channelList.code){
											channelName= channelList.name
										}
									}
								}
							   return "["+createChannel+"]"+channelName;

						   }
					   },//0、已生成未发放 1、未使用 2、已挂起 3、已使用 4、已作废
					   {field: 'couponBusiness', title:'适用业务' , width: '12%' , align: 'center',
						   formatter:function(value,row,index){
							   var couponBusiness="";
							   if(row.couponBusiness==0||row.couponBusiness=='0'){
								   couponBusiness="机票";
							   }else if(row.couponBusiness==1||row.couponBusiness=='1'){
								   couponBusiness="选座";
							   }else if(row.couponBusiness==2||row.couponBusiness=='2'){
								   couponBusiness="行李";
							   }else if(row.couponBusiness=='0,1'){
								   couponBusiness="机票,选座";
							   }else if(row.couponBusiness=='0,2'){
								   couponBusiness="机票,行李";
							   }else if(row.couponBusiness=='1,2'){
								   couponBusiness="选座,行李";
							   }else if(row.couponBusiness=='0,1,2'){
								   couponBusiness="机票,选座,行李";
							   }else{
								   couponBusiness="机票";
							   }
							   return couponBusiness;
						   }
					   },
			           {field: 'discountType', title:'优惠券类型' , width: '20%' , align: 'center',
						   formatter:function(value,row,index){
							   var discountType="";
							   if(row.discountType==0||row.discountType=='0'){
								   discountType="国内收入现金优惠券";
							   }else if(row.discountType==1||row.discountType=='1'){
								   discountType="国内运价优惠券";
							   }else if(row.discountType==2||row.discountType=='2'){
								   discountType="国内费用现金优惠券";
							   }else if(row.discountType==5||row.discountType=='5'){
								   discountType='国内里程优惠券';
							   }else if(row.discountType==6||row.discountType=='6'){
								   discountType='国内旅客服务优惠券';
							   }
							   return discountType;
						   }
					   },
			           {field: 'status', title:'状态' , width: '10%' , align: 'center',
			        	   formatter : function(value,row,index) {
							   var statusStr="";
							   if(row.status==0||row.status=='0'){
								   statusStr="未生成";
							   }else if(row.status==1||row.status=='1'){
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
var channelFlag=false;
var upFileFlag;
var issueFileFlag;
var exportKeyFlag;
var channelLists;

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
	
	$("#searchFormAdd").click(function(){
		$("#createDialog").dialog({
			title:'国内优惠券生成',
			closed:false,
			cache:false,
			modal:true,
			href:"/cmc/module/coupon/couponGroupCreateForm.html?scope=domestic",
			onLoad:function () {
				$("#createDialog #isInternations_create").val("0");
				$("#createDialog #addBtn_create_domestic").show();
				$("#createDialog #addBtn_create_I18n").hide();
				$("#createDialog #addBtn_create_AUS").hide();
				$("#createDialog #addBtn_create_korea").hide();
				$("#createDialog #restrict2").hide();
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
						{id:'0',name:'国内收入现金优惠券'},
						{id:'1',name:'国内运价优惠券'},
						{id:'2',name:'国内费用现金优惠券'}/*,
						{id:'5',name:'国内里程优惠券'},
		                {id:'6',name:'国内旅客服务优惠券'}*/
					],
					panelHeight: '120px',
					valueField:'id',
					textField:'name',
					panelHeight: '100px' ,

					onChange:discountTypeCheck
				});
				CouponGroupCommon.intConfig(true,true,true,'domestic');
			}
		});
		$("#showChannelName").val();
		$("#showChannelName").hide();
		$('#createCouponGroupForm').form('clear');
		$("#addBtn_create").show();
		$("#count").html(500);
		$('.error').html('');
		$('#segmentType_create').combobox('setValue','0');
		$('#isInternations_create').val('0');
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
	
	$('#searchFormUpdate').click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record ){
			CMC.alertMessage("请选择一条国内优惠券批次记录!", 'warn');
			return;
		}
		CouponGroupMnt.intConfig(false,false,true);
		var groupId = record['groupId'];
		var src = "/cmc/module/coupon/couponGroupUpdateForm.html?scope=Domestic&groupId="+groupId;
		//CouponGroupMnt.intConfig(false,false,true);
		$('.error').html('');
		$('#updateI18nCouponGroupForm').form('clear');
		$("#updateDialog").dialog({
			title:'国内优惠券修改',
			closed:false,
			cache:false,
			modal:true,
			content:'<iframe id="createFrame" name="createFrame" src='+src+' frameborder="no" border="0" scrolling="no" style="width:818px;height:1000px;"></iframe>'
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
				href:"/cmc/module/coupon/couponIssuForm.html"
			});
		}else{
			$("#issuAproveName").textbox('setValue',"");
			$("#issuAproveId").val('');
			$('#upload-excel')[0].reset();
		}
		$("#issueFormDialog").show().dialog("open");

	});
	
	/*$("#searchFormIssue").click(function(){
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

		$("#issueFormDialog #issuAproveId").val("");
		$("#issueFormDialog #issueCode_file").val("");
		$("#issueFormDialog #issuAproveName").val("");
		$("#issueFormDialog #issueCode").val("");
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
				href:"/cmc/module/coupon/couponIssuForm.html"
			});
		}else{
			$('#upload-excel')[0].reset();
		}
		$("#issueFormDialog").show().dialog("open");
		
	});*/
	
	
	
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
		$('#groupId_file').val('');
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
		if(!channelFlag){
			CMC.request({
				url: CouponGroupMnt.getConfigUrl ,
				method: 'GET',
				success: function(message){
					if(initChannel){
						var channelList = message.messageBody.channelList;
						channelLists = channelList;
						channelFlag = true;
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
	}
	
	/**
	 * 打开导入界面
	 */
	$("#CouponGroupImport").click(function(){
//		CMC.dialog('winMarketingActivityEffect','open');
		$("#CouponGroupInfo").textbox('setValue','');
		$("#domesticAproveName").textbox('setValue','');
		$("#domesticAproveId").val('');
		$("#CouponGroup_Import").dialog("open");
	});
	//模版下载
	$("#CouponGroup_Template").click(function(){
		window.open(encodeURI("/cmc/download/couponGroupTemplate.xlsx"));
	});
	/*//发放模版下载
	$("#CouponIssuing_Template").click(function(){
		window.open(encodeURI("/cmc/download/couponIssuingTemplate.xlsx"));
	});*/
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
		var approveUserName=$("#domesticAproveName").val();
		if(approveUserName==""){
			CMC.alertMessage("请先选择审批人！", 'info');
			return;
		}
		//判断文件后缀
		if(val && val != "" && (val.indexOf("xls")==-1 && val.indexOf("xlsx")==-1 && val.indexOf("csv")==-1) ){
			CMC.alertMessage("请选择excel文件。",'warn');
			return ;
		}
		
		var data={"aproveId": $("#domesticAproveId").val()};
		console.log(data);
		CMC.confirm("是否确认导入文件?",function(r){
			if(r){
				 CMC.showProcessBox();
				CMC.fileUpload({
					url: "authorized/couponGroup/importReport",
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
	//$("#selectApporUser").show().dialog("open");
	openSelect();
	$("#selectApporUser").show().dialog("open");
	window.frames["apporUserSelect"].openIframeId="selectApporUser";
	window.frames["apporUserSelect"].userId="issuAproveId";
	window.frames["apporUserSelect"].userName="issuAproveName";
}
function doDomesticUserSearch(){
	openSelect();
	$("#selectApporUser").show().dialog("open");
	window.frames["apporUserSelect"].openIframeId="selectApporUser";
	window.frames["apporUserSelect"].userId="domesticAproveId";
	window.frames["apporUserSelect"].userName="domesticAproveName";
}
function closeIssueFormDialog(){
	$('#issueCode').textbox('setValue','');
	$("#issuAproveName").textbox("setValue","");
	$("#issuAproveId").val("");
	CMC.dialog('issueFormDialog','close');
}
//发放模版下载
function downCouponIssuingTemplate(){
	window.open(encodeURI("/cmc/download/couponIssuingTemplate.xlsx"));
};
