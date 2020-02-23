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
        // parameter: load is a map {courseID: courseWorkID}
        for (var courseID in load){
            var course;
            if (courseID in this.getAssessment()._courseList){
                course = this.getAssessment()._courseList[courseID];
            } else {
                course = new Course(load[1]);
                this.getAssessment()._courseList[courseID] = course;
            }
    
            var courseWork;
            if (load[courseID] in this.getAssessment()._courseWorkList){
                courseWork = this.getAssessment()._courseWorkList[load[courseID]];
            } else {
                courseWork = new CourseWork(load[courseID], course);
            }
            this.addAssessment(courseWork);    
        }
    } // end of method storeStudentLoad

} // end of class loadDetails