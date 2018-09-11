<?xml version="1.0" encoding="UTF-8" ?>
<%
    String path = request.getContextPath();
    HttpSession s = request.getSession();    
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@page import="com.TonFun.Base.controller.sys.BtnController"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
<div class='tf-toolbar'>
	<a href='#' plain='true' class='easyui-linkbutton' icon='icon-refresh' text='刷新' onclick='window.location.reload();'></a>
</div>
	<div class="labelCon" style="border-bottom:1px solid #8DB2E3!important;">
		<label  class="mW">登录名称:</label>
			<input id="username" name="username" class="mL easyui-textbox"/>
		<label  class="mW">开始日期:</label>
			<input id="logstart" name="logstart" class="mL easyui-datebox"  data-options="editable:false"/>
		<label  class="mW">结束日期:</label>
			<input id="logend" name="logend" class="mL easyui-datebox" data-options="editable:false"/>					
		<div class="btnCon" style="left:670px;top:-32px">
			<a href="javascript:void(0)" class="easyui-linkbutton bgColor"
				iconCls="" onclick="Query()" style="margin-right:20px">查询</a> 
			<a href="javascript:void(0)" class="easyui-linkbutton slicksize bgColor"
				data-options="iconCls:''" onclick="clearForm()">清空</a>
		</div>
	</div>
	<table id="dg" class="datagrid" style="width:100%;height:89%;"
		data-options="singleSelect:true,method:'get',rownumbers:true,boder:true">
		<thead>
			<tr>
				<th field="loginName" width="120px">登录名称</th>	
				<th field="creator"  width="150px">用户名称</th>				
		        <!-- <th field="roleName"  sortable="true" width="125px">角色名称</th>  -->
				<th field="hostName"  sortable="true" width="150px">登录机器名称</th>
				<th field="hostIP"  width="150px">登录机器IP</th>								
				<th data-options="align:'center',field:'loginTime'"  sortable="true" width="180px">登录时间</th>									
			</tr>
		</thead>
	</table>
	</div>
	</div>
	<script type="text/javascript">		
	var h = $(window).height() * 0.98 - 82;
	$(function(){	
		$('#dg').datagrid({
			url:'getAllLoginHistory',
			pagination : true,
			onLoadSuccess:function(data){
				
			}
		});
		PageConfig("#dg");
	});
	function Query(){
		var username = $('#username').textbox('getValue');
		var start=$('#logstart').datebox('getValue');
		var end=$('#logend').datebox('getValue');
		var url;
		var date = new Date();
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();	
		var nowd = y + '-' + (m < 10 ? ('0' + m) : m) + '-'
				+ (d < 10 ? ('0' + d) : d);
		if (start == null	|| start.length == 0) {		
			start = "2017-01-01";			
		} 
		if (end == null	|| end.length == 0) {		
			end = "2099-12-31";			
		}
		if (start == null && end == null) {
			url = "getAllLoginHistory?startTime=" + start + "&endTime=" + end + "&userName=" + username;
			WPageModeHeight("dg", url, h);
		} else if (start > end) {
			MessageInfo.Alarm('警告', getEndDateNoThanStartDate());
		} else {
			url = "getAllLoginHistory?startTime=" + start + "&endTime=" + end + "&userName=" + username;
			WPageModeHeight("dg", url, h);
		}	
	}
	function clearForm(){
		$('#username').textbox('setValue',"");
		$('#logstart').datebox('setValue',"");
 		$('#logend').datebox('setValue',"");
	}
	</script>
</body>
</html>