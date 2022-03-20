import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import gameContext from "../../gameContext";
import gameService from "../../services/gameService";
import '../game/fields.css'

interface IJoinRoomProps {}

const JoinRoomContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
`;

const RoomIdInput = styled.input`
  height: 30px;
  width: 20em;
  font-size: 17px;
  outline: none;
  border: 1px solid #8e44ad;
  border-radius: 3px;
  padding: 0 10px;
`;

const JoinButton = styled.button`
  outline: none;
  background-color: gold;
  color: black;
  font-size: 17px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 4px 18px;
  transition: all 230ms ease-in-out;
  margin-top: 1em;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: 2px solid gold;
    color: black;
  }
`;

//  background-color: #8e44ad;
const ChangeButton = styled.button`
  outline: none;
  background-color: gold;
  color: black;
  font-size: 17px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 4px 18px;
  transition: all 230ms ease-in-out;
  margin-top: 1em;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: 2px solid gold;
    color: black;
  }
`;


export function JoinRoom(props: IJoinRoomProps) {

  const { initialSocket, setInitialSocket } = useContext(gameContext);

  const { individualName, setIndividualName } = useContext(gameContext);


  const [playerName, setPlayerName] = useState("");
  const [isJoining, setJoining] = useState(false);

  const { setInRoom, isInRoom } = useContext(gameContext);

  const [playersCount, setPlayersCount] = useState(4)

  const handleRoomNameChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setPlayerName(value);
  };

  const handlePlayersCount = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setPlayersCount(value);
  };

  const handleResetForm = async (e: React.ChangeEvent<any>) => {
    setJoining(false);

    if(initialSocket)
    await gameService.changeRoom(initialSocket)
    .catch((err) => {
      alert(err);
    });
  };

  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!playerName || playerName.trim() === "" || !initialSocket) return;

    setIndividualName(playerName)

    setJoining(true);

    const joined = await gameService
      .joinGameRoom(initialSocket, playerName, playersCount)
      .catch((err) => {
        alert(err);
      });

    if (joined) setInRoom(true);

    setJoining(false);
  };

  return (
    <>
    <form onSubmit={joinRoom}>
      
      <JoinRoomContainer>

      <a href="http://odmienswojaglowe.org/" target="_blank"><div className='logo-classroom'></div></a>

        <h2>Witaj {playerName} !</h2>
        {
          ! isJoining &&
          <h3>Wpisz Swoje Imię i Dołącz do Gry</h3>        }
        {
          isJoining &&
          <h4>Czekamy na komplet graczy...</h4>
        }
        { ! isJoining &&
          <RoomIdInput
          placeholder="Twoje Imię"
          value={playerName}
          onChange={handleRoomNameChange}
          />
        }

        {
          ! isInRoom &&
        <JoinButton type="submit" disabled={isJoining}>
        {isJoining ? "Oczekuję..." : "Wchodzę"}
      </JoinButton>
        }

        {
          ! isJoining &&
          <>
          <h3>Tutaj Ustaw  Liczbę Graczy</h3>
          <RoomIdInput
          type='number'
          value={playersCount}
          onChange={handlePlayersCount}
          min='2'
          max='6'
          required
          />
          </>
        }

{
          isJoining &&
          <>
          <h4>Ustalona liczba graczy: <span style={{fontSize: '30px'}}>{playersCount}</span></h4>
          <ChangeButton 
            type='button'
            onClick={handleResetForm}>
            zmień liczbę graczy
            </ChangeButton>
          </>
        }

          
          

      </JoinRoomContainer>
    </form>
    </>
  );
}
