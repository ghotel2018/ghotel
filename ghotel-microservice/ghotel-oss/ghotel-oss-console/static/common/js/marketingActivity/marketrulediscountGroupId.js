var MarketrulediscountGroupId = {
	menuId: "MarketrulediscountGroupId",
	searchTableRequired: true, 
	searchUrl: "authorized/marketingActivity/getDiscountGroupIdUrl" ,
	groupetDiscId : '',
	multipleSelect:true,
	columns :  [[
				{
				    field:'check',
				    checkbox:true
				},
		           {field: 'groupId', title:'所属批次号' , width: '23%' , align: 'center'},
		           {field: 'faceValue', title:'面值' , width: '9%' , align: 'center'},
		           /*{field: 'createdTime', title:'生成日期' , width: '13%' , align: 'center'},*/
		           {field: 'createdBy', title:'创建人' , width: '16%' , align: 'center'},
		           {field: 'channelId', title:'渠道' , width: '23%' , align: 'center',
					   /*formatter : function(value,row,index) {
						   var createChannel="";
						   if(row.createChannel){
							   createChannel= row.createChannel;
						   }
						   var channelName="";
						   if(row.channelName){
							   channelName= row.channelName
						   }
						   return "["+createChannel+"]"+channelName;

					   }*/
				   },
		           {field: 'couponType', title:'优惠券类型' , width: '23%' , align: 'center',
					   formatter : function(value,row,index) {
						   var couponType="";
						   /*if(row.couponType==0||row.couponType=='0'){
							   couponType='国内合作活动优惠券';
						   }else if(row.couponType==1||row.couponType=='1'){
							   couponType='航线促销优惠券';
						   }else if(row.couponType==2||row.couponType=='2'){
							   couponType='国内营销活动优惠券';
						   }else if(row.couponType==3||row.couponType=='3'){
							   couponType='国际营销活动优惠券';
						   }else if(row.couponType==4||row.couponType=='4'){
							   couponType='国际合作活动优惠券';
						   }*/
						   if(row.couponType==0||row.couponType=='0'){
							   couponType='国内收入现金优惠券';
						   }else if(row.couponType==1||row.couponType=='1'){
							   couponType='国内运价优惠券';
						   }else if(row.couponType==2||row.couponType=='2'){
							   couponType='国内费用现金优惠券';
						   }else if(row.couponType==3||row.couponType=='3'){
							   couponType='国际虚拟资金优惠券';
						   }else if(row.couponType==4||row.couponType=='4'){
							   couponType='国际自有资金优惠券';
						   }/*else if(row.couponType==5||row.couponType=='5'){
							   couponType='国内里程优惠券';
						   }else if(row.couponType==6||row.couponType=='6'){
							   couponType='国内旅客服务优惠券';
						   }else if(row.couponType==7||row.couponType=='7'){
							   couponType='国际里程优惠券';
						   }else if(row.couponType==8||row.couponType=='8'){
							   couponType='国际旅客服务优惠券';
						   }*/else if(row.couponType==9||row.couponType=='9'){
							   couponType='韩国自有资金优惠券';
						   }else if(row.couponType==10||row.couponType=='10'){
							   couponType='韩国虚拟资金优惠券';
						   }else if(row.couponType==11||row.couponType=='11'){
							   couponType='澳洲自有资金优惠券';
						   }else if(row.couponType==12||row.couponType=='12'){
							   couponType='澳洲虚拟资金优惠券';
						   }else if(row.couponType==13||row.couponType=='13'){
							   couponType='新西兰自有资金优惠券';
						   }else if(row.couponType==14||row.couponType=='14'){
							   couponType='新西兰虚拟资金优惠券';
						   }
						   return couponType;
					   }
					}
		           ]]
		/*[[
		{
		    field:'check',
		    checkbox:true
		},
       {field: 'groupId', title:'批次号' , width: '30%' , align: 'center'},
       {field: 'discountType', 
    	   title:'优惠券类型' , 
    	   width: '30%' , 
    	   align: 'center',
    	   formatter: function(value,row,index){
				if (value==0){
					return "国内收入现金优惠券";
				} else if (value==1){
					return "国内运价优惠券";
				}else if (value==2){
					return "国内费用现金优惠券";
				}else if (value==3){
					return "国际虚拟资金优惠券";
				}else{
					return "国际自有资金优惠券";
				}
			}
       },
       {field: 'createdBy', title:'创建人' , width: '30%' , align: 'center'}
   ]]*/
	
};

var couponGroupId = "";

$(document).ready(function(){
	var data = window.parent.MarketingActivityMnt.handleFormData('#marketingActivitySaveForm',"_save");
	if( data!=null && data.actionType != null && data.actionType != ""){
//		$("#discountTypecx").val(data.discountType);
		CMC.init(MarketrulediscountGroupId);
	}else{
		CMC.alertMessage("请先选择优惠券类型!", '提示');
//		window.parent.$('#addGroupidDialog').dialog('close');
	}
	couponGroupId = window.parent.$('#couponGroupId_save').textbox('getValue');
	$("#choicediscountGroupId").textbox('setValue',couponGroupId);
});

(function($){
	$("#clearCondition").click(function(){
		var start = $("#marketrulediscountGroupIdSearchForm input[name='start']:hidden").val();
		var end = $("#marketrulediscountGroupIdSearchForm input[name='end']:hidden").val();
		var actionType = $("#actionType").val();
		$('#marketrulediscountGroupIdSearchForm').form('clear');
		$('#marketrulediscountGroupIdSearchForm').form('clear');
		$("#actionType").val(actionType);
		$("#marketrulediscountGroupIdSearchForm input[name='start']:hidden").val(start);
		$("#marketrulediscountGroupIdSearchForm input[name='end']:hidden").val(end);
		CMC.search();
	});

	MarketrulediscountGroupId.init = function (){
		//TicketActivityRules.searchUser();
	};
 
	$("#cancel").click(function(){
		window.parent.$('#addGroupidDialog').dialog('close');
	});
	
	var listid;
	var id ="";
	MarketrulediscountGroupId.choice=function () {
        var record = CMC.grid.datagrid('getChecked');
        if(!record){
            CMC.alertMessage('请至少先选中一条记录!','warn');
            return;
        }
        for(var i=0;i<record.length;i++){
            id+=record[i].groupId+",";
        }
        listid = id.substring(0, id.lastIndexOf(','));
        if(couponGroupId.length == 0){
        	$("#choicediscountGroupId").textbox('setValue',listid);
        }else{
        	$("#choicediscountGroupId").textbox('setValue',couponGroupId+","+listid);
        }
        CMC.search();
    }
	
	MarketrulediscountGroupId.makesure=function () {
		if(couponGroupId.length == 0){
        	window.parent.$('#couponGroupId_save').textbox('setValue', listid);
        }else{
        	window.parent.$('#couponGroupId_save').textbox('setValue', couponGroupId+","+listid);
        }
        window.parent.$('#addGroupidDialog').dialog('close');
    }
	
})(jQuery);



