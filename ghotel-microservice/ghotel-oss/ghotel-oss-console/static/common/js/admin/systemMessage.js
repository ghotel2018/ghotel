/**
 * @author yys
 * @Date 2017-06-27
 * @Desc 系统消息管理页面
 */

var SystemMessage = {
	searchTableRequired: true, 
	columns :  [[
					{field: 'messageSubject', title:'消息标题' , width: '20%' , align: 'center'},
					//{field: 'messageContent', title:'消息内容' , width: '27%' , align: 'center'},
					{field: 'createDate', title:'发送时间' , width: '10%' , align: 'center',
						formatter:function(value,row,index){
							return new Date(value).toLocaleDateString();
						}
					},
					{field: 'createBy', title:'发送人' , width: '30%' , align: 'left'},
					{field: 'isHot', title:'是否最新' , width: '10%' , align: 'center',
						formatter:function(value,row,index){
							if(value=="1"){
								return "是";
							}else if(value=="0"){
								return "否";
							} else{
								return "异常数值:"+value;
							}
						}
					}
				]],
	menuId: 'SystemMessage',
	searchUrl : 'authorized/systemMessage/getAll',
	addUrl : "authorized/systemMessage/add",
	updatedUrl : "authorized/systemMessage/update",
	deleteUrl : "authorized/systemMessage/delete",
	getUrl: "authorized/systemMessage/get/",
};
var initLoad = 0;


var toolbar;

(function($){
	SystemMessage.beforeUpdateBoxShow = function (id){
		$("#updateForm").form("clear");
		$("#updateForm").form("disableValidation");
		var record = CMC.grid.datagrid("getSelected");
		if(record){
			CMC.request({
				url: SystemMessage.getUrl+record["messageId"],
				method: 'get',
				success: function(result){
					//debugger;
					$("#"+id).form("load",{
						'messageId' : result.messageBody['messageId'],
						'messageSubject' : result.messageBody['messageSubject'],
						'messageContent' : result.messageBody['messageContent'],
						'isHot' : result.messageBody['isHot']
					});
					UE.getEditor('editor2').execCommand('insertHtml', result.messageBody['messageContent'])
					CMC.dialog(id,'open');
				}
			});
		}else{
			CMC.alertMessage("请先选中一条记录！", 'warning');
			return;
		}
	}
	
	SystemMessage.beforeAddBoxShow = function(id){
		$("#addForm").form("reset")
		CMC.dialog(id,'open');
		$("#addForm").form("disableValidation");
		
	}
	
	SystemMessage.submitAddForm = function(){
		$("#addForm").form("enableValidation");
		var isValid = $("#addForm").form("validate");
		//console.log($("#addForm").form().serialize());return;
		if(isValid){
			CMC.request({
				url: SystemMessage.addUrl,
				method: 'POST',
				data : $("#addForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					$("#addForm").form("clear");
					CMC.dialog("addSystemMessageDetail","close");
				}
			});
		}
	};
	
	SystemMessage.submitUpdateForm = function(){
		$("#updateForm").form("enableValidation");
		var isValid = $("#updateForm").form("validate");
		if(isValid){
			CMC.request({
				url: SystemMessage.updatedUrl,
				method: 'POST',
				data : $("#updateForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('updateResourceDetail','close');
					$("#updateForm").form("clear");
				}
			});
		}
	};
	
	SystemMessage.clearForm = function(id) {
		$('#'+id).form('clear');
	};
	
	SystemMessage.deleteSystemMessage = function (){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条系统消息！",'warning');
			return;
		}
		CMC.request({
			url: SystemMessage.deleteUrl,
			method: 'POST',
			data : {"messageId":record.messageId},
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
				CMC.search();
			},
			contraintExist : function(){
				CMC.alertMessage("当前资源已经被权限绑定，请先解除绑定再删除该资源！", "warning");
				return;
			}
		});
	}
	
	$("#viewSystemMessageButton").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条系统消息！",'warning');
			return;
		}
		CMC.request({
			url: SystemMessage.getUrl+record.messageId,
			method: 'get',
			success: function(result){ //viewSystemMessageDetail
				$("#isHot").html(result.messageBody['isHot']=="1"?"是":"否");
				$("#createDate").html(new Date(result.messageBody['createDate']).toLocaleDateString());
				$("#createBy").html(result.messageBody['createBy']);
				$("#messageContent").html(result.messageBody['messageContent']);
				$("#messageSubject").html(result.messageBody['messageSubject']);
				CMC.dialog('viewSystemMessageDetail','open');
			}
		});
		
	});
	
	 toolbar = [{
		    text:'新增模块',
		    iconCls:'icon-add',
		    handler:function(){
		    	CMC.dialog('addModuleDialog','open');
		    	$("#addModuleForm").form("disableValidation");
		    	$("#addModuleForm").form('reset');
		    }
		}];
})(jQuery);


$(document).ready(function(){
	CMC.init(SystemMessage);
	var ue1 = UE.getEditor('editor1', {toolbars: [['bold','indent','italic','underline','strikethrough','subscript','superscript','source','pasteplain','selectall','horizontal','time','date','fontfamily','fontsize','paragraph','forecolor','backcolor','imagecenter','lineheight']]});
	var ue2 = UE.getEditor('editor2', {toolbars: [['bold','indent','italic','underline','strikethrough','subscript','superscript','source','pasteplain','selectall','horizontal','time','date','fontfamily','fontsize','paragraph','forecolor','backcolor','imagecenter','lineheight']]});
});


