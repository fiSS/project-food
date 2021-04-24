//новый код отправки данных на сервер async await говорит нам, что будет какой то асинхорнный код.
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

//Функция для get запросов получить данные с сервера и на их основании строить карточки меню.
    // есть 2 свойства которые получаем от промиса 1.ok дословно что то получили всё ОК либо не ОК. 2.status тот статус который вернёт нам сервер(200, 404, 500...). throw выкидывает ошибку(то что попадает в консоль и их можно видеть). async await превращают асинхронный код в синхронный, всегда идут в паре. Когда будем подходить к пункту меню, будем получать массив с объектами и на основание каждого свойства объекта сможем построить карточки меню. 

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`couldnt not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

export {postData};
export {getResource};