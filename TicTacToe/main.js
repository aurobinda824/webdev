const board = document.getElementById('board');
const turn = document.getElementById('turn');
let move = document.createElement('div');
let show_count = document.createElement('div');
let reset = document.getElementById('reset');
move.innerText = 'TURN: ';
let player1 = true;
let play_count = 1;
let player1_win_count = 0;
let player2_win_count = 0;
move.innerText += 'Player X';
turn.appendChild(move);

function updateCount()
{
    show_count.innerText = `Player X:\t${player1_win_count}\tPlayer O:\t${player2_win_count}\tTotal Game Played:${play_count}`;
    turn.appendChild(show_count)
}

function equal(a, b, c)
{
    if(game[a] == game[b] && game[a] == game[c])
    {
        return true;
    }
    return false;
}

function winner(w)
{
    if (w == 'X')
    {
        move.innerText = 'X wins';
    }
    if (w == 'O')
    {
        move.innerText = 'O wins';
    }
}

function state(game)
{
    if (equal(0, 1, 2) || equal(0, 3, 6))
    {
        if (game[0] != '-')
        {
            return game[0];
        }
    }
    if(equal(3, 4, 5) || equal(1, 4, 7) || equal(0, 4, 8) || equal(2, 4, 6))
    {
        if (game[4] != '-')
        {
            return game[4];
        }
    }
    if (equal(6, 7, 8) || equal(2, 5, 8))
    {
        if (game[8] != '-')
        {
            return game[8];
        }
    }
    return false;
}

function clickHandler(element)
{
    if (stat)
    {
        return 0;
    }
    move.innerText = 'TURN: ';
    if (player1)
    {
        if (element.innerText == '')
        {
            move.innerText += 'Player O';
            element.innerText = 'X';
            player1 = false;
            game[parseInt(Array.from(element.classList)[1])] = 'X';
            if(state(game) != false)
            {
                stat = true;
                winner('X');
                player1_win_count += 1;
                updateCount();
                setTimeout(resetGame, 1000);
            }
        }
    }
    else
    {
        if (element.innerText == '')
        {
            move.innerText += 'Player X';
            player1 = true;
            element.innerText = 'O';
            game[parseInt(Array.from(element.classList)[1])] = 'O';
            if (state(game) != false)
            {
                stat = true;
                winner('O');
                player2_win_count += 1;
                updateCount();
                setTimeout(resetGame, 1000);
            }
        }
    }    
    if (!game.includes('-') && !stat)
    {
        move.innerText = 'Match Draw';
        play_count += 1;
        setTimeout(resetGame, 1000);
        return 0;
    }
};

function resetGame()
{
    play_count += 1;
    const cells = document.getElementsByClassName('grid-item');
    for (let i = 0; i < game.length; i++)
    {
        game[i] = '-';
        cells[i].innerText = '';
    }
    move.innerText = 'TURN: Player X';
    stat = false;
    player1 = true;
}

let rows = 3;
let cols = 3;
let game = [];
board.style.setProperty('--grid-rows', rows);
board.style.setProperty('--grid-cols', cols);
let stat = false;
for (c = 0; c < (rows * cols); c++) 
{
    game.push('-');
    let cell = document.createElement("div");
    board.appendChild(cell).className = "grid-item " + `${c}`;
    cell.addEventListener('click', function(){clickHandler(cell)});
};
reset.addEventListener('click',function(){setTimeout(resetGame, 1000);});
updateCount()