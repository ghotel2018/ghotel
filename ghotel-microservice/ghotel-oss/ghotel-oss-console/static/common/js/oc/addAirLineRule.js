/*自定义验证*/
$.extend($.fn.textbox.defaults.rules, {
    threeCodeValid: {
        validator: function (value, param) {
            var regEx = /^[A-Z]{3}$/;
            return regEx.test(value);
        },
        message: '请输入大写机场三字码！'
    },
    numberValid: {
        validator: function (value, param) {
            var regEx = /^[1-9][0-9]{0,2}$/;
            return regEx.test(value);
        },
        message: '请输入三位或三位以下数字！'
    }
});


//小写转大写
$('#depCity').textbox({
    inputEvents:$.extend({},$.fn.textbox.defaults.inputEvents,{
        keyup:function(e){
            this.value = this.value.toUpperCase()
        }
    })
})

$('#arrCity').textbox({
    inputEvents:$.extend({},$.fn.textbox.defaults.inputEvents,{
        keyup:function(e){
            this.value = this.value.toUpperCase()
        }
    })
})

/**
 * 确定设置除外航班
 */
$("#checkIs").click(function(){
	if($("#checkIs").prop('checked')==true){
		var depCity = $("#depCity").textbox('getValue');
        var arrCity = $("#arrCity").textbox('getValue');
        
        var saleDateFrom = $("#saleDateFrom").datebox('getValue');
        var saleDateTo = $("#saleDateTo").datebox('getValue');
        var enableDateFrom = $("#enableDateFrom").datebox('getValue');
        var enableDateTo = $("#enableDateTo").datebox('getValue');
        if (arrCity == '' || depCity == "" || saleDateFrom == "" || saleDateTo == "" || enableDateFrom == "" || enableDateTo == "") {
            CMC.alertMessage("请先完善航线设置信息！");
            return false;
        } 
        if(!threeCodeValid(depCity)||!threeCodeValid(arrCity)){
            CMC.alertMessage("请输入大写机场三字码！");
            return false;
        }
        //航线不可更改
        $("#depCity").textbox('readonly',true);
        $("#arrCity").textbox('readonly',true);
        
		getExceptAll();
		$("#setIsExcept").show();
	}else{
		//航线可更改
		$("#depCity").textbox('readonly',false);
        $("#arrCity").textbox('readonly',false);
        //删除tbExcept的js添加行
        $("#tbExcept tr:first").nextAll().remove();
        $("#except_id").val("");
        //隐藏
		$("#setIsExcept").hide();
	}
});

/**
 * 获取该航线下的所有除外航班
 */
function getExceptAll(){
	var depCity = $("#depCity").textbox('getValue');
    var arrCity = $("#arrCity").textbox('getValue');
	CMC.request({
        url: AirLineRule.getExceptUrl+"/"+depCity+"/"+arrCity,
        method: 'GET',
        success: function (result) {
        	var list=result.messageBody.list;
        	
        	if(list!=""){
        		for(var i=0;i<list.length;i++){
        			var obj=list[i];
                    var deleteFlag="";
                    if(obj['deleteFlag']==0){
                        deleteFlag="未生效";
                    }else if(obj['deleteFlag']==1){
                        deleteFlag="生效";
                    }
        			var fligthNoTr = "<tr>" +
                    "<td>" + ((obj['flightNo']==null)?"":obj['flightNo']) + "</td>" +
                    "<td>" + obj['depCity'] + "</td>" +
                    "<td>" + obj['arrCity'] + "</td>" +
                    "<td>" + ((obj['ocName']==null)?'':obj['ocName']) + "</td>" +
                    "<td>" + obj['saleDateFrom'] + "|" + obj['saleDateTo'] + "</td>" +
                        "<td>" + deleteFlag + "</td>" +
                    "<td>" +
                    "<a href='#' class='easyui-linkbutton' data-options='iconCls:" + '"icon-remove"' + "'  onclick='delFligthNo(" + obj['routeId'] + ")'>删除</a>" +
                    "</td>" +
                    "</tr>";
                    $("#tbExcept").append(fligthNoTr);
                    var except_id=$("#except_id").val();
                    if(except_id!=""){
                    	$("#except_id").val(except_id+","+obj['routeId']);
                    }else{
                    	$("#except_id").val(obj['routeId']);
                    }
                    except_static=false;
        		}
        		 $.parser.parse($('#tbExcept'));
        	}
        }
    });
}


/**
 * 设置除外航班
 */
$("#btn1").click(function () {
    if(!checkAirLineSet("No")){
        return;
    }
    $("#addFlightNoForm").form('disableValidation');
    $('#addExceptDetail').dialog('open');
});

/**
 * 检查航线设置
 * @param flag
 */
