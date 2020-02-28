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
        this._schoolDays = {};
        this._nextAssessmentDate = getActiveDate(2);
        this._calendar = {};
        this._activeCourses = {};
        this._activeCourse = null;
        this._calendarDisplay = {body: null, node: null}; // this will be set up in SALDataInterchange::storeSchoolDays()
        loadCourseList();
    }

    get calendarDisplay(){
        return this._calendarDisplay;
    }

    set calendarDisplay(display){
        this._calendarDisplay = display;
    }
    
    getSchoolDay (year, month, day){
        var index = year*10000+(month+1)*100+day;
        if (index in this._schoolDays){
            return this._schoolDays[index];
        }
        return "";
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

    prevMonth(){
        this._nextAssessmentDate = prevMonth(this._nextAssessmentDate);
        return this.getCalendar();
    }
    nextMonth(){
        this._nextAssessmentDate = nextMonth(this._nextAssessmentDate);
        return this.getCalendar();
    }

    getCalendar(){
        var key = getCalendarKey(this._nextAssessmentDate);
        if (key in this._calendar){
           return this._calendar[key];
        }
        var newCalendar = new Calendar(this._nextAssessmentDate, this);
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

    saveSchoolDays(list){
        for (var id in list){
            this._schoolDays[id] = list[id];
        }
    }

    getStudentLoad(){
        var month = getCurrentMonth();
    }
}