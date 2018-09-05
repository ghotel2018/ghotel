/**
 * 优惠券报表导出
 */
var CouponReportMnt = {
		menuId: "CouponReport",
		searchTableRequired: true,
		getConfigUrl: "authorized/couponReport/pageConfig" , 
		exportReportUrl: "authorized/couponReport/exportReport",
		searchUrl: "authorized/couponReport/getAll" , //如果searchTableRequired 是 true 必填
		exportStatisticsUrl: "authorized/couponReport/exportStatisticsExcel/",
		/**
		 * 定义表格字段
		 */
		columns : [[
			           /*{field: 'groupId', title:'所属批次号' , width: '10%' , align: 'center'},
			           {field: 'createDate', title:'生成日期' , width: '12%' , align: 'center'},
			           {field: 'createdBy', title:'创建人' , width: '10%' , align: 'center'},
			           {field: 'channel', title:'渠道' , width: '10%' , align: 'center'},
			           {field: 'isInternations', title:'优惠券类型Ⅰ' , width: '10%' , align: 'center' ,formatter: function(value){
			        	   if(value=="0"){
			        		   return '国内优惠券'
			        	   }
			        	   return "国际优惠券"
			           }},
			           {field: 'statusStr', title:'状态' , width: '8%' , align: 'center'},
			           {field: 'faceValue', title:'面值' , width: '5%' , align: 'center'},
			           {field: 'codeCount', title:'数量' , width: '5%' , align: 'center'},
			           {field: 'discountTypeMc', title:'优惠券类型Ⅱ' , width: '12%' , align: 'center'}*/
			           
			           {field: 'groupId', title:'所属批次号' , width: '10%' , align: 'center'},
			           {field: 'createdTime', title:'生成日期' , width: '12%' , align: 'center'},
			           {field: 'createdBy', title:'创建人' , width: '10%' , align: 'center'},
			           {field: 'channelId', title:'渠道' , width: '10%' , align: 'center'},
			           {field: 'isInternations', title:'优惠券类型Ⅰ' , width: '10%' , align: 'center' ,formatter: function(value){
			        	   if(value=="0"){
			        		   return '国内优惠券';
			        	   }else if(value=="1"){
				        	   return "国际优惠券";
			        	   }else if(value=="2"){
				        	   return "韩国优惠券";
			        	   }else if(value=="3"){
				        	   return "澳洲优惠券";
			        	   }else if(value=="4"){
				        	   return "新西兰优惠券";
			        	   }else if(value=="5"){
			        		   return "新加坡优惠券";
			        	   }else if(value=="6"){
			        		   return "英国优惠券";
			        	   }else if(value=="7"){
			        		   return "国内次数券";
			        	   }else if(value=="8"){
			        		   return "国际次数券";
			        	   }else{
			        		   return value;
			        	   }
			           }},
			           {field: 'status', title:'状态' , width: '8%' , align: 'center' ,
			        	   formatter : function(value,row,index) {
							   var statusStr="";
							   if(value=="1"){
								   statusStr="生成中";
							   }else if(value=="2"){
								   statusStr="已生成";
							   }else if(value=="3"){
								   statusStr="异常待处理";
							   }else if(value=="4"){
								   statusStr="出错";
							   }else if(value=="5"){
								   statusStr="审批中";
							   }else if(value=="6"){
								   statusStr="审批通过";
							   }else if(value=="7"){
								   statusStr="已绑定活动";
							   }else if(value=="8"){
								   statusStr="挂起";
							   }else if(value=="9"){
								   statusStr="废除";
							   }else if(value=="10"){
								   statusStr="已过期";
							   }
							   return statusStr;
						   }
			           },
			           {field: 'faceValue', title:'面值' , width: '5%' , align: 'center'},
			           {field: 'counts', title:'数量' , width: '5%' , align: 'center'},
			           {field: 'couponType', title:'优惠券类型Ⅱ' , width: '12%' , align: 'center' ,
			        	   formatter:function(value,row,index){
							   var couponType="";
							   if(row.couponType==0||row.couponType=='0'){
								   couponType="收入现金优惠券";
							   }else if(row.couponType==1||row.couponType=='1'){
								   couponType="运价优惠券";
							   }else if(row.couponType==2||row.couponType=='2'){
								   couponType="费用现金优惠券";
							   }else if(row.couponType==3||row.couponType=='3'){
								   couponType="虚拟资金优惠券";
							   }else if(row.couponType==4||row.couponType=='4'){
								   couponType="自有资金优惠券";
							   }else if(row.couponType==5||row.couponType=='5'){
								   couponType="里程优惠券";
							   }else if(row.couponType==6||row.couponType=='6'){
								   couponType="旅客服务优惠券";
							   }else if(row.couponType==9||row.couponType=='9'){
								   couponType="自有资金优惠券";
							   }else if(row.couponType==10||row.couponType=='10'){
								   couponType="虚拟资金优惠券";
							   }else if(row.couponType==11||row.couponType=='11'){
								   couponType="自有资金优惠券";
							   }else if(row.couponType==12||row.couponType=='12'){
								   couponType="虚拟资金优惠券";
							   }else if(row.couponType==13||row.couponType=='13'){
								   couponType="自有资金优惠券";
							   }else if(row.couponType==14||row.couponType=='14'){
								   couponType="虚拟资金优惠券";
							   }else if(row.couponType==15||row.couponType=='15'){
								   couponType="自有资金优惠券";
							   }else if(row.couponType==16||row.couponType=='16'){
								   couponType="虚拟资金优惠券";
							   }else if(row.couponType==17||row.couponType=='17'){
								   couponType="自有资金优惠券";
							   }else if(row.couponType==18||row.couponType=='18'){
								   couponType="虚拟资金优惠券";
							   }else if(row.couponType==19||row.couponType=='19'){
								   couponType="合作活动次数券";
							   }else if(row.couponType==20||row.couponType=='20'){
								   couponType="营销活动次数券";
							   }else if(row.couponType==21||row.couponType=='21'){
								   couponType="合作活动次数券";
							   }else if(row.couponType==22||row.couponType=='22'){
								   couponType="营销活动次数券";
							   }else if(row.couponType==23||row.couponType=='23'){
								   couponType="合作活动协议价次数券";
							   }else if(row.couponType==24||row.couponType=='24'){
								   couponType="营销活动协议价次数券";
							   }else if(row.couponType==25||row.couponType=='25'){
								   couponType="合作活动协议价次数券";
							   }else if(row.couponType==26||row.couponType=='26'){
								   couponType="营销活动协议价次数券";
							   }
							   return couponType;
						   } 
			           }
			           ]]
};

