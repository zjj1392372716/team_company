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
<title>按钮管理里面</title>
<style>
	.datagrid-wrap{border:1px solid #8DB2E3;}
</style>
</head>
<body>

<div class="easyui-layout" id="pagecontent" style="width: 100%; height: 100%;">	
   	<div region="center" id="centers" style="width:100%; height: 100%;">
		<div class='tf-toolbar' id="toolbar"></div>
	<%-- <%=(new ShowButtonAction()).RenderToolbar(request.getServletPath()) %> --%>
	<table id="dg" class="easyui-datagrid" style="width:100%;height:95%;"
	 data-options="rownumbers:true,singleSelect:true,method:'get',border:true,fitColumns:true">
	 	<thead>
	 		<tr>
	 			<th field="btnId" width="5%" hidden="true ">按钮ID</th>
	 			<th field="buttonname" sortable="true" width="10%">按钮名称</th>
	 			<th field="buttoncode" sortable="true" width="10%">按钮代码</th>
	 			<th field="iconClass" width="10%">图标类</th>
	 			<th field="description" width="20%">描述</th>
	 			<th field="serial" sortable="true" width="4%">排序</th>
	 			<th field="black" formatter="formatterMenus" width="6%">关联菜单</th>
	 		</tr>
	 	</thead>
	</table>	
	</div>
	</div>
	<div id="dlg" class="easyui-dialog" style="width:400px;height:350px;padding:10px 20px" closed="true" buttons="#dlg-buttons">
		<div class="ftitle">按钮信息</div>
		<form id="fm" method="post">
			<div class="fitem">
				<label>按钮名称：</label>
				<input name="buttonname" id="buttonname" maxlength="50" class="easyui-textbox" required="true" />
			</div>
			<div class="fitem">
				<label>按钮代码：</label>
				<input name="buttoncode" id="buttoncode" maxlength="50" class="easyui-textbox" required />
			</div>
			<div class="fitem">
				<label>按钮图标：</label>
				<input name="iconclass" class="easyui-filebox" data-options="prompt:'请选择按钮图标',accept:'image/*'"/>
			</div>
			<div class="fitem">
				<label>按钮描述：</label>
				<input name="description" id="description" maxlength="200" class="easyui-textbox" />
			</div>
			<div class="fitem">
				<label>排序：</label>
				<input name="serial" id="serial" maxlength="20" class="easyui-numberbox" data-options="precision:0,max:9223372036854775807,maxlength:20" required />
			</div>
			<div id="dlg-buttons">
				<a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="save()" style="width:90px">保存</a>
				<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="checkClose()" style="width:90px;">取消</a>
			</div>
		</form>
	</div>
	<div id="UpdateMenu"></div>

	<script type="text/javascript" src="../../js/pages/sys/button.js"></script>
</body>
</html>