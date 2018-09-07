/**
 * @author goc
 * @Date 2016-06-16
 * @Desc 资源管理页面
 */

var Resource = {
	searchTableRequired : true,
	columns : [ [ {
		field : 'resourceName',
		title : '资源名称',
		width : '20%',
		align : 'left'
	}, {
		field : 'module',
		title : '资源模块',
		width : '17%',
		align : 'center'
	}, {
		field : 'actionCode',
		title : '资源代码',
		width : '10%',
		align : 'center'
	}, {
		field : 'resourceUrl',
		title : '资源路径',
		width : '30%',
		align : 'left'
	}, {
		field : 'category',
		title : '资源分类',
		width : '10%',
		align : 'center'
	}, {
		field : 'resourceType',
		title : '访问类别',
		width : '10%',
		align : 'center'
	} ] ],
	menuId : 'Resource',
	searchUrl : 'authorized/resource/getAll',
	addUrl : "authorized/resource/add",
	updatedUrl : "authorized/resource/update",
	deleteUrl : "authorized/resource/delete",
	getUrl : "authorized/resource/get/",
	getAllModule : "authorized/resource/getConfig",
	addAllModule : "authorized/resource/addModule",
	loadMenuUrl : "authorized/resource/loadMenuConfig",
	updateMenuUrl : "authorized/resource/updateMenu",
	deleteMenuUrl : "authorized/resource/deleteMenu",
	addMenuUrl : "authorized/resource/addMenu",
	updateMenuOrderUrl : "authorized/resource/updateMenuOrder"
};
var initLoad = 0;
// 571 182
Resource.Menu = {
	config : {
		idField : 'id',
		treeField : 'text',
		editorHeight : 80,
		autoRowHeight : false,
		columns : [ [ {
			title : '菜单节点名称',
			field : 'text',
			width : 250,
			editor : 'text'
		}, {
			title : '排序',
			field : 'menuOrder',
			width : 30
		}, {
			title : '菜单范围路径',
			field : 'resource.resourceUrl',
			width : 450,
			align : 'left',
			formatter : function(value, row) {
				return row.resource ? row.resource.resourceUrl : "#";
			}
		} ] ],
		onContextMenu : function(e, row) {
			Resource.Menu.resetBtnVisibility();
			Resource.Menu.currentRow = row;
			var parentRow = $('#menutree').treegrid('getParent', row.id);
			if (row) {
				var level = row['level'];
				var order = row['menuOrder'];
				e.preventDefault();
				$('#menutree').treegrid('select', row.id);
				// 不能删除第一层的节点
				if (level == 1) {
					$("#DeleteSubMenuBtn").hide();
				}
				// 菜单最多只有3层
				if (level == 3) {
					$("#AddSubMenuBtn").hide();
				}

				// 当前节点是第一个儿节点时 隐藏上移按钮
				if (order == 1) {
					$("#upSubMenuBtn").hide();
				}
				// 当前节点是最后一个儿节点时 隐藏下移按钮
				if (parentRow) {
					var allChildrenNodes = $('#menutree').treegrid(
							'getChildren', parentRow.id);
					var brotherNodes = Resource.Menu.getBrotherNodes(
							allChildrenNodes, level);
					if (brotherNodes && order == brotherNodes.length) {
						$("#downSubMenuBtn").hide();
					}
				} else {
					// 第一层最后的子节点 隐藏下移菜单
					var data = $('#menutree').treegrid("getData");
					if (data && order == data.length) {
						$("#downSubMenuBtn").hide();
					}

				}
				$('#showMemu').menu('show', {
					left : e.pageX,
					top : e.pageY
				});
			}

		},
		onClickRow : function(row) {
			Resource.Menu.currentRow = row;
			Resource.Menu.parentRow = $('#menutree').treegrid('getParent',
					row.id);
		},
		onLoadSuccess : function(node, data) {
			if (initLoad == 0) {
				$('.datagrid-row').attr('height', '40px');
				for (var i = 0; data && data.rows && i < data.rows.length; i++) {
					$('#menutree')
							.treegrid(
									'collapseAll',
									$('#menutree').treegrid("find",
											data.rows[i]["id"]).target);
				}
			}

			initLoad++;

		}
	},
	currentRow : null,
	parentRow : null,
	appendWithResource : function() {
		var row = Resource.Menu.currentRow = row;
		CMC.dialog('searchResourceDialog', 'open');
		Resource.searchMenuResource();

	},
	removeit : function() {
		var row = Resource.Menu.currentRow;
		var chlidrenNodes = $('#menutree').treegrid('getChildren', row.id);
		if (chlidrenNodes && chlidrenNodes.length > 0) {
			CMC.alertMessage("请先删除子节点！");
			return;
		}
		CMC.confirm("你将会删除菜单，请确认是否继续?", function(r) {
			if (r) {
				Resource.Menu.deleteMenu();
			}
		});

	},
	expand : function() {
		var row = $('#menutree').treegrid('getSelected');
		$('#menutree').treegrid('expandAll');
	},
	collapse : function() {
		var row = Resource.Menu.currentRow;
		$('#menutree').treegrid('collapse');
	},
	loadMenu : function() {
		CMC.request({
			url : Resource.loadMenuUrl,
			method : 'GET',
			success : function(response) {
				$('#menutree').treegrid({
					data : {
						"total" : 7,
						"rows" : response.messageBody,
						"footer" : []
					}
				});
			}
		});

	},
	deleteMenu : function() {
		var row = Resource.Menu.currentRow;
		CMC.request({
			url : Resource.deleteMenuUrl,
			method : "POST",
			data : row,
			success : function(data) {
				var menuOrder = row['menuOrder'];
				var parentRow = $('#menutree').treegrid('getParent', row.id);
				var childRows = $('#menutree').treegrid('getChildren',
						parentRow.id);
				var brotherNodes = Resource.Menu.getBrotherNodes(childRows,
						row['level']);
				var submitRows = [];
				for (var i = 0; i < brotherNodes.length; i++) {
					if (brotherNodes[i]['menuOrder'] > menuOrder) {
						brotherNodes[i]['menuOrder']--;
						submitRows.push(brotherNodes[i]);
					}
				}
				if (submitRows.length > 0) {
					Resource.Menu.updateOrderRequest(submitRows);
				}
				$('#menutree').treegrid('remove', row.id);
				CMC.alertMessage(data.messageBody, 'info');
			}
		});
	},
	updateMenu : function() {
		var row = Resource.Menu.currentRow;
		CMC.request({
			url : Resource.updateMenuUrl,
			method : "POST",
			contentType : "application/json; charset=utf-8",
			data : JSON.stringify(row),
			success : function(data) {
				CMC.alertMessage(data.messageBody, 'info');
				Resource.Menu.loadMenu();
			}
		});

	},
	addMenu : function(submitData) {
		CMC.request({
			url : Resource.addMenuUrl,
			method : "POST",
			data : submitData,
			success : function(data) {
				CMC.alertMessage(data.messageBody, 'info');
				Resource.Menu.loadMenu();
			}
		});
	},
	searchMenu : function() {
		Resource.searchMenuResource();
	},
	selectMenu : function() {
		var menuRow = $("#memuSearchTable").datagrid("getSelected");
		var row = $('#menutree').treegrid('getSelected');
		if (!menuRow) {
			CMC.alertMessage('请选择一条菜单资源记录', 'warn');
			return;
		}
		var chlidrenNodes = $('#menutree').treegrid('getChildren', row.id);
		var brotherNodes = Resource.Menu.getBrotherNodes(chlidrenNodes,
				row['level'] + 1);
		var submitData = {
			text : menuRow['resourceName'],
			level : row['level'] + 1,
			parentId : row['id'],
			resourceId : menuRow['id'],
			resourceUrl : menuRow['resourceUrl'],
			menuOrder : (brotherNodes == null || brotherNodes.length == 0) ? 1
					: (brotherNodes.length + 1)
		};
		Resource.Menu.addMenu(submitData);

	},
	moveUpMenu : function() {
		var row = Resource.Menu.currentRow;
		var submitData = [];
		var level = row['level'];
		var order = row['menuOrder'];
		var data = $('#menutree').treegrid("getData");
		var parentRow = $('#menutree').treegrid('getParent', row.id);
		var allChildrenNodes = $('#menutree').treegrid('getChildren',
				parentRow.id);
		var brotherNodes = Resource.Menu.getBrotherNodes(allChildrenNodes,
				level);
		var currentIndex = Resource.Menu.getIndex(brotherNodes, row.id);
		brotherNodes[currentIndex]['menuOrder'] = order - 1;
		brotherNodes[currentIndex - 1]['menuOrder'] = order;
		brotherNodes.sort(function(a, b) {
			return a['menuOrder'] - b['menuOrder'];
		});
		Resource.Menu.updateOrderRequest(brotherNodes);
	},
	moveDownMenu : function() {
		var row = Resource.Menu.currentRow;
		var submitData = [];
		var level = row['level'];
		var order = row['menuOrder'];
		var parentRow = $('#menutree').treegrid('getParent', row.id);
		var allChildrenNodes = $('#menutree').treegrid('getChildren',
				parentRow.id);
		var brotherNodes = Resource.Menu.getBrotherNodes(allChildrenNodes,
				level);
		var currentIndex = Resource.Menu.getIndex(brotherNodes, row.id);
		var data = $('#menutree').treegrid("getData");
		brotherNodes[currentIndex]['menuOrder'] = order + 1;
		brotherNodes[currentIndex + 1]['menuOrder'] = order;
		brotherNodes.sort(function(a, b) {
			return a['menuOrder'] - b['menuOrder'];
		});
		Resource.Menu.updateOrderRequest(brotherNodes);

	},
	resetBtnVisibility : function() {
		$("#AddSubMenuBtn").show();
		$("#DeleteSubMenuBtn").show();
		$("#editSubMenuBtn").show();
		$("#saveSubMenuBtn").show();
		$("#upSubMenuBtn").show();
		$("#downSubMenuBtn").show();
	},
	getIndex : function(data, id) {
		var index = -1;
		if (data) {
			index = data.indexOf(id, 'id');
		}
		return index;
	},
	update : function() {
		var row = Resource.Menu.currentRow;
		$('#menutree').treegrid('beginEdit', row.id);
	},
	save : function() {
		var row = Resource.Menu.currentRow;
		$('#menutree').treegrid('endEdit', row.id);
		Resource.Menu.updateMenu();
	},
	appendWithoutResource : function() {
		var row = $('#menutree').treegrid('getSelected');
		var chlidrenNodes = $('#menutree').treegrid('getChildren', row.id);
		var brotherNodes = Resource.Menu.getBrotherNodes(chlidrenNodes,
				row['level'] + 1);
		var submitData = {
			text : '请输入菜单名称',
			level : row['level'] + 1,
			parentId : row['id'],
			resourceId : 0,
			resourceUrl : "#",
			menuOrder : (brotherNodes == null || brotherNodes.length == 0) ? 1
					: (brotherNodes.length + 1)
		};
		Resource.Menu.addMenu(submitData);
	},
	getBrotherNodes : function(array, level) {
		var brothers = [];
		for (var i = 0; array && i < array.length; i++) {
			if (array[i]['level'] == level) {
				brothers.push(array[i]);
			}
		}
		return brothers;
	},
	updateOrderRequest : function(array) {
		CMC.request({
			url : Resource.updateMenuOrderUrl,
			method : "POST",
			data : {
				params : JSON.stringify(array)
			},
			success : function(data) {
				Resource.Menu.loadMenu();
			}
		});
	},
	sortMenuArray : function(a, b) {
		return a - b;
	}

}

