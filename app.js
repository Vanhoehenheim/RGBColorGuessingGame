const colorDisplay = document.querySelector("#colorDisplay"); //color in heading
const boxList = document.querySelectorAll(".square"); //all squares
const helpText = document.querySelector("#helpText");
const boxContainer = document.querySelector(".box_container");
const banner = document.querySelector(".displayBanner"); //top display banner
const reset = document.getElementById("resetColors"); //reset button
const easyBtn = document.getElementById("easy");
const hardBtn = document.getElementById("hard");

function random(max) {
  //create a random number from 0 to max-1
  return Math.floor(Math.random() * max);
}

function winningColor(color) {
  //changing the winning color to all boxes
  for (let i = 0; i < boxList.length; i++) {
    boxList[i].style.backgroundColor = color;
  }
}

function createRandomColorArray(num) {
  //creates the initial colored boxes and returns the array
  let arr = [];

  for (let i = 0; i < num; i++) {
    let red = random(257);
    let green = random(257);
    let blue = random(257);
    arr[i] = `rgb(${red}, ${green}, ${blue})`;
  }

  return arr;
}

function winOrLose() {
  let bgColor = this.style.backgroundColor;
  if (bgColor === pickedColor) {
    console.log("Yahoo");
    winningColor(pickedColor);
    helpText.textContent = "Yippee";
    banner.style.backgroundColor = pickedColor;
    reset.textContent = "Play Again?";
  } else {
    this.style.backgroundColor = "#232323";
    helpText.textContent = "Incorrect!";
  }
  return;
}

function resetColors(num) {
  rgbList = createRandomColorArray(num); //making new random colors

  pickedColor = rgbList[random(rgbList.length)]; //Choosing new random winning color
  boxList.forEach(ele=>{
    ele.classList.add("noShow");
  })
  for (let i = 0; i < rgbList.length; i++) {
    boxList[i].style.backgroundColor = rgbList[i];
    boxList[i].classList.toggle("noShow");
    boxList[i].addEventListener("click", winOrLose);
    colorDisplay.textContent = `RGB ${pickedColor.substr(3)}`;
    helpText.textContent = "";
  }
  banner.style.backgroundColor = "#232323"; //resetting display banner

  reset.textContent = "New Colours";

  console.log(pickedColor);
}

let diff = 6;

easyBtn.addEventListener("click",()=>{
  easyBtn.classList.toggle("selected");
  hardBtn.classList.toggle("selected");
  diff = 3;
  resetColors(3);
})

hardBtn.addEventListener("click",()=>{
  easyBtn.classList.toggle("selected");
  hardBtn.classList.toggle("selected");
  diff = 6;
  resetColors(6);
})

let rgbList = createRandomColorArray(6);

let pickedColor = rgbList[random(rgbList.length)];

colorDisplay.textContent = `RGB ${pickedColor.substr(3)}`;

resetColors(diff); // setting up squares for first time

reset.addEventListener("click", function(){
  resetColors(diff);
});

