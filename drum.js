let isMuted = false;
let currentVolume = 0.7;

const drumButtons = document.querySelectorAll('.btn');
const muteBtn = document.getElementById('mute-btn');
const volumeSlider = document.getElementById('volume-slider');
const volumeDisplay = document.getElementById('volume-display');

const soundMap = {
  w: 'sounds/haha.mp3',
  a: 'sounds/tom-4.mp3',
  s: 'sounds/kick-bass.mp3',
  d: 'sounds/snare.mp3',
  j: 'sounds/tom-1.mp3',
  k: 'sounds/tom-2.mp3',
  l: 'sounds/tom-3.mp3'
};

function playSound(key) {
  if (isMuted) return;

  const soundPath = soundMap[key.toLowerCase()];
  if (!soundPath) return;

  const audio = new Audio(soundPath);
  audio.volume = currentVolume;
  audio.play().catch(() => {});

  triggerAnimation(key.toLowerCase());
}

function triggerAnimation(key) {
  const button = document.getElementById(key);
  if (!button) return;

  button.classList.add('pressed');
  setTimeout(() => {
    button.classList.remove('pressed');
  }, 150);
}

drumButtons.forEach(button => {
  button.addEventListener('click', function() {
    const key = this.getAttribute('data-key');
    playSound(key);
  });
});

document.addEventListener('keypress', (event) => {
  const key = event.key.toLowerCase();
  if (soundMap[key]) {
    playSound(key);
  }
});

muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  muteBtn.classList.toggle('muted');
  muteBtn.querySelector('.volume-icon').textContent = isMuted ? '🔇' : '🔊';
});

volumeSlider.addEventListener('input', (event) => {
  currentVolume = event.target.value / 100;
  volumeDisplay.textContent = event.target.value + '%';
});
