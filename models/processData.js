const {readFileSync} = require('fs'); 
const Trip = require('../classes/trip');
const Report = require('../classes/report');
const FinalReport = require('../classes/finalReport');
const appConstants = require('../utils/appConstants');


function error(messageCode, message){
    return {
        statusCode: 400,
        type: 'error',
        messageCode: messageCode,
        message: message
    }
}

function success(data){
    return {
        statusCode: 200,
        type: 'success',
        data: data
    }
} 


// reads input txt file and generates array of commands
exports.readInputFile = (filePath) => {
        if(!filePath){
            return error('inputFileEmpty', 'Path not provided for the input file');  
        }
        try{
            let data = readFileSync(filePath);
            readFileOutput =  data.toString().split('\n');
            if(readFileOutput.length === 1 && readFileOutput[0]===''){
                return error('inputFileEmpty', 'Input File provided is empty');
            } 
            return separateCommands(readFileOutput);


        } catch(err) {
            return error('inputFileEmpty', err);
        }
}

// separates Drivers and Trip commands
function separateCommands(commandArr){
        try{
            let driverCommands = [];
            let tripCommands = [];
            for(let i=0; i<commandArr.length;i++){
                let command = commandArr[i].trim();
                if(command.length === 0){
                    continue;
                }
                if(command.includes(appConstants.DRIVER_COMMAND)){
                    driverCommands.push(command);       
                } else if(command.includes(appConstants.TRIP_COMMAND)) {
                    tripCommands.push(command);
                }
            }
            // let separateCommandsOutput = [driverCommands,tripCommands];
            if(driverCommands.length === 0 && tripCommands.length === 0){
                return error('inputFileEmpty', 'Input File provided is empty');
            }
            return registerDriver({}, driverCommands, tripCommands);
        } 
        catch(err){
            return error('failedInSeparateCommands', err);
        }
}

// checks if the commad is in proper format. returns true if it in proper format else return false
function validateCommand(commandArr,commandType){
    if(commandType === 'Driver'){
        if(
            commandArr.length === appConstants.DRIVER_COMMAND_LENGTH &&
            commandArr[0] === appConstants.DRIVER_COMMAND &&
            typeof(commandArr[1]) === 'string'
        ){
            return true;
        }
        return false;
    } else{
        if(
            commandArr.length === appConstants.TRIP_COMMAND_LENGTH &&
            commandArr[0] === appConstants.TRIP_COMMAND &&
            typeof(commandArr[1]) === 'string' &&
            (typeof(commandArr[2]) === 'string' && commandArr[2].includes(':')) &&
            (typeof(commandArr[3]) === 'string' && commandArr[3].includes(':')) &&
            (typeof(commandArr[4]) === 'string' && parseInt(commandArr[4]) >= 0)
        ){
            return true;
        }
        return false;
    }
}

// adds driver name as key to the main object
function registerDriver(mainObj, driverCommands, tripCommands){
        try{
            for (const command of driverCommands){
                let res = command.split(appConstants.COMMAND_SEPARATOR);
                if(validateCommand(res,appConstants.DRIVER_COMMAND)){
                    let name = res[1];
                    mainObj[name] = {};
                }
            }
            return addTrip(mainObj, tripCommands);
        } catch(err){
            return error('failedInRegisterDriver', err);        
        }
}

// maintains running total of miles driven and trip time
function maintainRunningSum(newTrip, mainObj){

    if(mainObj[newTrip.driverName]){
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
    }
    return mainObj;
}

// adds trip info as object to the corresponding driver
function addTrip (mainObj,tripCommands){
        try{
            for (const command of tripCommands){
                let res = command.split(appConstants.COMMAND_SEPARATOR);
                if(validateCommand(res, 'Trip')){
                    let trip =  new Trip(res[1],res[2],res[3],res[4]);
                    if(!trip.discardTrip){
                        mainObj = maintainRunningSum(trip,mainObj);            
                    }
                }
            }
            return generateReport(mainObj);
        } catch(err){
            return error('failedInAddTrip', err);
        }
}

// loops through every driver key in the main object and calls Report class method to calculate average speed for each driver
function generateReport(mainObj){
        try{
            let reportArr = [];
            for (const key in mainObj){
                const report = new Report(mainObj[key],key);
                reportArr.push(report);
            }
            return sortReport(reportArr);
        } catch(err){
            return error('failedInGenerateReport', err);
        }
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

// sorts the data by most miles driven to least
function sortReport(report) {
        try{
            report = report.sort(compareTotalMiles);
            return finalReport(report);
        } catch(err){
            return error('failedInSortReport', err);
        } 
}

// returns the generated report
function finalReport(sortedReport) {
        try{
            let expectedOutput=[];
            for(const item of sortedReport){
                let finalReport = new FinalReport(item);
                expectedOutput.push(finalReport.output);
            }
            return success(expectedOutput);
        } catch(err){
            return error('failedInFinalReport', err);
        }
}




