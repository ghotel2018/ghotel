/**
 * Created by yxin6 on 2016/12/9.
 */
var RecvCoupon = {
    searchTableRequired : true,
    columns: [ [ {//frozenColumns:不显示垂直流动条
        field : 'ck',
        checkbox : true
    }, {
        field : 'activityName',
        title : '活动名称',
        width : 100
    },{
        field : 'activityId',
        title : '活动标识',
        width : 100
    },{
        field : 'flightNo',
        title : '航班号',
        width : 100
    },{
        field : 'departCity',
        title : '出发城市',
        width : 100
    },{
        field : 'arriveCity',
        title : '到达城市',
        width : 120
    },{
        field : 'cabin',
        title : '舱位',
        width : 120
    },{
        field : 'effective',
        title : '是否有效',
        width : 80,
        formatter: effectiveFormatter
    },{
        field : 'faceValue',
        title : '活动面额',
        width : 100,
    },{
        field : 'flightStartDate',
        title : '航班开始日期',
        width : 100
    },{
        field : 'flightEndDate',
        title : '航班截止日期',
        width : 100
    }] ],

    //columns : [ [  ] ],
    onSelect : function(index, record) { // 选中处理
        $.each($("#detail td[name]"),function() {
            var name=$(this).attr("name");
            $(this).html(record[name]);
        });
    },onLoadSuccess : function(data) {
        if(data.rows.length>0){
            $(this).datagrid('selectRow', 0);
        }
    },
    menuId : 'RecvCoupon',
    searchUrl : 'authorized/recvCoupon/get',
    exportedData:null,
    addUrl:'/cmc/authorized/recvCoupon/insert',
    updateUrl:'/cmc/authorized/recvCoupon/update',
    deleteUrl:'/cmc/authorized/recvCoupon/delete',
    uploadUrl:'authorized/recvCoupon/uploadFile'
};
var caozuo="";
function query(){
    $.ajax({
        async: false,
        type: "POST",
        url: "/cmc/authorized/recvCoupon/getRecvCouponId",
        success: function(result){
            if(result!==""){
                if(result.statusCode!==0){
                    alert("数据库不存在“ 购票后优惠券领取id”的值 ，请先保存！");
                    $("#discountCode").val("");
                    return;
                }
                $("#discountCode").val(result.messageBody.propertyvalue);
            }
            else{
                $("#discountCode").val("");
            }
        }
    });
}

function empty(){
    $("#discountCode").val("");
}

function addOrUpdate(){
    var discountCode = $("#discountCode").val().replace(/\s/gi,"");
    if(discountCode == ""){
        alert("请填写 购票后优惠券领取id！");
        return;
    }

    if(confirm("确认更改“购票后优惠券领取ID”?")){
        $.ajax({
            async: false,
            type: "POST",
            url: "/cmc/authorized/recvCoupon/updateRecvCouponId",
            data:{"discountCode":discountCode},
            success: function(result){
                if(result.statusCode===0){
                    // alert("保存成功！");
                    CMC.alertMessage('保存成功!','info');
                }
                else{
                    $("#discountCode").val(discountCode);
                    CMC.alertMessage('保存失败，请查看后台日志!','info');
                }
            }
        });
    }
}
$('#effective').combobox({
    valueField: 'value',
    textField: 'label',
    data: [{
        label: '无效',
        value: 0
    },{
        label: '有效',
        value: 1
    }]
});

function effectiveFormatter(value, rowData, rowIndex) {
    if (value == 0) {
        return "无效";
    }else if(value == 1){
        return "有效";
    }else{
        return value;
    }
}
/***
 * easyui datebox  扩展 自定义 日期格式
 *
 * @param date
 * @return
 */
function myformatter(date){

    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}


/***
 * easyui datebox  扩展 自定义 日期格式 解析
 *
 * @param date
 * @return
 */

