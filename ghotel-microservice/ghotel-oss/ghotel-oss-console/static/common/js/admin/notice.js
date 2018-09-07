/**
 * Created by yxin6 on 2016/12/1.
 */

var Notice = {
    searchTableRequired : true,
    columns: [ [ {
        field : 'noticeSubject',
        title : '操作主题',
        width : '30%',
        align : 'left'
    }, {
        field : 'noticeType',
        title : '操作类型',
        width : '20%',
        align : 'center',
        formatter: function(value){
            if(value=='op'){
                return "功能操作通知";
            }
        }
    }, {
        field : 'noticeContent',
        title : '操作内容',
        width : '20%',
        align : 'center'
    }, {
        field : 'noticeReceiver',
        title : '操作人',
        width : '10%',
        align : 'center'
    }, {
        field : 'createTime',
        title : '操作时间',
        width : '10%',
        align : 'center'
    }
    ] ],
    menuId : 'Notice',
    searchUrl : 'authorized/notice/get',
    noticeMntReportSearchUrl : 'authorized/notice/noticeMntReport',
    exportedData:null,
    getModuleUrl:"authorized/notice/getConfig"

};
(function($) {
	
	$("#clearCondition").click(function(){
//		$('#noticeSearchForm').form('clear');
//		$("input[name='start']:hidden").val("1");
//		$("input[name='end']:hidden").val("10");
		
		var start= $("#noticeSearchForm input[name='start']:hidden").val();
		var end=$("#noticeSearchForm input[name='end']:hidden").val();
		$('#noticeSearchForm').form('clear');
		$("#noticeSearchForm input[name='start']:hidden").val(start);
		$("#noticeSearchForm input[name='end']:hidden").val(end);
		CMC.search();
	});
	
	
	$("#exportNotices").click(function(){
		
		
		var noticeReceiver = $("#noticeReceiver").val();//
		var deleteBy = $("#deleteByReport").val();
		var updateModule = $("#updateModule").combobox('getValue');//状态
		var startTime = $("#startTime").datebox('getValue');
		var endTime = $("#endTime").datebox('getValue');
		
	    CMC.fileUpload({
	        url: Notice.noticeMntReportSearchUrl,
	        method: 'POST',
	        dataType: "json",
	        data: {
	            'noticeReceiver':noticeReceiver,
	            'module':updateModule,
	            'startTime':startTime,
	            'endTime':endTime
	            /*'end':0*/
	        },
	        success: function(response){
		  		CMC.alertMessage("导出获取报表异步请求成功,请移步首页并查看报表记录下载文件！", 'info');
		  	},
		  	error: function(){
		  		CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
		  	}
	    });
	});

	Notice.init=function () {
	    CMC.request({
	        url:Notice.getModuleUrl,
	        method: 'GET',
	        success: function(message){
	            $("#updateModule").combobox({
	                //data: [{"value":"Permission","label":"Permission"},{"value":"User","label":"User"},{"value":"Role","label":"Role"},{"value":"Resource","label":"Resource"},{"value":"Group","label":"Group"}],
	                data: message.messageBody,
	                panelHeight: '180px',
	                valueField:'moduleId',
	                textField:'moduleName'
	            });
	    }});
	}
})(jQuery);
$(document).ready(function() {
    CMC.init(Notice);
});