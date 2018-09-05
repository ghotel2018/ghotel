/**
 * 先决支付条件管理
 */

var PayBeforePnrManage={
    searchTableRequired: true,
    menuId: "PayBeforePnrManage",
    addUrl: 'authorized/payBeforePnrManage/add',
    updateUrl: 'authorized/payBeforePnrManage/update',
    deleteUrl: 'authorized/payBeforePnrManage/delete',
    searchUrl: "authorized/payBeforePnrManage/getAll" ,
    getSwitchUrl: "authorized/payBeforePnrManage/getSwitch",
    changeSwitchUrl:"authorized/payBeforePnrManage/changeSwitch",
    importUrl:"authorized/payBeforePnrManage/import",
    columns:[[
        {field: 'cabinname', title:'舱位' , width: '25%' , align: 'center'},
        {field: 'flightline', title:'航线' , width: '15%' , align: 'center'},
        {field: 'flightdaterange', title:'航班日期' , width: '25%' , align: 'center'},
        {field: 'deptimelimited', title:'起飞时间限制' , width: '8%' , align: 'center'},
        {field: 'seatnum', title:'剩余座位数' , width: '8%' , align: 'center'},
        {field: 'paylimited', title:'支付时限（秒）' , width: '15%' , align: 'center'},

    ]],
    onDblClickRow: function(){
        // $("#payBeforePnrManage_update").click();
    }
};


(function($){

    $("#payBeforePnrManage_add").click(function(event) {
        $('#addDetail').dialog({    
            title: '新增舱位限制',    
            width: 550,    
            height: 340,    
            closed: false,
            resizable:true,    
            cache: false,    
            href: '/cmc/module/payBeforePnrManage/addCabinInfo.html',    
            modal: true,
            onLoad:function(){
                 // $.parser.parse($('#editPage'));
                $('#editForm').form('reset');
                 $("input[name='flightflag']").each(function(index, el) {
                    if (index==0) {
                        $(this).attr('checked','checked');
                        $("#edit_flightDate").hide();
                        $("#depTimeLimited").prop('disabled',false);
                    }
                });
                // $("#flightdaterange").textbox('disable');
                // $("#flightdaterange").textbox('enable');
                // $("#flightline").textbox('disable');
                // $("#flightline").textbox('enable');
                  $('#addForm').form('disableValidation');
                  // 
            }  
        });

        // $('#editForm').form('clear');
        // $("input[name='cabinname']").each(function(index, el) {
                    
        //     $(el).attr("checked",false); 
        // });
        // $("#seatnum").textbox('setValue','');
        // $("#paylimited").textbox('setValue','');
        // $("#flightline").textbox('setValue','');
        // $("input[name='flightflag']").each(function(index, el) {
        //     if (index==0) {
        //         $(el).attr('checked','checked');
        //         $("#edit_flightDate").hide();
        //         $("#depTimeLimited").prop('disabled',false);
        //     }
        // });
        // $("#flightdaterange").textbox('setValue','');
        // CMC.dialog('addPayBeforePnrManageDetail','open');
    });
	$("#payBeforePnrManage_reset").click(function(event) {
		$("#searchForm").form('clear');
		$("#funType").val('1');
		$("#searchForm [name='start']").val('1');
		$("#searchForm [name='end']").val('10');
	});
    $("#payBeforePnrManage_update").click(function(event) {
        var code = CMC.grid.datagrid("getSelected");
        if(!code){
            CMC.alertMessage("请先选中一条记录！","warning");
            return;
        }
         $('#editDetail').dialog({    
            title: '编辑舱位限制',    
            width: 550,    
            height: 340,    
            closed: false,
            resizable:true,    
            cache: false, 
            queryParams: code,   
            href: '/cmc/module/payBeforePnrManage/editPage.html',    
            modal: true,
            onLoad:function(){
                // var obj = $('#addDetail').dialog('options');
                // alert(obj);
                var uuid=code['uuid'];
                var cabinname=code['cabinname'];
                var flightline=code['flightline'];
                var uuid=code['uuid'];
                var flightdaterange=code['flightdaterange'];
                var deptimelimited=code['deptimelimited'];
                var seatnum=code['seatnum'];
                var paylimited=code['paylimited'];

                $('#uuid').val(uuid);
                $("input[name='cabinname']").each(function(index, el) {
                    // alert($(el).val())
                    if (cabinname.indexOf($(el).val())>-1) { 
                        $(el).attr("checked",'checked'); 
                    } 
                });
                $("#edit_seatnum").textbox('setValue',seatnum);
                $("#edit_paylimited").textbox('setValue',paylimited);
                $("#edit_flightline").textbox('setValue',flightline);
                $("input[name='flightflag']").each(function(index, el) {
                    if (deptimelimited==0&&index!=0) {
                        $("#div_edit_flightDate").show();
                        $("#edit_depTimeLimited").textbox({'disabled':true});
                        $(el).attr('checked','checked');
                    }
                    if (deptimelimited!=0&&index==0) {
                        $("#edit_depTimeLimited").textbox('setValue',deptimelimited);
                        $(el).attr('checked','checked');
                        $("#div_edit_flightDate").hide();
                        $("#edit_depTimeLimited").textbox({'disabled':false});
                    }
                });
                $("#edit_flightdaterange").textbox('setValue',flightdaterange);
                // $("#btn_flightline").linkbutton({text:'编辑'});
                // $("#btn_flightDate").linkbutton({text:'编辑'});
                // $("#flightdaterange").textbox('disable');
                // $("#flightdaterange").textbox('enable');
                // $("#flightline").textbox('disable');
                // $("#flightline").textbox('enable');
                $('#editForm').form('disableValidation');
            }
        });
    });
})(jQuery);

