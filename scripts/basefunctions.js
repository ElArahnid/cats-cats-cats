


// edit cat card
function editCatCard(cardID) {
    // скрываем окно редактируемой карточки
    document.querySelector('.edit-cat-form').classList.remove("hide");
    document.querySelector('.edit-cat-form').classList.add("show");
    document.querySelector(`.cards__personal[data-id="${cardID}"]`).classList.add("hide");
    // document.querySelector('.edit-cat-form')
    document.addEventListener("keyup", (event) => {
        if (event.key === "Escape") {
            document.querySelector(`.cards__personal[data-id="${cardID}"]`).classList.remove("hide");
            document.querySelector('.edit-cat-form').classList.remove("show");
            document.querySelector('.edit-cat-form').classList.add("hide");
        }
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

    if (datasFavStatus) {
        document.querySelector(`.cards__personal > .favor[data-id="${datasID}"]`).classList.add("istrue");
        document.querySelector(`.cards__personal > .favor`).ariaLabel = "Симпатяга!";
        // localStorage.clear();
    }
    else {
        document.querySelector(`.cards__personal > .favor[data-id="${datasID}"]`).classList.remove("istrue");
        document.querySelector(`.cards__personal > .favor`).ariaLabel = "Симпатяга?";
        // localStorage.clear();
    }
}

// создание объекта с данными формы
function formDataAgregator(elements) {
    let agregatorResult = {};

    elements.forEach((formArea) => {
        if (formArea === "submit") return;
        if (formArea.type != "checkbox") {
            agregatorResult[formArea.name] = formArea.value;
        }
        if (formArea.type === "checkbox") {
            agregatorResult[formArea.name] = formArea.checked;
        };
    })
    return agregatorResult;
}

function agePrefix(age) {

    let lastNumberPrefix = (age + '').split('');
    let prefix = '';
    let lastNuberAge = lastNumberPrefix[lastNumberPrefix.length - 1];

    if(age === 1) {prefix = 'год'} else
    if(age >= 5 && age <= 20) {prefix = "лет"} else {
    if (lastNuberAge === 1) { prefix = 'год' }
    else if (lastNuberAge >= 2 && lastNuberAge <= 4) { prefix = 'года' }
    else { prefix = "лет" }
}
    return prefix;
}

/*
1 - год
2 3 4 - года 
5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 лет
21 год
22 23 24 года
25 26 27 28 29 30 лет
31 год
32 33 34 года
35 36 37 38 39 40 лет
*/

function createCat(dataCat) {
    // формируем блок карточек из темплейта-болванки
    const cardInstance = new Person(dataCat, "#cards__personal__template");
    const newCardPerson = cardInstance.getElement();
    if (dataCat.id) {
        selectors.cards__allcards.prepend(newCardPerson);
        // localStorage.clear();
        // console.log(dataCat);
        updateFavInfo(dataCat.favourite, dataCat.id);
    }
}

function doingFormElements(stop) {
    // запрещаем дефолтный субмит
    stop.preventDefault();
    // console.log([...stop.srcElement]);

    // деструктуризация элементов формы
    const fromFormElements = [...stop.srcElement.elements];

    //извлечение передаваемых данных формы
    const getElementsFromForm = formDataAgregator(fromFormElements);

    if (getElementsFromForm.action === 'edit') {
        // если переданный скрытый параметр из формы edit то редактируем
        api.updateCatById(getElementsFromForm.id, getElementsFromForm)
            .then(() => {
                createCat(getElementsFromForm);
                popapDone.closePopup();
            })
    } else if (getElementsFromForm.action === 'auth') {
        const inEmail = document.getElementById("form-auth").email.value;
        const inPassword = document.getElementById("form-auth").password.value;
        if ((inEmail === loginAuth) && (inPassword === passwordAuth)) {
            authData();
            replaceHeaderButtonOpen()
            location.reload();
        }
        else {

        }
    }
    else {
        // если не edit, то добавляем кота
        api.addNewCat(getElementsFromForm)
            .then(() => {
                createCat(getElementsFromForm);
                popapDone.closePopup();
            }).then(console.log(getElementsFromForm))
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

function replaceHeaderButtonLock() {
    document.querySelector(".header_btn i").innerHTML = "?";
    document.querySelector(".header_btn i").classList.remove("fa-cat");
    document.querySelector(".header_btn i").classList.add("fa-lock", "auth");
}

function replaceHeaderButtonOpen() {
    document.querySelector(".header_btn i").innerHTML = "+";
    document.querySelector(".header_btn i").classList.remove("fa-lock");
    document.querySelector(".header_btn i").classList.add("fa-cat");
    document.querySelector(".authform").classList.add("hide");

}