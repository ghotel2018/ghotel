/**
 * 
 */

var CouponMnt = {
		menuId : 'CouponI18n',
		searchTableRequired : true,
		searchTableWidth: '100%',
		searchUrl: "authorized/couponI18n/getAll" , //如果searchTableRequired 是 true 必填
		getUrl: "authorized/couponI18n/get/" ,
		batchUpdateUrl: "authorized/couponI18n/batchUpdate" ,
		exportUrl: "authorized/couponI18n/export" ,
		getConfigUrl : "authorized/couponI18n/getConfig" ,
		initNotSearch:true,
		columns : [ [{
			field : 'groupId',
			title : '所属批次号',
			width : '15%',
			align : 'center'
		},{
			field : 'couponCode',
			title : '劵码',
			width : '15%',
			align : 'center'
		}, {
			field : 'faceValue',
			title : '面值',
			width : '10%',
			align : 'center'
		},
		{field: 'usefulStartDate', title:'使用有效期' , width: '14%' , align: 'center',
     	   formatter: function(value,row,index){
     		   if (value!=null){
     			   return value.substr(0,10)+" | "+row.usefulEndDate.substr(0,10);
     		   }
     	   }
        },{field: 'couponBusiness', title:'适用业务' , width: '12%' , align: 'center',
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
				   }
				   return couponBusiness;
			   }
		   },{
			field : 'status',
			title : '状态',
			width : '12%',
			align : 'center',
			formatter : function(value,row,index) {
					console.log(row);
			   var statusStr="";
			   if(row.status==0||row.status=='0'){
				   statusStr="已生成未发放";
			   }else if(row.status==1||row.status=='1'){
				   statusStr="领取未使用";
			   }else if(row.status==2||row.status=='2'){
				   statusStr="已挂起";
			   }else if(row.status==3||row.status=='3'){
				   statusStr="已使用";
			   }else if(row.status==4||row.status=='4'){
				   statusStr="已作废";
			   }else if(row.status==5||row.status=='5'){
				   statusStr="已过期";
			   }
			   return statusStr;
		   }
		}, {
			field : 'couponType',
			title : '优惠券类型',
			width : '20%',
			align : 'center',
			formatter: function(value,row,index){
				if(value==0 || value=='0'){ 
					return '国内收入现金优惠券';
				}else if(value==1 || value=='1'){ 
					return '国内运价优惠券';
				}else if(value==2 || value=='2'){
					return '国内费用现金优惠券';
				}/*else if(value==3 || value=='3'){
					return '国际营销活动优惠券';
				}else if(value==4 || value=='4'){ 
					return '国际合作活动优惠券';
				}*/else if(value==3 || value=='3'){
					return '国际虚拟资金优惠券';
				}else if(value==4 || value=='4'){ 
					return '国际自有资金优惠券';
				}else if(value==5 || value=='5'){ 
					return '国内里程优惠券';
				}else if(value==6 || value=='6'){ 
					return '国内旅客服务优惠券';
				}/*else if(value==7 || value=='7'){ 
					return '国际里程优惠券';
				}else if(value==8 || value=='8'){ 
					return '国际旅客服务优惠券';
				}*/else{
					return value;
				}
			}
		}
		] ],
	    onDblClickRow: function(){
	    	$("#checkCouponDetail").click();
	    }

	};

