class Error{
    constructor(name, err){
        this.name = name;
        this.error = err;
    }
}

// now we export the class, so other modules can create Error objects
module.exports = Error;
