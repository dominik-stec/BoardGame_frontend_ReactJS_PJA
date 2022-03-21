import  { useEffect, useState, useRef, useContext } from "react";
import './fields.css';
import styled from "styled-components";
import gameContext from "../../gameContext";
import gameService from "../../services/gameService";
import { CSSTransition } from "react-transition-group";

enum Colors {
  BROWN = 1,
  GREEN,
  BLUE,
  RED,
  BLACK,
  GOLD
}

enum Cards {
  NONE,
  CHANCE,
  HELP,
  ASK,
  RISK
}

const chances = [
  'Przyjaciele Cię wspierają - rzucasz kostką ponownie',
  'Szkoła/miejsce pracy oferuje Tobie profesjonalne wsparcie - przesuwasz się o 1. pole do przodu',
  'Niedaleko Ciebie działa grupa wsparcia dla osób doświadczających kryzysów psychicznych - rzucasz ponownie kostką',
  'Możesz uczęszczać na regularną psychoterapię - przesuwasz się o 1. pole do przodu',
  'Uzyskujesz adekwatne rozpoznanie zaburzenia - przesuwasz się w pobliże kolejnego pola Szansa',
  'Rodzice Cię wspierają - przsuwasz się o 1. pole do przodu',
  'Zaprzyjaźniasz się z osobą, która leczy się na podobne objawy co Ty - rzucasz ponownie kostką',
  'W szkole/pracy ludzie organizują spotkanie z uwagi na osoby z kryzysami psychicznymi - rzucasz kostką ponownie',
  'Uzyskujesz zrozumienie ze strony otoczenia - rzucasz kostką ponownie',
  'W pracy/szkole otrzymujesz wsparcie - przesuwasz się o 1. pole do przodu',
  'Kolega/koleżanka oferuje Tobie rozmowę - rzucasz ponownie kostką',
  'Dostajesz się do projektu wspierającego osoby z zaburzeniami psychicznymi - rzucasz kostka ponownie',
  'Otrzymujesz wiele informacji na temat możliwości leczenia w Twojej poradni - rzucasz ponownie kostką',
  'Zostałeś/aś prawidłowo zdiagnozowany/a - rzucasz kostką jeszcze raz',
  'Uzyskujesz zwolnienie z niektórych obowiązków w szkole/pracy - przesuwasz się o 1. pole do przodu',
  'Otrzymujesz ofertę lepszych warunków pracy - rzuczasz kostką jeszcze raz',
  'Otrzymujesz pomoc socjalną - przesuwasz się o 1. pole do przodu',
  'Otrzymujesz wyróżnienie w szkole/pracy za swoje zaangażowanie - przesuwasz się o dwa pola do przodu',
  'Odwiedza Cię psychiatra środowiskowy - przesuwasz się o 1. pole do przodu',
  'Otrzymujesz prawidłową diagnozę - rzucasz kostką ponownie',
  'Szkoła/miejsce pracy oferuje Tobie wsparcie profesjonalisty - przesuwasz się o jedno pole do przodu'
]

const helps = [
  'Poradnia Psychologiczno-Pedagogiczna',
  'Szkoła - Wychowawca, Psycholog, Pedagog',
  'Centrum Interwencji Kryzysowej',
  'Telefon Zaufania',
  'Pomoc specjalistyczna',
  'Poradnia Zdrowia Psychicznego dla Dzieci i Młodzieży',
  'Dzienny Oddział Psychiatryczny',
  'Oddział Psychiatryczny Całodobowy',
  'Organizacje Pozarządowe',
]

