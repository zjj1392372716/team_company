<?xml version="1.0" encoding="UTF-8" ?>
<%@page import="com.TonFun.Base.controller.sys.BtnController"%>
<%
    String path = request.getContextPath();   
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<jsp:include page="/Pages/common/CommomRef.jsp" />
<link href="<%=path %>/css/icon.css" rel="stylesheet" type="text/css" />	
<link rel="stylesheet" href="<%=path%>/css/basecommon/loadingstyle.css"/>
<link rel="stylesheet" href="<%=path%>/css/basecommon/addBase.css"/>  
<link rel="stylesheet" href="<%=path%>/css/sys/org.css"/>  
<script type="text/javascript" src="../../js/easyui/jquery.min.js"></script>
<script type="text/javascript" src="../../js/easyui/jquery.easyui.min.js"></script>
<script type="text/JavaScript" src="<%=path %>/js/easyui/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="../../js/common/utils.js"></script>
<script type="text/javascript" src="../../js/common/tips.js"></script>
<script type="text/javascript" src="../../js/common/baseCommon.js"></script>
<script type="text/javascript" src="../../js/pages/dicts/Dict.js"></script>
<style>
	.datagrid-wrap{border:1px solid #8DB2E3;}
</style>
</head>
<body>
<div class="easyui-layout" id="pagecontent" style="width: 100%; height: 100%;">
	<div region="west" title="数据字典" split="true" style="width:10%;">
		<ul id="dictTypeList" class="easyui-tree" data-options="url:'getAllDict'"></ul> 
	</div>
	<div region="center"  style="width:90%;">					
		<div id='dict' class="easyui-tabs" style="width:100%;height:100%;">					
			<iframe id="ifame1" style="width:100%;height:100%;"></iframe>
		</div>
	</div>
</div>	
</body>
</html>