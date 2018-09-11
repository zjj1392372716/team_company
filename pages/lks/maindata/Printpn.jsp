<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<title>上传图纸</title>
<jsp:include page="/Pages/common/CommomRef.jsp" />
<link rel="stylesheet" href="<%=path%>/js/layui/css/layui.css">
<script type="text/javascript" src="<%=path%>/js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="<%=path%>/js/layui/layui.js"></script>
<script type="text/javascript" src="<%=path%>/js/easyui/jquery.min.js"></script>
<script type="text/javascript"
	src="<%=path%>/js/easyui/jquery.easyui.min.js"></script>
<script type="text/JavaScript"
	src="<%=path%>/js/easyui/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/tips.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/baseCommon.js"></script>
<script type="text/javascript" src="<%=path%>/js/print/jQuery.print.js"></script>
<script type="text/javascript" src="<%=path%>/js/pages/lks/maindata/printpn.js"></script>
 <style>
	.thumb {margin-left:5px; margin-top:15px; height:128px}
	#prevModal {width:100%; height:100%; text-align:center; display:none;}
	#img_prev {max-width:98%; max-height:98%; margin: 10px auto}
	.box{ display:inline-block}
	.layui-icon {
    font-family: layui-icon!important;
    font-size: 30px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    background-color: #d2d2d2;
    -moz-osx-font-smoothing: grayscale;
}
.buttonpos{
     position: absolute;
    left: 618px;
    top: 723px;
}
  </style>
</head>
<body>
	<center>
		<div class='layui-input-block' id='div_prev' title=''></div>
		
		<div id='prevModal'>
			<img id='img_prev' />
		</div>
	</center>
		<div class="buttonpos">
			<a id="picUpload" class="easyui-linkbutton" data-options="iconCls:'icon-planstart'">上传图纸</a>
			<button id="save" class="easyui-linkbutton c6" iconCls="icon-ok"   style="width: 90px">确定</button>
			<button  class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:parent.layer.closeAll();$('#dlg').dialog('close');$('#dg').treegrid('reload');" style="width: 90px;">取消</button>
		</div>	
		
</body>
</html>