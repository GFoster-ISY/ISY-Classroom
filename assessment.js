
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
    setStudentList(ids){
        // get the studentlist from the Google Sheet
        var URL = "https://script.google.com/a/isyedu.org/macros/s/AKfycbw1cM8fnqav_mnJVLOC6F_h2U1dme7KhtE5l-rmioM/dev";
        var DATA = "[32,55,27,18]";
        URL = URL + "?ids=" + DATA;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            console.log("Response received: "+this);
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText)
//                this._studentList[id] = this.responseText;
//              document.getElementById("demo").innerHTML = this.responseText;
            }
          };
        xhttp.open("GET", URL, true);
        xhttp.send();
        // var ss = SpreadsheetApp.openById("1pxJYSemUuAoMPrzkMBw4sy4o4pCVFRj6-nuUAlnqgcg");
        // var sheet = ss.getSheetByName("Student");
        // var range = sheet.getRange(1, 1, sheet.getLastRow());
        // var values = range.getValues();

        // for (id in ids){
        //     for (s in values){
        //         if (s[0] == id){
        //             name = s[1];
        //             break;
        //         }
        //     }
        //     this._studentList[id] = new Student(id, name);
        // }
    }

}