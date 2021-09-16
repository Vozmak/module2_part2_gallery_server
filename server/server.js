"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const login_js_1 = require("./post/login.js");
const gallery_1 = require("./get/gallery");
const PORT = 2000;
const hostname = '127.0.0.1';
const server = http.createServer((req, res) => {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.writeHead(200);
        res.end();
    }
    else {
        router(req, res).catch(err => {
            console.log(err);
        });
    }
});
server.listen(PORT, hostname, () => {
    console.log(`Listening server: ${hostname}:${PORT}`);
});
async function router(req, res) {
    if (req.url === '/authorization' && req.method === 'POST') {
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            let resBody = (0, login_js_1.login)(body);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify(resBody));
        });
    }
    else if (/gallery/i.test(`${req.url}`) && req.method === 'GET') {
        let gallery = await (0, gallery_1.displayGallery)(req);
        if ("errorMessage" in gallery && gallery.errorMessage) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.writeHead(401);
            res.end(JSON.stringify(gallery));
            return;
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify(gallery));
    }
    else {
        res.writeHead(404);
    }
}
//# sourceMappingURL=server.js.map