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
<script type="text/javascript" src="../../js/pages/sys/showAllParaam.js"></script>
<title>系统参数</title>
<style>
	.datagrid-wrap{border:1px solid #8DB2E3;}
</style>
</head>
<body>

<div class="easyui-layout" id="pagecontent" style="width: 100%; height: 100%;">	
   	<div region="center" id="centers" style="width:100%; height: 100%;">
		<div class='tf-toolbar' id="toolbar"></div>
		<table id="dg" class="easyui-datagrid" style="width:100%;height:95%;"
			data-options="rownumbers:true,singleSelect:true,method:'get',border:true">
			<thead>
				<tr>
					<th field="paramID" width="5%" hidden="true">参数ID</th>
					<th field="paramcode" width="10%">参数编码</th>
					<th field="paramvalue" width="10%">参数值</th>
					<th field="isEdited" width="15%" hidden="true" formatter="IsVisible">是否可见</th>		
					<th field="remark" width="10%">备注</th>
					<!-- <th field="creator" width="5%">创建者</th>
					<th data-options="align:'center',field:'createtime'" width="10%" sortable="true">创建时间</th> -->
					<th field="updator" width="5%">更新者</th>
					<th data-options="align:'center',field:'updateTime'" width="10%" sortable="true">更新时间</th>
				</tr>
			</thead>
		</table>
	</div>
</div>
<div id="dlg" class="easyui-dialog" style="width:410px;height:240px;padding:1px 2px;" closed="true" buttons="#dlg-buttons">
	<form id="fm" method="post" >
		<div  class="contents">
			<label><p class="symbol floatLeft" style="margin-top:6px;">*</p><p class="contents_letter " >参数编码：</p></label>
	 		<!-- <label><p class="symbol floatLeft" style="margin-top:6px;">*</p><p class="contents_letter " >参数编码：</p></label> -->
	 		<input name="paramcode" class="promptBox" maxlength="50" id="paramcode" disabled="disabled" />
	 	</div>
	 	<div  class="contents">
	 		<label><p class="symbol floatLeft" style="margin-top:6px;">*</p><p class="contents_letter " >参数值：</p></label>
	 		<input name="paramvalue" class="promptBox" maxlength="50" id="paramvalue" />
	 	</div>
	 	<!-- <div class="contents" >
	 		<label>是否可见：</label>
	 		<input type="checkbox"  name="isEdited" />
	 		<input  name="isEdited" class="promptBoxInput" maxlength="50" id="isEdited" />
	 	</div> -->
	 	<div  class="contents">
	 		<label><p class="symbol floatLeft"> </p><p class="contents_letter " >备<span class="blank">注：</p></label>
	 		<input name="remark" class="promptBox" maxlength="50" id="remark" />
	 	</div>
	</form>
</div>
<div id="dlg-buttons" >
	<button class="easyui-linkbutton c6" iconCls="icon-ok" onclick="save()" style="width:90px" id="save">确定</button>
	<button class="easyui-linkbutton" iconCls="icon-cancel" onclick="checkClose()" style="width:90px;">取消</button>
</div>
	
</body>
</html>