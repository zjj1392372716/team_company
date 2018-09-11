$(function() {
	var str_password = $.cookie("upassword");
	var Data;
	if(str_password=="sinochem"){
		$('#divModifyPwd').dialog('open');		
		$('#newComfirmPwd').textbox('setValue', '');
		$('#newPwd').textbox('setValue', '');
		$('#oldPwd').textbox('setValue', '');
	}
	$.ajax({
		type : "post",
		url : "getByIdentity",
		data : {	},
		success : function(data) { 
			Data=data;
			console.log(data);
			if(data==new Object()){ //返回的对象是空对象
				var objhtml ='<div style="color:red;font-size:36px;">未关联身份，请联系管理人员!</div>';
					$(".row").append(objhtml);
			}
			for(i in data){
				if(i==4){
					
				}else{
					if(data[i].length!=0){
						var name="";
						var iconClass="";
						switch(parseInt(i)){
						   case 1:
							   name="单位管理员";
							   iconClass="../css/login/img/icon_guanliyuan.png";
							   break;
						   case 2:
							   iconClass="../css/login/img/icon_xinxiweihu.png";
							   name="信息维护员";
							   break;
						   case 3:
							   iconClass="../css/login/img/icon_caozuoyuan.png";
							   name="GIS操作员";
							   break;
						}

						var objhtml = '<div   class="col-lg-'+(12/data[4][0].RoleNumber)+' col-md-6 col-sm-12">'
						+'<div class="wrap" PersonId='+data[i][0].identityID+'>'
						+'<img  class="lbimg"   src='+iconClass+'  PersonId=' +data[i][0].identityID	
						+' /></div><span class="icon-name" >'+name+'</span></div>';
						$(".row").append(objhtml);	
					}	
				}
			}
			$(".wrap").click(function(e) {
				e.stopPropagation();// 阻止事件冒泡
				e.preventDefault();// 阻止事件捕获
				$.ajax({
					type : "post",
					url : "changeIdentity",
					data : {
						identityid : $(e.target).attr("PersonId"),
					},
					success : function(data) {
					
						if (data == "1") { //单位管理员
//							padding-top:64px->220px   wrap width: 100px; height: 100px;  -=>200px 200px
						   $(".content").animate({
							   'marginTop':'64px',
						   })
						    $(".wrap").animate({
								       'width': '100px',
                                       'height': '100px',
							 })
							 $(".lbimg").animate({
								 "marginTop":"15px",
							 })
							$(".ul-wrap .identityName-list").empty();
							InsertUl(Data[1]);
							$(".ul-wrap .identityName-list li").click(function(e){
								$.ajax({
									type : "post",
									url : "changeIdentity",
									data : {
										identityid : $(e.target).attr("PersonId"),
									},
									success:function(){
										console.log($(e.target).attr("PersonId"));
										window.location.href = "index";
									}
								})
								
							})
						
						}else if(data == "2"){//数据维护
							 $(".content").animate({
								   'marginTop':'64px',
							   })
							    $(".wrap").animate({
								       'width': '100px',
                                       'height': '100px',
							 })
							 $(".lbimg").animate({
								 "marginTop":"15px",
							 })
							$(".ul-wrap .identityName-list").empty();
							InsertUl(Data[2]);
							$(".ul-wrap .identityName-list li").click(function(e){
								$.ajax({
									type : "post",
									url : "changeIdentity",
									data : {
										identityid : $(e.target).attr("PersonId"),
									},
									success:function(){
										
										window.location.href = "../../Enterprise/showenterprisePage";
									}
								})
								
							})
						
						}else if(data == "3"){ //gis数据操作员
							 $(".content").animate({
								   'marginTop':'64px',
							   })
							    $(".wrap").animate({
								       'width': '100px',
                                       'height': '100px',
							 })
							 $(".lbimg").animate({
								 "marginTop":"15px",
							 })
							$(".ul-wrap .identityName-list").empty();
							InsertUl(Data[3]);
							$(".ul-wrap .identityName-list li").click(function(e){
								
								$.ajax({
									type : "post",
									url : "changeIdentity",
									data : {
										identityid : $(e.target).attr("PersonId"),
									},
									success:function(){
										window.location.href = "../../Gis/showGisPage";
									}
								})
								
							})
						}else {
							layer.alert(data, {
								icon : 2,
								skin : 'layer-ext-moon',
								shadeClose : true,
								title : '提示'
							})
						}
					}
				});
			})		
		}
	});	
});
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return decodeURI(r[2]); // decodeURI参数内容。
	return null; // 返回参数值
}
function changePwd() {
	var oldp = $('#oldPwd').textbox('getValue');
	var newp = $('#newPwd').textbox('getValue');
	var newc = $('#newComfirmPwd').textbox('getValue');
	if (oldp == null || oldp.length == 0) {
		layer.alert('原密码不能为空！', {
			icon : 2,
			skin : 'layer-ext-moon',
			shadeClose : true,
			title : '提示'
		})
		return;
	} else if (newp == null || newp.length == 0) {
		layer.alert('新密码不能为空！', {
			icon : 2,
			skin : 'layer-ext-moon',
			shadeClose : true,
			title : '提示'
		})
		return;
	} else if (newc == null || newc.length == 0) {
		layer.alert('确认密码不能为空！', {
			icon : 2,
			skin : 'layer-ext-moon',
			shadeClose : true,
			title : '提示'
		})
		return;
	} else if (newp != newc) {
		layer.alert('密码不一致，请重新输入！', {
			icon : 2,
			skin : 'layer-ext-moon',
			shadeClose : true,
			title : '提示'
		})
		return;
	}
	$('#modifyPwdForm').form('submit', {
		url : 'user/updateUserPassword',
		onSubmit : function(event) {
			var isValid = $(this).form('validate');
			if (!isValid){
				$.messager.progress('close');	
			}
			return isValid;	
		},
		success : function(result) {
			if (result == "成功") {
				$('#divModifyPwd').dialog('close');
				window.location.href = "login";
			} else {
				layer.alert("修改失败，"+result, {
					icon : 2,
					skin : 'layer-ext-moon',
					shadeClose : true,
					title : '提示'
				})				
			}
		}
	});
}

function InsertUl(Array){
	for(var i=0;i<Array.length;i++){
	   var li=document.createElement("li");
	   $(li).attr("PersonId",Array[i].identityID);
	   $(li).text(Array[i].OrganizationName+"-"+Array[i].roleName+"-"+Array[i].DataPermission);
	   $(".ul-wrap .identityName-list").append($(li));
	}
}

function InsertTable(Array){
	var ResultStr='<table class="table-striped" style="display:none;"><thead> <tr> <th>身份名</th><th>所属机构名</th><th>角色名</th><th>数据权限</th></tr></thead><tbody>';
	for(var i=0;i<Array.length;i++){
		ResultStr+='<tr><td>'
			+Array[i].identityName+'</td><td>'
			+Array[i].OrganizationName+'</td><td>'
			+Array[i].roleName+'</td><td>'
			+Array[i].DataPermission+
			'</td></tr>';
	}
	ResultStr+='</tbody></table>';
	return ResultStr;
}
