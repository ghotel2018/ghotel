/**
 * @author wuxiaonin
 */

var flightStatusQuery =  {
	searchTableRequired: true,
	menuId: "FlightStatusQuery",
	searchUrl: "authorized/flightStatusQuery/getAll" ,
	columns :  [[
					{field: 'id', title:'ID' , width: '25%' , align: 'center'},
					{field: 'dataJSON', title:'DATA' , width: '64%' , align: 'center'},
					{field: 'op', title:'查看' , width: '10%' , align: 'center',
						formatter: function(value,row,index){
							return "<a href='javascript:void(0)' onclick='showJSONDetails("+index+")'>详细</a>";
						}
					}
			   ]]
};	

$("#reset").click(function(){
	$("#id").textbox("setValue","");
	$("#startDate").datebox("setValue","");
	$("#endDate").datebox("setValue","");
});

function show(text){
	CMC.dialog('showDetail','open');
	$("#data").val(JSON.stringify(text));
}



$("#query").click(function(event) {
	$("#searchForm").form("enableValidation");
		var isValid = $("#searchForm").form("validate");
		
		if(isValid){
//			var startTimeAdd=$("#startDate").datebox('getValue');
//			var endTimeAdd=$("#endDate").datebox('getValue');	
//			var returnNum = GetDateDiff(startTimeAdd, endTimeAdd, "day");
//			if (returnNum < 0) {
//				CMC.alertMessage("创建开始日期不能大于创建截止日期！","warning");
//				return;
//			}
//
//			if (returnNum > 1) {
//				CMC.alertMessage("创建日期查询最大跨度为一天！","warning");
//				return;
//			}
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
				columns:flightStatusQuery.columns,
				singleSelect: true,
				pagination:  true,
				rownumbers : true,
				pageList: [10],
				onDblClickRow:flightStatusQuery.onDblClickRow||function (index, row) {},
				loadMsg: "亲~ 正在加载数据,请稍后...",
				emptyMsg: "亲~ 很抱歉没有查询任何数据."
			});
		flightStatusQuery.search(1,10);
		
		// //注册分页事件
			$("#srTable").datagrid("getPager").pagination({
				onSelectPage: function(pageNum,pageSize){
		        	//初始化查询分页参数
					//alert("onselect"+ pageNum +"+"+ pageSize);
		        	$(".CMCSearchForm").form('load',{
		        		start : (pageNum-1) *pageSize +1,
		        		end : pageNum *pageSize
		        	});
		        	flightStatusQuery.search(pageNum,pageSize);
		        	
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

flightStatusQuery.search=function(pageNum,pageSize){
	$("#srTable").datagrid("loading");
	
	CMC.request({
		url: flightStatusQuery.searchUrl,
		method: 'POST',
		data : $("#searchForm").form().serialize(),
		success: function(message){
			if (message.messageBody!='') {
				$("#searchForm input[name='start']").val(message.messageBody.start);
				$("#searchForm input[name='end']").val(message.messageBody.num);
				$("#srTable").datagrid("loaded");
//				CMC.setGridData($("#srTable"),message);
				$("#srTable").datagrid("loadData",message.messageBody.list);
				$("#srTable").datagrid("getPager").pagination({
					total : message.messageBody.total,
					pageNumber : message.messageBody.num/(message.messageBody.num - message.messageBody.start + 1)
				});
				var list=message.messageBody.list;
				if(list.length>0){
					$("#endId").val(list[list.length-1].id);
				}
			}			
		}
	});
}

////比较日期
//function GetDateDiff(startTime, endTime, diffType) {
//	// 将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
//	startTime = startTime.replace(/-/g, "/");
//	endTime = endTime.replace(/-/g, "/");
//	// 将计算间隔类性字符转换为小写
//	diffType = diffType.toLowerCase();
//	var sTime = new Date(startTime); // 开始时间
//	var eTime = new Date(endTime); // 结束时间
//	// 作为除数的数字
//	var divNum = 1;
//	switch (diffType) {
//	case "second":
//		divNum = 1000;
//		break;
//	case "minute":
//		divNum = 1000 * 60;
//		break;
//	case "hour":
//		divNum = 1000 * 3600;
//		break;
//	case "day":
//		divNum = 1000 * 3600 * 24;
//		break;
//	default:
//		break;
//	}
//	return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum)); // 17jquery.com
//}

$(document).ready(function(){
	//当前时间时间
//	var nowDate=new Date();
//	var now=nowDate.getFullYear()+"-"+(nowDate.getMonth()+1)+"-"+nowDate.getDate();
//	//前一天的时间戳
//	var yesterTimeSamp = new Date(new Date().getTime() - 86400000);
//	
//	var yesterDate=new Date(yesterTimeSamp);
//	//前一天日期
//	var yester=yesterDate.getFullYear()+"-"+(yesterDate.getMonth()+1)+"-"+yesterDate.getDate();
//	
//	$("#startDate").datebox('setValue',yester);
//	$("#endDate").datebox('setValue',now);
//	CMC.init(flightStatusQuery);
//	$("#query").click();
});
