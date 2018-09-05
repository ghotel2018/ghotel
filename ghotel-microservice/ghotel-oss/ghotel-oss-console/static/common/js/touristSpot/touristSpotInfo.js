/**
 * 规则管理
 */

var TouristSpotInfo={
		searchTableRequired: true,
		menuId: "TouristSpotInfo",
		searchUrl: "authorized/touristSpotInfo/getAll" ,
		addUrl: "authorized/touristSpotInfo/add",
		updateUrl : "authorized/touristSpotInfo/update",
		deleteUrl: "authorized/touristSpotInfo/delete",
		getCityAllUrl: "authorized/touristSpotInfo/getCityAll",
		exportUrl:"authorized/touristSpotInfo/export",
		columns:[[
			{field: 'tspotName', title:'景点名称' , width: '17%' , align: 'center'},
			{field: 'tspotEname', title:'景点英文名' , width: '16%' , align: 'center'},
			{field: 'tspotPhoneticTotal', title:'景点拼音（全拼）' , width: '17%' , align: 'center'},
			{field: 'tspotPhoneticSimple', title:'景点拼音（简写）' , width: '17%' , align: 'center'},
			{field: 'tspotGrade', title:'景点等级' , width: '16%' , align: 'center'},
			{field: 'cityName', title:'所属区域（城市）' , width: '16%' , align: 'center'},
		]],
		 onDblClickRow: function(){
//        	$("#touristSpotInfo_update").click();
        }
};


$(function(){
	CMC.request({
		url: TouristSpotInfo.getCityAllUrl,
		method: 'POST',
		data : '',
		success: function(result){
			$("#TouristType").combobox({
				data: result.messageBody.list,
				panelHeight: '120px',
				valueField:'id',
				textField:'cityName' 
			});
			$("#update_cityType").combobox({
				data: result.messageBody.list,
				panelHeight: '120px',
				valueField:'id',
				textField:'cityName' 
			});
			$("#add_cityType").combobox({
				data: result.messageBody.list,
				panelHeight: '120px',
				valueField:'id',
				textField:'cityName' 
			});	
		}
	});
});

(function($){
	/**
	 * 重置
	 */
	$("#touristSpotInfo_reset").click(function(){
		$("#searchForm ").form('clear');
		$("#searchForm [name='start']").val('1');
		$("#searchForm [name='end']").val('10');
	});

	$("#touristSpotInfo_export").click(function(){
		CMC.request({
			url: TouristSpotInfo.exportUrl,
			method: 'POST',
			data:$("#searchForm").serialize(),
			success: function(result){
				CMC.alertMessage(result.messageBody,'info');
			}
		});
	});
	
	/**
	 * 弹出添加窗口
	 */
	$("#touristSpotInfo_add").click(function(){
		$("#addTouristForm").form('clear');
		CMC.dialog('addTouristSpotListDetail','open');
	});
	
	/**
	 * 添加景点
	 */
	$("#submit_add").click(function(){
		$("#addTouristForm").form("enableValidation");
		var isValid = $("#addTouristForm").form("validate");
		if (isValid) {
			var data=$("#addTouristForm").serialize();
			CMC.request({
				url: TouristSpotInfo.addUrl,
				method: 'POST',
				data : $("#addTouristForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('addTouristSpotListDetail','close');
					$("#addTouristForm").form("clear");
				}
			});
		}
		
	});
	
	/**
	 *修改规则
	 */
	
	$("#touristSpotInfo_update").click(function(){
		$("#updateForm").form('clear');
		var code = CMC.grid.datagrid("getSelected");
		if(!code){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		var font=$("#updateForm font");
		font.hide();
		$("#updateForm").form("load",{
			'id':code['id'],
			'tspotName':code['tspotName'],
			'tspotEname':code['tspotEname'],
			'tspotPhoneticTotal':code['tspotPhoneticTotal'],
			'tspotPhoneticSimple':code['tspotPhoneticSimple'],
			'tspotGrade':code['tspotGrade'],
			'tspotLongitude':code['tspotLongitude'],
			'tspotLatitude':code['tspotLatitude'],
			'cityId':code['cityId'],
			'remarks':code['remarks'],
		});
		$("#updateForm .easyui-combobox").combobox('disable'); 
		$("#updateForm :input").prop({disabled: true});
		$("#submit_update").linkbutton({'disabled':true});
		CMC.dialog('updateTouristSpotListDetail','open');
	});
	
	/**
	 *启用编辑
	 */
	$("#submit_edit").click(function(event) {
		$("#updateForm font").show();
		$("#submit_update").removeAttr('disabled');
		$('#updateForm .easyui-combobox').combobox('enable'); 
		$("#submit_update").linkbutton({'disabled':false});
		$("#updateForm :input").removeAttr('disabled');
	});
	
	
	/**
	 *提交更新
	 */
	$("#submit_update").linkbutton({'onClick':function(){
			var isValid = $("#updateForm").form("validate");
			if (isValid) {
				var data=$("#updateForm").serialize();
				CMC.request({
					url: TouristSpotInfo.updateUrl,
					method: 'POST',
					data : $("#updateForm").form().serialize(),
					success: function(result){
						CMC.alertMessage(result.messageBody,'info');
						CMC.search();
					}
				});
			}
		}
	});
	/**
	 *删除
	 */
	 $("#touristSpotInfo_delete").linkbutton({'onClick':function(){
 		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		 CMC.confirm("确定删除景点信息?", function(r){
			  if(r){
				  CMC.request({
						url: TouristSpotInfo.deleteUrl,
						method: 'POST',
						data : {id:record["id"]},
						success: function(response){
							CMC.alertMessage(response.messageBody,'info');
							CMC.search();
						}
					});
			  }
		  });
	 	}
	});

})(jQuery);

/**
 * 正则验证
 */
$.extend($.fn.validatebox.defaults.rules, {   
	/**
	 * 验证中文
	 */
	ChineseValid: { 
        validator: function(value, param){  
        	var regEx=/^.+$/; 
            return regEx.test(value);    
        },
        message: '只能输入汉字!'
    },
    EnglishValidValid:{
		validator:function(value, param){
			var regEx=/^[^\u4e00-\u9fa5]+$/;
			return regEx.test(value); 
		},
		message:'请输入景点的英文'
	},
    /**
     * 验证拼音
     */
    PinyinValid:{
		validator:function(value, param){
			var regEx=/^[^\u4e00-\u9fa5]+$/;
			return regEx.test(value); 
		},
		message:'请输入景点的拼音'
	},
    /**
     * 验证经度
     */
    LontuValid:{
		validator:function(value, param){
			var regEx=/^[\-\+]?(0?\d{1,2}\.\d{1,10}|1[0-20]?\d{1}\.\d{1,20}|180\.0{1,10})$/;
			return regEx.test(value); 
		},
		message:'请输入正确的经度（例如：-180.0    ～   +180.0）'
	},
	 /**
     * 验证纬度
     */
	LatitudeValid:{
		validator:function(value, param){
			var regEx=/^[\-\+]?([0-8]?\d{1}\.\d{1,10}|90\.0{1,10})$/;
			return regEx.test(value); 
		},
		message:'请输入正确的纬度（例如：-90.0   ～   +90.0）'
	}
});

$(document).ready(function(){
	CMC.init(TouristSpotInfo);	
});