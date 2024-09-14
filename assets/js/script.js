let score = 0; // This is to keep track of the score
let killCount = 0; // This keeps track of the number of criminals killed
let gameInterval; // This is to store the interval for the game loop
const windows = document.querySelectorAll('.window'); // Selects all window elements
const scoreDisplay = document.getElementById('score'); // Selects the score display element
const killCountDisplay = document.getElementById('killCount'); // Selects the kill count display element

// Function to start my game project
function startGame() {
    gameInterval = setInterval(() => {
        windows.forEach(window => {
            window.classList.remove('show'); // Remove the show class from all windows
            const images = window.querySelectorAll('img'); // Select all images in the window
            images.forEach(img => img.style.display = 'none'); // Hide all images
        });

        // Randomly select one window to show a criminal
        const criminalWindow = windows[Math.floor(Math.random() * windows.length)];
        const criminalImage = criminalWindow.querySelector('.criminal');
        criminalImage.style.display = 'block';
        criminalWindow.classList.add('show');

        // Show innocents in the other windows
        windows.forEach(window => {
            if (window !== criminalWindow) {
                const innocentImages = window.querySelectorAll('.innocent');
                const innocentImage = innocentImages[Math.floor(Math.random() * innocentImages.length)];
                innocentImage.style.display = 'block';
                window.classList.add('show');
            }
        });

        // Check if the player fails to identify the criminal in time
        setTimeout(() => {
            if (document.querySelectorAll('.criminal[style*="block"]').length > 0) {
                alert('You lose!');
                clearInterval(gameInterval);
            }
        }, 2500); // Player has 2.5 seconds to identify the criminal
    }, 2500); // New images appear every 2.5 seconds
}

// Event listener for clicking on windows
windows.forEach(window => {
    window.addEventListener('click', () => {
        const criminalImage = window.querySelector('.criminal[style*="block"]');
        if (criminalImage) {
            // If a criminal is clicked
            score += 10;
            killCount += 1;
            windows.forEach(win => {
                win.classList.remove('show');
                const imgs = win.querySelectorAll('img');
                imgs.forEach(img => img.style.display = 'none');
            });
        } else {
            // If an innocent is clicked
            score -= 10;
        }
        scoreDisplay.textContent = Score: ${score};
        killCountDisplay.textContent = Criminals Killed: ${killCount};
        if (score >= 200) {
            alert('You win!');
            clearInterval(gameInterval);
        }
    });
});

// Start the game
startGame();