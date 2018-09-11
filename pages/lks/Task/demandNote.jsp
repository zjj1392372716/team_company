<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<jsp:include page="/Pages/common/CommomRef.jsp" />
	<jsp:include page="/Pages/common/Application.jsp"></jsp:include>
	<script type="text/javascript" src="<%=path %>/js/pages/lks/product/demandNote.js"></script>
	<script type="text/javascript" src="<%=path%>/js/common/datagrid.js"></script>
	<script type="text/javascript" src="<%=path %>/js/common/file/uploadImage.js"></script>
	<link rel="stylesheet" href="<%=path %>/css/lks/demandNote.css" />
	<link rel="stylesheet" href="<%=path %>/css/basecommon/file/uploadImage.css" />
	<title>客户需求单管理页面</title>
	<style type="text/css">
		#queryRegion {
			display:flex;
			height: 60px;
			align-items:center;
			border:1px solid red;
		}
		#search{
			margin-left: 30px;
		}
		#search button {
			background-color: rgb(92, 172, 238);
			width:80px;
			height:30px;
			cursor:pointer;
			border:none;
			color:white;
			padding:5px 5px;
			text-align: center;
			font-size: 14px;
			opacity: 1;
			transition:0.3s;
		}
		#search button:hover {
			opacity: 0.6;
		}
		
	</style>
