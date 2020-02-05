
class Assessment{
    constructor(month, studentIDs){
        this._id_month = month;
        this._studentList = {};
        this.setStudentList(studentIDs);
    }

    get month(){
        return this._month;
    }
    set name(month){
        this._month = month;
    }

    getStudent(id){
        return this._studentList[id];
    }
    getStudentList(){
        return this._studentList;
    }

    storeStudentList(xhttp){
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            var list = JSON.parse(xhttp.responseText);
            console.log(list);
            for (var id in list){
                console.log(id + " : " + list[id]);
                this._studentList[id] = new Student(id, list[id]);
            }
        }
    }
    setStudentList(ids){
        // get the studentlist from the Google Sheet
        var URL = "https://script.google.com/a/isyedu.org/macros/s/AKfycbw1cM8fnqav_mnJVLOC6F_h2U1dme7KhtE5l-rmioM/dev";
        var DATA = "[32,55,27,18]";
        URL = URL + "?ids=" + DATA;
        var xhttp = new XMLHttpRequest();
        var assessmentObj = this;
        xhttp.onreadystatechange=function () {
            console.log("Response received: "+this);
            assessmentObj.storeStudentList(this);
        };
        xhttp.open("GET", URL, true);
        xhttp.send();
    }

}