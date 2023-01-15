import { useState, useEffect, useCallback } from 'react'
import img from "./assets/react.svg"

export default function Gamereact() {

  // board making 
  const allBlock = [];
  for (let i = 0; i < 8; i++) {
    const colBlock = [];
    for (let j = 0; j < 8; j++) {
      const newPlace = document.createElement("div");
      newPlace.setAttribute("id", "C" + j + "" + i)
      newPlace.classList.add("cell");
      colBlock.push(newPlace);
    }
    allBlock.push(colBlock);
  }

  useEffect(() => {
    const col = document.getElementsByClassName("col");
    for (let i = 0; i < 8; i++) {
      col[0].appendChild(allBlock[0][i]);
      col[1].appendChild(allBlock[1][i]);
      col[2].appendChild(allBlock[2][i]);
      col[3].appendChild(allBlock[3][i]);
      col[4].appendChild(allBlock[4][i]);
      col[5].appendChild(allBlock[5][i]);
      col[6].appendChild(allBlock[6][i]);
      col[7].appendChild(allBlock[7][i]);
    }
  }, []);

  // make accupied cell matrix
  // white 1  , black 2 , null 3

  const accCells = [];
  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      row.push(3);
    }
    accCells.push(row);
  }
  accCells[3][3] = 1;
  accCells[3][4] = 2;
  accCells[4][3] = 2;
  accCells[4][4] = 1;

  function findValidMove(i, j, turn, search) {
    let blockValidMoves = [];
    let validRow = i, validColumn = j;



    // check right 
    for (let c = j + 1; c < 7; c++) {
      if (accCells[i][c] == turn || accCells[i][c] == 3) { break; }
      else {
        if (accCells[i][c + 1] == 3) {
          validColumn++;
          blockValidMoves.push([validRow, validColumn + 1]);
        } else if (accCells[i][c + 1] == search) { validColumn++; }
      }
    }
    validRow = i, validColumn = j;
    // check left 
    for (let c = j - 1; c > 0; c--) {
      if (accCells[i][c] == turn || accCells[i][c] == 3) { break; }
      else {
        if (accCells[i][c - 1] == 3) {
          validColumn--;
          blockValidMoves.push([validRow, validColumn - 1]);
        } else if (accCells[i][c - 1] == search) { validColumn--; }
      }
    }
    validRow = i, validColumn = j;
    // check top
    for (let c = i - 1; c > 0; c--) {
      if (accCells[c][j] == turn || accCells[c][j] == 3) { break; }
      else {
        if (accCells[c - 1][j] == 3) {
          validRow--;
          blockValidMoves.push([validRow - 1, validColumn]);
        } else if (accCells[c - 1][j] == search) { validRow--; }
      }
    }
    validRow = i, validColumn = j;
    // check down 
    for (let c = i + 1; c < 7; c++) {
      if (accCells[c][j] == turn || accCells[c][j] == 3) { break; }
      else {
        if (accCells[c + 1][j] == 3) {
          validRow++;
          blockValidMoves.push([validRow + 1, validColumn]);
        } else if (accCells[c + 1][j] == search) { validRow++; }
      }
    }

    // check top lef 
    let r = i - 1, c = j - 1;
    while ((r > 0) && (c > 0)) {
      if (accCells[r][c] == turn || accCells[r][c] == 3) { break; }
      else {
        if (accCells[r - 1][c - 1] == 3) {
          r--; c--;
          blockValidMoves.push([r, c]);
        } else { r--; c--; }
      }
    }
    //top right 
    r = i - 1, c = j + 1;
    while ((r > 0) && (c < 7)) {
      if (accCells[r][c] == turn || accCells[r][c] == 3) { break; }
      else {
        if (accCells[r - 1][c + 1] == 3) {
          r--; c++;
          blockValidMoves.push([r, c]);
        } else { r--; c++; }
      }
    }
    // bottom left
    r = i + 1, c = j - 1;
    while ((r < 7) && (c > 0)) {
      if (accCells[r][c] == turn || accCells[r][c] == 3) { break; }
      else {
        if (accCells[r + 1][c - 1] == 3) {
          r++; c--;
          blockValidMoves.push([r, c]);
        } else { r++; c--; }
      }
    }
    //bottom right
    r = i + 1, c = j + 1;
    while ((r < 7) && (c < 7)) {
      if (accCells[r][c] == turn || accCells[r][c] == 3) { break; }
      else {
        if (accCells[r + 1][c + 1] == 3) {
          r++; c++;
          blockValidMoves.push([r, c]);
        } else { r++; c++; }
      }
    }
    return { "block": [i, j], "valid": blockValidMoves };

  }
  function validPlaces(bturn) {
    let allValidMoves = [];
    let turn = 2;
    let search = 1;
    if (bturn) { search = 1; turn = 2; }
    else { search = 2; turn = 1; }

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {

        if (accCells[i][j] == turn) {
          let valid = findValidMove(i, j, turn, search);
          allValidMoves.push(valid);
        }
      }
    }
    return allValidMoves;
  }
  function setSugustions(valPlaces) {

    for (let i = 0; i < valPlaces.length; i++) {
      for (let j = 0; j < valPlaces[i]["valid"].length; j++) {
        let row = valPlaces[i]["valid"][j][1];
        let col = valPlaces[i]["valid"][j][0];
        let segPlace = allBlock[row][col];
        if (!(segPlace.classList.contains("sugust"))) {
          segPlace.classList.add("sugust");
        }
      }
    }
  }



  const [whiteScore, setWhiteScore] = useState(2);
  const [blackScore, setBlackScore] = useState(2);


  function setBlock() {


    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {

        allBlock[i][j].classList.remove("sugust");

        if (accCells[i][j] == 1) {
          let wblock = document.createElement("img");
          wblock.setAttribute("src", "src/assets/img/wb.png");
          wblock.classList.add("block");
          // setWhiteScore(whiteScore+1);
          if (allBlock[j][i].children.length >= 1) {
            allBlock[j][i].children[0].remove();
          }
          allBlock[j][i].appendChild(wblock);
        }
        if (accCells[i][j] == 2) {
          let bblock = document.createElement("img");
          bblock.setAttribute("src", "src/assets/img/bb.png");
          bblock.classList.add("block");
          // setBlackScore(blackScore+1);
          if (allBlock[j][i].children.length >= 1) {
            allBlock[j][i].children[0].remove();
          }
          allBlock[j][i].appendChild(bblock);
        }
        if (accCells[i][j] == 3 && allBlock[j][i].children.length >= 1) {
          allBlock[j][i].removeChild(allBlock[j][i].children[0]);
        }
      }
    }
  }
  function choose(bturn, id, valPlaces) {

    let chossedBlock = [parseInt(id[1]), parseInt(id[2])];

    let turn = 2;
    let noTurn = 1;
    if (bturn) { noTurn = 1; turn = 2; }
    else { noTurn = 2; turn = 1; }


    for (let satr = 0; satr < valPlaces.length; satr++) {
      for (let sotoon = 0; sotoon < valPlaces[satr]["valid"].length; sotoon++) {
        let row = valPlaces[satr]["valid"][sotoon][0];
        let col = valPlaces[satr]["valid"][sotoon][1];

        if (chossedBlock[0] == row && chossedBlock[1] == col) {
          let originRow = valPlaces[satr]["block"][0];
          let originCol = valPlaces[satr]["block"][1];

          //top set
          if (originRow > row && originCol == col) {
            for (let i = originRow - 1; i >= row; i--) {
              accCells[i][col] = turn;
            }
          }
          //down set
          if (originRow < row && originCol == col) {
            for (let i = originRow + 1; i <= row; i++) {
              accCells[i][col] = turn;
            }
          }
          //left set
          if (originRow == row && originCol > col) {
            for (let i = originCol - 1; i >= col; i--) {
              accCells[row][i] = turn;
            }
          }
          //right set
          if (originRow == row && originCol < col) {
            for (let i = originCol + 1; i <= col; i++) {
              accCells[row][i] = turn;
            }
          }
          //top left
          if (originRow > row && originCol > col) {
            let r = originRow - 1, c = originCol - 1;
            while (r >= row && c >= col) {
              accCells[r][c] = turn;
              r--; c--;
            }
          }
          //top right
          if (originRow > row && originCol < col) {
            let r = originRow - 1, c = originCol + 1;
            while (r >= row && c <= col) {
              accCells[r][c] = turn;
              r--; c++;
            }
          }
          //down left
          if (originRow < row && originCol > col) {
            let r = originRow + 1, c = originCol - 1;
            while (r <= row && c >= col) {
              accCells[r][c] = turn;
              r++; c--;
            }
          }
          //down right
          if (originRow < row && originCol < col) {
            let r = originRow + 1, c = originCol + 1;
            while (r <= row && c <= col) {
              accCells[r][c] = turn;
              r++; c++;
            }
          }
        }
      }
    }
    setBlock();
  }
  function isFinished() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (accCells[i][j] == 3) { return false; }
      }
    }
    return true;
  }
  for (let i of allBlock) {
    for (let j of i) {
      j.addEventListener("click", (e) => {
        choose(blackTurn, e.target.id, valplace);
        blackTurn = !blackTurn;
        valplace = validPlaces(blackTurn);
        setSugustions(valplace);
        let scores = scoreUpdate();

        setBlackScore(scores[1]);
        setWhiteScore(scores[0]);

        if (isFinished()) {

          if (scores[0] > scores[1]) {
            window.alert(" white win  finish");
          }
          if ( scores[0] < scores[1]) {
            window.alert(" black win  finish");
          }
        }
      });
    }
  }

  function scoreUpdate() {
    let w = 0, b = 0;
    for (let i of accCells) {
      for (let j of i) {
        if (j == 1) { w++; }
        else if (j == 2) { b++; }
      }
    }
    return [w, b];
  }


  let blackTurn = false;
  let valplace = validPlaces(blackTurn);
  setBlock();
  setSugustions(valplace);

  return (

    <><nav className="navbar">
      <div className="items">

        <div href="#" className="logo">
          <img src={img} alt="website logo" />
          <h1>Reversi Game</h1>

        </div>
        <ul>
          <li><a href="#">GAMES</a></li>
          <li><a href="#" target="_blank">SIGN IN</a></li>
          <li><a href="#">SIGN UP</a></li>
        </ul>

      </div>
    </nav><main>
        <div className='white player-property'>
          <p>White</p>
          <p>score : {whiteScore}</p>
        </div>
        <article id="p">
          <section id="cells">
            <div className="col" id="row1"></div>
            <div className="col" id="row2"></div>
            <div className="col" id="row3"></div>
            <div className="col" id="row4"></div>
            <div className="col" id="row5"></div>
            <div className="col" id="row6"></div>
            <div className="col" id="row7"></div>
            <div className="col" id="row8"></div>
          </section>
          <section id="buttons">
            <button><i className="fa-solid fa-arrow-rotate-right"></i>  RESTART</button>
          </section>
        </article>
        <div className='black player-property'>
          <p>black</p>
          <p>score : {blackScore}</p>
        </div>



      </main></>

  )
}