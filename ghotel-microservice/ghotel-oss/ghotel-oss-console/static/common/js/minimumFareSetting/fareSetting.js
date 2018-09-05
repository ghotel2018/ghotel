/**
 * 最低票价差额设置
 */

 var FareSetting={
//		searchTableRequired:true,
		menuId:"MinimumFare",
		searchUrl: "authorized/fareSetting/getCache",
		updateDemUrl: "authorized/fareSetting/updateDemFare",
		updateIntUrl : "authorized/fareSetting/updateIntFare",
		updateRightNow:"security/cityWidget/updateRightNow"
};


 /**
  *修改最低票价差额
  */

$(function(){
	$("#fare_inLand").validatebox({    
	    required: true,    
	    validType: 'fareValidate',
	});
	
	$("#fare_internation").validatebox({    
	    required: true,    
	    validType: 'int_fareValidate',
	});
	
	$("#fare_inLand").validatebox("disableValidation");
	
	$("#fare_internation").validatebox("disableValidation");
	
	$("#fare_inLand").change(function(){
		$("#fare_inLand").validatebox("enableValidation");
	});
	
	$("#fare_internation").change(function(){
		$("#fare_internation").validatebox("enableValidation");
	});
	/**
	 * 国内票价差额设置
	 */
	$("#updateFareForDem").click(function(){
		var isValid = $("#fareForm").form("validate");
		var price = $("#fare_inLand").val();
		if(isValid){
			CMC.request({
				url:FareSetting.updateDemUrl,
				method: 'POST',
				data : {"fare" : price},
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
				}
			});
		}
	});
	
	/**
	 * 国际票价差额设置
	 */
	$("#updateFareForInt").click(function(){
		var isValid = $("#fareForm").form("validate");
		var price = $("#fare_internation").val();
		if(isValid){
			CMC.request({
				url:FareSetting.updateIntUrl,
				method: 'POST',
				data : {"fare" : price},
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
				}
			});
		}
	});
	
	CMC.request({
		url:FareSetting.searchUrl,
		method: 'POST',
		success: function(result){
			$("#fare_inLand").val(result.messageBody.demPrice);
			$("#fare_internation").val(result.messageBody.intPrice);
		}
	});
});
/**
 * 验证
 */
$.extend($.fn.validatebox.defaults.rules, {  
	fareValidate: { 
		validator: function(value, param){  
			var regEx=/^([2-9][0-9]{2})|([0-9]{4,})$/; 
			return regEx.test(value);    
		},    
		message: '必填项，仅支持输入数字且大于等于200！'
	},
	int_fareValidate :{
		validator: function(value, param){  
			var regEx=/^([5-9][0-9]{2})|([0-9]{4,})$/; 
			return regEx.test(value);    
		},    
		message: '必填项，仅支持输入数字且大于等于500！'
	}
});
function updateRightNowFunction(){
	CMC.dialog("pleaseWait","open");
	CMC.request({
		url:FareSetting.updateRightNow,
		method: 'POST',
		success: function(result){
			CMC.dialog("pleaseWait","close");
			if(result.messageBody.success=="true")
				CMC.alertMessage("更新成功",'info');
			else
				CMC.alertMessage("更新失败,请重试",'error');
		}
	});
}
$(document).ready(function(){
	CMC.init(FareSetting);	
});