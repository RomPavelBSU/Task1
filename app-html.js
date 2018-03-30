const http = require('http');
const fs = require("fs");

http.createServer((req, res) => {
    const url = req.url === '/' ? '/index.html' : req.url;

    fs.readFile('./public' + url, (err, data) => {
        if (!err) {
            res.end(data);
        }
        else {
            fs.readFile('./public/error.html', (err, data) => {
                if (!err) {
                    res.end(data);
                }
                else {
                    res.end(err.message);
                }
            });
        }
    });

}).listen(3000);