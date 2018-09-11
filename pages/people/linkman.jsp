<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
<script type="text/javascript" src="../../js/common/character.js"></script>
<script type="text/javascript" src="../../js/common/baseCommon.js"></script>
<script type="text/javascript" src="../../js/pages/people/linkman.js"></script>
<title>联系人</title>
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
						<label	class="mlabel">姓名:</label> 
						<input id="searchName" name="searchName" class="easyui-textbox"/>
						<label	class="mlabel">类别:</label> 
						<input name="searchType" id="searchType" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',url:'findLinkmanType'"/>
						<div class="btnCon" style="left:600px;top:-33px;">
							<a href="javascript:void(0)" class="easyui-linkbutton bgColor"
								iconCls="" onclick="Query()" style="margin-right:20px">查询</a> 
							<a href="javascript:void(0)" class="easyui-linkbutton slicksize bgColor"
								data-options="iconCls:''" onclick="clearForm()">清空</a>
						</div>
					</div>		
				</form>
			</div>
			<table id="dg" class="easyui-datagrid" style="width: 100%;" data-options="rownumbers:true,singleSelect:true,method:'get',border:true">
				<thead>
					<tr>
						<th field="linkManId" width="5%" hidden="true">ID</th>
						<th field="typeid" width="5%" hidden="true">类别ID</th>
						<th field="linkManName" width="200px">姓名</th>
						<th field="type" width="80px" align="center">类别</th>
						<th field="linkman" width="100px" align="center">联系人</th>
						<th field="detailAddress" width="300px">地址</th>
						<th field="sex" width="70px" align="center">性别</th>
						<th field="phoneNumber" width="175px" align="center">手机号码</th>
						<th field="email" width="175px" >邮箱</th>
						<th field="remark" width="250px" >备注</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
	<div id="dlg" class="easyui-dialog" style="width: 450px; height:400px;" closed="true" buttons="#dlg-buttons">
		<form id="fm" method="post" style="width: 370px;padding-top:20px;" >
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top:8px;">*</p><p class=" contents_letter " >姓名：</p></label> 
				<input name="linkManName" id="linkManName" maxlength="50" class="easyui-textbox"/>
			</div>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top:8px;">*</p><p class=" contents_letter " >类别：</p></label> 
				<input name="type" id="type" class="easyui-combobox"
					data-options="valueField:'id',textField:'text',url:'findLinkmanType'"/>
			</div>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top:8px;"></p><p class=" contents_letter " >地址：</p></label> 
				<input name="detailAddress" id="detailAddress" class="easyui-textbox"/>
			</div>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top:8px;">*</p><p class=" contents_letter " >性别：</p></label> 
				<input name="sex" id="sex" class="easyui-combobox"
					data-options="valueField:'id',textField:'text',url:'getSex'"/>
			</div>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top:8px;">*</p><p class=" contents_letter " >手机号码：</p></label> 
				<input name="phoneNumber" id="phoneNumber" class="easyui-textbox"/>
			</div>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top:8px;"></p><p class=" contents_letter " >邮箱：</p></label> 
				<input name="email" id="email" class="easyui-textbox"/>
			</div>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top:8px;"></p><p class=" contents_letter " >备注：</p></label> 
				<input name="remark" id="remark" class="easyui-textbox" />
			</div>
		</form>
	</div>
	<div id="dlg-buttons">
		<button id="save" class="easyui-linkbutton c6"  iconCls="icon-ok" onclick="save()" style="width: 90px;">确定</button> 
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close');$('#dg').datagrid('reload');"
			style="width: 90px;">取消</a>
	</div>
	
	<div id="link" class="easyui-dialog" style="width:800px;height:520px;padding:10px 20px" closed="true" buttons="#dlg1-buttons1">
		<form id="linkfm" method="post" >
			<div style="border:1px solid #80afe6;width:100%;min-height:420px;overflow:auto;margin-top: 10px;">
				<table id="linkInfo" class="easyui-datagrid" data-options="method:'get',border:true,singleSelect:true,fitColumns:true"
					style="height:100%; width:100%;">
					<thead>
						<tr>
							<th field="dictName" width="100px">姓名</th>
							<th field="preName" width="100px">性别</th>
							<th field="afterName" width="100px">联系方式</th>
						</tr>
					</thead>
				</table>
			</div>
		</form>
	</div>
</body>
</html>