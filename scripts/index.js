const cardsContainer = document.querySelector('.cards');
const formCatAdd = document.querySelector('#form-add-cat-id');
const popapDone = new Popup('add-cat', 'show', 'header_btn');
popapDone.putListenerInBtn();

// создание объекта с данными формы
function formDataAgregator(elements) {
    const agregatorResult = {};

    elements.forEach((formArea) => {
        if (formArea === "submit") return;

        if (formArea.type != "chekbox") {
            agregatorResult[formArea.name] = formArea.value;
        }

        if (formArea.type === "chekbox") {
            console.log(formArea.value + " = checkbox")
            agregatorResult[formArea.name] = formArea.checked;
        };
    })
    return agregatorResult;
}

function doingFormElements(stop) {
    // запрещаем дефолтный субмит
    stop.preventDefault();

    // деструктуризация элементов формы
    const fromFormElements = [...selectors["form-add-cat-id"].elements];

    //извлечение передаваемых данных формы
    const getElementsFromForm = formDataAgregator(fromFormElements);

    // формирование новой карточки и ее добавление
    const newCardPreview = new Person(getElementsFromForm, "#cards__personal__template");
    const newCard = newCardPreview.getElement();
    selectors["cards__allcards"].prepend(newCard);

    popapDone.closePopup();
}

// получаем объекты с котами с сервера
api.getAllCats()
    .then(({ data }) => {
        // Вывод всех котов на страницу
        data.forEach(function (catData) {
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

    })



// прячем форму после submit
formCatAdd.addEventListener('submit', doingFormElements)
