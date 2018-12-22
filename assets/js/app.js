var computerChoices = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let wins = 0;
let losses = 0;
let guesses = 9;
let guessesLeft = 9;
let guessedLetters = [];
var letterToGuess = null;
var yay = new Audio("assets/sound/Children Yay! - Sound Effect.mp3");
var boo = new Audio("assets/sound/The Boo! You Suck! Sound Effect - UPDATED.mp3");
var ouch = new Audio("assets/sound/Audience Ouch Sound Effect 1.mp3");

var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
document.querySelector('.pysch').style.display = "none";
function updateGuessesLeft() {
    document.querySelector('#guessLeft').innerHTML = "Guesses left: " + guessesLeft;
};

function updateLetterToGuess() {
    this.letterToGuess = this.computerChoices[Math.floor(Math.random() * this.computerChoices.length)];
};

function updateGuessesSoFar() {
    document.querySelector('#let').innerHTML = "Your Guesses so far: " + guessedLetters.join(', ');
};
var reset = function() {
    totalGuesses = 9;
    guessesLeft = 9;
    guessedLetters = [];
    setTimeout(function() { document.querySelector('.pysch').style.display = 'none'; }, 5000);
    updateLetterToGuess();
    updateGuessesLeft();
    updateGuessesSoFar();
    $("#pyschimg").attr("src","assets/images/Psych_16x9_FeaturedPromo_2560x1440.png");
}

updateLetterToGuess();
updateGuessesLeft();

document.onkeyup = function(event) {
    console.log(letterToGuess)
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    var check = computerChoices.includes(userGuess);
    console.log(userGuess);

    if (check === false) {
        ouch.play();
        console.log("That was not a valid guess, try again?");
        alert("That was not a valid guess, try again?");
        return false;
    } else if (check === true) {
        guessesLeft--;
        guessedLetters.push(userGuess);
        updateGuessesLeft();
        updateGuessesSoFar();

        if (guessesLeft > 0) {
            if (userGuess == letterToGuess) {
                wins++;
                yay.play();
                $("#pyschimg").attr("src","assets/images/psych-shawn-gus-fist-bumps.gif");
                document.querySelector('#wins').innerHTML = "Wins: " + wins;
                userGuess = userGuess.toUpperCase();
                document.querySelector('.pysch').style.display = '';
                document.querySelector('.pysch').style.height = '4em';
                document.querySelector('.pysch').innerHTML = "Good guess! This is awesome I was thinking of " + userGuess + " too!";
                $( "#reset" ).click(function() {
                    reset();
                  });
            }
        } else if (guessesLeft == 0) {
            losses++;
            boo.play();
            letterToGuess = letterToGuess.toUpperCase();
            document.querySelector('#losses').innerHTML = "Losses: " + losses;
            document.querySelector('.pysch').style.display = '';
            document.querySelector('.pysch').innerHTML = "Sorry bud, I was thinking of the letter " + letterToGuess;
            $( "#reset" ).click(function() {
                reset();
              });
        }
        return false;
    } else {
        alert("Oops, we have an error");
    }

};