const visioClass = "show";

class Popup {
    /*
    Класс должен уметь: 
     - Слушать кнопку открытия попапа
     - Открывать модальное окно путем добавления класса css
     - Закрывать модальное окно путем удаления класса нажатием на крестик, нажатием вне модального окна, кнопкой Escape
    
    Класс окна add-cat, видимость изменяет show
     */

    constructor(action, mainSelector, actionSelector, bttnOpen) {
        this.action = action;
        this.mainSelector = mainSelector; // add-cat
        this.actionSelector = actionSelector; // show
        this.bttnOpen = bttnOpen; // header_btn
    }

    // функция добавления слушателя на кнопку
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
                if(document.querySelector("input.form-add-cat_favor_checkbox").checked) {
                    document.querySelector(".form-add-cat_favor_area").classList.add("checked");
                    document.querySelector(".form-add-cat_favor_label").innerHTML = "Симпатяга!";
                }
                else
                {
                    document.querySelector(".form-add-cat_favor_area").classList.remove("checked");
                    document.querySelector(".form-add-cat_favor_label").innerHTML = "Симпатяга?";
                }
            })
    }

    // функция скрытия попапа удаление show с помощью крестика, клика вне окна, Escape
    closePopup = () => {
        document.querySelector(`.${this.actionSelector}`).classList.remove(this.actionSelector);
        document.querySelector(`.window-add-cat`).classList.add(`hide`);
        // document.querySelector(`.window-delete-cat`).classList.remove(`show`);
        // document.querySelector(`.window-delete-cat`).classList.add(`hide`);
    }

    // слушаем Escape и реагируем
    closeByEscape = (event) => {
    if (event.key === "Escape") {
        this.closePopup()
    }
    }
}


