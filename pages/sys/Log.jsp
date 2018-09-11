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

<script type="text/javascript" src="<%=path%>/js/easyui/jquery.min.js"></script>
<script type="text/javascript" src="<%=path%>/js/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=path%>/js/datagrid-detailview.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/utils.js"></script>
<script type="text/javascript" src="<%=path%>/js/laydate/laydate.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/tips.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/baseCommon.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/utilsHelp.js"></script>
<script type="text/javascript" src="<%=path%>/js/pages/sys/log.js"></script>

<title>登录日志</title>
<link rel="stylesheet" href="<%=path%>/css/basecommon/loadingstyle.css"/> 
<link rel="stylesheet" href="<%=path%>/css/basecommon/add.css"/> 
</head>
<body>
<div class="easyui-layout" id="pagecontent" style="width: 100%; height: 100%;">
	<div region="center" id="centers" style="width:90%; height: 100%;border:none;">
		<div class='tf-toolbar' id="toolbar"></div>
		<div id="tops" style="border-bottom:1px solid #8DB2E3;">
			<form method="post">
				<div class="labelContents">
					<label class="mW">用户名称:</label> 
					<input id="userName" name="userName" class="easyui-textbox"  />
					<label class="mW">登录名称:</label> 
					<input id="loginName" name="loginName" class="easyui-textbox"  />
					<a href="javascript:void(0)" class="bgColor easyui-linkbutton" 
    					style="padding-left: -;margin-left: 20px;" onclick="Query()">查询</a> 
					<a href="javascript:void(0)" class="bgColor easyui-linkbutton slicksize" onclick="clearForm()">清空</a> 
				</div>
				<!-- <div class="labelContents" >
					
				</div> -->
			</form>
		</div>
		<div class="easyui-layout" style="width: 100%; height: 100%;">
			<div region="center" id="centers" style="width:100%; height: 50%;">
				<table id="dg" class="easyui-datagrid" style="width: 100%;" data-options="singleSelect:true,method:'get',rownumbers:true,boder:true">
					<thead>
						<tr>
							<th field="logID" width="10%" hidden="true">登录ID</th>
							<th field="logTime" width="10%" >登录时间</th>
							<th field="message" width="10%" >消息</th>
							<th field="userID" width="10%" hidden="true">用户ID</th>
							<th field="userName" align="center" width="8%" >用户名称</th>
							<th field="loginName" align="center" width="10%">登录名称</th>
							<th field="operation" align="center" width="5%">操作类型</th>
							<th field="tblName" align="right" width="5%">表名</th>
							<th field="tblComment" align="right" width="5%">表备注</th>
						</tr>
					</thead>
				</table>
			</div>
			<div data-options="region:'south',title:'',collapsible:false"
				id="souths" split="false" style="width: 100%; height: 62.6%;">
				<div id="tt" class="easyui-tabs">					
					<div style="margin-top: 5px" title="操作明细">
						<table id="logContent" class="easyui-datagrid" style="width: 100%;height: 100%;"
							data-options="singleSelect:true,method:'get',rownumbers:true,boder:true">
							<thead>
								<tr>
									<th field="contentID" width="10%" hidden="true">ID</th>
									<th field="logID" width="10%" hidden="true">登录ID</th>
									<th field="fldName" width="10%" >字段名</th>
									<th field="oldValue" width="10%" >原值</th>
									<th field="newValue" width="10%" >新值</th>
									<th field="fldComment" width="10%" >备注</th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</body>
</html>