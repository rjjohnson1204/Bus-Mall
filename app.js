'use strict';
var ctx = document.getElementById("myChart").getContext('2d');

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

  var cOne = Math.floor(Math.random() * 255);
  var cTwo = Math.floor(Math.random() * 255);
  var cThree = Math.floor(Math.random() * 255);

  this.bgColor = `rgba(${cOne}, ${cTwo}, ${cThree}, 0.2)`;
  allProducts.push(this);
}

if(localStorage.votes){
  var storedVotes = JSON.parse(localStorage.getItem('votes'));
  allProducts = storedVotes;

} else {
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
}



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
    localStorage.setItem('votes', JSON.stringify(allProducts));
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

function displayResults() {
  var names = [];
  for (var i = 0; i < allProducts.length; i++) {
    names.push(allProducts[i].name);
  }

  var votes = [];
  for (var j = 0; j < allProducts.length; j++) {
    votes.push(allProducts[j].votes);
  }

  var colors = [];
  for (var k = 0; k < allProducts.length; k++) {
    colors.push(allProducts[k].bgColor);
  }

  var chartConfig = {
    type: 'doughnut',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: colors,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

  return new Chart(ctx, chartConfig);
    
  }
  // function refreshSurvey (event) { //tied into button to reload page
  //   event.preventDefault;
  //   window.location.reload(true);

randomImage();

firstImg.addEventListener('click', handleImageClick);
secondImg.addEventListener('click', handleImageClick);
thirdImg.addEventListener('click', handleImageClick);









