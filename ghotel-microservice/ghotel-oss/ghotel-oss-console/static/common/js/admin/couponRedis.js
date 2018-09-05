var CouponRedis = {
	searchTableRequired: true, 
	initNotSearch : true,
	columns :  [[
					{field: 'key', title:'key' , width: '30%' , align: 'left'},
					{field: 'value', title:'value' , width: '65%' , align: 'center'}
				]],
	menuId: 'CouponRedis',
	searchUrl : 'authorized/couponRedis/getAll',
	addUrl : "authorized/couponRedis/add",
	deleteUrl : "authorized/couponRedis/delete",
};

(function($){
	
	CouponRedis.selectAll = function(){
	    if((!$("#resourceSearchForm  #key").val())){
	        CMC.alertMessage("请输入查询条件！", 'info');
	        return;
	    }
	    CMC.search();
	}
	
	CouponRedis.deleteRedis = function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条系统数据！",'warning');
			return;
		}
		CMC.request({
			url: CouponRedis.deleteUrl,
			data : {"key":record.key},
			method: 'POST',
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
			}
		});
	}
	
	CouponRedis.submitAddForm = function(){
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
		$("#CouponRedisAddForm").form("enableValidation");
		var isValid = $("#CouponRedisAddForm").form("validate");
		if(isValid){
			CMC.request({
				url: CouponRedis.addUrl,
				method: 'POST',
				data : $("#CouponRedisAddForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.dialog("CouponRedis_add_div","close");
				}
			});
		}
	}
	
})(jQuery);


$(document).ready(function(){
	CMC.init(CouponRedis);
});

