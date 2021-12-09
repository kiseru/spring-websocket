var ws = null;
var url = "ws://localhost:8080/echo"
var btnDisabledClass = 'v-btn--disabled';

function setConnected(connected) {
    if (connected) {
        document.getElementById('connect').classList.add(btnDisabledClass);
        document.getElementById('disconnect').classList.remove(btnDisabledClass);
        document.getElementById('echo').classList.remove(btnDisabledClass);
    } else {
        document.getElementById('connect').classList.remove(btnDisabledClass);
        document.getElementById('disconnect').classList.add(btnDisabledClass);
        document.getElementById('echo').classList.add(btnDisabledClass);
    }
}

function connect() {
    ws = new WebSocket(url);

    ws.onopen = function() {
        setConnected(true);
    };

    ws.onmessage = function(event) {
        log(event.data);
    };

    ws.onclose = function(event) {
        setConnected(false);
        log('Info: Closing Connection.');
    };
}

function disconnect() {
    if (ws != null) {
        ws.close()
        ws = null;
    }

    setConnected(false);
}

function echo() {
    if (ws != null) {
        var message = document.getElementById('message').value;
        log('Sent: ' + message);
        ws.send(message);
    } else {
        alert('connection not established, please connect.');
    }
}

function log(message) {
    var console = document.getElementById('logging');
    var card = document.createElement('div');
    card.classList.add('mx-auto', 'v-card', 'v-sheet', 'v-sheet--outlined', 'theme--light', 'my-1');
    var cardText = document.createElement('div');
    cardText.classList.add('v-card__text');
    card.appendChild(cardText);
    cardText.appendChild(document.createTextNode(message));
    console.appendChild(card);
    while (console.childNodes.length > 12) {
        console.removeChild(console.firstChild);
    }
    console.scrollTop = console.scrollHeight;
}