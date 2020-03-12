class Report{
    constructor(item, driverName){
        this.driverName = driverName;
        this.totalMiles = item.totalMiles;
        this.totalTime = item.totalTime;
        this.calculateAvgSpeed();
    }

    //calculates average speed 
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

module.exports = Report;