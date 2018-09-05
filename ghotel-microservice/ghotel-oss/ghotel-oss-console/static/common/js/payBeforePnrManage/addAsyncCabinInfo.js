$("#all").click(function(event) {
		$("#addForm input[name='cabinname']").prop('checked', true);
	});

	$("#allNo").click(function(event) {
		// alert('aaaaa');
		$("#addForm input[name='cabinname']").prop('checked',false);
	});

	$("#rever").click(function(event) {
		
		$("#addForm input[name='cabinname']").each(function() {
			$(this).prop('checked',!$(this).prop("checked"));
		});
	});

/*弹出新增航线窗口*/
$("#btn_flightline").click(function(event) {
	// CMC.dialog('addflightlineDetail','open');
	$('#addflightlineDetail').dialog('open');
	$("#addFlightForm").form('disableValidation');
	$('#flightLineDiv div').each(function(index, el) {
    	
    	$(this).remove();
    });       
    $("#flightline").textbox('enable');
    var value=$("#flightline").textbox('getValue');
    if(value!="all"){
    	$("#allFlight").prop("checked",false);
    	$("#lineStart").textbox({required:true});
	    $("#lineEnd").textbox({required:true});
		$("#fligthTr").show();
		$("#addFlightForm").form('disableValidation');
    	var flightlines=value.split("|");
    	for (var i=0;i<= flightlines.length - 1; i++) {
    		var flightline=flightlines[i].split("-");
    		if (i<1) {
    			$("#lineStart").textbox('setValue',flightline[0]);
    			$("#lineEnd").textbox('setValue',flightline[1]);
    		}else{
    			addFlightLine(flightline[0],flightline[1]);
    		}
    	}
    }else{
    	$("#allFlight").prop("checked",true);
    	$("#allFlight").prop('checked','checked');
    	$("#lineStart").textbox({required:false});
	    $("#lineEnd").textbox({required:false});
		$("#fligthTr").hide();
    }
    // $.parser.parse($('#addflightlineDetail'));
});


/*显示隐藏航班日期输入框*/
$("#addForm input[name='flightflag']").each(function(index, el) {
	
	$(el).click(function(event) {
		if ($(this).val()==0) {
			// $(this).siblings('div').remove();
			$("#depTimeLimited").textbox({'disabled':false});
			// $("#depTimeLimited").textbox({'required':true});
			// $("#flightdaterange").textbox({'required':false});
			$("#edit_flightDate").hide();
		}else{
			/*$(this).parent("td").append('<div><input class="easyui-textbox"  name="flightdaterange" id="flightdaterange" '
				+' style="width:300px" data-options="required:true"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
				+'<a id="btn_flightDate" href="#" class="easyui-linkbutton" onclick="openFlightDateDetail()">添加</a> <a id="btn_flightDate_clear" href="#" '
				+'class="easyui-linkbutton" onclick="clearFlightDate()">清空</a></div>');*/
			$("#edit_flightDate").show();
			$("#depTimeLimited").textbox('setValue','');
			// $("#flightdaterange").textbox({'required':true});
			// $("#depTimeLimited").textbox({'required':false});
			$("#depTimeLimited").textbox({'disabled':true});
			// $("#flightdaterange").textbox('setValue','');
			// $.parser.parse($('#editPage'));
		}
	});
	$.parser.parse($('#addPage'));
	$("#addForm").form('disableValidation');
});

/*弹出新增航班日期窗口*/
function openFlightDateDetail(event) {
	$('#flightDateDiv div').each(function(index, el) {    	
    	$(this).remove();
    }); 
    $("#flightdaterange").textbox('enable');
	var value=$("#flightdaterange").textbox('getValue');
	if (value!='') {

		var dates=value.split("|");
		for (var i=0; i <= dates.length - 1; i++) {
			var date=dates[i].split(",");
			if (i==0) {
				$("#start").datebox('setValue',date[0]);
				$("#end").datebox('setValue',date[1]);
			}else{
				addFlightDate(date[0],date[1]);
			}
			
		}
	}else{
		$("#start").datebox('setValue',"");
		$("#end").datebox('setValue',"");
	}
	$("#addflightDateDetail").dialog('open');
	$("#addFlightDateForm").form('disableValidation');
	// CMC.dialog('addflightDateDetail','open');
};

$("#allFlight").click(function(event) {
	if ($("#fligthTr").is(":hidden")) {
		$("#lineStart").textbox({required:true});
	    $("#lineEnd").textbox({required:true});
		$("#fligthTr").show();
		$("#addFlightForm").form('disableValidation');
	}else{
		
		$('#flightLineDiv div').each(function(index, el) {    	
	    	$(this).remove();
	    }); 
	    $("#lineStart").textbox({required:false});
	    $("#lineEnd").textbox({required:false});
		$("#fligthTr").hide();
	}
});

// $("#allFlight").toggle(
// 	 function () {
// 		$("#fligthTr").hide();
// 	  },
// 	  function () {
// 	    $("#fligthTr").show();
// 	  }
// );

$.extend($.fn.textbox.defaults.rules, {    
    threeCodeValid: {    
        validator: function(value, param){  
        	var regEx=/^[A-Z]{3}$/; 
        	if(value=="*")
        		return true;
            return regEx.test(value);    
        },    
        message: '请输入大写机场三字码！'
    }  
});

/*新增或者修改提交*/
$("#submit_add").click(function(event) {
	if($("#addForm input[name='cabinname']:checked").size()==0){
		CMC.alertMessage('请选择舱位！','info');
		return false;
	}	
	var bool=true;
	var limit=$("#depTimeLimited").textbox('getValue');
	
	if (limit!="") {
		var regEx=/^(([1-9])|(([1][0-9])|([2][0-4])))$/; 
		bool=regEx.test(limit);
	}
	
	regEx=/^[0-9]{1}$/;
	var edit_seatnum=$("#seatnum").textbox('getValue');
	if (!regEx.test(edit_seatnum) || edit_seatnum>9) {
		CMC.alertMessage('剩余座位数请输入不大于9的数字！','info');
		return false;
	}

	regEx=/^\d{3,6}$/;
	var result=regEx.test($("#paylimited").textbox('getValue'));

	$("#addForm input[name='flightflag']:checked").each(function(index, el) {
		if ($(this).val()==0) {
			//移除验证
			$("#flightdaterange").textbox({required:false});
			$("#depTimeLimited").textbox({required:true})
			
		}else{
			$("#flightdaterange").textbox({required:true});
			$("#depTimeLimited").textbox({required:false})
		}
	});
	// $.parser.parse($('#addPage'));
	if (bool==false) {
		CMC.alertMessage('航班限制小时请输入24内的数字！','info');
		return false;
	}
	if (result==false) {
		CMC.alertMessage('支付时限请输入3-6位的数字！','info');
		return false;
	}
    var bool = $(this).form('enableValidation').form("validate"); 
    console.log(bool);
    CMC.request({
		url: "/cmc/authorized/payBeforeAsyncPnrManage/add",
		method: 'POST',
		data :$("#addForm").form().serialize(),
		success: function(result){
			CMC.alertMessage(result.messageBody,'info');
			CMC.search();
			CMC.dialog('editDetail','close');

		}
	});
});

$(document).ready(function($) {

	// $("#edit_flightDate").hide();
});

