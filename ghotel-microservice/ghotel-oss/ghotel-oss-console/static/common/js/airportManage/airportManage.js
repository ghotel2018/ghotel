/**
 * 机场数据管理 
 */
 var AirportInfo={
		searchTableRequired:true,
		menuId:"AirportInfo",
		searchUrl: "authorized/airportData/getAll",
		addUrl: 'authorized/airportData/add',
		updateUrl: 'authorized/airportData/update',
		deleteUrl: 'authorized/airportData/delete',
		getUrl: "authorized/airportData/get",
		getCityListUrl:"authorized/airportData/getCityList",
		getCityUrl:"authorized/airportData/getCity",
		getCityById:"authorized/airportData/getCityById",
		addAirportAndCityUrl:"authorized/airportData/addAirportAndCity",
		getRuleAndChildUrl: "authorized/airportData/getRuleAndChild",
		exportUrl:"authorized/airportData/export",
		rownumbers:true,
		singleSelect:true,
		columns:[[
		          {field: 'airportName', title:'机场中文名' , width: '15%' , align: 'center'},
		          {field: 'airportEname', title:'机场英文名' , width: '20%' , align: 'center'},
		          {field: 'airportCode3', title:'机场三字码' , width: '5%' , align: 'center'},
		          {field: 'airportPhoneticSimple', title:'机场拼音（首字母简写）' , width: '10%' , align: 'center'},
		          {field: 'airportPhoneticTotal', title:'机场拼音（全拼）' , width: '22%' , align: 'center'},
		          {field: 'cityName', title:'所属区域（城市）', width: '6%' , align: 'center'},
		          {field: 'cityNameRec', title:'共用城市', width: '11%' , align: 'center'},
		          {field: 'binding', title:'添加共用机场城市' , width: '10%' , align: 'center',formatter:function(value,rowData,rowIndex){
						return "<a href='javascript:void(0)' class='easyui-linkbutton' onclick=\"bindingCity(\'"+rowData.id+"\')\">添加共用机场城市</a>";
					}},
		          ]]
};

var originalCity = new Array();//已绑定的城市列表

var airportIdBinding = null;//全局机场ID

var newCityArray = new Array();//最新将要绑定的城市列表

//集合删除
Array.prototype.remove = function(param) {
	if(null != newCityArray){
		for(var i=0;i<newCityArray.length;i++){
			if(param == newCityArray[i].cityId){
				this.splice(i, 1);
				return true;
			}
		}
	}
	return false;
};

