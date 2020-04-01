// Your code goes here

let username = 'titarakshay ';
let imgElem = document.createElement('img');
let nameElem = document.createElement('p');
let idElem = document.createElement('p');
let bioElem = document.createElement('p');
let resElem = document.querySelector('#searchRes');
let imageElem = document.querySelector('.imageDiv');
let descElem = document.querySelector('.descDiv');
let queryField = document.querySelector('#userField');
let searchButton = document.querySelector('#searchButton');
let loadingElem = document.querySelector('.loading');
let loadMsgElem = document.querySelector('.loadmessage');
function getResults(uName){
    let request = new XMLHttpRequest();
    request.open('GET', `https://api.github.com/users/${uName}`);
    request.send();
    request.onload = function() {
        //loadingElem.hidden = !loadingElem.hidden;
        loadMsgElem.textContent = '';
        let res = request.response;
        console.log(request.response);
        
        let json = JSON.parse(res);
        let imgUrl = json['avatar_url'];
        let name = json['name'];
        let id = json['id'];
        let bio = json['bio'];

        imgElem.setAttribute('src', imgUrl);
        imageElem.append(imgElem);
        nameElem.textContent = 'Name: '+name;
        descElem.append(nameElem);
        idElem.textContent = 'ID: '+id;
        descElem.append(idElem);
        bioElem.textContent = 'Bio: '+bio;
        descElem.append(bioElem);
        resElem.style.display= 'grid';
        if(name === undefined)
        {
            loadMsgElem.textContent = 'No User Found';
            resElem.style.display = 'none';
        }
        
    };
    request.onprogress = function(event) {
        //loadingElem.hidden = !loadingElem.hidden;
        //if (event.lengthComputable)
        loadMsgElem.textContent = 'Loading...';
    };
    request.onerror = function(){
        console.log('No found');
        // loadMsgElem.textContent = 'No User Found';
        // resElem.style.display = 'none';
    }
}
//getResults(username);
searchButton.addEventListener('click', function(){
    loadMsgElem.textContent = 'Loading...';
    let nm = queryField.value;
    getResults(nm);
});