/**
 * @author goc
 * @Date 2016-06-16
 * @Desc 用户管理页面
 */

var GHotelPayment = {
	searchTableRequired : true,
	menuId : "GHotelPayment",
	addUrl : 'ghotel/payment/add',
	updateUrl : 'ghotel/payment/update',
	deleteUrl : "ghotel/payment/delete",
	searchUrl : "ghotel/payment/getAll",
	getUrl : "ghotel/payment/get/",
	columns : [ [ {
		field : 'payNo',
		title : '支付单号',
		width : '15%',
		align : 'center'
	}, {
		field : 'orderNo',
		title : '订单号',
		width : '15%',
		align : 'center'
	}, {
		field : 'payGateway',
		title : '支付网关',
		width : '10%',
		align : 'center'
	}, {
		field : 'status',
		title : '状态',
		width : '5%',
		align : 'center'
	}, {
		field : 'callBackTime',
		title : '回调时间',
		width : '10%',
		align : 'center'
	}, {
		field : 'callBackResult',
		title : '回调结果',
		width : '45%',
		align : 'center'
	} ] ]
};
(function($) {

	$("#ghotel-payment-button-add").click(
			function() {
				$("#ghotel-payment-detail-form").form("clear");
				$("#ghotel-payment-detail-form").form("disableValidation");
				CMC.dialog('ghotel-payment-detail-div', 'open');
				$('#ghotel-payment-detail-div').dialog({
					title : '新增支付记录'
				}).dialog('open');
				$("#ghotel-payment-detail-div .ghotel-payment-submit-update")
						.parent().hide();
				$("#ghotel-payment-detail-div .ghotel-payment-submit-add")
						.parent().show();
			});

	$("#ghotel-payment-button-update")
			.click(
					function() {
						$(
								"#ghotel-payment-detail-div .ghotel-payment-submit-update")
								.parent().show();
						$(
								"#ghotel-payment-detail-div .ghotel-payment-submit-add")
								.parent().hide();

						$("#ghotel-payment-detail-form").form(
								"disableValidation");
						$("#ghotel-payment-detail-form").form("clear");
						var record = CMC.grid.datagrid("getSelected");
						if (!record) {
							CMC.alertMessage("请先选中一条记录！", "warning");
							return;

						}
						CMC
								.request({
									url : GHotelPayment.getUrl + record["id"],
									method : 'get',
									success : function(result) {
										$("#ghotel-payment-detail-form")
												.form(
														"load",
														{
															'id' : result.messageBody['id'],
															'payNo' : result.messageBody['payNo'],
															'orderNo' : result.messageBody['orderNo'],
															'payGateway' : result.messageBody['payGateway'],
															'status' : result.messageBody['status'],
															'callBackTime' : result.messageBody['callBackTime'],
															'callBackResult' : result.messageBody['callBackResult']
														});

										$('#ghotel-payment-detail-div').dialog(
												{
													title : '修改支付记录'
												}).dialog('open');
									}
								});
					});

	$('.ghotel-payment-submit-update')
			.click(
					function() {
						$("#ghotel-payment-detail-form").form(
								"enableValidation");
						var isValid = $("#ghotel-payment-detail-form").form(
								"validate");
						if (isValid) {
							var data = GHotelPayment
									.getFormContent($("#ghotel-payment-detail-form"));
							CMC
									.request({
										url : GHotelPayment.updateUrl,
										method : 'POST',
										contentType : "application/json; charset=utf-8",
										data : JSON.stringify(data),
										success : function(result) {
											CMC.alertMessage(
													result.messageBody, 'info');
											CMC
													.dialog(
															'ghotel-payment-detail-div',
															'close');
											CMC.search();

											$("#ghotel-payment-detail-form")
													.form("clear");
										}
									});
						}
					});

	$('.ghotel-payment-submit-add')
			.click(
					function() {

						$("#ghotel-payment-detail-form").form(
								"enableValidation");
						var isValid = $("#ghotel-payment-detail-form").form(
								"validate");
						if (isValid) {
							var data = GHotelPayment
									.getFormContent($("#ghotel-payment-detail-form"));
							data['id'] = null;
							CMC
									.request({
										url : GHotelPayment.addUrl,
										method : 'POST',
										contentType : "application/json; charset=utf-8",
										data : JSON.stringify(data),
										success : function(result) {
											CMC.alertMessage(
													result.messageBody, 'info');
											CMC.search();
											$(
													'#ghotel-payment-detail-div .delete')
													.click();
											CMC
													.dialog(
															'ghotel-payment-detail-div',
															'close');
											$("#ghotel-payment-detail-form")
													.form("clear");
										}
									});
						}
					});

	$("#ghotel-payment-button-delete").click(function() {

		var record = CMC.grid.datagrid("getSelected");
		if (!record) {
			CMC.alertMessage("请先选中一条记录！", "warning");
			return;

		} else {
			CMC.request({
				url : GHotelPayment.deleteUrl,
				method : 'POST',
				contentType : "application/json; charset=utf-8",
				data : JSON.stringify(record),
				success : function(response) {
					CMC.alertMessage(response.messageBody, 'info');
					CMC.search();
				}
			});
		}

	});

	GHotelPayment.init = function() {
		$("#ghotel-payment-detail-div").dialog({
			onClose : function() {
				console.log($('#ghotel-payment-detail-div .delete'));
				$('#ghotel-payment-detail-div .delete').each(function(i, e) {
					console.log(e);
					$(e).click();
				})
			}
		})

	}
	GHotelPayment.getFormContent = function(form) {
		var o = {};
		var a = $(form).serializeArray();
		$.each(a, function() {
			var name = this.name;
			var value = this.value;
			if (name.indexOf(".") > 0) {
				var names = name.split('.');
				if (o[names[0]] == undefined) {
					o[names[0]] = {};
				}
				o[names[0]][names[1]] = value;
			} else {
				if (o[name] !== undefined) {
					if (!o[name].push) {
						o[name] = [ o[name] ];
					}
					o[name].push(value || '');
				} else {
					o[name] = value || '';
				}
			}
		});
		return o;
	}
})(jQuery)

$(document).ready(function() {
	CMC.init(GHotelPayment);
});
