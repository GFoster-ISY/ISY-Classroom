class CourseWork extends SALObject{
    constructor(id, name = "SUM: " + course.name, course) {
        super(id, name);
        this._course = course;
    }

    get course(){
        return this._course;
    }

}