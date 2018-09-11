//定义主页对象
var HomePage = {};

/*
 * 属性
 */
// 全屏显示标志
HomePage.IsFullScreen = false;
HomePage.HomeSubTab;
HomePage.MenuInfo;

HomePage.User = {
	UserCode : null,
	UserName : null
};

// 定义主页设置属性
HomePage.PageConfig = {
	strHomeTabTitle : '主页',
	strHomeTabUrl : '',
	nMaxTabCount : 10
};
// 初始化主页
HomePage.Init = function() {
	$.post("/menu/getMenuByUserID", function(data) {
		if(data.indexOf("layer.alert")>-1){
			layer.alert('您没有任何权限！请联系管理员。', {
				icon : 2,
				skin : 'layer-ext-moon',
				shadeClose : true,
				title : '提示'
			})
		}else{
			HomePage.InitMenu(data);
		}		
	});
	// 设置安全退出得click响应事件
	$('.loginOut').click(HomePage.OnLogout);
	// 设置修改密码得click响应事件
	$('.changeIdentity').click(HomePage.OnChangeIdentity);	
	$('.changePassword').click(HomePage.OnChangePassword);
	$('#tabcontextmenu').menu({
		onClick : HomePage.OnTabContextMenu
	});
	$('#tabs').tabs({
		tools : [ {
			iconCls : 'icon-exclamation',
			handler : HomePage.FillScreen
		} // 全屏
		],
		onContextMenu : HomePage.OnTabHeadRButtonDown
	// 右键事件
	});
	// 设置首页选项卡
	HomePage.HomeSubTab = $('#tabs').tabs('getTab',
			HomePage.PageConfig.strHomeTabTitle);
}
/**
 * ========================================================================================
 * 函数名: OnTabHeadRButtonDown 描 述: <summary>鼠标右键点击选项卡头的响应函数</summary> 参 数:
 * <param>e - 事件对象</param> <param>title - 子选项卡标题</param> 返回值: <returns></returns>
 * 说 明: <remarks>当鼠标右键点击一个选项卡头时触发</remarks>
 * =======================================================================================
 */
HomePage.OnTabHeadRButtonDown = function(e, title) {
	// 显示选项卡上下文弹出菜单
	$('#tabcontextmenu').menu('show', {
		left : e.pageX,
		top : e.pageY
	});
	// 选择标题为 title 的选项卡面板
	$('#tabs').tabs('select', title);

	e.preventDefault();
};
/**
 * ========================================================================================
 * 函数名: OnTabContextMenu 描 述: <summary>选项卡头部的上下文菜单的响应函数</summary> 参 数:
 * <param>item - 菜单项</param> 返回值: <returns></returns> 说 明:
 * <remarks>当点击某一个上下文菜单时触发</remarks>
 * =======================================================================================
 */
HomePage.OnTabContextMenu = function(item) {
	var $oTabs = HomePage.GetTabObject();

	switch (item.id) {
	case "refresh":
		HomePage.OnRefreshSubTab($oTabs);
		break;

	case "close":
		HomePage.OnCloseSubTab($oTabs);
		break;

	case "closeall":
		HomePage.OnCloseAllSubTab($oTabs);
		break;

	case "closeother":
		HomePage.OnCloseOtherSubTab($oTabs);
		break;

	case "closeright":
		HomePage.OnCloseRightSubTab($oTabs);
		break;

	case "closeleft":
		HomePage.OnCloseLeftSubTab($oTabs);
		break;
	}
};
/**
 * ========================================================================================
 * 函数名: GetIFrameSrc 描 述: <summary>获取指定选项卡面板包含的 iframe 对象的内容的 URL</summary> 参
 * 数: <param>oTab - 指定的选项卡面板</param> 返回值: <returns></returns> 说 明: <remarks></remarks>
 * =======================================================================================
 */
