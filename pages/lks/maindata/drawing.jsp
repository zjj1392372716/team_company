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
<link rel="stylesheet" href="<%=path%>/js/layui/css/layui.css"/> 
<script type="text/javascript" src="<%=path%>/js/easyui/jquery.min.js"></script>
<script type="text/javascript" src="<%=path%>/js/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/utils.js"></script>
<script type="text/javascript" src="<%=path%>/js/layui/layui.all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/tips.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/baseCommon.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/utilsHelp.js"></script>
<script type="text/javascript" src="<%=path%>/js/pages/lks/maindata/drawing.js"></script>
<link rel="stylesheet" href="<%=path%>/css/basecommon/loadingstyle.css"/> 
<link rel="stylesheet" href="<%=path%>/css/basecommon/add.css"/> 
<title>图纸管理</title>
 <style>
.thumb {
	margin-left: 5px;
	margin-top: 15px;
	height: 128px
}

#prevModal {
	width: 100%;
	height: 100%;
	text-align: center;
	display: none;
}

#img_prev {
	max-width: 98%;
	max-height: 98%;
	margin: 10px auto
}

.box {
	display: inline-block
}

.layui-icon {
	font-family: layui-icon !important;
	font-size: 30px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	background-color: #d2d2d2;
	-moz-osx-font-smoothing: grayscale;
}

.contents {
	width: 350px;
	height: 28px;
	margin-top: 30px;
	margin-left: 40px;
}

.details {
	width: 350px;
	height: 28px;
	margin-top: 30px;
	margin-left: 60px;
}
</style>
</head>
<body>
<div class="easyui-layout" id="pagecontent" style="width: 100%; height: 100%;">	
		       <div class='tf-toolbar' id="toolbar">
		       </div>
				<table id="dg" class="easyui-treegrid" style="width:100%;height:95%;"
					rownumbers="true" idField="drawingID" treeField="partNumber">
					<thead>
						<tr>
							<th field="drawingID" width="10%" hidden="true">图纸ID</th>
							<th field="supDrawingID" width="10%" hidden="true">上级ID</th>
							<th  data-options="align:'center',field:'toversion'" width="8%"   formatter="formattertoversion">版本查看</th>
							<th  data-options="align:'center',field:'todetail'" width="8%"   formatter="formattertodetail">详情查看</th>
							<th  data-options="align:'center',field:'drawingattachment'" width="8%"   formatter="formattertopn">图纸</th>
							<th field="partNumber" width="10%" >部件编号</th>
							<th field="version" width="10%" >版本</th>
							<th field="supPartNumber" width="10%"  >上级</th>
							<th field="desc1" align="center" width="20%" >描述1</th>
							<th field="desc2" align="center" width="20%" >描述2</th>
						</tr>
					</thead>
				</table>	
	</div>
<div id="dlg" class="easyui-dialog" style="width:480px; height: 500px;" closed="true" modal="true" buttons="#dlg-buttons-Cus">
		<form id='fm'>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top: 8px;">*</p>
					<p class=" contents_letter ">上级部件：</p></label> <input name="supOrgId"
					id='supOrg' style="width: 198px;" class="easyui-combotree" />
			</div>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top: 8px;">*</p>
					<p class=" contents_letter ">版本编号：</p></label> <input id="partNumber"
					name="partNumber" style="width: 198px;"class="easyui-textbox" />
			</div>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top: 8px;">*</p>
					<p class=" contents_letter ">版本：</p></label> <input id="version"
					name="version"style="width: 198px;" class="easyui-textbox" />
			</div>
			<div class="contents">
				<label><p class="symbol floatLeft" style="margin-top: 8px;">*</p>
					<p class=" contents_letter ">描述1：</p></label>
				<textarea id="desc1" name="desc1" class="easyui-textbox"
					data-options="multiline:true" style="width: 198px;height: 73px;"></textarea>
			</div>
			<div class="contents" style="margin-top: 73px;">
				<label><p class="symbol floatLeft" style="margin-top: 8px;">*</p>
					<p class=" contents_letter ">描述2：</p></label>
				<textarea id="desc2" name="desc2" class="easyui-textbox"
					data-options="multiline:true" style="width: 198px;height: 73px;"></textarea>
			</div>
		</form>
	</div>