var toolbar;

(function($) {

	Resource.beforeUpdateBoxShow = function(id) {
		$("#updateForm").form("clear");
		$("#updateForm").form("disableValidation");
		var record = CMC.grid.datagrid("getSelected");
		if (record) {
			CMC.request({
				url : Resource.getUrl + record["id"],
				method : 'get',
				success : function(result) {
					$("#" + id).form("load", {
						'id' : result.messageBody['id'],
						'resourceUrl' : result.messageBody['resourceUrl'],
						'resourceDesc' : result.messageBody['resourceDesc'],
						'resourceName' : result.messageBody['resourceName'],
						'category' : result.messageBody['category'],
						'module' : result.messageBody['module'],
						'actionCode' : result.messageBody['actionCode'],
						'resourceType' : result.messageBody['resourceType']
					});
					CMC.dialog(id, 'open');
				}
			});
		} else {
			CMC.alertMessage("请先选中一条记录！", 'warning');
			return;
		}

	}

	Resource.beforeAddBoxShow = function(id) {
		$("#addForm").form("reset")
		CMC.dialog(id, 'open');
		$("#addForm").form("disableValidation");
	}

	Resource.submitAddForm = function() {
		$("#addForm").form("enableValidation");
		var isValid = $("#addForm").form("validate");
		if (isValid) {
			CMC.request({
				url : Resource.addUrl,
				method : 'POST',
				data : $("#addForm").form().serialize(),
				success : function(result) {
					CMC.alertMessage(result.messageBody, 'info');
					CMC.search();
					CMC.dialog('addResourceDetail', 'close');
					$("#addForm").form("clear");

				}
			});
		}
	};

	Resource.submitUpdateForm = function() {
		$("#updateForm").form("enableValidation");
		var isValid = $("#updateForm").form("validate");
		if (isValid) {
			CMC.request({
				url : Resource.updatedUrl,
				method : 'POST',
				data : $("#updateForm").form().serialize(),
				success : function(result) {
					CMC.alertMessage(result.messageBody, 'info');
					CMC.search();
					CMC.dialog('updateResourceDetail', 'close');
					$("#updateForm").form("clear");
				}
			});
		}
	};

	Resource.clearForm = function(id) {
		$('#' + id).form('clear');
	};

	$("#deleteResourceButton").click(function() {
		var record = CMC.grid.datagrid("getSelected");
		if (!record) {
			CMC.alertMessage("请先选中一条资源记录！", 'warning');
			return;
		}
		CMC.request({
			url : Resource.deleteUrl,
			method : 'POST',
			data : record,
			success : function(result) {
				CMC.alertMessage(result.messageBody, 'info');
				CMC.search();
			},
			contraintExist : function() {
				CMC.alertMessage("当前资源已经被权限绑定，请先解除绑定再删除该资源！", "warning");
				return;
			}
		});

	});

	Resource.addModule = function() {
		$("#addModuleForm").form("enableValidation");
		var isValid = $("#addModuleForm").form("validate");
		if (isValid) {
			CMC.request({
				url : Resource.addAllModule,
				method : 'POST',
				data : $("#addModuleForm").form().serialize(),
				success : function(result) {
					CMC.alertMessage(result.messageBody, 'info');
					Resource.init();
					CMC.dialog('addModuleDialog', 'close');
					$("#addModuleForm").form("clear");
				},
				error : function() {
					CMC.alertMessage("添加模块失败,请确认模块名或模块标识是否已经存在!", 'warn');
				}
			});
		}
	}

	Resource.searchMenuResource = function() {
		CMC.request({
			url : Resource.searchUrl,
			data : $("#menuSearchForm").form().serialize(),
			method : 'POST',
			success : function(response) {
				$("#memuSearchTable").datagrid("loadData",
						response.messageBody.list);
				$("#memuSearchTable").datagrid("getPager").pagination(
						{
							total : response.messageBody.total,
							pageNumber : response.messageBody.num
									/ (response.messageBody.num
											- response.messageBody.start + 1)
						});
			}
		});
	}

	Resource.openMemuDialog = function() {
		Resource.Menu.loadMenu();
		CMC.dialog('menuMntDialog', 'open');
	}

	Resource.init = function() {

		$("#memuSearchTable").datagrid({
			singleSelect : true,
			pagination : true,
			columns : [ [ {
				field : 'resourceName',
				title : '资源名称',
				width : "15%",
				align : 'center'
			}, {
				field : 'module',
				title : '资源模块',
				width : "15%",
				align : 'center'
			}, {
				field : 'resourceUrl',
				title : '资源路径',
				width : "70%",
				align : 'center'
			} ] ]
		});

		$("#memuSearchTable").datagrid("getPager").pagination({
			onSelectPage : function(pageNum, pageSize) {
				// 初始化查询分页参数
				// alert("onselect"+ pageNum +"+"+ pageSize);
				$("#menuSearchForm").form('load', {
					start : (pageNum - 1) * pageSize + 1,
					end : pageNum * pageSize
				});
				Resource.searchMenuResource();
			},
			total : 0,
			pageNumber : 0
		});

		$('#menutree').treegrid(Resource.Menu.config);

		$('#moduleList').datagrid({
			method : 'get',
			toolbar : toolbar,
			columns : [ [ {
				field : 'moduleId',
				title : '模块标识',
				width : '30%',
				align : 'center'
			}, {
				field : 'moduleName',
				title : '模块描述',
				width : '60%',
				align : 'center'
			} ] ]
		});
		// 检索数据
		// 请求加载模块菜单
		CMC.request({
			url : Resource.getAllModule,
			method : 'GET',
			success : function(message) {
				$("#searchModule").combobox({
					// data:
					// [{"value":"Permission","label":"Permission"},{"value":"User","label":"User"},{"value":"Role","label":"Role"},{"value":"Resource","label":"Resource"},{"value":"Group","label":"Group"}],
					data : message.messageBody,
					panelHeight : '180px',
					valueField : 'moduleId',
					textField : 'moduleName'
				});

				$("#searchModuleMenu").combobox({
					// data:
					// [{"value":"Permission","label":"Permission"},{"value":"User","label":"User"},{"value":"Role","label":"Role"},{"value":"Resource","label":"Resource"},{"value":"Group","label":"Group"}],
					data : message.messageBody,
					panelHeight : '180px',
					valueField : 'moduleId',
					textField : 'moduleName'
				});
				$("#updateModule").combobox({
					// data:
					// [{"value":"Permission","label":"Permission"},{"value":"User","label":"User"},{"value":"Role","label":"Role"},{"value":"Resource","label":"Resource"},{"value":"Group","label":"Group"}],
					data : message.messageBody,
					panelHeight : '180px',
					valueField : 'moduleId',
					textField : 'moduleName'
				});
				$("#addModule").combobox({
					// data:
					// [{"value":"Permission","label":"Permission"},{"value":"User","label":"User"},{"value":"Role","label":"Role"},{"value":"Resource","label":"Resource"},{"value":"Group","label":"Group"}],
					data : message.messageBody,
					panelHeight : '180px',
					valueField : 'moduleId',
					textField : 'moduleName'
				});

				$('#moduleList').datagrid({
					data : message.messageBody
				});
			}
		});
	}

	toolbar = [ {
		text : '新增模块',
		iconCls : 'icon-add',
		handler : function() {
			CMC.dialog('addModuleDialog', 'open');
			$("#addModuleForm").form("disableValidation");
			$("#addModuleForm").form('reset');
		}
	} ];
})(jQuery);

$(document).ready(function() {
	CMC.init(Resource);
});