function myparser(s){
    if (!s) return new Date();

    var ss = (s.split('-'));
    var y = parseInt(ss[0],10);
    var m = parseInt(ss[1],10);
    var d = parseInt(ss[2],10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
        return new Date(y,m-1,d);
    } else {
        return new Date();
    }
}
$.serializeObject = function(form) {
    var o = {};
    $.each(form.serializeArray(), function(index) {
        if (o[this['name']]) {
            o[this['name']] = o[this['name']] + "," + this['value'];
        } else {
            o[this['name']] = this['value'];
        }
    });
    return o;
};
$.serializeObject2 = function(form) {
    var s ="?a=1&";
    $.each(form.serializeArray(), function(index) {

        s+=this['name']+"="+this['value']+"&";

    });
    return s;
};
RecvCoupon.downloadTemplate=function () {
    var url = "/cmc/download/receiveCouponTemplate.xlsx";
    window.open(encodeURI(url));
};
RecvCoupon.batchImport=function () {

    // $('#excelSubmit').show();
    $('#recvCouponImportDetail').window('open');
};
RecvCoupon.add=function () {
    caozuo="add";
    $('#updateForm').form('clear');
    //document.getElementById("tableName").innerHTML="添加购票后返券信息";
    $('#updateForm').form('clear');
    var winTopLeft = CMC.getWindowTopLeft("window");
	$('#window').window({
		top:winTopLeft.winTop,
		left:winTopLeft.winLeft
	});
    $('#window').window('open');
    $('#activityId').textbox('readonly',false);
    $('#activityNameRow').attr('hidden',true);
    $('#faceValueRow').attr('hidden',true);
    $("#effective").combobox("select",'0');
};
RecvCoupon.edit=function () {
    var record = CMC.grid.datagrid('getSelected');
    if(!record){
        CMC.alertMessage('请先选中一条记录!','warn');
        return;
    }
    caozuo="edit";
    $('#updateForm').form('clear');
    //document.getElementById("tableName").innerHTML="编辑购票后返券信息";
    var winTopLeft = CMC.getWindowTopLeft("window");
    $('#window').window({
    			top:winTopLeft.winTop,
    			left:winTopLeft.winLeft
    		});
    $('#window').window('open');
    $('#activityId').textbox('readonly',true);
    $('#activityNameRow').attr('hidden',false);
    $('#faceValueRow').attr('hidden',false);
    editForm();
};
RecvCoupon.idConfig = function(){

    CMC.dialog('idConfigdlg','open')
};
RecvCoupon.setEffective=function () {
    var record = CMC.grid.datagrid('getSelected');
    if(!record){
        CMC.alertMessage('请先选中一条记录!','warn');
        return;
    }
    setEffective("1");
};
RecvCoupon.setUneffective=function () {
    var record = CMC.grid.datagrid('getSelected');
    if(!record){
        CMC.alertMessage('请先选中一条记录!','warn');
        return;
    }
    setEffective("0");
};
RecvCoupon.del=function () {
    var record = CMC.grid.datagrid('getSelected');
    if(!record){
        CMC.alertMessage('请先选中一条记录!','warn');
        return;
    }
    deleteCondition();
}
function doSearch(){
    $("#mydatagrid").datagrid("load",{
        "activityId" : $("#search_activityId").val()
    });
}
function editForm(index){
    var record = CMC.grid.datagrid('getSelected');
    if(!record){
        CMC.alertMessage('请先选中一条记录!','warn');
        return;
    }
    $('#oid').val(record.oid);
    $('#activityName').textbox("setValue",record.activityName);
    $('#activityId').textbox("setValue",record.activityId);
    $('#departCity').val(record.departCity);
    $('#arriveCity').val(record.arriveCity);
    $('#flightNo').val(record.flightNo);
    $('#faceValue').numberbox('setValue',record.faceValue);
    $('#flightSelectUrl').textbox("setValue",record.flightSelectUrl);
    $('#paySuccessUrl').textbox("setValue",record.paySuccessUrl);

    $('#effective').combobox('setValue', record.effective);
    $('#flightStartDate').datebox('setValue', record.flightStartDate);
    $('#flightEndDate').datebox('setValue', record.flightEndDate);
    var cabins = record.cabin;
    if( cabins != ""){
        $("#allCabin").parent().parent().find("input[name=cabin]").each(function(){
            console.log($(this).val());
            if(cabins.indexOf($(this).val())> -1){
                $(this)[0].checked= true;
            }
        });
    }
}
function closeWindow(){
    var  mes;
    mes = "您确定关闭窗口?";
    $.messager.confirm('确认',mes,function(r){
        if (r){
            $('#window').window('close');
        }
    });
}

function saveCondition(){
    if(caozuo=="edit"){
        editCondition();
    }else{
        addCondition();
    }
}

