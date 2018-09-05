/**
 * zhangyeping
 */

var generalizelinkConst ={ minpriceflag: [ { key: "1", value: "是"},
                                           { key: "0", value: "否" }
                                         ]
                         };
var Generalizelink = {
	
    searchTableRequired : true,
    columns: [ [ {
        field : 'url',
        title : '链接地址',
        width : '15%',
        align : 'center'
    }, {
        field : 'merchantid',
        title : '链接 ID',
        width : '10%',
        align : 'center'
        
    }, {
        field : 'name',
        title : '合作方名称',
        width : '10%',
        align : 'center'
    }, {
        field : 'startsaledate',
        title : '销售有效期',
        width : '10%',
        align : 'center'
    }, {
        field : 'startflightdate',
        title : '航班有效期',
        width : '10%',
        align : 'center'
    }, {
        field : 'pricegroup',
        title : '运价组',
        width : '10%',
        align : 'center'
    }, {
        field : 'interPsgrType',
        title : '国际旅客类型',
        width : '10%',
        align : 'center',
    	formatter: function(value,row,index){
			if (value && value.length>2){
				var returnValue = value.substr(0,2) +"...<a href='javascript:void(0)' onclick=Generalizelink.showInterPsgrDetails('"+value+"') >详细......</a>"
				return returnValue;
			} else {
				return value;
			}
		}
    }, {
        field : 'minpriceflag',
        title : '是否比价取最低价',
        align : 'center',
        width : '100',
    	formatter: function(value){
    		var minpriceflag=generalizelinkConst.minpriceflag;
    		return jsonDisplay(value,minpriceflag);
        }
    }, {
        field : 'paygate',
        title : '支付网关',
        width : '13%',
        align : 'center',
    	formatter: function(value,row,index){
			if (value && value.length>2){
				var returnValue = value.substr(0,2) +"...<a href='javascript:void(0)' onclick=Generalizelink.showDetails('"+value+"') >详细......</a>"
				return returnValue;
			} else {
				return value;
			}
		}
    }
    ] ],
    menuId : 'GeneralizeLink',
    searchUrl : 'authorized/generalizeLink/getList',
    checkMerchantIdUrl : 'authorized/generalizeLink/check',
    findGeneralizeLinktUrl : 'authorized/generalizeLink/find',
    postGeneralizeLinktUrl : 'authorized/generalizeLink/save',
    deletGeneralizeLinktUrl : 'authorized/generalizeLink/delete',
    exportUrl : 'authorized/generalizeLink/export',
    getMerIds : 'authorized/generalizeLink/getMerIds',
    importUrl:'authorized/generalizeLink/importReport',
    exportedData:null,
    onDblClickRow:onDblClick
};
var update="";
Generalizelink.reset=function(value){
	var start= $("#noticeSearchForm input[name='start']:hidden").val();
	var end=$("#noticeSearchForm input[name='end']:hidden").val();
	$('#noticeSearchForm').form('clear');
	$("#noticeSearchForm input[name='start']:hidden").val(start);
	$("#noticeSearchForm input[name='end']:hidden").val(end);
}	 
function onDblClick(i,value){
 var $win;
 update="";

 $win=$('#win').dialog({
    	title: '查看推广链接',
    	closed: true,
		width: 750,
        height: 600,
        minimizable: false,
        maximizable: false,
        collapsible: false,
        href: "/cmc/module/generalizelink/editgeneralizeLinkInfo.html",
        onLoad: function () {
        	$("#createExtendLinkInfo").remove();
        	$("#span_merchantId").hide();
        	setExtendLinkInfo(value);
        	$("div#editgeneralizeLink input,select").each(function() { 
        		$(this).attr("disabled",'disabled');  
        	}); 
        }
    });
   $win.dialog('open');  
}
function jsonDisplay(value,minpriceflag ){
	if(!minpriceflag||minpriceflag.length<1){
		return value;
	}
	for(var tem in minpriceflag){
		if(value=minpriceflag[tem].key){
			return minpriceflag[tem].value;
		}
	}
	return value;
}
Generalizelink.add=function(value){
	 var $win;
	 update="";
	 $win=$('#win').dialog({
	    	title: '增加推广链接',
	    	closed: true,
    		width: 750,
 	        height:  600,
	        minimizable: false,
	        maximizable: false,
	        collapsible: false,
            href: "/cmc/module/generalizelink/editgeneralizeLinkInfo.html",
            onLoad: function () {
            	update="";
            	$("div#editgeneralizeLink #productLabelView").hide();
            }
        });
	$win.dialog('open');  
}
Generalizelink.deleteMer=function(value){
	var record = CMC.grid.datagrid('getSelected');
	if(record==null){
		CMC.alertMessage("请选择删除记录！",'warn');
		return ;
	}
	var value  = record["merchantid"];
	 CMC.confirm("你选择删除链接 ID["+value+"]的记录， 请确认是否继续?", function(r){
		  if(r){
			  CMC.request({
					url: Generalizelink.deletGeneralizeLinktUrl+"?merchantid="+value,
					data:{"merchantid":value},
					method: 'post',
					success: function(msg){
						CMC.alertMessage(msg.messageBody,'info');
						if(msg.statusCode==0){
							CMC.search();
						}
					}
			     });
		  }
	 })
	 
}

