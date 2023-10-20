/* Lesson 3: FUNCTIONS*/

const valueFromID = (id) => parseInt(document.querySelector(`#${id}`).value);

// Step 1: Using function declaration, define a function named add that takes two arguments, number1 and number2
// Step 2: In the function, return the sum of the parameters number1 and number2
function add(number1, number2){
  return parseInt(number1) + parseInt(number2);
}
// Step 3: Step 3: Using function declaration, define another function named addNumbers that gets the values of two HTML form controls with IDs of addend1 and addend2. Pass them to the add function
// Step 4: Assign the return value to an HTML form element with an ID of sum
//Step 5 see below
function addNumbers(addend1, addend2){
  //let result = add(document.getElementById("addend1").value, document.getElementById("addend2").value);
  let result = add(valueFromID("addend1"), valueFromID("addend2"));
  document.getElementById("sum").value = result;
}

// Step 6: Using function expressions, repeat Steps 1-5 with new functions named subtract and subtractNumbers and HTML form controls with IDs of minuend, subtrahend, difference and subtractNumbers
const subtract = function(number1,number2){
  return number1 - number2;
}
const subtractNumbers = function(minuend, subtrahend){
  let result = subtract(valueFromID("minuend"), valueFromID("subtrahend"));
  document.getElementById("difference").value = result;
}

// Step 7: Using arrow functions, repeat Steps 1-5 with new functions named multiply and mulitplyNumbers and HTML form controls with IDs of factor1, factor2, product and multiplyNumbers
const multiply = (number1,number2) => number1*number2;
const multiplyNumbers = (factor1, factor2) => {
  let result = multiply(valueFromID("factor1"), valueFromID("factor2"));
  document.getElementById("product").value = result;
}

// Step 8: Using any of the three function declaration types, repeat Steps 1-5 with new functions named divide and divideNumbers and HTML form controls with IDs of dividend, divisor, quotient and divideNumbers
const divide = (number1,number2) => number1/number2;
const divideNumbers = (dividend, divisor) => {
  let result = divide(valueFromID("dividend"), valueFromID("divisor"));
  document.getElementById("quotient").value = result;
}

// Step 5: Add a "click" event listener to the HTML button with an ID of addNumbers that calls the addNumbers function
// document.getElementById("addNumbers").addEventListener("click", addNumbers);
// document.getElementById("subtractNumbers").addEventListener("click", subtractNumbers);
// document.getElementById("multiplyNumbers").addEventListener("click", multiplyNumbers);
const buttons = ["addNumbers","subtractNumbers","multiplyNumbers","divideNumbers"];
const buttonActions = {"addNumbers": addNumbers, "subtractNumbers": subtractNumbers, "multiplyNumbers":multiplyNumbers, "divideNumbers":divideNumbers};
buttons.forEach(element => {
  document.getElementById(element).addEventListener("click", buttonActions[element]);
});;

// Step 9: Test all of the mathematical functionality of the task3.html page.


/* BUILT-IN METHODS */

// Step 1: Declare and instantiate a variable of type Date to hold the current date
let currentDate = new Date();
// Step 2: Declare a variable to hold the current year
let currentYear;
// Step 3: Using the variable declared in Step 1, call the built-in getFullYear() method/function and assign it to the variable declared in Step 2
currentYear = currentDate.getFullYear();

// Step 4: Assign the current year variable to an HTML form element with an ID of year
document.getElementById("year").innerHTML = currentYear;

/* ARRAY METHODS */

// Step 1: Declare and instantiate an array variable to hold the numbers 1 through 25
let integers = [];
for(i=1; !integers.includes(25);){
  integers.push(integers.length+1);
}
// integers = new Array(25);
// integers.forEach((value, index) => value = index); //why won't this work?
console.log(integers);

// Step 2: Assign the value of the array variable to the HTML element with an ID of "array"
document.getElementById("array").innerHTML = integers;

// Step 3: Use the filter array method to find all of the odd numbers of the array variable and assign the reult to the HTML element with an ID of "odds" ( hint: % (modulus operartor) )
document.getElementById("odds").innerHTML = integers.filter((number) => number%2==1);

// Step 4: Use the filter array method to find all of the even numbers of the array variable and assign the result to the HTML element with an ID of "evens"
document.getElementById("evens").innerHTML = integers.filter((number) => number%2==0);

// Step 5: Use the reduce array method to sum the array variable elements and assign the result to the HTML element with an ID of "sumOfArray"
document.getElementById("sumOfArray").innerHTML = integers.reduce((sum, number) => sum += number,0);

// Step 6: Use the map array method to multiple each element in the array variable by 2 and assign the result to the HTML element with an ID of "multiplied"
document.getElementById("multiplied").innerHTML = integers.map((number) => 2*number);

// Step 7: Use the map and reduce array methods to sum the array elements after multiplying each element by two.  Assign the result to the HTML element with an ID of "sumOfMultiplied"
document.getElementById("sumOfMultiplied").innerHTML = integers.map((number) => 2*number).reduce((sum, number) => sum += number,0);