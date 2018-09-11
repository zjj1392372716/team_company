$(function() {
	$('#dg').datagrid({
		url : 'getAllOppositeParty',
		striped:true, 
		pagination:true,
	});
	PageConfig("#dg");
});
/*$(function() {
	$('#dg').treegrid({
		url : 'getAllOppositeParty',
		striped : true,
		pagination:true,
		loadFilter:function(data,parentId){
			data = utils.copyProperty(data.rows || data,['id'],['tempid'],false);
			return utils.toTreeData(data,'tempid','supId','children');
		}
	});
	PageConfig("#dg");
});*/


function format(value, row) {
	return "<a href='#' style='height:100%;color:blue' onclick=findDetailedInfo("
	+ row.id
	+ ")><span class='icon icon-users'></span>[详情查看]</a>";	
}

function findDetailedInfo(id){
	var row = $('#dg').datagrid('find',id);
	//var row = $("#dg").datagrid("find",id);
	$('#dlg').dialog('open').dialog('setTitle', '详细信息');
	$('#fm').form('load', row);
}
