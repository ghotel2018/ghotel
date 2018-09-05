
function sendInfo(){
	$('#results').text("");
	var url = $('#url').val();
	var type = $('#type').combobox('getValue');
	var params = $('#parameter').val();
	CMC.request({
		method: "POST",
		url: "authorized/transpond/sendInfo",
		data: {'url':url,'type':type,'params':params},
		success: function(message){
			var infos =  message.messageBody;
			$('#results').text(infos);
			$('#results').textbox('setValue',infos);
		},
		error: function(){
            CMC.hideProcessBox();
            CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');

        }
	});
}


