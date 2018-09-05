function AproveEdit100003(){
	$("#addI18nDeptAudit").dialog({
		title: '优惠劵账户充值审批',
        collapsible: true,
        minimizable: false, 
        maximizable: false,
        resizable: false,
        modal:true,
        width: 400,
        height: 260,
        href: '/cmc/module/workflow/couponGroup/virtualAccountApprove.html',
        onLoad: function () {
        	var record = $('#workFlowTable').datagrid('getSelected');
			if(record==null){
				CMC.alertMessage("请选择记录！",'warn');
				return ;
			}
        	addAccountValue($("#addI18nDeptAudit  #addAccountValue"),record['typeKey']);
        },
        buttons:[{ 
			text:'同意', 
			iconCls:'icon-ok', 
			left:50,
			handler:function(){ 
				var record = $('#workFlowTable').datagrid('getSelected');
				if(record==null){
					CMC.alertMessage("请选择记录！",'warn');
					return ;
				}
				var data = {};
				data.cmcApplyRecId = record['cmcApplyRecId'];
				data.taskId = record['taskId'];
				data.processInstanceId = record['processInstanceId'];
				data.comment = $("#addI18nDeptAudit #applyComment").val();
				data.approveFlag=true;
				comitTaskFlow(data)
			}},
           { 
			text:'不同意', 
			iconCls:'icon-back', 
			left:50,
			handler:function(){ 
				var applyComment=$.trim($("#addI18nDeptAudit #applyComment").val());
				if(applyComment==null||!applyComment||applyComment.length<1){
					CMC.alertMessage("请填写不同意信息！",'warn');
					return ;
				}
				var record = $('#workFlowTable').datagrid('getSelected');
				if(record==null){
					CMC.alertMessage("请选择记录！",'warn');
					return ;
				}
				var data = {};
				data.cmcApplyRecId = record['cmcApplyRecId'];
				data.taskId = record['taskId'];
				data.processInstanceId = record['processInstanceId'];
				data.comment = $("#addI18nDeptAudit #applyComment").val();
				data.approveFlag=false;
				comitTaskFlow(data)
			}},
	        { 
				text:'关闭', 
				iconCls:'icon-clear', 
				left:50,
				handler:function(){ 
					CMC.dialog("addI18nDeptAudit", "close");
			}}
        ]
    });
}
function AdustNum100003(){
	$("#addI18nDeptAudit").dialog({
		title: '优惠劵账户充值驳回修改',
        collapsible: true,
        minimizable: false, 
        maximizable: false,
        resizable: false,
        modal:true,
        width: 400,
        height: 340,
        href: '/cmc/module/workflow/couponGroup/virtualAccountEdit.html',
        onLoad: function () {
        	Workflow.onloadComment($("#addI18nDeptAudit #comment",function(){}) );
        	var record = $('#workFlowTable').datagrid('getSelected');
			if(record==null){
				CMC.alertMessage("请选择记录！",'warn');
				return ;
			}
			addAccountValue($("#addI18nDeptAudit  #addAccountValue"),record['typeKey']);
			var jsonStr=record['applyParameter'];
			var jsonObj = JSON.parse(jsonStr);
        	$("#addI18nDeptAudit #valueNum").numberbox('setValue',jsonObj.operateValue);
        	$("#addI18nDeptAudit #remark").textbox('setValue',jsonObj.remark);
        },
        buttons:[{ 
			text:'重提', 
			iconCls:'icon-ok', 
			left:50,
			handler:function(){ 
				var record = $('#workFlowTable').datagrid('getSelected');
				if(record==null){
					CMC.alertMessage("请选择记录！",'warn');
					return ;
				}
				var data = {};
				data.cmcApplyRecId = record['cmcApplyRecId'];
				data.taskId = record['taskId'];
				data.processInstanceId = record['processInstanceId'];
				data.comment = $("#addI18nDeptAudit #applyComment").val();
				var obj = {};
				obj.operateValue = $("#addI18nDeptAudit #valueNum").val();
				obj.remark = $("#addI18nDeptAudit #remark").val();
				data.obj=obj;
				data.reApply=true;
				comitTaskFlow(data);
			}},
           { 
			text:'取消重提', 
			iconCls:'icon-clear', 
			left:50,
			handler:function(){
				var record = $('#workFlowTable').datagrid('getSelected');
				if(record==null){
					CMC.alertMessage("请选择记录！",'warn');
					return ;
				}
				var data = {};
				data.cmcApplyRecId = record['cmcApplyRecId'];
				data.taskId = record['taskId'];
				data.processInstanceId = record['processInstanceId'];
				data.comment = $("#applyComment").val();
				data.reApply=false;
				comitTaskFlow(data);
			}},
	        { text:'关闭', 
				iconCls:'icon-clear', 
				left:50,
				handler:function(){ 
					CMC.dialog("addI18nDeptAudit", "close");
			}}
        ]
    });
}
function addAccountValue(obj,type){
	var url="";
	if(type=="100003"||type=="100001"){
		url= "/authorized/coupAccounPaymentDome/getDomAccount";
	}else if(type=="100004"||type=="100002"){
		url="/authorized/coupAccounPaymentI18n/getI18nAccount";
	}else if(type=="100008"){
		url="/authorized/coupAccountPaymentKorea/getKoreaAccount";
	}else if(type=="100011"||type=="100010"){
		url="/authorized/coupAccountPaymentAUS/getAUSAccount";
	}else if(type=="100014"){
		url="/authorized/coupAccountPaymentNZL/getNZLAccount";
	}else if(type=="100017"){
		url="/authorized/coupAccountPaymentSingapore/getSingaporeAccount";
	}else if(type=="100020"){
		url="/authorized/coupAccountPaymentOverseas/getOverseasAccount?channel=161885";
	}else if(type=="100023"){
		url="/authorized/coupAccountPaymentOverseas/getOverseasAccount?channel=CSQ7";
	}else if(type=="100026"){
		url="/authorized/coupAccountPaymentOverseas/getOverseasAccount?channel=CSQ8";
	}
	CMC.request({
		url: url,
		method: "get",
		dataType: "json",
		async: true,
	  	success: function(response){
  			accountValue = response.messageBody;
  			if(accountValue==null){
  				accountValue="0";
  			}
  			accountValue=accountValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  			obj.text(accountValue);
	  	},
	  	failedRequestHandler: function(response){
	  		obj.html('0');
	  		obj.parent().find(".error").html("无法获取余额");	
	  	}
	});
}