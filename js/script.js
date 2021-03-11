var turns = 0; // keeps track of the number of turns
var player_turn = 1; // shows who's turn it is atm (player 1 makes the first turn)

const player1 = {
    color: "red",
    value: 1,
    symbol: 'X'
};

const player2 = {
   color: "aqua",
   value: 2,
   symbol: 'O'
};


const buttons = document.querySelectorAll(".button");
const par = document.querySelector("p");
const undo_button = document.querySelector("#undo-button");
var clicked_buttons = [];
var button_state = [];

/*button state values:
0 - not clikecd yet; 
1 - clicked by the 1st player;
2 - clicked by the 2nd player
*/

//filling the array with zeros
for (let i = 0; i < buttons.length; i++){
    button_state.push(0);
}


const check_win = () => {

    if (
        // horizontal lines
        (button_state[0] === button_state[1] && button_state[1] === button_state[2] && button_state[2] != 0) ||
        (button_state[3] === button_state[4] && button_state[4] === button_state[5] && button_state[5] != 0) ||
        (button_state[6] === button_state[7] && button_state[7] === button_state[8] && button_state[8] != 0) ||

        //vertical lines
        (button_state[0] === button_state[3] && button_state[3] === button_state[6] && button_state[6] != 0) ||
        (button_state[1] === button_state[4] && button_state[4] === button_state[7] && button_state[7] != 0) ||
        (button_state[2] === button_state[5] && button_state[5] === button_state[8] && button_state[8] != 0) ||

        //diagonal lines
        (button_state[0] === button_state[4] && button_state[4] === button_state[8] && button_state[8] != 0) ||
        (button_state[2] === button_state[4] && button_state[4] === button_state[6] && button_state[6] != 0)
        ){

        return true;
    }

    return false;
    
};


const check_draw = () => {
    if (!check_win() && turns === 8){
        return true;
    }
    return false;
};


const clicked = (clicked_id) => {

    if (player_turn === 1){
        buttons[clicked_id].style.backgroundColor = player1.color;
        buttons[clicked_id].innerText = player1.symbol;
        buttons[clicked_id].disabled = true;
        button_state[clicked_id] = player1.value;
    }
    else{
        buttons[clicked_id].style.backgroundColor = player2.color;
        buttons[clicked_id].innerText = player2.symbol;
        button_state[clicked_id] = player2.value;
    }
    
    buttons[clicked_id].disabled = true;
    clicked_buttons.push(clicked_id);

    if (check_win() || check_draw()){

        for (let i = 0; i < buttons.length; i++){
            buttons[i].disabled = true;
        }
        
        undo_button.disabled = true;

        if (check_win()){
            par.style.fontSize = 60;
            par.innerText = `Player ${player_turn} won`;
        }
        else if (turns == 8){
            par.innerText = "Draw";
        }

        par.setAttribute("class", "final-res");
    }
    else{
        turns++;
        player_turn = turns % 2 + 1;
        par.innerText = `Player ${player_turn} turn`;
    }
};


//resetting everything so players can restart a game
const reset = () => {
    for(let i = 0; i < buttons.length; i++){
        buttons[i].disabled = false;
        
        buttons[i].style.backgroundColor = '';
        buttons[i].innerText = '';
        
        par.setAttribute("class", '');
        clicked_buttons = []
        
        button_state[i] = 0;
        turns = 0;
        player_turn = 1;
        
        par.innerText = `Player ${player_turn} turn`;
    }
    
    undo_button.disabled = false;
};

const not_zeros = arr => arr.some(i => i != 0);

const undo = () => {
    if(not_zeros(clicked_buttons)){
        player_turn = player_turn === 1 ? 2 : 1;
        turns--; 
        
        buttons[clicked_buttons[clicked_buttons.length - 1]].disabled = false;
        button_state[clicked_buttons[clicked_buttons.length - 1]] = 0
        
        buttons[clicked_buttons[clicked_buttons.length - 1]].style.backgroundColor = '';
        buttons[clicked_buttons[clicked_buttons.length - 1]].innerText = '';
        
        par.innerText = `Player ${player_turn} turn`;
        clicked_buttons = clicked_buttons.splice(0, clicked_buttons.length - 1); //removing the last element
    }       
};
