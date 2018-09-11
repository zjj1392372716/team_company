/**
 * 
 */
/**
 * 数字补0
 * @param num 数字
 * @param n 位数
 * @returns
 */
function pad(num, n) {
	var len = num.toString().length;
	while(len < n) {
		num = "0" + num;
		len++;
	}
	return num;
}

/**
 * 从对象数组列表中返回特定键唯一的数据列表
 * @param arr
 * @param key
 * @returns
 */
function removeDuplicates(arr, key) {
    if (!(arr instanceof Array) || key && typeof key !== 'string') {
        return false;
    }

    if (key && typeof key === 'string') {
        return arr.filter((obj, index, arr) => {
            return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === index;
        });

    } else {
        return arr.filter(function(item, index, arr) {
            return arr.indexOf(item) == index;
        });
    }
}
/**
 * 基于对象数组的某个属性求和的方法
 * 调用方式为:array.sum("proName")
 */
Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop]
    }
    return total
}
/**
 * 根据form表达的id清空该表单下的所有输入框
 * @param formId
 * @returns
 */
function clearFormById(formId){
	// variable declaration
    var x, y, z, type = null;
    // loop through forms on HTML page    
    for (x = 0; x < document.forms.length; x++) {
    	if(document.forms[x].id!=formId) continue;
        // loop through each element on form
        for (y = 0; y < document.forms[x].elements.length; y++) {
            // define element type
            type = document.forms[x].elements[y].type;
            // alert before erasing form element
            //alert('form='+x+' element='+y+' type='+type);
            // switch on element type
            switch (type) {
            case 'text':
            case 'textarea':
            case 'password':
            //case "hidden":
                document.forms[x].elements[y].value = '';
                break;
            case 'radio':
            case 'checkbox':
                document.forms[x].elements[y].checked = '';
                break;
            case 'select-one':
                document.forms[x].elements[y].options[0].selected = true;
                break;
            case 'select-multiple':
                for (z = 0; z < document.forms[x].elements[y].options.length; z++) {
                    document.forms[x].elements[y].options[z].selected = false;
                }
                break;
            } // end switch
        } // end for y
    } // end for x
}