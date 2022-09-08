let board; // global

const EmojiList = ["&#x2B50;",     // Estrella
                    "&#x1F30E;",   // Planeta Tierra
                    "&#x1F33A;",   // Flor Rosa
                    "&#x1F355;",   // Pizza
                    "&#x1F369;",   // Dona
                    "&#x1F370;",   // Torta
                    "&#x1F3A8;",   // Pintura
                    "&#x1F3B2;",   // Dado
                    "&#x1F3AE;",   // Mando de Play
                    "&#x1F3B8;",   // Guitarra Electrica
                    "&#x1F3C0;",   // Pelota de Baloncesto
                    "&#x1F42C;"]   // Delfin

const casillasAbiertas = []

// Funcion auxiliar para generar numeros aleatorios sin repetirse.
// Como resultado quedará una lista de indices (0 - 11) dos veces. De esta forma se rellenarán las 24 casillas.
const shuffle = () => {
    const a = []
    let count = 0
    for (let j = 0; j < 12; j++){
        a.push(count)
        a.push(count)
        count += 1
    }

    let j, x
    for (let i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

const createBoard = (numRows, numCols) => {
        const random = shuffle()
        const rows = []

        for (let i = 0; i < numRows; i++){
            let casillas = []
            for (let j = 0; j < numCols; j++){
                let pos = random.pop()          // Elegir una posicion (ultimo numero de la lista generada por la funcion shuffle)
                casillas.push({
                    mostrada: false,
                    verificada: false,
                    emoji: EmojiList[pos] // Elegir
                })
            }
            rows.push(casillas)
        }
        return rows
}

// Funcion Sleep para generar ms de retraso
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const casillaOnClick = (row, col) => {
    const casilla = getValue(board, row, col)
    casilla.mostrada = true
    renderizarBoard()

    if (casilla.verificada == false){
        casillasAbiertas.push({
            fila: row,
            columna: col
        })
    }
    // Agregar la posicion de la casilla abierta
    evaluarCasillas()               // Evaluar las casillas

    evaluarJuego(6, 4)              // Verificar si se acabaron abriendo todas las casillas
}

const evaluarCasillas = () => {
    if (casillasAbiertas.length >= 2){
        const casilla1 = casillasAbiertas[0]
        const casilla2 = casillasAbiertas[1]
        // Condición: Si los emojis de las casillas abiertas son iguales, y no son la misma casilla:
        if (board[casilla1.fila][casilla1.columna].emoji == board[casilla2.fila][casilla2.columna].emoji){
            if (casilla1.fila != casilla2.fila || casilla1.columna != casilla2.columna){
                console.log("Bien!")
                // Se verifican las casillas (no se vuelven a considerar como abiertas)
                board[casilla1.fila][casilla1.columna].verificada = true
                board[casilla2.fila][casilla2.columna].verificada = true
            }
        } else{
            renderizarBoard()                  // En caso de no ser iguales, se muestra por 1 segundo el resultado y luego se dejan de mostrar.
            board[casilla1.fila][casilla1.columna].mostrada = false
            board[casilla2.fila][casilla2.columna].mostrada = false

            sleep(1000).then(() => {renderizarBoard();}); // Esperar 1 segundo y volver a renderizar el board
        }
        casillasAbiertas.pop()
        casillasAbiertas.pop() // Vaciar las casillas abiertas
    }
}

const evaluarJuego = (row, col) => {
    let finish = true
    for (let i = 0; i < row; i++){
        for (let j = 0; j < col; j++){
            let casilla = board[i][j]
            //console.log(casilla.mostrada)
            if (casilla.verificada == false){
                finish = false
            }
        }
    }

    if (finish){
        // Referenciar un elemento dentro del HTML
        const h1 = document.getElementById("titulo")
        h1.innerText = "Memoria Game | Ganaste! Realizado por Johan Oblitas"
    }
}


// Modularizar codigo (Refactoring): Dividir una función en más funciones (organización visual)
const renderizarBoard = () => {
    for (let i = 0; i < board.length; i++){
        const casillas = board[i]
        for (let j = 0; j < casillas.length; j++){
            const butCasilla = document.getElementById(`${i}_${j}`) // String Interpolation
            if (casillas[j].mostrada){
                butCasilla.innerHTML = casillas[j].emoji
            } else {
                butCasilla.innerHTML = ""
            }
            
            // innerHTML: Cambiar la estructura interna
            // innerText: Cambiar el texto
        }
    }
}

// Arrow Function
const getValue = (board, row, col) => {
    return board[row][col]
}

// Main Function
const main = () => {
    board = createBoard(6, 4)
    renderizarBoard()
}

main()