class Course extends SALObject{
    constructor(id, name) {
        super(id, name);
        this.studentList = {};
    }

    addStudent(student){
        this.studentList[student.id] = student;
    }

    createStudentList(studentList){
        for (var id in studentList){
            var student = new Student(id, studentList[id]);
            this.studentList[id] = student;
        }
    }

    findStudent(id){
        return this.studentList[id];
    }
}