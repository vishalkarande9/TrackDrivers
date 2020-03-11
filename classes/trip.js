const SplitData = require('./splitData');

class Trip{
    constructor(driverName, startTime, stopTime, milesDriven){
        this.driverName = driverName;
        this.startTime = startTime;
        this.stopTime = stopTime;
        this.milesDriven = parseFloat(milesDriven);
        this.calculateTripTime();
        this.calculateAvgTripSpeed();
        this.discardTrip();
    }

    calculateTripTime(){
    // calculates total trip time in min
        let startTime = new SplitData(this.startTime,":");
        let startTimeArr = startTime.res;
        let stopTime = new SplitData(this.stopTime,":");
        let stopTimeArr = stopTime.res;
    
        let startTimeHr = parseInt(startTimeArr[0]);
        let startTimeMin = parseInt(startTimeArr[1]);
        let stopTimeHr = parseInt(stopTimeArr[0]);
        let stopTimeMin = parseInt(stopTimeArr[1]);
    
        let hoursTraved = (stopTimeHr - startTimeHr) * 60;
        let minutesTraved;
        if(startTimeMin > stopTimeMin){
            minutesTraved = startTimeMin - stopTimeMin;
        } else if(startTimeMin < stopTimeMin){
            minutesTraved = stopTimeMin - startTimeMin;
        } else{
            minutesTraved = 0;
        }
        this.tripTime = hoursTraved+minutesTraved;
        return this;
    } 
    
    calculateAvgTripSpeed(){
        this.avgSpeed = this.milesDriven/(this.tripTime/60);
        return this;
    }

    discardTrip(){
        if(this.avgSpeed < 5 || this.avgSpeed > 100){
            this.discardTrip = true;
        } else {
            this.discardTrip = false;
        }
        return this;
    }
}

// now we export the class, so other modules can create Trip objects
module.exports = Trip;