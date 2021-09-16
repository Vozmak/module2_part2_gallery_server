"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayGallery = void 0;
const path = require("path");
const fs = require("fs");
const querystring = require("querystring");
const util = require("util");
const readdir = util.promisify(fs.readdir);
async function displayGallery(req) {
    if (req.headers.authorization === 'token') {
        const total = fs.readdirSync('./server/gallery/img').length;
        const galleryURL = new URL(req.url, 'http://127.0.0.1:2000/');
        const page = querystring.parse(galleryURL.search.slice(1), '&', '=').page || '1';
        if (isNaN(Number(page)) || Number(page) > total || Number(page) < 1) {
            return {
                errorMessage: 'Указаной страницы несуществует',
            };
        }
        const imgArray = await readdir(`./server/gallery/img/${page}`);
        const images = imgArray.map((img) => path.join(`../../server/gallery/img/${page}`, img));
        return {
            objects: images,
            page: page,
            total: total,
        };
    }
    return {
        errorMessage: 'Unauthorized',
    };
}
exports.displayGallery = displayGallery;
// Infinity load
//# sourceMappingURL=gallery.js.map