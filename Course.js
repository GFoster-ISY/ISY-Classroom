class Course extends SALObject{
    constructor(id, name = id) {
        super(id, name);
        this.studentList = {};
    }

    addStudent(student){
        this.studentList[student.id] = student;
    }

    get enrolledStudents() {
        return this.studentList;
    }

    getEnrolledStudentCount() {
        return Object.keys(this.studentList).length;
    }
    createStudentList(newStudentList){
        var theAssessment = new Assessment();
        var allStudents = theAssessment.studentList;

        for (var id in newStudentList){
            var student;
            if (id in allStudents){
                student = allStudents[id];
            } else {
                student = new Student(id, newStudentList[id]);
                allStudents[id] = student;
            }
            this.studentList[id] = student;
        }
    }

    findStudent(id){
        return this.studentList[id];
    }
}