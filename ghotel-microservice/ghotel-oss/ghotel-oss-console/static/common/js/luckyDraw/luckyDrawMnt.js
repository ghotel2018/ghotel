var LuckyDrawMnt = {
		menuId: "LuckyDraw",
		searchTableRequired: true,
		getConfigUrl: "authorized/luckyDraw/discountType/",
		searchUrl: "authorized/luckyDraw/getAll" ,
		addUrl:"authorized/luckyDraw/add",
		modifyUrl:"authorized/luckyDraw/modify",
		getUrl: "authorized/luckyDraw/get/",
		updateSwitchsUrl:"authorized/luckyDraw/updateSwitchs",
		deleteActivityUrl:"authorized/luckyDraw/deleteActivity/",
		exportWinnningReportUrl:"authorized/luckyDraw/exportWinnningReport",
		exportStatisticalReportUrl:"authorized/luckyDraw/exportStatisticalReport",
		importUrl:'authorized/luckyDraw/importReport',
		ExchangePointsReportUrl:'authorized/luckyDraw/exchangePointsReport',
		updateDetailAwards:'',
		columns :  [[
           {field: 'activitiesId', title:'活动编码' , width: '16%' , align: 'center'},
           {field: 'activitiesTitle', title:'活动名称' , width: '15%' , align: 'center'},
           {field: 'activityType', title:'活动类型' , width: '10%' , align: 'center' ,formatter: fmtActivityType},
           {field: 'startDate', title:'活动开始时间' , width: '12%' , align: 'center'},
           {field: 'endDate', title:'活动结束时间' , width: '12%' , align: 'center'},
           {field: 'switchs', title:'活动开关' , width: '7%' , align: 'center',formatter:fmtSwitchs},
           {field: 'createDate', title:'创建日期' , width: '12%' , align: 'center'},
           {field: 'createDate', title:'最后更新日期' , width: '12%' , align: 'center'}
	    ]],
	    maxAwardNum:10,//最大奖品种数数量
	    awardLevelMap : {
    	    1:'一等奖',
    	    2:'二等奖',
    	    3:'三等奖',
    	    4:'四等奖',
    	    5:'五等奖',
    	    6:'六等奖',
    	    7:'七等奖',
    	    8:'八等奖',
    	    9:'九等奖',
    	   10:'十等奖',
    	},
    	awardType : [{"value":" ","text":"请选择或填入奖品名称"},{"value":"1","text":"优惠券"},{"value":"2","text":"兑换积分"}],
    	awardModelSelected:""//右键选中的奖品模板
};

$(document).ready(function(){
	CMC.init(LuckyDrawMnt);
});

