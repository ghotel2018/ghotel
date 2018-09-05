/**
 * 优惠券状态实时监控
 */
/*var CouponStateMonitoring = {
    menuId: "CouponStateMonitoring",
    searchTableWidth: '100%',
    searchTableRequired : true,
    initNotSearch:true,
	searchUrl: "authorized/couponStateMonitoring/getAll" , //如果searchTableRequired 是 true 必填
    exportUrl: "authorized/couponStateMonitoring/export"
    columns : [ [{
		field : 'createdTime',
		title : '生成日期',
		width : '15%',
		align : 'center'
	},{
		field : 'received',
		title : '未使用',
		width : '10%',
		align : 'center'
	}, {
		field : 'suspension',
		title : '已挂起',
		width : '10%',
		align : 'center'
	},{
		field : 'used',
		title : '已使用',
		width : '10%',
		align : 'center'
	},{
		field : 'outoftime',
		title : '已过期',
		width : '10%',
		align : 'center'
	},{
		field : 'invalidity',
		title : '已作废',
		width : '10%',
		align : 'center'
	},{
		field : 'unsend',
		title : '已生成',
		width : '10%',
		align : 'center'
	},{
		field : 'faceValue',
		title : '面值',
		width : '10%',
		align : 'center'
	}
	] ],
};*/


(function($){
	
	
	
	$('#exportCouponStateMonitoring').click(function(){
		
		var createDateStart=$("#createDateStart").datebox('getValue');
		var createDateEnd=$("#createDateEnd").datebox('getValue');
		if(createDateStart!=""&&createDateEnd!=""){
			if(createDateStart > createDateEnd){
				CMC.alertMessage("开始日期不能大于结束日期！",'warn');
				return;
			}
		}else{
			CMC.alertMessage("请选择生成日期!",'warn');
			return;
		}
		
		var discountType=$("#discountType").combobox('getValue');
		CMC.request({
//			url: CouponStateMonitoring.exportUrl,
			url: "authorized/couponStateMonitoring/export",
			method: 'POST',
			data : $("#couponStateMonitoringForm").form().serialize(),
			success: function(message){
				CMC.alertMessage("优惠券状态实时监控报表请求完成,请移步首页并查看报表记录下载文件！", 'info');
		  		CMC.dialog('exportCouponDialog','close');
			}
		});
	});
	
	$("#couponSearch").click(function(){
		var discountType = $('#discountType').val();
		var statisticalType = $('#statisticalType').val();
		var createDateStart=$("#createDateStart").datebox('getValue');
		var createDateEnd=$("#createDateEnd").datebox('getValue');
		if(createDateStart!=""&&createDateEnd!=""){
			if(!isArea(createDateStart,createDateEnd)){
				return;
			}
		}else{
			CMC.alertMessage("请选择生成日期!",'warn');
			return;
		}
		CMC.search();
	})
	
	function isArea(start,end){
		var startD;
		var endD;
		var days;
		startD = new Date(Date.parse(start.replace(/-/g,"/")));
		endD   = new Date(Date.parse(end.replace(/-/g,"/")));
		days = parseInt((endD.getTime()-startD.getTime()) / (1000 * 60 * 60 * 24));
		if(days > 30){
			CMC.alertMessage("日期范围应在一个月之内", 'warn');
			return false;
		}
		return true;
	}
	
})(jQuery);
$(document).ready(function(){
    CMC.init(CouponStateMonitoring);
});

