const windows = document.querySelectorAll('.window');
const scoreDisplay = document.getElementById('score');
const killCountDisplay = document.getElementById('killCount');

let score = 0;
let killCount = 0;
let gameInterval;

const criminals = ['assets/images/criminal1.jpeg', 'assets/images/criminal2.jpeg'];
const innocents = ['assets/images/innocent1.jpeg', 'assets/images/innocent2.jpeg'];

function createImage(src, className) {
    const img = document.createElement('img');
    img.src = src;
    img.className = className;
    return img;
}

function clearWindows() {
    windows.forEach(window => {
        window.innerHTML = '';
    });
}

function showImage(window, imageSrc, isActive) {
    const img = createImage(imageSrc, isActive ? 'active' : '');
    window.appendChild(img);
    if (isActive) {
        setTimeout(() => img.classList.add('active'), 50);
    }
}

function startRound() {
    clearWindows();
    
    const criminalWindow = windows[Math.floor(Math.random() * windows.length)];
    const criminalImage = criminals[Math.floor(Math.random() * criminals.length)];
    
    showImage(criminalWindow, criminalImage, true);
    criminalWindow.dataset.isCriminal = 'true';

    windows.forEach(window => {
        if (window !== criminalWindow) {
            const innocentImage = innocents[Math.floor(Math.random() * innocents.length)];
            showImage(window, innocentImage, true);
            window.dataset.isCriminal = 'false';
        }
    });

    // Set a timeout for missing the criminal
    gameInterval = setTimeout(() => {
        endGame('Game Over! You didn\'t shoot the criminal in time.');
    }, 2500);
}

function endGame(message) {
    clearTimeout(gameInterval);
    alert(message);
    windows.forEach(window => window.removeEventListener('click', handleClick));
}

function handleClick(event) {
    clearTimeout(gameInterval);  // Clear timeout when a window is clicked
    
    const clickedWindow = event.currentTarget;
    const isCriminal = clickedWindow.dataset.isCriminal === 'true';

    if (isCriminal) {
        score += 10;
        killCount++;
        scoreDisplay.textContent = `Score: ${score}`;
        killCountDisplay.textContent = `Criminals Killed: ${killCount}`;

        if (killCount >= 20) {
            endGame('You win! You\'ve killed 20 criminals!');
        } else {
            startRound();  // Start a new round after killing a criminal
        }
    } else {
        endGame('Game Over! You shot an innocent person.');
    }
}

function startGame() {
    score = 0;
    killCount = 0;
    scoreDisplay.textContent = 'Score: 0';
    killCountDisplay.textContent = 'Criminals Killed: 0';

    windows.forEach(window => window.addEventListener('click', handleClick));

    startRound();  // Start the first round immediately
}

startGame();