const asks = [
  `Tylko leki mogą pomóc ?
  Tak - cofasz się o jedno pole
  Nie - dodatkowy rzut kostką`,
  `Depresja to nie jest prawdziwa choroba ?
  Tak - cofasz się o dwa pola
  Nie - dodatkowy rzut kostką`,
  `Ciężka praca pokona depresję ?
  Tak - cofasz się o dwa 2 pola
  Nie - idziesz do przodu o dwa pola`,
  `Konsultacja z psychiatrą/psychoterapeutą to oznaka słabości ?
  Tak - idziesz na pole zagrożenie
  Nie - idziesz na pole szansa`,
  `Prawdziwi mężczyźni nie miewają depresji ?
  Tak - cofasz się o 3 pola pola
  Nie - przesuwasz się do przodu o jedno pole`,
  `Jeśli sam sobie nie pomogę, to nikt mi nie pomoże ?
  Tak - losujesz kartę zagrożenie
  Nie - przesuwasz się o 2 pola do przodu`,
  `To moja wina, że mam depresję ?
  Tak - czekasz jedną kolejkę
  Nie - dodatkowy rzut kostką`,
  `Wystarczy przestać tłumić uczucia ?
  Tak - czekasz jedną kolejkę
  Nie - przesuwasz się do przodu o dwa pola`,
  `Leki antydepresyjne uzależniają ?
  Tak - czekasz jedną kolejkę
  Nie - przesuwasz się o jedno pole do przodu`,
  `Chorzy na schizofrenię zagrażają innym bardziej niż osoby zdrowe ?
  Tak - przesuwasz się o jedno pole do tyłu
  Nie - przesuwasz się o jedno pole do przodu`,
  `Schizofrenia odkrywa pytania wspólne chorym i zdrowym ?
  Tak - przesuwasz się o jedno pole do przodu
  Nie - przesuwasz się o jedno pole do tyłu`,
  `Rozmawianie o uczuciach tylko pogarsza nastrój ?
  Tak - omijasz jedną kolejkę
  Nie - losujesz kartę szansa`,
  `Antydepresanty zmieniają osobowość ?
  Tak - czekasz jedną kolejkę
  Nie - przesuwasz się o 2 pola do przodu`,
  `Schizofrenia nie jest tylko chorobą ?
  Tak - przesuwasz się o jedno pole do przodu
  Nie - przesuwasz się o jedno pole do tyłu`,
  `Ludzie cierpiący na depresję są słabi i leniwi ?
  Tak - czekasz dwie kolejki
  Nie - przesuwasz się o 3 pola do przodu`,
  `Wystarczy czymś się zająć i przestać tak myśleć - samo przejdzie ?
  Tak - czekasz jedną kolejkę
  Nie - dodatkowy rzut kostką`,
  `Chorzy na schizofrenię oczekują szacunku, zrozumienia i pomocy ?
  Tak - przesuwasz się o jedno pole do przodu
  Nie - przesuwasz się o jedno pole do tyłu`,
  `Jeśli raz się zdecydujesz na antydepresanty, będziesz je musiał zażywać do końca życia ?
  Tak - cofasz się o 3 pola
  Nie - dodatkowy rzut kostką`,
  `Schizofrenia jest chorobą nieuleczalną ?
  Tak - przesuwasz się o jedno pole do tyłu
  Nie - przesuwasz sie o jedno pole do przodu`,
  `Jest schizofrenia, nie ma schizofreników ?
  Tak - przesuwasz się o jedno pole do przodu
  nie - przesuwasz się o jedno pole do tyłu`,
  `Anorexia Nervosa i Bulimia Nervosa dotyka wiekszą ilośc kobiet niż mężczyzn, szczególnie w okresie nastoletnim lub pubertacji ?
  Tak - przesuwasz się o jedno pole do przodu
  Nie - przesuwasz się o jedno pole do tyłu`,
  `Zmiany w zdrowiu psychicznym są trudne do zidentyfikowania z powodu trudności w określaniu zdrowia testami laboratoryjnymi czy badaniami radiologicznymi, w których możnaby wyodrębnić zaburzenie ?
  Tak - przesuwasz się o jedno pole do przodu
  Nie - przesuwasz się o jedno pole do tyłu`,
  `Anorexia charakteryzuje sie tym, że pacjent ma zaburzoną percepcję własnego ciała ?
  Tak - przesuwasz się o jedno pole do przodu
  Nie - przesuwasz sie o jedno pole do tyłu`,
  `Zaburzenia lękowe najczęściej występują u starszych mężczyzn ?
  Tak - przesuwasz sie o jedno pole do tyłu
  Nie - przesuwasz się o jedno pole do przodu`,
  `Depresonalizacja - tak jakby symptomy dotyczyły kogoś innego; poczucie, lęk przed smiercią z powodu doznań fizycznych; lęk przez utratą kontroli z powodu nieprzewidywalności to objawy schizofrenii ?
  Tak - przesuwasz się o jedno pole do przodu
  Nie - przesuwasz się o jedno pole do tyłu`,
  `Schizofrenia jest chorobą dziedziczną ?
  Tak - przesuwasz się o jedno pole do tyłu
  Nie - przesuwasz się o jedno pole do przodu`,
  `Schizofrenia jest chorobą ?
  Tak - przesuwasz sie o jedno pole do przodu
  Nie - przesuwasz sie o jedno pole do tyłu`,
  `Depresja dotyka tylko kobiet ?
  Tak - cofasz się o jedno pole
  Nie - dodatkowy rzut kostką`,
  `Chorzy na schizofrenię mają takie same prawa jak inni ?
  Tak - przesuwasz się o jedno pole do przodu
  Nie - przesuwasz się o jedno pole do tyłu`,
  `Brak cyklu miesiączkowego w wyniku redukcji tłuszczu w organizmie, widoczne żebra lub inne kości na ciele, zawroty głowy spowodowane niskim poborem kalorii, niskie ciśnienie krwi to objawy depresji ?
  Tak - przesuwasz się o jedno pole do tyłu - odpowiedź prawidłowa to anorexia
  Nie - przesuwasz się o jedno pole do przodu`,
  `Brak nadziei, ryzyko samobójstwa, nieprawidłowy proces żałoby, zaburzone interakcje społeczne, wycofanie społeczne, wycofanie społeczne i zaburzone poczucie własnej wartości to objawy depresji ?
  Tak - przesuwasz sie o jedno pole do przodu
  Nie - przesuwasz się o jedno pole do tyłu`,
  `Schizofrenia jest zaburzeniem wielowymiarowym ?
  Tak - przesuwasz sie o jedno pole do przodu
  Nie - przesuwasz się o jedno pole do tyłu`,
  `Które zaburzenie psychiczne przejawia się poniższymi symptomami: szybka mowa, łatwość w utracie koncentracji, kompulsywne wydawanie pieniędzy, nadmierne potrzeby seksualne oraz epizody depresji ?
  zaburzenie afektywne dwubiegunowe - tak,
  schizofrenia,
  depresja,
  anorexia`,
  `Które zaburzenie psychiczne przejawia się poniższymi symptomami: brak cyklu miesiączkowego w wyniku redukcji tłuszczu w organizmie, widoczne żebra i inne kości na ciele, zawroty głowy spowodowane niskim poborem kalorii, niskie ciśnienie krwi ?
  delirium,
  schizofrenia,
  depresja,
  anorexia - tak`,
  `Które zaburzenie psychiczne przejawia się poniższymi symptomami: depresanolizacja - tak jakby symptomy dotyczyły kogoś innego; poczucie (doom), lęk przed śmiercią z powodu doznań fizycznych; lęk przed utratą kontroli z powodu nieprzewidywalności ? 
  ataki paniki,
  schizofrenia,
  depresja - tak,
  anorexia`,
  `Rodzina przyprowadza pacjenta w celu oceny jego stanu zdrowia psychicznego. Są zaniepokojeni tym, ze słyszy głosy. Można przypuszczać, że są to objawy:
  ataki paniki,
  schizofrenia - tak,
  depresja,
  anorexia`,
  `W którym zaburzeniu psychicznym pacjent może prezentować fizyczne zaniedbanie, wycofanie, bród oraz brak chęci do podejmowania konwersacji ?
  delirium,
  schizofrenia,
  depresja - tak,
  ataki paniki`
]

