function loadCalendar(){
    console.log("loadCalendar()");
    const body = document.querySelector(".isy-dialog-body");
    var CalendarDiv = createCalendar();
    body.appendChild(CalendarDiv);
    body.appendChild("ERROR");
}

window.onload = function () {
    loadCalendar(false);
}