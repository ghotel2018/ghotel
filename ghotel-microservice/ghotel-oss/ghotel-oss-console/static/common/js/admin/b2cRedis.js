var B2CRedis = {
	searchTableRequired: true, 
	initNotSearch : true,
	columns :  [[
					{field: 'key', title:'key' , width: '15%' , align: 'left'},
					{field: 'field', title:'field' , width: '15%' , align: 'left'},
					{field: 'value', title:'value' , width: '65%' , align: 'center'}
				]],
	menuId: 'B2CRedis',
	searchUrl : 'authorized/b2cRedis/getAll',
	addUrl : "authorized/b2cRedis/add",
	deleteUrl : "authorized/b2cRedis/delete",
};

(function($){
	
	B2CRedis.selectAll = function(){
	    if((!$("#resourceSearchForm  #key").val())){
	        CMC.alertMessage("请输入查询条件！", 'info');
	        return;
	    }
	    CMC.search();
	}
	
	B2CRedis.deleteRedis = function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条系统数据！",'warning');
			return;
		}
		CMC.request({
			url: B2CRedis.deleteUrl,
			data : {"key":record.key,"field":record.field},
			method: 'POST',
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
			}
		});
	}
	
	B2CRedis.submitAddForm = function(){
		var expiredTime = $("#expiredTime").val();
		if(expiredTime!=null&&!""==expiredTime){
			if(isNaN(expiredTime)){
				CMC.alertMessage("超时时间必须是数字",'error');
				return;
			}else{
				expiredTime = parseInt(expiredTime);
				if(expiredTime>2147483647){
					CMC.alertMessage("超时时间请不要超过2147483647s",'error');
					return;
				}
			}
		}
		$("#B2CRedisAddForm").form("enableValidation");
		var isValid = $("#B2CRedisAddForm").form("validate");
		if(isValid){
			CMC.request({
				url: B2CRedis.addUrl,
				method: 'POST',
				data : $("#B2CRedisAddForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.dialog("B2CRedis_add_div","close");
				}
			});
		}
	}
	
})(jQuery);


$(document).ready(function(){
	CMC.init(B2CRedis);
});

