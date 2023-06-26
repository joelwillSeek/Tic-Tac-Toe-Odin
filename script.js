/**
 * Note
 * player 1 pick add player 2 is default's to the left overs
 */

/**
 *
 * @return {{createBoard:Function}}
 *
 */

//factory function for gameboard
let GameBoard = (size) => {
  let createBoard = () => {
    let board = document.createElement("div");
    board.setAttribute("class", "gameBoard");
    for (let i = 1; i <= size; i++) {
      let cell = document.createElement("div");
      cell.setAttribute("class", `cell`);
      cell.setAttribute("id", `${i}`);
      board.appendChild(cell);
    }
    return board;
  };
  return {
    createBoard,
  };
};

//factory function for player
/**
 *
 * @param {String} name
 * @param {String} XorO
 * @returns {{name:String,XorO:String,clickedCellByPlayer:Array}}
 */
let Player = (name, XorO) => {
  let clickedCellByPlayer = {
    cell1: 0,
    cell2: 0,
    cell3: 0,
    cell4: 0,
    cell5: 0,
    cell6: 0,
    cell7: 0,
    cell8: 0,
    cell9: 0,
  };
  return {
    name,
    XorO,
    clickedCellByPlayer,
  };
};

//factory function for game flow
/**
 *
 * @returns {{startGameOrRestart:Function}}
 */
let GameFlow = () => {
  /**
   * @type {{name:String,XorO:String,clickedCellByPlayer:Array}}
   */
  let turn = "";
  let classNameForBoard = ".gameBoard";
  let player1, player2;
  let startGameOrRestart = () => {
    player1 = Player("eyoel", "X");
    player2 = Player("Josh", "O");
    turn = player1;
    checkIfBoardExistAndDeleteBoard();
    let board = GameBoard(9);
    document.body.appendChild(board.createBoard());
    assignListenerToCell();
  };

  let checkIfBoardExistAndDeleteBoard = () => {
    let checkBoard = document.querySelector(`${classNameForBoard}`);
    return checkBoard
      ? document.body.removeChild(checkBoard)
      : console.log("No board insight p.s i'm in checkifboard.. function");
  };

  let assignListenerToCell = () => {
    /**
     * @type {Array<HTMLDivElement>}
     */
    let getCells = document.querySelectorAll(`${classNameForBoard} .cell`);
    getCells.forEach((value) => {
      value.addEventListener("click", () => {
        let thisCellId = value.id;
        cellPressed(thisCellId);
      });
    });
  };

  let cellPressed = (cellId) => {
    if (player1 == null || player2 == null) {
      console.log("Error player1 or player2 is not assigned");
      return;
    }
    let cell = document.getElementById(`${cellId}`);
    cell.textContent = turn.XorO;
    turn.clickedCellByPlayer[`cell${cellId}`] = 1;
    if (checkIfWinner(turn.clickedCellByPlayer)) {
      console.log(turn.name, "winner");
    } else {
      if (turn === player1) turn = player2;
    }
  };

  /**
   *
   * @param {{ cell1: 0,cell2: 0,cell3: 0,cell4: 0,cell5: 0,cell6: 0,cell7: 0,cell8: 0,cell9: 0,}} clickedCellByPlayer
   */
  let checkIfWinner = (clickedCellByPlayer) => {
    //diagonal winner
    if (
      //diagonal winner
      (cell1 == 1 && cell5 == 1 && cell9 == 1) ||
      (cell3 == 1 && cell5 == 1 && cell7 == 1) ||
      //horizontal winner
      (cell1 == 1 && cell2 == 1 && cell3 == 1) ||
      (cell4 == 1 && cell5 == 1 && cell6 == 1) ||
      (cell7 == 1 && cell8 == 1 && cell9 == 1) ||
      //vertical winner
      (cell1 == 1 && cell4 == 1 && cell7 == 1) ||
      (cell2 == 1 && cell5 == 1 && cell8 == 1) ||
      (cell3 == 1 && cell6 == 1 && cell9 == 1)
    ) {
      //call winner function
      return true;
    }

    return false;
  };
  return { startGameOrRestart };
};

//The function that acts like a main in c++
let gameSetup = (() => {
  let gameBoaredMaked = GameFlow();
  gameBoaredMaked.startGameOrRestart();
})();
