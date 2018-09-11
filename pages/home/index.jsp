<?xml version="1.0" encoding="UTF-8" ?>
<%@page import="java.time.LocalTime"%>
<%@page import="java.time.LocalDate"%>
<%    
    String path = request.getContextPath();
    HttpSession s = request.getSession();    
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/download/";
%>
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<title>中国中化集团有限公司-HSE应急数据系统</title>	       
     <!--本页面样式-->    
    <link rel="stylesheet" type="text/css" href="<%=path%>/js/easyui/themes/default/easyui.css" />    
    <link rel="stylesheet" type="text/css" href="<%=path %>/js/easyui/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="<%=path %>/js/easyui/demo/demo.css" />
    <link href="<%=path %>/css/icon.css" rel="stylesheet" type="text/css" />	
	<link rel="stylesheet" href="<%=path%>/css/basecommon/loadingstyle.css"/>
	<link rel="stylesheet" href="<%=path%>/css/home/def.css"/>
	<link rel="stylesheet" href="<%=path%>/css/home/index1.css"/>
	<link rel="stylesheet" href="<%=path%>/css/home/index2.css"/>	
	<link rel="stylesheet" href="<%=path%>/css/fitem.css"/>
	<script type="text/javascript" src="<%=path %>/js/viewModel/weather.js"></script>
	<script type="text/javascript" src="<%=path %>/js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="<%=path%>/js/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="<%=path%>/js/easyui/jquery.easyui.min.js"></script>		
	<script type="text/JavaScript" src="<%=path %>/js/easyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=path %>/js/viewModel/index.js"></script>	
	<script type="text/javascript" src="<%=path %>/js/pages/home/index.js"></script>
	<script type="text/javascript" src="<%=path %>/js/common/utils.js"></script>
	<script type="text/javascript" src="<%=path %>/js/common/baseCommon.js"></script>
	<script type="text/javascript"	src="<%=path%>/js/layui/lay/modules/layer.js"></script>
</head>  
<body class="easyui-layout" id="pagecontent" onload=display_ct() style="width: 100%; height: 100%;">	
		<NOSCRIPT>
			<DIV class="noscript">
				<IMG alt="" src="抱歉，请开启脚本支持！" />
			</DIV>
		</NOSCRIPT>
	 	<INPUT type="hidden"   name="basePath"  id="basePath"    value = '<%=basePath%>'/>
		<!--页面顶部-->
		<div data-options="region:'north'" id="frameTop" >
			<div class="logo"></div>
			<div>
				<span id="incident"></span>
			</div>	
			<div class="weather_icon">
				<div class="city_con"><span id="weatherCity" class="city"></span></div>				
				<div class="wtimg" id="T_weather_img"></div> 
				<!-- 系统时间 -->
				<span class="curtime" id="ct"></span>
				<div class="wt">
				 <span id="T_weather" class="marginRight"></span><br />
					<span id="T_temperature" class="marginRight"></span><br/>
					<span id="T_direction" class="marginRight"></span><br/>
					<span id="T_wind" ></span>			
					<!-- <iframe name="weather_inc" src="http://i.tianqi.com/index.php?c=code&id=1" width="330" height="35" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
			 -->	</div>							
			</div>			
		</div>		
		<!-- 页面底部--> 
		<div region="south"  style="height:35px;" class="page_footer">
					<!-- <div id="times"  class="company pagefooter_com">©2011-2018 天津同丰信息技术有限公司  服务热线:022-25325080</div> -->
					<div>
					<a href="javascript:void(0)" class="easyui-menubutton" 
							data-options="menu:'#mm_user',iconCls:'icon-user'" style="margin-top: 6px;float:right;color:black;font-weight:bold;">
							登录者:<%=s.getAttribute("loginName")%>							
					</a> 
					</div>
		</div>					
		<div region="west" split="true" title="导航菜单" style="width:180px;height:400px;" id="west">
			<div id="wnav"></div>
		</div>
		<!--页面中心内容-->
		<div region="center" id="mainPanle" style="background:#eee;overflow:hidden">
			<!-- 选项卡右键事件--> 
			<div id="tabcontextmenu" class="easyui-menu hide" style="width:150px;">
			    <div id="refresh">刷新</div>
			    <div class="menu-sep"></div>
			    <div id="close">关闭</div>
			    <div id="closeall">全部关闭</div>
			    <div id="closeother">除此之外全部关闭</div>
			    <div class="menu-sep"></div>
			    <div id="closeright">关闭右侧标签</div>
			    <div id="closeleft">关闭左侧标签</div>	
		    </div>
			<!-- 当用户鼠标移动到“当前用户时”，便会弹出一个下来框，显示修改密码和安全退出两个功能 -->
			<div id="mm_user" style="width:158px;">		
		    	<DIV data-options="iconCls:'icon-add'" class="changeIdentity">切换身份</DIV>
		    	<DIV class="menu-sep"></DIV>
				<DIV data-options="iconCls:'icon-edit'" class="changePassword">修改密码</DIV>
				<DIV class="menu-sep"></DIV>
				<DIV data-options="iconCls:'icon-user_go'" class="loginOut">安全退出</DIV>
			</div>			
			<!-- 修改密码得模板 -->
			<DIV id="divModifyPwd" class="easyui-dialog" title="修改密码" modal="true" closed="true"
				 style="display:none;width:300px;height:230px;padding:10px 10px;" buttons="#dlg-buttons">		
				<FORM method="post" id="modifyPwdForm">			
					<DIV class="fitem">
						<LABEL><p class="symbols floatLeft">*</p>登录名称：</LABEL>
						<INPUT name="loginName" class="easyui-textbox" disabled value='<%=s.getAttribute("loginName")%>' />
						<INPUT type="hidden"   name="loginName"  value = '<%=s.getAttribute("loginName")%>'/>
					</DIV>
					<DIV class="fitem">
						<LABEL><p class="symbols floatLeft">*</p>原密码：</LABEL>
						<INPUT name="oldPwd" class="easyui-textbox" id="oldPwd"/>
					</DIV>
					<DIV class="fitem">
						<LABEL><p class="symbols floatLeft">*</p>新密码：</LABEL>
						<INPUT name="newPwd" id="newPwd" class="easyui-passwordbox" data-options="prompt:'请输入新的密码'"/>
					</DIV>
					<DIV class="fitem">
						<LABEL><p class="symbols floatLeft">*</p>确认密码：</LABEL>
						<INPUT name="newComfirmPwd" class="easyui-passwordbox" id="newComfirmPwd" data-options="prompt:'再次输入新密码'" />
					</DIV>
					<DIV class="clear"></DIV>
				</FORM>
			</DIV>
			<div id="dlg-buttons" style="display:none;">
				<a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="changePwd()" style="width:90px">确定</a>
				<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#divModifyPwd').dialog('close')" style="width:90px;">取消</a>
			</div>			
			<!--选项卡-->
			<div id="tabs" class="easyui-tabs" fit="true" border="false">
				<div title="主页"><!-- 主页 -->							
				<div class="container">				    
					
				</div>																	 				 
			  </div><!-- 主页 -->
			</div>	
		</div>	
</body>
</html>