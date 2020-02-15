class Course extends SALObject{
    constructor(id, name) {
        super(id, name);
        studentList = {};
    }

    addStudent(student){
        this.studentList[student.id] = student;
    }

    addStudents(studentList){
        for (id in studentList){
            var student = studentList[id];
            this.studentList[student.id] = student;
        }
    }

    findStudent(id){
        return this.studentList[id];
    }
}