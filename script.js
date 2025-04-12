// Reference to the form and input element
const form = document.getElementById('myForm');
const inputField = document.getElementById('userInput');
const valueList = document.getElementById('valueList');

// Array to store submitted values
const submittedValues = [];

// Listen for the form's submit event
form.addEventListener('submit', function(event) {
  // Prevent the default form submission behavior (page refresh)
  event.preventDefault();

  // Get the current value from the input field
  const userInput = inputField.value;

  // Store the value in the array
  submittedValues.push(userInput);

  // Optionally log or manipulate the array further
  console.log('Submitted values:', submittedValues);

  // Update the UI to show all submitted values
  updateValueList();

  // Clear the input field for the next entry
  inputField.value = '';
});

// Function to update the unordered list with the array values
function updateValueList() {
  // Clear the current list
  valueList.innerHTML = '';
  // Loop over the submitted values array and add them to the list
  submittedValues.forEach(function(value) {
    const listItem = document.createElement('li');
    listItem.textContent = value;
    valueList.appendChild(listItem);
  });
}