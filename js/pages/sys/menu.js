var type = "Add";  //用户判断当前的操作是新增还是编辑，用于唯一性验证
$(function(){				
		$('#dg').treegrid({
		url:'getAllMenus',
		idField:'menu_id',
		striped:true, 		
		fitColumns:true,
		treeField:'menu_name',
		loadFilter:function(data,parentId){
			data = utils.copyProperty(data.rows || data,['menu_id'],['tempid'],false);
			return utils.toTreeData(data,'tempid','parent_code','children');
		},
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
					
});

function formatterMembers(value,row){
	if(row.children!=null && row.children.length>0){
		return "";
	}
	//return (row.url && row.url!="#") ? "<a href='#' style='margin-left:10px' onclick=setButton('"+row.menu_id+"')><span class='icon icon-set2'>&nbsp;</span>[设置按钮]</a>":"";
	return 	 "<a href='#' style='height:100%;color:blue' onclick=setButton("
	+ "'#updateMenuBtn',"
	+ "'../../menu/MenuToBtns','"
	+ row.menu_id
	+ "','关联按钮'"
	+ ")><span class='icon icon-users'></span>[按钮]</a>";	
}
function IsVisible(value){
	return value?"可见":"不可见";			
}
function IsEnable(value){
	return value?"可用":"不可用";
}

function formatterParentName(value,row){
	if(value==null){
		if('children' in row){
			for(var i=0;i<row.children.length;i++){
				row.children[i].parentName = row.menu_name;
			}
		}
		return '';
	}else{
		return row.parentName;
	}
}
function add(){
	type = "Add";
	$('#dlg').dialog('open').dialog('setTitle','增加菜单');
	$('#fm').form('clear');	
	url = 'addMenu';  //此处填写新增时，点击保存按钮时，执行的后台程序
}
function modify(){			
	var row = $("#dg").datagrid('getSelected');		
	if(row){
		type = "Modify";
		$('#dlg').dialog('open').dialog('setTitle','编辑菜单');
				
		$('#menu_name').textbox('setValue',row.menu_name);
		$('#menu_code').textbox('setValue',row.menu_code);
		$('#testUrl').textbox('setValue',row.url);
		$('#description').textbox('setValue',row.description);
		$('#serial').textbox('setValue',row.serial);
		
		document.getElementsByName("visiblestate")[0].checked = row.visible_state;
		document.getElementsByName("enabledstate")[0].checked = row.enabled_state;			
		url='updateMenu?menuId='+row.menu_id; //此处填写更新时，点击保存按钮时，执行的后台程序
	} 
}
function save(){
	if(checkUniqure()){
		$('#fm').form('submit',{
			url:url,
			onSubmit:function(){
				return $(this).form('validate');
			},
			success:function(result){	
				$('#dlg').dialog('close'); //close the dialog
				$('#dg').treegrid('reload');  //reload the user data
				var result = eval('('+result+')');				
				MessageInfo.Info("信息提示",result.message);							
			}
		});
	}	
}
/**
 * 验证唯一性
 * @returns
 */
function checkUniqure(){
	var flag = true;
	var row = $("#dg").datagrid('getSelected');
	var Id = 0;
	if(row != null){
		Id = row.menu_id;
	}
	$.ajax({
 		type:"post",
 		url:"checkUniquire",
 		data:{Id:Id,menuname:$('#menu_name').val(),menucode:$('#menu_code').val(),url:$('#url').val(),type:type},
 		async: false,
 		success:function(data){
 			flag = data.code;
 			MessageInfo.Info("信息提示",data.message);
 		}
 	});
	return flag;	
}

function deleteInfo(){
	var row = $('#dg').treegrid('getSelected');
	layer.alert('您确认要删除该组织机构么吗？', {
		  icon: 3,
		  btn: ['确定','取消'] //按钮
	}, function(){
		layer.closeAll();
		$.post('deleteMenu', {
			id:row.menu_id
		}, function(result) {
			if (result.code) {						
				$('#dg').treegrid('reload'); // 重新加载数据列表				
			} else {
				MessageInfo.Error("失败", JSON.parse(result).message);
			}
		}, 'json');
	}, function(){
		 layer.closeAll();
	});		
	
	/*if(row){
		$.messager.confirm('信息确认',getSureDelete(),function(r){
			if(r){
				$.post('deleteMenu',{id:row.menu_id},function(result){		
					$('#dg').treegrid('reload');						
					if(!result.code){
						MessageInfo.Info("信息提示","删除失败");	
					}												
				},'json');
			}					
		});
	}			*/
}		
function checkClose(){
	$('#dlg').dialog('close');

}

var setButton = function(element, url, ID,  title){
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
				menuToBtns(ID,element);
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
function menuToBtns(ID,element){
	var checkedItems = $('#orgdg').datagrid('getChecked');
	var names = [];
	$.each(checkedItems,function(index,value){			
		names.push(value.btnId);
	});
	$.ajax({
 		type:"post",
 		url:"updateJoinTable",
 		data:{menuId:ID,btnIds:names.join()},
 		async: true,
 		success:function(data){
 			flag = data.code;
 			MessageInfo.Info("信息提示",data.message);
 		}
 	});
}