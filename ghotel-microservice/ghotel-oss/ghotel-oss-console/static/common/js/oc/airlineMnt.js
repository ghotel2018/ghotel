/**
 *航线规则维护
 */

var AirLineRule =  {
	searchTableRequired: true,
	menuId: "AirLineRule",
	searchUrl: "authorized/airLineRule/getAll",
    insertExceptFligthNoUrl: "authorized/airLineRule/insertExceptFligthNo",
	addUrl: "authorized/airLineRule/add",
	ocListUrl: "authorized/airLineRule/ocList",
	delExceptUrl: "authorized/airLineRule/deleteExcept",
	getExceptUrl: "authorized/airLineRule/getExcept",
	updateExceptUrl: "authorized/airLineRule/updateExcept",
	getAirLineInfoUrl: "authorized/airLineRule/getAirLineInfo",
	importUrl: "authorized/airLineRule/import",
	deleteUrl: "authorized/airLineRule/delete",
	editUrl: "authorized/airLineRule/update",
	columns :  [[
					{field: 'routeId', title:'航线ID' , width: '5%' , align: 'center'},
					{field: 'isExcept', title:'是否除外航班' , width: '8%' , align: 'center',formatter: function(value){
			        	   if(value=="0"){
			        		   return '否';
			        	   }else if(value=="1"){
				        	   return "是";
			        	   }else{
			        	   	return "";
			        	   }
			           }},
					{field: 'createByName', title:'创建人' , width: '6%' , align: 'center'},
					{field: 'createTime', title:'创建时间' , width: '11%' , align: 'center'},
					{field: 'flightLine', title:'航线' , width: '8%' , align: 'center'},
					{field: 'saleDate', title:'销售日期' , width: '15%' , align: 'center'},
					{field: 'enableDate', title:'航班日期' , width: '15%' , align: 'center'},
					{field: 'deleteFlag', title:'除外是否生效' , width: '10%' , align: 'center',formatter: function(value){
			        	   if(value=="0"){
			        		   return '否';
			        	   }else if(value=="1"){
				        	   return "是";
			        	   }else{
			        	   	return "";
			        	   }
			           }},
					{field: 'lastUpdateByName', title:'最后修改人' , width: '8%' , align: 'center'},
					{field: 'lastUpdateTime', title:'最后修改时间' , width: '11%' , align: 'center'}
				]]
};

//重置
$("#reset").click(function () {
    $("#input_depCity").textbox("setValue", "");
    $("#input_arrCity").textbox("setValue", "");
    $("#select_isExcept").combobox("select", 0);
});
//小写转大写
$('#input_depCity').textbox({
      inputEvents:$.extend({},$.fn.textbox.defaults.inputEvents,{
          keyup:function(e){
              this.value = this.value.toUpperCase()
          }
      })
})

$('#input_arrCity').textbox({
    inputEvents:$.extend({},$.fn.textbox.defaults.inputEvents,{
        keyup:function(e){
            this.value = this.value.toUpperCase()
        }
    })
})

var except_static=true;
//var height_static=0;
$("#add").click(function(event) {
    $('#addDetail').dialog({    
        title: '新增航线规则',    
        width: 850,    
        height: 560,    
        closed: false,
        resizable:true,    
        cache: false,    
        href: '/cmc/module/oc/addAirLineRule.html',    
        modal: true,
        buttons:[{
				text:'确定',
				handler:function(){
					submitAdd();
				}
			},{
				text:'关闭',
				handler:function(){
					deleteExcept("add");
					CMC.dialog('addDetail','close');
				}
			}],
        onLoad:function(){
//      	 height_static=0;
            $.parser.parse($('#addAirLineForm'));
            $("#setIsExcept").hide();
            $('#addAirLineForm').form('reset');
            $('#addAirLineForm').form('disableValidation');
              // 
        },
        onClose:function(){
        	deleteExcept("add");
        }
    });
    // $.parser.parse($('#addAirLineForm'));
});

/**
 * 删除除外
 */
