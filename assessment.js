class Assessment{

    constructor(month){
        this.URL = "https://script.google.com/a/isyedu.org/macros/s/AKfycbw1cM8fnqav_mnJVLOC6F_h2U1dme7KhtE5l-rmioM/dev?action=";
        this._month = month;
        this._courseList = {};
        this._courseWorkList = {};
        this._studentList = {};
        this._studentDataReceived = false;
        this.loadCourseList();
        this._courseIds = [];
        this._calendar = {};
        this._activeCourses = {};
        this._activeCourse = null;
    }

    get month(){
        return this._month;
    }

    set name(month){
        this._month = month;
    }
    get studentDataReceived(){
        return this._studentDataReceived
    }

    getStudent(id){
        return this._studentList[id];
    }
    getStudentList(){
        return this._studentList;
    }


    getCalendar(date){
        var key = getCalendarKey(date);
        if (key in this._calendar){
           return this._calendar[key];
        }
        var newCalendar = new Calendar(date, this);
        this._calendar[key] = newCalendar;
        return newCalendar;
     }

    setActiveCourse(){
        // Scrape the active class name from the HTML
        const courseSelector = "a[target=\"_blank\"][data-focus-id] span";
        const el = document.querySelector(courseSelector);
        const className = el.innerHTML;
        for (var id in this._courseList){
            if (this._courseList[id].name == className){
                this._activeCourse = this._courseList[id];
                this._activeCourses [id] = this._courseList[id];
            }
        }
        return this._activeCourse;
    }

    storeCourseList(xhttp){
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var list = JSON.parse(xhttp.responseText);
            for (var id in list){
                var course =  new Course(id, list[id]);
                this._courseList[id] = course;
                this._courseIds.push(id);
            }
            this.loadStudentList(this._courseIds);
        }
    }

    loadCourseList(){
        // Get a list of all courses
        var url = this.URL + "course";
        var xhttp = new XMLHttpRequest();
        var assessmentObj = this;
        xhttp.onreadystatechange=function () {
            assessmentObj.storeCourseList(this);
        };
        xhttp.open("POST", url, true);
        xhttp.send();
    }

    storeStudentList(xhttp){
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var list = JSON.parse(xhttp.responseText);
            for (var c in list){
                var course =  this._courseList[c];
                course.createStudentList(this._studentList, list[c]);
            }
            this._studentDataReceived = true;
            this.loadStudentWorkLoadList(this._studentList);
        }
    }

    loadStudentList(ids){
        // set up the necessary data 
        var url  = this.URL + "course_student";
        // get the student ids from the classroom
        url += "&&ids=" + JSON.stringify(ids);
        var xhttp = new XMLHttpRequest();
        var assessmentObj = this;
        xhttp.onreadystatechange=function () {
            assessmentObj.storeStudentList(this);
        };
        xhttp.open("POST", url, true);
        xhttp.send();
    }

    storeStudentWorkLoad(xhttp){
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var list = JSON.parse(xhttp.responseText);
            var calendar = this.getCalendar(getActiveDate());
            calendar.storeStudentLoad(list);
        }
    }

    loadStudentWorkLoadList(list){
        // TODO Call to google sheet to get the studnet load for each student in _studnetList
        var url  = this.URL + "assessment_load";
        // get the active month
        getActiveDate();
        url += "&&month=" + getCurrentMonth();
        // get a list of student ids
        var ids = Object.keys(this._studentList);
        url += "&&ids=" + JSON.stringify(ids);
        var xhttp = new XMLHttpRequest();
        var assessmentObj = this;
        xhttp.onreadystatechange=function () {
            assessmentObj.storeStudentWorkLoad(this);
        };
        xhttp.open("POST", url, true);
        xhttp.send();
    }

    getStudentLoad(){
        var month = getCurrentMonth();
    }
}