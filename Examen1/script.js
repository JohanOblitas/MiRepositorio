let board; // global

let turno = true

const createBoard = (numRows, numCols) => {
    const rows = []

    for (let i = 0; i < numRows; i++){
        let casillas = []
        for (let j = 0; j < numCols; j++){
            casillas.push({
                mostrado: false,
                simbolo: ""
            })
        }
        rows.push(casillas)
    }
    return rows
}



const casillaOnClick = (row, col) => {
    const casilla = getValue(board, row, col)
    casilla.mostrado = true;
    renderizarBoard(row, col);

    if (turno){
        turno = false
    }
    else{
        turno = true
    }

    evaluarJuego(3, 3)
    

}

const evaluarJuego = (row, col) => {
    let finish = false
    let ganador = ""
    let pos0_0 = getValue(board, 0, 0)
    let pos0_1 = getValue(board, 0, 1)
    let pos0_2 = getValue(board, 0, 2) 
    let pos1_0 = getValue(board, 1, 0)
    let pos1_1 = getValue(board, 1, 1)
    let pos1_2 = getValue(board, 1, 2)
    let pos2_0 = getValue(board, 2, 0)
    let pos2_1 = getValue(board, 2, 1)
    let pos2_2 = getValue(board, 2, 2)

    const h1 = document.getElementById("titulo")

    if (pos0_0.simbolo == pos0_1.simbolo && pos0_1.simbolo == pos0_2.simbolo){
        if (pos0_0.mostrado && pos0_1.mostrado && pos0_2.mostrado){
            finish = true
            ganador = pos0_0.simbolo
        }
    }
    else if (pos1_0.simbolo == pos1_1.simbolo && pos1_1.simbolo == pos1_2.simbolo){
        if (pos1_0.mostrado && pos1_1.mostrado && pos1_2.mostrado){
            finish = true
            ganador = pos1_0.simbolo
        }
    }
    else if (pos2_0.simbolo == pos2_1.simbolo && pos2_1.simbolo == pos2_2.simbolo){
        if (pos2_0.mostrado && pos2_1.mostrado && pos2_2.mostrado){
            finish = true
            ganador = pos2_0.simbolo
        }
    }
    else if (pos0_0.simbolo == pos1_0.simbolo && pos1_0.simbolo == pos2_0.simbolo){
        if (pos0_0.mostrado && pos1_0.mostrado && pos2_0.mostrado){
            finish = true
            ganador = pos0_0.simbolo
        }
    }
    else if (pos0_1.simbolo == pos1_1.simbolo && pos1_1.simbolo == pos2_1.simbolo){
        if (pos0_1.mostrado && pos1_1.mostrado && pos2_1.mostrado){
            finish = true
            ganador = pos0_1.simbolo
        }
    }
    else if (pos0_2.simbolo == pos1_2.simbolo && pos1_2.simbolo == pos2_2.simbolo){
        if (pos0_2.mostrado && pos1_2.mostrado && pos2_2.mostrado){
            finish = true
            ganador = pos0_2.simbolo
        }
    }
    else if (pos0_0.simbolo == pos1_1.simbolo && pos1_1.simbolo == pos2_2.simbolo){
        if (pos0_0.mostrado && pos1_1.mostrado && pos2_2.mostrado){
            finish = true
            ganador = pos0_0.simbolo
        }
    }
    else if (pos0_2.simbolo == pos1_1.simbolo && pos1_1.simbolo == pos2_0.simbolo){
        if (pos0_2.mostrado && pos1_1.mostrado && pos2_0.mostrado){
            finish = true
            ganador = pos0_2.simbolo
        }
    }
    else{
        let draw = true
        for (let i = 0; i < row; i++){
            for (let j = 0; j < col; j++){
                let casilla = board[i][j]
                if (casilla.mostrado == false){
                    draw = false
                }
            }
        }
        if (draw){
            for (let i = 0; i < row; i++){
                for (let j = 0; j < col; j++){
                    document.getElementById(`${i}_${j}`).classList.add('disabled');
                }
            }
            h1.innerText = "Tres en Raya! Empate"
        }
    }

    if (finish){
        for (let i = 0; i < row; i++){
            for (let j = 0; j < col; j++){
                document.getElementById(`${i}_${j}`).classList.add('disabled');
            }
        }
        h1.innerText = "Tres en Raya! Ganador: " + ganador
    }
}


const renderizarBoard = (row, col) => {
    for (let i = 0; i < board.length; i++){
        const casillas = board[i]
        for (let j = 0; j < casillas.length; j++){
            const butCasilla = document.getElementById(`${i}_${j}`)
            if (casillas[j].mostrado && (row)==i && (col)==j){
                if (turno){
                    casillas[j].simbolo = "X"
                    butCasilla.innerText = casillas[j].simbolo
                }
                else{
                    casillas[j].simbolo = "O"
                    butCasilla.innerText = casillas[j].simbolo
                }
                casillas[j].mostrado = true
            }
            else if (casillas[j].mostrado == false){
                casillas[j].simbolo = ""
                butCasilla.innerText = casillas[j].simbolo
            }
            else{
                casillas[j].mostrado = true
            }
            
        }
    }
}

const getValue = (board, row, col) => {
    return board[row][col]
}

const main = () => {
    board = createBoard(3, 3)
    renderizarBoard()
}

main()