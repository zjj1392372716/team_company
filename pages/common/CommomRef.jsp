<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
    
<link rel="stylesheet" type="text/css" href="<%=path%>/js/easyui/themes/default/easyui.css" />    
<link rel="stylesheet" type="text/css" href="<%=path%>/js/easyui/themes/icon.css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/js/easyui/demo/demo.css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/css/fitem.css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/css/icon.css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/css/base.css" />
<script type="text/javascript" src="<%=path%>/js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/messageshow.js"></script>
<!--加载960CSS框架-->
<link href="<%=path%>/reflib/Content/css/960/fluid/reset.css" rel="stylesheet" type="text/css"  />
<link href="<%=path%>/reflib/Content/css/960/fluid/text.css" rel="stylesheet" type="text/css" />
<link href="<%=path%>/reflib/Content/css/960/fluid/grid.css" rel="stylesheet" type="text/css" />

<!--加载按钮CSS-->
<link href="<%=path%>/reflib/Content/css/btns/css3btn.css" rel="stylesheet" type="text/css" />
<link href="<%=path%>/reflib/Content/css/btns/sexybuttons.css" rel="stylesheet" type="text/css" />

<!--加载主题CSS-->
<link href="<%=path%>/reflib/Content/themes/default/style.css" rel="stylesheet" type="text/css" />  



<!--加载组件CSS-->  
<link href="<%=path%>/reflib/Content/js/jquery-plugin/showloading/showLoading.css" rel="stylesheet" type="text/css" />
<link href="<%=path%>/reflib/Content/js/jquery-plugin/ztree/css/zTreeStyle.css" rel="stylesheet" type="text/css"  />
<link href="<%=path%>/reflib/Content/js/jquery-plugin/jnotify/jquery.jnotify.css" rel="stylesheet" type="text/css" />
<!--中有用到 如果引入jqgrid也有用到-->
<link href="<%=path%>/reflib/Content/js/jquery-plugin/jqgrid/default/jquery-ui-1.8.4.custom.css" rel="stylesheet" type="text/css" />

<!--加载样式修正CSS-->
<link href="<%=path%>/reflib/Content/css/hack/fix.css" rel="stylesheet" type="text/css" />  