function setEffective(effective){
    var row = CMC.grid.datagrid('getSelected');
    //var oid = row.oid;
    var activityId = row.activityId;

    if(row!=null){
        var confirmText = "";
        if(effective==="1"){
            confirmText = "您是否要设置<b>所有相同活动名称</b>的记录为<b>有效</b>,其余将置为无效？";
        }else{
            confirmText = "您是否要设置<b>所有相同活动名称</b>的记录为<b>无效</b>？";
        }
        $.messager.confirm('询问',confirmText, function(b) {
            if (b) {
                CMC.request({
                    url:RecvCoupon.updateUrl,
                    method:'POST',
                    data:{
                        activityId:row.activityId,
                        activityName:row.activityName,
                        oid:row.oid,
                        departCity:row.departCity,
                        arriveCity:row.arriveCity,
                        flightNo:row.flightNo,
                        flightStartDate:row.flightStartDate,
                        flightEndDate:row.flightEndDate,
                        flightSelectUrl:row.flightSelectUrl,
                        paySuccessUrl:row.paySuccessUrl,
                        faceValue:row.faceValue,
                        cabin:row.cabin,
                        effective:effective
                    },
                    success:function (result) {
                        if (result.statusCode===0) {
                            $.messager.alert('消息','设置成功','info');
                            // $('#mydatagrid').datagrid('reload');
                            CMC.search();
                        }else{
                            $.messager.alert('提示','设置失败','info');
                        }
                    }
                });
            }
        });
    }else{
        $.messager.alert("操作提示", "请勾选要删除的记录！");
    }
}

function editCondition(){
    $('#updateForm').form('submit', {
        url:RecvCoupon.updateUrl,
        type:'JSON',
        onSubmit: function(){
            return $(this).form('enableValidation').form('validate');
        },
        success:function (result) {

            CMC.alertMessage($.parseJSON(result).messageBody,'info');
            CMC.search();
           /* var statusCode =$.parseJSON(result).statusCode;
            if (statusCode=='0') {
                $.messager.alert('消息','修改成功','info');
                $('#mydatagrid').datagrid('reload');
            }else{
                $.messager.alert('提示','修改失败','info');
            }*/
        }
    });
}

function addCondition(){
	if($("#updateForm").serialize().indexOf("effective=1")>=0){
		CMC.alertMessage("新增时请选无效","warn");
		return;
	}
    $('#updateForm').form('submit',{
        url:RecvCoupon.addUrl,
        onSubmit: function(){

            return $(this).form('enableValidation').form('validate');

        },
        success:function(result){
                var statusCode =$.parseJSON(result).statusCode;
                CMC.alertMessage($.parseJSON(result).messageBody,'info');
                CMC.search();
            /*else if(data == "noneActivityId"){
                $.messager.alert('失败','不存在该活动','error');
            }else{
                $.messager.alert('失败','网络出错,请重新提交','error');
            }*/
        }
    });
    // $('#updateForm').submit();
}

function deleteCondition(){
    var row = CMC.grid.datagrid('getSelected');
    var oid = row.oid;
    if(row!=null){

        if(row.effective == "1"){
            $.messager.alert('消息','有效的活动不能删除！','info');
            return;
        }
        $.messager.confirm('询问', '您是否要删除当前记录？', function(b) {
            if (b) {
                CMC.request({
                    url:RecvCoupon.deleteUrl,
                    method: 'POST',
                    data:{
                        activityId:row.activityId,
                        activityName:row.activityName,
                        oid:row.oid,
                        departCity:row.departCity,
                        arriveCity:row.arriveCity,
                        flihtNo:row.flihtNo,
                        flightStartDate:row.flightStartDate,
                        flightEndDate:row.flightEndDate,
                        flightSelectUrl:row.flightSelectUrl,
                        paySuccessUrl:row.paySuccessUrl,
                        faceValue:row.faceValue,
                        cabin:row.cabin,
                        effective:row.effective
                    },
                    success:function (result) {
                        var statusCode =result.statusCode;
                        if (statusCode=='0') {
                            $.messager.alert('消息','删除成功','info');
                            $('#mydatagrid').datagrid('reload');
                            CMC.search();
                        }else{
                            $.messager.alert('提示','删除失败','info');
                        }
                    }
                })
            }
        });
    }else{
        $.messager.alert("操作提示", "请勾选要删除的记录！");
    }
}
function submitImportExcelCheck(type) {
    $('#import_form').form('submit',{
        url: '/CMC/business/'+type+'/importExcel/check.spr',
        data:{file:$("#file").val()},
        dataType: "text",
        success: function(result){
            if(result){
                $.messager.alert('提示',"预检成功，请点击上传");
                $('#excelSubmit').show();
                $('#excelCheck').hide();
            }else {
                $.messager.alert('提示',"文件有误，请重新导入");
                var string="<table style='width:90%' border='1'><tr><th>所在行</th><th>消息</th>";
                $.each(result.data,function(i,v) {
                    string+="<tr><td>"+v.key+"</td><td>"+v.value+"</td></tr>";
                });
                string+="</table>";
                string+="<hr/><span style='color:red'>请修改以上错误再次导入</span>";
                $('#dlg2').dialog('close');
                $('#ErrorContent').html(string);
                $('#w').window('open');
            }
        }
    });
};

