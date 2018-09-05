/*弹出新增预警值窗口*/
$("#btn_EarlyWarning").click(function(event) {
	// CMC.dialog('addflightlineDetail','open');
	$('#addflightlineDetail').dialog('open');
	$("#addFlightForm").form('disableValidation');
	$("#flightLineDiv div").each(function(index, el) {
		if(index!=0){
			$(this).remove();
		}
    });    
    $("#earlyWarning").textbox('enable');
    var value=$("#EarlyWarnings").val();
    ind=0;
	$("#fligthTr").show();
	$("#addFlightForm").form('disableValidation');
	var flightlines=value.split(",");
	for (var i=0;i<= flightlines.length - 1; i++) {
		var earlyWarning=flightlines[i].split("-");
		if (i<1) {
			$("#faveValue").textbox('setValue',earlyWarning[0]);
			$("#total").textbox('setValue',earlyWarning[1]);
			$("#num").textbox('setValue',earlyWarning[2]);
			$("#Type").textbox('setValue',earlyWarning[3]);
		}else{
			addFlightLine(earlyWarning[0],earlyWarning[1],earlyWarning[2],earlyWarning[3]);
		}
	}
});


$("#btn_EarlyPerson").click(function(event) {
	$('#addflightDateDetail').dialog('open');
	$('#flightDateDiv div').each(function(index, el) {    	
    	$(this).remove();
    }); 
//	var value=$("#earlyPerson").textbox('getValue');
	var value=$("#earlyPerson").val();
	if (value!='') {
		var dates=value.split("|");
		for (var i=0; i <= dates.length - 1; i++) {
			var date=dates[i].split("-");
			if (i==0) {
				if(date[0]=="empty"){
					$("#warnMoble").textbox('setValue',"");
				}else{
					$("#warnMoble").textbox('setValue',date[0]);
				}
				if(date[1]=="empty"){
					$("#warnMail").textbox('setValue',"");
				}else{
					$("#warnMail").textbox('setValue',date[1]);
				}
			}else{
				if(date[0]=="empty"){
					date[0] = "";
				}
				if(date[1]=="empty"){
					date[1] = "";
				}
				addFlightDate(date[0],date[1]);
			}
			
		}
	}
	$("#addflightDateDetail").dialog('open');
	$("#addFlightDateForm").form('disableValidation');
});


/*新增或者修改提交*/
$("#submit_add").click(function(event) {
	var isValid = $("#addForm").form('enableValidation').form("validate");
	$('#addForm').form('submit',{    
	    url:'/cmc/authorized/inventoryReminding/add',    
	    success:function(data){    
	        CMC.alertMessage($.parseJSON(data).messageBody,'info'); 
	        CMC.search(); 
	        CMC.dialog('addDetail','close');
	        $('#addFlightForm').form('reset');
	        $('#addFlightDateForm').form('reset');
	    },complete:function(){
	    	$('#addFlightForm').form('reset');
	    }    
	});
 
});

