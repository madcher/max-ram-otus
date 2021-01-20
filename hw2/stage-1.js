// -----1 STAGE----- Splits a given file into smaller subfiles

const infileName = 'num.txt';
let fileCount = 1;
let count = 0;
const fs = require('fs');
let outfileName = `subfile${fileCount}.txt`;
let inStream = fs.createReadStream(infileName);
let outStream = fs.createWriteStream(outfileName);
let lineReader = require('readline').createInterface({
    input: inStream
});
let tempArray = [];
lineReader.on('line', function(line) {
    count++;
    tempArray.push(line + '\n')
    if (count >= 4750000) {
        fileCount++;
        outStream.write(tempArray.sort().join(''));
        outStream.close();
        outfileName = `subfile${fileCount}.txt`;
        outStream = fs.createWriteStream(outfileName);
        count = 0;
        tempArray = []
    }
});

lineReader.on('close', function() {
    if (count > 0) {
        console.log('Final close:', outfileName, count);
    }
    inStream.close();
    outStream.close();
    console.log('Done');
});