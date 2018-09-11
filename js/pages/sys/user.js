var isladpflag=false;
var pageNumber = parseInt(($(window).height() - 30) / 25);
var pageNum = Math.round(pageNumber / 10) * 10;
var h = $(window).height() * 0.98 - 76;
/**
 * 把true和false 改成是和否
 * 
 * @param value
 * @returns
 */
function IsEnable(value){
	return value?"是":"否";
}
function Isrole(value){
	if(value == 1){
		return "单位管理员";
	} else if(value == 2){
		return "信息维护员";
	} else if(value == 3){
		return "GIS操作员";
	}
}

/**
 * 显示用户关联部门和角色的按钮
 * 
 * @param value
 * @param row
 * @returns
 */
function onClickAddIdentity(index) {
	if (editIndex != index) {
		if (endEditing()) {
			$('#aidentity').datagrid('selectRow', index).datagrid('beginEdit',index);
			editIndex = index;
		} else {
			$('#aidentity').datagrid('selectRow', editIndex);
		}
	}
}
function formatterUser(value,row){ 		
    return "<a href='#' style='height:100%;color:blue' onclick=openAddIdentity(" 
    		+"'#addIdentity',"
    		+"'findIdentityByUser','" 
    		+row.userID
    		+"','设置身份'"
    		+")><span class='icon icon-users'></span>[身份]</a>";
   /*
	 * + "'#addIdentity'," +row.userID + "','添加身份"
	 */
    
}
var editIndex = undefined;
function endEditing() {
	if (editIndex == undefined) {
		return true
	}
	if ($('#aidentity').datagrid('validateRow', editIndex)){
		var orgID = $('#aidentity').datagrid('getEditor', {
			index : editIndex,
			field : 'orgid'
		});
		
		if(orgID!=null){
			$('#aidentity').datagrid('getRows')[editIndex]['orgName'] = $(orgID.target).combotree('getText');
		}
		
		var roleid = $('#aidentity').datagrid('getEditor', {
			index : editIndex,
			field : 'roleid'
		});
		
		if(roleid!=null){
			$('#aidentity').datagrid('getRows')[editIndex]['roleName'] =  $(roleid.target).combotree('getText');
		}		
			
		var roletypeId = $('#aidentity').datagrid('getEditor', {
			index : editIndex,
			field : 'roleTypeid'
		});	
		
		if(roletypeId!=null){
			$('#aidentity').datagrid('getRows')[editIndex]['roletypeName'] =  $(roletypeId.target).combobox('getText');		
		}
		$('#aidentity').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}

function append() {
	if (endEditing()){ 
		$('#aidentity').datagrid('appendRow', {
		/*
		 * productname : '', productModel: '', hardwareBrandName : ""
		 */
		});
	editIndex = $('#aidentity').datagrid('getRows').length - 1;
	$('#aidentity').datagrid('selectRow', editIndex).datagrid('beginEdit',editIndex);
	}
}
// 删除一行
function removeit() {
	if (editIndex == undefined) {
		return
	}
	$('#aidentity').datagrid('cancelEdit', editIndex).datagrid('deleteRow',editIndex);
	editIndex = undefined;
}
function acceptOrder(){
	if (endEditing()){
		$('#aidentity').datagrid('acceptChanges');
	}
}
function savaIdentity(){
	acceptOrder();
	var test = "test";
	var rowsData = $('#aidentity').datagrid('getRows');
	var row = $("#dg").datagrid('getSelected');
	var id = row.userID;
		var data =[];
		for(var i = 0;i<rowsData.length;i++){	
			data.push(rowsData[i]);
		}
		json = JSON.stringify(data);
		
		for(var i = 0; i < data.length; i++){
			if(data[i].identity == null || data[i].identity.length == 0){
				MessageInfo.Alarm("警告", "请先填写完整身份信息。");
				return false;
			} 
			if(data[i].orgName == null || data[i].orgName.length == 0){
				 MessageInfo.Alarm("警告", "请先填写完整身份信息。");
				return false;
			}
			if(data[i].roleName == null || data[i].roleName.length == 0){
				MessageInfo.Alarm("警告", "请先填写完整身份信息。");
				return false;
			}
			if(data[i].roletypeName == null || data[i].roletypeName.length == 0){
				MessageInfo.Alarm("警告", "请先填写完整身份信息。");
				return false;
			}
		}
		
		$.ajax({
			type : "post",
			url : "addIdentity",
			data : {
				"id":id,
				"json":json
			},
			success : function(data) {
				javascript:$('#addIdentity').dialog('close');
				$('#dg').datagrid('reload');
			}
		})
}

function openAddIdentity(s1,s2,s3,s4){
	var row = $('#dg').datagrid('getSelected');
	$('#addIdentity').dialog('open').dialog('setTitle', '设置身份');
	$("#aidentity").datagrid({
		url : 'findIdentityByUser?id='+s3,		
	})
}
/**
 * 手动输入与ldap转换
 */
function selectType(){

	$('#userType').combobox({
		onSelect:function(data){
			if(data.value == "1"){
				$("#userName").textbox('disable')
				$("#userEmail").textbox('disable')
				$('#loginName').bind('keypress',function(event){ 
			        if(event.keyCode == 13){
			        	$('#userLdap').dialog('open').dialog('setTitle', 'ldap用户');;
			        	$("#ldapTable").datagrid({
			        		url : 'validateUser?loginName='+$.trim($('#loginName').val()),
			        		pageSize : 10,
			        		pagination : true,
			        		striped : true,
			        		rownumbers : true,
			        		singleSelect : true,
			        		onLoadSuccess:function(data){
			        			var rows = data.rows;
			         			if(rows == 0){
			         				/*$('#userName').textbox('setValue',"");
			         				$('#userEmail').textbox('setValue',"");*/
			         				MessageInfo.Info("信息提示","该用户不存在！");
			         				return;
			         			}
			        		},
			        	});
			        	var p = $("#ldapTable").datagrid('getPager');
			        	$(p).pagination({
			        		pageSize:10,  // 煤业显示的记录条数，默认为10
			        		pageList:[10],
			        		beforePageText:'第',
			        		afterPageText:'页   共 {pages} 页',
			        		displayMsg:'当前显示 {from} - {to} 条记录    共 {total} 条记录'
			        	});	
			        	/*$.ajax({
			         		type:"post",
			         		url:"validateUser",
			         		data:{"loginName":$.trim($('#loginName').val())},
			         		async: false,
			         		success:function(data){
			         			var rows = data.rows;
			         			if(rows == 0){
			         				$('#userName').textbox('setValue',"");
			         				$('#userEmail').textbox('setValue',"");
			         				MessageInfo.Info("信息提示","该用户不存在！");
			         				return;
			         			}else{
			         				$('#userName').textbox('setValue',data.split("@#$%^")[0]!="null"?data.split("@#$%^")[0]:"");
			         				$('#userEmail').textbox('setValue',data.split("@#$%^")[1]!="null"?data.split("@#$%^")[1]:"")
			         			}
			         		}
			         	});        	*/
			        }  
			    });	
			}else{
				$("#userName").textbox('enable')
				$("#userEmail").textbox('enable')
			}
		}
	})
}

$(function(){	
	$.ajax({
 		type:"post",
 		url:"getUserParam",
 		data:{},
 		async: true,
 		success:function(data){
 			if(data){
 				isladpflag=true;
 				selectType();
 				/*$("#userName").textbox('disable')
 				$("#userEmail").textbox('disable')*/ 				
 			}else{
 				/*$("#userName").textbox('enable')
 				$("#userEmail").textbox('enable')*/
 				//$("#userType").combobox('setValue','手动输入');
 				$("#userType").combobox('disable');
 			}
 		}
 	});
	
	
	$("#dg").datagrid({
		url : 'getAllUser',
		pageSize : pageNum,
		pagination : true,
		striped : true,
		height : h,
		rownumbers : true,
		singleSelect : true,
		/*
		 * onClickRow : function(rowIndex,rowData) { if(rowData.enabledState ==
		 * true){ $('#disable').linkbutton('enable');
		 * $('#toEnable').linkbutton('disable'); }else if(rowData.enabledState ==
		 * false){ $('#toEnable').linkbutton('enable');
		 * $('#disable').linkbutton('disable'); } },
		 */
		onDblClickRow : function(index, data) {
			$('.tf-toolbar a').each(function(){  
			    if(this.id=="modify"){
			    	modify();
			    }
			})
        },
		onLoadSuccess:function(data){
		},
	}); 
	var p = $("#dg").datagrid('getPager');
	$(p).pagination({
		pageSize:pageNum,  // 煤业显示的记录条数，默认为10
		pageList:[pageNum*1,pageNum*2,pageNum*3],
		beforePageText:'第',
		afterPageText:'页   共 {pages} 页',
		displayMsg:'当前显示 {from} - {to} 条记录    共 {total} 条记录'
	});				
	// 表格高度适应页面高度
	$(window).resize(function(){   
        var height = $(window).height()*0.98-20;  
        $("#dg").datagrid('resize',{  
            height:height  
        });  
    }); 
});

/**
 * 打开新增界面
 * 
 * @returns
 */
function add() {
	/*if(isladpflag){
		$("#userName").textbox('disable')
		$("#userEmail").textbox('disable')
	}else{
		$("#userName").textbox('enable')
		$("#userEmail").textbox('enable')
	}	*/
	$('#dg').datagrid('clearSelections');
	$('#dlg').dialog('open').dialog('setTitle', '添加用户');			
	$('#fm').form('clear');
	$('#userType').combobox('setValue','0');
// $('#save').removeAttr("disabled");
	$("#loginName").focus();
}

/**
 * 打开编辑界面
 * 
 * @returns
 */
function modify() {	
	$("#userName").textbox('enable')
	$("#userEmail").textbox('enable')
	var row = $('#dg').datagrid('getSelected');
	if(row != null){
		$('#fm').form('clear');
		$('#dlg').dialog('open').dialog('setTitle', '编辑用户');
		$('#fm').form('load', row);
// $('#save').removeAttr("disabled");
		document.getElementById("loginName").focus();
	} else {
		MessageInfo.Info('提示',"请先选择数据。");
	}
}

/**
 * 新增编辑保存前的所有验证
 * 
 * @returns
 */
function save() {
	var row = $("#dg").datagrid('getSelected');
	var loginName = $.trim($('#loginName').val());
	var userName = $.trim($('#userName').textbox('getValue'));
	var userEmail = $.trim($('#userEmail').textbox('getValue'));
	var phoneNumber = $.trim($('#phoneNumber').val());
	var description = $.trim($('#description').val());
	var ldapFlag = 0;
	if($.trim($('#userType').textbox('getValue')) == 1){
		ldapFlag = 1;
	}
	var cucompanynumber = $.trim($('#cucompanynumber').val())
	if(loginName == null || loginName.length == 0){
		MessageInfo.Alarm("错误",getAsteriskEmpty());
		return;
	}	
	var id = 0;
	var idCount = "";
	if(row != null){	// 编辑
		id = row.userID;
		idCount = "userID";
	}
	$.ajax({
 		type:"post",
 		url:"UserUniquenessVerification",
 		data:{"userID":id,"idCount":idCount,"count":"loginName","loginName":loginName},
 		async: false,
 		success:function(data){
 			if(data){
 				MessageInfo.Info("信息提示","登录名已重复！");
 				return;
 			}else{
 				saveInfo(row,userName,loginName,userEmail,phoneNumber,description,ldapFlag,cucompanynumber);
 			}
 		}
 	});
	
}

/**
 * 新增编辑的保存
 * 
 * @param row
 * @param userName
 * @param loginName
 * @param description
 * @returns
 */
function saveInfo(row,userName,loginName,userEmail,phoneNumber,description,ldapFlag,cucompanynumber){
	if(row == null){
		$.ajax({
	 		type:"post",
	 		url:"addUser",
	 		data:{"userName":userName,"loginName":loginName,"userEmail":userEmail,
	 			"phoneNumber":phoneNumber,"description":description,
	 			"ldapFlag":ldapFlag,"cucompanynumber":cucompanynumber},
	 		success:function(data){
	 			$('#dlg').dialog('close'); 
				$('#dg').datagrid('reload');
	 		}
	 	});
	}else{
		$.ajax({
	 		type:"post",
	 		url:"updateUser",
	 		data:{"userName":userName,"loginName":loginName,"userEmail":userEmail,
	 			"phoneNumber":phoneNumber,"description":description,"userID":row.userID},
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
 * 
 * @returns
 */
function deleteInfo() {
	var row = $('#dg').datagrid('getSelected');
	if(row != null){
		layer.alert(getSureDelete(), {
			icon : 3,
			btn : [ '确定', '取消' ]
		// 带回调函数的弹窗
		}, function() {
			$.ajax({
		 		type:"post",
		 		url:"deleteUser",
		 		data:{"userID":row.userID},
		 		success:function(data){
		 			if(data.code){
		 				$('#dg').datagrid('reload');
		 				layer.closeAll();
		 			}else{
		 				MessageInfo.Info("信息提示",data.message);
		 			}	 			
		 		}
		 	});
		}, function() {
			layer.closeAll();
		});
	} else {
		MessageInfo.Info('提示',"请先选择数据。");
	}
}	

/**
 * 打开用户关联角色的界面
 */
var setRole = function(element, url, ID,  title){
	$(element).dialog({
		title : title,
		width : 550,
		height : 500,
		href : url + "?id=" + ID,
		modal : true,
		buttons : [{
			text : '确定',
			width : '80',
			iconCls : 'icon-ok',
			handler : function() {
				UserToRole(ID,element);
				$(element).dialog('close');						
			}
		}, {
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

/**
 * 打开用户关联部门的界面
 */


/**
 * 用户关联部门的保存
 * 
 * @param ID
 * @param element
 * @returns
 */
function UserToOrg(ID,element) {
	var checkedItems = $('#userByOrg').treegrid('getCheckedNodes');
	var names = [];
	$.each(checkedItems,function(index,value){	
		names.push(value.orgID);
	});
	$.ajax({
 		type:"post",
 		url:"updateOrgJoinTable",
 		data:{userID:ID,orgIDs:names.join()},
 		async: true,
 		success:function(data){
 			flag = data.code;
 			MessageInfo.Info("信息提示",data.message);
 		}
 	});
}

/**
 * 用户关联角色的保存
 * 
 * @param ID
 * @param element
 * @returns
 */
function UserToRole(ID,element) {
	var checkedItems = $('#userdg').datagrid('getChecked');
	var names = [];
	$.each(checkedItems,function(index,value){			
		names.push(value.roleID);
	});
	$.ajax({
 		type:"post",
 		url:"updateRoleJoinTable",
 		data:{userID:ID,roleIDs:names.join()},
 		async: true,
 		success:function(data){
 			flag = data.code;
 			MessageInfo.Info("信息提示",data.message);
 		}
 	});
}

/**
 * 禁用
 * 
 * @returns
 */
function disable() {
	var row = $("#dg").datagrid('getSelected');
	if(row == null){
		MessageInfo.Info("信息提示","请先选择数据。");
	} else if(row != null && row.enabledState == 1){
		$.ajax({
	 		type:"post",
	 		url:"disableToUser",
	 		data:{"userID":row.userID},
	 		success:function(data){
				if(data){
					$('#dg').datagrid('reload');
				}else{
					MessageInfo.Info("信息提示","禁用失败！");
				}
	 		}
	 	});
	} else if(row.enabledState == 0){
		MessageInfo.Info("信息提示","请选择启用状态的数据。");
	}
}

/**
 * 启用
 * 
 * @returns
 */
function toEnable() {
	var row = $("#dg").datagrid('getSelected');
	if(row == null){
		MessageInfo.Info("信息提示","请先选择数据。");
	} else if(row != null && row.enabledState == 0){
		$.ajax({
	 		type:"post",
	 		url:"toEnableToUser",
	 		data:{"userID":row.userID},
	 		success:function(data){
	 			if(data){
	 				$('#dg').datagrid('reload');
				}else{
					MessageInfo.Info("信息提示","启用失败！");
				}
	 		}
	 	});
	} else if(row.enabledState == 1){
		MessageInfo.Info("信息提示","请选择禁用状态的数据。");
	}
}

/**
 * 重置密码
 * 
 * @returns
 */
function resetpwd() {
	var row = $("#dg").datagrid('getSelected');
	if(row != null){
		$.ajax({
	 		type:"post",
	 		url:"resetPassword",
	 		data:{"userID":row.userID,"password":"sinochem"},
	 		success:function(data){
	 			if(data == "成功"){
					MessageInfo.Info("信息提示","密码重置成功！");
				}else{
					MessageInfo.Info("信息提示","密码重置失败！");
				}
	 		}
	 	});
	} else {
		MessageInfo.Info("信息提示","请先选择数据。");
	}
}

function Query(){
	var userName = $('#searchUserName').val();
	var pageNumber = parseInt(($(window).height() - 30) / 25);
	var pageNum = Math.round(pageNumber / 10) * 10;
	var h = $(window).height() * 0.98 - 55;
	$("#dg").datagrid({
		url : 'getAllUser?userName='+userName,
		pageSize : pageNum,
		pagination : true,
		striped : true,
		height : h,
		rownumbers : true,
		singleSelect : true,
		onSelect : function() {
			$('#3').linkbutton('enable');
			$('#6').linkbutton('enable');
			$('#28').linkbutton('enable');
			var row = $("#dg").datagrid('getSelected');
			if(row.enabledState == true){
				$('#34').linkbutton('enable');
				$('#33').linkbutton('disable');	
			}else if(row.enabledState == false){
				$('#33').linkbutton('enable');
				$('#34').linkbutton('disable');	
			}
		},
		onLoadSuccess:function(data){
			$('#3').linkbutton('disable');		
			$('#6').linkbutton('disable');	
			$('#28').linkbutton('disable');	
			$('#34').linkbutton('disable');	
			$('#33').linkbutton('disable');	
		}
	}); 
	var p = $("#dg").datagrid('getPager');
	$(p).pagination({
		pageSize:pageNum,  // 煤业显示的记录条数，默认为10
		pageList:[pageNum*1,pageNum*2,pageNum*3],
		beforePageText:'第',
		afterPageText:'页   共 {pages} 页',
		displayMsg:'当前显示 {from} - {to} 条记录    共 {total} 条记录'
	});				
	// 表格高度适应页面高度
	$(window).resize(function(){   
        var height = $(window).height()*0.98-20;  
        $("#dg").datagrid('resize',{  
            height:height  
        });  
    }); 
}

function clearForm() {
	$('#searchUserName').val("");
}
/**
 * ldap用户添加到新增框
 * @returns
 */
function addUserLdap(){
	var row = $('#ldapTable').datagrid('getSelected');
	if(row){
		$('#userName').textbox('setValue',row.givenname);
		$('#userEmail').textbox('setValue',row.mail);
		$('#phoneNumber').val(row.mobile);
		$('#cucompanynumber').val(row.cucompanynumber);
		$('#userLdap').dialog('close');
	}else{
		MessageInfo.Info("信息提示","请选择用户！");
		return;
	}
	
}
/** 
 * combobox和combotree模糊查询 
 */  
(function(){  
    //combobox可编辑，自定义模糊查询  
    $.fn.combobox.defaults.editable = true;  
    $.fn.combobox.defaults.filter = function(q, row){  
        var opts = $(this).combobox('options');  
        return row[opts.textField].indexOf(q) >= 0;  
    };  
    //combotree可编辑，自定义模糊查询  
    $.fn.combotree.defaults.editable = true;  
    $.extend($.fn.combotree.defaults.keyHandler,{  
        up:function(){  
            console.log('up');  
        },  
        down:function(){  
            console.log('down');  
        },  
        enter:function(){  
            console.log('enter');  
        },  
        query:function(q){  
            var t = $(this).combotree('tree');  
            var nodes = t.tree('getChildren');  
            for(var i=0; i<nodes.length; i++){  
                var node = nodes[i];  
                if (node.text.indexOf(q) >= 0){  
                    $(node.target).show();  
                } else {  
                    $(node.target).hide();  
                }  
            }  
            var opts = $(this).combotree('options');  
            if (!opts.hasSetEvents){  
                opts.hasSetEvents = true;  
                var onShowPanel = opts.onShowPanel;  
                opts.onShowPanel = function(){  
                    var nodes = t.tree('getChildren');  
                    for(var i=0; i<nodes.length; i++){  
                        $(nodes[i].target).show();  
                    }  
                    onShowPanel.call(this);  
                };  
                $(this).combo('options').onShowPanel = opts.onShowPanel;  
            }  
        }  
    });  
})(jQuery); 