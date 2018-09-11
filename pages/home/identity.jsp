<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.TonFun.Base.util.Tools"%>
<%
	String path = request.getContextPath();
	HttpSession s = request.getSession();    
	String clientIp = Tools.getLocalIp(request);
	String hostName = Tools.getHostName(request);
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%-- <%@ taglib prefix="s" uri="/struts-tags"%> --%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>中国中化集团有限公司-HSE应急数据系统</title>
<link rel="stylesheet" type="text/css"
	href="<%=path%>/css/login/bootstrap.css" />
<link rel="stylesheet" type="text/css"
	href="<%=path%>/css/login/identity.css" />
	<link rel="stylesheet" type="text/css" href="<%=path%>/js/easyui/themes/default/easyui.css" />    
    <link rel="stylesheet" type="text/css" href="<%=path %>/js/easyui/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="<%=path %>/js/easyui/demo/demo.css" />    
    <link href="<%=path %>/css/icon.css" rel="stylesheet" type="text/css" />	
    <link rel="stylesheet" href="<%=path%>/css/home/index2.css"/>	
</head>
<body style="overflow: -Scroll; overflow-x: hidden; overflow-y: hidden">	
		<div class="content">
			<div class="container">
				<div class="row">					 
				</div>
			</div>
			<div class="ul-wrap">
				 <ul class="identityName-list">
				  
				 </ul>
				
		  </div>
		</div>
		<DIV id="divModifyPwd" class="easyui-dialog" title="修改密码" modal="true" closed="true"
				 style="display:none;width:300px;height:230px;padding:10px 10px;" buttons="#dlg-buttons">		
				<FORM method="post" id="modifyPwdForm">			
					<DIV class="fitem">
						<LABEL><p class="symbols floatLeft">*</p>登录名称：</LABEL>
						<INPUT name="loginName" class="easyui-textbox" disabled value='<%=s.getAttribute("loginName")%>' />
						<INPUT type="hidden"   name="loginName"  value = '<%=s.getAttribute("loginName")%>'/>
					</DIV>
					<DIV class="fitem">
						<LABEL><p class="symbols floatLeft">*</p>原&nbsp;密&nbsp;码&nbsp;：</LABEL>
						<INPUT name="oldPwd" class="easyui-textbox" id="oldPwd"/>
					</DIV>
					<DIV class="fitem">
						<LABEL><p class="symbols floatLeft">*</p>新&nbsp;密&nbsp;码&nbsp;：</LABEL>
						<INPUT name="newPwd" id="newPwd" class="easyui-passwordbox" data-options="prompt:'请输入新的密码'"/>
					</DIV>
					<DIV class="fitem">
						<LABEL><p class="symbols floatLeft">*</p>确认密码：</LABEL>
						<INPUT name="newComfirmPwd" class="easyui-passwordbox" id="newComfirmPwd" data-options="prompt:'再次输入新密码'" />
					</DIV>
					<DIV class="clear"></DIV>
				</FORM>
			</DIV>
			<div id="dlg-buttons"  style="display:none;">
				<a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="changePwd()" style="width:90px">确定</a>
				<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#divModifyPwd').dialog('close')" style="width:90px;">取消</a>
			</div>			
		<script type="text/javascript" src="<%=path%>/js/jquery-3.2.1.min.js"></script>
  		<script type="text/javascript" src="<%=path%>/js/easyui/jquery.min.js"></script>
		<script type="text/javascript" src="<%=path%>/js/easyui/jquery.easyui.min.js"></script>		
		<script type="text/JavaScript" src="<%=path %>/js/easyui/locale/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript"	src="<%=path%>/js/jquery.cookie.js">	</script>	
		<script type="text/javascript"	src="<%=path%>/js/pages/login/identity.js">	</script>		
</body>
</html>