function deleteExcept(flag){
	if(!except_static){
        var id;
	    if (flag=="add"){
		    id=$("#except_id").val();
        }else if(flag=="edit"){
	        id=$("#edit_except_id").val();
        }
		if(id!=""){
			CMC.request({
	            url: AirLineRule.delExceptUrl+"/"+id,
	            method: 'GET',
	            success: function(result){
	            	if(result.statusCode==0){
	            		
	            	}
	            	except_static=true;
	            }
	        });
		}		
	}
}

/**
 * 添加除外航班
 */
function submitAdd(){
	var isValid = $("#addAirLineForm").form('enableValidation').form("validate");
    if (isValid) {	
    	 CMC.request({
            url: AirLineRule.addUrl,
            method: 'POST',
            data: $("#addAirLineForm").form().serialize(),
            success: function(result){
            	except_static=true;
                CMC.alertMessage(result.messageBody,'info');
                // CMC.dialog('PayBeforePnrManageSwitchDetail','close');
            }
        });
    }
}

/**
 * 删除
 */
$("#delete").click(function () {
    var code = CMC.grid.datagrid("getSelected");
    if(!code){
        CMC.alertMessage("请先选中一条记录！","warning");
        return;
    }
    CMC.confirm("确定删除保险信息?", function(r) {
        if (r) {
            CMC.request({
                url: AirLineRule.deleteUrl,
                method: 'POST',
                data: {ruleId: code["routeId"]},
                success: function (result) {
                    CMC.alertMessage(result.messageBody, "info");
                    if (result.statusCode == "0") {
                        CMC.search();
                    }
                }
            });
        }
    });
});

/**
 * 编辑
 */
$("#edit").click(function () {
    var code = CMC.grid.datagrid("getSelected");
    if(!code){
        CMC.alertMessage("请先选中一条记录！","warning");
        return;
    }
    if(code["isExcept"]=="1"){
        CMC.alertMessage("请先选中非除外航班记录！","warning");
        return;
    }
    $('#editDetail').dialog({
        title: '编辑航线规则',
        width: 850,
        height: 560,
        closed: false,
        resizable:true,
        cache: false,
        href: '/cmc/module/oc/editAirLineRule.html',
        modal: true,
        buttons:[{
            text:'确定',
            handler:function(){
                submitEdit();
            }
        },{
            text:'关闭',
            handler:function(){
                // deleteExcept("edit");
                CMC.dialog('editDetail','close');
            }
        }],
        onLoad:function(){
            $("#edit_setIsExcept").hide();
            CMC.request({
                url: AirLineRule.getAirLineInfoUrl,
                method: 'POST',
                data: {ruleId:code["routeId"]},
                success: function(result){
                    var ocRouteBean=result.messageBody.ocRouteBean;
                    var ocDisplayRuleInfoBean=result.messageBody.ocDisplayRuleInfoBean;
                    var list=result.messageBody.list;

                    $("#hid_routeId").val(ocRouteBean['routeId']);
                    $("#edit_depCity").textbox('setValue',ocRouteBean['depCity']);
                    $("#edit_arrCity").textbox('setValue',ocRouteBean['arrCity']);
                    $("#edit_saleDateFrom").textbox('setValue', ocRouteBean['saleDateFrom']);
                    $("#edit_saleDateTo").textbox('setValue', ocRouteBean['saleDateTo']);
                    $("#edit_enableDateFrom").textbox('setValue', ocRouteBean['enableDateFrom']);
                    $("#edit_enableDateTo").textbox('setValue', ocRouteBean['enableDateTo']);

                    if(!(typeof(list)=="undefined")){
                        for(var i=0;i<list.length;i++){
                            var obj=list[i];
                            var deleteFlag="";
                            if(obj['deleteFlag']==0){
                                deleteFlag="未生效";
                            }else if(obj['deleteFlag']==1){
                                deleteFlag="生效";
                            }
                            var fligthNoTr = "<tr>" +
                                "<td>" + ((obj['flightNo']==null)?"":obj['flightNo']) + "</td>" +
                                "<td>" + obj['depCity'] + "</td>" +
                                "<td>" + obj['arrCity'] + "</td>" +
                                "<td>" + ((obj['ocName']==null)?'':obj['ocName']) + "</td>" +
                                "<td>" + obj['saleDateFrom'] + "|" + obj['saleDateTo'] + "</td>" +
                                "<td>" + deleteFlag + "</td>" +
                                "<td>" +
                                "<a href='#' class='easyui-linkbutton' data-options='iconCls:" + '"icon-remove"' + "'  onclick='delFligthNo(" + obj['routeId'] + ")'>删除</a>" +
                                "</td>" +
                                "</tr>";
                            $("#edit_tbExcept").append(fligthNoTr);
                            var except_id=$("#edit_except_id").val();
                            if(except_id!=""){
                                $("#edit_except_id").val(except_id+","+obj['routeId']);
                            }else{
                                $("#edit_except_id").val(obj['routeId']);
                            }
                            except_static=false;
                        }
                        $("#edit_depCity").textbox('readonly',true);
                        $("#edit_arrCity").textbox('readonly',true);
                        $.parser.parse($('#edit_tbExcept'));
                        $("#edit_checkIs").prop("checked", true);
                        $("#edit_setIsExcept").show();
                    }
                    $("#edit_czAirlineCount").textbox('setValue', ocDisplayRuleInfoBean['czAirlineCount']);
                    $("#edit_allowDisplyCount").textbox('setValue', ocDisplayRuleInfoBean['allowDisplyCount']);
                    $("#edit_allowPriceGap").textbox('setValue', ocDisplayRuleInfoBean['allowPriceGap']);
                    $("#edit_allowTimeGap").textbox('setValue', ocDisplayRuleInfoBean['allowTimeGap']);
                    $("#edit_allowMoreThanCz").combobox('select', ocDisplayRuleInfoBean['allowMoreThanCz']);
                    $("#edit_allowWhenCheaper").combobox('select', ocDisplayRuleInfoBean['allowWhenCheaper']);
                    $("#edit_displayOrder").combobox('select', ocDisplayRuleInfoBean['displayOrder']);
                }
            });
            $.parser.parse($('#addAirLineForm'));
            $('#editAirLineForm').form('disableValidation');
            //
        }/*,
        onClose:function(){
            deleteExcept("edit");
        }*/
    });
});

