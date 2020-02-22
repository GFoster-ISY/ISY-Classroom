var theAssessment = null;

function getAssessment(){
    return theAssessment;
 }
function loadCalendar(){
    theAssessment = new Assessment(getCurrentMonth());
    const body = document.querySelector(".isy-dialog-body");
    var CalendarDiv = createCalendar(false, activeDay);
    body.appendChild(CalendarDiv);
}

window.onload = function () {
    loadCalendar();
}