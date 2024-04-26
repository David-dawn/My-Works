const playBtn = document.getElementById('play-btn');
const animatedText = document.querySelector('.animated-text');
const confetti = document.querySelector('.confetti');

playBtn.addEventListener('click', () => {
    animatedText.classList.toggle('active');
    confetti.classList.toggle('active');
});

// JavaScript animation
function animateConfetti() {
    const confettiElements = document.querySelectorAll('.confetti span');
    confettiElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

animateConfetti();