Generalizelink.editBtn=function(){
	var record = CMC.grid.datagrid('getSelected');
	if(record==null){
		CMC.alertMessage("请选择修改记录！",'warn');
		return ;
	}
	var value  = record["merchantid"];
	Generalizelink.edit(value);
}
Generalizelink.showDetails=function(value){
	var activedate=";"+value+";"
	$("div#showPcGatewayDetail input[name='pcGateway']:checkbox").each(function() { 
	    if (activedate.indexOf(";"+$(this).val()+";")>-1) { 
	    	$(this).prop({checked:true}); 
	    }else{
	    	$(this).prop({checked:false}); 
	    }
	}); 
	CMC.dialog("showPcGatewayDetail", "open");
}

Generalizelink.showInterPsgrDetails=function(value){
	
	var activedate=";"+value+";"
	CMC.dialog("showInterPsgrTypeDetail", "open");
	$("div#showInterPsgrTypeDetail input[name='interPsgrType']:checkbox").each(function() { 
		if (activedate.indexOf(";"+$(this).val()+";")>-1) {
			$(this).prop({checked:true}); 
	    }else{
	    	$(this).prop({checked:false}); 
	    }
	});
	
}

Generalizelink.edit=function(value){
	if(!value){
		CMC.alertMessage("请先选中一条记录！","warning");
		return;
	}
	 var $win;
	 update="";
	 $win=$('#win').dialog({
	    	title: '修改推广链接',
	    	closed: true,
    		width: 750,
 	        height: 600,
	        minimizable: false,
	        maximizable: false,
	        collapsible: false,
            href: "/cmc/module/generalizelink/editgeneralizeLinkInfo.html",
            onLoad: function () {
            	 CMC.request({
         			url: Generalizelink.findGeneralizeLinktUrl+"?merchantid="+value,
         			data:{},
         			method: 'get',
         			success: function(msg){
         				if(msg.statusCode==0){
         					if(msg.messageBody.length==1){
         						setExtendLinkInfo(msg.messageBody[0]);
         						update="update";
         					}else{
         						$('#win').dialog('close'); 
         						CMC.alertMessage("系统出错,数据不唯一",'error');
         						
         					}
         				}else{
         					CMC.alertMessage("系统出错",'error');
         					$('#win').dialog('close'); 
         				}
         			}
         	     });
            }
        });
	   $win.dialog('open');  
}


