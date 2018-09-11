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
<script type="text/javascript" src="<%=path%>/js/pages/people/oppositeParty.js"></script>
<title>相对方综合检索</title>
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
	   		<table id="dg" class="easyui-datagrid" style="width: 100%;" data-options="rownumbers:true,singleSelect:true,method:'get',border:true">
				<thead>
					<tr>
						<th field="touse" align="center" width="100px" formatter="format">操作</th>
						<th field="id" width="5%"  hidden="true">客户名称ID</th> 
						<th field="name" width="250px">客户单位名称</th>
						<th field="supId" width="5%"  hidden="true">上级客户名称ID</th>
						<th field="supName" width="150px">上级客户单位名称</th>
						<th field="legalPerson" width="130px">法人代表</th>
						<th field="enterpriseType" width="100px">企业类型</th>
						<th field="remark" width="250px">描述</th>

						<th field="detailAddress" width="250px" hidden="true">详细地址</th>
						<th field="phoneNumber" width="250px" hidden="true">联系方式</th>
						<th field="taxRegistration" width="250px" hidden="true">服务登记号</th>
						<th field="bankName" width="250px" hidden="true">开户银行</th>
						<th field="bankNumber" width="250px" hidden="true">开户账号</th>
					</tr>
				</thead>
			</table>	
		</div>
	</div>
	
	<div id="dlg" class="easyui-dialog" style="width:800px;height:520px;padding:10px 20px" closed="true" buttons="#dlg1-buttons1">
		<form id="fm" method="post" >
			<div class="dataGet">
				<div class="dataGet_contents">
					<label>
						<p class="symbol floatLeft">*</p>
						<p class="contents_letter ">单位名称：</p>
					</label>
					<input id="customerName" name="customerName" class="easyui-textbox" style="margin-top: 5px;" readonly="readonly"/>
				</div>
				<div class="dataGet_contents">
					<label>
						<p class="symbol floatLeft"></p>
						<p class="contents_letter ">上级名称：</p>
					</label>
					<input id="supCustomerName" name="supCustomerName" class="easyui-combotree" style="margin-top: 5px" readonly="readonly"/>
				</div>
			</div>
			
			<div class="dataGet">
				<div class="dataGet_contents">
					<label>
						<p class="symbol floatLeft">*</p>
						<p class="contents_letter ">企业类型：</p>
					</label>
					<input id="enterpriseType" name="enterpriseType" class="easyui-textbox" style="margin-top: 5px;"  style="width:210px" readonly="readonly"/>
				</div>
				<div class="dataGet_contents">
					<label>
						<p class="symbol floatLeft">*</p>
						<p class="contents_letter ">法人代表：</p>
					</label>
					<input id="legalPerson" name="legalPerson" class="easyui-textbox" style="margin-top: 5px" readonly="readonly"/>
				</div>
			</div>
			
			<div class="dataGet">
				<div class="dataGet_contents">
					<label>
						<p class="symbol floatLeft">*</p>
						<p class="contents_letter ">详细地址：</p>
					</label>
					<input id="detailAddress" name="detailAddress" class="easyui-textbox" style="margin-top: 5px;"  style="width:210px" readonly="readonly"/>
				</div>
				<div class="dataGet_contents">
					<label>
						<p class="symbol floatLeft">*</p>
						<p class="contents_letter ">联系方式：</p>
					</label>
					<input id="phoneNumber" name="phoneNumber" class="easyui-textbox" style="margin-top: 5px" readonly="readonly"/>
				</div>
			</div>
			
			<div class="dataGet">
				<div class="dataGet_contents">
					<label>
						<p class="symbol floatLeft">*</p>
						<p class="contents_letter ">服务登记号：</p>
					</label>
					<input id="taxRegistration" name="taxRegistration" class="easyui-textbox" style="margin-top: 5px;"  style="width:210px" readonly="readonly"/>
				</div>
				<div class="dataGet_contents">
					<label>
						<p class="symbol floatLeft">*</p>
						<p class="contents_letter ">开户银行：</p>
					</label>
					<input id="bankName" name="bankName" class="easyui-textbox" style="margin-top: 5px" readonly="readonly"/>
				</div>
			</div>
			
			<div class="dataGet">
				<div class="dataGet_contents">
					<label>
						<p class="symbol floatLeft">*</p>
						<p class="contents_letter ">开户账号：</p>
					</label>
					<input id="bankNumber" name="bankNumber" class="easyui-textbox" style="margin-top: 5px;"  style="width:210px" readonly="readonly"/>
				</div>
				<div class="dataGet_contents">
					<label>
						<p class="symbol floatLeft"></p>
						<p class="contents_letter ">备注：</p>
					</label>
					<input id="remark" name="remark" class="easyui-textbox" style="margin-top: 5px" readonly="readonly"/>
				</div>
			</div>
		</form>
	</div>
	<div id="dlg1-buttons1">
		<a class="easyui-linkbutton c6" iconCls="icon-ok" onclick="savaLinkman()" style="width: 90px" id="print">确定</a>
		<a class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#linkman').dialog('close');$('#dg').datagrid('reload');" style="width: 90px;">取消</a>
	</div>
</body>
</html>