<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<jsp:include page="/Pages/common/CommomRef.jsp" />
<script type="text/javascript" src="../../js/easyui/jquery.min.js"></script>
<script type="text/javascript" src="../../js/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="../../js/common/messageshow.js"></script>
<script type="text/javascript" src="../../js/common/tips.js"></script>
<script type="text/javascript" src="../../js/common/character.js"></script>
<script type="text/javascript" src="../../js/common/baseCommon.js"></script>
<script type="text/javascript" src="../../js/pages/sys/role.js"></script>
<link rel="stylesheet" href="../../css/basecommon/loadingstyle.css"/>
<link rel="stylesheet" href="../../css/basecommon/addBase.css" /> 
<link rel="stylesheet" href="../../css/sys/system.css"/> 
<title>角色管理</title>
<style type="text/css">
.textbox{
width: 174px!important;height:24px;left:10px!important;
}
</style>
</head>
<body>
	<div class="easyui-layout" id="pagecontent" style="width: 100%; height: 100%;border:1px solid #8DB2E3;">
		<div region="center" id="centers" style="width:100%; height: 100%;">
		<div class='tf-toolbar' id="toolbar">
		</div>
			<table id="dg" class="easyui-datagrid" style="width: 100%;" data-options="rownumbers:true,singleSelect:true,method:'get',border:true">
				<thead>
					<tr>
						<th field="roleID" width="5%" hidden="true">ID</th>
						<th field="roleName" width="200px" sortable="true">角色名称</th>
						<th data-options="align:'right',field:'serial'" width="75px" sortable="true">排序</th>
						<th field="dataPermissionStatusName" >数据权限</th>
						<th data-options="align:'center',field:'touser'" width="150px" formatter="formattertouser">操作</th>	
						<th field="description" width="500px">描述</th>
						<th field="creator" width="100px" sortable="true">创建者</th>
						<th data-options="align:'center',field:'createTime'" width="175px" sortable="true">创建时间</th>
						<th field='updator' width="100px" sortable="true">更新者</th>
						<th data-options="align:'center',field:'updateTime'" width="175px" sortable="true">更新时间</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
	<div id="dlg" class="easyui-dialog" style="width: 450px; height:300px;" closed="true" buttons="#dlg-buttons">
		<form id="fm" method="post" style="width: 370px;padding-top:20px;" >
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top:6px;">*</p><p class=" contents_letter " >角色名称：</p></label> 
				<input name="roleName" id="roleName" maxlength="50" class=" promptBox"/>
			</div>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top:6px;">*</p><p class=" contents_letter " >数据权限：</p></label> 
							<input id="dataPermissionStatus" name="dataPermissionStatus" class="easyui-combobox" style="width:180px"
				data-options="valueField:'id',textField:'text',url:'findAllDataPermissionByPerssion'"/>
			</div>
					
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top:8px;"> </p><p class=" contents_letter " >序<span class="blank"></span>号：</p></label> 
				<input name="serial" class="promptBox" maxlength="8" id="serial" />
			</div>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top:6px;"></p><p class=" contents_letter " >描<span class="blank"></span>述：</p></label> 
				<input name="description" id="description" class="promptBox " maxlength="200" data-options="multiline:true"/>
			</div>
		</form>
	</div>
	<div id="dlg-buttons">
		<button id="save" class="easyui-linkbutton c6"  iconCls="icon-ok" onclick="save()" style="width: 90px;">确定</button> 
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close');$('#dg').datagrid('reload');"
			style="width: 90px;">取消</a>
	</div>
	<div id="selectIcon" data-options="iconCls:'icon-save',resizable:true,modal:true"></div>
	<div id="upRoleToUser" style="width:400px;border:none;"></div>
	<div id="upRoleToOrg" style="width:600px;border:none;"></div>
</body>
</html>