class SALObject{
    constructor(id, name){
        this._id = id;
        this._name = name;
    }

    get id(){
        return this._id;
    }
    get name(){
        return this._name;
    }

    set name(name){
        this._name = name;
    }

    toString() {
        return  this._name;
    }
}