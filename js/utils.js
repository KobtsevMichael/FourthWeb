let numberRows, numberColumns;
let isPlaying = false;

function getTime() {
  return new Date().getTime();
}

function randomSlotId() {

  row = Math.floor(Math.random() * numberRows) + 1;
  col = Math.floor(Math.random() * numberColumns) + 1;

  return $(`#slot-${row}${col}`);
}

function createField() {
  for (let i=1; i < numberRows+1; i++) {
    for (let j=1; j < numberColumns+1; j++) {
      const columnElement = $(`<div class="game-slot"
      id="slot-${i}${j}"></div>`);

      columnElement.appendTo($('.field'));
    }
  }
}

function redrawField(rows, cols) {

  numberRows = rows;
  numberColumns = cols;

  $('.field').empty();
  createField();

  $(".game-slot").bind("click", handleClick);
  if (isPlaying) {newRound()}
}

function checkPosition() {

  if (window.matchMedia('(min-width: 767.98px)').matches) {
    if (numberRows != 8) {redrawField(8, 6)}
  }
  else {
    if (numberRows != 5) {redrawField(5, 4)}
  }
}
