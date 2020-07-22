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
##### Конструктор готов, теперь можно создавать новые экземпляры MenuCard уже динамически скриптом через "new", прямо на лету, чтобы не добавляет в переменную, потом вызывать это сокращает код, после этого в качестве аргумента вызывается метод render, код по карточкам из html можно удалять, теперь их можно создавать динамически скриптом с указанием параметоров передаваемых в конструктор.
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