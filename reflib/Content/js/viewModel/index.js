/*
** TONFUN CONFIDENTIAL AND PROPRIETARY.
**
** This source is the sole property of Tonfun CO.,Ltd. Reproduction or Utilization of this source
** in whole or in part is forbidden without the written consent of Tonfun CO.,Ltd.
** 此文件所有权仅归天津同丰信息技术有限公司所有。
** 未经天津同丰信息技术有限公司书面同意，严禁对此文件的全部或部分进行复制或使用。
**
** Tonfun CONFIDENTIAL
** Copyright 2011-2015 Tonfun Corporation All Rights Reserved.
** 天津同丰信息技术有限公司机密
** (c) 2011-2015 天津同丰信息技术有限公司保留所有权利。
**--------------------------------------------------------------------------------------------------
**
**  文件名: index.js
**  描  述: 
**  作  者: zhangzhigang
**  时  间: 2015-06-23 11:22:54
**--------------------------------------------------------------------------------------------------
版本历史
----------------------------------------------------------------------------------------------------
修改人: zhangzhigang
时  间: 2015-06-23 11:22:54
变更号: 
描  述: 新建。
--------------------------------------------------------------------------------------------------*/

/*
 * 对象
 *------------------------------------------------------------------------------------------------*/
// 定义主页对象
var HomePage = {};


/*
 * 属性
 *------------------------------------------------------------------------------------------------*/
// 全屏显示标志
HomePage.IsFullScreen = false;
HomePage.HomeSubTab;

HomePage.User =
    {
        UserCode: null,
        UserName: null
    };


// 定义主页设置属性
HomePage.PageConfig =
{
    strHomeTabTitle:    '首页',
    strHomeTabUrl: '',
    nMaxTabCount:       10
};

