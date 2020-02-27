function pollDOMExists (selector, success, callback, object = null){
    const el = document.querySelector(selector);
    if (el != null) {
       if (!success){
          if (object != null){
             object[callback](el);
          } else {
             callback(el);
          }
          success = true;
       }
    } else {
       success = false;
    }
    setTimeout(pollDOMExists, 300, selector, success, callback, object);
 }
 
 function pollDOMShown (selector, success, callback){
    const el = document.querySelector(selector);
    var hidden = false;
    if (el != null) {
       const parent = el.parentNode
       hidden =  window.getComputedStyle(parent).display === "none";
    }
    
    if (hidden){
       success = false;
    } else {
       if (!success){
          callback(el);
          success = true;
       }
    }
    setTimeout(pollDOMShown, 300, selector, success, callback);
 }

 
var activeDay = null;
function getActiveDate(n){
    if (activeDay == null){
        activeDay = new Calendar(new Date()).addSchoolDays(n);
    }
    return activeDay;
}

function getCurrentMonth(){
    getActiveDate(2); // TODO get the 2 from a user defined parameter
    return Calendar.months[activeDay.getMonth()];
 }

function getCalendarKey(date){
    return date.getFullYear() * 100 + date.getMonth();
}

function prevMonth(date){
   var prev = new Date(date.getFullYear(), date.getMonth(), 0);
   if (prev.getDate() < date.getDate()){
       return prev;
   }
   return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
}

function nextMonth(date){
   var next = new Date(date.getFullYear(), date.getMonth()+2, 0);
   if (next.getDate() < date.getDate()){
       return next;
   }
   return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
}