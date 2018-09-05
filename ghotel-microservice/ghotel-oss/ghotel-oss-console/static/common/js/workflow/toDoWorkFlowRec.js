/**
 * zhangyeping
 */
var Workflow = {
    searchUrl : 'authorized/workflow/getAll',
    getTaskWithVars : 'authorized/workflow/getTaskWithVars',
    getProcessComments : 'authorized/workflow/getProcessComments',
    doTaskFlow : 'authorized/workflow/doTaskFlow',
    exportedData:null,
    onDblClickRow:onDblClick
};
function onDblClick(){
	
}
Workflow.workFlowSearch = function() {
	CMC.request({
		url : Workflow.searchUrl,
		method : "POST",
		data : $('#workFlowSearchForm').form().serialize(),
		success : function(result) {
			$('#workFlowTable').datagrid("loadData",result.messageBody.list);
			$('#workFlowTable').datagrid("getPager").pagination({
				total : result.messageBody.total,
				pageNumber : result.messageBody.num/ (result.messageBody.num- result.messageBody.start + 1)
			});
		}
	});
};
Workflow.showWorkFlow = function(value) {
    //$("#showCouponApplyInfo").show().dialog("open");
	//var jsonObj = JSON.parse(jsonStr);
	var record =$('#workFlowTable').datagrid('getData').rows[value];;
	showWorkFlow(record);
};
Workflow.todoFlow =function(){
	var record = $('#workFlowTable').datagrid('getSelected');
	if(record==null){
		CMC.alertMessage("请选择记录！",'warn');
		return ;
	}
	todoFlow(record);
	//CMC.dialog("addApplyComment", "open");
}
Workflow.onloadComment =function(formId){
	var record = $('#workFlowTable').datagrid('getSelected');
	if(record==null){
		return ;
	}
	var val=record['taskDefinitionKey'];
	CMC.request({
		url : Workflow.getProcessComments,
		method : "POST",
		data :{"cmcApplyRecId":record['cmcApplyRecId'],"taskId":record['taskId'],
			"processInstanceId":record['processInstanceId']},
		success : function(result) {
			var data=result.messageBody;
			var html="";
			for(var i=0;i<data.length&&i<1;i++){
				html+='<tr><td align="right" width="40">审批人：</td><td >'+data[i].userName+'</td>'+ '<td align="right">批注：</td><td >'+data[i].comment+'</td></tr>'
			}
			$("#comment").append(html);
			/*$("#addI18nDeptAudit").dialog('resize',{
				height: 4000
			});*/
		}
	});
}
function comitTaskFlow(datas){
	var record=getCheckRecord();
	if(record==null){return;}
	CMC.request({
		url : Workflow.doTaskFlow,
		method : "POST",
		data :datas,
		success : function(result) {
			CMC.alertMessage(result.messageBody,'warn');
			Workflow.workFlowSearch();
		}
	});
	CMC.dialog("addI18nDeptAudit", "close");
}
Workflow.onloadComment =function(commentObj,funName){
	var record = $('#workFlowTable').datagrid('getSelected');
	if(record==null){
		return ;
	}
	var val=record['taskDefinitionKey'];
	CMC.request({
		url : Workflow.getProcessComments,
		method : "POST",
		data :{"cmcApplyRecId":record['cmcApplyRecId'],"taskId":record['taskId'],
			"processInstanceId":record['processInstanceId']},
		success : function(result) {
			var data=result.messageBody;
			var html="";
			for(var i=0;i<data.length&&i<1;i++){
				html+='<tr><th align="right"  width="60" nowrap="nowrap">审批人：</th><td >'+data[i].userName+'</td></tr><tr><th align="right">批注：</th><td >'+data[i].comment+'</td></tr>'
			}
			$(commentObj).append(html);
		}
	});
}
function getCheckRecord(){
	var record = $('#workFlowTable').datagrid('getSelected');
	if(record==null){
		CMC.alertMessage("请选择记录！",'warn');
		return ;
	}
	return record;
}
Workflow.showCouponApplyInfo= function(formId,record) {
	var data=record['applyParameter'];
	var formdata=JSON.parse( data );
	$("#"+formId+" #applyUser_info").text(record['applyUserId']);
	$("#"+formId+" #groupCode_info").text(formdata.groupCode);
	$("#"+formId+" #flightDate_info").text(formdata.flightDateStr.replace("|", "至"));
	$("#"+formId+" #flightDate_info").text(formdata.flightDateStr.replace("|", "至"));
	
}
$(document).ready(function() {
	$('#refeshBtn').click(Workflow.workFlowSearch);
	$('#toDoWorkflowBtn').click(Workflow.todoFlow);
	$('#workFlowTable').datagrid({
		singleSelect : true,
		pagination : true,
		height:400,
		onDblClickRow:onDblClick,
		columns : [ [ {
			field : 'applyUserName',
			width : '8%',
			title : "申请人",
			align : 'center'
		}, {
			field : 'typeName',
			width : '12%',
			title : "任务节点名称",
			align : 'center'
		}/*, {
			field : 'taskName',
			width : '10%',
			title : "任务类型",
			align : 'center',
		}*/,{
			field : 'startTime',
			width : '15%',
			title : "申请时间",
			align : 'center',
			formatter : function(value) {
				return  timeStamp2String(value);
			}
		},{
			field : 'applyParameter',
			width : '55%',
			title : "申请内容信息",
			align : 'left',
			formatter: function(value,row,index){
				/*var val="";
				if(value&&value.length>50){
					val=value.substr(0,50);
				}*/
				if(row&&value)
				return tanfrom(row,index);
				//return "...<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >查看 </a>"+val;
			}
		  },
		  {
			  field:"cmcApplyRecId",
			  width:"10",
			  title:"cmcApplyRecId",
			  hidden:'true',
			  align:"left"
		  }
		  /*{
				field : 'op1',
				width : '50%',
				title : "历史",
				formatter: function(value,row,index){
					var val="";
					if(value.length>10){
						val=value.substr(0,10);
					}
					return val +"...<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow()' >查看 </a>";
				}
			  }*/
		 ] ]
	});
	$('#workFlowTable').datagrid("getPager").pagination({
		onSelectPage : function(pageNum, pageSize) {
			// 初始化查询分页参数
			$("#workFlowSearchForm").form('load', {
				start : (pageNum - 1) * pageSize + 1,
				end : pageNum * pageSize
			});
			Workflow.workFlowSearch();
		},
		total : 0,
		pageNumber : 1,
		pageSize : 10
	});
	Workflow.workFlowSearch();
	$('#showCouponApplyInfo').show().dialog({
		  title: "国内优惠劵生成申请",
		  closed: true,
		  cache: true,
		  width: 850,
		  height: 600,
		  minimizable: false,
		  maximizable: false,
		  collapsible: false,
		  href:"/cmc/module/coupon/coupGroupInfoFrom.html",
		  onLoad: function () {
			 colose.log("load");
		  }
	});
});
