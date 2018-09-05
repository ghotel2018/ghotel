var AWSCouponGroup = {
	searchTableRequired: true, 
	singleSelect : true,
	columns :  [[
		{field: 'groupId', title:'所属批次号' , width: '15%' , align: 'center'},
        {field: 'channelId', title:'渠道' , width: '10%' , align: 'center'},
        {field: 'isInternations', title:'优惠券类型Ⅰ' , width: '15%' , align: 'center' ,formatter: function(value){
     	   if(value=="0"){
     		   return '国内优惠券';
     	   }else if(value=="1"){
	        	   return "国际优惠券";
     	   }else if(value=="2"){
	        	   return "韩国优惠券";
     	   }else if(value=="3"){
	        	   return "澳洲优惠券";
     	   }else if(value=="4"){
	        	   return "新西兰优惠券";
     	   }else if(value=="5"){
     		   return "新加坡优惠券";
     	   }else{
     		   return value;
     	   }
        }},
        {field: 'status', title:'状态' , width: '8%' , align: 'center' ,
     	   formatter : function(value,row,index) {
				   var statusStr="";
				   if(value=="1"){
					   statusStr="生成中";
				   }else if(value=="2"){
					   statusStr="已生成";
				   }else if(value=="3"){
					   statusStr="异常待处理";
				   }else if(value=="4"){
					   statusStr="出错";
				   }else if(value=="5"){
					   statusStr="审批中";
				   }else if(value=="6"){
					   statusStr="审批通过";
				   }else if(value=="7"){
					   statusStr="已绑定活动";
				   }else if(value=="8"){
					   statusStr="挂起";
				   }else if(value=="9"){
					   statusStr="废除";
				   }else if(value=="10"){
					   statusStr="已过期";
				   }
				   return statusStr;
			   }
        },
        {field: 'faceValue', title:'面值' , width: '5%' , align: 'center'},
        {field: 'couponType', title:'优惠券类型Ⅱ' , width: '18%' , align: 'center' ,
     	   formatter:function(value,row,index){
				   var couponType="";
				   if(row.couponType==0||row.couponType=='0'){
					   couponType="收入现金优惠券";
				   }else if(row.couponType==1||row.couponType=='1'){
					   couponType="运价优惠券";
				   }else if(row.couponType==2||row.couponType=='2'){
					   couponType="费用现金优惠券";
				   }else if(row.couponType==3||row.couponType=='3'){
					   couponType="虚拟资金优惠券";
				   }else if(row.couponType==4||row.couponType=='4'){
					   couponType="自有资金优惠券";
				   }else if(row.couponType==5||row.couponType=='5'){
					   couponType="里程优惠券";
				   }else if(row.couponType==6||row.couponType=='6'){
					   couponType="旅客服务优惠券";
				   }else if(row.couponType==9||row.couponType=='9'){
					   couponType="自有资金优惠券";
				   }else if(row.couponType==10||row.couponType=='10'){
					   couponType="虚拟资金优惠券";
				   }else if(row.couponType==11||row.couponType=='11'){
					   couponType="自有资金优惠券";
				   }else if(row.couponType==12||row.couponType=='12'){
					   couponType="虚拟资金优惠券";
				   }else if(row.couponType==13||row.couponType=='13'){
					   couponType="自有资金优惠券";
				   }else if(row.couponType==14||row.couponType=='14'){
					   couponType="虚拟资金优惠券";
				   }else if(row.couponType==15||row.couponType=='15'){
					   couponType="自有资金优惠券";
				   }else if(row.couponType==16||row.couponType=='16'){
					   couponType="虚拟资金优惠券";
				   }
				   return couponType;
			   } 
        },
        {field: 'currencyType', title:'币种' , width: '5%' , align: 'center'},
        {field: 'actionId', title:'活动标识' , width: '5%' , align: 'center'},
        {field: 'flightStartTime', title:'航班有效期' , width: '14%' , align: 'center',
	      	   formatter: function(value,row,index){
	      		   if (value!=null){
	      			   return value.substr(0,10)+" | "+row.flightEndTime.substr(0,10);
	      		   }
	      	   }
        },
        {field: 'usefulStartDate', title:'使用有效期' , width: '14%' , align: 'center',
        	   formatter: function(value,row,index){
        		   if (value!=null){
        			   return value.substr(0,10)+" | "+row.usefulEndDate.substr(0,10);
        		   }
        	   }
        },
        {field: 'segPriceLimit', title:'单航段票价限制' , width: '5%' , align: 'center'},
		]],
	menuId: 'AWSCouponGroup',
	searchUrl : 'authorized/AWSCouponGroup/getAll'
};

(function($){
	
	AWSCouponGroup.clearForm = function(id) {
		$('#'+id).form('clear');
	};
	
})(jQuery);


$(document).ready(function(){
	CMC.init(AWSCouponGroup);
});

