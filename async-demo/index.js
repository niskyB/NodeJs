console.log('Before');
getUser(1, (user) => {
    console.log('User', user);

    getRepository(user.gitHubUsername, (repos) => {
        console.log('Repos', repos);
    });
});
console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database');
        callback({ id: id, gitHubUsername: 'niskyB' });
    }, 2000);
}

function getRepository(username, callback) {
    setTimeout(() => {
        console.log('Reading a repository from github');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}