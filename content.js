( function () {
	"use strict";
	var gcUI = {};
	
	var dateSelector = "[aria-label='Due date & time']";
	var activeSelector = null;
	var datePopupSelector = "table[role=presentation]";
	var AssessmentShown = false;

 
  function pollDOM (){
    console.log("ISY Classroom - looking for " + activeSelector);
	const el = document.querySelector(activeSelector);
	if (el != null) {
		console.log("ISY Classroom - " + activeSelector + " found.");
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
	console.log(element);
	var title = element.childNodes[0];
	title.classList.add("isy-injection");
	var calendarTable = document.querySelector(datePopupSelector);
	if (!calendarTable)
		return;
	var calendarPopup = calendarTable.parentNode;
	calendarPopup.innerHTML = "";
	
	var dialog = createDialog(
      "ISY SUMMATIVE ASSIGNMENT",
      "isy-logo",
      null,
      null
    );
    var iframe = document.createElement("iframe");
	var myContent = '<!DOCTYPE html>'
    + '<html><head><title>SUMMATIVE ASSIGNMENT</title></head>'
    + '<body><p>We need some stuff here</p></body></html>';

	iframe.classList = "isy-editor";
	iframe.src="javascript:'"+myContent+"'";
    dialog.body.appendChild(iframe);
    calendarPopup.appendChild(dialog.node);
	
  }
  


  function waitForLoad() {
	console.log("ISY Classroom - wait for chrome extension to load");
	activeSelector = dateSelector;
	pollDOM();
  }

  function createDialog(title, iconClass, backgroundColor, textColor) {
    backgroundColor =
      backgroundColor ||
      window
        .getComputedStyle(document.querySelector("nav"))
        .getPropertyValue("background-color");
    textColor =
      textColor ||
      window
        .getComputedStyle(document.querySelector("nav h1"))
        .getPropertyValue("color");

    var div = document.createElement("div");
    div.classList = "isy-dialog";

    var header = document.createElement("div");
    header.classList = "isy-dialog-header";
    header.style.backgroundColor = backgroundColor;
    div.appendChild(header);

    var icon = document.createElement("i");
    icon.classList = iconClass;
    header.appendChild(icon);

    var titleEl = document.createElement("span");
    titleEl.classList = "isy-dialog-header-title";
    titleEl.innerText = title;
    titleEl.style.color = textColor;

    header.appendChild(titleEl);

    var closebtn = document.createElement("span");
    closebtn.classList = "isy-dialog-close-button";
    closebtn.style.color = textColor;
    closebtn.innerHTML = "&times;";
    closebtn.onclick = function() {
      div.parentNode.removeChild(div);
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