(function($){
	
	$("#statistics_Template").click(function(){
		window.open(encodeURI("/cmc/download/marketingActivityStatisticsTemplate.xlsx"));
	});
	
	$("#coupon_statistics_export").click(function(){
		$("#exportUploadExcel")[0].reset();
		$("#StatisticsExport").dialog('open');
	});
	
	$('#exportStatisticsBtn').click(function(){
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
			formElementId = "principalNo_file";
			message = $("#exportPrincipalNo").val();
		}else if(type=="2"){
			formElementId = "principal_file";
			message = $("#exportPrincipal").val();
		}else if(type=="3"){
			formElementId = "principal_file";
			message = $("#createDateOne").datebox('getValue')+"|"+$("#createDateTwo").datebox('getValue');
		}
		if(type=="3"){
			if($("#createDateOne").datebox('getValue')==""||$("#createDateTwo").datebox('getValue')==""){
				CMC.alertMessage("请输入生成时间。",'warn');
		        return ;
		    }
			if($("#createDateOne").datebox('getValue')>$("#createDateTwo").datebox('getValue')){
				CMC.alertMessage("开始日期不能大于结束日期。",'warn');
		        return ;
		    }
		}else{
			if(message == "" || message == "undefined" || message == null){
				CMC.alertMessage("请输入单个优惠券批次号/编号/责任人或选择excel格式的文件。",'warn');
				return ;
			}
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
		}
		CMC.fileUpload({
			url: CouponReportMnt.exportStatisticsUrl,
			method: "POST",
			dataType: "json",
			fileElementId:  formElementId,
			data:{"message":message, "bindType":bindType, "type":type},
			success: function(response){
				CMC.alertMessage("导出统计报表异步请求成功,请移步首页并查看报表记录下载文件！", 'info');
				CMC.dialog('StatisticsExport','close');
			},
			error: function(){
				CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
			}
		});
	});
	
	/**
	 * 优惠券报表导出
	 */
	$("#coupon_export").click(function(){
		CMC.request({
			url: CouponReportMnt.exportReportUrl,
			method: 'post',
			data : $("#searchCouponForm").form().serialize(),
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
			}
		});
	});
	
	$("#coupon_reset").click(function(){
//		$("#searchCouponForm").form('clear');
		$("#groupId").textbox('setValue','');
		$("#createdBy").textbox('setValue','');
		$("#showChannelName_report").html();
		$("#createdateStart").datebox("setValue", '');
		$("#createdateEnd").datebox("setValue", '');
		$("#showChannelName_report").hide();
		$("#couponDiscountType").combobox('select','');
		$("#couponReportStatus").combobox('select','');
		CouponReportMnt.intConfig();
//		alert("重置完成");
	});
	
	/**
	 * 页面初始化
	 */
	CouponReportMnt.init=function(){
		
		CouponReportMnt.intConfig();
	};
	
	/**
	 * 初始化下拉列表框
	 */
	CouponReportMnt.intConfig=function(){
		$("#showChannelName_report").hide();
		$("#coupon_report_Channel").combobox('clear');
		CMC.request({
			url: CouponReportMnt.getConfigUrl ,
			method: 'GET',
			success: function(message){
				var list = message.messageBody.channelList;
				for(var i=0;i<list.length;i++){
					list[i]["codeName"] = "["+(list[i]["code"]==null?"":list[i]["code"])+"]"+list[i]["name"];
				}
				$("#coupon_report_Channel").combobox({
					data: list,
					panelHeight: '120px',
					valueField:'code',
					textField:'codeName',
					onSelect: function(rec){    
						$("#showChannelName_report").show();
						$("#showChannelName_report").html(rec.name);
					}
				});
			}
		});
	};
})(jQuery);

$(document).ready(function(){
	CMC.init(CouponReportMnt);	
});

