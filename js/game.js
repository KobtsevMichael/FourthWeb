const maxHits = 10;

let firstHitTime = 0;
let hits = 0;

let greenSlot = null;
let redSlot = null;

function endGame() {
  $("#field").addClass("d-none");
  isPlaying = false;

  let totalMillis = getTime() - firstHitTime;
  let totalSeconds = Number(totalMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalSeconds);

  $("#win-message").removeClass("d-none");
  $("#button-reload").prop("disabled", false);

  $("#button-reload").removeClass("btn-dark");
  $("#button-reload").addClass("btn-success");
}

function newRound() {

  if (greenSlot) {clearGreenSlot()}
  if (redSlot) {clearRedSlot()}

  if (hits === maxHits) {
    endGame()
  }
  else {
    greenSlot = randomSlotId(greenSlot);
    greenSlot.addClass("target");
    greenSlot.text(hits+1);
  }
}

function clearRedSlot() {
  redSlot.removeClass("miss")
  redSlot.text("")
}

function clearGreenSlot() {
  greenSlot.removeClass("target");
  greenSlot.text("");
}

function showRedSlot() {

  if (hits > 1) {hits--}

  greenSlot.text(hits);
  redSlot.addClass("miss");
}

function handleClick(event) {

  if ($(event.target).hasClass("target")) {
    greenSlot = $(event.target);
    hits ++;
    newRound();
  }
  else {
    if (redSlot) {clearRedSlot()}
    redSlot = $(event.target);
    showRedSlot();
  }
}

function newGame() {
  $("#button-reload").prop("disabled", true);
  $("#button-reload").removeClass("btn-succss");
  $("#button-reload").addClass("btn-dark");

  $("#field").removeClass("d-none");
  $("#win-message").addClass("d-none");

  firstHitTime = getTime();
  isPlaying = true;
  hits = 0;

  newRound();
}

function gameStart() {
  $("#button-reload").unbind()
  $("#button-reload").bind("click", newGame);
  $("#button-reload").text("Play again");

  newGame();
}

function init() {
  $("#button-reload").bind("click", gameStart);
  checkPosition();
}

$(document).ready(init);
$(window).bind("resize", checkPosition);
