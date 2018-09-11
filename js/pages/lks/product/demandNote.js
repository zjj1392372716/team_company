var editIndex = undefined;
$(function(){
	queryInit();  //查询列表初始化
	initDataGrid();  // 初始化datagrid
	initStepWizard();  // 初始化向导框
});
/**
 * 初始化客户需求单的datagrid
 * @returns
 */
function initDataGrid(){
	var height = window.innerHeight / 2 * 0.8;
	initDataGird("dgDemand",height);
	queryData("dgDemand","/Demandnote/getAllDemandnotesByPagination",[]);
}
/**
 * 初始化需求单新建向导
 * @returns
 */
function initStepWizard(){
	initDialog(getBtns());
}

function initDialog(btns){
	$('#stepWizard').dialog({
		width:1400,
		height:800,
		closed:true,
		modal:true,
		title:'新建客户需求单',
		resizable:true,
		collapsible:true,
		buttons:btns
	});
}
/**
 * 获取所有的操作按钮
 * @returns
 */
function getBtns(){
	var btns = [
		{
			text:'暂存',
			iconCls:'icon-edit',
			handler:function(){console.log('点击暂存了');}
		},
		{
			text:'下一步',
			handler:function(){secondStep(true);}
		},
		{
			text:'取消',
			handler:function(){$('#stepWizard').dialog('close');}
		}
	];
	return btns;
}
/**
 * 第二部显示的按钮
 * @returns
 */
function secondStepBtns(){
	var btns = [
		{
			text:'暂存',
			iconCls:'icon-edit',
			handler:function(){console.log('点击暂存了');}
		},
		{
			text:'上一步',
			handler:function(){preStep();}
		},
		{
			text:'下一步',
			handler:function(){thirdStep();}
		},
		{
			text:'取消',
			handler:function(){$('#stepWizard').dialog('close');}
		}
	];
	return btns;
}
function thirdStepBtns(){
	var btns = [
		{
			text:'上一步',
			handler:function(){secondStep(false);}
		},
		{
			text:'完成',
			handler:function(){console.log('进入到第三部');}
		},
		{
			text:'取消',
			handler:function(){$('#stepWizard').dialog('close');}
		}
	];
	return btns;
}

function add(){
	console.log('开始新增需求单');
	$('#stepWizard').dialog('open');
	$('#stepWizard').window('center');  // dialog框居中显示
	initSelectList();
	//initDialog(getBtns());
	//showStepInfo("contentInfo","block");
}

/**
 * 设置不同步骤内容中的显示和隐藏
 * @param step
 * @param flag
 * @returns
 */
function showStepInfo(step,flag){
	document.getElementById(step).style.display = flag;
}
/**
 * 初始化下拉列表框
 * @returns
 */
function initSelectList(){
	//初始化雷克斯单位数据列表
	$('#lksStation').combotree({
		url:'../org/findAllOrgByShow',
		editable:true
	});
	$('#customerStation').combotree({
		url:'../Customer/getAllCustomerList',
		editable:true,
		onChange:function(newValue,oldValue){
			console.log(newValue+","+oldValue);
			//根据所选择的客户，查询该客户下的所有联系人
			$('#linkManCustomer').combobox({
				url:'../Customer/findLinkmanToAssociated',
				queryParams:{
					id:1,  // 标识是获取客户的联系人
					customerId:newValue
				},
				valueField:'linkManId',
				textField:'linkManName',
				loadFilter:function(data){
					var rows = [];
					if(data.length > 0){
						for(var i = 0; i < data.length; i++){
							if(data[i].checked){
								rows.push(data[i]);
							}
						}
					}
					return rows;
				},
				onChange:function(newValue,oldValue){
					$.ajax({
						type:'post',
						url:'../Linkman/findByLinkManById',
						data:{id:newValue},
						success:function(data){
							if(data == null) return;
							$('#customerEmail').val(data.email);
							$('#customerPhoneNumber').val(data.phoneNumber);
						}
					});
				}
			});
		}
	})
	//初始化雷克斯联系人
	$('#linkManlks').combobox({
		url:'../system/getUserIdText',
		valueField:'id',
		textField:'text',
		onChange:function(oldValue,newValue){
			$.ajax({
				type:'post',
				url:'../system/getUserById',
				data:{id:newValue},
				success:function(data){
					if(data == null) return;
					$('#lksEmail').val(data.email);
					$('#lksPhoneNumber').val(data.phoneNumber);
				}
			});
		}
	});
}
/**
 * 第二部初始化
 * @returns
 */
function secondStep(flag){
	document.getElementById('headerImag').src = "../css/icon/lks/sencondStep.png";
	initDialog(secondStepBtns());  //执行完会自动关闭
	$('#stepWizard').dialog('open'); //在打开一次
	$('#stepWizard').window('center');  // dialog框居中显示
	showStepInfo("contentInfo","none");
	showStepInfo("thirdStep","none");
	showStepInfo('secondStep','block');
	document.getElementById('navBarInfo').innerHTML = "<b>2.</b>录入加工件信息;若上一步信息更改，则点击【上一步】返回更改；若需暂存，则点击【暂存】先保存。"
	//if(flag){
	initProcessPartTable();
	//}
}
/**
 * 第三步的初始化部分
 * @returns
 */
