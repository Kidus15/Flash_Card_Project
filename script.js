// Flash card data with general knowledge questions
const flashCards = [
    {
        question: "What is the largest planet in our solar system?",
        answer: "Jupiter",
        explanation: "Jupiter is the largest planet in our solar system, with a mass more than twice that of Saturn and over 300 times that of Earth."
    },
    {
        question: "Who painted the Mona Lisa?",
        answer: "Leonardo da Vinci",
        explanation: "The Mona Lisa was painted by Italian Renaissance artist Leonardo da Vinci between 1503 and 1519."
    },
    {
        question: "What is the chemical symbol for gold?",
        answer: "Au",
        explanation: "Au comes from the Latin word 'aurum' which means gold. It's a precious metal that has been used for coinage, jewelry, and other arts throughout history."
    },
    {
        question: "What year did World War II end?",
        answer: "1945",
        explanation: "World War II ended in 1945 with the surrender of Germany in May and Japan in September after the atomic bombings of Hiroshima and Nagasaki."
    },
    {
        question: "What is the capital of Japan?",
        answer: "Tokyo",
        explanation: "Tokyo is the capital and largest city of Japan, known for its modern architecture, technology, and pop culture."
    },
    {
        question: "How many sides does a hexagon have?",
        answer: "6",
        explanation: "A hexagon is a six-sided polygon. The word 'hexagon' comes from the Greek words 'hex' meaning six and 'gonia' meaning angle."
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answer: "William Shakespeare",
        explanation: "William Shakespeare wrote the famous tragedy 'Romeo and Juliet' around 1595-1596, telling the story of two young lovers from feuding families."
    },
    {
        question: "What is the largest ocean on Earth?",
        answer: "Pacific Ocean",
        explanation: "The Pacific Ocean is the largest and deepest ocean on Earth, covering about one-third of the Earth's surface."
    },
    {
        question: "What is the main component of the sun?",
        answer: "Hydrogen",
        explanation: "The sun is primarily composed of hydrogen (about 74%) and helium (about 24%), with small amounts of other elements."
    },
    {
        question: "How many continents are there on Earth?",
        answer: "7",
        explanation: "There are seven continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia."
    }
];

// App state
let currentCardIndex = 0;
let score = 0;
let isFlipped = false;

// DOM elements
const questionText = document.getElementById('questionText');
const answerText = document.getElementById('answerText');
const answerExplanation = document.getElementById('answerExplanation');
const currentCardElement = document.getElementById('currentCard');
const totalCardsElement = document.getElementById('totalCards');
const scoreElement = document.getElementById('score');
const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const flashCard = document.getElementById('flashCard');

// Initialize the app
function init() {
    totalCardsElement.textContent = flashCards.length;
    updateCard();
    updateProgress();
}

// Update the current card display
function updateCard() {
    const card = flashCards[currentCardIndex];
    questionText.textContent = card.question;
    answerText.textContent = card.answer;
    answerExplanation.textContent = card.explanation;
    currentCardElement.textContent = currentCardIndex + 1;
    
    // Reset card to front
    isFlipped = false;
    flashCard.classList.remove('flipped');
    
    // Update navigation buttons
    prevBtn.disabled = currentCardIndex === 0;
    nextBtn.disabled = currentCardIndex === flashCards.length - 1;
}

// Flip the card
function flipCard() {
    isFlipped = !isFlipped;
    flashCard.classList.toggle('flipped', isFlipped);
}

// Mark answer as correct or incorrect
function markAnswer(correct) {
    if (correct) {
        score++;
        scoreElement.textContent = score;
    }
    
    // Add visual feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = correct ? '✓ Correct!' : '✗ Incorrect';
    btn.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.transform = '';
    }, 1000);
    
    // Auto-advance to next card after a short delay
    setTimeout(() => {
        if (currentCardIndex < flashCards.length - 1) {
            nextCard();
        }
    }, 1500);
}

// Navigate to next card
function nextCard() {
    if (currentCardIndex < flashCards.length - 1) {
        currentCardIndex++;
        updateCard();
        updateProgress();
    }
}

// Navigate to previous card
function previousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        updateCard();
        updateProgress();
    }
}

// Update progress bar
function updateProgress() {
    const progress = ((currentCardIndex + 1) / flashCards.length) * 100;
    progressFill.style.width = progress + '%';
}

// Restart the quiz
function restartQuiz() {
    currentCardIndex = 0;
    score = 0;
    scoreElement.textContent = score;
    updateCard();
    updateProgress();
    
    // Show restart message
    const restartBtn = document.querySelector('.restart-btn');
    const originalText = restartBtn.textContent;
    restartBtn.textContent = 'Quiz Restarted!';
    restartBtn.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
    
    setTimeout(() => {
        restartBtn.textContent = originalText;
        restartBtn.style.background = 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)';
    }, 2000);
}

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowRight':
            if (currentCardIndex < flashCards.length - 1) {
                nextCard();
            }
            break;
        case 'ArrowLeft':
            if (currentCardIndex > 0) {
                previousCard();
            }
            break;
        case ' ':
        case 'Enter':
            event.preventDefault();
            flipCard();
            break;
        case '1':
            if (isFlipped) markAnswer(true);
            break;
        case '2':
            if (isFlipped) markAnswer(false);
            break;
    }
});

// Add click event to card for flipping
flashCard.addEventListener('click', (event) => {
    // Don't flip if clicking on buttons
    if (!event.target.classList.contains('action-btn') && 
        !event.target.classList.contains('flip-btn')) {
        flipCard();
    }
});

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', init);

// Add some nice animations and effects
function addCardEffects() {
    // Add subtle hover effect to cards
    flashCard.addEventListener('mouseenter', () => {
        flashCard.style.transform = 'scale(1.02)';
    });
    
    flashCard.addEventListener('mouseleave', () => {
        flashCard.style.transform = 'scale(1)';
    });
}

// Call effects function
addCardEffects(); 