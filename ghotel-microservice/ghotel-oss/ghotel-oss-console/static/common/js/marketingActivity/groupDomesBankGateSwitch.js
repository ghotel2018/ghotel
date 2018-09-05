
function getGroupDomesBankGateSwitchOpen(){
		CMC.request({
			method: "POST",
			url: "authorized/groupDomesBankGateSwitch/status",
		  	success: function(message){
		  		if(message.messageBody.isSuccess){
		 	    	if("Y"==message.messageBody.isData){
		 	    		initStatu("Y");	
		 	    	}else if("N"==message.messageBody.isData){
		 	    		initStatu("N");
		 	    	}
		 		}else{
		 			initStatu("-1");	
		 		}
		  	}
		});
	}

function initStatu(flag){
	if("N" == flag){
		$("#status").html("<span style='color:red;font-weight:bold;'>关闭</span>");
	}else if("Y" == flag){
		$("#status").html("<span style='font-weight:bold;'>开启</span>");
	}else{
		$("#status").html("<span style='color:red;font-weight:bold;'>未设置</span>");
	}
}

(function($){
	
	$('#open').click(function(){
		var flag = "Y";
		CMC.confirm("确定开启?", function(r){
			if(r){
				CMC.request({
					method: "POST",
					url: "authorized/groupDomesBankGateSwitch/operator",
					data: {
						'flag':flag
					},
				  	success: function(message){
				  		initStatu(flag);
				  		CMC.alertMessage(message.messageBody, 'info');
				  	}
				});
			}
		});
	});
	
	$('#close').click(function(){
		var flag = "N";
		CMC.confirm("确定关闭?", function(r){
			if(r){
				CMC.request({
					method: "POST",
					url: "authorized/groupDomesBankGateSwitch/operator",
					data: {
						'flag':flag
					},
				  	success: function(message){
				  		initStatu(flag);
				  		CMC.alertMessage(message.messageBody, 'info');
				  	}
				});
			}
		});
	});
	
})(jQuery)

$(document).ready(function(){
	getGroupDomesBankGateSwitchOpen();
});
