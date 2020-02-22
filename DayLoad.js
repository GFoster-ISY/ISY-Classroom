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

    freeStudentCount(){
        return this._freeStudents.length;
    }
    availableStudentCount(){
        return this._availableStudents.length;
    }
    busyStudentCount(){
        return this._busyStudents.length;
    }
    freeStudentList(){
        return this._freeStudents;
    }
    availableStudentList(){
        return this._availableStudents;
    }
    busyStudentList(){
        return this._busyStudents;
    }

    getStats(){
        return [this.freeStudentCount(), this.availableStudentCount(), this.busyStudentCount()];
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
            this.checkStudentLoad();
            this._finishedCalculating = true;
        }
    }
    checkStudentLoad(){
        for (var studentID in this.getAssessment().getStudentList()){
            if (studentID in this._studentDetails){
                if (Object.keys(this._studentDetails[studentID]).length == 1){
                    this._availableStudents.push(studentID);
                } else {
                    this._busyStudents.push(studentID);
                }
            } else {
                this._freeStudents.push(studentID);
            }
        }
    }

}