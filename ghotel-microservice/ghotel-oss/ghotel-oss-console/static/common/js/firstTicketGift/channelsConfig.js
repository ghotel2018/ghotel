/**
 * @Date 2016-06-16
 * @Desc首购有礼-移动各渠道活动
 */

var ChannelsConfig =  {
		searchTableRequired: true,
		menuId: "ChannelsConfig",
		searchUrl: "authorized/channelsConfig/getAll" ,
		addUrl:'authorized/channelsConfig/addChannelsConfig',
		getUrl: "authorized/channelsConfig/getChannelsConfigId/",
		updateUrl: 'authorized/channelsConfig/updateChannelsConfig',
		deleteUrl: "authorized/channelsConfig/deleteChannelsConfig",
		getTicketListUrl: "/authorized/ticketList/getListForType",
		getActivityTypeUrl: "authorized/discountActivitiesSetting/getListAll",
		getChannelCodeUrl: "authorized/popularizingChannelsSetting/getListAll",
		importExcelUrl:"authorized/channelsConfig/importExcelChannelsConfig",
		exportExcelUrl:"authorized/channelsConfig/exportExcelChannelsConfig",
		groupId : '',
		columns :  [[
		    {field: 'id', title:'ID标识' , width: '10%' , align: 'center'},
			{field: 'activityNmae', title:'活动类型' , width: '15%' , align: 'center'},
			{field: 'name', title:'渠道名称' , width: '15%' , align: 'center'},
			{field: 'activityId', title:'活动名称' , width: '15%' , align: 'center'},
			{field: 'effectiveStart', title:'开始时间' , width: '20%' , align: 'center'},
			{field: 'effectiveEnd', title:'结束时间' , width: '20%%' , align: 'center'},
		]]
	};	