HomePage.GetIFrameSrc = function(oTab) {
	var oIFrame = oTab.find('iframe');

	if (oIFrame.length) {
		return oIFrame[0].src.replace(location.host, '').replace('http://', '')
				.replace('.jsp', '');
	} else {
		return ""
	}
};
/**
 * ========================================================================================
 * 函数名: GetAllTabTitle 描 述: <summary>获取所有选项卡面板标题</summary> 参 数: <param>$oTabs -
 * 选项卡对象</param> 返回值: <returns>所有选项卡面板标题字符串数组</returns> 说 明: <remarks></remarks>
 * =======================================================================================
 */
HomePage.GetAllTabTitle = function($oTabs) {
	var aTitles = [];
	var aTabs = HomePage.GetAllTabs($oTabs);

	$.each(aTabs, function() {
		aTitles.push(HomePage.GetTabTitle($(this)));
	});

	return aTitles;
};
/**
 * ========================================================================================
 * 函数名: OnCloseOtherSubTab 描 述: <summary>关闭除当前选项卡面板外的所有面板</summary> 参 数:
 * <param>$oTabs - 选项卡对象</param> 返回值: <returns></returns> 说 明: <remarks></remarks>
 * =======================================================================================
 */
HomePage.OnCloseOtherSubTab = function($oTabs) {
	var aTitles = HomePage.GetAllTabTitle($oTabs);
	var strCurTitle = HomePage.GetCurTabTitle($oTabs);

	$.each(aTitles, function() {
		if ((this != strCurTitle)
				&& (this != HomePage.PageConfig.strHomeTabTitle)) {
			$oTabs.tabs('close', this);
		}
	});
}
/**
 * ========================================================================================
 * 函数名: OnCloseRightSubTab 描 述: <summary>关闭当前选项卡面板右边的所有面板</summary> 参 数:
 * <param>$oTabs - 选项卡对象</param> 返回值: <returns></returns> 说 明: <remarks></remarks>
 * =======================================================================================
 */
HomePage.OnCloseRightSubTab = function($oTabs) {
	var nCurIndex = HomePage.GetCurTabIndex($oTabs);
	var aTitles = HomePage.GetAllTabTitle($oTabs);
	var i = aTitles.length - 1;

	while (nCurIndex < i) {
		$oTabs.tabs('close', aTitles[i--]);
	}
}
/**
 * ========================================================================================
 * 函数名: GetCurTabIndex 描 述: <summary>获取当前选项卡面板的索引</summary> 参 数: <param>$oTabs -
 * 选项卡对象</param> 返回值: <returns>当前选项卡面板的索引值</returns> 说 明: <remarks></remarks>
 * =======================================================================================
 */
HomePage.GetCurTabIndex = function($oTabs) {
	return HomePage.GetTabIndex($oTabs, HomePage.GetCurTab($oTabs));
}
/**
 * ========================================================================================
 * 函数名: GetTabIndex 描 述: <summary>获取指定选项卡面板的索引</summary> 参 数: <param>$oTabs -
 * 选项卡对象</param> <param>oTab - 指定选项卡面板</param> 返回值: <returns>指定选项卡面板的索引值</returns>
 * 说 明: <remarks></remarks>
 * =======================================================================================
 */
HomePage.GetTabIndex = function($oTabs, oTab) {
	return $oTabs.tabs('getTabIndex', oTab);
}
/**
 * ========================================================================================
 * 函数名: OnCloseLeftSubTab 描 述: <summary>关闭当前选项卡面板左边的所有面板</summary> 参 数:
 * <param>$oTabs - 选项卡对象</param> 返回值: <returns></returns> 说 明: <remarks></remarks>
 * =======================================================================================
 */
HomePage.OnCloseLeftSubTab = function($oTabs) {
	var nCurIndex = HomePage.GetCurTabIndex($oTabs);
	var aTitles = HomePage.GetAllTabTitle($oTabs);
	var i = 1;

	while (i < nCurIndex) {
		$oTabs.tabs('close', aTitles[i++]);
	}
}

/**
 * ========================================================================================
 * 函数名: GetCurTabTitle 描 述: <summary>获取当前选项卡面板标题</summary> 参 数: <param>$oTabs -
 * 选项卡对象</param> 返回值: <returns>选项卡面板标题字符串</returns> 说 明: <remarks></remarks>
 * =======================================================================================
 */
