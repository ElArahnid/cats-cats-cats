const cardsContainer = document.querySelector('.cards');
const formCatAdd = document.querySelector('#form-add-cat-id');

const popapDone = new Popup('add', 'add-cat', 'show', 'header_btn');
popapDone.putListenerInBtn();

// создание объекта с данными формы
function formDataAgregator(elements) {
    let agregatorResult = {};

    elements.forEach((formArea) => {
        // console.log(`formArea.name: ${formArea.name} \r\nformArea.value: ${formArea.value} \r\nformArea.type: ${formArea.type} \r\nformArea.checked: ${formArea.checked}`);
        if (formArea === "submit") return;

        if (formArea.type != "checkbox") {
            agregatorResult[formArea.name] = formArea.value;
            // console.log(agregatorResult[formArea.name]);
        }

        if (formArea.type === "checkbox") {
            agregatorResult[formArea.name] = formArea.checked;
            // console.log(`formArea ${formArea}`, agregatorResult[formArea.name], formArea.checked);

        };
        // console.log("agregatorResult: " + agregatorResult);
        // console.log(formArea);
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

    function createCat(dataCat) {
        // формирование новой карточки и ее добавление
        const newCardPreview = new Person(dataCat, "#cards__personal__template");
        const newCard = newCardPreview.getElement();
        selectors["cards__allcards"].prepend(newCard);
    }

    // console.log(getElementsFromForm);

    api.addNewCat(getElementsFromForm)
        .then(() => {
            createCat(getElementsFromForm);
            popapDone.closePopup();
        })

}

// получаем объекты с котами с сервера
api.getAllCats()
    .then(({ data }) => {
        // Вывод всех котов на страницу
        data.forEach(function (catData) {
            // формируем блок карточек из темплейта-болванки
            const cardInstance = new Person(catData, "#cards__personal__template");
            const newCardPerson = cardInstance.getElement();
            if (catData.id) {
                let bttnDel = newCardPerson.querySelector('#edit_delete');
                bttnDel.innerHTML = `<span id="${catData.id}">${catData.id}</span>`;
                
                selectors.cards__allcards.append(newCardPerson);

                if (catData.favourite) {
                    newCardPerson.querySelector(".cards__personal > .favor").classList.add("istrue");
                    newCardPerson.querySelector(".cards__personal > .favor").ariaLabel = "Симпатяга!";
                }
                else {
                    newCardPerson.querySelector(".cards__personal > .favor").ariaLabel = "Симпатяга?";
                }
            }
        })

    })





// прячем форму по submit после отправки данных
formCatAdd.addEventListener('submit', doingFormElements)
