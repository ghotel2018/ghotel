function createExtendLinkInfo2()
{
	var memberJoinTimeFlag = true;
	memberJoinTimeFlag = checkMemberJoinTime();
	if(!memberJoinTimeFlag){
		return;
	}
	var activeDate_value = checkActiveDate();
	var interPsgrType_value = checkInterPsgrType();
	var productLabels = $('div#editgeneralizeLink  input[name="productLabel"]:checked');
	var flag = true;
	 var merchantId=$("div#editgeneralizeLink #merchantId");
	 var name=$("div#editgeneralizeLink #name");
	 var saleUnit=$("div#editgeneralizeLink #saleUnit");
	 var priceGroup=$("div#editgeneralizeLink #priceGroup");
	flag =checkProductLabel(productLabels)&&checkSaleUnit(saleUnit[0])&& checkPriceGroup(priceGroup) && checkSaleAndFlightDate()  && chcekAuthRadio();
	if(update!="update"&&flag){
		flag=checkMerchantId(merchantId[0]) && checkName(name[0]) ;
	}
	if(flag)
	{
		if(activeDate_value!=""&&activeDate_value!=null){
			var strProductLabel = "";
			productLabels.each(function(index){
				if(index==0)
					strProductLabel = $(this).val();
				else
					strProductLabel += "," + $(this).val();
			});
			//验证类型
			var authType = "";
			var authRadios = $("div#editgeneralizeLink  input[name='authentication']:checked");
			if(authRadios.length>0){
				authType = authArr.join("$");
			}
			//注册时间
			var memberJoinStart =$("div#editgeneralizeLink #memberJoinStart").datebox("getValue");
			var memberJoinEnd =$("div#editgeneralizeLink #memberJoinEnd").datebox("getValue");
			
			//pcPaymentGayway
			var pcPaymentGateway ="";
			var pcGateway_j =0;
			$("div#editgeneralizeLink  input[name=pcGateway]").each(function(i,dom){
				if( $(this)[0].checked ){
					if(pcGateway_j===0){
						pcPaymentGateway = $(this).val();
						pcGateway_j++;
					}else{
						pcPaymentGateway = pcPaymentGateway+";"+$(this).val();
					}
				}
			});
			
			//年限限制
			
			var url =  Generalizelink.postGeneralizeLinktUrl;
			CMC.request({
				url: url,
				method: 'POST',
				data:{"merchantId":$("div#editgeneralizeLink #merchantId").val(),
			 		 "name":$("div#editgeneralizeLink #name").val(),
			 		 "saleUnit":$("div#editgeneralizeLink #saleUnit").val(),
			 		 "credentialsType":$("div#editgeneralizeLink input[name='credentialsType']:checked").val(),
			 		 "activeDate":activeDate_value,
			 		 "priceGroup":$("div#editgeneralizeLink #priceGroup").val(),
			 		 "payGate":pcPaymentGateway,
			 		 "psgrType":authType,
			 		 "interPsgTypeCode":$("div#editgeneralizeLink #interPsgTypeCode").val(),
			 		 "interPriceCode":$("div#editgeneralizeLink #interPriceCode").val(),
			 		 "minPriceFlag":$("div#editgeneralizeLink input[name=minPriceFlag]:checked").val(),
			 		 "startSaleDate":$("div#editgeneralizeLink #startSaleDate").datebox("getValue"),
			 		 "endSaleDate":$("div#editgeneralizeLink #endSaleDate").datebox("getValue"),
			 		 "startFlightDate":$("div#editgeneralizeLink #startFlightDate").datebox("getValue"),
			 		 "endFlightDate":$("div#editgeneralizeLink #endFlightDate").datebox("getValue"),
			 		 "labelName":$("div#editgeneralizeLink #LABELNAME").val(),
			 		 "cabins":$("div#editgeneralizeLink #CABINS").val(),
			 		 "productdescription":$("div#editgeneralizeLink #DESCRIPTION").val(),
			 		 "ticketPsgTypeCode":$("div#editgeneralizeLink #ticketPsgTypeCode").val(),
			 		 "SSRCode":$("div#editgeneralizeLink #SSRCode").val(),
			 		 "display":strProductLabel,
			 		 "showGateway":$("div#editgeneralizeLink input[name=showGateway]:checked").val(),
			 		 "homePromotionCode":$("div#editgeneralizeLink #homePromotionCode").val(),
			 		 "interPsgrType":interPsgrType_value,
					 "tourCode":$("div#editgeneralizeLink #tourCode").val(),
					 "memberLogin":$("div#editgeneralizeLink #memberLogin").val(),
					 "svcIdentityAuth":$("div#editgeneralizeLink #svcIdentityAuth").val(),
					 "userRestriction":$("div#editgeneralizeLink #userRestriction").val(),
					 "registerhours":$("div#editgeneralizeLink #registerhours").val(),
					 "enProductDescription":$("div#editgeneralizeLink #ENDESCRIPTION").val(),
					 "memberJoinStart":memberJoinStart,
					 "memberJoinEnd":memberJoinEnd,
					 "actionType":update
			 	 },
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					if(result.statusCode==0){
						$('#win').dialog("close");
						CMC.search();
					}
				}
			});
		}	
	}else{
		alert("生成优惠推广链接失败，请您核对所填信息是否正确!");
	}
}

