'use strict';

var totalClicks = 0;
var allProducts = [];
var previousImgShown = [];

var firstImg = document.getElementById('first');
var secondImg = document.getElementById('second');
var thirdImg = document.getElementById('third');

var results = document.getElementById('results');


function Product(name, imgPath, altTxt){
  this.name = name;
  this.imgPath = imgPath;
  this.altTxt = altTxt;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}

new Product('bag', './img/bag.jpg' , 'bag');
new Product('banana', './img/banana.jpg' , 'banana');
new Product('bathroom', './img/bathroom.jpg' , 'bathroom');
new Product('boots', './img/boots.jpg' , 'boots');
new Product('breakfast', './img/breakfast.jpg' , 'breakfast');
new Product('bubblegum', './img/bubblegum.jpg' , 'bubblegum');
new Product('chair', './img/chair.jpg' , 'chair');
new Product('cthulhu', './img/cthulhu.jpg' , 'cthulhu');
new Product('dog-duck', './img/dog-duck.jpg' , 'dog-duck');
new Product('dragon' , './img/dragon.jpg' , 'dragon');
new Product('pen' , './img/pen.jpg' , 'pen');
new Product('pet-sweep' , './img/pet-sweep.jpg' , 'pet-sweep');
new Product('scissors' , './img/scissors.jpg' , 'scissors');
new Product('shark' , './img/shark.jpg' , 'shark');


function randomImage() {
  var firstRandom = Math.floor(Math.random() * allProducts.length);
  var secondRandom = Math.floor(Math.random() * allProducts.length);
  var thirdRandom = Math.floor(Math.random() * allProducts.length);

  while( firstRandom === secondRandom
     || firstRandom === thirdRandom 
     || secondRandom === thirdRandom 
     || previousImgShown.includes(firstRandom)
     || previousImgShown.includes(secondRandom)
     || previousImgShown.includes(thirdRandom))
     {  
    firstRandom = Math.floor(Math.random() * allProducts.length);
    secondRandom = Math.floor(Math.random() * allProducts.length);
    thirdRandom = Math.floor(Math.random() * allProducts.length);
    
  }
    previousImgShown[0] = firstRandom;
    previousImgShown[1] = secondRandom;
    previousImgShown[2] = thirdRandom;

    firstImg.src = allProducts[firstRandom].imgPath;
    secondImg.src = allProducts[secondRandom].imgPath;
    thirdImg.src = allProducts[thirdRandom].imgPath;

    firstImg.alt = allProducts[firstRandom].altTxt;
    secondImg.alt = allProducts[secondRandom].altTxt;
    thirdImg.alt = allProducts[thirdRandom].altTxt;

    allProducts[firstRandom].views++;
    allProducts[secondRandom].views++;
    allProducts[secondRandom].views++;

    totalClicks++;

  if (totalClicks === 25){
    firstImg.removeEventListener('click' , handleImageClick);
    secondImg.removeEventListener('click' , handleImageClick);
    thirdImg.removeEventListener('click' , handleImageClick);
    displayResults();
  }
}

function handleImageClick(event){
  randomImage();

  for (var i = 0; i < allProducts.length; i++) {
    if (event.target.alt === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }
}

function displayResults(){
  for (var i = 0; i < allProducts.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = allProducts[i].votes + ' votes for the ' + allProducts[i].name + ' and ' + allProducts[i].views + ' views .';
    results.appendChild(liEl);
  }
}

randomImage();

firstImg.addEventListener('click', handleImageClick);
secondImg.addEventListener('click', handleImageClick);
thirdImg.addEventListener('click', handleImageClick);



var myChart = new Chart(ctx, chartConfig);

if (localStorage.getItem('voteData')){
  var voteData = localStorage.getItem('voteData');
  myChart.data.datasets[0].data = JSON.parse(voteData);
  myChart.update();
}

colorsEl.addEventListener('click' , function(event){


var pId = event.target.id;
var idx =colors.indexOf(pId);

if (idx !== -1){
  myChart.data.datasets[0].data[idx] += 1;
  console.log(myChart.data.datasets[0].data);
  myChart.update();

  var jsonData = JSON.stringify (myChart.data.datasets[0].data);
  localStorage.setItem('voteData', jsonData);
}
})




