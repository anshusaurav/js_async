// Challenge 1

function sayHello() {
  setTimeout(()=> console.log('Hello'), 1000);
}

// Uncomment the line below when ready
sayHello(); // should log "Hello" after 1000ms


// Challenge 2
var promise = new Promise(function (resolve, reject) {
  setTimeout(()=>resolve('Resolved!'),1000);
});
promise.then(console.log);
// Should print out "Resolved!"
// ADD CODE HERE


// Challenge 3

promise = new Promise(function(resolve, reject) {
  reject(new Error("Rejected!"));
});
promise.catch(console.log);

// Should print out "Reject!"
// ADD CODE HERE


// Challenge 4

promise = new Promise(function (resolve, reject) {
  // ADD CODE HERE
  setTimeout(() => resolve("Promise has been resolved!"), 1000);
});

// Uncomment the lines below when ready
promise.then(() => console.log('Promise has been resolved!'));
console.log("I'm not the promise!");
//I'm not a promise is printed first since other call of console.log is 
//asynchronous and performed later
// Challenge 5
function delay(){
  let promise = new Promise(function (resolve, reject) {
    // ADD CODE HERE
    setTimeout(() => resolve("done"), 1000);
  });
  
  return promise;
}


// Uncomment the code below to test
// This code should log "Hello" after 1000ms
delay().then(sayHello);


// Challenge 6
// ADD CODE BELOW
var secondPromise = new Promise(function(resolve, reject){
  setTimeout(() => resolve("Second!"), 1000);
});
var firstPromise = new Promise(function(resolve, reject){
  setTimeout(() => resolve(secondPromise), 1000);
});
firstPromise.then(sP => console.log(sP));


// Challenge 7
const fakePeople = [
  { name: 'Rudolph', hasPets: false, currentTemp: 98.6 },
  { name: 'Zebulon', hasPets: true, currentTemp: 22.6 },
  { name: 'Harold', hasPets: true, currentTemp: 98.3 },
]

const fakeAPICall = (i) => {
  const returnTime = Math.floor(Math.random() * 1000);
  return new Promise((resolve, reject) => {
    if (i >= 0 && i < fakePeople.length) {
      setTimeout(() => resolve(fakePeople[i]), returnTime);
    } else {
      reject({ message: "index out of range" });
    }
  });
};

function getAllData() {
  let arr = fakePeople.map((elem, index) =>(fakeAPICall(index)));
  Promise.all(arr).then(res => console.log(res));
}
getAllData();