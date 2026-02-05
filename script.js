
/*
  Step 1: Access the display element
  - Grab the input field with id="display" from HTML
  - Store it in a variable called "display"
  - This allows us to read and update what is shown on the screen
*/
const display = document.getElementById("display");

/*
  Step 2: Grab all buttons
  - Use querySelectorAll to select every <button> element on the page
  - Store them in a variable called "buttons"
  - We will loop through this list to attach click actions
*/
const buttons = document.querySelectorAll("button");

/*
  Step 3: Safe calculation function
  - Replaces the use of eval() to prevent malicious code execution
  - Converts × → * and ÷ → / to match JS operators
  - Uses regex to allow only numbers, +, -, *, /, dot, and spaces
  - Uses Function constructor safely to evaluate the math expression
  - Returns the result or "Error" if input is invalid
*/
function calculate(expression) {
  // Replace calculator symbols with JS operators
  expression = expression.replace(/×/g, "*").replace(/÷/g, "/");

  // Allow only numbers, operators, dots, and spaces
  if (/^[0-9+\-*/. ]+$/.test(expression)) {
    try {
      // Evaluate the expression safely
      return Function('"use strict"; return (' + expression + ')')();
    } catch {
      return "Error"; // Handle any unexpected errors
    }
  } else {
    return "Error"; // Block invalid characters
  }
}

/*
  Step 4: Handle button clicks
  - Loop through each button
  - Add an event listener for 'click'
  - Determine the button type and perform the corresponding action:
    * AC → clear the display
    * =  → calculate the expression safely
    * %  → divide the current number by 100
    * else → add the button value (number/operator/dot) to the display
*/
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.innerText; // Get what is written on the button

    // Clear display when AC is clicked
    if (value === "AC") {
      display.value = "";

    // Calculate result when = is clicked
    } else if (value === "=") {
      display.value = calculate(display.value);

    // Convert current number to percentage
    } else if (value === "%") {
      if (display.value !== "") {
        display.value = (parseFloat(display.value) / 100).toString();
      }

    // Add number/operator/dot to display
    } else {
      display.value += value;
    }
  });
});

// Keyboard support
document.addEventListener("keydown", function (event) {
  const key = event.key;

  // Numbers
  if (!isNaN(key)) {
    appendValue(key);
  }

  // Operators
  if (key === "+" || key === "-" || key === "*" || key === "/") {
    appendValue(key);
  }

  // Decimal
  if (key === ".") {
    appendValue(".");
  }

  // Enter = calculate
  if (key === "Enter") {
    event.preventDefault(); // prevents form refresh
    calculateResult();
  }

  // Backspace = delete last character
  if (key === "Backspace") {
    deleteLast();
  }

  // Escape = clear all
  if (key === "Escape") {
    clearDisplay();
  }
});
