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
<title>菜单信息</title>
<style>
	.datagrid-wrap{border:1px solid #8DB2E3;}
</style>
</head>
<body>

<div class="easyui-layout" id="pagecontent" style="width: 100%; height: 100%;">	
   <div region="center" id="centers" style="width:100%; height: 100%;">
		<div class='tf-toolbar' id="toolbar"></div>
		<table id="dg" class="easyui-treegrid" style="width:100%;height:95%;"
			 rownumbers="true" idField="menu_id" treeField="menu_name">
			<thead>
				<tr>
					<th field="menu_id" width="5%" hidden="true">菜单ID</th>
					<th field="menu_name" width="13%">菜单名称</th>
					<th field="menu_code" width="5%">编码</th>
					<th field="parent_code" width="7%" formatter="formatterParentName">上级菜单</th>		
					<th field="icon_class" width="10%">图标</th>
					<th field="url" width="15%">链接地址</th>
					<th field="description" width="15%">描述</th>
					<th field='visible_state' width="5%" formatter="IsVisible">是否可见</th>
					<th field="enabled_state" width="5%" formatter="IsEnable">是否启用</th>
					<th field="serial" width="3%">排序</th>
					<th field="black" width="5%" formatter="formatterMembers">页面按钮</th>		
				</tr>
			</thead>
		</table>
	</div>
</div>	
   
	<div id="dlg" class="easyui-dialog" style="width:400px;height:450px;padding:10px 20px" closed="true" buttons="#dlg-buttons">
		<div class="ftitle">菜单信息</div>
		<form id="fm" method="post">					
			<div class="fitem">
				<label>菜单名称：</label>
				<input name="menuname" id="menu_name" maxLength=50 class="easyui-textbox" required="true" />				
			</div>
			<div class="fitem">
				<label>菜单编码：</label>
				<input name="menucode" id="menu_code"  class="easyui-textbox" maxLength=50 required="true" />
			</div>
			<div class="fitem">
				<label>上级菜单：</label>
				<input name="supmenuid" class="easyui-combotree" data-options="url:'getCascadeMenu',method:'get'" />
			</div>
			<div class="fitem">
				<label>图标：</label>
				<input name="iconclass" class="easyui-filebox" data-options="prompt:'请选择图标',accept:'image/*'" />
			</div>
			<div class="fitem">
				<label>链接地址：</label>
				<input name="url" class="easyui-textbox" id="testUrl" required  />
			</div>
			<div class="fitem">
				<label>菜单描述：</label>
				<input name="description" id="description" maxlength="200" class="easyui-textbox" />
			</div>
			<div class="fitem">
				<label>是否可见：</label>
				<input type="checkbox"  name="visiblestate" />
			</div>
			<div class="fitem">
				<label>是否启用：</label>
				<input type="checkbox"  name="enabledstate" />				
			</div>
			<div class="fitem">
				<label>排序</label>
				<input name="serial" id="serial" maxLength=20 class="easyui-textbox"></input>
			</div>
		</form>
	</div>	
	<div id="dlg-buttons">
		<a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="save()" style="width:90px;">保存</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="checkClose()" style="width:90px;">取消</a>
	</div>
	<div id="selectIcon" data-options="iconCls:'icon-save',resizable:true,modal:true"></div>
	<div id="updateMenuBtn"></div>

	<script type="text/javascript" src="../../js/pages/sys/menu.js"></script>
	
</body>
</html>