$(document).ready(function () {
    CMC.init(PayBeforePnrManage);
});

/*动态添加航线文本框*/
function addFlightLine(bf,af){
    bf = !bf?"":bf;
    af = !af?"":af;
    var sb = '<div><input type="text" class="easyui-textbox" data-options="validType:'+"'threeCodeValid'"+'" required ="required" size="10" value="'+bf+'"/>&nbsp;-&nbsp;' +
            '<input type="text" class="easyui-textbox" data-options="validType:'+"'threeCodeValid'"+'" required ="required" size="10" value="'+af+'"/>&nbsp;'+
            '&nbsp;<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'+"'icon-remove'"+'" onclick="removeFlightObj(this)" title="删除"></a>&nbsp;</div>';
    $("#flightLineDiv").append($(sb));
    $.parser.parse($('#addflightlineDetail'));
    $("#addFlightForm").form('disableValidation');
}

function removeFlightObj(event){
    $(event).parent("div").remove();
}

function combinationFlight(event){
    var size=$("#allFlight:checked").size();
    if(size==1){
        $("#flightline").textbox('setValue',"all");
        // $("#flightline").textbox('disable');
        $("#addflightlineDetail").dialog('close');
    }else{
        var isValid = $("#addFlightForm").form('enableValidation').form("validate");
        if (isValid) {
            var flight="";
            var flightLineArr=[];
            var flightline="";
            var bool=false;
            $("#flightLineDiv input[class='easyui-textbox textbox-f']").each(function(index, el) {
                
                if (index%2==0) {
                    if ($(el).val()!="") {
                        flightline=$(el).val()+"-";
                        flight=flight+$(el).val()+"-";
                    }
                    
                }else{
                    if ($(el).val()!="") {
                        var start_flight=flightline.substring(0,flightline.length-1);
                        if (start_flight==$(el).val()) {
                            bool=true;
                            return;
                        }
                        flightline=flightline+$(el).val();
                        flight=flight+$(el).val()+"|";
                        flightLineArr.push(flightline);
                        flightline="";
                    } 
                }   
            }); 

            if(bool){            
                CMC.alertMessage('航线起终点不能是一个机场！','info');
                return;
            }
            for (var i = 0; i < flightLineArr.length; i++) {
                for (var j = i+1; j < flightLineArr.length; j++) {
                   if(flightLineArr[i]==flightLineArr[j]){
                      CMC.alertMessage('航线有重复！','info');
                      return;
                   }
                }
            }
            $("#flightline").textbox('setValue',flight.slice(0, flight.length-1));
            // $("#flightline").textbox('disable');
            $("#addflightlineDetail").dialog('close');
        }
    }
}

