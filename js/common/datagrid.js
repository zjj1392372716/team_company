/**
 * 初始化datagrid
 * @returns
 */
function initDataGird(datagridId,height){
	if(height==undefined){
		height = window.innerHeight;
	}
	$('#'+datagridId).datagrid({
		pagination:true,
		singleSelect:true,
		rowNumbers:true,
		height:height,
		method:'get',
		autoRowHeight:true,
		striped:true
	});
	paginationSetting(datagridId);
}
/**
 * 根据url和查询参数填充datagrid中的数据
 * @param id
 * @param url
 * @param queryParams
 * @returns
 */
function queryData(id,url,queryParams,pageSize){
	$('#'+id).datagrid({
		url:url,
		queryParams:queryParams
	});
	paginationSetting(id,pageSize);
}

function paginationSetting(id,pageSize){
	if(pageSize==undefined) pageSize = 10;
	var p = $("#"+id).datagrid('getPager');
	$(p).pagination({
		pageSize:pageSize,  //煤业显示的记录条数，默认为10
		pageList:[pageSize*1,pageSize*2,pageSize*3],
		beforePageText:'第',
		afterPageText:'页   共 {pages} 页',
		displayMsg:'当前显示 {from} - {to} 条记录    共 {total} 条记录'
	});	
}