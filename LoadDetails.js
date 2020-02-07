class LoadDetails{
    constructor(student){
        this._student = student;
        this._assessments = [];
    }

    get student(){
        return this._student;
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
}