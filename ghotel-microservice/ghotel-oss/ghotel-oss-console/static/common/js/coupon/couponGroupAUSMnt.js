/**
 * ouyang
 */
var CouponGroupMnt = {
	scope:'AUS',
	menuId: "CouponGroupAUS",
	searchTableRequired: true,
	initNotSearch:false,
	getConfigUrl: "authorized/couponGroupAUS/pageConfig" ,
	addAUSUrl: "authorized/couponGroupAUS/addAUS" ,
	updateAUSUrl: "authorized/couponGroupAUS/updateAUS" ,
	getUrl: "authorized/couponGroupAUS/get/" ,
	issueUrl: "authorized/couponGroupAUS/issue" ,
	exportKeyUrl: "authorized/couponGroupAUS/exportPrivateKey" ,
	exportReportUrl: "authorized/couponGroupAUS/exportReport",
	getMailSentCountUrl: "authorized/couponGroupAUS/getMailSentCount",
	updateMailSentCountUrl: "authorized/couponGroupAUS/updateMailSentCount",
	searchUrl: "authorized/couponGroupAUS/getAUSAll" , //如果searchTableRequired 是 true 必填
	searchAUSUrl: "authorized/couponGroupAUS/getAUSAll" , //如果searchTableRequired 是 true 必填
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
				/*if(channelLists==undefined || channelLists==null){
					//初始化数据并把渠道数据赋值给全局变量channelLists
					CouponGroupMnt.intConfig(true,true);
				}*/
				if(channelLists!=undefined && channelLists!=null){
					for ( var i = 0; i < channelLists.length; i++) {
						var channelList = channelLists[i];
						if(createChannel == channelList.code || createChannel == channelList.code){
							channelName= channelList.name
						}
					}
				}
				return "["+createChannel+"]"+channelName;
			}
		},
		{field: 'discountType', title:'优惠券类型' , width: '20%' , align: 'center',
			formatter:function(value,row,index){
				   var discountType="";
				   if(row.discountType==0||row.discountType=='0'){
					   discountType="国内合作活动优惠券";
				   }else if(row.discountType==1||row.discountType=='1'){
					   discountType="国际促销优惠券";
				   }else if(row.discountType==2||row.discountType=='2'){
					   discountType="国内营销活动优惠券";
				   }else if(row.discountType==3||row.discountType=='3'){
					   discountType="国际营销活动优惠券";
				   }else if(row.discountType==4||row.discountType=='4'){
					   discountType="国际合作活动优惠券";
				   }else if(row.discountType==5||row.discountType=='5'){
					   discountType='国内里程优惠券';
				   }else if(row.discountType==6||row.discountType=='6'){
					   discountType='国内旅客服务优惠券';
				   }else if(row.discountType==11||row.discountType=='11'){
					   discountType="澳洲自有资金优惠券";
				   }else if(row.discountType==12||row.discountType=='12'){
					   discountType="澳洲虚拟资金优惠券";
				   }
				   return discountType;
			   }
		},
		{field: 'statusStr', title:'状态' , width: '10%' , align: 'center',
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
var channelLists;
var firstVal =0;
$(document).ready(function(){
	//根据页面需求，把日期的上一年和下一年箭头去掉
	$('.calendar-prevyear').hide();
	$('.calendar-nextyear').hide();
	//CouponGroupMnt.intConfig(true,true);
	CMC.init(CouponGroupMnt);
});

window.onError = function(){
	console.log(e);
};



(function($){

	
	$('#CouponGroupSendEmail').click(function(){
		$('#message').html('');
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
	
	$('#searchFormAddAUS').click(function(){
		CouponGroupMnt.intConfig(false,false,true);
		firstVal = 0;
		$("#createDialog").dialog({
			title:'澳洲优惠券生成',
			closed:false,
			cache:false,
			modal:true,
			href:"/cmc/module/coupon/couponGroupCreateAUSForm.html?scope=AUS",
			onLoad:function () {

				$("#createDialog #isInternations_create").val("3");
				$("#createDialog #addBtn_create_domestic").hide();
				$("#createDialog #addBtn_create_I18n").hide();
				$("#createDialog #addBtn_create_AUS").show();
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
						{id:'11',name:'澳洲自有资金优惠券'},
						{id:'12',name:'澳洲虚拟资金优惠券'}
					],
					panelHeight: '120px',
					valueField:'id',
					textField:'name',
					panelHeight: '100px' ,

					onChange:discountTypeCheck
				});
				CouponGroupCommon.intConfig(true,true,true,'AUS');
			}

		});
		$('.error').html('');
		$("#count").html(500);
		$('#segmentType_create_AUS').combobox('setValue','0');
		$("#createAUSCouponGroupForm input[name='flightTimeType']").each(function(j,el2){
			$(el2).prop("checked", true).attr("checked", true);
		});

		$("#createAUSCouponGroupForm .easyui-datebox").each(function(j,el2){
			$(el2).datebox().datebox('calendar').calendar({
				validator: function(date){
					var now = new Date();
					var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
					return d1<=date ;
				}
			});
		});
	});

	$('#searchFormUpdateAUS').click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record || record['groupId']==null || record['groupId']==''){
			CMC.alertMessage("请选择一条澳洲优惠券批次记录!", 'warn');
			return;
		}
		var groupId = record['groupId'];
		var src = "/cmc/module/coupon/couponGroupUpdateAUSForm.html?scope=AUS&groupId="+groupId;
		//CouponGroupMnt.intConfig(false,false,true);

		$('.error').html('');
		$('#updateAUSCouponGroupForm').form('clear');

		$("#updateDialog").dialog({
			title:'澳洲优惠券修改',
			closed:false,
			cache:false,
			modal:true,
			content:'<iframe id="createFrame" name="createFrame" src='+src+' frameborder="no" border="0" scrolling="no" style="width:810px;height:920px;"></iframe>'
		});
		CMC.dialog('updateDialog','open');
		
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
				href:"/cmc/module/coupon/couponIssuAUSForm.html"
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

	$('#exportGroupId').bind('keyup', function(){
		exportKeyFlag = "";
		$('#groupId_file').val('');
	});

	$("#issueCode_file").bind('keyup', function(){
		$("#issueCode_file").val('');
		issueFileFlag="";
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



	CouponGroupMnt.init = function(){
		CouponGroupMnt.intConfig(true,true);
	}

	CouponGroupMnt.intConfig = function(initChannel,initGateWay, initAccount){
		if(channelLists==undefined || channelLists==null){
			CMC.request({
				url: CouponGroupMnt.getConfigUrl ,
				method: 'GET',
				success: function(message){
					if(initChannel){
						var channelList = message.messageBody.channelList;
						/*for(var i =0 ; channelList && i < channelList.length; i++){
							if(Number(channelList[i]["code"])<10){
								channelList[i]["code"] = "0" + channelList[i]["code"];
							}
						}*/
						channelLists = channelList;
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
		$("#approveUserName").textbox('setValue','');
		$("#aproveId").val('');
		$("#CouponGroup_Import").dialog("open");
	});
	//模版下载
	$("#CouponGroup_Template").click(function(){
		window.open(encodeURI("/cmc/download/couponGroupForeignTemplate.xlsx"));
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
		var approveUserName=$("#AUSAproveName").val();
		if(approveUserName==""){
			CMC.alertMessage("请先选择审批人！", 'info');
			return;
		}
		//判断文件后缀
		if(val && val != "" && (val.indexOf("xls")==-1 && val.indexOf("xlsx")==-1 && val.indexOf("csv")==-1) ){
			CMC.alertMessage("请选择excel文件。",'warn');
			return ;
		}
		
		var data={"aproveId": $("#AUSAproveId").val()};
		CMC.confirm("是否确认导入文件?",function(r){
			if(r){
				 CMC.showProcessBox();
				CMC.fileUpload({
					url: "authorized/couponGroupAUS/importReport",
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

//发放模版下载
function downCouponIssuingTemplate(){
	window.open(encodeURI("/cmc/download/couponIssuingTemplate.xlsx"));
};

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
	openSelect();
	$("#selectApporUser").show().dialog("open");
	window.frames["apporUserSelect"].openIframeId="selectApporUser";
	window.frames["apporUserSelect"].userId="issuAproveId";
	window.frames["apporUserSelect"].userName="issuAproveName";
}
function doAUSUserOneSearch() {
	openSelect();
	$("#selectApporUser").show().dialog("open");
	window.frames["apporUserSelect"].openIframeId="selectApporUser";
	window.frames["apporUserSelect"].userId="AUSAproveId";
	window.frames["apporUserSelect"].userName="AUSAproveName";
}
function emailCheck(val){
	var vals = val.split(",");
	//验证邮箱的正则表达式判断
	var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	if(!reg.test(vals[0]))
    {
        return false;
    }else {
    	return true;
    }

}