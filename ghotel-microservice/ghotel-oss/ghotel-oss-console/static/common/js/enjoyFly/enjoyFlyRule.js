/**
 * 优享飞
 */

var EnjoyFlyRuleList={
	searchTableRequired: true,
	menuId: "EnjoyFly",
	addUrl: 'authorized/enjoyFly/add',
	updateUrl: 'authorized/enjoyFly/update',
	deleteUrl: 'authorized/enjoyFly/delete',
	searchUrl: "authorized/enjoyFly/getAll",
	getUrl: "authorized/enjoyFly/get",
	exportUrl:"authorized/enjoyFly/export",
	importUrl:"authorized/enjoyFly/import",
	addProductUrl: "authorized/enjoyFly/getProductIdList",
	columns:[[
		{field: 'ruleId', title:'规则ID' , width: '18%' , align: 'center'},
		{field: 'depName', title:'出发地' , width: '17.5%' , align: 'center'},
		{field: 'fareBasis', title:'运价标识' , width: '17.5%' , align: 'center'},
		{field: 'subProductId', title:'子产品ID' , width: '17.5%' , align: 'center'},
		{field: 'isEnable', title:'状态' , width: '12%' , align: 'center',
			formatter : function(value){
				return value === 'Y' ? '生效' : '失效';
			}},
		{field: 'createTime', title:'创建时间' , width: '19%' , align: 'center'}

	]]
	/*,
	onDblClickRow: function(){
		$("#enjoyFlyRuleList_update").click();
	}*/
};
(function($){
	/**
	 * 重置
	 */
	$("#enjoyFlyRuleList_reset").click(function(){
		$("#searchForm ").form('clear');
		$("#searchForm #isEnable").find('option').eq(0)[0].selected = true;
		$("#searchForm input[name='start']").val('1');
		$("#searchForm input[name='end']").val('10');
	});

	$("#mainContent").on('click',".enjoyFlyRuleDetail",function(e){
		e.stopPropagation();
		var content = $(this).data('txt');
		$('#searchEnjoyFlyRuleusUseDesc').find('.UseDescContent').text(content);
		CMC.dialog('searchEnjoyFlyRuleusUseDesc','open');
	})
	/*$("input[name=startTime]").on('change',function(){
		var date = $(this).datebox("getValue");
		$("input[name=endTime]").datebox("setValue",val);
	});*/
	$("#searchCalendar").calendar()
	
	/**
	 * 弹出编辑窗口
	 */
	$("#enjoyFlyRuleList_update").click(function(){
		$("#updateForm").form('clear');
		var code = CMC.grid.datagrid("getSelected");
		if(!code){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		var font=$("#updateForm font");
		font.hide();

		CMC.request({
			url: EnjoyFlyRuleList.getUrl+"/"+ code["ruleId"],
			method: 'get',
			success: function(result){
				$("#updateForm").form("load",{
					'ruleId' : result.messageBody.bean['ruleId'],
					'depName' : result.messageBody.bean['depName'],
					'productName' : result.messageBody.bean['productName'],
					'productNameEn' : result.messageBody.bean['productNameEn'],
					'subProductId' : result.messageBody.bean['subProductId'],
					'subProductName' : result.messageBody.bean['subProductName'],
					'subProductNameEn' : result.messageBody.bean['subProductNameEn'],
					'packageId' : result.messageBody.bean['packageId'],
					'packageName' : result.messageBody.bean['packageName'],
					'packageNameEn' : result.messageBody.bean['packageNameEn'],
					'fareBasis' : result.messageBody.bean['fareBasis'],
					'useDesc' : result.messageBody.bean['useDesc'],
					'useDescEn' : result.messageBody.bean['useDescEn'],
					'isEnable' : result.messageBody.bean['isEnable']


				});

				$("#updateForm #productId").html('<option value="'+result.messageBody.bean['productIdBean'].type+'" selected="selected">'+result.messageBody.bean['productIdBean'].desc+'</option>')

				var isEnable = result.messageBody.bean['isEnable'];

				$("#updateForm :input").prop({disabled: true});

				if(isEnable === "Y"){
					$("#updateForm .enableRadio").prop({disabled: false});
					$("#submit_update").linkbutton({'disabled':false});
				}else{
					$("#submit_update").linkbutton({'disabled':true});
				}


				CMC.dialog('editEnjoyFlyRuleListDetail','open');
			}
		});
	});

	/**
	 *启用编辑
	 */
	$("#submit_edit").click(function(event) {
		$("#updateForm font").show();
		$("#submit_update").removeAttr('disabled');
		$("#submit_update").linkbutton({'disabled':false});
		$("#updateForm :input").removeAttr('disabled');
		$("#updateForm #ruleid").prop({disabled: true});
	});


	/**
	 *提交更新
	 */
	$("#submit_update").linkbutton({'onClick':function(){
		var $form = $("#updateForm");
		var isValid = $form.form("validate");
		var  data = {},isEnable;
		if (isValid) {
			isEnable =  $form.find('.enableRadio:checked').val()
			data.isEnable= isEnable;
			data.ruleId = $form.find("#ruleId").val();
			CMC.request({
				url: EnjoyFlyRuleList.updateUrl,
				method: 'POST',
				data : data,
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
				}
			});
		}
	}
	});

	/**
	 * 弹出添加窗口
	 */
	$("#enjoyFlyRuleList_add").click(function(){
		$("#addForm").form('clear');
		CMC.dialog('addEnjoyFlyRuleListDetail','open');
		var resOption = '';
		CMC.request({
			url : EnjoyFlyRuleList.addProductUrl,
			method: 'POST',

			success : function(result){
				if(result.messageBody && result.messageBody.length >0){
					for(var i = 0;i<result.messageBody.length;i++){
						var res = result.messageBody[i];
						resOption += '<option value="'+res.type+'" >'+res.desc+'</option>';
					}
					$("#addForm #productId").html(resOption);
					$("#addForm #productId option")[0].selected = true;
				}
			}
		});


	});

	/**
	 * 添加X产品规则提交
	 */
	$("#submit_add").click(function(){
		$("#addForm").form("enableValidation");
		var isValid = $("#addForm").form("validate");
		if (isValid) {
			var data=$("#addForm").serialize();
			CMC.request({
				url: EnjoyFlyRuleList.addUrl,
				method: 'POST',
				data : $("#addForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('addEnjoyFlyRuleListDetail','close');
					$("#addForm").form("clear");
				}
			});
		}
	});

	/**
	 * 弹出删除窗口
	 */
	$("#enjoyFlyRuleList_delete").linkbutton({
		'onClick':function(){
			var record = CMC.grid.datagrid("getSelected");
			if(!record){
				CMC.alertMessage("请先选中一条记录！","warning");
				return;
			}
			CMC.confirm("确定删除该条规则信息?", function(r){
				if(r){
					CMC.request({
						url: EnjoyFlyRuleList.deleteUrl,
						method: 'POST',
						data : record,
						success: function(response){
							CMC.alertMessage(response.messageBody,'info');
							CMC.search();
						}
					});
				}
			});
		}
	});

	/**
	 * 打开导入窗口
	 */
	$("#enjoyFlyRuleList_import").linkbutton({
		'onClick':function(){
			$("#enjoyFlyRuleListImportForm").form('clear');
			CMC.dialog('enjoyFlyRuleListImportDetail','open');
		}
	});

	/**
	 * 文档模板
	 */
	$("#enjoyFlyRuleTemplate").click(function(event) {
		window.open(encodeURI("/cmc/download/EnjoyFlyRuleTemplate.xlsx"));
	});

	/**
	 * 导入Excel
	 */
	$("#enjoyFlyRuleListInfo_import").linkbutton({
		'onClick':function(){
			var val=$("#enjoyFlyRuleListInfo").val();
			if(val==""){
				CMC.alertMessage("你没有选择文件，请先选择要上传的文件！", 'info');
				return;
			}
			//判断文件后缀
			var fileUrl=$("#enjoyFlyRuleListInfo").val();
			if(fileUrl && fileUrl != "" && (fileUrl.indexOf("xls")==-1 && fileUrl.indexOf("xlsx")==-1 && fileUrl.indexOf("csv")==-1) ){
				CMC.alertMessage("请选择excel文件。",'warn');
				return ;
			}
			CMC.confirm("是否确认导入文件?",function(r){
				if(r){
					CMC.showProcessBox();
					CMC.fileUpload({
						url: EnjoyFlyRuleList.importUrl,
						type: "POST",
						dataType: "json",
						fileElementId:  "enjoyFlyRuleListInfoFile",
						// data: $("#airPortsListImportForm").form().serialize(),
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
		}
	});

})(jQuery);

$(document).ready(function(){
	CMC.init(EnjoyFlyRuleList);
});

$.extend($.fn.validatebox.defaults.rules, {
	threeCodeValid: {
		validator: function(value, param){
			var regEx=/^[A-Z]{3}$/;
			return regEx.test(value);
		},
		message: '请输入大写机场三字码'
	},
	intValid : {
		validator : function(value){
			return /^[0-9]{1,}$/ig.test(value);
		},
		message : '请输入正确的子套餐ID'
	},
	twoCodeValid :{
		validator: function(value, param){
			var regEx=/^[A-Z]{2}$/;
			return regEx.test(value);
		},
		message: '请输入大写国家二字码'
	},
	onlyEnglish : {
		validator : function(value){
			var _reg = /[\u4E00-\u9fA5]/ig;
			return !(_reg.test(value));
		},
		message : '请输入英文字符'
	},
	equalDate : {
		validator : function(value,param){
			var startDate = $("#startTime").datebox("getValue");
			return startDate <= value
		},
		message : '开始时间必须小于结束时间'
	}
});