function thirdStep(){
	document.getElementById('headerImag').src = "../css/icon/lks/thirdStep.png";
	initDialog(thirdStepBtns());  //执行完会自动关闭
	$('#stepWizard').dialog('open'); //在打开一次
	$('#stepWizard').window('center');  // dialog框居中显示
	showStepInfo("secondStep","none");
	showStepInfo("thirdStep","block");
	document.getElementById('navBarInfo').innerHTML = "<b>3.</b>对需求单信息进行确认，若无误，则点击【完成】。如有误，则点击【上一步】，返回更改。";
	initDisabledTable();	
	initThirdStepData();  //初始化最后一个的核对数据信息
}
/**
 * 初始化最后一步的数据核对信息
 * @returns
 */
function initThirdStepData(){
	//初始化基本信息
	$('#sntraceNumber').val($('#ntraceNumber').val());
	$('#sdate').val($('#demandDate').val());
	$('#sdescription').val($('#description').val());
	//初始化客户信息
	$('#scustomerStation').combotree('setText',$('#customerStation').combotree('getText'));
	$('#slinkManCustomer').combotree('setText',$('#linkManCustomer').combotree('getText'));
	$('#scustomerEmail').val($('#customerEmail').val());
	$('#scustomerPhoneNumber').val($('#customerPhoneNumber').val());
	//初始化雷克斯信息
	$('#slksStation').combotree('setText',$('#lksStation').combotree('getText'));
	$('#slinkManlks').combotree('setText',$('#linkManlks').combotree('getText'));
	$('#slksEmail').val($('#lksEmail').val());
	$('#slksPhoneNumber').val($('#lksPhoneNumber').val());
	//初始化最后一步的datagrid
	//获取第二部中datagrid数据
	var gridDatas = $('#dgSn').datagrid('getData');
	$('#s_dgSn').datagrid({
		data:gridDatas,
		singleSelect:true
	});
	
}

/**
 * 初始化加工件的datagrid
 * @returns
 */
function initProcessPartTable(){
	$('#dgSn').datagrid({
		width:960,
		height:500,
		singleSelect: true,
		onClickCell: function(index,field,value){
			clickCell(index,field);
		},
		onEndEdit: function(index,row,changes){
			endEdit(index,row);
		},
		onBeginEdit: function(index,row){
			var ed = $(this).datagrid('getEditor', {index:index,field:'amount'});
			$(ed.target).numberbox('setValue',1);
		}
	});
}
/**
 * 初始化被禁用的datagrid表格
 * @returns
 */
function initDisabledTable(){
	$('#s_dgSN').datagrid({
		width:960,
		height:500,
		singleSelect: true
	});
}

function endEditing(){
	if(editIndex == undefined) {return true;}
	if ($('#dgSn').datagrid('validateRow', editIndex)){
		$('#dgSn').datagrid('endEdit',editIndex);
		editIndex = undefined;
		return true;
	}else{
		return false;
	}
}
function clickCell(index,field){
	if(editIndex != index){
		if(endEditing()){
			$('#dgSn').datagrid('selectRow',index)
					.datagrid('beginEdit',index);
			var ed = $('#dgSn').datagrid('getEditor',{index:index,field:field});
			if(ed){
				($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
			}
			editIndex = index;
		}else{
			setTimeout(function(){
				$('#dgSn').datagrid('selectRow',editIndex);
			},0);
		}
	}
}
function endEdit(index,row,changes){
	var ed = $('#dgSn').datagrid('getEditor', {
        index: index,
        field:'id'
    });
    row.text = $(ed.target).combobox('getText');
}
/**
 * 新增行
 * @returns
 */
function append(){
	if(endEditing()){
		$('#dgSn').datagrid('appendRow',{});
		editIndex = $('#dgSn').datagrid('getRows').length - 1;
		$('#dgSn').datagrid('selectRow',editIndex).datagrid('beginEdit',editIndex);
	}
}
/**
 * 删除行
 * @returns
 */
function removeIt(){
	if(editIndex == undefined) return;
	$('#dgSn').datagrid('cancelEdit',editIndex)
			 .datagrid('deleteRow',editIndex);
	editIndex = undefined;
}
/**
 * 从第二部返回到第一步
 * @returns
 */
function preStep(){
	document.getElementById('headerImag').src = "../css/icon/lks/firstStep.png";
	initDialog(getBtns());  //执行完会自动关闭
	$('#stepWizard').dialog('open'); //在打开一次
	$('#stepWizard').window('center');  // dialog框居中显示
	showStepInfo("contentInfo","block");
	document.getElementById('navBarInfo').innerHTML = "<b>1.</b>填写客户需求单基本信息，点击【下一步】；若需暂存，则点击【暂存】先保存。";
	//document.getElementById('contentInfo').style.display = "block";
}
function queryInit(){
	//初始化雷克斯单位数据列表
	$('#org').combotree({
		url:'../org/findAllOrgByShow'
	});
	//初始化客户需求单状态列表
	$('#demandState').combotree({
		url:'../Dict/getDictsByName?typeName=客户需求单状态'
	});
	
	//初始化日期控件
	$('#dd').datebox({
		formatter:dateFormatter,
		parser:dateParser
	});
}

function dateFormatter(date){
	if(date==undefined) return '';
	var year = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return year + '-' + (m<10?('0'+m):m) + '-' + (d<10?('0'+d):d);
}
function dateParser(s){
	if(!s) return new Date();
	var ss = s.split('-');
	var y = parseInt(ss[0],10);
	var m = parseInt(ss[1],10);
	var d = parseInt(ss[2],10);
	if(!isNaN(y) && !isNaN(m) && !isNaN(d)){
		return new Date(y,m-1,d);
	}else{
		return new Date();
	}
}
function query(){
	alert('查询了');
}
function clearQuery(){
	alert('清空了');
}