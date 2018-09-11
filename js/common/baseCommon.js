var btnId = [];//按钮ID

function checkSpecialCharacter(url) {    
    myRe = /<.*=(&#\d+?;?)+?>|<.*data=data:text\/html.*>|\b(alert\(|confirm\(|expression\(|prompt\(|benchmark\s*?\(\d+?|sleep\s*?\([\d\.]+?\)|load_file\s*?\()|<[a-z]+?\b[^>]*?\bon([a-z]{4,})\s*?=|^\+\/v(8|9)|\b(and|or)\b.+?(=|>|<|\s+?[\w]+?\s+?\bin\b\s*?\(|\blike\b\s+?)|\/\*.+?\*\/|<\s*script\b|\bEXEC\b|UNION.+?SELECT|UPDATE.+?SET|INSERT\s+INTO.+?VALUES|(SELECT|DELETE).+?FROM|(CREATE|ALTER|DROP|TRUNCATE)\s+(TABLE|DATABASE)/i;
    if (myRe.test(decodeURI(decodeURIComponent(url)))) {
        return true;
    } 
}

function checkCharacter(data) {
    re = /lect |delete |update |truncate |join |union |exec |insert |drop |count |>|<|%/i;
    if (re.test(decodeURI(decodeURIComponent(data)))) {
    	return true;
    }
}
$(document).ajaxError(function(e,xhr,opt){
	if(xhr.status == 501){
		MessageInfo.Alarm("错误","请勿输入非法字符！！");
	}
})
$(document).ajaxSend(function(e,xhr,opt){	
	if(opt.url.indexOf("&")>-1){
		for(var i=0;i<opt.url.split("&").length;i++){
			if(checkSpecialCharacter(opt.url.split("&")[i].split("=")[1])||checkCharacter(opt.url.split("&")[i].split("=")[1])){			
				xhr.abort();
				MessageInfo.Alarm("错误","请勿输入非法字符");			
				return;
			}	
		}
	}else{
		if(checkSpecialCharacter(opt.url.split("?")[1])||checkCharacter(opt.url.split("?")[1])){			
			xhr.abort();
			MessageInfo.Alarm("错误","请勿输入非法字符");			
			return;
		}	
	}	
});
/**
 * js获取当前时间， 格式“yyyy-MM-dd”
 */
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1;
	return currentdate;
}
/**
 * js根据时间生成编号， 格式“yyyyMMddHHMMSS”
 */
function getNowFormatDateNum() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	var strHours = date.getHours();
	var strMinutes = date.getMinutes();
	var strSeconds = date.getSeconds();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	if (strHours >= 0 && strHours <= 9) {
		strHours = "0" + strHours;
	}
	if (strMinutes >= 0 && strMinutes <= 9) {
		strMinutes = "0" + strMinutes;
	}
	if (strSeconds >= 0 && strSeconds <= 9) {
		strSeconds = "0" + strSeconds;
	}
	var currentdate = date.getFullYear() + month.toString() + strDate.toString() + strHours
		+ strMinutes + strSeconds;
	return currentdate;
}


function checkCharacter(data) {
    re = /lect |delete |update |truncate |join |union |exec |insert |drop |count |>|<|%/i;
    if (re.test(decodeURI(decodeURIComponent(data)))) {
    	return true;
    }
}
//正整数校验
//$(document).ajaxError(function(e,xhr,opt){
//	if(xhr.status == 500){
//		var curWwwPath=window.document.location.href;
//		var pathName=window.document.location.pathname;
//		var pos=curWwwPath.indexOf(pathName);
//		var localhostPaht=curWwwPath.substring(0,pos);
//		var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
//		var realPath=localhostPaht+projectName;
//		MessageInfo.Alarm("错误","请勿输入非法字符");
//	}
//});
$(function(){
		//以下方法为了解决easyUI中不支持maxlength的解决方案
		$("input[class*='easyui-textbox'][maxlength][id],input[class*='easyui-numberbox'][maxlength][id]").each(function (i, elt) { // iterate all jeasyui textboxes having maxlength attribute and id attribute
	
		$('#' + elt.id).textbox();
		$('#' + elt.id).textbox('textbox').attr('maxlength', $('#' + elt.id).attr("maxlength"));
	});
	$.post(location.origin+'/btns/renderToobar?pathName='+location.pathname,function(data){		
		btnId = [];
		var len = data.length;
		createRefreshBtn('icon-refresh','刷新','window.location.reload');
		for(var i = 0; i < len; i++){
			createRefreshBtn(data[i].iconclass,data[i].buttonname,data[i].buttoncode);
		}	
		showButton();
	});
});
/**
 * 创建刷新按钮
 * @returns
 */
