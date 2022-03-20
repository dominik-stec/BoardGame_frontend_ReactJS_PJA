import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { io, Socket } from "socket.io-client";
import socketService from "./services/socketService";
import { JoinRoom } from "./components/joinRoom";
import GameContext, { IGameContextProps } from "./gameContext";
import { Game } from "./components/game";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

const AppContainer = styled.div`
  background-color: rgb(230,230,230);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;

const WelcomeText = styled.h1`
  margin: 0;
  color: white;
  text-shadow: 0 0 8px red, 0 0 3px yellow;
  font-family: Helvetica sans-serif;
  font-size: 40px;
  border: 1px solid white;
  padding: 15px;
  border-radius: 10px;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  font-family: sans-serif;
  justify-content: center;
  color: white;
  font-size: 20px;
  text-shadow: 0 0 5px black, 0 0 10px skyblue;
`;

const ResetCSS = styled.div`
  font-family: sans-serif;
  text-shadow: 0 0 0 black, 0 0 0 black;

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 20px;
`;

function App() {
  const [isInRoom, setInRoom] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState<"x" | "o">("x");
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);

  const [initialSocket, setInitialSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>();

  const [individualName, setIndividualName] = useState('none');

  const [individualField, setIndividualField] = useState(1);



  const connectSocket = async () => {
    const socket = await socketService
      .connect("http://localhost:9000") 
      .catch((err) => {
        console.log("Error: ", err);
      });
      if(socket)
      setInitialSocket(socket)
  };

  useEffect(() => {
    connectSocket();
  }, []);

  const gameContextValue: IGameContextProps = {

    initialSocket,
    setInitialSocket,

    individualName,
    setIndividualName,

    individualField,
    setIndividualField,

    isInRoom,
    setInRoom,
    playerSymbol,
    setPlayerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
  };

  return (
    <GameContext.Provider value={gameContextValue}>
      <AppContainer>
        <WelcomeText>Odmień Swoją Głowę !</WelcomeText>
        <MainContainer>
          {!isInRoom && <JoinRoom />}
          {isInRoom && <ResetCSS><Game /></ResetCSS>}
        </MainContainer>
      </AppContainer>
    </GameContext.Provider>
  );
}

export default App;
