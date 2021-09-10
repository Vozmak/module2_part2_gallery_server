"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
if (!localStorage.token)
    window.location.href = '../index.html';
if (localStorage.timestamp < Date.now()) {
    localStorage.removeItem('token');
    localStorage.removeItem('timestamp');
    window.location.href = '../index.html';
}
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
// displayImgList()
//   .then( result => {
//   if (result) alert(result);
// }).catch(e => {
//   console.log(e);
// });
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield displayImgList();
    }
    catch (e) {
        console.log(e);
    }
}))();
previous.onclick = function () {
    window.location.href = `gallery.html?page=${localStorage.page - 1}`;
};
next.onclick = function () {
    window.location.href = `gallery.html?page=${+localStorage.page + 1}`;
};
function displayImgList() {
    return __awaiter(this, void 0, void 0, function* () {
        const gallery = document.querySelector(".gallery");
        const page = getPage();
        const imgList = yield fetch(`https://glq7fjiy07.execute-api.us-east-1.amazonaws.com/api/gallery?page=${page}`, {
            headers: {
                "Authorization": localStorage.token
            }
        });
        if (imgList.status !== 200) {
            let error = yield imgList.json();
            window.location.href = `gallery.html?page=${localStorage.page}`;
            return alert(error.errorMessage);
        }
        const jsonImgList = yield imgList.json();
        for (let img of jsonImgList.objects) {
            let newImg = document.createElement("img");
            newImg.src = img;
            gallery.insertAdjacentElement("beforeend", newImg);
        }
        const div = document.querySelector(".page");
        const p = div.querySelector("p");
        p.textContent = `Страница ${page} из ${jsonImgList.total}`;
        localStorage.setItem("page", page);
    });
}
function getPage() {
    const searchParams = new URL(window.location.href).searchParams;
    let page = searchParams.get('page') || localStorage.page || '1';
    page === "1" ? previous.disabled = true :
        page === "5" ? next.disabled = true : false;
    return page;
}
//# sourceMappingURL=listGallery.js.map