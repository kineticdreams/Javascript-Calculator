let decimalAdded = false;
document.addEventListener("click", function(event) {
    if (!event.target.attributes.value) return; // ignore anything else except the buttons

    const value = event.target.attributes.value.nodeValue;
    const input = document.querySelector("#input");
    const history = document.querySelector("#history");
    const operators = new Set(["x", "÷", "+", "-"]);
    let lastChar = history.textContent[history.textContent.length - 1];

    console.log("last char:", lastChar);

    // clear the first "0" from the history if "." not clicked
    if (history.textContent === "0" && value !== ".") history.textContent = "";

    // clear all when "C" is clicked
    if (value === "c") {
        history.textContent = "0";
        input.textContent = "0";
        decimalAdded = false;
    }

    // If "=" key is pressed, calculate and display the result
    else if (value === "=") {
        let result = history.textContent.replace(/x/g, "*").replace(/÷/g, "/");
        if (operators.has(lastChar) || lastChar === '.') { // remove any operator or decimal in last position before hitting "="
            result = result.replace(lastChar, '');
            history.textContent = history.textContent.replace(/.$/, '');
        }
        const floatOrInt = eval(result) % 1 === 0 ? eval(result) : eval(result).toFixed(2); // diplay 2 the result with 2 decimal precision if it's not integer
        input.textContent = floatOrInt;
        history.textContent = `${history.textContent}=${floatOrInt}`;
        decimalAdded = false;
    }

    // console.log(operators, operators.has(value));
    else if (operators.has(value)) { // operator button has been clicked
        console.log(history.textContent.length, lastChar, value);
        if (history.textContent !== '' && !operators.has(lastChar)) { // add operator only if history is not empty and last char is not an operator
            input.textContent = value;
            history.textContent += value;
        } else if (history.textContent === '' && value === '-') { // add operator only if history is empty and last char is '-'
            input.textContent = value;
            history.textContent += value;
        }
        if (operators.has(lastChar) && history.textContent.length > 1) { // any operator at the end of the history string will be replaced with current operator
            history.textContent = history.textContent.replace(/.$/, value)
        }
        decimalAdded = false;
    }
    // add a decimal only after an operator, "C" or "=" is pressed by turning addDecimal to false
    else if (value === '.') {
        if (decimalAdded === false) {
            input.textContent = value;
            history.textContent += value;
            decimalAdded = true;
        }
    } else {
        input.textContent = value;
        history.textContent += value;
    }

});
