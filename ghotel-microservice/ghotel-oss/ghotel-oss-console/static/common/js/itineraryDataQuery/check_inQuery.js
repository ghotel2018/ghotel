/**
 *
 * @type {{searchTableRequired: boolean, menuId: string, searchUrl: string, columns: [*]}}
 */

var check_InQuery =  {
    searchTableRequired: true,
    menuId: "Check_InQuery",
    searchUrl: "authorized/check_InQuery/getAll" ,
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

$("#reset").click(function () {
    $("#id").textbox('setValue', '');
    $("#tktNo").textbox('setValue', '');
    $("#fltNo").textbox('setValue', '');
    $("#startDate").datebox('setValue', '');
    $("#endDate").datebox('setValue', '');
    $("#ciStartDate").datebox('setValue', '');
    $("#ciEndDate").datebox('setValue', '');
});

$("#query").click(function(event) {

    //值机日期
    var ciStartDate = $("#ciStartDate").datebox('getValue');
    var ciEndDate = $("#ciEndDate").datebox('getValue');

    var id = $("#id").textbox('getValue');
    var startDate = $("#startDate").datebox('getValue');
    var endDate = $("#endDate").datebox('getValue');
    var tktNo = $("#tktNo").textbox('getValue');
    var fltNo = $("#fltNo").textbox('getValue');

    if(id==""&&startDate==""&&endDate==""&&tktNo==""&&fltNo=="") {
        $("#searchForm").form("enableValidation");
        var returnNum = GetDateDiff(ciStartDate, ciEndDate, "day");
        if (returnNum < 0) {
            CMC.alertMessage("创建开始日期不能大于创建截止日期！","warning");
            return;
        }
        if (returnNum > 1) {
            CMC.alertMessage("创建日期查询最大跨度为一天！","warning");
            return;
        }
    }else{
        $("#searchForm").form('disableValidation');
    }

    var isValid = $("#searchForm").form("validate");

    if (isValid) {
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
            columns:check_InQuery.columns,
            singleSelect: true,
            pagination:  true,
            rownumbers : true,
            pageList: [10],
            onDblClickRow:check_InQuery.onDblClickRow||function (index, row) {},
            loadMsg: "亲~ 正在加载数据,请稍后...",
            emptyMsg: "亲~ 很抱歉没有查询任何数据."
        });
        check_InQuery.search(1,10);

        // //注册分页事件
        $("#srTable").datagrid("getPager").pagination({
            onSelectPage: function(pageNum,pageSize){
                //初始化查询分页参数
                //alert("onselect"+ pageNum +"+"+ pageSize);
                $(".CMCSearchForm").form('load',{
                    start : (pageNum-1) *pageSize +1,
                    end : pageNum *pageSize
                });
                check_InQuery.search(pageNum,pageSize);

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

check_InQuery.search=function(pageNum,pageSize){
    $("#srTable").datagrid("loading");

    CMC.request({
        url: check_InQuery.searchUrl,
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
