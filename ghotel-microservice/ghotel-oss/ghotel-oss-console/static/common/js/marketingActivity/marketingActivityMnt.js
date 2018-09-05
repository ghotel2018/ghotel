var MarketingActivityMnt = {
		menuId: "MarketingActivity",
		searchTableRequired: true,
		getConfigUrl: "authorized/marketingActivity/actionType/",
		searchUrl: "authorized/marketingActivity/getAll" , //如果searchTableRequired 是 true 必填
		deleteUrl: "authorized/marketingActivity/delete",
		addUrl:"authorized/marketingActivity/add",
		modifyUrl:"authorized/marketingActivity/modify",
		effectUrl:"authorized/marketingActivity/effect/",
		statisticsUrl:"authorized/marketingActivity/statistics/",
		getUrl: "authorized/marketingActivity/get/",
		importUrl:'authorized/marketingActivity/importExcel',
		exportExcelUrl: "authorized/marketingActivity/exportExcel/",
		getDiscountGroupIdUrl: "authorized/marketingActivity/getDiscountGroupIdUrl/",
		exportStatisticsUrl: "authorized/marketingActivity/exportStatisticsExcel/",
		/*warmUpUrl:"authorized/marketingActivity/warmUp",*/
		groupId : '',
		columns :  [[
           {field: 'actionId', title:'活动编码' , width: '12%' , align: 'center'},
           {field: 'actionName', title:'活动名称' , width: '13%' , align: 'center'},
           {field: 'channelId', title:'渠道' , width: '17%' , align: 'center',formatter: fmtChannelId},
           {field: 'actionType', title:'优惠券类型' , width: '15%' , align: 'center',formatter: fmtDiscountType},
           {field: 'couponGroupId', title:'绑定优惠券批次' , width: '12%' , align: 'center'},
           {field: 'startTime', title:'活动开始时间' , width: '8%' , align: 'center'},
           {field: 'endTime', title:'活动结束时间' , width: '8%' , align: 'center'},
           {field: 'createdTime', title:'创建日期' , width: '8%' , align: 'center'},
           {field: 'createdBy', title:'创建人' , width: '5%' , align: 'center'}
           /*{field: 'status', title:'活动状态' , width: '17%' , align: 'center' , hidden: 'true'}*/
	    ]]
};

var discountGroupIdstart=1;  //绑定优惠券批次分页开始值
var discountGroupIdend=10;	 //绑定优惠券批次分页结束值

$(document).ready(function(){
	CMC.init(MarketingActivityMnt);
	
	/* 活动渠道 */
	$('#channelId_save').combo({
		required:true,
        panelHeight:'auto',
        editable:false,
        labelPosition:'top'
	});
	$('#comboxPanel_channelId').appendTo($('#channelId_save').combo('panel'));
    $('#comboxPanel_channelId #comboxPanel_btnSure').click(function(){
    	var value = "";
    	var text = "";
    	$("input[name='optChannelId']:checked").each(function(i,dom){
    		if(value.length>0){
    			value = value+"/"+$(this).val();
    			text = text +"/"+$(this).next('span').text();
    		}else{
    			value = $(this).val();
    			text = $(this).next('span').text();
    		}
    	});
        $('#channelId_save').combo('setValue', value).combo('setText', text).combo('hidePanel');
        if(value.indexOf("C003") > -1){//包含APP
			$("input[name='isAlreadyPurchased']").removeAttr("disabled");
		}else{
			$("input[name='isAlreadyPurchased']").removeAttr("checked");
			$("input[name='isAlreadyPurchased']").attr("disabled", "disabled");
		}
    });
    
    var checkAll = true;
    $('#comboxPanel_channelId #comboxPanel_btnAll').click(function(){
		$("input[name='optChannelId']").each(function(i,dom){
			$(this)[0].checked = checkAll;
		});
		checkAll = !checkAll;
    });
    
    //优惠券类型
    $('#actionType_save').combo({
		required:true,
        panelHeight:'auto',
        editable:false,
        labelPosition:'top'
	});
	$('#comboxPanel_actionType').appendTo($('#actionType_save').combo('panel'));
    $('#comboxPanel_actionType #actionType_btnSure').click(function(){
    	discountGroupIdstart=1;
    	discountGroupIdend=10;
    	var value = "";
    	var text = "";
    	$("input[name='optDiscountType']:checked").each(function(i,dom){
    		if(value.length>0){
    			value = value+","+$(this).val();
    			text = text +","+$(this).next('span').text();
    		}else{
    			value = $(this).val();
    			text = $(this).next('span').text();
    		}
    	});
        $('#actionType_save').combo('setValue', value).combo('setText', text).combo('hidePanel');
    });
    
    var checkAll = true;
    $('#comboxPanel_actionType #actionType_btnAll').click(function(){
		$("input[name='optDiscountType']").each(function(i,dom){
			$(this)[0].checked = checkAll;
		});
		checkAll = !checkAll;
    });
    
	//批次号 
	/*$('#couponGroupId_save').combo({
        required:true,
        panelHeight:'auto',
        editable:false,
        labelPosition:'top'
    });
    $('#comboxPanel_couponGroupId').appendTo($('#couponGroupId_save').combo('panel'));
    $('#comboxPanel_couponGroupId #comboxPanel_btnSure').click(function(){
    	var text = "";
    	$("input[name='optDiscountGroupId']:checked").each(function(i,dom){
    		if(text.length>0){
    			text = text +"/"+$(this).next('span').text();
    		}else{
    			text = $(this).next('span').text();
    		}
    	});
    	
    	if( MarketingActivityMnt.groupId != ""){
    		if( text != ""){
    			text = MarketingActivityMnt.groupId + "/" + text;
    		}else{
    			text =  MarketingActivityMnt.groupId;
    		}
    	}
        $('#couponGroupId_save').combo('setValue', text).combo('setText',text).combo('hidePanel');
    });*/
    $('#activityStatisticsList').datagrid({
		method:'get',
		columns:  [[
	           {field: 'faceValue', title:'面额' , width: '12%' , align: 'center'},
	           {field: 'totalCoupon', title:'优惠劵总数' , width: '15%' , align: 'center'},
	           {field: 'totalAcceptedCoupon', title:'已领取张数' , width: '16%' , align: 'center'},
	           {field: 'acceptedPer', title:'领取率' , width: '15%' , align: 'center',
	        	   formatter:function(val,rec){ 
	        		   return (val*100).toFixed(2)+"%";
	        	   } 
	           },
	           {field: 'totalUserdCoupon', title:'已使用张数' , width: '16%' , align: 'center'},
	           {field: 'usedPer', title:'使用率' , width: '15%' , align: 'center',
	        	   formatter:function(val,rec){ 
	        		   return (val*100).toFixed(2)+"%";
	        	   } 
	           }
           ]]
	});
    
});

