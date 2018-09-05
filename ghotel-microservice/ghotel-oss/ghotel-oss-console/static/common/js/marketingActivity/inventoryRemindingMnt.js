/**
 * 库存提醒管理
 */

var InventoryReminding={
    searchTableRequired: true,
    menuId: "InventoryReminding",
    addUrl: 'authorized/inventoryReminding/add',
    updateUrl: 'authorized/inventoryReminding/update',
    deleteUrl: 'authorized/inventoryReminding/delete',
    getWarnUserUrl: 'authorized/inventoryReminding/getWarnUser',
    startUpUrl: 'authorized/inventoryReminding/startUp',
    searchUrl: "authorized/inventoryReminding/getAll" ,
    columns:[[
        {field: 'warnId', title:'id' ,hidden:'true'},
        {field: 'remark', title:'备注' ,  hidden:'true'},
        {field: 'paramDetail', title:'其它参数' ,  hidden:'true'},
        {field: 'actionId', title:'活动' , width: '15%' , align: 'center'},
        {field: 'actionName', title:'活动名称',width: '20%',align: 'center',
			   formatter:function(value,row,index){
				   if(value==undefined){
						return "-";
					}else{
						return value;
					}
			   }},
        {field: 'startTime', title:'提醒开始时间' , width: '15%' , align: 'center',
			formatter:function(value,row,index){
				if(value==undefined){
					return "-";
				}else{
					return format(value);
				}
			}},
        {field: 'endTime', title:'提醒结束时间' , width: '15%' , align: 'center',
				formatter:function(value,row,index){
					if(value==undefined){
						return "-";
					}else{
						return format(value)
					}
				}},
		{field: 'maxWarn', title:'最大提醒次数' ,  hidden:'true'},
		{field: 'dealInterval', title:'提醒间隔' ,  hidden:'true'},
        {field: 'status', title:'状态' , width: '8%' , align: 'center',
				   formatter:function(value,row,index){
					   var value="";
					   if(row.status==1||row.status=='1'){
						   value="未启动";
					   }else if(row.status==2||row.status=='2'){
						   value="已启动";
					   }else if(row.status==3||row.status=='3'){
						   value="处理中";
					   }
					   return value;
				   }
		}
    ]],
};

