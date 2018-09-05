
function getpayBeforePnrManageOpen(){
		CMC.request({
			method: "POST",
			url: "authorized/payBeforeAsyncPnrSwitchManage/status",
		  	success: function(message){
		  		console.log(message.messageBody);
		  		var info = message.messageBody;
	 	    	if("1"==info){
	 	    		initStatu("1");	
	 	    	}else{
	 	    		initStatu("0");
	 	    	}
		  	}
		});
	}

function initStatu(flag){
	if("1" == flag){
		$("#payBeforPnr1").prop("checked", "checked");;
	}else{
		$("#payBeforPnr0").prop("checked", "checked");;
	}
}

(function($){
	$('#open').click(function(){
		var val = $("input[name='payBeforPnr']:checked").val();
		if(val==1 || val == "1"){
			var flag = "Y";
			CMC.confirm("确定开启?", function(r){
				if(r){
					CMC.request({
						method: "POST",
						url: "authorized/payBeforeAsyncPnrSwitchManage/operator",
						data: {
							'flag':flag
						},
					  	success: function(message){
					  		initStatu("1");
					  		CMC.alertMessage(message.messageBody, 'info');
					  	}
					});
				}
			});
		}else{
			alert("请选择正确的开关渠道");
		}
	});
	
	$('#close').click(function(){
		var val = $("input[name='payBeforPnr']:checked").val();
		if(val==0 || val == "0"){
			var flag = "N";
			CMC.confirm("确定关闭?", function(r){
				if(r){
					CMC.request({
						method: "POST",
						url: "authorized/payBeforeAsyncPnrSwitchManage/operator",
						data: {
							'flag':flag
						},
					  	success: function(message){
					  		initStatu("0");
					  		CMC.alertMessage(message.messageBody, 'info');
					  	}
					});
				}
			});
		}else{
			alert("请选择正确的开关渠道");
		}
	});
	
})(jQuery)

$(document).ready(function(){
	getpayBeforePnrManageOpen();
});
