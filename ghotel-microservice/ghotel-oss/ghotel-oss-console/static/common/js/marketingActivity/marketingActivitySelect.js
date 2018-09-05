var SelectMarketingActivity = {
    menuId: "MarketingActivity",
    searchTableRequired: true,
    searchUrl: "authorized/marketingActivity/getAll",
    columns :  [[
        {field: 'actionId', title:'活动ID' , width: '45%' , align: 'center'},
        {field: 'actionName', title:'活动名' , width: '45%' , align: 'center'}
    ]]
};

$(document).ready(function(){
    CMC.init(SelectMarketingActivity);
});

var openIframeId;

function submitBtn(){
    var record = CMC.grid.datagrid("getSelected");
    if(!record){
        CMC.alertMessage("请选择营销活动!", 'warn');
        return;
    }
    var actionId=record['actionId'];
    // console.log(actionId);
    // window.parent.$('.datagrid-editable>table').find('.datagrid-editable-input').textbox('setValue',actionId);
    window.parent.$('.datagrid-editable>table').find('.textbox-f').textbox('setValue',actionId);

    // console.log(window.parent.$('.datagrid-editable>table').find('.datagrid-editable-input'));
    //.$(".textbox").textbox('setValue', record['userName']);
    window.parent.$("#"+openIframeId).dialog("close");
    // $.parser.parse(window.parent.$('.datagrid-editable>table').find('.datagrid-editable-input'));
}

