let height = 6; //numero de adivinhações
let width = 5;//tamanho das palavras

let row = 0; // numero da tentativa
let col = 0; // atual letra da tentativa

let gameOver = false;
let palavra = 'GRADE';

window.onload = function() {
    iniciar();
}

function iniciar() {

    //criar a tabela
    for (let r = 0; r < height; r++) {
        for(let c = 0; c < width; c++) {
            let tile = document.createElement('span');
            tile.id = r.toString() + '-' + c.toString(); // id exemplo = linha-coluna / 0-0 ou 3-5
            tile.classList.add('tile');
            tile.innerText = '';
            document.getElementById('board').appendChild(tile);
        }
    }

    // ver se o usuario apertou algum botao
    document.addEventListener('keyup', (e) => {
        if (gameOver) return;
        if ('KeyA' <= e.code && e.code <= 'KeyZ') {
            if (col < width) {
                let currentTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currentTile.innerText == '') {
                    currentTile.innerText = e.code[3];
                    col += 1;
                }
            }
        }
        else if (e.code == 'Backspace') {
            if (0 < col && col <= width) {
                col -= 1;

            }
            let currentTile = document.getElementById(row.toString() + '-' + col.toString());
            currentTile.innerText = '';
        } else if (e.code == 'Enter') {
            update();
            row += 1;
            col = 0;
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById('resposta').innerText = 'A palavra era: ' + palavra;
        }
    })
}

function update() {
    let correto = 0;
    for (let c = 0; c < width; c++) {
        let currentTile = document.getElementById(row.toString() + '-' + c.toString());
        let letra = currentTile.innerText;

        //Está na posição correta?
        if (palavra[c] == letra) {
            currentTile.classList.add('correto');
            correto += 1;
        }// Está na palavra?
        else if (palavra.includes(letra)) {
            currentTile.classList.add('presente');
        } else {
            currentTile.classList.add('inexistente');
        }

        if (correto == width) {
            gameOver = true;
        }
    }
}