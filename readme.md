### JS
#### Tabs
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