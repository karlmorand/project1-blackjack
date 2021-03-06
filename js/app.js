$(function(){
  launchScreen()
})

// Global variables
var $deck = [];
var $playerHand = [];
var $dealerHand = [];
var $playerCash = 500;
var $playerBet = 0;
var $playerTotal = 0;
var $dealerTotal = 0;


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

  var $startButton = $("<button>").text('Start Game').click(bettingScreen).attr('id', 'startButton').addClass('button');
  $('body').append($startButton);
}

function buildDeck(){ //builds the deck of cards and adds them to $deck array
  for (var i = 2; i <= 10; i++) {
    $deck.push(i+'c', i+'d', i+'h',i+'s');
  }
  $deck.push('js','qs','ks','as','jd','qd','kd','ad','jc','qc','kc','ac','jh','qh','kh','ah')
  console.log($deck);
  console.log($deck.length);
}

function bettingScreen() {
  $('body').empty()
  var $heading = $('<h1>').text('Blackjack');


  var $betInst = $('<p>').text("Enter the amount you'd like to bet on this hand. You currently have $" + $playerCash + " available to bet.");
  var $userBet = $('<input>').attr('type', 'number');
  var $submitBet = $('<button>').text('Place Bet').click(function(){
    $playerBet = $userBet.val();
    console.log('you just bet: ' + $playerBet);
    $('body').empty();
    createTable();
  })
  $('body').append($heading,$betInst,$userBet,$submitBet);
}


function createTable(){//creates the card table and hit and hold buttons and finally calls dealhand to begin the game
  buildDeck();
  var $heading = $('<h1>').text('Blackjack');
  $('body').append($heading)
  var $cardTable = $('<div>').attr('id','cardTable');
  var $dealerTable = $('<div>').attr('id','dealerTable');
  var $dealerLabel = $('<h2>').text("Dealer's Cards");
  var $playerLabel = $('<h2>').text("Your Cards");

  $cardTable.append($playerLabel);
  $('.instructions').remove();

  //Removing the start button and adding hit and hold buttons
  $('#startButton').remove();
  var $hitButton = $('<button>').text('Hit').attr('id','hitButton').addClass('button').click(playerHit);
  var $holdButton = $('<button>').text('Hold').attr('id','holdButton').addClass('button').click(dealerPlay);
  $('body').append($dealerLabel,$dealerTable,$playerLabel,$cardTable, $hitButton, $holdButton);

  dealHand();
}

function dealHand(){//deals the initial 2 cards to the player and dealer
  var dealerFirstCard = true;
  for (var i = 2; i < 6; i++) {
    if (i%2===0) {//player
      var random = Math.floor(Math.random()*$deck.length);
      $playerHand.push($deck[random]);
      $('#cardTable').append($('<img>').addClass('playerCard').attr('src','images/cards/' + $deck[random] +'.png'));
      $deck.splice(random, 1);
    } else {//dealer
      if (dealerFirstCard) {
      var random = Math.floor(Math.random()*$deck.length);
      $('#dealerTable').append($('<img>').addClass('dealerCard').attr({src:'images/cards/_Back.png', id:'dealerFirst'}));
      $dealerHand.push($deck[random]);
      $deck.splice(random, 1);
      dealerFirstCard = false;
    } else {
      var random = Math.floor(Math.random()*$deck.length);
      $('#dealerTable').append($('<img>').addClass('dealerCard').attr('src','images/cards/' + $deck[random] +'.png'));
      $dealerHand.push($deck[random]);
      $deck.splice(random, 1);
      }
    }
  }
  handTotal($playerHand, 'player');
  handTotal($dealerHand, 'dealer');
  if ($playerTotal === 21){
    winner('player');
  } else if ($dealerTotal === 21){
    winner('dealer')
    }
}

function playerHit(){//chooses another card at random and adds it to player array
  var random = Math.floor(Math.random()*$deck.length);
  $playerHand.push($deck[random]);
  $('#cardTable').append($('<img>').addClass('playerCard').attr('src','images/cards/' + $deck[random] +'.png'));
  $deck.splice(random, 1);
  handTotal($playerHand, 'player')
  if ($playerTotal > 21) {
    bust('player')
  }
}

