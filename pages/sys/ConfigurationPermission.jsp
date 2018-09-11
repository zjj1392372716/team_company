<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>基本权限管理</title>
<jsp:include page="/Pages/common/CommomRef.jsp" />
<%-- <link rel="stylesheet" href="<%=path%>/css/basecommon/addBase.css" />
<link rel="stylesheet" href="<%=path%>/css/sys/syscommon.css" />
<link rel="stylesheet" href="<%=path%>/css/basecommon/loadingstyle.css" /> --%>
<script type="text/javascript" src="<%=path%>/js/easyui/jquery.min.js"></script>
<script type="text/javascript"	src="<%=path%>/js/easyui/jquery.easyui.min.js"></script>
<script type="text/JavaScript"	src="<%=path%>/js/easyui/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/messageshow.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/tips.js"></script>
<script type="text/javascript"	src="<%=path%>/js/common/baseCommon.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/utils.js"></script>
<script type="text/javascript"	src="<%=path%>/js/pages/permission/ConfigurationPermission.js"></script>
<script type="text/javascript"	src="<%=path%>/js/pages/permission/permission.js"></script>
<script type="text/javascript"	src="<%=path%>/js/layer/layer.js"></script>
<style>
.tabs-header {
	border-top: 1px solid #8DB2E3 !important;
}

