let login = (function () {

    let sessionID;
    let initData = {};

    function parseWheels(string) {
        let wheelsMas = string.split('|').map((column) => {
            return column.split('@');
        });
        wheelsMas.map((column, columnIndex) => {
            return column.map((element, rowIndex) => {
                switch (element) {
                    case 'j':
                        element = 1;
                        break;
                    case 'iJ':
                        element = 2;
                        break;
                    case 'q':
                        element = 3;
                        break;
                    case 'iQ':
                        element = 4;
                        break;
                    case 'k':
                        element = 5;
                        break;
                    case 'iK': // КОСТЫЛЬ! Попросить бек чтобы называли одинаково
                        element = 6;
                        break;
                    case 'a':
                        element = 7;
                        break;
                    case 'iA':
                        element = 8;
                        break;
                    case 'wild':
                        element = 9;
                        break;
                    case 'scatter':
                        element = 10;
                        break;
                    case 'sw1':
                        element = 11;
                        break;
                    case 'sw2':
                        element = 12;
                        break;
                    case 'sw3':
                        element = 13;
                        break;
                    case 'card':
                        element = 14;
                        break;
                    default: console.error('Unknown symbol!');
                }
                column[rowIndex] = element;
            });
        });
        return wheelsMas;
    }
    function parseLines(string) {
        let linesMas = string.split('|').map((line, lineNumber) => {
            return line.split('@').map((coords, index) => {
                return coords.split(',');
            });
        });
        return linesMas;
    }

    function enter(userID, casinoID) {
        userID = userID || 2; // КОСТЫЛЬ! Должен получать от сервера инициализации.
        casinoID = casinoID || 2; // КОСТЫЛЬ! Должен получать от сервера инициализации.
        if (localStorage.getItem('userID')) {
            userID = localStorage.getItem('userID');
        }
        if (localStorage.getItem('casinoID')) {
            casinoID = localStorage.getItem('casinoID');
        }
        /* eslint-disable */
        utils.request('_Login', `/${userID}/${casinoID}`)
        /* eslint-enable */
            .then(ID => {
                sessionID = ID;
                /* eslint-disable */
                events.trigger('initGame', sessionID);
                events.trigger('initStages', sessionID);
                events.trigger('initPreloader', sessionID);
                /* eslint-enable */
            })
            .catch(error => console.error(error));
    }

    /* eslint-disable */
    function getSessionID() {
        return utils.getData(sessionID);
    }
    /* eslint-enable */

    function initialize(userID = 2, casinoID = 2, gameID = 'sea') {
        if (localStorage.getItem('userID')) {
            userID = localStorage.getItem('userID');
        }
        if (localStorage.getItem('casinoID')) {
            casinoID = localStorage.getItem('casinoID');
        }
        utils.request('_Initialise', `/${userID}/${casinoID}/${gameID}`)
            .then((data) => {
                sessionID = data.SessionID;
                // console.log('Data:', data);
                events.trigger('initStages', sessionID);
                events.trigger('initPreloader', sessionID);

                initData.balance = data.PlayerState;
                const wheelsString = data.SlotWheels.filter(obj => obj.Mode === 'root')[0].WheelsContent;
                initData.wheels = parseWheels(wheelsString);
                // console.warn('data wheels', initData.wheels);
                const fsWheelsString = data.SlotWheels.filter(obj => obj.Mode === 'fsBonus')[0].WheelsContent;
                initData.freeWheels = parseWheels(fsWheelsString);
                const linesString = data.Lines;
                initData.lines = parseLines(linesString);

                events.trigger('dataDownloaded', initData);
            });
    }

    function getInitData() {
        return utils.getData(initData);
    }

    return {
        enter,
        initialize,
        getInitData,
        getSessionID
    };

})();

login.initialize();
