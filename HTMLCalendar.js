function createCalendarDialog(){
   var dialog = createDialog(
      "ISY SUMMATIVE ASSIGNMENT",
      "isy-medium-logo",
      closeCalendarAction
   );
   var CalendarDiv = createCalendar(true);
   dialog.body.appendChild(CalendarDiv);

   return dialog;
} // end of function createCalendarDialog

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
} // end of function createDialog

function clearTitle(code){
   element = document.querySelector(assessmentTitle);
   var title = element.value;
   if (title.startsWith(code)){
      element.value = title.substr(code.length);
   }
}

function prependCodeToTitle(code, add){
   element = document.querySelector(assessmentTitle);
   var title = element.value;
   if (add){
      element.value = code + title;
      // fire off google's script to store this value
      element.dispatchEvent(new Event('input', { 'bubbles': true }))
   }
}

function closeCalendarAction(div){
   var theAssessment = new Assessment();
   var dateText = theAssessment.getCalendar().getDateText();
   
   var element = document.querySelector(dateInputSelector);
   element.value = dateText
   // fire off google's script to store the date
   element.dispatchEvent(new Event('blur', { 'bubbles': true }));

   element = document.querySelector(timeInputSelector);
   if (element.value == "11:59 PM"){
      document.querySelector(timeLabelSelector).dispatchEvent(new Event('click', { 'bubbles': true }));
      element.value = "6:00 pm";
      // fire off google's script to now store the time
      element.dispatchEvent(new Event('blur', { 'bubbles': true }));
   }
   

   const sum = "SUM: ";
   const hwrk = "HWRK: ";
   clearTitle(sum);
   clearTitle(hwrk);
   var checkbox = document.getElementById("isySummative");
   prependCodeToTitle(sum, checkbox.checked);
   checkbox = document.getElementById("isyHomework");
   prependCodeToTitle(hwrk, checkbox.checked);


   var div = theAssessment.calendarDisplay.node;
   div.parentNode.style.display = 'none';

   // wait for the assessment widow to be closed
   pollDOMDestroyed(assessmentWindowClosed);
} // end of function closeCalendarAction


function assessmentWindowClosed(){
   console.log("In assessmentWindowClosed");
   newAssessment();
}

function toggleCheckbox(event){
   var elements = document.getElementsByClassName("isy-checkbox");
   for(var i = 0; i < elements.length; i++) {
      if (elements[i] != event.toElement){
         elements[i].checked = false;
      }
   } 
}

function createCalendar(interact){
   theAssessment = new Assessment();
//   theAssessment.getStudentLoad();
   var container = document.createElement("div");
   container.classList = "isy-body";
   
   if (interact){
      var assessmentType = document.createElement("div");
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "isySummative";
      checkbox.value = "valueSummative"; 
      checkbox.id = "isySummative";
      checkbox.classList = "isy-checkbox";
      checkbox.addEventListener("click", toggleCheckbox);
         
      // creating label for checkbox 
      var label = document.createElement('label');
      label.htmlFor = "isySummative";
      label.appendChild(document.createTextNode('Summative.')); 
      assessmentType.appendChild(checkbox); 
      assessmentType.appendChild(label);
      container.appendChild(assessmentType);

      assessmentType = document.createElement("div");
      checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "isyHomework";
      checkbox.value = "valueHomework"; 
      checkbox.id = "isyHomework";
      checkbox.classList = "isy-checkbox";
      checkbox.addEventListener("click", toggleCheckbox);
         
      // creating label for checkbox 
      label = document.createElement('label');
      label.htmlFor = "isyHomework";
      label.appendChild(document.createTextNode('Homework.')); 
      assessmentType.appendChild(checkbox); 
      assessmentType.appendChild(label);
      container.appendChild(assessmentType);
    }

   var studentSummary = document.createElement("div");
   var details = document.createElement("p");
   details.classList = "isy-studentDetails";
   details.innerText = "x classes and y students";
   studentSummary.appendChild(details);

   var calendar = createMonth();

   container.appendChild(studentSummary);
   container.appendChild(calendar);

   return container;
} // end of function createCalendar

