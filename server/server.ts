import { IncomingMessage, ServerResponse } from 'http';

import * as http from 'http';
import { login } from './post/login.js';
import { displayGallery } from './get/gallery';

const PORT: number = 2000;
const hostname: string = '127.0.0.1';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.writeHead(200);
    res.end();
  } else {
    router(req, res);
  }
});

server.listen(PORT, hostname, () => {
  console.log(`Listening server: ${hostname}:${PORT}`);
});

function router(req: IncomingMessage, res: ServerResponse): void {
  if (req.url === '/authorization' && req.method === 'POST') {
    let body: string = '';

    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      let resBody = login(body);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify(resBody));
    });
  } else if (/gallery/i.test(`${req.url}`) && req.method === 'GET') {
    let gallery = displayGallery(req);
    if ("errorMessage" in gallery && gallery.errorMessage) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.writeHead(401);
      res.end(JSON.stringify(gallery));
      return;
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(gallery));
  }
}
