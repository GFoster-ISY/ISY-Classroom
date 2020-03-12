var dateSelector = "[aria-label='Due date & time']";

var dateInputSelector = "[aria-label='Due date']";
var timeLabelSelector = "[aria-label='Add due time']";
var timeInputSelector = "[aria-label='Due time']";

var datePopupSelector = "table[role=presentation]";
var studentDetailsSelector = ".isy-studentDetails";
var assessmentTitle = "[aria-label='Title']";
// var assignmentWindow = "div[.='Assignment']"; // doesn't work in javascript :(

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
      //const parent = el.parentNode
      hidden =  window.getComputedStyle(el).display === "none";
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

function pollDOMDestroyed (callback){
   if ([].slice.call(document.querySelectorAll("div")).filter(function (item){
         return item.innerText.includes("Assignment");
      }).length==0
   ) {
      callback();
   } else {
      setTimeout(pollDOMDestroyed, 300, callback);
   }
}

function isEmpty(obj) {
   for(var key in obj) {
       if(obj.hasOwnProperty(key))
           return false;
   }
   return true;
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