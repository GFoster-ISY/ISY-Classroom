class Assessment{

    constructor(){
        // Force Assessment to be a singleton class
        if (Assessment._instance){
            return Assessment._instance;
        }
        Assessment._instance = this;

        this._nextAssessmentDate = this.initActiveDay();
        this._courseList = {};
        this._courseWorkList = {};
        this._studentList = {};
        this._studentDataReceived = false;
        this._courseIds = [];
        this._schoolDays = {};
        this._calendar = {};
        this._activeCourses = {};
        this._activeCourse = null;
        this._SALDetailsDisplay = this.initSALDetailsDisplay(); // this will be set up in HTMLCalendar::displaySALDetails()
        this._calendarDisplay = {body: null, node: null}; // this will be set up in SALDataInterchange::storeSchoolDays()
        loadCourseList();
    }

    get activeDay(){
        return this._nextAssessmentDate;
    }

    initActiveDay(){
        var n = 2; // parameterise the 2
        return new Calendar(new Date()).addSchoolDays(n)
    }

    initSALDetailsDisplay(){
        var dialog = createDialog(
            "ISY STUDENT ASSESSMENT LOAD Details",
            "isy-medium-logo",
            closeSALDetailsAction
         );
         dialog.node.style.display = 'none';   
         return dialog;
    }

    get SALDetailsDisplay(){
        return this._SALDetailsDisplay;
    }

    set SALDetailsDisplay(display){
        this._SALDetailsDisplay = display;
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

    currentMonth(){
        var calendar = this.getCalendar();
        return calendar;
    }

    prevMonth(){
        this._nextAssessmentDate = prevMonth(this._nextAssessmentDate);
        var calendar = this.getCalendar();
        return calendar;
    }
    nextMonth(){
        this._nextAssessmentDate = nextMonth(this._nextAssessmentDate);
        var calendar = this.getCalendar();
        return calendar;
    }

    getCalendar(month = null){
        var key;
        var theDate = this._nextAssessmentDate;
        var calendar;
        if (month != null){
            theDate = new Date(theDate.getFullYear(), Calendar.monthIndex[month]);
        }
        key = getCalendarKey(theDate);
        if (key in this._calendar){
            calendar = this._calendar[key];
        } else {
            calendar = new Calendar(theDate, this);
            this._calendar[key] = calendar;
            if (!isEmpty(this.studentList)){
                loadStudentWorkLoadList();
            }
        }
        return calendar;
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
        var month = this.getCalendar().month;
    }
}