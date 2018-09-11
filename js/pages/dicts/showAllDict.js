$(function() {
	$('#dg').treegrid({
		url : 'getAllDicts',
		striped : true,
		//pagination:false,
		loadFilter:function(data,parentId){
			data = utils.copyProperty(data.rows || data,['dictId'],['tempid'],false);
			return utils.toTreeData(data,'tempid','supDictId','children');
		}			
	});
});

function add() {
	$('#dg').datagrid('clearSelections');
	var VehicleURL = "getAllDictsList";
	$.getJSON(VehicleURL, function(json) {
		$('#supName').combotree({
			data : json,
			valueField : 'id',
			textField : 'test'
		});
	});
	$('#dlg').dialog('open').dialog('setTitle', '新增字典');
	$('#fm').form('clear');
}
function modify() {
	var row = $("#dg").treegrid('getSelected');
	if(row == null){
		MessageInfo.Info('提示', "请先选择数据");
	} else {
		var VehicleURL = "getAllDictsList?id=" + row.dictId;
		$.getJSON(VehicleURL, function(json) {
			$('#supName').combotree({
				data : json,
				valueField : 'id',
				textField : 'text'
			});
			if(row.supDictId!=null){
				$('#supName').combotree('setValue', row.supDictId);
			}			
		});
		$('#dlg').dialog('open').dialog('setTitle', '编辑字典');
		$('#fm').form('load', row);
	}
}
function save() {
	var row = $("#dg").treegrid('getSelected');
	var dictName=$.trim($("#dictName").textbox('getValue'));
	var supDictId=$("#supName").combobox('getValue');
	var remark=$.trim($("#remark").textbox('getValue'));
	if(dictName==null || dictName.length==0){
		MessageInfo.Info("错误",getAsteriskEmpty());
		return;
	}else if(supDictId==null || supDictId.length==0){
		MessageInfo.Info("错误",getAsteriskEmpty());
		return;
	}
	if(row == null){
		$.ajax({
	 		type:"post",
	 		url:"addDict",
	 		data:{"dictName":dictName,"supDictId":supDictId,"remark":remark},
	 		success:function(data){
	 			if (data.errCode == "SUCCESS"){
	 				$('#dlg').dialog('close'); 
					$('#dg').treegrid('reload');
	 			} else if(data.errCode == "VALIDATION_FAILED"){
	 				MessageInfo.Info("错误","与上级名称一样");
	 			} else {
	 				MessageInfo.Info("错误","该名称已存在");
	 			}
	 		}
	 	});
	}else{
		$.ajax({
	 		type:"post",
	 		url:"modifydict",
	 		data:{"id":row.dictId,"dictName":dictName,"supDictId":supDictId,"remark":remark,"oldName":row.dictName},
	 		success:function(data){
	 			if (data.errCode == "SUCCESS"){
	 				$('#dlg').dialog('close'); 
					$('#dg').treegrid('reload');
	 			} else if(data.errCode == "VALIDATION_FAILED"){
	 				MessageInfo.Info("错误","与上级名称一样");
	 			} else if(data.errCode == "EXISTENCE_SUBORDINATE"){
	 				MessageInfo.Info("错误","存在下级不可编辑");
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
			$.post('deleteDict', {
				id : row.dictId,
				dictName : row.dictName
			}, function(data) {
				if (data.errCode == "SUCCESS"){
					layer.closeAll();
					$('#dg').treegrid('reload');
	 			} else if(data.errCode == "EXISTENCE_SUBORDINATE"){
	 				MessageInfo.Info("错误","存在下级不可删除");
	 			}
			}, 'json');
			// //为按钮确定所用函数结束
		}, function() {
			// 点击取消按钮执行关闭窗体
			layer.closeAll();
		});
	}
}

function format(value, row) {
	return "<a href='#' style='height:100%;color:blue' onclick=findDetailedInfo("
	+ row.dictId
	+ ")><span class='icon icon-users'></span>[操作]</a>";	
}

function findDetailedInfo(id){
	var row = $("#dg").treegrid('getSelected');
	$('#dictInfo').dialog('open').dialog('setTitle', '详细信息');
	$('#dictfm').form('clear');
	$("#detailedInfo").datagrid({
		url : 'findDictById?id=' + id,
	});
}


function Query(){
	var orgName = $('#searchOrgName').val();
	var data = $('#dg').treegrid('getData');
	$('#dg').treegrid('expandAll');
	findChild(data,orgName);
}
function findChild(data,orgName){
	for (var i = 0; i < data.length ; i++) {
		var row = data[i];
		if(row.OrgName == orgName){
			$('#dg').treegrid('select',row.OrgId);
			return;
		}else{
			var children = row.children;
			if(row.children == undefined){
				//break;
			}else{
				findChild(children,orgName);
			}
		}
	}
}
function clearForm() {
	$('#searchOrgName').val("");
}