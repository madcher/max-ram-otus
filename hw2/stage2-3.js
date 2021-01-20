// -----2,3 STAGE (final) ----- join sort files into the big one

const fs = require('fs'); 
const file = fs.createWriteStream("./result.txt");

const array = [];
const streams = {}

const chunkHandler = async (chunk) => {
    for (let stream in streams){
        streams[stream].pause();
    }
    array.push(chunk.toString());
    let num;
    if (array.length >= 10) {
        array.sort();
        num = array.shift();
    }
    if (!num) {
        for (let stream in streams){
            streams[stream].resume();
        }
    } else {
        if(!file.write(num)) {
            await new Promise(resolve => file.once('drain', resolve));
        }
        for (let stream in streams){
            streams[stream].resume();
        }
    }
};

for (let i = 1; i <= 10; i++) {
    streams[`readable${i}`] = fs.createReadStream(`subfile${i}.txt`, { highWaterMark: 2 });
    streams[`readable${i}`].on('data', chunkHandler);
};

streams.readable10.on('end', async () => {
    array.sort();
    for (let num in array) {
        if(!file.write(num)) {
            await new Promise(resolve => file.once('drain', resolve));
        }
    }
    console.log('ready');
  });