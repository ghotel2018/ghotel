var StaticData = {
    searchTableRequired : true,
    columns: [ [ {
        field : 'typeKey',
        title : '相关系统',
        width : '80',
        align : 'center',
        formatter : function(value) {
                  return typeData[value];
         }
    }, {
        field : 'typeCode',
        title : '对应CODE',
        width : '15%',
        align : 'center'

    }, {
     field : 'name',
     title : '名称',
     width : '10%',
     align : 'center'

   }, {
         field : 'value',
         title : '值',
         width : '100',
         align : 'center'

   }, {
     field : 'status',
     title : '状态',
     width : '40px',
     align : 'center',
     formatter : function(value) {
               //  debugger;
				 return statusData[value];
			}
    }, {
       field : 'description',
       title : '说明',
       width : '10%',
       align : 'center'
    }, {
        field : 'createBy',
        title : '创建人帐号',
        width : '10%'
   }, {
          field : 'createBy',
          title : '创建人帐号',
          width : '10%'
    } , {
         field : 'createDate',
         title : '创建时间',
         width : '10%',
          formatter : function(value) {
              if(value)
                  return  timeStamp2String(value);
              return "";
          }
      } , {
        field : 'optBy',
        title : '修改人帐号',
        width : '10%'
    } , {
       field : 'optDate',
       title : '修改人时间',
       width : '10%',
        formatter : function(value) {
            if(value)
                return  timeStamp2String(value);
            return "";
        }}

    ] ],
    menuId : 'StaticData',
    searchUrl : 'authorized/staticData/getAll',
    findUrl : 'authorized/staticData/find',
    addUrl : 'authorized/staticData/add',
    deleteUrl : 'authorized/staticData/delete',
    updateUrl : 'authorized/staticData/update',
    expirUrl : 'authorized/staticData/expire',
    effectUrl : 'authorized/staticData/effect',
    epxertAll : 'authorized/staticData/expireAll',
    expireBykeyCode : 'authorized/staticData/expireBykeyCode',
    getStaticData : 'authorized/staticData/getStaticData',
    exportedData:null,
    onDblClickRow:onDblClick
};
function onDblClick(){

}
var statusData={};
var typeData={};
$(document).ready(function() {
     var tollerlist = new Array();
     tollerlist.push("CMC_STATIC_DATA_STATU_CODE");
     tollerlist.push("CMC_STATIC_DATA_TYPE_CODE");
     CMC.request({
        url: StaticData.getStaticData ,
        method: 'POST',
        async:true,
        data:{typeCodeList:tollerlist,typeKey:'CMC'},
        success: function(message){
          if(message.statusCode==0&&message.messageBody){
             var messageBody=message.messageBody;
             if(messageBody.CMC_STATIC_DATA_STATU_CODE){
                 statusData=messageBody.CMC_STATIC_DATA_STATU_CODE;
             }
              if(messageBody.CMC_STATIC_DATA_TYPE_CODE){
                  var dataTypeCode=messageBody.CMC_STATIC_DATA_TYPE_CODE;
                  typeData=messageBody.CMC_STATIC_DATA_TYPE_CODE;
                  var html="";
                  var channelList=new Array();
                  for(var i in dataTypeCode){
                      var student = new Object();
                      student.key =i;
                      student.name = dataTypeCode[i];
                      channelList.push(student);
                  }
                  $("#noticeSearchForm #typeKey").combobox({
                      						data: channelList,
                      						panelHeight: '220px',
                      						valueField:'key',
                      						textField:'name'
                      					});
                   $("#addSumbitForm #typeKey").combobox({
                                            data: channelList,
                                            panelHeight: '220px',
                                            valueField:'key',
                                            textField:'name'
                                        });
                    $("#updateDialog #typeKey").combobox({
                                            data: channelList,
                                            panelHeight: '220px',
                                            valueField:'key',
                                            textField:'name'
                                        });
                     $("#expertDialogForm #typeKey").combobox({
                                             data: channelList,
                                             panelHeight: '220px',
                                             valueField:'key',
                                             textField:'name'
                                         });
              }
          }
        }
     });
       CMC.init(StaticData);
    $("#searchFormAdd").click(function (){
      $('#addSumbitForm').form('clear');
      $('#addDialog').dialog('open');
    });
     $("#epxertByKeyCode").click(function (){
          $('#expertDialogForm').form('clear');
          $('#expertDialog').dialog('open');
     });
    $("#searchFormUpdate").click(function (){
            var record = CMC.grid.datagrid('getSelected');
            if(record==null){
               CMC.alertMessage("请选择记录！",'info');
               return;
            }
         if(record.typeKey=='CMC'&&(record.typeCode=='CMC_STATIC_DATA_STATU_CODE')){
            CMC.alertMessage("当前页面使用，不允许操作！",'info');
            return;
          }
          $('#updateDialog').dialog('open');
     });

    $("#searchFormdelete").click(function (){

           	var record = CMC.grid.datagrid('getSelected');
           	if(record==null){
           	   CMC.alertMessage("请选择要删除的记录！",'info');
           	   return;
           	}
           	if(record.status!=2){
                CMC.alertMessage("只有失效的才能删除！",'info');
                return;
            }
            if(!canEdite()){
                  CMC.alertMessage("当前页面所有，不允许操作！",'info');
                  return;
            }
            if(record.typeKey=='CMC'&&(record.typeCode=='CMC_STATIC_DATA_STATU_CODE')){
                CMC.alertMessage("当前页面使用，不允许操作！",'info');
                return;
             }
            var status=record.status;
            var id=record.id;
            CMC.confirm("是否删除该失效记录?",function(r){
            	if(r){
                     CMC.request({
                              url: StaticData.deleteUrl ,
                              method: 'POST',
                              data:{id:id,status:status,typeCode:record.typeCode,typeKey:record.typeKey},
                              success: function(message){
                                 CMC.alertMessage(message.messageBody,'info');
                                 CMC.dialog('addDialog','close');
                                 CMC.search();
                              }
                     });
            }});

     });
      $("#epxertAll").click(function (){
                 CMC.confirm("是否清空缓存?",function(r){
                 	if(r){
                          CMC.request({
                                   url: StaticData.epxertAll ,
                                   method: 'get',
                                   success: function(message){
                                      CMC.alertMessage(message.messageBody,'info');

                                   }
                          });
                 }});
      });
       $("#epxertByKeyCodeIds").click(function (){
            var record = CMC.grid.datagrid('getSelected');
           	if(record==null){
           	   CMC.alertMessage("请选择要清除的记录！",'info');
           	   return;
           	}
             CMC.confirm("是否清除该缓存?",function(r){
             if(r){
                 CMC.request({
                          url: StaticData.expireBykeyCode ,
                          method: 'POST',
                          data: {typeCode:record.typeCode,typeKey:record.typeKey},
                          success: function(message){
                             CMC.alertMessage(message.messageBody,'info');
                             CMC.dialog('updateDialog','close');
                          }
                 });
            }});

     });
    $("#searchFormExpir").click(function (){
       	var record = CMC.grid.datagrid('getSelected');
       	if(record==null){
       	   CMC.alertMessage("请选择的记录！",'info');
       	   return;
       	}
       	if(record.status!=1){
            CMC.alertMessage("只有启用的数据才能修改为失效！",'info');
            return;
        }
         if(record.typeKey=='CMC'&&(record.typeCode=='CMC_STATIC_DATA_STATU_CODE')){
            CMC.alertMessage("当前页面使用，不允许操作！",'info');
            return;
          }
        var status=record.status;
        var id=record.id;
        CMC.request({
                  url: StaticData.expirUrl ,
                  method: 'POST',
                  data:{id:id,status:status,typeCode:record.typeCode,typeKey:record.typeKey},
                  success: function(message){
                     CMC.alertMessage(message.messageBody,'info');
                     CMC.dialog('addDialog','close');
                     CMC.search();
                  }
                });
    });
    $("#searchFormUser").click(function (){
           	var record = CMC.grid.datagrid('getSelected');
           	if(record==null){
           	   CMC.alertMessage("请选择的记录！",'info');
           	   return;
           	}
           	if(record.status!=2){
                CMC.alertMessage("只有失效的数据才能修改为启用！",'info');
                return;
            }
            if(record.typeKey=='CMC'&&(record.typeCode=='CMC_STATIC_DATA_STATU_CODE')){
                CMC.alertMessage("当前页面使用，不允许操作！",'info');
                return;
             }
            var status=record.status;
            var id=record.id;
            CMC.request({
                      url: StaticData.effectUrl ,
                      method: 'POST',
                      data:{id:id,status:status,typeCode:record.typeCode,typeKey:record.typeKey},
                      success: function(message){
                         CMC.alertMessage(message.messageBody,'info');
                         CMC.dialog('addDialog','close');
                         CMC.search();
                      }
                    });
        });
    $("#updateSumbit").click(function (){
        var record = CMC.grid.datagrid('getSelected');
        if(record==null){
           CMC.alertMessage("请选择的记录！",'info');
           return;
        }
        if(record.status!=2){
            CMC.alertMessage("只有失效的数据才能修改为启用！",'info');
            return;
        }

        if(!canEdite()){
            CMC.alertMessage("当前页面使用，不允许修改！",'info');
            return;
        }

         if(record.typeKey=='CMC'&&(record.typeCode=='CMC_STATIC_DATA_STATU_CODE')){
            CMC.alertMessage("当前页面使用，不允许修改！",'info');
            return;
         }
         var ok=$("#updateDialog").form('validate');
         if(!ok){
            CMC.alertMessage("请将数据填写完整！",'info');
            return;
         }
        var status=record.status;
        var id=record.id;
       var name= $("#updateDialog #name").val();
       var value= $("#updateDialog #value").val();
       var description= $("#updateDialog #description").val();
         CMC.request({
             url: StaticData.updateUrl ,
             method: 'POST',
             data: {id:id,name:name,value:value,description:description},
             success: function(message){
                CMC.alertMessage(message.messageBody,'info');
                 if(message.statusCode==0){
                     CMC.dialog('updateDialog','close');
                     CMC.search();
                  }
             }
           });
      });

     $("#addSumbit").click(function (){
        var ok=$("#addSumbitForm").form('validate');
        if(ok){
            CMC.request({
                url: StaticData.addUrl ,
                method: 'POST',
                data: $("#addSumbitForm").form().serialize(),
                success: function(message){

                   CMC.alertMessage(message.messageBody,'info');
                   if(message.statusCode==0){
                     CMC.dialog('addDialog','close');
                      CMC.search();
                   }

                }
              });
         }else{
             CMC.alertMessage("请将数据填写完整！",'info');
         }
     });

   $('#addDialog').dialog({
    		title: '新建开关类',
    		closed: true,
    		width: 330,
    	    height:230,
    	    minimizable: false,
    	    maximizable: false,
    	    collapsible: false,
    	    });
     var winTopLeft = CMC.getWindowTopLeft("addDialog");
     $('#addDialog').window({
         			top:winTopLeft.winTop,
         			left:winTopLeft.winLeft
         		});
    $('#updateDialog').dialog({
        		title: '修改开关类',
        		closed: true,
        		width: 330,
        	    height:230,
        	    minimizable: false,
        	    maximizable: false,
        	    collapsible: false,
        	    onOpen:function(){
        	      $('#updateformDialog').form('clear');
        	      var record = CMC.grid.datagrid('getSelected');
        	      if(record==null){
                     CMC.alertMessage("请选择的记录！",'info');
                     CMC.dialog('updateDialog','close');
                     return;
                  }
                   $('#updateformDialog #description').textbox('setValue',record.description);
                   $('#updateformDialog #name').textbox('setValue',record.name);
                   $('#updateformDialog #value').textbox('setValue',record.value);
                   $('#updateformDialog #typeCode').textbox('setValue',record.typeCode);
                    $('#updateformDialog #typeKey').combobox('setValue',record.typeKey);
                  // combobox('setValue','0');
                  // .textbox('setValue',groupId);
        	    }
        	    });
    $('#updateDialog').window({
             			top:winTopLeft.winTop,
             			left:winTopLeft.winLeft
             		});
});
function canEdite(){
  var record = CMC.grid.datagrid('getSelected');
  if(record.typeKey=='CMC'&&( record.typeCode=='CMC_STATIC_DATA_TYPE_CODE')){
    return false;
  }
  return true;
}
