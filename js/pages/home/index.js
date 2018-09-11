function display_c(){
	var refresh=1000; // Refresh rate in milli seconds
	mytime=setTimeout('display_ct()',refresh)
}	
function display_ct() {
	var strcount;
	var x = new Date();			
	var x1= x.getFullYear() + "年" + (x.getMonth()+1) + "月" + x.getDate() + "日"; 
	x1 = x1 + " " + compare(x.getHours( ))+ ":" +compare( x.getMinutes() )+ ":" + compare(x.getSeconds());
	document.getElementById('ct').innerHTML = x1;
	tt=display_c();
}
function AddSubPage(title,url,icon){                
    var jq = top.jQuery;            
    if (jq("#tabs").tabs('exists', title)){    
        jq("#tabs").tabs('select', title);    
    } else {  
          var content = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';     
           jq("#tabs").tabs('add',{    
                      title:title,    
                      content:content,    
                      closable:true,      
                      icon:icon
             });    
     }    
};
function compare(times){
	return times < 10 ? '0' + times : times;
}
function  webpageJump(title){
	var result=false;
	$.ajax({
		type : "get",
		async: false,
		url : "menu/getMenuByUserID",		
		success : function(data) {			
			var length=JSON.parse(data).rows.length;
			for(var i=0;i<length;i++){
				if(JSON.parse(data).rows[i].menu_name==title){
					result=true;
					break;
				}
			}
		}
	});
	return result;
}
//创建天气预报核心对象
var weather_ = new weather();
var city = "";
$(document).ready(function(){		 	
	$.getScript($("#basePath").val().split(":")[0]+'://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',function(){
	city=remote_ip_info.city;
	jintian(city);
	display_c();	
	/*$("#times").html("©2011-"+ new Date().getFullYear()+" 天津同丰信息技术有限公司  服务热线:022-25325080");*/
	$(".city").html(remote_ip_info.city);
	})	
	document.cookie="name="+"false";	
	$('#salesOrder').click(function(){		
		if(webpageJump("生产计划")){
			AddSubPage("生产计划","/sales/showSalesOrderPage","icon-salesOrder");	
		}else{
			layer.alert('您没有生产计划权限！', {
				icon : 2,
				skin : 'layer-ext-moon',
				shadeClose : true,
				title : '提示'
			})
		}
	});
	$('#Inspectionrecord').click(function(){	
		if(webpageJump("工单质检报告单")){
			AddSubPage("工单质检报告单","/quality/productionOrderTestanalysisreport","icon-qt1");	
		}else{
			layer.alert('您没有原始记录单权限！', {
				icon : 2,
				skin : 'layer-ext-moon',
				shadeClose : true,
				title : '提示'
			})
		}
	});
	$('#production').click(function(){	
		if(webpageJump("工单管理")){
			AddSubPage("工单管理","/workOrder/showWorkOrder","icon-production");	
		}else{
			layer.alert('您没有工单管理权限！', {
				icon : 2,
				skin : 'layer-ext-moon',
				shadeClose : true,
				title : '提示'
			})
		}
	});
	$('#godownentry').click(function(){				
		if(webpageJump("入库管理")){
			AddSubPage("入库管理","/godownEntry/showGodownEntry","icon-godownentry");	
		}else{
			layer.alert('您没有入库管理权限！', {
				icon : 2,
				skin : 'layer-ext-moon',
				shadeClose : true,
				title : '提示'
			})
		}
	});
	
	$('#delivery').click(function(){				
		if(webpageJump("出库管理")){
			AddSubPage("出库管理","/proddeliveryOrder/showDeliveryOrder","icon-delivery");	
		}else{
			layer.alert('您没有出库管理权限！', {
				icon : 2,
				skin : 'layer-ext-moon',
				shadeClose : true,
				title : '提示'
			})
		}
	});
	$('#logistics').click(function(){			
		if(webpageJump("物流查询")){
			AddSubPage("物流查询","/logistics/showLogisticsPage","icon-layer");	
		}else{
			layer.alert('您没有物流查询权限！', {
				icon : 2,
				skin : 'layer-ext-moon',
				shadeClose : true,
				title : '提示'
			})
		}		
	});
	
	$('#trace').click(function(){			
		if(webpageJump("追溯")){
			AddSubPage("追溯","/traceAbility/showTraceAbility","icon-systemMange_8");	
		}else{
			layer.alert('您没有追溯权限！', {
				icon : 2,
				skin : 'layer-ext-moon',
				shadeClose : true,
				title : '提示'
			})
		}		
	});
	
	
	if($('#tt').tabs().size()>0){
		var tabs = $('#tt').tabs().tabs('tabs');
		for(var i=0; i<tabs.length; i++){
			tabs[i].panel('options').tab.unbind().bind('mouseenter',{index:i},function(e){
				$('#tt').tabs('select', e.data.index);
			});
		}
	}		
});