class DayLoad{
    constructor(date){
        this._date = date;
        this.totals = [0,0,0];
        this._freeStudents = [];
        this._availableStudents = [];
        this._busyStudents = [];
        this._finishedCalculating = false;
    }

    get day(){
        return this._day;
    }
    get finished(){
        return this._finishedCalculating;
    }

    get freeStudentCount(){
        return this._freeStudents[0];
    }
    get availableStudentCount(){
        return this._freeStudents[1];
    }
    get busyStudentCount(){
        return this._freeStudents[2];
    }
    get freeStudentList(){
        return this._freeStudents;
    }
    get availableStudentList(){
        return this._availableStudents;
    }
    get busyStudentList(){
        return this._busyStudents;
    }

    checkStudentLoad(StudentList){

    }

}