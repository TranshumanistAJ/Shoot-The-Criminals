let score = 0; // To keep track of the score
let killCount = 0; // Keeping the track of the number of criminals killed
let gameInterval; // Storing the interval for the game loop
const windows = document.querySelectorAll('.window'); // To select all window elements
const scoreDisplay = document.getElementById('score'); // To select the score display element
const killCountDisplay = document.getElementById('killCount'); // To select the kill count display element
const machineGunButton = document.getElementById('machineGun'); // To select the machine gun button

// This part of my java file is the function to start the game
function startGame() {
    gameInterval = setInterval(() => {
        windows.forEach(window => {
            window.classList.remove('show'); // Here is to remove the show class from all windows
            const images = window.querySelectorAll('img'); // Select all images in the window
            images.forEach(img => img.style.display = 'none'); // Hide all images
            const random = Math.random();
            if (random < 0.5) {
                // Show a criminal image, that is when the player is supposed to shoot.
                const criminalImage = images[Math.floor(Math.random() * 2)];
                criminalImage.style.display = 'block';
                window.classList.add('show');
            } else {
                // Show an innocent image , that is when the player is not suppoed to shoot
                const innocentImage = images[Math.floor(Math.random() * 2) + 2];
                innocentImage.style.display = 'block';
                window.classList.add('show');
                setTimeout(() => {
                    window.classList.remove('show');
                }, 3500); // Innocent images stay for 3.5 seconds to give the player more time
            }
        });
    }, 3500); // I make new images appear every 3.5 seconds
}

// Event listener for clicking on windows
windows.forEach(window => {
    window.addEventListener('click', () => {
        const criminalImage = window.querySelector('.criminal[style*="block"]');
        const innocentImage = window.querySelector('.innocent[style*="block"]');
        if (criminalImage) {
            // If a criminal is clicked, which means game continues too
            score += 10;
            killCount += 1;
            window.classList.remove('show');
            criminalImage.style.display = 'none';
        } else if (innocentImage) {
            // If an innocent is clicked,this interacts
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

// Event listener for the machine gun button
machineGunButton.addEventListener('click', () => {
    let allCriminals = true;
    windows.forEach(window => {
        if (!window.querySelector('.criminal[style*="block"]')) {
            allCriminals = false;
        }
    });
    if (allCriminals) {
        // If all windows show criminals  , this part is helped and inspired by AI (online free AI)
        windows.forEach(window => {
            score += 20;
            killCount += 1;
            window.classList.remove('show');
            const criminalImage = window.querySelector('.criminal[style*="block"]');
            if (criminalImage) {
                criminalImage.style.display = 'none';
            }
        });
    } else {
        // If not all windows show criminals
        alert('You lose!');
        clearInterval(gameInterval);
    }
    scoreDisplay.textContent = Score: ${score};
    killCountDisplay.textContent = Criminals Killed: ${killCount};
});

// Start the game
startGame();