function allPC(){
	var v = $("div#editgeneralizeLink #allPCGateWay")[0].checked;
	$("div#editgeneralizeLink input[name=pcGateway]").each(function(){
		$(this)[0].checked=v;	
	});
}
//验证链接id是否输入正确
function checkMerchantId(obj)
{
	var flag = true;
	var value = $(obj).val();
	if(checkIsNull(value))
	{
		var len = value.length;
		if(len!=6){
			$("#span_merchantId").attr("class","colorRed");
			$("#span_merchantId").html("链接ID输入有误，请您重新输入!");
			flag = false;
		}else{	
			var regex_pwd = /^[A-Za-z]{3}[0-9]{3}$/;
	    	if(regex_pwd.exec(value))
	    	{
	    		var url = Generalizelink.checkMerchantIdUrl+"?merchantId="+value;
	    		$.ajax({
	    			type:"get",
	    			url:url,
	    			dataType : "json",
	    			async : false,
	    			success:function(msg){
	    				var data = msg;
	    				//{"messageCode":null,"statusCode":0,"messageBody"
	    				if(msg.messageBody){
	    					$("#span_merchantId").attr("class","colorRed");
	    					msg.messageBody
	    					$("#span_merchantId").html(msg.messageBody);
	    					flag = false;
	    				}else if(msg.statusCode==0&&!msg.messageBody){
	    					$("#span_merchantId").attr("class","notetext");
	    					$("#span_merchantId").html("用户名可用!");
	    					flag = true;
	    				}else{
    						$("#span_merchantId").attr("class","colorRed");
	    					$("#span_merchantId").html(msg.messageBody);
	    					flag = false;
	    				}
	    			}
	    		});
	    	}else{
	    		$("#span_merchantId").attr("class","colorRed");
	    		$("#span_merchantId").html("链接ID输入有误，请您重新输入!");
	    		flag = false;
	    	}
		}
	}else{
		$("#span_merchantId").attr("class","colorRed");
		$("#span_merchantId").html("链接ID不能为空，请您重新输入!");
		flag  =false;
	}
	return flag;
}
//验证合作方名称是否正确
function checkName(obj)
{
	var flag = true;
	var value = $(obj).val();
	if(checkIsNull(value)){
		var url = Generalizelink.findGeneralizeLinktUrl+"?name="+value;
		$.ajax({
			type:"get",
			url:url,
			dataType : "json",
			async : false,
			success:function(msg){
				var data = msg;
				if(msg.messageBody&& msg.messageBody.length>0){
					$("#span_name").attr("class","colorRed");
					$("#span_name").html("合作方名称已存在，请您重新输入!");
					$(obj).focus();
					$(obj).select();
					flag = false;
				}else if(msg.statusCode==0&&(msg.messageBody|| msg.messageBody.length<1)){
					$("#span_name").attr("class","notetext");
					$("#span_name").html("用户名可用!");
					flag = true;
				}else{
					$("#span_name").attr("class","colorRed");
					$("#span_name").html("合作方名称已存在，请您重新输入!");
					$(obj).focus();
					$(obj).select();
					flag = false;
				}
			}
		});
	}else{
		$("#span_name").attr("class","colorRed");
		$("#span_name").html("合作方名称不能为空，请您重新输入!");
		flag  =false;
	}
	return flag;
}
//验证销售单位是否正确
function checkSaleUnit(obj)
{
	var flag = true;
	var value = $(obj).val();
	if(!checkIsNull(value)){
		$("div#editgeneralizeLink #span_saleUnit").attr("class","text_red");
		$("div#editgeneralizeLink #span_saleUnit").html("销售单位不能为空，请您重新输入!");
		flag  =false;
	}
	return flag;
}
//判断购买有效期是否选中
function checkActiveDate()
{
	var value = "";
	var obj = document.getElementsByName("activeDate");
	for(var i=0;i<obj.length;i++){
		if(obj[i].type == "checkbox" && obj[i].checked==true){
			value += obj[i].value+";";
		}
	}
	if(value!=""&&value!=null){
		return value.substring(0,value.lastIndexOf(";"));
	}else{
		alert("请您选择购买有效期!");
		return null;
	}
}