function addFlightDate(bf,af){
    bf = !bf?"":bf;
    af = !af?"":af;
    var size=$("#flightDateDiv div").size();
    var sb = '<div id="div_'+size+'"><input type="text" class= "easyui-datebox" id="start_'+size+'" validtype="dateCompareLE['+"'#end_"+size+"'"+']" required ="required" style="width: 120px;"/>&nbsp;-&nbsp;' +
            '<input type="text" class= "easyui-datebox" id="end_'+size+'" validtype="dateCompareGE['+"'#start_"+size+"'"+']" required ="required" style="width: 120px;"/>&nbsp;'
            +'<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'+"'icon-remove'"+'" onclick="removeFlightDateObj(this)" title="删除"></a>&nbsp;</div>';
    $("#flightDateDiv").append($(sb));
    $.parser.parse($('#div_'+size+''));
    $("#start_"+size+"").datebox('setValue',bf);
    $("#end_"+size+"").datebox('setValue',af);
    $("#addFlightDateForm").form('disableValidation');
}

function removeFlightDateObj(event){
    $(event).parent("div").remove();
}

function combinationFlightDate(){
     var isValid = $("#addFlightDateForm").form('enableValidation').form("validate");
    if (isValid) {
        var flightDate='';
        var startDateArr=[];
        var endDateArr=[];
        var bval = 0;
        $("#flightDateDiv input[class='textbox-value']").each(function(index, el) {
            if (index%2==0) {
                startDateArr.push($(el).val());
                if(bval==0 && $(el).val()!=""){
                	flightDate = $(el).val();
                }else if($(el).val()!=""){
                	flightDate = flightDate+"|"+$(el).val();
                }
                bval = 1;
            }else{
                endDateArr.push($(el).val());
                if(flightDate=='' && $(el).val()!=""){
                	flightDate= $(el).val()
                }else if($(el).val()!=""){
                	flightDate = flightDate+","+$(el).val();
                }
            }
        });
        // startDateArr=startDateArr.sort();
        // endDateArr=endDateArr.sort();
        console.log(flightDate);
        for (var i = 0; i < startDateArr.length; i++) {
            var date1_start = new Date(startDateArr[i]);
            var date1_end = new Date(endDateArr[i]);
            for (var j = i+1; j < endDateArr.length; j++) {
                var date2_start = new Date(startDateArr[j]);
                var date2_end = new Date(endDateArr[j]);
                if ((date1_start.getTime()<date2_start.getTime()&&date2_start.getTime()<date1_end.getTime())
                    ||(date1_start.getTime()>date2_start.getTime()&&date1_start.getTime()<date2_end.getTime())||
                    (date1_start.getTime()==date2_start.getTime())||(date1_end.getTime()==date2_end.getTime())) {
                    CMC.alertMessage('日期有重复！','info');
                    return;
                }
            }
        }//.substring(0,flightDate.length-1)
        $("#flightdaterange").textbox('setValue',flightDate);
        // $("#flightdaterange").textbox('disable');
        $("#addflightDateDetail").dialog('close');
    }
}


/*                  编辑修改页面                              */

/*动态添加航线文本框*/
function edit_addFlightLine(bf,af){
    bf = !bf?"":bf;
    af = !af?"":af;
    var sb = '<div><input type="text" class="easyui-textbox" data-options="validType:'+"'threeCodeValid'"+'" required ="required" size="10" value="'+bf+'"/>&nbsp;-&nbsp;' +
            '<input type="text" class="easyui-textbox" data-options="validType:'+"'threeCodeValid'"+'" required ="required" size="10" value="'+af+'"/>&nbsp;'+
            '&nbsp;<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'+"'icon-remove'"+'" onclick="removeFlightDateObj(this)" title="删除"></a>&nbsp;</div>';
    $("#edit_flightLineDiv").append($(sb));
    $.parser.parse($('#editflightlineDetail'));
    $("#editFlightForm").form('disableValidation');
}

function removeFlightObj(event){
    $(event).parent("div").remove();
}

