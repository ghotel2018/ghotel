/**
 * @author goc
 * @Date 2016-06-16
 * @Desc 资源管理页面
 */

var Scheduler = {
	searchTableRequired : true,
	columns : [ [ {
		field : 'jobName',
		title : '工作名称',
		width : '30%',
		align : 'left'
	}, {
		field : 'jobCronExp',
		title : '表达式',
		width : '20%',
		align : 'center'
	}, {
		field : 'jobType',
		title : '任务类型',
		width : '20%',
		align : 'center'
	},/* {
		field : 'jobStatusStr',
		title : '任务状态',
		width : '10%',
		align : 'center'
	}, {
		field : 'jobAutoStartIdStr',
		title : '是否自启动',
		width : '10%',
		align : 'center'
	},*/ {
		field : 'jobEnableIndStr',
		title : '是否启用',
		width : '10%',
		align : 'center'
	},
	{
		field : 'isSingleton',
		title : '是否单列运行',
		width : '10%',
		align : 'center',
		formatter: function(value){
			if(value==0){
				return "支持多实例运行";
			}else{
				return "仅支持单实例运行";
			}
		}
	}/*, {
		field : 'jobEnableInd',
		title : '启用操作',
		width : '10%',
		align : 'center',
		formatter: function(value,row,index){
			if(value==='0'){
				return "<a href='javascript:void(0)' permission='Scheduler:update' onclick='Scheduler.updateEnableInd(1,0);' >启用</a>";
			}else{
				return "<a href='javascript:void(0)' permission='Scheduler:update' onclick='Scheduler.updateEnableInd(0,1);' >禁用</a>";
			}
		}
	}, {
		field : 'jobStatus',
		title : '状态操作',
		width : '10%',
		align : 'center',
		formatter: function(value,row,index){
			if(value=='-1' || value=='2'){
				return "<a href='javascript:void(0)' permission='Scheduler:update' onclick='Scheduler.updateJobStatus(0,1);' >恢复</a>";
			}else if(value=='0'){
				return "<a href='javascript:void(0)' permission='Scheduler:update' onclick='Scheduler.updateJobStatus(0,1);' >启动</a>";
			}else if(value=='1'){
				return "<a href='javascript:void(0)' permission='Scheduler:update' onclick='Scheduler.updateJobStatus(0,1);' >暂停</a>";
			}
		}
	}*/ ] ],
	menuId : 'Scheduler',
	searchUrl : 'authorized/scheduler/getAll',
	addUrl : "authorized/scheduler/add",
	updatedUrl : "authorized/scheduler/update",
	deleteUrl : "authorized/scheduler/delete",
	getUrl : "authorized/scheduler/get/",
	checkCronUrl : "authorized/scheduler/checkCron",
	startJobUrl : "authorized/scheduler/startJob",
	stopJobUrl : "authorized/scheduler/stopJob",
	startAllJobUrl : "authorized/scheduler/startAllJob",
	runJobOneUrl : "authorized/scheduler/runJobOne"

};

function string2Json(s) {   
    var newstr = "";
    for (var i=0; i<s.length; i++) {
        c = s.charAt(i);     
        switch (c) {     
            case '\"':     
                newstr+="\\\"";     
                break;     
            case '\\':     
                newstr+="\\\\";     
                break;     
            case '/':     
                newstr+="\\/";     
                break;     
            case '\b':     
                newstr+="\\b";     
                break;     
            case '\f':     
                newstr+="\\f";     
                break;     
            case '\n':     
                newstr+="\\n";     
                break;     
            case '\r':     
                newstr+="\\r";     
                break;     
            case '\t':     
                newstr+="\\t";     
                break;     
            default:     
                newstr+=c;     
        }
   }
   return newstr;     
}