</head>
<body>
	<div class="easyui-layout" style="width:100%;">
		<div class='tf-toolbar' id="toolbar"></div>
		<div id="queryRegion">
			<div id="orderNumber">
				<span>客户需求单号:</span>
				<input class="easyui-textbox" id="orderNumberI" />
			</div>
			<div id="serialNumber">
				<span>追踪单号:</span>
				<input class="easyui-textbox" id="traceNumber" />
			</div>
			<div id="orderDate">
				<span>需求单日期:</span>
				<input id="dd" type="text" class="easyui-datebox" />
			</div>		
			<div id="customerInfo">
				<span>客户基地:</span>
				<input class="easyui-combotree" id="customer" />
			</div>	
			<div id="orgInfo">
				<span>雷克斯单位:</span>
				<input id="org" class="easyui-combotree" />
			</div>
			<div id="state">
				<span>状态:</span>
				<input id="demandState" class="easyui-combotree" />
			</div>
			<div id="search">
				<button id="btnQuery" onclick="query()">查询</button>
				<button id="btnClear" onclick="clearQuery()">清空</button>
			</div>
		</div>
		<div id="dateGrid">
			<table id="dgDemand" class="easyui-datagrid" style="width:100%">
				<thead>
					<tr>
						<th data-options="field:'operate'" width="5%">操作</th>
						<th data-options="field:'demandNumber'" width="10%">客户需求单号</th>
						<th data-options="field:'traceNumber'" width="10%">追踪单号</th>
						<th data-options="field:'demandDate'" width="10%">需求单日期</th>
						<th data-options="field:'demandState'" width="5%">状态</th>
						<th data-options="field:'customerName'" width="15%">客户基地</th>
						<th data-options="field:'linkMan'" width="15%">客户联系人</th>
						<th data-options="field:'orgName'" width="15%">雷克斯单位</th>
						<th data-options="field:'orgLinkMan'" width="15%">雷克斯联系人</th>
						<th data-options="field:'description'" width="25%">描述</th>
						<th data-options="field:'creator'" width="10%">创建者</th>
						<th data-options="field:'createTime'" width="15%">创建时间</th>
						<th data-options="field:'updator'" width="10%">更新者</th>
						<th data-options="field:'updateTime'" width="15%">更新时间</th>
					</tr>
				</thead>
			</table>
		</div>
		<div id="stepWizard" class="easyui-dialog">
			<div id="previewImage" class="modal">
				<div class="modal-content">
					<div class="modal-header">
						<span class="close-button">&times;</span>
						<span>上传图片</span>
					</div>
					<div class="gallery" id="gallery">
						<div class="image-upload subInlineBlock">
							<label for="file-input">
								<img alt="上传图片" src="../images/uploadImage/upload.png">
							</label>
							<input id="file-input" type="file" multiple accept="image/*" onchange="handleFiles(this.files)" />
						</div>
					</div>
				</div>
			</div>
			<div id="stepContent">
				<div id="stepInfo">
					<img alt="操作步骤" src="../css/icon/lks/firstStep1.png" id="headerImag" />
				</div>
				<div id="navigateBar">
					<div id="info">
						<span>操作向导</span>
					</div>
					
					<div id="contentInfo" class="contentInfo">
						<div id="baseInfo" class="baseInfo">
							<span>基本信息</span>
							<div id="firstLine" class="firstLine">
								<span><b class="redX">*</b>追踪单号</span>
								<input type="text" placeholder="请输入追踪单号" id="ntraceNumber" />
								<span id="secondColumn" style="margin-left:200px;"><b class="redX">*</b>需求单日期</span>
								<input type="date" id="demandDate" />
							</div>
							<div id="secondLine" class="firstLine secondLine">
								<div style="width:100px;text-align: right;display:inline-block;vertical-align: top;">
									<span>描述</span>
								</div>
								
								<textarea rows="5" cols="100" id="description"
									placeholder="请在此处输入描述信息"></textarea>
		 					</div>
						</div>
						
	 					<div id="unitInfo" class="unitInfo">
							<div id="customerInfof" class="customerInfof">
								<span>客户信息</span>
								<div class="cInfo">
									<div class="tipInfo">
										<span><b class="redX">*</b>客户基地</span>
									</div>
									<!-- <select class="selectCls" id="customerStation"></select> -->
									<select id="customerStation" class="easyui-combotree" style="width:200px;margin-top:0px;">
										
									</select>
									<br />
									<div class="tipInfo">
										<span><b class="redX">*</b>联系人</span>
									</div>
									<select id="linkManCustomer" class="easyui-combobox" style="width:200px;margin-top:0px;">
										
									</select>
									<!-- <select class="selectCls" id="linkManCustomer"></select> -->
									<br />
									<div class="tipInfo">
										<span>邮箱</span>
									</div>
									<input type="text" class="ctextbox" disabled="disabled"  id="customerEmail" />
									<br />
									<div class="tipInfo">
										<span>联系方式</span>
									</div>
									<input type="text" class="ctextbox" disabled="disabled" id="customerPhoneNumber" />
								</div>
							</div>
						</div>
						<div id="orgInfof" class="orgInfof">
							<span>雷克斯信息</span>
							<div class="cInfo">
								<div class="tipInfo">
									<span><b class="redX">*</b>雷克斯单位</span>
								</div>
								<select id="lksStation" class="easyui-combotree" style="width:200px;margin-top:0px;">
										
								</select>
								<br />
								<div class="tipInfo">
									<span><b class="redX">*</b>联系人</span>
								</div>
								<select id="linkManlks" class="easyui-combobox" style="width:200px;margin-top:0px;">
										
								</select>
								<br />
								<div class="tipInfo">
									<span>邮箱</span>	
								</div>
								<input type="text" class="ctextbox" disabled="disabled"  id="lksEmail" />
								<br />
								<div class="tipInfo">
									<span>联系方式</span>
								</div>
								<input type="text" class="ctextbox" disabled="disabled" id="lksPhoneNumber" />
							</div>
						</div>
					</div>
					<div id="secondStep" class="secondStep">
						<div id="processPartInfo" class="ppInfo">
							<span>加工件信息</span>
							<button id = "btnSzve" onclick="append()">添加</button>
							<button id = "btnDelete" onclick="removeIt()">删除</button>
						</div>
						<div class="dgSN">
							<table class="easyui-datagrid" id="dgSn" style="height:600px;">
								<thead>
									<tr>
										<th data-options="field:'snimage',formatter:function(value,row){
																				return '<a onclick=uploadImage()>[上传图片]</a>';
																			}" width="10%">图片</th>
										<th data-options="field:'id',
														  formatter:function(value,row){
														  	return row.text;
														  },editor:{
														  	type:'combotree',
														  	options:{
														  		valueField:'id',
														  		textField:'text',
														  		method:'get',
														  		url:'../Drawing/getAllJsonDraw',
														  		required:true,
														  		onSelect:function(record){
														  			var selectedrow = $('#dgSn').datagrid('getSelected');
														  			var rowIndex = $('#dgSn').datagrid('getRowIndex',selectedrow);
														  			var ed = $('#dgSn').datagrid('getEditor',{index:rowIndex,field:'version'});
														  			$(ed.target).textbox('setValue',record.version);
														  			var isCatalog = record.isCatalog;
														  			var edCatalog = $('#dgSn').datagrid('getEditor',{index:rowIndex,field:'isCatalog'});
														  			$(edCatalog.target).textbox('setValue',isCatalog==true?'是':'否');
														  			var edPrice = $('#dgSn').datagrid('getEditor',{index:rowIndex,field:'nuitPrice'});
														  			if(isCatalog){
														  				$(edPrice.target).numberbox('setValue',record.catalogPrice);
														  			}else{
														  				$(edPrice.target).numberbox('setValue','');
														  			}
														  		}
														  	}
														  }" width="12%">图纸编号</th>
										<th data-options="field:'version',editor:{
																		type:'textbox',
																		options:{
																			readonly:true,
																			disabled:true
																		}}" width="8%">版本</th>
										<th data-options="field:'lksSN',editor:{
																			type:'textbox',
																			options:{
																				onChange:function(newValue,oldValue){
																					console.log(newValue);
																					var selectedrow = $('#dgSn').datagrid('getSelected');
																		  			var rowIndex = $('#dgSn').datagrid('getRowIndex',selectedrow);
																		  			var ed = $('#dgSn').datagrid('getEditor',{index:rowIndex,field:'wbSN'});
																		  			$(ed.target).textbox('setValue',newValue);
																				}
																			}
																		}" width="12%">内部序列号</th>
										<th data-options="field:'wbSN',editor:'textbox'" width="12%">客户序列号</th>
										<th data-options="field:'isCatalog',editor:{
																				type:'textbox',
																				options:{
																					readonly:true,
																					disabled:true
																				}
																			}" width="5%">协议</th>
										<th data-options="field:'nuitPrice',editor:'numberbox'" width="10%">单价</th>
										<th data-options="field:'amount',editor:'numberbox'" width="8%">数量</th>
										<th data-options="field:'description',editor:'textbox'" width="15%">需求描述</th>
										<th data-options="field:'expectedDate',editor:{
																					type:'datebox',
																					options:{
																						required:true,
																						formatter:function(date){
																							if(date==undefined) return '';
																							var year = date.getFullYear();
																							var m = date.getMonth() + 1;
																							var d = date.getDate();
																							return year + '-' + (m<10?('0'+m):m) + '-' + (d<10?('0'+d):d);
																							
																							//dateFormatter(date);
																						},
																						parser:function(s){
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
																							//dateParser(s);
																						}
																					}
																				}" width="10%">期望交期</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
					<div id="thirdStep" class="thirdStep">
						<div id="sBaseInfo" class="baseInfo">
							<span>基本信息</span>
							<div id="sfirstLine" class="firstLine">
								<span><b class="redX">*</b>追踪单号</span>
								<input type="text" placeholder="请输入追踪单号" id="sntraceNumber" disabled="disabled" />
								<span id="ssecondColumn" style="margin-left:200px;"><b class="redX">*</b>需求单日期</span>
								<input type="text" id="sdate" disabled="disabled" />
							</div>
							<div id="ssecondLine" class="secondLine">
								<div style="width:100px;text-align: right;display:inline-block;vertical-align: top;">
									<span>描述</span>
								</div>
								
								<textarea rows="5" cols="100" id="sdescription" disabled="disabled"
									placeholder="请在此处输入描述信息"></textarea>
		 					</div>
						</div>
						<div id="sunitInfo" class="unitInfo sunitInfo">
							<div id="scustomerInfof" class="customerInfof scustomerInfof">
								<span>客户信息</span>
								<div class="cInfo">
									<div class="ctipInfo">
										<span><b class="redX">*</b>客户基地</span>
									</div>
									<!-- <select class="selectCls" id="customerStation"></select> -->
									<select id="scustomerStation" disabled=true class="easyui-combotree" style="width:200px;margin-top:0px;">
									</select>
									<br />
									<div class="ctipInfo">
										<span><b class="redX">*</b>联系人</span>
									</div>
									<select id="slinkManCustomer" disabled=true class="easyui-combobox" style="width:200px;margin-top:0px;">
									</select>
									<!-- <select class="selectCls" id="linkManCustomer"></select> -->
									<br />
									<div class="ctipInfo">
										<span>邮箱</span>
									</div>
									<input type="text" class="ctextbox" disabled="disabled"  id="scustomerEmail" />
									<br />
									<div class="ctipInfo">
										<span>联系方式</span>
									</div>
									<input type="text" class="ctextbox" disabled="disabled" id="scustomerPhoneNumber" />
								</div>
							</div>
						</div>
						<div id="sorgInfof" class="orgInfof sunitInfo">
							<span>雷克斯信息</span>
							<div class="cInfo">
								<div class="ctipInfo">
									<span><b class="redX">*</b>雷克斯单位</span>
								</div>
								<select id="slksStation" disabled=true class="easyui-combotree" style="width:200px;margin-top:0px;">
								</select>
								<br />
								<div class="ctipInfo">
									<span><b class="redX">*</b>联系人</span>
								</div>
								<select id="slinkManlks" disabled=true class="easyui-combobox" style="width:200px;margin-top:0px;">
								</select>
								<br />
								<div class="ctipInfo">
									<span>邮箱</span>	
								</div>
								<input type="text" class="ctextbox" disabled="disabled"  id="slksEmail" />
								<br />
								<div class="ctipInfo">
									<span>联系方式</span>
								</div>
								<input type="text" class="ctextbox" disabled="disabled" id="slksPhoneNumber" />
							</div>
						</div>
						<div class="ppInfo sppInfo">
							<div id="s_processPartInfo" class="ppInfo">
								<span>加工件信息</span>
							</div>
							<div class="s_dgSN" style="overflow-x:auto; overflow-y:auto;">
								<table class="easyui-datagrid" id="s_dgSn">
									<thead>
										<tr>
											<th data-options="field:'snimage',formatter:function(value,row){
																					return '<a>[上传图片]</a>';
																				}" width="10%">图片</th>
											<th data-options="field:'id'" width="12%">部件编号</th>
											<th data-options="field:'version'" width="8%">版本</th>
											<th data-options="field:'lksSN'" width="12%">内部序列号</th>
											<th data-options="field:'wbSN'" width="12%">客户序列号</th>
											<th data-options="field:'isCatalog'" width="5%">orNot</th>
											<th data-options="field:'nuitPrice'" width="8%">单价</th>
											<th data-options="field:'amount'" width="8%">数量</th>
											<th data-options="field:'description'" width="15%">需求描述</th>
											<th data-options="field:'expectedDate'" width="10%">期望交期</th>
										</tr>
									</thead>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div id="hoNavigateBar">
					<br />
					<span id="navBarInfo"><b>1.</b>填写客户需求单基本信息，点击【下一步】；
						若需暂存，则点击【暂存】先保存。</span>
				</div>
			</div>
		</div>
	</div>
</body>
</html>