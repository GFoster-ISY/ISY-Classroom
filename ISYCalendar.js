function getMonthData(date){
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = date.getMonth();
    var monthText = months[month];
    var monthData = [];
    monthData.push(["S","M","T","W","T","F","S"]);
    var firstDay = new Date(date.getFullYear(), month, 1);
    var lastDay = new Date(date.getFullYear(), month + 1, 0);
    var day1 = firstDay.getDay();
    var dayend = lastDay.getDate();
    var row = [];
    var date = 1;
    for (var i = 0 ; i < day1; i++){
       row.push("");
    }
    for (var i = day1; i < 7; i++){
       row.push(date);
       date++;
    }
    monthData.push(row);

    while (date < dayend){
       row = [];
       for (var i = 0; i < 7; i++){
          if (date <= dayend){
             row.push(date);
          } else {
             row.push("");
          }
          date++;
       }
       monthData.push(row);
    }

    return {name : monthText,
            data : monthData};
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

   var calendar = createMonth(new Date());

   if (Interact){
      container.appendChild(assessmentType);
   }
   container.appendChild(studentSummary);
   container.appendChild(calendar);

   return container;
}

function createMonth(date){
   var monthlyData = getMonthData(date);
   var monthText = monthlyData.name;
   var monthData = monthlyData.data;

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
   headerCell.innerHTML = monthText;
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

   return container;
}
