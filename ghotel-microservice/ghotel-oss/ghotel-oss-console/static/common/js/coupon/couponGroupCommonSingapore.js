/**
 * Created by yxin6 on 2017/2/22.
 */
var CouponGroupCommon = {
    menuId: "CouponGroup",
    searchTableRequired: false,
    getConfigSingaporeUrl:"authorized/couponGroupSingapore/pageConfig" ,
    addSingaporeUrl:"authorized/couponGroupSingapore/addSingapore" ,
    updateSingaporeUrl: "authorized/couponGroupSingapore/updateSingapore",
    getUrl: "authorized/couponGroupSingapore/get/",
    checkDaySingaporeUrl: "authorized/couponGroupSingapore/checkDay"
};
var accountSum;
var upFileFlag;
var issueFileFlag;
var exportKeyFlag;
var channelList;


window.onError = function(){
    console.log(e);
};



(function($){
	$('#addMailContent').searchbox({
	    searcher:function(){
//	    	var ue1 = UE.getEditor('editor1', {toolbars: [['bold','indent','italic','underline','strikethrough','subscript','superscript','source','pasteplain','selectall','horizontal','time','date','fontfamily','fontsize','paragraph','forecolor','backcolor','imagecenter','lineheight']]});
	    	var ue2 = UE.getEditor('editor2', {toolbars: [['bold','indent','italic','underline','strikethrough','subscript','superscript','source','pasteplain','selectall','horizontal','time','date','fontfamily','fontsize','paragraph','forecolor','backcolor','imagecenter','lineheight']]});
	    	if(firstVal==0){
                $("#addForm").form("reset");
            	UE.getEditor("editor2").setContent('');
            	firstVal = 1;
			}
	    	CMC.dialog('addMailContentDetail','open');
	    	$("#addForm").form("disableValidation");
	    },
//	    readonly:true,
	    prompt:'填写邮件内容'
	});
	
	CouponGroupCommon.addsubmitMailContent = function(){
		$("#activityDesc_create").val($("#addactivityDescs").textbox('getValue'));
		$("#useConditionDesc_create").val(UE.getEditor("editor2").getContentTxt());
		var activityDesc =  $("#activityDesc_create").val();
    	var useConditionDesc =  $("#useConditionDesc_create").val();
    	if(activityDesc=="" || activityDesc==null){
    		CMC.alertMessage("请填写活动简介。",'warn');
    		return ;
    	}
    	if(useConditionDesc=="" || useConditionDesc==null){
    		CMC.alertMessage("请填写优惠券使用规则。",'warn');
    		return ;
    	}
		$('#addMailContentDetail').dialog('close');
	}
	
	CouponGroupCommon.updatesubmitMailContent = function(){
		updateactivityDescs = $('#updateactivityDescs').textbox('getValue');
		updateuseConditionDesc = ue1.getContentTxt();
		$("#activityDesc_update").val(updateactivityDescs);
		$("#useConditionDesc_update").val(updateuseConditionDesc);
		var activityDesc =  $("#activityDesc_update").val();
    	var useConditionDesc =  $("#useConditionDesc_update").val();
    	if(activityDesc=="" || activityDesc==null){
    		CMC.alertMessage("请填写活动简介。",'warn');
    		return ;
    	}
    	if(useConditionDesc=="" || useConditionDesc==null){
    		CMC.alertMessage("请填写优惠券使用规则。",'warn');
    		return ;
    	}
		$('#updateMailContentDetail').dialog('close');
	}

	CouponGroupCommon.getDetail = function(formId, ind , groupId){
        $("#holdBtn_" + ind).show();
        $("#unlockBtn_" + ind).show();
        $("#disableBtn_" + ind).show();
        $("#updateBtn_" + ind ).show();
        CMC.request({
            url : CouponGroupCommon.getUrl + groupId,
            type : "GET",
            dataType : "json",
            async : false,
            success : function(response) {
                $(formId).form('clear');
                $(formId).find('.error').html('');
                $('#segmentInfo_' + ind).attr('readonly', false);
                $('#segmentType_fileBtn' + ind).show();
                var bean = response.messageBody;
                $('#groupCode_' + ind).textbox('setValue',bean['groupId']);
                $('#faceValue_' + ind).numberbox('setValue',bean['faceValue']);
                $('#discountType_' + ind).combobox('setValue',bean['couponType']);//discountType
                updateactivityDescs = bean['activityDesc'];
             	updateuseConditionDesc = bean['useConditionDesc'];
                if(bean['couponType'] !='1'){
                    $(formId ).find('#rateDiv').hide();
                }
                $('#rateId_' + ind).val(bean['rateId']);
                if(bean["flightStartTime"]){//usefulDateStart
                	$('#flightDateOne_' + ind).datebox('setValue',dateFormat(bean["flightStartTime"]));
                }
                if(bean['flightEndTime']){//usefulDateEnd
                	$('#flightDateTwo_' + ind).datebox('setValue',dateFormat(bean['flightEndTime']));
                }
                if(bean["usefulStartDate"]){//usefulDateStart
                	$('#usefulDateOne_' + ind).datebox('setValue',dateFormat(bean["usefulStartDate"]));
                }
                if(bean['usefulEndDate']){//usefulDateEnd
                	$('#usefulDateTwo_' + ind).datebox('setValue',dateFormat(bean['usefulEndDate']));
                }
                $('#segmentInfo_' + ind).val(bean['segmentInfo']);
                $('#segmentType_' + ind).combobox('setValue',bean['segmentType']+"");
                console.log(bean['timeZone']);
                if(bean['timeZone']){
                	var timeZones = bean['timeZone'].split(':');
                	$('#timeZone1_'+ ind).combobox('setValue',timeZones[0]);
                	$('#timeZone2_'+ ind).combobox('setValue',timeZones[1]);
                }
                $('#createChannel_' + ind).combobox('setValue',bean['channelId']);
                $('#codeCount_' + ind).numberbox('setValue',bean['counts']);
                $('#segPriceLimit_' + ind).numberbox('setValue',bean['segPriceLimit']);
                if(bean['remark']){
                    $('#activityDescribe_' + ind).textbox('setValue',bean['remark']);
                }
                $("#userestriction_" + ind).combobox('setValue',"1");
                if(bean['isStriction']){
                    $("#userestriction_" + ind).combobox('setValue',bean['isStriction']);
                	$("#userestriction_" + ind + "_Singapore").combobox('setValue',bean['isStriction']);
                }else{
                	$("#userestriction_" + ind).combobox('setValue',"1");
                }
                var status = bean['status'];
                $("#oldStatus_" + ind).val(bean['status']);
                $("#status_" + ind).combobox('setValue',status);
                if(status==2 ||status=='2'){
                	$("#unlockBtn_" + ind).hide();//解挂
                    $("#holdBtn_" + ind).show();//挂起
                    $("#disableBtn_" + ind).show;//废除
                    $("#updateBtn_" + ind ).show();//修改
                }else if(status == 3 || status=='3' || status == 4 || status=='4' || status == 6 || status=='6'){
                	$("#unlockBtn_" + ind).hide();//解挂
                    $("#holdBtn_" + ind).hide();//挂起
                    $("#disableBtn_" + ind).show();//废除
                    $("#updateBtn_" + ind ).hide();//修改
                }else if(status == 8 || status=='8' ){
                	$("#unlockBtn_" + ind).show();//解挂
                    $("#holdBtn_" + ind).hide();//挂起
                    $("#disableBtn_" + ind).hide();//废除
                    $("#updateBtn_" + ind ).hide();//修改
                }else {
                    $("#holdBtn_"+ind).hide();
                    $("#unlockBtn_" + ind).hide();
                    $("#disableBtn_" + ind).hide();
                    $("#updateBtn_" + ind ).hide();
                }
                if(bean['cabinType']){
                    $.each(bean['cabinType'].split(','),function(i,el1){
                        $(formId + " input[name='cabinType']").each(function(j,el2){
                            if($(el2).val()==el1){
                                $(el2).prop("checked", true).attr("checked", true)
                            }
                        });
                    });
                    if(bean['cabinType'].split(',').length == $(formId + " input[name='cabinType']").length ){
                        $("#cabinSelect_update").prop("checked", true).attr("checked", true);
                    }
                    
                }
                if(bean['usedChannel']){
	                $.each(bean['usedChannel'].split(','),function(i,el1){
	                    $(formId + " input[name='usedChannel']").each(function(j,el2){
	                        if($(el2).val()==el1){
	                            $(el2).prop("checked", true).attr("checked", true)
	                        }
	                    });
	                    if(bean['usedChannel'].split(',').length == $(formId + " input[name='usedChannel']").length ){
	                        $("#channelSelect_update").prop("checked", true).attr("checked", true);
	                    }
	
	                });
                }
                if(bean['flightTimeType']){
                    $.each(bean['flightTimeType'].split(','),function(i,el1){
                        $(formId + " input[name='flightTimeType']").each(function(j,el2){
                            if($(el2).val()==el1){
                                $(el2).prop("checked", true).attr("checked", true);
                            }
                        });

                    });

                }
                if(bean['createdType']){
                    $.each(bean['createdType'].split(','),function(i,el1){
                        $(formId + " input[name='createType']").each(function(j,el2){
                            if($(el2).val()==el1){
                                $(el2).prop("checked", true).attr("checked", true)
                            }
                        });

                    });
                }else{
                    $(formId + " input[name='createType']").each(function(j,el2){
                        if($(el2).val()=='1' || $(el2).val()==1){
                            $(el2).prop("checked", true).attr("checked", true)
                        }
                    });
                }
	            if(bean['online']){
	                $.each(bean['online'].split(','),function(i,el1){
	                    $(formId + " input[name='online']").each(function(j,el2){
	                        if($(el2).val()==el1){
	                            $(el2).prop("checked", true).attr("checked", true)
	                        }
	                    });
	
	                });
	            }
	            if(bean['isOnline']){
	                $.each(bean['isOnline'].split(','),function(i,el1){
	                    $(formId + " input[name='online']").each(function(j,el2){
	                        if($(el2).val()==el1){
	                            $(el2).prop("checked", true).attr("checked", true)
	                        }
	                    });
	
	                });
	            }
                if(bean['gatewayCode']){
                    $.each(bean['gatewayCode'].split(','),function(i,el1){
                        $(formId + " input[name='gatewaycheck']").each(function(j,el2){
                            if($(el2).val()==el1){
                                $(el2).prop("checked", true).attr("checked", true)
                            }
                        });

                    });
                }
                if(bean['gatewaycheck']){
                    if(bean['gatewaycheck'].split(',').length == $(formId + " input[name='gatewaycheck']").length ){
                        $("#gatewayselect_update").prop("checked", true).attr("checked", true)
                    }
                }
                $(formId + " #AESKEY").html(bean['aeskey']);
                $('#principal_' + ind).textbox('setValue',bean['principal']);
        	    $('#principalNo_' + ind).textbox('setValue',bean['principalNo']);
            }
        });

    }

    $("INPUT[name='createType']").click(function(){
        $(this).parent().find(".error").html("");
    });

    $("INPUT[name='online']").click(function(){
        $(this).parent().find(".error").html("");
    });
    $("#segmentType_fileBtn").click(function(){
        $('#segmentType_file_create').click();
    });

    $("#segmentInfo_create").bind('keyup',function(e){
        $("segmentType_file_create").val("");
    });
    $("#segmentInfo_update").bind('keyup',function(e){
        $("segmentType_file_update").val("");
    });

    $("#mobileCode").bind('keyup', function(){
        $("#mobileCode_file").val('');
        issueFileFlag="";
    });

    $("#IDCode").bind('keyup', function(){
        $("#IDCode_file").val('');
        issueFileFlag="";
    });


    $("#memberCode").bind('keyup', function(){
        $("#memberCode_file").val('');
        issueFileFlag="";
    });

    $("#emailCode").bind('keyup', function(){
        $("#emailCode_file").val('');
        issueFileFlag="";
    });

    $('#exportGroupId').bind('keyup', function(){
        exportKeyFlag = "";
        $('$groupId_file').val('');
    });


    $('#exportDiscountCode').bind('keyup', function(){
        exportKeyFlag = "";
        $('discountCode_file').val('');
    });

    $("INPUT[name='bindRadio']").bind("click", function(){
        $("#exportGroupId").val("");
        $("#exportDiscountCode").val("");
        exportKeyFlag = "";//变更后重置，防止文件变更未提交发放
    });

    $("#updateBtn_update").click(function(){
        //$('#rateId_update').val('');
        if(checkData('update','#updateCouponGroupSingaporeForm')){//如果是运价优惠卷,则不要使用checkAccount()
            var data = CouponGroupCommon.handleGroupData('#updateCouponGroupSingaporeForm','update');
            if(data==null || typeof data =='undefined'){
                return;
            }
            CouponGroupCommon.submitUpdateRequest(data,CouponGroupCommon.updateSingaporeUrl,'update');
        }
    });

    CouponGroupCommon.handleGroupData = function(formId,ind){
        //$.messager.progress();
        var isInternations = null;
        if($(formId + " #isInternations_" + ind)){
            isInternations = $(formId + " #isInternations_" + ind ).val();
        }
        var discountFlag = $("#discountType_"+ind).combobox('getValue');//优惠卷类型
        var groupId =  $("#groupCode_"+ind).textbox('getValue');
        var aeskey =null;
        if($('#AESKEY')){
            aeskey = $('#AESKEY').text();
        }
        var status  = 0 ;
        if($('#status_' + ind) && $('#status_' + ind)[0] ){
            status = $('#status_' + ind ).combobox('getValue');
        }
        var oldStatus = $('#oldStatus_' + ind ).val();
        var check = true;
        if(discountFlag != "1"&&ind=="create"){
            check = checkAccount(ind);
        }
        if(check){
            var faceValue = $.trim($("#faceValue_"+ind).numberbox('getValue'));
            var flightDateOne_ =$("#flightDateOne_"+ind).datebox('getValue');
            var flightDateTwo_ =$("#flightDateTwo_"+ind).datebox('getValue');
            var flightDateStr = flightDateOne_+"|"+flightDateTwo_;

            var usefulDateOne_ =$("#usefulDateOne_"+ind).datebox('getValue');
            var usefulDateTwo_ =$("#usefulDateTwo_"+ind).datebox('getValue');
            var usefulDateStr = usefulDateOne_+"|"+usefulDateTwo_;

            var segmentType = $("#segmentType_"+ind).combobox('getValue');
            var timeZone1 = $('#timeZone1_'+ ind).combobox('getValue');
            var timeZone2 = $('#timeZone2_'+ ind).combobox('getValue');
            var segmentInfo = $("#segmentInfo_"+ind).val();
            var cabinType = "";
            var online = $(formId + " INPUT[name='online']:checked").val();
            $(formId + " input[name='cabinType']:checked").each(function(i){
                if(i != $(formId + " input[name='cabinType']:checked").length -1){
                    cabinType += $(this).attr("value")+",";
                }else{
                    cabinType += $(this).attr("value");
                }
            });
            var segPriceLimit = $.trim($("#segPriceLimit_"+ind).numberbox('getValue'));
            //航班选择时间
            var flightTimeTypeStr = "";
            $(formId + " input[name='flightTimeType']:checked").each(function(i){
                if(i != $(formId + " input[name='flightTimeType']:checked").length -1){
                    flightTimeTypeStr += $(this).attr("value")+",";
                }else{
                    flightTimeTypeStr += $(this).attr("value");
                }
            });

            var createChannel = $("#createChannel_"+ind).combobox('getValue');
            var createType = $(formId + " INPUT[name='createType']:checked").val();
            var online = $(formId + " INPUT[name='online']:checked").val();
            var codeCount = $.trim($("#codeCount_"+ind).numberbox('getValue'));
            var activityDescribe = $.trim($("#activityDescribe_"+ind).textbox('getValue'));
            var gatewayStr = "";

            //后添加的值 =======
            var discountType = $("#discountType_"+ind).combobox('getValue');//优惠卷类型
            var rateId = $.trim($("#rateId_"+ind).val());//运价ID
            //使用渠道
            var usedChannelStr = "";
            $(formId + " input[name='usedChannel']:checked").each(function(i){
                if(i != $(formId + " input[name='usedChannel']:checked").length -1){
                    usedChannelStr += $(this).attr("value")+",";
                }else{
                    usedChannelStr += $(this).attr("value");
                }
            });
            var userestriction = $("#userestriction_"+ind).combobox('getValue');
            $(formId + " input[name='gatewaycheck']:checked").each(function(i,ele){
                gatewayStr += $(ele).val()+",";
            });
            gatewayStr = gatewayStr.substring(0, gatewayStr.length-1);
            var bindType = "input";
            if(segmentInfo && segmentInfo != ""&& segmentInfo.indexOf(".")>0  && (segmentInfo.indexOf("xls")==-1 && segmentInfo.indexOf("xlsx")==-1 && segmentInfo.indexOf("csv")==-1) ){

                CMC.alertMessage("请选择excel格式的文件。",'warn');
                return ;
            }
            //if(segmentInfo && segmentInfo != "" && segmentInfo.indexOf("csv")>0 ){
            if(segmentInfo && segmentInfo != "" && (segmentInfo.indexOf("xls")>0||segmentInfo.indexOf("xlsx")>0||segmentInfo.indexOf("csv")>0) ){
                bindType = "excel";
            }
            var approveUserId =  $(formId + " #aproveId").val();
            var activityDesc =  $("#activityDesc_"+ind).val();
         	var useConditionDesc =  $("#useConditionDesc_"+ind).val();
            var principal = $.trim($("#principal_"+ind).val());//责任人
            var principalNo = $.trim($("#principalNo_"+ind).val());//编号

            if(segmentType != "0"){
                var reg = null;
                if(segmentInfo.lastIndexOf(".")==-1){
                    reg =  /^[a-zA-Z]{3}(\-)[a-zA-Z]{3}((\;|\,|\/)[a-zA-Z]{3}(\-)[a-zA-Z]{3})*$/g;
                    if(segmentType!="1" && segmentType != "2"){
                        reg = /^[a-zA-Z]{3}((\;|\,|\/)[a-zA-Z]{3})*$/g;
                    }
                    if(!reg.test(segmentInfo)){
                        msg="请填写正确的航班限制范围！";
                        $("#segmentInfo_"+ind).parent().find(".error").html(msg);
                        return ;
                    }
                }else{
                    reg = /^.+\.(xls|xlsx|csv|XLS|XLSX|CSV){1}$/;
                    //reg = /^.+\.(csv|CSV){1}$/;
                    if(!reg.exec(segmentInfo)){
                        msg="请选择excel格式的文件！";
                        $("#segmentInfo_"+ind).parent().find(".error").html(msg);
                        return;
                    }
                }
            }
            
            return  {
                "isOnline":online,
                "online": online,
                "groupId": groupId,
                "aeskey" : aeskey,
                "status" : status,
                "oldStatus":oldStatus,
                "createType":createType,
                "faceValue":faceValue,
                "flightDateStr":flightDateStr,
                "bindType":bindType,
                "usefulDateStr":usefulDateStr,
                "segmentType":segmentType,
                "segmentInfo":encodeURI(segmentInfo),
                "cabinType":cabinType,
                "segPriceLimit":segPriceLimit,
                "createChannel":createChannel,
                "codeCount":codeCount,
                "activityDescribe":activityDescribe,
                "gatewayStr":gatewayStr,
                "flightTimeTypeStr":flightTimeTypeStr,
                "discountType":discountType,
                "rateId":rateId,
                "isInternations" : isInternations,
                "usedChannelStr":usedChannelStr,
                "userestriction":userestriction,
                "usefulDateStart":usefulDateStr.split("|")[0],
                "usefulDateEnd":usefulDateStr.split("|")[1],
                "approveUserId":approveUserId,
                "principal":principal,
                "principalNo":principalNo,
                "activityDesc":activityDesc,
                "timeZone" :timeZone1 + ":" + timeZone2, 
                "useConditionDesc":useConditionDesc
            };
        }
    }

    CouponGroupCommon.submitAddRequest = function(data,url,formId,ind,type){
    	var activityDesc =  $("#activityDesc_create").val();
    	var useConditionDesc =  $("#useConditionDesc_create").val();
    	if(activityDesc=="" || activityDesc==null || useConditionDesc=="" || useConditionDesc==null){
    		CMC.alertMessage("请填写邮件内容。",'warn');
    		return ;
    	}
        var approveUserId =  $("#createCouponGroupForm  #aproveId").val();
        if(!approveUserId){
            CMC.alertMessage("请选择审批人。",'warn');
            return ;
        }
        CMC.confirm("是否确认提交生成优惠劵审批?",function(r){
            if(r){
                CMC.showProcessBox();
                CMC.fileUpload({
                    url: url,
                    type: "POST",
                    dataType: "json",
                    fileElementId:  "segmentType_file_create",
                    data: data,
                    asyc: true,
                    timeout: 600000,
                    success: function(response){
                        try{
                            CMC.hideProcessBox();
                            //var groupId = response.messageBody;
                            //$('#groupCode_' + ind ).textbox('setValue',groupId);
                            //$("#addBtn_" + ind).hide();
                            CMC.alertMessage(response.messageBody, 'info');
                            CouponGroupCommon.intConfig(false,false,true,type);
                            //$("#createCouponGroupDialog_" + ind).dialog('close');
                        }catch(e){
                        	console.log(e.message);
                        }
                        //$("#addForm").form("reset");
                    	//UE.getEditor("editor2").setContent('');
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
    }

    CouponGroupCommon.submitUpdateRequest = function(data,url,formId,ind){
        CMC.confirm("是否更新优惠劵?",function(r){
            if(r){
                CMC.showProcessBox();
                CMC.fileUpload({
                    url: url,
                    type: "POST",
                    dataType: "json",
                    fileElementId:  "segmentType_file_update",
                    data: data,
                    asyc: true,
                    success: function(response){
                        try{
                            CMC.alertMessage("优惠券批次["+data["groupId"]+"]更新成功!", 'info');
                        	//CMC.search();
                            CMC.hideProcessBox();
                            var groupId = getvl("groupId");
              			    CouponGroupCommon.getDetail("#updateCouponGroupSingaporeForm",'update',groupId);
                        }catch(e){

                        }
                    },
                    error: function(){
                        CMC.hideProcessBox();
                        CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');

                    }
                });
            }
        });
    }

    CouponGroupCommon.init = function(scope){
        $("#discountType_update").combobox({
            data: [
                {id:'15',name:'新加坡自有资金优惠券'},
                {id:'16',name:'新加坡虚拟资金优惠券'}
                
            ],
            panelHeight: '120px',
            valueField:'id',
            textField:'name',
            panelHeight: '100px' ,
            readonly:true,
            onChange:discountTypeCheck
        });
        CouponGroupCommon.intConfig(true,true,true,scope);
    }

    CouponGroupCommon.intConfig = function(initChannel,initGateWay, initAccount,scope){

        var configUrl= CouponGroupCommon.getConfigSingaporeUrl;
        $("#payGatewayList_foreign").html("");
        CMC.request({
            url: configUrl ,
            method: 'GET',
            async: false,
            success: function(message){
                if(initChannel){
                    channelList = message.messageBody.channelList;

                    $('#createChannel_create').combobox({
                        data: channelList,
                        panelHeight: '120px',
                        valueField:'code',
                        textField:'code',
                        onSelect:function(record){
                            $("#showChannelName").show();
                            $("#showChannelName").html(record.name);
                        }
                    });

                    $("#createChannel_update").combobox({
                        data: channelList,
                        panelHeight: '120px',
                        valueField:'code',
                        textField:'code'
                    });


                }

                if(initGateWay){
                    var gatewayHtml = "";
                    if(message.messageBody.gatewayList){
                        $.each(message.messageBody.gatewayList, function(index, record){
                            var type = record["TYPE"];
                            if(type=="three")
                                type = "第三方支付";
                            else if(type=="install")
                                type = "分期支付";
                            else if(type=="YH")
                                type = "银行支付";
                            else if(type=="shortcut")
                                type = "快捷支付";
                            else if(type=="YDZF")
                                type = "移动支付";
                            else
                                type = "其他支付";
                            gatewayHtml += "<tr>";
                            gatewayHtml += "<td style='text-align: center;'><input onclick='checkBoxClick($(this))' name='gatewaycheck' type='checkbox' value='"+record["ID"]+"'/></td>";
                            gatewayHtml += "<td>"+type+"</td>";
                            gatewayHtml += "<td>"+record["NAME"]+"</td>";
                            gatewayHtml += "</tr>";
                        });
                    }
                    $("#gatewayTable").html(gatewayHtml);
                    $("#gatewayTable_update").html(gatewayHtml);
                    $("#gatewayTable_create_Singapore").html(gatewayHtml);
                    $("#gatewayTable_update_Singapore").html(gatewayHtml);
                }

                if(initAccount){
                    if(message.messageBody.virtualAccount){
                        var accountValue = message.messageBody.virtualAccount;
                        accountValue=accountValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                        $("#accountValue").text(accountValue);
                        $("#update_accountValue").text(accountValue);
                        $("#accountValue_Singapore").text(accountValue);
                        $("#update_accountValue_Singapore").text(accountValue);
                        accountValue=accountValue.replace(/[,]/g,"");
                        accountSum = parseInt(accountValue);
                        $("#update_accountValue").html(accountValue);
                    }else{
                        $("#accountValue").text("-");
                        return;
                    }
                }
            }
        });

    }

})(jQuery);

gatewaySelect = function(ele){
	  if($(ele).prop("checked")==true){
        $("input[name='gatewaycheck']").prop("checked",true);
        $(ele).parent().find('.error').html('');
    }else{
        $("input[name='gatewaycheck']").prop("checked",false);
        $(ele).parent().find('.error').html('请选择支付网关！');
    }
}

faceValueCheck = function(newv, oldv){
    var msg = "";
    var facevalue = $.trim(newv);
    if(facevalue != ""){
        if(!(/^[0-9]+$/g.test(facevalue))){
            msg = "面值应为整数！";
        }else{
        	if(facevalue.length>8){
                msg="输入的面值不能大于八位，请重新输入";
            }else if(facevalue.length<0){
                msg = "输入的面值不能小于一位，请重新输入";
            }else{
                msg = "";
            }
        }
    }else{
        msg = "请输入面值！";
    }
    $(this).parent().find(".error").html(msg);
}

segPriceLimitCheck = function(newv, oldv){
    var msg = "";
    var segPriceLimit = newv;
    if(segPriceLimit != ""){
        if(!(/^[0-9]+$/g.test(segPriceLimit))){
            msg = "请输入数字！";
        }else{
            msg = "";
        }
    }else{
        msg = "当票价低于金额时，不予许使用优惠券！";
    }
    $(this).parent().find(".error").html(msg);
}
codeCountCheck = function(newv, oldv){
    var msg = "";
    var codeCount = $.trim(newv);
    if(codeCount != ""){
        if(!(/^[0-9]+$/g.test(codeCount))){
            msg = "请输入数字！";
        }else if(codeCount == "0"){
            msg = "生成数量不能为0！";
        }else{
            msg = "";
        }

    }else{
        msg = "请输入生成数量！";
    }
    $(this).parent().find(".error").html(msg);
}
createChannelCheck = function(newv, oldv){
    var msg = "";
    if(newv == ""){
        msg = "请选择发放渠道！";
    }
    if(newv){
    	var name = "";
    	for(var i =0 ; channelList && i < channelList.length; i++){
            if(newv ==  channelList[i]["code"]){
            	name = channelList[i]["name"];
            	break;
            }
        }
    	 $("#channelName").html(name);
    }
   
    $(this).parent().find(".error").html(msg);
}

segmentTypeCheck  = function(newv, oldv){

    var msg = "";
    var type = newv;
    var val = this[0].form['segmentInfo'].value;
    upFileFlag = "";
    if(type != "0"){
        var reg = null;
        if(val.lastIndexOf(".")==-1){
            reg =  /^[a-zA-Z]{3}(\-)[a-zA-Z]{3}((\;|\,|\/)[a-zA-Z]{3}(\-)[a-zA-Z]{3})*$/g;
            if(type!="1" && type != "2"){
                reg = /^[a-zA-Z]{3}((\;|\,|\/)[a-zA-Z]{3})*$/g;
            }
            if(!reg.test(val)){
                msg="请填写正确的航班限制范围！";
            }
        }else{
            reg = /^.+\.(xls|xlsx|csv|XLS|XLSX|CSV){1}$/;
            //reg = /^.+\.(csv|CSV){1}$/;
            if(!reg.exec(val)){
                msg="请选择excel格式的文件！";
            }
        }
    }else{
        $("#segmentInfo_create").val('');
    }
    $(this).parent().find(".error").html(msg);
}

userestrictionCheck = function(newv, oldv){
	var msg = "";
    var typeValue = newv;
    $(this).parent().find(".error").html("");
    $(this).parent().find("#rateDiv").hide();
    $(this).parent().find("input[name='rateId']").val('');
    if(typeValue == ""){
        msg = "请选择绑定会员号限制！";
        $(this).parent().find(".error").html(msg);
    }
}

segmentInfoCheck = function(ele){
    var msg = "";
    var type = ele.form['segmentType'].value;
    var val = $.trim(ele.value);
    var reg = null;
    if(val.lastIndexOf(".")==-1){
        reg = /^[a-zA-Z]{3}(\-)[a-zA-Z]{3}((\;|\,|\/)[a-zA-Z]{3}(\-)[a-zA-Z]{3})*$/g;
        if(type!="1" && type!="2"){
            reg = /^[a-zA-Z]{3}((\;|\,|\/)[a-zA-Z]{3})*$/g;
        }
        if(!reg.test(val)){
            msg="请填写正确的航班限制范围！";
        }else{
            msg = "";
        }
    }else{
        reg = /^.+\.(xls|xlsx|csv|XLS|XLSX|CSV){1}$/;
        //reg = /^.+\.(csv|CSV){1}$/;
        if(!reg.exec(val)){
            msg="请选择excel格式的文件！";
        }else{
            msg = "";
        }
    }
    $(ele).parent().find(".error").html(msg);
}


//后添加事件 =======
discountTypeCheck = function(newv, oldv){
    var msg = "";
    var typeValue = newv;
    $(this).parent().find(".error").html("");
    $(this).parent().find("#rateDiv").hide();
    $(this).parent().find("input[name='rateId']").val('');
    if(typeValue == ""){
        msg = "请选择优惠卷类型!";
        $(this).parent().find(".error").html(msg);
    }else if( typeValue == "1"){
        $(this).parent().find(".error").html("");
        $(this).parent().find("#rateDiv").show();
    }
}

rateIdCheck = function(newv, oldv){
    var rateL = $.trim(newv).length;
    if(rateL==0){
        $(this).parent().children(".error").html("请输入运价ID!");
    }else if(rateL<3||rateL>50){
        $(this).parent().children(".error").html("请输入3到50位的字符!");
    }else{
        $(this).parent().children(".error").html("");
    }
}


function checkLen(newv, oldv) {
    var maxChars = 500;//最多字符数
    var rnum=0;
    var cnum=0;
    var curr=0;
    var a = newv.split("");

    for (var i = 0; i < a.length; i++) {
        if (a[i].charCodeAt(0) < 299) {
            cnum++;
        } else {
            rnum++;
        }
        if (rnum * 2 + cnum > 500) {
            if (a[i].charCodeAt(0) < 299) {
                cnum--;
            } else {
                rnum--;
            }
            newv = newv.substring(0, cnum + rnum);
            break;
        }
    }

    var b = newv.split("");
    for (var j = 0; j < b.length; j++) {
        if (b[j].charCodeAt(0) < 299) {
            curr++;
        } else {
            curr += 2;
        }
    }
    curr = maxChars - curr;
    $(this).parent().find("#count").html(curr.toString());
}

principalCheck = function(newv, oldv){
    var principalL = $.trim(newv).length;
    if(principalL==0){
        $(this).parent().children(".error").html("请输入责任人!");
    }else if(principalL<1||principalL>20){
        $(this).parent().children(".error").html("请输入1到20位的字符!");
    }else{
        $(this).parent().children(".error").html("");
    }
}

principalNoCheck = function(newv, oldv){
    var principalNoL = $.trim(newv).length;
    if(principalNoL==0){
        $(this).parent().children(".error").html("请输入编号!");
    }else if(principalNoL<1||principalNoL>20){
        $(this).parent().children(".error").html("请输入1到20位的字符!");
    }else{
        $(this).parent().children(".error").html("");
    }
}

function checkBoxClick($this){
    if($this.attr("checked")){
        $this.attr("checked", false);
    }else{
        $this.attr("checked", true);
    }
    var gatewayFlag = false;
    $("input[name='gatewaycheck']").each(function(){
        if($(this).attr("checked")){
            gatewayFlag = true;
        }
    });
    if(gatewayFlag){
        $("#payGatewayList_create").parent().children(".error").html("");
    }else{
    	$("#payGatewayList_create").parent().children(".error").html("请选择支付网关！");
    }
}

function checkAccount(ind){

    if(accountSum == 0){
        alert("当前账户余额为0！");
        return false;
    }else{
        var faceValue = parseInt($.trim($("#faceValue_"+ind).numberbox('getValue')));
        var codeCount = parseInt($.trim($("#codeCount_"+ind).numberbox('getValue')));
        var costSum = faceValue * codeCount;
        if(accountSum < costSum){
            alert("生成优惠劵需花费"+costSum+",余额不足！");
            return false;
        }else{
            return true;
        }

    }
}

function checkData(ind,formId){
    if($("#faceValue_"+ind).numberbox('getValue')==""){
        $("#faceValue_"+ind).parent().children(".error").html("请输入面值！");
    }else{
        $("#faceValue_"+ind).parent().children(".error").html("");
    }
    //后添加校验=====
    if($("#discountType_"+ind).combobox('getValue')==""){
        $("#discountType_"+ind).parent().children(".error").html("请选择优惠卷类型！");
    }else{
        $("#discountType_"+ind).parent().children(".error").html("");
    }
    if($("#discountType_"+ind).combobox('getValue')=="1"&&$.trim($("#rateId_"+ind).val())==""){
        $("#rateId_"+ind).parent().children(".error").html("请输入运价ID!");
    }else{
        $("#rateId_"+ind).parent().children(".error").html("");
    }
    if($(formId + " input[name='usedChannel']:checked").length==0){
        $("#usedChannel_"+ind+":first").parent().parent().children(".error").html("请选择使用渠道!");
    }else{
        $("#usedChannel_"+ind+":first").parent().parent().children(".error").html("");
    }

    if($("#flightDateOne_"+ind).datebox('getValue')==""||$("#flightDateTwo_"+ind).datebox('getValue')==""){
        $("#flightDateTwo_"+ind).parent().children(".error").html("请输入航班有限期！");
    }else{
        $("#flightDateTwo_"+ind).parent().children(".error").html("");
    }
    if($("#usefulDateOne_"+ind).datebox('getValue')==""||$("#usefulDateTwo_"+ind).datebox('getValue')==""){
        $("#usefulDateTwo_"+ind).parent().children(".error").html("请输入使用有限期！");
    }else{
        $("#usefulDateTwo_"+ind).parent().children(".error").html("");
    }

    if($("#segmentType_"+ind).combobox('getValue')!="0"){
        if($("#segmentInfo_"+ind).val()!=""){
            //if($("#segmentInfo_"+ind).val().indexOf(".")>-1){
            //		if(upFileFlag==""){
            //			$("#segmentType_"+ind).parent().children(".error").html("请先上传文件！");
            //		}else{
            //			$("#segmentType_"+ind).parent().children(".error").html("");
            //		}
            //	}
            $("#segmentType_"+ind).parent().children(".error").html("");
        }else{
            $("#segmentType_"+ind).parent().children(".error").html("请填写或上传航班限制范围！");
        }
    }else{
        $("#segmentType_"+ind).parent().children(".error").html("");

    }
    if($(formId+ " input[name='cabinType']:checked").length==0){
        $("#cabinType_"+ind+":first").parent().parent().children(".error").html("请选择舱位限制!");
    }else{
        $("#cabinType_"+ind+":first").parent().parent().children(".error").html("");
    }
    if($("#createChannel_"+ind).combobox('getValue')=="" ){
        $("#createChannel_"+ind).parent().children(".error").html("请选择发放渠道！");
    }else{
        $("#createChannel_"+ind).parent().children(".error").html("");
    }
    if($(formId + " input[name='flightTimeType']:checked").length==0){
        $(formId + " input[name='flightTimeType']:first").parent().children(".error").html("请选择航班时间！");
    }else{
        $(formId + " input[name='flightTimeType']:first").parent().children(".error").html("");
    }
    if($("#codeCount_"+ind).numberbox('getValue')==""){
        $("#codeCount_"+ind).parent().children(".error").html("请输入生成数量！");
    }else{
        $("#codeCount_"+ind).parent().children(".error").html("");
    }
    if($("#segPriceLimit_"+ind).numberbox('getValue')==""){
        $("#segPriceLimit_"+ind).parent().children(".error").html("请输入票价限制！");
    }else{
        $("#segPriceLimit_"+ind).parent().children(".error").html("");
    }
    if($("#timeZone1_"+ind).numberbox('getValue')==""){
        $("#timeZone1_"+ind).parent().children(".error").html("请选择时区！");
    }else{
        $("#timeZone1_"+ind).parent().children(".error").html("");
    }
    if($("#timeZone2_"+ind).numberbox('getValue')==""){
        $("#timeZone2_"+ind).parent().children(".error").html("请选择时区！");
    }else{
        $("#timeZone2_"+ind).parent().children(".error").html("");
    }
    var gatewayFlag = false;
    $(formId + " input[name='gatewaycheck']").each(function(index,ele){
        if($(ele).prop("checked")){
            gatewayFlag = true;
            
        }
    });
    if(!gatewayFlag){
        $("#payGatewayList_"+ind).parent().children(".error").html("请选择支付网关！");
    }else{
        $("#payGatewayList_"+ind).parent().children(".error").html("");
    }
    var createTypeFlag = false;
    if($(formId + " INPUT[name='createType']:checked").val()){
        createTypeFlag = true;
    }
    if(!createTypeFlag){
        $(formId + " input[name='createType']").parent().children(".error").html("请选择是否加密！");
    }else{
        $(formId + " input[name='createType']").parent().children(".error").html("");
    }
     createTypeFlag = false;
    if($(formId + " INPUT[name='online']:checked").val()){
        createTypeFlag = true;
    }
    if(!createTypeFlag){
        $(formId + " input[name='online']").parent().children(".error").html("请选择是否线上活动！");
    }else{
        $(formId + " input[name='online']").parent().children(".error").html("");
    }
    if($.trim($("#principal_"+ind).val())==""){
        $("#principal_"+ind).parent().children(".error").html("请输入责任人!");
    }else{
        $("#principal_"+ind).parent().children(".error").html("");
    }
    if($.trim($("#principalNo_"+ind).val())==""){
        $("#principalNo_"+ind).parent().children(".error").html("请输入编号!");
    }else{
        $("#principalNo_"+ind).parent().children(".error").html("");
    }

    var checkFlag = true;
    $(formId ).find(".error").each(function(){
        if($(this).text()!=""){
            checkFlag = false;
            return;
        }
    });
    
    $("input.validatebox-text").each(function(i,dom){
		$(this).validatebox('enableValidation');
		$(this).validatebox('validate');
	});
	
	if(!$(formId).form('validate')){
		checkFlag = false;
	}
    return (checkFlag&&gatewayFlag&&createTypeFlag);
}


//status处理
function statusmanage(formId,str,ind){
    var whatStatus = str;
    var oldStatus= $("#oldStatus_"+ind).val();
    /*$("#oldStatus_"+ind).val(oldStatus);*/
    $("#status_"+ind).combobox('setValue',whatStatus);
    var url =  CouponGroupCommon.updateSingaporeUrl;
    if(checkData(ind,"#"+formId)){//如果是运价优惠卷,则不要使用checkAccount()

        var data = CouponGroupCommon.handleGroupData('#'+ formId,ind);
        if(data==null || typeof data =='undefined'){
            return;
        }
        CouponGroupCommon.submitUpdateRequest(data,url,formId,ind);
    }
}


function modify(){
    document.getElementById('select').style.display='block';
    document.getElementById('update').style.display='none';
    quickAllQeuryCode(gtype);

}

//***---判断






/*-----------------------------实验
 *
 *
 */


/*--*/
function isdate(str){
    var myReg=new RegExp("^\\d{4}(\\-\\d{2})(\\-\\d{2})?$");
    if(myReg.test(str)){
        var year=str.substring(0,4);
        if(year%4==0){
            febdays=29;
        }else{
            febdays=28;
        }
        switch(str.substring(5,7)){
            case "01":days=31;break;
            case "02":days=febdays;break;
            case "03":days=31;break;
            case "04":days=30;break;
            case "05":days=31;break;
            case "06":days=30;break;
            case "07":days=31;break;
            case "08":days=31;break;
            case "09":days=30;break;
            case "10":days=31;break;
            case "11":days=30;break;
            case "12":days=31;break;
        }
        if(str.substring(5,7)*1>12 || str.substring(5,7)*1<1 || str.substring(8,10)*1>days || str.substring(8,10)*1<1){
            return false;
        }else{
            return true;
        }
    }else{
        return false;
    }
}

function transdated(object){
    var datestr=object.value;
    if(datestr!=""){
        var c=datestr.indexOf("/");
        if(c!=-1){
            var re = /\//g;
            datestr = datestr.replace(re, "-");
        }
        var dates=datestr.split("-");
        var d=datestr.indexOf(".");
        if(d!=-1){
            var re = /\./g;
            datestr = datestr.replace(re, "-");
        }
        var dates=datestr.split("-");
        if(dates.length==3){
            if(dates[1].length==1) dates[1]="0"+dates[1];
            if(dates[2].length==1) dates[2]="0"+dates[2];
            datestr=dates[0]+"-"+dates[1]+"-"+dates[2];
        }
        if(isdate(datestr)){
            object.value=datestr;
            return true;
        }else{
            alert("输入的日期格式错误，请检查重新输入");
            if(object.id=="ticketSTime" || object.id == "flightSTime"){
                var today=new Date();
                var month="";
                var day="";

                //设成上一个月最后一天
                today.setDate(0);

                if(today.getMonth()<9)
                    month="0"+(today.getMonth()+1);
                else
                    month=today.getMonth()+1;
                if(today.getDate()<10)
                    day="0"+today.getDate();
                else
                    day=today.getDate();
                object.value=today.getFullYear()+"-"+month+"-01";
            }else{
                var today=new Date();
                var month="";
                var day="";

                //设成上一个月最后一天
                today.setDate(0);

                if(today.getMonth()<9)
                    month="0"+(today.getMonth()+1);
                else
                    month=today.getMonth()+1;
                if(today.getDate()<10)
                    day="0"+today.getDate();
                else
                    day=today.getDate();
                object.value=today.getFullYear()+"-"+month+"-"+day;
            }

            return false;
        }
    }
    return true;
}


function checkDated(startDate , endDate){
    var re = /-/g;
    var ticketSDate = startDate.value;
    var ticketEDate = endDate.value;
    if(ticketSDate != "" && ticketEDate != ""){
        ticketSDate = new Date(ticketSDate.replace(re, "/"));
        ticketEDate = new Date(ticketEDate.replace(re, "/"));
        //alert(ticketSDate+" "+ticketEDate);
        if(ticketSDate > ticketEDate){
            return false;
        }
    }
    return true;
}

//
function checkifnumber(str){
    var fvalue = str.value;
    if(!isNaN(fvalue))
    {
        if(fvalue<9999999&&fvalue>0)
        {
             return true;
        }
    }
    return false;
}

function checkifsegpr(str){
    var fvalue = str.value;
    if(!isNaN(fvalue))
    {
        if(fvalue<=100&&fvalue>0)
        {
            if(fvalue%1==0)
                return true;
        }
    }
    return false;

}

function cabinTypeSelect(ele){
    if($(ele).prop("checked")==true){
        $(ele.form).find("input[name='cabinType']").prop("checked",true);
        $(ele).parent().find('.error').html('');
    }else{
        $(ele.form).find("input[name='cabinType']").prop("checked",false);
        $(ele).parent().find('.error').html('请选择舱位限制!');
    }
}

$("input[name='cabinType']").click(function(){
	if($(this.form).find("input[name='cabinType']:checked").length==0){
		 $(this).parent().parent().find('.error').html('请选择舱位限制!');
	}else{
		 $(this).parent().parent().find('.error').html('');
	}
});


function usedChannelSelect(ele){
    if($(ele).prop("checked")==true){
        $(ele.form).find("input[name='usedChannel']").prop("checked",true);
        $(ele).parent().find('.error').html('');
    }else{
        $(ele.form).find("input[name='usedChannel']").prop("checked",false);
        $(ele).parent().find('.error').html('请选择使用渠道!');
    }
}

$("input[name='usedChannel']").click(function(){
	if($(this.form).find("input[name='usedChannel']:checked").length==0){
		 $(this).parent().parent().find('.error').html('请选择使用渠道!');
	}else{
		 $(this).parent().parent().find('.error').html('');
	}
});

function endDateChange(n,o){

	var today = new Date().Format('yyyy-MM-dd');
    var todayTime = Date.parse(today);
    var endDate = null ;
    try{
        endDate = Date.parse(n);
    }catch(e){
        console.log(e.message);
    }
    if(!endDate){
        $(this).parent().find('.error').html('开始或结束日期格式不对！');
        return;
    }else{
        $(this).parent().find('.error').html('');
    }

    if(endDate < todayTime){
        $(this).parent().find('.error').html('结束日期不能少于当前日期！');
        return;
    }else{
        $(this).parent().find('.error').html('');
    }

    var startDateEle = $(this).parent().find('.easyui-datebox')[0];
    var startDateId = $(startDateEle).attr('id');
    var startDate = $("#"+startDateId).datebox('getValue');
    var startDateTime = null;
    try{
        startDateTime = Date.parse(startDate);
    }catch(e){
        console.log(e.message);
    }
    if(startDateTime && startDateTime< todayTime){
        $(this).parent().find('.error').html('开始日期不能少于当前日期！');
        return;
    }
    if(startDateTime  && startDateTime > endDate ){
        $(this).parent().find('.error').html('开始不能大于结束日期！');
        return
    }else{
        $(this).parent().find('.error').html('');
    }
}
function addSingapore() {
    if(checkData('create','#createCouponGroupForm')){//如果是运价优惠卷,则不要使用checkAccount()
        var data = CouponGroupCommon.handleGroupData('#createCouponGroupForm','create');

        if(data==null || typeof data =='undefined'){
            return;
        }
        CouponGroupCommon.submitAddRequest(data,CouponGroupCommon.addSingaporeUrl,'#createCouponGroupForm','create','Singapore');

    }
};

function startDateChange(n,o){
    var today = new Date().Format('yyyy-MM-dd');
    var todayTime = Date.parse(today);
    var startDate = null ;
    try{
        startDate = Date.parse(n);
    }catch(e){
        console.log(e.message);
    }
    if(!startDate){
        $(this).parent().find('.error').html('开始或结束日期格式不对！');
        return;
    }else{
        $(this).parent().find('.error').html('');
    }
    if(startDate < todayTime){
        $(this).parent().find('.error').html('开始日期不能少于当前日期！');
        return;
    }else{
        $(this).parent().find('.error').html('');
    }
    var endDateEle = $(this).parent().find('.easyui-datebox')[1];
    var endDateId = $(endDateEle).attr('id');
    var endDate = $("#"+endDateId).datebox('getValue');
    var endDateTime = null;
    try{
        endDateTime = Date.parse(endDate);
    }catch(e){
        console.log(e.message);
    }
    if(endDateTime  && endDateTime< todayTime){
        $(this).parent().find('.error').html('结束日期不能少于当前日期！');
        return;
    }
    if(endDateTime  && startDate > endDateTime ){
        $(this).parent().find('.error').html('开始日期不能大于结束日期！');
        return
    }else{
        $(this).parent().find('.error').html('');
    }
}
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

var ue1;
function openMailContentDetail(){
	if(updateuseConditionDesc==null || updateuseConditionDesc=="" || updateuseConditionDesc==undefined){
		updateuseConditionDesc= $('#useConditionDesc_update').val();
	}
	if(updateactivityDescs==null || updateactivityDescs=="" || updateactivityDescs==undefined){
		updateactivityDescs= $('#activityDesc_update').val();
	}
	ue1 = UE.getEditor('editor1', {toolbars: [['bold','indent','italic','underline','strikethrough','subscript','superscript','source','pasteplain','selectall','horizontal','time','date','fontfamily','fontsize','paragraph','forecolor','backcolor','imagecenter','lineheight']]});
	ue1.ready(function() {
		// editor准备好之后才可以使用
		ue1.setContent(updateuseConditionDesc);
		//ue1.execCommand('inserthtml',updateuseConditionDesc);

	});
	$('#updateactivityDescs').textbox('setValue',updateactivityDescs);
	CMC.dialog('updateMailContentDetail','open');
	$("#updateForm").form("disableValidation");
}
