/**
 * 区域管理
 */

var MkAreaInfo={
		searchTableRequired: true,
		menuId: "MkAreaInfo",
		searchUrl: "authorized/mkAreaInfo/getAll" ,
		addUrl: "authorized/mkAreaInfo/add",
		updateUrl: "authorized/mkAreaInfo/update",
		deleteUrl: "authorized/mkAreaInfo/delete",
		getUrl: "authorized/mkAreaInfo/get",
		getCityListUrl:"authorized/mkAreaInfo/getCityList",
		getCityByIdUrl:"authorized/mkAreaInfo/getCityById",
		addMareaAndCityUrl:"authorized/mkAreaInfo/addMareaAndCity",
		columns:[[
			{field: 'mareaName', title:'营销区域名称' , width: '25%' , align: 'center'},
			{field: 'mareaUse', title:'营销区域用途' , width: '25%' , align: 'center'},
//			{field: 'binding', title:'操作' , width: '25%' , align: 'center',formatter:function(value,rowData,rowIndex){
//				return "<a href='javascript:void(0)' class='easyui-linkbutton' onclick=\"bindingCity(\'"+rowData.id+"\')\">城市绑定</a>";
//			}},
			{field: 'cityCount', title:'城市绑定数' , width: '25%' , align: 'center',formatter:function(value,rowData,rowIndex){
				if(null != value){
					return "已绑定"+value+"个城市";
				}else{
					return "未绑定城市";
				}
			}}
		]],
		 onDblClickRow: function(){
        	//$("#areaInfo_update").click();
        }
};

var originalCity = new Array();//已绑定的城市列表

var newCityArray = new Array();//最新将要绑定的城市列表

var mareaIdBinding = null;//全局区域ID

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
	$("#mkAreaInfo_reset").click(function(){
		// $("#input_code").textbox('setValue','');
		// $("#input_name").textbox('setValue','');
		// $("#input_airzhname").textbox('setValue','');
		// $("#select_international").combobox('select','');
		$("#searchForm ").form('clear');
		$("#searchForm [name='start']").val('1');
		$("#searchForm [name='end']").val('10');
	});

	$("#mkAreaInfo_bind").click(function(){
		var record = CMC.grid.datagrid("getSelected");
		if(!record){
			CMC.alertMessage("请先选中一条记录！","warning");
			return;
		}
		bindingCity(record.id);
	});
	
	/**
	 * 弹出添加窗口
	 */
	$("#mkAreaInfo_add").click(function(){
//		$("#addForm").form("enableValidation");
//		var isValid = $("#addForm").form("validate");
		$("#addForm").form('clear');
		CMC.dialog('addMkAreaDetail','open');
	});
	
	/**
	 * 添加区域
	 */
	$("#submit_add").click(function(){
		$("#addForm").form("enableValidation");
		var isValid = $("#addForm").form("validate");

		if (isValid) {
			
			var data=$("#addForm").serialize();
			
			CMC.request({
				url: MkAreaInfo.addUrl,
				method: 'POST',
				data : $("#addForm").form().serialize(),
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					CMC.search();
					CMC.dialog('addMkAreaDetail','close');
					$("#addForm").form("clear");
				}
			});
		}
		
	});
	
	/**
	 *修改
	 */
	
	$("#mkAreaInfo_update").click(function(){
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
			'createBy' : record['createBy'],
			'createDate' : record['createDate'],
			'mareaName' : record['mareaName'],
			'mareaUse' : record['mareaUse'],
			'remarks' : record['remarks'],
		});
		$("#updateForm :input").prop({disabled: true});
		$("#submit_update").linkbutton({'disabled':true});
		CMC.dialog('updateMkAreaDetail','open');
	});
	
	/**
	 *启用编辑
	 */
	$("#submit_edit").click(function(event) {
		$("#updateForm font").show();
		$("#submit_update").removeAttr('disabled');
		$("#submit_update").linkbutton({'disabled':false});
		$("#updateForm :input").removeAttr('disabled');
		//$("#updateForm #code").prop({disabled: true});
		//$("#locale_edit").combobox('disable'); 
	});
	
	
	/**
	 *提交更新
	 */
	$("#submit_update").linkbutton({'onClick':function(){
			var isValid = $("#updateForm").form("validate");
			if (isValid) {
				var data=$("#updateForm").serialize();
				CMC.request({
					url: MkAreaInfo.updateUrl,
					method: 'POST',
					data : $("#updateForm").form().serialize(),
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
	 $("#mkAreaInfo_delete").linkbutton({
	 	'onClick':function(){
	 		var record = CMC.grid.datagrid("getSelected");
			if(!record){
				CMC.alertMessage("请先选中一条记录！","warning");
				return;
			}
			 CMC.confirm("确定删除营销区域信息?", function(r){
				  if(r){
					  CMC.request({
							url: MkAreaInfo.deleteUrl  ,
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
			 if(null != rightAll){
				 for(var j = 0 ; j < rightAll.length; j++){
					 if(rightAll[j].cityId == cityVal){
						 flag = false;
					 }
				 }
			 }
			 if(flag){
				 var city ={"value":cityVal,"text":cityText};
				 city_data.push(city);
			 }
			 $(this).remove();//右移删除左边列表中的数据
		 });
		 //2.选中option添加到右边select
		 for(var i = 0 ; i<city_data.length; i++){
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
		 for(var i = 0 ;i<city_data.length ; i++){
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
	  * 城市绑定
	  */
	 $("#submit_cityBinding").click(function(){
		 var newCityIds = getCityId(newCityArray);
			CMC.request({
				url: MkAreaInfo.addMareaAndCityUrl,
				method: 'POST',
				data : {"mareaId":mareaIdBinding,
					    "originalIds":originalCity,
					    "newCityIds":newCityIds
				},
				traditional:true,
				success: function(result){
					CMC.alertMessage(result.messageBody,'info');
					mareaIdBinding = null;
					originalCity.length = 0;
					CMC.search();
					CMC.dialog('mkAreaBindingCity','close');
					
				}
					
				
			});
	 });
	 
	 //已绑定城市搜索
	 $("#right_citySearch").click(function(){
		 var cityName = $("#mkAreaBindingCity #right_cityName").val();
		 citySelect(cityName);
		 
	 });
	 
})(jQuery);


$(document).ready(function(){
	CMC.init(MkAreaInfo);	
});

function bindingCity(mkAreaid){
	originalCity = [];
	newCityArray = [];
	$("#left_city_list").empty();
	$("#right_city_list").empty();
	$("#mkAreaBindingCity #input_cityName").textbox("setValue", "");
	$("#mkAreaBindingCity #right_cityName").textbox("setValue", "");
	mareaIdBinding = mkAreaid;
	CMC.request({
		url: MkAreaInfo.getCityByIdUrl,
		method: 'POST',
		data : {"mareaId":mkAreaid},
		success: function(result){
			var cityList = result.messageBody.cityList;
			if(null != cityList && cityList.length>0 ){
				//把查询结果存放在右边下拉框中
				for(var i = 0;i < cityList.length;i++){
					originalCity.push(cityList[i].cityId);
					var cityKeyVal = new Object();
					cityKeyVal.cityId = cityList[i].cityId;
					cityKeyVal.cityName = cityList[i].cityName;
					newCityArray.push(cityKeyVal);
					$("#right_city_list").append("<option value="+cityList[i].cityId+">"+cityList[i].cityName+"</option>")
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

//获取左边下拉框中的所有制
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
		url: MkAreaInfo.getCityListUrl,
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






