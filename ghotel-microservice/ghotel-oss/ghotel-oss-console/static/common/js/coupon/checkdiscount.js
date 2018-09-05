var sum;
var pages; 
var leng=5;
var count;
var start;
var end;
var mxml;
var all=1;
var xslurl;

$(function(){
	$("INPUT[name='report']:checkbox").each(function(){
		$(this).bind("click", function(){
			if($(this).attr("checked")){
				$(this).attr("checked", false);
			}else{
				$(this).attr("checked", true);
			}
		});
	});
});

/*--优惠券excel*/
function submitReport(){
	//debugger;
	var activeDate_value = $("#activeDate").val();
	var discountType = $("#discountType").val();//优惠卷类型
	var sUDate = $("#startUserDate").val();
	var eDDate = $("#endUserDate").val();
	var sFDate = $("#startFlightDate").val();
	var eFDate = $("#endFlightDate").val();
	var fgqd = $("#fgqd").val();
	var discountPici = $("#discountPici").val();
	var flag=false;
	if(sUDate!=null && sUDate!=""){
		if(eDDate==null || eDDate=="") {
			alert("出票结束日期不能为空");
			return false;
		} else if(!transdated(sUDate)){
			return false;
		} else if(!transdated(eDDate)) {
			return false;
		} else if(!checkDated(sUDate,eDDate)){
			alert("开始日期不能晚于结束日期");
			return false;
		} else {
			flag=true;
		}
		
	}
	if(sFDate!=null && sFDate!=""){
		if(eFDate==null || eFDate=="") {
		    alert("航班结束日期不能为空");
		    return false;
		} else if(!transdated(sFDate)){
			return false;
		} else if(!transdated(eFDate)){
			return false;
		} else if(!checkDated(sFDate,eFDate)){
			alert("开始日期不能晚于结束日期");
			return false;
		} else {
			flag=true;
		}
		
	}
	if(sFDate==null || sFDate==""){
		if(eFDate.value==null||eFDate.value==""){
		} else  {
			alert("航班开始日期不能为空");
			return false;
		}
	}
	if(sUDate==null || sUDate=="") {
		if(eDDate==null||eDDate=="") {
		} else {
			alert("出票开始日期不能为空");
			return false;
		}
	}
	if(activeDate_value!=null && activeDate_value!="") {
		flag=true;
	}
	if(fgqd!=null && fgqd!="" && fgqd!="0") {
		flag=true;
	}
	if(discountType!=null && discountType!=""){
		flag = true;
	}
	if(discountPici!=null && discountPici!=""){
		flag = true;
	}
	if(flag){
		$("#divrepo1").hide();
		$("#divrepo2").show();
		$("INPUT[name='report']:checkbox").prop("checked", false).attr("checked", false);
	} else {
		alert("请输入一个或多个查询条件");
	}
}

function selectAll() {  
	$("INPUT[name='report']:checkbox").prop("checked", true).attr("checked", true);
}  

function closeme(){
	$("#divrepo1").show();
	$("#divrepo2").hide();
}

function excelReport(){
	var reportDate_value = checkreport(); 
	var activeDate_value = $("#activeDate").val();
	if(reportDate_value=="") {
		alert("请至少添加一个excel列名");
		return false;
	} else {
		$("#divrepo1").show();
		$("#divrepo2").hide();
		location.href="/CMC/exportReport.do?startUserDate="+$("#startUserDate").val() + "&endUserDate="+$("#endUserDate").val() + 
			 		 "&startFlightDate="+$("#startFlightDate").val() +  "&endFlightDate="+$("#endFlightDate").val()+
			 		 "&channeli="+$("#fgqd").val() + "&status=" + activeDate_value +"&discountType="+ $("#discountType").val() + "&reportDate_value=" + reportDate_value+"&discountPici="+ $("#discountPici").val();
	}
}

//验证excel的列名
function checkreport(){
	var value = "";
	var obj = $("INPUT[name='report']:checkbox");
	for(var i=0;i<obj.length;i++){
		if(obj.eq(i).attr("checked")=="checked"){
			value += obj.eq(i).val()+",";
		}
	}
	if(value!=""){
		return value.substring(0, value.lastIndexOf(","));
	}else{
		return "";
	}
}


/*------------------------------实验
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

function transdated(value){
	if(value!=""){
		var c=value.indexOf("/");
		if(c!=-1){
			var re = /\//g;
			value = value.replace(re, "-");
		}
		var dates=value.split("-");
		var d=value.indexOf(".");
		if(d!=-1){
			var re = /\./g;
			value = value.replace(re, "-");
		}
		var dates=value.split("-");
		if(dates.length==3){
			if(dates[1].length==1) dates[1]="0"+dates[1];
			if(dates[2].length==1) dates[2]="0"+dates[2];
		   	value=dates[0]+"-"+dates[1]+"-"+dates[2];	
		}
		if(isdate(value)){
			return true;
		}else{
			alert("输入的日期格式错误，请检查重新输入");
			return false;
		}
	}
	return true;
}


function checkDated(startDate , endDate){
	var re = /-/g;
	var ticketSDate = startDate;	
	var ticketEDate = endDate;
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