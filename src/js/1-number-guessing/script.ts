function queryElement<T extends Element>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) {
    throw new Error(`element not found: el`, { cause: el });
  }
  return el;
}

const guesses = queryElement<HTMLElement>(".guesses");
const guessSubmit = queryElement<HTMLInputElement>(".guessSubmit");
const guessField = queryElement<HTMLInputElement>(".guessField");
const lastResult = queryElement<HTMLElement>(".lastResult");
const lowOrHi = queryElement<HTMLElement>(".lowOrHi");

let guessCount = 1;
let resetButton: HTMLButtonElement;
let randomNumber: number;

function reset() {
  randomNumber = Math.floor(Math.random() * 10) + 1;
  guessCount = 1;
  const resultParas = document.querySelectorAll(".resultParas p");
  for (const param of resultParas) {
    param.textContent = "";
  }
  guessSubmit.disabled = false;
  guessField.disabled = false;
  guessField.focus();
  lastResult.style.backgroundColor = "white";
  if (resetButton) {
    resetButton.parentNode?.removeChild(resetButton);
  }
}

function checkGuess() {
  const guess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = "Previous guesses: ";
  }
  guesses.textContent += ` ${guess}`;
  if (guess === randomNumber) {
    lastResult.textContent = "Congratulations, you got the number!";
    lastResult.style.backgroundColor = "green";
    gameOver();
  } else if (guessCount === 3) {
    lastResult.textContent = "You lost.";
    lastResult.style.backgroundColor = "red";
    gameOver();
  } else {
    lastResult.style.backgroundColor = "red";
    lastResult.textContent = "Wrong!";
    if (guess > randomNumber) {
      lowOrHi.textContent = "Last guess was too high!";
    } else {
      lowOrHi.textContent = "Last guess was too low!";
    }
  }

  console.log("over");
  ++guessCount;
  guessField.value = "";
  guessField.focus();
}

function gameOver() {
  lowOrHi.textContent = "";
  guessSubmit.disabled = true;
  guessField.disabled = true;
  resetButton = document.createElement("button");
  resetButton.textContent = "New game";
  document.body.appendChild(resetButton);
  resetButton.addEventListener("click", reset);
}

guessSubmit.addEventListener("click", checkGuess);

reset();
