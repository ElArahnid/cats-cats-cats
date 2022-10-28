

// edit cat card
function editCatCard(cardID) {
    // скрываем окно редактируемой карточки
    document.querySelector('.edit-cat-form').classList.remove("hide");
    document.querySelector('.edit-cat-form').classList.add("show");
    document.querySelector(`.cards__personal[data-id="${cardID}"]`).classList.add("hide");
    // document.querySelector('.edit-cat-form')
    document.addEventListener("keyup", (event) => {
        console.log(event.key);
        if (event.key === "Escape")
            document.querySelector(`.cards__personal[data-id="${cardID}"]`).classList.remove("hide");
            document.querySelector('.edit-cat-form').classList.remove("show");
            document.querySelector('.edit-cat-form').classList.add("hide");
    })

    api.getCatById(cardID)
        .then(({ data }) => {
            // заполняем существующими данными окно с формой редактирования кота
            // console.log(document.querySelector(".edit-cat-form select.rate"));
            document.querySelector(".edit-cat-form > h3").innerText = "Внесение правок в устав для " + data.name;
            document.querySelector(".edit-cat-form div.form-edit-cat_preimg").setAttribute("style", `background-image: url(${data.img_link})`);
            document.querySelector(".edit-cat-form input.img_link").value = data.img_link;
            document.querySelector(".edit-cat-form input.age").value = data.age;
            document.querySelector(".edit-cat-form select.rate").value = data.rate;
            document.querySelector(".edit-cat-form textarea.description").value = data.description;
            document.querySelector(".edit-cat-form input.id").value = data.id;
            // вешаем слушателя на кнопку любимчика
            document.querySelector(".form-edit-cat_favor_checkbox").addEventListener("click", () => {
                if (document.querySelector("input.form-edit-cat_favor_checkbox").checked) {
                    document.querySelector(".form-edit-cat_favor_area").classList.add("checked");
                    document.querySelector(".form-edit-cat_favor_label").innerHTML = "Симпатяга!";
                }
                else {
                    document.querySelector(".form-edit-cat_favor_area").classList.remove("checked");
                    document.querySelector(".form-edit-cat_favor_label").innerHTML = "Симпатяга?";
                }
            })

        })
}

// update favorites view
function updateFavInfo(datasFavStatus, datasID) {
    // console.log(datasFavStatus);
    if (datasFavStatus) {
        // console.log('status: ' + datasFavStatus, datasID);
        // console.log(document.querySelector(`${favorClass}[data-id="${datasID}"]`));
        document.querySelector(`.cards__personal > .favor[data-id="${datasID}"]`).classList.add("istrue");
        document.querySelector(`.cards__personal > .favor`).ariaLabel = "Симпатяга!";
        localStorage.clear();
    }
    else {
        // console.log('status: ' + datasFavStatus, datasID);
        // console.log(document.querySelector(`${favorClass}[data-id="${datasID}"]`));
        document.querySelector(`.cards__personal > .favor[data-id="${datasID}"]`).classList.remove("istrue");
        document.querySelector(`.cards__personal > .favor`).ariaLabel = "Симпатяга?";
        localStorage.clear();
    }
}

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

function createCat(dataCat) {
    // console.log(dataCat);
    // формируем блок карточек из темплейта-болванки
    const cardInstance = new Person(dataCat, "#cards__personal__template");
    const newCardPerson = cardInstance.getElement();
    if (dataCat.id) {
        selectors.cards__allcards.prepend(newCardPerson);
        localStorage.clear();
        // console.log(dataCat.favourite);
        updateFavInfo(dataCat.favourite, dataCat.id);
    }
}

function doingFormElements(stop) {
    // запрещаем дефолтный субмит
    stop.preventDefault();
    // console.log([...stop.srcElement]);

    // деструктуризация элементов формы
    // const fromFormElements = [...selectors["form-add-cat-id"].elements];
    const fromFormElements = [...stop.srcElement.elements];

    //извлечение передаваемых данных формы
    const getElementsFromForm = formDataAgregator(fromFormElements);

    // console.log(getElementsFromForm.action);
    if (getElementsFromForm.action === 'edit') {
        // если переданный скрытый параметр из формы edit то редактируем
        // console.log('ветка обновления ' + getElementsFromForm.id)
        api.updateCatById(getElementsFromForm.id, getElementsFromForm)
            .then(() => {
                createCat(getElementsFromForm);
                popapDone.closePopup();
            })
    } else {
        // если не edit, то добавляем кота
        api.addNewCat(getElementsFromForm)
            .then(() => {
                createCat(getElementsFromForm);
                popapDone.closePopup();
            })
    }

}

function areDataRelevance(minute) {
    const setTimer = new Date(new Date().getTime() + minute * 60000);
    localStorage.setItem('allCatsRefresh', setTimer)
}

function checkLocalStorage() {
    const localData = JSON.parse(localStorage.getItem('allCats'));
    // console.log(localData);
    if (localData && localData.length) {
        localData.forEach(function (catData) {
            createCat(catData)
        })
    } else {
        // получаем объекты с котами с сервера
        api.getAllCats()
            .then(({ data }) => {
                // Вывод всех котов на страницу
                data.forEach(function (catData) {
                    createCat(catData);
                })
                localStorage.setItem('allCats', JSON.stringify(data));
                areDataRelevance(1);
            })
    }
}

function loginPopup(login, password) {
    console.log(login, password);
}