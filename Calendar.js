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

    get monthText(){
        return this._monthText;
    }

    get calendarArray(){
        return this._calendarArray;
    }

    prevMonth(){
        return new Date(this._year, this._month - 1, this._day);
    }

    nextMonth(){
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
