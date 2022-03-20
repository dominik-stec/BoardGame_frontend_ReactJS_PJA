"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Game = void 0;
var react_1 = require("react");
var react_2 = require("react");
require("./fields.css");
var styled_components_1 = require("styled-components");
var gameContext_1 = require("../../gameContext");
var gameService_1 = require("../../services/gameService");
var react_transition_group_1 = require("react-transition-group");
var Colors;
(function (Colors) {
    Colors[Colors["BROWN"] = 1] = "BROWN";
    Colors[Colors["GREEN"] = 2] = "GREEN";
    Colors[Colors["BLUE"] = 3] = "BLUE";
    Colors[Colors["RED"] = 4] = "RED";
    Colors[Colors["BLACK"] = 5] = "BLACK";
    Colors[Colors["GOLD"] = 6] = "GOLD";
})(Colors || (Colors = {}));
var Cards;
(function (Cards) {
    Cards[Cards["NONE"] = 0] = "NONE";
    Cards[Cards["CHANCE"] = 1] = "CHANCE";
    Cards[Cards["HELP"] = 2] = "HELP";
    Cards[Cards["ASK"] = 3] = "ASK";
    Cards[Cards["RISK"] = 4] = "RISK";
})(Cards || (Cards = {}));
var chances = [
    'szansa 1',
    'szansa 2'
];
var helps = [
    'pomoc 1',
    'pomoc 2'
];
var asks = [
    'pytanie 1',
    'pytanie 2'
];
var risks = [
    'zagrozenie 1',
    'zagrozenie 2'
];
var fullBoard = [
    {
        type: Cards.NONE,
        content: 'Napięcie, niepewność, dyskomfort'
    },
    {
        type: Cards.NONE,
        content: 'Lęk, niepokój, strach, obawy'
    },
    {
        type: Cards.ASK,
        content: 'Odmieniam Swoją Głowę - losuję pytanie'
    },
    {
        type: Cards.NONE,
        content: 'Bliscy zauważają, że coś się ze mną dzieje'
    },
    {
        type: Cards.NONE,
        content: 'Trudności w skupieniu uwagi, myśleniu i zapamiętywaniu; powracające (niewygodne) myśli'
    },
    {
        type: Cards.NONE,
        content: 'Złość, agresja'
    },
    {
        type: Cards.NONE,
        content: 'Ignorowanie niepokojących oznak (np. ataki agresji, natrętne myśli, problemy z koncentracją) - cofnięcie o 4 pola do tyłu'
    },
    {
        type: Cards.HELP,
        content: 'Szukam pomocy - rzucam kostką i losuję niebieską kartę'
    },
    {
        type: Cards.NONE,
        content: 'Utrzymywanie się objawów'
    },
    {
        type: Cards.NONE,
        content: 'Kłopoty w relacjach z bliskimi, znajomymi, rodziną'
    },
    {
        type: Cards.CHANCE,
        content: 'Szansa - pobieram kartę Szansa'
    },
    {
        type: Cards.NONE,
        content: 'Trudności w radzeniu sobie ze stresem'
    },
    {
        type: Cards.ASK,
        content: 'Odmieniam Swoją Głowę - losuję pytanie'
    },
    {
        type: Cards.NONE,
        content: 'Bliscy zachęcają mnie do wizyty u specjalisty'
    },
    {
        type: Cards.NONE,
        content: 'Nieadekwatne reakcje na frustrację (np. wycofanie społeczne, ataki paniki, ataki agresji, apatia)'
    },
    {
        type: Cards.RISK,
        content: 'Zagrożenie - pobieram kartę Zagrożenia'
    },
    {
        type: Cards.NONE,
        content: 'Odmawiam pomocy - cofam się o jedno pole'
    },
    {
        type: Cards.HELP,
        content: 'Otrzymuję pomoc - rzucam kostką i losuję niebieską kartę'
    },
    {
        type: Cards.ASK,
        content: 'Odmieniam Swoją Głowę - losuję pytanie'
    },
    {
        type: Cards.NONE,
        content: 'Rozmawiam z rodziną z swoich problemach - przesuwam się o 3 pola do przodu (szansa)'
    },
    {
        type: Cards.NONE,
        content: 'Obniżenie aktywności, apatia, wycofanie z relacji społecznych, bierność'
    },
    {
        type: Cards.NONE,
        content: 'Odmawiam pomocy ze strony bliskich - omijam 1. kolejkę'
    },
    {
        type: Cards.CHANCE,
        content: 'Szansa - pobieram kartę Szansa'
    },
    {
        type: Cards.NONE,
        content: 'Czuję, że ludzie zwracają na mnie uwagę, na moje zachowanie'
    },
    {
        type: Cards.ASK,
        content: 'Odmieniam Swoją Głowę = losuję pytanie'
    },
    {
        type: Cards.NONE,
        content: 'Znajoma zwierza mi się, że miała podobny problem do mojego'
    },
    {
        type: Cards.NONE,
        content: 'Poddaję się stereotypom na temat choroby (np. dziwak, wariatka; alkoholik, alkoholiczka; bandyta itp.) - omijam 1. kolejkę'
    },
    {
        type: Cards.NONE,
        content: 'Problemy w szkole/pracy'
    },
    {
        type: Cards.RISK,
        content: 'Zagrożenie - pobieram kartę Zagrożenia'
    },
    {
        type: Cards.NONE,
        content: 'Nasilenie objawów (nadmierne reagowanie)'
    },
    {
        type: Cards.ASK,
        content: 'Odmieniam Swoją Głowę - losuję pytanie'
    },
    {
        type: Cards.NONE,
        content: 'Poznaję nową osobę, z którą z którą mogę rozmawiać o swoich trudnościach - przesuwam się o 3 pola do przodu (szansa)'
    },
    {
        type: Cards.NONE,
        content: 'Próba samobójcza - omijam 2 kolejki'
    },
    {
        type: Cards.HELP,
        content: 'Otrzymuję pomoc - rzucam kostką i losuję niebieską kartę'
    },
    {
        type: Cards.NONE,
        content: 'Zaczynam spędzać czas z osobami, które pogłębiają moje objawy albo razem robimy rzeczy niedozwolone'
    },
    {
        type: Cards.CHANCE,
        content: 'Szansa - pobieram kartę Szansa'
    },
    {
        type: Cards.NONE,
        content: 'Doświadczam kryzysu psychicznego, ale radzę sobie - przesuwam się o jedno pole do tyłu'
    },
    {
        type: Cards.RISK,
        content: 'Zagrożenie - pobieram kartę Zagrożenia'
    },
    {
        type: Cards.NONE,
        content: 'Leczę się regularnie, systematycznie i korzystam z pomocy psychoterapeutycznej - przesuwasz się o 3 pola do przodu'
    },
    {
        type: Cards.NONE,
        content: 'Odmawiam leczenia - cofam si o 10 pól'
    },
    {
        type: Cards.NONE,
        content: 'Poddaję się stereotypom - czekam jedną kolejkę'
    },
    {
        type: Cards.CHANCE,
        content: 'Szansa - pobieram kartę Szansa'
    },
    {
        type: Cards.NONE,
        content: 'Ucieczka z domu/bezdomność - stoję w miejscu 2 kolejki'
    },
    {
        type: Cards.NONE,
        content: 'Nieoczekiwany stres - rzucam kostką ponownie'
    },
    {
        type: Cards.NONE,
        content: 'Pomagam innym'
    },
    {
        type: Cards.HELP,
        content: 'Szukam pomocy - rzucam kostką i losuję niebieską kartę'
    },
    {
        type: Cards.NONE,
        content: 'Nawrót choroby - stoję jedną kolejkę'
    },
    {
        type: Cards.ASK,
        content: 'Odmieniam Swoją Głowę - losuję pytanie'
    },
    {
        type: Cards.NONE,
        content: 'Jestem aktywny/a - rzucam kostką ponownie'
    },
    {
        type: Cards.RISK,
        content: 'Zagrożenie - pobieram kartę Zagrożenia'
    },
    {
        type: Cards.NONE,
        content: 'Odczuwam satysfakcję z życia'
    },
    {
        type: Cards.NONE,
        content: 'META - Wygrywam (wiedzę na temat zaburzeń psychicznych, walkę ze stereotypami na temat zaburzeń psychicznych)'
    },
];
var PlayStopper = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  z-index: 99;\n  cursor: default;\n"], ["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  z-index: 99;\n  cursor: default;\n"])));
var CubeDiv = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: fixed;\n  z-index: 2;\n  margin: 50px;\n  width: 50px;\n  height  50px;\n  top: 20px;\n  background-color: ", ";\n  opactiy: ", ";\n"], ["\n  position: fixed;\n  z-index: 2;\n  margin: 50px;\n  width: 50px;\n  height  50px;\n  top: 20px;\n  background-color: ", ";\n  opactiy: ", ";\n"])), function (props) { return Colors[props.number]; }, function (props) { return props.opacity; });
var FieldContext = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: inline-block;\n  bottom: 10px;\n  transition: 3s;\n"], ["\n  display: inline-block;\n  bottom: 10px;\n  transition: 3s;\n"])));
var Field = styled_components_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  margin: 10px;\n  width: 80px;\n  height  80px;\n  font-size: ", ";\n  font-family: Helvetice, sans-serif;\n  overflow: hidden;\n  overflow-wrap: break-word;\n  text-transform: uppercase;\n  color: ", ";\n  text-align: center;\n  padding: 10px 0;\n  box-shadow: 0 0 5px gray; \n  transition: 1s;\n  background-color: ", ";\n  &:hover {\n    border-radius: 25px;\n    width: 200px;\n    height 200px;\n    font-size: 18px;\n    box-shadow: 0 0 15px ", "; \n  }\n\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  margin: 10px;\n  width: 80px;\n  height  80px;\n  font-size: ", ";\n  font-family: Helvetice, sans-serif;\n  overflow: hidden;\n  overflow-wrap: break-word;\n  text-transform: uppercase;\n  color: ", ";\n  text-align: center;\n  padding: 10px 0;\n  box-shadow: 0 0 5px gray; \n  transition: 1s;\n  background-color: ", ";\n  &:hover {\n    border-radius: 25px;\n    width: 200px;\n    height 200px;\n    font-size: 18px;\n    box-shadow: 0 0 15px ",
    "; \n  }\n\n"])), function (props) { return props.number == 6 ? '15px' : '8px'; }, function (props) { return props.number == 6 ? 'black' : 'white'; }, function (props) { return Colors[props.number]; }, function (props) {
    switch (props.number) {
        case '1': return 'brown';
        case '2': return 'green';
        case '3': return 'blue';
        case '4': return 'red';
        case '5': return 'black';
        case '6': return 'gold';
    }
});
var CardChance = styled_components_1["default"].div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  margin: 25px;\n  width: 100px;\n  height  150px;\n  font-size: 25px;\n  text-align: center;\n  color: white;\n  padding: 30px 0;\n  box-shadow: 0 0 10px gray; \n    background-color: ", ";\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  margin: 25px;\n  width: 100px;\n  height  150px;\n  font-size: 25px;\n  text-align: center;\n  color: white;\n  padding: 30px 0;\n  box-shadow: 0 0 10px gray; \n    background-color: ",
    ";\n"])), function (props) {
    return Colors[props.color];
});
var CardHelp = styled_components_1["default"].div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  right: 0;\n  margin: 25px;\n  width: 100px;\n  height  150px;\n  font-size: 25px;\n  text-align: center;\n  color: white;\n  padding: 30px 0;\n  box-shadow: 0 0 10px gray; \n    background-color: ", ";\n"], ["\n  position: fixed;\n  top: 0;\n  right: 0;\n  margin: 25px;\n  width: 100px;\n  height  150px;\n  font-size: 25px;\n  text-align: center;\n  color: white;\n  padding: 30px 0;\n  box-shadow: 0 0 10px gray; \n    background-color: ",
    ";\n"])), function (props) {
    return Colors[props.color];
});
var CardRisk = styled_components_1["default"].div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  margin: 25px;\n  width: 100px;\n  height  150px;\n  font-size: 18px;\n  text-align: center;\n  color: white;\n  padding: 40px 0;\n  box-shadow: 0 0 10px gray; \n    background-color: ", ";\n"], ["\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  margin: 25px;\n  width: 100px;\n  height  150px;\n  font-size: 18px;\n  text-align: center;\n  color: white;\n  padding: 40px 0;\n  box-shadow: 0 0 10px gray; \n    background-color: ",
    ";\n"])), function (props) {
    return Colors[props.color];
});
var CardAsk = styled_components_1["default"].div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  position: fixed;\n  bottom: 0;\n  right: 0;\n  margin: 25px;\n  width: 100px;\n  height  150px;\n  font-size: 25px;\n  text-align: center;\n  color: white;\n  padding: 30px 0;\n  box-shadow: 0 0 10px gray; \n  transition: 3s;\n    background-color: ", ";\n"], ["\n  position: fixed;\n  bottom: 0;\n  right: 0;\n  margin: 25px;\n  width: 100px;\n  height  150px;\n  font-size: 25px;\n  text-align: center;\n  color: white;\n  padding: 30px 0;\n  box-shadow: 0 0 10px gray; \n  transition: 3s;\n    background-color: ",
    ";\n"])), function (props) {
    return Colors[props.color];
});
var CardChanceClicked = styled_components_1["default"].div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: flex;  \n  position: fixed;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  z-index: 3;\n  top: 0;\n  left: 50%;\n  transform: translate(-50%, 0);\n  margin: 25px;\n  font-size: 25px;\n  text-align: center;\n  color: white;\n  padding: 30px 0;\n  box-shadow: 0 0 10px gray; \n  border: 3px solid #3987c9;\n  transition: 3s;\n    background-color: ", ";\n"], ["\n  display: flex;  \n  position: fixed;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  z-index: 3;\n  top: 0;\n  left: 50%;\n  transform: translate(-50%, 0);\n  margin: 25px;\n  font-size: 25px;\n  text-align: center;\n  color: white;\n  padding: 30px 0;\n  box-shadow: 0 0 10px gray; \n  border: 3px solid #3987c9;\n  transition: 3s;\n    background-color: ",
    ";\n"])), function (props) {
    return Colors[props.color];
});
var CardHelpClicked = styled_components_1["default"].div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  display: flex;  \n  position: fixed;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  z-index: 3;\n  top: 0;\n  left: 50%;\n  transform: translate(-50%, 0);\n  margin: 25px;\n  font-size: 25px;\n  text-align: center;\n  color: white;\n  padding: 30px 0;\n  box-shadow: 0 0 10px gray; \n  border: 3px solid #3987c9;\n  transition: 3s;\n    background-color: ", ";\n"], ["\n  display: flex;  \n  position: fixed;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  z-index: 3;\n  top: 0;\n  left: 50%;\n  transform: translate(-50%, 0);\n  margin: 25px;\n  font-size: 25px;\n  text-align: center;\n  color: white;\n  padding: 30px 0;\n  box-shadow: 0 0 10px gray; \n  border: 3px solid #3987c9;\n  transition: 3s;\n    background-color: ",
    ";\n"])), function (props) {
    return Colors[props.color];
});
var CardRiskClicked = styled_components_1["default"].div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  display: flex;  \n  position: fixed;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  z-index: 3;\n  top: 0;\n  left: 50%;\n  transform: translate(-50%, 0);\n  margin: 25px;\n  font-size: 25px;\n  text-align: center;\n  color: white;\n  padding: 30px 0;\n  box-shadow: 0 0 10px gray; \n  border: 3px solid #3987c9;\n  transition: 3s;\n    background-color: ", ";\n"], ["\n  display: flex;  \n  position: fixed;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  z-index: 3;\n  top: 0;\n  left: 50%;\n  transform: translate(-50%, 0);\n  margin: 25px;\n  font-size: 25px;\n  text-align: center;\n  color: white;\n  padding: 30px 0;\n  box-shadow: 0 0 10px gray; \n  border: 3px solid #3987c9;\n  transition: 3s;\n    background-color: ",
    ";\n"])), function (props) {
    return Colors[props.color];
});
var CardAskClicked = styled_components_1["default"].div(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  display: flex;  \n  position: fixed;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  z-index: 3;\n  top: 0;\n  left: 50%;\n  transform: translate(-50%, 0);\n  margin: 25px;\n  font-size: 25px;\n  text-align: center;\n  color: white;\n  padding: 30px 0;\n  box-shadow: 0 0 10px gray; \n  border: 3px solid #3987c9;\n  transition: 3s;\n    background-color: ", ";\n"], ["\n  display: flex;  \n  position: fixed;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  z-index: 3;\n  top: 0;\n  left: 50%;\n  transform: translate(-50%, 0);\n  margin: 25px;\n  font-size: 25px;\n  text-align: center;\n  color: white;\n  padding: 30px 0;\n  box-shadow: 0 0 10px gray; \n  border: 3px solid #3987c9;\n  transition: 3s;\n    background-color: ",
    ";\n"])), function (props) {
    return Colors[props.color];
});
var FieldsContainer = styled_components_1["default"].div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\nposition: fixed;\n  bottom: 25px;\n  margin: auto;\n  color: white;\n  transition: 3s;\n"], ["\nposition: fixed;\n  bottom: 25px;\n  margin: auto;\n  color: white;\n  transition: 3s;\n"])));
var TextFieldContainer = styled_components_1["default"].div(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\ndisplay: flex;\nfont-size: 1em;\nalign-items: center;\noverflow-wrap: anywhere;\n&::before, &::after {\n  content: ''; \n  margin: auto;\n}\n"], ["\ndisplay: flex;\nfont-size: 1em;\nalign-items: center;\noverflow-wrap: anywhere;\n&::before, &::after {\n  content: ''; \n  margin: auto;\n}\n"])));
function Game() {
    var _a = react_2.useContext(gameContext_1["default"]), initialSocket = _a.initialSocket, setInitialSocket = _a.setInitialSocket;
    var _b = react_2.useContext(gameContext_1["default"]), individualName = _b.individualName, setIndividualName = _b.setIndividualName;
    var _c = react_2.useContext(gameContext_1["default"]), individualField = _c.individualField, setIndividualField = _c.setIndividualField;
    var _d = react_2.useState(), gameState = _d[0], setGameState = _d[1];
    var isFirstRender = react_2.useRef(true);
    var isPlayerLeave = react_2.useRef(false);
    var callbacksLimit = react_2.useRef(0);
    var _e = react_2.useState(false), isPlayerInTurn = _e[0], setPlayerInTurn = _e[1];
    var _f = react_2.useState(false), isChanceActive = _f[0], setChanceActive = _f[1];
    var _g = react_2.useState(false), isChanceClicked = _g[0], setChanceClicked = _g[1];
    var chance = react_2.useRef('none');
    var _h = react_2.useState(false), isHelpActive = _h[0], setHelpActive = _h[1];
    var _j = react_2.useState(false), isHelpClicked = _j[0], setHelpClicked = _j[1];
    var help = react_2.useRef('none');
    var _k = react_2.useState(false), isRiskActive = _k[0], setRiskActive = _k[1];
    var _l = react_2.useState(false), isRiskClicked = _l[0], setRiskClicked = _l[1];
    var risk = react_2.useRef('none');
    var _m = react_2.useState(false), isAskActive = _m[0], setAskActive = _m[1];
    var _o = react_2.useState(false), isAskClicked = _o[0], setAskClicked = _o[1];
    var ask = react_2.useRef('none');
    var _p = react_2.useState(false), closePopup = _p[0], setClosePopup = _p[1];
    var fieldOrder = react_2.useRef(Array());
    var handleGameStart = function () {
        if (initialSocket)
            gameService_1["default"].onStartGame(initialSocket, function (options) {
                setGameState(options);
                isFirstRender.current = true;
            });
    };
    var initFirstPlayer = function () {
        if (gameState) {
            gameState.forEach(function (state) {
                if (state.isActive) {
                    if (individualName === state.name) {
                        setPlayerInTurn(true);
                    }
                }
                return;
            });
        }
    };
    var throwCube = function () {
        return Math.floor(Math.random() * 6) + 1;
    };
    var PlayersFields = function () {
        var jsx = react_1["default"].createElement("div", null, "Players fields empty");
        if (gameState) {
            var column_1 = [];
            var result_1 = [];
            gameState.forEach(function (player, idx) {
                column_1.splice(idx, 0, react_1["default"].createElement(Field, { key: idx, number: '6' },
                    react_1["default"].createElement(TextFieldContainer, null, player.name)));
                fieldOrder.current = [];
                for (var i = player.fieldOnMap; i < player.actualField; i++) {
                    switch (fullBoard[i].type) {
                        case Cards.NONE: {
                            column_1.push(react_1["default"].createElement(react_transition_group_1.CSSTransition, { "in": true, timeout: 500, classNames: 'list-transition', unmountOnExit: true, appear: true },
                                react_1["default"].createElement(Field, { number: '1' }, fullBoard[i].content)));
                            if (player.name === individualName && player)
                                fieldOrder.current.push(Cards.NONE);
                            break;
                        }
                        case Cards.CHANCE: {
                            column_1.push(react_1["default"].createElement(react_transition_group_1.CSSTransition, { "in": true, timeout: 500, classNames: 'list-transition', unmountOnExit: true, appear: true },
                                react_1["default"].createElement(Field, { number: '2' }, fullBoard[i].content)));
                            if (player.name === individualName && player)
                                fieldOrder.current.push(Cards.CHANCE);
                            break;
                        }
                        case Cards.HELP: {
                            column_1.push(react_1["default"].createElement(react_transition_group_1.CSSTransition, { "in": true, timeout: 500, classNames: 'list-transition', unmountOnExit: true, appear: true },
                                react_1["default"].createElement(Field, { number: '3' }, fullBoard[i].content)));
                            if (player.name === individualName && player)
                                fieldOrder.current.push(Cards.HELP);
                            break;
                        }
                        case Cards.RISK: {
                            column_1.push(react_1["default"].createElement(react_transition_group_1.CSSTransition, { "in": true, timeout: 500, classNames: 'list-transition', unmountOnExit: true, appear: true },
                                react_1["default"].createElement(Field, { number: '5' }, fullBoard[i].content)));
                            if (player.name === individualName && player)
                                fieldOrder.current.push(Cards.RISK);
                            break;
                        }
                        case Cards.ASK: {
                            column_1.push(react_1["default"].createElement(react_transition_group_1.CSSTransition, { "in": true, timeout: 500, classNames: 'list-transition', unmountOnExit: true, appear: true },
                                react_1["default"].createElement(Field, { number: '4' }, fullBoard[i].content)));
                            if (player.name === individualName && player)
                                fieldOrder.current.push(Cards.ASK);
                            break;
                        }
                    }
                }
                console.log('after', fieldOrder.current);
                if (individualName === player.name) {
                    if (fieldOrder.current[fieldOrder.current.length - 1] === Cards.CHANCE) {
                        // setPlayerInTurn(true)
                        if (closePopup) {
                            setChanceActive(false);
                        }
                        else {
                            setChanceActive(true);
                        }
                    }
                    else if (fieldOrder.current[fieldOrder.current.length - 1] === Cards.HELP) {
                        // setPlayerInTurn(true)
                        if (closePopup) {
                            setHelpActive(false);
                        }
                        else {
                            setHelpActive(true);
                        }
                    }
                    else if (fieldOrder.current[fieldOrder.current.length - 1] === Cards.RISK) {
                        // setPlayerInTurn(true)
                        if (closePopup) {
                            setRiskActive(false);
                        }
                        else {
                            setRiskActive(true);
                        }
                    }
                    else if (fieldOrder.current[fieldOrder.current.length - 1] === Cards.ASK) {
                        // setPlayerInTurn(true)
                        if (closePopup) {
                            setAskActive(false);
                        }
                        else {
                            setAskActive(true);
                        }
                    }
                }
                var illuminationLast = function () { return react_1["default"].createElement("div", { style: {
                        'position': 'fixed',
                        'zIndex': -1,
                        'margin': '10px',
                        'padding': 0,
                        'boxShadow': '0 0 50px gold',
                        'width': '80px',
                        'height': '80px'
                    } }); };
                if (player.isActive) {
                    column_1.push(react_1["default"].createElement(react_transition_group_1.CSSTransition, { "in": true, timeout: 500, classNames: 'list-transition', unmountOnExit: true, appear: true },
                        react_1["default"].createElement(Field, { key: "transition-group-content", number: '6' },
                            react_1["default"].createElement(TextFieldContainer, null,
                                gameState ? gameState.filter(function (p) { return p.isActive; }).map(function (p) { return p.name.toUpperCase(); }) : '',
                                " rzuca kostk\u0105"))));
                    if (fieldOrder.current[fieldOrder.current.length - 1] === Cards.CHANCE && isChanceActive) {
                        column_1.push(react_1["default"].createElement(react_transition_group_1.CSSTransition, { "in": true, timeout: 500, classNames: 'list-transition', unmountOnExit: true, appear: true },
                            react_1["default"].createElement(Field, { key: "transition-group-content", number: '6' },
                                react_1["default"].createElement(TextFieldContainer, null,
                                    gameState ? gameState.filter(function (p) { return p.isActive; }).map(function (p) { return p.name.toUpperCase(); }) : '',
                                    " - Karta Szansa jest aktywna"))));
                        //column.push(illuminationLast())
                    }
                    else if (fieldOrder.current[fieldOrder.current.length - 1] === Cards.HELP && isHelpActive) {
                        column_1.push(react_1["default"].createElement(react_transition_group_1.CSSTransition, { "in": true, timeout: 500, classNames: 'list-transition', unmountOnExit: true, appear: true },
                            react_1["default"].createElement(Field, { key: "transition-group-content", number: '6' },
                                react_1["default"].createElement(TextFieldContainer, null,
                                    gameState ? gameState.filter(function (p) { return p.isActive; }).map(function (p) { return p.name.toUpperCase(); }) : '',
                                    " - Karta Pomoc jest aktywna"))));
                        //column.push(illuminationLast())
                    }
                    else if (fieldOrder.current[fieldOrder.current.length - 1] === Cards.RISK && isRiskActive) {
                        column_1.push(react_1["default"].createElement(react_transition_group_1.CSSTransition, { "in": true, timeout: 500, classNames: 'list-transition', unmountOnExit: true, appear: true },
                            react_1["default"].createElement(Field, { key: "transition-group-content", number: '6' },
                                react_1["default"].createElement(TextFieldContainer, null,
                                    gameState ? gameState.filter(function (p) { return p.isActive; }).map(function (p) { return p.name.toUpperCase(); }) : '',
                                    " - Karta Zagro\u017Cenia jest aktywna"))));
                        //column.push(illuminationLast())
                    }
                    else if (fieldOrder.current[fieldOrder.current.length - 1] === Cards.ASK && isAskActive) {
                        column_1.push(react_1["default"].createElement(react_transition_group_1.CSSTransition, { "in": true, timeout: 500, classNames: 'list-transition', unmountOnExit: true, appear: true },
                            react_1["default"].createElement(Field, { key: "transition-group-content", number: '6' },
                                react_1["default"].createElement(TextFieldContainer, null,
                                    gameState ? gameState.filter(function (p) { return p.isActive; }).map(function (p) { return p.name.toUpperCase(); }) : '',
                                    " - Karta Pytanie jest aktywna"))));
                        //column.push(illuminationLast())
                    }
                }
                column_1.push(illuminationLast());
                column_1.reverse();
                result_1.push(react_1["default"].createElement(FieldContext, null, column_1));
                column_1 = [];
                fieldOrder.current = [];
            });
            jsx = (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(FieldsContainer, null, result_1)));
        }
        return jsx;
    };
    var pushNewState = function () {
        if (initialSocket) {
            if (gameState)
                gameService_1["default"].switchPlayer(initialSocket, gameState);
        }
    };
    var newNumberOfFields = function () {
        var number = throwCube();
        if (gameState && individualField) {
            var newState = __spreadArrays(gameState);
            newState.filter(function (s) { return s.isActive; }).forEach(function (s) {
                var fieldInMemory = s.actualField;
                s.actualField += number;
                if (s.actualField - s.fieldOnMap > 6)
                    s.fieldOnMap += (s.actualField - fieldInMemory);
            });
            setGameState(newState);
            pushNewState();
        }
        console.log(gameState);
    };
    var accessTurnCtrl = function () {
        if (isChanceActive || isHelpActive || isRiskActive || isAskActive) {
            if (gameState)
                for (var i = 0; i < gameState.length; i++) {
                    if (individualName === gameState[i].name) {
                        gameState[i].isActive = true;
                    }
                    else {
                        gameState[i].isActive = false;
                    }
                }
        }
        else {
            if (gameState) {
                gameState.filter(function (e) { return e.isActive; }).forEach(function (e) {
                    if (e.name === individualName) {
                        setPlayerInTurn(true);
                    }
                    else {
                        setPlayerInTurn(false);
                    }
                    // TODO different name checker
                });
            }
        }
        // if(gameState) {
        //   gameState.filter(e => e.isActive).forEach(e => {
        //     if(e.name === individualName) {
        //       setPlayerInTurn(true)
        //     } 
        //     else {
        //       setPlayerInTurn(false)
        //     } 
        //     // TODO different name checker
        //   })
        // }
        // if(!isChanceActive && !isHelpActive && !isRiskActive && !isAskActive) {
        //   if(gameState) {
        //     gameState.filter(e => e.isActive).forEach(e => {
        //       if(e.name === individualName) {
        //         setPlayerInTurn(true)
        //       } 
        //       else {
        //         setPlayerInTurn(false)
        //       } 
        //       // TODO different name checker
        //     })
        //   }
        // } else {
        //   if(gameState) {
        //     gameState.filter(e => e.isActive).forEach(e => {
        //       if(e.name === individualName) {
        //         setPlayerInTurn(false)
        //       } 
        //       else {
        //         setPlayerInTurn(false)
        //       } 
        //       // TODO different name checker
        //     })
        //   }
        // }
    };
    var tetrisSimilar = function () {
        if (gameState) {
            var fieldsCount = [];
            for (var i = 0; i < gameState.length; i++) {
                fieldsCount.push(gameState[i].actualField);
            }
            var min = Math.min.apply(Math, fieldsCount);
            var max = Math.max.apply(Math, fieldsCount);
            if (min > 1) {
                var diff = max - min;
                if (diff === 0)
                    diff = max;
                var newGameState = __spreadArrays(gameState);
                for (var i = 0; i < newGameState.length; i++) {
                    if (newGameState[i].actualField - diff < 1) {
                        newGameState[i].actualField = 1;
                    }
                    else {
                        newGameState[i].actualField = newGameState[i].actualField - diff;
                    }
                }
                setGameState(newGameState);
            }
        }
    };
    react_2.useEffect(function () {
        if (isFirstRender.current) {
            handleGameStart();
            initFirstPlayer();
            isFirstRender.current = false;
        }
        callbacksLimit.current = 0;
        handleUserLeave();
        accessTurnCtrl();
        getNewState();
        handleEndGame();
        if (!isPlayerLeave.current) {
            isPlayerLeave.current = false;
        }
    });
    react_2.useEffect(function () {
        //tetrisSimilar()
    }, [gameState]);
    react_2.useEffect(function () {
        // getNewState()
    }, []);
    var getNewState = function () {
        if (initialSocket)
            gameService_1["default"].onSwitchPlayer(initialSocket, function (message) {
                message.forEach(function (s) {
                    if (s.name === individualName) {
                        setGameState(__spreadArrays(message));
                    }
                    return;
                });
            });
    };
    var handleUserLeave = function () {
        if (initialSocket)
            gameService_1["default"].onUserLeave(initialSocket, function (message) {
                if (callbacksLimit.current <= 1) {
                    callbacksLimit.current += 1;
                    var nextPlayer = '';
                    if (gameState && gameState.length > 1) {
                        var newGameState = __spreadArrays(gameState);
                        for (var i = 0; i < newGameState.length; i++) {
                            if (newGameState[i].isActive) {
                                newGameState[i].isActive = false;
                                if (i === newGameState.length - 1) {
                                    newGameState[0].isActive = true;
                                    break;
                                }
                                newGameState[i + 1].isActive = true;
                                break;
                            }
                        }
                        for (var i = 0; i < newGameState.length; i++) {
                            if (newGameState[i].isActive) {
                                if (i === newGameState.length - 1) {
                                    nextPlayer = newGameState[0].name;
                                    break;
                                }
                                nextPlayer = newGameState[i + 1].name;
                                break;
                            }
                        }
                        newGameState = newGameState.filter(function (s) { return s.name !== message; });
                        var allFalse = false;
                        for (var i = 0; i < newGameState.length; i++) {
                            if (newGameState[i].isActive)
                                break;
                            allFalse = true;
                        }
                        if (allFalse) {
                            for (var i = 0; i < newGameState.length; i++) {
                                if (newGameState[i].name === nextPlayer) {
                                    newGameState[i].isActive = true;
                                    break;
                                }
                                else {
                                    newGameState[i].isActive = false;
                                }
                            }
                        }
                        //////////// its not best solution
                        if (newGameState.length === 2) {
                            var setActiveNewGameState = newGameState.filter(function (s) { return !s.isActive; });
                            if (setActiveNewGameState.length === 2) {
                                newGameState[0].isActive = true;
                            }
                        }
                        else if (newGameState.length === 3) {
                            var setActiveNewGameState = newGameState.filter(function (s) { return !s.isActive; });
                            if (setActiveNewGameState.length === 3) {
                                newGameState[0].isActive = true;
                            }
                        }
                        else if (newGameState.length === 4) {
                            var setActiveNewGameState = newGameState.filter(function (s) { return !s.isActive; });
                            if (setActiveNewGameState.length === 4) {
                                newGameState[0].isActive = true;
                            }
                        }
                        else if (newGameState.length === 5) {
                            var setActiveNewGameState = newGameState.filter(function (s) { return !s.isActive; });
                            if (setActiveNewGameState.length === 5) {
                                newGameState[0].isActive = true;
                            }
                        }
                        else if (newGameState.length === 6) {
                            var setActiveNewGameState = newGameState.filter(function (s) { return !s.isActive; });
                            if (setActiveNewGameState.length === 6) {
                                newGameState[0].isActive = true;
                            }
                        }
                        //////////// its not best solution
                        setGameState(newGameState);
                    }
                }
            });
        callbacksLimit.current = 0;
    };
    var handleEndGame = function () {
        if (initialSocket && gameState) {
            if (gameState.length < 2) {
                window.location.reload();
                setGameState([]);
                gameService_1["default"].lastUserStay(initialSocket, gameState[0].room);
            }
        }
    };
    var showChance = function () {
        var i = Math.floor(Math.random() * chances.length);
        chance.current = chances[i];
        setChanceClicked(true);
        setChanceActive(false);
        setClosePopup(false);
    };
    var hideChance = function () {
        setChanceClicked(false);
        setClosePopup(true);
    };
    var showHelp = function () {
        var i = Math.floor(Math.random() * helps.length);
        help.current = helps[i];
        setHelpClicked(true);
        setHelpActive(false);
        setClosePopup(false);
    };
    var hideHelp = function () {
        setHelpClicked(false);
        setClosePopup(true);
    };
    var showRisk = function () {
        var i = Math.floor(Math.random() * risks.length);
        risk.current = risks[i];
        setRiskClicked(true);
        setRiskActive(false);
        setClosePopup(false);
    };
    var hideRisk = function () {
        setRiskClicked(false);
        setClosePopup(true);
    };
    var showAsk = function () {
        var i = Math.floor(Math.random() * asks.length);
        ask.current = asks[i];
        setAskClicked(true);
        setAskActive(false);
        setClosePopup(false);
    };
    var hideAsk = function () {
        setAskClicked(false);
        setClosePopup(true);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        isPlayerInTurn && react_1["default"].createElement(CubeDiv, { number: '2', onClick: newNumberOfFields }, "Rzu\u0107 kostk\u0105"),
        isPlayerInTurn && isChanceClicked && react_1["default"].createElement(react_transition_group_1.CSSTransition, { "in": true, timeout: 500, classNames: 'card-transition', unmountOnExit: true, appear: true },
            react_1["default"].createElement(CardChanceClicked, { color: Colors.GREEN },
                chance.current,
                react_1["default"].createElement("button", { onClick: hideChance }, "Dalej!"))),
        isPlayerInTurn && isHelpClicked && react_1["default"].createElement(react_transition_group_1.CSSTransition, { "in": true, timeout: 500, classNames: 'card-transition', unmountOnExit: true, appear: true },
            react_1["default"].createElement(CardHelpClicked, { color: Colors.BLUE },
                help.current,
                react_1["default"].createElement("button", { onClick: hideHelp }, "Dalej!"))),
        isPlayerInTurn && isRiskClicked && react_1["default"].createElement(react_transition_group_1.CSSTransition, { "in": true, timeout: 500, classNames: 'card-transition', unmountOnExit: true, appear: true },
            react_1["default"].createElement(CardRiskClicked, { color: Colors.BLACK },
                risk.current,
                react_1["default"].createElement("button", { onClick: hideRisk }, "Dalej!"))),
        isPlayerInTurn && isAskClicked && react_1["default"].createElement(react_transition_group_1.CSSTransition, { "in": true, timeout: 500, classNames: 'card-transition', unmountOnExit: true, appear: true },
            react_1["default"].createElement(CardAskClicked, { color: Colors.RED },
                ask.current,
                react_1["default"].createElement("button", { onClick: hideAsk }, "Dalej!"))),
        react_1["default"].createElement(PlayersFields, null),
        isPlayerInTurn && isChanceActive ? react_1["default"].createElement(CardChance, { className: 'active-card', onClick: showChance, color: Colors.GREEN },
            "Karta Szansa ",
            react_1["default"].createElement("br", null),
            " ! ") : react_1["default"].createElement(CardChance, { color: Colors.GREEN },
            "Karta Szansa ",
            react_1["default"].createElement("br", null),
            " !"),
        isPlayerInTurn && isHelpActive ? react_1["default"].createElement(CardHelp, { className: 'active-card', onClick: showHelp, color: Colors.BLUE },
            "Karta Pomoc ",
            react_1["default"].createElement("br", null),
            " u ") : react_1["default"].createElement(CardHelp, { color: Colors.BLUE },
            "Karta Pomoc ",
            react_1["default"].createElement("br", null),
            " u"),
        isPlayerInTurn && isRiskActive ? react_1["default"].createElement(CardRisk, { className: 'active-card', onClick: showRisk, color: Colors.BLACK },
            "Karta Zagro\u017Cenie ",
            react_1["default"].createElement("br", null),
            " n ") : react_1["default"].createElement(CardRisk, { color: Colors.BLACK },
            "Karta Zagro\u017Cenie ",
            react_1["default"].createElement("br", null),
            " n"),
        isPlayerInTurn && isAskActive ? react_1["default"].createElement(CardAsk, { className: 'active-card', onClick: showAsk, color: Colors.RED },
            "Karta Pytanie ",
            react_1["default"].createElement("br", null),
            " ? ") : react_1["default"].createElement(CardAsk, { color: Colors.RED },
            "Karta Pytanie ",
            react_1["default"].createElement("br", null),
            " ?")));
}
exports.Game = Game;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14;
