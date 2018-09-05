/**
 * Created by ldg on 2017/7/25.
 */

$(function() {
	$.ajax({
        type: "post",
        url: 'authorized/channelMananger/getAll',
        success: function (data) {
        	var info = data.messageBody.list;
        	
        	$('#aliyunChannelList').datagrid({ 
        		height: 340,
        		fitColumns:true,
        		singleSelect:true,        		
        		rownumbers:true,
        		/*pagination:true,
        		pageSize: 10,
        	    pageList: [5, 10, 15],*/
        		toolbar: '#buttonBar',
        		data:info,
        		columns:[[    
        	        {field:'partnerId',title:'渠道号',width: '100' , align: 'center'},    
        	        {field:'partnerName',title:'渠道名称',width: '100' , align: 'center'}, 
        	        {field:'partnerPassword',title:'渠道密码',width: '100' , align: 'center'}, 
        	        {field:'partner_account',title:'渠道账号',width: '100' , align: 'center'}, 
        	        {field:'interfaceId',title:'接口',width: '100' , align: 'center'}, 
        	        {field:'visit_ip',title:'访问白名单',width: '130' , align: 'center'},   
        	        {field:'concurrency_limit',title:'并发限制数',width: '100' , align: 'center'}, 
        	        {field:'max_hour_limit',title:'小时访问量限制',width: '100' , align: 'center'},    
        	        {field:'max_day_limit',title:'天访问量限制',width: '100' , align: 'center'},        	           
        	        {field:'deny_cabins',title:'禁止销售的舱位',width: '100' , align: 'center'},
        	        {field:'deny_airlines',title:'禁止销售的航线',width: '100' , align: 'center'}
        	    ]]
        	}); 
        }
    });
	
	$.ajax({
        type: "post",
        url: 'authorized/channelMananger/selectAllChannel',
        success: function (data) {
        	var info = data.messageBody;
        	 $("#partnerId_find").combobox({
                 data: info,
                 panelHeight: '120px',
                 valueField:'partnerId',
                 textField:'partnerId' 
             }); 
        }
    });
	
})

//新增渠道，打开窗口	
	$("#channel_add").click( function(){
		$("#addForm").form("clear");
		$("#addForm").form("disableValidation");
		CMC.dialog('addchannel','open');
	});
	
