﻿/*
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
**  文件名: common.js
**  描  述: 
**  作  者: zhangzhigang
**  时  间: 2015-10-24 09:10:49
**--------------------------------------------------------------------------------------------------
版本历史
----------------------------------------------------------------------------------------------------
修改人: zhangzhigang
时  间: 2015-10-24 09:10:49
变更号: 
描  述: 新建。
--------------------------------------------------------------------------------------------------*/
var comm = {};

//弹messagee
comm.message = function (type, message, callback) {
    switch (type) {
        case "success":
            if (parent == window) return alert(message);
            parent.$('#notity').jnotifyAddMessage({ text: message, permanent: false });
            break;
        case "error":
            if (parent == window) return alert(message);
            parent.$.messager.alert('错误', message);
            break;
            /*
            ** begin: - Modified by zhangzhigang on 2015-11-18 09:27:50
            ** Dscription: 增加警示消息
            */
        case "exclamation":
            if (parent == window) return alert(message);
            parent.$.messager.alert('警示', message);
            break;
            /*
            ** end: - Modified by zhangzhigang on 2015-11-18 09:27:50
            */
        case "warning":
            if (parent == window) return alert(message);
            parent.$('#notity').jnotifyAddMessage({ text: message, permanent: false, type: 'warning' });
            break;
        case "information":
            parent.$.messager.show({
                title: '消息',
                msg: message
                //,showType: 'show'
            });
            break;
        case "confirm":
            return parent.$.messager.confirm('确认', message, callback);
    }

    if (callback) callback();
    return null;
};

comm.messageif = function (condition, type, message, callback) {
    if (condition)
        comm.message(type, message, callback);
};

comm.openTab = function () {
    parent.wrapper.addTab.apply(this, arguments);
}

comm.setLocationHashId = function (id) {
    var hash = parent.location.hash.split('/');
    hash[hash.length - 1] = id;
    parent.location.hash = hash.join('/');
};