function setExtendLinkInfo(data){
	$("div#editgeneralizeLink #merchantId").val(data.merchantid);
	$("div#editgeneralizeLink #homePromotionCode").val(data.homePromotionCode);
	$("div#editgeneralizeLink #name").val(data.name);
	$("div#editgeneralizeLink #name").attr("disabled","disabled"); 
	$("div#editgeneralizeLink #homePromotionCode").attr("disabled","disabled"); 
	$("div#editgeneralizeLink #merchantId").attr("disabled","disabled"); 
	
	$("div#editgeneralizeLink #saleUnit").val(data.saleunit);
	$("div#editgeneralizeLink #startSaleDate").datebox("setValue", data.startsaledate)
	$("div#editgeneralizeLink #endSaleDate").datebox("setValue", data.endsaledate)
	$("div#editgeneralizeLink #startFlightDate").datebox("setValue", data.startflightdate);
	$("div#editgeneralizeLink #endFlightDate").datebox("setValue", data.endflightdate);
	if(data.activedate){
		var activedate=";"+data.activedate.trim()+";";
		$("div#editgeneralizeLink input[name='activeDate']:checkbox").each(function() { 
		    if (activedate.indexOf(";"+$(this).val()+";")>-1) { 
		    	$(this).attr("checked",'checked'); 
		    } 
		}); 
	}
	//minPriceFlag
	$("div#editgeneralizeLink #priceGroup").val(data.pricegroup);
	$("div#editgeneralizeLink #interPriceCode").val(data.interpricecode);
	if(data.minpriceflag){
		$("div#editgeneralizeLink input[name='minPriceFlag'][value="+data.minpriceflag+"]").attr("checked",true); 
	}
	if(data.interPsgrType){
		var activedate=";"+data.interPsgrType.trim()+";";
		$("div#editgeneralizeLink input[name='interPsgrType']:checkbox").each(function() { 
		    if (activedate.indexOf(";"+$(this).val()+";")>-1) { 
		    	$(this).attr("checked",'checked'); 
		    } 
		}); 
	}
	$("div#editgeneralizeLink #tourCode").val(data.tourCode);
	$("div#editgeneralizeLink #interPsgTypeCode").val(data.interpsgtypecode);
	$("div#editgeneralizeLink #ticketPsgTypeCode").val(data.ticketpsgtypecode);
	$("div#editgeneralizeLink #SSRCode").val(data.ssrcode);
	if(data.interPsgrType){
		var activedate=";"+data.interPsgrType.trim()+";";
		$("div#editgeneralizeLink input[name='productLabel']:checkbox").each(function() { 
		    if (activedate.indexOf(";"+$(this).val()+";")>-1) { 
		    	$(this).attr("checked",'checked'); 
		    } 
		}); 
	}
	
	 
	$("div#editgeneralizeLink #ENDESCRIPTION").val(data.enProductDescription);
	$("div#editgeneralizeLink #memberLogin").val(data.memberLogin);
	$("div#editgeneralizeLink #svcIdentityAuth").val(data.svcIdentityAuth);
	$("div#editgeneralizeLink #DESCRIPTION").val(data.productdescription);
	$("div#editgeneralizeLink #memberJoinStart").datebox("setValue", data.memberJoinStart);
	$("div#editgeneralizeLink #memberJoinEnd").datebox("setValue", data.memberJoinEnd);
	$("div#editgeneralizeLink #registerhours").val(data.registerHours);
	$("div#editgeneralizeLink #userRestriction").val(data.userRestriction);
	if(data.credentialstype){
		$("div#editgeneralizeLink input[name='credentialsType'][value="+data.credentialstype+"]").attr("checked",true); 
	}
	if(data.showgateway){
		$("div#editgeneralizeLink input[name='showGateway'][value="+data.showgateway+"]").attr("checked",true); 
	}
	
	if(data.paygate){
		var activedate=";"+data.paygate.trim()+";";
		$("div#editgeneralizeLink input[name='pcGateway']:checkbox").each(function() { 
		    if (activedate.indexOf(";"+$(this).val()+";")>-1) { 
		    	$(this).attr("checked",'checked'); 
		    } 
		}); 
	}
	
	if(data.display){
		var activedate=","+data.display.trim()+",";
		$("div#editgeneralizeLink input[name='productLabel']:checkbox").each(function() { 
		    if (activedate.indexOf(","+$(this).val()+",")>-1) { 
		    	$(this).attr("checked",'checked'); 
		    } 
		}); 
	}
	
	if(data.cabins){
		$("div#editgeneralizeLink #pdShow").text(data.labelname);
		$("div#editgeneralizeLink #LABELNAME").val(data.labelname);
		$("div#editgeneralizeLink #CABINS").val(data.cabins);
	}else{
		$("div#editgeneralizeLink input[name='productLabel']:checkbox").each(function() { 
			if($(this).val()=="THIS"){
				$(this).hide();
		    } 
		}); 
	}
	if(data.psgrtype){
		var activedate="$"+data.psgrtype.trim()+"$";
		$("div#editgeneralizeLink input[name='authentication']:checkbox").each(function() { 
			var value=$(this).val();
		    if (activedate.indexOf("$"+value+"$")>-1) { 
		    	$(this).attr("checked",'checked'); 
		    //处理$age:10-12
		    }else if(activedate.indexOf("$"+value+":")>-1){
		    	$(this).attr("checked",'checked'); 
		    	if(value=="limitNum"){//成行人数限制
			    	   var newValue=splitpsgrtype(data.psgrtype.trim(),"limitNum");
			          $("div#editgeneralizeLink #limitNum").val(newValue);
			    }else if(value=="age"){//成行人数限制
			    	   var newValue=splitpsgrtype(data.psgrtype.trim(),"age");
				          $("div#editgeneralizeLink #age").val(newValue);
				}else if(value=="city"){//成行人数限制
			    	   var newValue=splitpsgrtype(data.psgrtype.trim(),"city");
				          $("div#editgeneralizeLink #city").val(newValue);
				}else if(value=="sex"){//成行人数限制
			    	   var newValue=splitpsgrtype(data.psgrtype.trim(),"sex");
				      $("div#editgeneralizeLink input[name='sex'][value="+newValue+"]").attr("checked",true); 
				}else if(value=="times"){//成行人数限制
			    	   var newValue=splitpsgrtype(data.psgrtype.trim(),"times");
			    	   var newSplit=newValue.split("-");
			    	   if(newSplit.length>1){
			    		   $("div#editgeneralizeLink #times1").val(newSplit[0]);
			    		   $("div#editgeneralizeLink #times2").val(newSplit[1]);
			    	   }else{
			    		   $("div#editgeneralizeLink #times1").val(newValue); 
			    	   }
				}else if(value=="dates"){//成行人数限制 2,3,4,5
			    	   var newValue=splitpsgrtype(data.psgrtype.trim(),"dates");
			    	   var newValue=","+newValue.trim()+",";
				   		$("div#editgeneralizeLink input[name='dates']:checkbox").each(function() { 
				   		    if (newValue.indexOf(","+$(this).val()+",")>-1) { 
				   		    	$(this).attr("checked",'checked'); 
				   		    } 
				   		});
				}
		    	
		   //处理 $aduNum:1$chdNum:3$infNum:4
		    }else if(value=="orderInfantNum"&&
		    		activedate.indexOf("infNum:")>-1){//订单包含婴儿数
		    	   var newValue=splitpsgrtype(data.psgrtype.trim(),"infNum");
		          $("div#editgeneralizeLink #orderInfantNum").val(newValue);
		          $(this).attr("checked",'checked'); 
		    }else if(value=="orderChildNum"&&
		    		activedate.indexOf("chdNum:")>-1){//订单包含儿童数
		    	   var newValue=splitpsgrtype(data.psgrtype.trim(),"chdNum");
		    	   $(this).attr("checked",'checked'); 
		          $("div#editgeneralizeLink #orderChildNum").val(newValue);
		    }else if(value=="orderAdultNum"&&
		    		activedate.indexOf("aduNum:")>-1){//订单包含成人数
		    	   var newValue=splitpsgrtype(data.psgrtype.trim(),"aduNum");
		          $("div#editgeneralizeLink #orderAdultNum").val(newValue);
		          $(this).attr("checked",'checked'); 
		    }else if(value=="birthday"&&
		    		activedate.indexOf("birth:")>-1){//订单包含成人数
		    	   var newValue=splitpsgrtype(data.psgrtype.trim(),"birth");
		          $("div#editgeneralizeLink #birthday").val(newValue);
		          $(this).attr("checked",'checked'); 
		    }
		    
		}); 
	}
}
function splitpsgrtype(psgrtype,value){
	var psgrtype=psgrtype.split("$");
	var newValue="";
	for(var i=0;i<psgrtype.length;i++){
		if(psgrtype[i].indexOf(value+":")>-1){
			newValue=psgrtype[i].replace(value+":","");
			break;
		}
	}
	return newValue;
}
function addProductLabel(){
	var pdName = $("div#addProductForm #pdName").val();
	var pdCabins =  $("div#addProductForm #pdCabins").val();
	
	if(!pdName||pdName==""){
		alert ("请填写产品标签名称。");
		return false;
	}
	if(!pdCabins||pdCabins=="") {
		alert ("请填写舱位。");
		return false;
	}
	pdCabins = pdCabins.toLocaleUpperCase();
	var reg = pdCabins.match(/[A-Z]/g);
	if(!reg){
		alert("舱位栏请输入英文。");
		return false;
	}else{
		 $("div#editgeneralizeLink #LABELNAME").val(pdName);
		 $("div#editgeneralizeLink #CABINS").val(pdCabins);
		 $("div#editgeneralizeLink #productLabelView").show();
		 $("div#editgeneralizeLink #pdShow").text(pdName);
		 $("div#editgeneralizeLink #pdLabelButton").attr("disabled","true");
		 $("div#editgeneralizeLink input[name='productLabel']:checkbox").each(function() { 
			if($(this).val()=="THIS"){
				$(this).show();
		    } 
		}); 
		closeAddProductForm();
	}
}
Generalizelink.init=function () {
   
}
$(document).ready(function() {
    CMC.init(Generalizelink);
});

