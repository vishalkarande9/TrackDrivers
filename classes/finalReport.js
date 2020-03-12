class FinalReport{
    constructor(item){
        this.driverName = item.driverName;
        this.totalMiles = item.totalMiles;
        this.avgSpeed = item.avgSpeed;
        this.roundUpValues();
        this.renderOutput();
    }

    //rounds miles and miles per hour to the nearest integer
    roundUpValues(){
        this.totalMiles = Math.round(this.totalMiles);
        this.avgSpeed = Math.round(this.avgSpeed);
    }

    renderOutput(){
        if(this.totalMiles > 0){
            this.output = `${this.driverName}: ${this.totalMiles} miles @ ${this.avgSpeed} mph`;
        } else{
            this.output = `${this.driverName}: ${this.totalMiles} miles`;
        }
    }
}

module.exports = FinalReport;