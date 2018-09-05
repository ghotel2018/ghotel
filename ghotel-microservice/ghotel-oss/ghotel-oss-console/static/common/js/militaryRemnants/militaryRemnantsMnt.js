/**
 * 军警残名单数据导入/导出
 */



(function($){
	
	$('#exportMilitaryRemnants').click(function(){
		
		var begin=$("#begin").datebox('getValue');
		var end=$("#end").datebox('getValue');
		if(begin!=""&&end!=""){
			if(begin >= end){
				CMC.alertMessage("开始日期不能大于等于结束日期！",'warn');
				return;
			}
		}else{
			CMC.alertMessage("请选择时间筛选!",'warn');
			return;
		}
		
		CMC.request({
			url: "authorized/militaryRemnants/export",
			method: 'POST',
			data : $("#militaryRemnantsForm").form().serialize(),
			success: function(message){
				CMC.alertMessage("导出请求完成,请移步首页并查看报表记录下载文件！", 'info');
			}
		});
	});
	
	$("#importMilitaryRemnants").click(function(){
		$("#importForm")[0].reset();
		$("#importDiv").dialog('open');
	});
	
	$('#importBtn').click(function(){
		var formElementId = "import_file";
		var message = $("#import").val();
		if(message=="" || message.indexOf(".")==-1){
			CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
			return;
		}
		if(message.indexOf(".")>0 && message.indexOf("xls")==-1 && message.indexOf("xlsx")==-1){
			CMC.alertMessage("请选择excel格式的文件。",'warn');
			return ;
		}
		CMC.fileUpload({
			url: "authorized/militaryRemnants/import",
			method: "POST",
			dataType: "json",
			fileElementId:  formElementId,
			data:{"message":message},
			success: function(response){
				CMC.alertMessage("导入成功", 'info');
				CMC.dialog('importDiv','close');
			},
			error: function(){
				CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
			}
		});
	});
	
})(jQuery);

