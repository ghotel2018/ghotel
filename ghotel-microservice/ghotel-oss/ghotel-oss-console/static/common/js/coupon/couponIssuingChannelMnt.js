
var CouponIssuingChannel = {
		searchTableRequired: true, 
		menuId : 'CouponIssueChannel',
		searchUrl: "authorized/couponIssuingChannel/getAll" , //如果searchTableRequired 是 true 必填
		addUrl: "authorized/couponIssuingChannel/add" , 
		updateUrl:"authorized/couponIssuingChannel/update",
		deleteUrl: "authorized/couponIssuingChannel/delete" , 
		distributionchannelReportUrl:"authorized/couponIssuingChannel/distributionchannelReport",
		exportedData:null,
		columns :  [[
			           {field: 'channelId', title:'channelId' , width: '10%' , align: 'center',hidden:"true"},
			           {field: 'code', title:'渠道编号' , width: '10%' , align: 'center'},
			           {field: 'name', title:'渠道名' , width: '15%' , align: 'center'},
			           {field: 'createby', title:'创建人' , width: '10%' , align: 'center'},
			           {field: 'createtime', title:'创建时间' , width: '15%' , align: 'center'},
			           {field: 'status', 
			        	   title:'状态' , 
			        	   width: '10%' , 
			        	   align: 'center',
			        	   formatter: function(value,row,index){
								if (value==1){
									return "<lable style='color:red;'>删除</label>";
								} else {
									return "<lable style='color:green;'>正常</label>";
								}
							}
			           },
			           {field: 'deleteby', title:'删除人' , width: '10%' , align: 'center'},
			           {field: 'deletetime', title:'删除时间' , width: '15%' , align: 'center'}
		           ]]
};

(function($){
	
	$("#clearCondition").click(function(){
//		$('#CouponIssuingChannelsearchForm').form('clear');
//		$("input[name='start']:hidden").val("1");
//		$("input[name='end']:hidden").val("10");
		
		var start= $("#CouponIssuingChannelsearchForm input[name='start']:hidden").val();
		var end=$("#CouponIssuingChannelsearchForm input[name='end']:hidden").val();
		$('#CouponIssuingChannelsearchForm').form('clear');
		$("#CouponIssuingChannelsearchForm input[name='start']:hidden").val(start);
		$("#CouponIssuingChannelsearchForm input[name='end']:hidden").val(end);
		CMC.search();
	});
	
	
	$("#exportIssuingChannel").click(function(){
		
		/*$("#searchFormReport input.validatebox-text").each(function(i,dom){
			$(this).validatebox('enableValidation');
			$(this).validatebox('validate');
		});
		if(!$("#searchFormReport").form('validate')){
			return;
		}*/
		
		var id = $("#id").val();//
		var createBy = $("#createBy").val();
		var channelName = $("#channelName").val();
		var deleteBy = $("#deleteBy").val();
		var statusReport = $("#status").combobox('getValue');//状态
		/*var createTimeBegin = $("#createTimeBegin").datebox('getValue');
		var createTimeEnd = $("#createTimeEnd").datebox('getValue');
		var deleteTimeBegin = $("#deleteTimeBegin").datebox('getValue');
		var deleteTimeEnd = $("#deleteTimeEnd").datebox('getValue');*/
		
        CMC.fileUpload({
			url: CouponIssuingChannel.distributionchannelReportUrl,
			method: "POST",
			dataType: "json",
			data:{
				'id':id,
            	'createBy':createBy,
            	'channelName':channelName,/*
                'createTimeBegin':createTimeBegin,
                'createTimeEnd':createTimeEnd,
                'deleteTimeBegin':deleteTimeBegin,
                'deleteTimeEnd':deleteTimeEnd,*/
                'deleteBy':deleteBy,
                'status':status
			},
			success: function(response){
		  		CMC.alertMessage("导出获取报表异步请求成功,请移步首页并查看报表记录下载文件！", 'info');
		  		/*CMC.dialog('distributionChannelReport','close');*/
		  	},
		  	error: function(){
		  		CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
		  	}
		});
	});
	
	
	$('#showAddForm').click(function(){
		$('#addChannelForm').form('disableValidation');
		$('#addChannelForm').form('reset');
/* 		$("#channelId").textbox('disableValidation');
		$("#channelName").textbox('disableValidation'); */
		CMC.dialog('addChannelDialog','open');
		
	});
	
	$('#addChannel').click(function(){
		var channelName = $("#name").textbox('getValue');
		$('#addChannelForm').form('enableValidation');
		$("#status").val(1);
		if($('#addChannelForm').form('validate')){
			//CMC.confirm("确认增加渠道:["+channelName+"]?" , function(r){
				
			//		if(r){
							CMC.request({
								method: "POST",
								url: CouponIssuingChannel.addUrl,
								data: $('#addChannelForm').form().serialize(),
							  	success: function(result){
							  		CMC.alertMessage(result.messageBody, 'info',CMC.search);
							  		CMC.dialog('addChannelDialog','close');
							  	}
							});
				//	}
				
				//});
		}
	});
	$('#updateRecord').click(function(){
		//alert(11);
		$('#updateChannelForm').form('reset');
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请选择要修改的记录！",'warn');
			return;
		}
		CMC.dialog('updateChannelDialog','open');
		console.log(record);
		console.log(record["code"]);
		console.log(record["name"]);
		console.log(record["channelId"]);
		$("#updateChannelForm").form("load",{
			'id' : record["channelId"],
			'code' : record["code"],
			'name' :record["name"]
		});
		/*$("#id_update").val(record["channelId"]);
		$("#channelId_update").html(record["code"]);
		$("#name_update").html(record["name"]);*/
	});
	$("#updateChannel").click(function(){
		var channelName = $("#name").textbox('getValue');
		$('#updateChannelForm').form('enableValidation');
		$("#status_update").val(1);
		if($('#updateChannelForm').form('validate')){
				CMC.request({
					method: "POST",
					url: CouponIssuingChannel.updateUrl,
					data: $('#updateChannelForm').form().serialize(),
				  	success: function(result){
				  		CMC.alertMessage(result.messageBody, 'info',CMC.search);
				  		CMC.dialog('updateChannelDialog','close');
				  	}
				});
		}
	});
	$('#deleteRecord').click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请选择要删除的记录！",'warn');
			return;
		}
		CMC.confirm("请确认是否删除["+record['name']+"]?", function(r){
			if(r){
				CMC.request({
					method: "POST",
					url: CouponIssuingChannel.deleteUrl,
					data: record,
				  	success: function(result){
				  		CMC.alertMessage(result.messageBody, 'info',CMC.search);
				  	}
				});
			}
		});
	});
	
    $.extend($.fn.validatebox.defaults.rules, {
        checkVilidChannelId: {
            validator: function(value){
            	var reg=new RegExp("^[0-9a-zA-Z]{2}$");
                return value.length==2 && reg.test(value);
            },
            message: '渠道ID长度必须是两位,并由数字和大小写字母组成'
        }
    });
	
})(jQuery)

$(document).ready(function(){
	CMC.init(CouponIssuingChannel);
});