(function($){
	/**
	 * 重置
	 */
	$("#airPortManage_reset").click(function(){
		$("#searchForm").form('clear');
		$("#searchForm [name='start']").val('1');
		$("#searchForm [name='end']").val('10');
	});
	/**
	 * 弹出添加窗口
	 */
	$("#airPortManage_add").click(function(){
		CMC.request({
			url: AirportInfo.getRuleAndChildUrl,
			method: 'POST',
			data : {"ruleAir" : "AI","Id" : null},
			success: function(result){
				var rule = result.messageBody.ruleInfo;
				dynamicRuleLable("add",rule,null);
			}
		});
		$("#addForm").form('clear');
		CMC.dialog('addAirPortInfoDetail','open');
	});
	
	/**
	 * 添加
	 */
	$("#submit_add").click(function(){
		$("#addForm").form("enableValidation");
		var isValid = $("#addForm").form("validate");
		if (isValid) {
			var ruleInfo = getRuleAndChild("#addForm");
			var airInfo = getJson("#addForm");
			CMC.request({
				url: AirportInfo.addUrl,
				method: 'POST',
				data :{"airInfo":airInfo,"ruleInfo":JSON.stringify(ruleInfo)},
				traditional:true,
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('addAirPortInfoDetail','close');
					$("#addForm").form("clear");
				}
			});
		}
	});
	/**
	 *删除
	 */
	 $("#airPortManage_delete").linkbutton({
	 	'onClick':function(){
	 		var record = CMC.grid.datagrid("getSelected");
			if(!record){
				CMC.alertMessage("请先选中一条记录！","warning");
				return;
			}
			 CMC.confirm("确定删除机场信息?", function(r){
				  if(r){
					  CMC.request({
							url: AirportInfo.deleteUrl,
							method: 'POST',
							data : record,
							success: function(response){
								CMC.alertMessage(response.messageBody,'info');
								CMC.search();
							}
						});
				  }
			  });
	 	}
	});

	/**
	 * 打开编辑窗口
	 */
	$("#airPortManage_update").linkbutton({
		'onClick':function(){
			var code = CMC.grid.datagrid("getSelected");
			if(!code){
				CMC.alertMessage("请先选中一条记录！","warning");
				return;
			}
			var font=$("#updateForm font");
			font.hide();
			$("#updateForm").form("load",{
				'id' : code['id'],
				'airportName' : code['airportName'],
				'airportEname' : code['airportEname'],
				'airportCode3' : code['airportCode3'],
				'airportNameSimple' : code['airportNameSimple'],
				'airportEnameSimple' : code['airportEnameSimple'],
				'uairportName' : code['uairportName'],
				'uairportEname' : code['uairportEname'],
				'uairportPhoneticTotal' : code['uairportPhoneticTotal'],
				'uairportPhoneticSimple' : code['uairportPhoneticSimple'],
				'airportPhoneticTotal' : code['airportPhoneticTotal'],
				'airportPhoneticSimple' : code['airportPhoneticSimple'],
				'airportLongitude' : code['airportLongitude'],
				'airportLatitude' : code['airportLatitude'], 
				'remarks' : code['remarks'],
				'cityId' : code['cityId'],
				});
			CMC.request({
				url: AirportInfo.getRuleAndChildUrl,
				method: 'POST',
				data : {"ruleAir" : "AI","Id" : code['id']},
				success: function(result){
					var rule = result.messageBody.ruleInfo;
					var ruleValue = result.messageBody.ruleValueInfo;
					dynamicRuleLable("update",rule,ruleValue)
				}
			});
			$("#updateForm.easyui-combobox").combobox('disable'); 
			$("#updateForm :input").prop({disabled: true});
			$("#submit_update").linkbutton({'disabled':true});
			CMC.dialog('editAirPortInfoDetail','open');
		}
	});

	$("#airPortManage_export").click(function(){
		 CMC.request({
				url: AirportInfo.exportUrl,
				method: 'POST',
				data:$("#searchForm").serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
				}
			});
	 });
	
	/**
	 *启用编辑
	 */
	$("#submit_edit").click(function(event) {
		$("#updateForm font").show();
		$("#update_cityType").removeAttr("disabled");
		$("#submit_update").removeAttr('disabled');
		$('#updateForm.easyui-combobox').combobox('enable'); 
		$("#submit_update").linkbutton({'disabled':false});
		$("#updateForm :input").removeAttr('disabled');
	});
	
	/**
	 *提交更新
	 */
	$("#submit_update").linkbutton({'onClick':function(){
		var isValid = $("#updateForm").form("validate");
		if (isValid) {
			var airInfo = getJson("#updateForm");
			var ruleInfo = getRuleAndChild("#updateForm");
			CMC.request({
				url: AirportInfo.updateUrl,
				method: 'POST',
				data : {"airInfo" : airInfo,"ruleInfo" : JSON.stringify(ruleInfo)},
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
				}
			});
		}
	}});
	
	 $("#citySerch").click(function(){
		 setRightSelect();
	 });
	 
	//把左边下拉选中的的城市往右移动
	 $("#right_move").click(function(){
		 //1.存放有选中的城市列表
		 var city_data = new Array();
		//获取所有右边下拉框的城市val
		 //var rightAll = getRightAll();
		 var rightAll = newCityArray;
		 $("#left_city_list option:selected").each(function(){
			 var cityVal = $(this).val();
			 var cityText = $(this).text();
			 var flag = true;//标识右边框是否有此值
			 for(var j = 0 ; j < rightAll.length; j++){
				 if(rightAll[j] == cityVal){
					 flag = false;
				 }
			 }
			 if(flag){
				 var city ={"value":cityVal,"text":cityText};
				 city_data.push(city);
			 }
			 $(this).remove();//右移删除左边列表中的数据
		 });
		 //2.选中option添加到右边select
		 for(var i = 0 ; i<city_data.length ; i++){
			var cityKeyVal = new Object();
			cityKeyVal.cityId = city_data[i].value;
			cityKeyVal.cityName = city_data[i].text;
			newCityArray.push(cityKeyVal);
			$("#right_city_list").append("<option value="+city_data[i].value+">"+city_data[i].text+"</option>")
		 }
		 var newRightAll = newCityArray;
		 if(null != newRightAll){
			 $("#cityCount").text(newRightAll.length);
		 }else{
			 $("#cityCount").text("0");
		 }
	 });
	 
	 $("#delete_right_city").click(function(){//删除右边下拉框中的城市
		 var city_data = new Array();//存放选中的城市列表
		 var leftAll = getLeftAll();
		 $("#right_city_list option:selected").each(function(){
			 var cityVal = $(this).val();
			 var cityText = $(this).text();
			 newCityArray.remove(cityVal);//移除选中城市
			 var flag = true;//标识左边框是否有此值
			 for(var j = 0 ; j < leftAll.length; j++){
				 if(leftAll[j] == cityVal){
					 flag = false;
				 }
			 }
			 if(flag){
				 var city ={"value":cityVal,"text":cityText};
				 city_data.push(city);
			 }
			 $(this).remove();//删除右边选中的城市
		 });
		 //2.获取右边下拉框所有值
		 for(var i = 0 ; i<city_data.length ; i++){
			 $("#left_city_list").append("<option value="+city_data[i].value+">"+city_data[i].text+"</option>")
		 }
		 
		 var newRightAll = newCityArray;
		 if(null != newRightAll){
			 $("#cityCount").text(newRightAll.length);
		 }else{
			 $("#cityCount").text("0");
		 }
	 });
	 
	 /**
	  * 推荐城市绑定
	  */
	 $("#submit_cityBinding").click(function(){
		 var newCityIds = getCityId(newCityArray);
			CMC.request({
				url: AirportInfo.addAirportAndCityUrl,
				method: 'POST',
				data : {"airportId":airportIdBinding,
					    "originalIds":originalCity,
					    "newCityIds":newCityIds
				},
				traditional:true,
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('mkAreaBindingCity','close');
					airportIdBinding = null;
					originalCity = [];
					
				}
			});
	 });
	 
	 //已绑定城市搜索
	 $("#right_citySearch").click(function(){
		 var cityName = $("#mkAreaBindingCity #right_cityName").val();
		 citySelect(cityName);
		 
	 });
})(jQuery);