function submitImportExcel(type) {
    $('#import_form').form('submit',{
        url:  '/CMC/business/'+type+'/importExcel.spr',
        data:{file:$("#file").val()},
        success: function(result){
            //	 $.messager.alert('提示',"操作成功,请查看日志文件");
            $('#dlg2').dialog('close');
        }
    });
};

function submitChannelsImportExcel(type) {
    $('#import_form').form('submit',{
        url:  '/CMC/firstTicketGift/popularizingChannels/importExcel.spr',
        data:{file:$("#file").val()},
        success: function(result){
            $('#dlg2').dialog('close');
        }
    });
};


function submitActivityImportExcel(type) {
    $('#import_form').form('submit',{
        url:  '/CMC/firstTicketGift/discountActivities/importExcel.spr',
        data:{file:$("#file").val()},
        success: function(result){
            $('#dlg2').dialog('close');
        }
    });
};

$("#recvCoupon_import").click(function () {
    var activityId = $("#xlsActivityId").val();
    var flightSelectUrl = $("#xlsFlightSelectUrl").val();
    var paySuccessUrl = $("#xlsPaySuccessUrl").val();

    $("#recvCouponImportForm").form("enableValidation");
    var isValid = $("#recvCouponImportForm").form("validate");

    if (isValid) {

        var val=$("#recvCouponCondition").val();
        if(val==""){
            CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
            return;
        }
        //判断文件后缀
        if(val && val != "" && (val.indexOf("xls")==-1 && val.indexOf("xlsx")==-1 && val.indexOf("csv")==-1) ){
            CMC.alertMessage("请选择excel文件。",'warn');
            return ;
        }

        CMC.confirm("是否确认导入文件?", function (r) {
            if (r) {
                CMC.showProcessBox();
                CMC.fileUpload({
                    url: RecvCoupon.uploadUrl,
                    type: "POST",
                    dataType: "json",
                    fileElementId: 'recvCouponConditionFile',
                    data: {
                        'activityId': activityId,
                        'flightSelectUrl': flightSelectUrl,
                        'paySuccessUrl': paySuccessUrl
                    },
                    asyc: true,
                    timeout: 600000,
                    success: function (response) {
                        try {
                            CMC.hideProcessBox();

                            CMC.alertMessage("购票返券条件导入异步请求已经提交,请移步首页并刷新任务列表查看生成结果！", 'info', CMC.search());
                            $('#recvCouponImportDetail').window('close');
                        } catch (e) {
                        }
                    }, error: function () {
                        try {
                            CMC.alertMessage("服务器发生错误，请联系系统管理员！", 'error');
                            CMC.hideProcessBox();
                        } catch (e) {
                        }
                    }, complete: function () {
                        try {
                            CMC.hideProcessBox();
                        } catch (e) {
                        }
                    }
                });
            }
        });
    }
});

$("#recvCoupon_Template").click(function(event) {
    window.open(encodeURI("/cmc/download/receiveCouponTemplate.xls"));
});


function allCabinCheck(){
    var v = $("#allCabin")[0].checked;
    $("input[name=cabin]").each(function(){
        $(this)[0].checked=v;
    });
}

$("#reset").click(function(event) {
    $("#recvCouponSearchForm input").val('');
    $("#cc").combobox('select','');
});

/*$(document).ready(function(){
    $('#DIV_toolbar').prependTo(".datagrid-toolbar");
    $("#DIV_toolbar").removeAttr("hidden");
})*/
$(document).ready(function() {
    CMC.init(RecvCoupon);
});