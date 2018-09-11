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
<script type="text/javascript" src="<%=path%>/js/common/utils.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/tips.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/baseCommon.js"></script>
<script type="text/javascript" src="<%=path%>/js/pages/sys/user.js"></script>
<title>用户管理页面</title>
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
<link rel="stylesheet" href="<%=path%>/css/basecommon/addBase.css" />
<link rel="stylesheet" href="<%=path%>/css/basecommon/loadingstyle.css"/> 
<link rel="stylesheet" href="<%=path%>/css/sys/roleorg.css"/>
</head>
<body>
	<div class="easyui-layout" id="pagecontent" style="width: 100%; height: 100%;">
		<div region="center" id="centers" style="width:100%; height: 100%;">
			<div class='tf-toolbar' id="toolbar"></div>
			<div id="tops" class="topscon" >
				<form method="post">
					<div class="labelCon">			
						<label	class="mlabel">用户名称:</label> 
						<input id="searchUserName" name="searchUserName" class="promptBox1"/>
						<div class="btnCon" style="left:280px;top:-33px;">
							<a href="javascript:void(0)" class="easyui-linkbutton bgColor"
								iconCls="" onclick="Query()" style="margin-right:20px">查询</a> 
							<a href="javascript:void(0)" class="easyui-linkbutton slicksize bgColor"
								data-options="iconCls:''" onclick="clearForm()">清空</a>
						</div>
					</div>		
				</form>
			</div>
			<table id="dg" class="easyui-datagrid" style="width: 100%;" data-options="singleSelect:true,method:'get',rownumbers:true,boder:true">
				<thead data-options="frozen:true">
					<th data-options="field:'userName'" width="120px" sortable="true">用户名称</th>
				</thead>
				<thead>
					<th field="userID" width="5%" hidden="true">用户ID</th>
					<th data-options="field:'loginName'" width="120px" sortable="true">登录名称</th>
					<th data-options="field:'userEmail'" width="160px" sortable="true">用户Email</th>
					<th data-options="field:'phoneNumber'" width="120px" sortable="true">联系方式</th>
					<th data-options="align:'center',field:'enabledState'" width="100px" formatter="IsEnable" sortable="true">启用状态</th>
					<th data-options="align:'right',field:'loginCount'" width="100px" sortable="true">登录次数</th>
					<th data-options="align:'center',field:'loginFailedLastTime'" width="160px" sortable="true">最后一次登录时间</th>
					<th data-options="align:'center',field:'roleUser'" formatter="formatterUser" width="100px">操作</th>
					<th data-options="field:'description'" width="400px">描述</th>
					<th data-options="field:'creator'" width="100px" sortable="true">创建者</th>
					<th data-options="align:'center',field:'createTime'"  width="175px" sortable="true">创建时间</th>
					<th data-options="field:'updator'" width="100px" sortable="true">更新者</th>
					<th data-options="align:'center',field:'updateTime'" width="175px" sortable="true">更新时间</th>	
				</thead>
			</table>
		</div>
	</div>
	<div id="dlg" class="easyui-dialog" style="width: 420px; height: 350px;" closed="true" buttons="#dlg-buttons">		
		<form id="fm" method="post"  style="padding: 25px 40px">
			<div class="contents" >
				<label><p class="symbol floatLeft" style="margin-top:6px;">*</p><p class="contents_letter " >用户类别：</p></label> 
				<select class="promptBox easyui-combobox" id="userType" name="userType" style="width:174px;height:29px">
					<option value="0">手动输入</option>
					<option value="1">ladp</option>
				</select>
			</div>
			<div class="contents" >
				<label><p class="symbol floatLeft" style="margin-top:6px;">*</p><p class="contents_letter " >登录名称：</p></label> 
				<input id="loginName" name="loginName" class="promptBox" maxlength="50" />
			</div>
			<div class="contents" >
				<label><p class="symbol floatLeft" style="margin-top:6px;">*</p><p class="contents_letter " >用户名称：</p></label> 
				<input id="userName"  name="userName"	class="promptBox easyui-textbox" maxlength="50" style="width:174px;height:29px"/>
			</div>
			<div class="contents" >
				<label><p class="symbol floatLeft" style="margin-top:6px;">*</p><p class="contents_letter " >用户email：</p></label> 
				<input id="userEmail"  name="userEmail"	class="promptBox easyui-textbox" maxlength="50" style="width:174px;height:29px"/>
			</div>
			<div>
				<input id="cucompanynumber"  name="cucompanynumber"	class="promptBox" hidden="true"/>
			</div>
			<div class="contents" >
				<label><p class="symbol floatLeft" style="margin-top:6px;">*</p><p class="contents_letter " >联系方式：</p></label> 
				<input id="phoneNumber"  name="phoneNumber"	class="promptBox" maxlength="50" />
			</div>
			<div class="contents" >
				<label><p class="symbol floatLeft"> </p><p class="contents_letter " >描<span class="blank"></span>述：</p></label>  
				<input name="description" id="description" maxlength="200" class="promptBox" />
			</div>
			<!-- <div class="contents" >
				<label><p class="symbol floatLeft"> </p><p class="contents_letter " >描<span class="blank"></span>述：</p></label>  
				<input name="supmenuid" class="easyui-combotree" data-options="url:'../../org/findAllOrgByShow',method:'get'" />
			</div> -->
		</form>
	</div>
	<div id="dlg-buttons">
		<button id="save" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="save()" style="width: 90px">确定</button>
		<button  class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close');$('#dg').datagrid('reload');" style="width: 90px;">取消</button>
	</div>
	<div id="addIdentity" class="easyui-dialog" style="width: 1280px; height: 500px;" maximizable="true" closed="true"
		modal="true" buttons="#dlg-addButtons">
		<div id="memberbtn" style="z-index: 9999" class="easyui-panel iframe-toparea">
			<a href="javascript:void(0)" class="easyui-linkbutton"
				data-options="iconCls:'icon-add',plain:true" onclick="append()">新增</a>
			<a href="javascript:void(0)" class="easyui-linkbutton"
				data-options="iconCls:'icon-remove',plain:true" onclick="removeit()">删除</a>
		</div>
		<form id="add" method="post" style="padding: 25px 40px; width: 95%; height: 90%;">
			<table id="aidentity" class="easyui-datagrid" style="width: 100%; height: 95%;"
				data-options="iconCls: 'icon-edit',singleSelect: true,method:'get',onClickRow:onClickAddIdentity">
				<thead>
					<tr>
						<!-- <th field="checked" checkbox="true"></th> -->
						<th field="productid" width="5%" hidden="true">产品ID</th>
						<th	data-options="field:'identity',width:120,align:'right',editor:'textbox'">身份</th>
						<th	data-options="field:'orgid',width:300,
							formatter:function(value,row){
								return row.orgName;
							},
							editor:{
								type:'combotree',
								options:{
									valueField:'orgid',
									textField:'orgName',
									method:'get',
									url:'../../org/findAllOrgByShow',
									required:true,
									prompt:'请选择'
								}
							}">组织机构</th>
						<th	data-options="field:'roleid',width:200,
							formatter:function(value,row){
								return row.roleName;
							},
							editor:{
								type:'combotree',
								options:{
									valueField:'roleid',
									textField:'roleName',
									method:'get',
									url:'../../role/findAllRole',
									required:true,
									prompt:'请选择'
								}
							}">角色</th>
							<th	data-options="field:'roleTypeid',width:120,
							formatter:function(value,row){
								return row.roletypeName;
							},
							editor:{
								type:'combobox',
								options:{
									valueField:'roletypeId',
									textField:'roletypeName',
									method:'get',
									url:'../../js/pages/sys/roletypes.json',
									required:true,
									prompt:'请选择'								
								}
							}">角色类型</th>						
						<th	data-options="field:'remark',width:120,align:'right',editor:'textbox'">备注</th>
					</tr>
				</thead>
			</table>
		</form>
	</div>
	<div id="dlg-addButtons">
		<div id="tb" style="height: auto">
			<a class="easyui-linkbutton c6" iconCls="icon-ok"
				onclick="savaIdentity()" style="width: 90px" id="print">确定</a>
			<a class="easyui-linkbutton c6" iconCls="icon-cancel"
				onclick="javascript:$('#addIdentity').dialog('close');$('#dg').datagrid('reload');"
				style="width: 90px;" style="width: 90px" id="print">取消</a>
		</div>
	</div>
	<div id="userLdap" class="easyui-dialog" style="width: 740px; height: 500px;" maximizable="true" closed="true"
		modal="true" buttons="#dlg-ldapButtons">
		<table id="ldapTable" class="easyui-datagrid" style="width: 100%; height: 95%;"
			data-options="iconCls: 'icon-edit',singleSelect: true,method:'get'">
			<thead>
				<tr>
					<th data-options="field:'givenname',width:120,align:'right'">指定名称</th>
					<th data-options="field:'employeenumber',width:120,align:'right'">员工编号</th>
					<th data-options="field:'mail',width:200,align:'right'">邮箱</th>
					<!-- <th data-options="field:'title',width:120,align:'right'">职位</th> -->
					<th data-options="field:'mobile',width:120,align:'right'">手机</th>
					<th data-options="field:'cucompanynumber',width:120,align:'right'">公司编号</th>
				</tr>	
			</thead>
		</table>
	</div>
	<div id="dlg-ldapButtons">
		<div id="tb" style="height: auto">
			<a class="easyui-linkbutton c6" iconCls="icon-ok"
				onclick="addUserLdap()" style="width: 90px" id="print">确定</a>
			<a class="easyui-linkbutton c6" iconCls="icon-cancel"
				onclick="javascript:$('#userLdap').dialog('close');$('#dg').datagrid('reload');"
				style="width: 90px;" style="width: 90px" id="print">取消</a>
		</div>
	</div>
</body>
</html>