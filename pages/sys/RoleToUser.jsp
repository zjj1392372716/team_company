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
	 		<th data-options="field:'checked',checkbox:true"></th> 
	 		<th field="roleID" width="10%" hidden="true">角色ID</th>
	 		<th field="userID" width="10%" hidden="true">用户ID</th>
	 		<th data-options="field:'userName'" width="24%">用户名称</th>
	 		<th data-options="field:'loginName'" width="24%">登录名称</th>
	 		<th data-options="field:'description'" width="45%">描述</th>
	 	</thead>
	</table>
	  
	<script type="text/javascript">
		var id = <%= request.getParameter("id") %>
		$(function(){ 
			$("#userdg").datagrid({
				url:'findRoleToUser?id='+id,
				selectOnCheck : false,
				checkOnSelect : false,				
				onLoadSuccess : function(data) {
					$("#userdg").parent().find("div .datagrid-header-check").children("input[type=\"checkbox\"]").eq(0).attr("style", "display:none;");
					if (data) {
						$.each(data.rows, function(index, item) {
							if (item.checked) {
								$('#userdg').datagrid('checkRow', index);								
							}
						});
					}					
				} 
			});
		});	 
	</script>
</body>
</html>