var JobInstance ={
	columns : [ [ {
		field : 'ipAddr',
		title : 'IP地址',
		width : '20%',
		align : 'center'
	}, {
		field : 'port',
		title : '端口',
		width : '10%',
		align : 'center'
	}, {
		field : 'path',
		title : '路径',
		width : '20%',
		align : 'center'
	}, {
		field : 'status',
		title : '状态',
		width : '10%',
		align : 'center',
		formatter:function(value,row,index){
                var returnValue = "";
                if(value==1){
                	returnValue = "运行中";
                	
                }else if(value==0){
                	returnValue = "未启动";
                }else if(value==-1){
                	returnValue = "<label  style='color:red;'>出错</label>";
                }else {
                	returnValue = "未注册";
                }
                return returnValue;
        }
	}, {
		field : 'healthStatus',
		title : '应用健康状态',
		width : '20%',
		align : 'center',
		formatter:function(value,row,index){
                var returnValue = "";
                if(value==1){
                	returnValue = "正常";
                }else if(value==-1){
                	returnValue = "<label  style='color:red;'>异常</label>";
                }else if(value==0){
                	returnValue = "";
                }
                return returnValue;
        }
	}, {
		field : 'errMsg',
		title : '信息',
		width : '20%',
		align : 'center',
		formatter:function(value,row,index){
            if (value){
                var returnValue = "<a href='javascript:void(0)' onclick=Scheduler.errorMsg("+index+"); >查看</a>"
                return returnValue;
            } else {
                return value;
            }
        }
	} ] ],
	stopJobInstanceUrl : "authorized/scheduler/pauseTartgetHostJob",
	startJobInstanceUrl : "authorized/scheduler/startTartgetHostJob",
	stopAllJobInstanceUrl : "authorized/scheduler/startTartgetHostAllJob",
	startAllJobIntanceUrl : "authorized/scheduler/pauseTartgetHostAllJob",
	registerJobInstanceUrl : "authorized/scheduler/registerTartgetHostJob",
	removeJobIntanceUrl : "authorized/scheduler/removeTartgetHostJob",
	searchJobIntanceUrl : "authorized/scheduler/listJobInstanceByJobId",
	schedulerCheckUrl : "authorized/scheduler/schedulerCheck",
	runJobOneUrl : "authorized/scheduler/runJobOne"
};


var Task={
		columns : [ [ {
			field : 'taskName',
			title : '任务名称',
			width : '15%',
			align : 'center'
		}, {
			field : 'taskDesc',
			title : '任务描述',
			width : '20%',
			align : 'center'
		}, {
			field : 'taskParameter',
			title : '任务参数',
			width : '25%',
			align : 'center',
			formatter:function(value,row,index){
	            if (value && value.length>20){
	                var returnValue = value.substr(0,32) +"...<a href='javascript:void(0)' onclick=Scheduler.showTaskDetails('"+index+"'); >详细</a>"
	                return returnValue;
	            } else {
	                return value;
	            }
	        }
		}, {
			field : 'taskStatus',
			title : '任务状态',
			width : '5%',
			align : 'center'
		}, {
			field : 'taskCreateBy',
			title : '创建人',
			width : '5%',
			align : 'center'
		}, {
			field : 'taskCreateTime',
			title : '创建时间',
			width : '10%',
			align : 'center'
		},{
			field : 'taskCompleteTime',
			title : '完成时间',
			width : '10%',
			align : 'center'
		},{
			field : 'taskStartTime',
			title : '开始时间',
			width : '10%',
			align : 'center'
		} ] ],
		searchUrl:'authorized/scheduler/listTasks',
		updateUrl:'authorized/scheduler/updateTask',
		finishUrl:'authorized/scheduler/finishTask'
	};


