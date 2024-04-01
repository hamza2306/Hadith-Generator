// JavaScript
const hadithElement = document.getElementById('hadis');
const newHadithButton = document.getElementById('newb');
const narratorElement = document.getElementById('narrator');
const soundIcon = document.querySelector('.sound');
const soundOffIcon = document.querySelector('.stop');

let speech = null;

async function fetchRandomHadith() {
  try {
    newHadithButton.innerText = 'Loading Hadith...';
    const response = await fetch('https://random-hadith-generator.vercel.app/bukhari/');
    const data = await response.json();
    hadithElement.style.opacity = '0'; // Initially hide the "hadis" section
    hadithElement.innerText = data.data.hadith_english;
    narratorElement.innerText = data.data.header;

    // Trigger reflow to ensure transition effect
    hadithElement.offsetHeight;
    
    // Add the 'show' class to reveal the "hadis" section with animation
    hadithElement.style.opacity = '1';
    newHadithButton.innerText = 'New Hadith';
  } catch (error) {
    console.error('Error fetching Hadith:', error);
    newHadithButton.innerText = 'Failed to load Hadith';
  }
}

soundIcon.addEventListener('click', () => {
  if (speech === null) {
    speech = new SpeechSynthesisUtterance(hadithElement.innerText);
    speech.onend = () => {
      speech = null;
    };
    speechSynthesis.speak(speech);
  }
});

soundOffIcon.addEventListener('click', () => {
  if (speech !== null) {
    speechSynthesis.cancel();
  }
});

newHadithButton.addEventListener('click', fetchRandomHadith);
