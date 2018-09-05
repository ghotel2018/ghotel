var BlackListCounter = {
	searchTableRequired: true, 
	singleSelect : true,
	columns :  [[
					{field: 'bookUser', title:'下单用户' , width: '15%' , align: 'center'},
					{field: 'interDomestic', title:'interDomestic' , width: '10%' , align: 'center',
						formatter:function(value,row,index){
							if("D"==value)
								return "国内";
							else if("I"==value)
								return "国际";
						}
					},
					{field: 'orderSeat', title:'订单座位数' , width: '10%' , align: 'center'},
					{field: 'paySeat', title:'支付座位数' , width: '5%' , align: 'center'},
					{field: 'orderDate', title:'下单日期' , width: '20%' , align: 'center',
						formatter:function(value,row,index){
							return new Date(value).format("yyyy-MM-dd");
						}
					},
					{field: 'objectVersionNumber', title:'行版本号' , width: '5%' , align: 'center'},
					{field: 'overReservedFlag', title:'恶意占座标记' , width: '10%' , align: 'center',
						formatter:function(value,row,index){
							if("1"==value)
								return "正常占座";
							else if("2"==value)
								return "恶意占座";
						}
					}
				]],
	menuId: 'BlackListCounter',
	searchUrl : 'authorized/blackListCounter/getAll'
};

(function($){
	
	BlackListCounter.clearForm = function(id) {
		$('#'+id).form('clear');
	};
	
})(jQuery);


$(document).ready(function(){
	CMC.init(BlackListCounter);
});

