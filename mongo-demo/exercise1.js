const mongoosse = require('mongoose');
mongoosse.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connect to mongod server'))
    .catch(err => console.error(err));

const schema = new mongoosse.Schema({
    name: { type: String, required: true },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: true },
    price: { type: Number, required: function() { return this.isPublished } }
});

const Course = mongoosse.model('Course', schema);

async function getCourses() {
    return courses = await Course.find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
}

async function getFullStacksCourses() {
    return courses = await Course.find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
        // .or([{ tags: 'backend' }, { tags: 'frontend' }])
        .sort({ price: -1 })
        .select({ name: 1, author: 1 });
}

async function getExpensiveCourses() {
    return courses = await Course.find({ isPublished: true })
        .or([{ name: /.*by.*/i }, { price: { $gte: 15 } }])
        .sort({ price: -1 })
        .select({ name: 1, author: 1 });
}

async function run() {
    const courses = await getExpensiveCourses();
    console.log(courses);
}

// async function run() {
//     const courses = await getFullStacksCourses();
//     console.log(courses);
// }

// async function run() {
//     const courses = await getCourses();
//     console.log(courses);
// }

run();