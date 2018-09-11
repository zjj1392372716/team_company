//全角半角判断
function checkqjandbj(str){	
	var geo = str.match(/[^\u0020-\u007E\u4E00-\u9FA5\u4E00-\u9FA5\u3002\uFF1F\uFF01\uFF0C\u3001\uFF1B\uFF1A\u300C\u300D\u300E\u300F\u2018\u2019\u201C\u201D\uFF08\uFF09\u3014\u3015\u3010\u3011\u2014\u2026\u2013\uFF0E\u300A\u300B\u3008\u3009]/);
	if(geo != null && geo.length != 0){	   
		return true;
	}else{
		return false;
	}
}
//#与&
function checkSpecificKey(keyCode) {
	var geo = keyCode.match(/[\u0023\u0026]/);
	if(geo != null && geo.length != 0){	   
		return true;
	}else{
		return false;
	}
}
//只存null
function limitedSpace(space){
	if (space == "null"){
		return true;
	}else{
		return false;
	}
}