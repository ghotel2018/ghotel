/**
 * @Date 2016-06-16
 * @Desc首购有礼-推广渠道设置
 */

var PopularizingChannelsSetting =  {
		searchTableRequired: true,
		menuId: "PopularizingChannelsSetting",
		searchUrl: "authorized/popularizingChannelsSetting/getAll" ,
		addUrl:'authorized/popularizingChannelsSetting/addPopularizingChannelsSetting',
		getUrl: "authorized/popularizingChannelsSetting/getPopularizingChannelsSettingId",
		updateUrl: 'authorized/popularizingChannelsSetting/updatePopularizingChannelsSetting',
		deleteUrl: "authorized/popularizingChannelsSetting/deletePopularizingChannelsSetting",
		importExcelUrl:"authorized/popularizingChannelsSetting/importExcelPopularizingChannelsSetting",
		exportExcelUrl:"authorized/popularizingChannelsSetting/exportExcelPopularizingChannelsSetting",
		groupId : '',
		columns :  [[
			{field: 'code', title:'推广渠道代码' , width: '20%' , align: 'center'},
			{field: 'name', title:'渠道名称' , width: '30%' , align: 'center'},
			{field: 'remarks', title:'备注' , width: '45%' , align: 'center'},
		]]
	};	
(function($){

	/**
	 * 重置
	 */
	$("#popularizingChannelsSetting_reset").click(function(){
		var start = $("#searchForm input[name='start']:hidden").val();
		var end = $("#searchForm input[name='end']:hidden").val();
		var ruleId = $("#ruleId").val();
		$('#searchForm').form('clear');
		$('#searchForm').form('clear');
		$("#ruleId").val(ruleId);
		$("#searchForm input[name='start']:hidden").val(start);
		$("#searchForm input[name='end']:hidden").val(end);
		CMC.search();
	});

	//弹出添加窗口
	$("#popularizingChannelsSetting_add").click(function(){
		$("#addPopularizingChannelsSettingForm").form("clear");
		$("#add_inUsedInd").prop("checked","checked");
		$("#addPopularizingChannelsSettingForm").form("disableValidation");
		CMC.dialog('addPopularizingChannelsSettingDetail','open');
	});
	
	//更新信息并弹出窗口
	$("#popularizingChannelsSetting_update").click(function(){
		$("#updatePopularizingChannelsSettingForm").form("disableValidation");
		$("#updatePopularizingChannelsSettingForm").form("clear");
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		CMC.request({
			url: PopularizingChannelsSetting.getUrl +"/"+ record["code"],
			method: 'post',
			data:record,
			success: function(result){
				$("#updatePopularizingChannelsSettingForm").form("load",{
					'code' : result.messageBody['code'],
					'name' : result.messageBody['name'],
					'remarks' : result.messageBody['remarks'],
				//'buyingLimitedDays' : result.messageBody['buyingLimitedDays'],
				});
				CMC.dialog('updatPopularizingChannelsSettingDetail','open');
			}
		});
	});
	//提交新增信息
	$('.AddButton').click(function(){
		$("#addPopularizingChannelsSettingForm").form("enableValidation");
		var isValid = $("#addPopularizingChannelsSettingForm").form("validate");
		var code = $("#addPopularizingChannelsSettingForm input[name='code']").val();
		var reg = /^\w+$/;
		if(!reg.test(code)){
			alert("请输入推广渠道代码，限定字母、数字或下划线的组合");
			$("#code").val("");
			return false;
		}
		if(isValid){
			CMC.request({
				url: PopularizingChannelsSetting.addUrl,
				method: 'POST',
				data : $("#addPopularizingChannelsSettingForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('addPopularizingChannelsSettingDetail','close');
					$("#addPopularizingChannelsSettingForm").form("clear");
				}
			});
		}
	});
	
	
	//更新信息
	$('.UpdateButton').click(function(){
		$("#updatePopularizingChannelsSettingForm").form("enableValidation");
		var isValid = $("#updatePopularizingChannelsSettingForm").form("validate");
		var code = $("#updatePopularizingChannelsSettingForm input[name='code']").val();
		var reg = /^\w+$/;
		if(!reg.test(code)){
			alert("请输入推广渠道代码，限定字母、数字或下划线的组合");
			$("#code").val("");
			return false;
		}
		if(isValid){
			CMC.request({
				url: PopularizingChannelsSetting.updateUrl,
				method: 'POST',
				data : $("#updatePopularizingChannelsSettingForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.dialog('updatPopularizingChannelsSettingDetail','close');
					CMC.search();
					$("#updatePopularizingChannelsSettingForm").form("clear");
				}
			});
		}
	});
	
	//删除记录	
	$("#popularizingChannelsSetting_delete").click(function (){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
			
		}
		  CMC.confirm("确定删除保险信息?", function(r){
			  if(r){
				  CMC.request({
						url: PopularizingChannelsSetting.deleteUrl  ,
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
	

	$("#popularizingChannelsSetting_exportExcel").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		/*if(!record){
			CMC.alertMessage("请选择一条营销活动记录!", '提示');
			return;
		}
		var ruleId = record['id'];*/
		CMC.request({
			url: PopularizingChannelsSetting.exportExcelUrl,
			method: 'POST',
			data : $('#searchForm').form().serialize(),
			success: function(response){
				CMC.alertMessage(response.messageBody,'info');
				CMC.search();
			},
			error: function(){
				CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
			}
		});
	});
	
	//打开导入窗口
	 $("#popularizingChannelsSettingList_import").linkbutton({'onClick':function(){
		$("#popularizingChannelsSettingListImportForm").form('clear');
		CMC.dialog('popularizingChannelsSettingListImportDetail','open');
	}});

	/*上传*/
	$("#popularizingChannelsSettingListInfo_import").linkbutton({'onClick':function(){
 		var val=$("#popularizingChannelsSettingListInfo").val();
		if(val==""){
			CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
			return;
		}
		//判断文件后缀
		var fileUrl=$("#popularizingChannelsSettingListInfo").val();
		if(fileUrl && fileUrl != "" && (fileUrl.indexOf("xls")==-1 && 
				fileUrl.indexOf("xlsx")==-1 && fileUrl.indexOf("csv")==-1) ){
			CMC.alertMessage("请选择excel文件。",'warn');
			return ;
		}
		CMC.confirm("是否确认导入文件?",function(r){
			if(r){
				console.log(PopularizingChannelsSetting.importExcelUrl);
				CMC.showProcessBox();
				CMC.fileUpload({
					url: PopularizingChannelsSetting.importExcelUrl,
					type: "POST",
					dataType: "json",
					fileElementId:"popularizingChannelsSettingListInfoFile",
				    data: $("#popularizingChannelsSettingListImportForm").form().serialize(),
				    asyc: true,
				    timeout: 600000,
					success: function(response){
						try{
							CMC.hideProcessBox();
							CMC.alertMessage(response.messageBody, 'info',CMC.search());
						}catch(e){
							console.log(e);
						}
					},
					error: function(){
						try{
							CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
							 CMC.hideProcessBox();
						}catch(e){console.log(e);}
					},
					complete: function(){
						try{
							CMC.hideProcessBox();
						}catch(e){console.log(e);}
					}
				});
			}
		});
	}});

	$("#popularizingChannelsSettingLink_Template").click(function(event) {
		window.open(encodeURI("/cmc/download/popularizingChannelsSettingListTemplate.xlsx"));
	});
	
	//初始化下拉框
	PopularizingChannelsSetting.init = function(){
		//$("#addForm").form("enableValidation");
	};
	
})(jQuery);

$(document).ready(function(){
	CMC.init(PopularizingChannelsSetting);	
});







