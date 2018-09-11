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
<link rel="stylesheet" href="../../css/basecommon/loadingstyle.css"/>
<link rel="stylesheet" href="../../css/basecommon/addBase.css" /> 
<link rel="stylesheet" href="../../css/sys/system.css"/> 
<script type="text/javascript" src="../../js/easyui/jquery.min.js"></script>
<script type="text/javascript" src="../../js/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="../../js/common/messageshow.js"></script>
<script type="text/javascript" src="../../js/common/tips.js"></script>
<script type="text/javascript" src="../../js/common/baseCommon.js"></script>
<script type="text/javascript" src="../../js/pages/lks/maindata/catalopg.js"></script>
<title>价格管理</title>
<style type="text/css">
.textbox{
	width: 230px!important;height:24px;left:10px!important;
}
</style>
</head>
<body>
	<div class="easyui-layout" id="pagecontent" style="width: 100%; height: 100%;border:1px solid #8DB2E3;">
		<div region="center" id="centers" style="width:100%; height: 100%;">
			<div class='tf-toolbar' id="toolbar"></div>
		   	<div id="tops" class="topscon">
				<form method="post">
					<div class="labelCon">			
						<label	class="mlabel">部件编号:</label> 
						<input id="searchPartnumber" name="searchPartnumber" class="easyui-textbox"/>
						<div class="btnCon" style="left: 334px; top: -30px;">
							<a href="javascript:void(0)" class="easyui-linkbutton bgColor"
								iconCls="" onclick="Query()" style="margin-right: 20px">查询</a> <a
								href="javascript:void(0)"
								class="easyui-linkbutton slicksize bgColor"
								data-options="iconCls:''" onclick="clearForm()">清空</a>
						</div>
					</div>		
				</form>
			</div>
			<table id="dg" class="easyui-datagrid" style="width: 100%;" data-options="rownumbers:true,singleSelect:true,method:'get',border:true">
				<thead>
					<tr>
						<th field="catalopgId" width="5%" hidden="true">价格ID</th>
						<th field="drawingID" hidden="true">部件ID</th>
						<th  data-options="align:'center',field:'toversion'" width="8%"   formatter="formattertoversion">操作</th>
						<th field="partnumber" width="200px">部件编号</th>
						<th field="price" width="100px" align="center">价格</th>
						<th field="description" width="300px">描述</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
	<div id="dlg" class="easyui-dialog" style="width: 450px; height:400px;" closed="true" buttons="#dlg-buttons">
		<form id="fm" method="post" style="width: 370px;padding-top:20px;" >
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top:8px;">*</p><p class=" contents_letter " >部件编号：</p></label> 
				<input  id="supOrgs" class="combotree"/>
			</div>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top:8px;"></p><p class=" contents_letter " >价格：</p></label> 
				<input name="price" id="price" class="easyui-textbox" />
			</div>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top:8px;"></p><p class=" contents_letter " >描述：</p></label> 
				<textarea id="description" name="description" class="easyui-textbox"
							data-options="multiline:true"  style="width: 198px;height:84px" ></textarea>
			</div>
		</form>
	</div>
	<div id="dlg-buttons">
		<button id="save" class="easyui-linkbutton c6"  iconCls="icon-ok" onclick="save()" style="width: 90px;">确定</button> 
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close');$('#dg').datagrid('reload');"
			style="width: 90px;">取消</a>
	</div>
	
	<div id="seeversion" class="easyui-dialog" style="width:600px;height:520px;padding:10px 20px" closed="true" >
			<div style="border:1px solid #80afe6;width:100%;min-height:300px;overflow:auto;margin-top: 10px;">
				<table id="checkversion" class="easyui-datagrid" data-options="rownumbers:true,method:'get',singleSelect:true,fitColumns:true"
					style="height:100%; width:100%;">
					<thead>
						<tr>
						<th field="catalopgId" width="5%" hidden="true">价格ID</th>
						<th field="partNumber" width="200px">部件编号</th>
						<th field="price" width="100px" align="center">价格</th>
						<th field="description" width="300px">描述</th>
						</tr>
					</thead>
				</table>
			</div>
	</div>
</body>
</html>