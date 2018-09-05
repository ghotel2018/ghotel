/**
 * @author goc
 * @Date 2016-06-16
 * @Desc CMC的框架JS 工具 需要修改请咨询王思铭
 * 
 */

//通用页面配置
var CMC = {
	projectAbbr : '' ,//项目短名，
	resource: "cmc", // 需要根据实际情况改动
	paginationSetting : {
		searchTable : 'srTable',
		pageNumberName : 'start',
		pageSizeName : "end",
		searchTableTemplate: "<div id='searchResult' style='margin:10px 0;'><table id='srTable' class='easyui-datagrid' title='查询结果' style='width:{width};height:360px'></table></div>", //查询模板
		paginationParamsTemplate : "<input type='hidden' name='start' value=1 /> <input type='hidden' name='end' value=10 />" ,
		defaultWidth: '100%'
	},
	getPageConfigUrl: "authenticated/getPageConfig/",
	pageConfig : null,
	currentPage : null,
	processMsgId: "proccessingMsgDialog",
	grid: null,
	initSearch:true,
    selectObject:""
};

(function($){
	$._ajax = $.ajax;
    var _ajax = $.ajax;
    var _ajaxFileUpload = $.ajaxFileUpload;
    /**
     * @Decription 默认的ajax 请求方法
     */
    CMC.fn = {
            error : function(XMLHttpRequest, textStatus, errorThrown){
            	if(XMLHttpRequest.status==0 && XMLHttpRequest.readyState==0){
            		return ;
            	}
            	CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
            },
            success : function(data, textStatus){},
            failedRequestHandler : function(data, textStatus){ // Status == 1
            	CMC.hideProcessBox();
            	if(data.messageBody){
            		CMC.alertMessage(data.messageBody,'error');
            	}else{
            		CMC.alertMessage("当前请求发生错误，请联系系统管理员！",'error');
            	}
            	
            },
            unAuthourizedHandler : function(data, textStatus){ // Status == -1
            	CMC.alertMessage("你没有请求当前资源的权限"+data.messageBody+".请联系权限管理员或重新登录系统！",'error');
            },
            reloginRequest : function(data, textStatus){ // status == -2
            	CMC.hideProcessBox();
            	CMC.alertMessage("你当前的会话已经过期，请重新登录！",'error',CMC.showLoginDialog); 
            },
            contraintExist : function(data, textStatus){ // status == -3
            	CMC.alertMessage("当然记录正在被使用，不能被删除！",'error'); 
            },
            loginFailed : function(data, textStatus){ // Status == -4
            	CMC.alertMessage("登陆失败！",'error'); 
            }, notAuthenticated : function(data, textStatus){ // Status == -5
            	CMC.hideProcessBox();
            	CMC.alertMessage("您的会话已经过期或身份没有经过认证，请重新登陆！",'error',CMC.showLoginDialog); 
            },verificationCodeNotMatch: function (data, textStatus){ // Status == -6
            	CMC.alertMessage("验证码不正确！",'error'); 
            },pageNavigation: function(data, textStatus){ // status  ==2
            	if(data.messageBody.errorMessage){
            		CMC.alertMessage(data.messageBody.errorMessage, 'error');
            		return;
            	}
            	window.location.href = window.location.protocol+"//"+window.location.host+"/"+CMC.resource + data.messageBody.url;
            	
            },complete : function(XHR, TS){
            	
            }
    };
    
    //重写jquery的ajax方法
    CMC.request = $.ajax =function(opt){
        //备份opt中error和success方法
    	//强制使用JSON作为返回的数据
    	// "xml": 返回 XML 文档，可用 jQuery 处理。
        // "html": 返回纯文本 HTML 信息；包含的 script 标签会在插入 dom 时执行。
        // "script": 返回纯文本 JavaScript 代码。不会自动缓存结果。除非设置了 "cache" 参数。注意：在远程请求时(不在同一个域下)，所有 POST 请求都将转为 GET 请求。（因为将使用 DOM 的 script标签来加载）
    	//  "json": 返回 JSON 数据 。
    	//  "jsonp": JSONP 格式。使用 JSONP 形式调用函数时，如 "myurl?callback=?" jQuery 将自动替换 ? 为正确的函数名，以执行回调函数。
    	//  "text": 返回纯文本字符串
    	var fn = $.extend({},CMC.fn);
    	if(!opt.dataType){
    		opt.dataType = 'json';
    	}
    	
    	if(!opt.method){
    		opt.method = 'GET';
    	}
    	if(!opt.timeout){
    		opt.timeout=600000;
    	}
    	//添加项目短名
    	var signal = "?";
    	if(opt.url && opt.url.indexOf('?')!=-1){
    		signal = "&";
    	}
    	if(opt.url && opt.url.indexOf(CMC.projectAbbr+"/")<1){
			if(opt.url.indexOf("/")!=0){
				opt.url = "/" + CMC.projectAbbr +"/"+ opt.url + signal + "t=" + new Date().getTime();
			}else{
				opt.url = "/" + CMC.projectAbbr + opt.url + signal + "t=" + new Date().getTime();
			}

    	}else if(opt.url.indexOf("/")!=0){
            opt.url = "/" +  opt.url + signal + "t=" + new Date().getTime();
        }
        if(opt.error){
            fn.error=opt.error;
        }
        if(opt.additionalHandler){
            fn.additionalHandler=opt.additionalHandler;
        }
        if(opt.failedRequestHandler){
            fn.failedRequestHandler=opt.failedRequestHandler;
        }
        
        if(opt.success){
        	fn.success=opt.success;
        }
        
        if(opt.complete){
        	fn.complete=opt.complete;
        }
        
        if(opt.contraintExist){
        	fn.contraintExist = opt.contraintExist;
        }
        
        //扩展增强处理
        var _opt = $.extend(opt,{
            error:function(XMLHttpRequest, textStatus, errorThrown){
                //错误方法增强处理
            	console.log(XMLHttpRequest.status +"- " + XMLHttpRequest.readyState);
            	CMC.hideProcessBox();
            	var status = XMLHttpRequest.status;
            	if(status=='404' && this.url.indexOf("authenticated")!=-1){
            		this.success({statusCode:-2});
            		return;
            	}
                fn.error(XMLHttpRequest, textStatus, errorThrown);
                //没有经过身份认证的访问会导致404
            },
            success:function(data, textStatus){
            	//字符串，则另外处理
            	if(typeof data !="string" ){
            		 //成功回调方法增强处理
                	if(data.statusCode == 0 ){
                		fn.success(data, textStatus);
                	}else if(data.statusCode == 1){
                		fn.failedRequestHandler(data, textStatus);
                	}else if(data.statusCode == -1){
                		fn.unAuthourizedHandler(data, textStatus);
                	}else if(data.statusCode == -2){
                		fn.notAuthenticated(data, textStatus);
                	}else if(data.statusCode == -3){
                		fn.contraintExist(data, textStatus);
                	}else if(data.statusCode == -4){
                		fn.loginFailed(data, textStatus);
                	}else if(data.statusCode == -5){
                		fn.notAuthenticated(data, textStatus);
                	}else if(data.statusCode == -6){
                		fn.verificationCodeNotMatch(data, textStatus);
                	}else if(data.statusCode == 2){
                		fn.pageNavigation(data, textStatus);
                	}
            	}else{
            		fn.success(data, textStatus);
            	}
               
            },
            beforeSend:function(XHR){
                //提交前回调方法
            },
            complete:function(XHR, TS){
                //请求完成后回调函数 (请求成功或失败之后均调用)。
            	fn.complete(XHR, TS);
            }
        });
        _ajax(_opt);
    };
    
    CMC.fileUpload = $.ajaxFileUpload= function(opt){
    	var fn = $.extend({},CMC.fn);
    	if(opt.error){
    		fn.error = opt.error;
    	}
    	
    	if(opt.success) {
    		fn.success = opt.success;
    	}
    	
    	if(!opt.dataType){
    		opt.dataType = 'json';
    	}
    	//添加项目短名
    	if(opt.url && opt.url.indexOf(CMC.projectAbbr)==-1){
    		opt.url = "/" + CMC.projectAbbr +"/"+ opt.url;
    	}
    	
    	var _opt = $.extend(opt,{
            error:function(XMLHttpRequest, textStatus, errorThrown){
               //异步上传file使用iframe post表单数据，会话过期的话会返回登录页面
            	CMC.hideProcessBox();
                if(XMLHttpRequest.responseText.indexOf("loginfrom")!=-1){
                	fn.notAuthenticated(XMLHttpRequest.responseText, textStatus);
                }else{
                	 fn.error(XMLHttpRequest, textStatus, errorThrown);
                }
            },
            success:function(data, textStatus){
            	//字符串，则另外处理
            	if(typeof data !="string" ){
            		 //成功回调方法增强处理
                	if(data.statusCode == 0 ){
                		fn.success(data, textStatus);
                	}else if(data.statusCode == 1){
                		fn.failedRequestHandler(data, textStatus);
                	}else if(data.statusCode == -1){
                		fn.unAuthourizedHandler(data, textStatus);
                	}else if(data.statusCode == -2){
                		fn.notAuthenticated(data, textStatus);
                	}else if(data.statusCode == -3){
                		fn.contraintExist(data, textStatus);
                	}else if(data.statusCode == -4){
                		fn.loginFailed(data, textStatus);
                	}else if(data.statusCode == -5){
                		fn.notAuthenticated(data, textStatus);
                	}else if(data.statusCode == -6){
                		fn.verificationCodeNotMatch(data, textStatus);
                	}else if(data.statusCode == 2){
                		fn.pageNavigation(data, textStatus);
                	}else{
                		fn.success(data, textStatus);
                	}
            	}else{
            		fn.success(data, textStatus);
            	}
            }   
        });
    	_ajaxFileUpload(_opt)
    }
    
    //封装的alert message
    CMC.alertMessage = function(message,level,callBack){
    	if(!level){
    		level = "error";
    	}
    	$.messager.alert('温馨提示','亲~' +message,level,callBack);
    };
    
    //封装的confirn dialog
    CMC.confirm = function(message, callBack){
    	message = "亲~ " +  message;
    	var fn = function(r){if(r){}}
    	if(callBack){
    		fn = callBack;
    	}
    	$.messager.confirm('confirm',message,fn);
    }
    
    //对于重新登录或会话过期的请求 弹出登录框要求重新登录
    CMC.showLoginDialog = function(){
    	CMC.showVerifyCodeWindowForFeedback();
    	$('#loginBox').dialog('open');
    };
    
	/*  初始化
	 * 参数说明： menuId, 当前页面的菜单ID
	 *  paginationTableEanble : 是否启用默认的分页数据表
	 **/
    CMC.init = function(page){

    	window.onkeydown = function(e) {
    		if (CMC.loginBoxIsOpen==true && e.keyCode == 13) { //回车键的键值为13
    			CMC.checkVerifyCode(CMC.ajaxLogin);
    		}
    	}
    	
    	CMC.currentPage = page;//set current page
    	CMC.initPage();  //request Page Config
    	//显示查询结果框
    	
    	if(CMC.currentPage.searchTableRequired && CMC.currentPage.searchTableRequired== true){
    		if(!CMC.currentPage.searchUrl){
    			CMC.alertMessage('没有配置searchUrl', 'warning');
    		}
    		if(CMC.currentPage.searchTableWidth){
    			$("#mainContent").append(CMC.paginationSetting.searchTableTemplate.replace('{width}',CMC.currentPage.searchTableWidth));
    		}else{
    			$("#mainContent").append(CMC.paginationSetting.searchTableTemplate.replace('{width}',CMC.paginationSetting.defaultWidth));
    		}
    		
        	//初始化查询分页参数
        	if($(".CMCSearchForm")){
        		$(".CMCSearchForm").append(CMC.paginationSetting.paginationParamsTemplate);
        	}
        	//window.setTimeout("CMC.initSearchSetting();", 20);
        	CMC.initSearchSetting();
			if(!page.initNotSearch){
				CMC.search();
			}

    	}
    	
    	$._ajax({
			method : "GET",
			url : window.location.protocol+"//"+window.location.host+"/"+CMC.resource +"/loginAjax.html",
			dataType : "html",
			async : false,
			success : function(responseText) {
				$(responseText).appendTo("body");//loginContainer 在于 indexNew.html
				$("#loginBox").dialog({
					iconCls:'icon-save',
					modal:true,
					closed: true,
					onOpen: function(){
						CMC.loginBoxIsOpen = true;
					},
					onClose: function(){
						CMC.loginBoxIsOpen = false;
					}
				});
				
				$("#proccessingMsgDialog").dialog({
					modal:true,
					closed: true,
					cache: true
				});
			},
			error : function(ee) {
				CMC.alertMessage("获取页面配置信息出错，请联系系统管理员！",'error');
			}
		});
    	//把遮盖层的高度改成100%
    	//$('.window-mask').css('height','');
    };
    
    CMC.initPage = function(){
    	CMC.request({
			method : "GET",
			url : CMC.getPageConfigUrl + CMC.currentPage.menuId,
			dataType : "json",
			async : false,
			success : function(msg) {
				CMC.pageConfig = msg.messageBody;
				if(CMC.currentPage.menuId=="index"){//主界面
					CMC.preInit();//初始化登录时间、登录人员页面信息
				}
				CMC.initPagePermission();
		     	if(CMC.currentPage.init){
		    		CMC.currentPage.init();
		    	}
		     	initSelect();
			},
			error : function() {
				CMC.alertMessage("获取页面配置信息出错，请联系系统管理员！",'error');
			}
		});
    }
    
    CMC.preInit = function(){
	   $('#lastLoginTime').html(CMC.pageConfig.user.lastLoginTime);//初始化主界面登录时间
	   $('#loginUserName').html(CMC.pageConfig.user.userName);//初始化主界面登录人员
	   var topMenu = CMC.pageConfig.menuConfig;
	   addNav(topMenu, "menulist");//初始化导航栏
    }
    
    CMC.initPagePermission = function(perm){
    	var defaultPerm = "permission";
    	if(perm && perm.lenght>0){
    		defaultPerm = perm;
    	}
    	var allPermsIncluded = false;
    	for(var i =0; i<CMC.pageConfig.pageElementPerms.length; i++ ){
    		if(CMC.pageConfig.pageElementPerms[i]["permissionExp"] && CMC.pageConfig.pageElementPerms[i]["permissionExp"].indexOf("*")!=-1){
    			allPermsIncluded = true;
    		}
    	}
    	if(!allPermsIncluded){
    		$("[" + defaultPerm + "]").each(function(index, ele){
    			var pagePerm  = $(ele).attr("permission");
    			var exist = false;
    			for(var i =0; i<CMC.pageConfig.pageElementPerms.length; i++ ){
    				var definedPerm = CMC.pageConfig.pageElementPerms[i]["permissionExp"];
    	    		if( definedPerm== pagePerm){
    	    			exist = true;
    	    			break;
    	    		}else{
    	    			var definePermPart2 = definedPerm.split(":")[1];
    	    			var pagePermPart2= pagePerm.split(":")[1];
    	    			var pagePermPart2Actions = pagePermPart2.split(",");
    	    			
    	    			var allContained = true;
    	    			for(var j=0; j <pagePermPart2Actions.length;j++){
    	    				allContained = allContained & (definePermPart2.split(",").indexOf(pagePermPart2Actions[j])!=-1);
    	    				if(!allContained){
    	    					break;
    	    				}
    	    			}
    	    			if(allContained){
    	    				exist = true;
    	    				break;
    	    			}
    	    			
    	    		}
    	    	}
    			if(exist){
    				 $(ele).show();
    			}else{
    				$(ele).hide();
    			}
    		})
    	}else{
    		$("[permission]").each(function(index, ele){
    			$(ele).show();
    		});
    	}
    }
    //初始化搜索框
    CMC.search = function() {
    	CMC.grid.datagrid("loading");
    	CMC.grid.datagrid("getPager").pagination({
			total : 0,
			pageNumber : 0
		});
        var selectObject=$(".CMCSearchForm :input").filter(function(index){
            return $(this).attr("name")!='start'&&$(this).attr("name")!='end'
        }).form().serialize();
        if(selectObject!=CMC.selectObject){
            CMC.selectObject= selectObject;
            var options = CMC.grid.datagrid('getPager').data("pagination").options;
            var pageSize = options.pageSize;
            $(".CMCSearchForm").form('load',{
                start : 1,
                end : pageSize
            })
        }
		CMC.request({
			url: CMC.currentPage.searchUrl,
			method: 'POST',
			data : $(".CMCSearchForm").form().serialize(),
			success: function(message){
				CMC.grid.datagrid("loaded");
				CMC.setGridData(CMC.grid,message);
			}
		});
	};
	
   //加载列表数据
	CMC.setGridData = function(table, result){
		//table.datagrid("selectAll");
		//table.datagrid("clearSelections");
		table.datagrid("loadData",result.messageBody.list);
		table.datagrid("getPager").pagination({
			total : result.messageBody.total,
			pageNumber : result.messageBody.num/(result.messageBody.num - result.messageBody.start + 1)
		});

	}
    
   //弹出对话框
	CMC.dialog = function(id,action){
		$("#"+id).dialog(action);
	};

	//初始化搜索配置
	CMC.initSearchSetting = function (){
		$(".CMCSearchButton").click(CMC.search);//为button点击事件注册回调函数
		CMC.grid = $('#'+CMC.paginationSetting.searchTable);
		var singleSelect=true;
		if(CMC.currentPage.multipleSelect){
			singleSelect=false;
		}
		CMC.grid.datagrid({
			columns:CMC.currentPage.columns,
			singleSelect:singleSelect,
			pagination:  true,
			rownumbers : true,
			onDblClickRow:CMC.currentPage.onDblClickRow||function (index, row) {},
			loadMsg: "亲~ 正在加载数据,请稍后...",
			emptyMsg: "亲~ 很抱歉没有查询任何数据."
		});
		//注册分页事件
		CMC.grid.datagrid("getPager").pagination({
			onSelectPage: function(pageNum,pageSize){
	        	//初始化查询分页参数
				//alert("onselect"+ pageNum +"+"+ pageSize);
	        	$(".CMCSearchForm").form('load',{
	        		start : (pageNum-1) *pageSize +1,
	        		end : pageNum *pageSize
	        	});
	        	CMC.search();
	        	
			},
			onBeforeRefresh: function(pageNum,pageSize){
			},
			onRefresh: function(pageNum,pageSize){
				//初始化查询分页参数
				/*alert("onrefresh" + pageNum+ "+"+ pageSize);
	        	$("#"+CMC.currentPage.searchFormId).form('load',{
	        		num : (pageNum-1) *pageSize +1,
	        		end : pageNum *pageSize
	        	});
	        	CMC.search();*/
			},
			onChangePageSize:function(pageSize){	
				//初始化查询分页参数
				/*alert( "onChangePageSize" + pageSize);
	        	$("#"+CMC.currentPage.searchFormId).form('load',{
	        		num : ($('#'+CMC.paginationSetting.searchTable).datagrid("getPager").pageNumber-1) *pageSize +1,
	        		end : $('#'+CMC.paginationSetting.searchTable).datagrid("getPager").pageNumber*pageSize
	        	});
	        	CMC.search();*/
			},
			total :0,
			pageNumber: 0,
			pageSize:10
		});
		//CMC.search();
	}
	
	//展开菜单并定位到当前页面
    CMC.expandParentNode = function(element){
    	if(element && element.parent()){
			//二层处理
			if(element.parent().parent()
					&& element.parent().parent().children('a')
					&& element.parent().parent().children('a')[0] ){
				 CMC.changeMenuClass(element.parent().parent().children('a'));
    			CMC.expandParentNode(element.parent().parent().children('a'));
			}else{
				if(element.parent().parent().parent()
						&& element.parent().parent().parent().children('a')){
					CMC.changeMenuClass(element.parent().parent().parent().children('a'));
					//CMC.expandParentNode(element.parent().parent().parent().children('a'));
				}
			}

    	}
    };
    
  //调用校验码功能
    CMC.showVerifyCodeWindowForFeedback = function () {
		var myDate = new Date();
		$("#__imgVerifyCode").attr(
				"src", window.location.protocol+"//"+window.location.host + CMC.projectAbbr + "/security/generateImage?timestamep="
						+ myDate.getTime());
		$("#__txtVerifyCode").val("");
	}
	

    //可以传入一个函数 或者字符串 字符串格式是 obj.func ， 例如:  window.login, CMC.ajaxLogin, etc..
    CMC.checkVerifyCode = function(callBack) {
		var msg_blank = "请输入验证码！";
		var msg_incorrect = "验证码不正确，请重试！";
		var server_error = "服务器出错,请联系管理员！";
		var v = $("#__txtVerifyCode").val();
		if (v == "") {
			CMC.alertMessage(msg_blank,'error');
			return;
		}
		CMC.request({
			method : "GET",
			url : "security/verifyCode?verifyCode=" + v,
			dataType : "json",
			async : false,
			success : function(msg) {
				if (msg.statusCode == 0 &&( msg.messageBody==""||msg.messageBody==null)) {
					if(typeof callBack =='function'){
						callBack();
					}else if(typeof callBack =='string'){
						window[callBack.split('.')[0]][callBack.split('.')[1]]();
					}
					return;
				} else {
					CMC.alertMessage(msg_incorrect,'error');
					CMC.showVerifyCodeWindowForFeedback();
					return;
				}
			},
			error : function() {
				CMC.alertMessage(server_error,'error');
			}
		});
	}

	//验证登录框输入
    CMC.validatePass = function (){
		if ($("#username").val() == "") {
			CMC.alertMessage("请输入用户名。",'error');
			$("#username").focus();
			return false;
		}
		if ($("#password").val() == "") {
			CMC.alertMessage("请输入密码。",'error');
			$("#password").focus();
			return false;
		}
		return true;
	}
	
    //异步登录框
    CMC.ajaxLogin = function() {
		if(CMC.validatePass()){
			CMC.request({
				method : "POST",
				url : "security/ajaxLogin",
				dataType : "json",
				async : true,
				data: $("#ajaxloginfrom").form().serialize(),
				success : function(msg) {
					if (msg.statusCode == 0) {
						CMC.alertMessage(msg.messageBody,'info');	
						$("#ajaxloginfrom").form("clear");
						$('#loginBox').dialog('close');
						//重新 
						if(CMC.pageConfig==null){
							CMC.initPage();
						}
					} 
				},
				error : function() {
					CMC.alertMessage(server_error,'error');
				}
			});
		}

	}
    
    CMC.logout = function(){
    	CMC.request({
			url : "security/logout",
		});
    }
    
    CMC.showProcessBox = function(){
    	CMC.dialog('proccessingMsgDialog', 'open');
    }
    CMC.hideProcessBox = function(){
    	CMC.dialog('proccessingMsgDialog', 'close');
    }
    
    CMC.navigateTo = function(ele){
    	CMC.request({
    		url: $(ele).attr("uri")
    	});
    }
    
    CMC.fileChange = function (ele,reflectEleId){
    	//debugger
    	var newVal = $(ele).val();
    	var id = $(ele).attr('id');
    	$(ele).removeAttr("onchange");
    	var bkHtml = ele.outerHTML;
    	if($('#'+reflectEleId).hasClass("easyui-textbox")){
        	$('#'+reflectEleId).textbox('setValue',newVal);
    	}else{
        	$('#'+reflectEleId).val(newVal);
    	}
    	//$(ele).replaceWith(bkHtml);
    	//$("#"+ id).attr('value',String(newVal));
    	$(ele).attr("onchange","CMC.fileChange(this,'" + reflectEleId + "')");
    }

    
    CMC.changeMenuClass = function(ele){
    	
    	if($(ele).siblings('ul').css('display')=='none'){
			$(ele).parent('li').siblings('li').removeClass('inactives');
			$(ele).addClass('inactives');
			$(ele).siblings('ul').slideDown(100).children('li');
			if($(ele).parents('li').siblings('li').children('ul').css('display')=='block'){
				$(ele).parents('li').siblings('li').children('ul').parent('li').children('a').removeClass('inactives');
				$(ele).parents('li').siblings('li').children('ul').slideUp(100);

			}
		}else{
			$(ele).removeClass('inactives');
			$(ele).siblings('ul').slideUp(100);
			$(ele).siblings('ul').children('li').children('ul').parent('li').children('a').addClass('inactives');
			$(ele).siblings('ul').children('li').children('ul').slideUp(100);
			$(ele).siblings('ul').children('li').children('a').removeClass('inactives');
		}
    }

    
	Array.prototype.indexOf = function(obj,attr){
		var index = -1; 
		for(var i=0; i < this.length; i++){
			var target = this[i];
			if(attr){
				target = this[i][attr];
			}
			if(target && obj === target){
				index = i ;
				break;
			}
		}
		return index ;
	} 
	
	Date.prototype.Format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
	
	
})(jQuery);

