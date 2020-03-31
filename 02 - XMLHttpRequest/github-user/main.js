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
function getResults(uName){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${uName}`);
    xhr.send();
    xhr.onload = function() {
        let res = xhr.response;
        console.log(xhr.response);
        
        let json = JSON.parse(res);
        let imgUrl = json['avatar_url'];
        let name = json['name'];
        let id = json['id'];
        let bio = json['bio'];

        imgElem.setAttribute('src', imgUrl);
        imageElem.append(imgElem);
        nameElem.textContent = name;
        descElem.append(nameElem);
        idElem.textContent = id;
        descElem.append(idElem);
        bioElem.textContent = bio;
        descElem.append(bioElem);
    };
}
//getResults(username);
searchButton.addEventListener('click', function(){
    let nm = queryField.value;
    getResults(nm);
});