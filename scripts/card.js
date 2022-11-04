class Person {
    constructor(dataCat, selectorTemplate, action) {
        this._data = dataCat;
        this._selectorTemplate = selectorTemplate;
        this.action = action;
    }

    _getTempate() { //возвращает содержимое шаблона в видел DOM узла
        return document.querySelector("#cards__personal__template").content.querySelector(".cards__personal")
    }

    _getTempateInfo() {
        return document.querySelector("#cat-info").content.querySelector(".cat-info")
    }

    getElement() {
        /////////////////////////////////////////////////////////////////////////////////////////
        // для вывода котов
        this.element = this._getTempate().cloneNode(true); //клонируем полученное содержимое из шаблона
        this.cardTitle = this.element.querySelector(".cards__personal > h3");
        this.cardImage = this.element.querySelector(".cards__personal > .face");
        this.cardLike = this.element.querySelector(".cards__personal > .favor");
        this.aboutCat = this.element.querySelector(".cards__personal > span");
        this.deleteCat = this.element.querySelector("#edit_delete");
        this.editCat = this.element.querySelector("#edit_edit");
        this.editCatForm = this.element.querySelector("div.edit-cat-form");

        /////////////////////////////////////////////////////////////////////////////////////////

        // для вывода информации по котам
        this.templ = this._getTempateInfo().cloneNode(true);
        this.catInfoRate = this.templ.querySelector(".cat-info_rate");
        this.catInfoH3 = this.templ.querySelector(".cat-info_h3 > h3");
        this.catInfoCatInfo_age = this.templ.querySelector(".cat-info_cat-info_age");
        // this.catInfoFace = this.templ.querySelector(".cat-info_about-info > .cat-info_face");
        this.catInfoFavor = this.templ.querySelector(".cat-info_favor");
        this.catInfoAboutInfo = this.templ.querySelector(".cat-info_about-info");
        /////////////////////////////////////////////////////////////////////////////////////////

        // вывод рейтинга 
        let div = document.createElement("div");
        this.element.append(div)
        this.element.querySelector(".cards__personal > div").classList.add("rating")
        const fishki = (css, element, rate) => {
            let tag = element.querySelector(css);
            for (let i = 0; i < rate; i++) {
                tag.innerHTML += fishRate;
            }
            return tag.innerHTML;
        }

        fishki(".cards__personal > div.rating", this.element, this._data.rate)

        const addHideListener = () => {
            const hideGlobal = () => {
                this.templ.classList.remove("show");
                console.log(this.templ);
                this.templ.querySelector(".cat-info_rate").innerHTML = "";
                document.querySelector('div.buffer').classList.remove("show");
            }
            document.addEventListener("keyup", function clear(event) { if (event.key === 'Escape') hideGlobal() })
            document.querySelector(".buffer.show").addEventListener("click", () => hideGlobal())
            this.templ.querySelector(".window_close").addEventListener("click", () => hideGlobal())
        }

        const bufferShowHide = () => {
            document.querySelector('div.buffer').append(this.templ);
            document.querySelector('div.buffer').classList.add("show");
        }

        let catInfoObj = {};

        // открытие информации о коте по клику наизображение
        this.element.querySelector("img").addEventListener("click", () => {
            window.scrollTo(0, 0)
            this.templ.setAttribute("data-id", this._data.id);
            this.templ.classList.add("show");

            const localObjCat = `catCard${this._data.id}`;
            let getCatIdInLocalS = JSON.parse(localStorage.getItem(localObjCat));
            // console.log('id: ', localObjCat, 'объект из localStorage: ', getCatIdInLocalS);

            if (!!getCatIdInLocalS === true) {
                // console.log('открытие инфо при НЕПУСТОМ localStorage', !!getCatIdInLocalS );

                bufferShowHide();

                catInfoObj = getCatIdInLocalS;

                this.catInfoRate.innerHTML = fishki(".cat-info_rate", this.templ, catInfoObj.rate);
                this.catInfoH3.innerHTML = 'Имя: ' + catInfoObj.name;
                this.catInfoCatInfo_age.innerHTML = 'Возраст: ' + catInfoObj.age + ' ' + agePrefix(catInfoObj.age);
                // this.catInfoFace.innerHTML += `<img src="${catInfoObj.face}" alt="Портрет ${catInfoObj.name}">`;
                this.catInfoAboutInfo.innerHTML = `<img src="${catInfoObj.face}" alt="Портрет ${catInfoObj.name}">${catInfoObj.about}`;
                // проверка фаворита на тру или фалсе
                if (catInfoObj.favor) {
                    this.catInfoFavor.innerHTML = 'true ' + favorTagIsTrue;
                } else {
                    this.catInfoFavor.innerHTML = 'false ' + favorTagFalse;
                }
                addHideListener(catInfoObj.id);

            } else {
                // console.log('открытие инфо при ПУСТОМ localStorage', !!getCatIdInLocalS);

                bufferShowHide();

                this.catInfoRate.innerHTML = fishki(".cat-info_rate", this.templ, this._data.rate);
                this.catInfoH3.innerHTML = this._data.name;
                this.catInfoCatInfo_age.innerHTML = this._data.age + ' ' + agePrefix(this._data.age);
                // this.catInfoFace.innerHTML += `<img src="${this._data.img_link}" alt="Портрет ${this._data.name}">`;
                this.catInfoAboutInfo.innerHTML = `<img src="${this._data.img_link}" alt="Портрет ${this._data.name}">${this._data.description}`;
                // проверка фаворита на тру или фалсе
                if (this._data.favourite) {
                    this.catInfoFavor.innerHTML = favorTagIsTrue;
                } else {
                    this.catInfoFavor.innerHTML = favorTagFalse;
                }

                const localInfo = 'catCard' + this._data.id;

                catInfoObj.name = this._data.name;
                catInfoObj.rate = this._data.rate;
                catInfoObj.age = this._data.age;
                catInfoObj.face = this._data.img_link;
                catInfoObj.favor = this._data.favourite;
                catInfoObj.about = this._data.description;
                catInfoObj.id = this._data.id;

                localStorage.setItem(localInfo, JSON.stringify(catInfoObj));
                addHideListener(this._data.id);
            }
            ///////////////////////////////////////

        });


        // функция открытия попапа по клику на меню карточки
        function _openPopupPerson() {
            document.querySelector(".add-cat").classList.add("show");
            document.querySelector(".add-cat_popup-container").classList.add("show");
            document.querySelector(".window-delete-cat").classList.add("show");
            document.querySelector(".window-add-cat_close").addEventListener("click", _closePopupPerson);
            // document.querySelector(".form-delete-cat_button").addEventListener("click", () => {
            //     console.log(`sdvsdfvfvf`);
            // })

        }

        // функция скрытия попапа по клику на меню карточки
        function _closePopupPerson() {
            document.querySelector('.window-delete-cat').classList.remove("show");
            document.querySelector(".add-cat").classList.remove("show");
            document.querySelector(".add-cat_popup-container").classList.remove("show");
        }

        // вешаем слушателя на кнопку удаления кота и открываем попап
        this.deleteCat.addEventListener("click", () => {
            _openPopupPerson();
            // console.log(this.element);

            document.querySelector(".add-cat").addEventListener("click", () => {_closePopupPerson()})
            document.addEventListener("keyup", (event) => {if(event.key === "Escape") _closePopupPerson() })

            document.querySelector(".form-delete-cat_button").addEventListener("click", () => {
                api.deleteCatById(this._data.id)
                    .then(_closePopupPerson())
                    .then(this.element.remove())
                // .then(localStorage.clear())
            })
            // console.log(this._data)
        })

        // вешаем слушателя на кнопку редактирования кота
        if ((loginAuth !== Cookies.get("email")) && (passwordAuth !== Cookies.get("password"))) {
            this.editCat.parentElement.classList.add("hide");
            this.cardTitle.setAttribute("style", "margin-bottom: 0;");
        }
        else {
            function hideEdit() {
                document.querySelector(".add-cat").classList.remove("show")
                document.querySelector(".edit-cat_popup-container").classList.remove("show")
                document.querySelector(".add-cat_popup-container").classList.remove("show");
            }
            this.editCat.addEventListener("click", (event) => {
                document.querySelector(".add-cat_popup-container").classList.remove("show");
                editCatCard(this._data.id)
                document.querySelector(".add-cat").classList.add("show")
                document.addEventListener("click", (event) => {
                    // console.log(event.target.className );
                    // console.log("event.target", event.target)
                    if (event.target.className === "add-cat show") {
                        // прячем подложку под попапом
                        hideEdit();
                        this.element.classList.add("show");
                    }
                })
                document.querySelector(".window-edit-cat_close").addEventListener("click", () => {
                    // console.log(this.element);
                    hideEdit();
                    // this.element.classList.add("show");
                })
            })
        }

        // обновление фаворита
        if ((loginAuth !== Cookies.get("email")) && (passwordAuth !== Cookies.get("password"))) {
            this.cardLike.addEventListener("click", () => { document.querySelector(".authform").classList.add("show") })
        }
        else {
            this.cardLike.addEventListener("click", () => {
                console.log(this._data.favourite);
                if (this._data.favourite) {
                    api.updateCatById(this._data.id, { favourite: false })
                        .then(() => {
                            this._data.favourite = false;
                            updateFavInfo(this._data.favourite, this._data.id)
                        })
                        .then(this.element.querySelector("button").ariaLabel = "Симпатяга?")
                        .then(localStorage.clear())
                } else {
                    updateFavInfo(true, this._data.id)
                    api.updateCatById(this._data.id, { favourite: true })
                        .then(() => {
                            this._data.favourite = true;
                            updateFavInfo(this._data.favourite, this._data.id);
                        })
                        .then(this.element.querySelector("button").ariaLabel = "Симпатяга!")
                        .then(localStorage.clear())
                }
            })

        }

        this.cardTitle.textContent = this._data.name;
        this.cardImage.src = this._data.img_link;
        // this.aboutCat.textContent = this._data.description;
        this.cardLike.checked = this._data.favourite;
        this.element.classList.add(this._data.id);
        this.element.setAttribute('data-id', this._data.id);
        this.element.querySelector("button").setAttribute('data-id', this._data.id)

        return this.element;
    }
}
