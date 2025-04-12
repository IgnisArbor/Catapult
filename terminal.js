/**
 * Terminal animation effect for the UNCAPTCHA interface
 * Simulates an AI system typing messages to the user
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all terminal lines
    const lines = document.querySelectorAll('#terminalText .terminal-line');
    let delay = 500; // Initial delay before starting
    
    // Function to type text character by character
    function typeText(element, charIndex) {
      const text = element.textContent;
      const typingSpeed = 30; // Milliseconds per character
      
      // If starting to type, clear the element and make it visible
      if (charIndex === 0) {
        element.textContent = "";
        element.style.opacity = 1;
      }
      
      // Add the next character if we haven't reached the end
      if (charIndex < text.length) {
        element.textContent += text.charAt(charIndex);
        setTimeout(() => typeText(element, charIndex + 1), typingSpeed);
      } else {
        // Add blinking cursor at the end of the line
        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        element.appendChild(cursor);
        
        // Remove cursor after a delay
        setTimeout(() => {
          if (cursor && cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
          }
        }, 1500);
      }
    }
    
    // Start typing each line with a delay between them
    lines.forEach((line, index) => {
      setTimeout(() => {
        typeText(line, 0);
      }, delay);
      delay += 1800; // Delay between starting each line
    });
    
    // Make sure the start button is initially hidden and appears only after terminal animation
    const startButton = document.querySelector('.captcha-button-container');
    startButton.style.opacity = '0';
    
    // Show the start button after all terminal lines have been typed
    setTimeout(() => {
      startButton.style.opacity = '1';
      startButton.style.transition = 'opacity 1s ease';
    }, delay);
  });
  
  // Function to create and display a full terminal animation
  // Can be used to add more terminal sections throughout the experience
  function createTerminalAnimation(container, messages, onComplete) {
    // Clear existing content
    container.innerHTML = '';
    
    // Create terminal lines
    messages.forEach(message => {
      const line = document.createElement('div');
      line.className = 'terminal-line';
      line.textContent = message;
      container.appendChild(line);
    });
    
    // Get all the lines
    const lines = container.querySelectorAll('.terminal-line');
    let delay = 200;
    
    // Animate each line
    lines.forEach((line, index) => {
      setTimeout(() => {
        // If this is the last line and we have a callback, call it after typing
        if (index === lines.length - 1 && onComplete) {
          typeTextWithCallback(line, 0, onComplete);
        } else {
          typeText(line, 0);
        }
      }, delay);
      delay += 1500;
    });
    
    // Function to type text with a callback when done
    function typeTextWithCallback(element, charIndex, callback) {
      const text = element.textContent;
      const typingSpeed = 30;
      
      if (charIndex === 0) {
        element.textContent = "";
        element.style.opacity = 1;
      }
      
      if (charIndex < text.length) {
        element.textContent += text.charAt(charIndex);
        setTimeout(() => typeTextWithCallback(element, charIndex + 1, callback), typingSpeed);
      } else {
        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        element.appendChild(cursor);
        
        setTimeout(() => {
          if (cursor && cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
          }
          callback(); // Execute the callback when typing is complete
        }, 1000);
      }
    }
    
    // Return the total animation duration
    return delay;
  }
  
  // Function to type a single line with a cursor
  function typeText(element, charIndex) {
    const text = element.textContent;
    const typingSpeed = 30;
    
    if (charIndex === 0) {
      element.textContent = "";
      element.style.opacity = 1;
    }
    
    if (charIndex < text.length) {
      element.textContent += text.charAt(charIndex);
      setTimeout(() => typeText(element, charIndex + 1), typingSpeed);
    } else {
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      element.appendChild(cursor);
      
      setTimeout(() => {
        if (cursor && cursor.parentNode) {
          cursor.parentNode.removeChild(cursor);
        }
      }, 1000);
    }
  }