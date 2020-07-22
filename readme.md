### JS
#### 1.Tabs
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
#### 2.Timer
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
