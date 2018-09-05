var RateCouponMnt = {
		searchTableRequired: true, 
		searchUrl: "authorized/rateCoupon/getAll" , //如果searchTableRequired 是 true 必填
		addUrl : 'authorized/rateCoupon/add', 
		deleteUrl : 'authorized/rateCoupon/delete', 
		rateCouponMntReportUrl: "authorized/rateCoupon/rateCouponMntReport",
		menuId:'RateCoupon',
		columns :  [[
			           {field: 'hyzj', title:'会员直减' , width: '10%' , align: 'center'},
			           {field: 'yjq', title:'运价券' , width: '13%' , align: 'center'},
			           {field: 'relationShip', title:'映射关系' , width: '13%' , align: 'center'},
			           {field: 'flightDateBegin', title:'航班有效期范围' , width: '16%' , align: 'center',
			        	   formatter: function(value,row,index){
			        		   if (value!=null){
			        			   return value+"|"+row.flightDateEnd;
			        		   }
			        	   }
			           },
			           {field: 'usefulDateBegin', title:'使用有效期范围' , width: '16%' , align: 'center',
			        	   formatter: function(value,row,index){
			        		   if (value!=null){
			        			   return value+"|"+row.usefulDateEnd;
			        		   }
			        	   }
			           },
			           {field: 'updateBy', title:'创建人' , width: '13%' , align: 'center'},
			           {field: 'updateTime', title:'创建时间' , width: '10%' , align: 'center'},
			           {field: 'status', 
			        	   title:'状态' , 
			        	   width: '10%' , 
			        	   align: 'center',
			        	   formatter: function(value,row,index){
								if (value==0){
									return "<lable style='color:red;'>删除</label>";
								} else {
									return "<lable style='color:green;'>正常</label>";
								}
							}
			           },
			           {field: 'deleteBy', title:'删除人' , width: '10%' , align: 'center'},
			           {field: 'deletetime', title:'删除时间' , width: '10%' , align: 'center'}
		           ]]
};


(function($){
	
	$("#clearCondition").click(function(){
//		$('#RateCouponsearchForm').form('clear');
//		$("input[name='start']:hidden").val("1");
//		$("input[name='end']:hidden").val("10");
		
		var start= $("#RateCouponsearchForm input[name='start']:hidden").val();
		var end=$("#RateCouponsearchForm input[name='end']:hidden").val();
		$('#RateCouponsearchForm').form('clear');
		$("#RateCouponsearchForm input[name='start']:hidden").val(start);
		$("#RateCouponsearchForm input[name='end']:hidden").val(end);
		CMC.search();
	});
	
	$("#exportRateCouponMnt").click(function(){
	var hyzj = $("#hyzj").val();
	var relationShip = $("#relationShip").val();
	var yjq = $("#yjq").val();
	var status = $("#status").combobox('getValue');//状态
	var updateBy = $("#updateBy").val();
	var updateTimeBegin = $("#updateTimeBegin").datebox('getValue');
	var updateTimeEnd = $("#updateTimeEnd").datebox('getValue');
	var deleteBy = $("#deleteBy").val();
	var deleteTimeBegin = $("#deleteTimeBegin").datebox('getValue');
	var deleteTimeEnd = $("#deleteTimeEnd").datebox('getValue');
	var flightDateBegin = $("#flightDateBegin").datebox('getValue');
	var flightDateEnd = $("#flightDateEnd").datebox('getValue');
	var usefulDateBegin = $("#usefulDateBegin").datebox('getValue');
	var usefulDateEnd = $("#usefulDateEnd").datebox('getValue');
        CMC.fileUpload({
            url: RateCouponMnt.rateCouponMntReportUrl,
            method: 'POST',
            dataType: "json",
            data: {
            	'hyzj':hyzj,
            	'relationShip':relationShip,
            	'yjq':yjq,
                'status':status,
                'updateBy':updateBy,
                'updateTimeBegin':updateTimeBegin,
                'updateTimeEnd':updateTimeEnd,
                'deleteBy':deleteBy,
                'deleteTimeBegin':deleteTimeBegin,
                'deleteTimeEnd':deleteTimeEnd,
                'flightDateBegin':flightDateBegin,
                'flightDateEnd':flightDateEnd,
                'usefulDateBegin':usefulDateBegin,
                'usefulDateEnd':usefulDateEnd
            },
            success: function(response){
            	CMC.alertMessage("导出获取报表异步请求成功,请移步首页并查看报表记录下载文件！", 'info');
            },
            error: function(){
		  		CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
		  	}
        });
	});
    
	
	$('#showAddDialog').click(function(){
		$('#addForm').form('disableValidation');
		$("#addForm").form('reset');
		CMC.dialog('addChannel','open');
	});
	
	$('#addBtn').click(function(){
		$("#addForm_status").val("1");
		var hyzj = $("#id_hyzj").textbox('getValue');
		var yjq = $("#id_yjq").textbox('getValue');
		var relationship = $("#id_relationship").textbox('getValue');
		var flightDateBegin = $("#flightDateBegin_save").datebox('getValue');
		var flightDateEnd = $("#flightDateEnd_save").datebox('getValue');
		var usefulDateBegin = $("#usefulDateBegin_save").datebox('getValue');
		var usefulDateEnd = $("#usefulDateEnd_save").datebox('getValue');
		$('#addForm').form('enableValidation');
		if($('#addForm').form('validate')){
			CMC.confirm( "确认增加:["+hyzj+"]?",function(r){
				if (r){
					CMC.request({
						type: "POST",
						url: RateCouponMnt.addUrl,
						data: /*{'hyzj':hyzj,
		            		  'yjq':yjq,
		            		  'relationship':relationship,
		            		  'flightDateBegin':flightDateBegin,
		            		  'flightDateEnd':flightDateEnd},*/$('#addForm').form().serialize(),
					  	success: function(result){
					  		CMC.alertMessage(result.messageBody, 'info',CMC.search);
					  		CMC.dialog('addChannel','close');
					  	}
					});
				}
				}
			);
		}
	});
	
	$('#deleteSelectedRecord').click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请选择要删除的！",'warn');
			return;
		}
		CMC.confirm("请确认是否删除["+record['hyzj']+"]?", function(r){
			if(r){
				CMC.request({
					method: "POST",
					url: RateCouponMnt.deleteUrl,
					data: record,
				  	success: function(result){
				  		CMC.alertMessage(result.messageBody, 'info',CMC.search);
				  	}
				});
			}
		});
	});

})(jQuery);

$(document).ready(function(){
	CMC.init(RateCouponMnt);
});