/**
 * 批量导入
 */
$("#airLineInfo_import").click(function () {
    var val=$("#airLineInfo").val();
    if(val==""){
        CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
        return;
    }
    if(val && val != "" && (val.indexOf("xls")==-1 && val.indexOf("xlsx")==-1) ){
        CMC.alertMessage("请选择excel文件。",'warn');
        return ;
    }
    CMC.confirm("是否确认导入文件?",function(r) {
        if (r) {
            CMC.showProcessBox();
            CMC.fileUpload({
                url: AirLineRule.importUrl,
                type: "POST",
                dataType: "json",
                fileElementId: "airLineInfoFile",
                // data: $("#cityListImportForm").form().serialize(),
                asyc: true,
                timeout: 600000,
                success: function (response) {
                    try {
                        CMC.hideProcessBox();
                        CMC.alertMessage(response.messageBody, 'info', CMC.search());
                    } catch (e) {
                    }
                },
                error: function () {
                    try {
                        CMC.alertMessage("服务器发生错误，请联系系统管理员！", 'error');
                        CMC.hideProcessBox();
                    } catch (e) {
                    }
                }, complete: function () {
                    try {
                        CMC.hideProcessBox();
                    } catch (e) {
                    }
                }
            });
        }
    });
});


/**
 * 更新航线规则信息
 */
function submitEdit() {
    var isValid = $("#editAirLineForm").form('enableValidation').form("validate");
    if (isValid) {
        CMC.request({
            url: AirLineRule.editUrl,
            method: 'POST',
            data: $("#editAirLineForm").form().serialize(),
            success: function(result){
                except_static=true;
                CMC.alertMessage(result.messageBody,'info');
                CMC.search()
                CMC.dialog('editDetail','close');
            }
        });
    }
}

$("#batch").click(function () {
    $("#airLineImportForm").form('clear');
    CMC.dialog('airLineImportDetail','open');
});

$("#airLine_Template").click(function () {
    window.open(encodeURI("/cmc/download/routeRuleTemplate.xls"));
});


/**
 * 初始化
 */
$(document).ready(function(){
	CMC.init(AirLineRule);	
});
