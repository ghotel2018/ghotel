/**
 * zhangyeping
 */


var Workflow = {
		menuId: "Workflow",	
    searchUrl : 'authorized/workflow/getALLTaskFlow',
    exportedData:null,
    onDblClickRow:onDblClick,
    searchTableRequired : true,
    columns : [ [
		{
			field : 'applyUserName',
			width : '5%',
			title : "申请人",
			align : 'center'
		},{
			field : 'typeName',
			width : '15%',
			title : "任务类型",
			align : 'center'
		},{
			field : 'startTime',
			width : '12%',
			title : "申请时间",
			align : 'center',
			formatter : function(value) {
				if(value)
				  return  timeStamp2String(value);
				return "";
			}
		},{
			field : 'status',
			width : '6%',
			title : "任务状态",
			align : 'center',
			formatter : function(value) {
			    if(value=="2"){
					return "待审批"
				}else if(value=="3"){
					return "正审批";
				}else if(value=="90"){
					return "已通过";
				}else if(value=="99"){
					return "任务出错 ";
				}else if(value=="80"){
					return "未通过 ";
				}
			    return "";
			}
		},{
			field : 'approveName',
			width : '5%',
			title : "审批人",
			align : 'center'
		},{
			field : 'endTime',
			width : '12%',
			title : "结束时间",
			align : 'center',
			formatter : function(value) {
				if(value)
					  return  timeStamp2String(value);
			    return "";
			}
		},{
			field : 'comment',
			width : '12%',
			title : "审批意见",
			align : 'center',
			formatter : function(value,row,index) {
				if(value&&value.length>10){
					var info= "<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='showComment("+index+")' >&nbsp;&nbsp;&nbsp;详情 </a>";
					return value.substr(0,10)+info;
				}
				return value;
			}
		}
		,{
			field : 'applyParameter',
			width : '60%',
			title : "申请内容信息",
			align : 'left',
			formatter: function(value,row,index){
				if(row&&value)
					return tanfrom(row,index);
			}
		  }
      ]]
};
function onDblClick(){
	
}
Workflow.showWorkFlow = function(value) {
    //$("#showCouponApplyInfo").show().dialog("open");
	//var jsonObj = JSON.parse(jsonStr);
	var record =$('#'+CMC.paginationSetting.searchTable).datagrid('getData').rows[value];
	showWorkFlow(record);
};


function doUserSearch() {
	//$("#selectApporUser").show().dialog("open");
	
	openSelect(window["flag"]);
	$("#selectApplyUserId").show().dialog("open");
	window.frames["apporUserSelect"].openIframeId="selectApplyUserId";
	window.frames["apporUserSelect"].userId="applyUserId";
	window.frames["apporUserSelect"].userName="applyUserName";
}
function openSelect(flag){
	if(!window.frames["apporUserSelect"]){
		$('#selectApplyUserId').show().dialog({
			title: "选择申请人",
			closed: true,
			cache: true,
			width: 750,
			height: 550,
			minimizable: true,
			maximizable: true,
			collapsible: true,
			content: '<iframe id="apporUserSelect" name="apporUserSelect" src="/cmc/module/user/selectGroupUser.html#flag='+ flag +'" frameborder=0 height=100% width=100% scrolling=no></iframe>'
		});
		var winTopLeft = CMC.getWindowTopLeft("selectApplyUserId");
		$('#selectApplyUserId').window({
			top:winTopLeft.winTop,
			left:winTopLeft.winLeft
		});
	}
}
Workflow.reset = function() {
	var start= $("#noticeSearchForm input[name='start']:hidden").val();
	var end=$("#noticeSearchForm input[name='end']:hidden").val();
	$('#noticeSearchForm').form('clear');
	$("#noticeSearchForm input[name='start']:hidden").val(start);
	$("#noticeSearchForm input[name='end']:hidden").val(end);
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

$(document).ready(function() {
	CMC.init(Workflow);
});
function timeStamp2String (time){
    var datetime = new Date();
     datetime.setTime(time);
     var year = datetime.getFullYear();
     var month = datetime.getMonth() + 1;
     var date = datetime.getDate();
     var hour = datetime.getHours();
     var minute = datetime.getMinutes();
     var second = datetime.getSeconds();
     var mseconds = datetime.getMilliseconds();
     return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
};
