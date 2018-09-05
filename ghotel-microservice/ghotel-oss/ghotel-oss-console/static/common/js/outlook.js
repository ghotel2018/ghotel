$(function() {
	tabClose();
	tabCloseEven();
	// 导航菜单绑定初始化
	$("#wnav").accordion({
		animate : false
	});
});

function addNav(menuConfigs, id) {

	function findLeaf(config) {
		var hasLeaf = false;
		for ( var i = 0; config && i < config['children'].length; i++) {
			if (config['children'][i]
					&& config['children'][i]['resourceUrl'] != '#') {
				hasLeaf = true;
				break;
			} else {
				hasLeaf = findLeaf(config['children'][i]);
				if (hasLeaf) {
					break;
				}
			}
		}
		return hasLeaf;
	}

	function deleteUselessNav(menuConfigs) {
		var size = menuConfigs.length;
		while(size > 0){
			size--;
			for (var index = 0; index < menuConfigs.length; index++) {
	            var item = menuConfigs[index];
	            if (item['resourceUrl'] == '#') {//不是叶子
					if (!findLeaf(item)) {// 找不到的 url为【#】 节点隐藏掉
						menuConfigs.splice(index,1);
						break;
					}
				}
	            if(item['children'].length > 0){//存在子节点
	        		var subMenuId = "";
	    			if (!item['resourceModule']) {
	    				subMenuId = "subMenu_" + item['id'];
	    			} else {
	    				subMenuId = "subMenu_" + item['resourceModule'];
	    			}
	    			deleteUselessNav(item['children'], subMenuId);
	        	}
	        }
		}
	}
	deleteUselessNav(menuConfigs);

	$(menuConfigs).each(function(index,item){
		
		$('#wnav').accordion('add', {
			title : item['text'], 
			id : "subMenu_" + item.id 
		});
	 
		$('#subMenu_' + item.id).html('<ul id="ctrltree' + item.id + '"></ul>');
	 
		var abc = item["children"];
		$('#ctrltree' + item.id).tree({
			data : item["children"] 
		}); 
		
		$('#ctrltree' + item.id).tree({ 
			onLoadSuccess : function() {
			}, 
			onClick : function(node) {
				$._ajax({
					url:CMC.projectAbbr+node.resourceUrl,
					dataType:'json',
					success: function(message){
						if(message && message.statusCode==2){
							var newurl= message.messageBody.url.trim();
							 if(newurl.indexOf("/")!=0){
								 newurl="/"+newurl
							 }
							addTab(node.text,"/"+CMC.resource+ newurl, "icon-save")//'module/admin/roleMaintenance.html'
						}else if(message.statusCode==-5){
							CMC.alertMessage("您的会话已经过期或身份没有经过认证，请重新登陆！",'error',CMC.showLoginDialog);
						}
					}
				});
			}, 
			onDblClick : function(node) { 
				if (node.state == 'closed') { 
					$(this).tree('expand', node.target); 
				} else {
					$(this).tree('collapse', node.target); 
				}
			}
		});
		
		$('#ctrltree' + item.id).tree('collapseAll');  
	});
}

function addTab(subtitle, url, icon) {

	if (!$('#tabs').tabs('exists', subtitle)) {
		$('#tabs').tabs('add', {
			title : subtitle,
			content : createFrame(url),
			closable : true,
			icon : icon
		});
	} else {
		$('#tabs').tabs('select', subtitle);
		//$('#mm-tabupdate').click();//更新点击的页面
	}
	tabClose();
}

function createFrame(url) {
	var s = '<iframe scrolling="auto" frameborder="0"  src="' + url
			+ '" style="width:100%;height:100%;"></iframe>';
	return s;
}

function tabClose() {
	/* 双击关闭TAB选项卡 */
	$(".tabs-inner").dblclick(function() {
		var subtitle = $(this).children(".tabs-closable").text();
		$('#tabs').tabs('close', subtitle);
	});
	/* 为选项卡绑定右键 */
	$(".tabs-inner").bind('contextmenu', function(e) {
		$('#mm').menu('show', {
			left : e.pageX,
			top : e.pageY
		});

		var subtitle = $(this).children(".tabs-closable").text();

		$('#mm').data("currtab", subtitle);
		$('#tabs').tabs('select', subtitle);
		return false;
	});
}
// 绑定右键菜单事件
function tabCloseEven() {
	// 刷新
	$('#mm-tabupdate').click(function() {
		var currTab = $('#tabs').tabs('getSelected');
		 var id=currTab.panel('options').id;
		 if(id=='home'){
			 Index.initSearch();
		 }else{
			 var url = $(currTab.panel('options').content).attr('src');
				$('#tabs').tabs('update', {
					tab : currTab,
					options : {
						content : createFrame(url)
					}
				}); 
		 }
	});
	// 关闭当前
	$('#mm-tabclose').click(function() {
		var currtab_title = $('#mm').data("currtab");
		$('#tabs').tabs('close', currtab_title);
	});
	// 全部关闭
	$('#mm-tabcloseall').click(function() {
		$('.tabs-inner span').each(function(i, n) {
			var t = $(n).text();
			$('#tabs').tabs('close', t);
		});
	});
	// 关闭除当前之外的TAB
	$('#mm-tabcloseother').click(function() {
		$('#mm-tabcloseright').click();
		$('#mm-tabcloseleft').click();
	});
	// 关闭当前右侧的TAB
	$('#mm-tabcloseright').click(function() {
		var nextall = $('.tabs-selected').nextAll();
		if (nextall.length == 0) {
			// msgShow('系统提示','后边没有啦~~','error');
			alert('后边没有啦~~');
			return false;
		}
		nextall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			$('#tabs').tabs('close', t);
		});
		return false;
	});
	// 关闭当前左侧的TAB
	$('#mm-tabcloseleft').click(function() {
		var prevall = $('.tabs-selected').prevAll();
		if (prevall.length == 0) {
			alert('到头了，前边没有啦~~');
			return false;
		}
		prevall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			$('#tabs').tabs('close', t);
		});
		return false;
	});

	// 退出
	$("#mm-exit").click(function() {
		$('#mm').menu('hide');
	});
}