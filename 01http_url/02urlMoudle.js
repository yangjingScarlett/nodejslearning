/*
 * @Author: jing yang 
 * @Date: 2018-08-16 15:12:04 
 */

var http = require('http');

var url = require('url');

http.createServer(function (req, res) {

    res.writeHead(200, {
        "Content-Type": "text/html;charset='utf-8'"
    });

    if (req.url != '/favicon.ico') {
        console.log(req.url);
        //第一个参数是地址,第二个参数是true的话表示把get传值转换成对象
        var result = url.parse(req.url, true);
        console.log(result);
        console.log(result.query);
    }

    res.write('Hello, World! This is first NodeJs!');
    res.end();

}).listen(8008);

console.log("Server is running at http://localhost:8008")