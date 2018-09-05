var CmcRedis = {
	searchTableRequired: true, 
	initNotSearch : true,
	columns :  [[
					{field: 'key', title:'key' , width: '30%' , align: 'left'},
					{field: 'value', title:'value' , width: '65%' , align: 'center'}
				]],
	menuId: 'CmcRedis',
	searchUrl : 'authorized/cmcRedis/getAll',
	addUrl : "authorized/cmcRedis/add",
	deleteUrl : "authorized/cmcRedis/delete",
};

(function($){
	
	CmcRedis.selectAll = function(){
	    if((!$("#resourceSearchForm  #key").val())){
	        CMC.alertMessage("请输入查询条件！", 'info');
	        return;
	    }
	    CMC.search();
	}
	
	CmcRedis.deleteRedis = function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条系统数据！",'warning');
			return;
		}
		CMC.request({
			url: CmcRedis.deleteUrl,
			data : {"key":record.key},
			method: 'POST',
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
			}
		});
	}
	
	CmcRedis.submitAddForm = function(){
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
		$("#CmcRedisAddForm").form("enableValidation");
		var isValid = $("#CmcRedisAddForm").form("validate");
		if(isValid){
			CMC.request({
				url: CmcRedis.addUrl,
				method: 'POST',
				data : $("#CmcRedisAddForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.dialog("CmcRedis_add_div","close");
				}
			});
		}
	}
	
})(jQuery);


$(document).ready(function(){
	CMC.init(CmcRedis);
});

