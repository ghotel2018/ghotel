/**
 * ouyang
 */

var CouponAUSMnt = {
		menuId : 'CouponAUS',
		searchTableRequired : true,
		initNotSearch:true,
		searchTableWidth: '100%',
		searchUrl: "authorized/couponAUS/getAll" , //如果searchTableRequired 是 true 必填
		getUrl: "authorized/couponAUS/get/" ,
		batchUpdateUrl: "authorized/couponAUS/batchUpdate" ,
		exportUrl: "authorized/couponAUS/export" ,
		getConfigUrl : "authorized/couponAUS/getConfig" ,
		columns : [ [  {
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
		{field: 'usefulStartDate', title:'使用有效期' , width: '20%' , align: 'center',
     	   formatter: function(value,row,index){
     		   if (value!=null){
     			   return value.substr(0,10)+" | "+row.usefulEndDate.substr(0,10);
     		   }
     	   }
        },{
			field : 'status',
			title : '状态',
			width : '15%',
			align : 'center',
			formatter : function(value,row,index) {
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
				if(value==11||value=='11'){
					return "澳洲自有资金优惠券";
				}else if(value==12||value=='12'){
					return "澳洲虚拟资金优惠券";
				}else{
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

	$("#couponAUSSearch").click(function(){
		var bindEmail = $('#bindEmail').val();
		var bindMobile = $('#bindMobile').val();
		var bindID = $('#bindID').val();
		var bindMember = $('#bindMember').val();
		var discountCode = $('#discountCode').val();
		var groupId = $('#groupId').val();
		if((bindEmail=="" || bindEmail==undefined) && (bindMobile=="" || bindMobile==undefined) && 
				(bindID=="" || bindID==undefined) && (bindMember=="" || bindMember==undefined)&& 
				(discountCode=="" ||discountCode==undefined) && (groupId=="" || groupId==undefined)){
			CMC.alertMessage("请输入至少一个查询条件！",'warn');
		}else{
			CMC.search();
		}
	})

	$('#createReportingTask').click(function(){
		if($('#reportDate_value').val()==null || $('#reportDate_value').val()==''){
			CMC.alertMessage("请选择要导出的报表数据!", 'warn',$('#selectExportData').click());
			return;
		}
		
		var startUserDate=$("#startUserDate").datebox('getValue');
		var endUserDate=$("#endUserDate").datebox('getValue');
		if(startUserDate!=""&&endUserDate!=""){
			if(!CouponAUSMnt.isArea(startUserDate,endUserDate)){
				return;
			}
		}
		
		var createDateStart=$("#createDateStart").datebox('getValue');
		var createDateEnd=$("#createDateEnd").datebox('getValue');
		if(createDateStart!=""&&createDateEnd!=""){
			if(!CouponAUSMnt.isArea(createDateStart,createDateEnd)){
				return;
			}
		}
		
		var useDateStart=$("#useDateStart").datebox('getValue');
		var useDateEnd=$("#useDateEnd").datebox('getValue');
		if(useDateStart!=""&&useDateEnd!=""){
			if(!CouponAUSMnt.isArea(useDateStart,useDateEnd)){
				return;
			}
		}
		var createBy=$("#createBy").textbox('getValue');
		var discountType=$("#discountType").combobox('getValue');
		var channelId=$("#channelId").combobox('getValue');
		var status=$("#status").combobox('getValue');
		var groupId=$("#groupIds").val();
		/*if((startUserDate==""||endUserDate=="")&&(createDateStart==""||createDateStart=="")&&(useDateStart==""||useDateEnd=="")&&createBy==""&&discountType==""&&channelId==""&&status==""&&groupId==""){
			CMC.alertMessage("请 请至少输入一项条件【开始日期和结束日期算作一项】!", 'warn');
			return;
		}*/
		CMC.request({
			url: CouponAUSMnt.exportUrl,
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

	//查看优惠券信息
	$("#checkCouponDetail").click(function(){
		var val = CMC.grid.datagrid("getSelected");
		if (val == null && val != "") {
			CMC.alertMessage("请选择需查看的优惠劵！",'warn');
		} else {
			CMC.dialog('codeInfo_div','open');
			//清除原来的内容
			$("#exportCouponForm")[0].reset();
			
			CMC.request({
						url : "/cmc/authorized/couponAUS/get/"+val['groupId'],
						type : "get",
						dataType : "json",
						async : true,
						success : function(response) {
							CMC.dialog('codeInfo_div','open');
							if (response.messageBody){
								var detailInfo = response.messageBody.results;
								var channelList = response.messageBody.channelList;
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
								var STATUS = detailInfo["status"];
								var PASTFLAG = detailInfo["pastedFlag"]
								STATUS = val['status'];
									if (STATUS == "0") {
										STATUS = "已生成未发放";
									} else if (STATUS == "1") {
										STATUS = "领取未使用 ";
									} else if (STATUS == "2") {
										STATUS = "已挂起";
									} else if (STATUS == "3") {
										STATUS = "已使用";
									} else if (STATUS == "4") {
										STATUS = "已作废";
									} else if (STATUS == "5") {
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
								var channelId = detailInfo["channelId"];
								for ( var i = 0; i < channelList.length; i++) {
									channels = channelList[i];
									if(channelId == channels.code){
										channelId="["+channelId+"]"+channels.name;
										break;
									}
									
								}
								$("#codeInfo_table #userestriction_aus").combobox('setValue',detailInfo['isStriction']);
								$("#codeInfo_table #detail_code").text(val['couponCode']);
								var couponCodeM = val['couponCodeM'];
								var couponCodeMStr = "";
								if(couponCodeM==null || couponCodeM==undefined){
									couponCodeMStr="";
								}else if(couponCodeM.length > 20){
									couponCodeMStr = couponCodeM;
								}else{
									couponCodeMStr = couponCodeM;
								}
								console.log(couponCodeMStr);//
								$("#codeInfo_table #detail_code_m").text(couponCodeMStr);
								$("#codeInfo_table #detail_code_m").attr("title",couponCodeM);
								$("#codeInfo_table #groupCode").text(detailInfo["groupId"]);
								$("#codeInfo_table #faceValue").text(detailInfo["faceValue"]);
								$("#codeInfo_table #filghtDate").text(FLIGHTDATE);
								$("#codeInfo_table #usefulDate").text(USEFULDATE);
								$("#codeInfo_table #segmentType").text(st);
								$("#codeInfo_table #segmentInfo").text(SEGMENTINFO);
								//$("#codeInfo_table #cabinType").text(detailInfo["cabinType"]);
								$("#codeInfo_table #segPriceLimit").text(detailInfo["segPriceLimit"]);
								$("#codeInfo_table #createChannel").text(channelId);
								$("#codeInfo_table #flighttimetype").text(FLIGHTTIMETYPEStr);
								$("#codeInfo_table #activityDescribe").text(detailInfo["remark"]==null?'无':detailInfo["remark"]);
								$("#codeInfo_table #detail_bindMember").text(val["memberId"]==null?"无":val["memberId"]);
								$("#codeInfo_table #detail_bindID").text(val["idcard"]==null?'无':val["idcard"]);
								$("#codeInfo_table #detail_bindMobile").text(val["mobile"]==null?'无':val["mobile"]);
								$("#codeInfo_table #detail_bindEmail").text(val["bindEmails"]==null?'无':val["bindEmails"]);
								$("#codeInfo_table #createDate").text(new Date(detailInfo["createdTime"]).toLocaleDateString());
								$("#codeInfo_table #timeZone").text(detailInfo["timeZone"]);
								$("#codeInfo_table #discountStatus").text(STATUS);
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
								//console.log(detailInfo);
								//console.log(val);
								$("#codeInfo_div input[name='cabinType']").attr("checked", false);
							    $.each(detailInfo["cabinType"].split(','),function(i,el1){
							      $("#codeInfo_div input[name='cabinType']").each(function(j,el2){
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
	
	
	CouponAUSMnt.showDetails = function(info){
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
	CouponAUSMnt.init = function(){
		CouponAUSMnt.intConfig();
	}
	
	CouponAUSMnt.intConfig = function(){
		
		CMC.request({
			url: CouponAUSMnt.getConfigUrl ,
			method: 'GET',
			success: function(message){
				    var channelList = message.messageBody.channelList;
				    /*for(var i =0 ; channelList && i < channelList.length; i++){
				    	if(Number(channelList[i]["channelId"])<10){
				    		channelList[i]["channelId"] = "0" + channelList[i]["channelId"];
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
							else if(type=="epay")
								type = "epay";
							else if(type=="cybs")
								type = "cybersource";
							else if(type=="wdp")
								type = "worldpay";
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
		$("#startUserDate").datebox('setValue','');
		$("#endUserDate").datebox('setValue','');
		$("#createDateStart").datebox('setValue','');
		$("#createDateEnd").datebox('setValue','');
		$("#createDateStart").datebox('setValue','');
		$("#createDateEnd").datebox('setValue','');
		$("#createBy").textbox('setValue','');
		$("#discountType").combobox('select','');
		$("#channelId").combobox('select','');
		$("#status").combobox('select','');
		$("#groupId").textbox('setValue','');
//		$("#exportCouponForm")[0].reset();
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
			CMC.alertMessage("请选择文件!",'warn');
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
			url: CouponAUSMnt.batchUpdateUrl,
			method: "POST",
			dataType: "json",
			fileElementId:  "batchUpdate_file",
			data:{"inputType":inputType, "actionType":actionType, "discountCode":dicountCodes},
			success: function(response){
				CMC.hideProcessBox();
		  		CMC.alertMessage(response.messageBody, 'info');
				//CMC.search();
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
	CouponAUSMnt.isArea=function(start,end){
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
	CMC.init(CouponAUSMnt);
});