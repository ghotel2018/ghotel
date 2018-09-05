/**
 * 
 */
	var CouponAccount = {
			menuId : "CouponAccount",
			queryAccountUrl : "/authorized/couponAccount/query",
			updateUrl : "/authorized/couponAccount/update"
	};
	var accountValue="";//账号余额
	$(function() {
		$("#valueNum").keyup(function(){
			var valueNum = $("#valueNum").val();
			var pattern = /^[0-9]+$/;
			if(valueNum != ""&& !pattern.test(valueNum)){
				$("#valueNum").parent().find(".error").html("充值金额应为整数！");
			}else{
				$("#valueNum").parent().find(".error").html("");
			}
			
		});
		
		$("#pwd").keyup(function(){
			if($(this).val() != ""){
				$("#pwd").parent().find(".error").html("");
			}
		});
		
		CouponAccount.init = function(){
			CMC.request({
				url: CouponAccount.queryAccountUrl,
				method: "get",
				dataType: "json",
				async: true,
			  	success: function(response){
		  			accountValue = response.messageBody;
		  			accountValue=accountValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
		  			$("#accountValue").text(accountValue);

			  	},
			  	failedRequestHandler: function(response){
			  		$("#accountValue").html('0');
			  		$("#accountValue").parent().find(".error").html("无法获取余额");	
			  	}
			});
		}
		
		
		$('#okBtn').click(function(){
			var valueNum = $("#valueNum").val();
			var values=valueNum.substr(0,1);
			valueNum=valueNum.replace(/[,]/g,"");
			accountValue=accountValue.replace(/[,]/g,"");
			var pwd = $("#pwd").val();
			if(valueNum == ""){
				$("#valueNum").parent().find(".error").html("请输入充值金额！");
			}else if(values==0){
				$("#valueNum").parent().find(".error").html("充值金额不能以0开始");
			}else if(parseInt(valueNum)%5 != 0 || valueNum.length<3 ||valueNum.length>10 ||valueNum<10){
				$("#valueNum").parent().find(".error").html("充值金额应为5的倍数，且不能小于2位数，或大于10位！");
			}else{
			 
				if(pwd == ""){
					$("#pwd").parent().find(".error").html("请输入登录密码！");
				}
				if(valueNum!=""&&pwd!=""&&/^[0-9]+$/.test(valueNum)){
					
					CMC.request({
						url: CouponAccount.updateUrl,
						type: "POST",
						dataType: "json",
						async: true,
						data:{"valueNum":valueNum,"password":pwd,"accountValue":accountValue},
						success: function(){
							CMC.alertMessage('充值成功','info');
							CouponAccount.init();
						}
					});
				}
			}
		})
	});
	
	
	 function outputComma() {
		 var valueNum = $("#valueNum").val();
		 document.getElementById("valueNum").value=valueNum.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	} 
	 
	$(document).ready(function(){
		CMC.init(CouponAccount);
	});