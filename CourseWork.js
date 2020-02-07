class CourseWork{
    constructor(id, name, course){
        this._id = id;
        this._name = name;
        this._course = course;
    }

    get id(){
        return this._id;
    }
    get name(){
        return this._name;
    }
    get course(){
        return this._course;
    }

    set name(name){
        this._name = name;
    }

}