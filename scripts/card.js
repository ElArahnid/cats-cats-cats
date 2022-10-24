class Person {
    constructor(dataCat, selectorTemplate ) {
        this._data = dataCat;
        this._selectorTemplate = selectorTemplate;
    }
    
    _getTempate(){ //возвращает содержимое шаблона в видел DOM узла
        return document.querySelector("#cards__personal__template").content.querySelector(".cards__personal")
    }

    getElement() {
        this.element = this._getTempate().cloneNode(true); //клонируем полученное содержимое из шаблона
        const cardTitle =   this.element.querySelector(".cards__personal > h3");
        const cardImage =   this.element.querySelector(".cards__personal > .face");
        const cardLike  =    this.element.querySelector(".cards__personal > .favor");
        const aboutCat  =    this.element.querySelector(".cards__personal > span");

        // if(!this._data.cardLike){
        //     cardLike.remove()
        // }

        cardTitle.textContent = this._data.name;
        cardImage.src = this._data.img_link;
        aboutCat.textContent = this._data.description;
        cardLike.checked = this._data.favourite;

        return this.element;
    }
}