(function($){
	$("#clearCondition").click(function(){
		var start = $("#marketingActivitySearchForm input[name='start']:hidden").val();
		var end = $("#marketingActivitySearchForm input[name='end']:hidden").val();
		$('#marketingActivitySearchForm').form('clear');
		$("#marketingActivitySearchForm input[name='start']:hidden").val(start);
		$("#marketingActivitySearchForm input[name='end']:hidden").val(end);
//		$("input[name='start']:hidden").val("1");
//		$("input[name='end']:hidden").val("10");
		CMC.search();
	});
	
	$("#searchFormDelete").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请选择一条营销活动记录!", '提示');
			return;
		}
		
		CMC.confirm("您确定要删除所选中的记录吗， 请确认是否继续?", function(result){
			if(result){
			  	CMC.request({
					url: MarketingActivityMnt.deleteUrl,
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
	
	
	/*$("#searchFormWarmUp").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请选择一条营销活动记录!", '提示');
			return;
		}
		if(record.status!=0){
			CMC.alertMessage("该记录已经预热!", '提示');
			return;
		}
		
		CMC.confirm("请确认是否预热?", function(result){
			if(result){
			  	CMC.request({
					url: MarketingActivityMnt.warmUpUrl,
					method: 'POST',
					data : record,
					success: function(response){
						CMC.alertMessage(response.messageBody,'info');
						CMC.search();
					}
				});
			 }
		 });
	});*/
	
	$("#searchFormAdd").click(function(){
		var winTopLeft = CMC.getWindowTopLeft("winMarketingActivitySave");
		$('#winMarketingActivitySave').window({
			top:winTopLeft.winTop,
			left:winTopLeft.winLeft,
			title:'营销活动——新增'
		});
		$('#winMarketingActivitySave').window('open');
		
		MarketingActivityMnt.intConfig(true);

        //清除编辑时的设置
        $("input[name='membersLevel']").removeAttr("disabled");
        $("#memberJoinTimeStart_save").datebox({disabled:false});
        $("#memberJoinTimeEnd_save").datebox({disabled:false});
        $("#registerHours_save").textbox({disabled:false});
        $("#validMember_save").combobox('enable');

		$('#marketingActivitySaveForm').form('clear');//清空重置form
		//清空重置活动渠道
		$("input[name='optChannelId']:checked").each(function(i,dom){
			this.checked = false;
    	});
		
		//赋初始值
		$('#isCouple_save').combobox('setValue',"0");//是否强关联
		$('#numberLimited_save').numberbox('setValue',1);//每种券的可领取次数
		$('#userReceiveNumLimited_save').numberbox('setValue',1);//用户领取数量限制
		$('#numLimited_save').numberbox('setValue',1);//优惠券分享链接领取数限制
		$('input[name="isMobileRandcode"]:radio').each(function() {   
			if (this.value == '0'){
		   		this.checked = true;
			}
		});

		$("#phoneUserGrade_save").combobox('disable', true);
        $("#phoneUserGrade_save").combobox('select', "0");
	});
	
	//编辑弹出框
	$("#searchFormUpdate").click(function(){
		
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请选择一条营销活动记录!", '提示');
			return;
		}
		var winTopLeft = CMC.getWindowTopLeft("winMarketingActivitySave");
		$('#winMarketingActivitySave').window({
			top:winTopLeft.winTop,
			left:winTopLeft.winLeft,
			title:'营销活动——编辑'
		});
		CMC.dialog('winMarketingActivitySave','open');
		MarketingActivityMnt.intConfig(true);
		MarketingActivityMnt.getDetail("#marketingActivitySaveForm",'_save',record);
	});
	
	//新建营销活动
	$("#save").click(function(){
		var data = MarketingActivityMnt.handleFormData('#marketingActivitySaveForm',"_save");
		if( data.actionId == "" ){
			MarketingActivityMnt.submitSaveRequest(data,MarketingActivityMnt.addUrl,'#marketingActivitySaveForm');
		}else{
			MarketingActivityMnt.submitSaveRequest(data,MarketingActivityMnt.modifyUrl,'#marketingActivitySaveForm');
		}
	});
	
	$("#cancel").click(function(){
		$('#winMarketingActivitySave').window('close');
	});
	
	$("#searchFormEffect").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请选择一条营销活动记录!", '提示');
			return;
		}
		
		var winTopLeft = CMC.getWindowTopLeft("winMarketingActivityEffect");
		$('#winMarketingActivityEffect').window({
			top:winTopLeft.winTop,
			left:winTopLeft.winLeft,
			title:'营销活动——活动效果'
		});
		MarketingActivityMnt.getEffect("#marketingActivityEffectForm",record['actionId']);
	});
	
	$("#searchFormStatistics").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请选择一条营销活动记录!", '提示');
			return;
		}
		
		var winTopLeft = CMC.getWindowTopLeft("winMarketingActivityStatistics");
		$('#winMarketingActivityStatistics').window({
			top:winTopLeft.winTop,
			left:winTopLeft.winLeft,
			title:'营销活动——活动统计'
		});
		MarketingActivityMnt.getStatistics("#marketingActivityStatisticsForm",record['actionId']);
	});
	
	$("#searchFormExportExcel").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请选择一条营销活动记录!", '提示');
			return;
		}
		var ruleId = record['actionId'];
		
		CMC.fileUpload({
			url: MarketingActivityMnt.exportExcelUrl + ruleId,
			method: "POST",
			success: function(response){
		  		CMC.alertMessage("导出获取报表异步请求成功,请移步首页并查看报表记录下载文件！", 'info');
		  	},
		  	error: function(){
		  		CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
		  	}
		});
	});
	
	
	//打开导入窗口
	$("#searchFormImportExcel").click(function(){
		$("#marketingActivityInfo").textbox('setValue','');
		$("#marketingActivityImport").dialog("open");
	});
	
	
	//导入确定按钮
	$("#marketingActivityInfo_import").click(function(){
		var val=$("#marketingActivityInfo").val();
		if(val==""){
			CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
			return;
		}
		//判断文件后缀
		var fileUrl=$("#marketingActivityInfo").val();
		if(fileUrl && fileUrl != "" && (fileUrl.indexOf("xls")==-1 && fileUrl.indexOf("xlsx")==-1 && fileUrl.indexOf("csv")==-1) ){
			CMC.alertMessage("请选择excel文件。",'warn');
			return ;
		}
		
		var data={"marketingActivityInfoFile":val};
		
		MarketingActivityMnt.fileUpload(data,MarketingActivityMnt.importUrl,"#marketingActivityImportForm","marketingActivityInfoFile");
	});
	
	
	MarketingActivityMnt.fileUpload = function(data,url,formId,ind){

		CMC.confirm("是否确认导入文件?",function(r){
			if(r){
				 CMC.showProcessBox();
				 CMC.fileUpload({
					url: url,
					type: "POST",
					dataType: "json",
					fileElementId:  "marketingActivityInfoFile",
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
	
	$("#marketingActivity_Template").click(function(){
		window.open(encodeURI("/cmc/download/marketingActivityTemplate.xlsx"));
	});
	
	$("#marketingActivityStatistics_Template").click(function(){
		window.open(encodeURI("/cmc/download/marketingActivityStatisticsTemplate.xlsx"));
	});
	
	$("#actionType_save").combobox({
		onChange: function (newVal,oldValue) {
//			$('#couponGroupId_save').combo('setValue', "").combo('setText', "");
			var newVal = newVal.replace(/\//g,",")
			MarketingActivityMnt.intConfig(true,newVal);
		}
	});
	
	
	/*$("#comboxPanel_rightSure").click(function(){
    	discountGroupIdstart+=10;
    	discountGroupIdend+=10;
    	var actionType = $("#actionType_save").combobox('getValue').replace(/\//g,",");
		CMC.request({
			url: MarketingActivityMnt.getDiscountGroupIdUrl,
			method: 'POST',
			dataType: "json",
            data: {
            	'discountGroupIdstart':discountGroupIdstart,
            	'discountGroupIdend':discountGroupIdend,
            	'actionType':actionType
            },
			success: function(message){
					var groupIdList = message.messageBody.list;
					var htmlList = "";
				    for(var i = 0 ; groupIdList && i < groupIdList.length; i++){
				    	if( i % 2 == 0){
				    		htmlList += "<input type='checkbox' name='optDiscountGroupId'><span>"+ groupIdList[i] +"</span>&nbsp;&nbsp;&nbsp;";
				    	}else{
				    		htmlList += "<input type='checkbox' name='optDiscountGroupId'><span>"+ groupIdList[i] +"</span><br/>";
				    	}
				    }
				    $("#couponGroupId_dataList").empty();
				    $("#couponGroupId_dataList").append(htmlList);
				    $('#comboxPanel_couponGroupId').appendTo( $('#couponGroupId_save').combo('panel') );
			}
		});
		
	});
	
	$("#comboxPanel_leftSure").click(function(){
    	if(discountGroupIdstart!=1){
    		discountGroupIdstart-=10;
    	}
    	if(discountGroupIdend!=10){
    		discountGroupIdend-=10;
    	}
    	var actionType = $("#actionType_save").combobox('getValue').replace(/\//g,",");
		CMC.request({
			url: MarketingActivityMnt.getDiscountGroupIdUrl,
			method: 'POST',
			dataType: "json",
            data: {
            	'discountGroupIdstart':discountGroupIdstart,
            	'discountGroupIdend':discountGroupIdend,
            	'actionType':actionType
            },
			success: function(message){
					var groupIdList = message.messageBody.list;
					var htmlList = "";
				    for(var i = 0 ; groupIdList && i < groupIdList.length; i++){
				    	if( i % 2 == 0){
				    		htmlList += "<input type='checkbox' name='optDiscountGroupId'><span>"+ groupIdList[i] +"</span>&nbsp;&nbsp;&nbsp;";
				    	}else{
				    		htmlList += "<input type='checkbox' name='optDiscountGroupId'><span>"+ groupIdList[i] +"</span><br/>";
				    	}
				    }
				    $("#couponGroupId_dataList").empty();
				    $("#couponGroupId_dataList").append(htmlList);
				    $('#comboxPanel_couponGroupId').appendTo( $('#couponGroupId_save').combo('panel') );
			}
		});
		
	});*/
	
	
	$("#download_template_user").click(function(){
		downloadFile("/cmc/download/userTemplate.xls");
	});
	
	$("#download_template_whiteUser").click(function(){
		downloadFile("/cmc/download/whiteUserTemplate.xls");
	});
	
	$("#download_template_ticketRule").click(function(){
		downloadFile("/cmc/download/ticketRuleTemplate.xls");
	});
	
	//设置
	$("input[name=isLogin]").click(function() {
		changeLoginRequired();
	});
	
	$("#actionType_save").change(function() {
		changeDiscountType($(this).val());
	});
	
	$("input[name=isMemberSonly]").click(function() {
		changeMembersOnly();
	});
	
	$("input[name=necessaryInfo]").click(function() {
		changeNecessaryInformation();
	});
	
	$("input[name='isMobileRandcode']").attr("disabled", "disabled");
	$("input[name='isAlreadyPurchased']").attr("disabled", "disabled");
	
	
	MarketingActivityMnt.handleFormData = function(formId,ind){
		
		var actionId = $("#actionId"+ind).val();//营销活动编号
		var actionName = $("#actionName"+ind).val();//活动名称
		var channelId = $("#channelId"+ind).combobox('getValue');//活动渠道
		var actionType = $("#actionType"+ind).combobox('getValue');//优惠券类型:
		var cooperaterName = $("#cooperaterName"+ind).val();//合作方名称
		var couponGroupId = $("#couponGroupId"+ind).textbox('getValue');//绑定优惠券批次
		var startTime = $("#startTime"+ind).datebox('getValue');//活动开始时间
		var endTime = $("#endTime"+ind).datebox('getValue');//活动结束时间
		var isShowDetails = $("input[name='isShowDetails']:checked").val()||"";//是否显示优惠券总数、剩余张数
		var isLogin = $("input[name='isLogin']:checked").val()||"";//是否必须登录
		var isMobileRandcode = $("input[name='isMobileRandcode']:checked").val()||"";//是否需要短信验证码，是#1，否#0
		var isMemberSonly =  $("input[name='isMemberSonly']:checked").val()||"";//是否仅限明珠会员领取,是#1，否#0
		var memberJoinStartTime = $("#memberJoinStartTime"+ind).datebox('getValue');//会员注册时间限制
		var memberJoinEndTime = $("#memberJoinEndTime"+ind).datebox('getValue');//会员注册时间限制
		var numberLimited = $("#numberLimited"+ind).numberbox('getValue');//用户领取数量限制
		var isCouple = $("#isCouple"+ind).combobox('getValue');//是否强关联,是#1，否#0
		var isAlreadyPurchased = $("input[name='isAlreadyPurchased']:checked").val()||"";//已购票会员领劵
		var sharedUrl = $("#sharedUrl"+ind).val();//优惠券分享链接
		var numLimited = $("#numLimited"+ind).numberbox('getValue');//优惠券分享链接领取数限制
		var isIdentityAuth = $("input[name='isIdentityAuth']:checked").val()||"";//是否身份认证（常客）
//		var isSendMsg = $("input[name='isSendMsg']:checked").val()||"";//到账是否发短信
		var registeredHours = $("#registeredHours"+ind).numberbox('getValue'); //注册满X小时
		var userReceiveNumLimited = $("#userReceiveNumLimited"+ind).numberbox('getValue');//用户领取数量限制
		var isSpecifyWhiteMember = $('#isSpecifyWhiteMember').val(); 
		var isSpecifiedMember = $('#isSpecifiedMember').val(); 
		var necessaryInfo = "";//用户填写信息设置
		var isIpLimit = $("input[name='isIpLimit']:checked").val();
		isIpLimit = isIpLimit=="1"?"1":"0";
		var banedTime = $("#banedTime").val();
		var visitTime = $("#visitTime").val();
		$("input[name='necessaryInfo']:checked").each(function(i,dom){
			if(necessaryInfo.length == 0){
				necessaryInfo = $(this).val();
			}else{
				necessaryInfo = necessaryInfo + "/"+ $(this).val();
			}
		});
		var membersLevel = "";//会员级别限制,普卡#L001,银卡#L002,金卡#L003
		$("input[name='membersLevel']:checked").each(function(i,dom){
			if(membersLevel.length == 0){
				membersLevel = $(this).val();
			}else{
				membersLevel = membersLevel + "/"+ $(this).val();
			}
		});

		var isSkyDefendSysIntgd=$("input[name='isSkyDefendSysIntgd']:checked").val()||"";

		var phoneUserGrade=$("#phoneUserGrade_save").combobox('getValue');

		return  {
			"actionId" : actionId,
			"actionName" :actionName,
			"channelId": channelId,
			"actionType": actionType,
			"cooperaterName": cooperaterName,
			"couponGroupId": couponGroupId,
			"startTime": startTime,
			"endTime" : endTime,
			"isShowDetails" : isShowDetails,
			"isLogin": isLogin,
			"necessaryInfo": necessaryInfo,
			"isMobileRandcode": isMobileRandcode,
			"isMemberSonly": isMemberSonly,
			"membersLevel": membersLevel,
			"memberJoinStartTime": memberJoinStartTime,
			"memberJoinEndTime": memberJoinEndTime,
			"numberLimited": numberLimited,
			"isCouple": isCouple,
			"isAlreadyPurchased": isAlreadyPurchased,
			"sharedUrl": sharedUrl,
			"numLimited": numLimited,
			"isIdentityAuth": isIdentityAuth,
//			"isSendMsg": isSendMsg,
			"registeredHours": registeredHours,
			"userReceiveNumLimited": userReceiveNumLimited,
            "isSkyDefendSysIntgd": isSkyDefendSysIntgd,
            "phoneUserGrade": phoneUserGrade,
            "isSpecifyWhiteMember": isSpecifyWhiteMember,
            "isSpecifiedMember": isSpecifiedMember,
            "isIpLimit":isIpLimit,
            "banedTime":banedTime,
            "visitTime":visitTime
		};
	}
	
	MarketingActivityMnt.submitSaveRequest = function(data,url,formId){
		$("input.validatebox-text").each(function(i,dom){
			$(this).validatebox('enableValidation');
			$(this).validatebox('validate');
		});
		
		if(!$(formId).form('validate')){
			return;
		}
		
		if($('#couponGroupId_save').textbox('getValue')==""){
			CMC.alertMessage('请选择绑定优惠券批次!','warn');
			return;
		}
		if($("#isIpLimit").val()=="1"){
			if(isNaN($("#banedTime").val())||isNaN($("#visitTime").val())){
				CMC.alertMessage('每分钟访问次数和禁止时间必须是数字','warn');
				return;
			}
			if($("#banedTime").val()<1||$("#visitTime").val()<1){
				CMC.alertMessage('每分钟访问次数和禁止时间必须大于0','warn');
				return;
			}
		}
		/*if((!$(formId + " INPUT[name='isSkyDefendSysIntgd']:checked").val())){
			CMC.alertMessage('请选择调取腾讯接口检验!','warn');
			return;
	    }*/
		CMC.confirm("是否确认保存营销活动?",function(result){
			if(result){
				CMC.showProcessBox();
				CMC.fileUpload({
					url: url,
					type: "POST",
					dataType: "json",
					fileElementId: ['fileUserInfo','fileWhiteUserInfo','fileTicketRule'],
				    data: data,
				    asyc: true,
				    timeout: 600000,
				  	success: function(response){
				  		try{
					  		CMC.hideProcessBox();
					  		var ruleId = response.messageBody;
					  		$('#id_save').textbox('setValue',ruleId);
					  		CMC.alertMessage("营销活动已保存成功！", 'info',CMC.search());
					  		CouponGroupMnt.intConfig(false,false,true);
			  			}catch(e){ }
			  			$('#winMarketingActivitySave').window('close');
				  	},error: function(){
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
		  		$('#userInfo').textbox('setValue',"");
		  		$('#whiteUserInfo').textbox('setValue',"");
		  		$('#ticketRule').textbox('setValue',"");
			}
//			$('#winMarketingActivitySave').window('close');
		});
	}
	
	MarketingActivityMnt.intConfig = function(initGroupId,discountType){
		var actionType = arguments[1] ? arguments[1] : "ALL";//设置参数discountType的默认值为ALL
		MarketingActivityMnt.groupId = "";
		CMC.request({
			url: MarketingActivityMnt.getConfigUrl + actionType,
			method: 'GET',
			success: function(message){
				if(initGroupId){
					var groupIdList = message.messageBody.list;
					var htmlList = "";
				    for(var i = 0 ; groupIdList && i < groupIdList.length; i++){
				    	if( i % 2 == 0){
				    		htmlList += "<input type='checkbox' name='optDiscountGroupId'><span>"+ groupIdList[i] +"</span>&nbsp;&nbsp;&nbsp;";
				    	}else{
				    		htmlList += "<input type='checkbox' name='optDiscountGroupId'><span>"+ groupIdList[i] +"</span><br/>";
				    	}
				    }
//				    $("#couponGroupId_dataList").empty();
//				    $("#couponGroupId_dataList").append(htmlList);
//				    $('#comboxPanel_couponGroupId').appendTo( $('#couponGroupId_save').combo('panel') );
				}
			}
		});
	}
	
	MarketingActivityMnt.getEffect = function(formId,activityId){
		CMC.request({
			url : MarketingActivityMnt.effectUrl + activityId,
			type : "get",
			dataType : "json",
			async : true,
			success : function(response){
				$(formId).form('clear');
				var result = response.messageBody;
				var list = response.messageBody.list;
				var ylq;
				var ysy;
				var messageCode = response.messageCode;
				if(messageCode == "error"){
					CMC.alertMessage("查询出错!", '提示');
				}else{
					CMC.dialog('winMarketingActivityEffect','open');
					for (var int = 0; int < list.length; int++) {
						if(list[int].status==1){
							ylq=list[int].num;
						}
						if(list[int].status==3){
							ysy=list[int].num;
						}
					}
					$(formId).form('load', {
						totalNumber : result.total || "0",
						numberReceived : ylq || "0",
						usedQuantity : ysy || "0"
					});
				}
			}
		});
	}
	
	MarketingActivityMnt.getStatistics = function(formId,activityId){
		CMC.request({
			url : MarketingActivityMnt.statisticsUrl + activityId,
			type : "get",
			dataType : "json",
			async : true,
			success : function(response){
				$(formId).form('clear');
				var result = response.messageBody;
				var messageCode = response.messageCode;
				if(messageCode == "error"){
					CMC.alertMessage("查询出错!", '提示');
				}else{
					CMC.dialog('winMarketingActivityStatistics','open');
					$("#activityStatisticsList").datagrid("loadData",response.messageBody.list);
					$(formId).form('load', {
						totalCouponT : result.totalCoupon || "0",
						totalAcceptedCouponT : result.totalAcceptedCoupon || "0",
						acceptedPerT : (result.acceptedPer*100).toFixed(2)+"%" || "0%",
						totalUsedCouponT : result.totalUsedCoupon || "0",
						usedPerT : (result.usedPer*100).toFixed(2)+"%" || "0%"
					});
				}
			}
		});
	}
	
	MarketingActivityMnt.getDetail = function(formId,ind,activity){
		CMC.request({
			url : MarketingActivityMnt.getUrl + activity['actionId'],
			type : "get",
			dataType : "json",
			async : true,
			success : function(response){
				$(formId).form('clear');
				var bean = response.messageBody;
				var memberJoinStartTime;
				var memberJoinEndTime
				if(bean.memberJoinStartTime!=null){
					memberJoinStartTime = new Date(bean.memberJoinStartTime).toLocaleDateString();
				}
				if(bean.memberJoinEndTime!=null){
					memberJoinEndTime = new Date(bean.memberJoinEndTime).toLocaleDateString();
				}
				$(formId).form('load', {
					/*id : bean['ID'], //表单提交的是一个对象
					name : bean['NAME'],
					discountGroupId :bean['DISCOUNTGROUPID'],
					cooperaterName :bean['COOPERATERNAME'],
					showDetails:bean['SHOWDETAILS'],
					identityAuth:bean['IDENTITYAUTH'],
					loginRequired:bean['LOGINREQUIRED'],
					mobileRandcode:bean['MOBILERANDCODE'],
					membersOnly:bean['MEMBERSONLY'],
					validMember:bean['VALIDMEMBER'],
					registerHours:bean['REGISTERHOURS'],
					numberLimited:bean['NUMBERLIMITED'],
					userReceiveNumLimited:bean['USER_RECEIVE_NUM_LIMITED'],
					shareUrl:bean['SHAREURL'],
					numLim:bean['NUMLIM']*/
					actionId : bean.actionId, //表单提交的是一个对象
					actionName : bean.actionName,
					couponGroupId :bean.couponGroupId,
					cooperaterName :bean.cooperaterName,
					isShowDetails:bean.isShowDetails,
					isIdentityAuth:bean.isIdentityAuth,
//					isSendMsg:bean.isSendMsg,
					isLogin:bean.isLogin,
					isMobileRandcode:bean.isMobileRandcode,
					isMemberSonly:bean.isMemberSonly,
					isCouple:bean.isCouple,
					registeredHours:bean.registeredHours,
					numberLimited:bean.numberLimited,
					userReceiveNumLimited:bean.userReceiveNumLimited,
					sharedUrl:bean.sharedUrl,
					numLimited:bean.numLimited,
					isIpLimit:bean.isIpLimit,
					banedTime:bean.banedTime,
					visitTime:bean.visitTime
				});
				changeLoginRequired();
				changeMembersOnly();
				//优惠券类型
				var actionType = discountTypeMap(bean.actionType);
				$('#actionType' + ind).combo('setValue',bean.actionType).combo('setText',actionType);
				var types = bean.actionType.split(",");
				$("input[name='optDiscountType']").each(function(){
					for(var i=0;i<types.length;i++){
						if(this.value==types[i]){
							$(this).attr("checked",true);
						}
					}
				});
				//活动渠道
				var channelIdText = channelIdMap(bean.channelId);
				$('#channelId' + ind).combo('setValue',bean.channelId).combo('setText',channelIdText);
//				$('#couponGroupId' + ind).combo('setValue', bean.couponGroupId).combo('setText', bean.couponGroupId);
				$('#couponGroupId' + ind).textbox('setValue', bean.couponGroupId);
				types = bean.channelId.split("/");
				$("input[name=optChannelId]").each(function(){
					for(var i=0;i<types.length;i++){
						if(this.value==types[i]){
							$(this).attr("checked",true);
						}
					}
				});
				MarketingActivityMnt.groupId = bean.couponGroupId;
				
				//用户填写信息设置
				var necessaryInfo = "";
				$("input[name='necessaryInfo']").each(function(i,dom){
					if( bean.necessaryInfo && bean.necessaryInfo.indexOf( $(this).val() ) > -1 ){
						$(this)[0].checked = true;
					}
				});
				//会员级别
				$("input[name='membersLevel']").each(function(i,dom){
					if( bean.membersLevel && bean.membersLevel.indexOf( $(this).val() ) > -1 ){
						$(this)[0].checked = true;
					}
				});
				
				if( bean.startTime ){
					$('#startTime' + ind).datetimebox('setValue', activity['startTime'] );
				}
				if( bean.endTime ){
					$('#endTime' + ind).datetimebox('setValue', activity['endTime'] );
				}
				if(memberJoinStartTime){
					$('#memberJoinStartTime' + ind).datebox('setValue',memberJoinStartTime);
				}
				if(memberJoinEndTime){
					$('#memberJoinEndTime' + ind).datebox('setValue',memberJoinEndTime);
				}
				//已购票会员领劵
				if(bean.isAlreadyPurchased=="1" || bean.isAlreadyPurchased=="0"){
					$("input[name='isAlreadyPurchased']").removeAttr("disabled");
					$("input[name='isAlreadyPurchased']:radio").each(function() {
						if (this.value == bean.isAlreadyPurchased ){
					   		this.checked = true;
						}
					});
				}else{
					$("input[name='isAlreadyPurchased']").attr("disabled", "disabled");
					$("input[name='isAlreadyPurchased']").removeAttr("checked");
				}
				
                $("input[name='isSkyDefendSysIntgd']").each(function (index, el) {
                    if($(this).val()==bean.isSkyDefendSysIntgd){
                        $(this).prop("checked",true);
                    }
                });
                $("#phoneUserGrade_save").combobox('select',bean.phoneUserGrade);
                if (bean.phoneUserGrade!=1){
                    $("#phoneUserGrade_save").combobox('disable',true);
                }
                
                if(bean.isSpecifyWhiteMember!=null){
                	$('#isSpecifyWhiteMember').val(bean.isSpecifyWhiteMember); 
                }
                if(bean.isSpecifiedMember!=null){
                	$('#isSpecifiedMember').val(bean.isSpecifiedMember); 
                }
			}
		});
	}
	
})(jQuery);

window.onError = function(){
	console.log(e);
};

function fmtDiscountType(value, rowData, rowIndex){
	return discountTypeMap(value);
}

function discountTypeMap(value){
	
	var objDiscountType = {
			"0" : "国内收入现金优惠券",
			"1" : "国内运价优惠券",
			"2" : "国内费用现金优惠券",
			"3" : "国际虚拟资金优惠券",
			"4" : "国际自有资金优惠券",
			/*"0" : "国内合作活动优惠券",
			"1" : "航线促销优惠券",
			"2" : "费用现金",
			"3" : "国际营销活动优惠券",
			"4" : "国际合作活动优惠券",
			"3" : "国际虚拟资金优惠券",
			"4" : "国际自有资金优惠券",
			'5' :'国内里程优惠券',
			'6' :'国内旅客服务优惠券',*/
			/*'7' :'国际里程优惠券',
			'8' :'国际旅客服务优惠券',*/
			'9' :'韩国自有资金优惠券',
			'10' :'韩国虚拟资金优惠券',
			'11' :'澳洲自有资金优惠券',
			'12' :'澳洲虚拟资金优惠券',
			'13' :'新西兰自有资金优惠券',
			'14' :'新西兰虚拟资金优惠券',
			'15' :'新加坡自有资金优惠券',
			'16' :'新加坡虚拟资金优惠券',
			'17' :'英国自有资金优惠券',
			'18' :'英国虚拟资金优惠券',
			'19' :'国内合作活动次数券',
			'20' :'国内营销活动次数券',
			'21' :'国际合作活动次数券',
			'22' :'国际营销活动次数券',
			'23' :'国内合作活动协议价次数券',
			'24' :'国内营销活动协议价次数券',
			'25' :'国际合作活动协议价次数券',
			'26' :'国际营销活动协议价次数券'
	}
	var discountTypeText = "";
	if (value != null && value != undefined){
		var values = value.split(",");
		for( var i in values ){
			var p = values[i];
			if(discountTypeText.length > 0){
				discountTypeText =discountTypeText + "/" + objDiscountType[p];
			}else{
				discountTypeText = objDiscountType[p];
			}
		}
	}
	/*for( var p in objDiscountType ){
		if(value && value.indexOf(p) > -1 ){
			if(discountTypeText.length > 0){
				discountTypeText =discountTypeText + "/" + objDiscountType[p];
			}else{
				discountTypeText = objDiscountType[p];
			}
		}
	}*/
	return discountTypeText;
}

function fmtChannelId(value, rowData, rowIndex){
	return channelIdMap(value);
}

function channelIdMap (value){
	
	var objChannelId = {
			"C001" : "PC端",
			"C002" : "移动端",
			"C003" : "APP",
			"C004" : "IOS版",
			"C005" : "触屏版",
			"C006" : "微信版",
			"C600" : "合作渠道1",
			"C601" : "合作渠道2",
			"C602" : "合作渠道3",
			"C603" : "合作渠道4",
			"C604" : "合作渠道5"
	}
	var channelIdText = "";
	for( var p in objChannelId ){
		if( value && value.indexOf(p) > -1 ){
			if(channelIdText.length > 0){
				channelIdText =channelIdText + "/" + objChannelId[p];
			}else{
				channelIdText = objChannelId[p];
			}
		}
	}
	return channelIdText;
}

function downloadFile(url) {
	var url = url;
	window.open(encodeURI(url));
}

function changeLoginRequired() {
	var isLogin = $("input[name='isLogin']:checked").val();//是否必须登录
	var isMemberSonly = $("input[name='isMemberSonly']:checked").val();//是否仅限明珠会员
	
	if (isLogin=="1") {
		$("input[name='necessaryInfo']").attr("disabled", "disabled");
		$("input[name='isMobileRandcode']").attr("disabled", "disabled");
		$("input[name='isMemberSonly']").removeAttr("disabled");
		
		if(isMemberSonly!="0"){
			$("input[name='membersLevel']").removeAttr("disabled");
			$("#memberJoinStartTime_save").datebox({disabled:false});
			$("#memberJoinEndTime_save").datebox({disabled:false});
			$("#registeredHours_save").textbox({disabled:false});
			$("#isCouple_save").combobox('enable');
		}else{
			$("input[name='membersLevel']").attr("disabled", "disabled");
			$("#memberJoinStartTime_save").datebox({disabled:true});
			$("#memberJoinEndTime_save").datebox({disabled:true});
			$("#registeredHours_save").textbox({disabled:true});
			$("#isCouple_save").combobox('enable');
		}
	} else {
		$("input[name='necessaryInfo']").removeAttr("disabled");
		$("input[name='isMobileRandcode']").removeAttr("disabled");
		
		$("input[name='isMemberSonly']").attr("disabled", "disabled");
		$("input[name='membersLevel']").attr("disabled", "disabled");
		$("#memberJoinStartTime_save").datebox({disabled:true});
		$("#memberJoinEndTime_save").datebox({disabled:true});
		$("#registeredHours_save").textbox({disabled:true});
		$("#isCouple_save").combobox('disable');
	}
}

function changeMembersOnly() {
	var values = $("input[name='isMemberSonly']:checked").val();
	if (values == 0) {
		$("input[name='membersLevel']").attr("disabled", "disabled");
		$("#memberJoinStartTime_save").datebox({disabled:true});
		$("#memberJoinEndTime_save").datebox({disabled:true});
		$("#registeredHours_save").textbox({disabled:true});
		$("#isCouple_save").combobox('disable');
	} else {
		$("input[name='membersLevel']").removeAttr("disabled");
		$("#memberJoinStartTime_save").datebox({disabled:false});
		$("#memberJoinEndTime_save").datebox({disabled:false});
		$("#registeredHours_save").textbox({disabled:false});
		$("#isCouple_save").combobox('enable');
	}
}

function changeNecessaryInformation(){
	var values = $("input[name='necessaryInfo']:checked").val();
	if(values == 1){
		$("input[name='isMobileRandcode']").removeAttr("disabled");
	}else{
		$("input[name='isMobileRandcode']").attr("disabled", "disabled");
	}
}


/**指定用户领取*/
function doMarketrruSpecifyformemberSearch(){
	var data = MarketingActivityMnt.handleFormData('#marketingActivitySaveForm',"_save");
	$("#marketrruSpecifyformember").empty();//删除上次查询的内容
	if( data!=null && data.actionId != null && data.actionId!=""){
		openMarketrruSpecifyformemberSelect();
		$("#marketrruSpecifyformember").show().dialog("open");
		window.frames["marketrruSpecifyformemberSelect"].openIframeId="marketrruSpecifyformember";
		window.frames["marketrruSpecifyformemberSelect"].userId="issuMarketrruSpecifyformemberId";
		window.frames["marketrruSpecifyformemberSelect"].userName="applyMarketrruSpecifyformemberName";
	}else{
		CMC.alertMessage("新增时没有内容可查看!", '提示');
	}
}
function openMarketrruSpecifyformemberSelect(){
	if(!window.frames["marketrruSpecifyformemberSelect"]){
        $('#marketrruSpecifyformember').show().dialog({
            title: "指定用户领取",
            closed: true,
            cache: true,
            width: 920,
            height: 540,
            minimizable: true,
            maximizable: true,
            collapsible: true,
            content: '<iframe id="marketrruSpecifyformemberSelect" name="marketrruSpecifyformemberSelect" src="/cmc/module/marketingActivity/marketrruSpecifyformember.html" frameborder=0 height=100% width=100% scrolling=no></iframe>'
        });
        var winTopLeft = CMC.getWindowTopLeft("marketrruSpecifyformember");
        $('#ticketActivityRules').window({
            top:winTopLeft.winTop,
            left:winTopLeft.winLeft
        });
    }
}

/**指定白名单领取*/
function doMarketruleWhiteUsersSearch(){
	var data = MarketingActivityMnt.handleFormData('#marketingActivitySaveForm',"_save");
	$("#marketruleWhiteUsers").empty();//删除上次查询的内容
	if( data!=null && data.actionId != null && data.actionId!=""){
		console.log(data.actionId+"=====");
		openMarketruleWhiteUsersSelect();
	    console.log(data.actionId+"-----");
		$("#marketruleWhiteUsers").show().dialog("open");
		window.frames["marketruleWhiteUsersSelect"].openIframeId="marketruleWhiteUsers";
		window.frames["marketruleWhiteUsersSelect"].userId="issuMarketruleWhiteUsersId";
		window.frames["marketruleWhiteUsersSelect"].userName="applyMarketruleWhiteUsersName";
	}else{
		CMC.alertMessage("新增时没有内容可查看!", '提示');
	}
}
function openMarketruleWhiteUsersSelect(){
	if(!window.frames["marketruleWhiteUsersSelect"]){
        $('#marketruleWhiteUsers').show().dialog({
            title: "指定白名单领取",
            closed: true,
            cache: true,
            width: 920,
            height: 540,
            minimizable: true,
            maximizable: true,
            collapsible: true,
            content: '<iframe id="marketruleWhiteUsersSelect" name="marketruleWhiteUsersSelect" src="/cmc/module/marketingActivity/marketruleWhiteUsers.html" frameborder=0 height=100% width=100% scrolling=no></iframe>'
        });
        var winTopLeft = CMC.getWindowTopLeft("marketruleWhiteUsers");
        $('#marketruleWhiteUsers').window({
            top:winTopLeft.winTop,
            left:winTopLeft.winLeft
        });
    }
}

/**购票活动领取规则*/
function doTicketActivityRulesSearch() {
	var data = MarketingActivityMnt.handleFormData('#marketingActivitySaveForm',"_save");
	$("#ticketActivityRules").empty();//删除上次查询的内容
	if( data!=null && data.actionId != null && data.actionId != ""){
		console.log(data.actionId+"=====");
	    openSelect();
	    console.log(data.actionId+"-----");
	    $("#ticketActivityRules").show().dialog("open");
	    window.frames["ticketActivityRulesSelect"].openIframeId="ticketActivityRules";
	    window.frames["ticketActivityRulesSelect"].userId="issuTicketActivityRulesId";
	    window.frames["ticketActivityRulesSelect"].userName="applyTicketActivityRulesName";
	}else{
		CMC.alertMessage("新增时没有内容可查看!", '提示');
	}
}

function openSelect(){
    if(!window.frames["ticketActivityRulesSelect"]){
        $('#ticketActivityRules').show().dialog({
            title: "购票活动领取规则",
            closed: true,
            cache: true,
            width: 920,
            height: 540,
            minimizable: true,
            maximizable: true,
            collapsible: true,
            content: '<iframe id="ticketActivityRulesSelect" name="ticketActivityRulesSelect" src="/cmc/module/marketingActivity/ticketActivityRules.html" frameborder=0 height=100% width=100% scrolling=no></iframe>'
        });
        var winTopLeft = CMC.getWindowTopLeft("ticketActivityRules");
        $('#ticketActivityRules').window({
            top:winTopLeft.winTop,
            left:winTopLeft.winLeft
        });
    }
}

/**获取批次*/
function doGroupIdSearch() {
	
	var groupId = $("#actionType_save").combobox('getValue');
	
	var src = "/cmc/module/marketingActivity/marketrulediscountGroupId.html?groupId="+groupId;
	$("#addGroupidDialog").dialog({
		title:'选择优惠券批次',
		closed:false,
		cache:false,
		modal:true,
		content:'<iframe id="createFrame" name="createFrame" src='+src+' frameborder="no" border="0" scrolling="no" style="width:818px;height:540px;"></iframe>'
	});
	CMC.dialog('addGroupidDialog','open');
	var winTopLeft = CMC.getWindowTopLeft("updateDialog_update");
	$('#updateDialog_update').window({
		top:winTopLeft.winTop,
		left:winTopLeft.winLeft
	});
	
	
}

/*function jsonYearMonthDay(milliseconds) {
    var datetime = new Date();
    datetime.setTime(milliseconds);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0"
            + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate()
            : datetime.getDate();
    return year + "-" + month + "-" + date;
    return datetime;
}*/
//调取腾讯接口检验单选控制
$("input[name='isSkyDefendSysIntgd']").each(function (index, el) {
    $(el).click(function () {
        if (index==0){
            $("#phoneUserGrade_save").combobox('enable');
            // $("input[name='identityAuth']")
        }else{
            $("#phoneUserGrade_save").combobox('select', "0");
            $("#phoneUserGrade_save").combobox('disable',false);
        }
    });
});

$("#searchFormStatisticsExcel").click(function(){
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
	}
	if(message == "" || message == "undefined" || message == null){
		CMC.alertMessage("请输入单个优惠券批次号/编号/责任人或选择excel格式的文件。",'warn');
		return ;
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
		url: MarketingActivityMnt.exportStatisticsUrl,
		method: "POST",
		dataType: "json",
		fileElementId:  formElementId,
		data:{"message":message, "bindType":bindType, "type":type},
		success: function(response){
			CMC.alertMessage("导出活动统计报表异步请求成功,请移步首页并查看报表记录下载文件！", 'info');
			CMC.dialog('StatisticsExport','close');
		},
		error: function(){
			CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
		}
	});
});
function initHtml(dictionary){
	var str = "";
	var id = dictionary.type.typeKey.split("_")[1];
	if(id=="typeDiv"){
		for(var i=1;i<dictionary.detail.length;i++){
			str += "<input type=\"checkbox\" name=\"optDiscountType\" value=\""+dictionary.detail[i].detailValue+"\"><span>"+dictionary.detail[i].detailName+"</span><br/>";
		}
	}else if(id=="channelDiv"){
		bubbleSort(dictionary.detail);
		for(var i=1;i<dictionary.detail.length;i++){
			str += "<input type=\"checkbox\" name=\"optChannelId\" value=\""+dictionary.detail[i].detailValue+"\"><span>"+dictionary.detail[i].detailName+"</span>&nbsp;&nbsp;";
			//if(i%3==0){
				str += "<br/>";
			//}
		}
	}
	$("#"+id).html(str);
}


function bubbleSort(arr) {
	　　var len = arr.length;
	　　for (var i = 0; i < len; i++) {
	　　　　for (var j = 0; j < len - 1 - i; j++) {
	　　　　　　if (arr[j].detailValue > arr[j+1].detailValue) { //相邻元素两两对比
	　　　　　　　　var temp = arr[j+1]; //元素交换
	　　　　　　　　arr[j+1] = arr[j];
	　　　　　　　　arr[j] = temp;
	　　　　　　}
	　　　　}
	　　}
	　　return arr;
	}