comm.ajax = function (options) {
    options = $.extend({
        showLoading: true
    }, options);

    var ajaxDefaults = {
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        error: function (e) {
            var msg = e.responseText;
            var ret = msg.match(/^{\"Message\":\"(.*)\",\"ExceptionMessage\":\"(.*)\",\"ExceptionType\":.*/);
            if (ret != null) {
                msg = (ret[2]).replace(/\\"/g, '"').replace(/\\r\\n/g, '<br/>').replace(/dbo\./g, '');
            }
            else {
                try { msg = $(msg).text() || msg; }
                catch (ex) { }
            }

            comm.message('error', msg);
        }
    };

    if (options.showLoading) {
        ajaxDefaults.beforeSend = $.showLoading;
        ajaxDefaults.complete = $.hideLoading;
    }

    $.ajax($.extend(ajaxDefaults, options));
};

comm.query = function (element) {
    var query = $;
    if ($(document).find(element).length == 0 && element != document) {
        if ($(parent.document).find(element)) {
            query = parent.$;
        }
    }
    return query;
};

comm.formValidate = function (context) {
    context = context || document;
    var query = comm.query(context);
    if (query.fn.validatebox) {
        var box = query(".validatebox-text", context);
        if (box.length) {
            box.validatebox("validate");
            box.trigger("focus");
            box.trigger("blur");
            var valid = $(".validatebox-invalid:first", context).focus();
            return valid.length == 0;
        }
    }
    return true;
};

comm.formChanges = function (obj1, obj2, reserve) {
    obj1 = ko.toJS(obj1) || {};
    obj2 = ko.toJS(obj2) || {};
    reserve = reserve || [];
    var result = utils.diffrence(obj1, obj2, reserve, ['__ko_mapping__']);

    var length = 0;
    for (var k in result) length++;
    result._changed = length > reserve.length;

    return result;
};

comm.editGridViewModel = function (grid) {
    var self = this;
    this.begin = function (index, row) {
        if (index == undefined || typeof index === 'object') {
            row = grid.datagrid('getSelected');
            index = grid.datagrid('getRowIndex', row);
        }
        self.editIndex = self.ended() ? index : self.editIndex;
        grid.datagrid('selectRow', self.editIndex).datagrid('beginEdit', self.editIndex);
    };
    this.ended = function () {
        if (self.editIndex == undefined) return true;
        if (grid.datagrid('validateRow', self.editIndex)) {
            grid.datagrid('endEdit', self.editIndex);
            self.editIndex = undefined;
            return true;
        }
        grid.datagrid('selectRow', self.editIndex);
        return false;
    };
    this.addnew = function (rowData) {
        if (self.ended()) {
            if (Object.prototype.toString.call(rowData) != '[object Object]') rowData = {};
            rowData = $.extend({ _isnew: true }, rowData);
            grid.datagrid('appendRow', rowData);
            self.editIndex = grid.datagrid('getRows').length - 1;
            grid.datagrid('selectRow', self.editIndex);
            self.begin(self.editIndex, rowData);
        }
    };
    this.deleterow = function () {
        var selectRow = grid.datagrid('getSelected');
        if (selectRow) {
            var selectIndex = grid.datagrid('getRowIndex', selectRow);
            if (selectIndex == self.editIndex) {
                grid.datagrid('cancelEdit', self.editIndex);
                self.editIndex = undefined;
            }
            grid.datagrid('deleteRow', selectIndex);
        }
    };
    this.clear = function () {
        var rows = grid.datagrid('getRows');
        for (var i = rows.length - 1; i > -1; i--) {
            grid.datagrid('deleteRow', i);
        }
    };
    this.reject = function () {
        grid.datagrid('rejectChanges');
    };
    this.accept = function () {
        grid.datagrid('acceptChanges');
        var rows = grid.datagrid('getRows');
        for (var i in rows) delete rows[i]._isnew;
    };
    this.getChanges = function (include, ignore) {
        if (!include) include = [], ignore = true;
        var deleted = utils.filterProperties(grid.datagrid('getChanges', "deleted"), include, ignore),
            updated = utils.filterProperties(grid.datagrid('getChanges', "updated"), include, ignore),
            inserted = utils.filterProperties(grid.datagrid('getChanges', "inserted"), include, ignore);

        var changes = { deleted: deleted, inserted: utils.minusArray(inserted, deleted), updated: utils.minusArray(updated, deleted) };
        changes._changed = (changes.deleted.length + changes.updated.length + changes.inserted.length) > 0;

        return changes;
    };
    this.isChangedAndValid = function () {
        return self.ended() && self.getChanges()._changed;
    };
};

comm.editTreeGridViewModel = function (grid) {
    var self = this, idField = grid.idField;
    this.begin = function (row) {
        var row = row || grid.treegrid('getSelected');
        if (row) {
            self.editIndex = self.ended() ? row[idField] : self.editIndex;
            grid.treegrid('beginEdit', self.editIndex);
        }
    };
    this.ended = function () {
        if (self.editIndex == undefined) return true;
        if (grid.treegrid('validateRow', self.editIndex)) {
            grid.treegrid('endEdit', self.editIndex);
            self.editIndex = undefined;
            return true;
        }
        grid.treegrid('select', self.editIndex);
        return false;
    };
    this.addnew = function (rowData, parentId) {
        if (self.ended()) {
            if (Object.prototype.toString.call(rowData) != '[object Object]') rowData = {};
            rowData = $.extend({ _isnew: true }, rowData), parentId = parentId || '';
            if (!rowData[idField]) rowData[idField] = utils.uuid();
            grid.treegrid('append', { parent: parentId, data: [rowData] });
            grid.$element().data("datagrid").insertedRows.push(rowData);
            grid.treegrid('select', rowData[idField]);
            self.begin(rowData);
        }
    };
    this.deleterow = function () {
        var row = grid.treegrid('getSelected');
        if (row) {
            if (row[idField] == self.editIndex) {
                grid.treegrid('cancelEdit', self.editIndex);
                self.editIndex = undefined;
            }
            grid.treegrid('remove', row[idField]);
            grid.$element().data("datagrid").deletedRows.push(row);
        }
    };
    this.reject = function () {
        throw "未实现此方法！";
    };
    this.accept = function () {
        grid.treegrid('acceptChanges');
        var rows = grid.$element().datagrid('getRows');
        for (var i in rows) delete rows[i]._isnew;
    };
    this.getChanges = function (include, ignore) {
        if (!include) include = [], ignore = true;
        var deleted = utils.filterProperties(grid.$element().datagrid('getChanges', "deleted"), include, ignore),
            updated = utils.filterProperties(grid.$element().datagrid('getChanges', "updated"), include, ignore),
            inserted = utils.filterProperties(grid.$element().datagrid('getChanges', "inserted"), include, ignore);

        var changes = { deleted: deleted, inserted: utils.minusArray(inserted, deleted), updated: utils.minusArray(updated, deleted) };
        changes._changed = (changes.deleted.length + changes.updated.length + changes.inserted.length) > 0;

        return changes;
    };
    this.isChangedAndValid = function () {
        return self.ended() && self.getChanges()._changed;
    };
};


comm.dialog = function (opts) {
    var query = parent.$, fnClose = opts.onClose;
    opts = query.extend({
        title: 'My Dialog',
        width: 400,
        height: 220,
        closed: false,
        cache: false,
        modal: true,
        html: '',
        url: '',
        viewModel: query.noop
    }, opts);

    opts.onClose = function () {
        if (query.isFunction(fnClose)) fnClose();
        query(this).dialog('destroy');
    };

    if (query.isFunction(opts.html))
        opts.html = utils.functionComment(opts.html);
    else if (/^\#.*\-template$/.test(opts.html))
        opts.html = $(opts.html).html();

    var win = query('<div></div>').appendTo('body').html(opts.html);
    if (opts.url)
        query.ajax({ async: false, url: opts.url, success: function (d) { win.empty().html(d); } });

    win.dialog(opts);
    query.parser.onComplete = function () {
        if ("undefined" === typeof ko)
            opts.viewModel(win);
        else
            ko.applyBindings(new opts.viewModel(win), win[0]);

        query.parser.onComplete = query.noop;
    };
    query.parser.parse(win);
    return win;
};

comm.auditDialog = function () {
    var query = parent.$;
    var winAudit = query('#w_audit_div'), args = arguments;
    if (winAudit.length == 0) {
        var html = '<div id="w_audit_wrapper">'
        html += '    <div id="w_audit_div" class="easyui-dialog"  title="审核" data-options="modal:true,closed:true,iconCls:\'icon-user-accept\'" style="width:400px;height:210px;" buttons="#w_audit_div_button">'
        html += '        <div class="container_16" style="width:90%;margin:5%;">                                                                                  '
        html += '            <div class="grid_3 lbl" style="font-weight: bold;color:#7e7789">审核状态</div>                                                       '
        html += '            <div class="grid_13 val">                                                                                                            '
        html += '                通过<input type="radio" name="AuditStatus" value="passed" data-bind="checked:form.status" style="margin-right:10px;" />          '
        html += '                不通过<input type="radio" name="AuditStatus" value="reject" data-bind="checked:form.status" />                                   '
        html += '            </div>                                                                                                                               '
        html += '            <div class="grid_3 lbl" style="margin-top:5px;font-weight: bold;color:#7e7789" style="font-weight: bold;">审核意见</div>             '
        html += '            <div class="grid_13 val"><textarea style="width:272px;height:60px;" class="tf-text" data-bind="value:form.comment" ></textarea></div> '
        html += '            <div class="clear"></div>                                                                                                            '
        html += '        </div>                                                                                                                                   '
        html += '    </div>                                                                                                                                       '
        html += '    <div id="w_audit_div_button" class="audit_button">                                                                                           '
        html += '        <a href="javascript:void(0)" data-bind="click:confirmClick" class="easyui-linkbutton" iconCls="icon-ok" >确定</a>                        '
        html += '        <a href="javascript:void(0)" data-bind="click:cancelClick" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>                     '
        html += '    </div>                                                                                                                                       '
        html += '</div>';
        var wrapper = query(html).appendTo("body");
        wrapper.find(".easyui-linkbutton").linkbutton();
        winAudit = wrapper.find(".easyui-dialog").dialog();
    }



    var viewModel = function () {
        var self = this;
        this.form = {
            status: ko.observable('passed'),
            comment: ko.observable('')
        };
        this.confirmClick = function () {
            winAudit.dialog('close');
            if (typeof args[0] === 'function') {
                args[0].call(this, ko.toJS(self.form));
            }
        };
        this.cancelClick = function () {
            winAudit.dialog('close');
        };
    }

    var node = winAudit.parent()[0];
    winAudit.dialog('open');
    ko.cleanNode(node);
    ko.applyBindings(new viewModel(), node);
};
function fmtDateTime(value) {
    if (value == null) {
        return;
    } else {
        var date = value.split('T');
        value = date[0] + " " + date[1];
        return value;
    }
}
comm.StateLineDialog = function (row) {
    var query = parent.$;
    var winAudit = query('#w_audit_div'), args = arguments;
    var state = row.State;
    var line = '';
    for (var i = 1; i <= state; i++) {
        if (i == 1) {
            line += '<h6>申报</h6>(' + row.Creator + '，' + fmtDateTime(row.CreateTime.substring(0, 19)) + ')'
        } else if (i == 2) {
            line += '</br><img src="../Content/css/icon/icon/arrow_down(1).png" /></br> <h6>受理</h6>(' + row.Officer + '，' + fmtDateTime(row.OfficeTime.substring(0, 19)) + ')';
        } else if (i == 3) {
            line += '</br><img src="../Content/css/icon/icon/arrow_down(1).png" /></br> <h6>暂停</h6>(' + row.Officer + '，' + fmtDateTime(row.PauseTime.substring(0, 19)) + ')';
        } else if (i == 4) {
            line += '</br><img src="../Content/css/icon/icon/arrow_down(1).png" /></br> <h6>恢复</h6>(' + row.Officer + '，' + fmtDateTime(row.ReTime.substring(0, 19)) + ')';
        } else if (i == 5) {
            line += '</br><img src="../Content/css/icon/icon/arrow_down(1).png" /> </br><h6>办结</h6>(' + row.Officer + '，' + fmtDateTime(row.MakeTime.substring(0, 19)) + ')';
        } else if (i == 6) {
            line += '</br><img src="../Content/css/icon/icon/arrow_down(1).png" /></br> <h6>发件</h6>(' + row.Officer + '，' + fmtDateTime(row.SendFileTime.substring(0, 19)) + ')';
        } else if (i == 7) {
            line += '</br><img src="../Content/css/icon/icon/arrow_down(1).png" /> </br><h6>收件</h6>(' + row.Officer + '，' + fmtDateTime(row.InFileTime.substring(0, 19)) + ')';
        }
    }
    if (winAudit.length == 0 || winAudit.length == 1) {
        var html = '<div id="w_audit_wrapper">'
        html += '    <div id="w_audit_div" class="easyui-dialog"  title="业务流程图" data-options="modal:true,closed:true,iconCls:\'icon-user-accept\'" style="width:420px;height:510px;" buttons="#w_audit_div_button">'
        html += '        <div class="container_16" style="width:90%;margin:5%;">                                                                                  '
        html += '            <div class="grid_3 lbl" style="font-weight: bold;color:#7e7789"></div>                                                       '
        html += '            <div class="grid_13 val">                                                                                                            '
        html += line
        html += '            </div>                                                                                                                               '

        html += '            <div class="clear"></div>                                                                                                            '
        html += '        </div>                                                                                                                                   '
        html += '    </div>                                                                                                                                       '
        html += '    <div id="w_audit_div_button" class="audit_button">                                                                                           '
        html += '        <a href="javascript:void(0)" data-bind="click:cancelClick" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>                     '
        html += '    </div>                                                                                                                                       '
        html += '</div>';
        var wrapper = query(html).appendTo("body");
        wrapper.find(".easyui-linkbutton").linkbutton();
        winAudit = wrapper.find(".easyui-dialog").dialog();
    }
    var viewModel = function () {
        var self = this;
        this.form = {
            status: ko.observable('passed'),
            comment: ko.observable('')
        };
        this.confirmClick = function () {
            winAudit.dialog('close');
            if (typeof args[0] === 'function') {
                args[0].call(this, ko.toJS(self.form));
            }
        };
        this.cancelClick = function () {
            winAudit.dialog('close');
        };
    }

    var node = winAudit.parent()[0];
    winAudit.dialog('open');
    ko.cleanNode(node);
    ko.applyBindings(new viewModel(), node);
};
comm.auditDialogForEditVM = function () {
    var query = parent.$;
    var winAudit = query('#w_audit_div'), args = arguments;
    if (winAudit.length == 0) {
        var html = utils.functionComment(function () {/*
            <div id="w_audit_wrapper">
                <div id="w_audit_div" class="easyui-dialog"  title="审核" data-options="modal:true,closed:true,iconCls:'icon-user-accept'" style="width:400px;height:210px;" buttons="#w_audit_div_button"> 
                    <div class="container_16" style="width:90%;margin:5%;">  
                        <div class="grid_3 lbl" style="font-weight: bold;color:#7e7789">审核状态</div>  
                        <div class="grid_13 val">
                            通过审核<input type="radio" name="AuditStatus" value="passed" data-bind="checked:form.status,disable:disabled" style="margin-right:10px;" /> 
                            取消审核<input type="radio" name="AuditStatus" value="reject" data-bind="checked:form.status,disable:disabled" />
                        </div>
                        <div class="grid_3 lbl" style="margin-top:5px;font-weight: bold;color:#7e7789" style="font-weight: bold;">审核意见</div>  
                        <div class="grid_13 val"><textarea style="width:272px;height:60px;" class="tf-text" data-bind="value:form.comment" ></textarea></div>
                        <div class="clear"></div>
                    </div> 
                </div> 
                <div id="w_audit_div_button" class="audit_button">  
                    <a href="javascript:void(0)" data-bind="click:confirmClick" class="easyui-linkbutton" iconCls="icon-ok" >确定</a>  
                    <a href="javascript:void(0)" data-bind="click:cancelClick" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>  
                </div> 
            </div>
            */});
        var wrapper = query(html).appendTo("body");
        wrapper.find(".easyui-linkbutton").linkbutton();
        winAudit = wrapper.find(".easyui-dialog").dialog();
    }

    var viewModel = function () {
        var self = this;
        this.disabled = ko.observable(true);
        this.form = {
            status: args[0].ApproveState() == "passed" ? "reject" : "passed",
            comment: args[0].ApproveRemark()
        };
        this.confirmClick = function () {
            winAudit.dialog('close');
            if (typeof args[1] === 'function') {
                args[0].ApproveState(this.form.status);
                args[0].ApproveRemark(this.form.comment);
                args[1].call(this, ko.toJS(self.form));
            }
        };
        this.cancelClick = function () {
            winAudit.dialog('close');
        };
    }

    var node = winAudit.parent()[0];
    winAudit.dialog('open');
    ko.cleanNode(node);
    ko.applyBindings(new viewModel(), node);
};

comm.readOnlyHandler = function (type) {
    //readonly
    _readOnlyHandles = {};
    _readOnlyHandles.defaults = _readOnlyHandles.input = function (obj, b) {
        b ? obj.addClass("readonly").attr("readonly", true) : obj.removeClass("readonly").removeAttr("readonly");
    };
    _readOnlyHandles.combo = function (obj, b) {
        var combo = obj.data("combo").combo;
        _readOnlyHandles.defaults(combo.find(".combo-text"), b);
        if (b) {
            combo.unbind(".combo");
            combo.find(".combo-arrow,.combo-text").unbind(".combo");
            obj.data("combo").panel.unbind(".combo");
        }
    };
    _readOnlyHandles.spinner = function (obj, b) {
        _readOnlyHandles.defaults(obj, b);
        if (b) {
            obj.data("spinner").spinner.find(".spinner-arrow-up,.spinner-arrow-down").unbind(".spinner");
        }
    };
    return _readOnlyHandles[type || "defaults"];
};

comm.loadCss = function (url, doc, reload) {
    var links = doc.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++)
        if (links[i].href.indexOf(url) > -1) {
            if (reload)
                links[i].parentNode.removeChild(links[i])
            else
                return;
        }
    var container = doc.getElementsByTagName("head")[0];
    var css = doc.createElement("link");
    css.rel = "stylesheet";
    css.type = "text/css";
    css.media = "screen";
    css.href = url;
    container.appendChild(css);
};

comm.exporter = function (opt) {
    var self = this;

    var defaultOptions = {
        action: "/home/download",
        dataGetter: "api",
        dataAction: "",
        dataParams: {},
        titles: [[]],
        fileType: 'xls',
        compressType: 'none'
    };

    this.paging = function (page, rows) {
        self.params.dataParams.page = page;
        self.params.dataParams.rows = rows;
        return self;
    };

    this.compress = function () {
        self.params.compressType = 'zip';
        return self;
    };

    this.title = function (filed, title) {
        self.params.titles[filed] = title;
        return self;
    };

    this.download = function (suffix) {
        self.params.fileType = suffix || "xls";
        self.params.dataParams = JSON.stringify(self.params.dataParams);
        self.params.titles = JSON.stringify(self.params.titles);

        //创建iframe
        var downloadHelper = $('<iframe style="display:none;" id="downloadHelper"></iframe>').appendTo('body')[0];
        var doc = downloadHelper.contentWindow.document;
        if (doc) {
            doc.open();
            doc.write('')//微软为doc.clear();
            doc.writeln(utils.formatString("<html><body><form id='downloadForm' name='downloadForm' method='post' action='{0}'>", self.params.action));
            for (var key in self.params) doc.writeln(utils.formatString("<input type='hidden' name='{0}' value='{1}'>", key, self.params[key]));
            doc.writeln('<\/form><\/body><\/html>');
            doc.close();
            var form = doc.forms[0];
            if (form) {
                form.submit();
            }
        }
    };

    initFromGrid = function (grid) {
        var options = grid.$element().datagrid('options');
        if (grid.treegrid)
            options.url = options.url || grid.treegrid('options').url;

        var titles = [[]], length = Math.max(options.frozenColumns.length, options.columns.length);
        for (var i = 0; i < length; i++)
            titles[i] = (options.frozenColumns[i] || []).concat(options.columns[i] || [])

        self.params = $.extend(true, {}, defaultOptions, {
            dataAction: options.url,
            dataParams: options.queryParams,
            titles: titles
        });
    };

    if (opt.$element)
        initFromGrid(opt);
    else
        self.params = $.extend(true, {}, defaultOptions, opt);

    return self;
};

comm.setVarible = function (name, value) {
    parent.$(parent.document.body).data(name, value);
};

comm.getVarible = function (name) {
    return parent.$(parent.document.body).data(name);
};

comm.cookie = $.cookie;

comm.getSetting = function (name, defaults) {
    if (!parent.HomePage) return defaults;
    return parent.HomePage.PageConfig[name] || defaults;
};

/*
 * author：CaiYong
 * date：2016-01-28
 * describe：校验时间点是否在指定时间段内
 * return：true:时间重叠；false：时间不重叠
 */
comm.timeOverlapCheck = function timeOverlapCheck(overlapStartTime, overlapEndTime, checkStartTime, checkEndTime) {
    if (overlapStartTime && overlapEndTime && checkStartTime && checkEndTime) {
        var dOST = new Date(overlapStartTime);
        var dOET = new Date(overlapEndTime);
        var dCST = new Date(checkStartTime);
        var dCET = new Date(checkEndTime);

        if (dCST >= dOST && dCST <= dOET) {
            return true;
        } else if (dCST >= dOST && dCST >= dOET) {
            return false;
        } else if (dCST < dOST) {
            if (dCET >= dOST) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
}

/*
 * author：CaiYong
 * date：2016-01-28
 * describe：启用/禁用linkbutton
 * return：true:可以触发onClick；false：不可以触发onClick
 */
comm.linkButtonDisable = function (jq, type) {
    $("#btn_ConfirmAdd").attr("class");
    if (jq) {
        if (type && type == "disabled") {
            if (jq.hasClass("l-btn-disabled")) {
                return false;
            } else {
                jq.addClass("l-btn-disabled");
                return true;
            }
        } else if (type && type == "enable") {
            jq.removeClass("l-btn-disabled");
            return true;
        }
    }
}

comm.EditType = {};
comm.EditType.None = 0;
comm.EditType.Add = 1;
comm.EditType.Edit = 2;
comm.EditType.Delete = 3;