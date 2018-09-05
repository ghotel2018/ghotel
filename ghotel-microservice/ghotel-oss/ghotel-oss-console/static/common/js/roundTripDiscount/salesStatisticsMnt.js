/**
 * 来回程优惠产品查询
 */

 var RoundTripDiscount={
 	searchTableRequired: true,
	menuId: "RoundTripDiscount",
	searchUrl: "authorized/roundTripDiscount/getAll",
	exportUrl:"authorized/roundTripDiscount/export",
	columns:[[
			{field: 'submitpricetime', title:'销售日期' , width: '10%' , align: 'center'},
			{field: 'orderCount', title:'订单量' , width: '5%' , align: 'center'},
			{field: 'paymoneyCount', title:'销售额' , width: '15%' , align: 'center'},
			{field: 'ordertype', title:'产品种类' , width: '15%' , align: 'center',formatter: function(value){
			        	   if(value=="202"){
			        		   return '来回程优惠KQT舱';
			        	   }else if(value=='201'){
			        	   		return '来回程优惠';
			        	   }
			           }},
			{field: 'bookagent', title:'渠道' , width: '10%' , align: 'center',formatter: function(value){
			        	   if(value=="MOBILE"){
			        		   return '移动';
			        	   }else if(value=='B2C'){
			        	   		return 'B2C';
			        	   }
			           }},
			
		]],
 };

(function($){
	$("#roundTripDiscount_reset").click(function(event) {
		// $("#searchForm").form("clear");
		$("#submitDateStart").datebox('setValue','');
		$("#submitDateEnd").datebox('setValue','');
		$("#bookagent").combobox('select','');
		$("#ordertype").combobox('select','');
	});

	$("#roundTripDiscount_export").click(function(event) {
		CMC.request({
					url: RoundTripDiscount.exportUrl,
					method: 'POST',
					data : $("#searchForm").form().serialize(),
					success: function(result){
						CMC.alertMessage(result.messageBody,'info');
						
					}
				});
	});
})(jQuery);

 $(document).ready(function(){
	CMC.init(RoundTripDiscount);	
});