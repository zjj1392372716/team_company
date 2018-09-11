function checkSpecialCharacter(url) {    
    myRe = /[^>]+?style=[\w]+?:expression\(|\b\(alert|confirm|prompt\b|^\+\v(8|9)|<[^>]*?=[^>]*?&#[^>]*?>|\b(and|or)\b.{1,6}?\(=|>|<|\bin\b|\blike\b\)|\*.+?\*|\s*script\b|<\s*img\b|\bEXEC\b|UNION.+?SELECT|UPDATE.+?SET|INSERT\s+INTO.+?VALUES|\(SELECT|DELETE\).+?FROM|\(CREATE|ALTER|DROP|TRUNCATE\)\s+\(TABLE|DATABASE\)/;
    if (myRe.test(url)) {
        alert("请勿输入非法字符");
        location.href = "/Home/Error";
    } 
}

function checkCharacter() {
    var sUrl = location.search.toLowerCase();
    alert(sUrl);
    var sQuery = sUrl.substring(sUrl.indexOf("=") + 1);
    re = /lect|update|delete|truncate|join|union|exec|insert|drop|count|'|"|;|>|<|%/i;
    if (re.test(sQuery)) {
        alert("请勿输入非法字符");
        location.href = "/Home/Error";
    }
}
