document.addEventListener('DOMContentLoaded', () => {
    const windows = document.querySelectorAll('.window');  // Selects all window divs
    const scoreDisplay = document.getElementById('score'); // Displays the score
    const killCountDisplay = document.getElementById('killCount'); // Displays kill count
    const instructionsModal = document.getElementById('instructionsModal'); // Instructions modal
    const startGameButton = document.getElementById('startGameButton'); // Start game button
    const outcomeModal = document.getElementById('outcomeModal'); // Outcome modal for end game
    const outcomeMessage = document.getElementById('outcomeMessage'); // Message for outcome modal
    const restartGameButton = document.getElementById('restartGameButton'); // Restart game button

    let score = 0;  // Keeps track of the score
    let killCount = 0;  // Keeps track of how many criminals were killed
    let gameInterval;  // Variable for the game timer

    // Paths for criminal and innocent images
    const criminals = ['assets/images/criminal1.jpeg', 'assets/images/criminal2.jpeg'];
    const innocents = ['assets/images/innocent1.jpeg', 'assets/images/innocent2.jpeg'];

    // Function to create an image element
    function createImage(src, className) {
        const img = document.createElement('img');
        img.src = src;
        img.className = className;
        return img;
    }

    // Function to clear images from all windows
    function clearWindows() {
        windows.forEach(window => {
            window.innerHTML = ''; // Clears the window
        });
    }

    // Function to show an image in a window
    function showImage(window, imageSrc, isActive) {
        const img = createImage(imageSrc, isActive ? 'active' : ''); // Create image element
        window.appendChild(img); // Append the image to the window
        if (isActive) {
            setTimeout(() => img.classList.add('active'), 50); // Slight delay to add active class
        }
    }

    // Function to start a new round
    function startRound() {
        clearWindows(); // Clear all windows before showing new images
        
        const criminalWindow = windows[Math.floor(Math.random() * windows.length)]; // Randomly select a window for criminal
        const criminalImage = criminals[Math.floor(Math.random() * criminals.length)]; // Randomly select a criminal image
        
        showImage(criminalWindow, criminalImage, true); // Show criminal image in the window
        criminalWindow.dataset.isCriminal = 'true'; // Mark the window as containing the criminal

        // For the rest of the windows, show innocent images
        windows.forEach(window => {
            if (window !== criminalWindow) {
                const innocentImage = innocents[Math.floor(Math.random() * innocents.length)]; // Randomly select innocent image
                showImage(window, innocentImage, true); // Show innocent image
                window.dataset.isCriminal = 'false'; // Mark the window as not containing the criminal
            }
        });

        // Set a timer to end the game if the player doesn't shoot the criminal in time (2.5 seconds)
        gameInterval = setTimeout(() => {
            endGame('Game Over! You didn\'t shoot the criminal in time.');
        }, 2500);
    }

    // Function to end the game
    function endGame(message) {
        clearTimeout(gameInterval); // Clear the interval to stop the game
        outcomeMessage.textContent = message; // Set the outcome message
        outcomeModal.style.display = 'flex'; // Display the outcome modal
        windows.forEach(window => window.removeEventListener('click', handleClick)); // Remove event listeners
    }

    // Function to handle window clicks
    function handleClick(event) {
        clearTimeout(gameInterval);  // Clear the timer as the player has clicked
        
        const clickedWindow = event.currentTarget; // Get the window that was clicked
        const isCriminal = clickedWindow.dataset.isCriminal === 'true'; // Check if it was a criminal window

        if (isCriminal) {
            score += 10;  // Increase the score by 10
            killCount++;  // Increment the kill count
            scoreDisplay.textContent = `Score: ${score}`; // Update score display
            killCountDisplay.textContent = `Criminals Killed: ${killCount}`; // Update kill count display

            // Check if the player has killed 20 criminals (winning condition)
            if (killCount >= 20) {
                endGame('Congratulations, you have won!');
            } else {
                startRound();  // Start a new round if the game continues
            }
        } else {
            endGame('Game Over! You shot an innocent person.'); // End the game if they clicked an innocent
        }
    }

    // Function to start the game (initial setup)
    function startGame() {
        score = 0;  // Reset score
        killCount = 0;  // Reset kill count
        scoreDisplay.textContent = 'Score: 0'; // Reset score display
        killCountDisplay.textContent = 'Criminals Killed: 0'; // Reset kill count display

        windows.forEach(window => window.addEventListener('click', handleClick)); // Add click event listeners to each window

        startRound();  // Start the first round
    }

    // Start game button click event
    startGameButton.addEventListener('click', () => {
        instructionsModal.style.display = 'none'; // Hide the instructions modal
        startGame();  // Start the game
    });

    // Restart game button click event
    restartGameButton.addEventListener('click', () => {
        outcomeModal.style.display = 'none'; // Hide the outcome modal
        startGame();  // Restart the game
    });

    // Show instructions modal when the game first loads
    instructionsModal.style.display = 'flex'; // Display the instructions modal
});
