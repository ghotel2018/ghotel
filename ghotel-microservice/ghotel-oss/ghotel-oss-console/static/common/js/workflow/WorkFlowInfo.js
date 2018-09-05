function AproveEdit100003Info(value){
	var jsonStr=value['applyParameter'];
	var typeKey=value['typeKey'];
	var jsonObj = JSON.parse(jsonStr);
	$("#addI18nDeptAudit").dialog({
		title: '优惠劵账户充值信息',
        collapsible: true,
        minimizable: false, 
        maximizable: false,
        resizable: false,
        modal:true,
        width: 400,
        height: 300,
        href: '/cmc/module/workflow/couponGroup/virtualAccountAddInfo.html',
        onLoad: function () {
        	if(typeKey=="100008"){
        		$(".currency").each(function(i){ 
    	    		$(this).text("KRW"); 
    	    	}); 
        	}else if(typeKey=="100003"||typeKey=="100004"){
        		$(".currency").each(function(i){ 
    	    		$(this).text("元"); 
    	    	}); 
        	}else if(typeKey=="100014"){
        		$(".currency").each(function(i){ 
    	    		$(this).text("NZD"); 
    	    	}); 
        	}else if(typeKey=="100017"){
        		$(".currency").each(function(i){ 
    	    		$(this).text("SGD"); 
    	    	}); 
        	}else if(typeKey=="100020"){
        		$(".currency").each(function(i){ 
    	    		$(this).text("GBP"); 
    	    	}); 
        	}else if(typeKey=="100023"){
        		$(".currency").each(function(i){ 
    	    		$(this).text("CNY"); 
    	    	}); 
        	}else if(typeKey=="100026"){
        		$(".currency").each(function(i){ 
    	    		$(this).text("CNY"); 
    	    	}); 
        	}
        	$("#addI18nDeptAudit #applyName").textbox('setValue',jsonObj.operateName);
        	$("#addI18nDeptAudit #valueNum").textbox('setValue',jsonObj.operateValue);
        	$("#addI18nDeptAudit #remark").textbox('setValue',jsonObj.remark);
        	addAccountValue($("#addI18nDeptAudit  #addAccountValue"),typeKey);
        },
        buttons:[
	        { 
				text:'关闭', 
				iconCls:'icon-clear', 
				left:50,
				handler:function(){ 
					CMC.dialog("addI18nDeptAudit", "close");
			}}
        ]
    });
}

