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
 * @returns {{setupBoard:Function,makePlayers:Function,startGame:Boolean}}
 */
let GameFlow = () => {
  /**
   * @type {{name:String,XorO:String,clickedCellByPlayer:Array}}
   */
  let turn = {};
  let classNameForBoard = ".gameBoard";
  let player1, player2;
  let gameContainerDiv;
  let startGame = false;
  let topOfBoardtextForCurrentPlayer = document.querySelector(
    ".gameBoardContainer > h1"
  );

  let setupBoard = () => {
    gameContainerDiv = document.querySelector(".gameBoardContainer");
    checkIfBoardExistAndDeleteBoard();
    let board = GameBoard(9);
    gameContainerDiv.appendChild(board.createBoard());
    assignListenerToCell();
  };

  let makePlayers = (name1, name2, symbol1, symbol2) => {
    player1 = Player(name1, symbol1);
    player2 = Player(name2, symbol2);
    turn = player1;
    startGame = true;
  };

  let checkIfBoardExistAndDeleteBoard = () => {
    let checkBoard = document.querySelector(`${classNameForBoard}`);
    return checkBoard
      ? gameContainerDiv.removeChild(checkBoard)
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
    if (!startGame) {
      alert("Must finish filling form");
      return;
    }
    if (player1 == null || player2 == null) {
      console.log("Error player1 or player2 is not assigned");
      return;
    }
    let cell = document.getElementById(`${cellId}`);
    cell.textContent = turn.XorO;
    turn.clickedCellByPlayer[`cell${cellId}`] = 1;
    topOfBoardtextForCurrentPlayer.textContent = `Player: ${turn.name}`;
    setTimeout(() => {
      if (checkIfWinner(turn.clickedCellByPlayer)) {
        alert(turn.name, "winner");
      } else {
        if (turn === player1) turn = player2;
        else if (turn === player2) turn = player1;
        else console.log("Something wrong with turn variable ", turn);
      }
    }, 5);
  };

  /**
   *
   * @param {{ cell1: 0,cell2: 0,cell3: 0,cell4: 0,cell5: 0,cell6: 0,cell7: 0,cell8: 0,cell9: 0,}} clickedCellByPlayer
   */
  let checkIfWinner = (clickedCellByPlayer) => {
    let cell1 = clickedCellByPlayer.cell1;
    let cell2 = clickedCellByPlayer.cell2;
    let cell3 = clickedCellByPlayer.cell3;
    let cell4 = clickedCellByPlayer.cell4;
    let cell5 = clickedCellByPlayer.cell5;
    let cell6 = clickedCellByPlayer.cell6;
    let cell7 = clickedCellByPlayer.cell7;
    let cell8 = clickedCellByPlayer.cell8;
    let cell9 = clickedCellByPlayer.cell9;
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

  return { setupBoard, makePlayers, startGame };
};

//create an input factory
/**
 *
 * @param {String} pathOfPlayer1Name
 * @param {String} pathOfPlayer2Name
 * @param {String} pathOfOorXForPlayer1
 * @returns
 */
let InputPlayerDataFactory = (
  pathOfPlayer1Name,
  pathOfPlayer2Name,
  pathOfOorXForPlayer1
) => {
  let oorXForPlayer1 = document.querySelector(pathOfOorXForPlayer1).value;
  let oorXForPlayer2;
  /**
   * @type {HTMLInputElement}
   */
  let player1Name = document.querySelector(pathOfPlayer1Name).value;
  /**
   * @type {HTMLInputElement}
   */
  let player2Name = document.querySelector(pathOfPlayer2Name).value;

  let gotData = false;

  let checkIfFieldIsEmpty = () =>
    player1Name == "" || player2Name == "" ? true : false;

  let getDataAndAssignSymbols = (() => {
    //check if field is empty
    if (!checkIfFieldIsEmpty()) {
      oorXForPlayer1 == "X" ? (oorXForPlayer2 = "O") : (oorXForPlayer2 = "X");
      gotData = true;
    } else {
      alert("Fields must be filled.");
      console.log(player1Name, player2Name);
      return;
    }
  })();

  return { player1Name, player2Name, oorXForPlayer1, oorXForPlayer2, gotData };
};

//when start/restart button is pressed
document
  .querySelector(".inputPlayerData > button")
  .addEventListener("click", () => {
    //get player data and process it
    /**
     * @returns {{player1Name:String,player2Name:String,oorXForPlayer1:String,oorXForPlayer2:String,gotData:Boolean}}
     */
    let inputPlayerData = InputPlayerDataFactory(
      ".inputPlayerData .player1Side #player1",
      ".inputPlayerData .player2Side #player2",
      ".inputPlayerData .player1Side .XORO input[name='choosexoro']:checked"
    );
    if (inputPlayerData.gotData) {
      //when clicked the board works
      let gameBoaredMake = GameFlow();
      //creates board
      gameBoaredMake.setupBoard();
      //create players
      gameBoaredMake.makePlayers(
        inputPlayerData.player1Name,
        inputPlayerData.player2Name,
        inputPlayerData.oorXForPlayer1,
        inputPlayerData.oorXForPlayer2
      );
    }
  });