Generalizelink.exportData=function () {
	CMC.dialog('generalizeLinkExport','close');
	CMC.request({
		url: Generalizelink.exportUrl,
		method: 'POST',
		data : $("#LinkExportForm").form().serialize(),
		success: function(message){
			CMC.alertMessage("提交优惠推广链接报表请求完成,请移步首页并查看报表记录下载文件！", 'info');
	  		CMC.dialog('exportCouponDialog','close');
		}
	});
}
Generalizelink.exportDialog=function () {
	
	$('#generalizeLinkExport').dialog({
		title: '优惠推广链接导出',
		closed: true,
		width: 250,
	    height:200,
	    minimizable: false,
	    maximizable: false,
	    collapsible: false,
	    onOpen:function(){
	    	CMC.request({
				url: Generalizelink.getMerIds,
				data:{},
				method: 'get',
				success: function(msg){
					if(msg.statusCode==0){
						$("div#generalizeLinkExport #merchantid").empty(); 
						$("div#generalizeLinkExport #merchantid").append("<option value=''>全部</option>");
						var data=msg.messageBody;
						if(data.length>0){
							for(var i=0;i<data.length;i++){
								$("div#generalizeLinkExport #merchantid").append("<option value='"+data[i]+"'>"+data[i]+"</option>");
							}
						}
					}
				}
		     });
	    }
	});
	$('#generalizeLinkExport').dialog('open');
}
function showAddProductForm(){
	if($("div#editgeneralizeLink #pLabelName").val()!=""){
		$("div#editgeneralizeLink #pdCabins").val($("div#editgeneralizeLink #CABINS").val());
		$("div#editgeneralizeLink #pdName").val($("div#editgeneralizeLink #pdShow").text());
	}
     var $win;
	 $win = $('#addProductForm').window({
	        title: '产品标签名称&nbsp;*为必填项！',
	        shadow: true,
	        modal: true,
	        closed: true,
	        minimizable: false,
	        maximizable: false,
	        collapsible: false
	    });
	    $win.dialog('open');
}
function closeAddProductForm(){
	$('#addProductForm').dialog('close');
}

