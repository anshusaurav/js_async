// Your code goes here
let p = document.createElement('p');
document.body.append(p);
let name='vivekbrh01';
let mUser = {};
const repoList = [];
const followerList = [];
function getUser(uName) {
    let job = fetch(`https://api.github.com/users/${uName}`).then(
        successResponse => {
            if (successResponse.status != 200) {
                return null;
            } 
            else {
                return successResponse.json();
            }
        },
        failResponse => {
            return null;
        }
    )
   return job;
}

function displayUser(uName){
    getUser(uName).then(user =>{
        mUser.avatar_url = user.avatar_url;
        mUser.name = user.name;
        mUser.login = user.login;
        mUser.bio = user.bio;
        mUser.company = user.company;
        mUser.location = user.location;
        mUser.blog = user.blog;
        mUser.followers = user.followers;
        mUser.following = user.following;
        mUser.public_repos = user.public_repos;
        console.log(mUser); 
    });
}
function getUserFollowers(uName) {
    let job = fetch(`https://api.github.com/users/${uName}/followers`).then(
        successResponse => {
            if (successResponse.status != 200) {
                return null;
            } 
            else {
                return successResponse.json();
            }
        },
        failResponse => {
            return null;
        }
    )
   return job;
}
function displayFollowers(uName){
    getUserFollowers(uName).then(followers =>{
        followers.forEach(follower =>{
            let obj = Object.create(null);
            obj.avatar_url = follower.avatar_url;
            obj.login = follower.login;
            followerList.push(obj);
        });
    });
}


function getUserRepos(uName) {
    let job = fetch(`https://api.github.com/users/${uName}/repos`).then(
        successResponse => {
            if (successResponse.status != 200) {
                return null;
            } 
            else {
                return successResponse.json();
            }
        },
        failResponse => {
            return null;
        }
    )
   return job;
}
function displayRepos(uName){
    getUserRepos(uName).then(repos =>{
        repos.forEach(repo =>{
            let obj = Object.create(null);
            obj.name = repo.name;
            obj.forks_url = repo.forks_url;
            obj.description = repo.description;
            obj.stargazers_count = repo.stargazers_count;
            obj.forks = repo.forks;
            obj.updated_at = repo.updated_at;
            repoList.push(obj);
        });
        return repoList;
    }).then(rep=>build(rep[0].name))
}
displayUser(name);
displayFollowers(name);
displayRepos(name);

function build(arr){
    p.textContent = arr;
}