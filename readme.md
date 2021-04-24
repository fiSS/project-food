# Проект разбит на отдельные модули(calc.js, cards.js, forms.js, modal.js, slider.js tabs.js, timer.js) и вынесен в папке modules проект находотятся все составляющию для сборки в один конечный файл bundle.js. Для каждого отдельного модуля создаётся функция: 
```javascript 
function name() {
    
}
export default name;
```

#### Фунционал по работе с сервером вынесен в отдельный файл services.js. И мы его просто берём и экспортируем огттуда:
```javascript
export {postData};
```
#### А в форму уже его импортируем:
```javascript
import {postData} from '../services/services';
```

#### В script.js ипортируем все эти модули.
```javascript
import  calc from './modules/calc';
import  cards from './modules/cards';
import  forms from './modules/forms';
import  modal from './modules/modal';
import  slider from './modules/slider';
import  tabs from './modules/tabs';
import  timer from './modules/timer';
import {openModal} from './modules/modal';
```
#### Повесилл обработчик событий на весь глобальный объект window и внутри будут запускать уже все импорированные фунции. Во внутрь сразу передаются аргументы при вызове той или иной фунции.
```javascript

window.addEventListener('DOMContentLoaded', function () {

        const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000);
            
        calc();
        cards();
        forms('form', modalTimerId);
        modal('[data-modal]', '.modal', modalTimerId);
        tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
        tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
        timer('.timer', '2021-08-11');
        slider({
            container: ".offer__slider",
            nextArrow: ".offer__slider-next",
            prevArrow: ".offer__slider-prev",
            slide: ".offer__slide",
            totalCounter: "#total",
            currentCounter: "#current",
            wrapper: ".offer__slider-wrapper",
            field: '.offer__slider-inner'
              
      });

});
```


# JS
## 1.Tabs
##### получил со страницы нужные для работы элементы:
```javascript
let tabs = document.querySelectorAll('.tabheader__item'),
		    tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');
```
##### создал функцию которая скрывает все табы со страницы:
```javascript
function hideTabContent()
```
##### она добавляет класс который прописан в css hide и удаляет класс show и класс tabheader__item_active.
```javascript
tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

tabs.forEach(item => {
    item.classList.remove('tabheader__item_active');
});        
```
##### функция showTabContent, наоборот добавляет класс активности к табу который нужно отобразить на странице, используя параметры по умолчанию устанавливаю (i = 0), если функцию будет вызвана без аргумента.
```javascript
function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
```
##### используя делегирование событий, назначаю событие клика на родителя.
```javascript
tabsParent.addEventListener('click', function(event)
```
##### в отдельную переменную выношу event target.
```javascript
const target = event.target;
```
##### устанавливаю проверку, что если мы кликнули на самом глубоком элементе event.target и у него есть класс 'tabheader__item'
```javascript
if(target && target.classList.contains('tabheader__item'))
```
##### теперь нужно определить номер на который кликнули среди всех табов и по этому номеру вызвать функию showTabContent.
###### перебираем все табы которые лежат в переменной tabs это псевдомассив, и будем сравнивать если элемент который есть в этом массиве совпадает с элементом на который кликнул пользователь, тогда берем его номер и показываем на странице.
```javascript
tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
```
## 2.Timer
##### устанавливаю отправную точку.
```javascript
const deadline = '2020-10-11';
```
##### функцуия которая определяет разницу между deadline и текущим временем. t техническая переменная в которой хранится разница в колличестве миллисекунд, метод Date.parse разбирает строковое представление даты и возвращает количество миллисекунд. Отнимаем от деадлайна текущую дату.
```javascript
function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date())
```
##### при помощи метода Math.floor окрулил до ближайшего целого: дни секунды, минуты, часы, эти все переменные существуют внутри функции, возвращаю их наружу в виде объекта при помощи return.
```javascript
const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
```
##### функция setClock устанавливает часы, в качестве аргументов передаем 2 параметра это селектор с помощью которого будем получать элемент со страницы и конечную дату.
```javascript
function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
```
##### чтобы таймер обновлялся каждую секунду.
```javascript
timeInterval = setInterval(updateClock, 1000);
```
##### функция updateClock обновляет таймер каждую секунду, это расчёт того времени который остался прямо на эту секунду, для этого воспользуемся функцией getTimeRemaining, она будет возвращать объект со всеми данными которые будем использовать.
```javascript
function updateClock() {
            const t = getTimeRemaining(endtime);
```
##### когда получили разницу между планируемым временем и текущем надо его поместить на страницу воспользовавшись методом innerHTML. Сразу в качестве метода использую функцию getZero.
```javascript
days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
```

