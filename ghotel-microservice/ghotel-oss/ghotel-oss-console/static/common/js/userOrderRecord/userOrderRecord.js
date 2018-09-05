/**
*
*/
var UserOrderRecord =  {
	searchTableRequired: false,
	menuId: "UserOrderRecord",
	searchUrl: "authorized/userOrderRecord/getAll",
	columns :  [[
					{field: 'orderNo', title:'订单号' , width: '15%' , align: 'center'},
					{field: 'bookUser', title:'明珠号' , width: '10%' , align: 'center'},
					{field: 'createDate', title:'创单日期' , width: '15%' , align: 'center'},
					{field: 'seatNum', title:'占座数' , width: '8%' , align: 'center'},
					{field: 'status', title:'订单状态' , width: '15%' , align: 'center',
						formatter: function(value){
			        	   if(value=="D"){
			        		   return '取消';
			        	   }else if(value=="N"){
				        	   return "未提交";
			        	   }else if(value=="S"){
				        	   return "已提交";
			        	   }else if(value=="Q"){
				        	   return "审核不通过";
			        	   }else if(value=="C"){
				        	   return "已确认";
			        	   }else if(value=="L"){
				        	   return "里程支付中";
			        	   }else if(value=="M"){
				        	   return "里程支付成功状态";
			        	   }else if(value=="P"){
				        	   return "支付";
			        	   }else if(value=="X"){
				        	   return "支付失败";
			        	   }else if(value=="B"){
				        	   return "支付成功";
			        	   }else if(value=="T"){
				        	   return "出票";
			        	   }else if(value=="O"){
				        	   return "出票成功";
			        	   }else if(value=="R"){
				        	   return "确认订座";
			        	   }else if(value=="E"){
				        	   return "确认完成";
			        	   }
				        }
					},
					{field: 'depAirPort', title:'始发地' , width: '5%' , align: 'center'},
					{field: 'arrAirPort', title:'到达地' , width: '8%' , align: 'center'},
					{field: 'cabin', title:'舱位' , width: '8%' , align: 'center'},
					{field: 'flightDate', title:'航班日期' , width: '15%' , align: 'center'}
				]]
};

$("#reset").click(function(event) {
	$("#input_bookUser").textbox('setValue','');
	$("#input_createStartTime").datebox('setValue','');
	$("#input_createEndTime").datebox('setValue','');
});

$("#query").click(function(event) {
	$("#searchForm").form("enableValidation");
		var isValid = $("#searchForm").form("validate");
		
		if(isValid){
			var startTimeAdd=$("#input_createStartTime").datebox('getValue');
			var endTimeAdd=$("#input_createEndTime").datebox('getValue');	
			var returnNum = GetDateDiff(startTimeAdd, endTimeAdd, "day");
			if (returnNum < 0) {
				CMC.alertMessage("下单开始日期不能大于下单截止日期！","warning");
				return;
			}

			if (returnNum > 90) {
				CMC.alertMessage("下单日期查询最大跨度为90天！","warning");
				return;
			}
		$("#searchResult").remove();
		$("#mainContent").append("<div id='searchResult' style='margin:10px 0;'><table id='srTable' class='easyui-datagrid' title='查询结果' style='width:100%;height:360px'></table></div>");
		$("#searchForm").append("<input type='hidden' name='start' value=1 /> <input type='hidden' name='end' value=10 />");

		$.parser.parse($('#searchResult'));
		$("#searchForm input[name='start']").val(1);
					$("#searchForm input[name='end']").val(10);
		$("#srTable").datagrid("getPager").pagination({
			total : 0,
			pageNumber : 0
		});
		$("#srTable").datagrid({
				columns:UserOrderRecord.columns,
				singleSelect: true,
				pagination:  true,
				rownumbers : true,
				onDblClickRow:UserOrderRecord.onDblClickRow||function (index, row) {},
				loadMsg: "亲~ 正在加载数据,请稍后...",
				emptyMsg: "亲~ 很抱歉没有查询任何数据."
			});
		UserOrderRecord.search(1,10);
		
		// //注册分页事件
			$("#srTable").datagrid("getPager").pagination({
				onSelectPage: function(pageNum,pageSize){
		        	//初始化查询分页参数
					//alert("onselect"+ pageNum +"+"+ pageSize);
		        	$(".CMCSearchForm").form('load',{
		        		start : (pageNum-1) *pageSize +1,
		        		end : pageNum *pageSize
		        	});
		        	UserOrderRecord.search(pageNum,pageSize);
		        	
				},
				onBeforeRefresh: function(pageNum,pageSize){
				},
				onRefresh: function(pageNum,pageSize){
					//初始化查询分页参数
					// alert("onrefresh" + pageNum+ "+"+ pageSize);
		   //      	$("#"+CMC.currentPage.searchFormId).form('load',{
		   //      		num : (pageNum-1) *pageSize +1,
		   //      		end : pageNum *pageSize
		   //      	});
		   //      	CMC.search();
				},
				onChangePageSize:function(pageSize){	
					//初始化查询分页参数
					/*alert( "onChangePageSize" + pageSize);
		        	$("#"+CMC.currentPage.searchFormId).form('load',{
		        		num : ($('#'+CMC.paginationSetting.searchTable).datagrid("getPager").pageNumber-1) *pageSize +1,
		        		end : $('#'+CMC.paginationSetting.searchTable).datagrid("getPager").pageNumber*pageSize
		        	});
		        	CMC.search();*/
				}
				// total :0,
				// pageNumber: 0,
				// pageSize:10
			});
	}
});

UserOrderRecord.search=function(pageNum,pageSize){
	$("#srTable").datagrid("loading");
	
	CMC.request({
		url: UserOrderRecord.searchUrl,
		method: 'POST',
		data : $("#searchForm").form().serialize(),
		success: function(message){
			if (message.messageBody!='') {
				$("#searchForm input[name='start']").val(message.messageBody.start);
				$("#searchForm input[name='end']").val(message.messageBody.num);
				$("#srTable").datagrid("getPager").pagination({
					total : message.messageBody.total,
					pageNumber : pageNum
				});
				$("#srTable").datagrid("loaded");
				CMC.setGridData($("#srTable"),message);
			}			
		}
	});
}


function GetDateDiff(startTime, endTime, diffType) {
	// 将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
	startTime = startTime.replace(/-/g, "/");
	endTime = endTime.replace(/-/g, "/");
	// 将计算间隔类性字符转换为小写
	diffType = diffType.toLowerCase();
	var sTime = new Date(startTime); // 开始时间
	var eTime = new Date(endTime); // 结束时间
	// 作为除数的数字
	var divNum = 1;
	switch (diffType) {
	case "second":
		divNum = 1000;
		break;
	case "minute":
		divNum = 1000 * 60;
		break;
	case "hour":
		divNum = 1000 * 3600;
		break;
	case "day":
		divNum = 1000 * 3600 * 24;
		break;
	default:
		break;
	}
	return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum)); // 17jquery.com
}

$(document).ready(function() {
	// $('#userOrderRecordTabel').datagrid({    
	//     url:UserOrderRecord.searchUrl,
	//     columns:UserOrderRecord.columns
	// }); 
});