(function($){

	/**
	 * 重置
	 */
	$("#channelsConfig_reset").click(function(){
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
	$("#channelsConfig_add").click(function(){
		$("#addChannelsConfigForm").form("clear");
		$("#add_inUsedInd").prop("checked","checked");
		$("#addChannelsConfigForm").form("disableValidation");
		CMC.dialog('addChannelsConfigDetail','open');
		/*CMC.request({
	        url : ChannelsConfig.getActivityTypeUrl,
	        method: 'GET',
	        success: function(message){
	            $("#activityType_add").combobox({
	                data: message.messageBody,
	                panelHeight: '180px',
	                valueField:'type',
	                textField:'activityName'
	            });
	            
	    }});
		CMC.request({
	        url : ChannelsConfig.getChannelCodeUrl,
	        method: 'GET',
	        success: function(message){
	            $("#channelCode_add").combobox({
	                data: message.messageBody,
	                panelHeight: '180px',
	                valueField:'code',
	                textField:'name'
	            });
	    }});*/
	});
	
	//更新信息并弹出窗口
	$("#channelsConfig_update").click(function(){
		$("#updateChannelsConfigForm").form("disableValidation");
		$("#updateChannelsConfigForm").form("clear");
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		getTicketHTML(record["type"],true,"ticketList_edit");
		CMC.request({
			url: ChannelsConfig.getUrl + record["id"],
			method: 'GET',
			data: record,
			success: function(result){
				var bean = result.messageBody;
				CMC.dialog('updatChannelsConfigDetail','open');
				var ticketHistory = bean['ticketHistory'];
				if(ticketHistory != null){
					var ticketArr = ticketHistory.split(",");
					for(var i=0;i<ticketArr.length;i++){
						$("checkbox[value='"+ticketArr[i]+"']").attr("checked",true);
					}
				}
				$("#updateChannelsConfigForm").form("load",{
					'id' : bean['id'],
					'type' : bean['type'],
					'channelCode' : bean['channelCode'],
					'activityId' : bean['activityId'],
					'effectiveStart' : bean['effectiveStart'],
					'effectiveEnd' : bean['effectiveEnd'],
					'ticketHistory':bean['ticketHistory']
				});
			}
		});
	});
	//提交新增信息
	$('.AddButton').click(function(){
		$("#addChannelsConfigForm").form("enableValidation");
		var isValid = $("#addChannelsConfigForm").form("validate");
		var code = $("#addChannelsConfigForm input[name='type']").val();
		var id = $("#addChannelsConfigForm input[name='id']").val();
		var reg = /^\w+$/;
		if(!reg.test(code)){
			alert("请输入推广渠道代码，限定字母、数字或下划线的组合");
			$("#code").val("");
			return false;
		}
		
		if($("input[name='ticketHistory']:checked").length < 1)
	    {
			alert("请选择最近购票记录！");
			return false;
	    }
		if(isValid){
			CMC.request({
				url: ChannelsConfig.addUrl,
				method: 'POST',
				data : $("#addChannelsConfigForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('addChannelsConfigDetail','close');
					$("#addChannelsConfigForm").form("clear");
				}
			});
		}
	});
	
	
	//更新信息
	$('.UpdateButton').click(function(){
		$("#updateChannelsConfigForm").form("enableValidation");
		var isValid = $("#updateChannelsConfigForm").form("validate");
		var type = $("#updateChannelsConfigForm input[name='type']").val();
		var reg = /^\w+$/;
		if(!reg.test(type)){
			alert("请输入推广渠道代码，限定字母、数字或下划线的组合");
			$("#type").val("");
			return false;
		}
		if(isValid){
			CMC.request({
				url: ChannelsConfig.updateUrl,
				method: 'POST',
				data : $("#updateChannelsConfigForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.dialog('updatChannelsConfigDetail','close');
					CMC.search();
					$("#updateChannelsConfigForm").form("clear");
				}
			});
		}
	});

	//删除记录	
	$("#channelsConfig_delete").click(function (){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		CMC.confirm("确定删除保险信息?", function(r){
			if(r){
				CMC.request({
					url: ChannelsConfig.deleteUrl  ,
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

	$("#activityType_add").combobox({
		onChange: function (newValue,oldValue){
			getTicketHTML(newValue,true,"ticketList");
		}
	})

	function getTicketHTML(type,tip,ticketList){
		$("#"+ticketList).empty();
		CMC.request({
			url: ChannelsConfig.getTicketListUrl,
			method: 'POST',
			data : {activityType:type},
			success: function(response){
				console.log(response.messageBody);
				typeTicketHistory = response.messageBody;
				//活动类型改变时，最近购票记录改变
				if(typeTicketHistory.length > 0){
					var htmlTicketList = "";
					$.each(typeTicketHistory, function(i,item){
						htmlTicketList +="&nbsp;<input type='checkbox' name='ticketHistory'  value='"+item['code']+"' />"+item['listLabel'];
					})
					$("#"+ticketList).append(htmlTicketList);
				}else{
					if(tip==true){
						$.messager.alert('提醒','该活动类型的“最近购票记录”为空！');
					}
					return;
				}
			},
			error : function(response) {
				console.log(response);
				if(tip==true){
					$.messager.alert('提醒','获取“最近购票记录”失败');
				}
				return;
			}
		})
	}

	/**
	 * 导出excel
	 */
	$("#channelsConfig_exportExcel").click(function(){
		CMC.request({
			url: ChannelsConfig.exportExcelUrl,
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
	 $("#channelsConfig_importExcel").linkbutton({'onClick':function(){
		$("#channelsConfigListImportForm").form('clear');
		CMC.dialog('channelsConfigListImportDetail','open');
	}});

	/*上传*/
	$("#channelsConfigListInfo_import").linkbutton({'onClick':function(){
 		var val=$("#channelsConfigListInfo").val();
		if(val==""){
			CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
			return;
		}
		//判断文件后缀
		var fileUrl=$("#channelsConfigListInfo").val();
		if(fileUrl && fileUrl != "" && (fileUrl.indexOf("xls")==-1 && 
				fileUrl.indexOf("xlsx")==-1 && fileUrl.indexOf("csv")==-1) ){
			CMC.alertMessage("请选择excel文件。",'warn');
			return ;
		}
		CMC.confirm("是否确认导入文件?",function(r){
			if(r){
				CMC.showProcessBox();
				CMC.fileUpload({
					url: ChannelsConfig.importExcelUrl,
					method:"POST",
					dataType: "json",
					fileElementId:"channelsConfigListInfoFile",
				    data: $("#channelsConfigListImportForm").form().serialize(),
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

	$("#channelsConfigLink_Template").click(function(event) {
		window.open(encodeURI("/cmc/download/ChannelsConfigTemplate.xlsx"));
	});

	//初始化下拉框
	ChannelsConfig.init = function(){
		CMC.request({
	        url : ChannelsConfig.getActivityTypeUrl,
	        method: 'GET',
	        success: function(message){
	        	$("#activityType_add").combobox({
	        		data: message.messageBody,
	        		panelHeight: '180px',
	        		valueField:'type',
	        		textField:'activityName'
	        	});
	        	$("#activityType_edit").combobox({
	        		data: message.messageBody,
	        		panelHeight: '180px',
	        		valueField:'type',
	        		textField:'activityName'
	        	});
	            $("#activityType").combobox({
	                data: message.messageBody,
	                panelHeight: '180px',
	                valueField:'type',
	                textField:'activityName'
	            });
	    }});
		CMC.request({
			url : ChannelsConfig.getChannelCodeUrl,
			method: 'GET',
			success: function(message){
				$("#channelCode_add").combobox({
					data: message.messageBody,
					panelHeight: '180px',
					valueField:'code',
					textField:'name'
				});
				$("#channelCode_edit").combobox({
					data: message.messageBody,
					panelHeight: '180px',
					valueField:'code',
					textField:'name'
				});
				$("#channelCode").combobox({
					data: message.messageBody,
					panelHeight: '180px',
					valueField:'code',
					textField:'name'
				});
			}
		});
	};
})(jQuery);

$(document).ready(function(){
	CMC.init(ChannelsConfig);	
});







