/**
 * 规则管理
 */

var RuleInfo={
		searchTableRequired: true,
		menuId: "RuleInfo",
		searchUrl: "authorized/ruleInfo/getAll" ,
		addUrl: "authorized/ruleInfo/add",
		updateUrl : "authorized/ruleInfo/update",
		deleteUrl: "authorized/ruleInfo/delete",
		//绑定条目
		getRuleChild: "authorized/ruleInfo/getRuleChild",
		deleteChildUrl: "authorized/ruleInfo/deleteChild",
		addChildUrl: "authorized/ruleInfo/addChild",
		updateChildUrl: "authorized/ruleInfo/updateChild",
		getChildUrl: "authorized/ruleInfo/getChild",
		
		columns:[[
			{field: 'ruleName', title:'规则名称' , width: '25%' , align: 'center'},
			{field: 'ruleArea', title:'规则范围' , width: '25%' , align: 'center',formatter: function(value){
	        	   if(value=="CI"){
	        		   return '城市';
	        	   }else if(value=="AI"){
		        	   return "机场";
	        	   }
	           }},
			{field: 'ruleIsUsing', title:'是否生效' , width: '25%' , align: 'center',formatter: function(value){
	        	   if(value=="T"){
	        		   return '是';
	        	   }else if(value=="F"){
		        	   return "否";
	        	   }
	           }},
//	        {field: 'binding', title:'操作', width: '24%' , align: 'center',formatter: function(value,rowData,rowIndex){
//	        	 	return "<a href='javascript:void(0)' class='easyui-linkbutton' onclick=\"bindingChild(\'"+ rowData.id 
//	        	 			+"\',\'"+rowData.ruleName +"\',\'"+ rowData.ruleArea +"\',\'"+rowData.ruleIsUsing +"\',\'"+rowData.remarks + "\')\">绑定条目</a>";
//	           }},
		]],
		 onDblClickRow: function(){
        	//$("#areaInfo_update").click();
        }
};

