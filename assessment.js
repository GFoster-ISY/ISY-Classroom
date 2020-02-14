
class Assessment{

    constructor(month, studentIDs){
        this.URL = "https://script.google.com/a/isyedu.org/macros/s/AKfycbw1cM8fnqav_mnJVLOC6F_h2U1dme7KhtE5l-rmioM/dev?action=";
        this._id_month = month;
        this._courseList = {};
        this._studentList = {};
        this.getCourseList();
        this.setStudentList(studentIDs);
        this._activeCourses = {};
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

    storeCourseList(xhttp){
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Scrape the active class name from the HTML
            const courseSelector = "a[target=\"_blank\"][data-focus-id] span";
            const el = document.querySelector(courseSelector);
            const className = el.innerHTML;
            console.log("Active class : "+className);

            console.log(xhttp.responseText);
            var list = JSON.parse(xhttp.responseText);
            console.log(list);
            for (var id in list){
                console.log(id + " : " + list[id]);
                var course =  new Course(id, list[id]);
                this._courseList[id] = course;
                if (list[id] == className){
                    this._activeCourses [id] = course;
                    console.log("Active Course " + id + " : " + list[id]);
                }
            }
        }
    }

    getCourseList(){
        // Get a list of all courses
        var url = this.URL + "course";
        var xhttp = new XMLHttpRequest();
        var assessmentObj = this;
        xhttp.onreadystatechange=function () {
            console.log("Response received: "+this);
            assessmentObj.storeCourseList(this);
        };
        console.log("URL: "+url);
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    storeStudentList(xhttp){
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            var list = JSON.parse(xhttp.responseText);
            console.log(list);
            for (var id in list){
                console.log(id + " : " + list[id]);
                this._studentList[id] = new Student(id, list[id]);
            }
        }
    }
    setStudentList(ids){
        // set up the necessary data 
        var url  = this.URL + "student";
        // get the student ids from the classroom


        // get the student details from the Google Sheet
        var DATA = "[32,55,27,18]";
        url = URL + "&&ids=" + DATA;
        var xhttp = new XMLHttpRequest();
        var assessmentObj = this;
        xhttp.onreadystatechange=function () {
            console.log("Response received: "+this);
            assessmentObj.storeStudentList(this);
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

}