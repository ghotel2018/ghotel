/**
 * Created by zh on 2017/6/9.
 */
var dynamicCode = {
    searchTableRequired : true,
    menuId : 'BookWhiteList',
    searchUrl : 'authorized/BookWhiteList/getWhite',
    deleteWhiteUrl : 'authorized/BookWhiteList/delWhite',
    addWhiteUrl : 'authorized/BookWhiteList/addWhite',
    initNotSearch:true,
    columns: [ [ {
        field : 'value',
        title : '查询结果值',
        width : '80%',
        align : 'center'
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
    var value  = record["value"];
    CMC.confirm("你选择删除该记录， 请确认是否继续?", function(r){
        if(r){
            CMC.request({
                url: dynamicCode.deleteWhiteUrl,
                data:{"value":value},
                method: 'post',
                success: function(msg){
                    CMC.grid.datagrid('loadData', { total: 0, rows: [] });
                }
            });
        }
    })
}

dynamicCode.addform=function(){
    var value  = $("#noticeaddFormdiv #value").textbox('getValue');;
    if(value==null||value==""){
        CMC.alertMessage("请填写完整！",'warn');
        return ;
    }
    CMC.request({
        url: dynamicCode.addWhiteUrl,
        data:{"value":value},
        method: 'post',
        success: function(msg){
            if(msg.messageBody){
                CMC.grid.datagrid('loadData', { total: 1, rows: [{"value":value}] });
                $('#noticeaddFormdiv').dialog('close');
            }
        }
    });
}

