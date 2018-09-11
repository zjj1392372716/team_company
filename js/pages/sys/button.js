var Row_btnName = "";
var Row_btnCode = ""; 
$(function(){	
	$("#dg").datagrid({
		url:'getAllBtns',
		striped:true, 		
		pagination:true,
		onSelect : function() {
			$('#modify').linkbutton('enable');		
			$('#deleteInfo').linkbutton('enable');	
		},
		onLoadSuccess:function(data){
			$('#modify').linkbutton('disable');		
			$('#deleteInfo').linkbutton('disable');		
		},
		onDblClickRow : function(index, data) {
			modify();
		}
		
	});
	var p = $('#dg').datagrid('getPager');
	$(p).pagination({
		pageSize:10,  //每页显示的记录条数，默认为10
		pageList:[5,10,15],
		beforePageText:'第',
		afterPageText:'页   共{pages} 页',
		displayMsg:'当前显示{from} - {to} 条记录    共{total} 条记录'
	});
});
function formatterMenus(value,row){
	//return "<a href='#' style='margin-left:10px' onclick=setButton('"+row.btnId+"')><span class='icon icon-set2'>&nbsp;</span>[设置菜单]</a>";
	return 	 "<a href='#' style='height:100%;color:blue' onclick=setButton("
	+ "'#UpdateMenu',"
	+ "'../../btns/btnToMenus','"
	+ row.btnId
	+ "','关联菜单'"
	+ ")><span class='icon icon-users'></span>[关联菜单]</a>";
}
function checkClose(){
	$('#dlg').dialog('close');

}

//关联菜单
function setButton(element, url, ID,  title){
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
				saveMenuForBtn(ID,element);
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

function saveMenuForBtn(ID,element){
	var checkedItems = $('#menuDg').treegrid('getCheckedNodes');
	var names = [];
	$.each(checkedItems,function(index,value){	
		if(names.indexOf(value.menuId)==-1){
			names.push(value.menuId);
		}
		if(name.indexOf(value.supMenuId)==-1){
			names.push(value.supMenuId);
		}
	});
	$.ajax({
 		type:"post",
 		url:"updateJoinTable",
 		data:{btnId:ID,menuIds:names.join()},
 		async: true,
 		success:function(data){
 			flag = data.code;
 			MessageInfo.Info("信息提示",data.message);
 		}
 	});
}

function add(){
	Row_btnName = "";
	Row_btnCode = "";
	$('#dlg').dialog('open').dialog('setTitle','增加按钮');
	$('#fm').form('clear');
	url="addBtn";
}
function modify(){
	var row = $('#dg').datagrid('getSelected');
	Row_btnName = row.buttonname;
	Row_btnCode = row.buttoncode;
	if(row){
		$('#dlg').dialog('open').dialog('setTitle','编辑按钮');
		$('#buttonname').textbox('setValue',row.buttonname);
		$('#buttoncode').textbox('setValue',row.buttoncode);				
		$('#description').textbox('setValue',row.description);
		$('#serial').textbox('setValue',row.serial);
		url="updateBtn?btnId="+row.btnId;
	}
}
function save(){
	$('#fm').form('submit',{
		url:url,
		onSubmit:function(evnet){	
			return $(this).form('validate');
		},
		success:function(result){
			$('#dlg').dialog('close'); //关闭dialog
			$('#dg').datagrid('reload'); //重新加载	
			var result = eval('('+result+')');
			if(result.code){						
				MessageInfo.Info("信息提示",result.message);
			}
		}
	});
}

/* //前端验证
function scriptValidate(){
	//在此进行表单字段的验证，如果验证通过，则正常返回，否则返回false
	var form = document.getElementById('fm');  //用于获取form表单
	//以下代码用于获取需要验证的值，如按钮名称和按钮代码（此处验证的是需要唯一性的字段）
	var btnName = form.elements["btnName"].value.trim(); 
	var btnCode = form.elements["btnCode"].value.trim();
	
	//var xhr = myJsUtil.createXHR();
	var url = "";
	if(Row_btnName=="" && Row_btnCode=="")
		url = "checkUniqureBnt?btnName="+btnName+"&btnCode="+btnCode+"";
	else if(Row_btnName ==btnName && Row_btnCode == btnCode)
		return "1";//return $(this).form('validate');
	else if(Row_btnName==btnName && Row_btnCode!=btnCode)
		url = "checkUniqureBnt?btnCode="+btnCode+"";
	else if(Row_btnName!=btnName && Row_btnCode == btnCode)
		url = "checkUniqureBnt?btnName="+btnName+"";					
	else
		alert("遇到了未考虑到的情况");
	var msg = null;
	$.ajax({ url: url,
         async: false,
         dataType: 'json',
         success: function(data) {
              msg = data.msg;
            }
        });
	if(msg==null || msg =="")
		return "1";
	else{
		alert(msg);
		return "2";
	}									
} */

function deleteInfo(){
	var row = $('#dg').datagrid('getSelected');
	layer.alert('您确认要删除该组织机构么吗？', {
		  icon: 3,
		  btn: ['确定','取消'] //按钮
	}, function(){
		layer.closeAll();
		$.post('deleteBtn', {
			id:row.btnId
		}, function(result) {
			if (result.code) {						
				$('#dg').datagrid('reload'); // 重新加载数据列表				
			} else {
				MessageInfo.Error("失败", JSON.parse(result).message);
			}
		}, 'json');
	}, function(){
		 layer.closeAll();
	});		
}
function rightClick(){			
	//var right = document.getElementById('ButtonToMenu_rightMenus');		
	var right = document.getElementByName('rightMenus');
	for(i=0;i<right.length;i++){
		right[i].selected=true;
	}
}
function closePage(){			
	$("#UpdateMenu").dialog('close');			
}