//title为标题，msg为消息
//询问框，点击是否

var MessageInfo = {};
// 警报提示框
MessageInfo.Alarm = function(title, msg, id, type) {
	layer.alert(msg, {
		icon : 5,
		skin : 'layer-ext-moon',
		shadeClose : true,
		title : title
	})
}
// 信息提示框
MessageInfo.Info = function(title, msg) {	
	layer.alert(msg, {
		icon : 0,
		skin : 'layer-ext-moon',
		shadeClose : true,
		title : title
	})
}
// 错误提示框提示框
MessageInfo.Error = function(title, msg) {
	layer.alert(msg, {
		icon : 2,
		skin : 'layer-ext-moon',
		shadeClose : true,
		title : title
	})
}
