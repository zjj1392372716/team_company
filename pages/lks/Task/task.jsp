<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


<jsp:include page="/Pages/common/CommomRef.jsp" />
<jsp:include page="/Pages/common/Application.jsp"></jsp:include>
<link rel="stylesheet" href="<%=path%>/css/basecommon/addBase.css" />
<link rel="stylesheet" href="<%=path%>/css/basecommon/loadingstyle.css"/> 
<script type="text/javascript" src="<%=path%>/js/pages/lks/product/task.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/datagrid.js"></script>
<title>生产任务页面</title>
<style type="text/css">
	.datagrid-wrap{border:1px solid #8DB2E3;}
	.labelCon{padding-top:15px;}
	.textbox{
	    float: right;
	    margin-right: 65px;
	}
	
</style>
</head>
<body>
	<div class="easyui-layout" id="pagecontent" style="width: 100%; height: 100%">
		<div region="center" id="centers" style="width:100%; height: 100%;">
			<div class='tf-toolbar' id="toolbar"></div>
			<div id="tops" class="topscon" >
				<form method="post">
					<div class="labelCon">	
						<div>
							<label	class="mlabel">部件编号:</label> 
							<input id="partNumber" name="partNumber" class="promptBox1"/>
							<label class="mlabel">序列号:</label>
							<input id="serialNumber" name="serialNumber" class="promptBox1"/>
							<label class="mlabel">加工件状态:</label>
							<input class="state" name="state" class="promptBox1" />
							<label class="mlabel">PO单号:</label>
							<input id="PONumber" name="PONumber" class="promptBox1"/>
						</div>		
						<div class="btnCon" style="left:55%;top:-60%;">
							<a href="javascript:void(0)" class="easyui-linkbutton bgColor"
								iconCls="" onclick="Query()" style="margin-right:20px">查询</a> 
							<a href="javascript:void(0)" class="easyui-linkbutton slicksize bgColor"
								data-options="iconCls:''" onclick="clearForm()">清空</a>
						</div>
					</div>		
				</form>
			</div>
			<div id="dfdd">
				<table id="dg" class="easyui-datagrid" style="width: 100%; ">
					<thead>
						<tr>
							<th data-options="field:'operate'" width="10%" formatter="operateDetail">操作详情</th>
							<th data-options="field:'partNumber'" width="15%">部件编号</th>
							<th data-options="field:'serialNumber'" width="10%">序列号</th>
							<th data-options="field:'state'" width="5%">状态</th>
							<th data-options="field:'PO'" width="15%">客户订单（PO）</th>
							<th data-options="field:'amount'" width="5%">数量</th>
							<th data-options="field:'expectedSubmit'" width="10%">期望交期</th>
							<th data-options="field:'demandDescription'" width="30%">需求描述</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
</body>
</html>