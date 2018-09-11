<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <link rel="stylesheet" type="text/css" href="../../js/easyui/themes/default/easyui.css" />    
    <link rel="stylesheet" type="text/css" href="../../js/easyui/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="../../js/easyui/demo/demo.css" />
    <script type="text/javascript" src="../../js/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="../../js/easyui/jquery.easyui.min.js"></script>		
	<script type="text/JavaScript" src="../../js/easyui/locale/easyui-lang-zh_CN.js"></script>
<title>为用户设置关联组织机构</title>
</head>
<body>	
	<table id="userdg" style="width:100%;height:100%" >
	 	<thead>	 	
	 		<th field="identityName" width="100px" >身份名称</th>
	 		<th field="orgname" width="450px" >机构名称</th>
	 		<th data-options="field:'username'" width="100px">登录名称</th>
	 		<th data-options="field:'remark'" width="237px">备注</th>
	 	</thead>
	</table>
	  
	<script type="text/javascript">
		var id = <%= request.getParameter("id") %>
		$(function(){ 
			$("#userdg").datagrid({
				url:'findRoleToIdentity?id='+id,
				selectOnCheck : false,
				checkOnSelect : false,				
				onLoadSuccess : function(data) {
				} 
			});
		});	 
	</script>
</body>
</html>