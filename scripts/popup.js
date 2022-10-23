const visioClass = "show";
// console.log(document.querySelector(".add-cat"))

class Popup {
    constructor(mainClassName) {
        this._mainClassName = mainClassName;
        this.popup = document.querySelector(`.${mainClassName}`);
        this._closeByEscape = this._closeByEscape.bind(this);
    }

    // определяем название клавиши
    _closeByEscape(event) {
        if (event.key === "Escape") {
            this.doUnVisible()
        }
    }

    // делаем видимым блок добавлением класса show и добавляем слушатель клика за открытым попапом
    doVisible() {
        console.log(this.popup);
        this.popup.classList.add(visioClass);
        document.addEventListener("keyup", this._closeByEscape);
        document.querySelector(`.${visioClass}`).addEventListener("click", (event) => {
            if (event.target.classList.contains(visioClass)) {
                this.doUnVisible()
            }
        })
    }

    // делаем НЕвидимым блок удалением класса show
    doUnVisible() {
        console.log(this);
        this.popup.classList.remove(visioClass);
        document.removeEventListener("keyup", this._closeByEscape)
    }

    fixMainListener() {
        console.log(this);
            selectors["header_btn"].addEventListener("click", this.doVisible);
            selectors["window-add-cat_close"].addEventListener("click", this.doUnVisible);
    }
}
