class Report{
    constructor(item, driverName){
        this.driverName = driverName;
        this.totalMiles = item.totalMiles;
        this.totalTime = item.totalTime;
        this.calculateAvgSpeed();
    }

    calculateAvgSpeed(){
        if(!(this.totalMiles && this.totalTime)){
            this.totalMiles = 0;
            this.totalTime = 0;
            this.avgSpeed = 0;
        } else {
            this.avgSpeed = this.totalMiles/(this.totalTime/60);
        }
        return this;
    }
}

// now we export the class, so other modules can create Report objects
module.exports = Report;