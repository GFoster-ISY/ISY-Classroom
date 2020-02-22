class Course extends SALObject{
    constructor(id, name = id) {
        super(id, name);
        this.studentList = {};
    }

    addStudent(student){
        this.studentList[student.id] = student;
    }

    getEnrolledStudentCount() {
        return Object.keys(this.studentList).length;
    }
    createStudentList(listOfStudentsInAssessment, studentList){
        for (var id in studentList){
            var student = new Student(id, studentList[id]);
            this.studentList[id] = student;
            listOfStudentsInAssessment[id] = student;
        }
    }

    findStudent(id){
        return this.studentList[id];
    }
}