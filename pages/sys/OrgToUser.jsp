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
    <script type="text/javascript" src="<%=path%>/js/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="<%=path%>/js/easyui/jquery.easyui.min.js"></script>		
	<script type="text/JavaScript" src="<%=path %>/js/easyui/locale/easyui-lang-zh_CN.js"></script>
<title>为组织机构设置关联用户</title>
</head>
<body>	
	<table id="orgdg" style="width:100%;height:100%" >
	 	<thead>	 	
	 		<th data-options="field:'checked',checkbox:true"></th> 
	 		<th field="orgId" width="10%" hidden="true">组织结构ID</th>
	 		<th field="userId" width="10%" hidden="true">用户ID</th>
	 		<th data-options="field:'userName'" width="24%">用户名称</th>
	 		<th data-options="field:'loginName'" width="24%">登录名称</th>
	 		<th data-options="field:'description'" width="45%">描述</th>
	 	</thead>
	</table>
	 
	  
	<script type="text/javascript">
		var id = <%= request.getParameter("id") %>
		$(function(){ 
			$("#orgdg").datagrid({
				url:'findOrgToUser?id='+id,
				selectOnCheck : false,
				checkOnSelect : false,				
				onLoadSuccess : function(data) {
					$("#orgdg").parent().find("div .datagrid-header-check").children("input[type=\"checkbox\"]").eq(0).attr("style", "display:none;");
					if (data) {
						$.each(data.rows, function(index, item) {
							if (item.checked) {
								$('#orgdg').datagrid('checkRow', index);								
							}
						 $("input[type='checkbox']")[index + 1].disabled = true;
						});
					}					
				} 
			});
		});	 
	</script>
</body>
</html>