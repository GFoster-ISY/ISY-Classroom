class Calendar{

    static months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    static shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    static days = ["S","M","T","W","T","F","S"];

    constructor(date, theAssessment){
        this.workingDate = date;
        this._assessment = theAssessment;
        this._numberOfDays;
        this.getMonthData(date);
        this._dayDetails = {};
        this._finishedCalculating = false;
        this._displayingCalendar = false;
    }

    get workingDate(){
        return this._workingDate
    }

    setWorkingDay(day){
        this.workingDate = new Date (this._year, this._month, day);
    }

    set workingDate (date){
        this._workingDate = date;
        this._year = date.getFullYear();
        this._month = date.getMonth();
        this._monthText = Calendar.months[this._month];
        this._day = date.getDate();
    }

    getAssessment(){
        return this._assessment;
    }

    get year(){
        return this._year;
    }

    get month(){
        return this._month;
    }

    get day(){
        return this._day;
    }

    set day(day){
        this._day = day;
    }

    get monthText(){
        return this._monthText;
    }

    get calendarArray(){
        return this._calendarArray;
    }

    addSchoolDays (n){
        var day = this._day;
        while (n > 0){
            day++;
            if (this.isSchoolDay(day)){
                n--;
            }
        }
        return new Date(this._year, this._month, day);
    }

    isSchoolDay(day){
        // TODO calculate this from the calendar
        var date = new Date(this._year, this._month, day);
        if (date.getDay() == 0 || date.getDay() == 6){
            return false;
        }
        return true;
    }



    key(){
        return this._year * 100 + this._month;
    }
    
    getStats(day){
        const activeCourse = this.getAssessment().activeCourse;
        var stats = ['?','?','?'];
        if (this._dayDetails[day]){
            stats = this._dayDetails[day].getStats(activeCourse.enrolledStudents);
        } else {
            this._displayingCalendar = true; 
        }
        return stats;
    }

    getDateText(){
        return Calendar.shortMonths[this.month] + " " + this.day + ", " + this.year;
    }
    
    getMonthData(date){
        var monthData = [];
        monthData.push(Calendar.days);
        var firstDay = new Date(date.getFullYear(), this._month, 1);
        var lastDay = new Date(date.getFullYear(), this._month + 1, 0);
        var day1 = firstDay.getDay();
        this._numberOfDays = lastDay.getDate();
        var row = [];
        var date = 1;
        for (var i = 0 ; i < day1; i++){
           row.push("");
        }
        for (var i = day1; i < 7; i++){
           row.push(date);
           date++;
        }
        monthData.push(row);
    
        while (date < this._numberOfDays){
           row = [];
           for (var i = 0; i < 7; i++){
              if (date <= this._numberOfDays){
                 row.push(date);
              } else {
                 row.push("");
              }
              date++;
           }
           monthData.push(row);
        }
        this._calendarArray = monthData;
    }
    
    storeStudentLoad(load){
        for (var day in load){
            var dayLoad;
            if (day in this._dayDetails){
                dayLoad = this._dayDetails[day];
            } else {
                dayLoad = new DayLoad(day, this)
                this._dayDetails[day] = dayLoad;
            }
            dayLoad.storeStudentLoad(load[day])
        }
        pollDOMExists(".isy-calendar", false, "addLoadToCalendar", this);
        this._finishedCalculating = true;
    } // end of method storeStudentLoad

    addLoadToCalendar(){
        const activeCourse = this.getAssessment().activeCourse;
        for (var day = 1; day <= this._numberOfDays; day++){
            if (activeCourse){
                var stats;
                if (this._dayDetails[day]){
                    stats = this._dayDetails[day].getStats(activeCourse.enrolledStudents);
                } else {
                    stats = [activeCourse.getEnrolledStudentCount(),0,0]; 
                }
                for (var i = 0; i < 3; i++){
                    const elName = "isy-sal-" + i + "-" + day;
                    const el = document.getElementById(elName);
                    el.innerHTML = stats[i];
                }
                const elName = "isy-day-" + day;
                const el = document.getElementById(elName);
                if (stats[2] > 0){
                    el.className += " isy-day-busy";
                } else if(stats[1] > 0){
                    el.className += " isy-day-avaialble";
                } 
            }
        }
    } // end of addLoadToCalendar


} // end of class Calendar