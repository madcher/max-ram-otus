
onmessage = ({data}) => {
    const wsConnection = new WebSocket("ws://localhost:8888");

    // web socket
    wsConnection.onopen = function() {
        postMessage({hint: 'Соединение установлено'});
    };

    wsConnection.onclose = function(event) {
        if (event.wasClean) {
            postMessage({hint: 'Соединение закрыто чисто'});
        } else {
            // например, "убит" процесс сервера
            postMessage({hint: 'Обрыв соединения'});
        }
        postMessage({hint: 'Код: ' + event.code + ' причина: ' + event.reason});
    };

    wsConnection.onmessage = evt => {
        // отправляем сообщение в основной поток
        postMessage({message: evt.data});
    }

    wsConnection.onerror = function(error) {
        postMessage({error: "Ошибка " + error.message});
    };
};
