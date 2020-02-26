class Assessment{

    constructor(){
        // Force Assessment to be a singleton class
        if (Assessment._instance){
            return Assessment._instance;
        }
        Assessment._instance = this;

        this._month = getCurrentMonth();
        this._courseList = {};
        this._courseWorkList = {};
        this._studentList = {};
        this._studentDataReceived = false;
        this._courseIds = [];
        this._calendar = {};
        this._activeCourses = {};
        this._activeCourse = null;
        loadCourseList();
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

    getCourse(id){
        return this._courseList[id];
    }

    getStudent(id){
        return this._studentList[id];
    }
    get studentList(){
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

    get activeCourse(){
        if (this._activeCourse){
            return this._activeCourse;
        }else {
            return this.setActiveCourse();
        }
    }
    
    setActiveCourse(){
        // Scrape the active class name from the HTML
        const courseSelector = "a[target=\"_blank\"][data-focus-id] span";
        const el = document.querySelector(courseSelector);
        if (el == null) { return null; }
        const className = el.innerHTML;
        for (var id in this._courseList){
            if (this._courseList[id].name == className){
                this._activeCourse = this._courseList[id];
                this._activeCourses [id] = this._courseList[id];
            }
        }
        return this._activeCourse;
    }



    getStudentLoad(){
        var month = getCurrentMonth();
    }
}