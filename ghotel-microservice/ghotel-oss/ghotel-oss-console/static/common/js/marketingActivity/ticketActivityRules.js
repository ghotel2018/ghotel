var TicketActivityRules = {
	menuId: "TicketActivityRules",
	searchTableRequired: true, 
	searchUrl: "authorized/marketingActivity/getTicketActivityRulesPaginationAll",
	getAllUrl: "authorized/marketingActivity/getTicketActivityRulesPaginationAll",
	groupId : '',
	columns :  [[
       {field: 'depAirport', title:'始发地机场码' , width: '15%' , align: 'center'},
       {field: 'arrAirport', title:'到达地机场码' , width: '15%' , align: 'center'},
       {field: 'flightNo', title:'航班号' , width: '10%' , align: 'center'},
       {field: 'cabin', title:'舱位' , width: '15%' , align: 'center'},
       {field: 'flightStartDate', title:'航班开始结束日期' , width: '35%' , align: 'center',
     	   formatter: function(value,row,index){
     		   if (value!=null){
     			   return value+"|"+row.flightEndDate;
     		   }
     	   }
        },
       {field: 'ticketStartDate', title:'购票开始截止日期' , width: '35%' , align: 'center',
      	  formatter: function(value,row,index){
      		  if (value!=null){
      			  return value+"|"+row.ticketEndDate;
      		  }
      	  }
       }
   ]]
	
};
$(document).ready(function(){
	var data = window.parent.MarketingActivityMnt.handleFormData('#marketingActivitySaveForm',"_save");
	if( data!=null && data.actionId != null && data.actionId != ""){
		$("#ruleId").val(data.actionId);
		CMC.init(TicketActivityRules);
	}
});
var openIframeId;
var userId;
var userName;
function closeWin(){
	/*var record = CMC.grid.datagrid("getSelected");
	if(!record){
		CMC.alertMessage("请选择审批人!", 'warn');
		return;
	}
	window.parent.$('#'+userName).textbox('setValue', record['userName']);
	window.parent.$('#'+userId).val(record['userLoginId']);*/
	window.parent.$('#'+openIframeId).dialog('close');
}
var currentNode;

(function($){
	$("#clearCondition").click(function(){
		var start = $("#ticketActivityRulesSearchForm input[name='start']:hidden").val();
		var end = $("#ticketActivityRulesSearchForm input[name='end']:hidden").val();
		var ruleId = $("#ruleId").val();
		$('#ticketActivityRulesSearchForm').form('clear');
		$('#ticketActivityRulesSearchForm').form('clear');
		$("#ruleId").val(ruleId);
		$("#ticketActivityRulesSearchForm input[name='start']:hidden").val(start);
		$("#ticketActivityRulesSearchForm input[name='end']:hidden").val(end);
//		$("input[name='start']:hidden").val("1");
//		$("input[name='end']:hidden").val("10");
		CMC.search();
	});

	TicketActivityRules.init = function (){
		//TicketActivityRules.searchUser();
	};
 
	$("#ticketActivityRules_search").click( function(){
		TicketActivityRules.searchUser();
	});
	TicketActivityRules.searchUser = function(){
		CMC.request({
		    url: TicketActivityRules.searchUrl,
			data: $("#ticketActivityRulesSearchForm").form().serialize(),
			method: "POST",
			success : function(data){
				console.log(data);
				/*$("#userTable").datagrid("loadData",data.messageBody.list);
				$("#userTable").datagrid("getPager").pagination({
					total : data.messageBody.total,
					pageNumber : data.messageBody.num/(data.messageBody.num - data.messageBody.start + 1)
				});*/
			}
		});	
	}
})(jQuery);


