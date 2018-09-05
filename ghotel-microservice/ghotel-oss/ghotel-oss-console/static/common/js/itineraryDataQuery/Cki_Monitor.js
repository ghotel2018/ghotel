var cki_Monitor = {
    searchTableRequired: false,
    menuId: "Cki_Monitor",
    searchUrl: "authorized/cki_Monitor/getAll",
    exportUrl: "authorized/cki_Monitor/export"
}

$("#chi_monitor_export").click(function () {
    CMC.request({
        url: cki_Monitor.exportUrl,
        method: 'POST',
        data : $("#searchForm").form().serialize(),
        success: function(message){
            if (message.messageBody!='') {
                CMC.alertMessage(message.messageBody, "info");
            }
        }
    });
});

$("#reset").click(function () {
    $("#ckiArvArp").textbox('setValue', "");
    $("#ckiDepArp").textbox('setValue', "");
    $("#ckiFltNo").textbox('setValue','');
    $("#startDate").datebox('setValue', '');
    $("#endDate").datebox('setValue', '');
    $("#type").combobox('select', 'day');
});