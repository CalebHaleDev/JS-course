/* Lesson 4 */
/* DATA */
const me = {
  name: "Caleb",
  photo: "images/caleb.jpg",
  favoriteFoods: ["pizza", "soup", "taco bell"],
  hobbies: ["YouTube","more YouTube","Writing"],
  placesLived: [{place: "Utah", length: "2 years"}, {place: "Idaho", length: "22 years"}],
}

/* OUTPUT */
document.querySelector("#name").innerHTML = me.name;  //difference between textContent?
const pagePhoto = document.querySelector("#photo")
pagePhoto.src = me.photo;
pagePhoto.alt = me.name;
// Step 1: Assign the value of the name property (of the object declared above) to the HTML <span> element with an ID of name
// Step 2: Assign the value of the photo property as the src attribute of the HTML <img> element with an ID of photo
// Step 3: Assign the value of the name property as the alt attribute of the HTML <img> element with an ID of photo

// Step 4: For each favorite food in the favoriteFoods property, create an HTML <li> element and place its value in the <li> element
// Step 5: Append the <li> elements created above as children of the HTML <ul> element with an ID of favorite-foods
// let favFoodHTMLList = "";
// me.favoriteFoods.forEach((food) => {favFoodHTMLList+=`<li>${food}</li>`});
// let favFoodListSpot = document.querySelector("#favorite-foods").innerHTML;
// favFoodListSpot += favFoodHTMLList;
/*  or  */
document.querySelector("#favorite-foods").innerHTML += me.favoriteFoods.reduce((html, food) => html+`<li>${food}</li>`,"");

// Step 6: Repeat Step 4 for each hobby in the hobbies property
// Step 7: Repeat Step 5 using the HTML <ul> element with an ID of hobbies
document.querySelector("#hobbies").innerHTML += me.hobbies.reduce((html, hobby) => html+`<li>${hobby}</li>`,"");

// Step 8: For each object in the <em>placesLived</em> property:
// - Create an HTML <dt> element and put its place property in the <dt> element
// - Create an HTML <dd> element and put its length property in the <dd> element
placesLivedTable = me.placesLived.reduce((html, entry) => html+`<dt>${entry.place}</dt><dd>${entry.length}</dd>` ,"");

// Step 9: Append the HTML <dt> and <dd> elements created above to the HTML <dl> element with an ID of places-lived
document.querySelector("#places-lived").innerHTML += placesLivedTable;