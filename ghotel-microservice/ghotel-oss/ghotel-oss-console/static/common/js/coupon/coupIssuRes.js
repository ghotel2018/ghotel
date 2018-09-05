/**
 * zhangyeping
 */
var CmcCoupAccounPayment = {
    menuId: "CouponIssuRec",
    searchUrl : '/authorized/couponIssuRec/getAll',
    exportUrl : '/authorized/couponIssuRec/export',
    exportedData:null,
    onDblClickRow:onDblClick,
    searchTableRequired : true,
    columns : [[
        {
            field : 'groupId',
            width : '10%',
            title : "批次号",
            align : 'center'
        },{
            field : 'createdTime',
            width : '13%',
            title : "生成日期",
            align : 'center',
            formatter: function(value,row,index){
                return new Date(value).format("yyyy-MM-dd HH:mm:ss");
            }
        },{
            field : 'createdBy',
            width : '10%',
            title : "生成人",
            align : 'center'
        },{
            field : 'couponType',
            width : '15%',
            title : "优惠券类型",
            align : 'center',
            formatter:function(value,row,index){
            	if(value=="0")
            		return "国内收入现金优惠券";
            	else if(value=="1")
            		return "国内运价优惠券";
            	else if(value=="2")
            		return "国内费用现金优惠券";
            	else if(value=="3")
            		return "国际虚拟资金优惠券";
            	else if(value=="4")
            		return "国际自有资金优惠券";
            	else if(value=="9")
            		return "韩国自有资金优惠券";
            	else if(value=="10")
            		return "韩国虚拟资金优惠券";
            	else if(value=="11")
            		return "澳洲自有资金优惠券";
            	else if(value=="12")
            		return "澳洲虚拟资金优惠券";
            	else if(value=="13")
            		return "新西兰自有资金优惠券";
            	else if(value=="14")
            		return "新西兰虚拟资金优惠券";
            	else if(value=="15")
            		return "新加坡自有资金优惠券";
            	else if(value=="16")
            		return "新加坡虚拟资金优惠券";
            	else if(value=="17")
            		return "英国自有资金优惠券";
            	else if(value=="18")
            		return "英国虚拟资金优惠券";
            	else if(value=="19")
            		return "国内合作活动次数券";
            	else if(value=="20")
            		return "国内营销活动次数券";
            	else if(value=="21")
            		return "国际合作活动次数券";
            	else if(value=="22")
            		return "国际营销活动次数券";
            	else if(value=="23")
            		return "国内合作活动协议价次数券";
            	else if(value=="24")
            		return "国内营销活动协议价次数券";
            	else if(value=="25")
            		return "国际合作活动协议价次数券";
            	else if(value=="26")
            		return "国际营销活动协议价次数券";
            	else 
            		return value;
            }
        },{
            field : 'status',
            width : '10%',
            title : "状态",
            align : 'center',
            formatter:function(value,row,index){
            	if(value=="1")
            		return "生成中";
            	else if(value=="2")
            		return "已生成";
            	else if(value=="3")
            		return "生成异常";
            	else if(value=="4")
            		return "出错";
            	else if(value=="5")
            		return "审批中";
            	else if(value=="6")
            		return "审批通过";
            	else if(value=="7")
            		return "已绑定活动";
            	else if(value=="8")
            		return "挂起";
            	else if(value=="9")
            		return "废除";
            	else if(value=="10")
            		return "已过期";
            }
        },{
            field : 'channelId',
            width : '5%',
            title : "发放渠道ID",
            align : 'center'
        },{
            field : 'sendTime',
            width : '10%',
            title : "发放日期",
            align : 'center',
            formatter: function(value,row,index){
                 if(value)
                    return new Date(value).format("yyyy-MM-dd HH:mm:ss");
                  return "";
            }
        },{
            field : 'sendBy',
            width : '8%',
            title : "发放人",
            align : 'center'
        },{
            field : 'sendLimitCondition',
            width : '10%',
            title : "发放限制条件",
            align : 'center',
            formatter:function(value,row,index){
            	if(value=="undefined"||value==""||typeof(value)==undefined||value==null)
            		return "未绑定";
            	else{
            		var str = "";
            		if(value.indexOf("0")!=-1)
            			str += "绑定会员号 ";
            		if(value.indexOf("2")!=-1)
            			str += "绑定手机号 ";
            		if(value.indexOf("3")!=-1)
            			str += "绑定邮箱号 ";
            		return str;
            	}
            }
        }
//        ,{
//            field : 'status',
//            width : '10%',
//            title : "批次状态",
//            align : 'center',
//            formatter:function(value,row,index){
//            	if(value=="0")
//            		return "未生成";
//            	else if(value="1")
//            		return "生成中";
//            	else if(value="2")
//            		return "已生成";
//            	else if(value="3")
//            		return "生成异常";
//            	else if(value="4")
//            		return "出错";
//            	else if(value="5")
//            		return "审批中";
//            	else if(value="6")
//            		return "审批通过";
//            	else if(value="7")
//            		return "已绑定活动";
//            	else if(value="8")
//            		return "挂起";
//            	else if(value="9")
//            		return "废除";
//            	else 
//            		return "异常数值:"+value;
//            }
//        }
    ]]

//[[
//  {
//      field : 'groupId',
//      width : '10%',
//      title : "批次号",
//      align : 'center'
//  },{
//      field : 'createDate',
//      width : '13%',
//      title : "生成日期",
//      align : 'center',
//      formatter: function(value,row,index){
//          if(value&&value.length>10)
//              return  value.substr(0,10)
//          return "";
//      }
//  },{
//      field : 'createdBy',
//      width : '10%',
//      title : "生成人",
//      align : 'center'
//  },{
//      field : 'disCountType',
//      width : '7%',
//      title : "优惠券类型",
//      align : 'center'
//  },{
//      field : 'status',
//      width : '10%',
//      title : "状态",
//      align : 'center'
//  },{
//      field : 'userChannel',
//      width : '10%',
//      title : "发放渠道ID",
//      align : 'center'
//  },{
//      field : 'applyTime',
//      width : '10%',
//      title : "发放日期",
//      align : 'center',
//      formatter: function(value,row,index){
//           if(value)
//              return  timeStamp2StringDaY(value);
//            return "";
//      }
//  },{
//      field : 'applyUserId',
//      width : '8%',
//      title : "发放人",
//      align : 'center'
//  },{
//      field : 'issuLimitKey',
//      width : '10%',
//      title : "发放限制条件",
//      align : 'center'
//  },{
//      field : 'batchStatus',
//      width : '10%',
//      title : "批次状态",
//      align : 'center',
//      formatter:function(value,row,index){
//      	if(value=="0")
//      		return "已生成,未发放";
//      	else if(value="1")
//      		return "未使用";
//      	else if(value="2")
//      		return "已挂起";
//      	else if(value="3")
//      		return "已使用";
//      	else if(value="4")
//      		return "已作废";
//      	else 
//      		return "异常数值:"+value;
//      }
//  }
//]]


};
function onDblClick(){

}
CmcCoupAccounPayment.exportExl=function(){
    $("#coupGroupCreatFrom").dialog({
        collapsible: true,
        title: "优惠券发放报表导出",
        minimizable: false,
        maximizable: false,
        resizable: false,
        modal:true,
        width: 400,
        height: 300,
        buttons:[{
            text:'提交',
            iconCls:'icon-ok',
            left:50,
            handler:function(){
                $("#coupGroupExpFrom #issuUserId").val($("#coupGroupExpFrom #exapplyUserName").val());
                if((!$("#coupGroupExpFrom  #createDateStart").combobox('getValue'))&&(!$("#coupGroupExpFrom  #createDateEnd").combobox('getValue'))
                    &&(!$("#coupGroupExpFrom  #sendTimeStart").combobox('getValue'))
                    &&(!$("#coupGroupExpFrom  #sendTimeEnd").combobox('getValue'))
                    &&(!$("#coupGroupExpFrom  #isInternations").combobox('getValue'))
                    &&(!$("#coupGroupExpFrom  #groupId").val())
                    &&(!$("#coupGroupExpFrom  #issuUserId").val())
                    &&(!$("#coupGroupExpFrom  #channelId").combobox('getValue'))
                ){
                    CMC.alertMessage("请输入至少一个查询条件！", 'info');
                    return;
                }
                CMC.dialog('coupGroupCreatFrom','close');
                CMC.request({
                    url: CmcCoupAccounPayment.exportUrl,
                    method: 'POST',
                    data : $("#coupGroupExpFrom").form().serialize(),
                    success: function(message){
                        CMC.alertMessage("提交优惠券充值报表导出请求完成,请移步首页并查看报表记录下载文件！", 'info');
                    }
                });

            }
        },{
            text:'重置',
            iconCls:'icon-clear',
            left:50,
            handler:function(){
                $('#coupGroupCreatFrom').form('clear');
            }
        },{
            text:'关闭',
            iconCls:'icon-clear',
            left:50,
            handler:function(){
                CMC.dialog("coupGroupCreatFrom", "close");
            }
        }]
    });
    $("#coupGroupCreatFrom").dialog("open")
}
CmcCoupAccounPayment.reset=function(value){


    var start= $("#noticeSearchForm input[name='start']:hidden").val();
    var end=$("#noticeSearchForm input[name='end']:hidden").val();
    $('#noticeSearchForm').form('clear');
    $("#noticeSearchForm input[name='start']:hidden").val(start);
    $("#noticeSearchForm input[name='end']:hidden").val(end);
}
CmcCoupAccounPayment.selectAll=function(){
	console.log($("#noticeSearchForm  #channelId").combobox('getValue'));
    if((!$("#noticeSearchForm  #starCreatDate").combobox('getValue'))&&(!$("#noticeSearchForm  #endCreateDate").combobox('getValue'))
        &&(!$("#noticeSearchForm  #startIssDate").combobox('getValue'))
        &&(!$("#noticeSearchForm  #endIssDate").combobox('getValue'))
        &&(!$("#noticeSearchForm  #keyType").combobox('getValue'))
        &&(!$("#noticeSearchForm  #groupId").val())
        &&(!$("#noticeSearchForm  #issuUserId").val())
        &&(!$("#noticeSearchForm  #channelId").combobox('getValue'))
    ){
        CMC.alertMessage("请输入至少一个查询条件！", 'info');
        return;
    }
    CMC.search();
}

