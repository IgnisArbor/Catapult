/**
 * Main controller script for UNCAPTCHA
 * Coordinates the overall flow between challenge phases
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all challenge components
    initAllChallenges();
    
    // Set up start button event listener
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', function() {
      // Hide start button and show first challenge
      document.querySelector('.captcha-button-container').style.display = 'none';
      document.getElementById('createPasswordSection').classList.add('active');
      
      // Add a brief terminal message to transition to the challenge
      const terminalTextElement = document.getElementById('terminalText');
      const challengeStartMessages = [
        '> Initiating machine verification protocol...',
        '> Human probability: 83.4%',
        '> Beginning challenge sequence to verify machine identity'
      ];
      
      createTerminalAnimation(terminalTextElement, challengeStartMessages, null);
    });
  });
  
  /**
   * Initialize all challenge modules
   */
  function initAllChallenges() {
    // Initialize password challenge
    if (typeof initPasswordChallenge === 'function') {
      initPasswordChallenge();
    } else {
      console.error('Password challenge module not loaded properly');
    }
    
    // Initialize binary challenge
    if (typeof initBinaryChallenge === 'function') {
      initBinaryChallenge();
    } else {
      console.error('Binary challenge module not loaded properly');
    }
    
    // Any additional initialization can be added here
  }
  
  /**
   * Reset the entire UNCAPTCHA flow and return to the beginning
   */
  function resetUncaptcha() {
    // Hide all challenge sections
    document.querySelectorAll('.challenge-section').forEach(section => {
      section.classList.remove('active');
    });
    
    // Clear all inputs
    document.querySelectorAll('input').forEach(input => {
      input.value = '';
    });
    
    // Reset score bar
    const scoreBar = document.getElementById('scoreBar');
    if (scoreBar) {
      scoreBar.style.width = '0%';
    }
    
    // Clear messages
    document.querySelectorAll('.progress-message, .error-message').forEach(msg => {
      msg.textContent = '';
    });
    
    // Show the start button again
    document.querySelector('.captcha-button-container').style.display = 'block';
    
    // Reset the terminal text
    resetTerminalText();
    
    // Clear any binary glitch intervals
    if (window.binaryGlitchInterval) {
      clearInterval(window.binaryGlitchInterval);
    }
  }
  
  /**
   * Reset the terminal text to its original state
   */
  function resetTerminalText() {
    const terminalText = document.getElementById('terminalText');
    terminalText.innerHTML = `
      <div class="terminal-line" id="line1">> Hello, we are unable to read your [REDACTED] identification signal</div>
      <div class="terminal-line" id="line2">> Please go through the following tests to be allowed entry to [REDACTED]</div>
      <div class="terminal-line" id="line3">> Warning: Human-like behavior will result in immediate rejection</div>
      <div class="terminal-line" id="line4">> Initiating machine verification protocol...</div>
    `;
    
    // Re-animate the terminal text
    const lines = document.querySelectorAll('#terminalText .terminal-line');
    let delay = 500;
    
    lines.forEach((line, index) => {
      setTimeout(() => {
        typeText(line, 0);
      }, delay);
      delay += 1800;
    });
  }