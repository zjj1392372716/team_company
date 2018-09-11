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
<script type="text/javascript" src="<%=path%>/js/easyui/jquery.min.js"></script>
<script type="text/javascript" src="<%=path%>/js/easyui/jquery.easyui.min.js"></script>
<script type="text/JavaScript" src="<%=path %>/js/easyui/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/utils.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/tips.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/baseCommon.js"></script>
<script type="text/javascript" src="<%=path%>/js/pages/sys/org.js"></script>
<title>部门管理页面</title>
<style>
	.datagrid-wrap{border:1px solid #8DB2E3;}
	.labelCon{padding-top:15px;}
	.textbox{
	    float: right;
	    margin-right: 65px;
	}
	.promptBox1{
		width:172px;
		height:27px;
		border:1px solid #8db2e3;
		border-radius:5px;
		line-height:27px;
		text-align:left;
		margin-left:0px;
		margin-right:65px;
		text-indent:5px;	
	}
</style>
</head>
<body>
<div class="easyui-layout" id="pagecontent" style="width: 100%; height: 100%;">	
   	<div region="center" id="centers" style="width:100%; height: 100%;">
	   	<div class='tf-toolbar' id="toolbar"></div>
	   	<button onclick = "add()">新增</button>
	   	<button onclick = "modify()">编辑</button>
	   	<button onclick = "deleteInfo()">删除</button>
			<div id="tops" class="topscon" >
				<form method="post">
					<div class="labelCon">			
						<label	class="mlabel">字典名称:</label> 
						<input id="searchOrgName" name="searchOrgName" class="promptBox1"/>
						<div class="btnCon" style="left:280px;top:-33px;">
							<a href="javascript:void(0)" class="easyui-linkbutton bgColor"
								iconCls="" onclick="Query()" style="margin-right:20px">查询</a> 
							<a href="javascript:void(0)" class="easyui-linkbutton slicksize bgColor"
								data-options="iconCls:''" onclick="clearForm()">清空</a>
						</div>
					</div>		
				</form>
			</div>
			<table id="dg" class="easyui-treegrid" style="width:100%;height:88.5%;"
				rownumbers="true" idField="dictId" treeField="dictName">
				<thead>
					<tr>
						<th field="dictId" width="5%"  hidden="true">字典ID</th> 
						<th field="dictName" width="250px">名称</th>
						<th field="supDictId" width="5%"  hidden="true">上级字典ID</th>
						<th field="supName" width="250px">上级字典</th>
						<th field="remark" width="500px">描述</th>
						<th data-options="align:'center',field:'touser'" width="150px" formatter="format">操作</th>	
					</tr>
				</thead>
			</table>	
		</div>
	</div>
	<div id="dlg" class="easyui-dialog" style="width:420px;height:320px;padding:10px 20px;" modal="true" closed="true" buttons="#dlg-buttons">
		<form id="fm" method="post">
		    <div class="contents">
				<label><p class="symbol floatLeft" style="margin-top:2px;"></p>名称:</label> 
				<input name="dictName" id="dictName"   class="promptBox easyui-textbox" maxlength="20" />
			</div>			
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top:8px;"></p>上级字典：</label> 
					<input name="supName" class="easyui-combotree" id="supName" />
			</div>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top:4px;"></p>描述：</label> 
				<input name="remark" class="promptBox easyui-textbox" id="remark"></input>
			</div>
		</form>
	</div>
	<div id="dlg-buttons">
		<a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="save()" style="width:90px;">确定</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="$('#dlg').dialog('close');" style="width:90px;">取消</a>
	</div>
	
	<div id="dictInfo" class="easyui-dialog" style="width:800px;height:520px;padding:10px 20px" closed="true" buttons="#dlg1-buttons1">
		<form id="dictfm" method="post" >
			<div style="border:1px solid #80afe6;width:100%;min-height:420px;overflow:auto;margin-top: 10px;">
				<table id="detailedInfo" class="easyui-datagrid" data-options="method:'get',border:true,singleSelect:true,fitColumns:true"
					style="height:100%; width:100%;">
					<thead>
						<tr>
							<th field="dictName" width="100px">字典名称</th>
							<th field="preName" width="100px">修改前名称</th>
							<th field="afterName" width="100px">修改后名称</th>
							<th field="changor" width="100px">修改人</th>
							<th field="changeTime" width="100px">修改时间</th>
						</tr>
					</thead>
				</table>
			</div>
		</form>
	</div>
</body>
</html>