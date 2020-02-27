( function () {
	"use strict";
	
   var dateSelector = "[aria-label='Due date & time']";
   var dateInputSelector = "[aria-label='Due date & time'] input";
   var datePopupSelector = "table[role=presentation]";
   var studentDetailsSelector = ".isy-studentDetails"
   var theAssessment = new Assessment();
   

    function extendDateSelector(calendarTable){
      var element = document.querySelector(dateSelector);
      var title = element.childNodes[0];
      title.classList.add("isy-injection");
      var calendarPopup = calendarTable.parentNode;
      calendarPopup.innerHTML = "";
      calendarPopup.appendChild(calendarDialog.node);
      pollDOMShown(".isy-dialog", false, getStudentLoad);
   }
  
   function getStudentLoad(el){
      var dateText = theAssessment.getCalendar().getDateText();
      var element = document.querySelector(dateInputSelector);
      element.value = dateText;
      // TODO add a dialog box here if the student data hasn't yet been loaded
      if (theAssessment.studentDataReceived){
         const activeCourse = theAssessment.setActiveCourse();
         const el = document.querySelector(studentDetailsSelector);
         el.innerHTML = activeCourse + " All " + activeCourse.getEnrolledStudentCount() + " students";
      }
   }
  
   function waitForLoad() {
      pollDOMExists(datePopupSelector, false, extendDateSelector);
      loadSchoolDays();
   }


   waitForLoad();
})();
