class DayLoad{
    constructor(day, calendar){
        this._day = day;
        this._calendar = calendar;
        this.totals = [0,0,0];
        this._studentDetails = {};
        this._freeStudents = [];
        this._availableStudents = [];
        this._busyStudents = [];
        this._finishedCalculating = false;
    }

    
    
    get day(){
        return this._day;
    }
    get calendar(){
        return this._calendar;
    }

    getAssessment(){
        return this._calendar.getAssessment();
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

    storeStudentLoad(load){
        for (var studentID in load){
            var loadDetails;
            if (studentID in this._studentDetails){
                loadDetails = this._studentDetails[studentID];
            } else {
                var student = this.getAssessment().getStudent(studentID);
                loadDetails = new LoadDetails(student, this);
                this._studentDetails[studentID] = loadDetails;
            }
            loadDetails.storeStudentLoad(load[studentID]);
        }
    }
    checkStudentLoad(StudentList){

    }

}