
var OC = {
		searchTableRequired: true, 
		menuId : 'OC',
		searchUrl: "authorized/oc/getAll" , //如果searchTableRequired 是 true 必填
		addUrl: "authorized/oc/add" , 
		updateUrl: "authorized/oc/update" , 
		deleteUrl: "authorized/oc/delete" , 
		priorityUrl: "authorized/oc/adjustmentPriority" , 
		columns :  [[
		               {field: 'id', title:'id' , width: '15%' , align: 'center' , hidden:'true'},
			           {field: 'name', title:'OC方' , width: '20%' , align: 'center'},
			           {field: 'code', title:'二字码' , width: '15%' , align: 'center'},
			           {field: 'enabledatefrom', title:'销售时间' , width: '18%' , align: 'center'},
			           {field: 'enbledateto', title:'截至时间' , width: '18%' , align: 'center'},
			           {field: 'priority', title:'优先级' , width: '13%' , align: 'center',
				           	formatter: function(value,row,index) {
			                    return index+1;
			                }
			           },
			           {field: 'ctr',title: '操作', width: '13%', align: 'center',
			                formatter: function(value,row,index) {
			                    return	"<input type='image' src='/cmc/common/images/icon_FI_up.jpg' onclick='OC.move("+row.priority+","+row.id+",true)'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='image' src='/cmc/common/images/icon_FI_down.jpg' onclick='OC.move("+row.priority+","+row.id+",false)'/>";
			                }
			            }
		           ]]
};

(function($){
	
	OC.move = function move(priority, id, upAnddown) {
		var updown;
		if(upAnddown){
			updown = "上";
		}else{
			updown = "下";
		}
		
		CMC.request({
			method: "POST",
			url: OC.priorityUrl,
			data: {
				'id' : id,
				'priority' : priority,
				'updown' : updown
			},
			success: function(result){
//				CMC.alertMessage(result.messageBody, 'info',CMC.search);
				CMC.search();
			}
		});
    }
	
	
	$("#clearCondition").click(function(){
//		$('#OCForm').form('clear');
//		$("input[name='start']:hidden").val("1");
//		$("input[name='end']:hidden").val("10");
		
		var start= $("#OCForm input[name='start']:hidden").val();
		var end=$("#OCForm input[name='end']:hidden").val();
		$('#OCForm').form('clear');
		$("#OCForm input[name='start']:hidden").val(start);
		$("#OCForm input[name='end']:hidden").val(end);
		$("input[name='deleteflag']:hidden").val("0");
		CMC.search();
	});
	
	
	$('#searchFormAdd').click(function(){
		$('#addOCForm').form('disableValidation');
		$('#addOCForm').form('reset');
		CMC.dialog('addOCDialog','open');
		
	});
	
	
	$("#searchFormUpdate").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请选择一条记录!", '提示');
			return;
		}
		$('#updateOCname').textbox('setValue',record.name);
		$('#updateOCcode').textbox('setValue',record.code);
		$('#updateenabledatefrom').datebox('setValue',record.enabledatefrom);
		$('#updateenbledateto').datebox('setValue',record.enbledateto);
		
		CMC.dialog('updateOCDialog','open');
	});
	
	$('#addOC').click(function(){
		var name = $("#addOCname").val();
		var code = $("#addOCcode").textbox('getValue').toLocaleUpperCase();
		var enabledatefrom = $("#addenabledatefrom").datebox('getValue');
		var enbledateto = $("#addenbledateto").datebox('getValue');
		$('#addOCForm').form('enableValidation');
		if($('#addOCForm').form('validate')){
			CMC.confirm("确认增加航空公司:["+name+"]?" , function(r){
				
					if(r){
							CMC.request({
								method: "POST",
								url: OC.addUrl,
								data: {
									'name':name,
					            	'code':code,
					            	'enabledatefrom':enabledatefrom,
					                'enbledateto':enbledateto
								},
							  	success: function(result){
							  		CMC.alertMessage(result.messageBody, 'info',CMC.search);
							  		CMC.dialog('addOCDialog','close');
							  	}
							});
					}
				
				});
		}
	});
	
	$('#updateOC').click(function(){
		var record = CMC.grid.datagrid("getSelected");
		var id = record.id;
		var name = $("#updateOCname").val();
		var code = $("#updateOCcode").textbox('getValue').toLocaleUpperCase();
		var enabledatefrom = $("#updateenabledatefrom").datebox('getValue');
		var enbledateto = $("#updateenbledateto").datebox('getValue');
		$('#updateOCForm').form('enableValidation');
		if($('#updateOCForm').form('validate')){
			CMC.confirm("确认修改航空公司:["+name+"]?" , function(r){
				
					if(r){
							CMC.request({
								method: "POST",
								url: OC.updateUrl,
								data: {
									'id':id,
									'name':name,
					            	'code':code,
					            	'enabledatefrom':enabledatefrom,
					                'enbledateto':enbledateto
								},
							  	success: function(result){
							  		CMC.alertMessage(result.messageBody, 'info',CMC.search);
							  		CMC.dialog('updateOCDialog','close');
							  	}
							});
					}
				
				});
		}
	});
	
	
	
	$('#searchFormDelete').click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请选择要删除的记录！",'warn');
			return;
		}
		CMC.confirm("请确认是否删除["+record['name']+"]?", function(r){
			if(r){
				CMC.request({
					method: "POST",
					url: OC.deleteUrl,
					data: record,
				  	success: function(result){
				  		CMC.alertMessage(result.messageBody, 'info',CMC.search);
				  	}
				});
			}
		});
	});
	
    $.extend($.fn.validatebox.defaults.rules, {
        checkVilidOCcode: {
            validator: function(value){
            	var reg=new RegExp("^[0-9a-zA-Z]{2}$");
                return value.length==2 && reg.test(value);
            },
            message: '航空公司二字码长度必须是两位,并由数字和大小写字母组成'
        }
    });
    
})(jQuery)

$(document).ready(function(){
	CMC.init(OC);
});

