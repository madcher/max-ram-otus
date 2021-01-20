// -----2,3 STAGE (final) ----- join sort files into the big one
const fs = require('fs'); 
const file = fs.createWriteStream("./result.txt");
const {Readable} = require('stream')

const array = [];
const streams = {};

const readable = new Readable({
    read() {
    }
});

const chunkHandler = async (chunk) => {
    readable.push(chunk);
};

for (let i = 1; i <= 10; i++) {
    streams[`readable${i}`] = fs.createReadStream(`subfile${i}.txt`, { highWaterMark: 2 });
    streams[`readable${i}`].on('data', chunkHandler);
};

readable.on('data', async (chunk) => {
    array.push(chunk.toString());
    readable.pause();
    if (array.length >= 10) {
        array.sort();
        num = array.shift();
        if(!file.write(num)) {
            await new Promise(resolve => file.once('drain', resolve));
        }
    }
    readable.resume();
});
