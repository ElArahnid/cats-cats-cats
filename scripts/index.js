// const cardsContainer = document.querySelector('.cards');
// const btnOpenPopupForm = document.querySelector('.header_btn');
// const formCatAdd = document.querySelector('#form-add-cat-id');

// const popupAddCat = new Popup("add-cat");
// popupAddCat.fixMainListener();

// создание объекта с данными формы
function formDataAgregator(elements) {
    const agregatorResult = {};

    elements.forEach((formArea) => {
        if (formArea === "submit") return;

        if (formArea.type != "chekbox") {
            agregatorResult[formArea.name] = formArea.value;
        }

        if (formArea.type === "chekbox") {
            agregatorResult[formArea.name] = formArea.checked;
        };
    })
    return agregatorResult;
}

function doingFormElements(stop) {
    stop.preventDefault();

    // деструктуризация элементов формы
    const fromFormElements = [...selectors["form-add-cat-id"].elements];

    //извлечение передаваемых данных формы
    const getElementsFromForm = formDataAgregator(fromFormElements);

    console.log(getElementsFromForm);

    // формирование новой карточки и ее добавление
    const newCardPreview = new Person(getElementsFromForm, "#cards__personal__template");
    const newCard = newCardPreview.getElement();
    selectors[cards__allcards].append(newCard);

    popupAddCat.doUnVisible();

}


// Вывод всех котов на страницу
allCats.forEach(function (catData) {
    // формируем блок карточек из темплейта-болванки
    const cardInstance = new Person(catData, "#cards__personal__template");
    const newCardPerson = cardInstance.getElement();

    selectors.cards__allcards.append(newCardPerson);
    if (catData.favourite) {
        newCardPerson.querySelector(".cards__personal > .favor").classList.add("istrue");
        newCardPerson.querySelector(".cards__personal > .favor").ariaLabel = "Симпатяга!";
    }
    else {
        newCardPerson.querySelector(".cards__personal > .favor").ariaLabel = "Симпатяга?";
    }

})

// btnOpenPopupForm.addEventListener('click', () => popupAddCat.doUnVisible())
// formCatAdd.addEventListener('submit', () => doUnVisible())
