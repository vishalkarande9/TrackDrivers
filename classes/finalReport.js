class FinalReport{
    constructor(item){
        this.driverName = item.driverName;
        this.totalMiles = item.totalMiles;
        this.avgSpeed = item.avgSpeed;
        this.roundUpValues();
        this.renderOutput();
    }

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

// now we export the class, so other modules can create FinalReport objects
module.exports = FinalReport;