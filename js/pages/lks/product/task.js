/*window.onload = function(){  //页面加载完毕事件
	//initDataGird("dg");//初始化datagrid的基本配置
	//填充datagrid
	queryData("dg","/Processpart/getAllProcesspartsByPagination",
				{state:$('#processPartState').val()});
	PageMode("dg","/Processpart/getAllProcesspartsByPagination?state=生产中",10);
}*/

$(function(){
	initDataGird("dg");//初始化datagrid的基本配置
	queryData("dg","/Processpart/getAllProcesspartsByPagination",
			{state:$('#processPartState').val()});
});

// 函数列表部分
/**
 * 初始化操作详情
 * @returns
 */
function operateDetail(val,row){
	return "<a href='#'>[详情]</a>";
}
/**
 * 搜索
 * @returns
 */
function Query(){
	//测试，首先根据序列号进行筛选，所有的查询均是基于模糊查询的
	//获取所输入的序列号
	var serialNum = $('#serialNumber').val();
	var partNumber = $('#partNumber').val();
	var poNumber = $('#PONumber').val();
	
	var params = {partNumber:partNumber,serialNumber:serialNum,poNumber:poNumber,state:$('#processPartState').val()};
	queryData("dg","/Processpart/getAllProcesspartsByBlurSearch",
			params);
}
/**
 * 清空选择框
 * @returns
 */
function clearForm(){
	$('#serialNumber').val("");
}