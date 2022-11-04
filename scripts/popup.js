class Popup {
    constructor(action, mainSelector, actionSelector, bttnOpen) {
        this.action = action;
        this.mainSelector = mainSelector; // add-cat
        this.actionSelector = actionSelector; // show
        this.bttnOpen = bttnOpen; // header_btn
    }

    // функция добавления слушателя на кнопку в хедере
    putListenerInBtn() {
        if ((loginAuth === Cookies.get("email")) && (passwordAuth === Cookies.get("password"))) {
            document.querySelector(`.${this.bttnOpen}`).addEventListener("click", this.openPopup)
            // console.log(this.bttnOpen);
        }
        else {
            document.querySelector(`.${this.bttnOpen} .auth`).parentElement.addEventListener("click", () => {
                // console.log(document.querySelector(".window-auth-cat_close"));
                document.querySelector("div.authform").classList.add("show");
                document.querySelector(".add-cat").classList.add("show");
                function hideAuthForm() {
                    document.querySelector("div.authform").classList.remove("show");
                    document.querySelector(".add-cat").classList.remove("show");
                }
                document.querySelector(".add-cat").addEventListener("click", () => hideAuthForm())
                document.addEventListener("keyup", (event) => {
                    if (event.key === 'Escape') hideAuthForm()
                });
                document.querySelector(".window-auth-cat_close").addEventListener("click", () => hideAuthForm())
                // console.log("выводим попап авторизации");
            })
        }
        // console.log(document.querySelector(`.${this.bttnOpen}`));
    }

    // authPopap = () => {

    // }

    // функция открытия модального окна добавлением show
    openPopup = () => {
        // console.log(this.action);
        // action = this.action;
        console.log(this.action, this.actionSelector);
        // открываем попап добавлением show class
        document.querySelector(`.window-${this.action}-cat`).classList.add(`show`);
        document.querySelector(`.add-cat_popup-container`).classList.add("show");
        // document.querySelector(`.window-${this.action}-cat`).classList.remove(`show`);
        document.querySelector(`.${this.mainSelector}`).classList.add(`${this.actionSelector}`);

        // вешаем слушателя на события клавиатуры
        document.addEventListener("keyup", this.closeByEscape);

        // вешаем слушателя на клик вне области попапа
        document.querySelector(`.${this.actionSelector}`).addEventListener("click", (event) => {
            if (event.target.classList.contains(this.actionSelector)) {
                this.closePopup();
                localStorage.clear();
                ////////////////////////////////////////////////////////////////////
                function hideAuthForm() {
                    // document.querySelector(".add-cat").classList.remove("show");
                }
                document.querySelector('.add-cat').addEventListener("click", () => {hideAuthForm()})
                document.addEventListener("keyup", (event) => {
                    if (event.key === 'Escape') hideAuthForm()
                });

            }
        })

        // вешаем слушателя на крестик
        document.querySelector(`.window-${this.action}-cat_close`).addEventListener("click", this.closePopup)
        // console.log('слушатель на крестике');

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

        // вешаем листенер на форму ввода изображения
        document.querySelector(".form-add-cat_input.img_link").addEventListener("input", (val) => {
            document.querySelector(".form-add-cat .form-add-cat_preimg").setAttribute("style", `background-image: url(${val.target.value}); background-size: cover;`)
        });

    }

    // функция скрытия попапа удаление show с помощью крестика, клика вне окна, Escape
    closePopup = () => {
        // console.log(document.querySelector(`.${this.actionSelector}`).classList.contains("show"), this.actionSelector)
        document.querySelector(`.${this.actionSelector}`).classList.remove(this.actionSelector);
        document.querySelector(`.window-${this.action}-cat`).classList.remove(`show`);
        document.querySelector(".add-cat_popup-container").classList.remove("show");
        localStorage.clear();
    }

    // слушаем Escape и реагируем
    closeByEscape = (event) => {
        if (event.key === "Escape") {
            this.closePopup()
        }
    }
}


