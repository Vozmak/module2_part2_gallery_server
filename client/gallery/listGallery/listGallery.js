"use strict";
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
(async () => {
    try {
        await displayImgList();
    }
    catch (e) {
        console.log(e);
    }
})();
previous.onclick = function () {
    window.location.href = `gallery.html?page=${localStorage.page - 1}`;
};
next.onclick = function () {
    window.location.href = `gallery.html?page=${Number(localStorage.page) + 1}`;
};
async function displayImgList() {
    const gallery = document.querySelector(".gallery");
    const page = getPage();
    const imgList = await fetch(`http://127.0.0.1:2000/gallery?page=${page}`, {
        method: 'GET',
        headers: {
            "Authorization": localStorage.token
        }
    });
    if (imgList.status !== 200) {
        let error = await imgList.json();
        window.location.href = `gallery.html?page=${localStorage.page}`;
        return alert(error.errorMessage);
    }
    const jsonImgList = await imgList.json();
    for (let img of jsonImgList.objects) {
        let newImg = document.createElement("img");
        newImg.src = img;
        gallery.insertAdjacentElement("beforeend", newImg);
    }
    const div = document.querySelector(".page");
    const p = div.querySelector("p");
    p.textContent = `Страница ${page} из ${jsonImgList.total}`;
    localStorage.setItem("page", page);
}
function getPage() {
    const searchParams = new URL(window.location.href).searchParams;
    let page = searchParams.get('page') || localStorage.page || '1';
    page === "1" ? previous.disabled = true :
        page === "3" ? next.disabled = true : false;
    return page;
}
//# sourceMappingURL=listGallery.js.map