/**
 * 验证
 */
$.extend($.fn.validatebox.defaults.rules, {  
    threeCodeValid: { 
        validator: function(value, param){  
        	var regEx=/^[a-zA-Z]{3}$/; 
            return regEx.test(value);    
        },    
        message: '请输入机场三字码！'
    },
    ChineseValid: { 
        validator: function(value, param){  
        	var regEx=/^[^0-9]+$/;  
            return regEx.test(value);    
        },    
        message: '请输入中文名！'
    },
    EnglishKValid:{
    	validator:function(value, param){
    		var regEx=/^[^\u4E00-\u9FA5\d]+$/;
    		return regEx.test(value); 
    	},
    	message:'请输入英文'
    },
    EnglishValid:{
    	validator:function(value, param){
    		var regEx=/^[^\u4E00-\u9FA5\d]{2,70}$/;
    		return regEx.test(value); 
    	},
    	message:'请输入英文，长度为2-70！'
    },
    LontuValid:{
		validator:function(value, param){
			var regEx=/^[\-\+]?(0?\d{1,2}\.\d{1,7}|1[0-7]?\d{1}\.\d{1,10}|180\.0{1,10})$/;
			return regEx.test(value); 
		},
		message:'请输入正确的经度（例如：-180.0    ～   +180.0）'
	},
	LatitudeValid:{
		validator:function(value, param){
			var regEx=/^[\-\+]?([0-8]?\d{1}\.\d{1,10}|90\.0{1,10})$/;
			return regEx.test(value); 
		},
		message:'请输入正确的纬度（例如：-90.0   ～   +90.0）'
	},
    pinyinValid:{
    	validator:function(value, param){
    		var regEx=/^[^\u4E00-\u9FA5\d]{2,50}$/;
    		return regEx.test(value); 
    	},
    	message:'请输入拼音，长度为2-50！'
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
			var $td = $('<td width="10%" colspan="2"></td>');
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
							if(bool == true){//条目回显
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

$(document).ready(function(){
	CMC.init(AirportInfo);
});

/**获取表单对象*/
function getJson(formId){
	var obj = new Object();
	obj.id = $(formId+" #id").val();//机场id
	obj.airportCode3 =$(formId+" #airportCode3").val();//机场三字码
	obj.airportName =$(formId+" #airportName").val();//机场名
	obj.airportEname =$(formId+" #airportEname").val();//英文名
	obj.airportPhoneticTotal =$(formId+" #airportPhoneticTotal").val();//全拼
	obj.airportPhoneticSimple =$(formId+" #airportPhoneticSimple").val();//拼音首字母
	obj.uairportName =$(formId+" #uairportName").val();//别名
	obj.uairportEname =$(formId+" #uairportEname").val();//别名英文
	obj.uairportPhoneticTotal =$(formId+" #uairportPhoneticTotal").val();//别名全拼
	obj.uairportPhoneticSimple =$(formId+" #uairportPhoneticSimple").val();//别名首字母
	obj.airportLongitude =$(formId+" #airportLongitude").val();//经度
	obj.airportLatitude =$(formId+" #airportLatitude").val();//纬度
	obj.remarks =$(formId+" #remarks").textbox('getText');//备注
	obj.airportNameSimple = $(formId+" #airportNameSimple").val();
	obj.airportEnameSimple = $(formId+" #airportEnameSimple").val();
	if(formId == "#addForm"){
		obj.cityId = $("#add_city").combobox('getValue');//所属城市
	}else{
		obj.cityId = $("#update_city").combobox('getValue');//所属城市
	}
	return JSON.stringify(obj);
}

function bindingCity(id){
	originalCity = [];
	newCityArray = [];
	$("#left_city_list").empty();
	$("#right_city_list").empty();
	$("#mkAreaBindingCity #input_cityName").textbox("setValue", "");
	$("#mkAreaBindingCity #right_cityName").textbox("setValue", "");
	airportIdBinding = id;
	CMC.request({
		url: AirportInfo.getCityById,//参数机场id
		method: 'POST',
		data : {"airportId":id},
		success: function(result){
			var cityList = result.messageBody.cityList;
			if(null != cityList && cityList.length>0 ){
				//把查询结果存放在左边下拉框中
				for(var i = 0;i < cityList.length;i++){
					originalCity.push(cityList[i].cityId);
					var cityKeyVal = new Object();
					cityKeyVal.cityId = cityList[i].cityId;
					cityKeyVal.cityName = cityList[i].cityNameRec;
					newCityArray.push(cityKeyVal);
					$("#right_city_list").append("<option value="+cityList[i].cityId+">"+cityList[i].cityNameRec+"</option>")
				}
			}
			if(null != cityList){
				$("#cityCount").text(cityList.length);
			}else{
				$("#cityCount").text("0");
			}
		}
	});
	 //初始化右边下拉框的值
	 setRightSelect();
	 CMC.dialog('mkAreaBindingCity','open');
}


//获取左边下拉框中的所有值
function getLeftAll(){
	 var leftAllCity = new Array();
	 $("#left_city_list option").each(function(){
		 leftAllCity.push($(this).val());
	 });
	 return leftAllCity;
}

//获取右边下拉框中的所有值
function getRightAll(){
	 var rightAllCity = new Array();
	 $("#right_city_list option").each(function(){
		 rightAllCity.push($(this).val());
	 });
	 return rightAllCity;
}

//设置右边下拉框的值
function setRightSelect(){
	var $leftCity = $("#left_city_list");
	CMC.request({
		url: AirportInfo.getCityUrl,//
		method: 'POST',
		data : {"cityName":$("#input_cityName").val()},
		success: function(result){
			$leftCity.empty();
			var cityList = result.messageBody.cityList;
			if(null != cityList && cityList.length>0 ){
				 var city_data = new Array();//存放选中的城市列表
				 //var rightAll = getRightAll();
				 var rightAll =  newCityArray;
				//把查询结果存放在左边下拉框中
				for(var i = 0;i < cityList.length;i++){
					var bool =true;
					for(var j=0 ; j < rightAll.length;j++){
						if(cityList[i].id == rightAll[j].cityId){
							bool =false;
						}
					}
					if(bool){
						$leftCity.append("<option value="+cityList[i].id+">"+cityList[i].cityName+"</option>")
					}
				}
			}
		}
	});
}

$(function(){
	CMC.request({
		url: AirportInfo.getCityListUrl,
		method: 'POST',
		success: function(result){
			$("#search_city").combobox({
				data: result.messageBody.cityList,
				panelHeight: '120px',
				valueField:'id',
				textField:'cityName' 
			});
			$("#add_city").combobox({
				data: result.messageBody.cityList,
				panelHeight: '120px',
				valueField:'id',
				textField:'cityName' 
			});
			$("#update_city").combobox({
				data: result.messageBody.cityList,
				panelHeight: '120px',
				valueField:'id',
				textField:'cityName' 
			});
		}
	});
});


//获取CityId
function getCityId(array){
	var cityList = new Array();
	if(null != array){
		for(var i=0;i<array.length;i++){
			cityList.push(array[i].cityId)
		}
	}
	return cityList;
}

//已绑定城市搜索
function citySelect(param){
	var rightArr = newCityArray;
	var arr = new Array();
	$("#right_city_list").empty();
	if(null != param){
		if(null != newCityArray && newCityArray.length>0){
			for(var i=0;i<newCityArray.length;i++){
				var cityname = newCityArray[i].cityName;
				if(cityname.indexOf(param)>=0){
					arr.push(newCityArray[i]);
				}
			}
		}
	}else{
		arr = newCityArray;
	}
	if(null != arr && arr.length>0){
		for(var j=0;j<arr.length;j++){
			$("#right_city_list").append("<option value="+arr[j].cityId+">"+arr[j].cityName+"</option>")
		}
	}
	
}
