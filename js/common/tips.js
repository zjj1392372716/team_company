/***
 * 系统中所有的提示语
 */
var UsernamePasswordError = "用户名或密码错误！";
var UserLock = "用户已锁定，请联系管理员！";
var UserEmpty = "请输入用户名";
var PasswordEmpty = "请输入密码";
var PINEmpty = "请输入验证码";
var PINOver = "验证码已失效，请重新输入！";
var PINError = "验证码错误，请重新输入！";
var AsteriskEmpty = "星号为必填项！";
var OldPasswordError = "原密码错误，请重新输入！";
var PasswordInconsistency = "密码不一致，请重新输入！";
var ModifyFailed = "修改失败，请稍后重试！";
var OperationFailed = "操作失败，请稍后重试！";
var ModifySuccess = "修改密码成功！";
var OpenWindowsMuch = "打开窗口过多会导致系统运行缓慢！";
var CloseWindows = "您确认关闭所有窗口吗？";
var LogOut = "您确认要退出系统吗？";
var NameExist = "该名称已存在！";
var SelfCanNotAuthority = "自身不能作为上级部门！";
var SureDelete = "您确认要删除该数据吗？";
var SubordinateInstitutions = "存在下级部门，无法删除！";
var AssociatedUser = "存在关联用户，无法删除！";
var SelectPasswordResetUser = "请选择需要重置密码的用户";
var UserEnabled = "该用户已启用！";
var UserDisable = "该用户已禁用！";
var AssociatedRole = "存在关联角色，无法删除！";
var AssociatedPermission = "存在权限，无法删除！";
var ExistingOrganization = "存在关联数据，无法删除！";
var ResetPassword = "密码重置成功！";
var DataUsed = "该数据已被使用，无法删除！";
var LogOff = "您确定要退出系统嘛？";
var EndDateNoThanStartDate = "结束日期不应早于开始日期!";
var InstitutionalFramework = "该部门已存在！";
var user = "该用户已存在！";
var role = "该角色已存在！";
var PermissionDenied = "您没有任何权限！请联系管理员。";
var DataModification = "该数据已被使用，无法删除！";
//该数据被编辑过
function getDataModification(){
	return DataModification;
}
//存在权限，无法删除
function getAssociatedPermission(){
	return AssociatedPermission;
}

//操作失败，稍后再试
function getOperationFailed(){
	return OperationFailed;
}
//修改密码成功
function getModifySuccess(){
	return ModifySuccess;
}
//您没有任何权限！请联系管理员。
function getPermissionDenied(){
	return PermissionDenied;
}	
//该角色已存在！
function getrole(){
	return role;
}
//该用户已存在！
function getuser(){
	return user;
}
//该组织机构已存在！
function getInstitutionalFramework(){
	return InstitutionalFramework;
}
//结束日期不应早于开始日期
function getEndDateNoThanStartDate(){
	return EndDateNoThanStartDate;
}
//您确定要退出登录嘛？
function getLogOff(){
	return LogOff;
}
//该数据已被使用，无法删除！
function getDataUsed(){
	return DataUsed;
}
//重置密码成功！
function getResetPassword(){
	return ResetPassword;
}
//存在组织机构，无法删除！
function getExistingOrganization(){
	return ExistingOrganization;
}
//存在关联角色，无法删除！
function getAssociatedRole(){
	return AssociatedRole;
}
//该用户已禁用！
function getUserDisable(){
	return UserDisable;
}
//该用户已启用！
function getUserEnabled(){
	return UserEnabled;
}
//请选择需要重置密码的用户
function getSelectPasswordResetUser(){
	return SelectPasswordResetUser;
}
//存在关联用户，无法删除！
function getAssociatedUser(){
	return AssociatedUser;
}
//存在下级组织机构，无法删除！
function getSubordinateInstitutions(){
	return SubordinateInstitutions;
}
//您确认要删除该数据吗？
function getSureDelete(){
	return SureDelete;
}
//自身不能作为上级机构！
function getSelfCanNotAuthority(){
	return SelfCanNotAuthority;
}
//该名称已存在！
function getNameExist(){
	return NameExist;
}
//您确认要退出系统吗？
function getLogOut(){
	return LogOut;
}
//您确认关闭所有窗口吗？
function getCloseWindows(){
	return CloseWindows;
}
//打开窗口过多会导致系统运行缓慢！
function getOpenWindowsMuch(){
	return OpenWindowsMuch;
}

//修改失败，请稍后重试！
function getModifyFailed(){
	return ModifyFailed;
}

//用户名或密码错误！
function getUsernamepasswordError(){
	return UsernamepasswordError;
}

//用户已锁定，请联系管理员！
function getUserLock(){
	return UserLock;
}

//请输入用户名
function getUserEmpty(){
	return UserEmpty;
}

//请输入密码
function getPasswordEmpty(){
	return PasswordEmpty;
}

//请输入验证码
function getPINEmpty(){
	return PINEmpty;
}

//验证码已失效，请重新输入！
function getPINOver(){
	return PINOver;
}

//验证码错误，请重新输入！
function getPINError(){
	return PINError;
}	

//星号为必填项！
function getAsteriskEmpty(){
	return AsteriskEmpty;
}	

//原密码错误，请重新输入！
function getOldPasswordError(){
	return OldPasswordError;
}

//密码不一致，请重新输入！
function getPasswordInconsistency(){
	return PasswordInconsistency;
}
