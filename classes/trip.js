const appConstants = require('../utils/appConstants');

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
        let startTimeArr = this.startTime.split(appConstants.TIME_SEPARATOR);
        let stopTimeArr = this.stopTime.split(appConstants.TIME_SEPARATOR);
    
        let startTimeHr = parseInt(startTimeArr[0]);
        let startTimeMin = parseInt(startTimeArr[1]);
        let stopTimeHr = parseInt(stopTimeArr[0]);
        let stopTimeMin = parseInt(stopTimeArr[1]);

       
        let hoursTraved = (stopTimeHr - startTimeHr) * appConstants.VALUE_OF_HOUR_IN_MIN;
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
        this.avgSpeed = this.milesDriven/(this.tripTime/appConstants.VALUE_OF_HOUR_IN_MIN);
        return this;
    }

    discardTrip(){
        if(this.avgSpeed < appConstants.ALLOWED_LOWER_MPH || this.avgSpeed > appConstants.ALLOWED_UPPER_MPH){
            this.discardTrip = true;
        } else {
            this.discardTrip = false;
        }
        return this;
    }
}

module.exports = Trip;