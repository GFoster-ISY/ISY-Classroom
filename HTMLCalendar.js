var calendarViewDate;
var calendarList = {};

function getCalendarDate(date){
   newCalendar = new Calendar(date);
   var key = newCalendar.key();
   if (key in calendarList){
      return calendarList[key];
   }

   calendarList[key] = newCalendar;
   return newCalendar;
}

function createCalendar(Interact){
   var container = document.createElement("div");
   container.classList = "isy-body";
   
   if (Interact){
      var assessmentType = document.createElement("div");
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "isySummative";
      checkbox.value = "valueSummative"; 
      checkbox.id = "isySummative";
      checkbox.classList = "isy-checkbox";
         
      // creating label for checkbox 
      var label = document.createElement('label');
      label.htmlFor = "isySummative";
      label.appendChild(document.createTextNode('Summative.')); 
      assessmentType.appendChild(checkbox); 
      assessmentType.appendChild(label);   
    }

   var studentSummary = document.createElement("div");
   var details = document.createElement("p");
   details.classList = "isy-studentDetails";
   details.innerText = "x classes and y students";
   studentSummary.appendChild(details);

   calendarViewDate = getCalendarDate(new Date());
   var calendar = createMonth();

   if (Interact){
      container.appendChild(assessmentType);
   }
   container.appendChild(studentSummary);
   container.appendChild(calendar);

   return container;
}

function createMonth(){
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
            cell.innerHTML = monthData[i][j];
      }
   }
   
   container.appendChild(calendar);
   document.addEventListener('click', function (event) {

      // If the clicked element doesn't have the right selector, bail
      if (!event.target.matches('.isy-calendar-month-back') &&
         !event.target.matches('.isy-calendar-month-forward')
         ) return;
   
      // Don't bubble the event (without this paging through the months happens multiple times)
      event.stopImmediatePropagation()
   
      if (event.target.matches('.isy-calendar-month-back') ){
         calendarViewDate = getCalendarDate(calendarViewDate.prevMonth());
      } else if (event.target.matches('.isy-calendar-month-forward')){
         calendarViewDate = getCalendarDate(calendarViewDate.nextMonth());
      }
      var calendar = createMonth();
      var el = document.querySelector('.isy-calendar');
      el.parentNode.replaceChild(calendar, el);
   
   }, false);

   return container;
}