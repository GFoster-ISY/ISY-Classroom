var theAssessment = new Assessment(getCurrentMonth());

function loadCalendar(){
    const body = document.querySelector(".isy-dialog-body");
    var CalendarDiv = createCalendar(false, theAssessment);
    body.appendChild(CalendarDiv);
}

window.onload = function () {
    loadCalendar();
}