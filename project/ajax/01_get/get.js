/*
 测试get类型的Ajax请求
 1. 创建一个xmlhttpRequest对象
 2. 设置回调监听
 3. 打开一个连接
 4. 发请求
 */
window.onload = function () {

    document.getElementById('getBtn').onclick =function () {
        //准备数据
        var username = 'tom';
        //1. 创建一个xmlhttpRequest对象
        var request = createReq();
        //2. 设置回调监听
        request.onreadystatechange = function () {
            if(request.readyState==4 && request.status==200) {
                var result = request.responseText;
                alert(result);
            }
        };
        //3. 打开一个连接
        request.open('GET', '/node_ajax/test/get?username='+username);
        //4. 发请求
        request.send();
    };

    /*
    创建发送ajax请求的XMLHttpRequest对象
     */
    function createReq() {
        var httpReq = null;
        if(window.XMLHttpRequest) {
            httpReq = new XMLHttpRequest();
        } else {//IE6/5
            httpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return httpReq;
    }
};