/** ========================================================================================
 * 函数名: Init
 * 描  述:
 * <summary>初始化主页</summary>
 * 参  数:
 * <param></param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.Init = function ()
{
    // 获取菜单信息
    comm.ajax({
        type: 'GET',
        url: 'Api/Sys/MenuApi/GetMenuOfUser/',
        success: HomePage.InitMenu
    });

    // 设置安全退出的 click 响应函数
    $('.loginOut').click(HomePage.OnLogout);
    // 设置修改密码的 click 响应函数
    $('.changePassword').click(HomePage.OnChangePassword);
    // 设置个人设置的 click 响应函数
    $('.userrOption').click(HomePage.OnUserOption);
    // 设置切换项目的 click 响应函数
    $('.changeProject').click(HomePage.OnChangeProject).html("当前项目：" + comm.cookie('CurrentProjectName'));
    $('#notity').jnotifyInizialize({ oneAtTime: true, appendType: 'append' }).css({ 'position': 'absolute', '*top': '2px', 'left': '50%', 'margin': '20px 0px 0px -120px', '*margin': '0px 0px 0px -120px', 'width': '240px', 'z-index': '9999' });
    $('#tabcontextmenu').menu({ onClick: HomePage.OnTabContextMenu });

    // 创建选项卡
    $('#tabs').tabs({
        tools: [{ iconCls: 'icon-arrow_refresh', handler: HomePage.RefreshCurTab },
                { iconCls: 'icon-screen_full', handler: HomePage.FillScreen },
                { iconCls: 'panel-tool-close', handler: HomePage.CloseAllTabs }],
        onContextMenu: HomePage.OnTabHeadRButtonDown,
        onClose: HomePage.SetLocationHash,
        onSelect: HomePage.SetLocationHash
    });

    // 设置首页选项卡
    HomePage.HomeSubTab = $('#tabs').tabs('getTab', HomePage.PageConfig.strHomeTabTitle);    
};

/** ========================================================================================
 * 函数名: InitLocationHash
 * 描  述:
 * <summary>初始化页面的标签值</summary>
 * 参  数:
 * <param>data - </param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.InitLocationHash = function (data)
{
    
    var subUrl = location.hash.replace('#!', '');
    $.each(data, function ()
    {
        var s = this.URL.replace('.aspx', '');
        if (this.URL && this.URL != '#' && (subUrl == s || subUrl.indexOf(s + "/") > -1))
        {
            HomePage.OpenTab(this.MenuName, subUrl, this.IconClass);
        }
    });
    //判断用户密码是否是默认密码，如果是则强制用户修改密码
    comm.ajax({
        type: 'PUT',
        url: 'Api/Sys/UserApi/GetPwdIsDefaultOfUser/' + HomePage.User.UserCode,
        success: function (d) {
            if (d.Code == 2)
                HomePage.OnChangePassword();
            
        }
    });

    
};

/** ========================================================================================
 * 函数名: InitConfig
 * 描  述:
 * <summary>初始化主页配置</summary>
 * 参  数:
 * <param>config - 页面配置值</param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.InitConfig = function (config)
{
    HomePage.User.UserCode = config.UserCode;
    HomePage.User.UserName = config.UserName;
    HomePage.PageConfig = $.extend(HomePage.PageConfig, config.Settings);
};

/** ========================================================================================
 * 函数名: InitMenu
 * 描  述:
 * <summary>初始化菜单</summary>
 * 参  数:
 * <param></param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.InitMenu = function (lsMenu)
{
    if (!lsMenu || !lsMenu.length)
    {
        $.messager.alert("系统提示", "<font color=red><b>您没有任何权限！请联系管理员。</b></font>", "warning", function () { location.href = '/login'; });
        return;
    }

    // 将菜单绑定到 body 元素
    $('body').data('menulist', lsMenu);
    // 过滤掉不可见的菜单项
    var lsVisibleMenu = $.grep(lsMenu, function (row)
    {
        return row.VisibleState;
    });

    // 获取菜单树
    var trMenu = utils.toTreeData(lsVisibleMenu, 'MenuCode', 'ParentCode');

    switch (HomePage.PageConfig.navigation)
    {
        case "tree":
            HomePage.CreateMenuTree(trMenu);
            break;

        case "menubutton":
            HomePage.CreateMenuButton(trMenu);
            break;

        case "accordion":
            HomePage.CreateMenuAccordion(trMenu);
            break;

        default:
            HomePage.CreateMenuAccordion(trMenu);
            break;
    }

    HomePage.InitLocationHash(lsMenu);
    // 加载首页
    $("#home").html(HomePage.CreateIFrame(HomePage.PageConfig.strHomeTabUrl));
};


/** ========================================================================================
 * 函数名: OnTabHeadRButtonDown
 * 描  述:
 * <summary>鼠标右键点击选项卡头的响应函数</summary>
 * 参  数:
 * <param>e     - 事件对象</param>
 * <param>title - 子选项卡标题</param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks>当鼠标右键点击一个选项卡头时触发</remarks>
 * =======================================================================================*/
HomePage.OnTabHeadRButtonDown = function (e, title)
{
    // 显示选项卡上下文弹出菜单
    $('#tabcontextmenu').menu('show', { left: e.pageX, top: e.pageY });
    // 选择标题为 title 的选项卡面板
    $('#tabs').tabs('select', title);

    e.preventDefault();
};

