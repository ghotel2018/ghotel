/**
 * huangxin
 */
var CmcCoupAccountPayment = {
	menuId: "CmcCoupAccountPaymentNZL",
    searchUrl : '/authorized/coupAccountPaymentNZL/getNZLAll',
    getNZLAccount : '/authorized/coupAccountPaymentNZL/getNZLAccount',
    addUrl : '/authorized/coupAccountPaymentNZL/addNZLAccount',
    exportedData:null,
    onDblClickRow:onDblClick,
    searchTableRequired : true,
    columns : [[  
		 {
			field : 'cmcPaymentId',
			width : '10%',
			title : "充值编号",
			align : 'center',
		},{
			field : 'operateTime',
			width : '15%',
			title : "充值时间",
			align : 'center',
			formatter : function(value) {
				if(value)
				 return  timeStamp2String(value);
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
				field : 'status',
				width : '10%',
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
					width : '10%',
					title : "审批人账户",
					align : 'center',
					} ,{
						field : 'aproveTime',
						width : '15%',
						title : "审批时间",
						align : 'center',
						formatter: function(value,row,index){
							if(value)
								return  timeStamp2String(value);
						}
					},{
							field : 'aproveName',
							width : '10%',
							title : "审批人姓名",
							align : 'center'
    }]],
};
function onDblClick(){
	
}
CmcCoupAccountPayment.reset=function(value){
	var start= $("#noticeSearchForm input[name='start']:hidden").val();
	var end=$("#noticeSearchForm input[name='end']:hidden").val();
	$('#noticeSearchForm').form('clear');
	$("#noticeSearchForm input[name='start']:hidden").val(start);
	$("#noticeSearchForm input[name='end']:hidden").val(end);
}
CmcCoupAccountPayment.Search=function(value){
	CMC.search();
	CmcCoupAccountPayment.queryAccount("accountValue");
}
CmcCoupAccountPayment.queryAccount = function(formid){
	CMC.request({
		url: CmcCoupAccountPayment.getNZLAccount,
		method: "get",
		dataType: "json",
		async: true,
	  	success: function(response){
  			var accountValue = response.messageBody;
  			if(accountValue==null){
  				accountValue="0";
  			}
  			accountValue=accountValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  			$("#"+formid).text(accountValue);
	  	},
	  	failedRequestHandler: function(response){
	  		$("#"+formid).html('0');
	  		$("#"+formid).parent().find(".error").html("无法获取余额");	
	  	}
	});
}
$(document).ready(function() {
	CMC.init(CmcCoupAccountPayment);
	CmcCoupAccountPayment.queryAccount("accountValue");
});
CmcCoupAccountPayment.add=function(){
	$("#coupAccountPaymentNZLCreatFrom").dialog({
	    collapsible: true,
	    title: "虚拟帐号充值",
	    minimizable: false, 
	    maximizable: false,
	    resizable: false,
	    modal:true,
	    width: 400,
	    height: 350,
	    href:"/cmc/module/coupon/virtualAccount2.html",
	    onLoad: function () {
	    	$(".currency").each(function(i){ 
	    		$(this).text("NZD"); 
	    	});
	    	CmcCoupAccountPayment.queryAccount("addAccountValue");
	    	$("#addCoupAccountForm").form('validate');
	    },
	    buttons:[{ 
			text:'提交', 
			iconCls:'icon-ok', 
			left:50,
			handler:function(){ 
				var ok=$("#addCoupAccountForm").form('validate');
				if(ok){
					var valueNum=$("#addCoupAccountForm #operateValue").val();
					if(parseInt(valueNum)%5 != 0 || valueNum.length<2 ||valueNum.length>10){
						CMC.alertMessage("充值金额应为5的倍数，且不能小于2位数，或大于10位！", 'error');
						return ;
					}
					if($("#addCoupAccountForm #remark").val().replace(/[^\x00-\xff]/g, "**").length>100){
						CMC.alertMessage("最多填写100个字节！", 'error');
						return ;
					}
					CMC.dialog('coupAccountPaymentNZLCreatFrom','close');
					CMC.request({
						url: CmcCoupAccountPayment.addUrl,
						method: 'POST',
						data : $("#addCoupAccountForm").form().serialize(),
						success: function(message){
							CMC.alertMessage("提交成功！", 'info');
							CMC.search();
						}
					});
				}else{
					CMC.alertMessage("信息未填写完整!", 'info');
				}
			}
	   },{ 
			text:'关闭', 
			iconCls:'icon-clear', 
			left:50,
			handler:function(){ 
				CMC.dialog("coupAccountPaymentNZLCreatFrom", "close");
			}
	   }]
	});
}
$.extend($.fn.validatebox.defaults.rules, {
    comboVry: {
        validator: function (value, param) {//param为默认值
            return value == param;
        },
        message: '请选择内容'
    }
});
