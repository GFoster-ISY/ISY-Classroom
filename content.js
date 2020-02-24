( function () {
	"use strict";
	
   var dateSelector = "[aria-label='Due date & time']";
   var dateInputSelector = "[aria-label='Due date & time'] input";
   var datePopupSelector = "table[role=presentation]";
   var studentDetailsSelector = ".isy-studentDetails"
   var theAssessment = new Assessment();
   var calendarDialog = createCalendarDialog();

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
      var dateText = theAssessment.getCalendar(activeDay).getDateText();
      var element = document.querySelector(dateInputSelector);
      element.value = dateText;
      // TODO add a dialog box here if the student data hasn't yet been loaded
      if (theAssessment.studentDataReceived){
         const activeCourse = theAssessment.setActiveCourse();
         const el = document.querySelector(studentDetailsSelector);
         el.innerHTML = activeCourse + " All " + activeCourse.getEnrolledStudentCount() + " students";
      }
   }
  
   function createCalendarDialog(){
      var dialog = createDialog(
         "ISY SUMMATIVE ASSIGNMENT",
         "isy-medium-logo",
         closeCalendarAction
      );
      var CalendarDiv = createCalendar(true, theAssessment);
      dialog.body.appendChild(CalendarDiv);

      return dialog;
   }


   function closeCalendarAction(div){
      div.parentNode.style.display = 'none';
   }

   function waitForLoad() {
      pollDOMExists(datePopupSelector, false, extendDateSelector);
   }

   function createDialog(title, iconClass, closeAction) {
      var div = document.createElement("div");
      div.classList = "isy-dialog";

      var header = document.createElement("div");
      header.classList = "isy-dialog-header";
      div.appendChild(header);

      var icon = document.createElement("i");
      icon.classList = iconClass;
      header.appendChild(icon);

      var titleEl = document.createElement("span");
      titleEl.classList = "isy-dialog-header-title";
      titleEl.innerText = title;

      header.appendChild(titleEl);

      var closebtn = document.createElement("span");
      closebtn.classList = "isy-dialog-close-button";
      closebtn.innerHTML = "&times;";
      closebtn.onclick = function() {
         closeAction(div);
      };
      header.appendChild(closebtn);

      var body = document.createElement("div");
      body.classList = "isy-dialog-body";
      div.appendChild(body);

      return {
         body: body,
         node: div
      };
   }

   waitForLoad();
})();
