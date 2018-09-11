var localObj = window.location;
var baseurl = localObj.protocol+"//"+localObj.host;
var drawingID=getUrlParam("drawingID");//图纸ID
layui.use(['upload','layer'], function(){
		var upload = layui.upload, layer = layui.layer, $ = layui.jquery;
		var	uploadInst = upload.render({
			elem: '#picUpload', //绑定元素
			accept: 'images', //允许上传的文件类型
			multiple: true, //允许多文件上传
			auto: false, //选完文件后不要自动上传
			bindAction: '#save', //指定一个按钮触发上传
			url: baseurl+'/Drawingattachment/uploadImg?id='+drawingID, //上传接口
			choose:(obj)=>{//预览图片
		    	var files = obj.pushFile();
	    		obj.preview((index, file, result)=>{
		        	$('#div_prev').append('<div class="box"><img id="img_prev" class="thumb" src="'+ result +'" alt="'+ file.name +'"/><div class="con remove_'+index+'"><i class="close layui-icon"></i></div></div>')
			      	$('.remove_'+index).bind('click',function(){
			      		delete files[index];//删除指定图片
			      		$(this).parent().remove();
			      	})
	    		});
		    }
		    ,done: function(res, index, upload){
				 //如果上传失败
		        if (!res.code) {
		            return layer.msg('上传失败');
		        }else{
		        	layer.msg('上传成功！');
		        	parent.layer.closeAll();
		        	parent.$('#dlg').dialog('close');
		        	parent.$('#dg').treegrid('reload');		
		        }
			},
			error: function(){
				//请求异常回调
			}
		});
	});

/**
 * js获取浏览器的地址参数
 * 
 * @param name
 *            地址参数
 * @return
 */
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return decodeURI(r[2]); // decodeURI参数内容。
	return null; // 返回参数值
}