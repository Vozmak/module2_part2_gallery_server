import * as path from 'path';

const fs = require('fs');
const querystring = require('querystring');

type LoginResponse = {
  'errorMessage': string;
} | {
  'objects': Array<string>;
  'page': string;
  'total': number
}

function displayGallery(req: any): LoginResponse {
  if (req.headers.authorization === 'token') {
    const total: number = fs.readdirSync('./server/gallery/img').length.toString();
    const galleryURL = new URL(req.url, 'http://127.0.0.1:2000/');
    const page: string = querystring.parse(galleryURL.search.slice(1), '&', '=').page || '1';

    if (isNaN(Number(page)) || Number(page) > total ||  Number(page) < 1) {
      return {
        'errorMessage': 'Указаной страницы несуществует',
      };
    }

    let images: Array<string> = fs.readdirSync(`./server/gallery/img/${page}`)
      .map((img: string) => path.join(`../../server/gallery/img/${page}`, img));

    return {
      'objects': images,
      'page': page,
      'total': total,
    };
  }

  return {
    'errorMessage': 'Unauthorized',
  };
}

export { displayGallery };

// Infinity load
