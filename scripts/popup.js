class Popup {
    constructor(action, mainSelector, actionSelector, bttnOpen, idCat) {
        this.action = action;
        this.mainSelector = mainSelector; // add-cat
        this.actionSelector = actionSelector; // show
        this.bttnOpen = bttnOpen; // header_btn
        this.idCat = idCat;
    }

    // функция добавления слушателя на кнопку в хедере
    putListenerInBtn() {
        document.querySelector(`.${this.bttnOpen}`).addEventListener("click", this.openPopup)
        // console.log(document.querySelector(`.${this.bttnOpen}`));
    }

    // функция открытия модального окна добавлением show
    openPopup = () => {
        // открываем попап добавлением show class
        document.querySelector(`.window-add-cat`).classList.remove(`hide`);
        document.querySelector(`.window-add-cat`).classList.remove(`show`);
        document.querySelector(`.${this.mainSelector}`).classList.add(`${this.actionSelector}`);

        // вешаем слушателя на события клавиатуры
        document.addEventListener("keyup", this.closeByEscape);

        // вешаем слушателя на клик вне области попапа
        document.querySelector(`.${this.actionSelector}`).addEventListener("click", (event) => {
            if (event.target.classList.contains(this.actionSelector)) {
                this.closePopup()
            }
        })

        // вешаем слушателя на крестик
        document.querySelector(".window-add-cat_close").addEventListener("click", this.closePopup)

        // вешаем слушателя на кнопку любимчика
        document.querySelector(".form-add-cat_favor_checkbox").addEventListener("click", () => {
            if (document.querySelector("input.form-add-cat_favor_checkbox").checked) {
                document.querySelector(".form-add-cat_favor_area").classList.add("checked");
                document.querySelector(".form-add-cat_favor_label").innerHTML = "Симпатяга!";
            }
            else {
                document.querySelector(".form-add-cat_favor_area").classList.remove("checked");
                document.querySelector(".form-add-cat_favor_label").innerHTML = "Симпатяга?";
            }
        })
    }

    // функция скрытия попапа удаление show с помощью крестика, клика вне окна, Escape
    closePopup = () => {
        // console.log(this.action, this.mainSelector, this.actionSelector, this.bttnOpen);
        document.querySelector(`.${this.actionSelector}`).classList.remove(this.actionSelector);
        document.querySelector(`.window-add-cat`).classList.add(`hide`);
        // document.querySelector(`.window-delete-cat`).classList.remove(`show`);
        // document.querySelector(`.window-delete-cat`).classList.add(`hide`);
        localStorage.clear();
    }

    // слушаем Escape и реагируем
    closeByEscape = (event) => {
        if (event.key === "Escape") {
            this.closePopup()
        }
    }
}


