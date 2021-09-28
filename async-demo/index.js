getUser(1, getRepository);

function displayCommits(commits) {
    console.log('Commits', commits);
}

function getCommits(repos) {
    getCommits(repos, displayCommits);
}

function getRepository(user) {
    getRepository(user.gitHubUsername, getCommits);
}

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

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log('Reading commits from a repository');
        callback(['commit1', 'commit2', 'commit3']);
    }, 2000);
}