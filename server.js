const http = require('http');

var server = http.createServer(function(request, response) {
    var method = request.method;
    var url = request.url;
    var headers = request.headers;
    console.log('///////////////////////////////////////////');
    console.log(response);
    console.log('////////////////////////////////////////////');
    //request setup
    var body = [];
    request.on('error', function(err){
        console.error(err);
    }).on('data', function(chunk){
        body.push(chunk);
    }).on('end', function() {
        body = Buffer.concat(body).toString();
        console.log(body);
        //at this point body has the entire request body stored in it as a string
    });
    //response setup

    console.log(method, url, headers);

    if (method == 'GET' || method == 'HEAD') {
        response.setHeader = ('Content-Type', 'text/html');
        response.statusCode = 200;
    }
    if (method == 'HEAD') {
        response.end();
        return;
    }
    if (method == 'GET') {
        response.write("<!DOCTYPE html>");
        response.write("<html>");
        response.write("<title>Hello World!</title>");
        response.write("<p>Hello World!");
        response.write("</html>");
        response.end();
    }
    if (method == 'POST' || method =='PUT') {
        console.log(body);
        response.setHeader('Location', '/');
        response.statusCode = 302;
        response.end();
    }
    if (method !== 'GET' || method !== 'HEAD' || method !== 'POST' || method !=='PUT') {
        response.statusCode = 403;
        response.end();
    }
}).listen(8080);
