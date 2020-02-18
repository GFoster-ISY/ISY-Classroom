function loadCalendar(){
    console.log("loadCalendar()");
    const body = document.querySelector(".isy-dialog-body");
    var CalendarDiv = createCalendar(false, new Date());
    body.appendChild(CalendarDiv);
}

window.onload = function () {
    loadCalendar();
}