
// 'use strict';

// function Product(name, src) {

// }
 
//   var items =  {[['bag' , 'img/bag.jpg'], ['banana' , 'img/banana.jpg'], ['bathroom' , 'img/bathroom.jpg'], ['boots' , 'img/boots.jpg'] ,['breakfast' , 'img/breakfast.jpg'] , ['bubblegum' , 'img/bubblegum.jpg'] , ['chair' , 'img/chair.jpg'] , ['cthulhu' , 'img/cthulhu.jpg'] , ['dog-duck' , 'img/dog-duck.jpg'] , ['dragon' , ' img/dragon.jpg'] , [ 'pen' , 'img/pen.jpg'] ,['pet-sweep' , 'img/pet-sweep.jpg'] , ['scissors' , 'img/scissors.jpg'] , ['shark' , 'img/shark.jpg'] , ['sweep' , 'img/sweep.jpg'] , ['tauntaun' , 'img/tauntaun.jpg'] , ['unicorn' , 'img/unicorn.jpg'] , ['usb' , 'img/usb.jpg'] , ['water-can' , 'img/water-can.jpg'] , ['wine-glass' , 'img/wine/-glass.jpg'] }

//   var items = [img/bag.jpg , img/banana.jpg , img/bathroom.jpg ,  img/boots.jpg , img/breakfast.jpg , img/bubblegum.jpg , img/chair.jpg , img/cthulhu.jpg , img/dog-duck.jpg , img/dragon.jpg , img/pen.jpg , img/pet-sweep.jpg , img/scissors.jpg ,  ]

//   var picture = ['bag' , 'banana', 'bathroom' , 'boots' , 'breakfast' , 'bubblegum' , 'chair' , 'cthulhu' , 'dog-duck' , 'dragon' , 'pen' , 'pet-sweep' , 'scissors' , 'shark' , 'sweep' , 'tauntuan' , 'unicorn' , 'usb' , 'water-can' , 'wine-glass']

//  var randomPic = Math.floor(Math.random() * 19))
//  var picture = randomPic



// var tracker = {
//   products: [],
//   totalClicks: 0,

//   mainEl: document.getElementById('main-content'),

//   getRandomIndex: function() {

//   },
//   getUniqueImages: function() {

//   },
//   renderImages: function() {

//   },
//   addClickTracker: function() {

//   },
//   clickHandler: function(event) {

//   },
// };


// (function createProducts() {

// })()

'use strict'
var totalClicks = 0;
var allProducts = [];
var previousImgShown = [];

var firstImg = document.getElementById('first')
var secondImg = document.getElementById('second')
var thirdImg = document.getElementById('third')
var results = document.getElementById('results')
console.log(results);



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

function randomImage() {
  var firstRandom = Math.floor(Math.random() * allProducts.length);
  var secondRandom = Math.floor(Math.random() * allProducts.length);
  var thirdRandom = Math.floor(Math.random() * allProducts.length);

  // while (secondRandom === firstRandom) {
  //   secondRandom = Math.floor(Math.random() * allProducts.length);
  // }
  // while (thirdRandom === secondRandom || thirdRandom === firstRandom) {
  //   thirdRandom = Math.floor(Math.random() * allProducts.length);
  // }
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
    console.log(previousImgShown, 'previousImgShown');

    firstImg.src = allProducts[ firstRandom].imgPath;
    secondImg.src = allProducts[ secondRandom].imgPath;
    thirdImg.src = allProducts[ thirdRandom].imgPath;
    
    allProducts[firstRandom].views++;
    allProducts[secondRandom].views++;
    allProducts[secondRandom].views++;

    totalClicks++;
    console.log(totalClicks)

if (totalClicks ===25){
  firstImg.removeEventListener('click' , randomImage);
  secondImg.removeEventListener('click' , randomImage);
  thirdImg.removeEventListener('click' , randomImage);
displayResults();
}
}

randomImage();

// firstImg.src = allProducts[ 'randomFirst'].imgPath;
function displayResults(){
  for (var i = 0; i < allProducts.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = allProducts[i].votes + ' votes for the ' + allProducts[i].name + ' and ' + allProducts[i].views + ' views .';
    results.appendChild(liEl);
  }
}

firstImg.addEventListener('click', randomImage)
secondImg.addEventListener('click', randomImage)
thirdImg.addEventListener('click', randomImage)





