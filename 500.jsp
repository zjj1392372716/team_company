<%@page import="java.io.PrintStream"%>  
<%@page import="java.io.ByteArrayOutputStream"%> 
<%@ page language="java" contentType="text/html; charset=UTF-8"  
    pageEncoding="UTF-8" isErrorPage="true"%>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>500服务器内部错误</title>  
</head>  
<body>  
 <div class="ui-alert-panel">  
        <h1>服务器内部错误</h1>  
        <p>处理您的请求时发生错误！您发送请求中的参数中含有非法字符。</p>  
    </div>  
  <div style="display:none;">  
  
<%--   <%  //此处输出异常信息  
      exception.printStackTrace();  
  
      ByteArrayOutputStream ostr = new ByteArrayOutputStream();  
      exception.printStackTrace(new PrintStream(ostr));  
      out.print(ostr);  
  %>   --%>
  </div> 
  <script type="text/javascript">
  	Ext.Ajax.on("requestexception",function(conn,response,options){
  		if(response.status==500){
  			window.location="500.jsp";
  		}
  	})
  </script> 
</body>  
</html>