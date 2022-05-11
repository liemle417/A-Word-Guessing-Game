/*-----------CREATE VARIABLES--------------------*/

const buttons = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startGame = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const title = document.querySelector('.title');
const tries = document.querySelectorAll('img');
const headerTitle = document.getElementsByClassName('header');

let missed = 0;

/*Create a "phrases" array*/
const phrases = [
    "Yesterday Once More",
    'Bleeding Love',
    'Party In The USA',
    'Counting Stars',
    'Poker Face',
    'Set Fire To The Rain',
    'The Temple of The King',
    'Surrender',
    'Broken Heart of Gold',
    'Renegades',
    'Maneater',
    'Save Your Tears',
    'Someone You Loved',
    'Monsters',
    'What About Now'
];


//Listen for the start game button to be pressed
startGame.addEventListener('click', () => {
    overlay.style.display = 'none';
    headerTitle.textContent = "Can You Guess The Song Name";
});


// Getting a random phrase as an array for the div section
const getRandomPhraseAsArray = phrases => {      // Passing array as an argument to the function
    let randomNum = Math.floor(Math.random()*phrases.length);
    let words = phrases[randomNum].split('');
    return words;
};



// Calls function that adds phrase to display
const phraseArray = getRandomPhraseAsArray(phrases);
console.log(phraseArray);

function addPhraseToDisplay (phraseArray) {
    for(let i = 0; i < phraseArray.length; i++ ){
    let li = document.createElement('li'); // Creating list letters
    li.textContent = phraseArray[i];       // The text content is the letter the user chooses 
    phrase.firstElementChild.appendChild(li); // Whichever letter they choose gets appended 
    if( phraseArray[i] === " " ) {   // If the index or chosen letter is a space =>
        li.className = 'space'; //Change class name to space
        } else {
        li.className = 'letter' // Change class to letter 
        }
    }
}

addPhraseToDisplay(phraseArray);

console.log(getRandomPhraseAsArray(phraseArray));


function checkLetter (button){
    let letter = document.querySelectorAll('li'); //Letter spots within the phrase
    let foundLetter = null; 
    for (let i = 0; i < letter.length; i++){ // Letter length is the length of the phrase
         if(letter[i].textContent.toUpperCase() === button.textContent.toUpperCase()){ //Compares the chosen letter to whatever the button says
            letter[i].className = 'show letter'; // Gives the chosen letter the class name of show
            letter[i].style.transition ='all 1s'; //add transitions
            foundLetter += letter[i].textContent;
         }
    }
    return foundLetter;
};


function checkWin (){
    const letter = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');
    let h2 = document.querySelector('.title')

    if (letter.length === show.length){
        if (missed === 0) {
            overlay.className = 'win';
            h2.textContent = `You won! And you still have 5 guesses`;
            overlay.style.transition = "all 3s";
            overlay.style.display = 'flex';
            startGame.textContent = 'Again?';
            startGame.addEventListener('click', (e) => {
                e.preventDefault();
                location.reload();
            });
        }  else{
            overlay.className = 'win';
            h2.textContent = `You won!`;
            overlay.style.transition = "all 3s";
            overlay.style.display = 'flex';
            startGame.textContent = 'Again?';
            startGame.addEventListener('click', (e) => {
                e.preventDefault();
                location.reload();
            });
        }    
    } else if (missed === 5 ){
        overlay.className = 'lose';
        h2.textContent = 'You lose!!!';
        overlay.style.transition = "all 3s";
        overlay.style.display = 'flex';
        startGame.textContent = 'You lose! Try Again?'
        startGame.addEventListener('click', (e) => {
            e.preventDefault();
            location.reload();
        });
     }   
};



buttons.addEventListener('click', (e) => { 
    const button = e.target;
    if (button.tagName === 'BUTTON'){    
        button.className = "chosen"; //adds class of chosen if button is clicked
    } if (button.className === 'chosen'){
        button.disabled = "true"; //disables button if it has been selected
        let letterFound = checkLetter(button); 
        if (letterFound === null){
            missed += 1;
            tries[missed - 1].src = "images/lostHeart.png"; // removes the hearts
        }
        checkWin();
    }  
});

