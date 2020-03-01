var URL = "https://script.google.com/a/isyedu.org/macros/s/AKfycbw1cM8fnqav_mnJVLOC6F_h2U1dme7KhtE5l-rmioM/dev?action=";

function loadSchoolDays(){
    // Get a list of school days
    var url = this.URL + "calendar";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function () {
        storeSchoolDays(this);
    };
    xhttp.open("POST", url, true);
    xhttp.send();
}

function storeSchoolDays(xhttp){
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        var theAssessment = new Assessment();
        var list = JSON.parse(xhttp.responseText);
        theAssessment.saveSchoolDays(list);
        theAssessment.calendarDisplay = createCalendarDialog();
    }
}

function loadCourseList(){
    // Get a list of all courses
    var url = this.URL + "course";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function () {
        storeCourseList(this);
    };
    xhttp.open("POST", url, true);
    xhttp.send();
}

function storeCourseList(xhttp){
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        var list = JSON.parse(xhttp.responseText);
        var theAssessment = new Assessment();
        for (var id in list){
            var course =  new Course(id, list[id]);
            theAssessment._courseList[id] = course;
            theAssessment._courseIds.push(id);
        }
        loadStudentList(theAssessment._courseIds);
    }
}

function loadStudentList(ids){
    // set up the necessary data 
    var url  = this.URL + "course_student";
    // get the student ids from the classroom
    url += "&&ids=" + JSON.stringify(ids);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function () {
        storeStudentList(this);
    };
    xhttp.open("POST", url, true);
    xhttp.send();
}

function storeStudentList(xhttp){
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        var list = JSON.parse(xhttp.responseText);
        var theAssessment = new Assessment();
        for (var c in list){
            var course =  theAssessment.getCourse(c);
            course.createStudentList(list[c]);
        }
        this._studentDataReceived = true;
        loadStudentWorkLoadList();
    }
}

function loadStudentWorkLoadList(){
    var theAssessment = new Assessment();
    var url  = this.URL + "assessment_load";
    // get the active month
    url += "&&month=" + theAssessment.getCalendar().monthText;
    // get a list of student ids
    var ids = Object.keys(theAssessment.studentList);
    url += "&&ids=" + JSON.stringify(ids);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function () {
        storeStudentWorkLoad(this);
    };
    xhttp.open("POST", url, true);
    xhttp.send();
}

function storeStudentWorkLoad(xhttp){
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        var theAssessment = new Assessment();
        var list = JSON.parse(xhttp.responseText);
        var month = list.month;
        var load = list.load;
        var calendar = theAssessment.getCalendar(month);
        calendar.storeStudentLoad(load);
    }
}
