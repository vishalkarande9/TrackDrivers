const {readFile, createWriteStream} = require('fs'); 
const SplitData = require('../classes/splitData');
const Trip = require('../classes/trip');
const Report = require('../classes/report');
const FinalReport = require('../classes/finalReport');
const Error = require('../classes/error');


function processInputFile(filePath){
    return new Promise((resolve,reject) => {
        readFile(filePath, 'utf8', function(err, data) {
            if (!err) {
                let output =  data.toString().split('\n');
                if(output.length === 1 && output[0]===''){
                    let error = new Error('failedInProcessInputFile','Input File provided is empty');
                    return reject(error);
                } 
                return resolve(output);
            } else {
                let error = new Error('failedInProcessInputFile', err);
                return reject(error);
            }
          });
    })
}


function separateCommands(commandArr){
    return new Promise((resolve,reject) => {
        try{
            let driverCommands = [];
            let tripCommands = [];
            for(let i=0; i<commandArr.length;i++){
                let command = commandArr[i];
                if(command.includes("Driver") && !command.includes("Trip")){
                    driverCommands.push(command);       
                } else{
                    tripCommands.push(command);
                }
            }
            let output = [driverCommands,tripCommands];
            return resolve(output);
        } 
        catch(err){
            let error = new Error('failedInSeparateCommands', err);
            return reject(error);
        }
    })
}


function registerDriver(mainObj,driverCommands){
    return new Promise((resolve,reject) => {
        try{
            for (const command of driverCommands){
                let splitData = new SplitData(command," ");
                let res = splitData.res;
                let name = res[1];
                mainObj[name] = {};
            }
            return resolve(mainObj);
        } catch(err){
            let error = new Error('failedInRegisterDriver', err);
            return reject(error);        
        }
    })
}


function maintainRunningSum(newTrip, mainObj){

    if(mainObj[newTrip.driverName]['totalMiles']){
        // when trip obj already exists
        mainObj[newTrip.driverName]['totalMiles'] += newTrip.milesDriven;
        mainObj[newTrip.driverName]['totalTime'] += newTrip.tripTime;
    } else {
        // for new trip obj
        mainObj[newTrip.driverName]['driverName'] = newTrip.driverName;
        mainObj[newTrip.driverName]['totalMiles'] = newTrip.milesDriven;
        mainObj[newTrip.driverName]['totalTime'] = newTrip.tripTime;
    }
    return mainObj;
}


function recordTrip(mainObj,tripCommands){
    return new Promise((resolve,reject) => {
        try{
            for (const command of tripCommands){
                let splitData = new SplitData(command," ");
                let res = splitData.res;
                // here I am assuming that the trip command will have 4 parameters
                let trip =  new Trip(res[1],res[2],res[3],res[4]);
                if(!trip.discardTrip){
                    mainObj = maintainRunningSum(trip,mainObj);            
                }
            }
            return resolve(mainObj);
        } catch(err){
            let error = new Error('failedInRecordTrip', err);
            return reject(error);
        }
    }) 
}


function generateReport(mainObj){
    return new Promise((resolve,reject) => {
        try{
            let reportArr = [];
            for (const key in mainObj){
                const report = new Report(mainObj[key],key);
                reportArr.push(report);
            }
            return resolve(reportArr);
        } catch(err){
            let error = new Error('failedInGenerateReport', err);
            return reject(error);
        }
    }) 
}

function compareTotalMiles(a,b){
    if(a.totalMiles < b.totalMiles){
        return 1;
    } else if(a.totalMiles > b.totalMiles){
        return -1; 
    } else{
        return 0;
    }
}

function sortReport(report){
    return new Promise((resolve,reject) => {
        try{
            report = report.sort(compareTotalMiles);
            return resolve(report);
        } catch(err){
            let error = new Error('failedInSortReport', err);
            return reject(error);
        }
    }) 
}

function finalReport(sortedReport){
    return new Promise((resolve,reject) => {
        try{
            let expectedOutput=[];
            for(const item of sortedReport){
                let finalReport = new FinalReport(item);
                expectedOutput.push(finalReport.output);
            }
            return resolve(expectedOutput);
        } catch(err){
            let error = new Error('failedInFinalReport', err);
            return reject(error);
        }

    }) 
}

function createFile(expectedOutput){
    return new Promise((resolve,reject) => {
        let file = createWriteStream('output.txt');
        file.on('error', function(err){
            let error = new Error('failedInCreateFile', err);
            return reject(error);
        })
        expectedOutput.forEach(value => file.write(`${value}\r\n`));
        file.on('finish',()=>{
            return resolve();
        });
        // close the stream
        file.end();
       
    })
}

module.exports.processInputFile = processInputFile;
module.exports.separateCommands = separateCommands;
module.exports.registerDriver = registerDriver;
module.exports.recordTrip = recordTrip;
module.exports.generateReport = generateReport;
module.exports.sortReport = sortReport;
module.exports.finalReport = finalReport;
module.exports.createFile = createFile;


