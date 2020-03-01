( function () {
	"use strict";
	
   var theAssessment = new Assessment();
   

    function extendDateSelector(calendarTable){
      var element = document.querySelector(dateSelector);
      var title = element.childNodes[0];
      title.classList.add("isy-injection");
      var calendarPopup = calendarTable.parentNode;
      calendarPopup.innerHTML = "";
      calendarPopup.appendChild(theAssessment.calendarDisplay.node);
      pollDOMShown(".isy-dialog", false, getStudentLoad);
   }
  
   function getStudentLoad(el){
      var dateText = theAssessment.getCalendar().getDateText();
      var element = document.querySelector(dateInputSelector);
      if (element != null){
         element.value = dateText;
      }
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
