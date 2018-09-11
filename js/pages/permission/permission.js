var roleId = 0;  //用于保存当前被选中的角色节点
var Clickcount = 0;  //计数用的
$(function(){	
	$('#save').linkbutton('disable');
	var cols = [[]];
	var count = 0;		
	//获取所有的按钮	
	$.getJSON("btns/getBtnList",function(res){
		for(var i=0;i<res.btns.length;i++){					
			cols[0].push({
				field:res.btns[i].btnId.toString(),		
				width:50,
				title:'<span class="icon '+res.btns[i].iconClass+'">'+res.btns[i].btnName+'</span>',
				formatter:function(value,row){						
					if(count==res.btns.length)
						count = 0;
					var btnIdss = row.icon_name;					
					if(btnIdss != "" && btnIdss.split('#').indexOf(res.btns[count++].btnId.toString())!=-1){						
						return "<input type='checkbox' id="+row.menu_id+":"+res.btns[count-1].btnId+" class='menuBtn' />";
					}else{						
						return "";	
					}
				}
			});
		}		
		//加载treegrid的列
		$("#dt").treegrid({				
			frozenColumns:[[	
			{
                field: 'AllCheckedInfo',
                width: 40,
                align: 'center',
                title: "<input type='checkbox' id='checkAll' onClick='SelectAllCheckBox(true,1)'></input>",
                formatter: function (v, r)
                {
                    for (var i in r)
                    {
                    	return "<input type='checkbox' data-parentNodeId="+r._parentId+" onClick='selectRow("+r.menu_id+")' id="+r.menu_id+" class='menuInfo' />";                        
                    }
                }
            },
			{
				field:'menu_id',
				title:'菜单id',
				hidden:true
			},
			{
				field:'menu_name',
				title:'菜单名称',	
				width:150
			}			
			]],
			columns:cols,
			checkOnSelect:false,
			selectOnCheck:false,
			idField:'menu_id',			
			onDblClickRow:function(row){				
				var menuRowCheck = $("input:checkbox[id^="+row.menu_id+"]")[0];
				menuRowCheck.checked = !menuRowCheck.checked;
				//将双击行的所有文本框选中
				var curRowChecks = $("input:checkbox[id^='"+row.menu_id+":']");
				for(var i=0;i<curRowChecks.length;i++){					
					curRowChecks[i].checked = !curRowChecks[i].checked;
				}				
			}/*,
			onSelect : function(node,data) {
				if (data.length > 0) {
					 var n = $('#roleList').tree('find', node[0].id);
			         $('#roleList').tree('select', n.target);
			         display(data[0].id);
				}
			}*/
		});		
	});
	
/*	$("#dt").datagrid({
		onClickRow : function(index,data){
			$('#save').linkbutton('enable');
		}
	});
	*/
	
	//未角色列表添加click事件
	$('#roleList').tree({
		onClick:function(node){
			$('#add').linkbutton('enable');
			$('#save').linkbutton('enable');
			//在次需要判断使用得时那个标签页，根据不同得标签页使用不同得方法
		/*	var $oTabs = HomePage.GetTabObject();
			var tab = $('#tt').tabs('getSelected');
			var index = $('#tt').tabs('getTabIndex',tab);*/
			
				roleId = node.id;
				//document.getElementById("roleId").value = roleId;
				$('#carorgname').combotree({
					  disabled:true
				    });
				var pageNumber = parseInt(($(window).height() - 30) / 25);
				var pageNum = Math.round(pageNumber / 10) * 10;
				var h = $(window).height() * 0.98 - 25;
				
			
			
				$('#dt').datagrid('clearSelections'); 
				var checks = document.getElementsByTagName("input");
				var curRow = $('#dt');				
				resetUnCheck();	//取消所有选中的项						
				$.ajax({
			 		type:"post",
			 		url:"role/getAllMenuByRole",
			 		data:{"roleID":node.id},
			 		success:function(data){			 			
			 			for(var i = 0 ; i < data.length ; i++){
			 				if(data[i]==5){
			 					console.log(i);
			 				}
			 				//var ck = document.getElementById(data[i]);
			 				var ck = $("input:checkbox[id='"+data[i]+"']")[0];
			 				if(ck!=null){
			 					ck.checked = true;
			 				}	
			 			}
			 		}
			 	});
				
				$.getJSON("roleMenuButton/getRoleMenuButtonList?roleId="+node.id,function(res){					
					for(var i=0;i<res.rrmmbb.length;i++){    
						var items = res.rrmmbb[i];					
						//var ck = document.getElementById(items.menuId+":"+items.buttonId);
						var ck = $("input:checkbox[id='"+items.menuId+":"+items.buttonId+"']")[0];
						if(ck!=null)
							ck.checked=true;
					}							
				});										
					
		}
	});
	/*$('#tt').tabs({
		onSelect : function(data) {
			if (data.length>0) {
				//var node = $('#roleList').tree('getSelected');
				var node = $('#roleList').tree('find', 1);
				$('#roleList').tree('select', node.target);
				display(node.id);
				var roleid = $("#roleList").tree('getSelected').id
				var node = $('#tt').tree('find', roleid);
				$('#tt').tree('select', node.target);
			}
		}
	})*/
	
	$(window).resize(function() { // 表格高度适应页面高度
		var width = $(window).width();
		var height = $(window).height() * 0.98 - 25;
		$("#dg").datagrid('resize', {
			width : width,
			height : height
		});
	});
	$('#dlg').dialog({
		closed : true,
		modal : true
	});
});

