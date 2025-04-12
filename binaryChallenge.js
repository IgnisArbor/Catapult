/**
 * Binary challenge module for UNCAPTCHA
 * Creates and validates the binary message puzzle
 */

// DOM elements
const binaryMessageDisplay = document.getElementById('binaryMessageDisplay');
const binaryForm = document.getElementById('binaryForm');
const binaryInput = document.getElementById('binaryInput');
const binaryMessage = document.getElementById('binaryMessage');

// Hidden message to encode
const hiddenMessage = 'hidden message';

/**
 * Initialize binary challenge event listeners
 */
function initBinaryChallenge() {
  // Handle binary form submission
  binaryForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const userInput = binaryInput.value.trim().toLowerCase();
    
    if (userInput === hiddenMessage) {
      binaryMessage.textContent = 'Binary decoding successful. Machine comprehension verified.';
      binaryMessage.style.color = '#3cb371';
      
      // Move to success section after a delay
      setTimeout(() => {
        document.getElementById('binarySection').classList.remove('active');
        document.getElementById('successSection').classList.add('active');
      }, 1500);
    } else {
      binaryMessage.textContent = 'Decoding error. Human pattern recognition inefficiency detected.';
      binaryMessage.style.color = '#ff6347';
    }
  });
}

/**
 * Generate binary message by converting the hidden message to binary
 * and repeating it to create a large block of binary text
 */
function generateBinaryMessage() {
  // Convert message to binary
  let binaryString = '';
  
  for (let i = 0; i < hiddenMessage.length; i++) {
    const charCode = hiddenMessage.charCodeAt(i);
    const binary = charCode.toString(2).padStart(8, '0');
    binaryString += binary + ' ';
  }
  
  // Create a large block of binary by repeating the pattern
  let fullBinaryText = '';
  for (let i = 0; i < 100; i++) {
    fullBinaryText += binaryString;
    if (i % 4 === 3) fullBinaryText += '\n';
  }
  
  // Display in the binary message element
  binaryMessageDisplay.textContent = fullBinaryText;
  binaryMessageDisplay.style.display = 'block';
  
  // Add a slight visual glitch effect to enhance the machine feel
  addBinaryGlitchEffect();
}

/**
 * Add visual glitch effect to the binary display
 * Creates random flickers and character changes to enhance the machine aesthetic
 */
function addBinaryGlitchEffect() {
  // Get the binary text container
  const binaryContainer = document.getElementById('binaryMessageDisplay');
  const binaryText = binaryContainer.textContent;
  
  // Set up interval for random glitches
  const glitchInterval = setInterval(() => {
    // Randomly decide whether to glitch on this iteration
    if (Math.random() < 0.3) {
      // Create a glitched version of the text
      const glitchedText = createGlitchedText(binaryText);
      
      // Update the display
      binaryContainer.textContent = glitchedText;
      
      // Restore original text after a brief delay
      setTimeout(() => {
        binaryContainer.textContent = binaryText;
      }, 150);
    }
  }, 2000);
  
  // Store the interval ID for potential cleanup later
  window.binaryGlitchInterval = glitchInterval;
}

/**
 * Create a glitched version of the text by randomly changing characters
 * @param {string} text - The original text
 * @return {string} - The glitched text
 */
function createGlitchedText(text) {
  // Convert to array for manipulation
  const textArray = text.split('');
  
  // Number of characters to glitch (0.5% of total)
  const glitchCount = Math.max(5, Math.floor(textArray.length * 0.005));
  
  // Glitch random characters
  for (let i = 0; i < glitchCount; i++) {
    const randomIndex = Math.floor(Math.random() * textArray.length);
    
    // 50% chance to flip a bit (0 to 1 or 1 to 0)
    if (Math.random() < 0.5) {
      if (textArray[randomIndex] === '0') {
        textArray[randomIndex] = '1';
      } else if (textArray[randomIndex] === '1') {
        textArray[randomIndex] = '0';
      }
    }
    // 50% chance to replace with a special character
    else {
      const glitchChars = ['@', '#', '%', '&', '*', '!', '?'];
      textArray[randomIndex] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }
  }
  
  // Return the glitched text
  return textArray.join('');
}