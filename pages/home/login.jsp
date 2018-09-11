<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@page import="com.TonFun.Base.util.Tools"%>
	<%
     String path = request.getContextPath();
	 String clientIp = Tools.getLocalIp(request);	 
	 String hostName= Tools.getHostName(request);	 
	 String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%-- <%@ taglib prefix="s" uri="/struts-tags"%> --%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>雷克斯企业生产管理平台</title>
<link rel="stylesheet" type="text/css" href="<%=path%>/js/easyui/themes/default/easyui.css" />    
<link rel="stylesheet" type="text/css" href="<%=path %>/js/easyui/themes/icon.css" />
<link rel="stylesheet" type="text/css" href="<%=path %>/js/easyui/demo/demo.css" />
<link rel="stylesheet" href="<%=path %>/css/login/bootstrap.css"/>
<link rel="stylesheet" href="<%=path %>/css/swiper-3.4.0.min.css" />
<link rel="stylesheet" href="<%=path %>/css/login/login.css"/>
<script type="text/javascript" src="<%=path %>/js/common/messageshow.js"></script>
<script type="text/javascript" src="<%=path %>/js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="<%=path%>/js/easyui/jquery.min.js"></script>
<script type="text/javascript" src="<%=path%>/js/easyui/jquery.easyui.min.js"></script>		
<script type="text/JavaScript" src="<%=path %>/js/easyui/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/baseCommon.js"></script>
<script type="text/javascript" src="<%=path %>/js/pages/login/loginPage.js" > </script>
<script type="text/javascript"	src="<%=path%>/js/jquery.cookie.js">	</script>
<script type="text/javascript"	src="<%=path%>/js/layui/layui.js"></script>
</head>
<body style="overflow:-Scroll;overflow-x:hidden"  >
	<center>
		<div id="box"><!--box-->
			<div class="logo">
			   <img class="logo_pic" src="images/login/logo.png"/>
				<p class="logo_letter">雷克斯企业生产管理平台</p>				
			</div>
			<div class="main">
				<div class="main_1">
					<div class="slide_fir">
						<div class="swiper-container">
				    		<div class="swiper-wrapper">
								      
						    </div>						
						</div>						
					<!--右侧输入框部分-->
					<div class="main_right">
						<p class="rig_tit">用户登录</p>
						<div class="main_rightCon"><!--main_rightCon-->
							<div class="container">
								<div class="row">
									<div class="col-lg-6 col-md-7 col-sm-9">
										<h4>
											<i class="glyphicon glyphicon-user"  style="height:0px"></i>
										</h4>
										<div style="padding: 10px;" id="form-olvidado">																														
													<div class="form-group input-group">
															<span class="input-group-addon"> <i class="glyphicon glyphiconusers"></i>
															</span>
															<input placeholder="请输入登录名称" class="loginName"  id="loginName"   name="loginName"   value=""></input>
													</div>
													<INPUT type="hidden"   name="basePath"  id="basePath"    value = '<%=basePath%>'/>
													<input type="hidden"  id="hostIP"  name="hostIP"  value="<%=clientIp%>"/>
													<input type="hidden"  id="hostName"  name="hostName"  value="<%=hostName%>"/>
													<div class="form-group input-group">
															<span class="input-group-addon"> <i
																class="glyphicon glyphiconLock"> </i>
															</span>
															<input id="userPassword" name="userPassword"  placeholder="请输入密码"    class="loginName easyui-validatebox"     type="password" value=""/>
													</div>
													<div class="form-group input-group">														
															<span class="letterCheck input-group-addon"><i
																class="glyphicon glyphiconRefresh"></i></span><div class="picCheck">
																<input placeholder="请输入验证码" class="picCheck"  name="vrifyCode"  id="vrifyCode"  value=""></input></div>
															<!--若要点击图片刷新，重新得到一个验证码，要在后面加上个随机数，这样保证每次提交过去的都是不一样的path，防止因为缓存而使图片不刷新-->
														<div class="numcheck">
																<img src="defaultKaptcha"
																onclick="this.src='defaultKaptcha?'+ Math.random()"
																title="点击图片刷新验证码" /><br> 
														</div>
													</div>	
													<div class="form-group submitBtn">
														<button onclick="login()" class="btn easyui-linkbutton  btn-primary btn-block">
															登录</button>
													</div>	
										</div>
									</div>
								</div>
							</div>
						</div><!--mian_rightCon-->
					</div>
				</div>
			</div>
			<div class="footer">
				<div class="company"><span id="times"  class="times">©2011-2099</span><div class="company_letter">天津同丰信息技术有限公司 电话:022-25325080</div></div>	
				</div>			
			</div>			
		</div><!--box-->
	</center>		
	</body>
</html>