.icon-management {
	background: url(../../../css/icon/rolepic.png) no-repeat !important;
	margin-top: 2px;
}
</style>
</head>
<body>
	<div class="easyui-layout" id="pagecontent"
		style="width: 100%; height: 100%; overflow: auto">
		<div region="west" split="true" id="roleDiv" title="角色"
			style="width: 10%; overflow: auto; height: 100%;">
			<ul id="roleList" class="easyui-tree"
				data-options="url:'role/findAllRoleByPerssion'"></ul>
		</div>

		<div region="center" style="width: 90%;" id="centers">
			<div id='tt' class="easyui-tabs" style="height: 100%; width: 100%;">
				<div title="菜单权限" style="border: none; height: 100%; width: 100%">
					<%-- <%= (new ShowButtonAction()).RenderToolbar(request.getServletPath())%> --%>
					<a href='#' plain='true' class='easyui-linkbutton' icon='icon-refresh' text='刷新' onclick='window.location.reload();'> </a>&nbsp;
                    <a href='#'  id="save"  plain='true' class='easyui-linkbutton' icon='icon-save' text='保存'   id='20'   onclick='save()'> </a>&nbsp;
					<table id="dt" style="width: 100%; overflow-x: scroll;"	class="easyui-treegrid"
						data-options="url:'menu/GetMenuForOrgJson',autoRowHeight:true,fitColumns:false,animate:true,method:'get',
						idField:'menu_id',treeField:'menu_name',rownumbers:true,height:$(window).height()-66,singleSelect:true">
					</table>
				</div>		
				<!-- <div title="列权限" style="border:none;height:100%;width:100%">						
					<div class='tf-toolbar'> 
						<a href='#' plain='true' class='easyui-linkbutton' icon='icon-refresh' text='刷新' onclick='window.location.reload();'></a>
						<a href='#' id="mod" plain='true' class='easyui-linkbutton' icon='icon-edit' text='编辑' onclick='modifycolum();'></a>
					</div>
					<table id="permis" class="easyui-treegrid" style="width:100%;height:100%;" rownumbers="true" idField="menu_id" treeField="menu_name">
						<thead>
							<tr>
								<th field="updator" width="100" hidden="true">mapID</th>
								<th field="menuID" width="100" hidden="true">menuID</th>
								<th field="roleId" width="100" hidden="true">roleId</th>
								<th field="menu_id" width="5%" hidden="true">菜单ID</th>
								<th field="roleName" width="100" hidden="true">角色名称</th>
								<th field="menu_name" width="12%">菜单名称</th>
								<th field="description" width="35%">字段名称</th>
							</tr>
						</thead>
					</table>	
				</div> -->
			</div>
		</div>
	</div>
	<!-- 修改列权限 -->
	<div id="dlg" class="easyui-dialog"
		style="width: 420px; height: 200px;" closed="true"
		buttons="#dlg-buttons">
		<form id="fm" method="post"
			style="width: 406px; height: 235px; padding: 25px 40px">
			<!-- <div class="contents" >
				<label><p class="symbol floatLeft" style="margin-top:6px;">*</p><p class="contents_letter " >角色名称：</p></label> 
				<div class="sele_inputbox">
					<input id="roleName" name="roleName" class="easyui-combotree promptBox"
					data-options="valueField:'id',textField:'text',url:'getAllRoleJson',method:'get'" />
				</div>
			</div> -->
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top: 6px;"></p>
					<p class="contents_letter ">菜单名称：</p></label>
				<div class="sele_inputbox">
					<input id="menu_name" name="menu_name"
						class="easyui-textbox promptBox"
						data-options="valueField:'id',textField:'text',url:'getCascadeMenu',method:'get'" />
				</div>
			</div>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top: 6px;"></p>
					<p class="contents_letter ">字段名称：</p></label>
				<div class="sele_inputbox">
					<input id="description" name="description"
						class="promptBox easyui-textbox" maxlength="50" />
				</div>
			</div>
			<!-- <div class="contents" >
				<label><p class="symbol floatLeft" style="margin-top:6px;">*</p><p class="contents_letter " >是否可见：</p></label> 
				<div class="sele_inputbox" style="margin-left: 114px;">
					<input id="rejected"  name="rejected" type="checkbox"/>
				</div>
			</div> -->
		</form>
	</div>
	<div id="dlg-buttons">
		<button id="save" class="easyui-linkbutton c6" iconCls="icon-ok"
			onclick="savecolum()" style="width: 90px">确定</button>
		<button class="easyui-linkbutton" iconCls="icon-cancel"
			onclick="javascript:$('#dlg').dialog('close');$('#dg').datagrid('reload');"
			style="width: 90px;">取消</button>
	</div>

	<!-- 新增pad END -->

	<!--  	<!-- 修改pad start -->
	<div id="modifyDlg" class="easyui-dialog"
		style="width: 400px; height: 250px; padding: 10px 10px" closed="true"
		buttons="#dlg-buttons1">

		<form id="fm1" method="post" novalidate>
			<input id="modifyMapId" style="display: none;" name="modifyMapId">
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top: 6px;">*</p>
					<p class="contents_letter ">菜单名称：</p></label>
				<div class="sele_inputbox" style="margin-top: -46px;">
					<input name="menuId"
						class="sele_inputbox easyui-combotree 
					sele_box_input promptBox borderLine"
						id="modifyMenuName"
						data-options="url:'menu/findAllMenu',method:'get',valueField:'id',textField:'text'" />
				</div>
			</div>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top: 6px;">*</p>
					<p class="contents_letter ">是否显示：</p></label>
				<div class="sele_inputbox" style="margin-top: -46px;">
					<input name="rejected"
						class="sele_inputbox easyui-combotree 
					sele_box_input promptBox borderLine"
						id="modifyRejected"
						data-options="url:'#',method:'get',valueField:'id',textField:'text'" />
				</div>
			</div>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top: 6px;">*</p>
					<p class="contents_letter  third">字段名：</p></label> <input name="fieldName"
					class="promptBox" required="true" id="modifyFieldName" />
			</div>
		</form>
	</div>
	<div id="dlg-buttons1">
		<button class="easyui-linkbutton c6" iconCls="icon-ok"
			onclick="modifyMap()" style="width: 90px" id="modifySave">确定</button>
		<button class="easyui-linkbutton" iconCls="icon-cancel"
			onclick="javascript:$('#modifyDlg').dialog('close')"
			style="width: 90px;">取消</button>
	</div>
	<!--修改pad END -->
</body>
</html>