/* Lesson 5 */

/* IF/ELSE IF */
// Step 1: Declare and initialize a new variable to hold the current date
const date = currentDate;
//console.log(date);
// Step 2: Declare another variable to hold the day of the week
// Step 3: Using the variable declared in Step 1, assign the value of the variable declared in Step 2 to the day of the week ( hint: getDay() )
const day = date.getDay();
//console.log(currentWeek);
// Step 4: Declare a variable to hold a message that will be displayed
// Step 5: Using an if statement, if the day of the week is a weekday (i.e. Monday - Friday), set the message variable to the string 'Hang in there!'
// Step 6: Using an else statement, set the message variable to 'Woohoo!  It is the weekend!'
let dayMessage;
if (day>0 ** day<6){
  dayMessage="Hang in there!";
} else {
  dayMessage = "Woohoo!  It is the weekend!";
}

/* SWITCH, CASE, BREAK */
// Step 1: Declare a new variable to hold another message
let otherMessage;
// Step 2: Use switch, case and break to set the message variable to the day of the week as a string (e.g. Sunday, Monday, etc.) using the day of week variable declared in Step 2 above
switch (day){
  case 0:
    otherMessage = "Sunday";
    break;
  case 1:
    otherMessage = "Monday";
    break;
  case 2:
    otherMessage = "Tuesday";
    break;
  case 3:
    otherMessage = "Wednesday";
    break;
  case 4:
    otherMessage = "Thursday";
    break;
  case 5:
    otherMessage = "Friday";
    break;
  case 6:
    otherMessage = "Saturday";
    break;
}
/* OUTPUT */
templesHTML = document.querySelector("#temples");

// Step 1: Assign the value of the first message variable to the HTML element with an ID of message1
document.querySelector("#message1").innerText = dayMessage;
// Step 2: Assign the value of the second message variable to the HTML element with an ID of message2
document.querySelector("#message2").innerText = otherMessage;

/* FETCH */
// Step 1: Declare a global empty array variable to store a list of temples
let temples = [];
// Step 2: Declare a function named output that accepts a list of temples as an array argument and does the following for each temple:
// - Creates an HTML <article> element
// - Creates an HTML <h3> element and add the temple's templeName property to it
// - Creates an HTML <h4> element and add the temple's location property to it
// - Creates an HTML <h4> element and add the temple's dedicated property to it
// - Creates an HTML <img> element and add the temple's imageUrl property to the src attribute and the temple's templeName property to the alt attribute
// - Appends the <h3> element, the two <h4> elements, and the <img> element to the <article> element as children
// - Appends the <article> element to the HTML element with an ID of temples
function output(templeList){
  templeList.forEach(temple => {
    templeEntry = document.createElement("article");
    templeEntry.innerHTML = templeHTML(temple);
    templesHTML.append(templeEntry);
  });
}

const templeHTML = (temple) => {
  return `<h3>${temple.templeName}</h3>
  <h4>${temple.location}</h4>
  <h4>${temple.dedicated}</h4>
  <img src="${temple.imageUrl}" alt="${temple.templeName}">`;
  //alternate
  //  templeEntry = document.createElement("article");
  // let name = document.createElement("h3");
  // name.innerHTML = `${temple.templeName}`;
  // let location = document.createElement("h4");
  // location.innerHTML = `${temple.location}`;
  // let dedicated = document.createElement("h4");
  // dedicated.innerHTML = `${temple.dedicated}`;
  // let image = document.createElement("img")
  // image.src = `${temple.imageURL}`;
  // image.alt = `${temple.templeName}`;
  // name.appendChild(location);
  //   name.appendChild(dedicated);
  //   name.appendChild(img);
  // return name;
}

// Step 3: Create another function called getTemples. Make it an async function.
// Step 4: In the function, using the built-in fetch method, call this absolute URL: 'https://byui-cse.github.io/cse121b-course/week05/temples.json'. Create a variable to hold the response from your fetch. You should have the program wait on this line until it finishes.
// Step 5: Convert your fetch response into a Javascript object ( hint: .json() ). Store this in the templeList variable you declared earlier (Step 1). Make sure the the execution of the code waits here as well until it finishes.
// Step 6: Finally, call the output function and pass it the list of temples. Execute your getTemples function to make sure it works correctly.
async function getTemples(){
  templeResponse = await fetch("https://byui-cse.github.io/cse121b-course/week05/temples.json");
  if (templeResponse.ok){
    temples = await templeResponse.json();
    output(temples);
  } else console.log("temple data not imported");
}

getTemples();

// Step 7: Declare a function named reset that clears all of the <article> elements from the HTML element with an ID of temples
function reset(){
  templesHTML.innerHTML = "";
}
// Step 8: Declare a function named sortBy that does the following:
// - Calls the reset function
// - Sorts the global temple list by the currently selected value of the HTML element with an ID of sortBy
// - Calls the output function passing in the sorted list of temples
sortByElement = document.querySelector("#sortBy");
const sortBy = () =>{
  reset();
  temples.sort();
  if(sortByElement.value = "templeNameDescending") temples.reverse();
  output(temples);
}

// Step 9: Add a change event listener to the HTML element with an ID of sortBy that calls the sortBy function
sortByElement.addEventListener("change",sortBy);
/* STRETCH */

// Consider adding a "Filter by" feature that allows users to filter the list of temples
// This will require changes to both the HTML and the JavaScript files
