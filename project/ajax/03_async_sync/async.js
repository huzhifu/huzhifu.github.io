/*
 	测试Ajax同步请求和异步请求:
 	1. 如何设置请求的同步或异步?
 		request.open(method, url, async)  
 		第3个参数就是用来指定是否异步, 默认是true(异步), 设置为false代表同步
 	2. 同步请求与异步请求的区别?
 		1). 执行: request.send()
 		2). 异步: 此方法立即返回, 后面立即获取请求结果数据得不到, 只能在监听回调中获取(当结果数据返回后回调)
 		3). 同步: 此方法不会立即返回, 只有在服务器返回结果才返回, 在后面可以直接获取返回的结果数据, 没有必要再设置监听回调
 */
/*
 测试post类型的Ajax请求
 1. 创建一个xmlhttpRequest对象
 2. 设置回调监听
 3. 打开一个连接
 4. 设置请求头
 5. 发请求
 */
window.onload = function () {

	document.getElementById('asyncBtn').onclick = function () {
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
		request.open('POST', '/node_ajax/test/async_sync'); //异步ajax
		//4. 设置请求头, 对请求体数据进行编码处理
		request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		//5. 发请求
		var result = request.send('username=Bob');
		alert('after send() '+result);
	};

	document.getElementById('syncBtn').onclick = function () {
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
		request.open('POST', '/node_ajax/test/async_sync', false); //同步Ajax
		//4. 设置请求头, 对请求体数据进行编码处理
		request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		//5. 发请求
		var result = request.send('username=Bob2');
		alert('after send() '+result);
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