/** ========================================================================================
 * 函数名: OnChangePassword
 * 描  述:
 * <summary>修改密码</summary>
 * 参  数:
 * <param></param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.OnChangePassword = function ()
{
    comm.dialog(
        {
            title: "&nbsp;修改密码",
            iconCls: 'icon-key',
            width: 320,
            height: 204,
            html: "#password-template",
            viewModel: function(w)
            {
                w.find("[name=UserName]").val(HomePage.User.UserName);
                w.find("#pwd_confirm").click(function ()
                {
                    var post = {};
                    post.pwdOld = w.find('[name=OldPwd]').attr("value");
                    if (post.pwdOld == "")
                    {
                        comm.message("error", "请输入原密码！");
                        return;
                    }
                    post.pwdNew = w.find('[name=NewPwd]').attr("value");
                    var pwdConfirm = w.find('[name=ConfirmPwd]').attr("value");
                    var reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{4,16}$/;
                    var flag = reg.test(post.pwdNew);
                    if (post.pwdNew.length < 8)
                    {
                        comm.message("error", "新密码必须至少有8位数！");
                        return;
                    } else if (flag==false) {
                        comm.message("error", "新密码必须包含数字,字母和特殊字符！");
                        return;
                    }
                    else if(post.pwdNew != pwdConfirm)
                    {
                        comm.message("error", "新密码与确认密码不同！");
                        return;
                    }

                    comm.ajax({
                        type: "PUT",
                        url: "/Api/Sys/UserApi/ResetPassword/" + HomePage.User.UserCode,
                        data: ko.toJSON(post),
                        success: function (d)
                        {
                            if (d.Code==0)
                            {
                                comm.message("success", "修改密码成功。");
                                w.dialog('close');
                                location.href = '/Login/Logout';
                            }
                            else
                            {
                                comm.message("error", getOldPasswordError());
                            }
                        }
                    });
                });
                w.find("#pwd_close").click(function () { w.dialog('close'); });
            }
        });
};

/** ========================================================================================
 * 函数名: OnUserOption
 * 描  述:
 * <summary>打开格式设置页面</summary>
 * 参  数:
 * <param></param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.OnUserOption = function ()
{
    // 添加个人设置选项卡面板
    HomePage.OpenTab("个人设置", "/sys/useroption", "icon icon-wrench_orange");
};

/** ========================================================================================
 * 函数名: OnChangeProject
 * 描  述:
 * <summary>打开切换项目对话框</summary>
 * 参  数:
 * <param></param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.OnChangeProject = function ()
{
    var self = this;

    $("#w").data("lookup", { lookupType: 'project', valueTitle: '项目编码', textTitle: '项目名称' }).window({
        title: '&nbsp;切换项目'
        , width: 600
        , height: 420
        , iconCls: 'icon-flag_france'
        , modal: true
        , collapsible: false
        , minimizable: false
        , maximizable: true
        , closable: true
        , content: "<iframe id='frm_win_project' src='/plugins/lookup?r=" + Math.random() + "' style='height:100%;width:100%;border:0;' frameborder='0'></iframe>" //frameborder="0" for ie7
        , onClose: function () {
            var rtnValue = $(this).data("returnValue");
            if (rtnValue) {
                $(self).find(".l-btn-text").html("当前项目：" + rtnValue.text);
                comm.cookie('CurrentProject', rtnValue.value);
            }
        }
    });
};

/** ========================================================================================
 * 函数名: OnLogout
 * 描  述:
 * <summary>退出系统</summary>
 * 参  数:
 * <param></param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.OnLogout = function ()
{
    $.messager.confirm('系统提示', '您确定要退出本次登录吗?', function (r)
    {
        if (r)
        {
            location.href = '/Login/Logout';
        }
    });
};

/** ========================================================================================
 * 函数名: FillScreen
 * 描  述:
 * <summary>填充屏幕显示方式</summary>
 * 参  数:
 * <param></param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.FillScreen = function ()
{
    if (!HomePage.IsFullScreen)
    {// 当前是全屏显示
        // 改变屏显切换按钮图标
        $(this).find('.icon-screen_full').removeClass('icon-screen_full').addClass('icon-screen_actual');
        // 关闭布局的 north 和 west 面板
        $('[region=north], [region=west]').panel('close');

        var panels = $('body').data().layout.panels;
        panels.north.length = 0;
        panels.west.length = 0;
        if (panels.expandWest)
        {
            panels.expandWest.length = 0;
            $(panels.expandWest[0]).panel('close');
        }

        // 置当前全屏显示为 true
        HomePage.IsFullScreen = true;
    }
    else
    {// 当前非全屏显示
        // 改变屏显切换按钮图标
        $(this).find('.icon-screen_actual').removeClass('icon-screen_actual').addClass('icon-screen_full');
        // 打开布局的 north 和 west 面板
        $('[region=north], [region=west]').panel('open');

        var panels = $('body').data().layout.panels;
        panels.north.length = 1;
        panels.west.length = 1;
        if ($(panels.west[0]).panel('options').collapsed)
        {
            panels.expandWest.length = 1;
            $(panels.expandWest[0]).panel('open');
        }

        // 置当前全屏显示为 false
        HomePage.IsFullScreen = false;
    }
    // 重置布局大小
    $('body').layout('resize');
};

/** ========================================================================================
 * 函数名: OnTabContextMenu
 * 描  述:
 * <summary>选项卡头部的上下文菜单的响应函数</summary>
 * 参  数:
 * <param>item - 菜单项</param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks>当点击某一个上下文菜单时触发</remarks>
 * =======================================================================================*/