(function($) {

	$("#addNewBtn").click(function() {
		$("#jobForm").form("enableValidation");
		var isValid = $("#jobForm").form("validate");
		if(isValid){
			CMC.request({
				url: Scheduler.addUrl,
				method: 'POST',
				data : $("#jobForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('showJobDetailDialog','close');
					$("#jobForm").form("clear");
				}
			});
		}
	});
	
	

	$("#updateBtn").click(function() {
		$("#jobForm").form("enableValidation");
		var isValid = $("#jobForm").form("validate");
		if(isValid){
			CMC.request({
				url: Scheduler.updatedUrl,
				method: 'POST',
				data : $("#jobForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('showJobDetailDialog','close');
					$("#jobForm").form("clear");
					
				}
			});
		}
	});

	$("#addJob").click(function() {
		$("#isSingletonDisplayControl").show();
		$("#jobForm").form("clear");
		$("#jobForm").form("disableValidation");
		$('#showJobDetailDialog').dialog({
			title: '新建工作'
		});
		$("#updateBtn").hide();
		$("#addNewBtn").show();
		$('#showCheckResult').html("");
		CMC.dialog("showJobDetailDialog", 'open');
	});
    //展示工作详情
	$("#showJob").click(function() {
        var record = CMC.grid.datagrid('getSelected');
        if(!record){
            CMC.alertMessage('请先选中一条记录!','warn');
            return;
        }
		$('#showJobTaskDialog').dialog({
			title: '任务列表'
		});
		$('#showCheckResult').html("");
		CMC.request({
			url: Scheduler.getUrl+record["jobId"],
			method: 'get',
			success: function(result){
				$("#jobForm").form("load",{
					'jobId' : result.messageBody['jobId'],
					'jobName' : result.messageBody['jobName'],
					'jobCronExp' : result.messageBody['jobCronExp'],
					'jobType' : result.messageBody['jobType'],
					'jobAutoStartId' : String(result.messageBody['jobAutoStartId']),
					'handler': result.messageBody['handler'],
					'jobDesc' : result.messageBody['jobDesc'],
					'handlerType' : result.messageBody['handlerType']
				});
				Scheduler.checkChange(result.messageBody['jobCronExp']);
				CMC.dialog("showJobDetailDialog", 'open');
			}
		});
	});
	$("#updateJob").click(function() {
		$("#updateBtn").show();
		$("#addNewBtn").hide();
		$("#isSingletonDisplayControl").hide();
		$("#jobForm").form("clear");
		$("#jobForm").form("disableValidation");
		$('#showJobDetailDialog').dialog({
			title: '更新工作信息'
		});
		var record = CMC.grid.datagrid('getSelected');
		if(!record){
			CMC.alertMessage('请先选中一条记录!','warn');
			return;
		}
		CMC.request({
			url: Scheduler.getUrl+record["jobId"],
			method: 'get',
			success: function(result){
				$("#jobForm").form("load",{
					'jobId' : result.messageBody['jobId'],
					'jobName' : result.messageBody['jobName'],
					'jobCronExp' : result.messageBody['jobCronExp'],
					'jobType' : result.messageBody['jobType'],
					'jobAutoStartId' : String(result.messageBody['jobAutoStartId']),
					'handler': result.messageBody['handler'],
					'jobDesc' : result.messageBody['jobDesc'],
					'handlerType' : String(result.messageBody['handlerType'])
				});
				Scheduler.checkChange(result.messageBody['jobCronExp']);
				CMC.dialog("showJobDetailDialog", 'open');
			}
		});
	});

	$("#deleteJob").click(function() {
		var record = CMC.grid.datagrid('getSelected');
		if(!record){
			CMC.alertMessage('请先选中一条记录!','warn');
			return;
		}
		if(record['jobStatus']=='1'){
			CMC.alertMessage('无法删除已经启动的工作！','warn');
			return;
		}
		CMC.confirm("请确认是否删除该工作记录!", function(r){
			if(r){
				CMC.request({
					url: Scheduler.deleteUrl,
					method: 'POST',
					data: record,
					success: function(result){
						CMC.alertMessage(result.messageBody,'info');
						CMC.search();
					}
				});
			}
			
		});
		
	});
	$("#showTask").click(function () {
		var record = CMC.grid.datagrid('getSelected');
		if(!record){
			CMC.alertMessage('请先选中一条记录!','warn');
			return;
		}
		var jobType=record.jobType;
		CMC.dialog("showJobTaskDialog", 'open');
		$("#jobName").html(record.jobName);
		$("#jobAutoStart").html(record.jobAutoStartId);
		$("#jobType").html(record.jobType);
		$("#jobCronExp").html(record.jobCronExp);
		$("#jobDesc").html(record.jobDesc);
		$("#jobEnabled").html(record.jobEnableInd);
		$("#jobStatus").html(record.jobStatus);
		$("#jobTypeInput").val(jobType);
		Scheduler.searchTaskList();
		
		/*CMC.request({
			url: Task.searchUrl,
			method: 'POST',
			data : {
				'jobType': jobType,
				'start':0,
				'end':10
			},
			success: function(result){
				var array = result.messageBody;
				var html ="";
				for(var i = 0; i<array.length; i++){

					$('#taskResultTable').datagrid('load',array[i]);
				}
				alert(html);

			}
		});*/
	});
/*	Scheduler.updateJobStatus = function(newStatus,oldStatus){
		var record = CMC.grid.datagrid('getSelected');
		if(!record){
			CMC.alertMessage('请先选中一条记录!','warn');
			return;
		}
		
		record['jobStatus'] = newStatus;
		CMC.request({
			url: Scheduler.updatedUrl,
			method: 'POST',
			data : record,
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
				CMC.search();
				CMC.dialog('showJobDetailDialog','close');
				$("#jobForm").form("clear");
				
			}
		});
	}*/
	
	Scheduler.startAll = function(){
		CMC.request({
			url: Scheduler.startAllJobUrl,
			method: 'POST',
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
				CMC.search();
			}
		});
	}
	
	Scheduler.stopAll = function(){
		CMC.request({
			url: Scheduler.stopAllJobUrl,
			method: 'POST',
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
				CMC.search();				
			}
		});
	}
	
	Scheduler.stopJob = function(){
		var record = CMC.grid.datagrid('getSelected');
		if(!record){
			CMC.alertMessage('请先选中一条记录!','warn');
			return;
		}
		var status = record['jobStatus'];
		if(status != '1'){
			CMC.alertMessage('只能停止执行中的工作','warn');
			return;
		}
		CMC.request({
			url: Scheduler.stopJobUrl,
			method: 'POST',
			data : record,
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
				CMC.search();				
			}
		});
	}
	
	Scheduler.startJob = function(){
		var record = CMC.grid.datagrid('getSelected');
		if(!record){
			CMC.alertMessage('请先选中一条记录!','warn');
			return;
		}
		
		if(record['jobEnableInd']!='1'){
			CMC.alertMessage('该工作还没有启用!','warn');
			return;
		}
		var status = record['jobStatus'];
		if(status != '0' && status != '2'){
			CMC.alertMessage('只能启动空闲或暂停中的工作','warn');
			return;
		}
		CMC.request({
			url: Scheduler.startJobUrl,
			method: 'POST',
			data : record,
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
				CMC.search();
				
			}
		});
	}
	
	Scheduler.updateEnableInd = function(newStatus,oldStatus){
		var record = CMC.grid.datagrid('getSelected');
		if(!record){
			CMC.alertMessage('请先选中一条记录!','warn');
			return;
		}
		if(record['jobEnableInd'] == newStatus && newStatus=='1'){
			CMC.alertMessage('请选择一条没有启动的工作!','warn');
			return;
		}
		if(record['jobEnableInd'] == newStatus && newStatus=='0'){
			CMC.alertMessage('请选择一条没有已经启动的启动的工作!','warn');
			return;
		}
		record['jobEnableInd'] = newStatus;
		CMC.request({
			url: Scheduler.updatedUrl,
			method: 'POST',
			data : record,
			success: function(result){
				if(newStatus=='1'){
					CMC.alertMessage('调度工作已经启用!','info');
					return;
				}
				if( newStatus=='0'){
					CMC.alertMessage("调度工作已经禁用，请确保所有任务实例已经停止工作！");
				}
				CMC.search();				
			}
		});
	}
	
	Scheduler.checkChange = function(newV,oldV){
		if(!newV && newV=='' ){
			$('#showCheckResult').html('');
			return;
		}
		CMC.request({
			url: Scheduler.checkCronUrl,
			method: 'POST',
			data : {
				'cronExp': newV
			},
			success: function(result){
				var array = result.messageBody;
				var html ="";
				for(var i = 0; i<array.length; i++){
					html += array[i]+"<br/>"; 
				}
				$('#showCheckResult').html(html);
			},
			error: function(){
				$('#showCheckResult').html('<label style="color:red;">不合法的cron表达式!</label>');
			}
		});
	}
	Scheduler.finish=function () {
		var record = $("#taskResultTable").datagrid('getSelected');
		if(!record){
			CMC.alertMessage('请先选中一条记录!','warn');
			return;
		}
		if (record.taskStatus=='已完成'){
			CMC.alertMessage('该任务已完成','warn');
			return;
		}
		var taskName=record.taskName;

		CMC.request({
			url:Task.finishUrl,
			method: 'POST',
			data:{
				taskName:taskName
			},
			success:function () {
				$("#showtask").click;
			}
		})

	}
	Scheduler.showParamDetail=function(value){

		if (value && value.length>20){
			var returnValue = value.substr(0,32) +"...<a href='javascript:void(0)' onclick=Scheduler.showTaskDetails('"+value+"') >详细</a>"
			return returnValue;
		} else {
			return value;
		}
	}
	Scheduler.showTaskDetails = function (index) {
		
		$("#taskParamsOfDialog").empty();
		var record = $("#taskResultTable").datagrid('getRows')[index];
		this.data = record["taskParameter"] ;

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
			
			$("#taskParamsOfDialog").append("<div>"+outputDoc+"</div>");
			
			var winTopLeft = CMC.getWindowTopLeft("showTaskParamsDetailDialog");
			$('#showTaskParamsDetailDialog').window({
				top:winTopLeft.winTop,
				left:winTopLeft.winLeft,
				title: '任务参数（TaskParams）',
				closed: false,
				cache: false,
				modal: true
			});
			CMC.dialog('showTaskParamsDetailDialog','open');
		}
	}
	
	Scheduler.searchTaskList = function(){
		CMC.request({
			url: Task.searchUrl,
			data : {
				start : $("#tasksStart").val(),
				end : $("#tasksEnd").val(),
				jobType : $("#jobTypeInput").val()
			},
			method: "POST",
			success : function(data){
				$("#taskResultTable").datagrid("loadData",data.messageBody.list);
				$("#taskResultTable").datagrid("getPager").pagination({
					total : data.messageBody.total,
					pageNumber : data.messageBody.num/(data.messageBody.num - data.messageBody.start + 1)
				});
			}
		});
	}
	Scheduler.init=function () {
		$("#taskResultTable").datagrid({
			singleSelect:true,
			pagination : true,
			columns : Task.columns
		});
		
		$("#jobInstanceTable").datagrid({
			singleSelect:false,
			pagination : false,
			columns : JobInstance.columns
		});
		
		//注册分页事件
		$("#taskResultTable").datagrid("getPager").pagination({
			onSelectPage: function(pageNum,pageSize){
	        	//初始化查询分页参数
				//alert("onselect"+ pageNum +"+"+ pageSize);
	        	$("#jobDetailSearchForm").form('load',{
	        		start : (pageNum-1) *pageSize +1,
	        		end : pageNum *pageSize
	        	});
	        	Scheduler.searchTaskList();
	        	
			},
			total :0,
			pageNumber: 0
		});
	}
	
	Scheduler.openInstanceMnt = function(){
		var record = CMC.grid.datagrid('getSelected');
        if(!record){
            CMC.alertMessage('请先选中一条记录!','warn');
            return;
        }
        $("#JobInstanceForm #jobId").val(record["jobId"]);
        $("#JobInstanceForm #jobName").text(record["jobName"]);
        Scheduler.searchJobInstanceList();
        CMC.dialog('searchJobInstanceDialog', 'open');
	} 

	Scheduler.isSingletonCheckBoxChange = function(ele){
		if(ele.checked){
			$("#isSingleton").val("1");
		}else{
			$("#isSingleton").val("0");
		}
	}
	
	$("#searchJobInstanceList").click(function(){
		Scheduler.searchJobInstanceList();
	});
	$("#startJobInstance").click(function(){
		var jobRecord = CMC.grid.datagrid('getSelected');
		if(jobRecord['jobEnableInd']==0){
			  CMC.alertMessage('调度工作已经禁用！','err');
			  return;
		}
		var record =  $("#jobInstanceTable").datagrid("getSelected");
        if(!record){
            CMC.alertMessage('请先选中一条记录!','warn');
            return;
        }
        if(record["status"] ==1 ){
        	 CMC.alertMessage('请选择任务状态为停止的记录！','warn');
             return;
        }
        CMC.request({
			url: JobInstance.startJobInstanceUrl,
			data : record,
			method: "POST",
			success : function(data){
				CMC.alertMessage('启动实例成功！','info');
				Scheduler.searchJobInstanceList();
			}
		});
	});
	$("#stopJobInstance").click(function(){
		var record =  $("#jobInstanceTable").datagrid("getSelected");
        if(!record){
            CMC.alertMessage('请先选中一条记录!','warn');
            return;
        }
        if(record["status"]!=1){
        	  CMC.alertMessage('请选择任务状态为运行中的记录！','warn');
              return;
        }
        CMC.request({
			url: JobInstance.schedulerCheckUrl,
			data : record,
			method: "POST",
			success : function(data){
				 CMC.request({
						url: JobInstance.stopJobInstanceUrl,
						data : record,
						method: "POST",
						success : function(data){
							CMC.alertMessage('停止实例成功！','info');
							Scheduler.searchJobInstanceList();
						}
					});
			}
		});
       
	});
	$("#startAllJobInstance").click(function(){
		CMC.confirm("确定启动所有未启动的任务吗?", function(r){
			
		});
	});
	$("#stopAllJobInstance").click(function(){
		CMC.confirm("确定停止所有正在运行的任务吗?", function(r){
			
		});
	});
	$("#registerJobInstance").click(function(){
		var record = CMC.grid.datagrid('getSelected');
		if(!record){
			CMC.alertMessage('请先选中一条记录!','warn');
			return;
		}
		if(record['isSingleton']==1 && $("#jobInstanceTable").datagrid("getRows").length > 0 ){
			CMC.alertMessage('该工作是单实例运行!','warn');
			return;
		}
		$("#registerForm").form("clear");
		$("#registerForm").form("disableValidation");
		$("#registerForm #jobId").val(record["jobId"]);
		CMC.dialog("registerJobInstanceDialog", "open");
		
	});
	
	$("#submitRegisterForm").click(function(){
		$("#registerForm").form("enableValidation");
		var isValid = $("#registerForm").form("validate");
		if(isValid){
			CMC.request({
				url: JobInstance.schedulerCheckUrl,
				data : $("#registerForm").form().serialize(),
				method: "POST",
				success : function(data){
					CMC.request({
						url: JobInstance.registerJobInstanceUrl,
						data : $("#registerForm").form().serialize(),
						method: "POST",
						success : function(data){
							 CMC.alertMessage('新增实例成功！','info');
							 Scheduler.searchJobInstanceList();
							 CMC.dialog("registerJobInstanceDialog", "close");
						}
					});
				}
			});
			
		}
	});
	
	$("#deleteJobInstance").click(function(){
		var record =  $("#jobInstanceTable").datagrid("getSelected");
        if(!record){
            CMC.alertMessage('请先选中一条记录!','warn');
            return;
        }
        CMC.confirm("确定停止所有正在运行的任务吗?", function(r){
			if(r){
				CMC.request({
					url: JobInstance.removeJobIntanceUrl,
					data : record,
					method: "POST",
					success : function(data){
						  CMC.alertMessage('删除实例成功！','info');
						  Scheduler.searchJobInstanceList();
					}
				});
			}
				});
	});
	Scheduler.searchJobInstanceList = function(){
		CMC.request({
			url: JobInstance.searchJobIntanceUrl,
			data : $("#JobInstanceForm").form().serialize(),
			method: "POST",
			success : function(data){
				$("#jobInstanceTable").datagrid("loadData",data.messageBody.list);
			}
		});
	}

	Scheduler.errorMsg = function(index){
		var rows = $("#jobInstanceTable").datagrid("getRows");
		$("#jobInstanceErrLabel").text(rows[index]['errMsg']);
		CMC.dialog("showJobInstanceErrDetailDialog", "open");
	}
	
	/**
     * 运行一次任务
     */
	$("#runJobOne").click(function () {
        var jobRecord = CMC.grid.datagrid('getSelected');
        if(jobRecord['jobEnableInd']==0){
            CMC.alertMessage('调度工作已经禁用！','err');
            return;
        }
        var record =  $("#jobInstanceTable").datagrid("getSelected");
        if(!record){
            CMC.alertMessage('请先选中一条记录!','warn');
            return;
        }
        /*if(record["status"]!=1){
            CMC.alertMessage('请选择任务状态为运行中的记录！','warn');
            return;
        }*/
        CMC.request({
            url: JobInstance.runJobOneUrl,
            data : record,
            method: "POST",
            success : function(data){
                CMC.alertMessage('执行实例一次成功！','info');
                // Scheduler.searchJobInstanceList();
            }
        });

    });
	
})(jQuery);



$(document).ready(function() {
	CMC.init(Scheduler);
});
