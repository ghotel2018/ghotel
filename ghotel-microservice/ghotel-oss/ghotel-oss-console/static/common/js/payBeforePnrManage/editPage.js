$("#edit_all").click(function(event) {
		$("#editForm input[name='cabinname']").prop('checked', true);
	});

	$("#edit_allNo").click(function(event) {
		// alert('aaaaa');
		$("#editForm input[name='cabinname']").prop('checked',false);
	});

	$("#edit_rever").click(function(event) {
		
		$("#editForm input[name='cabinname']").each(function() {
			$(this).prop('checked',!$(this).prop("checked"));
		});
	});

/*弹出新增航线窗口*/
$("#btn_editflightline").click(function(event) {
	// CMC.dialog('addflightlineDetail','open');
	// $("#edit_flightline").textbox('readonly',false);
	$('#editflightlineDetail').dialog('open');
	$("#editFlightForm").form('disableValidation');
	$('#edit_flightLineDiv div').each(function(index, el) {
    	
    	$(this).remove();
    });       
    $("#edit_flightline").textbox('enable');
    var value=$("#edit_flightline").textbox('getValue');
    if(value!="all"){
    	$("#edit_allFlight").prop("checked",false);
    	$("#edit_lineStart").textbox({required:true});
	    $("#edit_lineEnd").textbox({required:true});
		$("#edit_fligthTr").show();
		$("#editFlightForm").form('disableValidation');
    	var flightlines=value.split("|");
    	for (var i=0;i<= flightlines.length - 1; i++) {
    		var flightline=flightlines[i].split("-");
    		if (i<1) {
    			$("#edit_lineStart").textbox('setValue',flightline[0]);
    			$("#edit_lineEnd").textbox('setValue',flightline[1]);
    		}else{
    			edit_addFlightLine(flightline[0],flightline[1]);
    		}
    	}
    }else{
    	$("#edit_allFlight").prop("checked",true);
    	$("#edit_lineStart").textbox({required:false});
	    $("#edit_lineEnd").textbox({required:false});
		$("#edit_fligthTr").hide();
    }
    // $.parser.parse($('#addflightlineDetail'));
});


/*显示隐藏航班日期输入框*/
$("#editForm input[name='flightflag']").each(function(index, el) {
	
	$(el).click(function(event) {
		// alert($(this).val())
		if ($(this).val()==0) {
			// $(this).siblings('div').remove();
			$("#edit_depTimeLimited").textbox({'disabled':false});
			$("#div_edit_flightDate").hide();
		}else{
			/*$(this).parent("td").append('<div><input class="easyui-textbox"  name="flightdaterange" id="flightdaterange" '
				+' style="width:300px" data-options="required:true"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
				+'<a id="btn_flightDate" href="#" class="easyui-linkbutton" onclick="openFlightDateDetail()">添加</a> <a id="btn_flightDate_clear" href="#" '
				+'class="easyui-linkbutton" onclick="clearFlightDate()">清空</a></div>');*/
			$("#div_edit_flightDate").show();
			$("#edit_depTimeLimited").textbox('setValue','');
			$("#edit_depTimeLimited").textbox({'disabled':true});
			// $("#edit_flightdaterange").textbox('setValue','');
			// $.parser.parse($('#editPage'));
		}
	});

});

/*弹出新增航班日期窗口*/
function editOpenFlightDateDetail(event) {
	$('#edit_flightDateDiv div').each(function(index, el) {    	
    	$(this).remove();
    }); 
    // $("#edit_flightdaterange").textbox('enable');
	var value=$("#edit_flightdaterange").textbox('getValue');
	if (value!='') {

		var dates=value.split("|");
		for (var i=0; i <= dates.length - 1; i++) {
			var date=dates[i].split(",");
			if (i==0) {
				$("#edit_start").datebox('setValue',date[0]);
				$("#edit_end").datebox('setValue',date[1]);
			}else{
				editAddFlightDate(date[0],date[1]);
			}
			
		}
	}else{
		$("#edit_start").datebox('setValue',"");
		$("#edit_end").datebox('setValue',"");
	}
	$("#editflightDateDetail").dialog('open');
	$("#editFlightDateForm").form('disableValidation');
	// CMC.dialog('addflightDateDetail','open');
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

$.extend($.fn.textbox.defaults.rules, {    
    threeCodeValid: {    
        validator: function(value, param){  
        	var regEx=/^[A-Z]{3}$/; 
            return regEx.test(value);    
        },    
        message: '请输入大写机场三字码！'
    }  
});

/*新增或者修改提交*/
$("#submit_edit").click(function(event) {
	$('#editForm').form('submit',{    
	    url:'/cmc/authorized/payBeforePnrManage/update',    
	    onSubmit: function(){

	    	if($("#editForm input[name='cabinname']:checked").size()==0){
	    		CMC.alertMessage('请选择舱位！','info');
	    		return false;
	    	}	
	    	var bool=true;
	    	var limit=$("#edit_depTimeLimited").textbox('getValue');
	    	if (limit!="") {
	    		var regEx=/^(([1-9])|(([1][0-9])|([2][0-4])))$/; 
	    		bool=regEx.test(limit);
	    	}
	    	
	    	regEx=/^[0-9]{1}$/;
	    	var edit_seatnum=$("#edit_seatnum").textbox('getValue');
	    	if (edit_seatnum!='>9'&&!regEx.test(edit_seatnum)) {
	    		CMC.alertMessage('剩余座位数请输入0-9内的数字或">9"！','info');
	    		return false;
	    	}


	    	regEx=/^\d{3,6}$/;
	    	var result=regEx.test($("#edit_paylimited").textbox('getValue'));
	    	/*航班日期验证*/
	    	$("#editForm input[name='flightflag']:checked").each(function(index, el) {
	    		if ($(this).val()==0) {
	    			//移除验证
	    			$("#edit_flightdaterange").textbox({required:false});
	    			$("#edit_depTimeLimited").textbox({required:true})
	    			
	    		}else{
	    			$("#edit_flightdaterange").textbox({required:true});
	    			$("#edit_depTimeLimited").textbox({required:false})
	    		}
	    	});
	    	// $.parser.parse($('#editPage'));
	    	if (bool==false) {
	    		CMC.alertMessage('航班限制小时请输入24内的数字！','info');
	    		return false;
	    	}
	    	if (result==false) {
				CMC.alertMessage('支付时限请输入3-6位的数字！','info');
	    		return false;
	    	}
	        return $(this).form('enableValidation').form("validate");   
	    },    
	    success:function(data){  
	        CMC.alertMessage($.parseJSON(data).messageBody,'info'); 
	        CMC.search(); 
	        CMC.dialog('editDetail','close');
	    }    
	});
 
});

$(document).ready(function($) {

	// $("#edit_flightDate").hide();
});
