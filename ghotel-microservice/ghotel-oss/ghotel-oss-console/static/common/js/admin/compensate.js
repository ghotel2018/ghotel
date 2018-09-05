var Compensate = {
	searchTableRequired: true, 
	singleSelect : true,
	columns :  [[
					{field: 'id', title:'ID' , width: '20%' , align: 'center'},
					{field: 'groupId', title:'优惠券批次号' , width: '30%' , align: 'left'},
					{field: 'repairNum', title:'补偿次数' , width: '10%' , align: 'center'},
					{field: 'createdTime', title:'创建时间' , width: '10%' , align: 'center',
						formatter:function(value,row,index){
							return new Date(value).toLocaleDateString();
						}
					}
				]],
	menuId: 'Compensate',
	searchUrl : 'authorized/compensate/getAll',
	updatedUrl : "authorized/compensate/update"
};

(function($){
	
	Compensate.clearForm = function(id) {
		$('#'+id).form('clear');
	};
	
	Compensate.updateRepair = function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条！",'warning');
			return;
		}
		CMC.request({
			url: Compensate.updatedUrl,
			method: 'POST',
			data : {"id":record.id},
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
				CMC.search();
			}
		});
	}
	
})(jQuery);

$(document).ready(function(){
	CMC.init(Compensate);
});