HomePage.GetCurTabTitle = function($oTabs) {
	return HomePage.GetTabTitle(HomePage.GetCurTab($oTabs));
}

/**
 * ========================================================================================
 * 函数名: OnRefreshSubTab 描 述: <summary>刷新当前选项卡面板内容</summary> 参 数: <param>$oTabs -
 * 选项卡对象</param> 返回值: <returns></returns> 说 明: <remarks></remarks>
 * =======================================================================================
 */
HomePage.OnRefreshSubTab = function($oTabs) {
	var $oTabs = HomePage.GetTabObject();
	var oCurTab = HomePage.GetCurTab($oTabs);
	var src = HomePage.GetIFrameSrc(oCurTab);
	$oTabs.tabs('update', {
		tab : oCurTab,
		options : {
			content : HomePage.CreateIFrame(src)
		}
	});
}

/**
 * ========================================================================================
 * 函数名: OnCloseSubTab 描 述: <summary>关闭当前选项卡面板</summary> 参 数: <param>$oTabs -
 * 选项卡对象</param> 返回值: <returns></returns> 说 明: <remarks></remarks>
 * =======================================================================================
 */
HomePage.OnCloseSubTab = function($oTabs) {
	var strCurTitle = HomePage.GetCurTabTitle($oTabs);

	if (strCurTitle != HomePage.PageConfig.strHomeTabTitle) {
		$oTabs.tabs('close', strCurTitle);
	}
}

/**
 * ========================================================================================
 * 函数名: OnCloseAllSubTab 描 述: <summary>关闭所有选项卡面板</summary> 参 数: <param>$oTabs -
 * 选项卡对象</param> 返回值: <returns></returns> 说 明: <remarks></remarks>
 * =======================================================================================
 */
HomePage.OnCloseAllSubTab = function($oTabs) {
	HomePage.CloseAllTabs();

}
/**
 * ========================================================================================
 * 函数名: GetTabTitle 描 述: <summary>获取指定选项卡面板标题</summary> 参 数: <param>oTab -
 * 选项卡面板对象</param> 返回值: <returns>指定选项卡面板标题字符串</returns> 说 明: <remarks></remarks>
 * =======================================================================================
 */
HomePage.GetTabTitle = function(oTab) {
	return oTab.panel('options').title;
}

/**
 * ========================================================================================
 * 函数名: CloseAllTabs 描 述: <summary>关闭所有选项卡面板</summary> 参 数: <param></param>
 * 返回值: <returns></returns> 说 明: <remarks>关闭所有选项卡面板的具体实现函数。 为了兼容，不传递 $oTabs
 * 参数，此对象将在函数 内部自己获取。 </remarks>
 * =======================================================================================
 */
HomePage.CloseAllTabs = function() {
	layer.alert('您确定关闭所有窗口吗？', {
		icon : 3,
		btn : [ '确定', '取消' ]
	}, function() {
		$oTabs = HomePage.GetTabObject();
		var aTitles = HomePage.GetAllTabTitle($oTabs);
		$.each(aTitles, function() {
			if (this.toString() != HomePage.PageConfig.strHomeTabTitle) {// 如果不是首页
				$oTabs.tabs('close', this);
			}
		});
		layer.closeAll();
	}, function() {
		layer.closeAll();
	});
};

/**
 * ========================================================================================
 * 函数名: OnCloseOtherSubTab 描 述: <summary>关闭除当前选项卡面板外的所有面板</summary> 参 数:
 * <param>$oTabs - 选项卡对象</param> 返回值: <returns></returns> 说 明: <remarks></remarks>
 * =======================================================================================
 */
HomePage.OnCloseOtherSubTab = function($oTabs) {
	var aTitles = HomePage.GetAllTabTitle($oTabs);
	var strCurTitle = HomePage.GetCurTabTitle($oTabs);

	$.each(aTitles, function() {
		if ((this != strCurTitle)
				&& (this != HomePage.PageConfig.strHomeTabTitle)) {
			$oTabs.tabs('close', this);
		}
	});
}

