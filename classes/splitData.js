class SplitData{
    constructor(str, separator){
        this.splitstr(str, separator);
    }

    splitstr(str, separator){
        this.res = str.split(separator);
        return this;
    }
}

// now we export the class, so other modules can create SplitData objects
module.exports = SplitData;

