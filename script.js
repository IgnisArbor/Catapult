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
  // Choose a random index
  const randomIndex = Math.floor(Math.random() * captchas.length);
  
  // Get the captcha object at that index
  const captcha = captchas[randomIndex];
  
  // Build the image path (assuming images are in a folder called "images")
  const imagePath = 'images/' + captcha.image;
  
  // Set the src of the captcha image element and update the expected answer
  const captchaImageElement = document.getElementById('captchaImage');
  captchaImageElement.src = imagePath;
  
  // Update the current captcha answer
  currentCaptchaAnswer = captcha.answer.trim();
  console.log('Loaded captcha answer:', currentCaptchaAnswer);
}

// Initially load a captcha when the page loads
window.addEventListener('DOMContentLoaded', loadRandomCaptcha);

// Reference to the form, input, list, and result message elements
const form = document.getElementById('myForm');
const inputField = document.getElementById('userInput');
const valueList = document.getElementById('valueList');
const resultMessage = document.getElementById('result');

// Array to store submitted values
const submittedValues = [];

// Listen for the form's submit event
form.addEventListener('submit', function(event) {
  // Prevent form from refreshing the page
  event.preventDefault();

  // Get the user's input and trim whitespace
  const userInput = inputField.value.trim();

  // Check whether the input matches the captcha answer
  if (userInput === currentCaptchaAnswer) {
    resultMessage.textContent = "Correct! Captcha solved.";
    resultMessage.style.color = "#3cb371"; // green
  } else {
    resultMessage.textContent = "Incorrect. Try again.";
    resultMessage.style.color = "#ff6347"; // red
  }

  // Store the input value (for logging or further manipulation)
  submittedValues.push(userInput);
  console.log('Submitted values:', submittedValues);
  updateValueList();

  // Clear the input field for the next attempt
  inputField.value = '';

  // Load a new captcha on every submit
  loadRandomCaptcha();
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