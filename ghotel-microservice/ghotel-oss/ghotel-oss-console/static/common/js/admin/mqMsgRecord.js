var MqMsgRecord = {
	searchTableRequired: true, 
	singleSelect : true,
	columns :  [[
	             	{field: 'msg', title:'消息体' , width: '10%' , align: 'center'},
	             	{field: 'updateTime', title:'上次失败时间' , width: '10%' , align: 'center',
	             		formatter:function(value,row,index){
	             			return new Date(value).format("yyyy-MM-dd");
	             		}
	             	},
	             	{field: 'createTime', title:'创建时间' , width: '10%' , align: 'center',
	             		formatter:function(value,row,index){
	             			return new Date(value).format("yyyy-MM-dd");
	             		}
	             	},
	             	{field: 'num', title:'重试次数' , width: '5%' , align: 'center'},
	             	{field: 'errorMsg', title:'失败信息' , width: '50%' , align: 'center'},
					{field: 'msgId', title:'Id' , width: '10%' , align: 'center'},
					{field: 'topic', title:'消息topic' , width: '10%' , align: 'center'},
					{field: 'className', title:'失败类' , width: '10%' , align: 'center'},
					{field: 'status', title:'状态' , width: '5%' , align: 'center',
						formatter:function(value,row,index){
							var str = "";
							if(value=="0"){
								str = "未处理";
							}else if(value=="1"){
								str = "处理中";
							}else if(value=="2"){
								str = "处理完成";
							}else if(value=="-1"){
								str = "处理失败";
							}
							return str;
						}
					}
				]],
	menuId: 'MqMsgRecord',
	searchUrl : 'authorized/mqMsgRecord/getAll',
	getUrl : 'authorized/mqMsgRecord/get/',
	updateUrl : 'authorized/mqMsgRecord/update'
};

(function($){
	
	MqMsgRecord.clearForm = function(id) {
		$('#'+id).form('clear');
	};
	
	MqMsgRecord.get = function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条系统消息！",'warning');
			return;
		}
		CMC.request({
			url: MqMsgRecord.getUrl+record.msgId,
			method: 'POST',
			success: function(result){
				$("#topic").html(result.messageBody.topic);
				$("#num").html(result.messageBody.num);
				var str = "";
				if(result.messageBody.status=="0"){
					str = "未处理";
				}else if(result.messageBody.status=="1"){
					str = "处理中";
				}else if(result.messageBody.status=="2"){
					str = "处理完成";
				}else if(result.messageBody.status=="-1"){
					str = "处理失败";
				}
				$("#status").html(str);
				$("#className").html(result.messageBody.className);
				$("#errorMsg").html(result.messageBody.errorMsg);
				$("#msg").html(result.messageBody.msg);
				CMC.dialog("viewDetail","open");
			}
		});
	}
	
	MqMsgRecord.beforeUpdate=function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条系统消息！",'warning');
			return;
		}
		CMC.request({
			url: MqMsgRecord.getUrl+record.msgId,
			method: 'POST',
			success: function(result){
				$("#updateForm").form("load",{
					'msgId' : result.messageBody.msgId,
					'num' : result.messageBody.num,
					'status' : result.messageBody.status,
					'msg':result.messageBody.msg
				});
				CMC.dialog("updateDetail","open");
			}
		});
	}
	
	MqMsgRecord.submitUpdateForm=function(){
		CMC.request({
			url: MqMsgRecord.updateUrl,
			method: 'POST',
			data : $("#updateForm").form().serialize(),
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
				CMC.search();
				CMC.dialog("updateDetail","close");
			}
		});
	}
	
})(jQuery);


$(document).ready(function(){
	CMC.init(MqMsgRecord);
});