//判断购买有效期是否选中
function checkInterPsgrType()
{
	var value = "";
	var obj = document.getElementsByName("interPsgrType");
	for(var i=0;i<obj.length;i++){
		if(obj[i].type == "checkbox" && obj[i].checked==true){
			value += obj[i].value+";";
		}
	}
	if(value!=""&&value!=null){
		return value.substring(0,value.lastIndexOf(";"));
	}
}
//判断运价组是否为空
function checkPriceGroup(obj)
{
	var flag = true;
	var value = $(obj).val();
	if(checkIsNull(value)){
		if(value.length>=6&&value.length<=12){
			$("#span_priceGroup").html("");
			flag  =true;
		}else{
			$("#span_priceGroup").attr("class","colorRed");
			$("#span_priceGroup").html("运价组输入有误，请您重新输入!");
			flag  =false;
		}
	}else{
		$("#span_priceGroup").attr("class","colorRed");
		$("#span_priceGroup").html("运价组不能为空，请您重新输入!");
		flag  =false;
	}
	return flag;
}
//验证销售有效期和航班有效期
function checkSaleAndFlightDate()
{
	var flag = true;
	var endSaleDate = $("div#editgeneralizeLink #endSaleDate").datebox("getValue");
	var endFlightDate = $("div#editgeneralizeLink #endFlightDate").datebox("getValue");
	if(endSaleDate!=""&&endSaleDate!=null&&endSaleDate!="undefined")
	{
		var startSaleDate = $("div#editgeneralizeLink #startSaleDate").datebox("getValue");
		if(startSaleDate!=""&&startSaleDate!=null){
			if(endSaleDate>startSaleDate){
				flag = true;
			}else{
				alert("销售有效期选择有误，请您重新选择!");
				flag = false;
			}
		}else{
			alert("销售有效期选择有误，请您重新选择!");
			flag = false;
		}
	}
	
	if(endFlightDate!=""&&endFlightDate!=null&&endFlightDate!="undefined")
	{
		 
		var startFlightDate =$("div#editgeneralizeLink #startFlightDate").datebox("getValue");
		if(startFlightDate!=""&&startFlightDate!=null){
			if(endFlightDate>startFlightDate){
				if(flag){
					flag = true;
				}
			}else{
				alert("航班有效期选择有误，请您重新选择!");
				flag = false;
			}
		}else{
			alert("航班有效期选择有误，请您重新选择!");
			flag = false;
		}
	}
	return flag;
}

//判断值是否为空
function checkIsNull(value)
{
	if(value==''||value==null)
	{
		return false;
	}else{
		return true;
	}
}
function checkProductLabel(obj){
	var pdName = $("div#editgeneralizeLink #pdName").val();
	if(!pdName||pdName=="")
		return true;
	if(obj.length!=6){
		alert("请选择6项产品标签。");
		return false;
	}
	return true;
}

