class CourseWork extends SALObject{
    constructor(id, name = null, course) {
        if (name == null){
            name = "SUM: " + course.name;
        }
        super(id, name);
        this._course = course;
    }

    get course(){
        return this._course;
    }

}