// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//         getTopMovies((movies) => {
//             console.log('Top movies: ', movies);
//             sendEmail(customer.email, movies, () => {
//                 console.log('Email sent...')
//             });
//         });
//     }
// });

async function sendEmailToCustomer() {
    try {
        const cus = await getCustomer(1);
        console.log('Customer: ', cus);
        if (cus.isGold) {
            const movies = await getTopMovies();
            console.log('Top movies: ', movies);
            const email = await sendEmail(cus.email, movies);
            console.log(email);
        }
    } catch (e) {
        console.log(e.message);
    }
}

sendEmailToCustomer();

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'Mosh Hamedani',
                isGold: true,
                email: 'email'
            });
        }, 4000);
    });
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 4000);
    })
}

function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Email sent...');
        }, 4000);
    })
}