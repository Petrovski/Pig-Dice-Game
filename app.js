/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


let scores, roundScore, activePlayer, currentlyPlaying;

function startNewGame() {
    currentlyPlaying = true;
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

startNewGame();


document.querySelector('.btn-roll').addEventListener('click', () => {
    if (currentlyPlaying) {
        // 1. Generate a random number from 1-6
        let dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result of the dice
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Update the round score only if the rolled number IS not a 1
        if (dice !== 1) {
            // Add to the score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).innerHTML = '<strong>' + roundScore + '</strong>'
        } else {
            nextPlayer();
        }
    }
    
});


document.querySelector('.btn-hold').addEventListener('click', () => {
    if (currentlyPlaying) {
        // Add the current score to the current players main score
        scores[activePlayer] += roundScore;
        // scores[activePlayer] = scores[activePlayer] + roundScore ^^^ this is the same as above

        // Update the UI to reflect proper scores
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if the current player won the game or not
        if (scores[activePlayer] >= 10) {
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('.active');
            currentlyPlaying = false;
        } else {
            nextPlayer();
        }
    }

});


function nextPlayer() {
    // Switch to the other player to roll
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + roundScore + '</em>';
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';

        // document.querySelector('.player-0-panel').classList.remove('active');
        // document.querySelector('.player-1-panel').classList.add('active');
}


document.querySelector('.btn-new').addEventListener('click', startNewGame);