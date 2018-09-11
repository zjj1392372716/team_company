		//表格高度适应页面高度函数调用
		reSize(66,"dt");
		
		function formattertouser(value, row) {
			if(value == 1){
				return "否";
			}else{
				return "是";
			}
		}
		function save1(elmid){	
			var node = $('#roleList').tree('getSelected');
			var roleName = node.id;
			if(roleName == null || roleName == "" ){
				MessageInfo.Alarm('警告',getSelectRoles());
				return;
			}
			var menuName = $('#menuName').combobox('getValue');
			var rejected = $('#rejected').combobox('getValue');
			var fieldName = document.getElementById("fieldName").value;
			var node = $('#roleList').tree('getSelected');
			var roleName = node.id;
			$('#addSave').attr('disabled',"true");
			$.ajax({
		 		type:"post",
		 		url:"column_addMap",
		 		data:{"menuName":menuName,"rejected":rejected,"fieldName":fieldName,"roleName":roleName},
		 		 success:function(data){
		 			$('#addSave').removeAttr("disabled");
		 			if(data == "success"){
		 				//MessageInfo.Info('提示','设置权限成功');
		 				$('#dlg').dialog('close');
						$('#dg').datagrid('reload');
		 			}else{
		 				MessageInfo.Error('失败',"设置权限失败");
		 			}
		 		} 
		 	}); 
		}

		function modifyMap() {
			var row = $('#dg').datagrid('getSelected');
			var modifyMapId = row.mapId;
			var menuName = $('#modifyMenuName').combobox('getValue');
			var rejected = $('#modifyRejected').combobox('getValue');
			var modifyFieldName = document.getElementById("modifyFieldName").value;
			$('#modifySave').attr('disabled',"true");
			$.ajax({
		 		type:"post",
		 		url:"column_modifyMap",
		 		data:{"modifyMapId":modifyMapId,"menuName":menuName,"rejected":rejected,"modifyFieldName":modifyFieldName},
		 		 success:function(data){
		 			$('#modifySave').removeAttr("disabled");
		 			if(data == "success"){
		 				//MessageInfo.Info("成功", "用户操作成功");
						$('#dg').datagrid('reload');
						$('#modifyDlg').dialog('close');
		 			}else{
		 				MessageInfo.Error("提示",getFailure("操作"));
		 			}
		 		} 
		 	}); 
		}


		function deleteInfo(){
			var row = $('#dg').datagrid('getSelected');
			if(row == null){
				$.messager.show({
					title:'错误',
					msg:getChoiceDelete()
				})
			}else{
				$.messager.confirm('信息确认',getSureDelete(),function(r){
					if(r){
						var id = row.mapId;
						$.ajax({
					 		type:"post",
					 		url:"column_deleteMap",
					 		data:{"mapId":id},
					 		 success:function(data){
					 			if(data == "success"){
					 				//MessageInfo.Info("成功", "用户操作成功");
									$('#dg').datagrid('reload');
					 			}else{
					 				MessageInfo.Error("失败",getFailure("删除"));
					 			}
					 		} 
					 	});  
					}
				});
			}
		}
	