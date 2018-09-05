//国内优惠劵生成审批
function openAddI18nDeptAudit(title){
	if(!title){
		title='国内优惠劵生成审批';
	}
	var record = $('#workFlowTable').datagrid('getSelected');
	if(record==null){
		CMC.alertMessage("请选择记录！",'warn');
		return ;
	}
	var rabtnName="不同意";
	/*if(record["typeKey"]=='100005'||record["typeKey"]=='100006'){
		rabtnName="不同意";
	}*/
	$("#addI18nDeptAudit").dialog({
		title: title,
        collapsible: true,
        minimizable: false, 
        maximizable: false,
        resizable: false,
        modal:true,
        width: 400,
        height: 200,
        href: '/cmc/module/workflow/couponGroup/couponGroupMntFrom.html',
        onLoad: function () {
        	//Workflow.onloadComment();
        },
        buttons:[{ 
			text:"同意", 
			iconCls:'icon-ok', 
			left:50,
			handler:function(){ 
				doTaskFlow(true);
			}},
           { 
			text:rabtnName, 
			iconCls:'icon-back', 
			left:50,
			handler:function(){ 
				var applyComment=$.trim($("#applyComment").val());
				if(applyComment==null||!applyComment||applyComment.length<1){
					CMC.alertMessage("请填写"+rabtnName+"信息！",'warn');
					return ;
				}
				doTaskFlow(false);
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
function openAddI18nAdustNum(){
	$("#addI18nDeptAudit").dialog({
		title: '国内优惠劵生成驳回修改',
        collapsible: true,
        minimizable: false, 
        maximizable: true,
        resizable: true,
        modal:true,
        width: 400,
        height: 200,
        href: '/cmc/module/workflow/couponGroupMntFrom.html',
        onLoad: function () {
        	Workflow.onloadComment();
        },
        buttons:[{ 
			text:'重提', 
			iconCls:'icon-ok', 
			left:50,
			handler:function(){ 
				reApplyAddI18nAdustNum(true);
			}},
           { 
			text:'取消重提', 
			iconCls:'icon-clear', 
			left:50,
			handler:function(){ 
				reApplyAddI18nAdustNum(false);;
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
function reApplyAddI18nAdustNum(flage){
	var record=getCheckRecord();
	if(record==null){return;}
	CMC.request({
		url : Workflow.doTaskFlow,
		method : "POST",
		data :reApplyAddI18nAdustNumData(record,flage),
		success : function(result) {
			CMC.dialog("addI18nDeptAudit", "close");
			Workflow.workFlowSearch();
		}
	});
}

function reApplyAddI18nAdustNumData(record,flage){
	var data = {};
	data.cmcApplyRecId = record['cmcApplyRecId'];
	data.taskId = record['taskId'];
	data.processInstanceId = record['processInstanceId'];
	data.comment = $("#applyComment").val();
	data.reApply=flage;
	return data;
}
function compemnetData(record,flage){
	var data = {};
	data.cmcApplyRecId = record['cmcApplyRecId'];
	data.taskId = record['taskId'];
	data.processInstanceId = record['processInstanceId'];
	data.comment = $("#applyComment").val();
	data.approveFlag=flage;
	return data;
}
function doTaskFlow(flage){
	var record=getCheckRecord();
	if(record==null){return;}
	CMC.request({
		url : Workflow.doTaskFlow,
		method : "POST",
		data :compemnetData(record,flage),
		success : function(result) {
			CMC.dialog("addI18nDeptAudit", "close");
			if(result.statusCode==1){
				CMC.alertMessage(result.messageBody,'warn');
			}else{
				Workflow.workFlowSearch();
			}

		}
	});
}
function openGroupId(){
	var record=getCheckRecord();
	if(record==null){return;}
	var jsonStr=record['applyParameter'];
	var groupId=jsonObj.groupId;
	if(groupId){

	}
}