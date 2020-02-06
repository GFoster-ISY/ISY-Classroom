( function () {
	"use strict";
	
	var dateSelector = "[aria-label='Due date & time']";
	var datePopupSelector = "table[role=presentation]";
   var calendarDialog = createCalendarDialog();

   function pollDOMExists (selector, success, callback){
      const el = document.querySelector(selector);
      if (el != null) {
         if (!success){
            callback(el);
            success = true;
         }
      } else {
         success = false;
      }
      setTimeout(pollDOMExists, 300, selector, success, callback);
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

   function extendDateSelector(element){
      var title = element.childNodes[0];
      title.classList.add("isy-injection");
      var calendarTable = document.querySelector(datePopupSelector);
      if (!calendarTable)
         return;
      var calendarPopup = calendarTable.parentNode;
      calendarPopup.innerHTML = "";
      calendarPopup.appendChild(calendarDialog.node);
      pollDOMShown(".isy-dialog", false, createNewAssessment);

   }
  
   function createNewAssessment(el){
      // TODO get the studnet id from the classroom and stor these in studentIDs
      console.log("ISY-EDITOR Seen");
      console.log("Getting the data from the Google Sheet");
      var studentIDs = [3,6,8];
      var studentList = new Assessment("February",studentIDs);
      console.log(studentList.getStudentList())
   }

   function createCalendarDialog(){
      var dialog = createDialog(
         "ISY SUMMATIVE ASSIGNMENT",
         "isy-medium-logo",
         closeCalendarAction
      );
      var iframe = document.createElement("iframe");
      var myContent = '<!DOCTYPE html>'
      + '<html><head><title>SUMMATIVE ASSIGNMENT</title></head>'
      + '<body  id="ISY-EDITOR"><p>We need some stuff here</p></body></html>';

      iframe.classList = "isy-editor";
      iframe.src="javascript:'"+myContent+"'";
      dialog.body.appendChild(iframe);

      return dialog;
   }

   function closeCalendarAction(div){
      div.parentNode.style.display = 'none';
   }

   function waitForLoad() {
      pollDOMExists(dateSelector, false, extendDateSelector);
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