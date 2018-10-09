/**
 * @author goc
 * @Date 2016-06-16
 * @Desc 用户管理页面
 */

var GHotelAccount = {
	searchTableRequired : true,
	menuId : "GHotelAccount",
	addUrl : 'ghotel/account/add',
	updateUrl : 'ghotel/account/update',
	deleteUrl : "ghotel/account/delete",
	searchUrl : "ghotel/account/getAll",
	searchUnbindUserUrl : "ghotel/user/getUnbindUser",
	getUrl : "ghotel/account/get/",
	searchUserUrl : "ghotel/user/getAll",
	columns : [ [ {
		field : 'name',
		title : '登录名',
		width : '25%',
		align : 'center'
	}, {
		field : 'registertype',
		title : '注册类型',
		width : '25%',
		align : 'center'
	}, {
		field : 'status',
		title : '账号状态',
		width : '25%',
		align : 'center'
	}, {
		field : 'referee',
		title : '推荐人',
		width : '25%',
		align : 'center'
	} ] ],
	userColumns : [ [ {
		field : 'name',
		title : '姓名',
		width : '15%',
		align : 'center'
	}, {
		field : 'mainCertificate.number',
		title : '主要证件号',
		width : '25%',
		align : 'center',
		formatter : function(value, row) {
			return row.mainCertificate ? row.mainCertificate.number : "";
		}
	}, {
		field : 'mainContact.value',
		title : '主要联系方式',
		width : '25%',
		align : 'center',
		formatter : function(value, row) {
			return row.mainContact ? row.mainContact.value : "";
		}
	}, {
		field : 'weChatOpenId',
		title : '微信ID',
		width : '20%',
		align : 'center'
	}, {
		field : 'level',
		title : '级别',
		width : '10%',
		align : 'center'
	} ] ]
};
(function($) {

	$("#ghotel-account-button-add").click(function() {
		$("#ghotel-account-detail-form").form("clear");
		$("#ghotel-account-detail-form").form("disableValidation");
		$("#ghotel-account-detail-div .ghotel-account-submit-update").hide();
		$("#ghotel-account-detail-div .ghotel-account-submit-add").show();
		$("#ghotel-account-detail-div").dialog({
			title : '新增账号记录'
		}).dialog('open');
	});
	$("#button-remove-user").click(function() {
		var table = $("#bind-user-list");
		var rows = table.datagrid("getRows");
		var record = table.datagrid("getSelected");
		var rowIndex = table.datagrid("getRowIndex", record);
		if (!record) {
			CMC.alertMessage("请先选中用户记录！", "warn");
			return;
		} else {
			table.datagrid("deleteRow", rowIndex);
		}

	});
	$("#button-select-user").click(function() {
		var record = $("#table-bind-user").datagrid("getSelected");
		if (!record) {
			CMC.alertMessage("请先选中一条用户记录！", "warn");
		} else {
			$("#bind-user-list").datagrid('loadData', [ record ]);
			CMC.dialog("search-bind-user-dialog", 'close');
		}
	});
	$("#ghotel-account-button-update")
			.click(
					function() {
						$(
								"#ghotel-account-detail-div .ghotel-account-submit-update")
								.show();
						$(
								"#ghotel-account-detail-div .ghotel-account-submit-add")
								.hide();

						$("#ghotel-account-detail-form").form(
								"disableValidation");
						$("#ghotel-account-detail-form").form("clear");
						var record = CMC.grid.datagrid("getSelected");
						if (!record) {
							CMC.alertMessage("请先选中一条记录！", "warning");
							return;

						}
						CMC
								.request({
									url : GHotelAccount.getUrl + record["id"],
									method : 'get',
									success : function(result) {
										$("#ghotel-account-detail-form")
												.form(
														"load",
														{
															'id' : result.messageBody['id'],
															'name' : result.messageBody['name'],
															'password' : result.messageBody['password'],
															'registertype' : result.messageBody['registertype'],
															'status' : result.messageBody['status'],
															'referee' : result.messageBody['referee']
														});
										if (result.messageBody['associateUser']) {
											$("#bind-user-list")
													.datagrid(
															'loadData',
															[ result.messageBody['associateUser'] ]);
										}
										$("#ghotel-account-detail-div").dialog(
												{
													title : '修改账号记录'
												}).dialog('open');
									}
								});
					});

	$('.ghotel-account-submit-update')
			.click(
					function() {
						$("#ghotel-account-detail-form").form(
								"enableValidation");
						var isValid = $("#ghotel-account-detail-form").form(
								"validate");
						if (isValid) {
							var data = GHotelAccount
									.getFormContent($("#ghotel-account-detail-form"));
							CMC
									.request({
										url : GHotelAccount.updateUrl,
										method : 'POST',
										contentType : "application/json; charset=utf-8",
										data : JSON.stringify(data),
										success : function(result) {
											CMC.alertMessage(
													result.messageBody, 'info');
											CMC
													.dialog(
															'ghotel-account-detail-div',
															'close');
											CMC.search();

											$("#ghotel-account-detail-form")
													.form("clear");
										}
									});
						}
					});

	$('.ghotel-account-submit-add')
			.click(
					function() {

						$("#ghotel-account-detail-form").form(
								"enableValidation");
						var isValid = $("#ghotel-account-detail-form").form(
								"validate");
						if (isValid) {
							var data = GHotelAccount
									.getFormContent($("#ghotel-account-detail-form"));
							data['id'] = null;
							CMC
									.request({
										url : GHotelAccount.addUrl,
										method : 'POST',
										contentType : "application/json; charset=utf-8",
										data : JSON.stringify(data),
										success : function(result) {
											CMC.alertMessage(
													result.messageBody, 'info');
											CMC.search();
											$(
													'#ghotel-account-detail-div .delete')
													.click();
											CMC
													.dialog(
															'ghotel-account-detail-div',
															'close');
											$("#ghotel-account-detail-form")
													.form("clear");
										}
									});
						}
					});

	$("#ghotel-account-button-delete").click(function() {

		var record = CMC.grid.datagrid("getSelected");
		if (!record) {
			CMC.alertMessage("请先选中一条记录！", "warning");
			return;

		} else {
			CMC.request({
				url : GHotelAccount.deleteUrl,
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

	GHotelAccount.init = function() {
		$("#ghotel-account-detail-div").dialog({
			onClose : function() {
				$("#bind-user-list").datagrid('loadData', []);
			}
		})

		$("#bind-user-list").datagrid({
			singleSelect : true,
			pagination : true,
			columns : GHotelAccount.userColumns
		});
	}
	GHotelAccount.searchUser = function() {
		$("#table-bind-user").datagrid("loading");
		var options = $("#table-bind-user").datagrid('getPager').data(
				"pagination").options;
		var pageNum = options.pageNumber;
		var pageSize = options.pageSize
		CMC
				.request({
					url : GHotelAccount.searchUnbindUserUrl,
					data : $("#search-unbind-user-form").form().serialize()
							+ ("&start=" + ((pageNum - 1) * pageSize + 1)
									+ "&end=" + pageNum * pageSize),
					method : 'POST',
					success : function(response) {
						$("#table-bind-user").datagrid("loaded");
						$("#table-bind-user").datagrid("loadData",
								response.messageBody.list);
						$("#table-bind-user")
								.datagrid("getPager")
								.pagination(
										{
											total : response.messageBody.total,
											pageNumber : response.messageBody.num
													/ (response.messageBody.num
															- response.messageBody.start + 1)
										});
						var rows = $("#table-bind-user").datagrid("getRows");
						for (var i = 0; i < rows.length; i++) {
							$("#table-bind-user").datagrid(
									"refreshRow",
									$("#table-bind-user").datagrid(
											'getRowIndex', rows[i]));
						}

					}
				});
	}
	$("#button-search-user").click(function() {
		GHotelAccount.searchUser();
	});
	$("#button-bind-user")
			.click(
					function() {

						$("#table-bind-user")
								.datagrid(
										{
											singleSelect : true,
											pagination : true,
											columns : [ [
													{
														field : 'name',
														title : '姓名',
														width : '10%',
														align : 'center'
													},
													{
														field : 'mainCertificate.number',
														title : '主要证件号',
														width : '20%',
														align : 'center',
														formatter : function(
																value, row) {
															return row.mainCertificate ? row.mainCertificate.number
																	: "";
														}
													},
													{
														field : 'mainContact.value',
														title : '主要联系方式',
														width : '15%',
														align : 'center',
														formatter : function(
																value, row) {
															return row.mainContact ? row.mainContact.value
																	: "";
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
													} ] ]
										});
						$("#table-bind-user").datagrid("getPager").pagination({
							onSelectPage : function(pageNum, pageSize) {
								$("#search-unbind-user-form").form('load', {
									start : (pageNum - 1) * pageSize + 1,
									end : pageNum * pageSize
								});
								GHotelAccount.searchUser();
							}
						});
						CMC.dialog("search-bind-user-dialog", 'open');
						GHotelAccount.searchUser();
					});

	GHotelAccount.getFormContent = function(form) {
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

		var record = $("#bind-user-list").datagrid("getData").rows[0];
		if (record) {
			o['associateUser'] = record;
		}
		return o;
	}
})(jQuery)

$(document).ready(function() {
	CMC.init(GHotelAccount);
});
