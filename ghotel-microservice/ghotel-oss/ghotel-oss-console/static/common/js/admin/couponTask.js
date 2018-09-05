var CouponTask = {
	searchTableRequired: true, 
//	initNotSearch : true,
	columns :  [[
	             	{field: 'taskId', title:'ID' , width: '5%' , align: 'center'},
					{field: 'taskName', title:'线程名' , width: '20%' , align: 'left'},
					{field: 'status', title:'线程状态' , width: '5%' , align: 'center',
						formatter:function(value,row,index){
							if(value=="2")
								return "成功";
							else if(value=="0")
								return "未运行";
							else if(value=="1")
								return "运行中";
							else if(value="3")
								return "出错";
							else 
								return "未知状态:"+value;
						}
					},
					{field: 'msg', title:'消息' , width: '15%' , align: 'center'},
					{field: 'createTime', title:'创建时间' , width: '15%' , align: 'center',
						formatter:function(value,row,index){
							return new Date(value).format("yyyy-MM-dd HH:mm:ss");
						}
					},
					{field: 'finishTime', title:'结束时间' , width: '15%' , align: 'center',
						formatter:function(value,row,index){
							return new Date(value).format("yyyy-MM-dd HH:mm:ss");
						}
					}
				]],
	menuId: 'CouponTask',
	searchUrl : 'authorized/couponTask/getAll'
};

(function($){
	
	CouponTask.viewDeatil=function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条系统消息！",'warning');
			return;
		}
		this.jsonFormatter = new JSONFormatter();
		var outputDoc = '';
		var cleanData = '';
	    var callback = '';
	    var json_regex = /^\s*([\[\{].*[\}\]])\s*$/;
		var callback_results = json_regex.exec(this.data);
		if( callback_results && callback_results.length == 3 ){
			callback = callback_results[1];
			cleanData = callback_results[2];
		} else {
			cleanData = this.data;
		}
		try {
			var jsonObj = record;
			if ( jsonObj ) {        
				outputDoc = this.jsonFormatter.jsonToHTML(jsonObj, callback);
			} else {
			  throw "There was no object!";
			}
		} catch(e) {
			console.log(e);
			outputDoc = this.jsonFormatter.errorPage(e, this.data);
		}
		
		
		$("#taskDetails").html(outputDoc);
//		$("#taskDetails").html(JSON.stringify(record));
		CMC.dialog("taskDetail","open");
	}
	
	
})(jQuery);


$(document).ready(function(){
	CMC.init(CouponTask);
});

