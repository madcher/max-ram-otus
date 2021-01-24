
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
const getTree = (obj) => {
    let str = ''
    const treeCycle = (obj, count = 0) => {
        str += '  '.repeat(count) + '└─' + obj.name + '\n';
        if (obj.items && obj.items.length) {
            count += 1;
            obj.items.forEach(item => {
                return treeCycle(item, count);
            })
        } 
    }
    treeCycle(obj);
    return str;
}
// get files and fiolders tree
const getFiles = (dir, depth = 2) => {
    let str = '';
    const getFilesCycle = function (dir, depth = 2, count = 0){
        str += '|  '.repeat(count) + '└─' + dir + '\n';
        if (fs.statSync(dir).isDirectory()) {
            count += 1;
            let files = fs.readdirSync(dir);
            files.forEach(file => {
                var name = dir + '/' + file;
                if (count <= depth) {
                    return getFilesCycle(name, depth, count);
                }
            })
        }
    };
    getFilesCycle(dir, depth);
    return str;
}

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


//console.log(getTree(testObj));
console.log(getFiles('./', depth))
//asyncGetFiles('./', depth);

module.exports = {
    getTree,
    getFiles,
    testObj,
    asyncGetFiles,
}
