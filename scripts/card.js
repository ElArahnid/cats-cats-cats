class Person {
    constructor(dataCat, selectorTemplate, action) {
        this._data = dataCat;
        this._selectorTemplate = selectorTemplate;
        this.action = action;
    }

    _getTempate() { //возвращает содержимое шаблона в видел DOM узла
        return document.querySelector("#cards__personal__template").content.querySelector(".cards__personal")
    }

    getElement() {
        this.element = this._getTempate().cloneNode(true); //клонируем полученное содержимое из шаблона
        this.cardTitle = this.element.querySelector(".cards__personal > h3");
        this.cardImage = this.element.querySelector(".cards__personal > .face");
        this.cardLike = this.element.querySelector(".cards__personal > .favor");
        this.aboutCat = this.element.querySelector(".cards__personal > span");
        this.deleteCat = this.element.querySelector("#edit_delete");
        this.editCat = this.element.querySelector("#edit_edit");
        this.editCatForm = this.element.querySelector("div.edit-cat-form");

        // console.log(this._getTempate());

        // вывод рейтинга 
        const fishRate = '<i class="fa-solid fa-fish"></i>';
        let div = document.createElement("div");
        this.element.append(div)
        this.element.querySelector(".cards__personal > div").classList.add("rating")
        for (let i = 0; i < this._data.rate; i++) {
            let tag = this.element.querySelector(".cards__personal > div.rating");
            tag.innerHTML += fishRate;
        }


        this.element.querySelector("img").addEventListener("click", (event) => {

            let catInfoObj = {};
            let text = '';
            let getCatIdInLocalS = JSON.parse(localStorage.getItem(`catCard${this._data.id}`));
            const elementCard = document.querySelector("div.cat-info");
            elementCard.classList.remove("hide");

            // console.log(Boolean(getCatIdInLocalS));

            if (getCatIdInLocalS) {
                console.log("вывод, если в локалсторадж есть " + this._data.id);
                // console.log(getCatIdInLocalS);
                // console.log(this)
                elementCard.innerHTML = `
                <button class="window-info-cat_close"><i class="fa-solid fa-xmark"></i></button>
                    <h3>${getCatIdInLocalS.name}</h3>
                    <span>${getCatIdInLocalS.age} ${agePrefix(this._data.age)}</span>
                    <img src="${getCatIdInLocalS.src}" style="height: 200px; float: right;">
                    ${getCatIdInLocalS.description}`;

                document.querySelector(".window-info-cat_close").addEventListener("click", () => {
                    elementCard.classList.add("hide");
                })

            } else {
                console.log("вывод, если в локалсторадж пусто");
                catInfoObj.id = this._data.id;
                catInfoObj.name = this._data.name;
                catInfoObj.age = this._data.age;
                catInfoObj.src = this._data.img_link;
                catInfoObj.description = this._data.description;
                const localInfo = 'catCard' + catInfoObj.id;
                localStorage.setItem(localInfo, JSON.stringify(catInfoObj));

                elementCard.innerHTML = `
                <button class="window-info-cat_close"><i class="fa-solid fa-xmark"></i></button>
                    <h3>${catInfoObj.name}</h3>
                    <span>${catInfoObj.age} ${agePrefix(this._data.age)}</span>
                    <img src="${catInfoObj.src}" style="height: 200px; float: right;">
                    ${catInfoObj.description}`;

                document.querySelector(".window-info-cat_close").addEventListener("click", () => {
                    elementCard.classList.add("hide");
                })

            }
        });


        // функция открытия попапа по клику на меню карточки
        function _openPopupPerson() {
            document.querySelector(".add-cat").classList.add("show");
            document.querySelector(".window-delete-cat").classList.remove("hide");
            document.querySelector(".window-delete-cat").classList.add("show");
            document.querySelector(".window-add-cat_close").addEventListener("click", _closePopupPerson);
            // document.querySelector(".form-delete-cat_button").addEventListener("click", () => {
            //     // console.log(`sdvsdfvfvf`);
            // })

        }

        // функция скрытия попапа по клику на меню карточки
        function _closePopupPerson() {
            // console.log(action);
            document.querySelector('.window-delete-cat').classList.remove("show");
            document.querySelector('.window-delete-cat').classList.add("hide");
            document.querySelector(".add-cat").classList.remove("show");
        }

        // вешаем слушателя на кнопку удаления кота и открываем попап
        this.deleteCat.addEventListener("click", () => {
            _openPopupPerson();
            // console.log(this.element);
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
            (this.editCat.parentElement).classList.add("hide");
            this.cardTitle.setAttribute("style", "margin-bottom: 0;");
        }
        else {
            this.editCat.addEventListener("click", () => {
                document.querySelector(".add-cat_popup-container").classList.add("hide");
                editCatCard(this._data.id)
                document.querySelector(".add-cat").classList.add("show")
                document.addEventListener("click", (event) => {
                    // console.log(event.target.className );
                    if (event.target.className === "add-cat show") {
                        // прячем подложку под попапом
                        document.querySelector(".add-cat").classList.remove("show")
                        document.querySelector(".edit-cat_popup-container").classList.remove("show")
                        document.querySelector(".edit-cat_popup-container").classList.add("hide")
                        document.querySelector(".add-cat_popup-container").classList.remove("hide");
                        this.element.classList.remove("hide");
                    }
                })
                document.querySelector(".window-edit-cat_close").addEventListener("click", () => {
                    document.querySelector(".add-cat").classList.remove("show")
                    document.querySelector(".edit-cat_popup-container").classList.remove("show")
                    document.querySelector(".edit-cat_popup-container").classList.add("hide")
                    document.querySelector(".add-cat_popup-container").classList.remove("hide");
                    this.element.classList.remove("hide");
                })

            })
        }

        // обновление фаворита
        // console.log(this.cardLike, this._data.id);
        if ((loginAuth !== Cookies.get("email")) && (passwordAuth !== Cookies.get("password"))) {
            this.cardLike.addEventListener("click", () => { document.querySelector(".authform").classList.remove("hide") })
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
                        // .then(this.element.querySelector(".favor .fa-solid").classList.remove("fa-crown"))
                        // .then(this.element.querySelector(".favor .fa-solid").classList.add("fa-heart"))
                        .then(this.element.querySelector("button").ariaLabel = "Симпатяга?")
                    // .then(localStorage.clear())
                } else {
                    updateFavInfo(true, this._data.id)
                    api.updateCatById(this._data.id, { favourite: true })
                        .then(() => {
                            this._data.favourite = true;
                            updateFavInfo(this._data.favourite, this._data.id);
                        })
                        .then(this.element.querySelector("button").ariaLabel = "Симпатяга!")
                    // .then(localStorage.clear())
                }
            })

        }



        // if(!this._data.cardLike){
        //     cardLike.remove()
        // }

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
