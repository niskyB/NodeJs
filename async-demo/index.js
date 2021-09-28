// getUser(1, getRepository);


getUser(1)
    .then(user => getRepository(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => displayCommits(commits))
    .catch(err => console.log(err.message));

function displayCommits(commits) {
    console.log('Commits', commits);
}

function getCommits(repos) {
    getCommits(repos, displayCommits);
}

function getRepository(user) {
    getRepository(user.gitHubUsername, getCommits);
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database');
            resolve({ id: id, gitHubUsername: 'niskyB' });
        }, 2000);
    });
}

function getRepository(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a repository from github');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    })
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading commits from a repository');
            resolve(['commit1', 'commit2', 'commit3']);
        }, 2000);
    })
}