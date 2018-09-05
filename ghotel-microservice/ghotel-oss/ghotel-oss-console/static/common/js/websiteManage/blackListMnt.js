/**
 * 来回程优惠产品查询
 */

 var BookingBlackList={
 	searchTableRequired: true,
	menuId: "BookingBlackList",
	searchUrl: "authorized/bookingBlackList/getAll",
	addUrl: "authorized/bookingBlackList/add",
	deleteUrl: "authorized/bookingBlackList/delete",
	columns:[[
			{field: 'bookUser', title:'订座黑名单号' , width: '20%' , align: 'center'},
			{field: 'creattime', title:'添加时间' , width: '15%' , align: 'center'},
			{field: 'userType', title:'用户类型' , width: '15%' , align: 'center',formatter: function(value){
			        	   if(value=="0"){
			        		   return '普通用户';
			        	   }else if(value=='1'){
			        	   		return '团队票用户';
			        	   }
			           }},
        {field: 'remark', title:'备注' , width: '45%' , align: 'center'},
		]],
 };

(function($){

	$("#bookingBlackList_reset").click(function(event) {
		$("#bookUser").textbox('setValue','');
	});

	$("#bookingBlackList_add").click(function(event) {
		$("#addForm").form('clear');
		$("#addForm #bookUser").textbox('setValue','');
		$("#add_userType").combobox('select','0');
		CMC.dialog('addBookingBlackListDetail','open');
	});

	//添加
	$("#submit_add").click(function(event) {

        //$("#add_bookUser").textbox('setValue', '');
		var isValid = $("#addForm").form("validate");

			if (isValid) {
				
				CMC.request({
					url: BookingBlackList.addUrl,
					method: 'POST',
					data : $("#addForm").form().serialize(),
					success: function(result){
						CMC.alertMessage(result.messageBody,'info');
						if(result.statusCode==0){
                            CMC.search();
                            CMC.dialog('addBookingBlackListDetail','close');
						}
						// $("#updateForm").form("clear");
					}
				});
			}
	});

	//删除
	$("#bookingBlackList_delete").click(function(event) {
		    var record = CMC.grid.datagrid("getSelected");
			if(!record){
				CMC.alertMessage("请先选中一条记录！","warning");
				return;
			}
			 CMC.confirm("确定删除黑名单信息?", function(r){

				  if(r){
				  	CMC.confirm("是否关联删除?", function(rr){
                          if(rr){
                              record.type = "1";
                          }else {
                              record.type = "0";
                          }
							CMC.request({
								url: BookingBlackList.deleteUrl,
								method: 'POST',
								data : record,
								success: function(response){
									CMC.alertMessage(response.messageBody,'info');
									CMC.search();
								}
							});
                      });
				  }
		  });
	});
})(jQuery);

$(document).ready(function(){
	CMC.init(BookingBlackList);	
});



$.extend($.fn.textbox.defaults.rules, {
    bookUserValidata: {
        validator: function (value, param) {
            value=$.trim(value);
            return value.length>3&&value.length<=64;
           // String  regEx = /^(\w{3,})$/;
			// return regEx.test(value);
        },
        message: '请输入长度4位到64位之间的名单！'
    },
    remarkValidata:{
            validator: function (value, param) {
                value=$.trim(value);
                return value.length>3&&value.length<100;
                // String  regEx = /^(\w{3,})$/;
                // return regEx.test(value
            },
            message: '请输入4~99个文字说明！'
        }
});
