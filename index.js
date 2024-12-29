document.addEventListener('DOMContentLoaded', () => {
    let playerScore = 0;
    let computerScore = 0;
    let isPlaying = false;

    const playerScoreElement = document.getElementById('playerScore');
    const computerScoreElement = document.getElementById('computerScore');
    const playerCard = document.getElementById('playerCard');
    const computerCard = document.getElementById('computerCard');
    const playerChoiceImg = document.getElementById('playerChoiceImg');
    const computerChoiceImg = document.getElementById('computerChoiceImg');
    const resultTextElement = document.getElementById('resultText');
    const choiceButtons = document.querySelectorAll('.choice-btn');

    const choices = ['rock', 'paper', 'scissors'];

    function getComputerChoice() {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function updateScore(isPlayerWin) {
        if (isPlayerWin) {
            playerScore++;
            playerScoreElement.textContent = playerScore.toString();
        } else {
            computerScore++;
            computerScoreElement.textContent = computerScore.toString();
        }
    }

    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return "It's a tie";
        }
        
        const playerWins = (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        );

        if (playerWins) {
            updateScore(true);
            return 'You win!';
        } else {
            updateScore(false);
            return 'You lose!';
        }
    }

    function resetGame() {
        playerCard.classList.remove('flipped');
        computerCard.classList.remove('flipped');
        resultTextElement.textContent = '';
        isPlaying = false;
    }

    function handleChoice(event) {
        if (isPlaying) return;
        isPlaying = true;

        const button = event.currentTarget;
        const playerChoice = button.dataset.choice;
        const computerChoice = getComputerChoice();

        // Update choice images
        playerChoiceImg.src = `assests/${playerChoice}.png`;
        computerChoiceImg.src = `assests/${computerChoice}.png`;

        // Flip cards
        playerCard.classList.add('flipped');
        setTimeout(() => {
            computerCard.classList.add('flipped');
            const result = determineWinner(playerChoice, computerChoice);
            resultTextElement.textContent = result;

            // Reset after 2 seconds
            setTimeout(resetGame, 2000);
        }, 500);
    }

    // Add click event listeners to choice buttons
    choiceButtons.forEach(button => {
        button.addEventListener('click', handleChoice);
    });
});