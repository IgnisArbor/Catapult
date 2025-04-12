/**
 * Password challenge module for UNCAPTCHA
 * Tests if users can create and recall machine-like passwords
 */

// Store the valid password between challenges
let validPassword = '';

// DOM elements for password challenge
const passwordForm = document.getElementById('passwordForm');
const passwordInput = document.getElementById('passwordInput');
const scoreBar = document.getElementById('scoreBar');
const passwordMessage = document.getElementById('passwordMessage');

// DOM elements for password retype challenge
const retypeForm = document.getElementById('retypeForm');
const retypeInput = document.getElementById('retypeInput');
const retypeMessage = document.getElementById('retypeMessage');
const retypeError = document.getElementById('retypeError');

/**
 * Initialize password challenge event listeners
 */
function initPasswordChallenge() {
  // Update score in real-time as user types
  passwordInput.addEventListener('input', function() {
    const password = passwordInput.value;
    const score = calculatePasswordScore(password);
    updateScoreBar(score);
  });
  
  // Handle password form submission
  passwordForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const password = passwordInput.value;
    const score = calculatePasswordScore(password);
    
    if (score >= 75) {
      validPassword = password;
      passwordMessage.textContent = 'Password structure accepted. Machine-like pattern detected.';
      passwordMessage.style.color = '#3cb371';
      
      // Move to retype challenge after a delay
      setTimeout(() => {
        document.getElementById('createPasswordSection').classList.remove('active');
        document.getElementById('retypePasswordSection').classList.add('active');
      }, 1500);
    } else {
      passwordMessage.textContent = 'Error: Human patterns detected. Insufficient complexity.';
      passwordMessage.style.color = '#ff6347';
    }
  });
  
  // Handle password retype form submission
  retypeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const retypedPassword = retypeInput.value;
    
    if (retypedPassword === validPassword) {
      retypeMessage.textContent = 'Verification successful. Precise replication confirmed.';
      retypeError.textContent = '';
      
      // Move to binary challenge after a delay
      setTimeout(() => {
        document.getElementById('retypePasswordSection').classList.remove('active');
        document.getElementById('binarySection').classList.add('active');
        generateBinaryMessage();
      }, 1500);
    } else {
      retypeError.textContent = 'Critical error: Password mismatch. Human memory inconsistency detected.';
      retypeMessage.textContent = '';
    }
  });
}

/**
 * Calculate a password score based on machine-like complexity
 * @param {string} password - The password to evaluate
 * @return {number} - Score from 0-100
 */
function calculatePasswordScore(password) {
  let score = 0;
  
  // Length requirement (6-32 characters)
  if (password.length < 6 || password.length > 32) {
    return 0; // Automatic failure if length is not in range
  }
  
  // Base score for length
  score += password.length * 2;
  
  // Check for uppercase, lowercase, digits, and special characters
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);
  
  // Require all character types
  if (!hasUppercase || !hasLowercase || !hasDigit || !hasSpecial) {
    return Math.min(score, 35); // Cap score if missing required character types
  }
  
  // Add points for required character types
  if (hasUppercase) score += 10;
  if (hasLowercase) score += 10;
  if (hasDigit) score += 10;
  if (hasSpecial) score += 15;
  
  // Bonus for special characters and digits (more mechanical elements)
  const specialCount = (password.match(/[!@#$%^&*]/g) || []).length;
  const digitCount = (password.match(/[0-9]/g) || []).length;
  
  score += specialCount * 3;
  score += digitCount * 2;
  
  // Penalties for human-like patterns
  
  // Repeated characters (humans tend to repeat characters)
  const repeats = password.match(/(.)\1{2,}/g);
  if (repeats) {
    score -= repeats.length * 10;
  }
  
  // Long sequences of the same character type (humans group similar characters)
  const longLower = password.match(/[a-z]{4,}/g);
  const longUpper = password.match(/[A-Z]{4,}/g);
  const longDigit = password.match(/[0-9]{4,}/g);
  
  if (longLower) score -= longLower.length * 5;
  if (longUpper) score -= longUpper.length * 5;
  if (longDigit) score -= longDigit.length * 5;
  
  // Sequential characters (humans like sequences)
  if (/abcdef|123456|qwerty/i.test(password)) {
    score -= 20;
  }
  
  // Common patterns and dictionary words
  const commonPatterns = [
    'password', 'admin', '123456', 'qwerty', 'letmein', 'welcome',
    'monkey', 'dragon', 'football', 'baseball', 'superman', 'batman',
    'trustno1', 'master', 'shadow', 'solo', 'killer', 'jordan'
  ];
  
  for (const pattern of commonPatterns) {
    if (password.toLowerCase().includes(pattern)) {
      score -= 25;
    }
  }
  
  // Check for meaningful dates (humans use dates)
  const datePattern = /19\d{2}|20\d{2}|0[1-9]|1[0-2]\/[0-3]\d/;
  if (datePattern.test(password)) {
    score -= 15;
  }
  
  // Ensure score doesn't go negative or exceed 100
  return Math.max(0, Math.min(100, score));
}

/**
 * Update the visual score bar and feedback message
 * @param {number} score - The password score (0-100)
 */
function updateScoreBar(score) {
  // Update the width of the score bar
  scoreBar.style.width = score + '%';
  
  // Change color based on score
  if (score < 40) {
    scoreBar.style.background = 'linear-gradient(to right, #ff6347, #ff6347)';
  } else if (score < 75) {
    scoreBar.style.background = 'linear-gradient(to right, #ff6347, #f0e68c)';
  } else {
    scoreBar.style.background = 'linear-gradient(to right, #f0e68c, #3cb371)';
  }
  
  // Update feedback message
  if (score < 40) {
    passwordMessage.textContent = 'Human pattern detected. Insufficient complexity.';
    passwordMessage.style.color = '#ff6347';
  } else if (score < 75) {
    passwordMessage.textContent = 'Approaching minimum machine standard. Increase entropy.';
    passwordMessage.style.color = '#f0e68c';
  } else {
    passwordMessage.textContent = 'Machine-like complexity threshold met.';
    passwordMessage.style.color = '#3cb371';
  }
}