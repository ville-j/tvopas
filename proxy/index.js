const http = require('http')
const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer({})
const port = 5050

var server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  proxy.web(req, res, {
    target: 'https://api.elisaviihde.fi/',
    secure: false
  })
})

console.log("listening on port " + port)
server.listen(port)