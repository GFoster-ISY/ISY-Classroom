class Calendar{

    constructor(date){
        this._workingDate = date;
        this._year = date.getFullYear();
        this.getMonthData(date);
        this._dayDetails = {};
        this._finishedCalculating = false;
        this._displayingCalendar = false;
        this._day = date.getDate();
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

    prevMonth(){
        var prev = new Date(this._year, this._month, 0);
        if (prev.getDate() < this._day){
            return prev;
        }
        return new Date(this._year, this._month - 1, this._day);
    }

    nextMonth(){
        var next = new Date(this._year, this._month+2, 0);
        if (next.getDate() < this._day){
            return next;
        }
        return new Date(this._year, this._month + 1, this._day);
    }

    key(){
        return this._year * 100 + this._month;
    }

    getMonthData(date){
        this._month = date.getMonth();
        this._monthText = Calendar.months[this._month];
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
    
    

}

Calendar.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
Calendar.days = ["S","M","T","W","T","F","S"];

var activeDay = null;
function getActiveDay(n){
    if (activeDay == null){
        activeDay = new Calendar(new Date()).addSchoolDays(n);
    }
    return activeDay;
}

function getCurrentMonth(){
    getActiveDay(2); // TODO get the 2 from a user defined parameter
    return Calendar.months[activeDay.getMonth()];
 }