const risks = [
  'Twoja siostra zachorowała na białaczkę - stoisz w miejscu 1. kolejkę',
  'Twoi znajomi Cię unikają - stoisz w miejscu 1. kolejkę',
  'Podczas pobytu w szpitalu nikt Cię nie odwiedza - stoisz w miejscu 1. kolejkę',
  'W szkole wyzywają Cię od wariatów - stoisz w miejscu 1. kolejkę',
  'Nagle musisz się przeprowadzić do innej miejscowości - stoisz w miejscu 1. kolejkę',
  'Leki działają w niepożądany sposób - cofasz się o 10 pól do tyłu',
  'Wyrzucają Cię z pracy/zostajesz zawieszony w obowiązkach ucznia - stoisz dwie kolejki',
  'Lekarz podejrzewa u Ciebie cukrzycę - stoisz w miejscu 1. kolejkę',
  'Pracodawca mówi, że masz się wziąźć w garść - cofasz się o 1. pole',
  'W Poradni Zdrowia Psychicznego nie otrzymujesz żadnego wsparcia - stoisz 1. kolejkę',
  'Sąsiedzi śmieją się z Ciebie - stoisz 1. kolejkę',
  'Psychiatra przepisuje Tobie leki bez konsultacji - stoisz w miejscu 1. kolejkę',
  'Otrzymujesz nieodpowiednią diagnozę - cofasz się o 1. pole do tyłu',
  'Rodzice nie wypuszczają Cię z domu - stoisz 1. kolejkę',
  'Nie otrzymujesz wsparcia środowiskowego - stoisz w miejscu jedną kolejkę',
  'W okolicy nie ma żadnej grupy wsparcia - stoisz jedną kolejkę',
  'Znajomi się od Ciebie odsuwają - stoisz w miejscu 1. kolejkę',
  'Ludzie mówią, że sobie poradzisz - cofasz się o 1. pole do tyłu',
  'Nie zdajesz kilku egzaminów pod rząd - stoisz w miejscu 1. kolejkę',
  'Przyjaciele nie zapraszają Cię do wspólnych aktywności - cofasz się o 1. pole'
]

const fullBoard = [
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
  
]

const CubeStopper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 4;
  cursor: default;
  background-color: transparent;
`;

const PlayStopper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
  cursor: default;
  background-color: gray;
  opacity: 0.5;
`;

const FieldContext = styled.div<any>`
  display: inline-block;
  bottom: 10px;
  transition: 3s;
`;

const Field = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  width: 8vh;
  height: 8vh;
  font-size: ${props => props.number == 6 ? '1.4vh' : '0.7vh'};
  font-family: Helvetice, sans-serif;
  overflow: hidden;
  overflow-wrap: break-word;
  text-transform: uppercase;
  color: ${props => props.number == 6 ? 'black' : 'white'};
  text-align: center;
  padding: 10px 0;
  box-shadow: 0 0 5px gray; 
  transition: 1s;
  background-color: ${props => Colors[props.number]};
  &:hover {
    border-radius: 25px;
    width: 200px;
    height 200px;
    font-size: 18px;
    font-weight: bold;
    box-shadow: 0 0 15px ${props => {switch(props.number) {
      case '1': return 'brown';
      case '2': return 'green';
      case '3': return 'blue';
      case '4': return 'red';
      case '5': return 'black';
      case '6': return 'gold';
    }}}; 
  }

