
var fs = require('fs');
var path = require('path');
//let depth = Number(process.argv[2].replace(/\D+/g,""));
//let depth = process.argv[3]
const args = process.argv.slice(2);
// массив аргументов
const depthIndex = args.findIndex(el => el === '-d');
// глубина дерева
let depth;
if (depthIndex >= 0 && args[depthIndex + 1]) {
    depth = args[depthIndex + 1];
}

// test object
const testObj = {
    "name": 1,
    "items": [{
        "name": 2,
        "items": [{ "name": 3 }, { "name": 4 }]
        }, {
        "name": 5,
        "items": [{ "name": 6 }]
        }
    ]
};
// get tree from object
const getTree = (obj, count = 0) => {
    console.log('  '.repeat(count) + '└─' + obj.name)
    if (obj.items && obj.items.length) {
        count += 1;
        obj.items.forEach(item => {
            return getTree(item, count);
        })
    } 
}
// get files and fiolders tree
var getFiles = function (dir, depth = 2, count = 0){
    console.log('|  '.repeat(count) + '└─' + dir);
    if (fs.statSync(dir).isDirectory()) {
        count += 1;
        let files = fs.readdirSync(dir);
        files.forEach(file => {
            var name = dir + '/' + file;
            if (count <= depth) {
                return getFiles(name, depth, count);
            }
        })
    }
};

const asyncGetFiles = function (dir, depth = 2, count = 0) {
    console.log('|  '.repeat(count) + '└─' + dir);
    fs.stat(dir, (err, stats) => {
        if (err) {
            return;
        }
        if (stats.isDirectory()) {
            count += 1;
            let files = fs.readdirSync(dir);
            files.forEach(file => {
                var name = dir + '/' + file;
                if (count <= depth) {
                    return getFiles(name, depth, count);
                }
            })
        }
    })
};


//getTree(testObj);
//getFiles('./', depth);
asyncGetFiles('./', depth);

module.exports.getTree;
module.exports.getFiles;