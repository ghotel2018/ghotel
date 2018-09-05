var WhiteIp = {
	searchTableRequired: true, 
	singleSelect : true,
	columns :  [[
					{field: 'id', title:'ID' , width: '5%' , align: 'center'},
					{field: 'name', title:'ip地址' , width: '30%' , align: 'left'},
					{field: 'createTime', title:'创建时间' , width: '20%' , align: 'center',
						formatter:function(value,row,index){
							return new Date(value).format("yyyy-MM-dd HH:mm:ss");
						}
					},
					{field: 'remark', title:'备注' , width: '25%' , align: 'center'}
				]],
	menuId: 'WhiteIp',
	searchUrl : 'authorized/whiteIp/getAll',
	updatedUrl : "authorized/whiteIp/update",
	addUrl : "authorized/whiteIp/add",
	getUrl : "authorized/whiteIp/get/",
	getHasDetailUrl : "authorized/whiteIp/getHasDetail",
	getNoHasDetailUrl : "authorized/whiteIp/getNoHasDetail",
	addUrlUrl : "authorized/whiteIp/addUrl",
	cancelContainUrl : "authorized/whiteIp/cancelContain",
	containUrl : "authorized/whiteIp/contain",
	switchUrl : "authorized/whiteIp/viewSwitch",
	changeSwitchStatusUrl : "authorized/whiteIp/changeSwitchStatus/"
};

(function($){
	
	$("#hasTable").datagrid({
		singleSelect : true,
		pagination : true,
		onDblClickRow:function(index,row){
			WhiteIp.cancelContain();
		},
		columns :	[[
						{field: 's', title:'关联ip' , width: "25%" , align: 'center',
							 formatter:function(value,row,index){
								 if(CMC.grid!=null)
									 return CMC.grid.datagrid("getSelected").name;
							 }
						  },
		         	  {field: 'name', title:'访问路径' , width: "75%" , align: 'center',
							  formatter:function(value,row,index){
								  if(value!=null){
									  var arr = value.split("/");
									  if(arr.length<2)
										  return value;
									  var str = "";
									  var le = 0;
									  for(var i=1;i<arr.length;i++){
										  str +="/"+arr[i];
										  le += arr[i].length+1;
										  if(le>30){
											  le=0;
											  str += "<br/>";
										  }
									  }
									  return str;
								  }
								  return value;
							  }
		         	  }
		         	  ]],
	});
	
	$("#noHasTable").datagrid({
		singleSelect : true,
		pagination : true,
		onDblClickRow:function(index,row){
			WhiteIp.contain();
		},
		columns :	[[
		         	  {field: 'name', title:'访问路径' , width: "70%" , align: 'center',
		         		  formatter:function(value,row,index){
		         			  if(value!=null){
								  var arr = value.split("/");
							  if(arr.length<2)
								return value;
							    var str = "";
							    var le = 0;
							    for(var i=1;i<arr.length;i++){
								    str +="/"+arr[i];
								    le += arr[i].length+1;
								    if(le>25){
								  	    le=0;
									    str += "<br/>";
								    }
							    }
								return str;
							  }
							  return value;
						  	}
		         	  	},
		         	  {field: 'remark', title:'备注' , width: "30%"  , align: 'center'}
		         	  ]],
	});
	
	WhiteIp.clearForm = function(id) {
		$('#'+id).form('clear');
	};
	
	WhiteIp.submitUpdateForm = function(){
		CMC.request({
			url: WhiteIp.updatedUrl,
			method: 'POST',
			data : $("#updateForm").form().serialize(),
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
				CMC.search();
				CMC.dialog("updateIpInfo","close");
			}
		});
	}
	
	WhiteIp.beforeUpdateFormShow = function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条系统消息！",'warning');
			return;
		}
		CMC.request({
			url: WhiteIp.getUrl+record.id,
			method: 'POST',
			success: function(result){
				$("#updateForm").form("load",{
					'id' : result.messageBody.list[0]["id"],
					'name' : result.messageBody.list[0]["name"],
					'remark' : result.messageBody.list[0]["remark"]
				});
				CMC.dialog("updateIpInfo","open");
			}
		});
	}
	
	WhiteIp.submitAddForm = function(){
		CMC.request({
			url: WhiteIp.addUrl,
			method: 'POST',
			data : $("#addForm").form().serialize(),
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
				CMC.search();
				CMC.dialog("addIpInfo","close");
			}
		});
	}
	
	WhiteIp.viewDeatil = function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条系统消息！",'warning');
			return;
		}
		$("#hasSelectForm input[name=id]").val(record.id);
		$("#noHasSelectForm input[name=id]").val(record.id);
		var json = {"id":record.id,"start":1,"num":10,"end":10};
		refreshHasDetail(json);
		refreshNoHasDetail(json);
		CMC.dialog("viewDetail","open");
	}
	
	WhiteIp.selectHas = function(){
		var record = $("#hasSelectForm").form().serialize();
		refreshHasDetail(record);
	}
	
	WhiteIp.selectNoHas = function(){
		var record = $("#noHasSelectForm").form().serialize();
		refreshNoHasDetail(record);
	}
	
	WhiteIp.cancelContain = function(){
		var ip = CMC.grid.datagrid("getSelected");
		var url = $("#hasTable").datagrid("getSelected");
		var json = {"ipId":ip.id,"urlId":url.id};
		CMC.request({
			url: WhiteIp.cancelContainUrl,
			method: 'POST',
			data : json,
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
				var json = {"id":CMC.grid.datagrid("getSelected").id,"start":1,"num":10,"end":10};
				refreshNoHasDetail(json);
				refreshHasDetail(json);
				CMC.dialog("addUrlInfo","close");
			}
		});
	}
	
	WhiteIp.contain = function(){
		var ip = CMC.grid.datagrid("getSelected");
		var url = $("#noHasTable").datagrid("getSelected");
		var json = {"ipId":ip.id,"urlId":url.id};
		CMC.request({
			url: WhiteIp.containUrl,
			method: 'POST',
			data : json,
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
				var json = {"id":CMC.grid.datagrid("getSelected").id,"start":1,"num":10,"end":10};
				refreshNoHasDetail(json);
				refreshHasDetail(json);
				CMC.dialog("addUrlInfo","close");
			}
		});
	}
	
	WhiteIp.addUrlFunction = function(){
		CMC.request({
			url: WhiteIp.addUrlUrl,
			method: 'POST',
			data : $("#addUrlForm").form().serialize(),
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
				var json = {"id":CMC.grid.datagrid("getSelected").id};
				refreshNoHasDetail(json);
				CMC.dialog("addUrlInfo","close");
			}
		});
	}
	
	WhiteIp.viewSwitch = function(){
		CMC.request({
			url: WhiteIp.switchUrl,
			method: 'POST',
			success: function(result){
				if(result=="开启"){
					$("#switchOn").hide();
					$("#switchOff").show();
				}else{
					$("#switchOn").show();
					$("#switchOff").hide();
				}
				$("#switchStatus").html(result.messageBody);
			}
		});
	}
	
	WhiteIp.changeSwitchStatus = function(status){
		CMC.request({
			url: WhiteIp.changeSwitchStatusUrl+status,
			method: 'POST',
			success: function(result){
				if(result.messageBody=="1"){
					$("#switchStatus").html("开启");
					CMC.alertMessage("开启成功",'info');
					$("#switchOn").hide();
					$("#switchOff").show();
				}else{
					$("#switchStatus").html("关闭");
					CMC.alertMessage("关闭成功",'info');
					$("#switchOn").show();
					$("#switchOff").hide();
				}
			}
		});
	}
})(jQuery);

