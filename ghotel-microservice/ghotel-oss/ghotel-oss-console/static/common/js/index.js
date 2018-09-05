var Index = {
	menuId : 'index',
	getTaskUrl : 'authenticated/index/getTasks',
	getNotice : 'authenticated/index/getNotices',
	getExecutingTasks : 'authenticated/index/getExecutingTasks',
	updateUserUrl : 'authenticated/updateUser',
	resetPasswordUrl : 'authenticated/pwdReset',
	messageDetail : 'authenticated/index/messageDetail/',
	noticeDetail : 'authenticated/index/noticeDetail/'
};

(function($) {
	
	Index.DateDiff = function(d1,d2){	//日期运算函数  计算D1与D2天数差异 返回d1-d2
		var day = 24 * 60 * 60 *1000;
		var dateArr = d1.split("-");
		var checkDate = new Date();
		checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
		var checkTime = checkDate.getTime();
		var dateArr2 = d2.split("-");
		var checkDate2 = new Date();
		checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);
		var checkTime2 = checkDate2.getTime();
		var cha = (checkTime - checkTime2)/day;
		return cha;
	}
	
	Index.beforeMessageShow = function (id,messageId){
		$("#updateForm").form("clear");
		$("#updateForm").form("disableValidation");
		CMC.request({
			url: Index.messageDetail+messageId,
			method: 'post',
			success: function(result){
				$("#messageSubject").html(result.messageBody['messageSubject']);
				$("#messageContent").html(result.messageBody['messageContent']);
				//debugger;
				//$("#"+id).form("load",{
				//	'messageId' : result.messageBody['messageId'],
				//	'messageSubject' : result.messageBody['messageSubject'],
				//	'messageContent' : result.messageBody['messageContent'],
				//	'isHot' : result.messageBody['isHot']
				//});
				CMC.dialog(id,'open');
			}
		});
	}
	
	
	Index.showNoticeDetails = function (index) {
		var record = $("#noticeTable").datagrid('getRows')[index];
		console.log(record.NOTUCE_CONTENT);
		$("#noticeDetaill").html("<div>"+record["NOTICE_SUBJECT"]+"</div><br/>参数:<br/>");
		this.data = record["NOTUCE_CONTENT"].substr(3,record["NOTUCE_CONTENT"].length-4);
		console.log(this.data);
		var json_regex = /^\s*([\[\{].*[\}\]])\s*$/; // Ghetto, but it works
		var jsonp_regex = /^[\s\u200B\uFEFF]*([\w$\[\]\.]+)[\s\u200B\uFEFF]*\([\s\u200B\uFEFF]*([\[{][\s\S]*[\]}])[\s\u200B\uFEFF]*\);?[\s\u200B\uFEFF]*$/;
		var jsonp_regex2 = /([\[\{][\s\S]*[\]\}])\);/ // more liberal support... this allows us to pass the jsonp.json & jsonp2.json tests

		var is_json = json_regex.test(this.data);
		var is_jsonp = jsonp_regex.test(this.data);
		if(is_json || is_jsonp){
			
			this.jsonFormatter = new JSONFormatter();
			  
			var outputDoc = '';
			var cleanData = '',
		    callback = '';

			var callback_results = jsonp_regex.exec(this.data);
			if( callback_results && callback_results.length == 3 ){
				callback = callback_results[1];
				cleanData = callback_results[2];
			} else {
				cleanData = this.data;
			}
		  
			try {
				var jsonObj = JSON.parse(cleanData);
				if ( jsonObj ) {        
					outputDoc = this.jsonFormatter.jsonToHTML(jsonObj, callback);
				} else {
				  throw "There was no object!";
				}
			} catch(e) {
				console.log(e);
				outputDoc = this.jsonFormatter.errorPage(e, this.data);
			}
			
			$("#noticeDetaill").append("<div>"+outputDoc+"</div>");
			
			var winTopLeft = CMC.getWindowTopLeft("noticeDetail");
			$('#noticeDetail').window({
				top:winTopLeft.winTop,
				left:winTopLeft.winLeft,
				title: '通知参数',
				closed: false,
				cache: false,
				modal: true
			});
			CMC.dialog('noticeDetail','open');
		}
	}
	
	Index.init = function() {
		if (CMC.pageConfig && CMC.pageConfig.user) {
			var user = CMC.pageConfig.user;
			$('#lastLoginTime').html(user['lastLoginTime']);
			$('#loginUserName').html(user['userName']);
			
			if (user['userType'] == 'OA') {
				$('#resetPwdButton').hide();
			}

			if (user['resetPwdInd'] == '1') {
				$('#msg').html("你的密码还没有重置，请尽快修改！");
			}
		}

		CMC.request({
			url : Index.getExecutingTasks,
			method : "GET",
			dataType : "json",
			success : function(result) {
				var taskList = result.messageBody;
				var correntUser = CMC.pageConfig.user;
				if (taskList && taskList.length > 0) {
					var old = $('#msg').html();
					if (old && old.length > 0) {
						old = old + "<br/>";
					}
					var selfTask = [];
					var otherTask = [];
					var length = taskList.length;
					var i = 0;
					while (i < length) {
						if (correntUser.userLoginId == taskList[i]["TASKCREATEBY"]) {
							selfTask.push(taskList[i]);
						} else {
							otherTask.push(taskList[i]);
						}
						i++;
					}
					if (otherTask.length > 0) {
						old += "当前正在执行的其他用户创建的任务:<br/>";
						for ( var i = 0; i < otherTask.length; i++) {
							old += otherTask[i]["TASKCREATEBY"] + "在【"
									+ otherTask[i]["TASKCREATETIME"]
									+ "】创建的【"
									+ otherTask[i]["TASKNAME"]
									+ "】。<br/>";
						}
						$('#msg').html(old);
					}
				}
			}
		});

		$('#noticeTable').datagrid({
			singleSelect : true,
			pagination : true,
			columns : [ [ {
				field : 'NOTICE_SUBJECT',
				width : '80%',
				title : "通知主题",
				formatter:function(value,row,index){
					return "<a href=\"javascript:;\" onclick=\"Index.showNoticeDetails("+index+")\">"+value+"</a>";
				}
			}, {
				field : 'NOTICE_TYPE',
				width : '20%',
				title : "通知类型",
				formatter : function(value) {
					if (value == 'op') {
						return "功能操作通知";
					}
				}
			} ] ]
		});

		// 注册分页事件
		$('#noticeTable').datagrid("getPager").pagination({
			onSelectPage : function(pageNum, pageSize) {
				// 初始化查询分页参数
				$("#noticeSearchForm").form('load', {
					start : (pageNum - 1) * pageSize + 1,
					end : pageNum * pageSize
				});
				Index.searchNotice();

			},
			total : 0,
			pageNumber : 1,
			pageSize : 10
		});

		$('#taskTable').datagrid({
			singleSelect : true,
			pagination : true,
			columns : [ [ {
				field : 'TASKNAME',
				title : '任务名称',
				width : '24%',
				align : 'left'
			},{
				field : 'TASKCREATETIME',
				title : '创建时间',
				width : '24%',
				align : 'center'
			},{
				field : 'TASKSTATUS',
				title : '任务状态',
				width : '24%',
				align : 'center',
				formatter : function(value, row, index) {
					if (value == '出错') {
						return "<label style='color:red;font-weight:bold;' > "
								+ value + "</label>"
					} else {
						return value;
					}
				}
			},{
				field : 'RESULTSTATUS',
				title : '任务结果',
				width : '13%',
				align : 'center',
				formatter : function(value, row, index) {
					if (value == '失败') {
						return "<label style='color:red;font-weight:bold;' > "
								+ value + "</label>"
					} else {
						if (value) {
							return "<label style='color:green;font-weight:bold;' > "
									+ value
									+ "</label>";
						} else {
							return "";
						}

					}
				}
			},{
				field : 'URI',
				title : '结果下载',
				width : '14%',
				align : 'center',
				formatter : function(value, row, index) {
					if (value && value.length > 0 ) {
						var uri = encodeURI(value);
						return "<a href='javascript:void(0)' onclick=window.open('"
								+ uri + "'); >下载</a>";
					}
				}
			} ] ]
		});
		
		// 注册分页事件
		$('#taskTable').datagrid("getPager").pagination({
			onSelectPage : function(pageNum, pageSize) {
				// 初始化查询分页参数
				// alert("onselect"+ pageNum +"+"+ pageSize);
				if(pageNum!=0){
					$("#taskSearchForm").form('load', {
						start : (pageNum - 1) * pageSize + 1,
						end : pageNum * pageSize
					});
				}
				Index.searchTasks();
			},
			total : 0,
			pageNumber : 1,
			pageSize : 10
		});
		
		$('#messageTable').datagrid({
			singleSelect : true,
			pagination : true,
			columns : [ [ {
				field : 'messageSubject',
				title : '消息标题',
				width : '80%',
				align : 'left',
				formatter:function(value, row, index){
					var str = "<a href=\"javascript:;\" onclick=\"Index.beforeMessageShow('messageDetail','"+row.messageId+"')\">"+value+"</a>";
					if(row.isHot=="1"){
						var now = new Date();
						if(Index.DateDiff(now.getFullYear()+"-"+(1+now.getMonth())+"-"+now.getDate(),typeof(row.createDate)=="undefined"?"1970-01-01":row.createDate.split(" ")[0])<=7){
							str += "<img src=\"common/images/my_job_new.gif\"/>"
						}
					}
					return str;
				}
			},{
				field : 'createDate',
				title : '发送时间',
				width : '19%',
				align : 'center',
				formatter : function(value, row, index) {
					return new Date(value).toLocaleDateString();
				}
			} ] ]
		});
		
		$('#statisticTable').datagrid({
			singleSelect : true,
			pagination : true,
			columns : [ [ {
				field : 'name',
				title : '名称',
				width : '40%',
				align : 'center'
			},{
				field : 'NUM',
				title : '数量',
				width : '12%',
				align : 'center'
			},{
				field : 'USERR',
				title : '用户',
				width : '12%',
				align : 'center'
			} ] ]
		});
		
		$('#messageTable').datagrid("getPager").pagination({
			onSelectPage : function(pageNum, pageSize) {
				// 初始化查询分页参数
				// alert("onselect"+ pageNum +"+"+ pageSize);
				if(pageNum!=0){
					$("#messageSearchForm").form('load', {
						start : (pageNum - 1) * pageSize + 1,
						end : pageNum * pageSize
					});
				}
				Index.searchMessages();
			},
			total : 0,
			pageNumber : 1,
			pageSize : 10
		});
	
		window.setTimeout("Index.initSearch();", 50);

	}

	Index.initSearch = function() {
		//Index.searchTasks();
		//Index.searchNotice();
		//Index.searchMessages();
		//Index.searchStatistic();
		Index.initData();
	}
	
	Index.initData = function(){
		CMC.request({
			url : 'authenticated/index/initData',
			method : "POST",
			data : $('#noticeSearchForm').form().serialize(),
			success : function(result) {
				$('#taskTable').datagrid("loadData", result.messageBody.task.list);
				$('#taskTable').datagrid("getPager").pagination({
					total : result.messageBody.task.total,
					pageNumber : result.messageBody.task.num/ (result.messageBody.task.num- result.messageBody.task.start + 1)
				});
				$('#noticeTable').datagrid("loadData",result.messageBody.notice.list);
				$('#noticeTable').datagrid("getPager").pagination({
					total : result.messageBody.notice.total,
					pageNumber : result.messageBody.notice.num/ (result.messageBody.notice.num- result.messageBody.notice.start + 1)
				});
				$('#messageTable').datagrid("loadData", result.messageBody.message.list);
				$('#messageTable').datagrid("getPager").pagination({
					total : result.messageBody.message.total,
					pageNumber : result.messageBody.message.num/ (result.messageBody.message.num- result.messageBody.message.start + 1)
				});
				$('#statisticTable').datagrid("loadData", result.messageBody.statistic);
			}
		});
	}

	Index.searchNotice = function() {
		CMC.request({
			url : 'authenticated/index/getNotices',
			method : "POST",
			data : $('#noticeSearchForm').form().serialize(),
			success : function(result) {
				$('#noticeTable').datagrid("loadData",result.messageBody.list);
				$('#noticeTable').datagrid("getPager").pagination({
					total : result.messageBody.total,
					pageNumber : result.messageBody.num/ (result.messageBody.num- result.messageBody.start + 1)
				});
			}
		});
	}

	Index.searchTasks = function() {
		CMC.request({
			url : 'authenticated/index/getTasks',
			method : "POST",
			data : $('#taskSearchForm').form().serialize(),
			success : function(result) {
				$('#taskTable').datagrid("loadData", result.messageBody.list);
				$('#taskTable').datagrid("getPager").pagination({
					total : result.messageBody.total,
					pageNumber : result.messageBody.num/ (result.messageBody.num- result.messageBody.start + 1)
				});
			}
		});
	}
	
	Index.searchMessages = function() {
		CMC.request({
			url : 'authenticated/index/getMessages',
			method : "POST",
			data : $('#messageSearchForm').form().serialize(),
			success : function(result) {
				$('#messageTable').datagrid("loadData", result.messageBody.list);
				$('#messageTable').datagrid("getPager").pagination({
					total : result.messageBody.total,
					pageNumber : result.messageBody.num/ (result.messageBody.num- result.messageBody.start + 1)
				});
			}
		});
	}
	
	Index.searchStatistic = function() {
		CMC.request({
			url : 'authenticated/index/getStatistics',
			method : "POST",
			data : $('#statisticSearchForm').form().serialize(),
			success : function(result) {
				$('#statisticTable').datagrid("loadData", result.messageBody);
				//$('#messageTable').datagrid("getPager").pagination({
				//	total : result.messageBody.total,
				//	pageNumber : result.messageBody.num/ (result.messageBody.num- result.messageBody.start + 1)
				//});
			}
		});
	}

	$('#updateUserButton').click(function() {
		CMC.request({
			url : Index.updateUserUrl,
			method : "POST",
			data : $('#userUpdateForm').form().serialize(),
			success : function(result) {
				CMC.alertMessage(result.messageBody, 'warn');
			}
		});
	});

	$('#resetPwdButton').click(function() {
		$('#resetPwdForm')[0].reset();
		$('#oldPwd').focus();
		CMC.dialog('resetPwdDialog', 'open');
	});

	$('#newPwd2').bind('blur', function() {
		if (this.value != $('#newPwd1').val()) {
			$('#newPwd2Msg').html('两次输入的密码不等,请重新输入。');
			this.value = '';
		} else {
			$('#newPwd2Msg').html('');
		}
	});

	$('#submitPwdRequestButton').click(function() {
		var validationPassed = true;

		if ($('#oldPwd').val() == '') {
			validationPassed = false;
			$('#oldMsg').html('请重新输入旧密码。');
		} else {
			$('#oldMsg').html('');
		}

		if ($('#newPwd1').val() == '') {
			validationPassed = false;
			$('#newPwd1Msg').html('请输入新密码。');
		} else {
			$('#newPwd1Msg').html('');
		}

		if ($('#newPwd2').val() == '') {
			validationPassed = false;
			$('#newPwd2').html('请再输入一次新密码.');
		} else {
			$('#newPwd2').html('');
		}

		if ($('#newPwd1').val() != $('#newPwd2').val()) {
			validationPassed = false;
			$('#newPwd2Msg').html('两次输入的密码不一致.');
			$('#newPwd2').val('');
		} else {
			$('#newPwd2Msg').html('');
		}

		if (!validationPassed) {
			CMC.alertMessage("输入有误， 请检查后重新输入!");
			return;
		}

		CMC.request({
			url : Index.resetPasswordUrl,
			method : "POST",
			data : {
				oldPwd : $('#oldPwd').val(),
				newPwd : $('#newPwd1').val()
			},
			success : function(result) {
				CMC.alertMessage(result.messageBody, 'warn');
				CMC.dialog('resetPwdDialog', 'close');
			}
		});
	});
})(jQuery)

$(document).ready(function() {
	CMC.init(Index);
	//当点击首页的tabs时，刷新当前任务数据
	$('.tabs-first').each(function(i, ele){
			$(ele).click(function(){
				Index.initSearch();
			});
	});
});


