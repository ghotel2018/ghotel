/**
 * @author goc
 * @Date 2016-06-16
 * @Desc 用户管理页面
 */

var User =  {
		searchTableRequired: true, 
		menuId: "User",
		addUrl:'authorized/user/add',
		updateUrl: 'authorized/user/update',
		deleteUrl: "authorized/user/delete",
		searchUrl: "authorized/user/getAll" ,
		getUrl: "authorized/user/get/" ,
		getGroupUrl: "authorized/user/getConfig" ,
		columns :  [[
   			           {field: 'userLoginId', title:'登录账号' , width: '10%' , align: 'center'},
			           {field: 'userName', title:'姓名' , width: '10%' , align: 'center'},
			           {field: 'workMail', title:'邮箱' , width: '15%' , align: 'center'},
			           {field: 'workPhone', title:'工作电话' , width: '15%' , align: 'center'},
			           {field: 'cellPhone', title:'个人电话' , width: '15%' , align: 'center'},
			           {field: 'initPassword', title:'初始化密码' , width: '10%' , align: 'center'},
			           {field: 'resetPwdIndStr', title:'初始化密码已重置' , width: '10%' , align: 'center'},
			           {field: 'status', title:'状态' , width: '10%' , align: 'center'}
		           ]]
	};	
(function($){
	
	$("#user_add").click( function(){
		$("#addForm").form("clear");
		$("#userLoginIdMsg").html("");
		$("#addForm").form("disableValidation");
		CMC.dialog('addUserDetail','open');
	});
	
	$("#user_update").click(function(){
		$("#updateForm").form("disableValidation");
		$("#updateForm").form("clear");
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
			
		}
		CMC.request({
			url: User.getUrl + record["userId"],
			method: 'get',
			success: function(result){
				$("#updateForm").form("load",{
					'userId' : result.messageBody['userId'],
					'userLoginId' : result.messageBody['userLoginId'],
					'userName' : result.messageBody['userName'],
					'workPhone' : result.messageBody['workPhone'],
					'workMail' : result.messageBody['workMail'],
					'cellPhone' : result.messageBody['cellPhone'],
					'status' : result.messageBody['status']
				});
				CMC.dialog('updatUserDetail','open');
			}
		});
	});
	
	$('.UpdateButton').click(function(){
		$("#updateForm").form("enableValidation");
		var isValid = $("#updateForm").form("validate");
		if(isValid){
			CMC.request({
				url: User.updateUrl,
				method: 'POST',
				data : $("#updateForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.dialog('updatUserDetail','close');
					CMC.search();

					$("#updateForm").form("clear");
				}
			});
		}
	});
	
	$('.AddButton').click(function(){
		$("#addForm").form("enableValidation");
		var isValid = $("#addForm").form("validate");
		var patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g; 
		var loginId = $("#addForm #userLoginId").textbox("getValue");
		if(patrn.test(loginId)){ 
			$("#userLoginIdMsg").html("登录名不能为中文.");
			return ; 
		}else{
			$("#userLoginIdMsg").html("");
		}
		if(isValid){
			CMC.request({
				url: User.addUrl,
				method: 'POST',
				data : $("#addForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('addUserDetail','close');
					$("#addForm").form("clear");
				}
			});
		}
	});
	
	$("#User_delete").click(function (){
		
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
			
		}
		  CMC.confirm("删除用户时会解除与用户组的绑定， 请确认是否继续?", function(r){
			  if(r){
				  CMC.request({
						url: User.deleteUrl  ,
						method: 'POST',
						data : record,
						success: function(response){
							CMC.alertMessage(response.messageBody,'info');
							CMC.search();
						}
					});
			  }
		  });
		
	});
	
	User.init = function(){
		//请求加载模块菜单
		CMC.request({
			url: User.getGroupUrl ,
			method: 'GET',
			success: function(response){
				$("#groupId").combotree( "loadData", [{
					"id":-1,
					"text":"系统用户组",
					"children":response.messageBody
				}]);
			}
		});
	}
	
})(jQuery)

$(document).ready(function() {
	CMC.init(User);
});