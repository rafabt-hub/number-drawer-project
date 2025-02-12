document.querySelector('.btn-draw').addEventListener('click', drawNumbers);

let drawSettings = {};

function drawNumbers() {
  const quantity = parseInt(document.getElementById('quantity').value);
  const rangeStart = parseInt(document.getElementById('from').value);
  const rangeEnd = parseInt(document.getElementById('to').value);
  const allowRepeats = !document.getElementById('norepeat').checked;

  if (isNaN(quantity) || isNaN(rangeStart) || isNaN(rangeEnd) || quantity <= 0 || rangeStart >= rangeEnd) {
    alert('Please fill in the fields correctly. Check the range and quantity.');
    return;
  }

  if (!allowRepeats && quantity > (rangeEnd - rangeStart + 1)) {
    alert('The range is too small for the quantity without repetition.');
    return;
  }

  const drawnNumbers = [];
  while (drawnNumbers.length < quantity) {
    const number = Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
    if (allowRepeats || !drawnNumbers.includes(number)) {
      drawnNumbers.push(number);
    }
  }

  drawSettings = { quantity, rangeStart, rangeEnd, allowRepeats };

  displayResult(drawnNumbers);
}

function displayResult(numbers) {
  const rightSide = document.querySelector('.rightside');

  rightSide.innerHTML = `
    <div class="draw">
      <div class="draw1">
        <h2>RESULTADO DO SORTEIO</h2>
        <p>${numbers.length > 1 ? 'RESULTADOS' : '1º RESULTADO'}</p>
      </div>
      <div class="draw2">
        <img src="assets/icons/diceiconempty.svg" alt="dice" class="imgbgdice">
        <div class="result" id="result">${numbers.join(' - ')}</div>
        <img src="assets/icons/diceiconempty.svg" alt="dice" class="imgbgdice">
      </div>
      <button class="btn-redraw" id="btn-redraw">
        SORTEAR NOVAMENTE
        <img class="arrow" src="assets/icons/playicon.svg" alt="">
      </button>
    </div>
  `;

  document.getElementById('btn-redraw').addEventListener('click', drawAgain);
}

function drawAgain() {
  const resultDiv = document.getElementById('result');

  const { quantity, rangeStart, rangeEnd, allowRepeats } = drawSettings;

  const newNumbers = [];
  while (newNumbers.length < quantity) {
    const number = Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
    if (allowRepeats || !newNumbers.includes(number)) {
      newNumbers.push(number);
    }
  }

  if (resultDiv) {
    resultDiv.textContent = newNumbers.join(' - ');
  }
}
