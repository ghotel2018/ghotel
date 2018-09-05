/**
 * Created by zh on 2017/6/9.
 */
var dynamicCode = {
    searchTableRequired : true,
    menuId : 'DynamicCode',
    searchUrl : 'authorized/dynamicCode/getBlackBykeyType',
    deleteWhiteUrl : 'authorized/dynamicCode/remBlackBykeyType',
    addWhiteUrl : 'authorized/dynamicCode/addBlackBykeyType',
    initNotSearch:true,
    columns: [ [ {
        field : 'value',
        title : '查询结果值',
        width : '50%',
        align : 'center'
      },
        {
            field : 'channel',
            title : '渠道',
            width : '50%',
            align : 'center',
            formatter: function(value,row,index){
                if(2==value){
                    return "官网";
                }else if(value==3){
                    return "移动";
                }else if(value==1){
                    return "全部";
                }
            }

        }
    ] ]
};
$(document).ready(function() {
    CMC.init(dynamicCode);
});
dynamicCode.seach=function(){
    var value=$("#noticeSearchForm input[name='value']").val();
    if(!value||value==''){
        CMC.alertMessage("请填写查询值",'info');
        return
    }
    CMC.search();
}
dynamicCode.add=function(){
    $("#noticeaddFormdiv #value").textbox('setValue','');;
    $('#noticeaddFormdiv').dialog('open');
}

dynamicCode.reset=function(){
    var start= $("#noticeSearchForm input[name='start']:hidden").val();
    var end=$("#noticeSearchForm input[name='end']:hidden").val();
    $("#noticeSearchForm #value").textbox('setValue',"");
    $("#noticeSearchForm input[name='start']:hidden").val(start);
    $("#noticeSearchForm input[name='end']:hidden").val(end);
}
dynamicCode.deleteMer=function(){
    var record = CMC.grid.datagrid('getSelected');
    if(record==null){
        CMC.alertMessage("请选择删除记录！",'warn');
        return ;
    }
    var type  = record["type"];
    var value  = record["value"];
    var channel= record["channel"];
    CMC.confirm("你选择删除该记录， 请确认是否继续?", function(r){
        if(r){
            CMC.request({
                url: dynamicCode.deleteWhiteUrl,
                data:{"type":type,"value":value,"channel":channel},
                method: 'post',
                success: function(msg){
                    var rows = CMC.grid.datagrid("getSelections");
                    var copyRows = [];
                    for ( var j= 0; j < rows.length; j++) {
                        copyRows.push(rows[j]);
                    }
                    for(var i =0;i<copyRows.length;i++){
                        var index = CMC.grid.datagrid('getRowIndex',copyRows[i]);
                        CMC.grid.datagrid('deleteRow',index);
                    }
                  //  CMC.grid.datagrid('loadData', { total: 0, rows: [] });
                }
            });
        }
    })
}
dynamicCode.addform=function(){

    var value  = $("#noticeaddFormdiv #value").textbox('getValue');;
    var type  = $("#noticeaddFormdiv #type").combobox('getValue');
    var channel  = $("#noticeaddFormdiv #channel").combobox('getValue');
    if(type==null||type==''||value==null||value==""){
        CMC.alertMessage("请填写完整！",'warn');
        return ;
    }
    if(channel==null||channel==''||channel==null||channel==""){
        CMC.alertMessage("请填写完整！",'warn');
        return ;
    }
    CMC.request({
        url: dynamicCode.addWhiteUrl,
        data:{"type":type,"value":value,"channel":channel},
        method: 'post',
        success: function(msg){
            if(msg.messageBody){

                if(channel==2||channel==3){
                    CMC.grid.datagrid('loadData', { total: 1, rows: [{"type":type,"value":value,"channel":channel}] });
                }else if(channel==1){
                    CMC.grid.datagrid('loadData', { total: 1, rows: [{"type":type,"value":value,"channel":2},{"type":type,"value":value,"channel":3}] });
                }

                $('#noticeaddFormdiv').dialog('close');
            }
        }
    });
}