var uploadFlag;
(function($) {

	$('#createReportingTask').click(function(){
		if($('#reportDate_value').val()==null || $('#reportDate_value').val()==''){
			CMC.alertMessage("请选择要导出的报表数据!", 'warn',$('#selectExportData').click());
			return;
		}
		
		var startUserDate=$("#startUserDate").datebox('getValue');
		var endUserDate=$("#endUserDate").datebox('getValue');
		if(startUserDate!=""&&endUserDate!=""){
			if(!CouponMnt.isArea(startUserDate,endUserDate)){
				return;
			}
		}
		
		var createDateStart=$("#createDateStart").datebox('getValue');
		var createDateEnd=$("#createDateEnd").datebox('getValue');
		if(createDateStart!=""&&createDateEnd!=""){
			if(!CouponMnt.isArea(createDateStart,createDateEnd)){
				return;
			}
		}
		
		var useDateStart=$("#useDateStart").datebox('getValue');
		var useDateEnd=$("#useDateEnd").datebox('getValue');
		if(useDateStart!=""&&useDateEnd!=""){
			if(!CouponMnt.isArea(useDateStart,useDateEnd)){
				return;
			}
		}
		var createBy=$("#createBy").textbox('getValue');
		var discountType=$("#discountType").combobox('getValue');
		var channelId=$("#channelId").combobox('getValue');
		var status=$("#status").combobox('getValue');
		var groupId=$("#groupId").textbox('getValue');
		/*if((startUserDate==""||endUserDate=="")&&(createDateStart==""||createDateStart=="")&&(useDateStart==""||useDateEnd=="")&&createBy==""&&discountType==""&&channelId==""&&status==""&&groupId==""){
			CMC.alertMessage("请 请至少输入一项条件【开始日期和结束日期算作一项】!", 'warn');
			return;
		}*/
		CMC.request({
			url: CouponMnt.exportUrl,
			method: 'POST',
			data : $("#exportCouponForm").form().serialize(),
			success: function(message){
				CMC.alertMessage("优惠券报表请求完成,请移步首页并查看报表记录下载文件！", 'info');
		  		CMC.dialog('exportCouponDialog','close');
			}
		});
	});
	
	$("INPUT[name='bindRadio']").bind("change", function(){
		$("#bindingType").val($(this).val());
	});
	
	$("#couponSearch").click(function(){
		var bindEmail = $('#bindEmail').val();
		var bindMobile = $('#bindMobile').val();
		var bindID = $('#bindID').val();
		var bindMember = $('#bindMember').val();
		var discountCode = $('#discountCode').val();
		var groupIdcx = $('#groupIdcx').val();
		if(bindEmail=="" && bindMobile=="" && 
			bindID=="" && bindMember=="" && 
			discountCode=="" && groupIdcx==""){
			CMC.alertMessage("所属批次号、优惠劵码、绑定会员、绑定证件、绑定手机、绑定邮箱至少输入一个!",'warn');
		}else{
			CMC.search();
		}
	})
	
	//查看优惠券信息
	$("#checkCouponDetail").click(function(){
		var val = CMC.grid.datagrid("getSelected");
		if (val == null && val != "") {
			CMC.alertMessage("请选择需查看的优惠劵！",'warn');
		} else {
			//清除原来的内容
			$("#exportCouponForm")[0].reset();
			
			CMC.dialog('codeInfo_div','open');
			CMC.request({
						url : "/cmc/authorized/coupon/get/"+val['groupId'],
						type : "get",
						dataType : "json",
						async : true,
						success : function(response) {
							if (response.messageBody){
								var detailInfo = response.messageBody;
								var FLIGHTDATE = new Date(detailInfo["flightStartTime"]).toLocaleDateString()+"--"+new Date(detailInfo["flightEndTime"]).toLocaleDateString();
								var USEFULDATE = new Date(detailInfo["usefulStartDate"]).toLocaleDateString()+"--"+new Date(detailInfo["usefulEndDate"]).toLocaleDateString();

								var FLIGHTTIMETYPE = detailInfo["flightTimeType"];
								var FLIGHTTIMETYPEStr="";
								if (FLIGHTTIMETYPE.indexOf("0")!=-1) {
									FLIGHTTIMETYPEStr += "早班:00:00~09:59"+",";
								} 
								if (FLIGHTTIMETYPE.indexOf("1")!=-1) {
									FLIGHTTIMETYPEStr += "中班:10:00~13:59" +",";
								} 
								if (FLIGHTTIMETYPE.indexOf("2")!=-1) {
									FLIGHTTIMETYPEStr += "午班:14:00~17:59" + ",";
								} 
								if (FLIGHTTIMETYPE.indexOf("3")!=-1) {
									FLIGHTTIMETYPEStr += "晚班:18:00~23:59" +",";
								}
								FLIGHTTIMETYPEStr = FLIGHTTIMETYPEStr.substring(0, FLIGHTTIMETYPEStr.length-1);
								var STATUS = val["status"];
								if (STATUS == "0") {
									STATUS = "已生成未发放";
								} else if (STATUS == "1") {
									STATUS = "领取未使用";
								} else if (STATUS == "2") {
									STATUS = "已挂起";
								} else if (STATUS == "3") {
									STATUS = "已使用";
								} else if (STATUS == "4") {
									STATUS = "已作废";
								}else if (STATUS == "5") {
									STATUS = "已过期";
								}
								var SEGMENTTYPE = detailInfo["segmentType"]==null ? '' : detailInfo["segmentType"];
								var SEGMENTINFO = detailInfo["segmentInfo"]==null ? '': detailInfo["segmentInfo"];
								var st = "不限制";
								if (SEGMENTTYPE == "1") {
									st = "航段（包含）";
								} else if (SEGMENTTYPE == "2") {
									st = "航段（除外）";
								} else if (SEGMENTTYPE == "3") {
									st = "始发机场（包含）";
								} else if (SEGMENTTYPE == "4") {
									st = "始发机场（除外）";
								} else if (SEGMENTTYPE == "5") {
									st = "到达机场（包含）";
								} else if (SEGMENTTYPE == "6") {
									st = "到达机场（除外）";
								}

								$("#codeInfo_table #userestriction_create").combobox('setValue',detailInfo['isStriction']);
								var couponCodeM = val['couponCodeM'];
								var couponCodeMStr = "";
								if(couponCodeM==null || couponCodeM==undefined){
									couponCodeMStr="";
								}else if(couponCodeM.length > 20){
									couponCodeMStr = couponCodeM;
								}else{
									couponCodeMStr = couponCodeM;
								}
								$("#codeInfo_table #detail_code_m").text(couponCodeMStr);
								$("#codeInfo_table #detail_code_m").attr("title",couponCodeM);
								$("#codeInfo_table #detail_code").text(val['couponCode']);
								$("#codeInfo_table #groupCode").text(detailInfo["groupId"]);
								$("#codeInfo_table #faceValue").text(detailInfo["faceValue"]);
								$("#codeInfo_table #filghtDate").text(FLIGHTDATE);
								$("#codeInfo_table #usefulDate").text(USEFULDATE);
								$("#codeInfo_table #segmentType").text(st);
								$("#codeInfo_table #segmentInfo").text(SEGMENTINFO);
								//$("#codeInfo_table #cabinType").text(detailInfo["cabinType"]);
								$("#codeInfo_table #segPriceLimit").text(detailInfo["segPriceLimit"]==null?'无':detailInfo["segPriceLimit"]);
								$("#codeInfo_table #segPriceLimitSeat").text(detailInfo["segPriceLimitSeat"]==null?'无':detailInfo["segPriceLimitSeat"]);
								$("#codeInfo_table #segPriceLimitLuggage").text(detailInfo["segPriceLimitLuggage"]==null?'无':detailInfo["segPriceLimitLuggage"]);
								$("#codeInfo_table #createChannel").text(detailInfo["channelId"]);
								$("#codeInfo_table #flighttimetype").text(FLIGHTTIMETYPEStr);
								$("#codeInfo_table #activityDescribe").text(detailInfo["remark"]==null?'无':detailInfo["remark"]);
								$("#codeInfo_table #detail_bindMember").text(val["memberId"]==null?"无":val["memberId"]);
								$("#codeInfo_table #detail_bindEmail").text(val["bindEmails"]==null?"无":val["bindEmails"]);
								$("#codeInfo_table #detail_bindID").text(val["idcard"]==null?'无':val["idcard"]);
								$("#codeInfo_table #detail_bindMobile").text(val["mobile"]==null?'无':val["mobile"]);
								$("#codeInfo_table #createDate").text(new Date(detailInfo["createdTime"]).toLocaleDateString());
								$("#codeInfo_table #discountStatus").text(STATUS);
								$("#codeInfo_table #timeZone").text(detailInfo["timeZone"]);
								$("#codeInfo_div input[name='gatewaycheck']").attr("checked", false);
								$.each(detailInfo['gatewayCode'].split(','),function(i,el1){
									$(" input[name='gatewaycheck']").each(function(j,el2){
										if($(el2).val()==el1){
											$(el2).prop("checked", true).attr("checked", true)
										}
									});
									
								});
								
								var usedchannel=","+detailInfo["usedChannel"]+",";
								$(" input[name='usedChannel']").each(function(j,el2){
									var tmp=","+$(el2).val()+",";
									if(usedchannel.indexOf(tmp)>=0){
										$(el2).prop("checked", true);
									}else{
										$(el2).prop("checked", false);
									}
								});
								
								$("#codeInfo_div input[name='cabinType']").attr("checked", false);
							    $.each(detailInfo["cabinType"].split(','),function(i,el1){
							      $("#codeInfo_div input[name='cabinType']").each(function(j,el2){
							        if($(el2).val()==el1){
							          $(el2).prop("checked", true).attr("checked", true)
							        }
							      });
							    });
							    
							    $("#codeInfo_div input[name='seatRestriction']").attr("checked", false);
							    if(detailInfo["seatRestriction"]!=null){
							    	$("#codeInfo_div input[name='seatRestriction']").attr("checked", false);
							    	$.each(detailInfo["seatRestriction"].split(','),function(i,el1){
							    		$("#codeInfo_div input[name='seatRestriction']").each(function(j,el2){
							    			if($(el2).val()==el1){
							    				$(el2).prop("checked", true).attr("checked", true)
							    			}
							    		});
							    	});
							    }
							    
							    $("#codeInfo_div input[name='couponBusiness']").attr("checked", false);
							    $.each(detailInfo["couponBusiness"].split(','),function(i,el1){
							      $("#codeInfo_div input[name='couponBusiness']").each(function(j,el2){
							        if($(el2).val()==el1){
							          $(el2).prop("checked", true).attr("checked", true)
							        }
							      });
							    });
							}
						}
					});

		}
		
		
	});
	
	
	CouponMnt.showDetails = function(info){
       /* $.messager.show({
            title:'舱位信息',
            msg: info,
            showType:'show',
            style:{
                right: '',
                'white-space': 'normal',
                'word-break': 'break-all',
                bottom: ''
            }
        });*/
		$.each(info.split(','),function(i,el1){
			$("#showCanbinTypeDialog input[name='cabinType']").each(function(j,el2){
				if($(el2).val()==el1){
					$(el2).prop("checked", true).attr("checked", true)
				}
			});
			
		});
		CMC.dialog("showCanbinTypeDialog", "open");
	}
	CouponMnt.init = function(){
		CouponMnt.intConfig();
	}
	
	CouponMnt.intConfig = function(){
		
		CMC.request({
			url: CouponMnt.getConfigUrl ,
			method: 'GET',
			success: function(message){
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
					var gatewayHtml;
					if(message.messageBody.gatewayList){
						$.each(message.messageBody.gatewayList, function(index, record){
							var type = record["TYPE"];
							if(type=="three")
								type = "第三方支付";
							else if(type=="install")
								type = "分期支付";
							else if(type=="YH")
								type = "银行支付";
							else if(type=="shortcut")
								type = "快捷支付";
							else if(type=="YDZF")
								type = "移动支付";
							else 
								type = "其他支付";
							gatewayHtml += "<tr>";
							gatewayHtml += "<td style='text-align: center;'><input onclick='checkBoxClick($(this))' name='gatewaycheck' type='checkbox' disabled value='"+record["ID"]+"'/></td>";
							gatewayHtml += "<td>"+type+"</td>";
							gatewayHtml += "<td>"+record["NAME"]+"</td>";
							gatewayHtml += "</tr>";
						});
					}
					$("#gatewayTable").html(gatewayHtml);
			}
		});
	}
	$("#showBatchUpadteDialog").click(function(){
		$("#BatchUpdateForm").form('reset');
		CMC.dialog('couponBatchUpdateDialog','open');
		
	});		
	
	$("#selectExportData").click(function(){
		$("#reportform").form('reset');
		CMC.dialog('exportColumnDialog','open');
	});
	
	$('#selectAllColumn').click(function(){
		$("INPUT[name='report']:checkbox").prop("checked", true).attr("checked", true);
	});
	
	$('#notselectAllColumn').click(function(){
		$("INPUT[name='report']:checkbox").prop("checked", true).attr("checked", false);
	});
	
	
	$('#reportDataSelected').click(function(){
		var reportData ="";
		$("INPUT[name='report']:checked").each(function(index,ele){
			reportData += $(ele).val()+",";
		});
		
		if(reportData.length==0){
			CMC.alertMessage("请选择要导出的报表数据!", 'warn');
			return;
		}else{
			reportData = reportData.substring(0, reportData.length-1);
		}
		$('#reportDate_value').val(reportData);
		$('#exportColumnDialog').dialog('close');
	});
	
	$('#showReportExportDialog').click(function(){
		$("#exportCouponForm")[0].reset();
		CMC.dialog('exportCouponDialog','open');
	});
	
/*	$('#batchUpdate_file').bind('change',function(){
		uploadFlag = "excel";
		$('#dicountCodes').val($(this).val());
	});*/
	
	$('#dicountCodes').bind('keyup', function(){
		uploadFlag = "";
		$('#batchUpdate_file').val("");
	});

	
	$("#batchUpdateSubmit").click(function(){
		var dicountCodes = $('#dicountCodes').val();
		var batchUpdate_file = $("#batchUpdate_file").val();
		var actionType = $('#actionType').combobox('getValue');
		if (dicountCodes==null || dicountCodes == "") {
			CMC.alertMessage("请选择文件或填入优惠券码!",'warn');
			return;
		} 
		
		if(actionType==null || actionType==''){
			CMC.alertMessage("请选择操作类型!",'warn');
			return;
		}
		//if(dicountCodes.indexOf(".")>0 && (dicountCodes.indexOf("csv")==-1 && dicountCodes.indexOf("CSV")==-1)){
		if(dicountCodes.indexOf(".")>0 && dicountCodes.indexOf("csv")==-1 && dicountCodes.indexOf("CSV")==-1 && dicountCodes.indexOf("xls")==-1 && dicountCodes.indexOf("xlsx") ==-1){
			CMC.alertMessage("请选择csv格式的文件。",'warn');
			return ;
		}
		///判断类型
		var inputType ="input";
		if(batchUpdate_file!=null 
				&& batchUpdate_file!='' 
			&& (dicountCodes.indexOf("xls")>0
					||dicountCodes.indexOf("xlsx")>0
					||dicountCodes.indexOf("csv")>0)){
			inputType = "excel";
		}
		CMC.showProcessBox();
		CMC.fileUpload({
			url: CouponMnt.batchUpdateUrl,
			method: "POST",
			dataType: "json",
			fileElementId:  "batchUpdate_file",
			data:{"inputType":inputType, "actionType":actionType, "discountCode":dicountCodes},
			success: function(response){
				CMC.hideProcessBox();
		  		CMC.alertMessage(response.messageBody, 'info');
//				CMC.search();//CMC.alertMessage("异步批量更新任务生成成功,请移步首页并查看报表记录下载文件！", 'info');
		  		CMC.dialog('couponBatchUpdateDialog','close');
		  	},
		  	error: function(){
		  		CMC.hideProcessBox();
		  		CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
		  	}
		});
			
	});
	
	/**
	 * 判断时间范围
	 */
	CouponMnt.isArea=function(start,end){
		var startD;
		var endD;
		var days;
		startD = new Date(Date.parse(start.replace(/-/g,"/")));
		endD   = new Date(Date.parse(end.replace(/-/g,"/")));
		days = parseInt((endD.getTime()-startD.getTime()) / (1000 * 60 * 60 * 24));
		if(days > 30){
			CMC.alertMessage("日期范围应在一个月之内", 'warn');
			return false;
		}
		return true;
	}
})(jQuery);
	
	
updateTypeChange = function(newv,oldv){
	$('#dicountCodes').val('');
}


$(document).ready(function(){
	CMC.init(CouponMnt);
});