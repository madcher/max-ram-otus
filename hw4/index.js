const express = require('express');
const Course = require('./mongoose').Course;

const app = express();
// json парсер
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))
app.use("/", express.static(__dirname + '/client'));
// секретный токен
const token = '2347tghvcxs672e2678g22342';

// авторизация
app.post("/api/authorization", (req, res) => {
    const {login, password} = req.body;
    if (login !== '1' && password !== '1') {
        res.status(401);
        res.send('Current password does not match');
    } else {
        res.send({token});
    }
});

// проверка авторизации
app.use(function (req, res, next) {
    const reqToken = req.get('token');
    if (!reqToken || reqToken !== token) {
        res.status(401);
        res.send('Please log in');
    }
    next();
});

//let courses = [{name: 'Course1', content: null, description: 'first course' }, {name: 'Course2', content: null, description: 'second course' }];

// получение курсов
app.get("/api/get-courses", (req, res) => {
    Course.find((err, courses) => {
        if (err) return res.status(500).send({error: 'Server error'});
        res.send(courses);
    });
});

// добавление курса
app.post("/api/add-course", (req, res) => {
    //const {name, description} = req.body;
    const course = new Course(req.body);
    course.save((err) => {
        if (err) {
            if (err.name === 'ValidationError') {
                return res.status(400).send({error: 'Validation error'});
            }
            return res.status(500).send({error: 'Server error'});
        }
        res.status(201).send('Success');
    });
});

// удаление
app.delete("/api/delete-course", (req, res) => {
    const {courseName} = req.body;
    Course.find({ name: courseName }).deleteOne((err, courses) => {
        if (err) return res.status(500).send({error: 'Server error'});
        res.send(courses);
    })
});

app.listen(3000, () => console.log('Express server listening on 3000'));