`;

const CardChance = styled.div<any>`
  position: fixed;
  top: 0;
  left: 0;
  margin: 25px;
  width: 100px;
  height  150px;
  font-size: 25px;
  text-align: center;
  color: white;
  padding: 30px 0;
  box-shadow: 0 0 10px gray; 
    background-color: ${props => {
    return Colors[props.color]
  }};
`;

const CardHelp = styled.div<any>`
  position: fixed;
  top: 0;
  right: 0;
  margin: 25px;
  width: 100px;
  height  150px;
  font-size: 25px;
  text-align: center;
  color: white;
  padding: 30px 0;
  box-shadow: 0 0 10px gray; 
    background-color: ${props => {
    return Colors[props.color]
  }};
`;

const CardRisk = styled.div<any>`
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 25px;
  width: 100px;
  height  150px;
  font-size: 18px;
  text-align: center;
  color: white;
  padding: 40px 0;
  box-shadow: 0 0 10px gray; 
    background-color: ${props => {
    return Colors[props.color]
  }};
`;

const CardAsk = styled.div<any>`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 25px;
  width: 100px;
  height  150px;
  font-size: 25px;
  text-align: center;
  color: white;
  padding: 30px 0;
  box-shadow: 0 0 10px gray; 
  transition: 3s;
    background-color: ${props => {
    return Colors[props.color]
  }};
`;

const CardChanceClicked = styled.div<any>`
  display: flex;  
  position: fixed;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 25px;
  font-size: 25px;
  text-align: center;
  color: white;
  padding: 30px;
  box-shadow: 0 0 10px gray; 
  border: 3px solid #3987c9;
  transition: 3s;
    background-color: ${props => {
    return Colors[props.color]
  }};
`;

const CardHelpClicked = styled.div<any>`
  display: flex;  
  position: fixed;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 25px;
  font-size: 25px;
  text-align: center;
  color: white;
  padding: 30px;
  box-shadow: 0 0 10px gray; 
  border: 3px solid #3987c9;
  transition: 3s;
    background-color: ${props => {
    return Colors[props.color]
  }};
`;

const CardRiskClicked = styled.div<any>`
  display: flex;  
  position: fixed;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 25px;
  font-size: 25px;
  text-align: center;
  color: white;
  padding: 30px;
  box-shadow: 0 0 10px gray; 
  border: 3px solid #3987c9;
  transition: 3s;
    background-color: ${props => {
    return Colors[props.color]
  }};
`;

const CardAskClicked = styled.div<any>`
  display: flex;  
  position: fixed;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 25px;
  font-size: 25px;
  text-align: center;
  color: white;
  padding: 30px;
  box-shadow: 0 0 10px gray; 
  border: 3px solid #3987c9;
  transition: 3s;
    background-color: ${props => {
    return Colors[props.color]
  }};
`;

const FieldsContainer = styled.div<any>`
position: fixed;
  bottom: 25px;
  margin: auto;
  color: white;
  transition: 3s;
`;

const TextFieldContainer = styled.div<any>`
display: flex;
font-size: 1em;
align-items: center;
overflow-wrap: anywhere;
&::before, &::after {
  content: ''; 
  margin: auto;
}
`;

const ShowWinner = styled.div<any>`
  display: flex;  
  position: fixed;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 6;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
  text-align: center;
  color: white;
  font-size: 40px;
  font-weight: bold;
  padding: 30px;
  box-shadow: 0 0 10px gray; 
  border: 3px solid #3987c9;
  transition: 1s;
    background-color: ${props => {
    return Colors[props.color]
  }};
