var OneDiscount={
	searchTableRequired: false,
	menuId: "OneDiscount",
	updateUrl: 'authorized/oneDiscount/update',
	getUrl: "authorized/oneDiscount/get"
};


(function($){

	$("#all").click(function(event) {
		$("input[name='cabinGroup']").prop('checked', true);
	});

	$("#allNo").click(function(event) {
		// alert('aaaaa');
		$("input[name='cabinGroup']").prop('checked',false);
	});

	$("#rever").click(function(event) {
		
		$("input[name='cabinGroup']").each(function() {
			$(this).prop('checked',!$(this).prop("checked"));
		});
	});

	$("#submit_update").click(function(event) {
		var switchs= $("input[name='switchGroup']:checked").val();
		if(0 == switchs){
			 if($("input[name='cabinGroup']:checked").length == 0){
				 CMC.alertMessage("请选择舱位！","info");
				 return false;
			 }
			 if($("input[name='settingGroup']:checked").length == 0){
				 CMC.alertMessage("请选择会员设置！","info");
				 return false;
			 }
		}
		var discountId=$("#discountId").val();
		var cabin='';
		$("input[name='cabinGroup']:checked").each(function(index, el) {
			/*alert(index);
			alert(el);*/
			if (index==0) {
				cabin=cabin+$(this).val();
			}else{

				cabin=cabin+"|"+$(this).val();
			}
			// alert(cabin);	
		});

		var memberSetting="";
		$("input[name='settingGroup']:checked").each(function(index, el) {
			if(index==0){
				memberSetting=$(el).val();
			}else{
				memberSetting=memberSetting+"|"+$(el).val();
			}
		});

		CMC.request({
			url: OneDiscount.updateUrl,
			contentType:"application/json",
			method: 'post',
			data: '{"discountId":"'+discountId+'","switchs":"'+switchs+'","cabin":"'+cabin+'","memberSetting":"'+memberSetting+'"}',
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
				OneDiscount.initRever();
			}
		});
	});
})(jQuery);

OneDiscount.initRever=function(){
	CMC.request({
			url: OneDiscount.getUrl,
			method: 'get',
			success: function(result){
				// CMC.alertMessage(result.messageBody.list['discountId'],'info');

				//先设置全不选
				$("input[name='cabinGroup']").each(function () {
			        $(this).attr("checked", false);
			    });
				
				$("input[name='settingGroup']").each(function () {
			        $(this).attr("checked", false);
			    });

				$("#discountId").val(result.messageBody.list['discountId']);

				var index = 1==result.messageBody.list['switchs']?0:1;
				$("input[name='switchGroup']:eq("+index+")").attr("checked",'checked');

				var memberSettingArr = result.messageBody.list['memberSetting'].split("|");
				$(memberSettingArr).each(function(){
					$("input[value="+this+"]")[0].checked=true;
				});

				var cabinArr = result.messageBody.list['cabin'].split("|");
				$(cabinArr).each(function(){
					$("input[value="+this+"]")[0].checked=true;
				});
			}
	});	
}

$(document).ready(function(){
	// CMC.init(OneDiscount);
	OneDiscount.initRever();
});

