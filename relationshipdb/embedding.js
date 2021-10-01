const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playgroundV3')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: authorSchema
}));

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function updateAuthor(courseId) {
    // const course = await Course.findById(courseId);
    // course.author.name = 'Mosh Hamedani';
    // course.save();
    await Course.updateOne({ _id: courseId }, {
        $set: {
            'author.name': 'John Smith'
        }
    });
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));

updateAuthor('615702d19c73093e15c80773');