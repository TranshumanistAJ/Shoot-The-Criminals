let score = 0;
let gameInterval;
const windows = document.querySelectorAll('.window');
const scoreDisplay = document.getElementById('score');
const machineGunButton = document.getElementById('machineGun');
const images = {
    criminals: ['assets/images/criminal1.webp', 'assets/images/criminal2.png'],
    innocents: ['assets/images/innocent1.webp', 'assets/images/innocent2.webp']
};

function startGame() {
    gameInterval = setInterval(() => {
        windows.forEach(window => {
            window.classList.remove('criminal', 'innocent', 'show');
            window.innerHTML = '';
            const random = Math.random();
            if (random < 0.3) {
                const criminalImage = images.criminals[Math.floor(Math.random() * images.criminals.length)];
                window.classList.add('criminal', 'show');
                window.innerHTML = `<img src="${criminalImage}" alt="Criminal">`;
            } else if (random < 0.5) {
                const innocentImage = images.innocents[Math.floor(Math.random() * images.innocents.length)];
                window.classList.add('innocent', 'show');
                window.innerHTML = `<img src="${innocentImage}" alt="Innocent">`;
                setTimeout(() => {
                    window.classList.remove('show');
                }, 2000);
            }
        });
    }, 1000);
}

windows.forEach(window => {
    window.addEventListener('click', () => {
        if (window.classList.contains('criminal')) {
            score += 10;
            window.classList.remove('show');
        } else if (window.classList.contains('innocent')) {
            score -= 10;
        }
        scoreDisplay.textContent = `Score: ${score}`;
        if (score >= 200) {
            alert('You win!');
            clearInterval(gameInterval);
        }
    });
});

machineGunButton.addEventListener('click', () => {
    let allCriminals = true;
    windows.forEach(window => {
        if (!window.classList.contains('criminal')) {
            allCriminals = false;
        }
    });
    if (allCriminals) {
        windows.forEach(window => {
            score += 20;
            window.classList.remove('show');
        });
    } else {
        alert('You lose!');
        clearInterval(gameInterval);
    }
    scoreDisplay.textContent = `Score: ${score}`;
});

startGame();
