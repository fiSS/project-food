import {getResource} from '../services/services';

function cards() {
    class Carts {
        constructor(img, altimg, title, descr, price, parentSelector) {
            this.img = img;
            this.altimg = altimg;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const newDiv = document.createElement('div');
            newDiv.innerHTML = `
                <div class="menu__item">
                <img src=${this.img} alt=${this.altimg}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
            `;
            this.parent.append(newDiv);
        }
    }

    
    // 1 вариант создания определенных элементов динамически на странице. data не будет потому что ни чего не отправляем только получаем и объекта с настройками тоже не будет.
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new Carts(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

export default cards;