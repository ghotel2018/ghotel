/**
 * zhangyeping
 */
var CmcCoupAccounPayment = {
	menuId: "CmcCoupAccounPayment",
    searchUrl : '/authorized/coupAccounPayment/getAll',
    exportUrl : '/authorized/coupAccounPayment/export',
    exportedData:null,
    onDblClickRow:onDblClick,
    searchTableRequired : true,
    columns : [[  
		 {
			field : 'cmcPaymentId',
			width : '7%',
			title : "充值编号",
			align : 'center'
		},{
			field : 'operateId',
			width : '7%',
			title : "充值账户",
			align : 'center'
		},{
			field : 'operateName',
			width : '10%',
			title : "充值姓名",
			align : 'center'
		},{
			field : 'operateTime',
			width : '11%',
			title : "充值时间",
			align : 'center',
			formatter : function(value) {
				if(value)
				 return new Date(value).format("yyyy-MM-dd HH:mm:ss");
			    return "";
			}
		},{
			field : 'operateValue',
			width : '10%',
			title : "充值金额",
			align : 'center'
		},{
			field : 'preOperateValue',
			width : '10%',
			title : "充值前金额",
			align : 'center'
		},{
			field : 'typeKey',
			width : '7%',
			title : "优惠券模块",
			align : 'center',
			formatter: function(value,row,index){
				if(value=="1"){
					return "国内"
				}else if(value=="2"){
					return "国际";
				}else if(value=="3"){
					return "韩国";
				}else if(value=="4"){
					return "澳洲";
				}else if(value=="5"){
					return "新西兰";
				}else if(value=="6"){
					return "新加坡";
				}else if(value=="7"){
					return "英国";
				}
			}
		  },{
				field : 'status',
				width : '7%',
				title : "状态",
				align : 'center',
				formatter: function(value,row,index){
					 if(value=="1"){
						return "未审核"
					}else if(value=="2"){
					    return "已通过";
					} else if(value=="3"){
					     return "未通过";
				     }
				}
		  },{
				field : 'aproveId',
				width : '9%',
				title : "审批人账户",
				align : 'center'
				} ,{
					field : 'aproveTime',
					width : '11%',
					title : "审批时间",
					align : 'center',
					formatter: function(value,row,index){
						if(value)
							return new Date(value).format("yyyy-MM-dd HH:mm:ss");;
					}
				},{
						field : 'aproveName',
						width : '9%',
						title : "审批人姓名",
						align : 'center'
    }]]
};
function onDblClick(){
	
}
CmcCoupAccounPayment.selectAll=function(){
	if((!$("#noticeSearchForm  #startTime").combobox('getValue'))&&(!$("#noticeSearchForm  #endTime").combobox('getValue'))
		&&(!$("#noticeSearchForm  #typeKey").combobox('getValue'))
		&&(!$("#noticeSearchForm  #status").combobox('getValue'))
	){
		CMC.alertMessage("请输入至少一个查询条件！", 'info');
		return;
	}
	CMC.search();
}
CmcCoupAccounPayment.exportExl=function(){
	$("#coupGroupCreatFrom").dialog({
	    collapsible: true,
	    title: "优惠券充值报表导出",
	    minimizable: false, 
	    maximizable: false,
	    resizable: false,
	    modal:true,
	    width: 400,
	    height: 200,
	    buttons:[{ 
			text:'提交', 
			iconCls:'icon-ok', 
			left:50,
			handler:function(){
				if((!$("#coupGroupExpFrom  #startTime").combobox('getValue'))&&(!$("#coupGroupExpFrom  #endTime").combobox('getValue'))
					&&(!$("#coupGroupExpFrom  #typeKey").combobox('getValue'))
					&&(!$("#coupGroupExpFrom  #status").combobox('getValue'))
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
$(document).ready(function() {
	CMC.init(CmcCoupAccounPayment);
});