/**
 * ========================================================================================
 * 函数名: OnCloseRightSubTab 描 述: <summary>关闭当前选项卡面板右边的所有面板</summary> 参 数:
 * <param>$oTabs - 选项卡对象</param> 返回值: <returns></returns> 说 明: <remarks></remarks>
 * =======================================================================================
 */
HomePage.OnCloseRightSubTab = function($oTabs) {
	var nCurIndex = HomePage.GetCurTabIndex($oTabs);
	var aTitles = HomePage.GetAllTabTitle($oTabs);
	var i = aTitles.length - 1;

	while (nCurIndex < i) {
		$oTabs.tabs('close', aTitles[i--]);
	}
}

/**
 * ========================================================================================
 * 函数名: OnCloseLeftSubTab 描 述: <summary>关闭当前选项卡面板左边的所有面板</summary> 参 数:
 * <param>$oTabs - 选项卡对象</param> 返回值: <returns></returns> 说 明: <remarks></remarks>
 * =======================================================================================
 */
HomePage.OnCloseLeftSubTab = function($oTabs) {
	var nCurIndex = HomePage.GetCurTabIndex($oTabs);
	var aTitles = HomePage.GetAllTabTitle($oTabs);
	var i = 1;

	while (i < nCurIndex) {
		$oTabs.tabs('close', aTitles[i++]);
	}
}
// 初始化菜单
HomePage.InitMenu = function(lsMenu) {
	lsMenu = JSON.parse(lsMenu);
	if (!lsMenu || !lsMenu.rows.length) {		
		layer.alert('您没有任何权限！请联系管理员。', {
			icon : 2,
			skin : 'layer-ext-moon',
			shadeClose : true,
			title : '提示'
		})
		return;
	}
	// 将菜单绑定到body元素上
	$('body').data('menulist', lsMenu);
	// 过滤掉不可见的菜单项
	/*
	 * var lsVisibleMenu = $.grep(lsMenu.rows,function(row){ return
	 * row.visible_state; });
	 */

	// 获取菜单树
	var trMenu = utils.toTreeData(lsMenu.rows, "menu_id", "parent_code");
	HomePage.MenuInfo = trMenu;

	HomePage.PageConfig.navigation = "accordion";

	switch (HomePage.PageConfig.navigation) {
	case "tree":
		break;
	case "accordion":
		HomePage.CreateMenuAccordion(trMenu);
		break;
	default:
		break;

	}
}
/**
 * ========================================================================================
 * 函数名: FillScreen 描 述: <summary>填充屏幕显示方式</summary> 参 数: <param></param> 返回值:
 * <returns></returns> 说 明: <remarks></remarks>
 * =======================================================================================
 */
HomePage.FillScreen = function() {
	$(this).click(function() {
		$(".fullscreen").toggleClass("togglecss");
	})
	if (!HomePage.IsFullScreen) {// 当前是全屏显示
		// 改变屏显切换按钮图标
		$(this).find('.icon-screen_full').removeClass('icon-screen_full')
				.addClass('icon-screen_actual');
		// 关闭布局的 north 和 west 面板
		$('[region=north], [region=west]').panel('close');

		var panels = $('body').data().layout.panels;
		panels.north.length = 0;
		panels.west.length = 0;
		if (panels.expandWest) {
			panels.expandWest.length = 0;
			$(panels.expandWest[0]).panel('close');
		}
		$('#frameTop').hide();
		// 置当前全屏显示为 true
		HomePage.IsFullScreen = true;
	} else {// 当前非全屏显示
		// 改变屏显切换按钮图标
		$(this).find('.icon-screen_actual').removeClass('icon-screen_actual')
				.addClass('icon-screen_full');
		// 打开布局的 north 和 west 面板
		$('[region=north], [region=west]').panel('open');

		var panels = $('body').data().layout.panels;
		panels.north.length = 1;
		panels.west.length = 1;
		if ($(panels.west[0]).panel('options').collapsed) {
			panels.expandWest.length = 1;
			$(panels.expandWest[0]).panel('open');
		}
		$('#frameTop').show();
		// 置当前全屏显示为 false
		HomePage.IsFullScreen = false;
	}
	// 重置布局大小
	$('body').layout('resize');
};
// 创建分类菜单
HomePage.CreateMenuAccordion = function(aMenu) {
	var $oNav = HomePage.GetNavObject();

	// 1.创建分类空间
	HomePage.CreateAccordion($oNav);
	// 2.创建菜单
	HomePage.FillAccordionContent($oNav, aMenu);
	// 3.设置click相应函数
	HomePage.SetNavMenuHandler($oNav, aMenu);
}