//生成优惠推广链接报表导入
$("#generalizelink_Import").click(function(){
//	CMC.dialog('winMarketingActivityEffect','open');
	$("#generalizeLinkInfo").textbox('setValue','');
	$("#generalizeLinkImport").dialog("open");
});
$("#generalizeLink_Template").click(function(){
	window.open(encodeURI("/cmc/download/generalizeLinkTemplate.xlsx"));
});
$("#generalizeLinkInfo_import").click(function(){
	var val=$("#generalizeLinkInfo").val();
	if(val==""){
		CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
		return;
	}
	//判断文件后缀
	var fileUrl=$("#generalizeLinkInfo").val();
	if(fileUrl && fileUrl != "" && (fileUrl.indexOf("xls")==-1 && fileUrl.indexOf("xlsx")==-1 && fileUrl.indexOf("csv")==-1) ){
		CMC.alertMessage("请选择excel文件。",'warn');
		return ;
	}
	
	var data={"generalizeLinkInfoFile":val};
	
	Generalizelink.fileUpload(data,Generalizelink.importUrl,"#generalizeLinkImportForm","generalizeLinkImport");
});
Generalizelink.fileUpload = function(data,url,formId,ind){

	CMC.confirm("是否确认导入文件?",function(r){
		if(r){
			 CMC.showProcessBox();
			CMC.fileUpload({
				url: url,
				type: "POST",
				dataType: "json",
				fileElementId:  "generalizeLinkInfoFile",
			    data: data,
			    asyc: true,
			    timeout: 600000,
			  	success: function(response){
			  		try{
				  		 CMC.hideProcessBox();
				  		CMC.alertMessage(response.messageBody, 'info',CMC.search());
		  			}catch(e){
			  		}
			  	},
			  	error: function(){
			  		try{
				  		CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
				  		 CMC.hideProcessBox();
			  		}catch(e){}
			  	},complete: function(){
			  		try{
			  			 CMC.hideProcessBox();
			  		}catch(e){}
			  	}
			});
		}
	});
};