(function($){

    $("#inventoryReminding_add").click(function(event) {
    	$('#editFlightDateForm').form('reset');
    	$('#addFlightForm').form('reset');
        $('#addDetail').dialog({    
            title: '新增',    
            width: 550,    
            height: 340,    
            closed: false,
            resizable:true,    
            cache: false,    
            href: '/cmc/module/marketingActivity/addInventoryReminding.html',    
            modal: true,
            onLoad:function(){
                $('#editForm').form('reset');
                $('#addForm').form('disableValidation');
            }  
        });

    });

    $("#inventoryReminding_update").click(function(event) {
    	var code = CMC.grid.datagrid("getSelected");
    	if(!code){
    		CMC.alertMessage("请先选中一条记录！","warning");
    		return;
    	}
    	
    	CMC.request({
            url: InventoryReminding.getWarnUserUrl,
            method: "GET",
            data : {"warnId":code['warnId']},
            success: function(message){
                var warnUser = message.messageBody;
                var resultStr = "";
                $.each(warnUser,function(i){
                	resultStr += this.warnMoble+','+this.warnMail;
                	if(i!=warnUser.length-1)
                		resultStr += '|';
                });
                $("#edit_earlyPerson").val(resultStr);
            }
        });
    	
    	
         $('#editDetail').dialog({    
            title: '编辑',    
            width: 550,    
            height: 340,    
            closed: false,
            resizable:true,    
            cache: false, 
            queryParams: code,   
            href: '/cmc/module/marketingActivity/editInventoryReminding.html',    
            modal: true,
            onLoad:function(){
                var warnId=code['warnId'];
                var maxWarn=code['maxWarn'];
                var dealInterval=code['dealInterval'];
                var actionId=code['actionId'];
                var actionName=code['actionName'];
                var startTime=code['startTime'];
                var remark=code['remark'];
                var paramDetail=code['paramDetail'];
                var endTime=code['endTime'];
                var status=code['status'];
                var paramDetail=code['paramDetail'];
                $("#edit_warnId").val(warnId);
                $("#edit_actionId").textbox('setValue',actionId);
                $("#edit_maxWarn").textbox('setValue',maxWarn);
                $("#edit_dealInterval").textbox('setValue',dealInterval);
                $("#edit_actionName").textbox('setValue',actionName);
                $("#edit_remark").textbox('setValue',remark);
//                $("#edit_startTime").datebox('setValue',startTime==null?"":dateFormat(code['startTime']));
//                $("#edit_endTime").datebox('setValue',endTime==null?"":dateFormat(code['endTime']));
                $("#edit_startTime").datetimebox('setValue',startTime==null?"":format(code['startTime']));
                $("#edit_endTime").datetimebox('setValue',endTime==null?"":format(code['endTime']));
                
                var edit_EarlyWarning = "";
                var edit_EarlyWarningsresult = "";
                var edit_EarlyWarnings = "";
                if(paramDetail!=null){
                	var obj = eval('(' + paramDetail + ')');
                	edit_EarlyWarning = obj.total+"-"+obj.num+"-"+obj.type;
                	$("#edit_EarlyWarning").val(edit_EarlyWarning);
                	
                	var objs = obj.warnList;
                	for (var int = 0; int < objs.length; int++) {
                		edit_EarlyWarnings += objs[int].faveValue+"-"+objs[int].total+"-"+objs[int].num+"-"+objs[int].type+",";
                	}
                	edit_EarlyWarningsresult = edit_EarlyWarnings.substring(0,edit_EarlyWarnings.length-1);
                }
                
                $("#edit_EarlyWarnings").val(edit_EarlyWarningsresult);
                
                $('#editForm').form('disableValidation');
            }
        });
    });
})(jQuery);

$(document).ready(function () {
    CMC.init(InventoryReminding);
});


var ind = 0;

/*动态添加预警值文本框*/
function addFlightLine(faveValue,total,num,Type){
	faveValue = !faveValue?"":faveValue;
	total = !total?"":total;
	num = !num?"":num;
	Type = !Type?"":Type;
	ind++;
	if(Type==2){
		Type = '<select class="easyui-combobox" id ="type'+ind+'" name="type'+ind+'"style="display: none;">'+
			'<option value="1">数值</option><option value="2" selected="selected">百分比</option></select>';
   }else{
		Type = '<select class="easyui-combobox" id ="type'+ind+'" name="type'+ind+'"style="display: none;">'+
		'<option value="1" >数值</option><option value="2" >百分比</option></select>';
   }
    var sb = '<div id="yujin'+ind+'">面值<input type="text" class="easyui-textbox" data-options="validType:'+"'threeCodeValid'"+'" required ="required" size="10" value="'+faveValue+'"/>&nbsp;&nbsp;' +
            '总量<input type="text" class="easyui-textbox" data-options="validType:'+"'threeCodeValid'"+'" required ="required" size="10" value="'+total+'"/>&nbsp;'+
            '&nbsp;&nbsp;&nbsp;&nbsp;提醒值(数值/百分比)  <input type="text" class="easyui-textbox" data-options="validType:'+"'threeCodeValid'"+'" required ="required" size="10" value="'+num+'"/>&nbsp;&nbsp;' +
//            '<input type="text" class="easyui-textbox" data-options="display:'+"'none;'"+'" value="'+total+'"/>'+
            '&nbsp;&nbsp;&nbsp;&nbsp;提醒类型 '+Type+
        
            
            //            <input type="text" class="easyui-textbox" data-options="validType:'+"'threeCodeValid'"+'" required ="required" size="10" value="'+Type+'"/>'+
            '&nbsp;<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'+"'icon-remove'"+'" onclick="removeFlightObj(this)" title="删除"></a>&nbsp;</div>';
    $("#flightLineDiv").append($(sb));
    $.parser.parse($("#yujin"+ind));
    $("#addFlightForm").form('disableValidation');
}