// 获取导航区域对象
HomePage.GetNavObject = function() {
	return $("#wnav");
}
// 创建分类
HomePage.CreateAccordion = function($oNav) {
	$oNav.accordion({
		animate : false, // 在展开和折叠的时候不显示动画效果
		fit : true, // 分类容器大小自适应父容器
		border : false
	// 不显示边框
	});
}
function GetMenuList(data, menulist) {
	if (data.children == null)
		return menulist;
	else {
		menulist += '<ul>';
		if (data.menu_name == "数据字典") {
			/*
			 * menulist += '<li state="closed">' //+ '<span class="icon-' +
			 * sm.icon_class + '"
			 * style="width:16px;height:16px;display:inline-block;float:left;margin-top:2px;margin-right:7px;margin-left:5px;"></span>' + '<span
			 * class="nav">' + data.menu_name + '</span>'
			 */
		} else {
			$.each(	data.children,function(i, sm) {
				if (sm.url != null && sm.url != "") {
					menulist += '<li ><a ref="'
							+ sm.menu_id
							+ '" href="#" rel="'
							+ sm.url
							+ '" >'
							+ '<span class="icon-'
							+ sm.icon_class
							+ '" style="width:16px;height:16px;display:inline-block;float:left;margin-top:2px;margin-right:7px;margin-left:5px;"></span>'
							+ '<span class="nav">'
							+ sm.menu_name + '</span></a>'
					/*
					 * menulist += '<li>'+ '<a ref="' +
					 * sm.menu_code + '"
					 * href="javascript:void(0)" rel="' + sm.url + '"
					 * style="height:16px;display:inline-flex;">'+ '<span
					 * class="icon-' + sm.icon_class + '"
					 * style="width:16px;height:16px;display:inline-block;float:left;margin-top:2px;margin-right:7px;margin-left:5px;"></span>'+ '<span
					 * class="nav"
					 * style="width:auto;height:16px;display:inline-block;white-space:
					 * nowrap;margin-top:-1.5px;float:left">' +
					 * sm.menu_name + '</span></a>'+ '</li>';
					 */
				} else {
					menulist += '<li state="closed">'
					// + '<span class="icon-' + sm.icon_class +
					// '"
					// style="width:16px;height:16px;display:inline-block;float:left;margin-top:2px;margin-right:7px;margin-left:5px;"></span>'
					+ '<span class="nav">' + sm.menu_name
							+ '</span>'
				}
				menulist = GetMenuList(sm, menulist);
			})
		}
		menulist += '</ul>';
	}
	return menulist;
}

