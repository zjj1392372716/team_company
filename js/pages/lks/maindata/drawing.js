var localObj = window.location;
var baseurl = localObj.protocol+"//"+localObj.host;
var index = parent.layer.getFrameIndex(window.name);

$(function() {
	$('#dg').treegrid(
			{
				url : baseurl+'/Drawing/getAllJsonDrawing',
				striped : true,
				pagination:true,
				onSelect : function() {
					$('#modify').linkbutton('enable');
					$('#deleteInfo').linkbutton('enable');
				},
				onLoadSuccess : function(data) {					
					$('#modify').linkbutton('enable');
					$('#deleteInfo').linkbutton('enable');
				},onDblClickRow : function(index, data) {
//					$('.tf-toolbar a').each(function(){  
//					    if(this.id=="modify"){
					    	var row = $("#dg").treegrid('getSelected');
					    	if (row) {
					    		$('#fm').form('clear');
					    		var VehicleURL =baseurl+ "/Drawing/findAllDrawByShow?id="+row.drawingID;
					    		$.getJSON(VehicleURL, function(json) {
					    			$('#supOrg').combotree({
					    				data : json,
					    				valueField : 'id',
					    				textField : 'text'
					    			});
					    			if(row.supDrawingID!=null){
					    				$('#supOrg').combotree('setValue', row.supDrawingID);
					    				$('#partNumber').combobox('enable');
					    				$('#version').combobox('enable');
					    			}else{
					    				$('#partNumber').combobox('disable');
					    				$('#version').combobox('disable');
					    			}			
					    			//$('#supOrg').combotree('disable');
					    		});
					    		$('#dlg').dialog('open').dialog('setTitle', '编辑图纸');
					    	
					    		$('#fm').form('load', row);
					    	}
//					    }
//					})	            	
	            },
				loadFilter : function(data, parentId) {
					data = utils.copyProperty(data.rows || data, [ 'drawingID' ],
							[ 'tempid' ], false);
					return utils.toTreeData(data, 'tempid', 'supDrawingID',
							'children');
				},
			});
	PageConfig("#dg");
});

function formattertoversion(value, row) {
	return "<a href='#' style='height:100%;color:blue' onclick=display("
	+ row.drawingID
	+ ")>[版本查看]</a>";
}
function display(drawingID) {
	var row = $("#dg").treegrid("find",drawingID);
	$('#seeversion').dialog('open').dialog('setTitle', '图纸版本');
	$("#checkversion").datagrid({
		url : 'findVersion?partNumber='+$.trim(row.partNumber),
		selectOnCheck : false,
		checkOnSelect : false
	});
}

function formattertodetail(value, row) {
	var color = "blue";
	var  drawingID = row.drawingID;
	return "<a href='#' style='height:100%;align:center;color:" + color
	+ "' onclick=detail('" + drawingID
			+ "')><span class='icon icon-users'></span>[查看详情]</a>";
}

function formattertodetailtwo(value, row) {
	return "<a href='#' style='height:100%;align:center;color:blue' onclick=detailtwo(" + row.drawingID+","+row.supDrawingID
			+")>[查看详情]</a>";
}

function detailtwo(drawing,supDrawingID){
	var row;
	
	$('#fmdetail').form('clear');
	$('#listimg').html('');
	for(var i=0;i<$("#checkversion").datagrid("getRows").length;i++){
		
		if($("#checkversion").datagrid("getRows")[i].drawingID==drawing){
			row=$("#checkversion").datagrid("getRows")[i];
		}
	}
	var VehicleURL =baseurl+ "/Drawing/findAllDrawByShow?id="+drawing;
	$.getJSON(VehicleURL, function(json) {
		$('#supOrgs').combotree({
			data : json,
			valueField : 'id',
			textField : 'text'
		});
		if(row.supDrawingID!=null){
			$('#supOrgs').combotree('setValue', supDrawingID);
		}
	});
	$.ajax({
 		type:"post",
 		url:baseurl+"/Drawing/getDrawingDetial?drawingID="+drawing,
 		success:function(data){
 		 var  addr=data.detailsAddress
 		 var imgurl;
 		for (var i=0;i<6;i++)
 		{
 			imgurl=baseurl+addr[i].attachmentName;
 			$('#listimg').append('<div class="box"><img id="img_prev" class="thumb" src="'+imgurl+'" /></div>')	
 		}
 		}
 	});
	$('#dlgdetail').dialog('open').dialog('setTitle', '图纸详情');
	$('#fmdetail').form('load', row);
}


function formattertopn(value, row) {
	value = "上传";
	var color = "blue";
	var  drawingID = row.drawingID;
		if (row.drawingattachment!= "") {
			value = "已上传";
			color = "red";
		}
	return "<a href='#' style='height:100%;align:center;color:" + color
			+ "' onclick=pn('" + drawingID
			+ "')><span class='icon icon-users'></span>[" + value + "]</a>";
}

function pn(drawID) {
	var url = "Printpn?drawingID=" +drawID;
	layer_show("【图纸】", url, 910, 800);
}


