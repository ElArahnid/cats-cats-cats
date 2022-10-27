const cardsContainer = document.querySelector('.cards');
const formCatAdd = document.querySelector('#form-add-cat-id');
const favorClass = ".cards__personal > .favor";

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

function createCat(dataCat) {
    // console.log(dataCat);
    // формируем блок карточек из темплейта-болванки
    const cardInstance = new Person(dataCat, "#cards__personal__template");
    const newCardPerson = cardInstance.getElement();
    // console.log(cardInstance);
    if (dataCat.id) {
        selectors.cards__allcards.prepend(newCardPerson);
        if (dataCat.favourite) {
            newCardPerson.querySelector(favorClass).classList.add("istrue");
            newCardPerson.querySelector(favorClass).ariaLabel = "Симпатяга!";
        }
        else {
            newCardPerson.querySelector(favorClass).ariaLabel = "Симпатяга?";
        }
    }
}

function doingFormElements(stop) {
    // запрещаем дефолтный субмит
    stop.preventDefault();

    // деструктуризация элементов формы
    const fromFormElements = [...selectors["form-add-cat-id"].elements];

    //извлечение передаваемых данных формы
    const getElementsFromForm = formDataAgregator(fromFormElements);

    api.addNewCat(getElementsFromForm)
        .then(() => {
            createCat(getElementsFromForm);
            popapDone.closePopup();
        })
}

function areDataRelevance(minute) {
    const setTimer = new Date(new Date().getTime() + minute * 60000);
    localStorage.setItem('allCatsRefresh', setTimer)
}

function checkLocalStorage() {
    const localData = JSON.parse(localStorage.getItem('allCats'));
    // console.log(localData);
    if (localData && localData.length) {
        localData.forEach(function(catData) {
            createCat(catData)
        })
    } else {
        // получаем объекты с котами с сервера
        api.getAllCats()
            .then(({ data }) => {
                // Вывод всех котов на страницу
                data.forEach(function(catData) {
                    createCat(catData);
                })
                localStorage.setItem('allCats', JSON.stringify(data));
                areDataRelevance(1);
            })
    }
}

checkLocalStorage();

// прячем форму по submit после отправки данных
formCatAdd.addEventListener('submit', doingFormElements)

// метод получения спарсенного куки
                        // function getCookie() {
                        //     return document.cookie.split(';').reduce((acc, item) => {
                        //         const [name, value] = item.split('=')
                        //         return {...acc, [name]: value}
                        //     }, {}
                        //     )
                        // }

// // обращаемся к cookie
// // document.cookie = 'email=elogim@gmail.com;samesite=strict;max-age=180';
// Cookies.set('email','elogim@gmail.com');
// Cookies.set('sdbvdb','svsdvsfvb');
// // Cookies.remove('sdbvdb')
// // console.log(document.cookie);
// console.log(Cookies.get('email'));

// // localStorage.setItem('name', 'string');
// localStorage.setItem('name', JSON.stringify({name: "Dfcz"}));
// localStorage.getItem('name')
// console.log( JSON.parse(localStorage.getItem('name')))
// // localStorage.removeItem('name');
// localStorage.clear();