
function openActivedIdModel(){
    if(!window.frames["panelSelectActivie"]) {
        $('#activiedModel').show().dialog({
            title: "选择营销活动",
            closed: true,
            cache: true,
            width: 560,
            height: 550,
            minimizable: true,
            maximizable: true,
            collapsible: true,
            content: '<iframe id="panelSelectActivie" name="panelSelectActivie" src="/cmc/module/marketingActivity/marketingActivitySelectPanel.html" frameborder=0 height=100% width=100% scrolling=no></iframe>',
        });

        /*var winTopLeft = CMC.getWindowTopLeft("activiedModel");
         $('#activiedModel').window({
         top:winTopLeft.winTop,
         left:winTopLeft.winLeft
         });*/
    }
    $("#activiedModel").show().dialog("open");

    window.frames["panelSelectActivie"].openIframeId="activiedModel";
}