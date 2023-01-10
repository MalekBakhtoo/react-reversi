
function reversi(){
const allPlace = document.getElementById("places");
const rows = document.getElementsByClassName('rows');

const allBlock = [];
for (let i = 0; i < 8; i++) {
    const rowBlock = [];
    for (let j = 0; j < 8; j++) {
        const newPlace = document.createElement("div");
        // newPlace.setAttribute('class', 'place');
        newPlace.classList.add("place");
        rowBlock.push(newPlace);
    }
    allBlock.push(rowBlock);
}
for (let i = 0; i < 8; i++) {
    rows[0].appendChild(allBlock[0][i]);
    rows[1].appendChild(allBlock[1][i]);
    rows[2].appendChild(allBlock[2][i]);
    rows[3].appendChild(allBlock[3][i]);
    rows[4].appendChild(allBlock[4][i]);
    rows[5].appendChild(allBlock[5][i]);
    rows[6].appendChild(allBlock[6][i]);
    rows[7].appendChild(allBlock[7][i]);
}

function inpDisk(block) {
    let disk = document.createElement("div");
    disk.classList.add("disk");
    block.appendChild(disk);
}

let balckTurn = true;
let whtieTurn = false;

const whiteBlock =[];
const blackBlock =[];


// function suggestion(black, white) {

//     if (balckTurn) {
//         for (i = 0; i < blackBlock.length; i++) {
//             for (j=0 ; j<8 ; j++){
                
                

//             }
            
            
//         }
//     }

// }
}