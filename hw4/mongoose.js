const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/my-courses');

const db = mongoose.connection;

db.on('error', err => console.error(err.message));
db.once('open', () => console.info("Connected to MongoDB!"));

// Schemas
const CourseSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
});

// Models
const Course = mongoose.model('courses', CourseSchema);

module.exports = {
    Course,
};