var authArr = new Array();
//检查身份验证
function chcekAuthRadio(){
	authArr=new Array();
	var radios = $("div#editgeneralizeLink input[name='authentication']:checked");
	var haveChecked = false;
	var flag = true;
	if(radios.length>0){
		haveChecked = true;
	}
	if(!haveChecked){
		alert("请选择身份验证");
		return false;
	}
	radios.each(function(){
		var value = $(this).val();
		if(value=="NID"){
			authArr.push("NID");
		}else if(value=="NCFID"){
			authArr.push("NCFID");
		}else if(value=="CCM"){
			authArr.push("CCM");
		}else if(value=="phone+cuxiao"){
			authArr.push("phone+cuxiao");
		}else if(value=="CVN"){
			authArr.push("CVN");
		}else if(value=="mingzhu"){
			authArr.push("mingzhu");
		}else if(value=="age"){
			var age = $("div#editgeneralizeLink #age").val();
			if(age!=""){
				if(!checkAge(age)){
					alert("年龄格式不正确！");
					flag = false;
				}
			}else{
				alert("请输入年龄限制范围！");
				flag = false;
			}
			authArr.push("age:"+age);
		}else if(value=="birthday"){
			var birthday = $("div#editgeneralizeLink #birthday").val();
			if(birthday!=""){
				var str = "(((10|12|0[13578])(3[01]|[12][0-9]|0[1-9]))|((11|0[469])(30|[12][0-9]|0[1-9]))|((02)(2[0-9]|1[0-9]|0[1-9])))";
				var regExp1 = new RegExp("^("+str+"\;)?"+str+"$");
				var regExp2 = new RegExp("^"+str+"\-"+str+"$");
				if(regExp1.test(birthday) || regExp2.test(birthday)){
					if(regExp2.test(birthday)){
						var date1 = parseInt(birthday.split("-")[0]);
						var date2 = parseInt(birthday.split("-")[1]);
						if(date1>date2){
							alert("生日范围错误！");
							flag = false;
						}
					}else{
						
					}
				}else{
					alert("生日格式不正确！");
					flag = false;
				}
			}else{
				alert("请输入生日！");
				flag = false;
			}
			authArr.push("birth:"+birthday);
		}else if(value=="sex"){
			var sex = $("div#editgeneralizeLink input[name='sex']:checked");
			if(!sex){
				alert("请选择性别！");
				flag = false;
			}
			authArr.push("sex:"+sex.val());
		}else if(value=="city"){
			var city = $("div#editgeneralizeLink #city").val();
			authArr.push("city:"+city);
		}else if(value=="times"){
			var times1 = $("div#editgeneralizeLink #times1").val();
			var times2 = $("div#editgeneralizeLink #times2").val();
			if(times1!="" && times2!=""){
				var regExp = new RegExp("^(([0-1][0-9])|(2[0-3]))[0-5][0-9]");
				if(regExp.test(times1) && regExp.test(times2)){
					var t1 = parseInt(times1);
					var t2 = parseInt(times2);
					if(t1>t2){
						alert("查询时段范围错误！");
						flag = false;
					}
				}else{
					alert("查询时段格式不正确！");
					flag = false;
				}
			}else{
				alert("请输入查询时段！");
				flag = false;
			}
			authArr.push("times:"+times1+"-"+times2);
		}else if(value=="dates"){
			var dates = $("div#editgeneralizeLink input[name='dates']:checked");
			var dateArr = new Array();
			if(dates.length>0){
				dates.each(function(){
					dateArr.push($(this).val());
				});
			}else{
				alert("请选择查询日期！");
				flag = false;
			}
			authArr.push("dates:"+dateArr.join(","));
		}else if(value=="limitNum"){
			var limitNum = $("div#editgeneralizeLink #limitNum").val();
			if(limitNum!=""){
				if(!/^[1-9]+[0-9]*$/.test(limitNum)){
					alert("成行人数限制格式有误！");
					flag = false;
				}
			}else{
				alert("请输入成行人数限制！");
				flag = false;
			}
			authArr.push("limitNum:"+limitNum);
		}else if(value=="orderAdultNum"){
			var orderAdultNum = $("div#editgeneralizeLink #orderAdultNum").val();
			if(orderAdultNum!=""){
				if(!/^[1-9]+[0-9]*$/.test(orderAdultNum)){
					alert("订单包含成人数格式有误！");
					flag = false;
				}
			}else{
				alert("请输入订单包含成人数！");
				flag = false;
			}
			authArr.push("aduNum:"+orderAdultNum);
		}else if(value=="orderChildNum"){
			var orderChildNum = $("div#editgeneralizeLink #orderChildNum").val();
			if(orderChildNum!=""){
				if(!/^[1-9]+[0-9]*$/.test(orderChildNum)){
					alert("订单包含儿童数格式有误！");
					flag = false;
				}
			}else{
				alert("请输入订单包含儿童数！");
				flag = false;
			}
			authArr.push("chdNum:"+orderChildNum);
		}else if(value=="orderInfantNum"){
			var orderInfantNum =$("div#editgeneralizeLink #orderInfantNum").val();
			if(orderInfantNum!=""){
				if(!/^[1-9]+[0-9]*$/.test(orderInfantNum)){
					alert("订单包含婴儿数格式有误！");
					flag = false;
				}
			}else{
				alert("请输入订单包含婴儿数！");
				flag = false;
			}
			authArr.push("infNum:"+orderInfantNum);
		}
	});
	if(!flag) authArr = null;
	return flag;
}

