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
<script type="text/javascript" src="<%=path%>/js/common/utils.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/tips.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/baseCommon.js"></script>
<title>为用户设置关联组织机构</title>
</head>
<body>	
	<table id="userByOrg" class="easyui-treegrid" style="width:100%;height:100%" >
	 	<thead>	 	
	 		<th field="orgID" width="10%" hidden="true">部门ID</th>
	 		<th field="userID" width="10%" hidden="true">用户ID</th>
	 		<th data-options="field:'orgName'" width="54%">部门名称</th>
	 		<th data-options="field:'description'" width="45%">描述</th>
	 	</thead>
	</table>
	  
	<script type="text/javascript">
		var id = <%= request.getParameter("id") %>
		$(function(){ 
			$("#userByOrg").treegrid({
				url:'findUserToOrg?id='+id,	
				idField:'orgID',
				striped:true, 		
				treeField:'orgName',
				cascadeCheck:false,
				checkbox:function(row){
					return true;
				},
				loadFilter:function(data,parentId){
					data = utils.copyProperty(data.rows || data,['orgID'],['tempid'],false);
					return utils.toTreeData(data,'tempid','supOrgID','children');
				},
				onCheckNode:function(row,checked){
					if(checked){
						checkType = "checkNode";
					}
					var checks = $('#userByOrg').treegrid('getChildren', row.orgID);
					for(var i = 0 ; i < checks.length ; i++){
						$('#userByOrg').treegrid(checkType, checks[i].orgID);
					}
				},
				onLoadSuccess:function(data) {
					if (data) {
						$.each(data.rows, function(index, item) {
							if (item.checked) {
								//$('#userByOrg').treegrid('checkNode', item.orgID);
							}						 
						});
					}					
				}
			});
		});	 
	</script>
</body>
</html>