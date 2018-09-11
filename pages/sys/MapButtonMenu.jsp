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
<title>为按钮关联菜单信息</title>
</head>
<body>	
	<table id="menuDg" style="width:100%;height:100%" >
	 	<thead>	 	
	 		<!-- <th data-options="field:'checked',checkbox:true"></th> --> 
	 		<th field="menuId" width="10%" hidden="true">菜单ID</th>	 		
	 		<th data-options="field:'menuName'" width="24%">菜单名称</th>	 		
	 		<th data-options="field:'description'" width="45%">描述</th>
	 	</thead>
	</table>
	 
	  
	<script type="text/javascript">
		var id = <%= request.getParameter("id") %>
		$(function(){ 
			$("#menuDg").treegrid({
				url:'findMenusByBtnId?btnId='+id,			
				idField:'menuId',
				striped:true, 		
				treeField:'menuName',
				loadFilter:function(data,parentId){
					data = utils.copyProperty(data.rows || data,['menuId'],['tempid'],false);
					return utils.toTreeData(data,'tempid','supMenuId','children');
				},
				onLoadSuccess : function(data) {					
					if (data) {
						$.each(data.rows, function(index, item) {
							if (item.checked) {
								$('#menuDg').datagrid('checkRow', index);								
							}						 
						});
					}					
				},
				checkbox:function(row){
					if(row.supMenuId==null){
						return false;
					}else{
						return true;
					}										
				}
			});
		});	 
	</script>
</body>
</html>