function refreshHasDetail(json){
	CMC.request({
		url: WhiteIp.getHasDetailUrl,
		method: 'POST',
		data : json,
		success: function(result){
			$('#hasTable').datagrid("loadData", result.messageBody.list);
			$('#hasTable').datagrid("getPager").pagination({
				total : result.messageBody.total,
				pageNumber : result.messageBody.num/ (result.messageBody.num- result.messageBody.start + 1)
			});
			$("#hasTable").datagrid("getPager").pagination({
				onSelectPage : function(pageNum, pageSize) {
					// 初始化查询分页参数
					$("#hasSelectForm").form('load', {
						start : (pageNum - 1) * pageSize + 1,
						end : pageNum * pageSize
					});
					var record = $("#hasSelectForm").form().serialize();
					refreshHasDetail(record);
				}
			});
		}
	});
}
function refreshNoHasDetail(json){
	CMC.request({
		url: WhiteIp.getNoHasDetailUrl,
		method: 'POST',
		data : json,
		success: function(result){
			$('#noHasTable').datagrid("loadData", result.messageBody.list);
			$('#noHasTable').datagrid("getPager").pagination({
				total : result.messageBody.total,
				pageNumber : result.messageBody.num/ (result.messageBody.num- result.messageBody.start + 1)
			});
			$("#noHasTable").datagrid("getPager").pagination({
				onSelectPage : function(pageNum, pageSize) {
					// 初始化查询分页参数
					$("#noHasSelectForm").form('load', {
						start : (pageNum - 1) * pageSize + 1,
						end : pageNum * pageSize
					});
					var record = $("#noHasSelectForm").form().serialize();
					refreshNoHasDetail(record);
				}
			});
		}
	});
}

$(document).ready(function(){
	CMC.init(WhiteIp);
	WhiteIp.viewSwitch();
});