function removeFlightObj(event){
    $(event).parent("div").remove();
}

function combinationFlight(event){
        var flight="";
        var num = 0;
        $("#flightLineDiv input[class='easyui-textbox textbox-f']").each(function(index, el) {
        	
        	if(index==0){
                num = 0;
        	}
        	if(index%3==0){
        		if(flight==""){
        			flight=flight+$(el).val();
        		}else{
        			flight=flight+","+$(el).val();
        		}
        	}else{
        		if(flight==""){
        			flight=flight+$(el).val();
        		}else{
        			flight=flight+"-"+$(el).val();
        		}
        	}
        	if((index+1)%3==0){
        		flight=flight+"-" +$("#type"+num).combobox('getValue');
        		num++;
        	}
        });
        var earlyWarnings=$("#totals").textbox('getValue')+"-"+$("#nums").textbox('getValue')+"-"+$("#Types").textbox('getValue');
//        $("#EarlyWarning").textbox('setValue',earlyWarnings);
//        $("#EarlyWarnings").textbox('setValue',flight);
        $("#EarlyWarning").val(earlyWarnings);
        $("#EarlyWarnings").val(flight);
        $("#addflightlineDetail").dialog('close');
}

function addFlightDate(bf,af){
    bf = !bf?"":bf;
    af = !af?"":af;
    var size=$("#flightDateDiv div").size();
    var sb = '<div id="div_'+size+'">手机:  <input type="text" class= "easyui-textbox" id="warnMoble_'+size+'" style="width: 120px;"/>&nbsp;&nbsp;' +
            '邮箱:  <input type="text" class= "easyui-textbox" id="warnMail_'+size+'" style="width: 120px;"/>&nbsp;'
            +'<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'+"'icon-remove'"+'" onclick="removeFlightDateObj(this)" title="删除"></a>&nbsp;</div>';
    $("#flightDateDiv").append($(sb));
    $.parser.parse($('#div_'+size+''));
    $("#warnMoble_"+size+"").textbox('setValue',bf);
    $("#warnMail_"+size+"").textbox('setValue',af);
    $("#addFlightDateForm").form('disableValidation');
}

function removeFlightDateObj(event){
    $(event).parent("div").remove();
}

function combinationFlightDate(){
     var isValid = $("#addFlightDateForm").form('enableValidation').form("validate");
    if (isValid) {
        var flightDate='';
        $("#flightDateDiv input[class='textbox-value']").each(function(index, el) {
        	if($(el).val()==""){
        		if (index%2==0) {
        			flightDate=flightDate+"empty"+"-";
        		}else{
        			flightDate=flightDate+"empty"+"|";
        		}
        	}else{
        		if (index%2==0) {
        			flightDate=flightDate+$(el).val()+"-";
        		}else{
        			flightDate=flightDate+$(el).val()+"|";
        		}
        	}
        	
        	
        });
        $("#earlyPerson").val(flightDate.substring(0,flightDate.length-1));
        $("#addflightDateDetail").dialog('close');
    }
}


/*                  编辑修改页面                              */