function checkAirLineSet(flag) {
        var depCity = $("#depCity").textbox('getValue');
        var arrCity = $("#arrCity").textbox('getValue');
        if(!threeCodeValid(depCity)||!threeCodeValid(arrCity)){
            CMC.alertMessage("请输入大写机场三字码！");
            return false;
        }
        var saleDateFrom = $("#saleDateFrom").datebox('getValue');
        var saleDateTo = $("#saleDateTo").datebox('getValue');
        var enableDateFrom = $("#enableDateFrom").datebox('getValue');
        var enableDateTo = $("#enableDateTo").datebox('getValue');
        if (arrCity == '' || depCity == "" || saleDateFrom == "" || saleDateTo == "" || enableDateFrom == "" || enableDateTo == "") {
            CMC.alertMessage("请先完善航线设置信息！");
            return false;
        } else if (flag == "No") {
            $("#addForm_depCity").val(depCity);
            $("#addForm_arrCity").val(arrCity);
            $("#addForm_saleDateFrom").val(saleDateFrom);
            $("#addForm_saleDateTo").val(saleDateTo);
            $("#fligthNo_enableDateFrom").datebox('setValue', enableDateFrom);
            $("#fligthNo_enableDateTo").datebox('setValue', enableDateTo);
        } else if (flag == "OC") {
            $("#addOCForm_depCity").val(depCity);
            $("#addOCForm_arrCity").val(arrCity);
            $("#addOCForm_saleDateFrom").val(saleDateFrom);
            $("#addOCForm_saleDateTo").val(saleDateTo);
            $("#oc_fligthNo_enableDateFrom").datebox('setValue', enableDateFrom);
            $("#oc_fligthNo_enableDateTo").datebox('setValue', enableDateTo);
        }
        return true;
}

/**
 * 共用添加除外航班到数据库
 * @param flag
 */
function combinationExceptFlight(flag) {
    // $('#addDetail').dialog(
    //     'resize',{width: 600,height: 400}
    // );
    var isValid;
    var data;
    var height;
    if (flag=="No"){
        isValid = $("#addFlightNoForm").form('enableValidation').form("validate");
        data=$("#addFlightNoForm").form().serialize();
    }else if(flag=="OC"){
        isValid = $("#addOCFlightForm").form('enableValidation').form("validate");
        data=$("#addOCFlightForm").form().serialize();
    }
    if (isValid) {
        CMC.request({
            url: AirLineRule.insertExceptFligthNoUrl,
            method: 'POST',
            data: data,
            success: function (result) {
//              CMC.alertMessage(result.messageBody, 'info');
                // CMC.dialog('PayBeforePnrManageSwitchDetail','close');
                // alert(result.statusCode);
                if (result.statusCode == 0) {
                    var obj = result.messageBody.bean;
                    var deleteFlag="";
                    if(obj['deleteFlag']==0){
                        deleteFlag="未生效";
                    }else if(obj['deleteFlag']==1){
                        deleteFlag="生效";
                    }
                    var fligthNoTr = "<tr>" +
                        "<td>" + ((obj['flightNo']==null)?"":obj['flightNo']) + "</td>" +
                        "<td>" + obj['depCity'] + "</td>" +
                        "<td>" + obj['arrCity'] + "</td>" +
                        "<td>" + ((obj['ocName']==null)?'':obj['ocName']) + "</td>" +
                        "<td>" + obj['enableDateFrom'] + "|" + obj['enableDateTo'] + "</td>" +
                        "<td>" + deleteFlag + "</td>" +
                        "<td>" +
                        "<a href='#' class='easyui-linkbutton' data-options='iconCls:" + '"icon-remove"' + "'  onclick='delFligthNo(" + obj['routeId'] + ")'>删除</a>" +
                        "</td>" +
                        "</tr>";
                    $("#tbExcept").append(fligthNoTr);
                    var except_id=$("#except_id").val();
                    if(except_id!=""){
                    	$("#except_id").val(except_id+","+obj['routeId']);
                    }else{
                    	$("#except_id").val(obj['routeId']);
                    }
                    // $("#addAirLineForm").form('disableValidation');
                    except_static=false;
//                  if(height_static==0){
//                  	height_static=30;
//                  }else{
//                  	height_static+=20;
//                  }
//					$("#addDetail").dialog('resize',{850,(460+height_static)});
//                  $("#addDetail").dialog('center');
                    $.parser.parse($('#tbExcept'));
                    
                }
            }
        });

    }
}

/**
 * 打开OC方除外航班
 */
$("#btn2").click(function () {
    if(!checkAirLineSet("OC")){
        return;
    }
    CMC.request({
        url: AirLineRule.ocListUrl,
        method: 'GET',
        success: function (result) {
            $("#ocId").combobox({
                data: result.messageBody.ocInfoList,
                panelHeight: '120px',
                valueField:'id',
                textField:'name'
            });
            $("#addOCFlightForm").form('disableValidation');
            $('#addOCExceptDetail').dialog('open');
        }
    });

});

/**
 * 删除一项除外航班
 * @param {Object} routeId
 */
function delFligthNo(routeId) {
    if(routeId!=""){
    	CMC.request({
            url: AirLineRule.delExceptUrl+"/"+routeId,
            method: 'GET',
            success: function(result){
            	if(result.statusCode==0){
            		//删除tbExcept的js添加行
        			$("#tbExcept tr:first").nextAll().remove();
            		$("#except_id").val("");
            		getExceptAll();
            	}
            	
            }
        });
    }
}

/**
 * 使除外生效
 */
$("#effective").click(function(){
	var except_id=$("#except_id").val();
	if(except_id!=""){
		CMC.request({
            url: AirLineRule.updateExceptUrl+"/"+except_id,
            method: 'GET',
            success: function(result){
                //删除tbExcept的js添加行
                $("#tbExcept tr:first").nextAll().remove();
                $("#except_id").val("");
                getExceptAll();
            	CMC.alertMessage(result.messageBody,"info");
            }
        });
	}
});

/**
 * 三字码校验
 * @param value
 * @returns {boolean}
 */
function threeCodeValid(value) {
    var regEx = /^[A-Z]{3}$/;
    return regEx.test(value);
}