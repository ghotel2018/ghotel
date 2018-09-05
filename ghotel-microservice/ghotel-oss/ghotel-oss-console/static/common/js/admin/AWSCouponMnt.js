var AWSCoupon = {
	searchTableRequired: true, 
	singleSelect : true,
	columns :  [[
					{field: 'couponCode', title:'优惠劵码' , width: '15%' , align: 'center'},
					{field: 'groupId', title:'批次' , width: '15%' , align: 'center'},
					{field: 'faceValue', title : '面值', width : '10%', align : 'center'},
					{field: 'status', title : '状态', width : '12%', align : 'center',
						formatter : function(value,row,index) {
						   var statusStr="";
						   if(row.status==0||row.status=='0'){
							   statusStr="已生成未发放";
						   }else if(row.status==1||row.status=='1'){
							   statusStr="领取未使用";
						   }else if(row.status==2||row.status=='2'){
							   statusStr="已挂起";
						   }else if(row.status==3||row.status=='3'){
							   statusStr="已使用";
						   }else if(row.status==4||row.status=='4'){
							   statusStr="已作废";
						   }else if(row.status==5||row.status=='5'){
							   statusStr="已过期";
						   }
						   return statusStr;
					   }
					},
				    {field: 'couponType', title:'优惠券类型' , width: '18%' , align: 'center' ,
				      	   formatter:function(value,row,index){
			 				   var couponType="";
			 				   if(row.couponType==0||row.couponType=='0'){
			 					   couponType="国内收入现金优惠券";
			 				   }else if(row.couponType==1||row.couponType=='1'){
			 					   couponType="国内运价优惠券";
			 				   }else if(row.couponType==2||row.couponType=='2'){
			 					   couponType="国内费用现金优惠券";
			 				   }else if(row.couponType==3||row.couponType=='3'){
			 					   couponType="国际虚拟资金优惠券";
			 				   }else if(row.couponType==4||row.couponType=='4'){
			 					   couponType="国际自有资金优惠券";
			 				   }else if(row.couponType==5||row.couponType=='5'){
			 					   couponType="国内里程优惠券";
			 				   }else if(row.couponType==6||row.couponType=='6'){
			 					   couponType="国内旅客服务优惠券";
			 				   }else if(row.couponType==9||row.couponType=='9'){
			 					   couponType="韩国自有资金优惠券";
			 				   }else if(row.couponType==10||row.couponType=='10'){
			 					   couponType="韩国虚拟资金优惠券";
			 				   }else if(row.couponType==11||row.couponType=='11'){
			 					   couponType="澳洲自有资金优惠券";
			 				   }else if(row.couponType==12||row.couponType=='12'){
			 					   couponType="澳洲虚拟资金优惠券";
			 				   }else if(row.couponType==13||row.couponType=='13'){
			 					   couponType="新西兰自有资金优惠券";
			 				   }else if(row.couponType==14||row.couponType=='14'){
			 					   couponType="新西兰虚拟资金优惠券";
			 				   }else if(row.couponType==15||row.couponType=='15'){
			 					   couponType="新加坡自有资金优惠券";
			 				   }else if(row.couponType==16||row.couponType=='16'){
			 					   couponType="新加坡虚拟资金优惠券";
			 				   }
			 				   return couponType;
			 			   } 
			       },
				   {field: 'usedTime', title:'使用日期' , width: '14%' , align: 'center',
				     	   formatter: function(value,row,index){
				     		   if (value!=null){
				     			   return value.substr(0,10);
			     		   }
			     	   }
			       },
			       {field: 'bindTime', title:'领取日期' , width: '14%' , align: 'center',
				     	   formatter: function(value,row,index){
				     		   if (value!=null){
				     			   return value.substr(0,10);
			     		   }
			     	   }
			       },
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
			        {field: 'usefulPwd', title:'加密券码' , width: '15%' , align: 'center'},
			        {field: 'usedChannelId', title:'使用渠道ID' , width: '5%' , align: 'center'},
					{field: 'mobile', title:'手机号' , width: '15%' , align: 'center'},
					{field: 'memberId', title:'会员号' , width: '15%' , align: 'center'},
					{field: 'idcard', title:'证件号码' , width: '15%' , align: 'center'},
					{field: 'bindEmails', title:'绑定邮箱' , width: '15%' , align: 'center'}
				]],
	menuId: 'AWSCoupon',
	searchUrl : 'authorized/AWSCoupon/getAll'
};

(function($){
	
	AWSCoupon.clearForm = function(id) {
		$('#'+id).form('clear');
	};
	
})(jQuery);


$(document).ready(function(){
	CMC.init(AWSCoupon);
});

