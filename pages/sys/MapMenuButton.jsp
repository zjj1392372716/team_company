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
   <link rel="stylesheet" type="text/css" href="<%=path%>/js/easyui/themes/default/easyui.css" />    
    <link rel="stylesheet" type="text/css" href="<%=path %>/js/easyui/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="<%=path %>/js/easyui/demo/demo.css" />
    <script type="text/javascript" src="<%=path%>/js/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="<%=path%>/js/easyui/jquery.easyui.min.js"></script>		
	<script type="text/JavaScript" src="<%=path %>/js/easyui/locale/easyui-lang-zh_CN.js"></script>
<title>为组织机构设置关联用户</title>
</head>
<body>	
	<table id="orgdg" style="width:100%;height:100%" >
	 	<thead>	 	
	 		<th data-options="field:'checked',checkbox:true"></th> 
	 		<th field="btnId" width="10%" hidden="true">按钮ID</th>	 		
	 		<th data-options="field:'btnName'" width="24%">按钮名称</th>	 		
	 		<th data-options="field:'description'" width="45%">描述</th>
	 	</thead>
	</table>
	 
	  
	<script type="text/javascript">
		var id = <%= request.getParameter("id") %>
		$(function(){ 
			$("#orgdg").datagrid({
				url:'findBtnsByMenuId?menuId='+id,
				selectOnCheck : false,
				checkOnSelect : false,				
				onLoadSuccess : function(data) {
					//$("#orgdg").parent().find("div .datagrid-header-check").children("input[type=\"checkbox\"]").eq(0).attr("style", "display:none;");
					if (data) {
						$.each(data.rows, function(index, item) {
							if (item.checked) {
								$('#orgdg').datagrid('checkRow', index);								
							}
						 //$("input[type='checkbox']")[index + 1].disabled = true;
						});
					}					
				} 
			});
		});	 
	</script>
</body>
</html>