$(function(){
  launchScreen()
})

function launchScreen(){
  // Loads the page title, rules, dealer guidleines, and a start button to begin playing the game
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

  var $startButton = $("<button>").text('Start Game').click(shuffleDeal).attr('id', 'startButton');
  $('body').append($startButton);
}

function shuffleDeal(){
  console.log('entered shuffleDeal');
  var $cardTable = $('<div>').addClass('cardTable');

  var $dealerArea = $('<div>').attr('id','dealerArea');
  var $dealerCardOne = $('<div>').addClass('dealerCard');
  var $dealerCardTwo = $('<div>').addClass('dealerCard');
  var $dealerLabel = $('<h2>').text("Dealer's Cards");
  $dealerArea.append($dealerLabel, $dealerCardOne, $dealerCardTwo);


  var $playerLabel = $('<h2>').text("Your Cards");
  var $playerCardOne = $('<div>').addClass('playerCard');
  var $playerCardTwo = $('<div>').addClass('playerCard');
  $cardTable.append($playerLabel, $playerCardOne,$playerCardTwo);
  $('.instructions').remove();



  //Removing the start button and adding hit and hold buttons
  $('#startButton').remove();
  var $hitButton = $('<button>').text('Hit').attr('id','hitButton');
  var $holdButton = $('<button>').text('Hold').attr('id','holdButton');
  $cardTable.append($hitButton, $holdButton);

  $('body').append($dealerArea,$cardTable);




}