function createMonth(){
   var theAssessment = new Assessment();
   var calendarViewDate;
   // ***********
   // WHY the if (calendar ==  null)
   if (calendar == null){
      calendarViewDate = theAssessment.getCalendar();
   } else {
      calendarViewDate = calendar;
   }
   var yearText = calendarViewDate.year;
   var monthText = calendarViewDate.monthText;
   var monthData = calendarViewDate.calendarArray;
   var container = document.createElement("div");
   container.classList = "isy-calendar";

   var calendar = document.createElement('table');
   calendar.border = "1";
   calendar.style.borderCollapse = "collapse";
   calendar.classList = "isy-calendar-table"

   //Get the count of columns.
   var columnCount = 7;

   //Add the Month header row.
   var row = calendar.insertRow(-1);
   row.classList = "isy-calendar-month";
   var headerCell = document.createElement("TH");
   headerCell.classList = "isy-calendar-month-back"
   headerCell.innerHTML = "<";
   row.appendChild(headerCell);
   var headerCell = document.createElement("TH");
   headerCell.classList = "isy-calendar-month-text"
   headerCell.colSpan = 5;
   headerCell.innerHTML = monthText + " " + yearText;
   row.appendChild(headerCell);
   var headerCell = document.createElement("TH");
   headerCell.classList = "isy-calendar-month-forward"
   headerCell.innerHTML = ">";
   row.appendChild(headerCell);

   //Add the day header row.
   var row = calendar.insertRow(-1);
   row.classList = "isy-calendar-day";
   for (var i = 0; i < columnCount; i++) {
      var headerCell = document.createElement("TH");
      headerCell.innerHTML = monthData[0][i];
      row.appendChild(headerCell);
   }

   //Add the data rows.
   for (var i = 1; i < monthData.length; i++) {
      row = calendar.insertRow(-1);
      row.classList = "isy-calendar-date";
      for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            var day = monthData[i][j];
            cell.innerHTML = createDay(calendarViewDate.day, calendarViewDate.year, calendarViewDate.month, day);
      }
   }
   
   container.appendChild(calendar);
   document.addEventListener('click', function (event) {

      // If the clicked element doesn't have the right selector, bail
      if (!event.target.matches('.isy-calendar-month-back') &&
         !event.target.matches('.isy-calendar-month-forward') &&
         !event.target.matches('.isy-day') &&
         !event.target.matches('.isy-selected-day') &&
         !event.target.matches('.isy-sal-more')
         ) return;
   
      // Don't bubble the event (without this paging through the months happens multiple times)
      event.stopImmediatePropagation()
   
      if (event.target.matches('.isy-sal-more')){
         var day = event.target.id.substr(10);
         displaySALDetails(day);
         return;
      } else if (event.target.matches('.isy-day') || event.target.matches('.isy-selected-day')){
         var day = theAssessment.getCalendar().day;
         var el = document.getElementById('isy-selected-day-'+day);
         el.style.visibility = 'hidden';
         theAssessment.getCalendar().setWorkingDay(event.target.textContent);
         var day = theAssessment.getCalendar().day;
         var el = document.getElementById('isy-selected-day-'+day);
         el.style.visibility = 'visible';
         closeCalendarAction();
         return;
      } else if (event.target.matches('.isy-calendar-month-back') ){
         theAssessment.prevMonth();
      } else if (event.target.matches('.isy-calendar-month-forward')){
         theAssessment.nextMonth();
      }
      var calendar = createMonth();
      var el = document.querySelector('.isy-calendar');
      el.parentNode.replaceChild(calendar, el);
      theAssessment.getCalendar().addLoadToCalendar();
   
   }, false);

   return container;
} // end of function createMonth()

function createDay(activeDay, year, month, day){
   var theAssessment = new Assessment();
//   var loadStats = theAssessment.getCalendar().getStats(day);
   var loadStats = ['?','?','?'];
   var cell;
   if (day != ""){
      var ttDay = theAssessment.getSchoolDay(year, month, day);
      var cssTTDayColour = "";
      var cssDayColour = "";
      if (ttDay == "Day 1"){
         cssTTDayColour = "isy-day-1"
      } else if (ttDay == "Day 2"){
            cssTTDayColour = "isy-day-2"
      } else if (ttDay == "Holiday"){
         cssTTDayColour = "isy-holiday";
         cssDayColour = "isy-holiday";
      } else if (ttDay == "Day 0"){
         cssTTDayColour = "isy-day-0";
      }
      cell = '<div class=isy-day-container><div id="isy-tt-day-"' + day + ' class="isy-tt-day '+ cssTTDayColour +'">'+ ttDay +'</div>';
      if (day == activeDay){
         cell += '<div id="isy-selected-day-' + day + '" class="isy-selected-day">' + day + '</div>';
      } else {
         cell += '<div id="isy-selected-day-' + day + '" class="isy-selected-day isy-hidden">' + day + '</div>';
      }
      cell += '<div id="isy-day-' + day + '" class="isy-day '+ cssDayColour +'">' + day + '</div>';
      cell += '<div id="isy-sal-0-' + day + '" class="isy-sal-0">' + loadStats[0] + '</div>';
      cell += '<div id="isy-sal-1-' + day + '" class="isy-sal-1">' + loadStats[1] + '</div>';
      cell += '<div id="isy-sal-2-' + day + '" class="isy-sal-2">' + loadStats[2] + '</div>';   
      cell += '</div>'
   } else {
      cell = '<div class=isy-empty-day-container>';
   }
   return cell
} // end of function createDay()

