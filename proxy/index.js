const http = require("http");
let httpProxy = require("http-proxy");
let proxy = httpProxy.createProxyServer({});

const port = 5050;
var server = http.createServer(function(req, res) {
  res.oldWriteHead = res.writeHead;
  res.writeHead = function(statusCode, headers) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.oldWriteHead(statusCode, headers);
  };
  proxy.web(req, res, {
    target: "https://tv.telia.fi/",
    secure: false
  });
});
console.log("listening on port " + port);
server.listen(port);
