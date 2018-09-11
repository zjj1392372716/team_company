/**
 * 订单 TSS
 */
// 判断存在编辑中的行
var h = $(window).height() * 0.98 - 55;
$(function(){	
	showSales();
	PageModeHeight("dg","getAllLog",h/2-68);
})

/**
 * 订单列表
 */
function showSales(){
	$("#dg").datagrid({
		onClickRow:function(index,data){
			PageModeHeight("logContent","getContentByLogId?id=" + data.logID,h * 0.46+58);
		},
		onLoadSuccess:function(data){
			
		}
	})
}

/**
 * 查询
 */
function Query(){
	var userName = $('#userName').textbox('getText');
	var loginName = $('#loginName').textbox('getText');
	var url = "getAllLog?userName="+userName+"&loginName="+loginName;
	PageModeHeight("dg", url, h/2-68);
}
/**
 * 清空
 */
function clearForm(){
	$('#searchNo').textbox('setText','');
	$('#customerName').textbox('setText','');
}