/*动态添加预警值文本框*/
var edind =0;
function edit_addFlightLine(faveValue,total,num,Type){
	faveValue = !faveValue?"":faveValue;
	total = !total?"":total;
	num = !num?"":num;
	Type = !Type?"":Type;
	edind++;
	if(Type==2){
		Type = '<select class="easyui-combobox" id ="edit_type'+edind+'" name="edit_type'+edind+'"style="display: none;">'+
			'<option value="1">数值</option><option value="2" selected="selected">百分比</option></select>';
   }else{
		Type = '<select class="easyui-combobox" id ="edit_type'+edind+'" name="edit_type'+edind+'"style="display: none;">'+
		'<option value="1" >数值</option><option value="2" >百分比</option></select>';
   }
	var sb = '<div id="edyujin'+edind+'">面值<input type="text" id="edit_faveValue'+edind+'" class="easyui-textbox" data-options="validType:'+"'threeCodeValid'"+'" required ="required" size="10" value="'+faveValue+'"/>&nbsp;&nbsp;' +
    '总量<input type="text" class="easyui-textbox" id="edit_total'+edind+'" data-options="validType:'+"'threeCodeValid'"+'" required ="required" size="10" value="'+total+'"/>&nbsp;'+
    '&nbsp;&nbsp;&nbsp;&nbsp;提醒值(数值/百分比)  <input type="text" class="easyui-textbox" id="edit_num'+edind+'" data-options="validType:'+"'threeCodeValid'"+'" required ="required" size="10" value="'+num+'"/>&nbsp;&nbsp;' +
//    '<input type="text" class="easyui-textbox" data-options="display:'+"'none;'"+'" value="'+total+'"/>'+
    '&nbsp;&nbsp;&nbsp;&nbsp;提醒类型 '+Type+

    
    //            <input type="text" class="easyui-textbox" data-options="validType:'+"'threeCodeValid'"+'" required ="required" size="10" value="'+Type+'"/>'+
    '&nbsp;<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'+"'icon-remove'"+'" onclick="removeFlightObj(this)" title="删除"></a>&nbsp;</div>';
    $("#edit_flightLineDiv").append($(sb));
    $.parser.parse($('#edyujin'+edind));
    $("#editFlightForm").form('disableValidation');
}

function removeFlightObj(event){
    $(event).parent("div").remove();
}

function editCombinationFlight(event){
	
	var flight="";
	var num = 0;
    var k = 0;
    
    $("#edit_flightLineDiv input[class='easyui-textbox textbox-f']").each(function(index, el) {
    	if(index==0){
            num = 0;
    	}
    	if(index%3==0){
    		if(flight==""){
    			flight=flight+$(el).val();
    		}else{
    			flight=flight+","+$(el).val();
    		}
    	}else{
    		if(flight==""){
    			flight=flight+$(el).val();
    		}else{
    			flight=flight+"-"+$(el).val();
    		}
    	}
    	if($(el).val()==""){
    		k++;
    	}
    	if((index+1)%3==0){
    		if(k>2){
    			flight=flight+"-" +"";
    		}else{
    			flight=flight+"-" +$("#edit_type"+num).combobox('getValue');
    		}
    		num++;
    	}
    	if(flight.substring(flight.length-3,flight.length)=="---"){
    		flight=flight.substring(0,flight.length-4);
    	}else if(flight.substring(flight.length-4,flight.length)==",---"){
    		flight=flight.substring(0,flight.length-5);
    	}else if(flight=="-"){
    		flight="";
    	}
    });
    
    var earlyWarnings=$("#edit_totals").textbox('getValue')+"-"+$("#edit_nums").textbox('getValue')+"-"+$("#edit_Types").textbox('getValue');
    if(earlyWarnings=="--"){
    	earlyWarnings="";
    }
    $("#edit_EarlyWarning").val(earlyWarnings);
    $("#edit_EarlyWarnings").val(flight); 
    $("#edit_flightLineDiv").append("");
    CMC.dialog('editflightlineDetail','close');
}

function editAddFlightDate(bf,af){
    bf = !bf?"":bf;
    af = !af?"":af;
    
    var size=$("#edit_flightDateDiv div").size();
    var sb = '<div id="div_edit'+size+'">手机:  <input type="text" class= "easyui-textbox" id="edit_warnMoble'+size+'" style="width: 120px;"/>&nbsp;&nbsp;' +
		    '邮箱:  <input type="text" class= "easyui-textbox" id="edit_warnMail'+size+'" style="width: 120px;"/>&nbsp;'
		    +'<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'+"'icon-remove'"+'" onclick="removeFlightDateObj(this)" title="删除"></a>&nbsp;</div>';
    $("#edit_flightDateDiv").append($(sb));
    $.parser.parse($('#div_edit'+size+''));
    $("#edit_warnMoble"+size+"").textbox('setValue',bf);
    $("#edit_warnMail"+size+"").textbox('setValue',af);
    $("#editFlightDateForm").form('disableValidation');
}

