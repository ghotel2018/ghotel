function showWorkFlow(record) {
	/*var taskDefinitionKey="";
	if(!record['taskDefinitionKey']){
		taskDefinitionKey=record['taskDefinitionKey'];
	}*/
	var typeKey=record['typeKey'];
	//var key=taskDefinitionKey+record['typeKey'];
	if(typeKey=="100003"||typeKey=="100004"||typeKey=="100008"||typeKey=="100014" ||typeKey=="100017"||typeKey=="100020"||typeKey=="100026"||typeKey=="100023"){
		AproveEdit100003Info(record);
	}else if(typeKey=='100005'||typeKey=='100006'||typeKey=='100012'||typeKey=='100024'||typeKey=='100027'){
		Aprove100005Info(record);
	}else if(typeKey=='100001'||typeKey=='100002'){
		Aprove100001Info(record);
	}else if(typeKey=='100010'){
		Aprove100010Info(record);console.log(record);
	}else if(typeKey=='100011'){
		AproveEdit100011Info(record);//优惠券澳洲账户充值审批查看
	}else if(typeKey=='100007'){
		Aprove100007Info(record);
	}else if(typeKey=='100013'){
		Aprove100013Info(record);
	}else if(typeKey=='100016'){
		Aprove100016Info(record);
	}else if(typeKey=='100019'){
		AproveOverseasInfo(record);
	}else if(typeKey=='100022'||typeKey=='100025'){
		AproveCSQInfo(record);
	}
	
};
function todoFlow(record) {
	if(record==null){
		CMC.alertMessage("请选择记录！",'warn');
		return ;
	}
	var val=record['taskDefinitionKey']+record['typeKey'];
	if(val=='addI18nDeptAudit100001'){
		openAddI18nDeptAudit("国内生成优惠券审批");
	}else if(val=='addI18nDeptAudit100002'){
		openAddI18nDeptAudit("国际生成优惠券审批");
	}else if(val=='addI18nDeptAudit100005'){
		openAddI18nDeptAudit("国际优惠券发放审批");
	}else if(val=='addI18nDeptAudit100006'){
		openAddI18nDeptAudit("国内优惠券发放审批");
	}else if(val=='addI18nDeptAudit100012'){
		openAddI18nDeptAudit("澳洲优惠券发放审批");
	}else if(val=='AproveEdit100004'){
		openAddI18nDeptAudit("国际优惠券虚拟帐户充值审批");
	}else if(val=='AproveEdit100003'){
		openAddI18nDeptAudit("国内优惠券虚拟帐户充值审批");
	}else if(val=='AproveEdit100008'){
		openAddI18nDeptAudit("韩国优惠券虚拟帐户充值审批");
	}else if(val=='AproveEdit100011'){
		openAddI18nDeptAudit("澳洲优惠券虚拟帐户充值审批");
	}else if(val=='AproveEdit100017'){
		openAddI18nDeptAudit("新加坡优惠券虚拟帐户充值审批");
	}else if(val=='AproveEdit100020'){
		openAddI18nDeptAudit("英国优惠券虚拟帐户充值审批");
	}else if(val=='AproveEdit100026'){
		openAddI18nDeptAudit("国内次数券虚拟帐户充值审批");
	}else if(val=='AproveEdit100023'){
		openAddI18nDeptAudit("国内次数券虚拟帐户充值审批");
	}else if(val=='addI18nDeptAudit100010'){
		openAddI18nDeptAudit("澳洲生成优惠券审批");
	}else if(val=='addI18nDeptAudit100007'){
		openAddI18nDeptAudit("韩国生成优惠券审批");
	}else if(val=='addI18nDeptAudit100009'){
		openAddI18nDeptAudit("韩国优惠券发放审批");
	}else if(val=='AproveEdit100014'){
		openAddI18nDeptAudit("新西兰优惠券虚拟帐户充值审批");
	}else if(val=='addI18nDeptAudit100013'){
		openAddI18nDeptAudit("新西兰生成优惠券审批");
	}else if(val=='addI18nDeptAudit100015'){
		openAddI18nDeptAudit("新西兰优惠券发放审批");
	}else if(val=='addI18nDeptAudit100016'){
		openAddI18nDeptAudit("新加坡生成优惠券审批");
	}else if(val=='addI18nDeptAudit100018'){
		openAddI18nDeptAudit("新加坡优惠券发放审批");
	}else if(val=='addI18nDeptAudit100019'){
		openAddI18nDeptAudit("英国生成优惠券审批");
	}else if(val=='addI18nDeptAudit100021'){
		openAddI18nDeptAudit("英国优惠券发放审批");
	}else if(val=='addI18nDeptAudit100022'){
		openAddI18nDeptAudit("国内生成次数券审批");
	}else if(val=='addI18nDeptAudit100025'){
		openAddI18nDeptAudit("国际生成次数券审批");
	}else if(val=='addI18nDeptAudit100024'){
		openAddI18nDeptAudit("国内次数券发放审批");
	}else if(val=='addI18nDeptAudit100027'){
		openAddI18nDeptAudit("国际次数券发放审批");
	}
	
	/*if(val=='addI18nAdustNum100001'||val=='addI18nAdustNum100002'){
		openAddI18nDeptAudit("国内生成优惠券审批");
	}else if(val=='addI18nDeptAudit100001'||val=='addI18nDeptAudit100002'){
		openAddI18nDeptAudit("国内生成优惠券审批");
	}else if(val=='AproveEdit100003'||val=='AproveEdit100004'){
		AproveEdit100003();
	}else if(val=='AdustNum100003'||val=='AdustNum100004'){
		AdustNum100003();
	}else if(val=='addI18nAdustNum100006'||val=='addI18nAdustNum100005'){
		AdustNum100003();
	}else if(val=='addI18nDeptAudit100005'){
		openAddI18nDeptAudit("国际优惠券发放审批");
	}else if(val=='addI18nDeptAudit100006'){
		openAddI18nDeptAudit("国内优惠券发放审批");
	}*/
}