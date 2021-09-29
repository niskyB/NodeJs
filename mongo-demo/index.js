const mongoosse = require('mongoose');

mongoosse.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to mongodb'))
    .catch(err => console.error('Could not connect to mongodb...', err));

const courseSchema = new mongoosse.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        //match: /pattern/ 
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        trim: true,
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoosse.model('Course', courseSchema);

async function creatCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'web',
        author: 'Mosh',
        tags: ['frontend'],
        isPublished: true,
        price: 15.8
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (er) {
        for (field in er.errors)
            console.log(er.errors[field].message);
    }
}

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course.find({ author: 'Mosh', isPublished: true })
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
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

creatCourse('6153217ddde8dc1297284bc5');

//getCourses();