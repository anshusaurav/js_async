/* CHALLENGE 1 */

function sayHowdy() {
  console.log("Howdy");
}

function testMe() {
  setTimeout(sayHowdy, 0);
  console.log("Partnah");
}
// After thinking it through, uncomment the following line to check your guess!
//It will print Partnah first.
testMe(); // what order should these log out? Howdy or Partnah first? 
/* CHALLENGE 2 */

function delayedGreet() {
  setTimeout(()=> console.log('welcome'), 3000);
}
// Uncomment the following line to check your work!
delayedGreet(); // should log (after 3 seconds): welcome

/* CHALLENGE 3 */

function helloGoodbye() {
  setTimeout("console.log('Hello')",0);
  setTimeout("console.log('bye')", 2000);
}
// Uncomment the following line to check your work!
 helloGoodbye(); // should log: hello // should also log (after 3 seconds): good bye

/* CHALLENGE 4 */

function brokenRecord() {
  //setInterval(()=>console.log('hi again'), 1000);
  setTimeout(function f(){
    console.log('hi again');
    setTimeout(f, 1000);
  },1000);
}
// Uncomment the following line to check your work!
  brokenRecord(); // should log (every second): hi again

/* CHALLENGE 5 */

function limitedRepeat() {
  // let timerId = setTimeout(function f(){
  //   console.log('hi');
  //   let timerIdNested = setTimeout(f, 1000);
  //   setTimeout(()=>clearTimeout(timerIdNested), 5000);
  // },1000);
  // setTimeout(()=>clearTimeout(timerId), 5000);
  let timerId = setInterval(()=>console.log('hi'), 1000);
  setTimeout(()=>clearInterval(timerId), 5000);
  // ADD CODE HERE
}
// Uncomment the following line to check your work!
// limitedRepeat(); // should log (every second, for 5 seconds): hi for now

/* CHALLENGE 6 */

function everyXsecsForYsecs(cb, x, y) {
  let timerId = setInterval(cb, x*1000);
  setTimeout(()=>clearInterval(timerId), y*1000);
}
// Uncomment the following lines to check your work!
function theEnd() {
  console.log('This is the end!');
}
everyXsecsForYsecs(theEnd, 2, 20); // should invoke theEnd function every 2 seconds, for 20 seconds): This is the end!
