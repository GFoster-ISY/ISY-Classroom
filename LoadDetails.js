class LoadDetails{
    constructor(student, dayLoad){
        this._student = student;
        this._dayLoad = dayLoad;
        this._assessments = [];
    }

    get student(){
        return this._student;
    }

    getAssessment(){
        return this._dayLoad.getAssessment();
    }

    
    addAssessment(courseWork){
        if (!this._assessments.includes(courseWork)){
            this._assessments.push(courseWork);
        }
    }

    get loadTotal(){
        return this._assessments.length;
    }

    get loadDetails(){
        return this._assessments;
    }

    storeStudentLoad(load){
        // parameter: load array {courseID, courseWorkID}
        var course;
        if (load[0] in this.getAssessment()._courseList){
            course = this.getAssessment()._courseList[load[1]];
        } else {
            course = new Course(load[1]);
        }

        var courseWork;
        if (load[1] in this.getAssessment()._courseWorkList){
            courseWork = this.getAssessment()._courseWorkList[load[1]];
        } else {
            courseWork = new CourseWork(load[1], course);
        }
        this.addAssessment(courseWork);
    } // end of method storeStudentLoad

} // end of class loadDetails