class Person {
    constructor(dataCat, selectorTemplate) {
        this._data = dataCat;
        this._selectorTemplate = selectorTemplate;

    }

    _getTempate() { //возвращает содержимое шаблона в видел DOM узла
        return document.querySelector("#cards__personal__template").content.querySelector(".cards__personal")
    }

    getElement() {
        this.element = this._getTempate().cloneNode(true); //клонируем полученное содержимое из шаблона
        this.cardTitle = this.element.querySelector(".cards__personal > h3");
        // console.log(this.cardTitle.textContent);
        this.cardImage = this.element.querySelector(".cards__personal > .face");
        this.cardLike = this.element.querySelector(".cards__personal > .favor");

        this.aboutCat = this.element.querySelector(".cards__personal > span");
        this.deleteCat = this.element.querySelector("#edit_delete");
        this.editCat = this.element.querySelector("#edit_edit");
        this.editCatForm = this.element.querySelector("div.edit-cat-form");

        // функция открытия попапа по клику на меню карточки
        function _openPopupPerson() {
            document.querySelector(".add-cat").classList.add("show");
            document.querySelector(".window-delete-cat").classList.remove("hide");
            document.querySelector(".window-delete-cat").classList.add("show");
            document.querySelector(".window-add-cat_close").addEventListener("click", _closePopupPerson);
            document.querySelector(".form-delete-cat_button").addEventListener("click", () => {
            })

        }

        // функция скрытия попапа по клику на меню карточки
        function _closePopupPerson() {
            document.querySelector(".window-delete-cat").classList.remove("show");
            document.querySelector(".window-delete-cat").classList.add("hide");
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
                    .then(localStorage.clear())
            })
            // console.log(this._data)
        })

        // вешаем слушателя на кнопку редактирования кота
        this.editCat.addEventListener("click", () => {
            editCatCard(this._data.id)
        })

        // обновление фаворита
        // console.log(this.cardLike, this._data.id);
        this.cardLike.addEventListener("click", () => {
            console.log(this._data.favourite);
            if (this._data.favourite) {
                api.updateCatById(this._data.id, {favourite: true})
                .then(updateFavInfo(this._data.favourite, this._data.id))
                .then(localStorage.clear())
                // .then(this.cardLike.innerText = this._data.id)
            } else {
                api.updateCatById(this._data.id, {favourite: false})
                .then(updateFavInfo(this._data.favourite, this._data.id))
                .then(localStorage.clear())
                // .then(this.cardLike.innerText = this._data.id)
            }
        })

        // if(!this._data.cardLike){
        //     cardLike.remove()
        // }

        this.cardTitle.textContent = this._data.name;
        this.cardImage.src = this._data.img_link;
        this.aboutCat.textContent = this._data.description;
        this.cardLike.checked = this._data.favourite;
        // this.element.classList.add(this._data.id);
        this.element.setAttribute('data-id', this._data.id);
        this.element.querySelector("button").setAttribute('data-id', this._data.id)

        return this.element;
    }
}
