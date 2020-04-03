// Your code goes here
let p = document.createElement('p');
document.body.append(p);
let name='nnnkit';
let mUser = {};
const repoList = [];
const followerList = [];
const resultElem = document.querySelector('.result-user');
const searchinputElem = document.querySelector('#searchinput');
const repoElem = document.querySelector('.repos');
const allRepoElem = document.querySelector('.all-repos');
const followerElem = document.querySelector('.followers');
searchinputElem.addEventListener('keydown', process);
searchinputElem.addEventListener('keyup', processInstant);
function instantSearch(uName){
  let job = fetch(`https://api.github.com/search/users?q=${uName}`)
  .then(
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
    console.log(job);
   return job;
}
function getUser(uName) {
    let job = fetch(`https://api.github.com/users/${uName}`,{
      credentials: "same-origin",
    }).then(
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
  console.log(uName);
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
        //console.log(mUser); 
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
          <a href=${us.blog}>${us.blog}</a>
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
    }).catch(error=>{
      resultElem.innerHTML = `<div class='loading-div'>
      <h2>No result Found</h2>
    </div>`;;

    });
}
function getUserFollowers(uName) {
    let job = fetch(`https://api.github.com/users/${uName}/followers`,{
      credentials: "same-origin",
    }).then(
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
    //console.log(getUserFollowers(uName));
    getUserFollowers(uName).then(followers =>{
        followers.forEach(follower =>{
            let obj = Object.create(null);
            obj.avatar_url = follower.avatar_url;
            obj.login = follower.login;
            followerList.push(obj);
        });
        return followerList;
    }).then(fol=>{
      let s = `
      <h3>Followers</h3>
      <ul class='all-followers'>
      </ul>`;
      fol.forEach(foll => {
          s+= `<li class='follower-li'>
          <div class='follower-img'>
            <img class='image-fol' src=${foll.avatar_url} alt=${foll.login}/>
          </div>
          <div>
            <p class='follower-id'>${foll.login}</p>
          </div>
        </li>`;
      });
      s+=`</ul>`
      followerElem.innerHTML = s;
      //console.log(rep);
    })
}


function getUserRepos(uName) {
    let job = fetch(`https://api.github.com/users/${uName}/repos`,{
      credentials: "same-origin",
    }).then(
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
            console.log(repo);
            obj.name = repo.name;
            obj.html_url = repo.html_url;
            obj.forks_url = repo.clone_url;
            obj.description = repo.description;
            obj.stargazers_count = repo.stargazers_count;
            obj.forks = repo.forks;
            obj.updated_at = repo.updated_at;
            obj.lang = repo.language;
            console.log(obj);
            repoList.push(obj);
        });
        return repoList;
    }).then(rep=>{
        rep = rep.sort((a,b)=>Date.parse(b.updated_at) - Date.parse(a.updated_at));
        let s = `
        <h3>Repositories</h3>
        <ul class='all-repos'>
        </ul>`;
        rep.forEach(repo => {
            s+= `<li class='repo-li'>
            <a href=${repo.html_url} target='_blank'>${repo.name}</a>
            <a id='fork-link' href=${repo.forks_url}>(fork)</a>
            <p class='repo-desc'>${repo.description||''}</p>
            <div class='li-footer'>
              <div class='li-footer-left'>
                <div>
                  <p>${repo.lang||' '}</p>
                </div>
                <div class='star-div'>
                  <i class="fas fa-star"></i>
                  <p class='star-mark'>${repo.stargazers_count}</p>
                </div>
                <div class='fork-div'>
                  <i class="fas fa-code-branch"></i>
                  <p class='fork-mark'>${repo.forks}</p>
                </div>
              </div>
              <div>
                <p>${repo.updated_at}</p>
              </div>
            </div>
          </li>`;
        });
        s+=`</ul>`
        repoElem.innerHTML = s;
        //console.log(rep);
    })
}

//displayFollowers(name);
//displayRepos(name);
function process(event){
    if(event.keyCode == 13){
        name = this.value;
        repoElem.innerHTML='';
        followerElem.innerHTML='';
        resultElem.innerHTML = `<div class='loading-div'>
        <img class='loading' src='Spinner-1s-353px.gif'>
      </div>`;
        displayUser(name);
        displayRepos(name);
        displayFollowers(name);
        this.value = '';
    }
    
}
function processInstant(event){
  if(event.keyCode!=13){
    name = this.value;
    console.log(name);
    //instantSearch(name);
  }
}
function daysBetweenDate(dt) {

}
