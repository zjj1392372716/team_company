$(function() {
	$('#dg').treegrid({
		url : 'getAllCustomers',
		striped : true,
		pagination:true,
		loadFilter:function(data,parentId){
			data = utils.copyProperty(data.rows || data,['customerId'],['tempid'],false);
			return utils.toTreeData(data,'tempid','supCustomerId','children');
		}
	});
	PageConfig("#dg");
});

function add() {
	$('#dg').datagrid('clearSelections');
	var VehicleURL = "getAllCustomerList";
	$.getJSON(VehicleURL, function(json) {
		$('#supCustomerName').combotree({
			data : json,
			valueField : 'id',
			textField : 'test'
		});
	});
	$('#dlg').dialog('open').dialog('setTitle', '新增客户');
	$('#fm').form('clear');
}
function modify() {
	var row = $("#dg").treegrid('getSelected');
	if(row == null){
		MessageInfo.Info('提示', "请先选择数据");
	} else {
		var VehicleURL = "getAllCustomerList?id=" + row.customerId;
		$.getJSON(VehicleURL, function(json) {
			$('#supCustomerName').combotree({
				data : json,
				valueField : 'id',
				textField : 'text'
			});
			if(row.supCustomerId!=null){
				$('#supCustomerName').combotree('setValue', row.supCustomerId);
			}			
		});
		$('#dlg').dialog('open').dialog('setTitle', '编辑客户');
		$('#fm').form('load', row);
	}
}
function save() {
	var row = $("#dg").treegrid('getSelected');
	var customerName = $.trim($("#customerName").textbox('getValue'));
	var supCustomerId = $("#supCustomerName").combotree('getValue');
	var enterpriseType = $.trim($("#enterpriseType").textbox('getValue'));
	var legalPerson = $.trim($("#legalPerson").textbox('getValue'));
	var detailAddress = $.trim($("#detailAddress").textbox('getValue'));
	var phoneNumber = $.trim($("#phoneNumber").textbox('getValue'));
	var taxRegistration = $.trim($("#taxRegistration").textbox('getValue'));
	var bankName = $.trim($("#bankName").textbox('getValue'));
	var bankNumber = $.trim($("#bankNumber").textbox('getValue'));
	var remark = $.trim($("#remark").textbox('getValue'));
	if(customerName==null || customerName.length==0){
		MessageInfo.Info("错误",getAsteriskEmpty());
		return;
	}else if(enterpriseType==null || enterpriseType.length==0){
		MessageInfo.Info("错误",getAsteriskEmpty());
		return;
	}else if(legalPerson==null || legalPerson.length==0){
		MessageInfo.Info("错误",getAsteriskEmpty());
		return;
	}else if(detailAddress==null || detailAddress.length==0){
		MessageInfo.Info("错误",getAsteriskEmpty());
		return;
	}else if(phoneNumber==null || phoneNumber.length==0){
		MessageInfo.Info("错误",getAsteriskEmpty());
		return;
	}else if(taxRegistration==null || taxRegistration.length==0){
		MessageInfo.Info("错误",getAsteriskEmpty());
		return;
	}else if(bankName==null || bankName.length==0){
		MessageInfo.Info("错误",getAsteriskEmpty());
		return;
	}else if(bankNumber==null || bankNumber.length==0){
		MessageInfo.Info("错误",getAsteriskEmpty());
		return;
	}
	if(row == null){
		$.ajax({
	 		type:"post",
	 		url:"addCustomer",
	 		data:{"customerName":customerName,"enterpriseType":enterpriseType,"legalPerson":legalPerson,
	 			"detailAddress":detailAddress,"phoneNumber":phoneNumber,"taxRegistration":taxRegistration,
	 			"bankName":bankName,"bankNumber":bankNumber,"remark":remark,"supCustomerId":supCustomerId},
	 		success:function(data){
	 			if (data.errCode == "SUCCESS"){
	 				$('#dlg').dialog('close'); 
					$('#dg').treegrid('reload');
	 			} else {
	 				MessageInfo.Info("错误","该名称已存在");
	 			}
	 		}
	 	});
	}else{
		$.ajax({
	 		type:"post",
	 		url:"modifycustomer",
	 		data:{"id":row.customerId,"customerName":customerName,"enterpriseType":enterpriseType,"legalPerson":legalPerson,
	 			"detailAddress":detailAddress,"phoneNumber":phoneNumber,"taxRegistration":taxRegistration,
	 			"bankName":bankName,"bankNumber":bankNumber,"remark":remark,"supCustomerId":supCustomerId},
	 		success:function(data){
	 			if (data.errCode == "SUCCESS"){
	 				$('#dlg').dialog('close'); 
					$('#dg').treegrid('reload');
	 			} else {
	 				MessageInfo.Info("错误","该名称已存在");
	 			}
	 		}
	 	});
	}
}

function deleteInfo() {
	var row = $('#dg').treegrid('getSelected');
	if (row == null) {
		MessageInfo.Info('提示', "请先选择数据");
	} else {
		layer.alert('您确认要删除该数据吗？', {
			icon : 3,
			btn : [ '确定', '取消' ]
		}, function() {
			$.post('deleteCustomer', {
				id : row.customerId,
			}, function(data) {
				if (data.errCode == "SUCCESS"){
					layer.closeAll();
					$('#dg').treegrid('reload');
	 			} else if(data.errCode == "EXISTENCE_SUBORDINATE"){
	 				MessageInfo.Info("错误","存在下级不可删除");
	 			}
			}, 'json');
		}, function() {
			layer.closeAll();
		});
	}
}

function format(value, row) {
	return "<a href='#' style='height:100%;color:blue' onclick=findDetailedInfo("
	+ row.customerId
	+ ")><span class='icon icon-users'></span>[详情查看]</a>";	
}

function findDetailedInfo(customerId){
	var row = $("#dg").treegrid("find",customerId);
	$('#customerInfo').dialog('open').dialog('setTitle', '客户详细信息');
	$('#customerfm').form('load', row);
}

function relationCustomer(value, row) {
	return "<a href='#' style='height:100%;color:blue' onclick=display("
	+ row.customerId
	+ ")><span class='icon icon-users'></span>[关联客户]</a>";	
}

function display(customerId) {
	var row = $("#dg").treegrid("find",customerId);
	$('#linkman').dialog('open').dialog('setTitle', '关联联系人');
	$("#associatedLinkman").datagrid({
		url : 'findLinkmanToAssociated?id=1&customerId='+row.customerId,
		selectOnCheck : false,
		checkOnSelect : false
	});
}
function savaLinkman(){
	var names = [];
	var ids = [];
	var row = $('#dg').treegrid('getSelected');
	var checkedItems = $('#associatedLinkman').datagrid('getChecked');
	$.each(checkedItems, function(index, value) {
		ids.push(value.linkManId);
	});
	$.ajax({
		type : "post",
		url : "updateCustomerToLinkman",
		data : {
			"customerId" : row.customerId,
			"linkmanIDs" : ids.join(),
		},
		async : true,
	});
	$('#linkman').dialog('close'); 
	$('#dg').treegrid('reload');
}