/**
 * @Date 2016-06-16
 * @Desc最低价保障申诉查询
 */

var LowestFareGuarantee =  {
		searchTableRequired: true,
		menuId: "LowestFareGuarantee",
		updateUrl: 'authorized/lowestFareGuarantee/update',
		updateByCaseIdUrl: 'authorized/lowestFareGuarantee/updatebycaseid',
		searchUrl: "authorized/lowestFareGuarantee/getAll" ,
		getUrl: "authorized/lowestFareGuarantee/get" ,
		exportUrl:"authorized/lowestFareGuarantee/export",
		//getGroupUrl: "authorized/insurance/getConfig" ,
		columns :  [[
						{field: 'caseid', title:'申诉单号' , width: '10%' , align: 'center'},
						{field: 'ticketNo', title:'票号' , width: '10%' , align: 'center'},
						{field: 'datesubmittedString', title:'提交日期' , width: '20%' , align: 'center'},
						{field: 'psgName', title:'旅客姓名' , width: '10%' , align: 'center'},
						{field: 'passengerffpno', title:'明珠卡号' , width: '20%' , align: 'center'},
						{field: 'mobile', title:'手机号码' , width: '10%' , align: 'center'},
						{field: 'statusMc', title:'申诉状态' , width: '10%' , align: 'center'}
		           ]],
        onDblClickRow: function(){
        	$("#lowestFareGuarantee_update").click();
        }
	};	
(function($){
	
	//更新最低价并弹出窗口
	$("#lowestFareGuarantee_update").click(function(){
		$("#updateForm").form("disableValidation");
		$("#updateForm").form("clear");
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		CMC.request({
			url: LowestFareGuarantee.getUrl +"/"+ record["caseid"],
			method: 'get',
			success: function(result){
				$("#updateForm").form("load",{
					'caseid' : result.messageBody['caseid'],
					'case_id' : result.messageBody['caseid'],
					'datesubmittedString' : result.messageBody['datesubmittedString'],
					'psgName' : result.messageBody['psgName'],
					'passengerffpno' : result.messageBody['passengerffpno'],
					'ticketNo' : result.messageBody['ticketNo'],
					'deptDate' : result.messageBody['deptDate'],
					'airLine' : result.messageBody['airLine'],
					'mobile' : result.messageBody['mobile'],
					'email' : result.messageBody['email'],
					'farediff' : result.messageBody['farediff'],
					'statusMc' : result.messageBody['statusMc'],
					'status' : result.messageBody['status'],
					'ticketwebsiteMc' : result.messageBody['ticketwebsiteMc'],
					'complaintMc' : result.messageBody['complaintMc'],
					'complaintdetailMc' : result.messageBody['complaintdetailMc'],
					'querytime' : result.messageBody['querytime'],
					'event' : result.messageBody['event'],
					'userName': CMC.pageConfig.user['userName']
				});
				if (result.messageBody['status']!='F') {
					$('#updateButton').attr('disabled',true);
				}
				CMC.dialog('updatLowestFareGuaranteeDetail','open');
			}
		});
	});
	
	$("#lowestFareGuarantee_success").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		CMC.request({
			url: LowestFareGuarantee.updateByCaseIdUrl +"/"+ record["caseid"],
			method: 'get',
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
				CMC.search();
			}
		});
	});
	
	//更新申诉单状态
	$('.UpdateButton').click(function(){
//		$("#updateForm").form("enableValidation");
//		var isValid = $("#updateForm").form("validate");
		//先判断申诉单状态
		var stat=$("#status").val();
		if(stat=="F"){
			CMC.request({
				url: LowestFareGuarantee.updateUrl,
				method: 'post',
				data : $("#updateForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.dialog('updatLowestFareGuaranteeDetail','close');
					CMC.search();

					$("#updateForm").form("clear");
				}
			});
		}else{
			CMC.alertMessage('只能操作申诉状态为“申诉失败”的申诉单！','info');
		}
	});
	
	$("#lowestFareGuarantee_export").click(function(){
		CMC.request({
			url: LowestFareGuarantee.exportUrl,
			method: 'post',
			data : $("#searchForm").form().serialize(),
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
			}
		});
	});
	
	$("#lowestFareGuarantee_reset").click(function(){
		$("#input_caseid").textbox('setValue','');
		$("#ticketNo").textbox('setValue','');
		$("#input_datesubmittedStart").datebox("setValue", '');
		$("#input_datesubmittedEnd").datebox("setValue", '');
		$("#input_deptDateStart").datebox("setValue", '');
		$("#input_deptDateEnd").datebox("setValue", '');
		$("#showChannelName_report").hide();
		$("#type").combobox('select','');
	});
	//初始化下拉框
	LowestFareGuarantee.init = function(){
		//$("#addForm").form("enableValidation");
	};
	
})(jQuery);

$(document).ready(function(){
	CMC.init(LowestFareGuarantee);	
});







