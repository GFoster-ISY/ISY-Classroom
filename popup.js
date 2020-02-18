function loadCalendar(){
    const body = document.querySelector(".isy-dialog-body");
    var activeDay = new Calendar(new Date()).addSchoolDays(2);
    var CalendarDiv = createCalendar(false, activeDay);
    body.appendChild(CalendarDiv);
}

window.onload = function () {
    loadCalendar();
}