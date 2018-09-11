$(function() {
	$('#dg').treegrid({
		url : 'getAllOrg',
		striped : true,
		//pagination:false,
		onSelect : function() {
			$('#modify').linkbutton('enable');
			$('#deleteInfo').linkbutton('enable');
		},
		onLoadSuccess : function(data) {					
			$('#modify').linkbutton('disable');
			$('#deleteInfo').linkbutton('disable');
		},onDblClickRow : function(index, data) {
			$('.tf-toolbar a').each(function(){  
			    if(this.id=="modify"){
			    	var row = $("#dg").treegrid('getSelected');
			    	if (row) {
			    		var VehicleURL = "findAllOrgByShow?id=" + row.OrgId;
			    		$.getJSON(VehicleURL, function(json) {
			    			$('#supOrg').combotree({
			    				data : json,
			    				valueField : 'id',
			    				textField : 'text'
			    			});
			    			if(row.supOrgId!=null){
			    				$('#supOrg').combotree('setValue', row.supOrgId);
			    			}			
			    			//$('#supOrg').combotree('disable');
			    		});
			    		$('#dlg').dialog('open').dialog('setTitle', '编辑部门');
			    		$('#orgType').combobox('disable');
			    		$('#fm').form('load', row);
			    		url = "updateOrg?orgid=" + row.OrgId + "&orgTypeId="
			    				+ $("#orgType").combobox("getValue");
			    	}
			    }
			})	            	
        },loadFilter:function(data,parentId){
			data = utils.copyProperty(data.rows || data,['OrgId'],['tempid'],false);
			return utils.toTreeData(data,'tempid','supOrgId','children');
		},				
	});
	
//	$("#dg").treegrid('getPager').pagination({
//		onSelectPage:function(pageNum, pageSize){
//			loadTree(pageNum,pageSize);
//			}
//	});
	//loadTree(-1,-1);
});
function loadTree(page,rows)
{
	var param={};
	param.flag=new Date();
	if(page==-1&&rows==-1){
		var options=$("#dg").treegrid("options");
		param.page=options.pageNumber;
		param.rows=options.pageSize;
	}else
	{
		param.page=page;
		param.rows=rows;
	}	
	$("#dg").treegrid("loading");
	$.post("getAllOrg",param,function(data){
		var rows=arrayToTree(data.rows,"OrgId","supOrgId");
		data.rows=rows;
		$("#dg").treegrid("loadData",data);
		$("#dg").treegrid('getPager').pagination("loaded");
		$("#dg").treegrid("loaded");
	});	
}
function arrayToTree(data, id, pid)      
{
    if (!data || !data.length) return [];
    var targetData = [];                    //存储数据的容器(返回) 
    var records = {};
    var itemLength = data.length;           //数据集合的个数
    for (var i = 0; i < itemLength; i++) {
        var o = data[i];
        records[o[id]] = o;
    }
    for (var i = 0; i < itemLength; i++) {
        var currentData = data[i];
        var parentData = records[currentData[pid]];
        if (!parentData) {
            targetData.push(currentData);
            continue;
        }
        parentData.children = parentData.children || [];
        parentData.children.push(currentData);
    }
    return targetData;
}

