import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'спасибо мы скоро с вами свяжемся',
        failure: 'что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            //не будет сдвигаться иконкак перезвонить позже после отправки сообщения.
            form.insertAdjacentElement('afterend', statusMessage);

                                    
            //чтобы отправить в формате json
            // request.setRequestHeader('content-type', 'aplication/json');
            const formData = new FormData(form);

            
            //преобразить formdata в json, получим данные с формы в формате матрицы, теперь надо этот массив с массивами превратить в объект метод fromEntries(из матрицы сделать обычный объект)
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            
            //в работе используется локальный json-server для старта npx json-server db.json, и теперь берем и отправляем этот json на сервер.
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

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success); //запускаем в качестве аргумента функцию showThanksModal с определенным сообщением
            //         form.reset(); //очистка формы метод reset
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure); //запускаем в качестве аргумента функцию showThanksModal с определенным сообщением
            //     }
            // });
        });
    }

    //динамически формируем сообщение после отправки формы
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
    //обращаеся к db.json с помощью fetch, отсюда возвразаеися промис и обрабатываем при помощи then
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}

export default forms;