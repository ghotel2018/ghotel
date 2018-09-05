var B2CAsyncLog = {
	searchTableRequired: true, 
	singleSelect : true,
	columns :  [[
					{field: 'logId', title:'log_id' , width: '30%' , align: 'center'},
					{field: 'orderNo', title:'订单号' , width: '15%' , align: 'center'},
					{field: 'asyncType', title:'异步请求类型' , width: '10%' , align: 'center',
						formatter:function(value,row,index){
							if("100"==value)
								return "异步入ecs订单库";
							else if("200"==value)
								return "异步生成pnr";
						}
					},
					{field: 'errorCode', title:'错误码' , width: '5%' , align: 'center',
						formatter:function(value,row,index){
							if("110001"==value)
								return "订单状态异常";
							else if("110002"==value)
								return "同步云上数据异常";
							else if("110003"==value)
								return "优惠券挂起异常";
							else if("110004"==value)
								return "参数不正确";
							else if("110005"==value)
								return "回滚pnr失败";
							else if("100601"==value)
								return "入库出错";
							else
								return "ibe异常:"+value;
						}
					},
					{field: 'createDate', title:'创建时间' , width: '20%' , align: 'center',
						formatter:function(value,row,index){
							return new Date(value).format("yyyy-MM-dd HH:mm:ss");
						}
					}
				]],
	menuId: 'B2CAsyncLog',
	searchUrl : 'authorized/B2CAsyncLog/getAll'
};

(function($){
	
	B2CAsyncLog.clearForm = function(id) {
		$('#'+id).form('clear');
	};
	
})(jQuery);


$(document).ready(function(){
	CMC.init(B2CAsyncLog);
});

