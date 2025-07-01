// Game variables
let randomNumber = Math.floor(Math.random() * 100) + 1; // Number between 1 and 100
let attempts = 0;
let gameOver = false;

// Get HTML elements
const guessInput = document.getElementById('guessInput');
const checkButton = document.getElementById('checkButton');
const resetButton = document.getElementById('resetButton');
const messageDisplay = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');

// --- Event Listeners ---
checkButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame);
guessInput.addEventListener('keypress', function(event) {
    // Check if the pressed key is 'Enter' (key code 13)
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// --- Game Functions ---

function checkGuess() {
    if (gameOver) {
        messageDisplay.textContent = "The game is over! Click 'Play Again' to restart.";
        return;
    }

    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        messageDisplay.textContent = "Please enter a valid number between 1 and 100.";
        return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;

    if (userGuess === randomNumber) {
        messageDisplay.textContent = `Congratulations! You guessed the number  ${randomNumber} in ${attempts} attempts!`;
        messageDisplay.style.color = 'green';
        gameOver = true;
        guessInput.disabled = true; // Disable input after winning
        checkButton.disabled = true; // Disable button after winning
    } else if (userGuess < randomNumber) {
        messageDisplay.textContent = "Too low! Try a higher number.";
        messageDisplay.style.color = 'yellow';
    } else {
        messageDisplay.textContent = "Too high! Try a lower number.";
        messageDisplay.style.color = 'red';
    }

    guessInput.value = ''; // Clear the input field
    guessInput.focus();    // Put focus back on the input
}

function resetGame() {""
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameOver = false;

    messageDisplay.textContent = "";
    messageDisplay.style.color = '#555'; // Reset color
    attemptsDisplay.textContent = attempts;

    guessInput.value = '';
    guessInput.disabled = false; // Enable input
    checkButton.disabled = false; // Enable button
    guessInput.focus();
}

// Initial setup on load
resetGame(); // Call once to set up the game when the page loads