function add() {
	$('#dg').datagrid('clearSelections');
	var VehicleURL =baseurl+ "/Drawing/findAllDrawByShow";
	$.getJSON(VehicleURL, function(json) {
		$('#supOrg').combotree({
			data : json,
			valueField : 'id',
			textField : 'text'
		});
	});
	$('#dlg').dialog('open').dialog('setTitle', '新增图纸');
	$('#fm').form('clear');
}
function save() {
	var supDrawingID=$.trim($("#supOrg").combotree('getValue'));
	var partNumber=$.trim($("#partNumber").textbox('getValue'));
	var version=$.trim($("#version").textbox('getValue'));
	var desc1=$.trim($("#desc1").textbox('getValue'));
	var desc2=$.trim($("#desc2").textbox('getValue'));
	var row = $("#dg").datagrid('getSelected');
	if(partNumber==null||partNumber.length==0){
		MessageInfo.Alarm("错误",getAsteriskEmpty());
		return;
	}else if(version==null||version.length==0){
		MessageInfo.Alarm("错误",getAsteriskEmpty());   
		return;
	}
	
	if(row == null){
		$.ajax({
	 		type:"post",
	 		url:baseurl+"/Drawing/addDrawing",
	 		data:{"supDrawingID":supDrawingID,"partNumber":partNumber,"version":version,"desc1":desc1,"desc2":desc2},
	 		success:function(data){
				if(data.errCode=='SUCCESS'){
					//MessageInfo.Info('成功','操作成功');
					$('#dlg').dialog('close');
					$('#dg').treegrid('reload');					
				}else{
					MessageInfo.Alarm('错误',"该版本已存在！");	
				}
	 		}
	 	});
	}else{
		$.ajax({
	 		type:"post",
	 		url:baseurl+"/Drawing/modifydrawing",
	 		data:{"supDrawingID":supDrawingID,"partNumber":partNumber,"version":version,"desc1":desc1,"desc2":desc2},
	 		success:function(data){
	 			if(data.errCode=='SUCCESS'){
	 				$('#dlg').dialog('close'); 
					$('#dg').treegrid('reload');
	 			}else{
					MessageInfo.Alarm('错误',"该版本已存在！");	
				}
	 		}
	 	});
	}
}

function modify(){
	var row = $("#dg").treegrid('getSelected');
	if (row) {
		$('#fm').form('clear');
		var VehicleURL =baseurl+ "/Drawing/findAllDrawByShow?id="+row.drawingID;
		$.getJSON(VehicleURL, function(json) {
			$('#supOrg').combotree({
				data : json,
				valueField : 'id',
				textField : 'text'
			});
			if(row.supDrawingID!=null){
				$('#supOrg').combotree('setValue', row.supDrawingID);
				$('#partNumber').combobox('enable');
				$('#version').combobox('enable');
			}else{
				$('#partNumber').combobox('disable');
				$('#version').combobox('disable');
			}			
			//$('#supOrg').combotree('disable');
		});
		$('#dlg').dialog('open').dialog('setTitle', '编辑图纸');
	
		$('#fm').form('load', row);
	}else {
		MessageInfo.Info('提示', "请选择数据!");
	}
	
}

function detail(drawingID){
		$('#fmdetail').form('clear');
		$('#listimg').html('');
		var row = $("#dg").treegrid("find",drawingID);
		var VehicleURL =baseurl+ "/Drawing/findAllDrawByShow?id="+row.drawingID;
		$.getJSON(VehicleURL, function(json) {
			$('#supOrgs').combotree({
				data : json,
				valueField : 'id',
				textField : 'text'
			});
			if(row.supDrawingID!=null){
				$('#supOrgs').combotree('setValue', row.supDrawingID);
			}
		});
		$.ajax({
	 		type:"post",
	 		url:baseurl+"/Drawing/getDrawingDetial?drawingID="+row.drawingID,
	 		success:function(data){
	 		 var  addr=data.detailsAddress
	 		 var imgurl;
	 		for (var i=0;i<6;i++)
	 		{
	 			imgurl=baseurl+addr[i].attachmentName;
	 			$('#listimg').append('<div class="box"><img id="img_prev" class="thumb" src="'+imgurl+'" /></div>')	
	 		}
	 		}
	 	});
		$('#dlgdetail').dialog('open').dialog('setTitle', '图纸详情');
		$('#fmdetail').form('load', row);
}

function deleteInfo() {
	var row = $('#dg').treegrid('getSelected');
	if(!row.supDrawingID){
		MessageInfo.Alarm('错误',"存在下级不可删除！");	
		return;
	}
	if (row) {
		layer.alert('您确认要删除吗？', {
			icon : 3,
			btn : [ '确定', '取消' ]
		// 带回调函数的弹窗
		}, function() {
			// //为按钮确定所用函数开始
			$.post('deleteDrawing', {
				id : row.drawingID
			}, function(result) {
				layer.closeAll();
				if (result.errorCode=='SUCCESS') {
					$('#dg').treegrid('reload'); // 重新加载数据列表
					// 点击取消按钮执行关闭窗体（需自行添加）
				} else {
					MessageInfo.Alarm('错误',"存在关联删除失败！");	
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
