const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playgroundV4')
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
    authors: [authorSchema]
}));

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
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

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}

// createCourse('Node Course', [
//     new Author({ name: 'Mosh' }),
//     new Author({ name: 'John' })
// ]);

// updateAuthor('615702d19c73093e15c80773');

// addAuthor('615707637b5660be7de01f4e', new Author({ name: 'Loc' }))

removeAuthor('615707637b5660be7de01f4e', '6157089d5592d78b3acd60a3');