/**
 *
 * @type {{searchTableRequired: boolean, menuId: string, addUrl: string, updateUrl: string, deleteUrl: string, searchUrl: string, getUrl: string, groupEditUrl: string, groupSearchUrl: string, getTypeUrl: string, columns: [*]}}
 */

var CmcProperty =  {
    searchTableRequired: true,
    menuId: "CarDdbCmcProperty",
    addUrl:'authorized/carDdbcmcProperty/add',
    updateUrl: 'authorized/carDdbcmcProperty/update',
    deleteUrl: "authorized/carDdbcmcProperty/delete",
    searchUrl: "authorized/carDdbcmcProperty/getAll" ,
    getUrl: "authorized/carDdbcmcProperty/get" ,
    columns :  [[
        {field: 'propertyname', title:'属性名' , width: '25%' , align: 'center'},
        {field: 'propertyvalue', title:'属性值' , width: '14%' , align: 'center'},
        {field: 'description', title:'描述' , width: '30%' , align: 'center'},
        {field: 'propertyvalueInter', title:'缺省值' , width: '20%' , align: 'center'}
    ]]
};

(function($){



})(jQuery);

$("#CmcProperty_reset").click(function () {
    $("#input_propertyname").textbox('setValue', '');
    $("#input_propertyvalue").textbox('setValue', '');
});

$("#CmcProperty_add").click(function () {
    $("#ecsCmcPropertyAddForm").form("disableValidation");
    $("#ecsCmcPropertyAddForm").form('clear');
    CMC.dialog('winEcsCmcPropertyAdd','open');
});

$("#CmcProperty_update").click(function () {
    $("#ecsCmcPropertyUpdateForm").form("disableValidation");
    $("#ecsCmcPropertyUpdateForm").form('clear');
    var record = CMC.grid.datagrid("getSelected");
    if(!record){
        CMC.alertMessage("请先选中一条记录！","warning");
        return;
    }
    $("#propertyname_update").textbox('setValue',record['propertyname']);
    $("#propertyvalue_update").textbox('setValue',record['propertyvalue']);
    $("#description_update").textbox('setValue',record['description']);
    $("#propertyvalueInter_update").textbox('setValue',record['propertyvalueInter']);

    CMC.dialog('winEcsCmcPropertyUpdate','open');
});

$("#CmcProperty_delete").click(function () {
    var record = CMC.grid.datagrid("getSelected");
    if(!record){
        CMC.alertMessage("请先选中一条记录！","warning");
        return;
    }
    CMC.confirm("确定删除保险信息?", function(r) {
        if (r) {
            CMC.request({
                url: CmcProperty.deleteUrl,
                method: 'POST',
                data: {
                    "propertyname": record['propertyname'],
                    "propertyvalue": record['propertyvalue'],
                    "description": record['description'],
                    "propertyvalueInter": record['propertyvalueInter']
                },
                success: function (result) {
                    CMC.alertMessage(result.messageBody, 'info');
                    CMC.search();
                    CMC.dialog('winEcsCmcPropertyAdd', 'close');
                    $("#" + el).form("clear");
                }
            });
        }
    });
});

function eitdProperty(bol,el) {
    $("#"+el).form('enableValidation');
    if (bol){
        CMC.request({
            url:CmcProperty.addUrl,
            method: 'POST',
            data : $("#"+el).form().serialize(),
            success: function(result){
                CMC.alertMessage(result.messageBody,'info');
                CMC.search();
                CMC.dialog('winEcsCmcPropertyAdd','close');
                $("#"+el).form("clear");
            }
        })
    }else {
        CMC.request({
            url:CmcProperty.updateUrl,
            method: 'POST',
            data : $("#"+el).form().serialize(),
            success: function(result){
                CMC.alertMessage(result.messageBody,'info');
                CMC.search();
                CMC.dialog('winEcsCmcPropertyUpdate','close');
                $("#"+el).form("clear");
            }
        })
    }
}

$(document).ready(function(){
    CMC.init(CmcProperty);
});