function createRefreshBtn(iconClass,text,btnCode){
	var aEle = document.createElement('a');
	aEle.setAttribute('href','#');
	aEle.setAttribute('plain',true);
	aEle.setAttribute('class','easyui-linkbutton l-btn l-btn-small l-btn-plain');
	aEle.setAttribute('icon',iconClass);
	aEle.setAttribute('text',text);
	aEle.setAttribute('id',btnCode);
	aEle.setAttribute('onclick',btnCode+"()");
	var span1 = document.createElement('span');
	span1.setAttribute('class','l-btn-left l-btn-icon-left');
	var span2 = document.createElement('span');
	span2.setAttribute('text',text);
	span2.setAttribute('class','l-btn-text');
	span2.textContent = text;
	span1.appendChild(span2);
	var span3 = document.createElement('span');
	span3.setAttribute('class','l-btn-icon '+iconClass);
	span1.appendChild(span3);
	if(text == "刷新"){
		aEle.appendChild(span1);
	}else{
		btnId.push(btnCode);
	}
	var tbar = document.getElementById('toolbar');
	if(tbar != null){
		tbar.appendChild(aEle);
	}
}
function showButton(){
	var length = btnId.length;
	for(var i = 0; i < length ; i ++){
		$("#"+btnId[i]).linkbutton({
			disabled:false
		});	
	}
}
/* 弹出层 */
/*
 * 参数解释： title 标题 url 请求的url id 需要操作的数据id w 弹出层宽度（缺省调默认值） h 弹出层高度（缺省调默认值）
 */
function layer_show(title, url, w, h) {
	if (title == null || title == '') {
		title = false;
	}
	;
	if (url == null || url == '') {
		url = "404.html";
	}
	;
	if (w == null || w == '') {
		w = ($(window).width() - 50);

	}
	;
	if (h == null || h == '') {
		h = ($(window).height() - 25);
	}
	;
	layer.open({
		type : 2,
		area : [ w + 'px', h + 'px' ],
		fix : false, // 不固定
		maxmin : false,
		shade : 0.4,
		title : title,
		content : url
	});
}
function exportExcel(title,rowsName,Todata,type,mergeCol,afterMerge){
	var finalData = new Object();
	finalData.rows = Todata;
	var jsonArray = JSON.stringify(finalData);
	$.ajax({
 		type:"post",
 		url:"exportExcel",
 		data:{title:title,rowsName:rowsName,data:jsonArray,type:type,mergeCol:mergeCol,afterMerge:afterMerge},
 		async:true,
 		success:function(data){
 			if(data == "success"){
 				var dateNow = new Date();
 				var dateNow = new Date();
 				var year = dateNow.getFullYear();
 				var month = dateNow.getMonth()+1;
 				var date = year.toString() + ((month < 10) ? "0" + month : month).toString();
	 			var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split("/")[1];
	 			location.href=newURL+"/download/"+title+date+".xls"; 
 			}else{
 				MessageInfo.Alarm("警告","导出失败");
 			}
 		}
 	});
}

/**
 * 选中组织机构中的车辆，在车辆类型中也应该选中
 * 相反则同理
 * @param id1
 * @param id2
 * @param state
 * @param node
 * @returns
 */