function setButton(element, url, ID, title) {
	$(element).dialog({
		title : title,
		width : 550,
		height : 500,
		href : url + "?id=" + ID,
		modal : true,
		buttons : [ {
			text : '确定',
			width : '80',
			iconCls : 'icon-ok',
			handler : function() {				
				$(element).dialog('close');
			}
		}, {
			text : '取消',
			width : '80',
			iconCls : 'icon-cancel',
			handler : function() {
				$(element).dialog('close');
				$('#dg').datagrid('reload');
			}
		} ]

	});
}
function formattertouser(value, row) {
	return "<a href='#' style='height:100%;color:blue' onclick=setButton("
			+ "'#updateToUserBtn'," + "'../../org/OrgToIdentity','" + row.OrgId
			+ "','关联身份'" + ")><span class='icon icon-users'></span>[身份]</a>";
}
function add() {
	$('#dg').datagrid('clearSelections');
	var VehicleURL = "findAllOrgByShow";
	$.getJSON(VehicleURL, function(json) {
		$('#supOrg').combotree({
			data : json,
			valueField : 'id',
			textField : 'text'
		});
	});
	$('#orgType').combobox('enable');
	//$('#supOrg').combotree('enable');
	$('#dlg').dialog('open').dialog('setTitle', '新增部门');
	$('#fm').form('clear');
	url = 'addOrg';
}
function save() {
	var orgName=$.trim($("#orgName").textbox('getValue'));
	var orgType=$.trim($("#orgType").combobox('getValue'));
	var serial=$.trim($("#serial").textbox('getValue'));
	var supOrg=$.trim($("#supOrg").combotree('getValue'));
	var description=$.trim($("#description").textbox('getValue'));
	var row = $("#dg").datagrid('getSelected');
	if(orgName==null||orgName.length==0){
		MessageInfo.Alarm("错误",getAsteriskEmpty());
		return;
	}else if(orgType==null||orgType.length==0){
		MessageInfo.Alarm("错误",getAsteriskEmpty());   
		return;
	}else if(row&&row.OrgId == supOrg){
		MessageInfo.Alarm("错误",getSelfCanNotAuthority());
		return;
	}else if(serial!=null&&serial.length!=0){
		
		var re = /^[1-9]+.?[1-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 

		if (!re.test(serial)) {

		MessageInfo.Alarm("错误","序号应为正整数！");

		return;

		}
	}
	var id = 0;
	var idCount = "";
	if(row != null){	//编辑
		id = row.OrgId;
	}
	
	if(row == null){
		$.ajax({
	 		type:"post",
	 		url:"addOrg",
	 		data:{"orgName":orgName,"serial":serial,"orgTypeId":orgType,"supOrgId":supOrg,"description":description},
	 		success:function(data){
				if(data.code){
					//MessageInfo.Info('成功','操作成功');
					$('#dlg').dialog('close');
					$('#dg').treegrid('reload');					
				}else{
					MessageInfo.Alarm('错误',"该名称已存在！");	
				}
	 		}
	 	});
	}else{
		$.ajax({
	 		type:"post",
	 		url:"updateOrg",
	 		data:{"orgid":id,"orgName":orgName,"serial":serial,"description":description,"supOrgId":supOrg},
	 		success:function(data){
	 			if(data.code){
	 				$('#dlg').dialog('close'); 
					$('#dg').treegrid('reload');
	 			}
	 		}
	 	});
	}
}
function modify() {
	$('#save').removeAttr("disabled");
	var row = $("#dg").treegrid('getSelected');
	if (row) {
		var VehicleURL = "findAllOrgByShow?id=" + row.OrgId;
		$.getJSON(VehicleURL, function(json) {
			$('#supOrg').combotree({
				data : json,
				valueField : 'id',
				textField : 'text'
			});
			if(row.supOrgId!=null){
				$('#supOrg').combotree('setValue', row.supOrgId);
			}			
			//$('#supOrg').combotree('disable');
		});
		$('#dlg').dialog('open').dialog('setTitle', '编辑部门');
		$('#orgType').combobox('disable');
		$('#fm').form('load', row);
		url = "updateOrg?orgid=" + row.OrgId + "&orgTypeId="
				+ $("#orgType").combobox("getValue");
		
	} else {
		MessageInfo.Info('提示', getChoiceEditor());
	}
}
function deleteInfo() {
	var row = $('#dg').treegrid('getSelected');
	if (row) {
		layer.alert('您确认要删除该部门吗？', {
			icon : 3,
			btn : [ '确定', '取消' ]
		// 带回调函数的弹窗
		}, function() {
			// //为按钮确定所用函数开始
			$.post('deleteOrg', {
				id : row.OrgId
			}, function(result) {
				layer.closeAll();
				if (result.code) {
					$('#dg').treegrid('reload'); // 重新加载数据列表
					// 点击取消按钮执行关闭窗体（需自行添加）
				} else {
					MessageInfo.Error("失败", result.message);
				}
			}, 'json');
			// //为按钮确定所用函数结束
		}, function() {
			// 点击取消按钮执行关闭窗体
			layer.closeAll();
		});
	} else {
		MessageInfo.Info('提示', getChoiceDelete());
	}
}
function Query(){
	var orgName = $('#searchOrgName').val();
	var data = $('#dg').treegrid('getData');
	$('#dg').treegrid('expandAll');
	findChild(data,orgName);
	/*for (var i = 0; i < data.length ; i++) {
		var row = data[i];
		if(row.OrgName == orgName){
			$('#dg').treegrid('select',rows.OrgId);
		}else{
			var children = row.children;
			if(row.children == undefined){
				
			}else{
				for(var j = 0; j < children.length; j++){
					var child = children[i];
					if(child.OrgName = orgName){
						$('#dg').treegrid('select',rows.OrgId);
					}
				}
			}
		}
	}*/
}
function findChild(data,orgName){
	for (var i = 0; i < data.length ; i++) {
		var row = data[i];
		if(row.OrgName == orgName){
			$('#dg').treegrid('select',row.OrgId);
		//	$('#dg').treegrid('scrollTo',row.OrgId);
			return;
		}else{
			var children = row.children;
			if(row.children == undefined){
				//break;
			}else{
				findChild(children,orgName);
			}
		}
	}
}
function clearForm() {
	$('#searchOrgName').val("");
}