function handTotal(cards, person){//takes an array of cards and adds them together, assigns the result to the playerTotal or dealerTotal variable
  var cardNums = [];
  var hasAce = false;
  console.log('entered handTotal, cards: ' + cards);
  for (var i = 0; i < cards.length; i++) { //convert card strings to numbers
    if (['j','q','k'].includes(cards[i].charAt(0))) {cardNums.push(10)}
      else if (cards[i].charAt(0)==='a') {
        cardNums.push(11);
        hasAce = true;
        console.log('ace found');
      } //by defualt ace is 11, below it checks if hand busts and then makes it a 1
      else if (cards[i].length<3) {cardNums.push(parseInt(cards[i].charAt(0)));}
      else {cardNums.push(10)}
  }
  var handTotal = 0;

  for (var i = 0; i < cardNums.length; i++) {
    handTotal += cardNums[i];
  }
  if (hasAce && (handTotal > 21)) {//if there's an ace and the hand is over 21 subtract 10 so the ace acts as a 1
      handTotal -= 10;
  }
  if (person === 'player') {
    $playerTotal = handTotal;
  } else {
    $dealerTotal = handTotal;
  }
}

function dealerPlay(){//invoked when the player clicks the hold button
  //needs to check if dealer busted, if not is dealer under 17, if so then hit...and repeat
  console.log('entered dealerPlay, playterTotal & dealerTotal:');
  console.log($playerTotal);
  console.log($dealerTotal);
  var dealerPlaying = true;

  while (dealerPlaying) {
    handTotal($dealerHand, 'dealer')
    console.log($dealerTotal);
      if ($dealerTotal > 21) {//dealer busted
        dealerPlaying = false;
        bust('dealer')
      } else if ($dealerTotal< 17) {//dealer needs to hit
      var random = Math.floor(Math.random()*$deck.length);
      $('#dealerTable').append($('<img>').addClass('dealerCard').attr('src','images/cards/' + $deck[random] +'.png'));
      $dealerHand.push($deck[random]);
      $deck.splice(random, 1);
    } else {//Dealer is between 17 and 21 so he doesn't hit again
      console.log('Dealer holds with: ' + $dealerTotal);
      dealerPlaying = false
      whoWins();
    }
  }
}

function bust(person){//if one person busts this executes
  console.log(person + ' busted');
  if (person === 'dealer') {
    winner('You');
  } else {winner('dealer');}
}

function blackjack(person){//if one person gets blackjack this executes
  if (person === 'dealer') {
    winner('dealer');
  } else {winner('You');}
}

function whoWins(){//if no bust or blacjack this figures out the winner by comparing scores
  console.log('entered whoWins');
  console.log($playerTotal);
  console.log($dealerTotal);
  handTotal($playerHand, 'player');
  handTotal($dealerHand, 'dealer');

  if ($playerTotal >= $dealerTotal) {
    winner('player');
  } else {
    winner('dealer');
  }
}

  function winner(person){
  console.log('the winner is: ' + person);
  $('#dealerFirst').attr('src','images/cards/' + $dealerHand[0] + '.png');
  if (person === 'dealer') {
    $playerCash -= $playerBet;
    $playerBet = 0;
    var $winnerDiv = $('<div>').attr('id','winnerDiv').html('<h1>House wins :(</h1></br>');
  } else {
    $playerCash = $playerCash + $playerBet;
    $playerBet = 0;
  var $winnerDiv = $('<div>').attr('id','winnerDiv').html('<h1>You Win!</h1></br>');
}
  $('body').append($winnerDiv);
  var $playAgainButton = $('<button>').click(function(){
    $('body').empty();
    $deck = [];
    $playerHand = [];
    $dealerHand = [];
    $playerTotal = 0;
    $dealerTotal = 0;
    bettingScreen();
  }).text('Play Again');
  $winnerDiv.append($playAgainButton);
}
