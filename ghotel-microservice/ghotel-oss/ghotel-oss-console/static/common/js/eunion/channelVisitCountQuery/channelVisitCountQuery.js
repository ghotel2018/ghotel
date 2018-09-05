var Channel = {
    menuId: "Channel",
    queryDay: "authorized/channelVisitCountQuery/queryDay",
    queryTotal: "authorized/channelVisitCountQuery/queryTotal",
    queryChannel: "authorized/channelVisitCountQuery/queryChannel",
    queryCurrency: "authorized/channelVisitCountQuery/queryCurrency"
};
(function($){
    //刷新按钮
    $("#refresh").click(function(){
        window.location.reload(); 
    });
    //监控单项选择按钮点击事件
    $("#totalButton").click(function(){
      $("#day").datebox("clear");
      $("#day").datebox("disable");
      $("[name ='hour']").val("");
      $("[name ='hour']").prop("disabled",true);
    });
    $("#dayButton").click(function(){
        $("#day").datebox("enable");
    });
    //时间查询条件联动监控
    $("[name='day']").datebox({
        onSelect: function(date){
            $("[name ='hour']").prop("disabled",false);
        }
    });
    //查询并发
    $("#queryCurrent").click(function(){
    	 var submitParams =$("#resourceSearchForm").form().serialize();
    	 var channelId = $("#channelId").combobox("getValue");
    	 var interfaceId = $("#cc").combobox("getValue");
    	 if(channelId == ""){
             CMC.alertMessage("请选择一个渠道!!!", 'info');
             return;
         }
    	 if(interfaceId == ""){
             CMC.alertMessage("请选择一个接口!!!", 'info');
             return;
         }
    	 CMC.request({
             url: Channel.queryCurrency,
             data : submitParams,
             method: 'POST',
             success : function(data){
                 var info = data.messageBody;
                 $("#memuSearchTable").datagrid({
                     fitColumns : true,
                     data:info,
                     columns: [ [ {
                         field : 'partnerId',
                         title : '渠道ID',
                         width : '15%'
                     },{
                         field : 'partnerName',
                         title : '渠道名称',
                         width : '15%'
                     },{
                         field : 'partner_account',
                         title : '渠道账号',
                         width : '15%'
                     },{
                         field : 'interfaceId',
                         title : '接口名称',
                         width : '15%'
                     },{
                         field : 'concurrency_count',
                         title : '当前并发数',
                         width : '20%',
                         formatter: function(value,row,index){
                             if(value == null){
                                 return 0;
                             }else{
                                 return value;
                             }
                         }
                     }, {
                         field : 'concurrency_limit',
                         title : '并发限制',
                         width : '20%',
                         formatter: function(value,row,index){
                             if(value == null){
                                 return 0;
                             }else{
                                 return value;
                             }
                         }
                     }
                     ] ]    
                 })
             }
         });
    });
    
    //查询按钮点击事件
    $("#query").click(function(){
        var type =$("input:checked").attr("reqType");
        var channelId = $("#channelId").combobox("getValue");
        var interfaceId = $("#cc").combobox("getValue");
        console.log($("#hour").val());
        if(channelId == ""){
            CMC.alertMessage("请选择一个渠道!!!", 'info');
            return;
        }
        if(interfaceId == ""){
            CMC.alertMessage("请选择一个接口!!!", 'info');
            return;
        }
        if(type == "day"){
            var submitParams =$("#resourceSearchForm").form().serialize();
            //日期框数据校验
            var day = $("#day").datebox("getText");
            if(day == ""){
                CMC.alertMessage("请选择查询的日期(天)!", 'info');
                return;
            }
            var hour = $("#hour").val();
            if(hour){
                if( hour < 0 || hour >=24 ){
                    CMC.alertMessage("请输入正确的小时数[0,24)!", 'info');
                    return;
                }
            }
            CMC.request({
                url: Channel.queryDay,
                data : submitParams,
                method: 'POST',
                success : function(data){
                    var info = data.messageBody;
                    $("#memuSearchTable").datagrid({
                        fitColumns : true,
                        data:info,
                        columns: [ [ {
                            field : 'channelId',
                            title : '渠道ID',
                            width : '15%'
                        },{
                            field : 'partner_account',
                            title : '渠道账号',
                            width : '15%'
                        },{
                            field : 'interfaceType',
                            title : '接口名称',
                            width : '20%',
                            formatter: function(value,row,index){                            
                                    return interfaceId;
                            }
                        },{
                            field : 'channelName',
                            title : '渠道名称',
                            width : '15%'
                        },{
                            field : 'date',
                            title : '日期',
                            width : '20%'
                        }, {
                            field : 'count',
                            title : '访问量',
                            width : '15%',
                            formatter: function(value,row,index){
                                if(value == null){
                                    return 0;
                                }else{
                                    return value;
                                }
                            }
                        }
                        ] ]    
                    })
                    //$.messager.progress('close');
                }
            });
        };
        if(type == "total"){
            var submitParams =$("#resourceSearchForm").form().serialize();
            console.log(submitParams);
            CMC.request({
                url: Channel.queryTotal,
                data : submitParams,
                method: 'POST',
                success : function(data){
                    var info = data.messageBody;
                    $("#memuSearchTable").datagrid({
                        data : info,
                        fitColumns : true,
                        columns: [ [ {
                            field : 'channelId',
                            title : '渠道ID',
                            width: '20%'
                        },{
                            field : 'partner_account',
                            title : '渠道账号',
                            width : '20%'
                        },{
                            field : 'interfaceId',
                            title : '接口名称',
                            width : '20%',
                            formatter: function(value,row,index){
                        		value = $("#cc").combobox("getValue");
                                return value;
                        }
                        },{
                            field : 'channelName',
                            title : '渠道名称',
                            width: '20%'
                        },{
                            field : 'count',
                            title : '访问量',
                            width: '20%',
                            formatter: function(value,row,index){
                                if(value == null){
                                    return 0;
                                }else{
                                    return value;
                                }
                            }
                        }
                        ] ]
                    })
                }
            });
        }
    });
})(jQuery);
//渠道下拉框向后台查询数据
Channel.init = function(){
    CMC.request({
        url: Channel.queryChannel,
        method: 'POST',
        success : function(data){
            var info =  data.messageBody;
            console.log(info);
            $("#channelId").combobox({
                data: info,
                panelHeight: '120px',
                valueField:'channelId',
                textField:'channelId' 
            }); 
        }
    });
}
$(document).ready(function(){
    CMC.init(Channel);
});