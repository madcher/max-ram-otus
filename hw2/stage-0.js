
// -----0 STAGE----- generate 100Mb file
const file = require("fs").createWriteStream("./num.txt");

const generateFile = async () => {
    for(let i = 0; i < 47500000; i++) {
        const num = (Math.floor(Math.random() * 10) + 1) + '\n';
        if(!file.write(num)) {
            // Will pause every 16384 iterations until `drain` is emitted
            await new Promise(resolve => file.once('drain', resolve));
        }
    }
};

generateFile();