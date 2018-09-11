/**
 * 
 */
function formattertouser(value, row) {
	return "<a href='#' style='height:100%;color:blue' onclick=setButton("
	+ "'#upRoleToUser'," 
	+ "'../../role/RoleToIdentity','"
	+ row.roleID
	+ "','关联身份'"
	+ ")><span class='icon icon-users'></span>[身份]</a>";	
}	

$(function(){	
	var pageNumber = parseInt(($(window).height() - 30) / 25);
	var pageNum = Math.round(pageNumber / 10) * 10;
	var h = $(window).height() * 0.98 - 25;
	$("#dg").datagrid({
		url : 'getAllRole',
		pageSize : pageNum,
		pagination : true,
		striped : true,
		height : h,
		rownumbers : true,
		singleSelect : true,
		onSelect : function() {
			$('#modify').linkbutton('enable');
			$('#deleteInfo').linkbutton('enable');
		},
		onDblClickRow : function(index, data) {
			$('.tf-toolbar a').each(function(){  
			    if(this.id=="modify"){
			    	modify();
			    }
			})	            	
        },
		onLoadSuccess:function(data){
			$('#modify').linkbutton('disable');		
			$('#deleteInfo').linkbutton('disable');		
		},
		onDblClickRow : function(index, data) {
			modify();
		}
	}); 
	var p = $("#dg").datagrid('getPager');
	$(p).pagination({
		pageSize:pageNum,  //煤业显示的记录条数，默认为10
		pageList:[pageNum*1,pageNum*2,pageNum*3],
		beforePageText:'第',
		afterPageText:'页   共 {pages} 页',
		displayMsg:'当前显示 {from} - {to} 条记录    共 {total} 条记录'
	});				
	//表格高度适应页面高度
	$(window).resize(function(){   
        var height = $(window).height()*0.98-20;  
        $("#dg").datagrid('resize',{  
            height:height  
        });  
    }); 
	
});

/**
 * 打开新增界面
 * @returns
 */
function add() {
	$('#dg').datagrid('clearSelections');
	$('#dlg').dialog('open').dialog('setTitle', '添加角色');			
	$('#fm').form('clear');
//	$('#save').removeAttr("disabled");
	$("#roleName").focus();
}

/**
 * 打开编辑界面
 * @returns
 */
function modify() {	
	var row = $('#dg').datagrid('getSelected');
	$('#fm').form('clear');
	if (row) {
		$('#dlg').dialog('open').dialog('setTitle', '编辑角色');
		$('#fm').form('load', row);
//		$('#save').removeAttr("disabled");
		document.getElementById("roleName").focus();
	//	 $('#dataPermissionStatus').combobox('setValues',$.trim($('#dataPermission').val()));  
	}else{
		MessageInfo.Info('提示',getChoiceEditor());
	}
}

function save() {
	var roleName = $.trim($('#roleName').val());
	var description = $.trim($('#description').val());
	var serial = $.trim($('#serial').val());
	var dataPermissionStatus=$.trim($('#dataPermissionStatus').val());
	var row = $("#dg").datagrid('getSelected');
	if(roleName == null || roleName.length == 0){
		MessageInfo.Alarm('错误',getAsteriskEmpty());
		return;
	}else if(dataPermissionStatus == null || dataPermissionStatus.length == 0){
		MessageInfo.Alarm('错误',getAsteriskEmpty());
		return;
	}
	/*else if(checkqjandbj(roleName)){
		  MessageInfo.Alarm("提示","存在全角输入，请切换至半角输入法。");	   
	}else if(checkqjandbj(description)){
		  MessageInfo.Alarm("提示","存在全角输入，请切换至半角输入法。");	   
	}else if(checkSpecificKey(roleName)){
		MessageInfo.Alarm("提示","#与&为限制字符！");
		return;
	}else if(checkSpecificKey(description)){
		MessageInfo.Alarm("提示","#与&为限制字符！");
		return;
	}else if(limitedSpace(roleName)){
		MessageInfo.Alarm("提示","null为限制字符！");
		return;
	}else if(limitedSpace(description)){
		MessageInfo.Alarm("提示","null为限制字符！");
		return;
	}else if(allNumber(serial)){
		MessageInfo.Alarm("提示","序号应为正整数！");
		return;
	}*/
	var id = 0;
	var idCount = "";
	if(row != null){	//编辑
		id = row.roleID;
		idCount = "roleID";
	}
	$.ajax({
 		type:"post",
 		url:"roleUniquenessVerification",
 		data:{"roleID":id,"idCount":idCount,"count":"roleName","roleName":roleName},
 		async: false,
 		success:function(data){
 			if(data){
 				MessageInfo.Info("信息提示","角色名称已重复！");
 				return;
 			}else{
 				saveRole(row,roleName,serial,description,dataPermissionStatus);
 			}
 		}
 	});
}

/**
 * 新增编辑的保存
 * @param row
 * @param userName
 * @param loginName
 * @param description
 * @param enableState
 * @returns
 */
function saveRole(row,roleName,serial,description,dataPermissionStatus){
	if(row == null){
		$.ajax({
	 		type:"post",
	 		url:"addRole",
	 		data:{"roleName":roleName,"serial":serial,"description":description,"dataPermissionStatus":dataPermissionStatus},
	 		success:function(data){
	 			$('#dlg').dialog('close'); 
				$('#dg').datagrid('reload');
	 		}
	 	});
	}else{
		$.ajax({
	 		type:"post",
	 		url:"updateRole",
	 		data:{"roleName":roleName,"serial":serial,"description":description,"roleID":row.roleID,"dataPermissionStatus":dataPermissionStatus},
	 		success:function(data){
	 			if(data){
	 				$('#dlg').dialog('close'); 
					$('#dg').datagrid('reload');
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
	layer.alert(getSureDelete(), {
		icon : 3,
		btn : [ '确定', '取消' ]
	// 带回调函数的弹窗
	}, function() {
		$.ajax({
	 		type:"post",
	 		url:"deleteRole",
	 		data:{"roleID":row.roleID},
	 		success:function(data){
	 			layer.closeAll();
	 			if(data == 1){
	 				$('#dg').datagrid('reload');
	 			}else if(data == 2){
	 				MessageInfo.Info("信息提示","角色已关联身份，删除失败！");
	 			}else{
	 				MessageInfo.Info("信息提示","删除失败！");
	 			}
	 		}
	 	});
	}, function() {
		layer.closeAll();
	});
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