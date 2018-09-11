$(function(){	
	/*var pageNumber = parseInt(($(window).height() - 30) / 25);
	var pageNum = Math.round(pageNumber / 10) * 10;
	var h = $(window).height() * 0.98 - 55;*/
	$('#dg').datagrid({
		url:'getAllParam',
		striped:true, 
		pagination:true,
		onSelect : function() {
			$('#modify').linkbutton('enable');
		},
		onLoadSuccess:function(data){
			$('#modify').linkbutton('disable');		
			PageConfig("#dg");
		},
		onDblClickRow : function(index, data) {
			$('.tf-toolbar a').each(function(){
				if(this.id=="modify"){
					modify();
				}
			})
		}
	});
	$('#dlg').dialog({
		closed : true,
		modal : true
	});
});
	
function add(){
	$('#dg').datagrid('clearSelections');
	$('#dlg').dialog('open').dialog('setTitle','增加系统参数');
	$('#fm').form('clear');	
	url = 'addParam';
}

function save(){
	$('#fm').form('submit',{
		url:url,
		onSubmit:function(){
			return $(this).form('validate');
		},
		success:function(result){	
			$('#dlg').dialog('close'); //close the dialog
			$('#dg').datagrid('reload');  //reload the user data
			var result = eval('('+result+')');				
			//MessageInfo.Info("信息提示",result.message);							
		}
	});
}
	
function modify(){
	var row = $("#dg").datagrid('getSelected');
	if(row){
		$('#dlg').dialog('open').dialog('setTitle','编辑系统参数');
		$('#fm').form('load', row); 
		/*$('#paramcode').textbox({
			disabled:true
		});*/
		url='updateParam?paramId='+row.paramID+"&paramcode=" + row.paramcode; //此处填写更新时，点击保存按钮时，执行的后台程序
	}
}
function deleteInfo(){
	var row = $("#dg").datagrid('getSelected');
	layer.alert('您确认要删除该原料类别吗？', {
		  icon: 3,
		  btn: ['确定','取消'] //按钮
	}, function(){
		$.post('deleteParam', {
			paramId : row.paramID	
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
function IsVisible(value){
	return value?"可见":"不可见";			
}