(function($){
	/**
	 * 规则条件查询，框里面的数据重置
	 */
	$("#ruleInfo_reset").click(function(){
		$("#searchForm ").form('clear');
		$("#searchForm [name='start']").val('1');
		$("#searchForm [name='end']").val('10');
	});
	
	/**
	 * 弹出添加规则窗口
	 */
	$("#ruleInfo_add").click(function(){
		$("#addForm").form('clear');
		CMC.dialog('addRuleListDetail','open');
	});
	
	$("#ruleInfo_bind").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		bindingChild(record.id,record.ruleName,record.ruleArea,record.ruleIsUsing,record.remarks);
	});
	
	/**
	 * 添加规则数据
	 */
	$("#submit_add").click(function(){
		$("#addForm").form("enableValidation");
		var isValid = $("#addForm").form("validate");
		if (isValid) {
			var data=$("#addForm").serialize();
			CMC.request({
				url: RuleInfo.addUrl,
				method: 'POST',
				data : $("#addForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('addRuleListDetail','close');
					$("#addForm").form("clear");
				}
			});
		}
		
	});
	
	/**
	 *修改规则数据
	 */
	
	$("#ruleInfo_update").click(function(){
		$("#updateForm").form('clear');
		var code = CMC.grid.datagrid("getSelected");
		if(!code){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		var param = new Object();
		param.ruleName = code['ruleName'];
		param.ruleArea = code['ruleArea'];
		var flag = fixedRule(param);//初始数据不能做任何操作
		if(flag){
			return;
		}
		
		var font=$("#updateForm font");
		font.hide();
		$("#updateForm").form("load",{
			'id':code['id'],
			'ruleName':code['ruleName'],
			'ruleArea':code['ruleArea'],
			'ruleIsUsing':code['ruleIsUsing'],
			'remarks':code['remarks'],
		});
		$("#updateForm .easyui-combobox").combobox('disable'); 
		$("#updateForm :input").prop({disabled: true});
		$("#submit_update").linkbutton({'disabled':true});
		CMC.dialog('updateRuleListDetail','open');
	});
	
	/**
	 *启用规则编辑
	 */
	$("#submit_edit").click(function(event) {
		$("#updateForm font").show();
		$("#submit_update").removeAttr('disabled');
		$('#updateForm .easyui-combobox').combobox('enable'); 
		$("#submit_update").linkbutton({'disabled':false});
		$("#updateForm :input").removeAttr('disabled');
	});
	/**
	 *提交更新规则数据
	 */
	$("#submit_update").linkbutton({'onClick':function(){
		var isValid = $("#updateForm").form("validate");
		if (isValid) {
			var data=$("#updateForm").serialize();
			CMC.request({
				url: RuleInfo.updateUrl,
				method: 'POST',
				data : $("#updateForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
				}
			});
		}
	}});
	/**
	 *删除规则数据
	 */
	 $("#ruleInfo_delete").linkbutton({
	 	'onClick':function(){
	 		var record = CMC.grid.datagrid("getSelected");
			if(!record){
				CMC.alertMessage("请先选中一条记录！","warning");
				return;
			}
			 CMC.confirm("确定删除规则信息?", function(r){
				  if(r){
					  CMC.request({
							url: RuleInfo.deleteUrl,
							method: 'POST',
							data : {id:record["id"]},
							success: function(response){
								CMC.alertMessage(response.messageBody,'info');
								CMC.search();
							}
						});
				  }
			  });
	 	}
	});
	 
	 /**
	 * 弹出绑定条目窗口
	 */
	$("#ruleChile_add").click(function(){
		$("#addChildForm").form('clear');
		CMC.dialog('addRuleChildListDetail','open');
		var id = document.getElementById("ruid").value;
		$("#hdruleId").val(id);
	});
	
	/**
	 * 添加条目数据
	 */
	$("#submit_addChild").click(function(){
		$("#addChildForm").form("enableValidation");
		var isValid = $("#addChildForm").form("validate");
		if (isValid) {
			var data=$("#addChildForm").serialize();
			CMC.request({
				url: RuleInfo.addChildUrl,
				method: 'POST',
				data : $("#addChildForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('addRuleChildListDetail','close');
					$("#addChildForm").form("clear");
					ruleChile_Refresh();
				}
			});
		}
	});
	/**
	 *启用条目编辑
	 */
	$("#submit_updateedit").click(function(event) {
		$("#updateChildForm font").show();
		$("#submit_updateChild").removeAttr('disabled');
		$('#updateChildForm .easyui-combobox').combobox('enable'); 
		$("#submit_updateChild").linkbutton({'disabled':false});
		$("#updateChildForm :input").removeAttr('disabled');
	});
	/**
	 * 修改条目信息
	 */
	$("#submit_updateChild").linkbutton({'onClick':function(){
		var isValid = $("#updateChildForm").form("validate");
		if (isValid) {
			var data=$("#updateChildForm").serialize();
			CMC.request({
				url: RuleInfo.updateChildUrl,
				method: 'POST',
				data : $("#updateChildForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					ruleChile_Refresh();
				}
			});
		}
	}});

})(jQuery);

$(document).ready(function(){
	CMC.init(RuleInfo);	
});

/**
 * 获取规则数据的ID
 */
function ruleChile_Refresh(){
	var id = document.getElementById("ruid").value;
	$("#hdruleId").val(id);
	ruleChildRefresh(id);
}

/**
 * 弹出绑定条目窗口
 */
function bindingChild(id,ruleName,ruleArea,ruleIsUsing,remarks){
	var param = new Object();
	param.ruleName = ruleName;
	param.ruleArea = ruleArea;
	var flag = fixedRule(param);//初始数据不能做任何操作
	if(flag){
		return;
	}
	$("#bindingForm").form("load",{
		'id':id,
		'ruleName':ruleName,
		'ruleArea':(ruleArea == "CI" ? "城市" : "机场"),
		'ruleIsUsing':(ruleIsUsing == "T" ? "是" : "否"),
		'remarks':(remarks == "null"?"":remarks),
	});
	CMC.dialog('bindingRuleChild','open');
	ruleChildRefresh(id);
}

/**
 * 刷新，显示条目信息数据
 */