function closeSALDetailsAction(div){
   var div = theAssessment.SALDetailsDisplay.node;
   var cdiv = theAssessment.calendarDisplay.node;
   cdiv.parentNode.style.display = 'block';
   cdiv.parentNode.style.visibility = "visible";
   var element = document.querySelector(dateSelector);
   element.style.display = 'block';
   element.style.visibility = "visible";
   
   div.style.visibility = 'hidden';   
} // end of function closeSALDetailsAction

function displaySALDetails(day){
   var div = SALDetails (day);
   var el = document.querySelector('.isy-SAL-details');
   if (el){
      theAssessment.SALDetailsDisplay.body.replaceChild(div, el);
   } else {
      theAssessment.SALDetailsDisplay.body.appendChild(div);
   }
   theAssessment.SALDetailsDisplay.node.style.display = 'block';
   theAssessment.SALDetailsDisplay.node.style.visibility = "visible";
} // end of function displaySALDetails

function SALDetails(day){
   var container = document.createElement("div");
   container.classList = "isy-SAL-details";

   var details = document.createElement('table');
   details.border = "1";
   details.style.borderCollapse = "collapse";
   details.classList = "isy-SAL-details-table"

   //Add the SAL Details header row.
   var row = details.insertRow(-1);
   row.classList = "isy-SAL-details-header";
   var headerCell = document.createElement("TH");
   headerCell.innerHTML = "Student Name";
   row.appendChild(headerCell);
   var headerCell = document.createElement("TH");
   headerCell.innerHTML = "Load";
   row.appendChild(headerCell);
   var headerCell = document.createElement("TH");
   headerCell.innerHTML = "Course Details";
   row.appendChild(headerCell);

   //Add the data rows.
   var dayDetails = theAssessment.getCalendar()._dayDetails[day];
   if (dayDetails){
      addStudentLoadRows(details, dayDetails, dayDetails.busyStudentList(), "isy-SAL-details-busy");
      addStudentLoadRows(details, dayDetails, dayDetails.availableStudentList(), "isy-SAL-details-available");
      addStudentLoadRows(details, dayDetails, dayDetails.freeStudentList(), "isy-SAL-details-free");
   } else {
      var list = [];
      for (id in theAssessment.activeCourse.enrolledStudents){
         list.push(id);
      }
      addStudentLoadRows(details, dayDetails, list, "isy-SAL-details-free");
   }

   container.appendChild(details);
   return container;
} // end of function SALDetails

function addStudentLoadRows(htmlTable, dayDetails, list, classes){
   for (var id = 0; id < list.length; id++) {
      var studentID = list[id];
      if (studentID in theAssessment.activeCourse.enrolledStudents){
         if (dayDetails){
            var SALdetails  = dayDetails.getStudentDetails(studentID);
         } else {
            var SALdetails  = {name: theAssessment.activeCourse.enrolledStudents[studentID].name,
                               load: 0,
                               details: []
                              }
         }
         row = htmlTable.insertRow(-1);
         row.classList = classes;
         var cell = row.insertCell(-1);
         cell.innerHTML = "<p>"+SALdetails.name+"</p>";
         var cell = row.insertCell(-1);
         cell.innerHTML = "<p>"+SALdetails.load+"</p>";
         var cell = row.insertCell(-1);
         if (SALdetails.details.length){
            cell.innerHTML = "<p>";
            for (var a = 0; a < SALdetails.details.length-1; a++){
               var workLoadString = SALdetails.details[a].name;
               cell.innerHTML += workLoadString+", ";
            }
            var workLoadString = SALdetails.details[SALdetails.details.length-1].name;
            cell.innerHTML += workLoadString+"</p>";
         }
      }
   }
} // end of function addStudentLoadRows()