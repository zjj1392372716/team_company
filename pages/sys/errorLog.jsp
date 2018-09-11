<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<jsp:include page="/Pages/common/CommomRef.jsp" />

<script type="text/javascript" src="../../js/easyui/jquery.min.js"></script>
<script type="text/javascript" src="../../js/easyui/jquery.easyui.min.js"></script>
<script type="text/JavaScript" src="<%=path %>/js/easyui/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="../../js/common/utils.js"></script>
<script type="text/javascript" src="../../js/common/tips.js"></script>
<script type="text/javascript" src="../../js/common/baseCommon.js"></script>
<script type="text/javascript" src="<%=path%>/js/pages/sys/errorLog.js"></script>

<title>登录日志</title>
<style>
	.datagrid-wrap{border:1px solid #8DB2E3;}
	.labelCon{padding-top:15px;}
</style>
<link rel="stylesheet" href="../../css/basecommon/addBase.css" />
<link rel="stylesheet" href="../../css/basecommon/loadingstyle.css"/> 
<link rel="stylesheet" href="../../css/sys/roleorg.css"/>
</head>
<body>
<div class="easyui-layout" id="pagecontent" style="width: 100%; height: 100%;">
	<div region="center" id="centers" style="width:100%; height: 100%;">
		<div class='tf-toolbar' id="toolbar"></div>
		<div class="labelCon" style="border-bottom:1px solid #8DB2E3!important;">
			<label class="mW">用户名称:</label> 
			<input id="userName" name="userName" class="easyui-textbox"  />
			<a href="javascript:void(0)" class="bgColor easyui-linkbutton" 
  					style="padding-left: -;margin-left: 20px;" onclick="Query()">查询</a> 
			<a href="javascript:void(0)" class="bgColor easyui-linkbutton slicksize" onclick="clearForm()">清空</a> 
				
		</div>
		<table id="dg" class="datagrid" style="width:100%;height:89%;"
		data-options="singleSelect:true,method:'get',rownumbers:true,boder:true">
			<thead>
				<tr>
					<th field="runtimeErrorID" width="10%" hidden="true">记录ID</th>
					<th field="errorTime" width="10%" >错误时间</th>
					<th field="errorDetail" width="10%" >错误信息</th>
					<th field="userID" width="10%" hidden="true">用户ID</th>
					<th field="userName" align="center" width="8%" >用户名称</th>
					<th field="errorLevel" align="center" width="10%">错误级别</th>
					<!-- <th field="operation" align="center" width="5%">操作类型</th>
					<th field="tblName" align="right" width="5%">表名</th>
					<th field="tblComment" align="right" width="5%">表备注</th> -->
				</tr>
			</thead>
		</table>
	</div>
</div>
</body>
</html>