function getCol(roleId){
	$('#carorgname').combotree({
		  disabled:true
	    });
	var pageNumber = parseInt(($(window).height() - 30) / 25);
	var pageNum = Math.round(pageNumber / 10) * 10;
	var h = $(window).height() * 0.98 - 25;
	
	
}

function resetUnCheck(){
	var checks = document.getElementsByTagName("input");
	for(var i = 0; i < checks.length; i++){
		if(checks[i].type=='checkbox')
			checks[i].checked = false;
	}
}
/**
 * 是全选还是全部取消，需传入false和true
 * @returns
 */
function SelectAllCheckBox(IsChecked,type){
	Clickcount++;
	var checks = document.getElementsByTagName("input");	
	
	if(Clickcount%2==0){
		for(var i = 0; i < checks.length; i++){
			if(checks[i].type=='checkbox')
				checks[i].checked = false;
		}
	}else{
		for(var i = 0; i < checks.length; i++){
			if(checks[i].type=='checkbox')
				checks[i].checked = true;
		}
	}
	
}

function selectRow(menuId){	
	//$('#'+menuId).nextAll('input:text').attr('disabled',true);
	var curRowChecks = $("input:checkbox[id^='"+menuId+":']");
	
	var curRowCheck = $("input:checkbox[id='"+menuId+"']")[0];
	
	updateChecked(curRowChecks,curRowCheck.checked);
	
	$.ajax({
		url : 'menu/getSubMenuId',
		//async : false,
		data : {"menuId":menuId},
		success : function(data){
			//$('#'+menuId).nextAll('input:text').attr('disabled',true);
			if(data!=null && data.length){
				for(var i = 0;i < data.length; i++){
					//var subRowCheck = document.getElementById(data[i]);
					var subRowCheck = $("input:checkbox[id='"+data[i]+"']")[0];
					if(subRowCheck!=undefined){
						subRowCheck.checked = curRowCheck.checked;
						var subCurRowChecks = $("input:checkbox[id^='"+data[i]+":']");
						updateChecked(subCurRowChecks,curRowCheck.checked);
					}					
				}
			}
		}
	});
	
	
}

/**
 * 更新行中的按钮
 * @param checked
 * @param checkInfo
 * @returns
 */
function updateChecked(curRowChecks,checkinfo){
	for(var i=0;i<curRowChecks.length;i++){		
		curRowChecks[i].checked = checkinfo;
	}
}

//去掉数组中的重复值
function getNoRepeat(s){
	return s.sort().join(",,").replace(/(,|^)([^,]+)(,,\2)+(,|$)/g,"$1$2$4").replace(/,,+/g,",").replace(/,$/,"").split(",");
}

function save(){	
	var node = $('#roleList').tree('getSelected');
	if(node == null || node == "" ){
		MessageInfo.Alarm('警告',getSelectRoles());
		return;
	}
	var roleId = node.id;
	var selectedMenuIds = [];
	var selectedMenuBtnIds = [];
	$('.menuBtn').each(function(){
		if(this.checked){    					
			selectedMenuBtnIds.push(this.id);
		}    					
	});
	
	//获取所有的行，这些行的checkbox均被选中
	var checkedRows = $('#dt').treegrid("getCheckedNodes");
    	
	$('.menuInfo').each(function(){
		if(this.checked){
			//selectedMenuIds.puth(this.parentNodeId);
			let parentId = this.getAttribute('data-parentnodeid');
			if(parentId!="undefined"){
				selectedMenuIds.push(parentId);
			}
			selectedMenuIds.push(this.id);
		}
	});
	
	
	$.each(selectedMenuBtnIds,function(index,value){		
		var splitIds = value.split(':');
		if(selectedMenuIds.toString().indexOf(splitIds[0])==-1)
			selectedMenuIds.push(splitIds[0]);
	});
	
	$.each(selectedMenuIds,function(index,value){
		var curRowCheck = $("input:checkbox[id='"+value+"']")[0];
		let parentId = curRowCheck.getAttribute('data-parentnodeid');
		if(parentId!="undefined"){
			selectedMenuIds.push(parentId);
		}
		selectedMenuIds.push(curRowCheck.id);
	});
		
		
	$.getJSON("roleMenuButton/setMenuRoleButton?roleId="+roleId+"&selectedIds="+getNoRepeat(selectedMenuBtnIds)+"&selectedMenuIds="+getNoRepeat(selectedMenuIds),function(res){	
		MessageInfo.Info('提示','保存成功！');		
	});	
}
