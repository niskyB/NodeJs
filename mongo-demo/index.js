const mongoosse = require('mongoose');

mongoosse.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to mongodb'))
    .catch(err => console.error('Could not connect to mongodb...', err));

const courseSchema = new mongoosse.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoosse.model('Course', courseSchema);

async function creatCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const courses = await Course.find({ author: 'Mosh', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

async function updateCourse(id) {
    // Approach: Query first
    // findById()
    // Modify its properties
    // save()
    // const course = await Course.findById(id);
    // if (!course) return;
    // course.isPublished = true;
    // course.author = 'Another author';
    // // course.set({
    // //     isPublished: true,
    // //     author: 'Another author'
    // // });
    // const result = await course.save();
    // console.log(result);

    // Approach: Update first
    // Update directly
    // Optionally: get the updated document
    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Loc',
            isPublished: true
        }
    });
    console.log(result);
}

async function removeCourse(id) {
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

removeCourse('6153217ddde8dc1297284bc5');

//getCourses();