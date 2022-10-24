const visioClass = "show";
// console.log(document.querySelector(".add-cat"))

// class Popup {
//     constructor(mainClassName) {
//         this._mainClassName = mainClassName;
//         this.popup = document.querySelector(`.${mainClassName}`);
//         this._closeByEscape = this._closeByEscape.bind(this);
//     }

// // слушаем Scape и реагируем
// function _closeByEscape(event) {
//     if (event.key === "Escape") {
//         doUnVisible()
//     }
// }

// // делаем видимым блок добавлением класса show и добавляем слушатель клика за открытым попапом
// function doVisible() {
//     document.querySelector(".add-cat").classList.add(visioClass);
//     // this.popup.classList.add(visioClass);
//     document.addEventListener("keyup", _closeByEscape);
//     document.querySelector(`.${visioClass}`).addEventListener("click", (event) => {
//         if (event.target.classList.contains(visioClass)) {
//             doUnVisible()
//         }
//     })
// }

// // делаем НЕвидимым блок удалением класса show
// function doUnVisible() {
//     // console.log(this);
//     selectors['add-cat'].classList.remove(visioClass);
//     document.removeEventListener("keyup", _closeByEscape)
// }

// function fixMainListener() {
// console.log(this);
// selectors["header_btn"].addEventListener("click", doVisible);
// selectors["window-add-cat_close"].addEventListener("click", doUnVisible);
// }
// }

class Popup {
    /*
    Класс должен уметь: 
     - Слушать кнопку открытия попапа
     - Открывать модальное окно путем добавления класса css
     - Закрывать модальное окно путем удаления класса нажатием на крестик, нажатием вне модального окна, кнопкой Escape
    
    Класс окна add-cat, видимость изменяет show
     */

    constructor(mainSelector, actionSelector, bttnOpen) {
        this.mainSelector = mainSelector; // add-cat
        this.actionSelector = actionSelector; // show
        this.bttnOpen = bttnOpen; // header_btn
    }

    // функция добавления слушателя на кнопку
    putListenerInBtn() {
        document.querySelector(`.${this.bttnOpen}`).addEventListener("click", this.openPopup)
    }

    // функция открытия модального окна добавлением show
    openPopup = () => {
            // открываем попап добавлением show class
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

    }



    // функция скрытия попапа удаление show с помощью крестика, клика вне окна, Escape
    closePopup = () => {
        document.querySelector(`.${this.actionSelector}`).classList.remove(this.actionSelector);
    }

    // слушаем Escape и реагируем
    closeByEscape = (event) => {
    if (event.key === "Escape") {
        this.closePopup()
    }
    }
}

