/**
 * @author goc
 * @Date 2016-06-16
 * @Desc 用户管理页面
 */

var GHotelUser = {
	searchTableRequired : true,
	menuId : "GHotelUser",
	addUrl : 'ghotel/user/add',
	updateUrl : 'ghotel/user/update',
	deleteUrl : "ghotel/user/delete",
	searchUrl : "ghotel/user/getAll",
	getUrl : "ghotel/user/get/",
	columns : [ [ {
		field : 'name',
		title : '姓名',
		width : '10%',
		align : 'center'
	}, {
		field : 'mainCertificate.number',
		title : '主要证件号',
		width : '20%',
		align : 'center',
		formatter : function(value, row) {
			return row.mainCertificate ? row.mainCertificate.number : "";
		}
	}, {
		field : 'mainContact.value',
		title : '主要联系方式',
		width : '15%',
		align : 'center',
		formatter : function(value, row) {
			return row.mainContact ? row.mainContact.value : "";
		}
	}, {
		field : 'userType',
		title : '用户类型',
		width : '5%',
		align : 'center'
	}, {
		field : 'weChatOpenId',
		title : '微信ID',
		width : '15%',
		align : 'center'
	}, {
		field : 'level',
		title : '会员级别',
		width : '5%',
		align : 'center'
	}, {
		field : 'joinMethod',
		title : '加入方式',
		width : '5%',
		align : 'center'
	}, {
		field : 'joinDate',
		title : '加入时间',
		width : '20%',
		align : 'center'
	}, {
		field : 'commonMeta.delFlag',
		title : '删除',
		width : '5%',
		align : 'center',
		formatter : function(value, row) {
			return row.commonMeta ? row.commonMeta.delFlag : "";
		}
	} ] ]
};
(function($) {

	$("#ghotel-user-button-add").click(
			function() {
				$("#ghotel-user-detail-form").form("clear");
				$("#ghotel-user-detail-form").form("disableValidation");
				$('#ghotel-user-detail-div').dialog({
					title : '新增订单记录'
				}).dialog('open');
				$("#ghotel-user-detail-div .ghotel-user-submit-update")
						.parent().hide();
				$("#ghotel-user-detail-div .ghotel-user-submit-add").parent()
						.show();
			});

	$("#ghotel-user-button-update")
			.click(
					function() {
						$("#ghotel-user-detail-div .ghotel-user-submit-update")
								.parent().show();
						$("#ghotel-user-detail-div .ghotel-user-submit-add")
								.parent().hide();

						$("#ghotel-user-detail-form").form("disableValidation");
						$("#ghotel-user-detail-form").form("clear");
						var record = CMC.grid.datagrid("getSelected");
						if (!record) {
							CMC.alertMessage("请先选中一条记录！", "warning");
							return;

						}
						CMC
								.request({
									url : GHotelUser.getUrl + record["id"],
									method : 'get',
									success : function(result) {
										$("#ghotel-user-detail-form")
												.form(
														"load",
														{
															'id' : result.messageBody['id'],
															'name' : result.messageBody['name'],
															'userType' : result.messageBody['userType'],
															'joinMethod' : result.messageBody['joinMethod'],
															'weChatOpenId' : result.messageBody['weChatOpenId'],
															'joinDate' : result.messageBody['joinDate'],
															'mainCertificate.type' : result.messageBody['mainCertificate'] ? result.messageBody['mainCertificate']['type']
																	: "",
															'mainCertificate.number' : result.messageBody['mainCertificate'] ? result.messageBody['mainCertificate']['number']
																	: "",
															'mainContact.type' : result.messageBody['mainContact'] ? result.messageBody['mainContact']['type']
																	: "",
															'mainContact.value' : result.messageBody['mainContact'] ? result.messageBody['mainContact']['value']
																	: "",
															'level' : result.messageBody['level']
														});

										if (result.messageBody['contacts']) {
											$
													.each(
															result.messageBody['contacts'],
															function(i, e) {
																GHotelUser
																		.addExtraInfo(
																				this,
																				$(
																						'#temple-extra-contact')
																						.html(),
																				$('#ghotel-user-detail-extracontact'),
																				e.type,
																				e.value);
															});
										}
										if (result.messageBody['certificates']) {
											$
													.each(
															result.messageBody['certificates'],
															function(i, e) {
																GHotelUser
																		.addExtraInfo(
																				this,
																				$(
																						'#temple-extra-cert')
																						.html(),
																				$('#ghotel-user-detail-extracert'),
																				e.type,
																				e.number);
															});
										}
										$('#ghotel-user-detail-div').dialog({
											title : '修改用户记录'
										}).dialog('open');
									}
								});
					});

	$('.ghotel-user-submit-update').click(
			function() {
				$("#ghotel-user-detail-form").form("enableValidation");
				var isValid = $("#ghotel-user-detail-form").form("validate");
				if (isValid) {
					var data = GHotelUser
							.getFormContent($("#ghotel-user-detail-form"));
					CMC.request({
						url : GHotelUser.updateUrl,
						method : 'POST',
						contentType : "application/json; charset=utf-8",
						data : JSON.stringify(data),
						success : function(result) {
							CMC.alertMessage(result.messageBody, 'info');
							CMC.dialog('ghotel-user-detail-div', 'close');
							CMC.search();

							$("#ghotel-user-detail-form").form("clear");
						}
					});
				}
			});

	$('.ghotel-user-submit-add').click(
			function() {

				$("#ghotel-user-detail-form").form("enableValidation");
				var isValid = $("#ghotel-user-detail-form").form("validate");
				if (isValid) {
					var data = GHotelUser
							.getFormContent($("#ghotel-user-detail-form"));
					data['id'] = null;
					CMC.request({
						url : GHotelUser.addUrl,
						method : 'POST',
						contentType : "application/json; charset=utf-8",
						data : JSON.stringify(data),
						success : function(result) {
							CMC.alertMessage(result.messageBody, 'info');
							CMC.search();
							$('#ghotel-user-detail-div .delete').click();
							CMC.dialog('ghotel-user-detail-div', 'close');
							$("#ghotel-user-detail-form").form("clear");
						}
					});
				}
			});

	$("#ghotel-user-button-delete").click(function() {

		var record = CMC.grid.datagrid("getSelected");
		if (!record) {
			CMC.alertMessage("请先选中一条记录！", "warning");
			return;

		} else {
			CMC.request({
				url : GHotelUser.deleteUrl,
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

	GHotelUser.init = function() {
		$('#ghotel-user-detail-div .extra-cert-info .add').click(
				function() {
					GHotelUser.addExtraInfo(this, $('#temple-extra-cert')
							.html(), $('#ghotel-user-detail-extracert'));
				});
		$('#ghotel-user-detail-div .extra-contact-info .add').click(
				function() {
					GHotelUser.addExtraInfo(this, $('#temple-extra-contact')
							.html(), $('#ghotel-user-detail-extracontact'));
				});
		$("#ghotel-user-detail-div").dialog({
			onClose : function() {
				console.log($('#ghotel-user-detail-div .delete'));
				$('#ghotel-user-detail-div .delete').each(function(i, e) {
					console.log(e);
					$(e).click();
				})
			}
		})

	}
	GHotelUser.addExtraInfo = function(obj, html, loc, selectVal, textVal) {
		var tr = $('<tr>');
		var td1 = $('<td>');
		var td2 = $('<td>');
		td2.html(html);
		td2.find('.delete').click(function() {
			$(this).parents('tr').remove();
		});
		tr.append(td1).append(td2);
		var text = td2.find('input').addClass('easyui-textbox');
		text.val(textVal);
		var cb = td2.find('select').combobox();
		cb.combobox('select', selectVal);
		$(loc).before(tr);

	}
	GHotelUser.getFormContent = function(form) {
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
		o['contacts'] = [];
		$(form).find('.extra-contact').each(function() {
			var contacts = {};
			contacts['type'] = $(this).find('select').combobox('getValue');
			contacts['value'] = $(this).find('.value').val();

			o['contacts'].push(contacts);
		});
		o['certificates'] = [];
		$(form).find('.extra-cert').each(function() {
			var certificates = {};
			certificates['type'] = $(this).find('select').combobox('getValue');
			certificates['number'] = $(this).find('.number').val();

			o['certificates'].push(certificates);
		});
		return o;
	}
})(jQuery)

$(document).ready(function() {
	CMC.init(GHotelUser);
});
