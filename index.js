
const getTree = (obj, count = 0) => {
    console.log('--'.repeat(count) + obj.name)
    if (obj.items && obj.items.length) {
        count += 1;
        obj.items.forEach(item => {
            return getTree(item, count);
        })
    } 
}

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

getTree(testObj);

module.exports = getTree;