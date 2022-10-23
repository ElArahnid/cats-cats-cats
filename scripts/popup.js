const visioClass = "show";
// console.log(document.querySelector(".add-cat"))

// class Popup {
//     constructor(mainClassName) {
//         this._mainClassName = mainClassName;
//         this.popup = document.querySelector(`.${mainClassName}`);
//         this._closeByEscape = this._closeByEscape.bind(this);
//     }

    // определяем название клавиши
    function _closeByEscape(event) {
        if (event.key === "Escape") {
            doUnVisible()
        }
    }

    // делаем видимым блок добавлением класса show и добавляем слушатель клика за открытым попапом
    function doVisible() {
        document.querySelector(".add-cat").classList.add(visioClass);
        // this.popup.classList.add(visioClass);
        document.addEventListener("keyup", _closeByEscape);
        document.querySelector(`.${visioClass}`).addEventListener("click", (event) => {
            if (event.target.classList.contains(visioClass)) {
                doUnVisible()
            }
        })
    }

    // делаем НЕвидимым блок удалением класса show
    function doUnVisible() {
        // console.log(this);
        selectors['add-cat'].classList.remove(visioClass);
        document.removeEventListener("keyup", _closeByEscape)
    }

    // function fixMainListener() {
        // console.log(this);
            selectors["header_btn"].addEventListener("click", doVisible);
            selectors["window-add-cat_close"].addEventListener("click", doUnVisible);
    // }
// }
