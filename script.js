// Reference to the AI message container
const aiMessageEl = document.getElementById('aiMessage');

// Array of messages to type out. Each entry is one line.
const messages = [
  ">Hello, we are unable to read your [REDACTED] identification signal",
  ">Please go through the following tests to be allowed entry to [REDACTED]"
];

let currentLine = 0;
let currentChar = 0;

// Function to simulate the typewriter effect
function typeNextChar() {
  if (currentLine < messages.length) {
    // If current line not fully typed, add next character
    if (currentChar < messages[currentLine].length) {
      aiMessageEl.textContent += messages[currentLine].charAt(currentChar);
      currentChar++;
      setTimeout(typeNextChar, 50); // adjust speed here (milliseconds)
    } else {
      // Line finished: add a newline and prepare for next line
      aiMessageEl.textContent += "\n";
      currentLine++;
      currentChar = 0;
      setTimeout(typeNextChar, 500); // slight pause before next line
    }
  }
}

typeNextChar();

// Button behavior: clicking it navigates to the first uncaptcha puzzle page.
document.getElementById('uncaptchaButton').addEventListener('click', () => {
  // Change 'uncaptcha_page.html' to the actual filename or route for your first puzzle
  window.location.href = 'uncaptcha.html';
});