function editCombinationFlight(event){
     var size=$("#edit_allFlight:checked").size();
    if(size==1){
        $("#edit_flightline").textbox('setValue',"all");
        // $("#flightline").textbox('disable');
        $("#editflightlineDetail").dialog('close');
    }else{
        var isValid = $("#editFlightForm").form('enableValidation').form("validate");
        if (isValid) {
            var flight="";
            var flightLineArr=[];
            var flightline="";
            var bool=false;
            $("#edit_flightLineDiv input[class='easyui-textbox textbox-f']").each(function(index, el) {
                
                if (index%2==0) {
                    if ($(el).val()!="") {
                        flightline=$(el).val()+"-";
                        flight=flight+$(el).val()+"-";
                    }
                }else{
                    if ($(el).val()!="") {
                        var start_flight=flightline.substring(0,flightline.length-1);
                        if (start_flight==$(el).val()) {
                            bool=true;
                            return;
                        }
                        flightline=flightline+$(el).val();
                        flight=flight+$(el).val()+"|";
                        flightLineArr.push(flightline);
                        flightline="";
                    }  
                }  
            }); 

            if(bool){            
                CMC.alertMessage('航线起终点不能是一个机场！','info');
                return;
            }
            for (var i = 0; i < flightLineArr.length; i++) {
                for (var j = i+1; j < flightLineArr.length; j++) {
                   if(flightLineArr[i]==flightLineArr[j]){
                      CMC.alertMessage('航线有重复！','info');
                      return;
                   }
                }
            }
            // $("#edit_flightline").textbox('readonly',false);
            $("#edit_flightline").textbox('setValue',flight.slice(0, flight.length-1));
            // $("#flightline").textbox('disable');
            $("#editflightlineDetail").dialog('close');
        }
    }
}

function editAddFlightDate(bf,af){
    bf = !bf?"":bf;
    af = !af?"":af;
    var size=$("#edit_flightDateDiv div").size();
    var sb = '<div id="div_edit'+size+'"><input type="text" class= "easyui-datebox" id="edit_start_'+size+'" validtype="dateCompareLE['+"'#edit_end_"+size+"'"+']" required ="required" style="width: 120px;"/>&nbsp;-&nbsp;' +
            '<input type="text" class= "easyui-datebox" id="edit_end_'+size+'" validtype="dateCompareGE['+"'#edit_start_"+size+"'"+']" required ="required" style="width: 120px;"/>&nbsp;'
            +'<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'+"'icon-remove'"+'" onclick="edit_removeFlightDateObj(this)" title="删除"></a>&nbsp;</div>';
    $("#edit_flightDateDiv").append($(sb));
    $.parser.parse($('#div_edit'+size+''));
    $("#edit_start_"+size+"").datebox('setValue',bf);
    $("#edit_end_"+size+"").datebox('setValue',af);
    $("#editFlightDateForm").form('disableValidation');
}

function edit_removeFlightDateObj(event){
    $(event).parent("div").remove();
}

function editCombinationFlightDate(){
     var isValid = $("#editFlightDateForm").form('enableValidation').form("validate");
    if (isValid) {
        var flightDate='';
        var startDateArr=[];
        var endDateArr=[];
        var bval = 0;
        $("#edit_flightDateDiv input[class='textbox-value']").each(function(index, el) {
        	if (index%2==0) {
                startDateArr.push($(el).val());
                if(bval==0 && $(el).val()!=""){
                	flightDate = $(el).val();
                }else if($(el).val()!=""){
                	flightDate = flightDate+"|"+$(el).val();
                }
                bval = 1;
            }else{
                endDateArr.push($(el).val());
                if(flightDate=='' && $(el).val()!=""){
                	flightDate= $(el).val()
                }else if($(el).val()!=""){
                	flightDate = flightDate+","+$(el).val();
                }
            }
        });
        // startDateArr=startDateArr.sort();
        // endDateArr=endDateArr.sort();
        for (var i = 0; i < startDateArr.length; i++) {
            var date1_start = new Date(startDateArr[i]);
            var date1_end = new Date(endDateArr[i]);
            for (var j = i+1; j < endDateArr.length; j++) {
                var date2_start = new Date(startDateArr[j]);
                var date2_end = new Date(endDateArr[j]);
                if ((date1_start.getTime()<date2_start.getTime()&&date2_start.getTime()<date1_end.getTime())||
                    (date1_start.getTime()>date2_start.getTime()&&date1_start.getTime()<date2_end.getTime())||
                    (date1_start.getTime()==date2_start.getTime())||(date1_end.getTime()==date2_end.getTime())){
                    CMC.alertMessage('日期有重复！','info');
                    return;
                }
            }
        }
	console.log(flightDate);
        $("#edit_flightdaterange").textbox('setValue',flightDate);
        // $("#edit_flightdaterange").textbox('disable');
        $("#editflightDateDetail").dialog('close');
    }
}


