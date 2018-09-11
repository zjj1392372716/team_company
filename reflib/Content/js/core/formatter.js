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
** © 2011-2015 天津同丰信息技术有限公司保留所有权利。
**--------------------------------------------------------------------------------------------------
**
**  文件名: formatter.js
**  描  述: 
**  作  者: zhangzhigang
**  时  间: 2015-09-18 11:48:28
**--------------------------------------------------------------------------------------------------
版本历史
----------------------------------------------------------------------------------------------------
修改人: zhangzhigang
时  间: 2015-09-18 11:48:28
变更号: 
描  述: 新建。
--------------------------------------------------------------------------------------------------*/

var fmt = {};

fmt.formatDate = function (value)
{
    return utils.formatDate(value, 'yyyy-MM-dd');
};

fmt.formatTime = function (value)
{
    return utils.formatDate(value, 'yyyy-MM-dd hh:mm:ss');
};

//格式化金额
fmt.formatMoney = function (value)
{
    var sign = value < 0 ? '-' : '';
    return sign + utils.formatNumber(Math.abs(value), '#,##0.00');
};

//格式化checkbox
fmt.formatCheckbox = function (value)
{
    var checked = (value || 'false').toString() == 'true';
    return utils.formatString('<img value={0} src="/Content/images/{1}"/>', checked, checked ? "checkmark.gif" : "checknomark.gif");
};