<div id="dlg-buttons-Cus">
	<button id="save" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="save()" style="width: 90px">确定</button>
	<button  class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close');$('#dg').datagrid('reload');" style="width: 90px;">取消</button>
</div>


<div id="dlgdetail" class="easyui-dialog" style="width:600px; height: 600px;display:none;overflow-y:scroll;" closed="true" modal="true" >
	<form id='fmdetail'> 
		<div class="details">
				<label><p class="symbol floatLeft" style="margin-top:8px;">*</p><p class=" contents_letter " >上级部件：</p></label> 
				<input name="supOrgs" id='supOrgs' class="easyui-combotree" style="width: 198px;" readonly="readonly"/></td>
	</div>
		<div class="details">
				<label><p class="symbol floatLeft" style="margin-top:8px;">*</p><p class=" contents_letter " >版本编号：</p></label> 
				<input id="partNumber" name="partNumber" class="easyui-textbox"  style="width: 198px;"  readonly="readonly"/>
	</div>
		<div class="details">
				<label><p class="symbol floatLeft" style="margin-top:8px;">*</p><p class=" contents_letter " >版本：</p></label> 
				<input id="version" name="version" class="easyui-textbox"  style="width: 198px;"  readonly="readonly"/>
	</div>
		<div class="details">
				<label><p class="symbol floatLeft" style="margin-top:8px;">*</p><p class=" contents_letter " >描述1：</p></label> 
				<textarea id="desc1" name="desc1" class="easyui-textbox"
							data-options="multiline:true"  style="width: 198px;height:50px"  readonly="readonly"></textarea>
	</div>
			<div class="details" style="margin-top: 40px;">
				<label><p class="symbol floatLeft" style="margin-top: 8px;">*</p>
					<p class=" contents_letter ">描述2：</p></label>
				<textarea id="desc2" name="desc2" class="easyui-textbox"
					data-options="multiline:true" style="width: 198px; height: 50px"
					 readonly="readonly"></textarea>
			</div>
		</form>
		<div class="details">
			<label><p class=" contents_letter ">部件图纸：</p></label>
		</div>
		<div id="listimg" style="margin-top: 20px;margin-left: 60px;border: 3px solid #ECF3FF;"></div>
	</div>


<div id="seeversion" class="easyui-dialog" style="width:600px;height:520px;padding:10px 20px" closed="true" >
		<form id="linkmanfm" method="post" >
			<div style="border:1px solid #80afe6;width:100%;min-height:300px;overflow:auto;margin-top: 10px;">
				<table id="checkversion" class="easyui-datagrid" data-options="rownumbers:true,method:'get',singleSelect:true,fitColumns:true"
					style="height:100%; width:100%;">
					<thead>
						<tr>
							<th data-options="field:'drawingID'" hidden="true">图纸ID</th>
							<th data-options="field:'supDrawingID'"hidden="true">上级ID</th>
							<th data-options="field:'todetail'"  formatter="formattertodetailtwo">详情查看</th>
							<th data-options="field:'drawingattachment'" formatter="formattertopn">图纸</th>
							<th data-options="field:'partNumber'" width="100px">部件编号</th>
							<th data-options="field:'version'" width="100px">版本</th>
							<th data-options="field:'supPartNumber'" width="100px">上级部件</th>
							<th data-options="field:'desc1'" width="100px">描述1</th>
							<th data-options="field:'desc2'" width="100px">描述2</th>
						</tr>
					</thead>
				</table>
			</div>
		</form>
	</div>
</body>
</html>