function checkedReport(id1,id2,state,node){			
	if(node.id.toString().indexOf('veh')!=-1){ //单选择车
		var t1Node = $('#'+id1).tree('find',node.id);
		if(node!=null && t1Node){
			$('#'+id1).tree(state,t1Node.target);
		}
	}else{ //选择组织机构或者车辆作业类型
		var childs = $('#'+id2).tree("getChildren",node.target);
		$.each(childs,function(index,value){				
			if(value.id.toString().indexOf("veh")!=-1 && value.supId.toString().indexOf("veh")==-1){
				var t1Node = $('#'+id1).tree('find',value.id);
				$('#'+id1).tree(state,t1Node.target);								
			}
		});
	}
	
}
function intnumbox(divid) {
	 $('#'+divid).numberbox({   
			filter:function(e){  				
				if(e.charCode>47&&e.charCode<58){
					return true;
				}else{
					if(e.charCode==32){
						return true;
					}else{
						return false;
					}					
				}
			},
			formatter:function(value){				
				return QJtoBJ(value);
			}
		});  
   }  
//全角转半角
 function QJtoBJ(str)
 { 
 	var result="";
 	for (var i = 0; i < str.length; i++)
 	{
 		if (str.charCodeAt(i)==12288)
 		{
 			result+= String.fromCharCode(str.charCodeAt(i)-12256);
 			continue;
 		}
 		if (str.charCodeAt(i)>65280 && str.charCodeAt(i)<65375)
 			result+= String.fromCharCode(str.charCodeAt(i)-65248);
 		else result+= String.fromCharCode(str.charCodeAt(i));
 	} 
 	return result;
 } 
 //正数校验
  function floatnumbox(divid) {
	 $('#'+divid).numberbox({   
			filter:function(e){  				
				if(e.charCode>45&&e.charCode<58){
					if(e.charCode==47){
						return false;
					}else{
						return true;
					}					
				}else{
					if(e.charCode==32){
						return true;
					}else{
						return false;
					}	
				}
			} ,
	        formatter:function(value){
			  return QJtoBJ(value);
		    }
		});  
    } 
  //提示框
  function showtooltip(id,position,title,color){
	  $('#'+id).tooltip({
		    position: position,//位置
		    content: '<span style="color:#fff">'+title+'</span>',
		    onShow: function(){
				$(this).tooltip('tip').css({
					backgroundColor: color,
					borderColor: color
				});
		    }
		});  
  }  
	//表格高度适应页面高度函数
	function reSize(heightNumber,tableName){
		$(window).resize(function(){
			var height = $(window).height()-heightNumber; 
			$("#"+tableName).datagrid('resize',{  	          
	            height:height  
	        });  
		});
	};
	//前端排序数字函数
    function numberSort(a,b){  
        var number1 = parseFloat(a);  
        var number2 = parseFloat(b);            
        return (number1 > number2 ? 1 : -1);    
    }  
    
	//  新增函数(权限，需要判断条件的)
	function addJudge(dialogName,treeName,formName){		
		$('#'+dialogName).dialog({closed:true,modal:true});
		var node = $('#'+treeName).tree('getSelected');
		console.log(node);
		if(node == null || node == "" ){
			MessageInfo.Alarm('警告',getSelectRoles());
		}else{
			$('#'+dialogName).dialog('open').dialog('setTitle','添加列权限');
			$('#'+formName).form('clear');
		}
	}
	// 新增函数(数据字典)
	function adds(dialogName,saveBtn,formName,urlName){
		$("#"+dialogName).dialog('open').dialog('setTitle','添加');
		$('#'+saveBtn).removeAttr("disabled");
		$('#'+formName).form('clear');
		url=urlName;		
	}
	// 修改函数(权限)
	function modify(modifyName,dgName,fmNames){
		$('#'+modifyName).dialog({closed:true,modal:true});
		var row = $('#'+dgName).datagrid('getSelected');
		if(row == null){
			MessageInfo.Alarm("错误",getChoiceEditor());
		}else{
			$('#'+modifyName).dialog('open').dialog('setTitle','修改列权限');
			$('#'+fmNames).form('load',row);
		}
		
	}
	// 修改函数(数据字典有url的)
	function modifys(dgName,saveBtn,dialogName,fmNames,urlName,IdName){
		var row = $('#'+dgName).datagrid('getSelected');
		$('#'+fmNames).form('clear');
		if(row == null){
			MessageInfo.Alarm('警告',getChoiceEditor());
		}else{
			$('#'+saveBtn).removeAttr("disabled");
			Row_chassisName = row.chassisName;
			$('#'+dialogName).dialog('open').dialog('setTitle','修改');			
			$('#'+fmNames).form('load',row);
			url=urlName+row[IdName];
		}
	}
	//删除数据(数据字典)
	function deleteInfos(dgName,daleteName,IdName){
		var row = $('#'+dgName).datagrid('getSelected');
		if(row == null){
			MessageInfo.Alarm('警告',getChoiceDelete());
		}else{
			$.messager.confirm('信息确认',getSureDelete(),function(r){
				if(r){
					$.post(daleteName,{id:row[IdName]},function(result){
						if(result.code){
							$('#'+dgName).datagrid('reload');
						}else{							
							MessageInfo.Alarm('错误',getDataUsed());
						}
					},'json');
				}
			});
		}
	}
	
	//分页配置	
	function PageConfig(dgName){
		var options = $(dgName ).datagrid("getPager" ).data("pagination" ).options;
		var curr = options.pageNumber;
		var size = options.pageSize;	
		var p = $(dgName).datagrid('getPager');
		$(p).pagination({
			pageSize:size,  
			pageList:[5,10,20,30,50,80],
			beforePageText:'第',
			afterPageText:'页   共 {pages} 页',
			displayMsg:'当前显示 {from} - {to} 条记录    共 {total} 条记录'
		});	
	}
	
	
	//分页	
	function PageMode(dgName,urlName,pageNumname){			
		$("#"+dgName).datagrid({
			url:urlName,
			pageSize:pageNumname,
			pageNumber:1,
			pagination:true,
			rownumbers:true,
			striped : true,
			singleSelect:true
		});
		var p = $("#"+dgName).datagrid('getPager');
		$(p).pagination({
			pageSize:pageNumname,  //煤业显示的记录条数，默认为10
			pageList:[pageNumname*1,pageNumname*2,pageNumname*3],
			beforePageText:'第',
			afterPageText:'页   共 {pages} 页',
			displayMsg:'当前显示 {from} - {to} 条记录    共 {total} 条记录'
		});	
	}
	function WPageModeHeight(dgName,urlName,h){			
		$("#"+dgName).datagrid({
			url:urlName,					
			height:h			
		});		
	}	
	//分页(height)
	function PageModeHeight(dgName,urlName,h){			
		$("#"+dgName).datagrid({
			url:urlName,
			pageSize:10,
			pagination:true,
			height:h,
			rownumbers:true,
			striped : true,
			singleSelect:true
		});
		var p = $("#"+dgName).datagrid('getPager');
		$(p).pagination({
			pageSize:10,  
			pageList:[10,20,30,50,80],
			beforePageText:'第',
			afterPageText:'页   共 {pages} 页',
			displayMsg:'当前显示 {from} - {to} 条记录    共 {total} 条记录'
		});	
	}	
	//页面加载loading效果
	function IsLoaded(contentName){
		document.onreadystatechange = loadingChange;
	    function loadingChange(){   
	        if(document.readyState == "complete"){ //当页面加载状态为完全结束时进入                 
	        	$("#"+contentName).css("visibility","visible");
	        	$("#spinners").hide();//当页面加载完成后将loading页隐藏  	        
	        }   
	    }		
	}