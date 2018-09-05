function getHyzjOpen(){
		CMC.request({
			method: "POST",
			url: "authorized/hyzj/gethyzjopen",
		  	success: function(result){
		  		$("#hyzj_zh").textbox('setValue',result.messageBody.hyzj_zh);
		  		$("#hyzj_en").textbox('setValue',result.messageBody.hyzj_en);
		  		if(result.messageBody.flag=="N"){
		  			document.getElementById('close').style.display = "none";
		  			document.getElementById('status').innerText = '关闭';
		  		}else if(result.messageBody.flag=="Y"){
		  			document.getElementById('open').style.display = "none";
		  			document.getElementById('status').innerText = '打开';
		  		}
		  	}
		});
	}

(function($){
	
	$('#close').click(function(){
		var act = "open";
		var flag = "N";
		CMC.confirm("确定关闭?", function(r){
			if(r){
				CMC.request({
					method: "POST",
					url: "authorized/hyzj/open",//hyzj.openUrl,
					data: {
						'act':act,
						'flag':flag
					},
				  	success: function(result){
				  		document.getElementById('status').innerText = '关闭';
				  		$("#close" ).css("display", "none"); 
				  		$("#open" ).css("display", "block"); 
//				  		CMC.alertMessage(result.messageBody, 'info',CMC.search);
				  	}
				});
			}
		});
	});
	
	$('#open').click(function(){
		var act = "open";
		var flag = "Y";
		CMC.confirm("确定打开?", function(r){
			if(r){
				CMC.request({
					method: "POST",
					url: "authorized/hyzj/open",//hyzj.openUrl,
					data: {
						'act':act,
						'flag':flag
					},
				  	success: function(result){
				  		document.getElementById('status').innerText = '打开';
				  		$("#open" ).css("display", "none"); 
				  		$("#close" ).css("display", "block"); 
//				  		CMC.alertMessage(result.messageBody, 'info',CMC.search);
				  	}
				});
			}
		});
	});
	
	
	$('#update').click(function(){
		var act = "update";
		var hyzj_zh = $("#hyzj_zh").val();
		var hyzj_en = $("#hyzj_en").val();
		CMC.confirm("确定更新?", function(r){
			if(r){
				CMC.request({
					method: "POST",
					url: "authorized/hyzj/open",//hyzj.openUrl,
					data: {
						'act':act,
						'hyzj_zh':hyzj_zh,
						'hyzj_en':hyzj_en
					},
				  	success: function(result){
				  		CMC.alertMessage(result.messageBody, 'info');
				  	}
				});
			}
		});
	});
	
})(jQuery)

$(document).ready(function(){
	getHyzjOpen();
});

