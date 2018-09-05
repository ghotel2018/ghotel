var MarketWhiteList={
    searchTableRequired: true,
    menuId: "MarketWhiteList",
    searchUrl: "authorized/marketWhiteList/getAll",
    addUrl: "authorized/marketWhiteList/add",
    deleteUrl: "authorized/marketWhiteList/delete",
    columns:[[
        {field: 'applyUser', title:'白名单号' , width: '10%' , align: 'center'},
        {field: 'createDate', title:'创建时间' , width: '15%' , align: 'center'},
        {field: 'createBy', title:'创建人' , width: '15%' , align: 'center'}
    ]],
};

$("#whiteList_add").click(function () {
    $("#add_applyUser").textbox('setValue', '');
    CMC.dialog("addMarketWhiteListDetail", "open");
});

$("#submit_add").click(function () {
    var isValid = $("#addForm").form("validate");

    if (isValid) {

        CMC.request({
            url: MarketWhiteList.addUrl,
            method: 'POST',
            data : $("#addForm").form().serialize(),
            success: function(result){
                CMC.alertMessage(result.messageBody,'info');
                CMC.search();
                // CMC.dialog('addcityListDetail','close');
                // $("#updateForm").form("clear");
            }
        });
    }
});

$("#whiteList_delete").click(function () {
    var record = CMC.grid.datagrid("getSelected");
    if(!record){
        CMC.alertMessage("请先选中一条记录！","warning");
        return;
    }
    CMC.confirm("确定删除白名单信息?", function(r){
        if(r){
            CMC.request({
                url: MarketWhiteList.deleteUrl,
                method: 'POST',
                data : record,
                success: function(response){
                    CMC.alertMessage(response.messageBody,'info');
                    CMC.search();
                }
            });
        }
    });
});

$("#whiteList_reset").click(function () {
    $("#applyUser").textbox("setValue", "");
});

$(document).ready(function(){
    CMC.init(MarketWhiteList);
});

$.extend($.fn.textbox.defaults.rules, {
    applyUserValidata: {
        validator: function (value, param) {
            var regEx = /^([0-9]{11,12})$/;
            return regEx.test(value);
        },
        message: '请输入11到12位的数字！'
    }
});
