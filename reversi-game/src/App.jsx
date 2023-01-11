import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import './reversi.js'
import { useEffect } from 'react';



function App() {

  // board making 
  const allBlock = [];
  for (let i = 0; i < 8; i++) {
    const colBlock = [];
    for (let j = 0; j < 8; j++) {
      const newPlace = document.createElement("div");
      newPlace.classList.add("cell");
      colBlock.push(newPlace);
    }
    allBlock.push(colBlock);
  }

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

  accCells[4][4] = 1;
  accCells[4][5] = 2;
  accCells[5][4] = 2;
  accCells[5][5] = 1;



  useEffect(() => {
    const allPlace = document.getElementById("places");
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



  function inpDisk(block) {
    let disk = document.createElement("div");
    disk.classList.add("disk");
    block.appendChild(disk);
  }

  let balckTurn = false;

  function findValidMove(i, j, turn, search) {
    let blockValidMoves = [];
    let validRow = i, validColumn = j;



    // check right 
    for (c = j + 1; c < 7; c++) {
      if (accCells[i][c] == turn || accCells[i][c] == 3) { break; }
      else {
        if (accCells[i][c + 1] == 3) {
          validColumn++;
          blockValidMoves.push([validRow, validColumn]);
        } else if (accCells[i][c + 1] == search) { validColumn++; }
      }
    }
    // check left 
    for (c = j - 1; c > 0; c--) {
      if (accCells[i][c] == turn || accCells[i][c] == 3) { break; }
      else {
        if (accCells[i][c - 1] == 3) {
          validColumn--;
          blockValidMoves.push([validRow, validColumn]);
        } else if (accCells[i][c - 1] == search) { validColumn--; }
      }
    }
    // check top
    for (c = i - 1; c > 0; c--) {
      if (accCells[c][j] == turn || accCells[c][j] == 3) { break; }
      else {
        if (accCells[c - 1][j] == 3) {
          validColumn--;
          blockValidMoves.push([validRow, validColumn]);
        } else if (accCells[c - 1][j] == search) { validRow--; }
      }
    }
    // check down 
    for (c = j + 1; c < 7; c++) {
      if (accCells[c][j] == turn || accCells[c][j] == 3) { break; }
      else {
        if (accCells[c + 1][j] == 3) {
          validColumn++;
          blockValidMoves.push([validRow, validColumn]);
        } else if (accCells[c + 1][j] == search) { validRow++; }
      }
    }

    // check top lef 
    let r = i - 1, c = j - 1;
    while (!(r == 0) && !(col == 0)) {
      if (accCells[r][c] == turn || accCells[r][c] == 3) { break; }
      else {
        if (accCells[r - 1][c - 1] == 3) {
          r--; c--;
          blockValidMoves.push([r, c]);
        } else if (accCells[r - 1][c - 1] == search) { r--; c--; }
      }
    }
    //top right 
    r = i - 1, c = j + 1;
    while (!(r == 0) && !(col == 7)) {
      if (accCells[r][c] == turn || accCells[r][c] == 3) { break; }
      else {
        if (accCells[r - 1][c + 1] == 3) {
          r--; c++;
          blockValidMoves.push([r, c]);
        } else if (accCells[r - 1][c + 1] == search) { r--; c++; }
      }
    }
    // bottom left
    r = i + 1, c = j - 1;
    while (!(r == 7) && !(col == 0)) {
      if (accCells[r][c] == turn || accCells[r][c] == 3) { break; }
      else {
        if (accCells[r + 1][c - 1] == 3) {
          r++; c--;
          blockValidMoves.push([r, c]);
        } else if (accCells[r + 1][c - 1] == search) { r++; c--; }
      }
    }
    //bottom right
    r = i + 1, c = j + 1;
    while (!(r == 0) && !(col == 7)) {
      if (accCells[r][c] == turn || accCells[r][c] == 3) { break; }
      else {
        if (accCells[r + 1][c + 1] == 3) {
          r++; c++;
          blockValidMoves.push([r, c]);
        } else if (accCells[r + 1][c + 1] == search) { r++; c++; }
      }
    }
    return { block: [i, j], valid: blockValidMoves };

  }



  function validPlaces(bturn) {
    let allValidMoves = [];
    let turn = 2;
    let search = 1;
    if (bturn) { search = 1; turn = 2; }
    else { search = 2; turn = 1; }

    for (i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {

        if (accCells[i][j] == turn) {
          valid = findValidMove(i, j, turn, search);
          allValidMoves.push(valid);
        }
      }
    }
    return allValidMoves;
  }
  function setSugustions(bturn) {

    let valPlaces = validPlaces(bturn);
    for (i = 0; i < valPlaces.length; i++) {
      for (let j = 0; j < valPlaces[i][valid].length; j++) {
        row = valPlaces[i][valid][j][0];
        col = valPlaces[i][valid][j][1];
        let segPlace = allBlock[row][col];
        segPlace.classList.add("sugust");
      }
    }
  }



  function setBlock() {
    for (i = 0; i < 8; i++) {
      for (j = 0; j < 8; j++) {

        if (accCells[i][j] == 1) {
          wblock = document.createElement("div");
          wblock.classList.add("wblock");
          allBlock[j][i].children[0] = wblock;
        }
        if (accCells[i][j] == 2) {
          bblock = document.createElement("div");
          bblock.classList.add("bblock");
          allBlock[j][i].children[0] = bblock;
        }
        if (accCells[i][j] == 3 && allBlock[j][i].children[0].length >= 1) {
          allBlock[j][i].removeChild(allBlock[j][i].children[0]);
        }
      }
    }
  }
  function choose(){

  }
  function isFinished(accplaces){

  }
  function turnHandler(){
    
  }




  return (
    <section id='board'>
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
    </section>

  )
}
export default App