function edit_removeFlightDateObj(event){
    $(event).parent("div").remove();
}

function editcombinationFlightDate(){
     var isValid = $("#editFlightDateForm").form('enableValidation').form("validate");
    if (isValid) {
        var flightDate='';
        $("#edit_flightDateDiv input[class='textbox-value']").each(function(index, el) {
            /*if (index%2==0) {
                if ($(el).val()!="") {
                    flightDate=flightDate+$(el).val()+"-";
                }
            }else{
                if ($(el).val()!="") {
                    flightDate=flightDate+$(el).val()+"|";
                }
            }*/
        	if($(el).val()==""){
        		if (index%2==0) {
        			flightDate=flightDate+"-"+",";
        		}else{
        			flightDate=flightDate+"-"+"|";
        		}
        	}else{
        		if (index%2==0) {
        			flightDate=flightDate+$(el).val()+",";
        		}else{
        			flightDate=flightDate+$(el).val()+"|";
        		}
        	}
        });
        
        var reg = new RegExp("|-,-","");
        var flightDate = flightDate.replace(reg,"");
        
        
        $("#edit_earlyPerson").val(flightDate.substring(0,flightDate.length-1));
        // $("#edit_flightdaterange").textbox('disable');
        $("#editflightDateDetail").dialog('close');
    }
}



$("#inventoryReminding_delete").click(function(event) {
     var code = CMC.grid.datagrid("getSelected");
     if(!code){
        CMC.alertMessage("请先选中一条记录！","warning");
        return;
    }
    CMC.confirm("确定删除?", function(r){
      if(r){
            CMC.request({
                url: InventoryReminding.deleteUrl,
                method: "GET",
                data : {"warnId":code['warnId']},
                success: function(result){
                    CMC.alertMessage(result.messageBody,'info');
                    CMC.search();
                }
            });
        }
    });
});


$("#inventoryReminding_startUp").click(function(event) {
    var code = CMC.grid.datagrid("getSelected");
    if(!code){
       CMC.alertMessage("请先选中一条记录！","warning");
       return;
   }
    var status;
    if(code['status']==1 || code['status']=='1'){
    	status = 2;
    }else{
    	status = 1;
    }
   CMC.confirm("确定更改状态?", function(r){
     if(r){
           CMC.request({
               url: InventoryReminding.startUpUrl,
               method: "POST",
               data : {"warnId":code['warnId'],
            	   		"status":status},
               success: function(result){
//                   CMC.alertMessage(result.messageBody,'info');
                   CMC.search();
               }
           });
       }
   });
});

//yyyy-MM-dd格式日期
function dateFormat(longTypeDate){  
    var dateType = "";  
    var date = new Date();  
    date.setTime(longTypeDate);  
    dateType += date.getFullYear();   //年  
    dateType += "-" + getMonth(date); //月   
    dateType += "-" + getDay(date);   //日  
    return dateType;
}
//返回 01-12 的月份值   
function getMonth(date){  
    var month = "";  
    month = date.getMonth() + 1; //getMonth()得到的月份是0-11  
    if(month<10){  
        month = "0" + month;  
    }  
    return month;  
}
//返回01-30的日期  
function getDay(date){  
    var day = "";  
    day = date.getDate();  
    if(day<10){  
        day = "0" + day;  
    }  
    return day;  
}


function format(shijianchuo){
	//shijianchuo是整数，否则要parseInt转换
	var time = new Date(shijianchuo);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}

function add0(m){return m<10?'0'+m:m }


