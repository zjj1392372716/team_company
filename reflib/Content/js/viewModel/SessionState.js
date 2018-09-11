var x = 0;
function makeHttpObject() {
    try { return new XMLHttpRequest(); }
    catch (error) { }
    try { return new ActiveXObject("Msxml2.XMLHTTP"); }
    catch (error) { }
    try { return new ActiveXObject("Microsoft.XMLHTTP"); }
    catch (error) { }

    throw new Error("Could not create HTTP request object.");
}
function myRefresh() {
    var httpRequest = makeHttpObject();
    httpRequest.open("GET", "/login/Test", false);
    httpRequest.send(null);
    x++;
    if (x < 60) {
        setTimeout("myRefresh()", 30 * 1000);  //30秒
    }
}
myRefresh();