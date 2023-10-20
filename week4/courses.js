const aCourse = {
  code: "CSE121b",
  name: "Javascript Language",
  sections: [{ sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro T'},
{ sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'TTh', instructor: 'Sis A'}],
  enrollStudent(sectionToAdd){
    //this.sections[sectionToAdd] wouldn't work, would use value for index
    let sectionIndex = this.sections.findIndex((section) => section.sectionNum == sectionToAdd);
    if (sectionIndex!=-1){
      this.sections[sectionIndex].enrolled++;
      displaySections(this.sections);
    }
  },
  dropStudent(sectionToDrop){
    //this.sections[sectionToAdd] wouldn't work, would use value for index
    let sectionIndex = this.sections.findIndex((section) => section.sectionNum == sectionToDrop);
    if (sectionIndex!=-1){
      this.sections[sectionIndex].enrolled--;
      displaySections(this.sections);
    }
  },
  changeEnrollmentOf(sectionToToggle, action){
    let sectionIndex = this.sections.findIndex((section) => section.sectionNum == sectionToToggle);
    if (sectionIndex!=-1){
      this.sections[sectionIndex].enrolled += (action == "enroll" ? 1 : (action == "drop" ? -1 : 0));
      displaySections(this.sections);
    }
  }
};


const displayCourseLabel = (course) =>{
  document.querySelector("#courseName").innerHTML = course.name;
  document.querySelector("#courseCode").innerHTML = course.code;
}

const displaySections = (sections) =>{
  const outputSpot = document.querySelector("#sections");
  const html = sections.map(sectionTemplate);
  outputSpot.innerHTML = html.join("");
}

function sectionTemplate(section) {
  return `<tr>
  <td>${section.sectionNum}</td>
  <td>${section.roomNum}</td>
  <td>${section.enrolled}</td>
  <td>${section.days}</td>
  <td>${section.instructor}</td>
  </tr>`;
}

function enrollButtonClicked(eventInfo) {
  infoBox = document.querySelector("#sectionNumber");
  aCourse.enrollStudent(infoBox.value);
}

function dropButtonClicked(eventInfo) {
  infoBox = document.querySelector("#sectionNumber");
  aCourse.dropStudent(infoBox.value);
}

document.querySelector("#enrollStudent").addEventListener('click', enrollButtonClicked);
document.querySelector("#dropStudent").addEventListener('click', dropButtonClicked);

displaySections(aCourse.sections);