import React from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import socketService from "./services/socketService";

// here is declaration about first, deault game state
// use this in component game in method game() after game matrix declaration

export interface IGameContextProps {

  initialSocket: Socket<DefaultEventsMap, DefaultEventsMap> | null | undefined;
  setInitialSocket: (initialSocket: Socket<DefaultEventsMap, DefaultEventsMap> | null | undefined) => void;

  individualName: string;
  setIndividualName: (individualName: string) => void;

  individualField: number;
  setIndividualField: (individualField: number) => void;

  isInRoom: boolean;
  setInRoom: (inRoom: boolean) => void;
  playerSymbol: "x" | "o";
  setPlayerSymbol: (symbol: "x" | "o") => void;
  isPlayerTurn: boolean;
  setPlayerTurn: (turn: boolean) => void;
  isGameStarted: boolean;
  setGameStarted: (started: boolean) => void;
}

const defaultState: IGameContextProps = {

  initialSocket: null,
  setInitialSocket: () => {},

  individualName: 'init none',
  setIndividualName: () => {},

  individualField: 0,
  setIndividualField: () => {},

  isInRoom: false,
  setInRoom: () => {},
  playerSymbol: "x",
  setPlayerSymbol: () => {},
  isPlayerTurn: false,
  setPlayerTurn: () => {},
  isGameStarted: false,
  setGameStarted: () => {},
};

export default React.createContext(defaultState);
