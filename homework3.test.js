const fs = require('fs');
const {testObj, getTree, getFiles} = require('./index');

jest.mock('fs', () => ({
    readdirSync: jest.fn((dir_name) => {
        return ['index.js', 'package.json', 'src'];
    }),
    statSync: () => {
        return {
            isDirectory: () => true
        }
    }
}));


test('test mocking', () => {
    let files = fs.readdirSync('./');
    expect(files).toEqual(['index.js', 'package.json', 'src']);
});


test('test export', () => {
    const sourceObj = {
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
    expect(testObj).toEqual(sourceObj);
});

test('test getTree function', () => {
    expect(getTree(testObj)).toEqual('└─1\n  └─2\n    └─3\n    └─4\n  └─5\n    └─6\n');
});

test('test getFiles function', () => {
    expect(getFiles('./', 1)).toEqual('└─./\n|  └─.//index.js\n|  └─.//package.json\n|  └─.//src\n');
});