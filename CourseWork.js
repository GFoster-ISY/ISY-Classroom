class CourseWork extends SALObject{
    constructor(id, name, course) {
        super(id, name);
        this._course = course;
    }

    get course(){
        return this._course;
    }

}