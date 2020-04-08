( function () {
	"use strict";
	
   var theAssessment = new Assessment();
   
   // Testing to inject the calendar for due date but not schedule date
   function injectISYCalendar(calendarTable){
      // The popup calendar has appeared in the HTML,
      // we only want to inject the ISY calendar if it is a due date
      // That is use the old calendar if the user is asing to schedule the task
      pollDOMShown(dateSelector, false, dueDateRequest);
   }
   function dueDateRequest(element){
      if (element == null){
         return;
      }
      document.body.appendChild(theAssessment.SALDetailsDisplay.node);
      var calendarTable = document.querySelector(datePopupSelector);
      var title = element.childNodes[0];
      title.classList.add("isy-injection");
      var calendarPopup = calendarTable.parentNode;
      calendarPopup.innerHTML = ""; // replace the Google Calendar with the ISY Calendar
      calendarPopup.appendChild(theAssessment.calendarDisplay.node);
      pollDOMShown(".isy-dialog", false, getStudentLoad);
   }
  
   function getStudentLoad(el){
      var dateText = theAssessment.getCalendar().getDateText();
      var element = document.querySelector(dateInputSelector);
      if (element != null){
         element.value = dateText;
      }
      //TODO  add a dialog box here if the student data hasn't yet been loaded
      if (theAssessment.studentDataReceived){
         const activeCourse = theAssessment.setActiveCourse();
         const el = document.querySelector(studentDetailsSelector);
         el.innerHTML = activeCourse + " All " + activeCourse.getEnrolledStudentCount() + " students";
      }
   }
  
   function waitForLoad() {
      pollDOMExists(datePopupSelector, false, injectISYCalendar); //extendDateSelector);
      loadSchoolDays();
   }


   waitForLoad();
})();
