/*
 测试post类型的Ajax请求
 1. 创建一个xmlhttpRequest对象
 2. 设置回调监听
 3. 打开一个连接
 4. 设置请求头
 5. 发请求
 */
window.onload = function () {

    document.getElementById('postBtn').onclick = function () {
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
        request.open('POST', '/node_ajax/test/post');
        //4. 设置请求头, 对请求体数据进行编码处理
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //5. 发请求
        request.send('username=JACK&pasword=123456');
    };

    function createReq() {
        var req = null;
        if(window.XMLHttpRequest) {
            req = new XMLHttpRequest();
        } else {
            req = new new ActiveXObject("Microsoft.XMLHTTP");
        }
        return req;
    }
};

