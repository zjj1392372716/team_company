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
	<script type="text/javascript" src="<%=path%>/js/common/datagrid.js"></script>
	<title>客户需求单管理页面</title>
	<style type="text/css">
		/* .tf-toolbar{
			border:none;
			border-top:1px solid #8DB2E3;
			border-bottom:1px solid #8DB2E3;
		}  */
		#queryRegion {
			width:100%;
			height:60px;
			border:1px solid red;
		}
		#queryRegion div{
			padding-top:12px;
			display:inline-block;
		}
		#queryRegion span {
			font-size: 16px;
			font-family: serif;
			font-weight: bold;
		}
		#queryRegion input {
			display: block;
			margin:0;
			padding: 0.75em 0.75em;
			color:inherit;
			border:none;
			border-radius: 0.4rem;
			width: 12em;
			font-size: 12px;
			font-weight: bolder;
			color: #000;
		}
		#queryRegion input:focus{
			outline:none;
			box-shadow: 0.2rem 0.8rem 1.6rem #5e35b1;
		}
	</style>

</head>
<body>
	
	<div class="easyui-layout" style="width:100%;">
		<div class='tf-toolbar' id="toolbar"></div>
		<div id="queryRegion">
			<div id="orderNumber">
				<span>客户需求单号:</span>
				<input class="easyui-textbox" />
			</div>
			<div id="serialNumber">
				<span>追踪单号:</span>
				<input class="easyui-textbox" />
			</div>
		</div>
	</div>
</body>
</html>