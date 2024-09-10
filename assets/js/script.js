let score = 0;
let gameInterval;
const windows = document.querySelectorAll('.window');
const scoreDisplay = document.getElementById('score');
const machineGunButton = document.getElementById('machineGun');

function startGame() {
    gameInterval = setInterval(() => {
        windows.forEach(window => {
            window.classList.remove('show');
            const images = window.querySelectorAll('img');
            images.forEach(img => img.style.display = 'none');
            const random = Math.random();
            if (random < 0.3) {
                const criminalImage = images[Math.floor(Math.random() * 2)];
                criminalImage.style.display = 'block';
                window.classList.add('show');
            } else if (random < 0.5) {
                const innocentImage = images[Math.floor(Math.random() * 2) + 2];
                innocentImage.style.display = 'block';
                window.classList.add('show');
                setTimeout(() => {
                    window.classList.remove('show');
                }, 2000);
            }
        });
    }, 2000); // Adjusted interval to 2 seconds
}

windows.forEach(window => {
    window.addEventListener('click', () => {
        const criminalImage = window.querySelector('.criminal[style*="block"]');
        const innocentImage = window.querySelector('.innocent[style*="block"]');
        if (criminalImage) {
            score += 10;
            window.classList.remove('show');
            criminalImage.style.display = 'none';
        } else if (innocentImage) {
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
        if (!window.querySelector('.criminal[style*="block"]')) {
            allCriminals = false;
        }
    });
    if (allCriminals) {
        windows.forEach(window => {
            score += 20;
            window.classList.remove('show');
            const criminalImage = window.querySelector('.criminal[style*="block"]');
            if (criminalImage) {
                criminalImage.style.display = 'none';
            }
        });
    } else {
        alert('You lose!');
        clearInterval(gameInterval);
    }
    scoreDisplay.textContent = `Score: ${score}`;
});

startGame();
