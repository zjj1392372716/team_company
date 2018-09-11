var localObj = window.location;
var baseurl = localObj.protocol+"//"+localObj.host;
$(function(){	
	$('#dg').datagrid({
		url:'getAllCatalopgsByPagination',
		striped:true, 
		pagination:true,
		onSelect : function() {
			
		},
		onLoadSuccess:function(data){
			
		}
	});
	PageConfig("#dg");
	$('#dlg').dialog({
		closed : true,
		modal : true
	});
});


function formattertoversion(value, row) {
	return "<a href='#' style='height:100%;color:blue' onclick=display("
	+ row.drawingID
	+ ")>[版本查看]</a>";
}
function display(drawingID) {
	$('#seeversion').dialog('open').dialog('setTitle', '版本查看');
	$("#checkversion").datagrid({
		url : 'findVersion?drawingID='+$.trim(drawingID),
		selectOnCheck : false,
		checkOnSelect : false
	});
}
/**
 * 打开新增界面
 * @returns
 */
function add() {
	$('#dg').datagrid('clearSelections');
	var VehicleURL =baseurl+ "/Drawing/findAllDrawByShow";
	$.getJSON(VehicleURL, function(json) {
		$('#supOrgs').combotree({
			data : json,
			valueField : 'id',
			textField : 'text'
		});
	});
	$('#dlg').dialog('open').dialog('setTitle', '价格新增');			
	$('#fm').form('clear');
}
/**
 * 打开编辑界面
 * @returns
 */
function modify() {	
	var row = $('#dg').datagrid('getSelected');
	$('#fm').form('clear');
	if(row == null){
		MessageInfo.Info('提示',"请先选择数据");
	}else{
		var VehicleURL =baseurl+ "/Drawing/findAllDrawByShow?id="+row.partnumber;
		$.getJSON(VehicleURL, function(json) {
			$('#supOrgs').combotree({
				data : json,
				valueField : 'id',
				textField : 'text',
				disabled:true
			});
			$('#supOrgs').combotree('setValue',row.partnumber);
		});
		$('#dlg').dialog('open').dialog('setTitle', '编辑价格');
		$('#fm').form('load', row);
	}
}
/**
 * 保存数据
 * @returns
 */
function save() {
	var row = $('#dg').datagrid('getSelected');
	var partnumber=$("#supOrgs").combotree('getValue');
	var price=$.trim($("#price").textbox('getValue'));
	var description=$("#description").textbox('getValue');
	
	if(partnumber == null || partnumber.length == 0){
		MessageInfo.Alarm('错误',getAsteriskEmpty());
		return;
	}else if(price == null || price.length == 0){
		MessageInfo.Alarm('错误',getAsteriskEmpty());
		return;
	}else if(description == null || description.length == 0){
		MessageInfo.Alarm('错误',getAsteriskEmpty());
		return;
	}
	if(row == null){
		$.ajax({
	 		type:"post",
	 		url:"addCatalopg",
	 		data:{"partnumber":partnumber,"price":price,"description":description},
	 		success:function(data){
	 			if (data.errCode == "SUCCESS"){
	 				$('#dlg').dialog('close'); 
					$('#dg').datagrid('reload');
	 			}
	 		}
	 	});
	} else {
		$.ajax({
	 		type:"post",
	 		url:"modifycatalopg",
	 		data:{"id":row.catalopgId,"partnumber":row.drawingID,"price":price,"description":description},
	 		success:function(data){
	 			if (data.errCode == "SUCCESS"){
	 				$('#dlg').dialog('close'); 
					$('#dg').datagrid('reload');
	 			} 
	 		}
	 	});
	}
}

function Query(){
	var partnumber=$.trim($("#searchPartnumber").textbox('getValue'));
	$('#dg').datagrid({
		url:'getAllViewCatalopgsByPagination?partnumber='+partnumber,
		striped:true, 
		pagination:true,
	});
	PageConfig("#dg");
}

var setButton = function(element, url, ID,  title){
	$(element).dialog({
		title : title,
		width : 900,
		height : 500,
		href : url + "?id=" + ID,
		modal : true,
		buttons : [ {
			text : '取消',
			width : '80',
			iconCls : 'icon-cancel',
			handler : function() {
				$(element).dialog('close');
				$('#dg').datagrid('reload');
			}
		}]
	});
}


/** 
 * combobox和combotree模糊查询 
 */  
(function(){   
    //combotree可编辑，自定义模糊查询  
    $.fn.combotree.defaults.editable = true;  
    $.extend($.fn.combotree.defaults.keyHandler,{  
        up:function(){  
            console.log('up');  
        },  
        down:function(){  
            console.log('down');  
        },  
        enter:function(){  
            console.log('enter');  
        },  
        query:function(q){  
            var t = $(this).combotree('tree');  
            var nodes = t.tree('getChildren');  
            for(var i=0; i<nodes.length; i++){  
                var node = nodes[i];  
                if (node.text.indexOf(q) >= 0){  
                    $(node.target).show();  
                } else {  
                    $(node.target).hide();  
                }  
            }  
            var opts = $(this).combotree('options');  
            if (!opts.hasSetEvents){  
                opts.hasSetEvents = true;  
                var onShowPanel = opts.onShowPanel;  
                opts.onShowPanel = function(){  
                    var nodes = t.tree('getChildren');  
                    for(var i=0; i<nodes.length; i++){  
                        $(nodes[i].target).show();  
                    }  
                    onShowPanel.call(this);  
                };  
                $(this).combo('options').onShowPanel = opts.onShowPanel;  
            }  
        }  
    });  
})(jQuery); 

function clearForm(){
	$("#searchPartnumber").textbox('setValue','');
}
