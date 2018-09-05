/**
 * @author wuxiaonin
 */

/**
 * 格式化JSON
 * @param index
 */
function showJSONDetails(index) {
		
		$("#showJSON").empty();
		var record = $("#srTable").datagrid('getRows')[index];
		this.data = record["dataJSON"] ;

		var json_regex = /^\s*([\[\{].*[\}\]])\s*$/; // Ghetto, but it works
		var jsonp_regex = /^[\s\u200B\uFEFF]*([\w$\[\]\.]+)[\s\u200B\uFEFF]*\([\s\u200B\uFEFF]*([\[{][\s\S]*[\]}])[\s\u200B\uFEFF]*\);?[\s\u200B\uFEFF]*$/;
		var jsonp_regex2 = /([\[\{][\s\S]*[\]\}])\);/ // more liberal support... this allows us to pass the jsonp.json & jsonp2.json tests

		var is_json = json_regex.test(this.data);
		var is_jsonp = jsonp_regex.test(this.data);
		if(is_json || is_jsonp){
			
			this.jsonFormatter = new JSONFormatter();
			  
			var outputDoc = '';
			var cleanData = '',
		    callback = '';

			var callback_results = jsonp_regex.exec(this.data);
			if( callback_results && callback_results.length == 3 ){
				callback = callback_results[1];
				cleanData = callback_results[2];
			} else {
				cleanData = this.data;
			}
		  
			try {
				var jsonObj = JSON.parse(cleanData);
				//把JSON放入隐藏域
                $("#data").val(cleanData).hide();
				if ( jsonObj ) {
					outputDoc = this.jsonFormatter.jsonToHTML(jsonObj, callback);
				} else {
				  throw "There was no object!";
				}
			} catch(e) {
				console.log(e);
				outputDoc = this.jsonFormatter.errorPage(e, this.data);
			}
			
			$("#showJSON").append("<div>"+outputDoc+"</div>");
			
			var winTopLeft = CMC.getWindowTopLeft("showJSONDetail");
//			$('#showJSONDetail').window({
//				top:winTopLeft.winTop,
//				left:winTopLeft.winLeft,
//				title: '任务参数（TaskParams）',
//				closed: false,
//				cache: false,
//				modal: true
//			});
			CMC.dialog('showJSONDetail','open');
		}
	}


//比较日期
function GetDateDiff(startTime, endTime, diffType) {
	// 将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
	startTime = startTime.replace(/-/g, "/");
	endTime = endTime.replace(/-/g, "/");
	// 将计算间隔类性字符转换为小写
	diffType = diffType.toLowerCase();
	var sTime = new Date(startTime); // 开始时间
	var eTime = new Date(endTime); // 结束时间
	// 作为除数的数字
	var divNum = 1;
	switch (diffType) {
	case "second":
		divNum = 1000;
		break;
	case "minute":
		divNum = 1000 * 60;
		break;
	case "hour":
		divNum = 1000 * 3600;
		break;
	case "day":
		divNum = 1000 * 3600 * 24;
		break;
	default:
		break;
	}
	return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum)); // 17jquery.com
}

/**
 * 初始化日期
 */
function initDate(){
	//当前时间时间
	var nowDate=new Date();
	var now=nowDate.getFullYear()+"-"+(nowDate.getMonth()+1)+"-"+nowDate.getDate();
	//前一天的时间戳
	var yesterTimeSamp = new Date(new Date().getTime() - 86400000);
	
	var yesterDate=new Date(yesterTimeSamp);
	//前一天日期
	var yester=yesterDate.getFullYear()+"-"+(yesterDate.getMonth()+1)+"-"+yesterDate.getDate();
	
	$("#startDate").datebox('setValue',yester);
	$("#endDate").datebox('setValue',now);
}

$("#close").click(function () {
    CMC.dialog('showJSONDetail','close');
});

/**
 * 实现复制到剪切板
 * @type {Clipboard}
 */

var clipboard = new Clipboard('.copy', {
    text: function() {
        var copy=document.getElementById("data").value;
        return copy;
    }
});

clipboard.on('success', function(e) {
    console.log(e);
});

clipboard.on('error', function(e) {
    console.log(e);
});