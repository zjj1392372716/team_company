var h = $(window).height() * 0.98 - 82;
$(function(){	
	PageModeHeight("dg","getAllErrorLog",h);
})


/**
 * 查询
 */
function Query(){
	var userName = $('#userName').textbox('getText');
	var url = "getAllErrorLog?userName="+userName;
	PageModeHeight("dg", url, h);
}
/**
 * 清空
 */
function clearForm(){
	$('#userName').textbox('setText','');
}