// 填充分类面板内容
HomePage.FillAccordionContent = function($oNav, aMenus) {
		// 菜单项格式化字符串 二级菜单
		var title = "";
		var fmtMenuItem = '<li>'
				+ '<div style="display:inline-block;margin-left:20px;padding-right:20px;width:auto;">'
				+ '<a ref="{0}" href="javascript:void(0)" rel="{1}" style="height:16px;display:inline-flex;"><span class="icon-{2}" style="width:16px;height:16px;display:inline-block;float:left;margin-top:2px;margin-right:7px;margin-left:5px;"></span><span class="nav" style="width:auto;height:16px;display:inline-block;white-space: nowrap;margin-top:-1.5px;float:left">{3}</span></a>'
				+ '</div>' + '</li>';
		// 遍历菜单数据，添加分类面板
		$.each(aMenus, function(i, e) {
			var id = e.menu_id;
			if(e.children!=null){
				var cl = e.children.length;
				var menulist1 = "";
				// sm 常用菜单 邮件 列表
				menulist1 = GetMenuList(e, menulist1);
				menulist1 = "<ul id='tt" + id + "' class='easyui-tree' animate='true'>"
						+ menulist1.substring(4);
				if(e.menu_name!="追溯信息"){
					$('#wnav').accordion('add', {
						title : e.menu_name,
						content : menulist1,
						iconCls : 'icon-' + e.icon_class,
						border : false,
					});
			 			
				var roots = $('#tt' + id).tree('getRoots');
				$('#tt' + id).tree({
					onDblClick : function(node) {
						$('#tt' + id).tree('toggle', node.target);
						// $('#tt'+id).tree('collapse',node.target);
					}
				});
				for (var c = 0; c < cl; c++) {
					var node = roots[c].target;
					var chMenus = e.children[c];
					if (chMenus.children != undefined && chMenus.menu_name != "数据字典") {
						for (var t = 0; t < chMenus.children.length; t++) {
							var nodeChild = $('#tt' + id).tree('getChildren', node);
							var icon = $(nodeChild[t].target).find("span.tree-icon");
							if (icon) {
								$(icon[0]).addClass(
										'icon-' + chMenus.children[t].icon_class);
								$(icon[0]).removeClass("tree-file");
							}
						}
						var icons = $(node).find("span.tree-icon");
						if (icons) {
							$(icons[0]).addClass('icon-' + chMenus.icon_class);
							$(icons[0]).removeClass("tree-file");
						}
					} else {
						var icons = $(node).find("span.tree-icon");
						if (icons) {
							$(icons[0]).addClass('icon-' + chMenus.icon_class);
							$(icons[0]).removeClass("tree-file");
							}
						}
					}
				}		
			/*
			 * $oNav.accordion('add', { title: e.menu_name, content: "<ul id='tree"+id+"' ></ul>",
			 * //selected: true, iconCls:'icon-'+e.icon_class,//e.Icon border:false,
			 * }); $("#tree" + id).tree({ data:e.children });
			 */
			  }	
		});

		// 默认选择第一个面板
		var panels = $oNav.accordion('panels');
		if (panels.length) {
			$oNav.accordion('select', panels[0].panel('options').title);
		}	
		
}
function getIcon(menuid, aMenu) {
	var icon = 'icon-';
	$.each(aMenu, function(i, n) {
		$.each(n.children, function(k, m) {
			if (m.menu_code == menuid) {
				icon += m.icon_class;
				return false;
			}
		});
	});
	return icon;
}

/**
 * 退出系统
 */

HomePage.OnLogout = function() {
	document.cookie = "name=" + "true";
	layer.alert('您确定要退出吗？', {
		icon : 3,
		title : '系统提示',
		btn : [ '确定', '取消' ]
	// 带回调函数的弹窗
	}, function() {
		location.href = 'loginOut';
		layer.closeAll();
	}, function() {
		// 点击取消按钮执行关闭窗体
		layer.closeAll();
	});
}

/**
 * 切换身份
 */
HomePage.OnChangeIdentity = function() {
	layer.alert('您确定要切换身份吗？', {
		icon : 3,
		title : '切换身份',
		btn : [ '确定', '取消' ]
	// 带回调函数的弹窗
	}, function() {
		location.href = 'identity';
		layer.closeAll();
	}, function() {
		// 点击取消按钮执行关闭窗体
		layer.closeAll();
	});
}
/**
 * 修改密码
 */
HomePage.OnChangePassword = function() {
	$('#divModifyPwd').dialog('open');
	/* $('#modifyPwdForm').clear; */
	$('#newComfirmPwd').textbox('setValue', '');
	$('#newPwd').textbox('setValue', '');
	$('#oldPwd').textbox('setValue', '');
}