HomePage.OnTabContextMenu = function (item)
{
    var $oTabs = HomePage.GetTabObject();

    switch (item.id)
    {
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

/** ========================================================================================
 * 函数名: OnRefreshSubTab
 * 描  述:
 * <summary>刷新当前选项卡面板内容</summary>
 * 参  数:
 * <param>$oTabs - 选项卡对象</param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.OnRefreshSubTab = function ($oTabs)
{
    var $oTabs = HomePage.GetTabObject();
    var oCurTab = HomePage.GetCurTab($oTabs);
    var src = HomePage.GetIFrameSrc(oCurTab);
    $oTabs.tabs('update', { tab: oCurTab, options: { content: HomePage.CreateIFrame(src) } });
}

/** ========================================================================================
 * 函数名: OnCloseSubTab
 * 描  述:
 * <summary>关闭当前选项卡面板</summary>
 * 参  数:
 * <param>$oTabs - 选项卡对象</param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.OnCloseSubTab = function ($oTabs)
{
    var strCurTitle = HomePage.GetCurTabTitle($oTabs);
    
    if (strCurTitle != HomePage.PageConfig.strHomeTabTitle)
    {
        $oTabs.tabs('close', strCurTitle);
    }
}

/** ========================================================================================
 * 函数名: OnCloseAllSubTab
 * 描  述:
 * <summary>关闭所有选项卡面板</summary>
 * 参  数:
 * <param>$oTabs - 选项卡对象</param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.OnCloseAllSubTab = function ($oTabs)
{
    HomePage.CloseAllTabs();
}

/** ========================================================================================
 * 函数名: OnCloseOtherSubTab
 * 描  述:
 * <summary>关闭除当前选项卡面板外的所有面板</summary>
 * 参  数:
 * <param>$oTabs - 选项卡对象</param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.OnCloseOtherSubTab = function ($oTabs)
{
    var aTitles = HomePage.GetAllTabTitle($oTabs);
    var strCurTitle = HomePage.GetCurTabTitle($oTabs);

    $.each(aTitles, function ()
    {
        if ((this != strCurTitle) && (this != HomePage.PageConfig.strHomeTabTitle))
        {
            $oTabs.tabs('close', this);
        }
    });
}

/** ========================================================================================
 * 函数名: OnCloseRightSubTab
 * 描  述:
 * <summary>关闭当前选项卡面板右边的所有面板</summary>
 * 参  数:
 * <param>$oTabs - 选项卡对象</param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.OnCloseRightSubTab = function ($oTabs)
{
    var nCurIndex = HomePage.GetCurTabIndex($oTabs);
    var aTitles = HomePage.GetAllTabTitle($oTabs);
    var i = aTitles.length - 1;

    while(nCurIndex < i)
    {
        $oTabs.tabs('close', aTitles[i--]);
    }
}

/** ========================================================================================
 * 函数名: OnCloseLeftSubTab
 * 描  述:
 * <summary>关闭当前选项卡面板左边的所有面板</summary>
 * 参  数:
 * <param>$oTabs - 选项卡对象</param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.OnCloseLeftSubTab = function ($oTabs)
{
    var nCurIndex = HomePage.GetCurTabIndex($oTabs);
    var aTitles = HomePage.GetAllTabTitle($oTabs);
    var i = 1;

    while (i < nCurIndex)
    {
        $oTabs.tabs('close', aTitles[i++]);
    }
} 


/*
 * 以下是菜单的相关操作函数
 * ---------------------------------------------------------------------------------------*/
/** ========================================================================================
 * 函数名: CreateMenuAccordion
 * 描  述:
 * <summary>创建分类菜单</summary>
 * 参  数:
 * <param>aMenus - 菜单数据数组</param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.CreateMenuAccordion = function (aMenus)
{
    var $oNav = HomePage.GetNavObject();

    /*
     * 1. 创建分类空间
     * -----------------------------------------------------------------------------*/
    HomePage.CreateAccordion($oNav);

    /*
     * 2. 创建菜单
     * -----------------------------------------------------------------------------*/
    HomePage.FillAccordionContent($oNav, aMenus);

    /*
     * 3. 设置 click 响应函数
     * -----------------------------------------------------------------------------*/
    HomePage.SetNavMenuHandler($oNav);
};

/** ========================================================================================
 * 函数名: CreateAccordion
 * 描  述:
 * <summary>创建分类</summary>
 * 参  数:
 * <param>$oNav - 导航对象</param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.CreateAccordion = function($oNav)
{
    $oNav.accordion(
        {
            animate: false,         // 在展开和折叠的时候不显示动画效果
            fit: true,              // 分类容器大小自适应父容器
            border: false           // 不显示边框
        });
}

/** ========================================================================================
 * 函数名: FillAccordionContent
 * 描  述:
 * <summary>填充分类面板内容</summary>
 * 参  数:
 * <param>$oNav  - 导航对象</param>
 * <param>aMenus - 菜单数据数组</param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.FillAccordionContent = function($oNav, aMenus)
{
    // 菜单项格式化字符串
    var fmtMenuItem = '<li>' +
                        '<div>' +
                            '<a ref="{0}" href="javascript:void(0)" rel="{1}"><span class="icon {2}">&nbsp;</span><span class="nav">{3}</span></a>' +
                        '</div>' +
                      '</li>';

    // 遍历菜单数据，添加分类面板
    $.each(aMenus, function ()
    {
        // 设置菜单列表项
        var strHtml = '<ul>';
        $.each(this.children || [], function ()
        {
            strHtml += utils.formatString(fmtMenuItem, this.MenuCode, this.URL, this.IconClass, this.MenuName);
        });
        strHtml += '</ul>';

        // 添加新分类面板
        $oNav.accordion('add',
            {
                title: this.MenuName,
                content: strHtml,
                iconCls: 'icon' + this.IconClass,
                border: false,
            });
    });

    // 默认选择第一个面板
    var panels = $oNav.accordion('panels');
    if (panels.length)
    {
        $oNav.accordion('select', panels[0].panel('options').title);
    }
}

/** ========================================================================================
 * 函数名: SetNavMenuHandler
 * 描  述:
 * <summary>设置导航菜单处理函数</summary>
 * 参  数:
 * <param>$oNav - 导航对象</param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.SetNavMenuHandler = function ($oNav)
{
    $oNav.find('li').click(function ()
    {
        $oNav.find('li div').removeClass("selected");
        $(this).children('div').addClass("selected");

        var link = $(this).find('a');
        var title = link.children('.nav').text();
        var url = link.attr("rel");
        var code = link.attr("ref");
        var icon = link.children('.icon').attr('class');

        HomePage.OpenTab(title, url, icon);
    }).hover(function ()
    {
        $(this).children('div').addClass("hover");
    }, function ()
    {
        $(this).children('div').removeClass("hover");
    });
}

/** ========================================================================================
 * 函数名: CreateMenuTree
 * 描  述:
 * <summary>创建树形菜单</summary>
 * 参  数:
 * <param></param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.CreateMenuTree = function (aMenus)
{
    var $oNav = HomePage.GetNavObject();

    var settings = {
        data:
            {
                key:
                  { name: "MenuName", url: "URL" }
            }, callback:
                {
                    onClick: function (event, treeId, node)
                    {
                        HomePage.OpenTab(node.MenuName, node.URL, node.IconClass);
                    }
                }
    };

    var $oTree = $oNav.addClass("ztree");
    if (aMenus.length > 0)
    {
        aMenus[0].open = true;
    }

    $.fn.zTree.init($oTree, settings, aMenus);
};

/** ========================================================================================
 * 函数名: CreateMenuButton
 * 描  述:
 * <summary>创建菜单按钮</summary>
 * 参  数:
 * <param>aMenus - 菜单数据数组</param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.CreateMenuButton = function (aMenus)
{
    var strParentMenu = "";
    var strChildMenu = "";
    var $oNav = HomePage.GetNavObject();

    var strFmtParentMenu = '<a href="javascript:void(0)" id="mb{0}" class="easyui-menubutton" menu="#mm{0}" iconCls="{1}">{2}</a>';
    $.each(aMenus, function (i, node)
    {
        strParentMenu += utils.formatString(strFmtParentMenu, (i + 1), node.IconClass, node.MenuName);
 
        if ((node.children || []).length > 0)
        {
            strChildMenu += '<div id="mm' + (i + 1) + '" style="width:120px;">';
            strChildMenu += HomePage.GetChildMenuButton(node);
            strChildMenu += '</div>';
        }
    });

    $oNav.append(strParentMenu).append(strChildMenu);

    $oNav.css({ 'float': 'left', 'width': '100%', 'height': '30px', 'padding': '3px 0px 0px 20px', 'background': '#6ABEFA url(/common/images/datagrid_title_bg.png)' });

    if (HomePage.PageConfig.theme == 'gray')
    {
        $oNav.css('background', 'url(/Content/js/jquery-easyui-1.3.2/themes/gray/images/tabs_enabled.gif)');
    }
 
    var northPanel = $('body').layout('panel', 'north');
    northPanel.panel('resize', { height: 103 });

    $('body').layout('resize');

    var mb = $('#wnav .easyui-menubutton').menubutton();
    $.each(mb, function (i, node)
    {
        $($(node).menubutton('options').menu).menu({
            onClick: function (item) {
                var tabTitle = item.text;
                var url = item.id;
                var icon = item.iconCls;
                HomePage.OpenTab(tabTitle, url, icon);
                return false;
            }
        });
    });
};

/** ========================================================================================
 * 函数名: GetChildMenuButton
 * 描  述:
 * <summary>获取子菜单按钮</summary>
 * 参  数:
 * <param>node - 菜单节点</param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.GetChildMenuButton = function (node)
{
    var str = '';
    $.each(node.children, function (j, o)
    {
        if (o.children)
        {
            str += '<div>';
            str += '<span iconCls="' + o.IconClass + '">' + o.MenuName + '</span><div style="width:120px;">';
            str = HomePage.GetChildMenuButton(o);
            str += '</div></div>';
        } else
            str += '<div iconCls="' + o.IconClass + '" id="' + o.URL + '">' + o.MenuName + '</div>';
    });
    return str;
}

/** ========================================================================================
 * 函数名: GetNavObject
 * 描  述:
 * <summary>获取导航区域对象</summary>
 * 参  数:
 * <param></param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.GetNavObject = function()
{
    return $("#wnav");
}



/*
 * 以下是选项卡的相关操作函数和属性
 * ---------------------------------------------------------------------------------------*/
/** ========================================================================================
 * 函数名: 
 * 描  述:
 * <summary></summary>
 * 参  数:
 * <param></param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.OpenTab = function (strTitle, url, strIcon)
{
    if (!url || url == "#")
    {
        return false;
    }

    var $oTabs = HomePage.GetTabObject();
    var aTabs = HomePage.GetAllTabs($oTabs);

    if ($oTabs.tabs("exists", strTitle))
    {
        HomePage.RefreshTab($oTabs, strTitle, url);
    }
    else if (aTabs.length < HomePage.PageConfig.nMaxTabCount)
    {
        HomePage.AddTab($oTabs, strTitle, url, strIcon);
    }
    else
    {
        $.messager.confirm("系统提示", "<b>您当前打开了太多的页面，如果继续打开，会造成程序运行缓慢，无法流畅操作！</b>", function (r)
        {
            if (r)
            {
                HomePage.AddTab($oTabs, strTitle, url, strIcon);
            }
        });
    }
};

/** ========================================================================================
 * 函数名: 
 * 描  述:
 * <summary></summary>
 * 参  数:
 * <param></param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.AddTab = function ($oTabs, strTitle, url, strIcon)
{
    $oTabs.tabs('add', { title: strTitle, content: HomePage.CreateIFrame(url), closable: true, icon: strIcon });
    HomePage.SetLocationHash();
};

/** ========================================================================================
 * 函数名: CreateIFrame
 * 描  述:
 * <summary>创建 iframe 标签</summary>
 * 参  数:
 * <param></param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks>创建一个 IFrame 标签，用于包含页面内容。 每一个选项卡面板内显示的内容都包含在一个
            iframe 标签内， 即选项卡面板完全包含 iframe 标签，iframe 标签完全包含页面内容。 </remarks>
 * =======================================================================================*/
HomePage.CreateIFrame = function (url)
{
    return '<iframe scrolling="auto" class="panelsrc" frameborder="0"  style="width:100%;height:100%;" src="' + url + '" ></iframe>';
}

/** ========================================================================================
 * 函数名: 
 * 描  述:
 * <summary></summary>
 * 参  数:
 * <param></param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.RefreshTab = function($oTabs, strTitle, url)
{
    $oTabs.tabs('select', strTitle);
    HomePage.RefreshCurTab(url);
    HomePage.SetLocationHash();
}

/** ========================================================================================
 * 函数名: RefreshCurTab
 * 描  述:
 * <summary>刷新当前选项卡内容</summary>
 * 参  数:
 * <param>url - 包含当前选项卡内容的 URL</param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.RefreshCurTab = function (url)
{
    var $oTabs = HomePage.GetTabObject();
    var oCurTab = HomePage.GetCurTab($oTabs);
    var src = HomePage.GetIFrameSrc(oCurTab);
    $oTabs.tabs('update', { tab: oCurTab, options: { content: HomePage.CreateIFrame(src) } });
};

/** ========================================================================================
 * 函数名: CloseAllTabs
 * 描  述:
 * <summary>关闭所有选项卡面板</summary>
 * 参  数:
 * <param></param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks>关闭所有选项卡面板的具体实现函数。 为了兼容，不传递 $oTabs 参数，此对象将在函数
            内部自己获取。 </remarks>
 * =======================================================================================*/
HomePage.CloseAllTabs = function ()
{
    $.messager.confirm('系统提示', '确认要关闭所有窗口吗？', function (r)
    {
        if (r)
        {
            $oTabs = HomePage.GetTabObject();
            var aTitles = HomePage.GetAllTabTitle($oTabs);

            $.each(aTitles, function ()
            {
                if (this != HomePage.PageConfig.strHomeTabTitle)
                {// 如果不是首页
                    $oTabs.tabs('close', this);
                }
            });
        }
    });
};

/** ========================================================================================
 * 函数名: GetTabObject
 * 描  述:
 * <summary>获取选项卡</summary>
 * 参  数:
 * <param></param>
 * 返回值:
 * <returns>选项卡对象</returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.GetTabObject = function()
{
    return $('#tabs');
}

/** ========================================================================================
 * 函数名: GetCurTab
 * 描  述:
 * <summary>获取当前选项卡面板</summary>
 * 参  数:
 * <param>$oTabs - 选项卡对象</param>
 * 返回值:
 * <returns>当前选中的选项卡面板对象</returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.GetCurTab = function ($oTabs)
{
    return $oTabs.tabs('getSelected');
}

/** ========================================================================================
 * 函数名: GetAllTabs
 * 描  述:
 * <summary>获取所有选项卡面板</summary>
 * 参  数:
 * <param>$oTabs - 选项卡对象</param>
 * 返回值:
 * <returns>所有选项卡面板对象数组</returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.GetAllTabs = function ($oTabs)
{
    return $oTabs.tabs('tabs');
}

/** ========================================================================================
 * 函数名: GetAllTabTitle
 * 描  述:
 * <summary>获取所有选项卡面板标题</summary>
 * 参  数:
 * <param>$oTabs - 选项卡对象</param>
 * 返回值:
 * <returns>所有选项卡面板标题字符串数组</returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.GetAllTabTitle = function ($oTabs)
{
    var aTitles = [];
    var aTabs = HomePage.GetAllTabs($oTabs);

    $.each(aTabs, function ()
    {
        aTitles.push(HomePage.GetTabTitle($(this)));
    });

    return aTitles;
};

/** ========================================================================================
 * 函数名: GetTabTitle
 * 描  述:
 * <summary>获取指定选项卡面板标题</summary>
 * 参  数:
 * <param>oTab - 选项卡面板对象</param>
 * 返回值:
 * <returns>指定选项卡面板标题字符串</returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.GetTabTitle = function(oTab)
{
    return oTab.panel('options').title;
}

/** ========================================================================================
 * 函数名: GetCurTabTitle
 * 描  述:
 * <summary>获取当前选项卡面板标题</summary>
 * 参  数:
 * <param>$oTabs - 选项卡对象</param>
 * 返回值:
 * <returns>选项卡面板标题字符串</returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.GetCurTabTitle = function ($oTabs)
{
    return HomePage.GetTabTitle(HomePage.GetCurTab($oTabs));
}

/** ========================================================================================
 * 函数名: GetTabIndex
 * 描  述:
 * <summary>获取指定选项卡面板的索引</summary>
 * 参  数:
 * <param>$oTabs - 选项卡对象</param>
 * <param>oTab   - 指定选项卡面板</param>
 * 返回值:
 * <returns>指定选项卡面板的索引值</returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.GetTabIndex = function ($oTabs, oTab)
{
    return $oTabs.tabs('getTabIndex', oTab);
}

/** ========================================================================================
 * 函数名: GetCurTabIndex
 * 描  述:
 * <summary>获取当前选项卡面板的索引</summary>
 * 参  数:
 * <param>$oTabs - 选项卡对象</param>
 * 返回值:
 * <returns>当前选项卡面板的索引值</returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.GetCurTabIndex = function($oTabs)
{
    return HomePage.GetTabIndex($oTabs, HomePage.GetCurTab($oTabs));
}

/** ========================================================================================
 * 函数名: GetTabContentSrc
 * 描  述:
 * <summary>获取指定选项卡面板内容的 URL</summary>
 * 参  数:
 * <param>oTab - 指定选项卡面板对象</param>
 * 返回值:
 * <returns>指定选项卡面板内容的 URL 字符串</returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.GetTabContentSrc = function(oTab)
{
    return oTab.panel('options').content.attr('src');
}

/** ========================================================================================
 * 函数名: GetCurTabContentSrc
 * 描  述:
 * <summary>获取当前选项卡面板内容的 URL</summary>
 * 参  数:
 * <param>$oTabs - 选项卡对象</param>
 * 返回值:
 * <returns>当前选项卡面板内容的 URL 字符串</returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.GetCurTabContentSrc = function($oTabs)
{
    var oCurTab = HomePage.GetCurTab($oTabs);
    return HomePage.GetTabContentSrc(oCurTab);
}

/** ========================================================================================
 * 函数名: GetIFrameSrc
 * 描  述:
 * <summary>获取指定选项卡面板包含的 iframe 对象的内容的 URL</summary>
 * 参  数:
 * <param>oTab - 指定的选项卡面板</param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.GetIFrameSrc = function (oTab)
{
    var oIFrame = oTab.find('iframe');
    
    if (oIFrame.length)
    {
        return oIFrame[0].src.replace(location.host, '').replace('http://', '').replace('.aspx', '');
    }
    else
    {
        return ""
    }
};

/** ========================================================================================
 * 函数名: SetLocationHash
 * 描  述:
 * <summary>设置 window 的 location 对象的 hash 属性</summary>
 * 参  数:
 * <param></param>
 * 返回值:
 * <returns></returns>
 * 说  明:
 * <remarks></remarks>
 * =======================================================================================*/
HomePage.SetLocationHash = function ()
{
    try
    {
        var $oTabs = HomePage.GetTabObject();
        var aTabs = HomePage.GetAllTabs($oTabs);
        var oCurTab = HomePage.GetCurTab($oTabs);
        var strSrc = "";

        if (oCurTab)
        {
            strSrc = HomePage.GetIFrameSrc(oCurTab);
            if (strSrc)
            {
                window.location.hash = "!" + strSrc;
            }
            if (strSrc == HomePage.PageConfig.strHomeTabUrl)
            {
                window.location.hash = "";
            }
        }
        else
        {
            strSrc = HomePage.GetIFrameSrc(aTabs[aTabs.length - 1]);
            window.location.hash = "!" + strSrc;
        }
    }
    catch (e)
    {
    }
}

$(HomePage.Init);