// function validateFlightLine(id){
//     alert('qqqq');
//     var flightLines=$('#"'+id+'"').textbox('getValue');

//     var regEx=/^[A-Z]{3}$/; 
//             return regEx.test(value); 
// }

$("#payBeforePnrManage_delete").click(function(event) {
     var code = CMC.grid.datagrid("getSelected");
    if(!code){
        CMC.alertMessage("请先选中一条记录！","warning");
        return;
    }
    CMC.confirm("确定删除?", function(r){
      if(r){
            CMC.request({
                url: PayBeforePnrManage.deleteUrl+"/"+code['uuid'],
                method: 'GET',
                success: function(result){
                    CMC.alertMessage(result.messageBody,'info');
                    CMC.search();
                }
            });
        }
    });
});

/*打开先支付开关管理窗口*/
$("#PayBeforePnrManage_switch").click(function(event) {
     CMC.request({
        url: PayBeforePnrManage.getSwitchUrl,
        method: 'GET',
        success: function(result){
           $("input[name='propertyvalue']").each(function(index, el) {
               if($(this).val()==result.messageBody){
                    $(this).prop({
                        'checked': 'checked'
                    })
               }
           });
        }
    });
    CMC.dialog('PayBeforePnrManageSwitchDetail','open');
});

$("#PayBeforePnrManage_save").click(function(event) {
    var propertyvalue=$("input[name='propertyvalue']:checked").val();
    var confirmTips = "";
    if (propertyvalue=="OPEN") {
        confirmTips = "确定开启先支付后订座功能？";
    }else if (propertyvalue=="CLOSE") {
        confirmTips = "确定关闭先支付后订座功能？";
    }

    CMC.confirm(confirmTips, function(r){
      if(r){
            CMC.request({
                url: PayBeforePnrManage.changeSwitchUrl,
                method: 'POST',
                data: {"propertyvalue":propertyvalue},
                success: function(result){
                    CMC.alertMessage(result.messageBody,'info');
                    CMC.dialog('PayBeforePnrManageSwitchDetail','close');
                }
            });
        }
    });
});

$("#PayBeforePnrManage_import").click(function(event) {
    $("#payBeforePnrManageImportForm").form('clear');
    CMC.dialog('payBeforePnrManageImportDetail','open');
});

$("#payBeforePnrManage_Template").click(function(event) {
    window.open(encodeURI("/cmc/download/payBeforePnrManageTemplate.xlsx"));
});

$("#payBeforePnrManageInfo_import").click(function(event) {
    var val=$("#payBeforePnrManageInfo").val();
    if(val==""){
        CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
        return;
    }
    if(val && val != "" && (val.indexOf("xls")==-1 && val.indexOf("xlsx")==-1) ){
        CMC.alertMessage("请选择excel文件。",'warn');
        return ;
    }
    CMC.confirm("是否确认导入文件?",function(r){
        if(r){
             CMC.showProcessBox();
            CMC.fileUpload({
                url: PayBeforePnrManage.importUrl,
                type: "POST",
                dataType: "json",
                fileElementId:  "payBeforePnrManageInfoFile",
                // data: $("#cityListImportForm").form().serialize(),
                asyc: true,
                timeout: 600000,
                success: function(response){
                    try{
                         CMC.hideProcessBox();
                        CMC.alertMessage(response.messageBody, 'info',CMC.search());
                    }catch(e){
                    }
                },
                error: function(){
                    try{
                        CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
                         CMC.hideProcessBox();
                    }catch(e){}
                },complete: function(){
                    try{
                         CMC.hideProcessBox();
                    }catch(e){}
                }
            });
        }
    });
});
