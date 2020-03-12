const processData = require('./models/processData');
const filePath = process.argv[2];

const result = main(filePath)
if(result.statusCode === 400){
    console.log(result);
} else{
    console.log('Expected output:');
    for(const i of result.data){
        console.log(i);
    }
}

function main(filePath){
    return processData.readInputFile(filePath);
}

module.exports.main = main;