CMC.getWindowTopLeft = function (win){//window 弹窗居中
	var iframeWidth = $("#"+win).parent().parent().width();
    var iframeHeight =  $("#"+win).parent().parent().height();
    var windowWidth = $("#" +win).parent().width()+12;
    var windowHeight = $("#"+win).parent().height()+12;
    
    var width = (iframeWidth - windowWidth) / 2;
    var height = (iframeHeight - windowHeight) / 2;
    if (iframeHeight < windowHeight){
    	height = 0;
    }
	return {
		"winLeft":width,
		"winTop":height
	}
}

CMC.dateFormatter = function(date){ 
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}  

$.extend($.fn.validatebox.defaults.rules, {
	dateCompareLE:{//小于等于
   	 	validator: function(value, param){ 
	   	 	var varify = /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29))$/i.test(value);
	   	 	if(varify){
		   	 	var endTime = $(param[0]).datetimebox('getValue');
		   	 	if(endTime==""){
		   	 		return true;
		   	 	}
		   	 	//if()
		  		var dateEnd = $.fn.datebox.defaults.parser(endTime); 
		  		var dateStart = $.fn.datebox.defaults.parser(value);
		  		varify = dateStart <= dateEnd; 
		  		if(!varify){
		  			$.fn.validatebox.defaults.rules.dateCompareLE.message ="起始时间要小于或等于截止时间";
		  		}
		  		return varify;
	   	 	}else{
	   	 		$.fn.validatebox.defaults.rules.dateCompareLE.message ="请输入正确的日期格式（yyyy-mm-dd）";
	   	 		return false;
	   	 	}
   	 	},
   	 	message: ''
   	},
	dateCompareGE:{//大于等于
   	 	validator: function(value, param){ 
	   	 	var varify = /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29))$/i.test(value);
	   	 	if(varify){
		   	 	var startTime = $(param[0]).datetimebox('getValue');
		   	 	if(startTime==""){
		   	 		return true;
		   	 	}
		  		var dateStart = $.fn.datebox.defaults.parser(startTime); 
		  		var dateEnd = $.fn.datebox.defaults.parser(value);
		  		
		  		varify = dateEnd >= dateStart; 
		  		if(!varify){
		  			$.fn.validatebox.defaults.rules.dateCompareGE.message ="截止时间要大于或等于起始时间";
		  		}
		  		return varify;
	   	 	}else{
	   	 		$.fn.validatebox.defaults.rules.dateCompareGE.message ="请输入正确的日期格式（yyyy-mm-dd）";
	   	 		return false;
	   	 	}
   	 	}
   	},
   	dateTimeCompareLE:{//小于等于
   	 	validator: function(value, param){ 
	   	 	var varify = /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29)) ([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/i.test(value);
	   	 	if(varify){
		   	 	var endTime = $(param[0]).datetimebox('getValue');
		   	 	if(endTime==""){
		   	 		return true;
		   	 	}
		   	 	var dateEnd = new Date(Date.parse(endTime.replace(/-/g,"/"))).getTime(); 
		   	 	var dateStart = new Date(Date.parse(value.replace(/-/g,"/"))).getTime();
		  		varify = dateStart <= dateEnd; 
		  		if(!varify){
		  			$.fn.validatebox.defaults.rules.dateTimeCompareLE.message ="起始时间要小于或等于截止时间";
		  		}
		  		return varify;
	   	 	}else{
	   	 		$.fn.validatebox.defaults.rules.dateTimeCompareLE.message ="请输入正确的日期格式（yyyy-mm-dd hh:mm:ss）";
	   	 		return false;
	   	 	}
   	 	},
   	 	message: ''
   	},
   	dateTimeCompareGE:{//大于等于
   	 	validator: function(value, param){ 
	   	 	var varify = /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29)) ([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/i.test(value);
	   	 	if(varify){
		   	 	var startTime = $(param[0]).datetimebox('getValue');
		   	 	if(startTime==""){
		   	 		return true;
		   	 	}
		  		var dateEnd = new Date(Date.parse(value.replace(/-/g,"/"))).getTime(); 
		   	 	var dateStart = new Date(Date.parse(startTime.replace(/-/g,"/"))).getTime();
		  		varify = dateEnd >= dateStart; 
		  		if(!varify){
		  			$.fn.validatebox.defaults.rules.dateTimeCompareGE.message ="截止时间要大于或等于起始时间";
		  		}
		  		return varify;
	   	 	}else{
	   	 		$.fn.validatebox.defaults.rules.dateTimeCompareGE.message ="请输入正确的日期格式（yyyy-mm-dd hh:mm:ss）";
	   	 		return false;
	   	 	}
   	 	}
   	},
});

$(function () {
    $('input.validatebox-invalid').validatebox('disableValidation')
    .focus(function () { $(this).validatebox('enableValidation'); })
    .blur(function () { $(this).validatebox('validate') });
});
function initSelect(){
	var dictionaryList = CMC.pageConfig.dictionaryList;
	for(var i=0;i<dictionaryList.length;i++){
		var ids = dictionaryList[i].type.typeKey.split("_");
		if(CMC.currentPage.menuId!=ids[0]){
			continue;
		}
		var renderType = dictionaryList[i].type.renderType;
		if(renderType=="0"){
			var selectId = ids[1];
			//console.log(dictionaryList[i]);
			//console.log(dictionaryList[i].detail);
			$("#"+selectId).combobox({
				data: dictionaryList[i].detail,
				panelHeight: '80px',
				valueField:'detailValue',
				textField:'detailName' 
			});
		}else if(renderType="1"){
			initHtml(dictionaryList[i]);//由于每个页面需要的html不相同 所以交给各自的html各自实现
		}
	}
}
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}