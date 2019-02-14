/*
 * @Author: jing yang 
 * @Date: 2018-08-16 11:42:52 
 */

// 1.引入http模块
var http = require('http');

// 2.用http模块创建服务
// req获取url信息   （request）
// res 浏览器返回响应信息 （response） 
http.createServer(function (req, res) {
    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    //设置 HTTP 头部，状态码是 200，文件类型是 html，字符集是 utf-8
    res.writeHead(200, {
        "Content-type": "text/html,charset:'utf-8'"
    });

    res.write("Hello,World!");
    res.end();
}).listen(8008);

// 终端打印如下信息
console.log("Server is running at http://localhost:8008/");