//检查年龄范围格式是否正确保，兼容"3;12;23-33;23;34-55"
function checkAge(age) {
	var ageRange;
	var rightAge=true;
	if (age.indexOf(";")>-1){
		ageRange=age.split(";");
		for (i=0;i<ageRange.length;i++){
			if(/^\d+\-\d+$/.test(ageRange[i]) || /^\d+$/.test(ageRange[i])){
				if(/^\d+\-\d+$/.test(ageRange[i])){
					var age1 = parseInt(ageRange[i].split("-")[0]);
					var age2 = parseInt(ageRange[i].split("-")[1]);
					if(age1>age2){
						rightAge = false;
					}
				}
			}else{
				rightAge=false;
			}
		}
	}else{
		if(/^\d+\-\d+$/.test(age) || /^\d+$/.test(age)){
			if(/^\d+\-\d+$/.test(age)){
				var age1 = parseInt(age.split("-")[0]);
				var age2 = parseInt(age.split("-")[1]);
				if(age1>age2){
					rightAge = false;
				}
			}
		}else{
			rightAge=false;
		}
	}
	return rightAge;
}

function checkDate(startDate, endDate) {
	var re = /-/g;
	var ticketSDate = document.getElementById(startDate).value;
	var ticketEDate = document.getElementById(endDate).value;

	if (ticketSDate != "" && ticketEDate != "") {
		ticketSDate = new Date(ticketSDate.replace(re, "/"));
		ticketEDate = new Date(ticketEDate.replace(re, "/"));
		if (ticketSDate > ticketEDate) {

			document.getElementById(startDate).focus();
			return false;
		}
	}
	return true;
}

function checkMemberJoinTime(){
	
	if (!checkDate("memberJoinStart", "memberJoinEnd")) {
		alert("会员注册开始日期不能晚于会员注册截止日期");
		return false;
	}
	return true;
}

function checkHomePromotionCode(obj){
	
	var flag = true;
	var value = $(obj).val();
	if(checkIsNull(value)){
		var url = Generalizelink.findGeneralizeLinktUrl+"?homePromotionCode="+value;
		$.ajax({
			type:"POST",
			url:url,
			dataType : "json",
			async : false,
			success:function(msg){
				var data = msg;
				if(msg.statusCode==0&&(msg.messageBody|| msg.messageBody.length<1)){
					$("#span_homePromotionCode").attr("class","notetext");
					$("#span_homePromotionCode").html("首页促销代码 可用!");
					flag = true;
				}else{
					$("#span_homePromotionCode").attr("class","colorRed");
					$("#span_homePromotionCode").html("首页促销代码已存在，请您重新输入!");
					flag = false;
				}
			}
		});
	}else{
		$("#span_homePromotionCode").attr("class","notetext");
		$("#span_homePromotionCode").html("");
	}
	return flag;
}