/**
 * 区域管理
 */

var CityInfo={
		searchTableRequired: true,
		menuId: "CityInfo",
		searchUrl: "authorized/cityInfo/getAll" ,
		addUrl: "authorized/cityInfo/add",
		updateUrl : "authorized/cityInfo/update",
		deleteUrl: "authorized/cityInfo/delete",
		getUrl: "authorized/cityInfo/get",
		exportUrl:"authorized/cityInfo/export",
		getRuleAndChildUrl: "authorized/cityInfo/getRuleAndChild",
		batchUpdateUrl:"authorized/cityInfo/batchUpdate",
		columns:[[
			{field: 'cityName', title:'城市中文名' , width: '20%' , align: 'center'},
			{field: 'cityEname', title:'城市英文名' , width: '20%' , align: 'center'},
			{field: 'cityCode3', title:'城市三字码' , width: '20%' , align: 'center'},
			{field: 'cityPhoneticSimple', title:'城市拼音(首字母）' , width: '20%' , align: 'center'},
			{field: 'cityPhoneticTotal', title:'城市拼音(全拼)' , width: '20%' , align: 'center'},
		]],
		 onDblClickRow: function(){
        	//$("#areaInfo_update").click();
        }
};

(function($){
	/**
	 * 重置
	 */
	$("#cityInfo_reset").click(function(){
		// $("#input_code").textbox('setValue','');
		// $("#input_name").textbox('setValue','');
		// $("#input_airzhname").textbox('setValue','');
		// $("#select_international").combobox('select','');
		$("#searchForm ").form('clear');
		$("#searchForm [name='start']").val('1');
		$("#searchForm [name='end']").val('10');
	});

	$("#batchUpdateBtn").click(function(){
		CMC.request({
			url: CityInfo.batchUpdateUrl,
			method: "POST",
			success: function(response){
				CMC.alertMessage("更新成功", 'info');
			},
			error: function(){
				CMC.alertMessage("服务器发生错误，请联系系统管理员！",'error');
			}
		});
	});
	
	$("#cityInfo_export").click(function(){
		CMC.request({
			url: CityInfo.exportUrl,
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
	$("#cityInfo_add").click(function(){
		$("#addForm").form('clear');
		CMC.request({
			url: CityInfo.getRuleAndChildUrl,
			method: 'POST',
			data : {"ruleArea" : "CI","cityId" : null},
			success: function(result){
				var rule = result.messageBody.ruleInfo;
				dynamicRuleLable("add",rule,null)

			}
		});
		$('#addCityInfoDetail #cityEstate').combobox('disable');
		CMC.dialog('addCityInfoDetail','open');
	});
	
	/**
	 * 添加区域
	 */
	$("#submit_add").click(function(){
		$("#addForm").form("enableValidation");
		var isValid = $("#addForm").form("validate");
		if (isValid) {
			var cityInfo = getJson("#addForm");
			var ruleInfo = getRuleAndChild("#addForm");
			CMC.request({
				url: CityInfo.addUrl,
				method: 'POST',
				data : {"cityInfo" : cityInfo,"ruleInfo" : JSON.stringify(ruleInfo)},
				//contentType: "application/json",
				traditional:true,
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('addCityInfoDetail','close')
					$("#addForm").form("clear");
				}
			});
		}
		
	});
	
	/**
	 *修改
	 */
	
	$("#cityInfo_update").click(function(){
		$("#updateForm").form('clear');
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		var font=$("#updateForm font");
		font.hide();
		$("#updateForm").form("load",{
			'id' : record['id'],
			'cityCode3' : record['cityCode3'],
			'cityName' : record['cityName'],
			'cityEname' : record['cityEname'],
			'cityPhoneticTotal' : record['cityPhoneticTotal'],
			'cityPhoneticSimple' : record['cityPhoneticSimple'],
			'ucityName' : record['ucityName'],
			'ucityEname' : record['ucityEname'],
			'ucityPhoneticTotal' : record['ucityPhoneticTotal'],
			'ucityPhoneticSimple' : record['ucityPhoneticSimple'],
			'cityState' : record['cityState'],
			'cityEstate' : record['cityEstate'],
			'cityCountiy' : record['cityCountiy'],
			'cityEcountiy' : record['cityEcountiy'],
			'cityCountyCode3' : record['cityCountyCode3'],
			'cityCountiyMoney' : record['cityCountiyMoney'],			
			'cityProvince' : record['cityProvince'],
			'cityEprovince' : record['cityEprovince'],
			'cityLongitude' : record['cityLongitude'],
			'cityLatitude' : record['cityLatitude'],
			'remarks' : record['remarks'],
		});
		CMC.request({
			url: CityInfo.getRuleAndChildUrl,
			method: 'POST',
			data : {"ruleArea" : "CI" ,"cityId" : record['id']},
			success: function(result){
				var rule = result.messageBody.ruleInfo;
				var ruleValue = result.messageBody.ruleValueInfo;
				dynamicRuleLable("update",rule,ruleValue)

			}
		});
		$("#updateForm .easyui-combobox").combobox('disable'); 
		$("#updateForm :input").prop({disabled: true});
		$("#submit_update").linkbutton({'disabled':true});
		CMC.dialog('updateCityInfoDetail','open');
	});
	
	/**
	 *启用编辑
	 */
	$("#submit_edit").click(function(event) {
		$("#updateForm font").show();
		$("#submit_update").removeAttr('disabled');
		$("#submit_update").linkbutton({'disabled':false});
		$("#updateForm :input").removeAttr('disabled');
		$('#updateForm .easyui-combobox').combobox('enable');
		$('#updateCityInfoDetail #cityEstate').combobox('disable');
		//$("#updateForm #code").prop({disabled: true});
		//$("#locale_edit").combobox('disable'); 
	});
	
	/**
	 *提交更新
	 */
	$("#submit_update").linkbutton({'onClick':function(){
			var isValid = $("#updateForm").form("validate");
			if (isValid) {
				var cityInfo = getJson("#updateForm");
				var ruleInfo = getRuleAndChild("#updateForm");
				CMC.request({
					url: CityInfo.updateUrl,
					method: 'POST',
					data : {"cityInfo" : cityInfo,"ruleInfo" : JSON.stringify(ruleInfo)},
					success: function(result){
						CMC.alertMessage(result.messageBody,'info');
						CMC.search();
						// CMC.dialog('addAirPortsListDetail','close');
						// $("#updateForm").form("clear");
					}
				});
			}
		}
	});
	/**
	 *删除
	 */
	 $("#cityInfo_delete").linkbutton({
	 	'onClick':function(){
	 		var record = CMC.grid.datagrid("getSelected");
			if(!record){
				CMC.alertMessage("请先选中一条记录！","warning");
				return;
			}
			 CMC.confirm("确定删除城市信息?", function(r){
				  if(r){
					  CMC.request({
							url: CityInfo.deleteUrl  ,
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
	 
	 
	 $("#addCityInfoDetail #cityState").combobox({
		 onSelect: function(record){
			 var state = record.value;
			 var estate = leval(state);
			 $("#addCityInfoDetail #cityEstate").combobox('setValue', estate);
			}
		});
	 
	 $("#updateCityInfoDetail #cityState").combobox({
		 onSelect: function(record){
			 var state = record.value;
			 var estate = leval(state);
			 $("#updateCityInfoDetail #cityEstate").combobox('setValue', estate);
			}
		});
	 
})(jQuery);


$(document).ready(function(){
	CMC.init(CityInfo);	
});


$.extend($.fn.validatebox.defaults.rules, {    
	cityNameValid: {    
        validator: function(value, param){  
        	//var regEx=/^[\u4e00-\u9fa5]*(\(|\（){0,1}[\u4e00-\u9fa5]*(\)|\）){0,1}$/; 
        	var regEx=/^[^a-zA-Z0-9]+$/;
            return regEx.test(value);    
        },    
        message: '必填项，仅支持输入中文'
    },
    cityEnameValid :{
    	 validator: function(value, param){  
        	//var regEx=/^[a-zA-Z]+(\(|\（){0,1}[a-zA-Z]*(\)|\）){0,1}$/;
    		 var regEx=/^[^\u4e00-\u9fa5\d]+$/;
            return regEx.test(value);    
        },    
        message: '必填项，仅支持输入字母'
    },
    cityPhoneticTotalValid :{
   	   validator: function(value, param){  
   		   //var regEx=/^[a-zA-Z]+(\(|\（){0,1}[a-zA-Z]*(\)|\）){0,1}$/;
   		   var regEx=/^[^\u4e00-\u9fa5\d]+$/;
           return regEx.test(value);    
       },    
       message: '必填项，仅支持输入字母'
   },
   cityPhoneticSimpleValid :{
  	 validator: function(value, param){  
      	//var regEx=/^[a-zA-Z]+$/;
  		  var regEx=/^[^\u4e00-\u9fa5\d]+$/;
          return regEx.test(value);    
      },    
      message: '必填项，仅支持输入字母'
  },
  cityCodeThreeValid: { 
	    validator: function(value, param){  
	    	var regEx=/^[a-zA-Z0-9]{3}$/; 
	        return regEx.test(value);    
	    },    
	    message: '选填项，仅支持输入字母，数字且只能为3位'
	},
	  cityStateValid :{
	 	 validator: function(value, param){  
	     	var regEx=/^[\u4e00-\u9fa5]*$/;
	         return regEx.test(value);    
	     },    
	     message: '必填项，仅支持输入中文'
	  },
	cityEstateValid :{
		 validator: function(value, param){  
	    	var regEx=/^[a-zA-Z]+$/;
	        return regEx.test(value);    
	    },    
	    message: '必填项，仅支持输入字母'
	},
	cityCountiyValid :{
		 validator: function(value, param){  
	   	var regEx=/^[\u4e00-\u9fa5]*$/;
	       return regEx.test(value);    
	   },    
	   message: '必填项，仅支持输入中文'
	},
	cityEcountiyValid :{
		 validator: function(value, param){  
	   	var regEx=/^[a-zA-Z]+$/;
	       return regEx.test(value);    
	   },    
	   message: '必填项，仅支持输入字母'
	},
	cityCountyCodeThreeValid: { 
	    validator: function(value, param){  
	    	var regEx=/^[a-zA-Z]{2}$/; 
	        return regEx.test(value);    
	    },    
	    message: '必填项,仅支持输入字母,且只能为2位'
	},
	cityProvinceValid :{
		 validator: function(value, param){  
	   	var regEx=/^[\u4e00-\u9fa5]*$/;
	       return regEx.test(value);    
	   },    
	   message: '选填项，仅支持输入中文'
	},
	cityEProvinceValid :{
		 validator: function(value, param){  
	   	var regEx=/^[a-zA-Z]+$/;
	       return regEx.test(value);    
	   },    
	   message: '选填项，仅支持输入字母'
	},
	LontuValid:{
		validator:function(value, param){
			var regEx=/^[\-\+]?(0?\d{1,2}\.\d{1,10}|1[0-7]?\d{1}\.\d{1,10}|180\.0{1,10})$/;
			return regEx.test(value); 
		},
		message:'选填项，请输入正确的经度（例如：-180.0    ～   +180.0）'
	},
	LatitudeValid:{
		validator:function(value, param){
			var regEx=/^[\-\+]?([0-8]?\d{1}\.\d{1,10}|90\.0{1,10})$/;
			return regEx.test(value); 
		},
		message:'选填项，请输入正确的纬度（例如：-90.0   ～   +90.0）'
	}
});

function dynamicRuleLable(type,data,ruleValue){
	var tableId = null;
	var radioName = null;
	if(type == "add"){
		tableId = "#addTable";
		radioName = "addRadio"
	}else{
		tableId ="#updateTable";
		radioName = "updateRadio"
	}
	var rule = data;
	if(null != rule && rule.length>0){
		//查询规则动态生成表单
		$(tableId+" .dynamicLable").remove();
		for(var i=0 ; i<rule.length;i++){
			var $hiddenInput = $('<input type="hidden" name="ruleId" value="'+rule[i].ruleId+'" />')
			var $tr = $("<tr class='dynamicLable'></tr>");
			var $th = $('<th width="40%">'+rule[i].ruleName+'：</th>');
			var $td = $('<td width="10%" colspan="3"></td>');
			var isUsed = false;
			if(rule[i].ruleIsUsing == "T"){
				isUsed = true;
			}
				var child = rule[i].ruleChild;
				if(child != null && child.length>0){
					for(var j=0;j<child.length;j++){
						var $input = null;
						if(null != ruleValue && ruleValue.length>0){
							var bool = true;
							var flag = 0;
							for(var k=0; k < ruleValue.length ; k++){
								if(ruleValue[k].ruleId != rule[i].ruleId){
									flag++;
								}
								if(ruleValue[k].ruleId == rule[i].ruleId && ruleValue[k].ruleValue == child[j].ruleValue ){
									$input = $('<input  class="ruleChild" type="radio" name="'+radioName+i+'" value="'+child[j].id+'/'+child[j].ruleValue+'" checked="checked">'+child[j].ruleName+'&nbsp;&nbsp;</input>');
									bool = false;
								}
							}
							if(bool == true){
								$input = $('<input  class="ruleChild" type="radio" name="'+radioName+i+'" value="'+child[j].id+'/'+child[j].ruleValue+'">'+child[j].ruleName+'&nbsp;&nbsp;</input>');
							}
							if(flag == ruleValue.length){//条目回显
								//$input = $('<input  class="ruleChild" type="radio" name="'+radioName+i+'" value="'+child[j].id+'/'+child[j].ruleValue+'">'+child[j].ruleName+'&nbsp;&nbsp;</input>');
								if(child[j].ruleIsDefault == "T"){
									$input = $('<input  class="ruleChild" type="radio" name="'+radioName+i+'" value="'+child[j].id+'/'+child[j].ruleValue+'" checked="checked">'+child[j].ruleName+'&nbsp;&nbsp;</input>');
								}else{
									$input = $('<input  class="ruleChild" type="radio" name="'+radioName+i+'" value="'+child[j].id+'/'+child[j].ruleValue+'">'+child[j].ruleName+'&nbsp;&nbsp;</input>');
								}
							}
						}else{
							if(child[j].ruleIsDefault == "T"){
								$input = $('<input  class="ruleChild" type="radio" name="'+radioName+i+'" value="'+child[j].id+'/'+child[j].ruleValue+'" checked="checked">'+child[j].ruleName+'&nbsp;&nbsp;</input>');
							}else{
								$input = $('<input  class="ruleChild" type="radio" name="'+radioName+i+'" value="'+child[j].id+'/'+child[j].ruleValue+'">'+child[j].ruleName+'&nbsp;&nbsp;</input>');
							}
						}
						$td.append($input);
						if(j == (child.length-1) && isUsed == false){
							$td.append($('<span style="color: red">规则条目未生效</span>'));
						}
					}
					
					
				}else{
					$td.append($('<span style="color: red">未绑定条目，请绑定</span>'));
					$tr.append($th);
					$tr.append($td);
					$tr.append($hiddenInput)
					$(tableId).append($tr);
					continue;
				}
		/*	}else{
				$td.append($('<span style="color: red">规则条目未生效</span>'));
				$tr.append($th);
				$tr.append($td);
				$tr.append($hiddenInput)
				$(tableId).append($tr);
				continue;
			}*/
			$tr.append($th);
			$tr.append($td);
			$tr.append($hiddenInput);
			$(tableId).append($tr);
		}
	
	}

}


//获取规则条目值
function getRuleAndChild(fromId){
	var rules = new Array();
	$(fromId+" .dynamicLable").each(function(index,element){
		var ruleId = $(this).find("[name='ruleId']").val();
		var $radio = $(fromId+" .dynamicLable:eq("+index+") td input:checked").val();
		if(undefined != $radio || null != $radio ){
			var radioKV = $radio.split("/");
			var ruleChildId = radioKV[0];
			var ruleValue =   radioKV[1]
			var obj = new Object();
			obj.ruleId = ruleId;
			obj.ruleChildIs = ruleChildId;
			obj.ruleValue = ruleValue;
			rules.push(obj);
		}
	});
	return rules;
}


/**获取表单对象*/
function getJson(formId){
	var obj = new Object();
	obj.id = $(formId+" input[name='id']").val();
	obj.cityCode3 =$(formId+" #cityCode3").val().toUpperCase();
	obj.cityName =$(formId+" #cityName").val();
	obj.cityEname =$(formId+" #cityEname").val();
	obj.cityPhoneticTotal =$(formId+" #cityPhoneticTotal").val();
	obj.cityPhoneticSimple =$(formId+" #cityPhoneticSimple").val();
	obj.ucityName =$(formId+" #ucityName").val();
	obj.ucityEname =$(formId+" #ucityEname").val();
	obj.ucityPhoneticTotal =$(formId+" #ucityPhoneticTotal").val();
	obj.ucityPhoneticSimple =$(formId+" #ucityPhoneticSimple").val();
	obj.cityState =$(formId+" #cityState").combobox('getValue');
	obj.cityEstate =$(formId+" #cityEstate").combobox('getValue');
	obj.cityCountiy =$(formId+" #cityCountiy").val();
	obj.cityEcountiy =$(formId+" #cityEcountiy").val();
	obj.cityCountyCode3 =$(formId+" #cityCountyCode3").val();
	obj.cityCountiyMoney =$(formId+" #cityCountiyMoney").val();
	obj.cityProvince =$(formId+" #cityProvince").val();
	obj.cityEprovince =$(formId+" #cityEprovince").val();
	obj.cityEprovince =$(formId+" #cityEprovince").val();
	obj.cityLongitude =$(formId+" #cityLongitude").val();
	obj.cityLatitude =$(formId+" #cityLatitude").val();
	
	return JSON.stringify(obj);
}

/**封装将表单对象序列化为json对象*/
(function($) {
	$.fn.serializeJson = function() {
		var serializeObj = {};
		var array = this.serializeArray();
		var str = this.serialize();
		$(array).each(
				function() {
					if (serializeObj[this.name]) {
						if ($.isArray(serializeObj[this.name])) {
							serializeObj[this.name].push(this.value);
						} else {
							serializeObj[this.name] = [
									serializeObj[this.name], this.value ];
						}
					} else {
						serializeObj[this.name] = this.value;

					}
				});

		return serializeObj;

	};

})(jQuery);

function leval(param){
	var data = new Array();
	data.push({"en":"Asia","zh":"亚洲"});
	data.push({"en":"Europe","zh":"欧洲"});
	data.push({"en":"Africa","zh":"非洲"});
	data.push({"en":"North America","zh":"北美"});
	data.push({"en":"South America","zh":"南美"});
	data.push({"en":"Australia","zh":"大洋洲"});
	for(var i=0;i<data.length;i++){
		if(data[i].zh == param){
			return data[i].en;
		}
	}
	
}

