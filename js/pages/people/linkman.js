$(function(){	
	$('#dg').datagrid({
		url:'getAllLinkmans?linkManName='+null+"&typeid="+null,
		striped:true, 
		pagination:true,
		onSelect : function() {
			
		},
		onLoadSuccess:function(data){
			
		}
	});
	PageConfig("#dg");
	$('#dlg').dialog({
		closed : true,
		modal : true
	});
});

/**
 * 打开新增界面
 * @returns
 */
function add() {
	$('#dg').datagrid('clearSelections');
	$('#dlg').dialog('open').dialog('setTitle', '添加联系人');			
	$('#fm').form('clear');
}
/**
 * 打开编辑界面
 * @returns
 */
function modify() {	
	var row = $('#dg').datagrid('getSelected');
	$('#fm').form('clear');
	if(row == null){
		MessageInfo.Info('提示',"请先选择数据");
	}else{
		$('#dlg').dialog('open').dialog('setTitle', '编辑联系人');
		$('#fm').form('load', row);
	}
}
/**
 * 保存数据
 * @returns
 */
function save() {
	var row = $('#dg').datagrid('getSelected');
	var linkManName=$.trim($("#linkManName").textbox('getValue'));
	var typeID=$("#type").combobox('getValue');
	var detailAddress=$.trim($("#detailAddress").textbox('getValue'));
	var sexID=$("#sex").combobox('getValue');
	var phoneNumber=$.trim($("#phoneNumber").textbox('getValue'));
	var email=$.trim($("#email").textbox('getValue'));
	var remark=$.trim($("#remark").textbox('getValue'));
	
	if(linkManName == null || linkManName.length == 0){
		MessageInfo.Alarm('错误',getAsteriskEmpty());
		return;
	}else if(typeID == null || typeID.length == 0){
		MessageInfo.Alarm('错误',getAsteriskEmpty());
		return;
	}else if(sexID == null || sexID.length == 0){
		MessageInfo.Alarm('错误',getAsteriskEmpty());
		return;
	}else if(phoneNumber == null || phoneNumber.length == 0){
		MessageInfo.Alarm('错误',getAsteriskEmpty());
		return;
	}
	if(row == null){
		$.ajax({
	 		type:"post",
	 		url:"addLinkman",
	 		data:{"linkManName":linkManName,"typeID":typeID,"detailAddress":detailAddress,"sex":sexID,
	 			"phoneNumber":phoneNumber,"email":email,"remark":remark},
	 		success:function(data){
	 			if (data.errCode == "SUCCESS"){
	 				$('#dlg').dialog('close'); 
					$('#dg').datagrid('reload');
	 			} else {
	 				MessageInfo.Info("错误","该联系方式已存在");
	 			}
	 		}
	 	});
	} else {
		if(sexID == "男"){
			sexID = 1;
		}else if(sexID == "女"){
			sexID = 2;
		}
		$.ajax({
	 		type:"post",
	 		url:"modifyLinkman",
	 		data:{"id":row.linkManId,"linkManName":linkManName,"typeID":row.typeid,"detailAddress":detailAddress,
	 			"sex":sexID,"phoneNumber":phoneNumber,"email":email,"remark":remark},
	 		success:function(data){
	 			if (data.errCode == "SUCCESS"){
	 				$('#dlg').dialog('close'); 
					$('#dg').datagrid('reload');
	 			} else {
	 				MessageInfo.Info("错误","该联系方式已存在");
	 			}
	 		}
	 	});
	}
}
/**
 * 用户删除
 * @returns
 */
function deleteInfo() {
	var row = $('#dg').datagrid('getSelected');
	if(row == null){
		MessageInfo.Info('提示', "请先选择数据");
	} else {
		layer.alert('您确认要删除该数据吗？', {
			icon : 3,
			btn : [ '确定', '取消' ]
		}, function() {
			$.post('deleteLinkman', {
				id : row.linkManId,
				typeID : row.typeid
			}, function(data) {
				if (data.errCode == "SUCCESS"){
					layer.closeAll();
					$('#dg').datagrid('reload');
	 			} else if(data.errCode == "ALREADYUSED"){
	 				MessageInfo.Info("错误","存在关联联系人");
	 			}
			}, 'json');
			// //为按钮确定所用函数结束
		}, function() {
			// 点击取消按钮执行关闭窗体
			layer.closeAll();
		});
		
	}
}

function Query(){
	var linkManName=$.trim($("#searchName").textbox('getValue'));
	var typeid=$("#searchType").combobox('getValue');
	if(typeid.length == 0){
		typeid = null;
	}
	if(linkManName.length == 0){
		linkManName = null;
	}
	$('#dg').datagrid({
		url:'getAllLinkmans?linkManName='+linkManName+"&typeid="+typeid,
		striped:true, 
		pagination:true,
	});
	PageConfig("#dg");
}

var setButton = function(element, url, ID,  title){
	$(element).dialog({
		title : title,
		width : 900,
		height : 500,
		href : url + "?id=" + ID,
		modal : true,
		buttons : [ {
			text : '取消',
			width : '80',
			iconCls : 'icon-cancel',
			handler : function() {
				$(element).dialog('close');
				$('#dg').datagrid('reload');
			}
		}]
	});
}

function RoleToUser(ID,element){
	var checkedItems = $('#userdg').datagrid('getChecked');
	var names = [];
	$.each(checkedItems,function(index,value){			
		names.push(value.userID);
	});
	$.ajax({
 		type:"post",
 		url:"updateUserJoinTable",
 		data:{roleID:ID,userIDs:names.join()},
 		async: true,
 		success:function(data){
 			flag = data.code;
 			MessageInfo.Info("信息提示",data.message);
 		}
 	});
}