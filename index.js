
var fs = require('fs');
var path = require('path');
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
    return;
};

getTree(testObj);
getFiles('./');

module.exports.getTree;
module.exports.getFiles;