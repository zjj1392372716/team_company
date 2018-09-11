$(function(){	
	$('#dg').datagrid({
		url:'findAllOrgType',
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
			$('.tf-toolbar a').each(function(){
				if(this.id=="modify"){
					modify();
				}
			})
		}
	});
	PageConfig("#dg");
	$('#dlg').dialog({
		closed : true,
		modal : true
	});
});
function add(){
	$('#dg').datagrid('clearSelections');
	$('#dlg').dialog('open').dialog('setTitle','增加机构类型');
	$('#fm').form('clear');	
	url = 'addOrgType';
}

function save(){
	if($.trim($('#orgType').val()) == "" || $.trim($('#orgType').length) == 0){
		MessageInfo.Info('错误',getAsteriskEmpty());
		return;
	}
	$('#fm').form('submit',{
		url:url,
		onSubmit:function(){
			return $(this).form('validate');
		},
		success:function(result){	
			var result = eval('('+result+')');
			if(result.message != "成功"){
				MessageInfo.Info("信息提示",getNameExist());	
			}else{
				$('#dlg').dialog('close'); //close the dialog
				$('#dg').datagrid('reload');  //reload the user data
			}
		}
	});
}
function modify(){
	var row = $("#dg").datagrid('getSelected');
	if(row){
		$('#dlg').dialog('open').dialog('setTitle','编辑机构类型');
		$('#fm').form('load', row); 
		url='updateOrgType?orgTypeID='+row.orgTypeID;
	}
}
function deleteInfo(){
	var row = $('#dg').datagrid('getSelected');
	layer.alert('您确认要删除该机构类型吗？', {
		  icon: 3,
		  btn: ['确定','取消'] //按钮
	}, function(){
		$.post('deleteOrgType', {
			orgTypeID : row.orgTypeID
		}, function(result) {
			if (result.message == "成功") {
				$('#dg').datagrid('reload'); // 重新加载数据列表
				layer.closeAll();
			} else {
				MessageInfo.Error("失败", getDataModification());
			}
		}, 'json');
	}, function(){
		 layer.closeAll();
	});		
}
function checkClose(){
	$('#dlg').dialog('close');
}