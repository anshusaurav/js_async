// Your code goes here
let p = document.createElement('p');
document.body.append(p);
let name='nnnkit';
let mUser = {};
const repoList = [];
const followerList = [];
const resultElem = document.querySelector('.result-user');
const searchinputElem = document.querySelector('#searchinput');
searchinputElem.addEventListener('keydown', process);
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
        return mUser;
    }).then(us=>{
        resultElem.innerHTML = `<div class='user-image'>
        <img class="profile-img" alt=${us.name} src=${us.avatar_url}/>
      </div>
      <div class='user-info'>
        <div>
          <h2>${us.name}<span>@${us.login}</span></h2> 
        </div>
        <h3>${us.bio}</h3>
        <div class='user-info-flex'>
          <i class="fas fa-user-friends"></i>
          <p>${us.company}</p>
        </div>
        <div class='user-info-flex'>
          <i class="fas fa-map-marker-alt"></i>
          <p>${us.location}</p>
        </div>
        <div class='user-info-flex'>
          <i class="fab fa-microblog"></i>
          <a href=${us.blog}>${us.blog}/</a>
        </div>
        <div class='user-data'>
          <div>
            <h4>${us.followers}</h4>
            <p>Followers</p>
          </div>
          <div>
            <h4>${us.following}</h4>
            <p>Following</p>
          </div>
          <div>
            <h4>${us.public_repos}</h4>
            <p>Repos</p>
          </div>
        </div>
      </div>`
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
        return followerList;
    }).then(fol=>{
        console.log(fol);
    })
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
    console.log(getUserRepos(uName));
    getUserRepos(uName).then(repos =>{
        repos.forEach(repo =>{
            let obj = Object.create(null);
            obj.name = repo.name;
            obj.html_url = repo.html_url;
            obj.forks_url = repo.url;
            obj.description = repo.description;
            obj.stargazers_count = repo.stargazers_count;
            obj.forks = repo.forks;
            obj.updated_at = repo.updated_at;
            repoList.push(obj);
        });
        return repoList;
    }).then(rep=>{
        rep = rep.sort((a,b)=>Date.parse(a.updated_at) - Date.parse(b.updated_at));
        console.log(rep);
    })
}

displayFollowers(name);
displayRepos(name);
function process(event){
    if(event.keyCode == 13){
        name = this.value;
        displayUser(name);
        this.value = '';
    }
}