function checkqj() {
	var newp = $('#newPwd').textbox('getValue');
	var newc = $('#newComfirmPwd').textbox('getValue');
	var geo = this.value
			.match(/[^\u0020-\u007E\u4E00-\u9FA5\u4E00-\u9FA5\u3002\uFF1F\uFF01\uFF0C\u3001\uFF1B\uFF1A\u300C\u300D\u300E\u300F\u2018\u2019\u201C\u201D\uFF08\uFF09\u3014\u3015\u3010\u3011\u2014\u2026\u2013\uFF0E\u300A\u300B\u3008\u3009]/);
	if (geo != null && geo.length != 0) {
		newp = newp.substring(0, newp.length - 1);
		newc = newc.substring(0, newc.length - 1);
	} else {
		return true;
	}
}
changePwd = function() {
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

// 设置导航菜单处理函数
HomePage.SetNavMenuHandler = function($oNav, aMenu) {
	$oNav.find('li').click(function() {
		$oNav.find('li div').removeClass('selected');
		$(this).children('div').addClass("selected");

		var link = $(this).find('a');
		var title = link.children('.nav').text();
		var url = link.attr("rel");
		var code = link.attr("ref");
		var icon = link.children()[0].getAttribute('class').substring(5);// getIcon(code,aMenu);//
		if (link.length == 1) {
			HomePage.OpenTab(title, url, "icon-" + icon);
		}
	}).hover(function(evt) {
		$(this).children('div').addClass("hover");
		// 创建弹出式菜单
		// HomePage.CreateDynamicMenu(evt.currentTarget.innerText.trim(),evt.pageX,evt.pageY);
	}, function() {
		$(this).children('div').removeClass("hover");
		// $('#mm').menu('hide');
	});
}
// 创建弹出式菜单
HomePage.CreateDynamicMenu = function(menuText, x, y) {
	if ($('#mm').length) {
		$('#mm').empty();
	}

}
// 打开选项卡
HomePage.OpenTab = function(strTitle, url, strIcon) {
	if (!url || url == "#") {
		return false;
	}

	var $oTabs = HomePage.GetTabObject(); // 获取选项卡
	var aTabs = HomePage.GetAllTabs($oTabs); // 获取所有选项卡面板

	if ($oTabs.tabs("exists", strTitle)) {
		HomePage.RefreshTab($oTabs, strTitle, url);
	} else if (aTabs.length < HomePage.PageConfig.nMaxTabCount) {
		HomePage.AddTab($oTabs, strTitle, url, strIcon);
	} else {
		layer.alert('打开窗口过多会导致系统运行缓慢！', {
			icon : 3,
			btn : [ '确定', '取消' ]
		}, function() {
			HomePage.AddTab($oTabs, strTitle, url, strIcon);
		}, function() {
			layer.closeAll();
		});
	}
}
// 获取选项卡
HomePage.GetTabObject = function() {
	return $("#tabs");
}
// 获取所有选项卡面板
HomePage.GetAllTabs = function($oTabs) {
	return $oTabs.tabs('tabs');
}
// 获取当前选项卡面板
HomePage.GetCurTab = function($oTabs) {
	return $oTabs.tabs('getSelected');
}
// 刷新选项卡
HomePage.RefreshTab = function($oTabs, strTitle, url) {
	$oTabs.tabs('select', strTitle);

}
// 添加选项卡
HomePage.AddTab = function($oTabs, strTitle, url, strIcon) {
	$oTabs.tabs('add', {
		title : strTitle,
		content : HomePage.CreateIFrame(url),
		closable : true,
		icon : strIcon
	});
	layer.closeAll();
	// HomePage.SetLocationHash();
}
// 创建ifrmae标签
HomePage.CreateIFrame = function(url) {
	return '<iframe scrolling="auto" class="panelsrc" frameborder="0" style="width:100%;height:100%" src="'
			+ url + '" ></iframe>';
}
// 设置window的location对象的hash属性
HomePage.SetLocationHash = function() {
}
$(HomePage.Init);