(function($){


	/*兑换积分报表导出条件窗口弹出*/
	$("#luckydraw_ExchangePointsReport").click(function(event) {
		CMC.dialog('ExchangePointsReportDetail','open');
	});
	/**/
	$("#luckydrawInfo_ExchangePointsReport").click(function(event) {
		$("#ExchangePointsReportForm").form("enableValidation");
		var isValid = $("#ExchangePointsReportForm").form("validate");

		if (isValid) {
			CMC.request({
				url: LuckyDrawMnt.ExchangePointsReportUrl,
				method: 'POST',
				data : $("#ExchangePointsReportForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.dialog('ExchangePointsReportDetail','close');
					$("#ExchangePointsReportForm").form("clear");
				}
			});
		}
	});

	$("#clearCondition").click(function(){
//		$('#luckDrawSearchForm').form('clear');
//		$("input[name='start']:hidden").val("1");
//		$("input[name='end']:hidden").val("10");
		
		var start= $("#luckDrawSearchForm input[name='start']:hidden").val();
		var end=$("#luckDrawSearchForm input[name='end']:hidden").val();
		$('#luckDrawSearchForm').form('clear');
		$("#luckDrawSearchForm input[name='start']:hidden").val(start);
		$("#luckDrawSearchForm input[name='end']:hidden").val(end);
		CMC.search();
	});
	
	$("#searchFormAdd").click(function(){
		var winTopLeft = CMC.getWindowTopLeft("winLuckyDrawSave");
		$('#winLuckyDrawSave').window({
			top:winTopLeft.winTop,
			left:winTopLeft.winLeft,
			title:'抽奖活动——新增'
		});
		
		$("#awards").children().remove();//移除所有奖品
		$('#luckyDrawSaveForm').form('clear');//清空重置form

		$('#winLuckyDrawSave').window('open');
		$('#activityType_save').combobox('setValue','1');
        // $("input[name='isSkyDefendSysIntgd']").each(function (index, domEle) {
		 //    if (index==0){
        //         $(this).prop('checked',true);
        //     }
        // });
        $("#phoneUserGreade_save").combobox('disable');
        $("#phoneUserGreade_save").combobox('select', "0");

        LuckyDrawMnt.updateDetailAwards="";
		addAwardModel();//添加一等奖
	});

	//调取腾讯接口检验单选控制
	$("input[name='isSkyDefendSysIntgd']").each(function (index, el) {
        $(el).click(function () {
            if (index==0){
                $("#phoneUserGreade_save").combobox('enable');
            }else{
                $("#phoneUserGreade_save").combobox('select', "0");
                $("#phoneUserGreade_save").combobox('disable');
            }
        });
    });

	$("#searchFormUpdate").click(function(){
		
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请选择一条抽奖活动记录!", '提示');
			return;
		}
		
		var winTopLeft = CMC.getWindowTopLeft("winLuckyDrawSave");
		$('#winLuckyDrawSave').window({
			top:winTopLeft.winTop,
			left:winTopLeft.winLeft,
			title:'抽奖活动——编辑'
		});
		
		$("#awards").children().remove();//移除所有奖品
		$('#luckyDrawSaveForm').form('clear');//清空重置form

		$('#winLuckyDrawSave').window('open');
		
		LuckyDrawMnt.getDetail("#luckyDrawSaveForm", "_save", record["activitiesId"]);
		
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
					url: LuckyDrawMnt.deleteActivityUrl + record["activitiesId"],
					type : "get",
					success: function(response){
						if(response.messageBody == "0"){
							CMC.alertMessage("删除成功！",'info');
							CMC.search();
						}else if(response.messageBody == "1"){
							CMC.alertMessage("该活动已抽过奖，不能删除！",'info');
						}else{
							CMC.alertMessage("删除过程发生错误！",'info');
						}
					}
				});
			 }
		 });
	});
	
	$("#addAward").click(function(){
		addAwardModel();
	});
	
	$("#change").click(function(){
		getChanges();
	});
	
	$("#mmAward-add").click(function(){
		addAwardModel();
	});
	
	$("#mmAward-delete").click(function(){
		if(LuckyDrawMnt.awardModelSelected == "award_1"){
			CMC.alertMessage("一等奖不能删除哦！",'info');
			return;
		}
		$("#" + LuckyDrawMnt.awardModelSelected).parents(".propertygrid").remove();
	});
	
	$("#save").click(function(){
		var data = LuckyDrawMnt.handleFormData("_save");
		var jsonData = JSON.parse(data[0]);
		if( jsonData.activitiesId == "" ){
			LuckyDrawMnt.submitSaveRequest(data,LuckyDrawMnt.addUrl,'#luckyDrawSaveForm');
		}else{
			LuckyDrawMnt.submitSaveRequest(data,LuckyDrawMnt.modifyUrl,'#luckyDrawSaveForm');
		}
	});
	
	$("#close").click(function(){
		$('#winLuckyDrawSave').window('close');
	});
	
	
	$('#switchs_save').click(function(){
		var activityId = $("#activitiesId_save").val();
		if(!activityId){
			$('#switchs_save').linkbutton('disable');
			CMC.alertMessage("请先创建抽奖活动再设置开关！",'info');
			return;
		}
		
		if(this.text == "关闭"){
			LuckyDrawMnt.updateSwitchs(activityId,"0");
		}else{
			LuckyDrawMnt.updateSwitchs(activityId,"1");
		}
	});
	
	$("#searchFormWinningReport").click(function(){
		$("#activitiesId_export").textbox("setValue","");
		$("#raffleStartDate_export").datebox("setValue","");
		$("#raffleEndDate_export").datebox("setValue","");
		$("#prizesTitle_export").combobox('setValue','');
		$("#channel_export").combobox('setValue','');
		$("#winWinningReport").dialog('open');
	});
	
	$("#searchFormActivityStatisticsReport").click(function(){
		$("#activitiesId_statisticalReport").textbox("setValue","");
		var currentMonthFirstDate = new Date();
		currentMonthFirstDate.setDate(1);
		$("#raffleStartDate_statisticalReport").datetimebox("setValue",CMC.dateFormatter(currentMonthFirstDate));
		$("#raffleEndDate_statisticalReport").datetimebox("setValue",CMC.dateFormatter(new Date())+" 23:59:59");
		$("#winStatisticalReport").dialog('open');
	});
	
	
	$("#export_submit").click(function(){
		
		$("#winningReportForm input.validatebox-text").each(function(i,dom){
			$(this).validatebox('enableValidation');
			$(this).validatebox('validate');
		});
		if(!$("#winningReportForm").form('validate')){
			return;
		}
		
		var activitiesId = $("#activitiesId_export").val();//活动编码
		var raffleStartDate = $("#raffleStartDate_export").datebox('getValue');//获奖时间
		var raffleEndDate = $("#raffleEndDate_export").datebox('getValue');
		var prizesTitle = $("#prizesTitle_export").combobox('getValue');//奖项
		var channel = $("#channel_export").combobox('getValue');//渠道
		
		CMC.fileUpload({
			url: LuckyDrawMnt.exportWinnningReportUrl,
			method: "POST",
			dataType: "json",
			data:{
				"activitiesId":activitiesId, 
				"raffleStartDate":raffleStartDate,
				"raffleEndDate":raffleEndDate,
				"prizesTitle":prizesTitle,
				"channel":channel
			},
			success: function(response){
		  		CMC.alertMessage("导出获取报表异步请求成功,请移步首页并查看报表记录下载文件！", 'info');
		  		CMC.dialog('winWinningReport','close');
		  	},
		  	error: function(){
		  		CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
		  	}
		});
	});
	
	$("#statisticalExport_submit").click(function(){
		
		$("#winStatisticalReport input.validatebox-text").each(function(i,dom){
			$(this).validatebox('enableValidation');
			$(this).validatebox('validate');
		});
		if(!$("#winStatisticalReport").form('validate')){
			return;
		}
		
		var activitiesId = $("#activitiesId_statisticalReport").val();//活动编码
		var raffleStartDate = $("#raffleStartDate_statisticalReport").datebox('getValue');//获奖时间
		var raffleEndDate = $("#raffleEndDate_statisticalReport").datebox('getValue');
		
		CMC.fileUpload({
			url: LuckyDrawMnt.exportStatisticalReportUrl,
			method: "POST",
			dataType: "json",
			data:{
				"activitiesId":activitiesId, 
				"raffleStartDate":raffleStartDate,
				"raffleEndDate":raffleEndDate
			},
			success: function(response){
		  		CMC.alertMessage("活动统计报表异步请求成功,请移步首页并查看报表记录下载文件！", 'info');
		  		CMC.dialog('winStatisticalReport','close');
		  	},
		  	error: function(){
		  		CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
		  	}
		});
	});
	
	$("#export_close").click(function(){
		$("#winWinningReport").dialog('close');
	});
	
	$("#statisticalExport_close").click(function(){
		$("#winStatisticalReport").dialog('close');
	});
	
	
	$("#activityType_save").combobox({
		onChange: function (newVal,oldValue) {
			if( newVal == "1"){//积分抽奖
				$("#identityTitleVisible").addClass("displayNone");
				$("#identityVisible").addClass("displayNone");
				$("#pointTitleVisible").removeClass("displayNone");
				$("#pointVisible").removeClass("displayNone");
				$("#pointVisible2").removeClass("displayNone");
				$("#mobilePartinFlag").attr("style","display:inline;");
				$("#sjzh").attr("style","display:inline;");
			}else{
				$("#pointTitleVisible").addClass("displayNone");
				$("#pointVisible").addClass("displayNone");
				$("#pointVisible2").addClass("displayNone");
				$("#identityTitleVisible").removeClass("displayNone");
				$("#identityVisible").removeClass("displayNone");
				$('#pointsCollectStartTime_save').datebox('setValue','');
				$('#pointsCollectEndTime_save').datebox('setValue','');
				$('#rafflePoints_save').textbox('setValue','');
				$('#rafflePointsThreshold_save').textbox('setValue','');
//				var mobilePartinFlag = document.getElementById("mobilePartinFlag").value;
				$("#mobilePartinFlag").attr("style","display:none;");
				$("#sjzh").attr("style","display:none;");
			}
		}
	});
	
	
	//抽奖活动报表导入
	$("#luckydraw_Import").click(function(){
//		CMC.dialog('winMarketingActivityEffect','open');
		$("#luckydrawInfo").textbox('setValue','');
		$("#luckydrawImport").dialog("open");
	});
	
	$("#luckydraw_Template").click(function(){
		window.open(encodeURI("/cmc/download/luckyDrawTemplate.xlsx"));
	});
	
	$("#luckydrawInfo_import").click(function(){
		var val=$("#luckydrawInfo").val();
		if(val==""){
			CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
			return;
		}
		//判断文件后缀
		var fileUrl=$("#luckydrawInfo").val();
		if(fileUrl && fileUrl != "" && (fileUrl.indexOf("xls")==-1 && fileUrl.indexOf("xlsx")==-1 && fileUrl.indexOf("csv")==-1) ){
			CMC.alertMessage("请选择excel文件。",'warn');
			return ;
		}
		
		var data={"luckydrawInfoFile":val};
		
		LuckyDrawMnt.fileUpload(data,LuckyDrawMnt.importUrl,"#luckydrawImportForm","luckydrawInfoFile");
	});
	
	LuckyDrawMnt.fileUpload = function(data,url,formId,ind){

		CMC.confirm("是否确认导入文件?",function(r){
			if(r){
				 CMC.showProcessBox();
				 CMC.fileUpload({
					url: url,
					type: "POST",
					dataType: "json",
					fileElementId:  "luckydrawInfoFile",
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

	
	LuckyDrawMnt.updateSwitchs = function(activityId,switchs){
		
		CMC.request({
			url : LuckyDrawMnt.updateSwitchsUrl + "/"+activityId+"/"+switchs,
			type : "get",
			dataType : "json",
			async : true,
			success : function(response){
				if(response.messageBody){
					if(switchs=="0"){//开启
						$('#switchs_save').linkbutton({text:'开启'});
						$('#switchs_save').linkbutton('enable');
						CMC.alertMessage("开启成功！",'info');
					}else{
						$('#switchs_save').linkbutton({text:'关闭'});
						$('#switchs_save').linkbutton('disable');
						CMC.alertMessage("关闭成功！",'info');
					}
					CMC.search();
				}
			}
		});
	}
	
	LuckyDrawMnt.submitSaveRequest = function(data, url, formId){
		
		//验证活动
		/*$("input.validatebox-text").each(function(i,dom){
			$(this).validatebox('enableValidation');
			$(this).validatebox('validate');
		});
		
		if(!$(formId).form('validate')){
			return;
		}*/
		
		var activitiesTitle_save = $("#activitiesTitle_save").val();
		var startDate_save = $("#startDate_save").datebox('getValue');
		var endDate_save = $("#endDate_save").datebox('getValue');
		var pointsCollectStartTime_save = $("#pointsCollectStartTime_save").datebox('getValue');
		var pointsCollectEndTime_save = $("#pointsCollectEndTime_save").datebox('getValue');
		var activityType_save = $('#activityType_save').combobox('getValue');
		var rafflePoints_save = $("#rafflePoints_save").val();
		var rafflePointsThreshold_save = $("#rafflePointsThreshold_save").val();
		
		if(activityType_save==1){
			if(activitiesTitle_save==""){
				CMC.alertMessage("活动标题不能为空！",'info');
				return;
			}
			if(startDate_save=="" || endDate_save==""){
				CMC.alertMessage("活动时间不能为空！",'info');
				return;
			}
			if(pointsCollectStartTime_save=="" || pointsCollectEndTime_save==""){
				CMC.alertMessage("积分累积时间不能为空！",'info');
				return;
			}
			if(rafflePoints_save==""){
				CMC.alertMessage("每次所耗积分不能为空！",'info');
				return;
			}
			if(rafflePointsThreshold_save==""){
				CMC.alertMessage("积分阈值不能为空！",'info');
				return;
			}
		}else{
			if(activitiesTitle_save==""){
				CMC.alertMessage("活动标题不能为空！",'info');
				return;
			}
			if(startDate_save=="" || endDate_save==""){
				CMC.alertMessage("活动时间不能为空！",'info');
				return;
			}
		}
		
		var activity = data;
        //判断身份验证
        /*if (!$("#identityVisible").hasClass("displayNone")){
            if($("input[name='identityAuth']:checked").length<=0){
                CMC.alertMessage("请选择是否身份验证","warn");
                return;
            }
        }*/
		var awards = "";
		if(url == LuckyDrawMnt.addUrl){
			awards = getChangesList(false);//获取全部数据
		}else{
			awards = getChangesList(true);//获取更改的数据
		}
		
		for(var i=0; i< awards.length; i++){
			if(awards!="" && awards[i]){//奖品有修改项
				var jsonAward = JSON.parse(awards[i]);
				if(jsonAward.winningRate==""){
					CMC.alertMessage("【"+LuckyDrawMnt.awardLevelMap[i+1]+"】的【中奖率】不能为空！",'info');
					return;
				}
				if(jsonAward.prizesNum=="" && (jsonAward.prizesName !="2" || jsonAward.prizesName !="兑换积分")){//非交换积分类型不可为空
					CMC.alertMessage("【"+LuckyDrawMnt.awardLevelMap[i+1]+"】的【奖品数量】不能为空！",'info');
					return;
				}
				if(jsonAward.prizeNum==""){
					CMC.alertMessage("【"+LuckyDrawMnt.awardLevelMap[i+1]+"】的【中奖奖品数】不能为空！",'info');
					return;
				}
				if(jsonAward.prizesName=="" || jsonAward.prizesName==" "){
					CMC.alertMessage("【"+LuckyDrawMnt.awardLevelMap[i+1]+"】的【奖品名称】不能为空！",'info');
					return;
				}
				if(jsonAward.memberNumReqFlag==""){
					CMC.alertMessage("【"+LuckyDrawMnt.awardLevelMap[i+1]+"】的【是否填写明珠会员号】不能为空！",'info');
					return;
				}
				if(jsonAward.distribution==""){
					CMC.alertMessage("【"+LuckyDrawMnt.awardLevelMap[i+1]+"】的【是否配送】不能为空！",'info');
					return;
				}
			}
		}
		
		CMC.request({
			url: url,
			dataType: "json",
			method: 'POST',
			data:{"awards":awards,'activity':activity},
			success: function(response){
				if(response.statusCode==0){
					if(url == LuckyDrawMnt.addUrl){
						var activitiesId = response.messageCode;
						$('#activitiesId_save').textbox('setValue',activitiesId);
						$('#winLuckyDrawSave').window('close');
						CMC.alertMessage("营销活动创建成功！", 'info');
					}else{
						$('#winLuckyDrawSave').window('close');
						CMC.alertMessage("营销活动保存成功！", 'info');
					}
					CMC.search();
				}
			}
		});
	}

	LuckyDrawMnt.handleFormData = function(ind){

		var activitiesId = $("#activitiesId"+ind).val();//活动ID
		var activitiesTitle = $("#activitiesTitle"+ind).val();//活动标题
		var startDate = $("#startDate"+ind).datebox('getValue');//活动开始时间
		var endDate = $("#endDate"+ind).datebox('getValue');//活动结束时间
		var activityType = $("#activityType"+ind).combobox('getValue');//活动类型(1:积分抽奖,2:会员日抽奖)
		var rafflePoints = $("#rafflePoints"+ind).numberbox('getValue');//每次所耗积分
		var rafflePointsThreshold = $("#rafflePointsThreshold"+ind).numberbox('getValue');//积分阈值
		//参与对象
		var memberPartinFlag = $("input[name='memberPartinFlag']:checked").val()||"";//明珠会员
		var mobilePartinFlag = $("input[name='mobilePartinFlag']:checked").val()||"";//手机账号
		//是否身份认证
		var identityAuth =  $("input[name='identityAuth']:checked").val()||"";//是否身份认证,是#1，否#0
		var pointsCollectStartTime = $("#pointsCollectStartTime"+ind).datebox('getValue');//活动开始时间
		var pointsCollectEndTime = $("#pointsCollectEndTime"+ind).datebox('getValue');//活动结束时间

        var isSkyDefendSysIntgd=$("input[name='isSkyDefendSysIntgd']:checked").val()||"";
        var phoneUserGrade="";
        phoneUserGrade=$("#phoneUserGreade"+ind).combobox('getValue');

		var activity = [];//活动
		var temp = [];
		temp.push('{');
		temp.push('"activitiesId":"' + activitiesId + '"');
		temp.push(',"activitiesTitle":"' + activitiesTitle+'"');
		temp.push(',"startDate":"' + startDate + '"');
		temp.push(',"endDate":"' +  endDate + '"');
		temp.push(',"pointsCollectStartTime":"' + pointsCollectStartTime + '"');//new Date(
		temp.push(',"pointsCollectEndTime":"' + pointsCollectEndTime + '"');
		temp.push(',"activityType":"' + activityType+'"');
		temp.push(',"rafflePoints":"' + rafflePoints+'"');
		temp.push(',"rafflePointsThreshold":"' + rafflePointsThreshold+'"');
		temp.push(',"memberPartinFlag":"' + memberPartinFlag +'"');
		temp.push(',"mobilePartinFlag":"' + mobilePartinFlag +'"');
		temp.push(',"identityAuth":"' + identityAuth+'"');
        temp.push(',"isSkyDefendSysIntgd":"' + isSkyDefendSysIntgd + '"');
        temp.push(',"phoneUserGrade":"' + phoneUserGrade + '"');
		temp.push('}');
		
		activity.push(temp.join(""));
		return activity;
	}
	
	LuckyDrawMnt.getDetail = function(formId,ind,activityId){
		CMC.request({
			url : LuckyDrawMnt.getUrl + activityId,
			type : "get",
			dataType : "json",
			async : true,
			success : function(response){
				$(formId).form('clear');
				var data = response.messageBody;
				
				var activity = data.activity;
				
				if(activity['activityType']==1||activity['activityType']==2){
					$('#activityType' + ind).combobox('select',activity['activityType']);
				}else{
					$('#activityType' + ind).combobox('select',"2");//会员日
				}
				
				$("input[name='membersLevel']").each(function(i,dom){
					if( bean['MEMBERSLEVEL'] && bean['MEMBERSLEVEL'].indexOf( $(this).val() ) > -1 ){
						$(this)[0].checked = true;
					}
				});
				if( activity['startDate'] ){
					$('#startDate' + ind).datetimebox('setValue', format(activity['startDate']) );
				}
				if( activity['endDate'] ){
					$('#endDate' + ind).datetimebox('setValue', format(activity['endDate']) );
				}
				if( activity['pointsCollectStartTime'] ){
					$('#pointsCollectStartTime' + ind).datetimebox('setValue', format(activity['pointsCollectStartTime']) );
				}
				if( activity['pointsCollectEndTime'] ){
					$('#pointsCollectEndTime' + ind).datetimebox('setValue', format(activity['pointsCollectEndTime']) );
				}
				
				$('#rafflePoints' + ind ).numberbox('setValue',activity["rafflePoints"]);
				$('#rafflePointsThreshold' + ind ).numberbox('setValue',activity["rafflePoints"]);
				
				$('#activitiesTitle' + ind ).textbox("setValue",activity["activitiesTitle"]);
				$('#activitiesId' + ind ).textbox("setValue",activity["activitiesId"]);
			
				if(activity["memberPartinFlag"] || activity["mobilePartinFlag"] ){
					if(activity["memberPartinFlag"] == "1"){
						$("input[name='memberPartinFlag']")[0].checked = true;
					}
					if(activity["mobilePartinFlag"] == "1"){
						$("input[name='mobilePartinFlag']")[0].checked = true;
					}
				}else{
					$("input[name='memberPartinFlag']")[0].checked = true;//兼容以往老数据
				}
					
				if(activity['identityAuth']=="1" || activity['identityAuth']=="0"){
					$("input[name='identityAuth']:radio").each(function() {
						if ($(this).val() == activity['identityAuth'] ){
					   		$(this).prop("checked",true);
						}
					});
				}
				if(activity["switchs"]==0){//0开,1关
					$('#switchs_save').linkbutton({text:'开启',selected:false});
				}else{
					$('#switchs_save').linkbutton({text:'关闭',selected:true});
				}

                $("input[name='isSkyDefendSysIntgd']").each(function (index, el) {
                    if($(this).val()==activity['isSkyDefendSysIntgd']){
                        $(this).prop("checked",true);
                    }
                });
                $("#phoneUserGreade_save").combobox('select',activity['phoneUserGrade']);
				if (activity['isSkyDefendSysIntgd']!=1){
				    $("#phoneUserGreade_save").combobox('disable',false);
                }

				var awards = data.awards;//奖品
				LuckyDrawMnt.updateDetailAwards = awards;//提交时有用
				
				for( var i= 0; i< awards.length ; i++ ){

                    var title=LuckyDrawMnt.awardLevelMap[i+1];

                    addAwardModel(awards[i],title);

					// addAwardModel();
					// var awardTitle = LuckyDrawMnt.awardLevelMap[i+1];
					// //赋值
					// var model = [{ "group": awardTitle,"name": "<span style='color:red'>*</span>中奖率(百万分之…)", "value":  awards[i].winningRate,  "field": "winningRate",
					// 		"editor":{
					// 	        "type":"numberbox",
					// 	        "options":{
					// 	        	"min":0,
					// 	        	"max":1000000
					// 	        }
					// 		}
					// },{ "group": awardTitle,"name": "<span id='prizesNum_"+(i+1)+"' style='color:red'></span>奖品数量","value": awards[i].prizesNum==-1?"":awards[i].prizesNum, "field": "prizesNum",
					// 		"editor":{
					// 	        "type":"numberbox",
					// 	        "options":{
					// 	        	"min":0
					// 	        }
					// 		}
					// },{ "group": awardTitle,"name": "<span style='color:red'>*</span>中奖奖品数","value": awards[i].prizeNum,  "field": "prizeNum",
					// 		"editor":{
					// 	        "type":"numberbox",
					// 	        "options":{
					// 	        	"min":0
					// 	        }
					// 		}
					// },{ "group": awardTitle,"name": "<span style='color:red'>*</span>奖品名称","value": awards[i].prizesName,  "field": "prizesName","awardNo": (i+1),
					// 		"editor": {
					// 			"type": 'combobox',
					// 			"options": {
					// 				"valueField": 'value', "textField": 'name', "required": true,'panelHeight':'auto',"editable":true,
					// 				"data":[{"value":"","name":"请选择或填入"},{"value":"1","name":"优惠券"},{"value":"2","name":"兑换积分"}],//定义其他：0
                     //                onSelect: function(data) {
                     //                    //									var row = $('#table1').propertygrid('getSelected'); //获取所选行data
                     //                    //									var rindex = $('#table1').propertygrid('getRowIndex', row); //获取所选行index
                     //                    //
                     //                    //console.log("rindez:" + rindex);
                    //
                     //                    if(data.value == "2") {
                     //                        status = true;
                     //                        addNewRow(this, currentAwardCount);
                     //                    } else if(status) {
                     //                        removeNewRow(currentAwardCount);
                     //                    }
                     //                }
					// 			},
                    //
					// 		}
					// },{ "group":awardTitle,"name": "<span style='color:red'>*</span>是否填写明珠会员号", "value": awards[i].memberNumReqFlag,  "field": "memberNumReqFlag",
					// 	"editor": {
					// 		"type": 'combobox',
					// 		"options": {
					// 			"valueField": 'value', "textField": 'name', "required": true,'panelHeight':'auto',"editable":false,
					// 			"data":[{"value":"1","name":"是"},{"value":"0","name":"否"}]
					// 		}
					// 	}
					// },{ "group":awardTitle,"name": "<span style='color:red'>*</span>是否配送","value": awards[i].distribution,  "field": "distribution",
					// 		"editor": {
					// 			"type": 'combobox',
					// 			"options": {
					// 				"valueField": 'value', "textField": 'name', "required": true,'panelHeight':'auto',"editable":false,
					// 				"data":[{"value":"yes","name":"是"},{"value":"no","name":"否"}]
					// 			}
					// 		}
					// 	},
					// 	{ "group": awardTitle,"name": "PRE-URL", "value": awards[i].preUrl, "field": "preUrl", "editor":'text' }
                    // ];
					// $('#award_'+(i+1)).propertygrid({
					// 	columns: [[
				     //       { field: 'name', title: 'Name',resizable: true,width:'180px'},
				     //       { field: 'value', title: 'Value',resizable: false,width:'230px',
				     //    	   formatter: function(value,rowData,rowIndex){
			         //                switch(rowData.field){
				     //                    case 'prizesName':{
				     //                		if(value == "1"){
				     //                			/*if( $("#prizesNum_"+ rowData.awardNo).text() == "" ){
					//                     			$("#prizesNum_"+ rowData.awardNo).append("*");
				     //                			}*/
				     //                			return "优惠券";
				     //                		}
				     //                		if(value == "2"){
				     //                			$("#prizesNum_"+ rowData.awardNo).empty();
				     //                			return "兑换积分";
				     //                		}
				     //                		/*if( $("#prizesNum_"+ rowData.awardNo).text() == "" ){
				     //                			$("#prizesNum_"+ rowData.awardNo).append("*");
			         //            			}*/
				     //                		return value;
				     //                	};break;
				     //                    case 'distribution':{//是否配送
				     //                    	return rowData.value=="yes"?"是":"否";
				     //                    };break;
				     //                    case 'memberNumReqFlag':{
				     //                    	return rowData.value=="1"?"是":"否";
				     //                    };break;
                     //                    case 'actionId':
                     //                    {
                     //                        for(var data in comboxData) {
                     //                            if(value == comboxData[data].value) {
                     //                                return comboxData[data].text;
                     //                            }
                     //                        }
                    //
                     //                    };
                     //                        break;
				     //                    default: {return value;}
			         //                }
				     //    	   }
				     //       }
					// 	]]
					// });
					// $('#award_'+(i+1) ).propertygrid('loadData', model);
				}
			}
		});
	}
	
})(jQuery);

window.onError = function(){
	console.log(e);
};

function fmtActivityType(value, rowData, rowIndex){
	switch(value){
		case "1":{return "积分抽奖";break;}
		case "2":{return "会员日抽奖";break;}
		default : return "会员日抽奖";
	}
}

function fmtSwitchs(value, rowData, rowIndex){
	switch(value){
		case 0:{return "开";break;}
		case 1:{return "<span style='color:red'>关</span>";break;}
		default : return "未知值："+value;
	}
}

function addAwardModel(data,title){

    var currentAwardCount = $("#awards").children().length; //现有奖品种数
    var prizesNumTag = "prizesNum_" + (currentAwardCount + 1);
    if(undefined!=data){
        updateDetailAwards=data;
    }
    if(currentAwardCount < 10) {

        var model = [{
            "group": title==undefined?"一等奖":title,
            "name": "<span style='color:red'>*</span>中奖率(百万分之…)",
            "value": data==undefined?"":data.winningRate,
            "field": "winningRate",
            "editor": {
                "type": "numberbox",
                "options": {
                    "min": 0,
                    "max": 1000000
                }
            }
        }, {
            "group": title==undefined?"一等奖":title,
            "name": "<span id='" + prizesNumTag + "' style='color:red'></span>奖品数量",
            "value": data==undefined?"":data.prizesNum,
            "field": "prizesNum",
            "editor": {
                "type": "numberbox",
                "options": {
                    "min": 0
                }
            }
        }, {
            "group": title==undefined?"一等奖":title,
            "name": "<span style='color:red'>*</span>中奖奖品数",
            "value": data==undefined?"":data.prizeNum,
            "field": "prizeNum",
            "editor": {
                "type": "numberbox",
                "options": {
                    "min": 0
                }
            }
        }, {
            "group": title==undefined?"一等奖":title,
            "name": "<span style='color:red'>*</span>奖品名称",
            "value": data==undefined?" ":data.prizesName,
            "field": "prizesName",
            'awardNo': (currentAwardCount + 1),
            "editor": {
                "type": 'combobox',
                "options": {
                    "valueField": 'value',
                    "textField": 'text',
                    'panelHeight': 'auto',
                    "data": [{
                        "value": " ",
                        "text": "请选择或填入奖品名称"
                    },{
                        "value": "1",
                        "text": "优惠券"
                    }, {
                        "value": "2",
                        "text": "兑换积分"
                    }], //定义其他：0
                    onSelect: function(data) {
                        //									var row = $('#table1').propertygrid('getSelected'); //获取所选行data
                        //									var rindex = $('#table1').propertygrid('getRowIndex', row); //获取所选行index
                        //
                        //console.log("rindez:" + rindex);

                        if(data.value == "1") {
                            status = true;
                            addNewRow(undefined,currentAwardCount);
                        } else if(status) {
                            removeNewRow(currentAwardCount);
                        }
                    }
                }
            }
        },/* {
            "group": title==undefined?"一等奖":title,
            "name": "<span style='color:red'>*</span>活动：",
            "value": "",
            "field": "activedId",
            "editor": {
                type:'textbox',options:{
                    required:false,
                    buttonText:'Search',
                    onClickButton:function(){
//									alert($(this).val()+"单击");
                        openActivedIdModel();
                    }
                }
            }
        },*/ {
            "group": title==undefined?"一等奖":title,
            "name": "<span style='color:red'>*</span>是否填写明珠会员号",
            "value": data==undefined?"0":data.memberNumReqFlag,
            "field": "memberNumReqFlag",
            "editor": {
                "type": 'combobox',
                "options": {
                    "valueField": 'value',
                    "textField": 'name',
                    "required": true,
                    'panelHeight': 'auto',
                    "editable": false,
                    "data": [{
                        "value": "1",
                        "name": "是"
                    }, {
                        "value": "0",
                        "name": "否"
                    }]
                }
            }
        }, {
            "group": title==undefined?"一等奖":title,
            "name": "<span style='color:red'>*</span>是否配送",
            "value": data==undefined?"yes":data.distribution,
            "field": "distribution",
            "editor": {
                "type": 'combobox',
                "options": {
                    "valueField": 'value',
                    "textField": 'name',
                    "required": true,
                    'panelHeight': 'auto',
                    "editable": false,
                    "data": [{
                        "value": "yes",
                        "name": "是"
                    }, {
                        "value": "no",
                        "name": "否"
                    }]
                }
            }
        },
            {
                "group": title==undefined?"一等奖":title,
                "name": "PRE-URL",
                "value": data==undefined?"":data.preUrl,
                "field": "preUrl",
                "editor": {
                    type:'textbox'
                }
            },
        ];

        var createAwardLevelNo = 0; //当前要创建的奖品等级
        for(var i = 1; i <= 10; i++) {
            if(undefined == $("#award_" + i).attr("id")) {
                createAwardLevelNo = i;
                break;
            }
        }
        $.each(model, function(i, item) {
            item.group = LuckyDrawMnt.awardLevelMap[createAwardLevelNo];
        });
        var createAwardLevelId = "award_" + createAwardLevelNo;
        //按奖品顺序排列
        if(createAwardLevelId == "award_1") {

            $("#awards").append("<div id='award_1' style='width:430px'></div>");
        } else {
            var previousAwardLevelNo = createAwardLevelNo - 1;
            /*if (createAwardLevelNo%2==0){
                $("#award_" + previousAwardLevelNo).parents("tr").append("<td><div id='" + createAwardLevelId + "' style='width:430px'></div></td>");
            }else{
                $("#award_" + previousAwardLevelNo).parents("tr").after("<tr><td><div id='" + createAwardLevelId + "' style='width:430px'></div></td></tr>")
            }*/

                $("#award_" + previousAwardLevelNo).parents(".propertygrid").after("<div id='" + createAwardLevelId + "' style='width:430px'></div>");
        }

        $('#' + createAwardLevelId).propertygrid({
            height: "240px",
            width: "440px",
            showGroup: true,
            scrollbarSize: 0,
            showHeader: false,
            onRowContextMenu: function(e, rowIndex, rowData) {
                e.preventDefault();
//						LuckyDrawMnt.awardModelSelected = createAwardLevelId; //奖品等级
                $('#mmAward').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
            },
            columns: [
                [{
                    field: 'name',
                    title: 'Name',
                    resizable: true,
                    width: '180px'
                },
                    {
                        field: 'value',
                        title: 'Value',
                        resizable: false,
                        width: '230px',
                        formatter: function(value, rowData, rowIndex) {
                            switch(rowData.field) {
                                case 'prizesName':
                                {
                                    if(value == "1") {
                                        /*if( $("#prizesNum_"+ rowData.awardNo).text() == "" ){
                                         $("#prizesNum_"+ rowData.awardNo).append("*");
                                         }*/
                                        return "优惠券";
                                    }
                                    if(value == "2") {
                                        $("#prizesNum_" + rowData.awardNo).empty();
                                        return "兑换积分";
                                    }
                                    /*if( $("#prizesNum_"+ rowData.awardNo).text() == "" ){
                                     $("#prizesNum_"+ rowData.awardNo).append("*");
                                     }*/
                                    return value;
                                };
                                    break;
                                case 'distribution':
                                { //是否配送
                                    return rowData.value == "yes" ? "是" : "否";
                                };
                                    break;
                                case 'memberNumReqFlag':
                                {
                                    return rowData.value == "1" ? "是" : "否";
                                };
                                    break;
                               /* case 'activedId':
                                {
                                    for(var data in comboxData) {
                                        if(value == comboxData[data].value) {
                                            return comboxData[data].text;
                                        }
                                    }

                                };
                                    break;*/
                                default:
                                {
                                    return value;
                                }
                            }
                        }
                    }
                ]
            ],
            onLoadSuccess: function(dataSuccess) {
                if(dataSuccess.rows[3].value == '优惠券') {
                    status = true;
                    addNewRow(data.actionId, currentAwardCount);
                }
                $(".datagrid-group-title").each(function(i, ele) {

                    if(!$(ele).attr("iconAddRemove")) {
                        $(ele).attr("iconAddRemove", 'y');
                        $(ele).parents("table").attr("width", "100%");
                        $(ele).parents("td").attr("align", "left");

                        if(i == 0) {
                            $($(ele).parents("tr")[0]).append("<td style='border:0;padding-right:10px;' align='right'><img style='cursor:hand;' onclick='addAwardModel();' src='/cmc/common/js/jquery-easyui-1.4.2/themes/icons/edit_add.png' /></td>");
                        } else {
                            $($(ele).parents("tr")[0]).append("<td style='border:0;padding-right:10px;' align='right'><img style='cursor:hand;padding-right:10px;' onclick='addAwardModel();' src='/cmc/common/js/jquery-easyui-1.4.2/themes/icons/edit_add.png' /><img style='cursor:hand' onclick='deleteAwardModel(this);' src='/cmc/common/js/jquery-easyui-1.4.2/themes/icons/edit_remove.png'/></td>");
                        }
                    }
                });
            }
        });
        $('#' + createAwardLevelId).propertygrid('loadData', model);
    } else {
        CMC.alertMessage("最多只能创建10个奖品种数！", 'info');
    }
}

function deleteAwardModel(dom){
   /* if ($(dom).parents(".propertygrid").parents("td").siblings("td").length==0) {
        $(dom).parents(".propertygrid").parents("tr").remove();
    }else{
        $(dom).parents(".propertygrid").parents("td").remove();
    }*/
	$(dom).parents(".propertygrid").remove();
}

function getChangesList(isGetChanges){
	
	var awards = [];//奖品数组
	var length = $("#awards").children().length;
	var awardNum = 0;
	for ( var i = 0; i < 10; i++) {
		awardNum = i + 1;
		if($("#award_" + awardNum).attr("id")) {
			var rows = "";
			
			/*if(isGetChanges){
				rows = $('#award_' + awardNum).propertygrid('getChanges');
			}else{
				var objData = $('#award_' + awardNum).propertygrid('getData');
				rows = objData.rows;
			}*/

			var temp = [];
			var rowCount;
                var objData = $('#award_' + awardNum).propertygrid('getData');
                rows = objData.rows;
                rowCount=rows.length;
                for (var j = 0; j < rowCount; j++) {
                    if (j == 0) {
                        temp.push('{"' + rows[j].field + '":"' + rows[j].value + '"');
                    } else {
                        temp.push(',"' + rows[j].field + '":"' + rows[j].value + '"');
                    }
                    if (j == rowCount - 1) {
                        if (LuckyDrawMnt.updateDetailAwards[i]) {
                            temp.push(',"prizesId":"' + LuckyDrawMnt.updateDetailAwards[i].prizesId + '"');
                            temp.push(',"prizesTitle":"' + LuckyDrawMnt.updateDetailAwards[i].prizesTitle + '"');
                        }
                        temp.push('}');
                    }
                }
			awards.push(temp.join(""));
		}
	}
	return awards;
}

/*function getChanges(){
	
	var length = $("#awards").children().length;
	var txtModify = "";
	var notUpdate =  true;
	for ( var i = 1; i <= 10; i++) {
		if($("#award_" + i).attr("id")) {
			var rows = $('#award_'+i).propertygrid('getChanges');
			var rowCount = rows.length;
			if(rowCount > 0){
				txtModify += "<div style='font-weight:bold;'>"+LuckyDrawMnt.awardLevelMap[i]+"</div>";
				for(var j=0; j< rowCount; j++){
					txtModify += rows[j].name + ':' + rows[j].value + '<br/>';
				}
				txtModify +="<br/><br/>";
				notUpdate = false;
			}
		}
	}
	if(notUpdate){
		CMC.alertMessage("没有修改项！",'info');
		return;
	}
	var winTopLeft = CMC.getWindowTopLeft("winCompare");
	$('#winCompare').window({
		top:winTopLeft.winTop,
		left:winTopLeft.winLeft
	});
	$("#pnlCompare").empty();
	$("#pnlCompare").append("<div>"+txtModify+"</div>");
	$('#winCompare').window('open');
}
*/
function jsonYearMonthDay(milliseconds) {
    var datetime = new Date();
    datetime.setTime(milliseconds);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0"
            + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate()
            : datetime.getDate();
    return year + "-" + month + "-" + date;
}

function add0(m){return m<10?'0'+m:m }

function format(shijianchuo){
	//shijianchuo是整数，否则要parseInt转换
	var time = new Date(shijianchuo);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}

function format2(shijianchuo){
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d);
}


//模拟数据
var comboxData = [{
    "value": "1",
    "text": "活动1"
}, {
    "value": "2",
    "text": "活动2"
}];

//

//添加新行
function addNewRow(dom, index) {
    var rows=$('#award_' + (index+1)).propertygrid('getRows');
    if (rows.length<8) {

        var newRow = {
            "group": LuckyDrawMnt.awardLevelMap[index + 1],
            "name": "优惠券活动:",
            "value": dom == undefined ? "" : dom,
            "field": "actionId",
            'awardNo': (index + 1),
            "editor": {
                type: 'textbox', options: {
                    required: false,
                    buttonText: '选择',
                    onClickButton: function () {
                        openActivedIdModel(this);
                        // doUserSearch();
                    }
                }
            }
        };
        $("#award_" + (index + 1)).propertygrid('insertRow', {
            index: 4,
            row: newRow
        });
    }
}

//删除活动行
function removeNewRow(index) {
    $("#award_" + (index + 1)).propertygrid('deleteRow', 4);
}

function openActivedIdModel(){
    if(!window.frames["panelSelectActivie"]) {
        $('#activiedModel').show().dialog({
            title: "选择营销活动",
            closed: true,
            cache: true,
            width: 560,
            height: 550,
            minimizable: true,
            maximizable: true,
            collapsible: true,
            content: '<iframe id="panelSelectActivie" name="panelSelectActivie" src="/cmc/module/marketingActivity/marketingActivitySelectPanel.html" frameborder=0 height=100% width=100% scrolling=no></iframe>',
        });

        var winTopLeft = CMC.getWindowTopLeft("activiedModel");
         $('#activiedModel').window({
         top:winTopLeft.winTop,
         left:winTopLeft.winLeft
         });
    }
    $("#activiedModel").show().dialog("open");

    window.frames["panelSelectActivie"].openIframeId="activiedModel";
}

