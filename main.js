const filePath = process.argv[2];
const processData = require('./models/processData');

main(filePath, (result,err) => {
    if(err){
        return err;
    } else{
        process.exit();
    }
});


function main(filePath, cb){
    let mainObj = {};
    processData.processInputFile(filePath)
        .then((output) => {
            // All the commands in array format 
            return processData.separateCommands(output);
        })
        .then((output) => {
            [driverCommands,tripCommands] = output;
            // driver and trip caommands array
            return processData.registerDriver(mainObj,driverCommands);
        })
        .then((output) => {
            mainObj = output;
            // Obj with all drivers registered
            return processData.recordTrip(mainObj,tripCommands);
        })
        .then((output) => {
            mainObj = output;
            // obj with runnningsum of trip details for each driver;
            return processData.generateReport(mainObj)
        })
        .then((output) => {
            let report = output;
            // gives array with avgSpeed and milesDriven
            return processData.sortReport(report);
        })
        .then((output) => {
            let sortedReport = output;
            // gives array of sorted report
            return processData.finalReport(sortedReport);
        })
        .then((output) => {
            let expectedOutput = output;
            return processData.createFile(expectedOutput);
        })
        .then(() => {
            return cb('done',null);
        })

        .catch((err) => {
           return cb(null,err);
        })

}

/*
- PROMISE used for async to syn code , and it also makes the code leaner
*/

/*
- Will the Trip commands be followed by Driver commands or are they in any order? 
- Can there be duplicate Driver commands? (Drivers with the same name).
- check trip values if start and end time is same 
- condition when driver is not registered
- when trip command has missing values
*/

