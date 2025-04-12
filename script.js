// Global variable to hold the current captcha answer
let currentCaptchaAnswer = "";

// Array of captcha objects containing the image filename and corresponding answer
const captchas = [
  { image: 'captcha1.png', answer: '7MP3K' },
  { image: 'captcha2.png', answer: '8SYLPE' },
  { image: 'captcha3.png', answer: '2FCPRMP6HJ6X' }
];

// Function to randomly choose a captcha from the captchas array
function loadRandomCaptcha() {
  const randomIndex = Math.floor(Math.random() * captchas.length);
  const captcha = captchas[randomIndex];
  const imagePath = 'images/' + captcha.image;
  const captchaImageElement = document.getElementById('captchaImage');
  captchaImageElement.src = imagePath;
  currentCaptchaAnswer = captcha.answer.trim();
  console.log('Loaded captcha answer:', currentCaptchaAnswer);
}

// Initially load a captcha when the page loads
window.addEventListener('DOMContentLoaded', loadRandomCaptcha);

// Get references to the form, input, value list, and result elements
const form = document.getElementById('myForm');
const inputField = document.getElementById('userInput');
const valueList = document.getElementById('valueList');
const resultMessage = document.getElementById('result');

// Array to store submitted values
const submittedValues = [];

// Listen for form submission events
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const userInput = inputField.value.trim();
  
  // Check if the user's input matches the captcha answer
  if (userInput === currentCaptchaAnswer) {
    resultMessage.textContent = "Correct! Captcha solved.";
    resultMessage.style.color = "#3cb371"; // Green color for success
    submittedValues.push(userInput);
    updateValueList();
    
    // Optionally, you can perform any other action on success here...
    
    // Load a new captcha for the next attempt (if needed)
    loadRandomCaptcha();
  } else {
    // If the answer is incorrect, redirect the user to "wrong.html"
    window.location.href = "index2.html";
  }
  
  // Clear the input field for the next attempt
  inputField.value = '';
});

// Function to update the list of submitted values
function updateValueList() {
  valueList.innerHTML = '';
  submittedValues.forEach(function(value) {
    const listItem = document.createElement('li');
    listItem.textContent = value;
    valueList.appendChild(listItem);
  });
}
