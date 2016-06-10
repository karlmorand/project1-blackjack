$(function(){
  launchScreen()
})

// Global variables
var $deck = [];
var $playerHand = [];
var $dealerHand = [];


function buildDeck(){ //builds the deck of cards and adds them to $deck array
  for (var i = 2; i <= 10; i++) {
    $deck.push(i+'c', i+'d', i+'h',i+'s');
  }
  $deck.push('js','qs','ks','as','jd','qd','kd','ad','jc','qc','kc','ac','jh','qh','kh','ah')
  console.log($deck);
  console.log($deck.length);
}
function launchScreen(){ // Loads the page title, rules, dealer guidleines, and a start button to begin playing the game
  var $heading = $('<h1>').text('Blackjack');
  $('body').append($heading);

  var $rulesDiv = $('<div>').addClass('instructions');
  var $rulesHeading = $('<h2>').text('Rules');
  var $rulesText = $('<p>').text("Player and dealer both recieve two cards, but only one of the dealer's cards is visible. Player has the option to 'Hit' to recieve another card or 'Hold' to keep his current hand. Once the player has finished his turn the dealer will play based on the Dealer Guidlines. The player closest to 21 without going over is the winner.");
  $rulesDiv.append($rulesHeading);
  $rulesDiv.append($rulesText);
  $('body').append($rulesDiv);

  var $dealerGuideDiv = $('<div>').addClass('instructions')
  var $dealerGuidHead = $('<h2>').text('Dealer Guidelines');
  var $dealerGuide = $('<p>').text("If the dealer's initial two cards total less than 17 the dealer will hit until he has 17 or higher, or he busts. Once he has 17 or higher the game will end and the winner decided based on who is closest to 21");
  $dealerGuideDiv.append($dealerGuidHead);
  $dealerGuideDiv.append($dealerGuide);
  $('body').append($dealerGuideDiv);

  var $startButton = $("<button>").text('Start Game').click(createTable).attr('id', 'startButton').addClass('button');
  $('body').append($startButton);
}

function createTable(){//creates the card table and hit and hold buttons and finally calls shuffleDeal to begin the game
  buildDeck();
  console.log('entered shuffleDeal');
  var $cardTable = $('<div>').attr('id','cardTable');

  var $dealerTable = $('<div>').attr('id','dealerTable');
  var $dealerLabel = $('<h2>').text("Dealer's Cards");
  $dealerTable.append($dealerLabel);

  var $playerLabel = $('<h2>').text("Your Cards");

  $cardTable.append($playerLabel);
  $('.instructions').remove();

  //Removing the start button and adding hit and hold buttons
  $('#startButton').remove();
  var $hitButton = $('<button>').text('Hit').attr('id','hitButton').addClass('button');
  var $holdButton = $('<button>').text('Hold').attr('id','holdButton').addClass('button');
  $cardTable.append($hitButton, $holdButton);

  $('body').append($dealerTable,$cardTable);
  dealHand();
}

function dealHand(){//get a random number that is up to the length of the cards array, pull the card at that index and assign it to an array of the player or dealers hand, remove the item from the array

  for (var i = 2; i < 6; i++) {
    if (i%2===0) {//player
      var random = Math.floor(Math.random()*$deck.length);
      $playerHand.push($deck[random]);
      $('#cardTable').append($('<div>').addClass('playerCard').text($deck[random]));
      $deck.splice(random, 1);
    } else {//dealer
      var random = Math.floor(Math.random()*$deck.length);
      $('#dealerTable').append($('<div>').addClass('dealerCard').text($deck[random]));
      $dealerHand.push($deck[random]);
      $deck.splice(random, 1);
    }
  }
  console.log($deck.length);
  console.log(checkHand($dealerHand));
  console.log(checkHand($playerHand));

}


// dealHand function deals initial two cards to player and dealer
// then it checks to see if anyone has 21 by visiting the checkwin function
// then it

function checkHand(cards){//takes an array of cards and checks to see if they bust, are 21, etc
  var cardNums = [];
  for (var i = 0; i < cards.length; i++) { //convert card strings to numbers
    if (['j','q','k','a'].includes(cards[i].charAt(0))) {cardNums.push(10)}
      // else if (cards[i].charAt(0)==='a') {} not sure how to handle ace yet
      else if (cards[i].length<3) {cardNums.push(parseInt(cards[i].charAt(0)));}
      else {cardNums.push('10')}
  }
  var handTotal = 0;
  for (var i = 0; i < cardNums.length; i++) {
    handTotal += cardNums[i];
  }


  if (handTotal > 21) {
    return 'bust';
  } else if (handTotal === 21 && cardNums.length === 2){
    return 'blackjack'
  }
    else {
      return handTotal;
    }


}