function ruleChildRefresh(id){
	CMC.request({
		url: RuleInfo.getRuleChild,
		method: 'POST',
		data : {id:id},
		success: function(result){
			if(result.messageBody != null){
				var result = result.messageBody;
				var string = "";
				for(var i = 0; i < result.length; i++ ){
					var str = "<tr>";
					str += "<td>"+result[i].ruleName+"</td>";
					str += "<td>"+result[i].ruleValue+"</td>";
					str += "<td>"+(result[i].ruleIsDefault == "T" ? "是" : "否")+"</td>";
					str += "<td>&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' class='easyui-linkbutton' permission='RuleInfo:deleteChild' onclick='selectChild(" + result[i].id + ")'>删除</a>&nbsp;&nbsp;&nbsp;" +
							"&nbsp; <a href='javascript:void(0)' class='easyui-linkbutton' permission='RuleInfo:updateChild' onclick='updateChild("+ result[i].id + ")'>修改</a>" +
							"</td>";
					str += "</tr>";
					string += str;
				}
				$("#tbodyid").html(string);
			}else {
				CMC.alertMessage(result.messageBody,'info');
				CMC.search();
			}
		 }
	 });
}

/**
 * 弹出修改条目窗口
 */
function updateChild(id){
	  CMC.request({
		  url: RuleInfo.getChildUrl,
		  method: 'POST',
		  data : {id:id},
		  success: function(result){
			  var result = result.messageBody
			  $("#updateChildForm").form("load",{
					'id':result.id,
					'ruleName':result.ruleName,
					'ruleValue':result.ruleValue,
					'ruleIsDefault':result.ruleIsDefault,
					'ruleId':result.ruleId,
				});
				$("#updateChildForm .easyui-combobox").combobox('disable'); 
				$("#updateChildForm :input").prop({disabled: true});
				$("#submit_updateChild").linkbutton({'disabled':true});
				CMC.dialog('updateRuleChildDetail','open');
		  }
	 });
}
/**
 * 删除条目数据
 */
function selectChild(id){
	CMC.confirm("确定删除条目信息?", function(r){
	  if(r){
		  CMC.request({
				url: RuleInfo.deleteChildUrl,
				method: 'POST',
				data : {id:id},
				success: function(response){
					CMC.alertMessage(response.messageBody,'info');
					CMC.search();
					ruleChile_Refresh();
				}
			});
		}
	});
}

$.extend($.fn.validatebox.defaults.rules, {   
    ChineseValid: { 
        validator: function(value, param){  
        	var regEx=/^[\u4e00-\u9fa5]+$/; 
            return regEx.test(value);    
        },
        message: '只能输入中文!'
    },
	ChinEnglishValid: { 
	    validator: function(value, param){  
	    	var regEx=/^[\u4e00-\u9fa5]|[a-zA-Z]$/; 
	        return regEx.test(value);    
	    },
	    message: '只能输入中文或英文!'
	},
	NumberValid: { 
	    validator: function(value, param){  
	    	var regEx=/^[0-9]*$/; 
	        return regEx.test(value);    
	    },
	    message: '只能输入数字!'
	}
});

/*
 * 初始规则不可变
 * */
function fixedRule(param){
	var flag = false;
	var ruleArr = new Array();
	ruleArr.push({"ruleName":"是否启用","ruleArea":"CI"});
	ruleArr.push({"ruleName":"是否热门","ruleArea":"CI"});
	ruleArr.push({"ruleName":"是否国际","ruleArea":"CI"});
	ruleArr.push({"ruleName":"是否热门","ruleArea":"AI"});
	ruleArr.push({"ruleName":"是否国际","ruleArea":"AI"});
	ruleArr.push({"ruleName":"是否空地联运","ruleArea":"CI"});
	for(var i=0; i<ruleArr.length; i++){
		if(param.ruleName == ruleArr[i].ruleName && param.ruleArea == ruleArr[i].ruleArea){
			CMC.alertMessage("抱歉，初始数据不能做任何操作",'info');
			flag = true;
		}
	}
	
	return flag;
	
}