$(document).ready(function() {
    CMC.init(CmcCoupAccounPayment);
    CMC.request({
        url: "authorized/couponIssuRec/getChannel" ,
        method: 'GET',
        success: function(message) {//virtualAccount
            var channelList = message.messageBody.list;
            for(var i =0 ; channelList && i < channelList.length; i++){
            	if(channelList[i]["code"]!=null){
            		if(channelList[i]["code"].length<2){
            			channelList[i]["code"] = "0" + channelList[i]["code"];
            		}
            		channelList[i]["name"] = "[" + channelList[i]["code"]+"]"+channelList[i]["name"];
            	}else{
            		channelList[i]["name"] = "[]"+channelList[i]["name"];
            	}
            }

            $("#coupGroupExpFrom #channelId").combobox({
                data: channelList,
                panelHeight: '120px',
                valueField:'code',
                textField:'name'
            });
            $("#noticeSearchForm #channelId").combobox({
                data: channelList,
                panelHeight: '120px',
                valueField:'code',
                textField:'name'
            });
        }});
});

function doexUserSearch() {
    //$("#selectApporUser").show().dialog("open");
    openSelect();
    $("#selectApporUser").show().dialog("open");
    window.frames["apporUserSelect"].openIframeId="selectApporUser";
    window.frames["apporUserSelect"].userId="exapplyUserName";
    window.frames["apporUserSelect"].userName="exapplyUser";
}
function doUserSearch() {
    //$("#selectApporUser").show().dialog("open");
    openSelect();
    $("#selectApporUser").show().dialog("open");
    window.frames["apporUserSelect"].openIframeId="selectApporUser";
    window.frames["apporUserSelect"].userId="issuUserId";
    window.frames["apporUserSelect"].userName="applyUserName";
}
function openSelect(){
    if(!window.frames["apporUserSelect"]){
        $('#selectApporUser').show().dialog({
            title: "选择发放人",
            closed: true,
            cache: true,
            width: 750,
            height: 550,
            minimizable: true,
            maximizable: true,
            collapsible: true,
            content: '<iframe id="apporUserSelect" name="apporUserSelect" src="/cmc/module/user/selectGroupUser.html" frameborder=0 height=100% width=100% scrolling=no></iframe>'
        });
        var winTopLeft = CMC.getWindowTopLeft("selectApporUser");
        $('#selectApporUser').window({
            top:winTopLeft.winTop,
            left:winTopLeft.winLeft
        });
    }
}
