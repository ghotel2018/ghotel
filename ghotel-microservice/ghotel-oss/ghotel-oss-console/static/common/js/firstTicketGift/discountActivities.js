/**
 * @Date 2016-06-16
 * @Desc首购有礼-推广渠道设置
 */

var DiscountActivities =  {
		searchTableRequired: true,
		menuId: "DiscountActivitiesSetting",
		searchUrl: "authorized/discountActivitiesSetting/getAll" ,
		addUrl:'authorized/discountActivitiesSetting/addDiscountActivities',
		getUrl: "authorized/discountActivitiesSetting/getDiscountActivitiesId",
		updateUrl: 'authorized/discountActivitiesSetting/updateDiscountActivities',
		deleteUrl: "authorized/discountActivitiesSetting/deleteDiscountActivities",
		importExcelUrl:"authorized/discountActivitiesSetting/importExcelDiscountActivities",
		exportExcelUrl:"authorized/discountActivitiesSetting/exportExcelDiscountActivities",
		groupId : '',
		columns :  [[
			{field: 'type', title:'活动类型' , width: '20%' , align: 'center'},
			{field: 'activityName', title:'活动名称' , width: '30%' , align: 'center'},
			{field: 'remarks', title:'备注' , width: '45%' , align: 'center'},
		]]
	};	
(function($){

	/**
	 * 重置
	 */
	$("#discountActivities_reset").click(function(){
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
	$("#discountActivities_add").click(function(){
		$("#addDiscountActivitiesForm").form("clear");
		$("#add_inUsedInd").prop("checked","checked");
		$("#addDiscountActivitiesForm").form("disableValidation");
		CMC.dialog('addDiscountActivitiesDetail','open');
	});
	
	//更新信息并弹出窗口
	$("#discountActivities_update").click(function(){
		$("#updateDiscountActivitiesForm").form("disableValidation");
		$("#updateDiscountActivitiesForm").form("clear");
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		CMC.request({
			url: DiscountActivities.getUrl +"/"+ record["type"],
			method: 'post',
			data:record,
			success: function(result){
				$("#updateDiscountActivitiesForm").form("load",{
					'type' : result.messageBody['type'],
					'activityName' : result.messageBody['activityName'],
					'remarks' : result.messageBody['remarks'],
				});
				CMC.dialog('updatDiscountActivitiesDetail','open');
			}
		});
	});
	//提交新增信息
	$('.AddButton').click(function(){
		$("#addDiscountActivitiesForm").form("enableValidation");
		var isValid = $("#addDiscountActivitiesForm").form("validate");
		var code = $("#addDiscountActivitiesForm input[name='type']").val();
		var reg = /^\w+$/;
		if(!reg.test(code)){
			alert("请输入推广渠道代码，限定字母、数字或下划线的组合");
			$("#code").val("");
			return false;
		}
		if(isValid){
			CMC.request({
				url: DiscountActivities.addUrl,
				method: 'POST',
				data : $("#addDiscountActivitiesForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('addDiscountActivitiesDetail','close');
					$("#addDiscountActivitiesForm").form("clear");
				}
			});
		}
	});
	
	
	//更新信息
	$('.UpdateButton').click(function(){
		$("#updateDiscountActivitiesForm").form("enableValidation");
		var isValid = $("#updateDiscountActivitiesForm").form("validate");
		var code = $("#updateDiscountActivitiesForm input[name='type']").val();
		var reg = /^\w+$/;
		if(!reg.test(code)){
			alert("请输入推广渠道代码，限定字母、数字或下划线的组合");
			$("#type").val("");
			return false;
		}
		if(isValid){
			CMC.request({
				url: DiscountActivities.updateUrl,
				method: 'POST',
				data : $("#updateDiscountActivitiesForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.dialog('updatDiscountActivitiesDetail','close');
					CMC.search();
					$("#updateDiscountActivitiesForm").form("clear");
				}
			});
		}
	});
	
	//删除记录	
	$("#discountActivities_delete").click(function (){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
			
		}
		  CMC.confirm("确定删除保险信息?", function(r){
			  if(r){
				  CMC.request({
						url: DiscountActivities.deleteUrl  ,
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
	

	$("#discountActivities_exportExcel").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		/*if(!record){
			CMC.alertMessage("请选择一条营销活动记录!", '提示');
			return;
		}
		var ruleId = record['id'];*/
		CMC.request({
			url: DiscountActivities.exportExcelUrl,
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
	 $("#discountActivitiesList_import").linkbutton({'onClick':function(){
		$("#discountActivitiesListImportForm").form('clear');
		CMC.dialog('discountActivitiesListImportDetail','open');
	}});

	/*上传*/
	$("#discountActivitiesListInfo_import").linkbutton({'onClick':function(){
 		var val=$("#discountActivitiesListInfo").val();
		if(val==""){
			CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
			return;
		}
		//判断文件后缀
		var fileUrl=$("#discountActivitiesListInfo").val();
		if(fileUrl && fileUrl != "" && (fileUrl.indexOf("xls")==-1 && 
				fileUrl.indexOf("xlsx")==-1 && fileUrl.indexOf("csv")==-1) ){
			CMC.alertMessage("请选择excel文件。",'warn');
			return ;
		}
		CMC.confirm("是否确认导入文件?",function(r){
			if(r){
				CMC.showProcessBox();
				CMC.fileUpload({
					url: DiscountActivities.importExcelUrl,
					method:"POST",
					dataType: "json",
					fileElementId:"discountActivitiesListInfoFile",
				    data: $("#discountActivitiesListImportForm").form().serialize(),
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

	$("#discountActivitiesLink_Template").click(function(event) {
		window.open(encodeURI("/cmc/download/discountActivitiesListTemplate.xlsx"));
	});
	
	//初始化下拉框
	DiscountActivities.init = function(){
		//$("#addForm").form("enableValidation");
	};
	
})(jQuery);

$(document).ready(function(){
	CMC.init(DiscountActivities);	
});







