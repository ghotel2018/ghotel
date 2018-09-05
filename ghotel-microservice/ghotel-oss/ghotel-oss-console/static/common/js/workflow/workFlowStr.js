function tanfrom(record,index){
    var jsonStr=record['applyParameter'];
    var jsonObj = JSON.parse(jsonStr);
    //console.log(jsonObj);
    if(record.typeKey=='100001'||record.typeKey=='100002'||record.typeKey=='100007'||record.typeKey=='100010'||record.typeKey=='100013'||record.typeKey=='100016'||record.typeKey=='100019'||record.typeKey=='100022'||record.typeKey=='100025'){
        var name=jsonObj.discountType;
        var info="";
        var currency="元";
        var faceValue="";
        if(jsonObj.discountType==0){
        	name="国内收入现金优惠券"
        }else if(jsonObj.discountType==1){
            name="国内运价优惠券"
        }else if(jsonObj.discountType==2){
            name="国内费用现金优惠券"
        }/*else if(jsonObj.discountType==3){
            name="国际营销活动优惠券"
        }else if(jsonObj.discountType==4){
            name="国际合作活动优惠券"
        }*/else if(jsonObj.discountType==3){
            name="国际虚拟资金优惠券"
        }else if(jsonObj.discountType==4){
            name="国际自有资金优惠券"
        }else if(jsonObj.discountType==5||jsonObj.discountType=='5'){
        	name='国内里程优惠券';
	    }else if(jsonObj.discountType==6||jsonObj.discountType=='6'){
	    	name='国内旅客服务优惠券';
	    }/*else if(jsonObj.discountType==7||jsonObj.discountType=='7'){
	    	name='国际里程优惠券';
	    }else if(jsonObj.discountType==8||jsonObj.discountType=='8'){
	    	name='国际旅客服务优惠券';
	    }*/else if(jsonObj.discountType==9||jsonObj.discountType=='9'){
	    	currency="KRW";
	    	name='韩国自有资金优惠券';
	    }else if(jsonObj.discountType==10||jsonObj.discountType=='10'){
	    	currency="KRW";
	    	name='韩国虚拟资金优惠券';
	    }else if(jsonObj.discountType==11||jsonObj.discountType=='11'){
	    	currency="AUD";
	    	name='澳洲自有资金优惠券';
	    }else if(jsonObj.discountType==12||jsonObj.discountType=='12'){
	    	currency="AUD";
	    	name='澳洲虚拟资金优惠券';
	    }else if(jsonObj.discountType==13||jsonObj.discountType=='13'){
	    	currency="NZD";
	    	name='新西兰自有资金优惠券';
	    }else if(jsonObj.discountType==14||jsonObj.discountType=='14'){
	    	currency="NZD";
	    	name='新西兰虚拟资金优惠券';
	    }else if(jsonObj.discountType==15||jsonObj.discountType=='15'){
	    	currency="SGD";
	    	name='新加坡自有资金优惠券';
	    }else if(jsonObj.discountType==16||jsonObj.discountType=='16'){
	    	currency="SGD";
	    	name='新加坡虚拟资金优惠券';
	    }else if(jsonObj.discountType==17||jsonObj.discountType=='17'){
	    	currency="GBP";
	    	name='英国自有资金优惠券';
	    }else if(jsonObj.discountType==18||jsonObj.discountType=='18'){
	    	currency="GBP";
	    	name='英国虚拟资金优惠券';
	    }else if(jsonObj.discountType==19||jsonObj.discountType=='19'){
	    	name='国内合作活动次数券';
	    }else if(jsonObj.discountType==20||jsonObj.discountType=='20'){
	    	name='国内营销活动次数券';
	    }else if(jsonObj.discountType==21||jsonObj.discountType=='21'){
	    	name='国际合作活动次数券';
	    }else if(jsonObj.discountType==22||jsonObj.discountType=='22'){
	    	name='国际营销活动次数券';
	    }else if(jsonObj.discountType==23||jsonObj.discountType=='23'){
	    	name='国内合作活动协议价次数券';
	    }else if(jsonObj.discountType==24||jsonObj.discountType=='24'){
	    	name='国内营销活动协议价次数券';
	    }else if(jsonObj.discountType==25||jsonObj.discountType=='25'){
	    	name='国际合作活动协议价次数券';
	    }else if(jsonObj.discountType==26||jsonObj.discountType=='26'){
	    	name='国际营销活动协议价次数券';
	    }
        if(jsonObj.discountType==19||jsonObj.discountType=='19'||
        	jsonObj.discountType==20||jsonObj.discountType=='20'||
        	jsonObj.discountType==21||jsonObj.discountType=='21'||
        	jsonObj.discountType==22||jsonObj.discountType=='22'||
        	jsonObj.discountType==23||jsonObj.discountType=='23'||
        	jsonObj.discountType==24||jsonObj.discountType=='24'||
        	jsonObj.discountType==25||jsonObj.discountType=='25'||
        	jsonObj.discountType==26||jsonObj.discountType=='26'){
        	faceValue=jsonObj.maxVoucherfaceValue+currency+"最高抵用面额";
        }else{
        	faceValue=jsonObj.faceValue+currency+"面值";
        }
        info= "<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详情 </a>";
        var groupId=record.businessKey;
        if(groupId){
            groupId="批次号"+groupId+"共";
        }else{
            groupId="";
        }
        return  "生成"+groupId+jsonObj.codeCount+"张"+faceValue+"渠道code是"+jsonObj.createChannel+"的"+name+info;
        //return "生成张元面值国内优惠券"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else if(record.typeKey=='100004'){
        return "充值序号"+jsonObj.cmcPaymentId+"优惠券国际账户充值"+jsonObj.operateValue+"元"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else if(record.typeKey=='100003'){
        return "充值序号"+jsonObj.cmcPaymentId+"优惠券国内账户充值"+jsonObj.operateValue+"元"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else if(record.typeKey=='100008'){
        return "充值序号"+jsonObj.cmcPaymentId+"优惠券韩国账户充值"+jsonObj.operateValue+"KRW"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else if(record.typeKey=='100026'){
        return "充值序号"+jsonObj.cmcPaymentId+"国际次数券账户充值"+jsonObj.operateValue+"CNY"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else if(record.typeKey=='100023'){
        return "充值序号"+jsonObj.cmcPaymentId+"国内次数券账户充值"+jsonObj.operateValue+"CNY"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else if(record.typeKey=='100006'||record.typeKey=='100005'){
        var name="";
        if(jsonObj.discountType==3||jsonObj.discountType=='3'){
	    	name='国际虚拟资金优惠券';
	    }else if(jsonObj.discountType==4||jsonObj.discountType=='4'){
	    	name='国际自有资金优惠券';
	    }else if(jsonObj.discountType==0||jsonObj.discountType=='0'){
	    	name='国内收入现金优惠券';
	    }else if(jsonObj.discountType==1||jsonObj.discountType=='1'){
	    	name='国内运价优惠券';
	    }else if(jsonObj.discountType==2||jsonObj.discountType=='2'){
	    	name='国内费用现金优惠券';
	    }
        
        var channelId=jsonObj.channelId;
        if(!channelId){
            channelId="";
        }
        var type=jsonObj.type
        var unbind=types(type);
        return jsonObj.groupId+"批次号发放"+jsonObj.groupCount+"张"+jsonObj.faceValue+"元 面值渠道ID是"+channelId+"的"+name +"  "+unbind;
        // return ""+jsonObj.groupId+"批次""张面值"+jsonObj.faceValue+"优惠券发放"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else if(record.typeKey=='100009'){
        var name="";
        if(jsonObj.discountType==9||jsonObj.discountType=='9'){
	    	name='韩国自有资金优惠券';
	    }else if(jsonObj.discountType==10||jsonObj.discountType=='10'){
	    	name='韩国虚拟资金优惠券';
	    }
        var channelId=jsonObj.channelId;
        if(!channelId){
            channelId="";
        }
        var type=jsonObj.type
        console.log(type)
        var unbind=types(type);
        return jsonObj.groupId+"批次号发放"+jsonObj.groupCount+"张"+jsonObj.faceValue+"KRW 面值渠道ID是"+channelId+"的"+name +"  "+unbind;
        // return ""+jsonObj.groupId+"批次""张面值"+jsonObj.faceValue+"优惠券发放"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else if(record.typeKey=='100021'){
        var name="";
        if(jsonObj.discountType==17||jsonObj.discountType=='17'){
	    	name='英国自有资金优惠券';
	    }else if(jsonObj.discountType==18||jsonObj.discountType=='18'){
	    	name='韩国虚拟资金优惠券';
	    }
        var channelId=jsonObj.channelId;
        if(!channelId){
            channelId="";
        }
        var type=jsonObj.type
        console.log(type)
        var unbind=types(type);
        return jsonObj.groupId+"批次号发放"+jsonObj.groupCount+"张"+jsonObj.faceValue+"GBP 面值渠道ID是"+channelId+"的"+name +"  "+unbind;
        // return ""+jsonObj.groupId+"批次""张面值"+jsonObj.faceValue+"优惠券发放"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else if( record.typeKey=='100012'){
    	var name=""
    	if(jsonObj.discountType==11||jsonObj.discountType=='11'){
	    	name='澳洲自有资金优惠券';
	    }else if(jsonObj.discountType==12||jsonObj.discountType=='12'){
	    	name='澳洲虚拟资金优惠券';
	    }

        var channelId=jsonObj.channelId;
        if(!channelId){
            channelId="";
        }
        var type=jsonObj.type
        console.log(type)
        var unbind=types(type);
        return jsonObj.groupId+"批次号发放"+jsonObj.groupCount+"张"+jsonObj.faceValue+"AUD 面值渠道Code是"+channelId+"的"+name +"  "+unbind;
        // return ""+jsonObj.groupId+"批次""张面值"+jsonObj.faceValue+"优惠券发放"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else if( record.typeKey=='100018'){
    	var name=""
    	if(jsonObj.discountType==15||jsonObj.discountType=='15'){
	    	name='新加坡自有资金优惠券';
	    }else if(jsonObj.discountType==16||jsonObj.discountType=='16'){
	    	name='新加坡虚拟资金优惠券';
	    }

        var channelId=jsonObj.channelId;
        if(!channelId){
            channelId="";
        }
        var type=jsonObj.type
        console.log(type)
        var unbind=types(type);
        return jsonObj.groupId+"批次号发放"+jsonObj.groupCount+"张"+jsonObj.faceValue+"SGD 面值渠道Code是"+channelId+"的"+name +"  "+unbind;
        // return ""+jsonObj.groupId+"批次""张面值"+jsonObj.faceValue+"优惠券发放"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else if( record.typeKey=='100024'){
    	var name=""
    	if(jsonObj.discountType==19||jsonObj.discountType=='19'){
	    	name='国内合作活动次数券';
	    }else if(jsonObj.discountType==20||jsonObj.discountType=='20'){
	    	name='国内营销活动次数券';
	    }else if(jsonObj.discountType==23||jsonObj.discountType=='23'){
	    	name='国内合作活动协议价次数券';
	    }else if(jsonObj.discountType==24||jsonObj.discountType=='24'){
	    	name='国内营销活动协议价次数券';
	    }

        var channelId=jsonObj.channelId;
        if(!channelId){
            channelId="";
        }
        var type=jsonObj.type
        console.log(type)
        var unbind=types(type);
        return jsonObj.groupId+"批次号发放"+jsonObj.groupCount+"张"+jsonObj.faceValue+"元 最高抵用面额渠道Code是"+channelId+"的"+name +"  "+unbind;
        // return ""+jsonObj.groupId+"批次""张面值"+jsonObj.faceValue+"优惠券发放"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else if( record.typeKey=='100027'){
    	var name=""
    	if(jsonObj.discountType==21||jsonObj.discountType=='21'){
	    	name='国际合作活动次数券';
	    }else if(jsonObj.discountType==22||jsonObj.discountType=='22'){
	    	name='国际营销活动次数券';
	    }else if(jsonObj.discountType==25||jsonObj.discountType=='25'){
	    	name='国际合作活动协议价次数券';
	    }else if(jsonObj.discountType==26||jsonObj.discountType=='26'){
	    	name='国际营销活动协议价次数券';
	    }

        var channelId=jsonObj.channelId;
        if(!channelId){
            channelId="";
        }
        var type=jsonObj.type
        console.log(type)
        var unbind=types(type);
        return jsonObj.groupId+"批次号发放"+jsonObj.groupCount+"张"+jsonObj.faceValue+"元 最高抵用面额渠道Code是"+channelId+"的"+name +"  "+unbind;
        // return ""+jsonObj.groupId+"批次""张面值"+jsonObj.faceValue+"优惠券发放"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else if(record.typeKey=='100011'){
        return "充值序号"+jsonObj.cmcPaymentId+"优惠券澳洲账户充值"+jsonObj.operateValue+"AUD"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else if(record.typeKey=='100015'){
        var name="";
        if(jsonObj.discountType==13||jsonObj.discountType=='13'){
	    	name='新西兰自有资金优惠券';
	    }else if(jsonObj.discountType==14||jsonObj.discountType=='14'){
	    	name='新西兰虚拟资金优惠券';
	    }
        var channelId=jsonObj.channelId;
        if(!channelId){
            channelId="";
        }
        var type=jsonObj.type
        var unbind=types(type);
        return jsonObj.groupId+"批次号发放"+jsonObj.groupCount+"张"+jsonObj.faceValue+"NZD 面值渠道ID是"+channelId+"的"+name +"  "+unbind;
        // return ""+jsonObj.groupId+"批次""张面值"+jsonObj.faceValue+"优惠券发放"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else if(record.typeKey=='100014'){
        return "充值序号"+jsonObj.cmcPaymentId+"优惠券新西兰账户充值"+jsonObj.operateValue+"NZD"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else if(record.typeKey=='100017'){
        return "充值序号"+jsonObj.cmcPaymentId+"优惠券新加坡账户充值"+jsonObj.operateValue+"SGD"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else if(record.typeKey=='100020'){
        return "充值序号"+jsonObj.cmcPaymentId+"优惠券英国账户充值"+jsonObj.operateValue+"GBP"+"<a href='javascript:void(0)' class='easyui-linkbutton'  onclick='Workflow.showWorkFlow("+index+")' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;详细 </a>";
    }else{
        return "未知数据";
    }
}

function types(type){
    var arry = type.split(",");
    var unbind="";
    console.log(type);
    var arrys = repeat(arry);
    for(var i=0;i<arrys.length;i++){
        if(arrys[i]==0){
        	if(unbind==""){
        		unbind="绑定会员号";
        	}else{
        		unbind=unbind+",绑定会员号";
        	}
        }else if(arrys[i]==2){
            if(unbind==""){
        		unbind="绑定手机号";
        	}else{
        		unbind=unbind+",绑定手机号";
        	}
        }else if(arrys[i]==3){
        	if(unbind==""){
        		unbind="绑定邮箱号";
        	}else{
        		unbind=unbind+",绑定邮箱号";
        	}
        }
    }
    if(unbind==""){
    	unbind="无绑定";
    }
    return unbind;
}

function repeat(arrys) {
	var res = [];
	var json = {};
	for (var i = 0; i < arrys.length; i++) {
		if (!json[arrys[i]]) {
			res.push(arrys[i]);
			json[arrys[i]] = 1;
		}
	}
	return res;
}

function showComment(index){
    var record =$('#'+CMC.paginationSetting.searchTable).datagrid('getData').rows[index];
   // var record = $('#workFlowTable').datagrid('getSelected');
    if(record==null){
        return ;
    }
    var val=record['taskDefinitionKey'];
    //暂时不向后台取 ，直接拿前台最终

  //  $("#openComment").dialog("open");
    CMC.dialog("openComment", "open");
    var html="";
   $ ("#openCommentText").empty();
  //  for(var i=0;i<data.length&&i<1;i++){
        html+='<tr><td align="right" width="60">审批人：</td><td >'+record['approveName']+'</td></tr><tr></tr>'+ '<td align="right">批注：</td><td >'+record['comment']+'</td></tr>'
   // }
    $("#openCommentText").append(html);

  /*  CMC.request({
        url : Workflow.getProcessComments,
        method : "POST",
        data :{"cmcApplyRecId":record['cmcApplyRecId'],"taskId":record['taskId'],
            "processInstanceId":record['processInstanceId']},
        success : function(result) {
            var data=result.messageBody;
            var html="";
            for(var i=0;i<data.length&&i<1;i++){
                html+='<tr><td align="right" width="40">审批人：</td><td >'+data[i].userName+'</td>'+ '<td align="right">批注：</td><td >'+data[i].comment+'</td></tr>'
            }
            $("#comment").append(html);
            *//*$("#addI18nDeptAudit").dialog('resize',{
             height: 4000
             });*//*
        }
    });*/

}