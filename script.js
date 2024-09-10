let score = 0;
let gameInterval;
const windows = document.querySelectorAll('.window');
const scoreDisplay = document.getElementById('score');
const doubleKillButton = document.getElementById('doubleKill');

function startGame() {
    gameInterval = setInterval(() => {
        windows.forEach(window => {
            window.classList.remove('criminal', 'victim');
            const random = Math.random();
            if (random < 0.3) {
                window.classList.add('criminal');
            } else if (random < 0.5) {
                window.classList.add('victim');
            }
        });
    }, 1000);
}

windows.forEach(window => {
    window.addEventListener('click', () => {
        if (window.classList.contains('criminal')) {
            score += 10;
        } else if (window.classList.contains('victim')) {
            score -= 10;
        }
        scoreDisplay.textContent = `Score: ${score}`;
    });
});

doubleKillButton.addEventListener('click', () => {
    windows.forEach(window => {
        if (window.classList.contains('criminal')) {
            score += 20;
        }
    });
    scoreDisplay.textContent = `Score: ${score}`;
});

startGame();
