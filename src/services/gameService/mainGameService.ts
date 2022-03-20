import { Socket } from "socket.io-client";
import { IPlayerState } from "../../components/game";

//onGameUpdate is response from

class MainGameService {
  public async initService(socket: Socket, gameState: IPlayerState): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit("init_service", gameState);
      socket.on("init_service_done", () => rs(true));
      socket.on("init_service_error", ({ error }) => rj(error));
    });
  }

  public async onIdentifyPlayer(
    socket: Socket,
    listiner: (options: string) => void
  ) {
    socket.once("identify_player", listiner);
  }

  // public async setName(socket: Socket) {
  //   socket.emit("set_name");
  // }

  // public async onSetName(socket: Socket, listiner: (message: any) => void) {
  //   socket.on("on_set_name", listiner); // change from on to  once
  //   //socket.on("user_leave", ({ message }) => listiner(message));
  // }

  // public async switchPlayer(socket: Socket, message: IPlayerState) {
  //   socket.emit("switch_player", message);
  // }

  // public async onSwitchPlayer(socket: Socket, listiner: (message: IPlayerState) => void) {
  //   socket.once("on_switch_player", listiner);
  //   //socket.on("user_leave", ({ message }) => listiner(message));
  // }

  // public async changeRoom(socket: Socket) {
  //   socket.emit("change_room");
  // }

  // public async onUserLeave(socket: Socket, listiner: (message: string) => void) {
  //   socket.once("user_leave", listiner);
  //   //socket.on("user_leave", ({ message }) => listiner(message));
  // }

  // public async updatePlayerState(socket: Socket, gameMatrix: IPlayerState) {
  //   socket.emit("update_player_state",  gameMatrix );
  // }
 
  // public async updateActualBoardWithPLayerState(socket: Socket, gameMatrix: Array<any>) {
  //   socket.emit("update_actual_board_with_player_state", { matrix: gameMatrix });
  // }

  // public async onUpdatePlayerState(
  //   socket: Socket,
  //   listiner: (newMatrix: IPlayerState) => void
  // ) {
  //   socket.on("on_update_player_state", listiner);
  // }

  // public async onUpdateActualBoardWithPLayerState(
  //   socket: Socket,
  //   listiner: (matrix: Array<any>) => void
  // ) {
  //   socket.on("on_update_actual_board_with_player_state", ({ matrix }) => listiner(matrix));
  // }

  // public async onStartGame(
  //   socket: Socket,
  //   listiner: (options: IPlayerState) => void
  // ) {
  //   socket.once("start_game_4", listiner);
  // }

  // public async lastUserStay(socket: Socket, message: string) {
  //   socket.emit("last_user_stay", message);
  // }

  // public async gameWin(socket: Socket, message: string) {
  //   socket.emit("game_win", { message });
  // }

  // public async onGameWin(socket: Socket, listiner: (message: string) => void) {
  //   socket.on("on_game_win", ({ message }) => listiner(message));
  // }

  // public async onSetPlayerName(
  //   socket: Socket,
  //   listiner: (options: any) => void
  // ) {
  //   socket.once("on_set_name", listiner);
  // }
}

export default new MainGameService();