`;


export type IPlayerState = Array<IPlayerStateObject>

export interface IPlayerStateObject {
  room: string,
  id: number,
  name: string, 
  isActive: boolean,
  actualField: number,
  fieldOnMap: number
}

export function Game() {

  const { initialSocket, setInitialSocket } = useContext(gameContext);
  const { individualName, setIndividualName } = useContext(gameContext);

  const [gameState, setGameState] = useState<IPlayerState>()
  const isFirstRender = useRef(true)

  const [isPlayerInTurn, setPlayerInTurn] = useState(false)

  const [isChanceActive, setChanceActive] = useState(false)
  const [isChanceClicked, setChanceClicked] = useState(false)
  const chance = useRef('none')

  const [isHelpActive, setHelpActive] = useState(false)
  const [isHelpClicked, setHelpClicked] = useState(false)
  const help = useRef('none') 

  const [isRiskActive, setRiskActive] = useState(false)
  const [isRiskClicked, setRiskClicked] = useState(false)
  const risk = useRef('none') 

  const [isAskActive, setAskActive] = useState(false)
  const [isAskClicked, setAskClicked] = useState(false)
  const ask = useRef('none')

  const fieldOrder = useRef(Array<Cards>())

  const clickCube = useRef('')

  const [isWinner, setWinner] = useState('')

  const [asksRef, setAsksRef] = useState(Array<Array<string>>())

  const blockView = useRef(false)


  const [isGoodAnswer, setGoodAnswer] = useState(false)
  const [dialogActive, setDialogActive] = useState(false)
  const [askNumber, setAskNumber] = useState(0)
  
  const retrieveAsksData = () => {
    let asksArr = []
    for(let i=0; i< asks.length - 6; i++) {
      let a0 = asks[i].split('Tak - ')[0];
      let ar1 = asks[i].split('Tak - ')[1].split('Nie - ');
      let ar0 = [a0]
      let asksArrElem = ar0.concat(ar1)
      asksArr.push(asksArrElem)
    }
    setAsksRef(asksArr)
  }

  const handleGameStart = () => {

        if (initialSocket)
        gameService.onStartGame(initialSocket, (options) => {
      setGameState(options)
        isFirstRender.current = true;
       });
  };

  const initFirstPlayer = () => {
    if(gameState) {
      gameState.forEach(state => {
        if(state.isActive) {
          if(individualName === state.name) {
            setPlayerInTurn(true)
          }
        }
        return
      })
  }
}

  const throwCube = () => {
    return Math.floor(Math.random() * 6) + 1
  };


  const PlayersFields = () => {
    let jsx = <div>Players fields empty</div>
    if(gameState) {
      let column: any[] = [];
      let result: any[] = [];

      setChanceActive(false)
      setHelpActive(false)
      setRiskActive(false)
      setAskActive(false)

      gameState.forEach((player, idx) => {


        column.splice(idx, 0, <Field key={idx} number='6'><TextFieldContainer>{player.name}</TextFieldContainer></Field>)

        fieldOrder.current = []

          for(let i=player.fieldOnMap; i<=player.actualField; i++) {

              switch(fullBoard[i].type) {
                case Cards.NONE: {
                  column.push(<CSSTransition
                    in={true}
                    timeout={500}
                    classNames='list-transition'
                    unmountOnExit
                appear
                  ><Field number='1'>{fullBoard[i].content}</Field></CSSTransition>)
                  fieldOrder.current.push(Cards.NONE)
                  break;
                }
                case Cards.CHANCE: {
                  column.push(<CSSTransition
                    in={true}
                    timeout={500}
                    classNames='list-transition'
                    unmountOnExit
                appear
                  ><Field number='2'>{fullBoard[i].content}</Field></CSSTransition>)
                  fieldOrder.current.push(Cards.CHANCE)
                  break;
                }
                case Cards.HELP: {
                  column.push(<CSSTransition
                    in={true}
                    timeout={500}
                    classNames='list-transition'
                    unmountOnExit
                appear
                  ><Field number='3'>{fullBoard[i].content}</Field></CSSTransition>)
                  fieldOrder.current.push(Cards.HELP)
                  break;
                }
                case Cards.RISK: {
                  column.push(<CSSTransition
                    in={true}
                    timeout={500}
                    classNames='list-transition'
                    unmountOnExit
                appear
                  ><Field number='5'>{fullBoard[i].content}</Field></CSSTransition>)
                  fieldOrder.current.push(Cards.RISK)
                  break;
                }
                case Cards.ASK: {
                  column.push(<CSSTransition
                    in={true}
                    timeout={500}
                    classNames='list-transition'
                    unmountOnExit
                appear
                  ><Field number='4'>{fullBoard[i].content}</Field></CSSTransition>)
                  fieldOrder.current.push(Cards.ASK)
                  break;
                } 
              }
          }

          const illuminationLast = () => <div style={{
            'position': 'fixed',
            'zIndex': -1,
            'margin': '10px',
            'padding': 0,
            'boxShadow': '0 0 50px gold',
            'width': '80px',
            'height': '80px',
          }}/>

          if(player.isActive) {
            column.push(<CSSTransition
              in={true}
              timeout={500}
              classNames='list-transition'
              unmountOnExit
          appear
            ><Field key="transition-group-content" number='6'><TextFieldContainer>{player.name.toUpperCase()} rzuca kostką</TextFieldContainer></Field></CSSTransition>)
          }

          if(isPlayerInTurn && player.name === individualName) {
            if(fieldOrder.current[fieldOrder.current.length-1] === Cards.CHANCE) {
              setChanceActive(true)
              column.push(<CSSTransition
                in={true}
                timeout={500}
                classNames='list-transition'
                unmountOnExit
            appear
              ><Field key="transition-group-content" number='6'><TextFieldContainer>{player.name.toUpperCase()} - Karta Szansa jest aktywna</TextFieldContainer></Field></CSSTransition>)
            }
            else if(fieldOrder.current[fieldOrder.current.length-1] === Cards.HELP) {
              setHelpActive(true)
              column.push(<CSSTransition
                in={true}
                timeout={500}
                classNames='list-transition'
                unmountOnExit
            appear
              ><Field key="transition-group-content" number='6'><TextFieldContainer>{player.name.toUpperCase()} - Karta Pomoc jest aktywna</TextFieldContainer></Field></CSSTransition>)
            }
            else if(fieldOrder.current[fieldOrder.current.length-1] === Cards.RISK) {
              setRiskActive(true)
              column.push(<CSSTransition
                in={true}
                timeout={500}
                classNames='list-transition'
                unmountOnExit
            appear
              ><Field key="transition-group-content" number='6'><TextFieldContainer>{player.name.toUpperCase()} - Karta Zagrożenie jest aktywna</TextFieldContainer></Field></CSSTransition>)
            }
            else if(fieldOrder.current[fieldOrder.current.length-1] === Cards.ASK) {
              setAskActive(true)
              column.push(<CSSTransition
                in={true}
                timeout={500}
                classNames='list-transition'
                unmountOnExit
            appear
              ><Field key="transition-group-content" number='6'><TextFieldContainer>{player.name.toUpperCase()} - Karta Pytanie jest aktywna</TextFieldContainer></Field></CSSTransition>)
            }
          }

        column.push(illuminationLast())
        
        column.reverse()

        result.push(<FieldContext>{column}</FieldContext>)

        column = []
        fieldOrder.current = []        

        })
        
        jsx = (
          <>
          <FieldsContainer>
          {result}
          </FieldsContainer>
          </> 
          );
      }
    return jsx
  }

  const pushNewState = () => {

    if(initialSocket) {

      if(gameState) 
      gameService.switchPlayer(initialSocket, gameState);

    }
  }

  const newNumberOfFields = (cubeNumber: number) => {
    if(gameState) {
      let newState = [...gameState]
      newState.filter(s => s.isActive).forEach(s => {
          let fieldInMemory = s.actualField;
          s.actualField += cubeNumber
          s.fieldOnMap = fieldInMemory
      })
      setGameState(newState);
      pushNewState()
    }
  }

  const accessTurnCtrl = () => {

            if(gameState) {
              gameState.filter(e => e.isActive).forEach(e => {
                if(e.name === individualName) {
                  setPlayerInTurn(true)
                } 
                else {
                  setPlayerInTurn(false)
                } 
              })
            }

          }
 
  const tetrisSimilar = () => {
    let trimGameState: any
    if(gameState)
    trimGameState = [...gameState]
    let fieldsCount: number[] = [] 

    if(gameState) {

      gameState.forEach((t, i) => {
        if(t.isActive && i === gameState.length - 1) {
          if(t.actualField > 0) {
              for(let i=0; i<trimGameState.length; i++) {
                fieldsCount.push(gameState[i].actualField)
              }


              const min = Math.min(...fieldsCount)
              const max = Math.max(...fieldsCount)
              if(min > 0) {
                let diff = max-min
                if(diff === 0) diff = max
                for(let i = 0; i<trimGameState.length; i++) {
                  if(trimGameState[i].actualField - diff < 1) {
                    trimGameState[i].fieldOnMap = trimGameState[i].actualField - 1
                   } else {
                    trimGameState[i].fieldOnMap = trimGameState[i].fieldOnMap - diff
                }
          
            setGameState(trimGameState)
            pushNewState()
            }
          }
        }
      }
      })
      }
    }
  
  const giveMeTurnForRescueInit = () => {

            if(gameState) {
              gameState.filter(s => {return s}).forEach(s => {
                if(s.name == individualName) {
                  s.isActive = true;
                  setPlayerInTurn(true);
                  return
                }}) 
            }

          }

  useEffect(() => {

    if(isFirstRender.current) {
      handleGameStart()
      initFirstPlayer()
      
      
      setTimeout(()=>{
        pushNewState()
      }, 1500)

      isFirstRender.current = false
    }
    
    if(!isFirstRender.current) {
      
    setTimeout(()=>{
      
    handleWinner()

    setTimeout( () => {
      blockView.current = false
      accessTurnCtrl()
    },500)

    getNewState()

    handleEndGame()

    handleUserLeave()
      
    }, 100)
      
    }

  });

  useEffect(() => {
    
    if(isFirstRender.current) {
      setTimeout(() => {
        giveMeTurnForRescueInit(); 
      }, 1500) 
    }
    
    if(!isFirstRender.current) {
     
      setTimeout(()=>{
      tetrisSimilar()
     retrieveAsksData()
     },10)
      
    }

  },[])



  const handleWinner = () => {
    if(gameState)
    gameState.forEach(s => {
      if(s.actualField >= fullBoard.length - 7) {
        setWinner(s.name)
      }
    })
  }

  const getNewState = () => {
        if(initialSocket) 
        gameService.onSwitchPlayer(initialSocket, (message) => {
          message.forEach((s) => {
            if(s.name === individualName) {
              setGameState([...message])
            }
            return
          })
        });
  }

   const handleUserLeave = async () => {


    if (initialSocket)
       gameService.onUserLeave(initialSocket, (message) => {

        let nextPlayer = ''

        if(gameState && gameState.length > 1) {
          let newGameState = [...gameState];
          
          for(let i=0; i<newGameState.length; i++) {
            if(newGameState[i].isActive) {
              newGameState[i].isActive = false
              if(i === newGameState.length - 1) {
                newGameState[0].isActive = true;
                break
              }
              newGameState[i + 1].isActive = true;
              break
            }
          }

          for(let i=0; i<newGameState.length; i++) {
            if(newGameState[i].isActive) {
              if(i === newGameState.length - 1) {
                nextPlayer = newGameState[0].name;
                break
              }
              nextPlayer = newGameState[i + 1].name;
              break
            }
        }

           newGameState = newGameState.filter(s => {
            return s.name !== message
          })

          let allFalse = false
          for(let i=0; i<newGameState.length; i++) {
            if(newGameState[i].isActive) break
            allFalse = true
          }

          if(allFalse) {
            for(let i=0; i<newGameState.length; i++) {
              if(newGameState[i].name === nextPlayer) {
                newGameState[i].isActive = true;
                break;
              } else {
                newGameState[i].isActive = false
                
              }
            }
          }
 
                             if(newGameState.length === 2) {
                              let setActiveNewGameState = newGameState.filter(s => !s.isActive)
                              if(setActiveNewGameState.length === 2) {
                                newGameState[0].isActive = true;
                              }
                              } else if(newGameState.length === 3) {
                                let setActiveNewGameState = newGameState.filter(s => !s.isActive)
                                if(setActiveNewGameState.length === 3) {
                                  newGameState[0].isActive = true;
                                }
                            } else if(newGameState.length === 4) {
                              let setActiveNewGameState = newGameState.filter(s => !s.isActive)
                              if(setActiveNewGameState.length === 4) {
                                newGameState[0].isActive = true;
                              }
                          } else if(newGameState.length === 5) {
                            let setActiveNewGameState = newGameState.filter(s => !s.isActive)
                            if(setActiveNewGameState.length === 5) {
                              newGameState[0].isActive = true;
                            }
                        }else if(newGameState.length === 6) {
                          let setActiveNewGameState = newGameState.filter(s => !s.isActive)
                          if(setActiveNewGameState.length === 6) {
                            newGameState[0].isActive = true;
                          }
                      }

          setGameState(newGameState);        
        } 
    });


  };

  const handleEndGame = () => {
    if (initialSocket && gameState) {
      if(gameState.length < 2) {
        window.location.reload()
        setGameState([])
        gameService.lastUserStay(initialSocket, gameState[0].room);
      }
    } 
  };

  const showChance = () => {
      let i = Math.floor(Math.random() * chances.length)
      chance.current = chances[i]
      setChanceClicked(true)
      setChanceActive(false)
  }
  const hideChance = () => {
    setChanceClicked(false)
  }

  const showHelp = () => {
    let i = Math.floor(Math.random() * helps.length)
    help.current = helps[i]
    setHelpClicked(true)
  }
  const hideHelp = () => {
    setHelpClicked(false)
    setHelpActive(false)
  }

  const showRisk = () => {
    let i = Math.floor(Math.random() * risks.length)
    risk.current = risks[i]
    setRiskClicked(true)
  }
  const hideRisk = () => {
    setRiskClicked(false)
    setRiskActive(false)
  }

  const showAsk = () => {
    let i = Math.floor(Math.random() * (asks.length - 7))
    ask.current = asks[i]
    setAskNumber(i)
    setAskClicked(true)
  }
  const hideAsk = () => {
    setAskClicked(false)
    setAskActive(false)
  }

  const setClickCube = () => {
    let number  = throwCube();

    blockView.current=true;

    switch(number) {
      case 1: {
        clickCube.current =  'show-front';
        break;
      }
      case 2: {
        clickCube.current =  'show-back';
        break;
      }
      case 3: {
        clickCube.current =  'show-right';
        break;
      }
      case 4: {
        clickCube.current =  'show-left';
        break;
      }
      case 5: {
        clickCube.current =  'show-top';
        break;
      }
      
      case 6: {
        clickCube.current =  'show-bottom';
        break;
      }
    }
    newNumberOfFields(number)
  }

  const endGame = () => {
    window.location.reload()
        setGameState([])
  }

  const askAnswerYes = () => {
    setDialogActive(true)
    let i = askNumber
    if(i == 0 || i == 10 || i == 13 || i == 16 || i == 19 || i == 20 || i == 21 || i == 22 || i == 24 || i == 26 || i == 28 || i == 30 || i == 31) 
    setGoodAnswer(true)
    else
    setGoodAnswer(false)
  }

  const askAnswerNo= () => {
    setDialogActive(true)
    let i = askNumber
    if(i == 0 || i == 10 || i == 13 || i == 16 || i == 19 || i == 20 || i == 21 || i == 22 || i == 24 || i == 26 || i == 28 || i == 30 || i == 31) 
    setGoodAnswer(false)
    else
    setGoodAnswer(true)
  }

  const hideAskInfo = () => {
    setDialogActive(false)
    setAskClicked(false)
  }

  return (
    <>
    {isWinner !== '' && <><PlayStopper /><ShowWinner>{`Gracz ${isWinner.toUpperCase()} dotarł do mety !`}<button className='endGameBtn' onClick={endGame}>OK!</button></ShowWinner></>}
    { blockView.current && <CubeStopper/>}
    { isPlayerInTurn &&
    <CSSTransition
    in={true}
    timeout={500}
    classNames='list-transition'
    unmountOnExit
appear>
      <div className="container" onClick={setClickCube}>
        <div className={`container cube ${clickCube.current}`}>
          <div className='front'><span>1</span></div>
          <div className='back'><span>2</span></div>
          <div className='right'><span>3</span></div>
          <div className='left'><span>4</span></div>
          <div className='top'><span>5</span></div>
          <div className='bottom'><span>6</span></div>
        </div>
      </div>
      </CSSTransition>
    }
      {isChanceClicked && <><PlayStopper /><CSSTransition
              in={true}
              timeout={500}
              classNames='card-transition'
              unmountOnExit
          appear><CardChanceClicked color={Colors.GREEN}>{chance.current}<button onClick={hideChance} >OK przejdźmy dalej</button></CardChanceClicked></CSSTransition></>}
      {isHelpClicked && <><PlayStopper /><CSSTransition
              in={true}
              timeout={500}
              classNames='card-transition'
              unmountOnExit
          appear><CardHelpClicked color={Colors.BLUE}>{help.current}<button onClick={hideHelp} >OK przejdźmy dalej</button></CardHelpClicked></CSSTransition></>}
     {isRiskClicked && <><PlayStopper /><CSSTransition
              in={true}
              timeout={500}
              classNames='card-transition'
              unmountOnExit
          appear><CardRiskClicked color={Colors.BLACK}>{risk.current}<button onClick={hideRisk} >OK przejdźmy dalej</button></CardRiskClicked></CSSTransition></>}
      {isAskClicked && <><PlayStopper /><CSSTransition
              in={true}
              timeout={500}
              classNames='card-transition'
              unmountOnExit
          appear><CardAskClicked color={Colors.RED}>{asksRef[askNumber][0]}<button onClick={askAnswerYes} >Tak</button><button onClick={askAnswerNo} >Nie</button></CardAskClicked></CSSTransition></>}
      
      {dialogActive && isGoodAnswer && <><PlayStopper /><CSSTransition
              in={true}
              timeout={500}
              classNames='card-transition'
              unmountOnExit
          appear>
             <CardAskClicked color={Colors.RED}> 'Poprawnie. BRAWO! - idziesz do przodu o 1 pole' <button onClick={hideAskInfo} >OK przejdźmy dalej</button></CardAskClicked>
            </CSSTransition></>}
     
            {dialogActive &&  !isGoodAnswer && <><PlayStopper /><CSSTransition
              in={true}
              timeout={500}
              classNames='card-transition'
              unmountOnExit
          appear>
            <CardAskClicked color={Colors.RED}> 'Błąd, niestety - cofasz się o jedno pole' <button onClick={hideAskInfo} >OK przejdźmy dalej</button></CardAskClicked>
            </CSSTransition></>}

      <PlayersFields />

      {isChanceActive && <CardChance className='active-card' onClick={showChance} color={Colors.GREEN}>Karta Szansa <br /> ! </CardChance>}
      {isHelpActive && <CardHelp className='active-card' onClick={showHelp} color={Colors.BLUE}>Karta Pomoc <br /> ↺ </CardHelp>}
      {isRiskActive && <CardRisk className='active-card' onClick={showRisk} color={Colors.BLACK}>Karta Zagrożenie <br /><br /> <b>↪</b> </CardRisk>}
      {isAskActive && <CardAsk className='active-card' onClick={showAsk} color={Colors.RED}>Karta Pytanie <br /> ? </CardAsk>}
        
      {!isChanceActive && <CardChance color={Colors.GREEN}>Karta Szansa <br /> !</CardChance>}
      {!isHelpActive && <CardHelp color={Colors.BLUE}>Karta Pomoc <br /> ↺ </CardHelp>}
      {!isRiskActive && <CardRisk color={Colors.BLACK}>Karta Zagrożenie <br /><br /> <b>↪</b></CardRisk>}
      {!isAskActive && <CardAsk color={Colors.RED}>Karta Pytanie <br /> ?</CardAsk>}
      
      <a href="http://odmienswojaglowe.org/" target="_blank"><div className='logo' /></a>
    </>
  );

}