##### ведущие нули, если формат цифр в дате меньше 10 и больше или равен 0 то добавляем 0 к текущему показателю.
```javascript
  function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }
```
###### чтобы таймер не уходил в минус
```javascript
const t = getTimeRemaining(endtime);
```
##### запуск таймера.
```javascript
setClock('.timer', deadline);
```
## 3.Modal
##### получил элементы со страницы с которыми буду работать, воспользовался дата атрибутами для получения 2-х элементов: data-modal и data-close.
```javascript
const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');
```
##### повесил на кнопки обработчик событий воспользовавшись при перереборе кнопка методом forEach.
```javascript
modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
```
##### создал две функции 1. добавляет класс из стилей show показать и удаляет класс hide, 2. делает всё наоборот добавляет класс hide и удаляет класс show.
```javascript
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }
```
##### на modalCloseBtn повесил обработчик событий, что при клике в качестве аргумента запускать функцию закрытия модального окна.
```javascript
modalCloseBtn.addEventListener('click', closeModal);
```
##### при клике за пределами окна модальное окно закрывается, в стилях  width: 100% и height: 100%, если кликнули непосредственно по подложке, то окно закрывается.
```javascript
modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
```
##### повесил на весь document можно и на window обработчик событий, что при клике на escape модальное окно закрывается. Если событие произошло на клавише escape и classList установлен 'show', то запускать функцию закрытия модального окна closeModal.
```javascript
document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });
```
##### можно также запускать модальное окно через какой то промежуток времени.
```javascript
const modalTimerId = setTimeout(openModal, 3000);
```
##### функция showModalByScroll отвечает за то, что при скроле до низа странице открывается модальное окно. pageYOffset сколько пикселей отлистал пользователь по оси Y. Возьмем свойство которе отвечает за прокрутку, свойство которое отображает высоту именно клиента именно видимой части и будем сравнивать с полной прокруткой и полным контентом который есть, если 2 этих выражения будут совпадать то значит пользователь долистал до конца страницы.
```javascript
function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
```
##### на весь глобальный объект вешается  событие скрола и в качестве аргумента вызывается функция showModalByScroll.
```javascript
window.addEventListener('scroll', showModalByScroll);
```
## 4.Используем классы для создание карточек меню
##### использую классы и конструктор для контруирования однотипных элементов на странице, будет включать в себя: картинку, альтернативное назвавние, заголовок, description, цену родитель(parentSelector).
```javascript
class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }
```
##### в конструкторе создаю метод(анонимную функцию) render которая будет выполнять следующее: создавать новый div на странице и в него при помощи innerHTML воспользовавшись интерполяцией сразу будет помещён код HTML, за исключением тех элементов которые будем собирать в конструкторе, так же указываем, что элемент является дочерним для parent.
```javascript
        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
```
##### 1. способ не рациональный, придётся каждый раз вручную создавать карточки меню.Конструктор готов, теперь можно создавать новые экземпляры MenuCard уже динамически скриптом через "new", прямо на лету, чтобы не добавляет в переменную, потом вызывать это сокращает код, после этого в качестве аргумента вызывается метод render, код по карточкам из html можно удалять, теперь их можно создавать динамически скриптом с указанием параметоров передаваемых в конструктор.
```javascript
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).render();
```
##### 2. Способ создать Функцию для get запросов получить данные с сервера и на их основании строить карточки меню. есть 2 свойства которые получаем от промиса 1.ok дословно что то получили всё ОК либо не ОК. 2.status тот статус который вернуд нам сервер(200, 404, 500...). throw выкидывает ошибку(то что попадает в консоль и их можно видеть). async await превращают асинхронный код в синхронный, всегда идут в паре. Когда будем подходить к пункту меню, будем получать массив с объектами и на основание каждого свойства объекта сможем построить карточки меню.
```javascript
const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`couldnt not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };
```
#### Теперь есть фунция которая создана для get запросов, вызываю эту функцию и указываю тот путь по которому открыт json сервер.
```javascript
getResource('http://localhost:3000/menu')
```
#### запрос ушёл и его необходимо обработать при помощи then. Те данные которые придут с сервера в трансофрмированном виде и внутри не объект, а массив и его можно перебрать при помощи forEach. Используется синтаксис деструктуризации объектов(из объекта вытаскивам свойства в качестве отдельных переменных). Далее применить к нему метод render. Этот конструктор будет вызываться столько раз, сколько объектов внутри массива, который придёт с сервера.
```javascript
.then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new Carts(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
```
#### Второй вариант он не будет формировать классы, а будет формировать вёрстку на лету. лишаемся шаблонизации, но если нужно 1 раз что то построить то подходит.
```javascript
getResource('http://localhost:3000/menu')
        .then(data => createCard(data));

        function createCard(data) {
            data.forEach(({img, altimg, title, descr, price}) => {
                const element = document.createElement('div');

                price = price * 27;

                element.classList.add('menu__item');

                element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
                `;

                document.querySelector('.menu .container').append(element);
            });
        }
```

## 5. forms отправка данных на сервер с использованием JSON формата передачи данных.
#### получил со страницы коллекцию форм.
```javascript
const forms = document.querySelectorAll('form');
```
#### создал обект из которогы буду буду брать статусы отправки данных из формы.
```javascript
const message = {
        loading: 'загрузка',
        success: 'спасибо мы скоро с вами свяжемся',
        failure: 'что-то пошло не так'
    };
```
#### Фунция которая будет отвечать за постинг данных. async говорит нам, что будет какой то асинхорнный код, js видит await и говорит я вижу опрератор await и мне нужно дождаться выполнения этого запроса, какой будет результат мне не важно. Js будет ждать окончания запроса вплодь до 30 секунд(по стандарту) и вот тогда вернется результат сработает  код и await пропустит работу кода дальше, в переменную res поместится какой то результат который получили от сервера и дальше можно с ним работать.
```javascript
const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };
```
#### на эту форму навесил обработчик событий (событие submit-a, срабатывает каждый раз когда пытаемся отправить форму) и отменил стандартное поведение браузера.
```javascript
form.addEventListener('submit', (e) => {
            e.preventDefault();
```
#### создал новый XMLHttpRequest для отправки данных на сервер, метод open открывает соединение.
```javascript
const request = new XMLHttpRequest();
      request.open('POST', 'server.php');
```
#### formData. самый простой способ, чтобы отправить данные из формы это использовать объект 'form-data', не всегда нужно передававать в формате JSON, делается это так создается новая переменная и во внутрь помещается как обычный конструктор через new formData. Во внутрь помещаем ту форму из которой нужно собрать данные. Когда мы подразумеваем, что данные должны идти на сервер, должны абсолютно всегда в HTML у данного элемента указывать атрибут name.(иначе formData не сможет найти этот инпут и взять из него value).
```javascript
const formData = new FormData(form);
```
### Настройка заголовков, чтобы отправить в формате formadata. Когда используем XMLHttpRequest и объекта formData нам заголовок устанавливать не нужно, он устанавливается автоматически. Код ниже не нужен!!!
```javascript
request.setRequestHeader('content-type', 'multipart/form-data');
```
#### дальше отправляем данные на сервер в формате formadata:
```javascript
request.send(formData);
```
#### эта команда берет те данные которые пришли с клиента превращает их в строку и показывает обратно на клиенте. Тот response который будет приходить с сервера.
 
```php
echo var_dump($_POST);
```

#### JSON. чтобы отправить данные в формате JSON:
```javascript
 request.setRequestHeader('content-type', 'aplication/json');
            const formData = new FormData(form);
```

#### есть объект formadata который необходимо превратить в вормат JSON, для этого есть 2 приёма:
##### 1.создаем промежуточный объект object, переберём formData при помощи forEach и поместим все данные в object.
```javascript
            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
```
##### 2. более элегантный способ преобразить formdata в json, получим данные с формы в формате матрицы, теперь надо этот массив с массивами превратить в объект метод fromEntries(из матрицы сделать обычный объект).
```javascript
const json = JSON.stringify(Object.fromEntries(formData.entries()));
```
#### Теперь обычный объект, а не formData можем использвать конвертацию в JSON при помощи метода stringify отправляются данные на сервер. stringify превращает обычный объект в JSON.
```javascript
const json = JSON.stringify(object);
```

#### отправляем данные на сервер в формате JSON. все то что приходит от клиента будет декодировать из JSON. как на php коде получить JSON данные и с ними поработать.
```javascript
request.send(json);
```

```php
?php
$_POST = json_decode(file_get_contents("php://input"), true);
echo var_dump($_POST);
```
#### На сам-ом request отслеживаю событие load, если статус 200(все ок запрос прошел), выводится сообщение что все ОК и при помощи метода reset очищаю форму, если что то идёт не так, уведомляю что что-то не так. Метод reset очистит форму. Альтернативный вариант взять инпуты, перебрать их и очистить их value.
```javascript
            request.addEventListener('load', () => {
                if(request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 4000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
```
#### Взять все формы и под каждую из них подвязать функцию postData. Сейчас на каждую форму будет подвязана функция postData которая и будет обработчиком событий при отправке.
```javascript
forms.forEach(item => {
        postData(item);
    });
```

#### отпраывка данных на сервер современным методом используя fetch.(куда, каким образом и что именно) код намного короче по сравнению с XMLHttpRequest. Для того чтобы использовать fetch необходимо указать fetch(). 1. Отправка formadata. закоментировать трансформацию formada в обычный объект. в работе используется локальный json-server для старта npx json-server db.json, и теперь берем и отправляем этот json на сервер.
```javascript
                postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
```

#### db.json   Cюда будут записываться обращение пользователя когда он отправляет форму с сайта. И будут как то отображаться.
```javascript
"requests": [
  ]
  ```

#### отправка данных в формате JSON. Используем тот же трюк с formadata который необходимо превратить в вормат JSON с промежуточным объектом. Дальше этот объект JSON необходимо передать в body. Отличие от предыдущего только:
```javascript
    headers: {
                    'content-type': 'aplication/json'
                },
                body: JSON.stringify(object)
```
#### в php тоже указать в формат JSON.
```php
$_POST = json_decode(file_get_contents("php://input"), true);
```

## 6. Динамически формируем сообщение после отправки формы. Функционал относится к отправке форм.
#### получил modal__dialog:
```javascript
const prevModalDialog = document.querySelector('.modal__dialog');
```
#### скрываем этот элемент перед тем как показать модальное окно. После этого сразу подвязывается функция openModal.
```javascript
prevModalDialog.classList.add('hide');
openModal();
```
#### создаем динамически новое модальное окно, один modal__dialog заменяем другим и просто формируем ту вёрстку которая будет находится внутри. message сообщение которое будет передаваться о статусе отправки.
```javascript
const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
```
#### помещаем элемент на страницу:
```javascript
document.querySelector('.modal').append(thanksModal);
```
#### через 4 секунды всё должно вернуться на свои места, рукототворный блок исчезает, а старое, что было на странице появится, через 4 секунды.
```javascript
setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
```

#### если элементы формируются динамически, то обрабочики событий на них не повесятся(используем делегирование событий), доработка скрипта, если кликаем на подложку или на крестик то закрывается модальное окно. Теперь в созданном скриптом крестик тоже будет работать.
```javascript
modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });
```
