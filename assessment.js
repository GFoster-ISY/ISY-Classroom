
class Assessment{

    constructor(month){
        this.URL = "https://script.google.com/a/isyedu.org/macros/s/AKfycbw1cM8fnqav_mnJVLOC6F_h2U1dme7KhtE5l-rmioM/dev?action=";
        this._month = month;
        this._courseList = {};
        this._studentList = {};
        this.getCourseList();
        this._courseIds = [];
        this._activeCourses = {};
        this._activeCourse = "";
    }

    get month(){
        return this._month;
    }
    set name(month){
        this._month = month;
    }

    getStudent(id){
        return this._studentList[id];
    }
    getStudentList(){
        return this._studentList;
    }

    setActiveCourse(){
            // Scrape the active class name from the HTML
            const courseSelector = "a[target=\"_blank\"][data-focus-id] span";
            const el = document.querySelector(courseSelector);
            const className = el.innerHTML;
            this._activeCourse = className;
            console.log("Active class : "+className);
            for (var id in this._courseList){
                if (this._courseList[id].name == className){
                    this._activeCourses [id] = this._courseList[id];
                    console.log("Active Course " + id + " : " + list[id]);
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
            this.setStudentLists(this._courseIds);
        }
    }

    getCourseList(){
        // Get a list of all courses
        var url = this.URL + "course";
        var xhttp = new XMLHttpRequest();
        var assessmentObj = this;
        xhttp.onreadystatechange=function () {
            assessmentObj.storeCourseList(this);
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    storeStudentList(xhttp){
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var list = JSON.parse(xhttp.responseText);
            for (var c in list){
                var course =  this._courseList[c];
                course.createStudentList(list[c]);
            }
        }
    }

    setStudentLists(ids){
        // set up the necessary data 
        var url  = this.URL + "course_student";
        // get the student ids from the classroom
        url += "&&ids=" + JSON.stringify(ids);
        var xhttp = new XMLHttpRequest();
        var assessmentObj = this;
        xhttp.onreadystatechange=function () {
            assessmentObj.storeStudentList(this);
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

}