function Aprove100001Info(value){
	var jsonStr=value['applyParameter'];
	var jsonObj = JSON.parse(jsonStr);
	var htmlUrl = "/cmc/module/coupon/couponGroupUpdateForm.html";
	if(jsonObj.isInternations==3){
		htmlUrl= "/cmc/module/coupon/couponGroupUpdateAUSForm.html";
	}else if(jsonObj.isInternations==5){
		htmlUrl= "/cmc/module/coupon/couponGroupUpdateSingaporeForm.html";
		
	}
	$("#addI18nDeptAudit").dialog({
		title: '优惠劵生成信息',
        collapsible: true,
        minimizable: false, 
        maximizable: false,
        resizable: false,
        modal:true,
        width: 850,
        height: 700,
        href: htmlUrl,
        onLoad: function () {
        	//debugger;
        	if(jsonObj.isInternations==1){
        		 $("#restrict2").show();
				  $("#restrict1").hide();
        	}else{
        		 $("#restrict2").hide();
				  $("#restrict1").show();
        	}
			$("#updateCouponGroupForm #status_tralb").hide();
			var url="authorized/couponGroup/pageConfig";
			$("#updateCouponGroupForm").form('clear');
			if(value.businessKey){
				//alert(value.businessKey);

				$('#groupCode_update').textbox('setValue',value.businessKey);
			}
			if(jsonObj.isInternations==1){
				url= "authorized/couponGroupI18n/pageConfig";
			}else if(jsonObj.isInternations==2){
				$("#updateCouponGroupForm .currency").each(function(i){ 
		    		$(this).text("KRW"); 
		    	}); 
				url= "authorized/couponGroupKorea/pageConfig";
			}else if(jsonObj.isInternations==3){
				url= "authorized/couponGroupAUS/pageConfig";
				$("#updateCouponGroupForm .currency").each(function(i){ 
		    		$(this).text("AUD"); 
		    	}); 
	            $("#payGatewayList_foreign").html("");

	            updateactivityDescs = jsonObj['activityDesc'];
	            updateuseConditionDesc = jsonObj['useConditionDesc'];
			}else if(jsonObj.isInternations==5){
				url= "authorized/couponGroupSingapore/pageConfig";
				$("#updateCouponGroupForm .currency").each(function(i){ 
		    		$(this).text("SGD"); 
		    	}); 
	            $("#payGatewayList_foreign").html("");

	            updateactivityDescs = jsonObj['activityDesc'];
	            updateuseConditionDesc = jsonObj['useConditionDesc'];
			}

        	
        		//getConfigUrl: "authorized/couponGroup/pageConfig" , 
        		CMC.request({
        			url: url,
        			method: 'GET',
        			success: function(message){//virtualAccount
        				counpountInfo("#updateCouponGroupForm",jsonObj,'update');
        				//gatewayList
        				var channelName="";
    					 var channelList = message.messageBody.channelList;
    					 var virtualAccount = message.messageBody.virtualAccount;
    					    for(var i =0 ; channelList && i < channelList.length; i++){
    					    	if(jsonObj['createChannel']==(channelList[i]["code"]+"")){
    					    		channelName=channelList[i]["name"];
    					    	};
    					    	
    					    }
    					  $("#updateCouponGroupForm #discountType_update").combobox({
    				            data: [
    				                {id:'0',name:'国内收入现金优惠券'},
    				                {id:'1',name:'国内运价优惠券'},
    				                {id:'2',name:'国内费用现金优惠券'},
    				                /*{id:'3',name:'国际营销活动优惠券'},
    				                {id:'4',name:'国际合作活动优惠券'},*/
    				                {id:'3',name:'国际虚拟资金优惠券'},
    				                {id:'4',name:'国际自有资金优惠券'},
    				                {id:'5',name:'国内里程优惠券'},
    				                {id:'6',name:'国内旅客服务优惠券'},
    				                /*{id:'7',name:'国际里程优惠券'},
    				                {id:'8',name:'国际旅客服务优惠券'},*/
    				                {id:'9',name:'韩国自有资金优惠券'},
    								{id:'10',name:'韩国虚拟资金优惠券'},
    								{id:'11',name:'澳洲自有资金优惠券'},
    				                {id:'12',name:'澳洲虚拟资金优惠券'},
    				                {id:'13',name:'新西兰自有资金优惠券'},
    				                {id:'14',name:'新西兰虚拟资金优惠券'},
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
    					 
    					$('#discountType_update').combobox('setValue',jsonObj['discountType']);
    					$("#updateCouponGroupForm #channelName").text(channelName);
    					$("#updateCouponGroupForm #update_accountValue").text(virtualAccount);
    					if(jsonObj.isInternations==3){
        					$("#updateCouponGroupForm #update_accountUnit").text("AUD");
        					$("#updateCouponGroupForm #update_faceValueUnit").text("AUD");
    					}else if(jsonObj.isInternations==3){
        					$("#updateCouponGroupForm #update_accountUnit").text("SGD");
        					$("#updateCouponGroupForm #update_faceValueUnit").text("SGD");
    					}
    					$("#updateCouponGroupForm #channelId").combobox({
    						data: channelList,
    						panelHeight: '120px',
    						valueField:'code',
    						textField:'name' 
    					});
    					 if(message.messageBody.gatewayList){
    						    var gatewayHtml ="";
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
    	                        $("#updateCouponGroupForm #gatewayTable_update").html(gatewayHtml);
    	                        if(jsonObj['gatewayStr']){
    	                	        if(jsonObj['gatewayStr'].split(',').length == $("#updateCouponGroupForm input[name='gatewaycheck']").length ){
    	                	            $("#gatewayselect_update").prop("checked", true).attr("checked", true)
    	                	        }
    	                	    }
    	                        if(jsonObj['gatewayStr']){
    	                            $.each(jsonObj['gatewayStr'].split(','),function(i,el1){
    	                                $("#updateCouponGroupForm input[name='gatewaycheck']").each(function(j,el2){
    	                                    if($(el2).val()==el1){
    	                                        $(el2).prop("checked", true).attr("checked", true)
    	                                    }
    	                                });

    	                            });
    	                        }
    	                    }
        			 }
        		});
        	//counpountInfo(formId,jsonObj,ind)
        	//addAccountValue($("#updateCouponGroupForm  #update_accountValue"),value['typeKey']);
        },
        buttons:[
	        { 
				text:'关闭', 
				iconCls:'icon-clear', 
				left:50,
				handler:function(){ 
					CMC.dialog("addI18nDeptAudit", "close");
			}}
        ]
    });
}
function Aprove100010Info(value){
	var jsonStr=value['applyParameter'];
	var jsonObj = JSON.parse(jsonStr);
	var htmlUrl = "/cmc/module/coupon/couponGroupUpdateAUSForm.html";
	$("#addI18nDeptAudit").dialog({
		title: '澳洲优惠劵生成信息',
        collapsible: true,
        minimizable: false, 
        maximizable: false,
        resizable: false,
        modal:true,
        width: 850,
        height: 700,
        href: htmlUrl,
        onLoad: function () {
			$("#updateCouponGroupAUSForm #status_tralb").hide();
			$("#updateCouponGroupAUSForm").form('clear');
			if(value.businessKey){
				$('#updateCouponGroupAUSForm #groupCode_update').textbox('setValue',value.businessKey);
			}
			var url= "authorized/couponGroupAUS/pageConfig";
			$("#updateCouponGroupAUSForm .currency").each(function(i){ 
	    		$(this).text("AUD"); 
	    	}); 
            $("#payGatewayList_foreign").html("");

            updateactivityDescs = jsonObj['activityDesc'];
            updateuseConditionDesc = jsonObj['useConditionDesc'];
    		CMC.request({
    			url: url,
    			method: 'GET',
    			success: function(message){//virtualAccount
    				counpountInfo("#updateCouponGroupAUSForm",jsonObj,'update');

    	            $("#addI18nDeptAudit #holdBtn_update").hide();
    	            $("#addI18nDeptAudit #unlockBtn_update").hide();
    	            $("#addI18nDeptAudit #disableBtn_update").hide();
    	            $("#addI18nDeptAudit #updateBtn_update").hide();
    				//gatewayList
    				var channelName="";
					 var channelList = message.messageBody.channelList;
					 var virtualAccount = message.messageBody.virtualAccount;
					    for(var i =0 ; channelList && i < channelList.length; i++){
					    	if(jsonObj['createChannel']==(channelList[i]["code"]+"")){
					    		channelName=channelList[i]["name"];
					    	};
					    	
					    }
					  $("#addI18nDeptAudit #discountType_update").combobox({
				            data: [
								{id:'11',name:'澳洲自有资金优惠券'},
				                {id:'12',name:'澳洲虚拟资金优惠券'},
				            ],
				            panelHeight: '120px',
				            valueField:'id',
				            textField:'name',
				            panelHeight: '100px' ,
				            readonly:true,
				            onChange:discountTypeCheck
				     });
					 
					$('#addI18nDeptAudit #discountType_update').combobox('setValue',jsonObj['discountType']);
					$("#addI18nDeptAudit #channelName").text(channelName);
					$("#addI18nDeptAudit #update_accountValue").text(virtualAccount);
					if(jsonObj.isInternations==3){
    					$("#addI18nDeptAudit #update_accountUnit").text("AUD");
    					$("#addI18nDeptAudit #update_faceValueUnit").text("AUD");
					}
					$("#addI18nDeptAudit #channelId").combobox({
						data: channelList,
						panelHeight: '120px',
						valueField:'code',
						textField:'name' 
					});
					 if(message.messageBody.gatewayList){
						    var gatewayHtml ="";
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
	                        $("#addI18nDeptAudit #gatewayTable_update").html(gatewayHtml);
	                        if(jsonObj['gatewayStr']){
	                	        if(jsonObj['gatewayStr'].split(',').length == $("#updateCouponGroupForm input[name='gatewaycheck']").length ){
	                	            $("#gatewayselect_update").prop("checked", true).attr("checked", true)
	                	        }
	                	    }
	                        if(jsonObj['gatewayStr']){
	                            $.each(jsonObj['gatewayStr'].split(','),function(i,el1){
	                                $("#addI18nDeptAudit input[name='gatewaycheck']").each(function(j,el2){
	                                    if($(el2).val()==el1){
	                                        $(el2).prop("checked", true).attr("checked", true)
	                                    }
	                                });

	                            });
	                        }
	                    }
    			 }
    		});
        },
        buttons:[
	        { 
				text:'关闭', 
				iconCls:'icon-clear', 
				left:50,
				handler:function(){ 
					CMC.dialog("addI18nDeptAudit", "close");
			}}
        ]
    });
}

function AproveCSQInfo(value){
	var jsonStr=value['applyParameter'];
	var jsonObj = JSON.parse(jsonStr);
	var isInternations=jsonObj['isInternations'];
	var param;
	var currency;
	if(isInternations=="7"||isInternations==7){
		param = "?channel=CSQ7";
		currency = "元";
	}else if(isInternations=="8"||isInternations==8){
		param = "?channel=CSQ8";
		currency = "元";
	}
	$("#addI18nDeptAudit").dialog({
		title: '次数券生成信息',
        collapsible: true,
        minimizable: false, 
        maximizable: false,
        resizable: false,
        modal:true,
        width: 850,
        height: 700,
        href: '/cmc/module/coupon/couponGroupCSQUpdateForm.html',
        onLoad: function () {
        	//debugger;
        	$(".currency").each(function(j,el2){ 
				$(el2).text(currency);
			});
			$("#updateCouponGroupForm #status_tralb").hide();
			$("#updateCouponGroupForm").form('clear');
			if(value.businessKey){
				//alert(value.businessKey);

				$('#groupCode_update').textbox('setValue',value.businessKey);
			}
        		//getConfigUrl: "authorized/couponGroup/pageConfig" , 
        		CMC.request({
        			url: "authorized/couponGroupCSQ/pageConfig"+param,
        			method: 'GET',
        			success: function(message){//virtualAccount
        				//gatewayList
        				counpountInfo("#updateCouponGroupForm",jsonObj,'update');
        				var channelName="";
    					 var channelList = message.messageBody.channelList;
    					 var virtualAccount = message.messageBody.virtualAccount;
    					    for(var i =0 ; channelList && i < channelList.length; i++){
    					    	if(Number(channelList[i]["code"])<10){
    					    		channelList[i]["code"] = "0" + channelList[i]["code"];
    					    	}
    					    	if(jsonObj['createChannel']==(channelList[i]["code"]+"")){
    					    		channelName=channelList[i]["name"];
    					    	};
    					    	
    					    }
    					  $("#updateCouponGroupForm #discountType_update").combobox({
    				            data: [
    				            	{id:'19',name:'国内合作活动次数券'},
    								{id:'20',name:'国内营销活动次数券'},
    								{id:'21',name:'国际合作活动次数券'},
    								{id:'22',name:'国际营销活动次数券'},
    								{id:'23',name:'国内合作活动协议价次数券'},
    								{id:'24',name:'国内营销活动协议价次数券'},
    								{id:'25',name:'国际合作活动协议价次数券'},
    								{id:'26',name:'国际营销活动协议价次数券'}
    				            ],
    				            panelHeight: '120px',
    				            valueField:'id',
    				            textField:'name',
    				            panelHeight: '100px' ,
    				            readonly:true,
    				            onChange:discountTypeCheck
    				     });
    					 
    					$('#discountType_update').combobox('setValue',jsonObj['discountType']);
    					$("#updateCouponGroupForm #channelName").text(channelName);
    					$("#updateCouponGroupForm #update_accountValue").text(virtualAccount);
    					$("#updateCouponGroupForm #channelId").combobox({
    						data: channelList,
    						panelHeight: '120px',
    						valueField:'code',
    						textField:'name' 
    					});
    					 if(message.messageBody.gatewayList){
    						    var gatewayHtml ="";
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
    	                        $("#updateCouponGroupForm #gatewayTable_update").html(gatewayHtml);
    	                        if(jsonObj['gatewayStr']){
    	                	        if(jsonObj['gatewayStr'].split(',').length == $("#updateCouponGroupForm input[name='gatewaycheck']").length ){
    	                	            $("#gatewayselect_update").prop("checked", true).attr("checked", true)
    	                	        }
    	                	    }
    	                        if(jsonObj['gatewayStr']){
    	                            $.each(jsonObj['gatewayStr'].split(','),function(i,el1){
    	                                $("#updateCouponGroupForm input[name='gatewaycheck']").each(function(j,el2){
    	                                    if($(el2).val()==el1){
    	                                        $(el2).prop("checked", true).attr("checked", true)
    	                                    }
    	                                });

    	                            });
    	                        }
    	                    }
        			 }
        		});
        	//counpountInfo(formId,jsonObj,ind)
        	//addAccountValue($("#updateCouponGroupForm  #update_accountValue"),value['typeKey']);
        },
        buttons:[
	        { 
				text:'关闭', 
				iconCls:'icon-clear', 
				left:50,
				handler:function(){ 
					CMC.dialog("addI18nDeptAudit", "close");
			}}
        ]
    });
}
function AproveOverseasInfo(value){
	var jsonStr=value['applyParameter'];
	var jsonObj = JSON.parse(jsonStr);
	var isInternations=jsonObj['isInternations'];
	var param;
	var currency;
	if(isInternations=="6"||isInternations==6){
		param = "?channel=161885";
		currency = "GBP";
	}
	updateactivityDescs = jsonObj['activityDesc'];
    updateuseConditionDesc = jsonObj['useConditionDesc'];
	$("#addI18nDeptAudit").dialog({
		title: '优惠劵生成信息',
        collapsible: true,
        minimizable: false, 
        maximizable: false,
        resizable: false,
        modal:true,
        width: 850,
        height: 700,
        href: '/cmc/module/coupon/couponGroupOverseasUpdateForm.html',
        onLoad: function () {
        	//debugger;
        	$(".currency").each(function(j,el2){ 
				$(el2).text(currency);
			});
			$("#updateCouponGroupForm #status_tralb").hide();
			$("#updateCouponGroupForm").form('clear');
			if(value.businessKey){
				//alert(value.businessKey);

				$('#groupCode_update').textbox('setValue',value.businessKey);
			}
        		//getConfigUrl: "authorized/couponGroup/pageConfig" , 
        		CMC.request({
        			url: "authorized/couponGroupOverseas/pageConfig"+param,
        			method: 'GET',
        			success: function(message){//virtualAccount
        				//gatewayList
        				counpountInfo("#updateCouponGroupForm",jsonObj,'update');
        				var channelName="";
    					 var channelList = message.messageBody.channelList;
    					 var virtualAccount = message.messageBody.virtualAccount;
    					    for(var i =0 ; channelList && i < channelList.length; i++){
    					    	if(Number(channelList[i]["code"])<10){
    					    		channelList[i]["code"] = "0" + channelList[i]["code"];
    					    	}
    					    	if(jsonObj['createChannel']==(channelList[i]["code"]+"")){
    					    		channelName=channelList[i]["name"];
    					    	};
    					    	
    					    }
    					  $("#updateCouponGroupForm #discountType_update").combobox({
    				            data: [
    				                {id:'17',name:'英国自有资金优惠券'},
    								{id:'18',name:'英国虚拟资金优惠券'}
    				            ],
    				            panelHeight: '120px',
    				            valueField:'id',
    				            textField:'name',
    				            panelHeight: '100px' ,
    				            readonly:true,
    				            onChange:discountTypeCheck
    				     });
    					 
    					$('#discountType_update').combobox('setValue',jsonObj['discountType']);
    					$("#updateCouponGroupForm #channelName").text(channelName);
    					$("#updateCouponGroupForm #update_accountValue").text(virtualAccount);
    					$("#updateCouponGroupForm #channelId").combobox({
    						data: channelList,
    						panelHeight: '120px',
    						valueField:'code',
    						textField:'name' 
    					});
    					 if(message.messageBody.gatewayList){
    						    var gatewayHtml ="";
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
    	                        $("#updateCouponGroupForm #gatewayTable_update").html(gatewayHtml);
    	                        if(jsonObj['gatewayStr']){
    	                	        if(jsonObj['gatewayStr'].split(',').length == $("#updateCouponGroupForm input[name='gatewaycheck']").length ){
    	                	            $("#gatewayselect_update").prop("checked", true).attr("checked", true)
    	                	        }
    	                	    }
    	                        if(jsonObj['gatewayStr']){
    	                            $.each(jsonObj['gatewayStr'].split(','),function(i,el1){
    	                                $("#updateCouponGroupForm input[name='gatewaycheck']").each(function(j,el2){
    	                                    if($(el2).val()==el1){
    	                                        $(el2).prop("checked", true).attr("checked", true)
    	                                    }
    	                                });

    	                            });
    	                        }
    	                    }
        			 }
        		});
        	//counpountInfo(formId,jsonObj,ind)
        	//addAccountValue($("#updateCouponGroupForm  #update_accountValue"),value['typeKey']);
        },
        buttons:[
	        { 
				text:'关闭', 
				iconCls:'icon-clear', 
				left:50,
				handler:function(){ 
					CMC.dialog("addI18nDeptAudit", "close");
			}}
        ]
    });
}
function Aprove100007Info(value){
	var jsonStr=value['applyParameter'];
	var jsonObj = JSON.parse(jsonStr);
	updateactivityDescs = jsonObj['activityDesc'];
    updateuseConditionDesc = jsonObj['useConditionDesc'];
	$("#addI18nDeptAudit").dialog({
		title: '韩国优惠劵生成信息',
        collapsible: true,
        minimizable: false, 
        maximizable: false,
        resizable: false,
        modal:true,
        width: 850,
        height: 700,
        href: '/cmc/module/coupon/couponGroupKoreaUpdateForm.html',
        onLoad: function () {
        	//debugger;
			$("#updateCouponGroupForm #status_tralb").hide();
			$("#updateCouponGroupForm").form('clear');
			if(value.businessKey){
				//alert(value.businessKey);

				$('#groupCode_update').textbox('setValue',value.businessKey);
			}
        		//getConfigUrl: "authorized/couponGroup/pageConfig" , 
        		CMC.request({
        			url: "authorized/couponGroupKorea/pageConfig",
        			method: 'GET',
        			success: function(message){//virtualAccount
        				//gatewayList
        				counpountInfo("#updateCouponGroupForm",jsonObj,'update');
        				var channelName="";
    					 var channelList = message.messageBody.channelList;
    					 var virtualAccount = message.messageBody.virtualAccount;
    					    for(var i =0 ; channelList && i < channelList.length; i++){
    					    	if(Number(channelList[i]["code"])<10){
    					    		channelList[i]["code"] = "0" + channelList[i]["code"];
    					    	}
    					    	if(jsonObj['createChannel']==(channelList[i]["code"]+"")){
    					    		channelName=channelList[i]["name"];
    					    	};
    					    	
    					    }
    					  $("#updateCouponGroupForm #discountType_update").combobox({
    				            data: [
    				                {id:'9',name:'韩国自有资金优惠券'},
    								{id:'10',name:'韩国虚拟资金优惠券'}
    				            ],
    				            panelHeight: '120px',
    				            valueField:'id',
    				            textField:'name',
    				            panelHeight: '100px' ,
    				            readonly:true,
    				            onChange:discountTypeCheck
    				     });
    					 
    					$('#discountType_update').combobox('setValue',jsonObj['discountType']);
    					$("#updateCouponGroupForm #channelName").text(channelName);
    					$("#updateCouponGroupForm #update_accountValue").text(virtualAccount);
    					$("#updateCouponGroupForm #channelId").combobox({
    						data: channelList,
    						panelHeight: '120px',
    						valueField:'code',
    						textField:'name' 
    					});
    					 if(message.messageBody.gatewayList){
    						    var gatewayHtml ="";
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
    	                        $("#updateCouponGroupForm #gatewayTable_update").html(gatewayHtml);
    	                        if(jsonObj['gatewayStr']){
    	                	        if(jsonObj['gatewayStr'].split(',').length == $("#updateCouponGroupForm input[name='gatewaycheck']").length ){
    	                	            $("#gatewayselect_update").prop("checked", true).attr("checked", true)
    	                	        }
    	                	    }
    	                        if(jsonObj['gatewayStr']){
    	                            $.each(jsonObj['gatewayStr'].split(','),function(i,el1){
    	                                $("#updateCouponGroupForm input[name='gatewaycheck']").each(function(j,el2){
    	                                    if($(el2).val()==el1){
    	                                        $(el2).prop("checked", true).attr("checked", true)
    	                                    }
    	                                });

    	                            });
    	                        }
    	                    }
        			 }
        		});
        	//counpountInfo(formId,jsonObj,ind)
        	//addAccountValue($("#updateCouponGroupForm  #update_accountValue"),value['typeKey']);
        },
        buttons:[
	        { 
				text:'关闭', 
				iconCls:'icon-clear', 
				left:50,
				handler:function(){ 
					CMC.dialog("addI18nDeptAudit", "close");
			}}
        ]
    });
}

function Aprove100013Info(value){
	var jsonStr=value['applyParameter'];
	var jsonObj = JSON.parse(jsonStr);
	updateactivityDescs = jsonObj['activityDesc'];
    updateuseConditionDesc = jsonObj['useConditionDesc'];
	$("#addI18nDeptAudit").dialog({
		title: '新西兰优惠劵生成信息',
        collapsible: true,
        minimizable: false, 
        maximizable: false,
        resizable: false,
        modal:true,
        width: 850,
        height: 700,
        href: '/cmc/module/coupon/couponGroupUpdateNZLForm.html',
        onLoad: function () {
        	//debugger;
			$("#updateCouponGroupForm #status_tralb").hide();
			$("#updateCouponGroupForm").form('clear');
			if(value.businessKey){
				//alert(value.businessKey);

				$('#groupCode_update').textbox('setValue',value.businessKey);
			}
        		//getConfigUrl: "authorized/couponGroup/pageConfig" , 
        		CMC.request({
        			url: "authorized/couponGroupNZL/pageConfig",
        			method: 'GET',
        			success: function(message){//virtualAccount
        				counpountInfo("#updateCouponGroupForm",jsonObj,'update');
        				//gatewayList
        				var channelName="";
    					 var channelList = message.messageBody.channelList;
    					 var virtualAccount = message.messageBody.virtualAccount;
    					    for(var i =0 ; channelList && i < channelList.length; i++){
    					    	if(Number(channelList[i]["code"])<10){
    					    		channelList[i]["code"] = "0" + channelList[i]["code"];
    					    	}
    					    	if(jsonObj['createChannel']==(channelList[i]["code"]+"")){
    					    		channelName=channelList[i]["name"];
    					    	};
    					    	
    					    }
    					  $("#updateCouponGroupForm #discountType_update").combobox({
    				            data: [
    				                {id:'13',name:'新西兰自有资金优惠券'},
    								{id:'14',name:'新西兰虚拟资金优惠券'}
    				            ],
    				            panelHeight: '120px',
    				            valueField:'id',
    				            textField:'name',
    				            panelHeight: '100px' ,
    				            readonly:true,
    				            onChange:discountTypeCheck
    				     });
    					 
    					$('#discountType_update').combobox('setValue',jsonObj['discountType']);
    					$("#updateCouponGroupForm #channelName").text(channelName);
    					$("#updateCouponGroupForm #update_accountValue").text(virtualAccount);
    					$("#updateCouponGroupForm #channelId").combobox({
    						data: channelList,
    						panelHeight: '120px',
    						valueField:'code',
    						textField:'name' 
    					});
    					 if(message.messageBody.gatewayList){
    						    var gatewayHtml ="";
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
    	                        $("#updateCouponGroupForm #gatewayTable_update").html(gatewayHtml);
    	                        if(jsonObj['gatewayStr']){
    	                	        if(jsonObj['gatewayStr'].split(',').length == $("#updateCouponGroupForm input[name='gatewaycheck']").length ){
    	                	            $("#gatewayselect_update").prop("checked", true).attr("checked", true)
    	                	        }
    	                	    }
    	                        if(jsonObj['gatewayStr']){
    	                            $.each(jsonObj['gatewayStr'].split(','),function(i,el1){
    	                                $("#updateCouponGroupForm input[name='gatewaycheck']").each(function(j,el2){
    	                                    if($(el2).val()==el1){
    	                                        $(el2).prop("checked", true).attr("checked", true)
    	                                    }
    	                                });

    	                            });
    	                        }
    	                    }
        			 }
        		});
        	//counpountInfo(formId,jsonObj,ind)
        	//addAccountValue($("#updateCouponGroupForm  #update_accountValue"),value['typeKey']);
        },
        buttons:[
	        { 
				text:'关闭', 
				iconCls:'icon-clear', 
				left:50,
				handler:function(){ 
					CMC.dialog("addI18nDeptAudit", "close");
			}}
        ]
    });
}
function Aprove100016Info(value){
	var jsonStr=value['applyParameter'];
	var jsonObj = JSON.parse(jsonStr);
	updateactivityDescs = jsonObj['activityDesc'];
    updateuseConditionDesc = jsonObj['useConditionDesc'];
	$("#addI18nDeptAudit").dialog({
		title: '新加坡优惠劵生成信息',
        collapsible: true,
        minimizable: false, 
        maximizable: false,
        resizable: false,
        modal:true,
        width: 850,
        height: 700,
        href: '/cmc/module/coupon/couponGroupUpdateSingaporeForm.html',
        onLoad: function () {
        	//debugger;
			$("#updateCouponGroupForm #status_tralb").hide();
			$("#updateCouponGroupForm").form('clear');
			if(value.businessKey){
				//alert(value.businessKey);

				$('#groupCode_update').textbox('setValue',value.businessKey);
			}
        		//getConfigUrl: "authorized/couponGroup/pageConfig" , 
        		CMC.request({
        			url: "authorized/couponGroupSingapore/pageConfig",
        			method: 'GET',
        			success: function(message){//virtualAccount
        				counpountInfo("#updateCouponGroupForm",jsonObj,'update');
        				//gatewayList
        				var channelName="";
    					 var channelList = message.messageBody.channelList;
    					 var virtualAccount = message.messageBody.virtualAccount;
    					    for(var i =0 ; channelList && i < channelList.length; i++){
    					    	if(Number(channelList[i]["code"])<10){
    					    		channelList[i]["code"] = "0" + channelList[i]["code"];
    					    	}
    					    	if(jsonObj['createChannel']==(channelList[i]["code"]+"")){
    					    		channelName=channelList[i]["name"];
    					    	};
    					    	
    					    }
    					  $("#updateCouponGroupForm #discountType_update").combobox({
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
    					$('#discountType_update').combobox('setValue',jsonObj['discountType']);
    					$("#updateCouponGroupForm #channelName").text(channelName);
    					$("#updateCouponGroupForm #update_accountValue").text(virtualAccount);
    					$("#updateCouponGroupForm #channelId").combobox({
    						data: channelList,
    						panelHeight: '120px',
    						valueField:'code',
    						textField:'name' 
    					});
    					 if(message.messageBody.gatewayList){
    						    var gatewayHtml ="";
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
    	                        $("#updateCouponGroupForm #gatewayTable_update").html(gatewayHtml);
    	                        if(jsonObj['gatewayStr']){
    	                	        if(jsonObj['gatewayStr'].split(',').length == $("#updateCouponGroupForm input[name='gatewaycheck']").length ){
    	                	            $("#gatewayselect_update").prop("checked", true).attr("checked", true)
    	                	        }
    	                	    }
    	                        if(jsonObj['gatewayStr']){
    	                            $.each(jsonObj['gatewayStr'].split(','),function(i,el1){
    	                                $("#updateCouponGroupForm input[name='gatewaycheck']").each(function(j,el2){
    	                                    if($(el2).val()==el1){
    	                                        $(el2).prop("checked", true).attr("checked", true)
    	                                    }
    	                                });

    	                            });
    	                        }
    	                    }
        			 }
        		});
        	//counpountInfo(formId,jsonObj,ind)
        	//addAccountValue($("#updateCouponGroupForm  #update_accountValue"),value['typeKey']);
        },
        buttons:[
	        { 
				text:'关闭', 
				iconCls:'icon-clear', 
				left:50,
				handler:function(){ 
					CMC.dialog("addI18nDeptAudit", "close");
			}}
        ]
    });
}
function counpountInfo(formId,bean,ind){
	    $(formId).find('.error').html('');
	    $(formId + ' #segmentInfo_' + ind).attr('readonly', false);
	    $(formId + ' #segmentType_fileBtn' + ind).show();
	    console.log(formId);
	    console.log(bean);
	    console.log(ind);
	   // $('#groupCode_' + ind).textbox('setValue',"asdfaf");
	    $(formId + ' #faceValue_' + ind).numberbox('setValue',bean['faceValue']);
	    $(formId + ' #maxVoucherfaceValue_' + ind).numberbox('setValue',bean['maxVoucherfaceValue']);
	    $(formId + ' #discountType_' + ind).combobox('setValue',bean['discountType']);
	    if(bean['discountType'] !='1'){
	        $(formId ).find('#rateDiv').hide();
	    }
	    if(bean['rateId']!=null){
	    	$('#rateId_' + ind).textbox('setValue',bean['rateId']);
	    }
	    if(bean['discountType'] =='23'||bean['discountType'] =='24'||bean['discountType'] =='25'||bean['discountType'] =='26'){
	        $(formId ).find('#negotiatedFaceValueDiv').show();
	    }
	    if(bean['negotiatedFaceValue']!=null){
	    	$('#negotiatedFaceValue_' + ind).textbox('setValue',bean['negotiatedFaceValue']);
	    }
	    if(bean['flightDateStr']){
	        var flightdate = bean['flightDateStr'].split('|');
	        if(flightdate){
	            $(formId + ' #flightDateOne_' + ind).datebox('setValue',flightdate[0]);
	        }
	        if(flightdate && flightdate[1]){
	            $(formId + ' #flightDateTwo_' + ind).datebox('setValue',flightdate[1]);
	        }
	    }
	    if(bean['usefulDateStr']){
	        $(formId + ' #usefulDateOne_' + ind).datebox('setValue',bean['usefulDateStr'].split('|')[0]);
	        $(formId + ' #usefulDateTwo_' + ind).datebox('setValue',bean['usefulDateStr'].split('|')[1]);
	    }
	    $(formId + ' #segmentInfo_' + ind).val(bean['segmentInfo']);
	    //if(bean['SEGMENTTYPE'] && bean['SEGMENTTYPE']!=""){
	    $(formId + ' #segmentType_' + ind).combobox('setValue',bean['segmentType']+"");
	    //}else{
	    //	$('#segmentType_update').combobox('setValue',bean['SEGMENTTYPE']+"");
	    //}

	    //if(bean['SEGMENTINFO']&& bean['SEGMENTINFO']!=''){
	    //$('#segmentInfo_update').attr('readonly', true);
	    //$('#segmentType_fileBtn_update').hide();
	    //}else{
	    //$('#segmentType_fileBtn_update').show();
	    //}
	  
	    $(formId + ' #createChannel_' + ind).combobox('setValue',bean['createChannel']);
	    $(formId + ' #codeCount_' + ind).numberbox('setValue',bean['codeCount']);
	    $(formId + ' #segPriceLimit_' + ind).numberbox('setValue',bean['segPriceLimit']);
	    $(formId + ' #segPriceLimitSeat_' + ind).numberbox('setValue',bean['segPriceLimitSeat']);
	    $(formId + ' #segPriceLimitLuggage_' + ind).numberbox('setValue',bean['segPriceLimitLuggage']);
	    if(bean['activityDescribe']){
	        $(formId + ' #activityDescribe_' + ind).textbox('setValue',bean['activityDescribe']);
	        //checkLen(bean['REMARK']);
	    }
	    if(bean['useRestriction']){
	    	$(formId + ' #userestriction_' + ind).combobox('setValue',bean['useRestriction']);
	    	$(formId + ' #userestriction_' + ind + "_I18n").combobox('setValue',bean['useRestriction']);
	    }else{
	    	$(formId + " #userestriction_" + ind).combobox('setValue',"1");
	    	$(formId + " #userestriction_" + ind + "_I18n").combobox('setValue',"1");
	    }
	    var status = bean['status'];
	    $(formId + " #status_" + ind).hide();
	    $(formId + " #holdBtn_"+ind).hide();
	    //$("#groupCode_update").hide();
	    
        $(formId + " #unlockBtn_" + ind).hide();
        $(formId + " #disableBtn_" + ind).hide();
        $(formId + " #updateBtn_" + ind ).hide();
        $(formId + ' #buttonBarClose').hide();
        

	    $(formId + " #status_" + ind).hide();
	    $("#holdBtn_"+ind).hide();
        $("#unlockBtn_" + ind).hide();
        $("#disableBtn_" + ind).hide();
        $("#updateBtn_" + ind ).hide();
        $('#buttonBarClose').hide();
       // $("#updateCouponGroupForm #buttonBarClose").hide();
	    if(bean['cabinType']){
	        $.each(bean['cabinType'].split(','),function(i,el1){
	        	//id="cabinType_update" name="cabinType"
	            $(formId + " input[name='cabinType']").each(function(j,el2){
	                if($(el2).val()==el1){
	                    $(el2).prop("checked", true).attr("checked", true)
	                }
	            });
	        });
	    }
	    
	    $.each(bean['usedChannelStr'].split(','),function(i,el1){
	        $(formId + " input[name='usedChannel']").each(function(j,el2){
	            if($(el2).val()==el1){
	                $(el2).prop("checked", true).attr("checked", true)
	            }
	        });
	    });
	    if(bean['flightTimeTypeStr']){
	        $.each(bean['flightTimeTypeStr'].split(','),function(i,el1){
	            $(formId + " input[name='flightTimeType']").each(function(j,el2){
	                if($(el2).val()==el1){
	                    $(el2).prop("checked", true).attr("checked", true);
	                }
	            });

	        });
	    }
	    if(bean['couponBusiness']){
	        $.each(bean['couponBusiness'].split(','),function(i,el1){
	            $(formId + " input[name='couponBusiness']").each(function(j,el2){
	                if($(el2).val()==el1){
	                    $(el2).prop("checked", true).attr("checked", true);
	                }
	            });

	        });
	    }
	    if(bean['seatRestriction']){
	        $.each(bean['seatRestriction'].split(','),function(i,el1){
	            $(formId + " input[name='seatRestriction']").each(function(j,el2){
	                if($(el2).val()==el1){
	                    $(el2).prop("checked", true).attr("checked", true);
	                }
	            });

	        });
	    }
	    if(bean['createType']){
	        $.each(bean['createType'].split(','),function(i,el1){
	            $(formId + " input[name='createType']").each(function(j,el2){
	                if($(el2).val()==el1){
	                    $(el2).prop("checked", true).attr("checked", true)
	                }
	            });

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
        if(bean['timeZone']){
            var timeZone = bean['timeZone'].split(":");
            $(formId +' #timeZoneSQ_' + ind).combobox('setValue',timeZone[0]);
            $(formId +' #timeZoneSJ_' + ind).combobox('setValue',timeZone[1]);
            //澳洲
            $(formId +' #timeZone1_' + ind).combobox('setValue',timeZone[0]);
            $(formId +' #timeZone2_' + ind).combobox('setValue',timeZone[1]);
        }
	    $(formId + " #AESKEY").html(bean['aeskey']);
	    $(formId + ' #principal_' + ind).textbox('setValue',bean['principal']);
	    $(formId + ' #principalNo_' + ind).textbox('setValue',bean['principalNo']);
}
function Aprove100005Info(value){
	var jsonStr=value['applyParameter'];
	var jsonObj = JSON.parse(jsonStr);
	var title="";
	if(jsonObj.issuingType=='100006'){
		title="国内优惠券发放信息";
	}else if(jsonObj.issuingType=='100012'){
		title="澳洲优惠券发放信息";
	}else if(jsonObj.issuingType=='100024'){
		title="国内次数券发放信息";
	}else if(jsonObj.issuingType=='100027'){
		title="国际次数券发放信息";
	}else{
		title="国际优惠券发放信息";
	}
	console.log(value);
	$("#addI18nDeptAudit").dialog({
		title: title,
        collapsible: true,
        minimizable: false, 
        maximizable: false,
        resizable: false,
        modal:true,
        width: 400,
        height: 300,
        href: '/cmc/module/workflow/couponGroup/couponIssuApprove.html',
        onLoad: function () {
        	$("#addI18nDeptAudit #groupId").textbox('setValue',jsonObj.groupId);
        	$("#addI18nDeptAudit #groupCount").textbox('setValue',jsonObj.groupCount);
        	$("#addI18nDeptAudit #faceValue").textbox('setValue',jsonObj.faceValue);
        	var type=jsonObj.type;
        	if(type!='unbind'){
        		var unbind="";
        		if(type==0){
        			unbind="绑定会员号";
        		}else if(type==1){
        			unbind="绑定证件号";
        		}else if(type==2){
        			unbind="绑定手机号";
        		}
        		var val='<tr><td align="right">绑定类型：</td><td >'+unbind+'</td></tr>';
        		$("#addI18nDeptAudit #addCoupAccountTable").append(val);
        		if(jsonObj.discountCodeList&&jsonObj.discountCodeList.length>2){
        			var val1='<tr><td align="right">'+unbind+':</td><td>'+jsonObj.discountCodeList+'</td></tr>';
        			//var val1='<tr><td align="right">'+unbind+':</td><td>'+jsonObj.discountCodeList+jsonObj.discountCodeList+jsonObj.discountCodeList+jsonObj.discountCodeList+jsonObj.discountCodeList+jsonObj.discountCodeList+jsonObj.discountCodeList+jsonObj.discountCodeList+jsonObj.discountCodeList+jsonObj.discountCodeList+jsonObj.discountCodeList+jsonObj.discountCodeList+jsonObj.discountCodeList+jsonObj.discountCodeList+'</td></tr>';
        			$("#addI18nDeptAudit #addCoupAccountTable").append(val1);
        		}
        	}else{
				var val='<tr><td align="right">绑定类型：</td><td >未绑定</td></tr>';
				$("#addI18nDeptAudit #addCoupAccountTable").append(val);
			}
        	if(jsonObj.fileUrl){
        		var avl='<tr><td align="right">上传文件：</td> <td ><a href="javascript:void(0)" onclick="window.open(\''+jsonObj.fileUrl+'\')" >下载</a></td></tr>';
        		$("#addI18nDeptAudit #addCoupAccountTable").append(avl);
        	}
        },
        buttons:[
	        { 
				text:'关闭', 
				iconCls:'icon-clear', 
				left:50,
				handler:function(){ 
					CMC.dialog("addI18nDeptAudit", "close");
			}}
        ]
    });
}


/**
 * 优惠券澳洲账户充值审批
 * @param value
 */
function AproveEdit100011Info(value){
	var jsonStr=value['applyParameter'];
	var jsonObj = JSON.parse(jsonStr);
	$("#addAUSDeptAudit").dialog({
		title: '优惠劵账户充值信息',
        collapsible: true,
        minimizable: false, 
        maximizable: false,
        resizable: false,
        modal:true,
        width: 400,
        height: 300,
        href: '/cmc/module/workflow/couponGroup/virtualAccountAddAUSInfo.html',
        onLoad: function () {
        	$("#addAUSDeptAudit #applyName").textbox('setValue',jsonObj.operateName);
        	$("#addAUSDeptAudit #valueNum").textbox('setValue',jsonObj.operateValue);
        	$("#addAUSDeptAudit #remark").textbox('setValue',jsonObj.remark);
        	// 获取澳洲账户
        	addAccountValue($("#addAUSDeptAudit  #addAccountValue"),value['typeKey']);
        },
        buttons:[
	        { 
				text:'关闭', 
				iconCls:'icon-clear', 
				left:50,
				handler:function(){ 
					CMC.dialog("addAUSDeptAudit", "close");
			}}
        ]
    });
}