//更新渠道，打开窗口		
	$("#channel_update").click(function(){
		$("#updateForm").form("disableValidation");
		$("#updateForm").form("clear");
		var record =$('#aliyunChannelList').datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
			
		}
		$("#updateForm").find("#partnerId-edit").textbox("setText",record.partnerId);
		$("#updateForm").find("#partnerName-edit").textbox("setText",record.partnerName);
		$("#updateForm").find("#partnerPassword").textbox("setText",record.partnerPassword);
		$("#updateForm").find("#partner_account_edit").textbox("setText",record.partner_account);
		$("#updateForm").find("#interfaceId").textbox("setText",record.interfaceId);
		$("#updateForm").find("#visit_ip").textbox("setText",record.visit_ip);
		/*$("#max_hour_limit_edit").textbox("setText",record.max_hour_limit);
		$("#max_day_limit_edit").textbox("setText",record.max_day_limit);
		$("#concurrency_limit_edit").textbox("setText",record.concurrency_limit);
		$("#deny_cabins_edit").textbox("setText",record.deny_cabins);
		$("#deny_airlines_edit").textbox("setText",record.deny_airlines);*/
		$("#updateForm").find("#max_hour_limit_edit").textbox("setText",record.max_hour_limit);
		$("#updateForm").find("#max_day_limit_edit").textbox("setText",record.max_day_limit);
		$("#updateForm").find("#concurrency_limit_edit").textbox("setText",record.concurrency_limit);
		$("#updateForm").find("#deny_cabins_edit").textbox("setText",record.deny_cabins);
		$("#updateForm").find("#deny_airlines_edit").textbox("setText",record.deny_airlines);
		
		CMC.dialog('updatChannel','open');
	});

	
	//更新提交按钮
	$('.UpdateButton').click(function(){
		
		$("#updateForm").form("enableValidation");
		var isValid = $("#updateForm").form("validate");
		
		var partnerId=$("#updateForm").find("input[name='partnerId']").parent().find("input[type='text']").val();
		var partnerName=$("#updateForm").find("input[name='partnerName']").parent().find("input[type='text']").val();
		
		var partnerPassword=$("#updateForm").find("input[name='partnerPassword']").parent().find("input[type='text']").val();
		var interfaceId=$("#updateForm").find("input[name='interfaceId']").parent().find("input[type='text']").val();
		//var visit_ip=$("#updateForm").find("input[name='visit_ip']").parent().find("input[type='text']").val();
		//var visit_ip=$("#visit_ip").textbox("getValue");
		var visit_ip=$("#updateForm").find("#visit_ip").textbox("getText");
		var partner_account=$("#updateForm").find("#partner_account_edit").textbox("getText");
		var max_hour_limit=$("#updateForm").find("input[name='max_hour_limit']").parent().find("input[type='text']").val();
		var max_day_limit=$("#updateForm").find("input[name='max_day_limit']").parent().find("input[type='text']").val();
		var concurrency_limit=$("#updateForm").find("input[name='concurrency_limit']").parent().find("input[type='text']").val();
		var deny_cabins=$("#updateForm").find("input[name='deny_cabins']").parent().find("input[type='text']").val();
		var deny_airlines=$("#updateForm").find("input[name='deny_airlines']").parent().find("input[type='text']").val();

		
		data="partnerId="+partnerId+"&partnerName="+partnerName+"&partnerPassword="+partnerPassword+"&interfaceId="+interfaceId+"&visit_ip="+visit_ip+"&max_hour_limit="+max_hour_limit+"&max_day_limit="+max_day_limit+"&concurrency_limit="+concurrency_limit+"&deny_cabins="+deny_cabins+"&deny_airlines="+deny_airlines+"&partner_account="+partner_account;
		if(isValid){
			CMC.request({
				url: 'authorized/channelMananger/update',
				method: 'POST',
				data : data,
				success: function(result){
					
					CMC.alertMessage(result.messageBody,'info');
					CMC.dialog('updatChannel','close');


					$("#updateForm").form("clear");
					window.location.reload();
				}
			});
		}
	});
	
	//新增提交按钮
	$('.AddButton').click(function(){
		$("#addForm").form("enableValidation");
		var isValid = $("#addForm").form("validate");
		if(isValid){
			CMC.request({
				url: 'authorized/channelMananger/add',
				method: 'POST',
				data : $("#addForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.dialog('addchannel','close');
					$("#addForm").form("clear");
					window.location.reload();
				}
		});
	}
});
	
	//删除
	$("#channel_delete").click(function (){
		
		var record = $('#aliyunChannelList').datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
			
		}
		  CMC.confirm("请确认是否继续删除该数据?", function(r){
			  if(r){
				  CMC.request({
						url: 'authorized/channelMananger/delete',
						method: 'POST',
						data : record,
						success: function(response){
							CMC.alertMessage(response.messageBody,'info');
							window.location.reload();
						}
					});
			  }
		  });
		
	});
	
	//通过接口和渠道查询渠道信息	
	$("#channel_find").click( function(){	
		//清空datagrid已有的数据，再次填充
		  var item = $('#aliyunChannelList').datagrid('getRows');
          if (item) {
              for (var i = item.length - 1; i >= 0; i--) {
                  var index = $('#aliyunChannelList').datagrid('getRowIndex', item[i]);
                  $('#aliyunChannelList').datagrid('deleteRow', index);
              }
          }
          
		var submitParams =$("#searchForm").form().serialize();
		var partnerId = $("#partnerId_find").combobox('getValue');		
		var interfaceId = $("#interfaceId_find").combobox('getValue');
		
		
		$.ajax({
	        type: "post",
	        url: 'authorized/channelMananger/getByChanAndInter?'+submitParams,
	        success: function (data) {
	        	var info = data.messageBody;
	        	$('#aliyunChannelList').datagrid({ 
	        		height: 340,
	        		fitColumns:true,
	        		singleSelect:true,	        		
	        		rownumbers:true,
	        		/*pagination:true,
	        		pageSize: 10,
	        	    pageList: [5, 10, 15],*/
	        		toolbar: '#buttonBar',
	        		data:info,
	        		columns:[[    
	        	        {field:'partnerId',title:'渠道号',width: '100' , align: 'center'},    
	        	        {field:'partnerName',title:'渠道名称',width: '100' , align: 'center'},
	        	        {field:'partnerPassword',title:'渠道密码',width: '100' , align: 'center'}, 
	        	        {field:'partner_account',title:'渠道账号',width: '100' , align: 'center'}, 
	        	        {field:'interfaceId',title:'接口',width: '100' , align: 'center'}, 
	        	        {field:'visit_ip',title:'访问白名单',width: '130' , align: 'center'},  
	        	        {field:'concurrency_limit',title:'并发限制数量',width: '100' , align: 'center'}, 
	        	        {field:'max_hour_limit',title:'小时访问量限制',width: '100' , align: 'center'},    
	        	        {field:'max_day_limit',title:'天访问量限制',width: '100' , align: 'center'},	        	           
	        	        {field:'deny_cabins',title:'禁止销售的舱位',width: '100' , align: 'center'},
	        	        {field:'deny_airlines',title:'禁止销售的航线',width: '100' , align: 'center'}
	        	    ]]
	        	}); 
	        }
	    });
		
	});
	





