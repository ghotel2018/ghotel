
var pnrDataQuery =  {
	searchTableRequired: true,
	menuId: "PnrDataQuery",
	searchUrl: "authorized/pnrDataQuery/getAll" ,
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

function show(text){
	CMC.dialog('showDetail','open');
	$("#data").val(JSON.stringify(text));
}


$("#query").click(function(event) {
	$("#searchForm").form("enableValidation");

    var locator=$("#locator").textbox("getValue");
		

    if(locator==""){
        $("#searchForm").form("enableValidation");
        // $("#startDate").datebox({required:true});
        // $("#endDate").datebox({required:true});
        var startTimeAdd=$("#startDate").datebox('getValue');
        var endTimeAdd=$("#endDate").datebox('getValue');
        var returnNum = GetDateDiff(startTimeAdd, endTimeAdd, "day");
        if (returnNum < 0) {
            CMC.alertMessage("开始日期不能大于创建截止日期！","warning");
            return;
        }

        if (returnNum > 1) {
            CMC.alertMessage("日期查询最大跨度为一天！","warning");
            return;
        }
    }else{
        $("#searchForm").form('disableValidation');
        // $("#startDate").datebox({required:false});
        // $("#endDate").datebox({required:false});
    }
    var isValid = $("#searchForm").form("validate");
    if(isValid){
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
				columns:pnrDataQuery.columns,
				singleSelect: true,
				pagination:  true,
				rownumbers : true,
				pageList: [10],
				onDblClickRow:pnrDataQuery.onDblClickRow||function (index, row) {},
				loadMsg: "亲~ 正在加载数据,请稍后...",
				emptyMsg: "亲~ 很抱歉没有查询任何数据."
			});
		pnrDataQuery.search(1,10);
		
		// //注册分页事件
			$("#srTable").datagrid("getPager").pagination({
				onSelectPage: function(pageNum,pageSize){
		        	//初始化查询分页参数
					//alert("onselect"+ pageNum +"+"+ pageSize);
		        	$(".CMCSearchForm").form('load',{
		        		start : (pageNum-1) *pageSize +1,
		        		end : pageNum *pageSize
		        	});
		        	pnrDataQuery.search(pageNum,pageSize);
		        	
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

pnrDataQuery.search=function(pageNum,pageSize){
	$("#srTable").datagrid("loading");
	
	CMC.request({
		url: pnrDataQuery.searchUrl,
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



$("#reset").click(function(){
	$("#id").textbox("setValue","");
	$("#locator").textbox("setValue","");
    $("#startDate").datebox("setValue", "");
    $("#endDate").datebox("setValue", "");
//	initDate();
});




$(document).ready(function(){
//	initDate();
//	$("#query").click();
});