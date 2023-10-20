//document.addEventListener("keydown", logKey);
document.querySelector("#submitButton").addEventListener("click",clickHandler);

function clickHandler(){
    //console.log("clickHandler called");
  displayGPA(calculateGPA(getGrades()));
}

function getGrades() {
    // console.log("getting Grades...");
  gradeInput = document.querySelector("#grades").value; //get grades from the input box
  grades = cleanInput(gradeInput); //what if there isn't a comma?
  return grades;
    // return uppercase grade letter list
}

function cleanInput(input){
  return input.split(",").map(item => item.trim().toUpperCase());
}

function convertToGPA(gradeLetter){
  const gradeChart = {'A':4.0, 'B':3.0, 'C':2.0, 'D':1.0, 'F':0};
  return gradeChart[gradeLetter];
}

function calculateGPA(cleanLetterGrades){
  gpaList = cleanLetterGrades.map(letter => convertToGPA(letter));
    console.log("gpas are:",gpaList);
  totalGPAPoints = gpaList.reduce((sum, gpaNumber) => sum+gpaNumber, 0);
  averageGPA = Math.round(100*totalGPAPoints/gpaList.length)/100; //the 100s scale the rounding to target the hundredths place
  return averageGPA;
}

function displayGPA(gpa){
  document.querySelector("#output").textContent = gpa;
} //passing in a selector to change where it displays would be better
/**
 * outputGpa(gpa, "#output");
 * 
 * function outputGpa(gpa, selector) {
 * const outputElement = document.querySelector(selector);
  outputElement.innerText = gpa;
 }
 */