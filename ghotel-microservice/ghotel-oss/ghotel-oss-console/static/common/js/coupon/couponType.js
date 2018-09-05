/**
 * @author yys
 * @Date 2017-06-27
 * @Desc 系统消息管理页面
 */

var CouponType = {
	searchTableRequired: true, 
	columns :  [[
					{field: 'code', title:'优惠券类型代号' , width: '20%' , align: 'center'},
					{field: 'cname', title:'优惠券类型名称' , width: '10%' , align: 'center'},
					{field: 'status', title:'是否删除' , width: '6%' , align: 'center',
						formatter:function(value,row,index){
							if(value=="0")
								return "否";
							else 
								return "是";
						}
					},
					{field: 'createdBy', title:'创建人' , width: '7%' , align: 'center'},
					{field: 'createdTime', title:'创建时间' , width: '10%' , align: 'center',
						formatter:function(value,row,index){
							return new Date(value).toLocaleDateString();
						}
					},
					{field: 'remark', title:'描述' , width: '10%' , align: 'center'},
					{field: 'imgUrl', title:'图标' , width: '10%' , align: 'center'},
					{field: 'enableNeed', title:'是否要激活' , width: '10%' , align: 'center',
						formatter:function(value,row,index){
							if(value=="0")
								return "否";
							else 
								return "是";
						}
					}
				]],
	menuId: 'CouponType',
	searchUrl : 'authorized/couponType/getAll',
	addUrl : "authorized/couponType/add",
	updatedUrl : "authorized/couponType/update",
	deleteUrl : "authorized/couponType/delete",
	getUrl: "authorized/couponType/get/",
};
(function($){
	CouponType.beforeUpdateBoxShow = function (id){
		$("#updateForm").form("clear");
		$("#updateForm").form("disableValidation");
		var record = CMC.grid.datagrid("getSelected");
		if(record){
			CMC.request({
				url: CouponType.getUrl+record["code"],
				method: 'get',
				success: function(result){
					$("#"+id).form("load",{
						'id' : result.messageBody.list[0]['id'],
						'cname' : result.messageBody.list[0]['cname'],
						'code' : result.messageBody.list[0]['code'],
						'imgUrl' : result.messageBody.list[0]['imgUrl'],
						'status' : result.messageBody.list[0]['status'],
						'enableNeed' : result.messageBody.list[0]['enableNeed'],
						'remark' : result.messageBody.list[0]['remark']
					});
					CMC.dialog(id,'open');
				}
			});
		}else{
			CMC.alertMessage("请先选中一条记录！", 'warning');
			return;
		}
	}
	
	CouponType.beforeAddBoxShow = function(id){
		$("#addForm").form("reset")
		CMC.dialog(id,'open');
		$("#addForm").form("disableValidation");
		
	}
	
	CouponType.submitAddForm = function(){
		$("#addForm").form("enableValidation");
		var isValid = $("#addForm").form("validate");
		//console.log($("#addForm").form().serialize());return;
		if(isValid){
			CMC.request({
				url: CouponType.addUrl,
				method: 'POST',
				data : $("#addForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					$("#addForm").form("clear");
					CMC.dialog("addCouponTypeDetail","close");
				}
			});
		}
	};
	
	CouponType.submitUpdateForm = function(){
		$("#updateForm").form("enableValidation");
		var isValid = $("#updateForm").form("validate");
		if(isValid){
			CMC.request({
				url: CouponType.updatedUrl,
				method: 'POST',
				data : $("#updateForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('updateResourceDetail','close');
					$("#updateForm").form("clear");
				}
			});
		}
	};
	
	CouponType.clearForm = function(id) {
		$('#'+id).form('clear');
	};
	
	CouponType.deleteCouponType = function (){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条系统消息！",'warning');
			return;
		}
		CMC.request({
			url: CouponType.deleteUrl,
			method: 'POST',
			data : {"id":record.id},
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
				CMC.search();
			}
		});
	}
	
	$("#viewCouponTypeButton").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条系统消息！",'warning');
			return;
		}
		CMC.request({
			url: CouponType.getUrl+record.code,
			method: 'get',
			success: function(result){
				$("#status").html(result.messageBody.list[0]['status']=="1"?"是":"否");
				$("#enableNeed").html(result.messageBody.list[0]['enableNeed']=="1"?"是":"否");
				$("#cname").html(result.messageBody.list[0]['cname']);
				$("#createdTime").html(new Date(result.messageBody.list[0]['createdTime']).toLocaleDateString());
				$("#createdBy").html(result.messageBody.list[0]['createdBy']);
				$("#code").html(result.messageBody.list[0]['code']);
				$("#remark").html(result.messageBody.list[0]['remark']);
				$("#imgUrl").html(result.messageBody.list[0]['imgUrl']);
				CMC.dialog('viewCouponTypeDetail','open');
			}
		});
	});
})(jQuery);

$(document).ready(function(){
	CMC.init(CouponType);
});


