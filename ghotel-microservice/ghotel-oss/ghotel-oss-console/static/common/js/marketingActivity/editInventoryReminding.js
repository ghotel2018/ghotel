/*弹出新增预警值窗口*/
$("#btn_editEarlyWarning").click(function(event) {
	$('#editflightlineDetail').dialog('open');
	$("#editFlightForm").form('disableValidation');
	$('#edit_flightLineDiv div').each(function(index, el) {
		$(this).remove();
    }); 
    var value = $("#edit_EarlyWarning").val();
    
    if(value!=''){
    	var earlyWarning = value.split("-");
    	$("#edit_totals").textbox('setValue',earlyWarning[0]);
    	$("#edit_nums").textbox('setValue',earlyWarning[1]);
    	$('#edit_Types').combobox('setValue',earlyWarning[2]);
    	edind=0;
    }else{
    	$("#edit_totals").textbox('setValue',"");
    	$("#edit_nums").textbox('setValue',"");
    	$('#edit_Types').combobox('setValue',"");
    }
    
    
    var values = $("#edit_EarlyWarnings").val();
    if(value!=''){
    	$("#edit_fligthTr").show();
    	$("#editFlightForm").form('disableValidation');
    	var flightlines=values.split(",");
    	for (var i=0;i<= flightlines.length - 1; i++) {
    		var flightline=flightlines[i].split("-");
    		if (i<1) {
    			$("#edit_faveValue").textbox('setValue',flightline[0]);
    			$("#edit_total").textbox('setValue',flightline[1]);
    			$("#edit_num").textbox('setValue',flightline[2]);
    			$("#edit_type0").combobox('setValue',flightline[3]);
    		}else{
    			edit_addFlightLine(flightline[0],flightline[1],flightline[2],flightline[3]);
    		}
    	}
    }else{
    	$("#edit_faveValue").textbox('setValue',"");
		$("#edit_total").textbox('setValue',"");
		$("#edit_num").textbox('setValue',"");
		$("#edit_type0").combobox('setValue',"");
	}
});


/*弹出新增预警人员窗口*/
function editOpenFlightDateDetail(event) {
	
	$('#edit_flightDateDiv div').each(function(index, el) {    	
    	$(this).remove();
    }); 
	var value=$("#edit_earlyPerson").val();
	if (value!='') {

		var dates=value.split("|");
		for (var i=0; i <= dates.length - 1; i++) {
			var date=dates[i].split(",");
			
			if (i==0) {
//				$("#edit_warnMoble").textbox('setValue',date[0]);
				if(date[0]=="null" || date[0]=="-"){
					$("#edit_warnMoble").textbox('setValue',"");
				}else{
					$("#edit_warnMoble").textbox('setValue',date[0]);
				}
				if(date[1]=="null" || date[1]=="-"){
					$("#edit_warnMail").textbox('setValue',"");
				}else{
					$("#edit_warnMail").textbox('setValue',date[1]);
				}
			}else{
				if(date[0]=="null" || date[0]=="-"){
					date[0] = "";
				}
				if(date[1]=="null" || date[1]=="-"){
					date[1] = "";
				}
				editAddFlightDate(date[0],date[1]);
			}
			
		}
	}else{
		$("#edit_warnMoble").textbox('setValue',"");
		$("#edit_warnMail").textbox('setValue',"");
	}
	$("#editflightDateDetail").dialog('open');
	$("#editFlightDateForm").form('disableValidation');
};

$("#edit_allFlight").click(function(event) {
	if ($("#edit_fligthTr").is(":hidden")) {
		$("#edit_lineStart").textbox({required:true});
	    $("#edit_lineEnd").textbox({required:true});
		$("#edit_fligthTr").show();
		$("#editFlightForm").form('disableValidation');
	}else{
		
		$('#edit_flightLineDiv div').each(function(index, el) {    	
	    	$(this).remove();
	    }); 
	    $("#edit_lineStart").textbox({required:false});
	    $("#edit_lineEnd").textbox({required:false});
		$("#edit_fligthTr").hide();
	}
});


/*新增或者修改提交*/
$("#submit_edit").click(function(event) {
	$('#editForm').form('submit',{    
	    url:'/cmc/authorized/inventoryReminding/update',    
	    success:function(data){  
	        CMC.alertMessage($.parseJSON(data).messageBody,'info'); 
//	    	CMC.alertMessage(result.messageBody, 'info',CMC.search);
	        CMC.search(); 
	        CMC.dialog('editDetail','close');
	        $('#editFlightDateForm').form('reset');
	        $('#editFlightForm').form('reset');
	    }    
	});
 
});

$(document).ready(function($) {

});
