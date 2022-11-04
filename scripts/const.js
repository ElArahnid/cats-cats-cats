// Константы

const selectors = {
    cards__allcards: document.querySelector(".cards__allcards"),
    cards__personal__template: document.querySelector("#cards__personal__template"),
    nameCat: document.querySelector(".cards__personal > h3"),
    faceCat: document.querySelector(".cards__personal > .face"),
    aboutCat: document.querySelector(".cards__personal > span"),
    favorCat: document.querySelector(".cards__personal > .favor"),
    "form-add-cat-id": document.querySelector("#form-add-cat-id"),
    "form-edit-cat-id": document.querySelector("#form-edit-cat-id"),
    "add-cat": document.querySelector(".add-cat"),
    "header_btn": document.querySelector(".header_btn"),
    "window-add-cat_close": document.querySelector(".window-add-cat_close"),
}

let favorClass = ".cards__personal > .favor";
const favorTagFalse = '<button class="favor label-info" aria-label=""><i class="fa-solid fa-crown"></i></button>';
const favorTagIsTrue = '<button class="favor label-info istrue" aria-label=""><i class="fa-solid fa-crown"></i></button>';
const visioClass = "show";
const fishRate = '<i class="fa-solid fa-fish"></i>';
const btnClose = `<button class="window_close"><i class="fa-solid fa-xmark"></i></button>`;

const loginAuth = "elogim@gmail.com";
const passwordAuth = "000";

// let action = "";








// const findFormAddCat = document.querySelector(".add-cat");
// const openFormAddCat = document.querySelector(".header_btn");
// const closeFormAddCat = document.querySelector(".window-add-cat_close");
// const formForAddCat = document.querySelector("#form-add-cat-id");
// const cardsParentElement = document.querySelector(".cards__allcards");
