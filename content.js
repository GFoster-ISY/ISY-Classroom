( function () {
	"use strict";
	
	var dateSelector = "[aria-label='Due date & time']";
	var activeSelector = null;
	var datePopupSelector = "table[role=presentation]";
   var AssessmentShown = false;
   var calendarDialog = createCalendarDialog();

 
   function pollDOM (){
      const el = document.querySelector(activeSelector);
      if (el != null) {
         if (!AssessmentShown){
            extendDateSelector(el);
            AssessmentShown = true;
         }
      } else {
         AssessmentShown = false;
      }
      setTimeout(pollDOM, 300);
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
      + '<body><p>We need some stuff here</p></body></html>';

      iframe.classList = "isy-editor";
      iframe.src="javascript:'"+myContent+"'";
      dialog.body.appendChild(iframe);
      return dialog;
   }

   function closeCalendarAction(div){
      div.parentNode.style.display = 'none';
   }

   function waitForLoad() {
      activeSelector = dateSelector;
      pollDOM();
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