const cardsContainer = document.querySelector('.cards');
const formCatAdd = document.querySelector('#form-add-cat-id');
const formCatEdit = document.querySelector('#form-edit-cat-id');
const popapDone = new Popup('add', 'add-cat', 'show', 'header_btn');
popapDone.putListenerInBtn();

checkLocalStorage();

// прячем форму по submit после отправки данных
formCatAdd.addEventListener('submit', doingFormElements)
formCatEdit.addEventListener('submit', doingFormElements)




















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